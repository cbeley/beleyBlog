import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import styles from './styles.module.css';

export default () => {
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
        <footer className={styles.footer}>
            <p>Copyright &copy; Christopher Beley</p>
            <p>
                <a href="#">Who is this Chris guy?</a>
            </p>
        </footer>
    );
};
