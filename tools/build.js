import run from './run';

/**
 * Compiles the project from source files into a distributable
 * format and copies it to the output (build) folder.
 */
async function build() {
	const isServerBuild = process.argv.includes('--VALIDATIONS');

	await run(require('./clean'), isServerBuild);
	await run(require('./copy'), isServerBuild);
	await run(require('./bundle'), isServerBuild);
}

export default build;
