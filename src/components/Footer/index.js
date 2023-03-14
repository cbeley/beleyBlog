import React from 'react';

import SocialIcons from '~src/components/SocialIcons';

import * as styles from './styles.module.css';

export default () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.topRow}>
                <SocialIcons />
                <nav className={styles.nav}>
                    <ul>
                        <li>
                            <a
                                href="mailto:chris.beley+blog@gmail.com"
                                to="/contact"
                            >
                                Contact Chris Beley
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            <small className={styles.copyright}>&copy; Chris Beley 2022</small>
        </footer>
    );
};
