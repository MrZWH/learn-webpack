var path = require('path')
var webpack = require('webpack')
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
var PurifyCSS = require('purifycss-webpack')
var glob = require('glob-all')
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
						},
						{
							loader: 'less-loader'
						}
					]
				})
			},
			{
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['env'],
							plugins: ['lodash']
						}
					}
				]
			}
		]
	},
	plugins: [
		new ExtractTextWebpackPlugin({
			filename: '[name].min.css',
			allChunks: false // 默认是false 异步加载的css 不单独打包
		}),
		new PurifyCSS({
			paths: glob.sync([
				path.join(__dirname, './*.html'),
				path.join(__dirname, './src/*.js')
			])
		}),
		new webpack.optimize.UglifyJSPlugin()
	]
}