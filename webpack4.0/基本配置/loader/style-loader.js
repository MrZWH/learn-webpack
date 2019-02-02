let loaderUtils = require('loader-utils')

function loader(source) {
	let style = `
		let style = document.createElement('style');
		style.innerHTML = ${JSON.stringify(source)}
		document.head.appendChild(style)
	`
	return style
}
// 在 style-loader 上写了 pitch
// style-loader less-loader!css-loader!./index.less
loader.pitch = function (remainingRequest) { // 剩余的请求
	// 让 style-loader 去处理 less-loader!css-loader!./index.less
	// require 路径 返回的就是 css-loader 处理好的结果 require('!!css-loader!less-loader!index.less')
	let str = `
		let style = document.createElement('style');
		style.innerHTML = require(${loaderUtils.stringifyRequest(this, '!!' + remainingRequest)})
		document.head.appendChild(style)
	`
	return str
}

module.exports = loader