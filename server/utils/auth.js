const { ApolloError } = require("@apollo/server");
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;
const expiration = "2h";
console.log(secret, "This is the secret");
module.exports = {
  authMiddleware({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      console.log("No token found");
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { expiresIn: expiration });
      req.user = data;
    } catch (err) {
      console.error("Invalid token:", err);
      console.log("Invalid token");
      req.user = null;
      throw new ApolloError(
        "Could not authenticate user. Invalid or expired token.",
        "UNAUTHENTICATED"
      );
    }

    return req;
  },
  signToken({ username, email, _id }) {
    const payload = { username, email, _id };
    console.log("payload", payload);
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
