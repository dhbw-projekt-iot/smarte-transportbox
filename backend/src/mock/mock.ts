import deviceModel from "../db/model/device.js";
import constraintModel from "../db/model/constraints.js";
import incidentModel from "../db/model/incident.js";
import measurementModel from "../db/model/measurement.js";
import taskModel from "../db/model/transportationTask.js";

const device = await deviceModel.create({
	displayName: "My Raspberry PI"
});

const task1 = await taskModel.create({
	deviceID: device["_id"],
	productDescription: "My First Freight Task",
	productType: "Kühlfracht",
	createdAt: new Date("23/03/2022"),
	fromLocation: "Mannheim",
	toLocation: "Karlsruhe",
	shippingID: "12345-1",
	ownerMail: "mail@example.com",
	status: "zugestellt",
	constraints: null,
	incidents: [],
	measurements: []
});

const task2 = await taskModel.create({
	deviceID: device["_id"],
	productDescription: "My Second Freight Task",
	productType: "Kühlfracht",
	createdAt: new Date("23/03/2022"),
	fromLocation: "Heidelberg",
	toLocation: "Karlsruhe",
	shippingID: "12345-2",
	ownerMail: "mail@example.com",
	status: "versendet",
	constraints: null,
	incidents: [],
	measurements: []
});

const task3 = await taskModel.create({
	deviceID: device["_id"],
	productDescription: "My Third Freight Task",
	productType: "Kühlfracht",
	createdAt: new Date("23/03/2022"),
	fromLocation: "Walldorf",
	toLocation: "Karlsruhe",
	shippingID: "12345-3",
	ownerMail: "mail@example.com",
	status: "ausstehend",
	constraints: null,
	incidents: [],
	measurements: []
});

const task1_measurement1 = await measurementModel.create({
	timestamp: new Date("23/03/2022"),
	location: "some lat, some long",
	temperature: 23,
	humidity: 60,
	tilt: 0,
	vibration: 0
});

const task1_measurement2 = await measurementModel.create({
	timestamp: new Date("24/03/2022"),
	location: "some other lat, some long",
	temperature: 25,
	humidity: 68,
	tilt: 0,
	vibration: 0
});

await taskModel.findByIdAndUpdate(
	task1["_id"],
	{
		measurements: [task1_measurement1["_id"], task1_measurement2["_id"]]
	},
	{
		new: true
	}
);

await taskModel.findByIdAndUpdate(
	task2["_id"],
	{
		measurements: [task1_measurement1["_id"], task1_measurement2["_id"]]
	},
	{
		new: true
	}
);

await taskModel.findByIdAndUpdate(
	task3["_id"],
	{
		measurements: [task1_measurement1["_id"], task1_measurement2["_id"]]
	},
	{
		new: true
	}
);

// TODO Incidents
// TODO Constraints