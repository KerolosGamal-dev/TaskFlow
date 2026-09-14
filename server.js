
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");


dotenv.config();


const app = express();


app.use(cors());


const PORT = process.env.PORT || 5000;


app.get("/", (req, res) => {
  res.send("TaskFlow Backend is running successfully! ");
});


app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
