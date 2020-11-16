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
        data: { categories, posts },
    } = await graphql(`
        query {
            categories: allCategoriesJson {
                nodes {
                    name
                    path
                }
            }

            posts: allMarkdownRemark {
                nodes {
                    fields {
                        slug
                    }
                }
            }
        }
    `);

    posts.nodes.forEach(({ fields: { slug } }) => {
        createPage({
            path: slug,
            component: resolvePath('./src/templates/post.js'),
            context: {
                slug,
            },
        });
    });

    categories.nodes.forEach(({ name, path }) => {
        createPage({
            path,
            component: resolvePath('./src/templates/category.js'),
            context: {
                categoryName: name,
            },
        });
    });
};
