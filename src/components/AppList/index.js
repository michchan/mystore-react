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

export class AppList extends Component {
    static defaultProps = {
        data: [],
    };
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.object),
        loadMoreRows: PropTypes.func.isRequired,
        appLookUpLoading: PropTypes.bool.isRequired,
        loadingMore: PropTypes.bool.isRequired,
    };

    render() {
        const props = this.props;
        const { 
            data, 
            loadMoreRows,
            loadingMore,
        } = props;
        
        const rowCount = loadingMore? data.length + 1 : data.length;
    
        return (
            <AutoSizer>
                {({ width, height }) => (
                    <List
                        width={width}
                        height={height}
                        rowCount={rowCount}
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
