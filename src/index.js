const { prisma } = require('./generated/prisma-client')
const { GraphQLServer } = require('graphql-yoga')

const resolvers = {
  Query: {
    info() {
      return null
    },
    feed(root, args, context, info) {
      return context.prisma.links()
    }
  },
  Mutation: {
    post(parent, { url, description }, context) {
      return context.prisma.createLink({
        url: url,
        description: description
      })
    }
  }
}

// 3
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma }
})

server.start({ port: 3000, endpoint: '/' }, () =>
  console.log('Server is running on http://localhost:3000/')
)
