import mongoose from "mongoose";
import constraintsSchema from "./constraints.js";
import measurementsSchema from "./measurement.js";
import incidentsSchema from "./incident";

const { Schema } = mongoose;

const schema = new mongoose.Schema({
	deviceID: {
		type: Schema.Types.ObjectId,
		ref: "Device",
		required: true,
	},
	measurements: [
		{
			type: measurementsSchema.schema,
			required: true
		},
	],
	incidents: [
		{
			type: incidentsSchema.schema,
			required: true
		},
	],
	constraints: {
		type: constraintsSchema.schema,
		required: true,
	},
	// Metadata
	productDescription: String,
	productType: String,
	shippingID: String,
	fromLocation: String,
	toLocation: String,
	ownerMail: String,
	createdAt: Date,
	status: String,
});

export default mongoose.model("TransportationTask", schema);
