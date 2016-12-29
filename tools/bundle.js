import webpack from 'webpack';
import webpackClientConfig from './webpack.config';

/**
 * Creates application bundles from the source files.
 */
function bundle() {
	const webpackConfig = webpackClientConfig;
	return new Promise((resolve, reject) => {
		webpack(webpackConfig).run((err, stats) => {
			if (err) {
				return reject(err);
			}

			console.log(stats.toString(webpackConfig[0].stats));
			return resolve();
		});
	});
}

export default bundle;
