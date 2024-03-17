const jwt = require("jsonwebtoken");
const { GraphQLError } = require("graphql");

const secret = process.env.SECRET;
const expiration = "2h";

// This function is now designed to be directly used with Apollo Server's context function
const authMiddleware = async ({ req }) => {
  let user = null;
  const token = req.headers.authorization
    ? req.headers.authorization.split(" ").pop().trim()
    : null;

  if (token) {
    try {
      const decoded = jwt.verify(token, secret, { expiresIn: expiration });
      user = decoded.data; // Assuming the decoded token structure has a data field
    } catch (err) {
      console.error("Error verifying token:", err);
      // Depending on your application's requirements, you might want to throw an error
      // or simply log it and proceed without a user in the context
      throw new GraphQLError("Invalid or expired token.", {
        extensions: {
          code: "UNAUTHENTICATED",
          // You can add more details relevant to the authentication error
        },
      });
    }
  }

  return { user }; // This user object will be available in the Apollo Server context
};

module.exports = {
  authMiddleware,
  signToken: (userData) =>
    jwt.sign({ data: userData }, secret, { expiresIn: expiration }),
};
