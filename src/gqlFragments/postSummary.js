import { graphql } from 'gatsby';

export const postSummary = graphql`
    fragment postSummary on Mdx {
        id
        excerpt(pruneLength: 160)
        frontmatter {
            title
            slug
            date(formatString: "MMMM D, YYYY")
            category {
                name
            }
        }
    }
`;
