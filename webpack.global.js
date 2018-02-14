const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");

module.exports = {
	// Locations for your source code, and bundle code.
	entry: {
		index: './app/src/index-interface.js'
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'build')
	},
	// NPM Packages to be used
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery/dist/jquery.min.js',
			jQuery: 'jquery'
		}),
    new CleanWebpackPlugin(['build']),
    new HtmlWebpackPlugin({
			template: 'app/html/index.html'
		})
  ],
	module: {
		rules: [{
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader'
			]
		}]
	}
};
