import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import classNames from 'classnames';

import styles from './styles.module.css';

export default ({ currentCategory }) => {
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
                    id
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
                    {categories.map(({ name, path, id }) => (
                        <li
                            key={id}
                            className={classNames({
                                [styles.currentCategory]:
                                    name === currentCategory,
                            })}
                        >
                            <Link
                                key={name}
                                to={path}
                                className={styles.navLink}
                            >
                                {name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    );
};
