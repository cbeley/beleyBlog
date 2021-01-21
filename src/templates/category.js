import React from 'react';
import { graphql } from 'gatsby';

import Head from '~src/components/Head';
import { StandardLayout } from '~src/components/Layouts';
import PostList from '~src/components/PostList';

export default ({
    data: {
        allMdx: { nodes: posts },
    },
    pageContext: { categoryName },
}) => {
    return (
        <StandardLayout currentCategory={categoryName}>
            <Head title={categoryName} />
            <h1>{categoryName}</h1>
            <PostList posts={posts} onePostPerLine />
        </StandardLayout>
    );
};

export const query = graphql`
    query($categoryName: String!) {
        allMdx(
            filter: {
                frontmatter: {
                    category: { name: { eq: $categoryName } }
                    draft: { eq: false }
                }
            }
            sort: { fields: [frontmatter___date], order: DESC }
        ) {
            nodes {
                ...postSummary
            }
        }
    }
`;
