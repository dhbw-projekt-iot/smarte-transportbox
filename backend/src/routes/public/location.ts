import express from "express";
const router = express.Router();

import transportationTaskModel from "../../db/model/transportationTask.js";

router.get("/current", async (req, res) => {
	const {deviceID} = req.body;
	if (!deviceID) {
		res.status(400).send("Device ID is mandatory");
		return;
	}

	// TODO: Possibly ensure that last created task is used
	const transportationTask = await transportationTaskModel.findOne({
		deviceID
	}).catch(res.status(400).json);

	if (!transportationTask) {
		res.status(404).send();
		return;
	}

	res.json({
		deviceID,
		description: transportationTask.description,
		// TODO: Ensure if sorting is correct
		location: transportationTask.measurements.at(-1).location
	});
});

router.get("/", async (req, res) => {
	const {deviceID} = req.body;
	if (!deviceID) {
		res.status(400).send("Device ID is mandatory");
		return;
	}

	// TODO: Possibly ensure that last created task is used
	const transportationTask = await transportationTaskModel.findOne({
		deviceID
	}).catch(res.status(400).json);

	if (!transportationTask) {
		res.status(404).send();
		return;
	}

	res.json({
		deviceID,
		description: transportationTask.description,
		// TODO: Ensure if sorting is correct
		locations: transportationTask.measurements.map((measurement: any)  => measurement.location)
	});
});

export default router;