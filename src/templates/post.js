import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';

import { StandardLayout } from '~src/components/Layouts';
import Head from '~src/components/Head';
import PostHeader from '~src/components/PostHeader';
import { Note } from '~src/components/InfoBoxes';
import * as MDXImages from '~src/components/MDXImages';
import ImageReference from '~src/components/ImageReference';
import GoogleMap from '~src/components/GoogleMap';

const mdxComponents = { Note, ImageReference, GoogleMap, ...MDXImages };

const PostTemplate = ({
    data: {
        site: {
            siteMetadata: { siteUrl },
        },
        mdx: {
            body,
            frontmatter: {
                draft = false,
                images: imagesArray,
                title,
                subTitle,
                formattedDate,
                publishedDate,
                description,
                category: { name: categoryName },
                largeThumbnail,
                slug,
            },
            fields: {
                readingTime: { text: readingTimeString },
            },
        },
    },
}) => {
    const images = (imagesArray || []).reduce((accum, image) => {
        accum[image.name] = image;
        return accum;
    }, {});

    return (
        <StandardLayout currentCategory={categoryName}>
            <Head
                title={title}
                description={description}
                largeThumbnail={largeThumbnail}
                publishedDate={publishedDate}
                siteUrl={siteUrl}
                path={slug}
                isArticle
            />
            <article>
                <PostHeader
                    title={title}
                    subTitle={subTitle}
                    date={formattedDate}
                    readingTimeString={readingTimeString}
                />
                {draft && (
                    <p>
                        <b>
                            <small>This is a draft post.</small>
                        </b>
                    </p>
                )}
                <MDXProvider components={mdxComponents}>
                    <MDXRenderer images={images}>{body}</MDXRenderer>
                </MDXProvider>
            </article>
        </StandardLayout>
    );
};

export default PostTemplate;

export const query = graphql`
    query ($id: String!) {
        site {
            siteMetadata {
                siteUrl
            }
        }
        mdx(id: { eq: $id }) {
            body
            frontmatter {
                slug
                images {
                    name
                    wide: childImageSharp {
                        fluid(maxWidth: 1825, quality: 85) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                    large: childImageSharp {
                        fluid(maxWidth: 950, quality: 85) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
                largeThumbnail {
                    twitter: childImageSharp {
                        fixed(
                            width: 1200
                            height: 600
                            quality: 85
                            fit: COVER
                        ) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                    og: childImageSharp {
                        fixed(
                            width: 1200
                            height: 630
                            quality: 85
                            fit: COVER
                        ) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
                title
                subTitle
                description
                formattedDate: date(formatString: "MMM Do, YYYY")
                publishedDate: date
                draft
                category {
                    name
                }
            }
            fields {
                readingTime {
                    text
                }
            }
        }
    }
`;
