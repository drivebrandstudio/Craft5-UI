import { GraphQLClient } from 'graphql-request'

interface IHeaders {
    Authorization: string
    [k: string]: any
}

export default function main(
    preview?: string | null,
    token?: string,
): GraphQLClient {
    const endpoints = `${process.env.NEXT_PUBLIC_CRAFT_CMS_GRAPHQL_ENDPOINT}api`

    const headers: IHeaders = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_CRAFT_CMS_GRAPHQL_TOKEN}`,
    }

    if (preview) {
        headers['x-craft-token'] = token
    }

    const graphQLClient = new GraphQLClient(endpoints, {
        headers,
        method: 'POST'
    })

    return graphQLClient
}