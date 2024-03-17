const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const User = require("../models/User");
const Comment = require("../models/Comment");

const resolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) {
        throw new AuthenticationError("You must be logged in");
      }
      return User.findById(user.id);
    },
  },
  Mutation: {
    addUser: async (_, { username, email, password }, { session }) => {
      const newUser = await User.create({ username, email, password });
      const token = signToken(newUser);

      if (session) {
        session.userId = newUser._id;
        session.username = newUser.username;
        session.save();
      }

      return { token, user: newUser };
    },

    addComment: async (_, { content, rating }, { user }) => {
      if (!user) {
        throw new AuthenticationError("You must be logged in to add a comment");
      }

      const comment = await Comment.create({
        content,
        timestamp: new Date().toISOString(),
        user: user.id,
        rating,
      });

      return comment;
    },

    login: async (_, { email, password }, { session }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      if (session) {
        session.userId = user._id;
        session.username = user.username;
        session.save();
      }

      return { token, user };
    },
  },
};

module.exports = resolvers;
