import express from "express";
const router = express.Router();

router.get("/temperature", async (req, res) => {
    const {deviceID, timestamp} = req.body;

    if (!deviceID || !timestamp) {
        res.status(400).send("Device ID and Timestamp are mandatory");
        return;
    }

    // TODO

    res.json({});
});

router.get("/humidity", async (req, res) => {
    const {deviceID, timestamp} = req.body;

    if (!deviceID || !timestamp) {
        res.status(400).send("Device ID and Timestamp are mandatory");
        return;
    }

    // TODO

    res.json({});
});

router.get("/tilt", async (req, res) => {
    const {deviceID, timestamp} = req.body;

    if (!deviceID || !timestamp) {
        res.status(400).send("Device ID and Timestamp are mandatory");
        return;
    }

    // TODO

    res.json({});
});
router.get("/vibration", async (req, res) => {
    const {deviceID, timestamp} = req.body;

    if (!deviceID || !timestamp) {
        res.status(400).send("Device ID and Timestamp are mandatory");
        return;
    }

    // TODO

    res.json({});
});

export default router;