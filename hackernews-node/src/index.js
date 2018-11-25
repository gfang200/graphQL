const { GraphQLServer } = require('graphql-yoga')

// 1 Deffine schema
const typeDefs = `
type Query {
    info: String!
}
`

// 2 create resolvers (implementatino of schema)
const resolvers = {
    Query: {
        info: () => null
    }
}

// 3 Bundling schema and resolvers
const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(()=>console.log("Server is running on 4000"))