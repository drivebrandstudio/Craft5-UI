import type { NextApiRequest, NextApiResponse } from 'next'
import cmsClient from '@/server/cmsClient'
import { HomeEntryQuery } from '@/server/gql/home.gql'
import { gql } from 'graphql-request'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { token, entryUid } = req.query

  console.log('first preview log')
  console.log(req.query)

  // if (typeof token !== 'string') {
  //   res.status(401).json({ message: 'Token missing' })
  //   return
  // }


  const client = cmsClient(token || null)

  const pageQuery = gql`
		query($uid: [String]) {
			entry(uid: $uid) {
				id
				uri
				typeHandle
			}
		}
	`

  const data = await client.request(pageQuery, {
    uid: req.query.entryUid,
  })


  if (!data?.entry?.uri) {
    res.status(404).json({
      message: `URL of the entry ${req.query.entryUid} could not be fetched`,
    })
    return
  }

  console.log('setPreviewData here')
  console.log(token)

  const {
    entry: { uri },
  } = data

  const isHome = uri === 'winter'

  const location = `/${isHome ? '' : uri}`
  res.setPreviewData({
    token,
    entryUid,
    typeHandle: data?.entry?.typeHandle,
  }).redirect(location).end('Preview Mode Enabled')



  // Redirect to the path from the fetched url
  // res.end('Preview mode enabled')
}
