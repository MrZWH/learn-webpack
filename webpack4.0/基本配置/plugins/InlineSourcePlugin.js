const HtmlWebpackPlugin = require('html-webpack-plugin')

class InlineSourcePlugin {
	constructor({match}) {
		this.reg = match // 正则
	}

	processTag(tag, compilation) { // 处理某一个标签的
		let newTag, url;
		if (tag.tagName === 'link' && this.reg.test(tag.attributes.href)) {
			newTag = {
				tagName: 'style',
				attributes: {type: 'text/css'}
			}
			url = tag.attributes.href
		}
		if (tag.tagName === 'script' && this.reg.test(tag.attributes.src)) {
			newTag = {
				tagName: 'script',
				attributes: {type: 'application/javascript'}
			}	
			url = tag.attributes.src
		}

		if (url) {
			newTag.innerHTML = compilation.assets[url].source() // 文件内容
			delete compilation.assets[url] // 删除原有应该生成的资源
			return newTag
		}
		return tag
	}

	processTags(data, compilation) { // 处理引入标签的数据
		let headTags = []
		let bodyTags = []
		data.headTags.forEach((headTag) => {
			headTags.push(this.processTag(headTag, compilation))
		})
		data.bodyTags.forEach((bodyTag) => {
			bodyTags.push(this.processTag(bodyTag, compilation))
		})
		return {...data, headTags, bodyTags}		
	}

	apply(compiler) {
		// 要通过 webpackPlugin 来实现这个功能
		compiler.hooks.compilation.tap('HtmlWebpackPlugin', (compilation) => {
			HtmlWebpackPlugin.getHooks(compilation).alterAssetTapGroups.tapAsync('alterPlugin', (data, cb) => {
				data = this.processTags(data, compilation)
				cb(null, data)
			})
		})
	}
}

module.exports = InlineSourcePlugin