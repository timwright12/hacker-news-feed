import path from 'path';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import postcssPresetEnv from 'postcss-preset-env';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';

const DIST_PATH = path.resolve( './dist' );

const config = {
	node: {
		fs: 'empty'
	},
	cache: true,
	entry: {
		index: './src/index.js',
	},
	output: {
		path: DIST_PATH,
		filename: '[name].min.js',
	},
	resolve: {
		modules: ['node_modules'],
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				enforce: 'pre',
				loader: 'eslint-loader',
				options: {
					fix: true
				}
			},
			{
				test: /\.js$/,
				use: [{
					loader: 'babel-loader',
				}]
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{ loader: MiniCssExtractPlugin.loader },
					{ loader: 'css-loader', options: { importLoaders: 1 } },
					{ loader: 'postcss-loader', options: {
						ident: 'postcss',
						plugins: () => [
							require( 'postcss-import' )(),
							postcssPresetEnv( {
								stage: 0,
								autoprefixer: {
									grid: true
								}
							} ),
							require( 'cssnano' )()
						]
					} },

				]
			}
		]
	},
	mode: process.env.NODE_ENV,
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css',
			ignoreOrder: false,
		}),
		new BrowserSyncPlugin(
			{
				host: 'localhost',
				server: './',
				port: 3000,
				open: 'false',
				files: [
					'**/*.html',
					'./dist/**/*.js',
					'./dist/**/*.css',
				]
			},
			{
				injectCss: true,
				reload: false,
			},
		),
	],
	stats: {
		colors: true
	},
};

module.exports = config;
