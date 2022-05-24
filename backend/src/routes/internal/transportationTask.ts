import express from "express";
const router = express.Router();

import model from "../../db/model/transportationTask.js";

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

export default router;