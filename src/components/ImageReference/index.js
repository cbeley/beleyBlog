import React from 'react';

import * as styles from './styles.module.css';

/**
 * Ideally, I would make a new image component that supports
 * captions and references; however, it's awkward to use with
 * mdx unless I make a remark plugin for it. The situation gets
 * more complicated because of a bigger bug with remark plugins and
 * mdx in general, which is because I can't just embed markdown in my
 * image captions.
 *
 * The only real alternative now is to do hacky things like define images
 * ahead of time in the frontmatter as far as I can see...for another day.
 *
 * So, this is my hackey work-arround for adding linked annotations to
 * images.
 *
 * https://github.com/gatsbyjs/gatsby/discussions/25066
 * https://github.com/gatsbyjs/gatsby/issues/26882
 */
export default ({ href, children }) => {
    return (
        <small className={styles.imgRef}>
            <a href={href}>{children}</a>
        </small>
    );
};
