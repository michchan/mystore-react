import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        scrollOffset: PropTypes.number.isRequired,
    };

    componentDidMount() {
        this._listRef && (this._listRef.scrollLeft = this.props.scrollOffset);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.scrollOffset !== this.props.scrollOffset) {
            this._listRef && (this._listRef.scrollLeft = nextProps.scrollOffset);
        }
    }

    render() {
        const props = this.props;
        const {
            data,
            meta,
            appLookUpLoading,
            scrollOffset,
        } = props;
    
        const listTitle = meta[appStoreMetaFields.TITLE];
    
        return (
            <div className={styles.container}>
                <div className={styles.listTitle}>{ listTitle }</div>
                <div ref={ref => this._listRef = ref} className={styles.listContainer}>
                    <div className={styles.spacer}/>
                    {data.map((item, index) => (
                        <AppHorizontalListItem
                            key={index} 
                            index={index}
                            data={item}
                            appLookUpLoading={props.appLookUpLoading}
                        />
                    ))}
                    <div className={styles.spacer}/>
                </div>
            </div>
        );
    }
};

export default AppHorizontalList;
