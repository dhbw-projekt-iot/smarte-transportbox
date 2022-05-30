import mongoose from "mongoose";

const {Schema} = mongoose;

const constraint = new Schema({
	criticalMaximum: {
		type: Schema.Types.Number,
		required: true,
	},
	criticalMinimum: {
		type: Schema.Types.Number,
		required: true,
	},
	warningThresholdHigh: {
		type: Schema.Types.Number,
	},
	warningThresholdLow: {
		type: Schema.Types.Number,
	},
	exceedCountUntilIncident: {
		type: Schema.Types.Number,
	},
	exceedMinutesUntilIncident: {
		type: Schema.Types.Number,
	}
});

const schema = new Schema({
	temperature: {
		type: constraint
	},
	humidity: {
		type: constraint
	},
	tilt: {
		type: constraint
	},
	vibration: {
		type: constraint
	},
});

export default mongoose.model("Constraints", schema);