import express from "express";
const router = express.Router();

import locationRoutes from "./location.js";
import measurementRoutes from "./measurement.js";
import transportationTaskRoutes from "./transportationTasks.js";

router.use("/locations/", locationRoutes);
router.use("/measurements/", measurementRoutes);
router.use("/tasks", transportationTaskRoutes);

export default router;