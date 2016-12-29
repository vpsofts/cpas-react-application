import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config';

import run from './run';
import clean from './clean';
import copy from './copy';

const DEBUG = !process.argv.includes('--release');

/**
 * Launches a development web server with "live reload" functionality -
 * synchronizing URLs, interactions and code changes across multiple devices.
 */
async function start() {
	await run(clean);
	await run(copy);
	await new Promise((resolve, reject) => {
    // Patch the client-side bundle configurations
    // to enable Hot Module Replacement (HMR) and React Transform
		webpackConfig.filter((x) => x.target !== 'node').forEach((config) => {
			if (Array.isArray(config.entry)) {
				config.entry.unshift('webpack-hot-middleware/client');
			} else {
				/* eslint-disable no-param-reassign */
				config.entry = ['webpack-hot-middleware/client', config.entry];
				/* eslint-enable no-param-reassign */
			}
			config.plugins.push(new webpack.HotModuleReplacementPlugin());
			config.plugins.push(new webpack.NoErrorsPlugin());
			config
				.module
				.loaders
				.filter((x) => x.loader === 'babel-loader')
				.forEach((x) => (x.query = { // eslint-disable-line no-param-reassign
					// Wraps all React components into arbitrary transforms
					// https://github.com/gaearon/babel-plugin-react-transform
					plugins: [
						['react-transform', {
							transforms: [{
								transform: 'react-transform-hmr',
								imports: ['react'],
								locals: ['module'],
							}, {
								transform: 'react-transform-catch-errors',
								imports: ['react', 'redbox-react'],
							}],
						},
					]]
				}));
		});


		const bundler = webpack(webpackConfig);

		const wpMiddleware = webpackMiddleware(bundler, {
			// IMPORTANT: webpack middleware can't access config,
			// so we should provide publicPath by ourselves
			publicPath: webpackConfig[0].output.publicPath,

			// Pretty colored output
			stats: webpackConfig[0].stats,
			// For other settings see
			// https://webpack.github.io/docs/webpack-dev-middleware
		});

		const hotMiddlewares = bundler
			.compilers
			.filter((compiler) => compiler.options.target !== 'node')
			.map((compiler) => webpackHotMiddleware(compiler));

		let running = false;

		var runServer = (err/*, host */) => {             // github.com/kriasoft/react-starter-kit/issues/490
			if (!err) {
				running = true;
				const bs = browserSync.create();
				bs.init({
					...(DEBUG ? {} : {notify: false, ui: false}),
					port: 3333,
					proxy: {
						target: 'http://localhost:8080',
						//target: 'https://at.generali.cz',
						middleware: [wpMiddleware, ...hotMiddlewares],
					},
					online: false,
					files: [
						'**/*.css'
					]
				}, resolve);
			} else {
				reject(err);
			}
		};
		bundler.plugin('done', () => !running && runServer());
	});
}

export default start;
