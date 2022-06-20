import mongoose from "mongoose";

const schema = new mongoose.Schema({
	sensor: String,
	value: String,
	timestamp: Date
});

export default mongoose.model("Incident", schema);