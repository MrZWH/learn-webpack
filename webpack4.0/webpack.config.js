let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let OptimizeCss = require('optimize-css-assets-webpack-plugin')
let UglifyJsPlugin = require('uglifyjs-webpack-plugin')
let webpack = require('webpack')

module.exports = {
	optimization: { // 优化项，mode: 'development' 时不会走优化项
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true, // 是否并行打包
				sourceMap: true
			}),
			new OptimizeCss()
		]
	},
	devServer: {
		port: 3000,
		progress: true,
		contentBase: './build', // 以什么目录启动服务
		compress: true, // gzip 压缩
	},
	mode: 'development',
	entry: './src/index.js',
	output: {
		filename: 'bundle.[hash:8].js',
		path: path.resolve(__dirname, 'build'),
		// publicPath: 'http://www.xxx.com',
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				use: 'html-withimg-loader'
			},
			// {
			// 	test: require.resolve('jquery'),
			// 	use: 'expose-loader?$'
			// },
			{
				test: /\.js$/,
				use： {
					loader: 'eslint-loader',
					options: {
						enforce: 'pre', // previous post
					}
				}
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				include: path.resolve(__dirname, 'src'),
				use: {
					loader: 'babel-loader',
					options: {
						presets: [ // 大插件的集合
							'@babel/preset-env'
						],
						plugins: [ // 小插件
							['@babel/plugin-proposal-decorators', {'legacy': true}],
							['@babel/plugin-proposal-class- properties', {"loose": true}],
							"@babel/plugin-transform-runtime"
						]
					}
				}
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			},
			{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'less-loader'
				]
			},
			{
				test: /\.(png|jpg|gif)$/,
				// use: 'file-loader'
				use: {
					loader: 'url-loader',
					options: {
						// limit: 200 * 1024 // 200 kb
						limit: 1,
						outputPath: '/img/',
						publicPath: 'http://www.xxx.com' // 若只想给图片 CDN
					}
				}
			}
		]
	}
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
			minify: { // 用于压缩 html
				removeAttributeQuotes: true, // 去掉属性的双引号
				collapseWhitespace: true, // 折叠成一行
			}，
			hash: true,
		}),
		new MiniCssExtractPlugin({
			filename: 'css/main.css'
		}),
		new webpack.ProvidePlugin({ // 向每个模块注入 jquery 不需使用 import 
			$: 'jquery'
		})
	],
	externals: {
		jquery: '$'
	}
}