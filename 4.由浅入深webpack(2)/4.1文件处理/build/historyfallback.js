module.exports = {
	htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
	rewrites: [
		{
			// from: '/pages/a',
			from: /^\/([a-zA-Z0-9]+\/?)([a-zA-Z0-9]+)/,
			// to: '/pages/a.html'
			to: function (context) {
				return '/' + context.match[1] + context.match[2] + '.html'
			}
		}
	]
}