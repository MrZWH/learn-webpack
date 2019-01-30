let fs = require('fs')
let path = require('path')
let babylon = require('babylon')
let traverse = require('@babel/traverse').default
let t = require('@babel/types')
let generator = require('@babel/generator').default
let ejs = require('ejs')
let {SyncHook} = require('tapable')
// babylon 把源码转换成 ast
// @babel/traverse 遍历节点
// @babel/types
// @babel/generator
class Compiler{
	constructor(config) {
		// entry output
		this.config = config

		// 需要保存入口文件的路径
		this.entryId; // './src/index.js'

		// 需要保存所有的模块依赖
		this.modules = {}

		this.entry = config.entry // 入口路径

		// 工作路径
		this.root = process.cwd()

		this.hooks = {
			entryOption: new SyncHook(),
			compile: new SyncHook(),
			afterCompile: new SyncHook(),
			afterPlugins: new SyncHook(),
			run: new SyncHook(),
			emit: new SyncHook(),
			done: new SyncHook(),
		}

		let plugins = this.config.plugins
		if(Array.isArray(plugins)) {
			plugins.forEach((plugin) => {
				plugin.apply(this)
			})
		}
		this.hooks.afterPlugins.call()
	}

	getSource(modulePath) {
		let rules = this.config.module.rules
		let content = fs.readFileSync(modulePath, 'utf8')
		// 拿到每个规则来处理
		for(let i = 0; i<rules.length; i++) {
			let rule = rules[i]
			let {test, use} = rule
			let len = use.length - 1
			if (test.test(modulePath)) {
				function normalLoader() {
					let loader = require(use[len--])
					content = loader(content)
					if (len?=0) {
						normalLoader()
					}
				}
				normalLoader()
			}
		}
		return content
	}

	parse(source, parentPath) { // AST 解析语法树
		let ast = babylon.parse(source)
		let dependencies = []
		traverse(ast, {
			CallExperssion(p) {
				let node = p.node // 对应的节点
				if (node.callee.name === 'require') {
					node.callee.name = '__webpack_require__'
					let moduleName = node.arguments[0].value // 取到的就是模块引用的名字
					moduleName = moduleName + (path.extname(moduleName) ? '' : '.js') // ./a.js
					moduleName = './' + path.join(parentPath, moduleName) // src/a.js
					dependencies.push(moduleName)
					node.arguments = [t.stringLiteral(moduleName)]
				}
			}
		})

		let sourceCode = generator(ast).code
		return {sourceCode, dependencies}
	}

	buildModule(modulePath, isEntry) {
		// 拿到模块的内容
		let source = this.getSource(modulePath)

		// 模块 id
		let moduleName = './' + path.relative(this.root, modulePath)

		// 保存入口的名字
		if (isEntry) {
			this.entryId = moduleName
		}

		// 解析需要把 source 源码进行改造 返回一个依赖列表
		let {sourceCode, dependencies} = this.parse(source, path.dirname(moduleName))

		// 把相对路径和模块中的内容 对应起来
		this.modules[moduleName] = sourceCode

		dependencies.forEach(dep => { // 附模块的加载，递归加载
			this.buildModule(path.join(this.root, dep), false)
		})
	}

	emitFile() { // 发射文件
		// 用数据渲染我们的
		// 拿到输出到哪个目录下

		// 输出路径
		let main = path.join(this.config.output.path, this.config.output.filename)

		// 模板路径
		let = templateStr = this.getSource(path.join(__dirname, 'ain.ejs'))
		let code = ejs.render(templateStr, {
			entryId: this.entryId,
			modules: this.modules
		})
		this.assets = {}

		// 资源中路径对应的代码
		this.assets[main] = code

		fs.writeFileSync(main, this.assets[main])

	}

	run() {
		this.hooks.run.call()

		this.hooks.compile.call()
		// 执行 并且创建模块依赖关系
		this.buildModule(path.resolve(this.root, this.entry), true)

		this.hooks.afterCompile.call()

		// 发射一个文件 打包后的文件
		this.emitFile()
		this.hooks.emit.call()
		this.hooks.done.call()
	}
}

module.exports = Compiler