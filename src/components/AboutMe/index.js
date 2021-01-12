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
                    fluid(maxWidth: 900, quality: 90) {
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
                I&apos;m not sure what I want to put here yet. This will say a
                few amazing things about me, because I&apos;ll have so many
                amazing things to say. When it is done, it&apos;ll probally be
                the most interesting thing you&apos;ve ever read in your life!
            </p>
        </article>
    );
};
