import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';
import { AutoSizer, List, InfiniteLoader } from 'react-virtualized';
import { AppListItem } from '../AppListItem';

const _rowRenderer = ({
    index, 
    key, 
    style, 
    isScrolling,
    isVisible,
    parent,
}, props) => {
    const item = props.data[index];

    return (
        <AppListItem 
            key={key} 
            style={style}
            data={item}
            index={index}
        />
    );
}

export const AppList = (props = {}) => {
    const { data } = props;

    return (
        <AutoSizer>
            {({ width, height }) => (
                <List
                    width={width}
                    height={height}
                    rowCount={data.length}
                    rowHeight={120}
                    rowRenderer={(row) => _rowRenderer(row, props)}
                />
            )}
        </AutoSizer>
    );
};

AppList.defaultProps = {
    data: [],
};
AppList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
};

export default AppList;
