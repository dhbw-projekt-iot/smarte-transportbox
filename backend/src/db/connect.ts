import mongoose from "mongoose";

export async function connect() {
	try {
		await mongoose.connect(process.env.MONGO_URL!);
		console.log("Connected to database");
	}
	catch (error) {
		console.log("Error connecting to the database", error);
		process.exit(1);
	}
}