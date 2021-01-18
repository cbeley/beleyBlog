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
                Welcome to my little corner of the internet where I write about
                just about anything that interests me! Currently, I&apos;m
                taking an extended career break from my former life as a
                Software Engineer in San Francisco.
            </p>
            <p>
                I&apos;m spending my days enjoying one of the best cities in the
                world (San Francisco), seeking out fancy beer, hiking,
                occasionally wandering the desert, and, for some odd reason,
                spending way too much time writing a blog and deployment system
                for it from scratch. When covid calms down a bit, I plan to
                travel domestically; focusing on hiking and exploring random
                places in the middle of nowhere. If things continue to get
                better, I see some extended world travel in my future.
            </p>
        </article>
    );
};
