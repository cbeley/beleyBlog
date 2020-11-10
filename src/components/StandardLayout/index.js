import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Header from '../Header';
import Footer from '../Footer';
import styles from './styles.module.css';

import './global.css';

export default ({ children }) => {
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
            <Header />
            <main className={styles.main}>{children}</main>
            <Footer />
        </div>
    );
};
