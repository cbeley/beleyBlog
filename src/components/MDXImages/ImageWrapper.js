import React from 'react';

import styles from './ImageWrapper.module.css';

export default (ImageComponent) => ({ caption, ...props }) => {
    return (
        <figure className={styles.wrapper}>
            <ImageComponent {...props} />
            {caption && (
                <figcaption className={styles.caption}>{caption}</figcaption>
            )}
        </figure>
    );
};
