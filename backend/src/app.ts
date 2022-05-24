import express from "express";
import {config} from "dotenv";
import morgan from "morgan";
import { connect } from "./db/connect.js";
import internalRoutes from "./routes/internal/internal.js";
import publicRoutes from "./routes/public/public.js";

config();

const PORT = process.env.PORT ?? 5000;

await connect();

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/internal/", internalRoutes);
app.use("/public/", publicRoutes);

app.listen(PORT, () => {
	console.log(`Backend running on port ${PORT}`);
});