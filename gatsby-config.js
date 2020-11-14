const path = require('path');

module.exports = {
    siteMetadata: {
        title: 'ChrisBeley.com',
        categories: [
            { name: 'Engineering', path: 'engineering' },
            { name: 'Travel', path: 'travel' },
            { name: 'Food', path: 'food' },
            { name: 'Life', path: 'life' },
        ],
    },
    plugins: [
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            /* TODO: Set this appropriately. Little iffy since I use
                            'ch', so may want to think about how best to set this. */
                            maxWidth: 590,
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
                name: 'pages',
                path: `${__dirname}/pages`,
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
