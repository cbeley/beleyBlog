import React from 'react';
import { Link } from 'gatsby';

import styles from './styles.module.css';

export default ({ pages, sectionTitle }) => {
    return (
        <section>
            <h1>{sectionTitle}</h1>

            <ul className={styles.list}>
                {pages.map(
                    ({
                        node: {
                            childMarkdownRemark: {
                                fields: { slug } = {},
                                id,
                                frontmatter: { title, date },
                                excerpt,
                            } = {},
                        },
                    }) => (
                        <li key={id}>
                            <article className={styles.post}>
                                <header>
                                    <small>{date}</small>
                                    <Link to={slug}>
                                        <h1>{title}</h1>
                                    </Link>
                                </header>
                                <p>{excerpt}</p>
                            </article>
                        </li>
                    )
                )}
            </ul>

            <a className={styles.readMore} href="#">
                {`Read more ${sectionTitle} posts...`}
            </a>
        </section>
    );
};
