import React from 'react';
import { graphql } from 'gatsby';

import StandardLayout from '~src/components/StandardLayout';

export default ({
    data: {
        markdownRemark: {
            html,
            frontmatter: { title },
        },
    },
}) => {
    return (
        <StandardLayout>
            <h1>{title}</h1>
            <article dangerouslySetInnerHTML={{ __html: html }} />
        </StandardLayout>
    );
};

export const query = graphql`
    query($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            html
            frontmatter {
                title
            }
        }
    }
`;
