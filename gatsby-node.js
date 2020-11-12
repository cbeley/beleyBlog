const path = require('path');

const { createFilePath, createNodeField } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions: { createNodeField } }) => {
    if (node.internal.type === `MarkdownRemark`) {
        const parentNode = getNode(node.parent);

        if (parentNode.sourceInstanceName === 'pages') {
            const slug = createFilePath({ node, getNode, basePath: 'pages' });

            createNodeField({
                node,
                name: 'slug',
                value: slug,
            });
        }
    }
};

exports.createPages = async ({ graphql, actions: { createPage } }) => {
    const {
        data: {
            allFile: { edges },
        },
    } = await graphql(`
        query {
            allFile(
                filter: {
                    childMarkdownRemark: {
                        internal: { type: { eq: "MarkdownRemark" } }
                    }
                    sourceInstanceName: { eq: "pages" }
                }
            ) {
                edges {
                    node {
                        childMarkdownRemark {
                            fields {
                                slug
                            }
                        }
                    }
                }
            }
        }
    `);

    edges.forEach(
        ({
            node: {
                childMarkdownRemark: {
                    fields: { slug },
                },
            },
        }) => {
            createPage({
                path: slug,
                component: path.resolve('./src/templates/post.js'),
                context: {
                    slug,
                },
            });
        }
    );
};
