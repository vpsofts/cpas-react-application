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
 * JS for create store
 * Created by petr.vasek@ibacz.eu on 15.09.2016.
 */

import { createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import reducer from '../reducers/demoreducer'


/**
 * Factory object
 */
const Factory = {
	/**
	 * Getter for initialized store
	 * @param initialProps
	 * @returns initialized store
     */
	getStore: (initialProps) => {
		return createStore(reducer,
			//store structure init
			{
                hello: initialProps.hello,
                dummy: 'picaaa'
			}
		);
	}
}

export default Factory;


