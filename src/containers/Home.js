import React from 'react'; 
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import { HomeScene as RenderedScene } from '../scenes';
import {} from '../components';
import { 
    startFetchingTopFreeAppsFlow, 
    startFetchingTopGrossingAppsFlow, 
    START_INIT_FETCH_FLOW
} from '../actions';

class HomeContainer extends React.Component {
    static defaultProps = {};
    static propTypes = {};

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // fetch action started
        this.props.initFetch();
    }

    render() {
        return (
            <RenderedScene {...this.props}/> //Some View
        );
    }
}

const mapStateToProps = (state, ownProps) => ({ });

const mapDispatchToProps = (dispatch, ownProps) => ({
    initFetch: () => dispatch({ type: START_INIT_FETCH_FLOW }),
    fetchTopFreeApps: (limit) => dispatch(startFetchingTopFreeAppsFlow(limit)),
    fetchTopGrossingApps: () => dispatch(startFetchingTopGrossingAppsFlow(10)),
});

export const HomeScene = connect(mapStateToProps, mapDispatchToProps)( HomeContainer );

export default HomeScene;
