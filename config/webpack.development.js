const merge = require('webpack-merge');
const global = require('./../webpack.global.js');

module.exports = merge(global, {
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './../build'
	}
});
