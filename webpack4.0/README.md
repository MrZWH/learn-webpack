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