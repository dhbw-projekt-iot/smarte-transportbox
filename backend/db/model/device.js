import mongoose from "mongoose";

const schema = mongoose.Schema({
    displayName: {
        type: "string",
        required: true,
    },
});

export default mongoose.model("Device", schema);