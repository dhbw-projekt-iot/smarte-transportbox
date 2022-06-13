import express from "express";
import deviceRoutes from "./device.js";
import measurementRoutes from "./measurement.js";
import transportationTaskRoutes from "./transportationTask.js";
import piRoutes from "./pi.js";

const router = express.Router();

router.use("/devices/", deviceRoutes);
router.use("/measurements/", measurementRoutes);
router.use("/transportationTasks/", transportationTaskRoutes);
router.use("/", piRoutes);

export default router;