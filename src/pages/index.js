import React from 'react';
import { graphql } from 'gatsby';

import { WideLayout } from '~src/components/Layouts';
import PostListSection from '~src/components/PostListSection';
import AboutMe from '~src/components/AboutMe';

export default ({
    data: {
        allCategoriesJson: { nodes: categories },
    },
}) => {
    return (
        <WideLayout>
            <AboutMe />
            {categories.map(({ id, name, path, posts }) =>
                posts.length ? (
                    <PostListSection
                        key={id}
                        posts={posts}
                        sectionTitle={name}
                        sectionPath={path}
                    />
                ) : null
            )}
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
