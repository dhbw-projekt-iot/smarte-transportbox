import express from "express";
const router = express.Router();

import model from "../../db/model/transportationTask.js";
import deviceModel from "../../db/model/device.js";

router.get("/", async (_, res) => {
	res.json(await model.find());
});

router.get("/:id", async (req, res) => {
	const {id} = req.params;
	try {
		const element = await model.findById(id);
		res.json(element);
	}
	catch (error) {
		res.status(400).json(error);
	}
});

router.post("/", async (req, res) => {
	const {
		deviceID, 
		description, 
		owner, 
	} = req.body;
	const element = await model.create({
		deviceID, 
		description, 
		owner, 
		measurements: []
	});
	res.status(201).json(element);
});

router.put("/:id", async (req, res) => {
	const {id} = req.params;
	await model.findById(id).catch(res.status(400).json);

	const {
		deviceID, 
		description, 
		owner
	} = req.body;
	const updated = await model.findByIdAndUpdate(
		id,
		{
			deviceID, 
			description, 
			owner
		},
		{
			new: true
		}
	);

	res.json(updated);
});

router.delete("/:id", async (req, res) => {
	const {id} = req.params; 
	await model.findById(id).catch(res.status(400).json);

	const deleted = await model.findByIdAndDelete(id);
	res.status(200).json(deleted);
});

router.get("/:device/current", async (req, res) => {
	const {device: deviceID} = req.params;

	const device = await deviceModel.findById(deviceID).catch(error => res.status(400).json(error));

	if (!device) {
		res.status(404).send("Device does not exist.");
		return;
	}

	const transportationTasks = await model.find({deviceID}).catch(error => res.status(500).json(error));

	if (!transportationTasks || (transportationTasks as any).length === 0) {
		res.status(404).send("No transportation tasks for this device");
		return;
	}

	res.json((transportationTasks as any[])[0]);
});

export default router;