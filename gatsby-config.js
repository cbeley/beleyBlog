const path = require('path');
const remarkUnwrapImages = require('remark-unwrap-images');

module.exports = {
    siteMetadata: {
        title: 'Chris Beley',
        logo: {
            title: 'Chris Beley',
            subTitle: 'A Bit of Everything',
        },
        siteUrl: 'https://chrisbeley.com',
    },
    plugins: [
        'gatsby-transformer-json',
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        `gatsby-remark-images`,
        'gatsby-plugin-react-helmet',
        `gatsby-remark-reading-time`,
        'gatsby-plugin-sitemap',
        {
            resolve: `gatsby-plugin-feed`,
            options: {
                query: `
                    {
                        site {
                            siteMetadata {
                                siteUrl
                            }
                        }
                    }
                `,
                feeds: [
                    {
                        serialize: ({
                            query: {
                                allMdx,
                                site: {
                                    siteMetadata: { siteUrl },
                                },
                            },
                        }) => {
                            return allMdx.nodes.map(
                                ({
                                    excerpt,
                                    frontmatter: {
                                        title,
                                        date,
                                        slug,
                                        category,
                                    },
                                }) => {
                                    return {
                                        title,
                                        description: excerpt,
                                        date,
                                        url: siteUrl + slug,
                                        categories: [category.name],
                                        author: 'Chris Beley',
                                    };
                                }
                            );
                        },
                        query: `
                          {
                            allMdx(
                                sort: { order: DESC, fields: [frontmatter___date] },
                                filter: { frontmatter: { draft: { eq: false } } },
                                limit: 20
                            ) {
                                nodes {
                                    excerpt(pruneLength: 400)
                                    frontmatter {
                                        title
                                        slug
                                        date(formatString: "MMMM D, YYYY")
                                        category {
                                            name
                                        }
                                    }
                                }
                            }
                          }
                        `,
                        output: '/rss.xml',
                        site_url: 'https://chrisbeley.com',
                        title: 'A Bit of Everything | Chris Beley',
                    },
                ],
            },
        },
        {
            resolve: `gatsby-plugin-google-gtag`,
            options: {
                trackingIds: ['G-7G3V9DH0YV'],
                gtagConfig: {
                    anonymize_ip: true,
                    cookie_expires: 0,
                },
                pluginConfig: {
                    head: false,
                    respectDNT: true,
                },
            },
        },
        {
            resolve: 'gatsby-plugin-robots-txt',
            options: {
                env: {
                    development: {
                        policy: [{ userAgent: '*', disallow: '/' }],
                    },
                    production: {
                        policy: [{ userAgent: '*', allow: '/' }],
                    },
                },
            },
        },
        {
            resolve: `gatsby-plugin-mdx`,
            options: {
                extensions: ['.md', '.mdx'],
                remarkPlugins: [remarkUnwrapImages],
                gatsbyRemarkPlugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            /* TODO: Set this appropriately. Little iffy since I use
                            'ch', so may want to think about how best to set this. */
                            maxWidth: 683,
                            showCaptions: true,
                        },
                    },
                    {
                        resolve: `gatsby-remark-prismjs`,
                        options: {
                            // This is used to allow setting a language for inline code
                            // (i.e. single backticks) by creating a separator.
                            // This separator is a string and will do no white-space
                            // stripping.
                            // A suggested value for English speakers is the non-ascii
                            // character '›'.
                            inlineCodeMarker: null,

                            // This toggles the display of line numbers globally alongside the code.
                            // To use it, add the following line in gatsby-browser.js
                            // right after importing the prism color scheme:
                            //  require("prismjs/plugins/line-numbers/prism-line-numbers.css")
                            // Defaults to false.
                            // If you wish to only show line numbers on certain code blocks,
                            // leave false and use the {numberLines: true} syntax below
                            showLineNumbers: false,
                            // If setting this to true, the parser won't handle and highlight inline
                            // code used in markdown i.e. single backtick code like `this`.
                            noInlineHighlight: false,

                            // Customize the prompt used in shell output
                            // Values below are default
                            prompt: {
                                user: 'root',
                                host: 'localhost',
                                global: false,
                            },
                        },
                    },
                ],
            },
        },
        {
            resolve: 'gatsby-plugin-typography',
            options: {
                pathToConfigModule: 'src/utils/typography',
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'posts',
                path: `${__dirname}/content/posts`,
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'meta',
                path: `${__dirname}/content/meta`,
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'src',
                path: `${__dirname}/src`,
            },
        },
        {
            resolve: 'gatsby-plugin-alias-imports',
            options: {
                alias: {
                    '~src': path.resolve(__dirname, 'src'),
                },
            },
        },
    ],
};
