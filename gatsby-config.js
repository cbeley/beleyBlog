const path = require('path');
const remarkUnwrapImages = require('remark-unwrap-images');

module.exports = {
    siteMetadata: {
        title: 'Chris Beley',
        logo: {
            title: 'Chris Beley',
            subTitle: 'A blog about anything & everything.',
        },
    },
    plugins: [
        'gatsby-transformer-json',
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        `gatsby-remark-images`,
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
