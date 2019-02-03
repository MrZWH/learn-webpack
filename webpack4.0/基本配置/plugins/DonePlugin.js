class DonePlugin {
	apply(comiler) { // compiler.hooks
		comiler.hooks.done.tap('DonePlugin', (stats) => {
			console.log('编译完成')
		})
	}
}

module.exports = DonePlugin