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
            posts(limit: Int): [Mdx]
        }

        type Mdx implements Node {
            frontmatter: Frontmatter
        }

        type Frontmatter {
            category: CategoriesJson @link(by: "name")
            slug: String!
            draft: Boolean!
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
            draft: {
                resolve({ draft }) {
                    if (process.env.TREAT_DRAFTS_AS_PUBLISHED) return false;
                    return Boolean(draft);
                },
            },
        },

        CategoriesJson: {
            posts: {
                type: ['Mdx'],

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
                                        draft: { eq: false },
                                    },
                                },
                            },
                            type: 'Mdx',
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

            posts: allMdx {
                nodes {
                    id
                    frontmatter {
                        category {
                            path
                        }
                        title
                        slug
                        draft
                    }
                }
            }
        }
    `);

    posts.nodes.forEach(({ frontmatter: { slug, draft }, id }) => {
        if (process.env.BUILD_DRAFTS || !draft) {
            createPage({
                path: slug,
                component: resolvePath('./src/templates/post.js'),
                context: {
                    id,
                },
            });
        }
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
