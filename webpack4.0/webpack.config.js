let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	devServer: {
		port: 3000,
		progress: true,
		contentBase: './build', // 以什么目录启动服务
		compress: true, // gzip 压缩
	},
	mode: 'development',
	entry: './src/index.js',
	output: {
		filename: 'bundle.[hash:8].js',
		path: path.resolve(__dirname, 'build')
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
			minify: { // 用于压缩 html
				removeAttributeQuotes: true, // 去掉属性的双引号
				collapseWhitespace: true, // 折叠成一行
			}，
			hash: true,
		})
	]
}