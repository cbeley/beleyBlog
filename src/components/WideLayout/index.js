import React from 'react';
import BaseLayout from '~src/components/BaseLayout';

import styles from './styles.module.css';

export default ({ children }) => {
    return (
        <BaseLayout>
            <main className={styles.main}>{children}</main>
        </BaseLayout>
    );
};
