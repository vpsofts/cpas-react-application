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
 * Application store reducer
 * Created by petr.vasek@ibacz.eu on 15.09.2016.
 */
import LoggerFactory from './../utils/logger';
import Api from './../api/demoapi';
import Actions from './../actions/demoactions';


const LOG = LoggerFactory.getLogger('demoreducer.js');

/**
 * Main application reducer
 * @param store
 * @param action
 * @returns {*}
 */
export default function reducer(store, action) {

    LOG.debug('Reducer this: ',this);

	LOG.debug('Reduce: ',action);

	let storeClone = Object.assign({},store);

	switch (action.type) {

		case 'DEMO_SET_HELLO':

			storeClone.hello = action.value;
			return storeClone;

		default:

			return store
	}
}