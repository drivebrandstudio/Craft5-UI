import { gql } from 'graphql-request'

// STARTUP TODO: Once home Entry is built in CMS, fetch fields here
export const HomeEntryQuery = gql`
{
  entry(uri: "__home__") {
    ... on home_Entry {
      title
      seo {
        title
        description
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

// EXAMPLE QUERY to work with HeroImageTrail
// {
//   assets(limit: 15) {
//     url
//   }
//   blogEntries {
//     ... on blog_Entry {
//       summary
//       thumbnail {
//         img
//       }
//       title
//       date
//     }
//   }
// }