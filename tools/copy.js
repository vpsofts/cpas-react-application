// import path from 'path';
// import Promise from 'bluebird';
// import watch from './lib/watch';

/**
 * Copies static files such as robots.txt, favicon.ico to the
 * output (dist) folder.
 */
async function copy() {

	// const ncp = Promise.promisify(require('ncp'));

	// await Promise.all([
	// 	ncp('src/public', 'dist/public'),
	// 	ncp('package.json', 'dist/package.json'),
	// ]);

	// if (global.WATCH) {
	// 	const contentWatcher = await watch('src/content/**/*.*');
	// 	contentWatcher.on('changed', async(file) => {
	// 		const relPath = file.substr(path.join(__dirname, '../src/content/').length);
	// 		await ncp(`src/content/${relPath}`, `dist/content/${relPath}`);
	// 	});
	// }

}

export default copy;
