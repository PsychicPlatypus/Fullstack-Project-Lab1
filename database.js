// connect to db, Show all albums, get specific album by title
import mongoose from "mongoose";
import Albums from "./models/Albums.js";
import { config } from "dotenv";

config();
mongoose.set("strictQuery", false); // Prepare for Mongoose 7
const mongoDB = process.env.ATLAS_URI;

export async function getAllAlbums() {
	await mongoose.connect(mongoDB);
	const albums = await Albums.find({});
	mongoose.connection.close();
	return albums;
}
