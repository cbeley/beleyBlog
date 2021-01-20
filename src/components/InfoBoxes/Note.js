import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';

import styles from './styles.module.css';

export default ({ children }) => {
    return (
        <aside className={styles.noteBox}>
            <h1>
                <FaInfoCircle className={styles.infoIcon} /> Note
            </h1>
            <p>{children}</p>
        </aside>
    );
};
