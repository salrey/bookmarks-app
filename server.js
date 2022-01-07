// DEPENDENCIES
const app = require("./app.js");

// CONFIGURATION
const dotenv = require("dotenv")
dotenv.config();
const PORT = process.env.PORT;

// LISTEN
app.listen(PORT, () => {
  console.log(`🔖 Listening on port ${PORT} 📑`);
});