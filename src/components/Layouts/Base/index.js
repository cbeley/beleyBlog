import React from 'react';

import 'prismjs/themes/prism-solarizedlight.css';
import 'prismjs/plugins/command-line/prism-command-line.css';

import Header from '~src/components/Header';
import Footer from '~src/components/Footer';

import * as styles from './styles.module.css';
import './global.module.css';

export default ({ children, currentCategory }) => {
    return (
        <div className={styles.container}>
            <Header currentCategory={currentCategory} />
            {children}
            <Footer />
        </div>
    );
};
