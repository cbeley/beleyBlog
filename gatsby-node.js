const resolvePath = require('path').resolve;

const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createSchemaCustomization = ({ actions: { createTypes } }) => {
    createTypes(`
        type CategoriesJson implements Node {
            name: String!
            path: String!
            posts(limit: Int): [MarkdownRemark] @link(by: "frontmatter.category.name", from: "name")
        }

        type MarkdownRemark implements Node {
            frontmatter: Frontmatter
        }

        type Frontmatter {
            category: CategoriesJson @link(by: "name")
        }
    `);
};

exports.createResolvers = ({ createResolvers }) => {
    createResolvers({
        CategoriesJson: {
            posts: {
                type: ['MarkdownRemark'],

                async resolve({ name }, { limit }, context) {
                    const allPostsInCategory =
                        (await context.nodeModel.runQuery({
                            query: {
                                sort: {
                                    fields: ['frontmatter.date'],
                                    order: ['DESC'],
                                },
                                filter: {
                                    frontmatter: {
                                        category: {
                                            name: { eq: name },
                                        },
                                    },
                                },
                            },
                            type: 'MarkdownRemark',
                        })) || [];

                    return limit
                        ? allPostsInCategory.slice(0, limit)
                        : allPostsInCategory;
                },
            },
        },
    });
};

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
            posts,
            site: { siteMetadata },
        },
    } = await graphql(`
        query {
            site {
                siteMetadata {
                    categories {
                        name
                        path
                    }
                }
            }
            posts: allFile(
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

    posts.edges.forEach(
        ({
            node: {
                childMarkdownRemark: {
                    fields: { slug },
                },
            },
        }) => {
            createPage({
                path: slug,
                component: resolvePath('./src/templates/post.js'),
                context: {
                    slug,
                },
            });
        }
    );

    siteMetadata.categories.forEach(({ name, path }) => {
        createPage({
            path,
            component: resolvePath('./src/templates/category.js'),
            context: {
                categoryName: name,
            },
        });
    });
};
