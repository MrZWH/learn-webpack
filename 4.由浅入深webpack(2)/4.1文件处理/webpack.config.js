var webpack = require('webpack')
var path = require('path')
var PurifyWebpack = require('purfycss-webpack')
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
var glob = require('glob-all')

var extractLess = new ExtractTextWebpackPlugin({
	filename: 'css/[name].bundle.css',
})

module.exports = {
	entry: {
		app: './src/app.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: './dist/'
		filename: '[name].bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.less$/,
				use: extractLess.extract({
					fallback: {
						loader: 'style-loader'
						options: {
							singleton: true,
							// transform: './css.transform.js'
						}
					},
					use: [
						{
							loader: 'css-loader'
							options: {
								importLoaders: 2,
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								ident: 'postcss',
								plugins: [
									// require('autoprefixer')(),
									require('postcss-cssnext')()
								]
							}
						},
						{
							loader: 'less-loader'
						}
					]
				})
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				use: [
					// {
					// 	loader: 'file-loader',
					// 	options: {
					// 		publicPath: '',
					// 		outputPath: 'dist/',
					// 		useRelativePath: true,
					// 	}
					// }
					{
						loader: 'url-loader',
						options: {
							limit: 1000,
							publicPath: '',
							outputPath: 'dist/',
							useRelativePath: true,
						}
					},
					{
						loader: 'img-loader'
					}
				]
			}
		]
	},
	plugins: [
		extractLess,
		new PurifyWebpack({
			paths: glob.sync([
				'./*.html',

			])
		})
	]
}