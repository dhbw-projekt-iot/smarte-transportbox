import express, { Response } from "express";
import { ObjectId } from "mongoose";
const router = express.Router();

import deviceModel from "../../db/model/device.js";
import taskModel from "../../db/model/transportationTask.js";
import measurementModel from "../../db/model/measurement.js";
import incidentModel from "../../db/model/incident.js";

import { handleIncident}  from "../../logic/handleIncident.js";

async function determineCurrentTask(id: ObjectId, res: Response) {
	if (!id) {
		res.status(400).send("A device id must be passed.");
		return null;
	}
	const tasks = await taskModel.find({deviceID: id}).exec();
	if (tasks.length === 0) {
		res.status(404).send("No Tasks available for that device");
		return null;
	}
	return tasks.at(-1);
}

router.get("/currentJob/:id", async (req, res) => {
	const {id: deviceID} = req.params as any;
	const task = await determineCurrentTask(deviceID, res);
	if (!task) {
		res.status(404).send("No current task");
		return;
	}
	res.status(200).json(task);
});

router.get("/register", async (req, res) => {
	const newDevice = await deviceModel.create({
		displayName: "New device"
	});
	res.status(201).json(newDevice);
});

router.get("/pushMeasurements", async (req, res) => {
	const {id: deviceId, measurements} = req.body;
	const currentTask = await determineCurrentTask(deviceId, res);
	if (!currentTask) {
		res.status(400).send("Measurements cannot be pushed since no task exists for the used device");
		return;
	}
	const ids = [];
	for (const measurement of measurements) {
		const {timestamp, location, temperature, humidity, tilt, vibration} = measurement;
		const created = await measurementModel.create({
			timestamp,
			location,
			temperature,
			humidity,
			tilt,
			vibration
		});
		ids.push(created["_id"]);
	}
	const newIDs = [...currentTask.measurements, ...ids];
	taskModel.findByIdAndUpdate(currentTask["_id"], {
		measurements: newIDs
	},
	{
		new: true
	});
	res.status(200).send("Updated Measurements.");
});

router.get("/pushIncident", async (req, res) => {
	const {id: deviceId, incident} = req.body;
	const currentTask = await determineCurrentTask(deviceId, res);
	if (!currentTask) {
		res.status(400).send("Incident cannot be pushed since no task exists for the used device");
		return;
	}
	const { timestamp, sensor, value } = incident;
	const created = await incidentModel.create({
		timestamp,
		sensor, value
	});
	const incidentID = created["_id"];
	const newIDs = [...currentTask.incidents, ...incidentID];
	taskModel.findByIdAndUpdate(currentTask["_id"], {
		incidents: newIDs
	},
	{
		new: true
	});

	handleIncident(currentTask.ownerMail, currentTask, incident);

	res.status(200).send("Updated Incidents.");
});

export default router;