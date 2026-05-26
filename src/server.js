// import dotenv from "dotenv";
// import app from "./app.js";
// import { connectDB } from "./config/db.js";

// dotenv.config();

// const PORT = 3000;

// const startServer = async () => {
//   await connectDB(); // DB check first

//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// };

// startServer();
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db.js";
import app from "./app.js";

console.log("PORT:", process.env.PORT);

const PORT = process.env.PORT || 5050;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();