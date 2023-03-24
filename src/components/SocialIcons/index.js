import React from 'react';
import {
    FaTwitter,
    FaLinkedin,
    FaGithub,
    FaInstagram,
    FaFilePdf,
} from 'react-icons/fa';

import resumeLink from '~src/components/resume';

import * as styles from './styles.module.css';

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
                title="Chris Beley's Instagram"
                href="https://www.instagram.com/chrisbeley/"
            >
                <FaInstagram className={styles.icon} />
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
            <a title="Chris Beley's Resume" href={resumeLink}>
                <FaFilePdf className={styles.icon} />
            </a>
        </aside>
    );
};
