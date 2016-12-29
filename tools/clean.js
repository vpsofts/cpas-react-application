import del from 'del';
import configClient from './webpack.config';

/**
 * Cleans up the output (dist) directory.
 */
async function clean(isServerBuild) {
	const outputPath = configClient[0].output.path;
	console.log('Cleaning... ', outputPath);
	await del([outputPath + '*'], {
		dot: true,
		force: true
	});
}

export default clean;
