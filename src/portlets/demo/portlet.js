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

	/**
	 * Base render
	 * @returns {JSX}
	 */
	render() {
		return (
            <div>Hello beginner!</div>
		);
	}
}

export default DemoPortlet;
