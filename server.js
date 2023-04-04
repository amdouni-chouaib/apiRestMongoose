
const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000
const URI = process.env.MONGODB_URI

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then((result)=>console.log("connected to mongodb"))
.catch((err)=>console.log("error"))


app.use(express.json());

app.use("/users", userRoutes);
app.use("/articles", articleRoutes);

app.listen(port, () => {
  console.log(`Server listening at ${port}`);
});
