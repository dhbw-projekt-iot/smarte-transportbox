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

router.post("/pushMeasurements", async (req, res) => {
	try {
		const {id: deviceId, measurements} = req.body;
		const currentTask = await determineCurrentTask(deviceId, res);
		if (!currentTask) {
			res.status(400).send("Measurements cannot be pushed since no task exists for the used device");
			return;
		}
		const newMeasurements = [...currentTask["measurements"], ...measurements];
		taskModel.findByIdAndUpdate(currentTask["_id"], {
			measurements: newMeasurements
		},
		{
			new: true
		});
		res.status(200).send("Updated Measurements.");
	}
	catch (e) {
		res.status(500).json(e);
	}
});

router.post("/pushIncident", async (req, res) => {
	const {id: deviceId, incident} = req.body;
	const currentTask = await determineCurrentTask(deviceId, res);
	if (!currentTask) {
		res.status(400).send("Incident cannot be pushed since no task exists for the used device");
		return;
	}
	const newIncidents = [...currentTask["incidents"], incident];

	taskModel.findByIdAndUpdate(currentTask["_id"], {
		incidents: newIncidents
	},
	{
		new: true
	});

	handleIncident(currentTask.ownerMail, currentTask, incident);

	res.status(200).send("Updated Incidents.");
});

export default router;