// import './css/base.css'
// import './css/common.css'
import base './css/base.css'
import common './css/common.css'

var app = document.getElementById('app')
app.innerHTML = '<div class="'+ base.box +'"></div>'

import(/* webpackChunkName:'a' */'./components/a').then(function (a) {
	console.log(a)
})

// var flag = false

// setInterval(function () {
// 	if (flag) {
// 		base.unuse()
// 	} else {
// 		base.use()
// 	}
// 	flag = !flag
// }, 500)
