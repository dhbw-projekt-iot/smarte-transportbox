import mongoose from "mongoose";
import constraintsSchema from "./constraints.js";

const {Schema} = mongoose;

const schema = new mongoose.Schema({
	deviceID: {
		type: Schema.Types.ObjectId,
		ref: "Device",
		required: true,
	},
	// productType: {

	// },
	measurements: [
		{
			type: Schema.Types.ObjectId,
			ref: "Measurement"
		}
	],
	constraints: {
		type: constraintsSchema,
		required: true
	},
	// Metadata
	productDescription: String,
	shippingID: String,
	fromLocation: String,
	toLocation: String,
	ownerMail: String,
});

export default mongoose.model("TransportationTask", schema);