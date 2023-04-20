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

export async function getAlbumByTitle(title) {
    await mongoose.connect(mongoDB);
    const album = await Albums.find({ name: title });
    mongoose.connection.close();
    return album;
}

export async function getAlbumById(id) {
    await mongoose.connect(mongoDB);
    const album = await Albums.findOne({ id: id });
    mongoose.connection.close();
    return album;
}

export async function createNewAlbum(album) {
    await mongoose.connect(mongoDB);
    if (!album.id) {
        const newId = await Albums.countDocuments({});
        album.id = newId;
    }
    const count_ = await Albums.countDocuments({
        $or: [{ id: album.id }],
    }).exec();
    if (count_ === 0) {
        console.log(album.date);
        const album_ = await Albums.create({
            id: album.id,
            name: album.name,
            year: Date.parse(album.date),
            artist: album.artist,
        });
        mongoose.connection.close();
        return album_;
    }
    mongoose.connection.close();
    return { message: "Collection already exists." };
}

export async function updateAlbumWithId(album) {
    await mongoose.connect(mongoDB);
    const count_ = await Albums.countDocuments({ id: album.id }).exec();
    if (count_ > 0) {
        const album_ = Albums.findOneAndUpdate(
            { id: album.id },
            {
                id: album.id,
                name: album.name,
                year: Date.parse(album.date),
                artist: album.artist,
            },
            { new: true }
        );
        mongoose.connection.close();
        return album_;
    }
    mongoose.connection.close();
    return { message: "Collection not found." };
}

export async function deleteOneAlbum(album) {
    await mongoose.connect(mongoDB);
    const count_ = await Albums.countDocuments({ id: album.id }).exec();
    if (count_ > 0) {
        const album_ = await Albums.findOneAndDelete({ id: album.id });
        mongoose.connection.close();
        return album_;
    }
    mongoose.connection.close();
    return { message: "Collection not found." };
}
