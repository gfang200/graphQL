const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')



// 2 create resolvers (implementatino of schema)

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: (root, args, context, info) => {
            return context.db.query.links({}, info)
        },
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
        post: (root, args,context,info) => {
            return context.db.mutation.createLink({
                data: {
                    url: args.url,
                    description: args.description
                }
            }, info)
        },
        },

        // updateLink: (root,args) => {
        //     for (let i = 0 ;i<links.length; i++){
        //         if (links[i].id == args.id){
        //             if (args.url) {links[i].url = args.url;}
        //             if (args.description) {links[i].description = args.description;}     
        //             return links[i]               
        //         }
        //     }
        // },

        // deleteLink: (root,args) => {
        //     for (let i = 0 ;i<links.length; i++){
        //         if (links[i].id == args.id){
        //             let out = links[i]
        //             links.splice(i,1)
                    
        //             return out           
        //         }
        //     }
        // }
    
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => ({
        ...req,
        db: new Prisma({
            typeDefs: 'src/generated/prisma.graphql',
            endpoint: 'https://us1.prisma.sh/george-007839/hackernews/dev',
            secret: 'mysecret123',
            debug: true,
        })
    })
})

server.start(()=>console.log("Server is running on 4000"))