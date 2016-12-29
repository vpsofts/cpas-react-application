import path from 'path';
import webpack from 'webpack';
import merge from 'lodash.merge';

const DEBUG = !process.argv.includes('--release');
const VERBOSE = process.argv.includes('--verbose');

const GLOBALS = {
	'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
	__DEV__: DEBUG,
};


const config = {
	output: {
		publicPath: '/cpas-react-apps-theme/js/',
		sourcePrefix: '  '
	},

	cache: DEBUG,
	debug: DEBUG,

	stats: {
		colors: true,
		reasons: DEBUG,
		hash: VERBOSE,
		version: VERBOSE,
		timings: true,
		chunks: VERBOSE,
		chunkModules: VERBOSE,
		cached: VERBOSE,
		cachedAssets: VERBOSE
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
	],
	resolve: {
		extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.json'],
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loader: 'babel-loader',
			include: [
				path.resolve(__dirname, '../src'),
			],
			query: {
				// https://github.com/babel/babel-loader#options
				cacheDirectory: DEBUG,

				// https://babeljs.io/docs/usage/options/
				babelrc: false,
				presets: [
					'react',
					'es2015',
					'stage-0',
				],
				plugins: [
					'transform-runtime',
				],
			},
		}, {
			test: /\.scss$/, // http://browniefed.com/blog/2014/12/24/webpack-and-compass/
			loaders: [
				'style-loader',
				'raw-loader',
				`sass-loader?${DEBUG ? 'sourceMap&' : 'minimize&'}`
			],
		}, {
			test: /\.json$/,
			loader: 'json-loader',
		}, {
			test: /\.txt$/,
			loader: 'raw-loader',
		}, {
			test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
			loader: 'url-loader?limit=10000',
		}, {
			test: /\.(eot|ttf|wav|mp3)$/,
			loader: 'file-loader',
		}]
	},
	sassLoader: {
		includePaths: [path.resolve(__dirname, '../../node_modules/compass-mixins/lib')]
	}
};

const appConfig = merge({}, config, {
	entry: './src/app.js',
	output: {
		path: path.join(__dirname, './../../cpas-react-apps-theme/src/main/webapp/js'),
		filename: 'cpas-react.js?[hash]',
		chunkFilename: 'cpas-react-[name].[id].js?[hash]'
	},
	devtool: DEBUG ? '#source-map' : '',
	plugins: [
		new webpack.DefinePlugin(GLOBALS),
		new webpack.optimize.CommonsChunkPlugin({
			async: true,
		}),
		...(!DEBUG ? [
			new webpack.optimize.DedupePlugin(),
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: VERBOSE,
				},
			})
		] : []),
	],
});

export default [appConfig];
