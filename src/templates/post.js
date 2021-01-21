import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';

import { StandardLayout } from '~src/components/Layouts';
import Head from '~src/components/Head';
import PostHeader from '~src/components/PostHeader';
import { Note } from '~src/components/InfoBoxes';
import ImageReference from '~src/components/ImageReference';

const mdxComponents = { Note, ImageReference };

export default ({
    data: {
        mdx: {
            body,
            frontmatter: {
                draft = false,
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
                    <MDXRenderer>{body}</MDXRenderer>
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
