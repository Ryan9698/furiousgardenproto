const typeDefs = `
  type Query {
    me: User
  }

  type User {
    _id: ID
    username: String
    email: String
  }

  type Comment { 
    _id: ID         // Comment ID
    content: String // Comment content and data
    timestamp: String // Comment timestamp
    user: User       // Comment author of comment. Ref to User
    rating: Int     // Rating system for comments on items.
  }

  type Auth {
    token: ID
    user: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addComment(content: String!, rating: Int): Comment
  }
`;

module.exports = typeDefs;
