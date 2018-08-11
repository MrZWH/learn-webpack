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