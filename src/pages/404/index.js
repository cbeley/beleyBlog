import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import WideLayout from '~src/components/WideLayout';

import styles from './styles.module.css';

export default ({ data: { notFoundImage } }) => {
    return (
        <WideLayout>
            <h1 className={styles.header}>404</h1>
            <h2 className={styles.subHeader}>
                Not that I didn&apos;t keep driving down that road...
            </h2>
            <Img
                className={styles.notFoundImage}
                fluid={notFoundImage.childImageSharp.fluid}
            />
        </WideLayout>
    );
};

export const query = graphql`
    query {
        notFoundImage: file(relativePath: { eq: "pages/404/404.jpg" }) {
            childImageSharp {
                id
                fluid(maxWidth: 990) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
    }
`;
