import { gql } from "graphql-request";


export const NavQuery = gql`
{
        navEntries: entries(section: ["blog"]) {
            slug
            uri
            typeHandle
            sectionHandle
            title
           dateUpdated
        }
    }
`