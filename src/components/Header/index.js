import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import styles from './styles.module.css';

export default () => {
    const {
        site: {
            siteMetadata: {
                logo: { title, subTitle },
            },
        },
        logoImage,
        allCategoriesJson: { nodes: categories },
    } = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    logo {
                        title
                        subTitle
                    }
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

            allCategoriesJson {
                nodes {
                    name
                    path
                }
            }
        }
    `);

    return (
        <header className={styles.header}>
            <div className={styles.innerWrapper}>
                <a className={styles.logoLink} href="/">
                    <Img
                        className={styles.logo}
                        fixed={logoImage.childImageSharp.fixed}
                    />
                </a>
                <a href="/" className={styles.headerText}>
                    <h1>{title}</h1>
                    <h2>{subTitle}</h2>
                </a>

                <ul>
                    {categories.map(({ name, path }) => (
                        <li>
                            <a key={name} href={path}>
                                {name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    );
};
