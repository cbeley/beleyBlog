import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import { StandardLayout } from '~src/components/Layouts';
import Head from '~src/components/Head';
import PostHeader from '~src/components/PostHeader';

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
                <MDXRenderer>{body}</MDXRenderer>
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
