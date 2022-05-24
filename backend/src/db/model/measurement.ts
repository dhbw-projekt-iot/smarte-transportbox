import mongoose from "mongoose";

const schema = new mongoose.Schema({
	timestamp: {
		type: "Date",
		required: true
	},
	location: {
		type: "String",
		required: true
	},
	temperature: {
		type: "Number",
		required: true
	},
	humidity: {
		type: "Number",
		required: true
	},
	tilt: {
		type: "Number",
		required: true
	},
	vibration: {
		type: "Number",
		required: true
	},
});

export default mongoose.model("Measurement", schema);