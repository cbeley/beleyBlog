const resolvePath = require('path').resolve;

const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createSchemaCustomization = ({ actions: { createTypes } }) => {
    createTypes(`
        type BlogCategory {
            name: String!
            path: String!
            posts(limit: Int): [MarkdownRemark!]
        }

        type SiteSiteMetadata {
            categories: [BlogCategory]
        }
    `);
};

exports.createResolvers = ({ createResolvers }) => {
    createResolvers({
        SiteSiteMetadata: {
            categories: {
                type: ['BlogCategory'],

                async resolve({ categories }, args, context) {
                    const allPosts = await context.nodeModel.runQuery({
                        query: {
                            sort: {
                                fields: ['frontmatter.date'],
                                order: ['DESC'],
                            },
                        },
                        type: 'MarkdownRemark',
                    });

                    return categories.map((currentCategory) => ({
                        posts: allPosts.filter(
                            ({ frontmatter: { category } }) => {
                                return currentCategory.name === category;
                            }
                        ),
                        ...currentCategory,
                    }));
                },
            },
        },
        BlogCategory: {
            posts: {
                type: ['MarkdownRemark'],
                resolve({ posts }, { limit }) {
                    return limit ? posts.slice(0, limit) : posts;
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
