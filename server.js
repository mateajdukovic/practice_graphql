const express = require("express");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const app = express();

app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    graphiql: true,
  })
);
app.listen(4000, () => console.log("Server Running"));
