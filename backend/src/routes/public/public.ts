import express from "express";
const router = express.Router();

import locationRoutes from "./location.js";
import measurementRoutes from "./measurement.js";

router.use("/locations/", locationRoutes);
router.use("/measurements/", measurementRoutes);

export default router;