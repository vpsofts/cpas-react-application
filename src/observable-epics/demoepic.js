/*
 * ===========================================================================
 * IBA CZ Confidential
 *
 * © Copyright IBA CZ 2017 ALL RIGHTS RESERVED
 * The source code for this program is not published or otherwise
 * divested of its trade secrets.
 * ===========================================================================
 */

/**
 * Main application store middleware observable epics
 * Created by petr.vasek@ibacz.eu on 16.09.2016.
 */
import Rx from 'rxjs';
import { combineEpics } from 'redux-observable';
import LoggerFactory from './../utils/logger';
import 'whatwg-fetch';
import Actions from './../actions/demoactions';
import Api from './../api/demoapi';

const LOG = LoggerFactory.getLogger('demoepic.js');

/**
 * CHANGE_VIEWPORT epic
 * @param action$
 * @returns {any}
 */
const EPIC_LOAD_HELLO = (action$) => {

	return action$.ofType('LOAD_HELLO')
		.mergeMap(
			action =>  Rx.Observable.fromPromise(
                Api.loadHelloFromServer(action)
			)
		);
};


/**
 * Export compination of application epics
 */
export default combineEpics(
    EPIC_LOAD_HELLO
);