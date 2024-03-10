const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const express = require("express");
const { Server } = require("socket.io");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { authMiddleware } = require("./utils/auth");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();

// Session Configuration
app.use(
  session({
    secret: process.env.SESSIONSECRET, // Secret for signing session ID Cookie
    resave: false, //Prevents resaving session data that hasn't been modified.
    saveUninitialized: false, // Prevents saving session data unless it is modified in some way.
    store: MongoStore.create({
      //MongoDB session store
      mongoUrl: process.env.MONGODB_URI,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    },
  })
);

// Apollo Server Configuration
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    // Optional: If you want to access session data within your GraphQL resolvers,
    // you can attach the session to the context here.
    const modifiedReq = await authMiddleware({ req });
    return {
      user: modifiedReq.user,
      session: req.session,
    };
  },
});

// Async function to start Apollo Server and apply middleware
const startApolloServer = async () => {
  await server.start();
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: authMiddleware, // Make sure your authMiddleware is compatible with GraphQL context
    })
  );

  // Server static files in production
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  db.on("error", (error) => console.error("Database connection error:", error));
  db.once("open", () => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer().catch((error) =>
  console.error("Failed to start Apollo Server:", error)
);
