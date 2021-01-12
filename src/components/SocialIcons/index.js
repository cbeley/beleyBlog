import React from 'react';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

import styles from './styles.module.css';

export default () => {
    return (
        <aside className={styles.socialMediaIcons}>
            <a href="https://twitter.com/Chris_Beley">
                <FaTwitter className={styles.icon} />
            </a>
            <a href="www.linkedin.com/in/chris-beley">
                <FaLinkedin className={styles.icon} />
            </a>
            <a href="https://github.com/cbeley{">
                <FaGithub className={styles.icon} />
            </a>
        </aside>
    );
};
