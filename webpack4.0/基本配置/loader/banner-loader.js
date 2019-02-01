let loaderUtils = require('loader-utils')
let validateOptions = require('schema-utils')
let fs = require('fs')

function loader (source) {
	this.cacheable && this.cacheable()
	let options = loaderUtils.getOptions(this)
	let cb = this.async()
	let schema = {
		type: 'object',
		properties: {
			text: {
				type: 'string',
			},
			filename: {
				type: 'string'
			}
		}
	}
	validateOptions(schema, optios, 'banner-loader')
	if (options.filename) {
		this.addDependency(options.filename) // 自动添加文件依赖 使webpack watch 设置时会关联这个文件
		fs.readFile(options.filename, 'utf8', function (err, data) {
			cb(err, `/**${data}**/${source}`)
		})
	} else {
		cb(null, `/**${options.text}**/${source}`)
	}
}

module.exports = loader