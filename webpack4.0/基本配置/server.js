let express = require('express')
let webpack = require('webpack')

// 中间件
let middle = require('webpack-dev-middleware')

let config = require('./webpack.config.js')

let compiler = webpack(config)

let app = new express()
app.use(middle(compiler))

// app.get('/api/user', (req, res) => {
// 	res.json({name: 'jack'})
// })

app.get('/user', (req, res) => {
	res.json({name: 'jack'})
})

app.listen(3000)