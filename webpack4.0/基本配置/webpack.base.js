let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let OptimizeCss = require('optimize-css-assets-webpack-plugin')
let UglifyJsPlugin = require('uglifyjs-webpack-plugin')
let webpack = require('webpack')
let cleanWebpackPlugin = require('clean-webpack-plugin')
let copyWebpackPlugin = require('copy-webpack-plugin')
let Happypack = require('happypack')

let FileListPlugin = require('./plugins/FileListPlugin')
let InlineSourcePlugin = require('./plugins/InlineSourcePlugin')
let UploadPlugin = require('./plugins/UploadPlugin.js')

module.exports = {
	optimization: { // 优化项，mode: 'development' 时不会走优化项
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true, // 是否并行打包
				sourceMap: true
			}),
			new OptimizeCss()
		],
		// splitChunks: { // 分割代码块，以前的是 commonChunkPlugins
		// 	cacheGroups: { // 缓存组
		// 		common:{ // 公共的模块
		// 			chunks: 'initial',
		// 			minSize: 0,
		// 			minChunks: 2, // 引用多少次的需要chouli
		// 		},
		// 		vendor: {// 抽离第三方包
		// 			priority: 1, // 添加权重
		// 			test: /node_modules/,
		// 			chunks: 'initial',
		// 			minSize: 0,
		// 			minChunks: 2,	
		// 		}
		// 	}
		// },
	},
	devServer: {
		port: 3000,
		progress: true,
		hot: true,
		open: true, // 自动打开浏览器
		contentBase: './build', // 以什么目录启动服务
		compress: true, // gzip 压缩
		proxy: {
			// '/api': 'http://localhost:3000', //1） 配置一个代理
			// '/api': {
			// 	target: 'http://localhost:3000',
			// 	pathRewrite: {'/api': ''}, // 当后端的接口并没有统一的前缀时，请求还是可以加上自己定义的前缀然后在这里去掉
			// },
			// before(app) { //2） 钩子函数，前端模拟数据时可用
			// 	app.get('/user', (req, res) => {
			// 		res.json({name: 'mary-before'})
			// 	})
			// },
			//3） 有服务端 不用代码来处理 在服务端中启动 webpack 端口用服务端端口
		}
	},
	mode: 'production',
	entry: './src/index.js',
	// entry: { // 多页应用抽离公共代码
	// 	index: './src/index.js',
	// 	other: './src/other.js'
	// },
	output: {
		filename: 'bundle.[hash:8].js',
		path: path.resolve(__dirname, 'build'),
		// publicPath: 'http://www.xxx.com',
	},
	// watch: true, // 实时编译
	// watchOptions: { // 监控的选项
	// 	poll: 1000, // 每秒 问 1000 次需要更新吗
	// 	aggregateTimeout: 500, // 防抖 我一直输入代码
	// 	ignored: /node_modules/, // 不需要监控
	// },
	// 源码映射
	// source-map 会单独生成 .map 文件
	// eval-source-map 不对产生单独文件 但是可以显示行和列
	// cheap-module-source-map 不会产生列 但是会生成一个单独的文件，不会和源码关联起来
	// cheap-module-eval-source-map 不会产生文件 集成在打包后的文件中 不会产生列
	devtool: 'cheap-module-eval-source-map',
	resolve: { // 解析 第三方包 common 规范中先查找当前目录下的 node_modules，找不到再去上层查找
		modules:[path.resolve('node_modules')], // 配置了这个，找的时候就在当前目录下找不要再去上层目录找了
		extensions: ['.js'],
		// mainFields: ['style', 'main'], // 先找 style 找不到就找 main
		// mainFiles: [], // 入口文件的名字，默认是 index.js
		// alias: { // 别名 vue vue.runtime.js
		// 	bootstrap: 'bootstrap/dist/css/bootstrap.css',
		// },
	},
	resolveLoader:{
		modules: ['node_modules', path.resolve(__dirname, 'loader')]
		// 别名
		// alias: {
		// 	style-loader: path.resolve(__dirname, 'loader', 'style-loader.js')
		// }
	},
	module: {
		noParse: /jquery/, // 让 webpack 不去解析分析该模块中的依赖关系库
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
					loader: 'banner-loader',
					options: {
						text: 'zhang',
						filename: path.resolve(__dirname, 'banner.js')
					}
				}
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
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
							'@babel/preset-env',
							'@babel/preset-react',
						],
						plugins: [ // 小插件
							['@babel/plugin-proposal-decorators', {'legacy': true}],
							['@babel/plugin-proposal-class- properties', {"loose": true}],
							"@babel/plugin-transform-runtime",
							'@babel/plugin-syntax-dynamic-import'
						]
					}
				},
				// use: 'Happypack/loader?id=js'
			},
			{
				test: /\.css$/,
				// use: [
				// 	MiniCssExtractPlugin.loader,
				// 	'css-loader'
				// ],
				use: 'Happypack/loader?id=css'
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
						// limit: 200 * 1024 // 200 kb 单位字节
						limit: 1,
						outputPath: '/img/',
						publicPath: 'http://www.xxx.com' // 若只想给图片 CDN
					}
				}
			}
		]
	},
	plugins: [
		// new Happypack({
		// 	id: 'js',
		// 	use: [{
		// 		loader: 'babel-loader',
		// 		options: {
		// 			presets: [ // 大插件的集合
		// 				'@babel/preset-env',
		// 				'@babel/preset-react',
		// 			],
		// 			plugins: [ // 小插件
		// 				['@babel/plugin-proposal-decorators', {'legacy': true}],
		// 				['@babel/plugin-proposal-class- properties', {"loose": true}],
		// 				"@babel/plugin-transform-runtime"
		// 			]
		// 		}
		// 	}],
		// }),
		new Happypack({
			id: 'css',
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader'
			]
		}),
		// new webpack.DllReferencePlugin({
		// 	manifest:path.resolve(__dirname, 'dist', 'manifest.json')
		// }),
		new webpack.IgnorePlguin(/\.\/locale/, /moment/), // 忽略包中的文件，moment中的所有语言包
		new webpack.DefinePlugin({
			// DEV: "'devlopment'", // 字符串要加双引号，也可以像下面方式写
			DEV: JSON.stringify('devlopment'),
			FLAG: 'true', // 有些需要 Boolean 值的就可以这样写
			EXPORESSION: '1+1', // 也可以写表达式
		}),
		new HtmlWebpackPlugin({
			template: './public/index.html',
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
		// new webpack.ProvidePlugin({ // 向每个模块注入 jquery 不需使用 import 
		// 	$: 'jquery'
		// }),
		// new cleanWebpackPlugin('./dist'),
		// new copyWebpackPlugin([
		// 	{from: './doc', to: './'}
		// ]),
		// new webpack.BannerPlugin('make 2019 by'),
		new webpack.NamedModulesPlugin(), // 打印更新的模块路径
		new webpack.HotModuleReplacementPlugin(), // 热更新插件
		new FileListPlugin({
			filename: 'list.md'
		}), // 自定义插件
		// new InlineSourcePlugin({
		// 	match: /\.(js|css)/,
		// }),
		new UploadPlugin({
			bucket: 'xxstatic', // 存储空间列表
			domain: '外链默认域名自己买的域名',
			accessKey: '个人面板-个人中心-密钥管理-AK',
			secretKey: '个人面板-个人中心-密钥管理-SK',
		})
	],
	// externals: {
	// 	jquery: '$'
	// }
}