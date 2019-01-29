// let {SyncHook} = require('tapble')

// class Lesson {
// 	constructor() {
// 		this.hooks = {
// 			arch: new SyncHook(['name'])
// 		}
// 	}

// 	tap() { // 注册监听函数
// 		this.hooks.arch.tap('node', function(name) {
// 			console.log('node', name)
// 		})
// 		this.hooks.arch.tap('react', function(name) {
// 			console.log('react', name)
// 		})
// 	}

// 	start() {
// 		this.hooks.arch.call('zhang')
// 	}
// }

// let l = new Lesson()
// l.tap() // 注册这两个事件
// l.start(); // 启动钩子




// 同步钩子 SyncBailHook
// let {SyncBailHook} = require('tapble')

// class Lesson {
// 	constructor() {
// 		this.hooks = {
// 			arch: new SyncBailHook(['name'])
// 		}
// 	}

// 	tap() { // 注册监听函数
// 		this.hooks.arch.tap('node', function(name) {
// 			console.log('node', name)
// 			return '想停止学习'
// 		})
// 		this.hooks.arch.tap('react', function(name) {
// 			console.log('react', name)
// 		})
// 	}

// 	start() {
// 		this.hooks.arch.call('zhang')
// 	}
// }

// let l = new Lesson()
// l.tap() // 注册这两个事件
// l.start(); // 启动钩子



// SyncWaterfallHook
// let {SyncWaterfallHook} = require('tapble')

// class Lesson {
// 	constructor() {
// 		this.hooks = {
// 			arch: new SyncWaterfallHook(['name'])
// 		}
// 	}

// 	tap() { // 注册监听函数
// 		this.hooks.arch.tap('node', function(name) {
// 			console.log('node', name)
// 			return 'node 学的还不错'
// 		})
// 		this.hooks.arch.tap('react', function(data) {
// 			console.log('react', data)
// 		})
// 	}

// 	start() {
// 		this.hooks.arch.call('zhang')
// 	}
// }

// let l = new Lesson()
// l.tap() // 注册这两个事件
// l.start(); // 启动钩子




// SyncLoopHook 同步遇到某个不返回 undefined 的监听函数会多次执行
// let {SyncLoopHook} = require('tapble')

// class Lesson {
// 	constructor() {
// 		this.index = 0
// 		this.hooks = {
// 			arch: new SyncLoopHook(['name'])
// 		}
// 	}

// 	tap() { // 注册监听函数
// 		this.hooks.arch.tap('node', (name) => {
// 			console.log('node', name)
// 			return ++this.index === 3 ? undefined : '继续学'
// 		})
// 		this.hooks.arch.tap('react', function(data) {
// 			console.log('react', data)
// 		})
// 	}

// 	start() {
// 		this.hooks.arch.call('zhang')
// 	}
// }

// let l = new Lesson()
// l.tap() // 注册这两个事件
// l.start(); // 启动钩子





// AsyncParallelHook 异步并行钩子
// let {AsyncParallelHook} = require('tapble')
// // 异步的钩子（串行）（并行）需要等待所有并发的异步事件执行后再执行回调方法
// // 同时发送多个请求
// // 注册方法 分为 tap 注册 tapAsync
// class Lesson {
// 	constructor() {
// 		this.index = 0
// 		this.hooks = {
// 			arch: new AsyncParallelHook(['name'])
// 		}
// 	}

// 	tap() { // 注册监听函数
// 		this.hooks.arch.tapAsync('node', (name, cb) => {
// 			setTimeout(()=> {
// 				console.log('node', name)
// 				cb()
// 			}, 1000)
// 		})
// 		this.hooks.arch.tapAsync('react', function(name, cb) {
// 			setTimeout(()=> {
// 				console.log('node', name)
// 				cb()
// 			}, 1000)
// 		})
// 	}

// 	start() {
// 		this.hooks.arch.callAsync('zhang', () => {
// 			console.log('end')
// 		})
// 	}
// }

// let l = new Lesson()
// l.tap() // 注册这两个事件
// l.start(); // 启动钩子



// let {AsyncParallelHook} = require('tapble')
// // 异步的钩子（串行）（并行）需要等待所有并发的异步事件执行后再执行回调方法
// // 同时发送多个请求
// // 注册方法 分为 tap 注册 tapAsync
// // tapable 库中有三种注册方法 tap 同步注册 tapAsync tapPromise 注册的是 promise
// // call callAsync promise
// class Lesson {
// 	constructor() {
// 		this.index = 0
// 		this.hooks = {
// 			arch: new AsyncParallelHook(['name'])
// 		}
// 	}

// 	tap() { // 注册监听函数
// 		this.hooks.arch.tapPromise('node', (name) => {
// 			return new Promise((resolve, reject) => {
// 				setTimeout(()=> {
// 					console.log('node', name)
// 					resolve()
// 				}, 1000)
// 			})
// 		})
// 		this.hooks.arch.tapPromise('react', function(name) {
// 			return new Promise((resolve, reject) => {
// 				setTimeout(()=> {
// 					console.log('react', name)
// 					resolve()
// 				}, 1000)
// 			})
// 		})
// 	}

// 	start() {
// 		this.hooks.arch.promise('zhang').then(() => {
// 			console.log('end')
// 		})
// 	}
// }

// let l = new Lesson()
// l.tap() // 注册这两个事件
// l.start(); // 启动钩子





// let {AsyncSeriesHook} = require('tapble')
// class Lesson {
// 	constructor() {
// 		this.hooks = {
// 			arch: new AsyncSeriesHook(['name'])
// 		}
// 	}
// 	tap() { // 注册监听函数
// 		this.hooks.arch.tapAsync('node', (name, cb) => {
// 			setTimeout(()=> {
// 				console.log('node', name)
// 				cb()
// 			}, 1000)
// 		})
// 		this.hooks.arch.tapAsync('react', function(name, cb) {
// 			setTimeout(()=> {
// 				console.log('react', name)
// 				cb()
// 			}, 1000)
// 		})
// 	}

// 	start() {
// 		this.hooks.arch.callAsync('zhang', () => {
// 			console.log('end')
// 		})
// 	}
// }

// let l = new Lesson()
// l.tap() // 注册这两个事件
// l.start(); // 启动钩子






let {AsyncSeriesWaterfallHook} = require('tapble')
class Lesson {
	constructor() {
		this.hooks = {
			arch: new AsyncSeriesWaterfallHook(['name'])
		}
	}
	tap() { // 注册监听函数
		this.hooks.arch.tapAsync('node', (name, cb) => {
			setTimeout(()=> {
				console.log('node', name)
				cb('error', 'result')
			}, 1000)
		})
		this.hooks.arch.tapAsync('react', function(data, cb) {
			setTimeout(()=> {
				console.log('react', data)
				cb()
			}, 1000)
		})
	}

	start() {
		this.hooks.arch.callAsync('zhang', () => {
			console.log('end')
		})
	}
}

let l = new Lesson()
l.tap() // 注册这两个事件
l.start(); // 启动钩子
