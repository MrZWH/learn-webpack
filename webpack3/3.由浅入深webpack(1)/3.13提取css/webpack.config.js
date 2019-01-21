var path = require('path')
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

module.exports = {
	entry: {
		app: './src/app.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: './dist/'
		filename: '[name].bundle.js',
		chunkFilename: '[name].bundle.js' // 动态打包的文件名
	},
	module: {
		rules: [
			{
				test: /\.less$/,
				use: ExtractTextWebpackPlugin.extract({
					fallback: {
						loader: 'style-loader'
						options: {
							singleton: true,
							transform: './css.transform.js'
						}
					},
					use: [
						{
							loader: 'css-loader'
							options: {
								minimize: true,
								modules: true，
								localIdentName: '[path][name]__[local]--[hash:base64:5]'
							}
						},
						{
							loader: 'less-loader'
						}
					]
				})
			}
		]
	},
	plugins: [
		new ExtractTextWebpackPlugin({
			filename: '[name].min.css',
			allChunks: false // 默认是false 异步加载的css 不单独打包
		})
	]
}