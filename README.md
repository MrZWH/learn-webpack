[webpack 3 版本](./webpack3.0/README.md)  
[webpack 4 版本](./webpack4.0/README.md) 

### what is webpack ?
是模块打包工具

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

### 一些技巧
`npx`的使用会先查找你本地的 `node_modules`里的包,只在本地安装的 webpack 可以使用如下命令调用:
```
npx webpack <入口文件>
```

查看某个包的版本信息等:
```
npm info webpack
```