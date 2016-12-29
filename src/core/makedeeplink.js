import DeepLinkedStateMixin from 'react-deep-link-state';

export default function (context, path, options) {
	return DeepLinkedStateMixin.deepLinkState.call(context, path, options);
}
