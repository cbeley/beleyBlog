import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import styles from './styles.module.css';

export default () => {
    const {
        site: {
            siteMetadata: { title },
        },
        logoImage,
    } = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                }
            }

            logoImage: file(relativePath: { eq: "components/Header/me.jpg" }) {
                childImageSharp {
                    id
                    fixed(width: 65, height: 65, quality: 90) {
                        ...GatsbyImageSharpFixed
                    }
                }
            }
        }
    `);

    return (
        <header className={styles.header}>
            <div className={styles.innerWrapper}>
                <Img
                    className={styles.logo}
                    fixed={logoImage.childImageSharp.fixed}
                />
                <div className={styles.headerText}>
                    <h1>Chris Beley</h1>
                    <h2>A blog about anything & everything.</h2>
                </div>
                <ul>
                    <li>
                        <a href="#">Engineering</a>
                    </li>
                    <li>
                        <a href="#">Travel</a>
                    </li>
                    <li>
                        <a href="#">Food</a>
                    </li>
                    <li>
                        <a href="#">Life</a>
                    </li>
                </ul>
            </div>
        </header>
    );
};
