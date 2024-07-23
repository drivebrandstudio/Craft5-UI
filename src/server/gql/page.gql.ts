import { gql } from 'graphql-request'

export const PagePathQuery = gql`
	{
		entries(section: "pages", limit: 1000) {
			uri
			typeHandle
		}
	}
`

export const PagesPagesEntryQuery = gql`
	query PagesPagesEntryQuery($uri: [String]) {
		entries(uri: $uri) {
			 
    ... on winter_insidePage_Entry {
	 seo {
        title
        description
        advanced {
          robots
          canonical
        }
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
        keywords {
          rating
          keyword
        }
      }
      headerImage {
        url
      }
      contentElements {
        ... on contentElements_icons_BlockType {
          id
          profiles {
            ... on profiles_BlockType {
              id
              clickDestination
              icon {
                url
                title
              }
            }
          }
        }
        ... on contentElements_instagramFeed_BlockType {
          heading
          feed
        }
        ... on contentElements_imageOverlay_BlockType {
          id
          background {
            title
            url
          }
          heading
          textSlides {
            text
          }
          overlays {
            ... on overlays_BlockType {
              id
              toggle
              badge {
                url
                title
              }
            }
          }
        }
      }
    }
    ... on summer_insidePage_Entry {
	 seo {
        title
        description
        advanced {
          robots
          canonical
        }
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
        keywords {
          rating
          keyword
        }
      }
      headerImage {
        url
      }
      contentElements {
        ... on contentElements_icons_BlockType {
          id
          profiles {
            ... on profiles_BlockType {
              id
              clickDestination
              icon {
                url
                title
              }
            }
          }
        }
        ... on contentElements_instagramFeed_BlockType {
          heading
          feed
        }
        ... on contentElements_imageOverlay_BlockType {
          id
          background {
            title
            url
          }
          heading
          textSlides {
            text
          }
          overlays {
            ... on overlays_BlockType {
              id
              toggle
              badge {
                url
                title
              }
            }
          }
        }
      }
    }
  
		}
	}
    
`

export const PagesLandingPageEntryQuery = gql`
	query PagesLandingPageEntryQuery($uri: [String], $seo: String) {
		entry(section: "pages", uri: $uri, type: "landingPages") {
			... on pages_landingPages_Entry {
				seo: seomatic(asArray: true, uri: $seo) {
					... on SeomaticType {
						metaTitleContainer
						metaTagContainer
						metaSiteVarsContainer
						metaLinkContainer
						metaJsonLdContainer
					}
				}
				title
			}
		}
	}
`

export const pageQueries = {
	pages: PagesPagesEntryQuery,
	landingPages: PagesLandingPageEntryQuery,
}
