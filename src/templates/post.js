import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import { StandardLayout } from '~src/components/Layouts';
import PostHeader from '~src/components/PostHeader';

export default ({
    data: {
        mdx: {
            body,
            frontmatter: {
                title,
                subTitle,
                date,
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
            <article>
                <PostHeader
                    title={title}
                    subTitle={subTitle}
                    date={date}
                    readingTimeString={readingTimeString}
                />
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
                date(formatString: "MMM Do, YYYY")
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
