import React from 'react';
import { Link } from 'gatsby';

import SocialIcons from '~src/components/SocialIcons';

import styles from './styles.module.css';

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
                                Contact
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            <small className={styles.copyright}>&copy; Chris Beley 2021</small>
        </footer>
    );
};
