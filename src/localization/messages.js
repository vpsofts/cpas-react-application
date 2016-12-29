// TODO: (TK) Integrate INTL

import { isFunction, find } from '../core/lo';
import invariant from 'invariant';

let registeredMessages;
let registeredMatchers;

const interpolate = (messageKey, args) => {
	let interpolated = null;
	if (isFunction(registeredMessages[messageKey])) {
		interpolated = registeredMessages[messageKey](...args);
	} else {
		interpolated = registeredMessages[messageKey];
	}
	return interpolated;
};

const Messages = {
	getMessage(messageKey, ...args) {
		if (!registeredMessages) {
			return messageKey;
		}

		let interpolated;
		let matched;

		const testMatcher = (key) => registeredMatchers[key].test(messageKey);

		// TODO: (TK) rafactor by _.chain + dispatch
		if (registeredMessages.hasOwnProperty(messageKey)) {
			interpolated = interpolate(messageKey, args);
		} else if (registeredMatchers &&
				(matched = find(Object.keys(registeredMatchers), testMatcher)) !== null) {
			interpolated = interpolate(matched, args);
		} else {
			interpolated = messageKey;
		}

		return interpolated;
	},

	registerMessages(messages) {
		registeredMessages = Object.assign({}, registeredMessages, messages);
	},

	registerMatcher(messageKey, matcher) {
		invariant(
			messageKey &&
				matcher &&
				typeof matcher === 'object' &&
				matcher.test,
			`Could not register matcher for ${messageKey}`
		);

		registeredMatchers = Object.assign({}, registeredMatchers, { [messageKey]: matcher });
	},

	/**
	 * Returns plurarized string for specified value. defaultMessage is returned when there is no exact match or matching interval.
	 * @param val
	 * @param defaultMessage
	 * @param args key value pairs of pluralized values e.g. [1, 'adult'], [4,'adults']
	 * @returns {*}
	 */
	localizePlural(val, defaultMessage, ...args) {
		args.sort((a, b) => a[0] - b[1]);
		const result = find(args, (message) => message[0] >= val);

		return result ? result[1] : defaultMessage;
	}
};

export { Messages };
export default Messages;
