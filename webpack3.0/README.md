## webpack 3.0

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
localIdentName: 该配置用于设置类名模式，`'[path][name]__[local]--[hash:base64:5]'` 

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

### 开发环境和生产环境
开发环境：
- 模块热更新
- sourceMap
- 接口代理
- 代码规范检查
生产环境：
- 提取公用代码
- 压缩混淆
- 文件压缩或是base64编码
- 去除无用代码
共同点：
- 同样的入口
- 同样的代码处理（loader处理）
- 同样的解析配置
如何做？
- webpack-merge
- webpack.dev.conf.js
- webpack.prod.conf.js
- webpack.common.conf.js

### 使用 middleware 搭建开发环境
- Express or Koa
- webpack-dev-middleware
- webpack-hot-middleware
- http-proxy-middleware
- connect-history-api-fallback
- opn 打开浏览器
```
--save-dev
```

## 实战场景
### 分析打包结果
- Offical Analyse Tool
- webpack-bundle-analyzer

#### Offical Analyse Tool
- mac: webpack --profile --json > stats.json
- webpack --profile --json | Out-file 'stats.json' - Encoding OEM
- http://webpack.github.io/analyse

#### webpack-bundle-analyzer
- 插件
  - BundleAnalyzerPlugin
- 命令行
  - webpack-bundle-analyzer stats.json

### 打包速度优化
影响打包速度的因素：
- 文件多
- 依赖多
- 页面多
办法一：
- 分开 vendor 和 app
- DllPlugin
- DllReferencePlugin
办法二：
- UglifyJsplugin
  - parallel
  - cache
办法三：
- HappyPack
- HappyPack.ThreadPool
办法四：
- babel-loader
  - options.cacheDirectory
  - include
  - exclude
其他：
- 减少 resolve
- Devtool：去除 sourcemap
- cache-loader
- 升级 node
- 升级 webpack
```js
// webpack.dll.conf.js 专门打包第三方依赖
const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    vue: ['vue', 'vue-router'],
    ui: ['element-ui']
  },

  output: {
    path: path.join(__dirname, '../src/dll/'),
    filename: '[name].dll.js',
    library: '[name]'
  },

  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../src/dll/', '[name]-manifest.json'),
      name: '[name]'
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
}
```

### 长缓存优化
什么是长缓存优化？
为什么需要长缓存？
怎么做到？
场景：
- 改变 app 代码，vendor 变化
解决：
- 提取 vendor
- hash -> chunkhash
- 提取 webpack runtime
场景：
- 引入新模块，模块顺序变化，vendor hash 变化
解决：
- NamedChunksPlugin
- NamedModulesPlugin
场景：
- 动态引入模块时，vendor hash 变化
解决：
- 定义动态模块的 chunk name

### 多页面应用
- 多入口 entry
- 多页面 html
- 每个页面不同的 chunk
- 每个页面不同的参数
实现的方式：
- 多配置
- 单配置

#### 多配置
- 从 webpack 3.1.0 就开始支持
- 也可借助工具 parallel-webpack
  - parallel-webpack --watch
  - parallel-webpack --config
  - 如果不是全局安装 node_modules/parallel-webpack/bin/run.js
优点：
- 可以使用 parallel-webpack 来提高打包速度
- 配置更加独立，灵活
缺点：
不能多页面之间共享代码

#### 单配置
优点：
- 可以共享各个 entry 之间的公用代码
缺点：
- 打包速度比较慢
- 输出内容比较复杂

## Webpack 和 Vue
- 脚手架
- 项目模板
- 配置文件

### Vue-cli
安装到全局：
```
npm install vue-cli -g
vue --help
vue list
```
vue templates:
- simple
- webpack
- webpack-simple
- browserify
- browserify-simple
- pwa
使用模板去初始化项目：
```
vue init <template name> <project name>
// 或
vue init <git repo> <project name>
```

## 总结
### webpack 面试
- 概念
- 配置
- 开发
- 优化

#### 概念问题一：什么是 webpack 和 grunt 和 gulp 有什么不同
答案： webpack 是一个模块打包器，它可以递归的打包项目中的所有模块，最终生成几个打包后的文件。它和其他的工具最大的不同在于它支持 code-splitting、模块化（AMD、ESM、CommonJs）、全局分析。
grunt 和 gulp 都是执行任务的。

#### 概念问题二：什么是 bundle，什么是 chunk，什么是 module？
答案：bundle 是webpack 打包出来的文件，chunk 是指 webpack在进行模块的依赖分析的时候，代码分割出来的代码块，module 是开发中的单个模块。

#### 概念问题二：什么是 loader ？什么是 plugin？
答案：Loaders 是用来告诉webpack 如何转化处理某一类型的文件，并且引入到打包出的文件中。Plugin 是用来自定义 webpack 打包过程的方式，一个插件是含有 apply 方法的对象，通过这个方法可以参与到整个 webpack 打包的各个流程（生命周期）

#### 配置问题：如何可以自动生成 webpack 配置？
答案：webpack-cli/vue-cli/etc...脚手架工具

#### 开发问题一： webpack-dev-server 和 http 服务器如 nginx 有什么区别？
答案：webpack-dev-server 使用内存来存储 webpack 开发环境下的打包文件，并且可以使用模块热更新，它比传统的 http 服务对开发更加简单高效。它其实就是 express + hot-middleware。

#### 开发问题二： 什么是模块热更新？
答案：模块热更新是 webpack 的一个功能，它可以使得代码修改过后不用刷新浏览器就可以更新，是高级版的自动刷新浏览器。其实是通过 websoket 推送加回调做到的

#### 优化问题一：什么是长缓存？在 webpack 中如何做到长缓存优化？
答案：浏览器在用户访问页面的时候，为了加快加载速度，会对用户访问的静态资源进行存储，但是每一次代码升级或是更新，都需要浏览器去下载新的代码，最方便和简单的更新方式就是引入新的文件名称。在 webpack 中可以在 output 中 给输出的文件指定 chunkhash，并且分离经常更新的代码和框架代码。通过 NamedModulesPlugin 或是 HashedModuleIdsPlugin 使再次打包文件名不变。

#### 什么是 Tree-shaking？CSS 可以 Tree-shaking 吗？
答案：Tree-shaking 是指在打包中去除那些已经引入了，但是在代码中没有被用到的那些死代码（dead code）。在 webpack 中 Tree-shaking 是通过 uglifyJSPlugin 来 Tree-shaking JS。CSS 需要使用 Purify-CSS。

### Webpack 工程化总结
- 实时编译
- 开发服务
- 自动优化

#### Webpack 工程化思想
- 一切皆为模块
- 急速的调试相应速度
- 优化应该自动完成

#### Webpack 未来
- 零配置？
- 更快，更小？
- Breaking change
