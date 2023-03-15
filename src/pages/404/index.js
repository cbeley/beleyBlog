import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import { WideLayout } from '~src/components/Layouts';

import * as styles from './styles.module.css';

const NotFoundPage = ({ data: { notFoundImage } }) => {
    return (
        <WideLayout>
            <h1 className={styles.header}>404</h1>
            <h2 className={styles.subHeader}>
                Not that I didn&apos;t keep driving down that road...
            </h2>
            <GatsbyImage
                image={notFoundImage.childImageSharp.gatsbyImageData}
                className={styles.notFoundImage}
            />
        </WideLayout>
    );
};

export default NotFoundPage;

export const query = graphql`
    {
        notFoundImage: file(relativePath: { eq: "pages/404/404.jpg" }) {
            childImageSharp {
                id
                gatsbyImageData(width: 990, layout: CONSTRAINED)
            }
        }
    }
`;
