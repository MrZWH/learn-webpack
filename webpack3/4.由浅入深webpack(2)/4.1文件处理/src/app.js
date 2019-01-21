import base './css/base.css'
import common './css/common.css'
import {a} from './common/util'

var app = document.getElementById('app')
var div = document.createElement('div')
div.className = box
app.appendChild(div)

$('div').addClass('new')

$.get('/api/comments/show', {
	id: '419358675883502',
	page: 1
}, function (data) {
	console.log(data)
})

if (module.hot) {
	module.hot.accept('./commponents/a', function () {
		
	})
}