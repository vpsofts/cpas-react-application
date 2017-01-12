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
 * Base portlet JS
 * Created by petr.vasek@ibacz.eu on 14.09.2016.
 */
import React, { PropTypes, Component } from 'react';
import { Provider } from 'react-redux'
import LoggerFactory from '../../utils/logger';
import StoreFactory from '../../stores/demostore'
import DemoApplication from './DemoApplication';
import Messages from './../../localization/messages';
import demoMessages from './../../localization/demomessages';


const LOG = LoggerFactory.getLogger('demo/portlet.js');

/**
 * Base portlet component
 * expected props structure
 *
 {
  "portlet": "<portlet name [string]>",
  "namespace": "<namespace [string]>",
  "containerId": "<id of container node element [string]>",
  "debug": <true/false [boolean] enable and disable debug logging to browser console>
  }

 Example:

 <script id="web-gli-abmap-portlet-abmap" data-gli-portlet="" type='application/json'>{
		"portlet": "demo",
		"namespace": "demo",
		 "debug":true
		}
 </script>

 */
class DemoPortlet extends Component {

    constructor(props) {
        super(props);

        LoggerFactory.enableDebug(true);

        LOG.debug('Init props',props);

        this.store = StoreFactory.getStore(props);

        LOG.debug("Created store", this.store.getState());

        Messages.registerMessages(demoMessages);
    }


	/**
	 * Base render
	 * @returns {JSX}
	 */
	render() {
        return (
            <Provider store={this.store}>
                <DemoApplication
                    ns={this.props.namespace}
                    hello={this.props.hello}
                />
            </Provider>
        );
	}
}

export default DemoPortlet;
