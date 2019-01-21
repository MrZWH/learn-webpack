var webpack = require('webpack')
var PurifyWebpack = require('purfycss-webpack')
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlInlineChunkPlugin = require('html-webpack-inline-chunk-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')

var path = require('path')
var glob = require('glob-all')

var extractLess = new ExtractTextWebpackPlugin({
	filename: 'css/[name].bundle-[hash:5].css',
})

module.exports = {
	entry: {
		app: './src/app.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		// publicPath: './dist/',
		publicPath: '/',
		filename: 'js/[name].bundle-[hash:5].js',
	},
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
	resolve: {
		alias: {
			jquery$: path.resolve(__dirname, 'src/libs/jquery.min.js')
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				include: [path.resolve(__dirname, 'src')],
				exclude: [path.resolve(__dirname, 'src/libs')],
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['env']
						}
					},
					{
						loader: 'eslint-loader',
						options: {
							formatter: require('eslint-friendly-formatter')
						}
					}
				]
			},
			{
				test: /\.less$/,
				use: extractLess.extract({
					fallback: {
						loader: 'style-loader'
						options: {
							// singleton: true,
							sourceMap: true,
							// transform: './css.transform.js'
						}
					},
					use: [
						{
							loader: 'css-loader'
							options: {
								importLoaders: 2,
								sourceMap: true,
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								sourceMap: true,
								ident: 'postcss',
								plugins: [
									require('postcss-sprites')({
										spritePath: 'dist/assets/imgs/sprites',
										retina: true
									}),
									require('postcss-cssnext')()
								]
							}
						},
						{
							loader: 'less-loader',
							options: {
								sourceMap: true,
							}
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
							name: '[name]-[hash:5].[ext]',
							limit: 1000,
							// publicPath: '',
							outputPath: 'assets/imgs/',
							// useRelativePath: true,
						}
					},
					{
						loader: 'img-loader',
						options: {
							pngquant: {
								quality: 80
							}
						}
					}
				]
			},
			{
				test: /\.(eot|woff2|woff|ttf|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							name: '[name]-[hash:5].[ext]',
							limit: 5000,
							publicPath: '',
							outputPath: 'dist/',
							useRelativePath: true
						}
					}
				]
			},
			// {
			// 	test: path.resolve(__dirname, 'src/app.js'),
			// 	usr: [
			// 		{
			// 			loader: 'imports-loader',
			// 			options: {
			// 				$: 'jquery'
			// 			}
			// 		}
			// 	]
			// },
			test: /\.html$/,
			use: [
				{
					loader: 'html-loader',
					options: {
						attrs: ['img:src', 'img:data-src']
					}
				}
			]
		]
	},
	plugins: [
		extractLess,
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
		new webpack.ProvidePlugin({
			$: 'jquery'
		}),
		new HtmlWebpackPlugin({
			template: './index.html',
			// chunks: ['app'],
			minify: {
				collapseWhitespace: true,
			}
			// inject: false
		}),
		new webpack.optimize.UglifyJsPlugin(),
		new CleanWebpackPlugin(['dist']),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin()
	]
}