import * as _ from 'lodash'

var page = 'subPageA'

if (page === 'subPageA') {
	import(/* webpackChunkName:'subpageA' */'./subPageA')
		.then(function (subPageA) {
			console.log(subPageA)
		})
} else if (page === 'subPageB') {
	import(/* webpackChunkName:'subpageB' */'./subPageB')
		.then(function (subPageA) {
			console.log(subPageB)
		})
}

export default 'pageB'
