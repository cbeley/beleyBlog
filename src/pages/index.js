import React from 'react';
import { graphql } from 'gatsby';

import { WideLayout } from '~src/components/Layouts';
import Head from '~src/components/Head';
import PostListSection from '~src/components/PostListSection';
import AboutMe from '~src/components/AboutMe';

const IndexPage = ({
    data: {
        allCategoriesJson: { nodes: categories },
        site: {
            siteMetadata: { siteUrl },
        },
    },
}) => {
    return (
        <WideLayout>
            <Head
                siteUrl={siteUrl}
                title="A Bit of Everything"
                description="A blog by Chris Beley about travel, software engineering, and more."
            />
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

export default IndexPage;

export const query = graphql`
    query {
        allCategoriesJson(sort: { fields: [position], order: [ASC] }) {
            nodes {
                ...categorySummary
            }
        }
        site {
            siteMetadata {
                siteUrl
            }
        }
    }
`;
