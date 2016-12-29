/*
 * ===========================================================================
 * IBA CZ Confidential
 *
 * © Copyright IBA CZ 2016 ALL RIGHTS RESERVED
 * The source code for this program is not published or otherwise
 * divested of its trade secrets.
 * ===========================================================================
 */

/**
 * Created by petr.vasek@ibacz.eu on 10.10.2016.
 */

import { checkStatus } from '../utils/fetchutils';
import LoggerFactory from '../utils/logger';
import 'whatwg-fetch';
import Actions from '../actions/demoactions';

const LOG = LoggerFactory.getLogger('demoapi.js');

const DemoApi = {

	/**
	 * Method for load markers from server
	 * @param action
	 * @returns {*}
     */
	loadHelloFromServer: async (action) => {

		return fetch(action.context.resourceUrl
			,{
				method: 'post',
				body: JSON.stringify(
					{
						type: action.context.filter,
					}
				)
			})
			.then(checkStatus)
			.then(response => {
				LOG.debug('Request OK', response);
				return response.json();

			})
			.then(json => {
				LOG.debug('Json parse', json);
				return Actions.setHello(json.hello);
			})
			.catch(error => {
				LOG.error('Request failed', {error: error});
			})
	}
};

export default DemoApi;

