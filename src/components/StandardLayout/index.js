import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import styles from './styles.module.css';

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
        <>
            <header>
                <h1>{title}</h1>
            </header>

            <main className={styles.container}>{children}</main>
        </>
    );
};
