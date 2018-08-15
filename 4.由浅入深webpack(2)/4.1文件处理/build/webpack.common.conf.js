const webpack = require('webpack')
const productionConfig = require('./webpack.prod.conf.js')
const developmentConfig = require('./webpack.dev.conf.js')

const merge = require('webpack-merge')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const path = require('path')

const generateConfig = env => {

	const extractLess = new ExtractTextWebpackPlugin({
		filename: 'css/[name].bundle-[hash:5].css',
	})

	const scriptLoader = ['babel-loader']
		.concat(env === 'production'
			? []
			: [{
				loader: 'eslint-loader',
				options: {
					formatter: require('eslint-friendly-formatter')
				}
			}]
		)
	const cssLoaders = [
		{
			loader: 'css-loader'
			options: {
				importLoaders: 2,
				sourceMap: env === 'development',
			}
		},
		{
			loader: 'postcss-loader',
			options: {
				sourceMap: env === 'development',
				ident: 'postcss',
				plugins: [
					require('postcss-cssnext')()
				].concat(
					env === 'production'
					? require('postcss-sprites')({
						spritePath: 'dist/assets/imgs/sprites',
						retina: true
					})
					: []
				)
			}
		},
		{
			loader: 'less-loader',
			options: {
				sourceMap: env === 'development',
			}
		}
	]

	const styleLoader = env === 'production'
		? extractLess.extract({
			fallback: 'style-loader',
			use: cssLoaders
		})
		: [{
			loader: 'style-loader'
		}].concat(cssLoaders)

	const fileLoader = env === 'development'
		? [{
			loader: 'file-loader',
			options: {
				name: '[name]-[hash:5].[ext]',
				outputPath: 'assets/imgs'
			}
		}]
		: [{
			loader: 'url-loader',
			options: {
				name: '[name]-[hash:5].[ext]',
				limit: 1000,
				// publicPath: '',
				outputPath: 'assets/imgs/',
				// useRelativePath: true,
			}
		}]

	return  {
		entry: {
			app: './src/app.js'
		},
		output: {
			path: path.resolve(__dirname, '../dist'),
			// publicPath: './dist/',
			publicPath: '/',
			filename: 'js/[name].bundle-[hash:5].js',
		},

		resolve: {
			alias: {
				jquery$: path.resolve(__dirname, '../src/libs/jquery.min.js')
			}
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					include: [path.resolve(__dirname, '../src')],
					exclude: [path.resolve(__dirname, '../src/libs')],
					use: scriptLoader
				},
				{
					test: /\.less$/,
					use: styleLoader
				},
				{
					test: /\.(png|jpg|jpeg|gif)$/,
					use: fileLoader.concat(
						env === 'production'
						? {
							loader: 'img-loader',
							options: {
								pngquant: {
									quality: 80
								}
							}
						}
						: []
					)
				},
				{
					test: /\.(eot|woff2|woff|ttf|svg)$/,
					use: fileLoader
				},
				// {
				// 	test: path.resolve(__dirname, '../src/app.js'),
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
			new HtmlWebpackPlugin({
				template: './index.html',
				// chunks: ['app'],
				minify: {
					collapseWhitespace: true,
				}
				// inject: false
			}),
			new webpack.ProvidePlugin({
				$: 'jquery'
			}),
		]
	}
}

module.exports = env => {
	let config = env === 'production'
		? productionConfig
		: developmentConfig

	return merge(generateConfig(env), config)
}