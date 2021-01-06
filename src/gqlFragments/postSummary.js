import { graphql } from 'gatsby';

export const postSummary = graphql`
    fragment postSummary on MarkdownRemark {
        id
        excerpt
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
