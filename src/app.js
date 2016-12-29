// IMPORTANT! babel-polyfill must be imported before anything else
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import groupBy from 'lodash.groupby';

//window.Perf = require('react-addons-perf');

function render(component, contexts) {
	contexts.forEach((context) => {
		const container = document.getElementById(context.containerId);
		if (!container) {
			return;
		}
		const App = React.createElement(component, context);

		ReactDOM.render(
			<div>
				{ App }
			</div>, container, () => {
			}
		);
	});
}

function run() {

	const portletElements = document.querySelectorAll('[data-gli-portlet]');
	if (!portletElements.length) {
		return;
	}

	require('react-tap-event-plugin')();

	const portletConfigs = groupBy(
		Array.from(portletElements).map((src) => JSON.parse(src.innerHTML)),
		(obj) => obj && obj.portlet && obj.portlet.toLowerCase()
	);
	const portletNames = Object.keys(portletConfigs);

	
	if (portletNames.indexOf('demo') !== -1) {
		require.ensure([], (require) => {
			render(require('./portlets/demo/portlet').default, portletConfigs.demo);
		}, 'demo');
	}
}

// Run the application when both DOM is ready and page content is loaded
if (['complete', 'loaded', 'interactive'].includes(document.readyState) && document.body) {
	run();
} else {
	document.addEventListener('DOMContentLoaded', run, false);
}
