import React from 'react';
import { graphql } from 'gatsby';

import WideLayout from '~src/components/WideLayout';
import PostListSection from '~src/components/PostListSection';

export default ({
    data: {
        allCategoriesJson: { nodes: categories },
    },
}) => {
    return (
        <WideLayout>
            {categories.map(({ name, path, posts }) => (
                <PostListSection
                    posts={posts}
                    sectionTitle={name}
                    sectionPath={path}
                />
            ))}
        </WideLayout>
    );
};

export const query = graphql`
    query {
        allCategoriesJson {
            nodes {
                ...categorySummary
            }
        }
    }
`;
