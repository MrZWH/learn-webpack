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
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader'
						// loader: 'style-loader/url'
						// loader: 'style-loader/useable'
						options: {
							insertInto: '#app',
							singleton: true,
							transform: './css.transform.js'
						}
					},
					{
						loader: 'css-loader'
						// loader: 'file-loader'
					}
				]
			}
		]
	}
}