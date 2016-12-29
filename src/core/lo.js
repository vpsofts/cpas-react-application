import flatten from 'lodash.flatten';
import toPairs from 'lodash.topairs';
import fromPairs from 'lodash.frompairs';
import difference from 'lodash.difference';

const arrProto = Array.prototype;
const keys = Object.keys;
const nativeMap = arrProto.map;
const nativeReduce = arrProto.reduce;
const nativeReverse = arrProto.reverse;
const nativeJoin = arrProto.join;
const nativeFilter = arrProto.filter;
const nativeIndexOf = arrProto.indexOf;
const nativeSlice = arrProto.slice;
const isArray = Array.isArray;
const min = Math.min;
const max = Math.max;


function map(arr, fn) {
	return arr ? nativeMap.call(arr, fn) : arr;
}

function reduce(arr, fn, x) {
	return arr ? nativeReduce.call(arr, fn, x) : arr;
}

function reverse(arr) {
	return arr ? nativeReverse.call(arr) : arr;
}

function join(arr, del) {
	return arr ? nativeJoin.call(arr, del) : arr;
}

function filter(arr, fn) {
	return arr ? nativeFilter.call(arr, fn) : arr;
}

function slice(arr, start, end) {
	return arr ? nativeSlice.call(arr, start, end) : arr;
}

function indexOf(arr, item) {
	return arr ? nativeIndexOf.call(arr, item) : arr;
}

function noop() {}

function identity(x) {
	return x;
}

function isUndefined(v) {
	return typeof v === 'undefined' || v === null;
}

function isDefined(v) {
	return !isUndefined(v);
}

function isFunction(f) {
	return typeof f === 'function';
}

function isString(f) {
	return typeof f === 'string';
}

function isEmpty(arr) {
	return !arr || !arr.length;
}

function arrToPairs(arr) {
  return toPairs(arr).map(([x, y]) => [parseInt10(x), y]);
}

/**
 * objFromArr(['a', 'b'], upperCase) => {a: 'A', b: 'B'}
 */
function objFromArr(arr, iteratee) {
	const result = {};
	arr.forEach((item, i) => {
		result[item] = iteratee(item, i);
	});
	return result;
}

function arrFromObj(obj, idKey) {
	return keys(obj).map((key) => Object.assign({}, obj[key], { [idKey]: key }));
}


function inArray(arr, item) {
	return arr.indexOf(item) !== -1;
}

/**
 * mapValues({a: 'A', b: 'B'}, (val) => val + '1') => {a: 'a1', b: 'b1'}
 */
function mapValues(obj, iteratee) {
	return objFromArr(keys(obj), (key) => iteratee(obj[key]));
}

/**
 * findKeys({a: 'a', b: 'd', c: 'c'}, (key, val) => key === val) => ['a', 'c']
 */
function findKeys(obj, iteratee) {
	return keys(obj).filter((key) => iteratee(key, obj[key]));
}

function merge(...args) {
	return args.reduce((cur, prev) => prev.concat(cur));
}

/**
 * filterKeys({a: 'a', b: 'd', c: 'c'}, (key, val) => key === val) => {a: 'a', c: 'c'}
 */
function filterKeys(obj, iteratee) {
	return objFromArr(findKeys(obj, iteratee), (key) => obj[key]);
}

/**
 * Find first item fro iteratee returns true.
 * @return {any} found item
 */
function find(arr, iteratee) {
	let result = null;
	arr.some((v, i) => !!iteratee(v, i) && (result = v, true));
	return result;
}

function capitalizeFirstLetter(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Checks if value exists.
 *
 * E. g:
 *
 * val(undefined); // false
 * val(null); // false
 *
 * val(0); // true
 * val(false); // true
 * val({}); // true
 * val([]); // true
 *
 * See test.
 */
function existy(val) {
	/* eslint-disable eqeqeq */
	return val != null;
	/* eslint-enable eqeqeq */
}

function not(x) {
	return !x;
}

/**
 * Returns true if value is can be used as synonym for 'true'.
 * E. g::
 *
 * val(undefined); // false
 * val(null); // false
 * val(false); // false
 * val(0); // true !!!!!!!
 * val({}); // true
 * val([]); // true
 *
 * See test.
 *
 */
function truthy(val) {
	return val !== false && existy(val);
}

function parseInt10(x) {
	return parseInt(x, 10);
}

function doWhen(cond, action) {
	let result;
	if (!!cond) {
		result = action();
	}
	return result;
}

/**
 * cat([1], [2, 3, 4], [5, 6]) // [1, 2, 3, 4, 5, 6]
 */
function cat(ahead, ...atail) {
	let res;
	if (existy(ahead)) {
		res = Array.prototype.concat.apply(ahead, atail);
	} else {
		res = [];
	}
	return res;
}

/**
 * construct(1, [2, 3, 4]) // [1, 2, 3, 4]
 */
function construct(ahead, atail) {
	return cat([ahead], atail);
}

function head(xs) {
	return xs[0];
}

function tail(xs) {
	return xs.splice(1);
}

/**
 * compose(f, g, h)(x) => f(g(h(x)))
 */
function compose(...fns) {
	const revFns = reverse(fns);
	const fst = head(revFns);
	const rest = tail(fns);

	return (...args) => reduce(
		rest,
		(result, fn) => fn(result),
		fst(...args)
	);
}

function curry(fn) {
	return function curryPartial(...args) {
		if (args.length === fn.length) {
			return fn(...args);
		}

		return (...pargs) => curryPartial(...args, ...pargs);
	}
}


/**
 * let rev = invoker('reverse', Array.prototype.reverse);
 * rev([1,2,3]) // [3, 2, 1]
 */
function invoker(NAME, METHOD) {
	return function (target, ...args) {
		if (!existy(target)) {
			throw new Error('Must provide a target');
		}
		const targetMethod = target[NAME];

		return doWhen((existy(targetMethod) && METHOD === targetMethod),
				() => targetMethod.apply(target, args));
	};
}

/**
 * let rev = dispatch(invoker('reverse', Array.prototype.reverse), stringReverse);
 *
 * rev([1,2,3]); // [3, 2, 1]
 * rev("abc"); // "cba"
 */
function dispatch(...funs) {
	const size = funs.length;
	return function (target, ...args) {
		let ret = undefined;
		for (let funIndex = 0; funIndex < size; funIndex++) {
			const fun = funs[funIndex];
			ret = fun.apply(fun, construct(target, args));
			if (existy(ret)) {
				return ret;
			}
		}
		return ret;
	};
}

function dispatchAll(...funs) {
	const size = funs.length;
	return function (target, ...args) {
		let result = undefined;
		for (let funIndex = 0; funIndex < size; funIndex++) {
			const fun = funs[funIndex];
			const ret = fun.apply(fun, construct(target, args));
			if (ret) {
				result = ret;
			}
		}
		return result;
	};
}


function applyArgs(f) {
	return (xs) => f(...xs);
}


const notExisty = compose(not, existy);


function isNotANumber(val) {
	return typeof val === 'number' && isNaN(val);
}

function parseNumber(val) {
	return Number(val);
}

function isParsableNumber(val) {
	const parsed = parseNumber(val);

	return !isNotANumber(parsed);
}

function sum(a, b) {
	return a + b;
}

function sumAll(...args) {
	return args.map(parseNumber).reduce(sum);
}

function cartesianProductOf(...args) {
	return reduce(args, (a, b) => (
		flatten(map(a, (x) => (
			map(b, (y) => x.concat([y]))
		)))
	), [[]]);
}

function greaterOrEqual(x) {
	return (y) => y >= x;
}

function inClosedInterval(a, b) {
	return (x) => a <= x && x <= b;
}

function prop(key) {
	return (obj) => doWhen(obj.hasOwnProperty(key), () => obj[key]);
}

function last(arr) {
	return (!isEmpty(arr)) ? arr[arr.length - 1] : undefined;
}

function mapToPair(f) {
	return (x) => [x, f(x)];
}

function count(arr) {
	return arr.length;
}

function areArraysEqual(arr1, arr2) {
	return arr1.every((v, i) => v === arr2[i]);
}

function _indexOfTruthyExecution(fns, item, index) {
	let result;
	if (fns[index](item)) {
		result = index;
	} else if (index === fns.length) {
		result = -1;
	} else {
		result = _indexOfTruthyExecution(fns, item, index + 1);
	}
	return result;
}

function indexOfTruthyExecution(fns) {
	return (item) => _indexOfTruthyExecution(fns, item, 0);
}

export { difference };
export { noop };
export { identity };
export { not };
export { map };
export { reduce };
export { reverse };
export { join };
export { filter };
export { slice };
export { flatten };
export { keys };
export { indexOf };
export { isDefined };
export { isUndefined };
export { isFunction };
export { isString };
export { isArray };
export { isEmpty };
export { objFromArr };
export { arrFromObj };
export { inArray };
export { mapValues };
export { findKeys };
export { merge };
export { filterKeys };
export { find };
export { capitalizeFirstLetter };
export { existy };
export { notExisty };
export { truthy };
export { invoker };
export { compose };
export { curry };
export { head };
export { tail };
export { dispatch };
export { dispatchAll };
export { doWhen };
export { isNotANumber };
export { parseNumber };
export { isParsableNumber };
export { cartesianProductOf };
export { greaterOrEqual };
export { inClosedInterval };
export { toPairs };
export { arrToPairs };
export { fromPairs };
export { prop };
export { sum };
export { sumAll };
export { min };
export { max };
export { last };
export { mapToPair };
export { applyArgs };
export { count };
export { areArraysEqual };
export { parseInt10 };
export { indexOfTruthyExecution };

export default {
	difference,
	noop,
	identity,
	not,
	map,
	reduce,
	reverse,
	filter,
	join,
	slice,
	flatten,
	keys,
	indexOf,
	isDefined,
	isUndefined,
	isFunction,
	isString,
	isArray,
	isEmpty,
	objFromArr,
	arrFromObj,
	inArray,
	mapValues,
	findKeys,
	merge,
	filterKeys,
	find,
	capitalizeFirstLetter,
	existy,
	notExisty,
	truthy,
	dispatch,
	dispatchAll,
	invoker,
	compose,
	curry,
	head,
	tail,
	doWhen,
	isNotANumber,
	isParsableNumber,
	parseNumber,
	cartesianProductOf,
	greaterOrEqual,
	inClosedInterval,
	toPairs,
	arrToPairs,
	fromPairs,
	prop,
	sum,
	sumAll,
	min,
	max,
	last,
	mapToPair,
	applyArgs,
	count,
	areArraysEqual,
	indexOfTruthyExecution,
	parseInt10,
};
