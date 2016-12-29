/*
 * Used to check HTTP response status and throw error for non sucessful response. The
 * imlementation is based on https://www.npmjs.com/package/whatwg-fetch#handling-http-error-statuses
 */
function checkStatus(response) {
	let result = null;
	if (response.status >= 200 && response.status < 300) {
		result = response;
	} else {
		const error = new Error(response.statusText);
		error.response = response;
		throw error;
	}
	return result;
}

export { checkStatus };

export default {
	checkStatus
};
