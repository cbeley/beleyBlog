import React from 'react';
import BaseLayout from '~src/components/Layouts/Base';

import * as styles from './styles.module.css';

export default ({ children, ...props }) => {
    return (
        <BaseLayout {...props}>
            <main className={styles.main}>{children}</main>
        </BaseLayout>
    );
};
