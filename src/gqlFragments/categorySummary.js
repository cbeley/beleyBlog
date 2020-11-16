import { graphql } from 'gatsby';

export const categorySummary = graphql`
    fragment categorySummary on CategoriesJson {
        name
        path
        posts(limit: 5) {
            ...postSummary
        }
    }
`;
