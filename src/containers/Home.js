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
    START_INIT_FETCH_FLOW,
    updateScrollHorizontalOffset
} from '../actions';
import { topFreeAppsSelector, topGrossingAppsSelector, homeAppLoadingSelector, homeAppLoadingMoreSelector, homeAppLookUpLoadingSelector, topGrossingAppsMetaSelector, homeScrollHorizontalOffsetSelector } from '../selectors';

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

const mapStateToProps = (state, ownProps) => ({
    topFreeApps: topFreeAppsSelector(state),
    topGrossingApps: topGrossingAppsSelector(state),
    topGrossingAppsMeta: topGrossingAppsMetaSelector(state),
    appLoading: homeAppLoadingSelector(state),
    appLookUpLoading: homeAppLookUpLoadingSelector(state),
    loadingMore: homeAppLoadingMoreSelector(state),
    scrollHorizontalOffset: homeScrollHorizontalOffsetSelector(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    initFetch: () => dispatch({ type: START_INIT_FETCH_FLOW }),
    fetchTopFreeApps: () => dispatch(startFetchingTopFreeAppsFlow(10)),
    fetchTopGrossingApps: () => dispatch(startFetchingTopGrossingAppsFlow(10)),
    scrollHorizontal: ({ clientHeight, scrollHeight, scrollTop }) => {
        dispatch(updateScrollHorizontalOffset(scrollTop * 2/3)); // make horizontal scroll a bit slower then vertical scroll
    },
});

export const HomeScene = connect(mapStateToProps, mapDispatchToProps)( HomeContainer );

export default HomeScene;
