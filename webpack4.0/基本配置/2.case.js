// class SyncHook { // 钩子是同步的
// 	constructor(args) { // agrs => ['name']
// 		this.tasks = []
// 	}
// 	tap(name, task) {
// 		this.tasks.push(task)
// 	}
// 	call(...args) {
// 		this.tasks.forEach((task)=> task(...args))
// 	}
// }

// let hook = new SyncHook(['name'])

// hook.tap('react', function(name) {
// 	console.log('react', name)
// })

// hook.tap('node', function(name) {
// 	console.log('node', name)
// })

// hook.call('zhang')



// SyncBailHook
// class SyncBailHook { // 钩子是同步的
// 	constructor(args) { // agrs => ['name']
// 		this.tasks = []
// 	}
// 	tap(name, task) {
// 		this.tasks.push(task)
// 	}
// 	call(...args) {
// 		let ret; // 当前这个函数的返回值 
// 		let index = 0; // 当前要先执行第一个
// 		do {
// 			this.tasks[index++](...args)
// 		} while(ret === undefined && index < this.tasks.length)
// 	}

// }

// let hook = new SyncBailHook(['name'])

// hook.tap('react', function(name) {
// 	console.log('react', name)
// 	return '停止向下执行'
// })

// hook.tap('node', function(name) {
// 	console.log('node', name)
// })

// hook.call('zhang')



// SyncWaterfallHook
// class SyncWaterfallHook { // 钩子是同步的
// 	constructor(args) { // agrs => ['name']
// 		this.tasks = []
// 	}
// 	tap(name, task) {
// 		this.tasks.push(task)
// 	}
// 	call(...args) {
// 		let [first, ...others] = this.tasks
// 		let ret = first()
// 		others.reduce((a, b) => {
// 			return b(a)
// 		}, ret)
// 	}

// }

// let hook = new SyncWaterfallHook(['name'])

// hook.tap('react', function(name) {
// 	console.log('react', name)
// 	return 'react ok'
// })

// hook.tap('node', function(data) {
// 	console.log('node', data)
// 	return 'node ok'
// })

// hook.tap('webpack', function(data) {
// 	console.log('webpack', data)
// 	return 'webpack ok'
// })

// hook.call('zhang')





// SyncLoopHook
// class SyncLoopHook { // 钩子是同步的
// 	constructor(args) { // agrs => ['name']
// 		this.tasks = []
// 	}
// 	tap(name, task) {
// 		this.tasks.push(task)
// 	}
// 	call(...args) {
// 		this.tasks.forEach( function(tasks) {
// 			let ret
// 			do{
// 				ret = task(...args)
// 			}while (ret!=undefined)
// 		});
// 	}

// }

// let hook = new SyncLoopHook(['name'])

// let total = 0

// hook.tap('react', function(name) {
// 	console.log('react', name)
// 	return ++tatal === 3 ? undefined : '继续学'
// })

// hook.tap('node', function(name) {
// 	console.log('node', name)
// })

// hook.tap('webpack', function(name) {
// 	console.log('webpack', name)
// })

// hook.call('zhang')






// AsyncParallelHook
// class AsyncParallelHook { // 钩子是同步的
// 	constructor(args) { // agrs => ['name']
// 		this.tasks = []
// 	}
// 	tapAsync(name, task) {
// 		this.tasks.push(task)
// 	}
// 	callAsync(...args) {
// 		let finalCallback = args.pop()
// 		let index = 0
// 		let done = () => {
// 			index++
// 			if (index == this.tasks.length) {
// 				finalCallback();
// 			}
// 		}
// 		this.tasks.forEach((task) => {
// 			task(...args. done)
// 		});
// 	}

// }

// let hook = new AsyncParallelHook(['name'])

// let total = 0

// hook.tapAsync('react', function(name, cb) {
// 	setTimeout(()=> {
// 		console.log('node', name)
// 		cb()
// 	}, 1000)
// })

// hook.tapAsync('node', function(name, cb) {
// 	setTimeout(()=> {
// 		console.log('node', name)
// 		cb()
// 	}, 1000)
// })

// hook.callAsync('zhang', () => {
// 	console.log('end')
// })





// class AsyncParallelHook { // 钩子是同步的
// 	constructor(args) { // agrs => ['name']
// 		this.tasks = []
// 	}
// 	tapPromise(name, task) {
// 		this.tasks.push(task)
// 	}
// 	promise(...args) {
// 		let tasks = this.tasks.map((task) => {
// 			return task(...args)
// 		})
// 		return Promise.all(tasks)
// 	}

// }

// let hook = new AsyncParallelHook(['name'])

// let total = 0

// hook.tapPromise('react', function(name) {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(()=> {
// 			console.log('node', name)
// 			resolve()
// 		}, 1000)
// 	})
// })

// hook.tapPromise('node', function(name) {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(()=> {
// 			console.log('node', name)
// 			resolve()
// 		}, 1000)
// 	})
// })

// hook.callAsync('zhang').then(() => {
// 	console.log('end')
// })






// AsyncSeriesHook
// 异步串行
// class AsyncSeriesHook { // 钩子是同步的
// 	constructor(args) { // agrs => ['name']
// 		this.tasks = []
// 	}
// 	tapAsync(name, task) {
// 		this.tasks.push(task)
// 	}
// 	callAsync(...args) {
// 		let finalCallback = args.pop()
// 		let index = 0
// 		let next = () => {
// 			if (this.tasks.length === index) {
// 				return finalCallback()
// 			}
// 			let task = this.tasks[index++]
// 			task(...args, next)
// 		}
// 		next()
// 	}

// }

// let hook = new AsyncSeriesHook(['name'])

// let total = 0

// hook.tapAsync('react', function(name,cb) {
// 	setTimeout(()=> {
// 		console.log('node', name)
// 		cb()
// 	}, 1000)
// })

// hook.tapAsync('node', function(name,cb {
// 	setTimeout(()=> {
// 		console.log('node', name)
// 		cb()
// 	}, 1000)
// })

// hook.callAsync('zhang', () => {
// 	console.log('end')
// })




// 异步串行 promise 版
class AsyncSerieslHook { // 钩子是同步的
	constructor(args) { // agrs => ['name']
		this.tasks = []
	}
	tapPromise(name, task) {
		this.tasks.push(task)
	}
	promise(...args) {
		let [first, ...others] = this.tasks
		return others.reduce((p, n) => {
			return p.then(() => n(...args))
		}, first(...args))
	}

}

let hook = new AsyncSerieslHook(['name'])

let total = 0

hook.tapPromise('react', function(name) {
	return new Promise((resolve, reject) => {
		setTimeout(()=> {
			console.log('node', name)
			resolve()
		}, 1000)
	})
})

hook.tapPromise('node', function(name) {
	return new Promise((resolve, reject) => {
		setTimeout(()=> {
			console.log('node', name)
			resolve()
		}, 1000)
	})
})

hook.callAsync('zhang').then(() => {
	console.log('end')
})