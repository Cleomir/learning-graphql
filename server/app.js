const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const schema = require("./graphql/schema");

const app = express();
dotenv.config();
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to mongo db"));

app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("Server started on port 4000");
});
