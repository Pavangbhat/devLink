const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
// MiddleWare
app.use(bodyParser.json()); //or app.use(express.json({extended:true}))
app.use(cors());

// DataBase connection
mongoose
  .connect("mongodb://localhost:27017/devLink", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
