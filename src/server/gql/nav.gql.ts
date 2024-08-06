import { gql } from "graphql-request";


export const NavQuery = gql`
		{
    navEntries: entries(section: ["Pages", "News", "Home"]) {
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