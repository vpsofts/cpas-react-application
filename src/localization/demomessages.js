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

import { capitalizeFirstLetter } from '../core/lo';

const messages = {
	
	demo_labels_hello_prefix: 'Hello, ',

};

const labeledMessages = {
};

Object.keys(labeledMessages).forEach((key) => {
	labeledMessages[`${key}-label`] = capitalizeFirstLetter(labeledMessages[key]);
});


export default Object.assign({}, messages, labeledMessages);
