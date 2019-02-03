class AsyncPlugin {
	apply(compiler) {
		compiler.hooks.emit.tapAsync('AsyncPlugin', (comliation, cb) => {
			setTimeout(() => {
				console.log('文件发射出来 等一下')
				cb()
			}, 1000)
		})

		compiler.hooks.emit.tapPromise('AsyncPlugin', (comliation) => {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					console.log('more 1 second')
					resolve()
				}, 1000)		
			})
		})
	}
}

module.exports = AsyncPlugin