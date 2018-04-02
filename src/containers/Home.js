import React from 'react'; 
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import { HomeScene as RenderedScene } from '../scenes';
import {} from '../components';
import { startFetchingTopFreeAppsFlow } from '../actions';

class HomeContainer extends React.Component {
    static defaultProps = {};
    static propTypes = {};

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // fetch action started
        this.props.fetchTopFreeApps(100);
    }

    render() {
        return (
            <RenderedScene {...this.props}/> //Some View
        );
    }
}

const mapStateToProps = (state, ownProps) => ({ });

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchTopFreeApps: (limit) => dispatch(startFetchingTopFreeAppsFlow(limit)),
});

export const HomeScene = connect(mapStateToProps, mapDispatchToProps)( HomeContainer );

export default HomeScene;
