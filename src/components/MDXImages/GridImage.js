import React from 'react';
import Img from 'gatsby-image';
import classNames from 'classnames';

import styles from './ImageGrid.module.css';

export default (className) =>
    ({
        img,
        marginTop = false,
        marginBottom = false,
        marginRight = false,
        marginLeft = false,
    }) => {
        return (
            <Img
                className={classNames(className, styles.image, {
                    [styles.topImgMargin]: marginTop,
                    [styles.bottomImgMargin]: marginBottom,
                    [styles.rightImgMargin]: marginRight,
                    [styles.leftImgMargin]: marginLeft,
                })}
                fluid={img.large.fluid}
            />
        );
    };
