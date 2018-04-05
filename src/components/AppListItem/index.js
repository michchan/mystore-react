import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Rating from 'react-rating';
import { CSSTransition } from 'react-transition-group';

import styles from './style.module.css';
import { appFields as fields } from '../../api';
import { assetImages } from '../../assets';

export class AppListItem extends Component {
    static defaultProps = {
    };
    static propTypes = {
        data: PropTypes.object.isRequired,
        index: PropTypes.number.isRequired,
        appLookUpLoading: PropTypes.bool.isRequired,
        scrollTop: PropTypes.number.isRequired,
        lastScrollTop: PropTypes.number.isRequired,
    };
    
    render () {
        const props = this.props;
        const { 
            data, 
            index,
            appLookUpLoading,
            isScrolling,
            isVisible,
            parent,
            scrollTop,
            lastScrollTop,
            ...passedProps
        } = props;
        
        const isScrollingDown = scrollTop > lastScrollTop;
        const rowCount = (parent.props && parent.props.rowCount) || 0;
        const rowNumber = index + 1;
        const isEvenRow = (index + 1) % 2 === 0;
    
        const appName = data[fields.NAME];
        const appCatName = data[fields.CATEGORY_LABEL];
        const appIconSrc = data[fields.ICON_100];
        const appIconHeight = data[fields.ICON_100_HEIGHT];
        const appIconBorderRadius = isEvenRow ? '50%' : '25%'; // App icon should be cropped round for odd rows and circle for even rows
        const userRating = data[fields.AVG_USER_RATING];
        const userRatingCount = data[fields.USER_RATING_COUNT];
        
        return (
                <CSSTransition
                    in={isVisible}
                    timeout={isScrollingDown? 150 : 0}
                    classNames={isScrollingDown? styles.containerTransition : styles.noTransition}
                    mountOnEnter
                >
                    {state => (
                        <div {...passedProps} className={styles.container}>
                            <div className={styles.innerContainer}>
                                <div className={styles.rowNumber}>{ rowNumber }</div>
                
                                <img src={appIconSrc} alt="icon" className={styles.appIcon} style={{
                                    borderRadius: appIconBorderRadius,
                                }}/>
                
                                <div className={styles.colRight}>
                                    <div className={styles.appName}>{ appName }</div>
                                    <div className={styles.appCatName}>{ appCatName }</div>
                                    {
                                        (!!appLookUpLoading) &&
                                        <div className={styles.appRatingContainer}>
                                            <img src={assetImages.loadingSpinner} alt='loading' className={styles.loadingSpinner}/>
                                        </div>
                                    }
                                    {
                                        (!appLookUpLoading && !isNaN(userRating) && !isNaN(userRatingCount)) &&
                                        <div className={styles.appRatingContainer}>  
                                            <div className={styles.userRating}>
                                                <Rating 
                                                    fractions={2} 
                                                    initialRating={+userRating} 
                                                    readonly
                                                    emptySymbol="fa fa-star-o"
                                                    fullSymbol="fa fa-star"
                                                />
                                            </div>
                                            <div className={styles.userRatingCount}>{ `(${userRatingCount})` }</div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    )}
                </CSSTransition>
        );
    }
};

export default AppListItem;
