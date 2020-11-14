import React from 'react';
import { Link } from 'gatsby';

import styles from './styles.module.css';

export default ({ posts, sectionTitle, sectionPath }) => {
    return (
        <section>
            <h1>{sectionTitle}</h1>

            <ul className={styles.list}>
                {posts.map(
                    ({
                        fields: { slug } = {},
                        id,
                        frontmatter: { title, date },
                        excerpt,
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

            <Link className={styles.readMore} to={sectionPath}>
                {`Read more ${sectionTitle} posts...`}
            </Link>
        </section>
    );
};
