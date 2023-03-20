import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import classNames from 'classnames';

import * as styles from './styles.module.css';

export default ({ currentCategory }) => {
    const {
        site: {
            siteMetadata: {
                logo: { title, subTitle },
            },
        },
        allCategoriesJson: { nodes: categories },
    } = useStaticQuery(graphql`
        {
            site {
                siteMetadata {
                    logo {
                        title
                        subTitle
                    }
                }
            }
            allCategoriesJson(sort: { fields: [position], order: [ASC] }) {
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
                <a title="Home" href="/">
                    <StaticImage
                        src="./me.jpg"
                        className={styles.logo}
                        width={65}
                        height={65}
                        quality={90}
                        layout="fixed"
                    />
                </a>
                <a title="Home" href="/" className={styles.headerText}>
                    <h1>{title}</h1>
                    <h2>{subTitle}</h2>
                </a>

                <nav>
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
                </nav>
            </div>
        </header>
    );
};
