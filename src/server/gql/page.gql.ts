import { gql } from 'graphql-request'

export const PagePathQuery = gql`
	{
		entries( limit: 1000) {
			uri
			typeHandle
		}
	}
`

export const PagesPagesEntryQuery = gql`
	query PagesPagesEntryQuery($uri: [String]) {
		entry(uri: $uri) {
			 
	id
  uri
	}
	}
    
`

export const PagesLandingPageEntryQuery = gql`
	query PagesLandingPageEntryQuery($uri: [String], $seo: String) {
		entry(uri: $uri) {
				seo: seomatic(asArray: true, uri: $seo) {
					... on SeomaticType {
						metaTitleContainer
						metaTagContainer
						metaSiteVarsContainer
						metaLinkContainer
						metaJsonLdContainer
					}
				}
			}
		
	}
`

export const pageQueries = {
  pages: PagesPagesEntryQuery,
  landingPages: PagesLandingPageEntryQuery,
}
