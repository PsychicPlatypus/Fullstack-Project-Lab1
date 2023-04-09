import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { getAllAlbums } from "./database.js";
import { config } from "dotenv";

config();
const app = express();

app.use(express.static("public"));
app.use(express.json({ strict: false }));
app.use(express.urlencoded({ extended: false }));
app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST", "PUT", "DELETE"],
	})
);

app.get("/", function (_req, res) {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = dirname(__filename);
	res.sendFile(join(__dirname, "index.html"));
});

app.get("/api/albums", async function (_req, res) {
	try {
		const albums = await getAllAlbums();
		res.json(albums);
	} catch (error) {
		res.status(500);
		console.log(error);
	}
});

app.listen(process.env.PORT, function () {
	console.log(`Server started at port http://localhost:${process.env.PORT}/`);
});
