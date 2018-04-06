import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import _ from 'lodash';

import styles from './style.module.css';
import { appStoreMetaFields } from '../../api';
import { AppHorizontalListItem } from '..';

export class AppHorizontalList extends Component {
    static defaultProps = {
        data: [],
        meta: {},
    };
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.object),
        meta: PropTypes.object,
        appLookUpLoading: PropTypes.bool.isRequired,
        isShown: PropTypes.bool.isRequired,
        scrollOffset: PropTypes.number.isRequired,
        setScrollWidth: PropTypes.func.isRequired,
        handleOnScroll: PropTypes.func.isRequired,
    };

    componentDidMount() {
        const { scrollOffset, setScrollWidth } = this.props;
        if (_.isObject(this._listRef)) {
            this._listRef.scrollLeft = scrollOffset;
            setScrollWidth && setScrollWidth(this._listRef.scrollWidth);
        }
    }

    componentWillReceiveProps(nextProps) {
        const { scrollOffset, setScrollWidth, data } = this.props;

        if (nextProps.scrollOffset !== scrollOffset) {
            _.isObject(this._listRef) && (this._listRef.scrollLeft = nextProps.scrollOffset);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { data, setScrollWidth } = this.props;

        if (prevProps.data.length !== data.length) {
            (_.isObject(this._listRef) && setScrollWidth) && 
                setScrollWidth(this._listRef.scrollWidth);
        }
    }

    render() {
        const props = this.props;
        const {
            data,
            meta,
            appLookUpLoading,
            scrollOffset,
            handleOnScroll,
            isShown,
        } = props;
    
        const listTitle = meta[appStoreMetaFields.TITLE];
    
        const renderBody = (state) => (
            <div className={styles.container}>
                <div className={styles.listTitle}>{ listTitle }</div>
                <div ref={ref => this._listRef = ref} className={styles.listContainer} onScroll={handleOnScroll}>
                    <div className={styles.spacer}/>
                    {
                        !!data.length && data.map((item, index) => (
                            <AppHorizontalListItem
                                key={index} 
                                index={index}
                                data={item}
                                appLookUpLoading={props.appLookUpLoading}
                            />
                        ))
                    }
                    {
                        !data.length && 
                            <div className={styles.noResultContainer}>
                                <div className={styles.noResultText}>No Result found.</div>
                            </div>
                    }
                    <div className={styles.spacer}/>
                </div>
            </div>
        );

        return (
            <CSSTransition
                in={isShown}
                timeout={50}
                classNames={styles.containerTransition}
                mountOnEnter
                unmountOnExit
            >
                { renderBody }
            </CSSTransition>
        );
    }
};

export default AppHorizontalList;
