import mongoose from "mongoose";
import constraintsSchema from "./constraints.js";
import measurementsSchema from "./measurement.js";
import incidentsSchema from "./incident.js";

const { Schema } = mongoose;

const schema = new mongoose.Schema({
	deviceID: {
		type: Schema.Types.ObjectId,
		ref: "Device",
		required: true,
	},
	measurements: [measurementsSchema.schema],
	incidents: [incidentsSchema.schema],
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
