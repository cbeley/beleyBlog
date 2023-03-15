import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';

import * as styles from './WideImage.module.css';

export default ({ img }) => {
    return (
        <GatsbyImage
            image={img.wide.gatsbyImageData}
            className={styles.wideImage}
        />
    );
};
