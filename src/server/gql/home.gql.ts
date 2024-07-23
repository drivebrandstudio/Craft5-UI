import { gql } from 'graphql-request'

export const HomeEntryQuery = gql`
	query PagesPagesEntryQuery($uri: [String], $slug: [String]) { 
    homeEntry: entry(uri: $uri, slug: $slug) {
        id
        uri  
    }
	}
`