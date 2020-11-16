import { graphql } from 'gatsby';

export const postSummary = graphql`
    fragment postSummary on MarkdownRemark {
        id
        excerpt
        fields {
            slug
        }
        frontmatter {
            title
            date(formatString: "MMMM D, YYYY")
            category {
                name
            }
        }
    }
`;
