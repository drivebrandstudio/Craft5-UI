import { gql } from "graphql-request";

// TODO STARTUP: Change section filter to your list of sections
export const NavQuery = gql`
{
        navEntries: entries(section: ["blog"]) {
            slug
            uri
            typeHandle
            sectionHandle
            title
            dateUpdated
            enabled
        }
    }
`