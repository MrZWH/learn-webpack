// import './subPageA'
// import './subPageB'
require.include('./moduleA')

if (page === 'subPageA') {
	require.ensure(['./subPageA'], function () {
		var subPageA = require('./subPageA')
	}, 'subPageA')
} else if (page === 'subPageB') {
	require.ensure(['./subPageB'], function () {
		var subPageB = require('./subPageB')
	}, 'subPageB')
}

require.ensure([], function () {
	var _ = require('lodash')
	_.join(['1', '2'], '3')
}, 'vendor')

export default 'pageA'
