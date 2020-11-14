import { graphql } from 'gatsby';

export const postSummary = graphql`
    fragment postSummary on MarkdownRemark {
        excerpt
        fields {
            slug
        }
        frontmatter {
            title
            date(formatString: "MMMM D, YYYY")
            category
        }
    }
`;
