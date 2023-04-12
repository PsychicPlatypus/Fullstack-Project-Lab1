import mongoose from "mongoose";
import Albums from "./models/Albums.js";
import { config } from "dotenv";

config();
mongoose.set("strictQuery", false); // Prepare for Mongoose 7
const mongoDB = process.env.ATLAS_URI;
main().catch((err) => console.log(err));

async function populate() {
	await mongoose.connect(mongoDB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	const albums = [
		{
			id: 0,
			name: "The Dark Side of the Moon",
			artist: "Pink Floyd",
			year: "1973",
		},
		{ id: 1, name: "The Wall", artist: "Pink Floyd", year: "1979" },
		{
			id: 2,
			name: "Wish You Were Here",
			artist: "Pink Floyd",
			year: "1975",
		},
		{ id: 3, name: "Animals", artist: "Pink Floyd", year: "1977" },
	];

	for (let i = 0; i < albums.length; i++) {
		const album = new Albums(albums[i]);
		await album.save();
	}
}

async function main() {
	try {
		console.log(`Connecting to Database: ${process.env.ATLAS_URI}`);
		await mongoose.connect(mongoDB);
		await populate();
		console.log("Debug: Closing mongoose");
	} catch (error) {
		console.log(`Script failed unexpectedly, reason: \n${error}`);
	} finally {
		mongoose.connection.close();
	}
}
