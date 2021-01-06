import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import 'prismjs/themes/prism-solarizedlight.css';
import 'prismjs/plugins/command-line/prism-command-line.css';

import Header from '~src/components/Header';
import Footer from '~src/components/Footer';

import styles from './styles.module.css';
import './global.css';

export default ({ children, currentCategory }) => {
    const {
        site: {
            siteMetadata: { title },
        },
    } = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `);

    return (
        <div className={styles.container}>
            <Header currentCategory={currentCategory} />
            {children}
            <Footer />
        </div>
    );
};
