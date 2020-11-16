const path = require('path');

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
