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
 * Main application
 * Created by petr.vasek@ibacz.eu on 15.09.2016.
 */
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import Actions from '../../actions/demoactions'
import LoggerFactory from '../../utils/logger';
import Messages from './../../localization/messages';


/******* only dev imports **********/
 //import './_components/abmap/_abmap.scss';
/***********************************/

const LOG = LoggerFactory.getLogger('AbMapApplication.js');
const msg = Messages.getMessage;


/************************************* VIEW COMPONENT **********************************/

/**
 * Base state-full application component
 * @param props
 * @returns {JSX}
 * @constructor
 */

class DemoApplication extends Component {

    /**
     * Cudlo klik
     * @private
     */
    _onButtonClick() {
        LOG.debug('Button click');
        this.props.demoApi.setHelloWord('Cipe');
    }

    /**
     * Cudlo klik
     * @private
     */
    _onButtonClickLoadFromServer() {
        LOG.debug('_onButtonClickLoadFromServer click');
        this.props.demoApi.loadHelloFromServer({resourceUrl: this.props.resources.loadFromServerUrl});
    }

	/**
	 * Main render method
	 * @returns {*}
     */
	render() {
        return(
            <div>
                <div>Demo</div>
                {msg('demo_labels_hello_prefix')} {this.props.helloProperty}
                <br />
                <br />
                <div>Kdo je  {this.props.nextProperty}</div>
                <button style={{border: "1px solid red"}} onClick={()=>{this._onButtonClick()}}>Nastav cipa</button><br /><br />
                <button style={{border: "1px solid red"}} onClick={()=>{this._onButtonClickLoadFromServer()}}>Load from server</button>
            </div>
        );
	}
}

/************************************* PROPERTY AND EVENT MAPPING **********************/

const mapStoreToProps = (store) => {
	return {
		helloProperty: store.hello,
        nextProperty: store.dummy,
        resources: store.resources
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
        demoApi: {
            setHelloWord: (text) => {
                LOG.debug('call setHelloWord');
                dispatch(Actions.setHello(text));
            },
            loadHelloFromServer: (context) => {
                LOG.debug('call loadHelloFromServer');
                dispatch(Actions.loadHello(context));
            }
        }
	}
}

/**************************************************************************************/

export default connect(mapStoreToProps, mapDispatchToProps)(DemoApplication);
