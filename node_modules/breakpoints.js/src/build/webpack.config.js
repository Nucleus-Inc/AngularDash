var path = require('path')
var WebpackConfig = require('webpack-config-api')
var config = new WebpackConfig()
	.addFileExtension('js')
	.register('babel', require('webpack-config-api/extensions/babel')).use('babel')
	.register('eslint', require('webpack-config-api/extensions/eslint')).use('eslint')
	.withStandaloneEntry('breakpoints')
	.withLibrary('Breakpoints')
	.withAlias({
		'breakpoints': path.resolve(__dirname, '..')
	})
	.webpack({
		externals: [{
			'jquery': {
				root: '$',
				commonjs2: 'jquery',
				commonjs: 'jquery',
				amd: 'jquery'
			}
		}]
	})

module.exports = config