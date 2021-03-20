import React from 'react';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

import styles from './styles.module.css';

export default () => {
    return (
        <aside className={styles.socialMediaIcons}>
            <a
                title="Chris Beley's Twitter"
                href="https://twitter.com/Chris_Beley"
            >
                <FaTwitter className={styles.icon} />
            </a>
            <a
                title="Chris Beley's LinkedIn"
                href="https://www.linkedin.com/in/chris-beley"
            >
                <FaLinkedin className={styles.icon} />
            </a>
            <a title="Chris Beley's Github" href="https://github.com/cbeley">
                <FaGithub className={styles.icon} />
            </a>
        </aside>
    );
};
