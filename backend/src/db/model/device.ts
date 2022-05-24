import mongoose from "mongoose";

const schema = new mongoose.Schema({
	displayName: {
		type: "string",
		required: true,
	},
});

export default mongoose.model("Device", schema);