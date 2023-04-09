import express from "express";
import cors from "cors";
import { config } from "dotenv";
import mongoose from "mongoose";

mongoose.set("strictQuery", false);
const mongoDB = process.env.ATLAS_URI;
main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
}


config();
const app = express();

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST"],
    })
);

app.listen(process.env.PORT, function () {
    console.log(`Server started at port http://localhost:${process.env.PORT}/`);
});