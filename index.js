const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./src/db/index.db.js");
const { userRouter } = require("./src/routes/user.route.js");
const { courseRouter } = require("./src/routes/course.route.js");

dotenv.config();
console.log(process.env.PORT);
const app = express();

app.use(express.json());

/**
 * Starts the Express application by connecting to the database and
 * starting the server to listen on the given port.
 * @throws {Error} If there is an error connecting to the database.
 */
async function startApp() {
  try {
    await connectDB();
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log("Application Started listening on ", port);
    });
  } catch (err) {
    console.error("Database Connection Failed:", err.message);
    process.exit(1);
  }
}

startApp();

//Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/course", courseRouter);
