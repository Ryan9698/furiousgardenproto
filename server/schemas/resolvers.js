const User = require("../models/User");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("You must be logged in");
      }

      return await User.findById(context.user.id);
    },
  },
  Mutation: {
    //Every resolver function can accept up to four arguments:
    // (parent, args, context, info)
    //Context is accessible due to server.js configuration
    addUser: async (parent, args, context) => {
      const user = await User.create(args);
      const token = signToken(user);
      // Create session data when account is created: Context is established in server.js
      if (context.session) {
        context.session.userId = user._id;
        context.session.username = user.username;
      }
      //Add additional session properties here

      return { token, user };
    },

    login: async (parent, { email, password }, context) => {
      const user = await User.findOne({ email });
      console.log(user);
      if (!user) {
        console.log(user);
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPassword = await user.isCorrectPassword(password);
      if (!correctPassword) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      //Data for session accessible due to context:

      context.session.userId = user._id;
      context.session.username = user.username;

      //Add additional session properties here when needed
      //Cart data
      //Navigation History for enabling recently viewed items, etc.
      //User Preferences

      return { token, user };
    },
  },
};

module.exports = resolvers;
