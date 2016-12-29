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
 * Created by petr.vasek@ibacz.eu on 15.09.2016.
 */


const Actions = {

	/**
	 * Action for set actual map viewport
	 * @param hello Hello word
	 * @returns {{type: string, value: string}}
     */
	setHello : (hello) => {
		return {
			type: 'DEMO_SET_HELLO',
			value: hello
		}
	}
}

export default Actions;