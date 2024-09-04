import { gql } from 'graphql-request'

export const HomeEntryQuery = gql`
{
  assets(limit: 15) {
    url
  }
  blogEntries {
    ... on blog_Entry {
      summary
      thumbnail {
        img
      }
      title
      date
    }
  }
}
`