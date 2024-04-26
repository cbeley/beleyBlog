import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

import SocialIcons from '~src/components/SocialIcons';

import * as styles from './styles.module.css';

export default () => {
    return (
        <article>
            <header className={styles.header}>
                <h1 className={styles.introHeaderText}>Hey, I&apos;m Chris!</h1>

                <StaticImage
                    src="./chris-beley.jpg"
                    className={styles.meImage}
                    width={900}
                    quality={80}
                    layout="constrained"
                />
            </header>
            <SocialIcons />
            <p className={styles.introText}>
                Welcome to Chris Beley&apos;s little corner of the internet
                where I write about just about anything that interests me!
            </p>
        </article>
    );
};
