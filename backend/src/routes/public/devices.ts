import express from "express";
const router = express.Router();

import deviceModel from "../../db/model/device.js"; 

router.get("/", async (req, res) => {
	const devices = await deviceModel.find();
	res.json(devices);
});

router.put("/:id", async (req, res) => {
	const { id: deviceID } = req.params;

	const { displayName } = req.body;

	const updated = await deviceModel.findOneAndUpdate({
		deviceID
	}, {
		displayName
	}, {
		new: true
	});

	res.json(updated);
});

export default router;