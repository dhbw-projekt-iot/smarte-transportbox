import mongoose from "mongoose";

const {Schema} = mongoose;

const schema = new mongoose.Schema({
	deviceID: {
		type: "string",
		required: true,
	},
	measurements: [
		{
			type: Schema.Types.ObjectId,
			ref: "Device"
		}
	],
	// Metadata
	description: String,
	owner: String
});

export default mongoose.model("TransportationTask", schema);