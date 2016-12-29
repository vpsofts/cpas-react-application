import DeepLinkedStateLib from 'react-deep-link-state/DeepLinkedStateLib';

export default function(context, statePath, options) {
    return {
        value: DeepLinkedStateLib.getValueFromState.call(context, statePath, options),
        onChange: (e, ...pargs) => {
	      	DeepLinkedStateLib.onChange.call(context, statePath, options, ...pargs)
        },
    };
}


