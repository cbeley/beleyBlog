import React from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';

import styles from './styles.module.css';

export default ({ posts, onePostPerLine }) => {
    return (
        <ul className={styles.list}>
            {posts.map(
                ({ id, frontmatter: { title, date, slug }, excerpt }) => (
                    <li
                        className={classNames(styles.listItem, {
                            [styles.onePostPerLine]: onePostPerLine,
                        })}
                        key={id}
                    >
                        <Link to={slug} className={styles.postLinkWrapper}>
                            <article className={styles.post}>
                                <header>
                                    <small>{date}</small>

                                    <h1>{title}</h1>
                                </header>
                                <p>{excerpt}</p>
                            </article>
                        </Link>
                    </li>
                )
            )}
        </ul>
    );
};
