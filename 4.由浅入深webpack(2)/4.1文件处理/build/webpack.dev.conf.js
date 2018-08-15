const webpack = require('webpack')

module.exports = {
	devtool: 'cheap-module-source-map',
	devServer: {
		port: 9001,
		overlay: true,
		proxy: {
			'/api': {
				target: 'https://m.weibo.cn',
				changeOrigin: true,
				logLevel: 'debug',
				pathRewrite: {
					'^/comments': '/api/comments'
				},
				headers: {
					'Cookie': ''
				}
			}
		},
		hot: true,
		hotOnly: true,
		// historyApiFallback: true
		historyApiFallback: {
			rewrites: [
				{
					// from: '/pages/a',
					from: /^\/([a-zA-Z0-9]+\/?)([a-zA-Z0-9]+)/,
					// to: '/pages/a.html'
					to: function (context) {
						return '/' + context.match[1] + context.match[2] + '.html'
					}
				}
			]
		}
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin()
	]
}