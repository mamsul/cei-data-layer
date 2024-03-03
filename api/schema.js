const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    home: String
  }

  type Mutation {
    auth(email: String!): AuthResponse
    user(tokenId: String!, email: String!): UserResponse
  }

  type UserResponse {
    email: String
    memberNo: Int
    name: String
    post: Post
  }

  type AuthResponse {
    token: String
    email: String
    expired: Int
  }

  type Post {
    memberNo: Int
    amount: Int
  }
`;

module.exports = typeDefs;
