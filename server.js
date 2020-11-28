const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
require("dotenv").config();
// MiddleWare
app.use(bodyParser.json()); //or app.use(express.json({extended:true}))
app.use(cors());

// DataBase connection
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DATABASE CONNECTED");
  })
  .catch((err) => {
    console.log("ERROR CONNECTING DATABASE", err);
  });

// Routers
app.use("/api", require("./routes/user"));
app.use("/api", require("./routes/post"));
app.use("/api", require("./routes/profile"));
app.use("/api", require("./routes/auth"));

app.get("/", (req, res) => {
  res.send("this is a get req");
});
// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
