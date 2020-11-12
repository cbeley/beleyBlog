import React from 'react';
import { graphql } from 'gatsby';

import WideLayout from '~src/components/WideLayout';
import PostListSection from '~src/components/PostListSection';

export default ({
    data: {
        allFile: { edges: pages },
    },
}) => {
    return (
        <WideLayout>
            <PostListSection pages={pages} sectionTitle="Engineering" />
            <PostListSection pages={pages} sectionTitle="Travel" />
            <PostListSection pages={pages} sectionTitle="Food" />
        </WideLayout>
    );
};

export const query = graphql`
    query {
        allFile(
            limit: 4
            filter: {
                childMarkdownRemark: {
                    internal: { type: { eq: "MarkdownRemark" } }
                }
                sourceInstanceName: { eq: "pages" }
            }
            sort: {
                fields: [childMarkdownRemark___frontmatter___date]
                order: DESC
            }
        ) {
            edges {
                node {
                    id
                    relativePath
                    childMarkdownRemark {
                        excerpt
                        fields {
                            slug
                        }
                        frontmatter {
                            title
                            date(formatString: "MMMM D, YYYY")
                        }
                    }
                }
            }
        }
    }
`;
