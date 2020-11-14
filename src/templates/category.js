import React from 'react';
import { graphql } from 'gatsby';

import StandardLayout from '~src/components/StandardLayout';
import PostListSection from '~src/components/PostListSection';

export default ({
    data: {
        allMarkdownRemark: { nodes: posts },
    },
    pageContext: { categoryName },
}) => {
    return (
        <StandardLayout>
            <h1>{categoryName}</h1>
            <p>This is a category page!</p>
            <PostListSection
                posts={posts}
                sectionTitle={categoryName}
                sectionPath="todo"
            />
        </StandardLayout>
    );
};

export const query = graphql`
    query($categoryName: String!) {
        allMarkdownRemark(
            filter: { frontmatter: { category: { eq: $categoryName } } }
        ) {
            nodes {
                ...postSummary
            }
        }
    }
`;
