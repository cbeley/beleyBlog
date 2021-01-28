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

const mdxComponents = { Note, ImageReference, ...MDXImages };

export default ({
    data: {
        mdx: {
            body,
            frontmatter: {
                draft = false,
                images: imagesArray,
                title,
                subTitle,
                date,
                description,
                category: { name: categoryName },
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
            <Head title={title} description={description} />
            <article>
                <PostHeader
                    title={title}
                    subTitle={subTitle}
                    date={date}
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

export const query = graphql`
    query($id: String!) {
        mdx(id: { eq: $id }) {
            body
            frontmatter {
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
                title
                subTitle
                description
                date(formatString: "MMM Do, YYYY")
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
