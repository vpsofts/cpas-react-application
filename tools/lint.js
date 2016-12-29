// https://github.com/eslint/eslint/blob/master/lib/rules/indent.js
// https://github.com/eslint/eslint/issues/3737
import { CLIEngine } from 'eslint';
import path from 'path';

const fix = process.argv.includes('--fix');
const pathArgPrefix = '--path=';

let linterPath = '.';
process.argv.forEach((val) => {
	if (val.includes(pathArgPrefix)) {
		linterPath = val.replace(pathArgPrefix, '');
	}
});

async function lint() {
	const cli = new CLIEngine({
		fix,
		debug: true
	});


	const report = cli.executeOnFiles([linterPath]);

	if (fix) {
		console.log('Applying fixes.');

		CLIEngine.outputFixes(report);
	}

	const formatter = cli.getFormatter();

	console.log(formatter(report.results));
}

export default lint;
