var path = require('path')

module.exports = {
	entry: {
		app: './src/app.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: './dist/'
		filename: '[name].bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.less$/,
				use: [
					{
						loader: 'style-loader'
						options: {
							singleton: true,
							transform: './css.transform.js'
						}
					},
					{
						loader: 'css-loader'
						options: {
							// minimize: true,
							modules: true，
							localIdentName: '[path][name]__[local]--[hash:base64:5]'
						}
					},
					{
						loader: 'less-loader'
					}
				]
			}
		]
	}
}