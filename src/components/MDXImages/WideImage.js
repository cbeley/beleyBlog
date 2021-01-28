import React from 'react';
import Img from 'gatsby-image';

import styles from './WideImage.module.css';

export default ({ img }) => {
    return <Img className={styles.wideImage} fluid={img.wide.fluid} />;
};
