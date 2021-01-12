import React from 'react';
import { Link } from 'gatsby';

import PostList from '~src/components/PostList';

import styles from './styles.module.css';

export default ({ posts, sectionTitle, sectionPath }) => {
    return (
        <section>
            <header className={styles.sectionHeader}>
                <h1>{sectionTitle}</h1>
                <Link className={styles.readMore} to={sectionPath}>
                    View All
                </Link>
            </header>

            <PostList posts={posts} />
        </section>
    );
};
