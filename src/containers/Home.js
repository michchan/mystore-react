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
    updateScrollLeft,
    updateScrollWidth,
    updateClientSize,
    updateScrollTop
} from '../actions';
import { topFreeAppsSelector, topGrossingAppsSelector, homeAppLoadingSelector, homeAppLoadingMoreSelector, homeAppLookUpLoadingSelector, topGrossingAppsMetaSelector, homeScrollLeftSelector } from '../selectors';

class HomeContainer extends React.Component {
    static defaultProps = {};
    static propTypes = {};

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // fetch action started
        this.props.initFetch();
        this.props.updateClientSize(window.innerWidth, window.innerHeight);
        window.addEventListener('resize', this._handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._handleWindowResize);
    }

    render() {
        return (
            <RenderedScene {...this.props}/> //Some View
        );
    }

    _handleWindowResize = (e) => {
        this.props.updateClientSize(e.target.innerWidth, e.target.innerHeight);
    }
}

const mapStateToProps = (state, ownProps) => ({
    topFreeApps: topFreeAppsSelector(state),
    topGrossingApps: topGrossingAppsSelector(state),
    topGrossingAppsMeta: topGrossingAppsMetaSelector(state),
    appLoading: homeAppLoadingSelector(state),
    appLookUpLoading: homeAppLookUpLoadingSelector(state),
    loadingMore: homeAppLoadingMoreSelector(state),
    scrollLeft: homeScrollLeftSelector(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    initFetch: () => dispatch({ type: START_INIT_FETCH_FLOW }),
    fetchTopFreeApps: () => dispatch(startFetchingTopFreeAppsFlow(10)),
    fetchTopGrossingApps: () => dispatch(startFetchingTopGrossingAppsFlow(10)),
    scrollHorizontal: ({ clientHeight, scrollHeight, scrollTop }) => {
        dispatch(updateScrollTop(scrollTop));
    },
    handleOnHorizontalScroll: (e) => dispatch(updateScrollLeft(e.target.scrollLeft)),
    setScrollWidth: (scrollWidth) => dispatch(updateScrollWidth(scrollWidth)),
    updateClientSize: (width, height) => dispatch(updateClientSize(width, height)),
});

export const HomeScene = connect(mapStateToProps, mapDispatchToProps)( HomeContainer );

export default HomeScene;
