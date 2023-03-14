import React from 'react';

import * as styles from './ImageGrid.module.css';

export default ({ children }) => {
    return <div className={styles.grid}>{children}</div>;
};
