const resolvePath = require('path').resolve;
const originalSlugify = require('slugify');
const urlJoin = require('url-join');

const slugify = (...args) => {
    return originalSlugify.apply(undefined, [
        ...args,
        {
            lower: true,
            locale: 'en',
        },
    ]);
};

exports.createSchemaCustomization = ({ actions: { createTypes } }) => {
    createTypes(`
        type CategoriesJson implements Node {
            name: String!
            path: String!
            posts(limit: Int): [MarkdownRemark]
        }

        type MarkdownRemark implements Node {
            frontmatter: Frontmatter
        }

        type Frontmatter {
            category: CategoriesJson @link(by: "name")
            slug: String!
        }
    `);
};

exports.createResolvers = ({ createResolvers }) => {
    createResolvers({
        Frontmatter: {
            slug: {
                async resolve({ title, category }, args, context) {
                    const {
                        path: categoryPath,
                    } = await context.nodeModel.runQuery({
                        query: {
                            filter: {
                                name: { eq: category },
                            },
                        },
                        type: 'CategoriesJson',
                        firstOnly: true,
                    });

                    return urlJoin(categoryPath, slugify(title));
                },
            },
        },

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
                    id
                    frontmatter {
                        category {
                            path
                        }
                        title
                        slug
                    }
                }
            }
        }
    `);

    posts.nodes.forEach(({ frontmatter: { slug }, id }) => {
        createPage({
            path: slug,
            component: resolvePath('./src/templates/post.js'),
            context: {
                id,
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
