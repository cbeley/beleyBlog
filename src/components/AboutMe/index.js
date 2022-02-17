import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import SocialIcons from '~src/components/SocialIcons';

import styles from './styles.module.css';

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
        <article className={styles.article}>
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
                Currently, I&apos;m taking an extended career break from my
                former life as a Software Engineer in San Francisco.
            </p>
            <p>
                After months of camping, hiking, and driving arround the US,
                I&apos;m now back in San Francisco! I&apos;m currently working
                on getting resituated and plan to begin interviewing again soon.
                Feel free to{' '}
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
                    href="/Chris_Beley_Resume_2-16-22.pdf"
                    title="Chris Beley's Resume"
                >
                    pdf version of my resume
                </a>
                .
            </p>
        </article>
    );
};
