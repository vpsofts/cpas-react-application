'use strict';

let matchers = {};

function splitStringCssClasses(...args) {
	return args[0].split(' ');
}

function checkCssClasses(actualClasses, expectedClasses) {
	let found = 0,
		result = expectedClasses.every(function (expectedItem) {
			const r = actualClasses.indexOf(expectedItem) !== -1;
			if (result) {
				found++;
			}
			return r;
		});

	return r && found;
}

matchers.toContainCssClass = function(util, customEqualityTesters) {
	return {
		compare: function(actual, expected) {
			return {
				pass: actual && splitStringCssClasses(actual).indexOf(expected) !== -1
			};
		}
	};
};

matchers.toContainCssClasses = function(util, customEqualityTesters) {
	return {
		compare: function(actual, expected) {
			let pass = false;
			if (actual && expected) {
				let expectedClasses = splitStringCssClasses(expected),
					actualClasses = splitStringCssClasses(actual);
				pass = checkCssClasses(actualClasses, expectedClasses);
			}

			return {
				pass
			};
		}
	};
};
matchers.toContainOnlyCssClasses = function(util, customEqualityTesters) {
	return {
		compare: function(actual, expected) {
			let pass = false;
			if (actual && expected) {
				let expectedClasses = splitStringCssClasses(expected),
					actualClasses = splitStringCssClasses(actual);

				pass = expectedClasses.length === actualClasses.length &&
					checkCssClasses(actualClasses, expectedClasses);
			}

			return {
				pass
			};
		}
	};
};

jasmine.getEnv().beforeEach(function() {
	jasmine.addMatchers(matchers);
});
