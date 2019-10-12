const { GraphQLServer } = require('graphql-yoga')

let links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }
]

let idCount = links.length

const resolvers = {
  Query: {
    info() {
      return null
    },
    feed() {
      return links
    }
  },
  Mutation: {
    post(parent, { url, description }) {
      const link = {
        id: `link-${idCount++}`,
        url: url,
        description: description
      }

      links = [...links, link]
      return link
    },
    updateLink(parent, { id, params }) {
      let updatedLink = {}
      links = links.map(link => {
        if (link.id === id) {
          updatedLink = { ...link, ...params }
          return updatedLink
        } else {
          return link
        }
      })
      return updatedLink
    },
    deleteLink(parent, { id }) {
      const deletedLink = links.find(link => link.id === id)
      if (!deletedLink) {
        throw new Error('Link does not exist')
      }
      links = links.filter(link => link.id !== id)
      return deletedLink
    }
  }
}

// 3
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
})

server.start({ port: 3000, endpoint: '/' }, () =>
  console.log('Server is running on http://localhost:3000/')
)
