const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./src/db/index.db.js");

dotenv.config({
	path: "./.env",
});

const app = express();

app.use(express.json()) 

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
