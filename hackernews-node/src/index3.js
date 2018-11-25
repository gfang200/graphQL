const { GraphQLServer } = require('graphql-yoga')

// 1 Deffine schema


let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  },
  {
    id: 'link-1',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }
]


// 2 create resolvers (implementatino of schema)
let idCount=links.length
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
        link: (root,args) => {
            for (let i =0; i<links.length; i++){
                console.log(links[i])
                console.log(args.id)
                if (links[i].id == args.id){
                    console.log(links[i])
                    return links[i]
                }
            }
        }
    },
    Mutation:{
        post: (root, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url:args.url
            }
            links.push(link)
            return link
        },

        updateLink: (root,args) => {
            for (let i = 0 ;i<links.length; i++){
                if (links[i].id == args.id){
                    if (args.url) {links[i].url = args.url;}
                    if (args.description) {links[i].description = args.description;}     
                    return links[i]               
                }
            }
        },

        deleteLink: (root,args) => {
            for (let i = 0 ;i<links.length; i++){
                if (links[i].id == args.id){
                    let out = links[i]
                    links.splice(i,1)
                    
                    return out           
                }
            }
        }
    },
    Link: {
        id:(root) => root.id,
        description:(root)=>root.description,
        url: (root) => root.url,
    }
}


// 3 Bundling schema and resolvers
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
})

server.start(()=>console.log("Server is running on 4000"))