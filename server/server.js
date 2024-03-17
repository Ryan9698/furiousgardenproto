const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { authMiddleware } = require("./utils/auth");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
const http = require("http");

const app = express();
const PORT = process.env.PORT || 3001;

// Session Configuration
app.use(
  session({
    secret: process.env.SESSIONSECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.use((req, res, next) => {
  res.setHeader("Session-Data", JSON.stringify(req.session));
  next();
});

// Apollo Server Configuration
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const modifiedReq = await authMiddleware({ req });
    return { user: modifiedReq.user, session: req.session };
  },
  formatError: (error) => {
    console.error(error);
    return error;
  },
});

async function startServer() {
  await apolloServer.start();
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(
    "/graphql",
    expressMiddleware(apolloServer, {
      context: async ({ req }) => ({ req }),
    })
  );

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));
    app.get("*", (req, res) =>
      res.sendFile(path.join(__dirname, "../client/dist/index.html"))
    );
  }

  db.once("open", () => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
}

startServer().catch((error) => console.error("Failed to start server:", error));
