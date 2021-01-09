import React from 'react';
import { graphql } from 'gatsby';

import StandardLayout from '~src/components/StandardLayout';
import PostListSection from '~src/components/PostListSection';

export default ({
    data: {
        allMdx: { nodes: posts },
    },
    pageContext: { categoryName },
}) => {
    return (
        <StandardLayout currentCategory={categoryName}>
            <h1>{categoryName}</h1>
            <p>This is a category page!</p>
            <PostListSection
                posts={posts}
                sectionTitle={categoryName}
                sectionPath="/"
            />
        </StandardLayout>
    );
};

export const query = graphql`
    query($categoryName: String!) {
        allMdx(
            filter: {
                frontmatter: { category: { name: { eq: $categoryName } } }
            }
        ) {
            nodes {
                ...postSummary
            }
        }
    }
`;
