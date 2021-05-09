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
                Currently, I&apos;m on the road, taking the next six months
                until October to travel around the US. The plan is to focus more
                on camping and hiking, especially while I&apos;m out in the
                desert. Stay tuned for more updates!
            </p>
        </article>
    );
};
