import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';
import { AutoSizer, List, InfiniteLoader } from 'react-virtualized';
import { AppListItem } from '../AppListItem';

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

export class AppList extends Component {
    static defaultProps = {
        data: [],
    };
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.object),
        loadMoreRows: PropTypes.func.isRequired,
    };

    render() {
        const props = this.props;
        const { 
            data, 
            loadMoreRows 
        } = props;
    
        return (
            <AutoSizer>
                {({ width, height }) => (
                    <List
                        width={width}
                        height={height}
                        rowCount={data.length}
                        rowHeight={120}
                        rowRenderer={(row) => _rowRenderer(row, props)}
                        onScroll={this._handleOnScroll}
                    />
                )}
            </AutoSizer>
        );
    }

    // Infinite scroll
    _handleOnScroll = ({ clientHeight, scrollHeight, scrollTop }) => {
        const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight && scrollTop !== 0;
        
        scrolledToBottom && this.props.loadMoreRows();
    }
};

export default AppList;
