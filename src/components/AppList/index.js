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
        isFiltered,
        pageSize,
    } = props;

    const isExtrudedItem = index === data.length;  
    const isTooFewFilteredItem = isFiltered && data.length < pageSize;

    if (loadingMore && isExtrudedItem && !isTooFewFilteredItem) {
        return (
            <div key={key} style={style} className={styles.container}>
                <img src={assetImages.loadingSpinner} alt='loading' className={styles.loadingSpinner}/>
            </div>
        );
    }

    const item = data[index];

    if (!item) return (<div key={key} style={style} className={styles.container}/>);

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
        handleOnScroll,
        isFiltered,
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
    props.handleOnScroll && props.handleOnScroll({ clientHeight, scrollHeight, scrollTop });
    scrolledToBottom && props.loadMoreRows();
}

AppList.defaultProps = {
    data: [],
    headerHeight: 0,
    pageSize: 10,
    handleOnScroll: ()=>console.log('AppList: please pass handleOnScroll prop'),
};

AppList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    loadMoreRows: PropTypes.func.isRequired,
    handleOnScroll: PropTypes.func,
    appLookUpLoading: PropTypes.bool.isRequired,
    loadingMore: PropTypes.bool.isRequired,
    isFiltered: PropTypes.bool.isRequired,
    headerHeight: PropTypes.number,
    pageSize: PropTypes.number,
};

export default AppList;
