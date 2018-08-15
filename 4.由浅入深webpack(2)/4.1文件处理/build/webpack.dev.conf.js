const webpack = require('webpack')
const proxy = require('./proxy')
const historyFallback = require('./historyfallback')

module.exports = {
	devtool: 'cheap-module-source-map',
	devServer: {
		port: 9001,
		overlay: true,
		proxy: proxy,
		hot: true,
		hotOnly: true,
		// historyApiFallback: true
		historyApiFallback: historyFallback
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin()
	]
}