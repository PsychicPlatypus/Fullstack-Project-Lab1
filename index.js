import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import {
	getAlbumByTitle,
	getAllAlbums,
	createNewAlbum,
	updateAlbumWithId,
	getAlbumById,
	deleteOneAlbum,
} from "./database.js";
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
		res.sendStatus(500);
		console.log(error);
	}
});

app.get("/api/albums/:albumName", async function (req, res) {
	try {
		const album = await getAlbumByTitle(req.params.albumName);
		album.length === 0 ? res.sendStatus(404) : res.json(album);
	} catch (error) {
		res.sendStatus(500);
		console.log(error);
	}
});

app.post("/api/albums", async function (req, res) {
	try {
		const album = await createNewAlbum(req.body);
		album.message === "Collection already exists."
			? res.status(409).json(album)
			: res.status(201).json(album);
	} catch (error) {
		res.sendStatus(500);
	}
});

app.put("/api/albums/:id", async function (req, res) {
	try {
		const album_ = await getAlbumById(req.params.id);
		const album = await updateAlbumWithId(album_);
		album.message === "Collection not found."
			? res.status(404).json(album)
			: res.status(200).json(album);
	} catch (error) {
		res.sendStatus(500);
	}
});

app.delete("/api/albums/:id", async function (req, res) {
	try {
		const album_ = await getAlbumById(req.params.id);
		const album = await deleteOneAlbum(album_);
		album.message === "Collection not found."
			? res.status(404).json(album)
			: res.status(200).json(album);
	} catch (error) {
		res.sendStatus(500);
	}
});

app.listen(process.env.PORT, function () {
	console.log(`Server started at port http://localhost:${process.env.PORT}/`);
});
