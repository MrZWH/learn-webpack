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
```
npm i webpack-dev-server -D
```
html-webpack-plugin -D

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

## 处理 JS

#### 将高级语法转换为 es5
安装 babel：
```
npm babel-loader @babel/core @babel/preset-env -D
```
添加 class 类 属性插件：
```
yarn add @babel/plugin-proposal-class- properties -D
```
添加 装饰器 插件：
```
yarn add @babel/plugin-proposal-decorators -D
```
#### 处理 js 语法及校验
对于实例上的 api 语法需要安装特殊插件：
```
yarn add @babel/plugin-transform-runtime -D
npm i @babel/polyfill -S
npm i @babel/runtime -S
```
类似 `'aaaa'.includes("a")` 这种es7 的 api 语法需要在代码中`require('@babel/polyfill')`

安装 eslint： 
```
npm i eslint eslint-loader -D
```
.eslintrc.json 配置文件可以在官网勾选项然后下载  
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
base64 会比源文件大 1/3

#### 打包文件分类
image: `outputPath: 'img/'`
css:
```js
new MiniCssExtractPlugin({
			filename: 'css/main.css'
		}),
```
使用 CDN 需设置`publicPath`，可以设置公共的，也可以单独为 img 配置。

### 打包多页面应用
运用 HtmlWebpackPlugin 插件里面 chunks 参数

### sourcemap
// 源码映射
- source-map 会单独生成 .map 文件
- eval-source-map 不对产生单独文件 但是可以显示行和列
- cheap-module-source-map 不会产生列 但是会生成一个单独的文件，不会和源码关联起来
- cheap-module-eval-source-map 不会产生文件 集成在打包后的文件中 不会产生列

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
```
npm i clean-webpack-plugin -D
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

在服务端启动 webpack：
```
npm i webpack-dev-middleware -D
```

### resolve 属性的配置
- modules 规定模块查找范围
- extensions 没文件后缀时的查找规则
- mainFields 第三方模块源文件查找的先后顺序
- mainFiles 入口文件的名字
- alias 别名

### 定义环境变量
pack.DefinePlugin  
字符串需要外面再加一层双引号

### 区分不同环境
合并 webpack 配置文件：
```
npm i webpack-merge -D
```

### noParse
让 webpack 不去解析分析该模块中的依赖关系库。  
编译 react：
```
npm i @babel/preset-react -D
```

### IgnorePlguin
忽略包中的文件，moment中的所有语言包
### dllPlugin
webpack.DllReferencePlugin  
webpack.DllPlugin
### happypack
webpack 多线程打包
```
npm i happypack
```
### webpack 自带优化
在 `mode='production'`时，webpack 会打开tree-shaking，引入模块方式为 import 才有效。  
scope hosting 作用域提升，在 webpack 中会自动省略一些可以简化的代码

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
常用于路由懒加载

### 热更新
new webpack.NamedModulesPlugin(), // 打印更新的模块路径  
new webpack.HotModuleReplacementPlugin(), // 热更新插件  
还需要加入一些代码：
```
if (module.hot) {
	module.hot.accept('./source.js', () => {
		let str = require('./source.js')
		console.log(str)
	})
}
```

### tapable
```
npm i tapable
```

### 手写 webpack
```
npm link
```
```
npm i  babylon @babel/traverse @babel/types @babel/generator -D
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