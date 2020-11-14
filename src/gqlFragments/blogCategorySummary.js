import { graphql } from 'gatsby';

export const blogCategory = graphql`
    fragment blogCategorySummary on BlogCategory {
        name
        path
        posts {
            ...postSummary
        }
    }
`;
