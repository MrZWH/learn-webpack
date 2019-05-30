## webpack 4.0

### webpack 安装
- 安装本地的 webpack
- webpack webpack-cli -D

### webpack 可以进行零配置
可以使用`npx webpack`直接进行打包

### 手动配置 webpack
默认配置文件名字有两种 webpack.config.js webpackfile.js。
```
module.exports = {
	mode: 'development', // 模式默认两种 production development
}
```

在 package.json 里面写了 webpack 打包脚本后还想传参可以这么写：
```
npm run build -- --config webpack.config.my.js
```

#### webpack-dev-server
devServer 属性配置：
- contentBase: 服务器启动根路径
- open: 是否自动打开浏览器
- proxy
- port

```
npm i webpack-dev-server -D
```

#### html-webpack-plugin -D

### 样式处理
```js
{
	loader: 'style-loader',
	options: {
		insertAt: 'top' // style 标签插入到顶部
	}
}
```

解析 less 文件需要安装`less less-loader -D`  
解析 sass 文件需要安装`node-sass sass-loader -D`  
解析 stylus 文件需要安装`stylus stylus-loader -D`  

当在 scss 文件里 import 别的 scss 文件时，webpack 会跳过其它 loader 直接使用 `css-loader`, 所以需要在`css-loader` options 里配置如下（表示需要执行上面两个 loader）：
```
options: {
	importLoaders: 2
}
```

#### CSS module
```
{
	loader: 'css-loader',
	options: {
		modules: true
	}
}
```

#### 处理字体文件
字体文件中有用部分：`.eot`、`.svg`、`.ttf`、`.woff`。
还需要`iconfont.css`文件。

#### 抽离 CSS 样式
```
npm i mini-css-extract-plugin -D
```
```js
// webpack.config.js
let MiniCssExtractPlugin = require('mini-css-extract-plugin')


{
	test: /\.css$/,
	use: [
		MiniCssExtractPlugin.loader,
		'css-loader'
	]
}
// ...
plugins: {
	new MiniCssExtractPlugin({
		filename: 'main.css'
	})
}
```

#### 添加浏览器前缀
```
npm i postcss-loader atuoprefixer -D
```
新建 postcss 配置文件`postcss.config.js`

#### 压缩 css
```
npm i optimize-css-assets-webpack-plugin -D 
```
使用这个插件压缩 css 后，原本的 js 压缩就不起作用了，需要安装如下插件：
```
npm i uglifyjs-webpack-plugin -D
```

## 使用 babel 处理 JS

#### 将高级语法转换为 es5
安装 babel：
```
npm babel-loader @babel/core @babel/preset-env -D
```
#### 添加 class 类 属性插件：
```
yarn add @babel/plugin-proposal-class- properties -D
```
#### 添加 装饰器 插件：
```
yarn add @babel/plugin-proposal-decorators -D
```
#### 处理 es6 api
类似 `'aaaa'.includes("a")` 这种es7 的 api 语法需要另外处理。

首先安装：
```
npm i @babel/polyfill -S
```

##### 方法一（需要写库的代码的时候）
安装额外包：
```
yarn add @babel/plugin-transform-runtime -D
npm i @babel/runtime -S
npm i @babel/runtime-corejs2
```
然后再 babel 配置文件中配置如下：
```
plugins: [['@babel/plugin-transform-runtime', {
	'corejs': 2, // 设置为2 需要安装额外包 @babel/runtime-corejs2
	'helpers': true,
	'regenerator': true,
	'useESModules: false'
}]]
```
##### 方法二（只需要写业务代码如下配置即可）
在 babel 配置文件中设置如下配置同样有效：
```
presets: [['@babel/preset-env', {
	useBuiltIns: 'usage'
}]]
```
webpack4以下版本需要在代码中`require('@babel/polyfill')`

#### 语法校验 --- eslint 
```shell
npm i eslint -D
```
命令行使用：
```shell
npx eslint <file or path>
```

配合webpack 使用：
```shell
npm i eslint eslint-loader -D
```
// webpack.config.js
```js
devServer: {
	overlay: true
}

// ... eslint-loader options
options: {
	fix: true
}

// eslint-loader 必须先执行
use: [{
	loader: 'eslint-loader',
	force: 'pre'
}]
```

项目中最佳实践：
不会使用 eslint-loader 因为会降低打包速度，会利用 git 钩子。

配置文件：  
.eslintrc.json 配置文件可以在官网勾选项然后下载 

配合 react 使用：  
// eslintrc.js
```js
module.exports = {
	"extends": "airbnb",
	"parser": "babel-eslint"
}
```

### 全局变量引入问题 第三方模块处理
例如 jQuery 的问题：
```js
import $ from 'jquery'
console.log(window.$) // undefined
```

```
npm i expose-loader
```
想要将 jQuery 挂载到window 可以如下使用内联 loader（也可以配置在 webpack 配置文件中）
```js
import $ from 'expose-loader?$!jquery'
// expose-loader 暴露 全局的 loader 内联的 loader
// pre 前面执行的 loader normal 普通的 loader 内联loader 后置 post loader
console.log(window.$) // undefined
```

也可以不使用 import，可使用`webpack.ProvidePlugin`插件，但是不能通过 window.$ 拿到

如果在 html 中直接使用 CDN 引入，然后又在代码中使用 import 引入模块，webpack 则还会再打包一份该模块代码，需要通过配置`externals`属性去解决。

### 图片处理
#### 图片引入问题
##### 在 js 中创建图片来引入
```
let image = new Image();
image.src = './logo.png' // 这样并不会打包文件
document.body.appendChild(image)
```
解决：
安装处理图片的loader:
```
npm i file-loader -D
```
file-loader 会在内部生成一张图片到 build 目录下，并把生成的图片的名字返回回来
```
import logo from './logo.png' // 返回的结果是一个新的图片地址
let image = new Image();
image.src = logo
document.body.appendChild(image)
```	
##### 在 css 引入 background('url')
```css
body {
	background: url("./logo.png") // css-loader 会把这块打包成 url(require("./logo.png"))
}
```
##### `<img src="" alt="">`
处理在html 中引入图片需安装：
```
npm i html-withimg-loader -D
```

#### 将小图片转换成 base64

```
npm i url-loader -D
```
```
limit: 200 * 1024 // 200 kb 单位字节
```
base64 会比源文件大 1/3

#### 打包文件分类
在使用的 loader 下面的 options 配置项中 outputPath 属性是配置在打包目录下该模块打包的细分子目录。
image: `outputPath: 'img/'`
css:
```js
new MiniCssExtractPlugin({
			filename: 'css/main.css'
		}),
```
使用 CDN 需设置`publicPath`，可以设置公共的，也可以单独为 img 配置。

### 多页面应用打包
运用 HtmlWebpackPlugin 插件里面 chunks 参数

### sourcemap
// 源码映射
- source-map 会单独生成 .map 文件
- eval-source-map 不对产生单独文件 但是可以显示行和列
- cheap-module-source-map 不会产生列 但是会生成一个单独的文件，不会和源码关联起来
- cheap-module-eval-source-map 不会产生文件 集成在打包后的文件中 不会产生列

一般开发环境用：`cheap-module-eval-source-map`
一般生产环境用：`cheap-module-source-map`
### watch
```
watch: true, // 实时编译
	watchOptions: { // 监控的选项
		poll: 1000, // 每秒 问 1000 次需要更新吗
		aggregateTimeout: 500, // 防抖 我一直输入代码
		ignored: /node_modules/, // 不需要监控
	},
```

### webpack 小插件应用
#### cleanWebpackPlugin
清空目录，可以多个文件夹
```shell
npm i clean-webpack-plugin -D
```
使用：
```js
new CleanWebpackPlugin(['dist'])
```
这个插件会将当前webpack 配置文件所在的目录视为根目录，有些情况下会将配置文件单独放在 build 目录下，这是就无法删除与之同级目录，需要做如下配置：
```js
new CleanWebpackPlugin(['dist', {
	root: path.resolve(__dirname, '../')
}])
```

#### copyWebpackPlugin
拷贝目录
```
npm i copy-webpack-plugin -D
```

#### BannerPlugin 内置
版权声明插件，webpack 内置插件

### webpack 跨域问题
配置 devServer proxy
```js
devServer: {
	proxy: {
		'react/api': {
			target: 'http://www.xxx.com',
			// target: 'https://www.xxx.com',
			// secure: false,
			pathRewrite: {
				'header.json': 'demo.json'
			}
		}
	}
}
```

### 在服务端启动 webpack：
```
npm i webpack-dev-middleware -D
```
代码参考：`server.js`

### resolve 属性的配置
- modules 规定模块查找范围
- extensions 没文件后缀时的查找规则
- mainFields 第三方模块源文件查找的先后顺序
- mainFiles 入口文件的名字
- alias 别名

### 定义环境变量
pack.DefinePlugin  
字符串需要外面再加一层双引号

### Development 和 Production 模式的区分打包
启动脚本：
```json
"script": {
	"dev": "webpack-dev-server --conifig ./build/webpack.dev.js",
	"build": "webpack --conifig  ./build/webpack.prod.js"
}
```

合并 webpack 配置文件：
```
npm i webpack-merge -D
```
```js
module.exports = merge(commonConfig, devConfig)
```

### noParse
让 webpack 不去解析分析该模块中的依赖关系库。  
编译 react：
```
npm i @babel/preset-react -D
```

### IgnorePlguin
忽略包中的文件，moment中的所有语言包

### DllPlugin
第三方模块打包优化---第三方模块只打包一次。  
webpack.DllReferencePlugin  
webpack.DllPlugin

创建 `webpack.dll.js` 配置文件：
```js
module.exports = {
	mode: 'production',
	entry: {
		vendors: ['react', 'react-dom', 'lodash']
	},
	output: {
		filename: '[name].dll.js',
		path: path.resolve(__dirname, '../dll'),
		library: '[name]', // 可生成全局变量 vendors
	},
	plugins: [
		new webpack.DllPlugin({
			name: '[name]',
			path: path.resolve(__dirname, '../dll/[name].manifest.json')
		})
	]
}
```
创建一个 script 命令：
```json
"build:dll": "webpack --config webpack.dll.js"
```

安装一个插件：
```shell
npm i add-asset-html-webpack-plugin -S
```
`webpack.common.js`
```js
plugins: [
	new AddAssetHtmlWebpackPlugin({
		filepath: path.resolve(__dirname, '../dll/vendors.dll.js')
	})
]
```

结合全局变量和 vendors.manifest.json 配置 wepack.common.js 文件：
```js
plugins: [
	new AddAssetHtmlWebpackPlugin({
		filepath: path.resolve(__dirname, '../dll/vendors.dll.js')
	}),
	new webpack.DllReferencePlugin({
		manifest: path.resolve(__dirname, '../dll/vendors.manifest.json')
	}),
]
```
如果分离库文件过多可以如下优化：
```js
const files = fs.readdirSync(path.resolve(__dirname, '../dll'))
files.forEach(file => {
	if (/.*\.dll.js/.test(file)) {
		plugins.push(
			new AddAssetHtmlWebpackPlugin({
				filepath: path.resolve(__dirname, '../dll', file)
			})
		)
	}

	if (/.*\.manifest.json/.test(file)) {
		plugins.push(
			new webpack.DllReferencePlugin({
				manifest: path.resolve(__dirname, '../dll', file)
			})
		)
	}
})
```

### Webpack 与浏览器缓存( Caching )
contenthash

webpack.prod.js
```js
output: {
	filename: '[name].[contenthash].js',
	chunkFilename: '[name].[contenthash].js'

}
```

webpack.common.js
```js
optimization: {
	// 老版本的 webpack 有不改代码 hash 任变的问题需要如下配置
	runtimeChunk: {
		name: 'runtime'
	},
	usedExports: true,
	splitChunks: {
		chunks: 'all',
		cacheGroups: {
			vendors: {
				test: /[\\/]node_modules[\\/]/,
				proiority: -10,
				name: 'vendors'
			}
		}
	}
}
```

### happypack
webpack 多线程打包
```
npm i happypack
```

### webpack 自带优化
#### tree shaking
webpack 2.0 以上提供。  
在`mode='production'`时，webpack 会打开tree-shaking，引入模块方式为 EM module import 才有效，只支持静态引入的方法。  
在`mode='development'`时使用需要在webpack config 文件中配置：
```
optimization: {
	usedExports: true
}
```
在 package json 中配置：
```json
"sideEffects": ["@babel/pollyfill", "*.css"]
```
development 模式中不会删除代码。

scope hosting 作用域提升，在 webpack 中会自动省略一些可以简化的代码

### code splitting
代码分割和 webpack 无关  
webpack 实现代码分割，两种方式：
- 同步代码： 只需要在webpack.common.js 中做 optimization 的配置
- 异步代码（import）：无需做任何配置，会自动进行代码分割放置到新的文件中。

```js
optimization: {
  splitChunks: {
    chunks: 'async', // 只对异步代码做分割，如果设置为 all 还会看 cacheGroup 中的内容
    minSize: 30000, // 单位字节，相当于30kb,当打包的库大于该值就做代码分割
    maxSize: 0, // 可配可不配，超过数值会做更细小分割
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    automaticNameDelimiter: '~',
    name: true,
    cacheGroups: {
	  vendors: {
		test: /[\\/]node_modules[\\/]/,
		proiority: -10, // 打包的优先级
		filename: 'vendors.js'
	  },
	  default: {
		proiority: -20,
		reuseExistingChunk: true,
		filename: 'common.js'
	  }
    }
  }
}
```

### 多页面打包抽离公共代码 
只有多页应用（有多个入口文件）需要抽离公共代码，单页只有一个入口文件不需要。
```
optimization: {
  splitChunks: { // 分割代码块，以前的是 commonChunkPlugins
	cacheGroups: { // 缓存组
	  common:{ // 公共的模块
		chunks: 'initial',
		minSize: 0,
		minChunks: 2, // 引用多少次的需要chouli
	  },
	  vendor: {// 抽离第三方包
		priority: 1, // 添加权重
		test: /node_modules/,
		chunks: 'initial',
		minSize: 0,
		minChunks: 2,	
	  }
    }
  }
}
```
webpack3.0 是用commonChunkPlugins

### 懒加载
使用`import()`语法：
```
npm i @babel/plugin-syntax-dynamic-import -D
```
有魔法注释的特性。  
常用于路由懒加载

### 热更新 Hot Module Replacement
webpack config 文件：
```js
devServer: {
	hot: true,
	hotOnly: true, // 这个设置是即使 hot：true 不生效，也让浏览器不会自动刷新
}

// plugins 部分
new webpack.NamedModulesPlugin(), // 打印更新的模块路径  
new webpack.HotModuleReplacementPlugin(), // 热更新插件  
```
以上在css方面会生效，但是让 js 的改动生效，还需要加入一些代码：
```js
if (module.hot) {
	module.hot.accept('./source.js', () => {
		let str = require('./source.js')
		console.log(str)
	})
}
```

### 打包分析，Preloading，Prefetching
打包分析库：
进入 www.github.com/webpack/analyse
```
webpack --profile --json > stats.json
```
webpack-bundle-analyzer

在浏览器控制台按键：ctrl + shift + p，然后输入关键词：cove

```js
import(/* webpackPrefetch: true */)
```
在做前端性能优化的时候，缓存并不是最重要的点，代码的覆盖率很重要。

### Shimming
垫片 
```js
new webpack.ProvidePlugin({
	$: 'jquery',
	_join: ['lodash', 'join']
})
```

想让每个模块的 this 指向 window 如何做：
```shell
npm i imports-loader -D
```
```js
use: [
	{
		loader: 'babel-loader'
	},
	{
		loader: 'imports-loader?this=>window'
	}
]
```

### 环境变量的使用
```js
// webpack.common.js
module.exports = (env) => {
	if (env && env.production) {
		return merge(commonConfig, prodConfig)
	} else {
		merge(commonConfig, devConfig)
	}
}
```
`package.json`:
```json
"script": {
	"build": "webpack --env.production --config ./build/webpack.common.js"
}
```

### Library 的打包
别人使用你的 library 库代码的方式：
```js
import library from 'library'

const library = require('library')

require(['library'], function() {
})
```
还有通过 script 标签引入 js 文件，然后通过全局变量 library 的方式使用。
webpack 做配置以让各种方式都通用：
```js
output: {
	libraryTarget: 'umd',
	library: 'library',
}
```
externals 配置。

### PWA 的打包配置
使用 workbox-webpack-plugin：
```
npm i workbox-webpack-plugin -D
```
webpack.prod.js:
```js
plugins: [
	new WorkboxPlugin.GenerateSW({
		clientsClaim: true,
		skipWaiting: true

	})
]
```
应用 serviceworker：  
index.js:
```js
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/service-worker.js')
			.then(registration => {
				console.log('done')
			}).catch(error => {

			})
	})
}
```

### TypeScript 的打包配置
```
npm i ts-loader typescript -D
```
create`tsconfig.json`file.
```json
{
	"compilerOptions": {
		"outDir": "./dist",
		"module": "es6",
		"target": "es5",
		"allowJs": true
	}
}
```
引用 lodash 库：
```
npm i @types/lodash -D
```
如何引用：
```js
import * as _ from 'lodash'
```
github search DefinitelyTyped/DefiniteltyTyped TypeSearch

### webpack 性能优化
在尽可能少的模块上应用 loader。  
使用 exclude、include。  

使用 DllPlugin。  

控制包文件大小

thread-loader、parallel-webpack（多页面打包）、happypack 多进程打包

合理使用 sourceMap

结合 stats.json 分析打包结果

开发环境内存编译

开发环境无用插件剔除

### WebpackDevServer 解决单页面应用路由的问题
```
npm i react-router-dom -S
```

```js
import {BrowserRouter, Route} from 'react=router-dom'

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div>
					<Route path='' exact component={}/>
				</div>
			</BrowserRouter>
		)
	}
}
```

webpack.config.js
```js
module.exports = {
	// ...
	devServer: {
		historyApiFallback: true
	}
}
```

historyApiFallback 更多配置：
```
historyApiFallback: {
	rewrites: [{
		form: /abc.html/,
		to: '/index.html'
	}]
}
```
上线的时候还要要求后端小伙伴配置路由。

### tapable
```
npm i tapable
```

### 如何编写一个 loader
loader-utils
`replaceLoader.js`
```js
const loaderUtils = require('loader-utils')

module.exports = function (source) {
	const options = loaderUtils.getOptions(this)
	// const callback = this.async()
	return source.replace('dell', options.name)

	// setTimeout(() => {
	// 	const result = source.replace('dell', options.name)
	// 	callback(null, result)
	// })

}
```
在 loader 里面写异步代码使用`this.async`

简写引入自定义 loader：
webpack.config.js
```js
module.exports = {
	// ...
	resolveLoader: {
		modules: ['node_modules', './loaders']
	}
}
```

### 如何编写一个plugin
事件驱动的插件编写机制。  
`copyright-webpack-plugin`
```js
class CopyrightWebpackPlugin {
	constructor(options) {

	}

	apply(compiler) {
		compiler.hooks.compile.tap('CopyrightWebpackPlugin', (compilation) => {

		})

		compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin', (compilation, cb) => {
			compilation.assets['copyright.txt'] = {
				source: function() {
					return 'copyright by me'
				},
				size: function () {
					return 21
				}
			}
			cb()
		})
	}
}

module.exports = CopyrightWebpackPlugin
```
node 调试打包过程：
```json
"debug": "node --inspect --inspect-brk node_modules/webpack/bin/webpack.js"
```

### 手写 webpack
```
npm link
```
```
npm i babylon @babel/traverse @babel/types @babel/generator -D
```

https://astexplorer.net

```
npm i tapable -S
```

使用自己写的loader：
```
module: {
	rules: [
		{
			test: /\.css$/,
			use: path.resolve(__dirname, 'loader', 'style-loader.js')
		}
	]
}
```
更方便的写法：
```
resolveLoader:{
	modules: ['node_modules', path.resolve(__dirname, 'loader')]
	// 别名
	// alias: {
	// 	style-loader: path.resolve(__dirname, 'loader', 'style-loader.js')
	// }
},
module: {
	rules: [
		{
			test: /\.css$/,
			use: 'style-loader'
		}
	]
}
```
loader 的顺序，从右向左 从下到上

loader 的分类：pre 在前面 post 在后面 normal，使用 enforce 设置
```
// -! 不会让文件 再去通过 pre + normal loader 来处理了
// ! 没有 normal
// !! 什么都不要
let str = require('-!inline-loader!./a.js')
```
loader 默认是由两部分组成 pitch normal
pitch 有返回值时 会打断loader 执行顺序
```
// loader.js
function loader (source) {
	return source
}

loader.pitch = function() {

}

module.exports = loader
```

### 实现 babel-loader
```
yarn add @babel/core @babel/preset-env
```

获取 loader 的 options
```
yarn add loader-utils
```

### 实现 banner-loader
校验 options：
```
yarn add schema-utils
```
在 webpack 设置了 `watch:true`时loader 中引用别的文件改动不会引起webpack 自动打包，需要设置`this.addDependency(options.filename)`将文件添加入依赖。

### 实现 file-loader 、url-loader
获取图片类型：
```
yarn add mime
```

### 实现 css-loader 结合 less-loader style-loader
JSON.stringify(source) 会将换行符等转换成`\r\n`

### 实现 webpack 中的 plugins
#### 文件列表插件
FileListPlugin

#### 内联插件
把资源外联的标签 变成内联的标签

#### 自动上传 webpack 插件
将打包后的文件上传至[https://www.qiniu.com](七牛云)
```
yarn add qiniu
```

### 通过 CreateReactApp 深入学习 Webpack 配置
脚手架工具：node 程序。
`.env`文件里可写全局变量。

devtoolModuleFilenameTemplate:解决 sourcemap 定位不准的问题。

### Vue CLI 3.0 配置方法
```
npm i -g @vue/cli
```
手机连上4g，分享热点。  

vue.config.js：
```js
module.exports = {
	outputDir: 'dell',
	pages: {
		index: {

		}.
		list: {

		}
	},

	configureWebpack: {
		devServer: {
			contentBase: [path.resolve(__dirname, 'static')]
		}
	}
}
```