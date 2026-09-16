
require("dotenv").config();
console.log("JWT SECRET:", process.env.JWT_SECRET);
const app = require("./app");
const connectDB = require("./config/db");

const PORT = 3000;

connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});