var webpack = require('webpack')
var path = require('path')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
	entry: {
		'pageA': './src/pageA',
		'pageB': './src/pageB',
		'vendor': ['lodash']
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath: './dist/',
		filename: '[name].bundle.js',
		chunkFilename: '[name].chunk.js'
	},
	plugins: [
		new BundleAnalyzerPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			names: ['vendor'],
			minChunks: 2
		})
	]
	]
}