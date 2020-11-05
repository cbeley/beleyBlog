module.exports = {
    siteMetadata: {
        title: 'ChrisBeley.com',
    },
    plugins: [
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
        'gatsby-transformer-remark',
    ],
};
