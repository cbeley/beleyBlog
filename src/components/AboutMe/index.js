import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

import resumeLink from '~src/components/resume';
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
            <p>
                Unfortunately, I was impacted by the layoffs at Twitter. I plan
                to start interviewing again soon, so feel free to{' '}
                <a title="email" href="mailto:chris.beley+blog@gmail.com">
                    get in touch
                </a>{' '}
                or{' '}
                <a
                    title="LinkedIn"
                    href="https://www.linkedin.com/in/chris-beley"
                >
                    check me out on linkedIn
                </a>{' '}
                if you have something that may interest me. You can also
                download a{' '}
                <a href={resumeLink} title="Chris Beley's Resume">
                    pdf version of my resume
                </a>
                .
            </p>
        </article>
    );
};
