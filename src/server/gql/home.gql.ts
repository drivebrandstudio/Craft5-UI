import { gql } from 'graphql-request'

export const HomeEntryQuery = gql`
	{
	  seoEntries: entries {
       ... on home_home_Entry {
        id
        seo {
          description
          title
          social {
            facebook {
              description
              title
              image {
                url
              }
             }
            twitter {
              description
              title
              image {
                url
              }
            }
          }
        }
      }
	  }
                       homeEntry:    entry(slug: "home") {
        ... on home_home_Entry {
          id
          uri
          headerImageCaption
          headerImage {
            url
            srcset(sizes: ["200", "1000"])
      }
      homePanels {
        ... on homePanels_ticketPricesPanel_BlockType {
          bodyCopy
          ctaLinkDestination
          ctaLinkText
          heading
          typeHandle
          image {
            url
            title
            }
            imagePositioning
          ticketPrices {
            col1
            col2
            itemLabel
            itemPrice
            dayOfPrice
            restrictions
            halfDayItemPrice
            halfDayDayOfPrice
            }
            sortOrder
            }
            ... on homePanels_imageAndTextPanel_BlockType {
          accessoButton
          typeHandle
          bodyCopy
          cloudStyle
          ctaLinkDestination
          ctaLinkText
          heading
          image {
            url
            }
            imagePositioning
            sortOrder
          useWebCam
        }
        ... on homePanels_videoAndTextPanel_BlockType {
          bodyCopy
          ctaLinkDestination
          typeHandle
          ctaLinkText
          heading
          showBackground
          sortOrder
          videoPositioning
          videoUrl
          }
          ... on homePanels_photoGalleryPanel_BlockType {
            typeHandle
          galleryItems {
            ... on galleryItems_BlockType {
              altText
              caption
              enabled
              photo {
                url
              }
              }
              }
              }
              ... on homePanels_mediaPanel_BlockType {
                ctaLinkDestination
                typeHandle
                ctaLinkText
                enableWebCam
          youtubeVideoUrl
          }
          }
    }
  }
	}
`