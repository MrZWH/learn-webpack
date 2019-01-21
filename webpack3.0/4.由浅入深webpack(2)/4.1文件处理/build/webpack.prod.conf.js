const webpack = require('webpack')
const PurifyWebpack = require('purfycss-webpack')
const HtmlInlineChunkPlugin = require('html-webpack-inline-chunk-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

var path = require('path')
var glob = require('glob-all')

module.exports = {
	plugins: [
		new PurifyWebpack({
			paths: glob.sync([
				'./*.html',
				'./src/*.js'
			])
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest'
		}),
		new HtmlInlineChunkPlugin({
			inlineChunks: ['manifest']
		}),
		new webpack.optimize.UglifyJsPlugin(),
		new CleanWebpackPlugin(['dist']),
	]
}