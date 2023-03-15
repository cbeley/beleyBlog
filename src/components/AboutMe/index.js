import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import SocialIcons from '~src/components/SocialIcons';

import * as styles from './styles.module.css';

export default () => {
    const { imageOfMe } = useStaticQuery(graphql`
        query {
            imageOfMe: file(
                relativePath: { eq: "components/AboutMe/chris-beley.jpg" }
            ) {
                childImageSharp {
                    id
                    fluid(maxWidth: 900, quality: 80) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    `);

    return (
        <article>
            <header className={styles.header}>
                <h1 className={styles.introHeaderText}>Hey, I&apos;m Chris!</h1>

                <Img
                    className={styles.meImage}
                    fluid={imageOfMe.childImageSharp.fluid}
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
                <a
                    href="/Chris_Beley_Resume_3-3-23.pdf"
                    title="Chris Beley's Resume"
                >
                    pdf version of my resume
                </a>
                .
            </p>
        </article>
    );
};
