import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: { type: String, required: [true, "Title is required"], trim: true },
        description: { type: String, required: [true, "Description is required"], trim: true },
        completed: { type: Boolean, default: false },
    },
    { timestamps: true }
);
const Task = mongoose.model("Task", taskSchema);
export default Task;