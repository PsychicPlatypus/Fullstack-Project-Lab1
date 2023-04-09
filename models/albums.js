import { Schema, model } from "mongoose";

const AlbumSchema = new Schema(
	{
		name: {
			type: "String",
		},
		artist: {
			type: "String",
		},
		year: {
			type: "Date",
		},
	},
	{ collection: "albums" }
);

const Album = model("Album", AlbumSchema);

export default Album;
