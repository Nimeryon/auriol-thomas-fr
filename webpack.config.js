const path = require('path');

module.exports = {
	entry: './src/Index.js',
	mode: 'production',
	devtool: 'cheap-module-source-map',
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'bundle.js',
		publicPath: '/',
	},
	watch: false,
	module: {
		rules: [
			{
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							['@babel/preset-env'],
							[
								'@babel/preset-react',
								{ "runtime": "automatic" }
							]
						],
						plugins: [
							["@babel/plugin-proposal-class-properties"]
						]
					}
				}
			}
		]
	}
}