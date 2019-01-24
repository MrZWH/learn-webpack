// import 'bootstrap'
// import React from 'react'
// import {render} from 'react-dom'

// render(<h1>jsx</h1>, window.root)
// import moment from 'moment'

// 手动引入所需要的语言
// import 'moment/locale/zh-cn'

// moment.locale('zh-cn')

// import './a.js'
// import './b.js'
// console.log('index.js')

// import $ from 'jquery'

// console.log($)


// let button = document.createElement('button')
// button.innerHTML = 'hello'
// button.addEventListener('click', function(){
// 	// console.log('click')
// 	import('./source.js').then(data => {
// 		console.log(data.default)
// 	})
// })

// document.body.appendChild(button)


import str from './source.js'
console.log(str)

if (module.hot) {
	module.hot.accept('./source.js', () => {
		let str = require('./source.js')
		console.log(str)
	})
}