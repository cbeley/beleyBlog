import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import classNames from 'classnames';

import * as styles from './ImageGrid.module.css';

export default (className) =>
    ({
        img,
        marginTop = false,
        marginBottom = false,
        marginRight = false,
        marginLeft = false,
    }) => {
        return (
            <GatsbyImage
                image={img.large.gatsbyImageData}
                className={classNames(className, styles.image, {
                    [styles.topImgMargin]: marginTop,
                    [styles.bottomImgMargin]: marginBottom,
                    [styles.rightImgMargin]: marginRight,
                    [styles.leftImgMargin]: marginLeft,
                })}
            />
        );
    };
