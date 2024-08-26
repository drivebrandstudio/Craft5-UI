import { gql } from "graphql-request";


export const NavQuery = gql`
	{
        navEntries: entries(level:1) {
            level
            slug
            uri
            typeHandle
            sectionHandle
            title
            children {
                slug
                uri
                typeHandle
                sectionHandle
                title
            }
        }
    }
`