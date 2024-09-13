import { gql } from 'graphql-request'


export const PagesPagesEntryQuery = gql`
	 {
		entries {		 
			id
 			uri
		}
	}
`

export const PagesLandingPageEntryQuery = gql`
	query PagesLandingPageEntryQuery($uri: [String]) {
  entry(uri: $uri) {
    ... on home_Entry {
      seo {
        description
        title
        social {
          twitter {
            title
            description
            image {
              url
            }
          }
          facebook {
            title
            description
            image {
              url
            }
          }
        }
      }
    }
  }
}
`

export const BlogsQuery = gql`
query BlogQuery($uri: [String]) {
  blogEntries(uri: $uri) {
    ... on blog_Entry {
      summary
      thumbnail {
        url
      }
      title
      date
      articleContent {
        ... on subhead_Entry {
          summary
		  id
        }
        ... on text_Entry {
          articleText
        }
      }
    }
  }
}
`

export const pageQueries = {
  pages: PagesPagesEntryQuery,
  landingPages: PagesLandingPageEntryQuery,
  blog: BlogsQuery,
}
