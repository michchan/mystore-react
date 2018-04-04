import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';
import { AutoSizer, List, InfiniteLoader } from 'react-virtualized';
import { AppListItem } from '../AppListItem';
import { assetImages } from '../../assets';

const _isRowLoaded = ({ index }, data) => {
    return !!data[index];
}

const _rowRenderer = ({
    index, 
    key, 
    style, 
    isScrolling,
    isVisible,
    parent,
}, props) => {
    const { 
        data, 
        loadingMore,
        appLookUpLoading,
    } = props;


    if (loadingMore && index === data.length) {
        return (
            <div key={key} style={style} className={styles.container}>
                <img src={assetImages.loadingSpinner} alt='loading' className={styles.loadingSpinner}/>
            </div>
        );
    }

    const item = data[index];
    return (
        <AppListItem 
            key={key} 
            style={style}
            data={item}
            index={index}
            appLookUpLoading={props.appLookUpLoading}
        />
    );
}

export const AppList = (props = {}) => {
    const { 
        data, 
        loadMoreRows,
        loadingMore,
        headerHeight,
    } = props;
    
    const rowCount = loadingMore? data.length + 1 : data.length;

    return (
        <AutoSizer>
            {({ width, height }) => (
                <List
                    width={width}
                    height={height - headerHeight - 5} // 5 is to make sure the window scroll bar will not show
                    rowCount={rowCount}
                    rowHeight={120}
                    rowRenderer={(row) => _rowRenderer(row, props)}
                    onScroll={(data) => _handleOnScroll(data, props)}
                />
            )}
        </AutoSizer>
    );
};

const _handleOnScroll = ({ clientHeight, scrollHeight, scrollTop }, props) => {
    const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight && scrollTop !== 0;
    // Infinite scroll
    scrolledToBottom && props.loadMoreRows();
}

AppList.defaultProps = {
    data: [],
    headerHeight: 0,
};

AppList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    loadMoreRows: PropTypes.func.isRequired,
    appLookUpLoading: PropTypes.bool.isRequired,
    loadingMore: PropTypes.bool.isRequired,
    headerHeight: PropTypes.number,
};

export default AppList;
