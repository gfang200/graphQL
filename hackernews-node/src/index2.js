const { GraphQLServer } = require('graphql-yoga')

// 1 Deffine schema

const typeDefs = `
type Query {
    info: String!
    feed:[Link!]!
}

type Link {
    id: ID!
    description: String!
    url: String!
}
`

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }]


// 2 create resolvers (implementatino of schema)
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
    },
    Link: {
        id:(root) => root.id,
        description:(root)=>root.id,
        url: (root) => root.url,
    }
}


// 3 Bundling schema and resolvers
const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(()=>console.log("Server is running on 4000"))