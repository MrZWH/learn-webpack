# learn-webpack
### webpack 的诞生
- Tobias Koppers （github：@sokra）
- GWT (Google Web Toolkit)
- Pull request
- Webpack
- Instagram
### 为什么需要构建
- 开发分工的变化
- 框架的变化
- 语言的变化
- 环境的变化
- 社区的变化
- 工具的变化
- 开发复杂化
- 语言编译化
- 开发模块化
- 框架去中心化
### 为什么 Webpack
- Vue-cli/React-starter/Angular-cli
- Code-splitting
- 天生的模块化
### 模块化开发
- JS 模块化
  - 命名空间
    - 库名.类别名.方法名
  - COMMONJS
    - Modules/1.1.1
    - 一个文件一个模块
    - 通过 module.exports 暴露模块接口
    - 通过 require 引入模块
    - 同步执行
    - http://wiki.commonjs.org/wiki/Modules/1.1.1
  - AMD/CMD/UMD
    - Async Module Definition 
    - 使用 define 定义模块
    - 使用 require 加载模块
    - RequireJS
    - 依赖前置，提前执行
    - https://github.com/amdjs/amdjs-api/wiki/AMD
    - Common Module Definition
    - 一个文件一个模块 
    - 使用 define 定义模块
    - 使用 require 加载模块
    - SeaJS
    - 尽可能懒执行
    - https://github.com/cmdjs/specification/blob/master/draft/module.md
    - Universal Module Definition 通用解决方案 
    - 三个步骤
      - 判断是否支持 AMD
      - 判断是否支持 CommonJS
      - 如果都没有使用全局变量
  - ES 6 module
    - EcmaScript Module
    - 一个文件一个模块
    - export/import
- CSS 模块化
  - CSS 设计模式
    - OOCSS
    - SMACSS
    - Atomic CSS
    - MOCSS
    - AMCSS
    - BEM
  - CSS Modules
### 环境准备
mac：
- Terminal
- iTerm2：http://www.iterm2.com/
- Zsh:http://ohmyz.sh/
### Webpack 简介
- webpack 概述
  - 官网：https://webpack.js.org/
  - 中文官网：https://doc.webpack-china.org/
- webpack 版本更迭
- webpack 功能进化
  - Webpack V1
    - 编译、打包
    - HMR（模块热更新）
    - 代码分割
    - 文件处理
  - Webpack V2
    - Tree Shaking
    - ES module
    - 动态 Import
    - 新的文档
  - Webpack V3
    - Scope Hoisting（作用域提升）
    - Magic Comments（配合动态 import 使用）
- 版本迁移
### 核心概念
- Entry
- Output
- Loaders
- Plugins
#### Entry
- 代码的入口
- 打包的入口
- 单个或多个
#### Output
- 打包成的文件（bundle）
- 一个或多个
- 自定义规则
- 配合CDN
```js
module.exports = {
  entry: 'index.js',
  output: {
    filename: 'index.min.js'
  }
}
```
```js
module.exports = {
  entry: {
    index: 'index.js',
    vendor: 'vendor.js'
  },
  output: {
    filename: '[name].min.[hash:5].js'
  }
}
```
#### Loaders
- 处理文件
- 转化为模块
#### Plugins
- 参与打包整个过程
- 打包优化和压缩
- 配置编译时的变量
- 极其灵活
- 优化相关
  - CommonsChunkPlugin（提取公共代码）
  - UglifyjsWebpackPlugin
- 功能相关
  - ExtractTextWebpackPlugin（将css打包成单独一个文件
  - HtmlWebpackPlugin
  - HotModuleReplacementPlugin
  - CopyWebpackPlugin
  ## 由浅入深 Webpack
### 使用 webpack
- Webpack 命令
  - webpack -h
  - webpack -v
  - webpack <entry> [<entry>] <output>
- Webpack 配置
  - webpack
  - webpack --config webpack.conf.dev.js
- 第三方脚手架 
  - Vue-cli
  - Angular-cli
  - React-starter
#### Webpack-Cli
- 交互式的初始化一个项目
- 迁移项目！V1 -> V2
### 打包 JS
### 编译 es 6/7
- Babel
  - Babel-loader
  - bebeljs.io
  - npm install babel-loader@8.0.0-beta.0 @babel/core
  - npm install --save-dev babel-loader babel-core
- Babel-presets
  - es2015
  - es2016
  - es2017
  - env
  - babel-preset-react
  - babel-preset-stage 0 - 3
  - targets
  - targets.browsers
  - targets.browsers: "last 2 versions"
  - targets.browsers: "> 1%"
  - browserslist
  - Can i use 
  - npm install @babel/preset-env --save-dev
  - npm  install babel-preset-env --save-dev
- Babel-plugin
  - Babel Polyfill
    - 全局垫片
    - 为应用准备的
    - npm install babel-polyfill --save
    - import "babel-polyfill"
  - Babel Runtime Transform
    - 局部垫片
    - 为开发框架准备
    - npm install babel-plugin-transform-runtime --save-dev
    - npm install babel-plugin-runtime --save
    - npm install @babel/runtime --save 安装的babel为最新版时的安装
    - npm install @babel/plugin-transform-runtime --save-dev
### 编译 typescript
typescript：
- JS 的超集
- typescriptlang.org/tslang.cn
- 来自 Microsoft
typescript-loader
安装：
- npm i typescript ts-loader --save-dev
- npm i typescript awesome-typescript-loader --save-dev
配置：
- tsconfig.json
- webpack.config.js
tsconfig:
配置选项：官网/docs/handbook/compiler-options.html
常用选项：compilerOptions、include、exclude
#### 声明文件
- npm install @types/lodash
- npm install @types/vue
#### Typings
- npm install typings
- typings install lodash
### 打包公共代码
提取公共代码：
- 减少代码冗余
- 提高加载速度
#### CommonsChunkPlugin
webpack.optimize.CommonsChunkPlugin 
#### 配置
```js
{
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(option)
  ]
}
```
- options.name or options.names
- options.filename
- options.minChunks 要提取公共代码最小出现次数
- options.chunks 提取功能代码的范围
- options.children
- options.deepChildren
- options.async
场景：
- 单页应用 
- 单页应用 + 第三方依赖
- 单页应用 + 第三方依赖 + webpack 生成代码
### 代码分割和懒加载
- webpack methods
- ES 2015 Loader spec
#### webpack methods
- require.ensure
  - []: dependencies 这里加载的依赖只会加载代码不会执行
  - callback
  - errorCallback
  - chunkName
- require.include
#### ES 2015 Loader spec
- System.import() -> import()
- import() -> Promise
- import().then()
#### webpack import function
```js
import(
  /*webpackChunkName:async-chunk-name*/
  /*webpackMode:lazy*/
  modulename
)
```
#### 代码分割应用场景
- 分离业务代码 和 第三方依赖
- 分离业务代码 和 业务公共代码 和 第三方依赖
- 分离首次加载 和 访问后加载的代码
### style-loader
主要是创建style标签
- style-loader
- style-loader/url 生成 link 标签
- style-loader/useable 可以控制style标签的存在与否
配置：
- options
  - insertAt (插入位置)
  - insertInto （插入到 dom）
  - singleton （是否只使用一个 style 标签）
  - transform （转化，浏览器环境下，插入页面前）
### css-loader
options
 - alias (解析的别名)
 - importLoader (@import)
 - Minimize (是否压缩)
 - modules (启用 css-modules)
#### CSS-Modules
:local 给本地局部加个样式
:global 给全局样式
compose 继承一个样式
compose ... from path
localIdentName: '[path][name]__[local]--[hash:base64:5]'  改配置用于设置类名模式
### 配置 Less/Sass
npm install less-loader less --save-dev
npm install sass-loader node-sass --save-dev
### 提取 CSS
- extract-loader
- ExtractTextWebpackPlugin 主流
npm install extract-text-webpack-plugin --save-dev
并不会自动的将打包出来的css 引入html中，需要手动link
### PostCSS in Webpack
#### PostCSS
A tool for transforming CSS with javascript
安装：
  - postcss
  - postcss-loader
  - autoprefixer
  - cssnano 压缩css
  - postcss-cssnext
#### Browserslist
所有插件都共用
- package.json
- .borwserslist
#### 其他
- postcss-import
- postcss-url
- postcss-assets
### Tree Shaking
- JS Tree Shaking
- CSS Tree Shaking
#### 使用场景
- 常规优化
- 引入第三方库的某一个功能 有些第三方库并不能很好的支持 tree shaking，比如lodash，需要安装`npm install babel-loader babel-core babel-preset-env babel-plugin-lodash --save-dev`
#### JS Tree Shaking
- webpack.optimize.UglifyJSPlugin
#### CSS Tree Shaking
- Purify CSS
  - https://github.com/purifycss/purifycss
  - purifycss-webpack npm install purifycss-webpack --save-dev
options
  - paths: glob.sync([])
  - npm install glob-all --save-dev
purify 和 css module不能一块用，不过可以在purify的option中设置一些css-module的白名单来使用
## 由浅入深webpack(2)
### 文件处理-图片处理-CSS中引入图片、Base64编码
文件处理：
- 图片处理
- 字体文件
- 第三方 JS 库
#### 图片处理
- CSS 中引入的图片
- 自动合成雪碧图
- 压缩图片
- Base64 编码
插件：
- file-loader
- url-loader 用于base64编码
- img-loader 压缩图片
- postcss-sprites 合成雪碧图
### 处理字体文件
- file-loader
- url-loader
### 第三方 JS 库
- webpack.providePlugin
- imports-loader
- window
### HTML in Webpack 生成 html
```
npm install html-webpack-plugin --save-dev
```
- HtmlWebpackPlugin
- options
  - template
  - filename
  - minify
  - chunks
  - inject
### HTML 中引入的图片
```
npm i html-loader -D
```
- html-loader
- options
  - attrs: [img: src]
### 配合优化
提前载入webpack 加载代码
- inline-manifest-webpack-plugin
- html-webpack-inline-chunk-plugin
```
npm i html-webpack-inline-chunk-plugin -D
npm i babel-core babel-loader babel-preset-env =D
```
## Webpack 环境配置
搭建开发环境
- webpack watch mode
- webpack-dev-server
- express + webpack-dev-middleware
### webpack watch mode
```
webpack -watch
webpack -w --progress --display-reasons --color
```
让每次打包之前的文件都清除掉
```
npm install clean-webpack-plugin --save-dev
```
### webpack-dev-server
官方提供的web开发服务器
支持哪些功能：
- live reloading
- 打包文件？ No
- 路径重定向
- https
- 浏览器中显示编译错误
- 接口代理
- 模块热更新
devServer
- inline
- contentBase
- port
- historyApiFallback
- https
- proxy
- hot
- openpage
- lazy
- overlay
```
npm install webpack-dev-server --save-dev
node_modules/.bin/webpack-dev-server --open
```
### Proxy
- 代理远程接口请求
- http-proxy-middleware
- devServer.proxy
#### http-proxy-middleware
options:
- target
- changeOrigin
- headers
- logLevel
- pathRewrite
### Module Hot Reloading
- 保持应用的数据状态
- 节省调试时间
- 样式调试更快

- devServer.hot
- webpack.HotModuleReplacementPlugin
- webpack.NamedModulesPlugin
- module.hot
- module.hot.accept 接收两个参数，第一个参数是依赖，第二个是当依赖更新时的回调
- module.hot.decline
### Source Map 调试
- JS source map
- CSS source map
开启 source map：
- Devtool
- webpack.SourceMapDevToolPlugin
- webpack.EvalSourceMapDevToolPlugin
在开发环境 development：
- eval
- eval-source-map
- cheap-eval-source-map √
- cheap-module-eval-source-map
Production：
- source-map √
- hidden-source-map
- nosource-source-map
关于css 的：
css-loader.options.sourceMap
less-loader.options.sourceMap
sass-loader.options.sourceMap
### EsLint 检查代码格式
安装：
- eslint
- eslint-loader
- eslint-plugin-html 在html中script中检查js
- eslint-friendly-formatter
配置 ESLint：
- webpack config
- .eslintrc.*
- package.json 中的 eslintConfig
如何告诉使用何种标准： 推荐 Javascript Standard Style（https://standardjs.com/ )
支持这个标准需要安装：
- eslint-config-standard
- eslint-plugin-promise
- eslint-plugin-standard
- eslint-plugin-import
- eslint-plugin-node

eslint-loader 设置的一些参数：
- options.failOnWarning 默认是 false 为 true是发现代码有warning 不予编译
- options.failOnError
- options.formatter
- options.outputReport
devServer.overlay