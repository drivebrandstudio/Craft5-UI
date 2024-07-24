import { gql } from 'graphql-request'

export const PagePathQuery = gql`
	{
		entries(limit: 1000) {
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
	query PagesLandingPageEntryQuery($uri: [String]) {
		entry(uri: $uri) {
				seo: seomatic {
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

export const HomeQuery = gql`
		query HomeEntryQuery($uri: [String]) { 
         	entry(uri: $uri) {
         	 	id
         	 	uri
  		}
	}
`
export const NewsQuery = gql`
		query NewsQuery($uri: [String]) { 
         	entry(uri: $uri) {
         	 	id
         	 	uri
  		}
	}
`

export const NewsListingQuery = gql`
		query NewsListingQuery($uri: [String]) { 
         	entry(uri: $uri) {
         	 	id
         	 	uri
  		}
	}
`
export const NewsCategoryQuery = gql`
		query NewsCategoryQuery($uri: [String]) { 
         	entry(uri: $uri) {
         	 	id
         	 	uri
  		}
	}
`
export const ContactQuery = gql`
		query ContactQuery($uri: [String]) { 
         	entry(uri: $uri) {
         	 	id
         	 	uri
  		}
	}
`
export const UserGuideQuery = gql`
		query UserGuideQuery($uri: [String]) { 
         	entry(uri: $uri) {
         	 	id
         	 	uri
  		}
	}
`

export const pageQueries = {
	pages: PagesPagesEntryQuery,
	landingPages: PagesLandingPageEntryQuery,
	home: HomeQuery,
	news: NewsQuery,
	newsListing: NewsListingQuery,
	newsCategories: NewsCategoryQuery,
	contactPage: NewsCategoryQuery,
	userGuide: UserGuideQuery,
}
