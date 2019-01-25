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
let {SyncLoopHook} = require('tapble')

class Lesson {
	constructor() {
		this.index = 0
		this.hooks = {
			arch: new SyncLoopHook(['name'])
		}
	}

	tap() { // 注册监听函数
		this.hooks.arch.tap('node', (name) => {
			console.log('node', name)
			return ++this.index === 3 ? undefined : '继续学'
		})
		this.hooks.arch.tap('react', function(data) {
			console.log('react', data)
		})
	}

	start() {
		this.hooks.arch.call('zhang')
	}
}

let l = new Lesson()
l.tap() // 注册这两个事件
l.start(); // 启动钩子
