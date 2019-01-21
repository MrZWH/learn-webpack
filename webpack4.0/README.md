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