import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Rating from 'react-rating';
import { CSSTransition } from 'react-transition-group';

import styles from './style.module.css';
import { appFields as fields } from '../../api';
import { assetImages } from '../../assets';
import { isMobileAgent } from '../../lib';

export class AppListItem extends Component {
    static defaultProps = {
    };
    static propTypes = {
        data: PropTypes.object.isRequired,
        index: PropTypes.number.isRequired,
        scrollTop: PropTypes.number.isRequired,
        lastScrollTop: PropTypes.number.isRequired,
        appLookUpLoading: PropTypes.bool.isRequired,
        isAppeared: PropTypes.bool.isRequired,
        addAppearedItem: PropTypes.func.isRequired,
    };

    componentWillMount() {
        if (this.props.isVisible) 
            this.props.addAppearedItem(this.props.index);
    }
    
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
            isAppeared,
            addAppearedItem,
            ...passedProps
        } = props;

        const isMobile = isMobileAgent();

        const isScrollingDown = scrollTop > lastScrollTop;
        const rowCount = (parent.props && parent.props.rowCount) || 0;
        const rowNumber = index + 1;
        const isEvenRow = (index + 1) % 2 === 0;
        
        const itemId = data[fields.ID];
        const appName = data[fields.NAME];
        const appCatName = data[fields.CATEGORY_LABEL];
        const appIconSrc = data[fields.ICON_100];
        const appIconHeight = data[fields.ICON_100_HEIGHT];
        const appIconBorderRadius = isEvenRow ? '50%' : '25%'; // App icon should be cropped round for odd rows and circle for even rows
        const userRating = data[fields.AVG_USER_RATING];
        const userRatingCount = data[fields.USER_RATING_COUNT];
        const appStoreLinkType = data[fields.LINK_TYPE];
        const appStoreLinkRel = data[fields.LINK_REL];
        const appStoreLinkURL = data[fields.LINK_URL];

        const renderBody = state => (
            <a 
                {...passedProps} 
                href={appStoreLinkURL}
                rel={appStoreLinkRel}
                type={appStoreLinkType}
                target={'blank'}
                className={styles.container}
            >
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
            </a>
        )

        return (
            isAppeared || isMobile? 
                renderBody() :
                <CSSTransition
                    in={isVisible}
                    timeout={100}
                    classNames={styles.containerTransition}
                    onExited={() => addAppearedItem(index) }
                    mountOnEnter
                >
                    { renderBody }
                </CSSTransition>
        );
    }
};

export default AppListItem;
