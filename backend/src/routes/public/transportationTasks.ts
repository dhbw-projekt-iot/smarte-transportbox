import express from "express";
const router = express.Router();

import taskModel from "../../db/model/transportationTask.js";

router.get("/", async (req, res) => {
	const tasks = await taskModel.find();
	res.status(200).json(tasks);
});

router.get("/:id", async (req, res) => {
	const {id} = req.params;
	const task = await taskModel.findById(id);
	if (!task) {
		res.status(404).send("No task could be found for the given id");
		return;
	}
	res.status(200).json(task);
});

router.get("/:id/locations", async (req, res) => {
	const {id} = req.params;
	// TODO: Possibly ensure that last created task is used
	const transportationTask = await taskModel.findById(id).catch(res.status(400).json);

	if (!transportationTask) {
		res.status(404).send();
		return;
	}

	res.json({
		id,
		description: transportationTask.description,
		// TODO: Ensure if sorting is correct
		locations: transportationTask.measurements.map((measurement: any)  => measurement.location)
	});
});

router.get("/:id/locations/current", async (req, res) => {
	const {id} = req.params;
	// TODO: Possibly ensure that last created task is used
	const transportationTask = await taskModel.findById(id).catch(res.status(400).json);

	if (!transportationTask) {
		res.status(404).send();
		return;
	}

	res.json({
		id,
		description: transportationTask.description,
		// TODO: Ensure if sorting is correct
		location: transportationTask.measurements.at(-1).location
	});
});

// Create new Transportation Task
router.post("/", async (req, res) => {
	const {
		productType, 
		productDescription, 
		fromLocation, 
		toLocation, 
		shippingID, 
		ownerMail,
		constraints
	} = req.body;

	const created = await taskModel.create({
		productDescription,
		productType,
		fromLocation,
		toLocation,
		shippingID,
		ownerMail,
		status: "Created",
		createdAt: new Date(),
		constraints,
		incidents: [],
		measurements: [],
	});
	res.status(201).json(created);
});

export default router;