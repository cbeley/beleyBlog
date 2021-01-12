import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import { StandardLayout } from '~src/components/Layouts';

export default ({
    data: {
        mdx: {
            body,
            frontmatter: {
                title,
                category: { name: categoryName },
            },
        },
    },
}) => {
    return (
        <StandardLayout currentCategory={categoryName}>
            <h1>{title}</h1>
            <article>
                <MDXRenderer>{body}</MDXRenderer>
            </article>
        </StandardLayout>
    );
};

export const query = graphql`
    query($id: String!) {
        mdx(id: { eq: $id }) {
            body
            frontmatter {
                title
                category {
                    name
                }
            }
        }
    }
`;
