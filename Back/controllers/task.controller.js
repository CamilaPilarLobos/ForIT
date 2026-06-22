import Task from "../models/Tasks.js";


export const listTask = async (_req, res) => {
    try {
        const tasks = await Task.find({}).sort({ createdAt: -1 }); 
        res.json(tasks);
    } catch (err) {
        return res.status(500).json({ message: "Server error on list" });
    }
};
export const createTask = async (req, res) => {
    try {
        const created = await Task.create(req.body);
        res.status(201).json(created);} 
        catch (err) {return res.status(500).json({ message: "Server error on create" });
    }
};

export const updateTask = async (req, res) => {
    try {
        const t = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true, runValidators: true
        });
        if (!t) return res.status(404).json({ message: "Task not found" });
        res.json(t);
    } catch (err) {return res.status(500).json({ message: "Server error" });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const t = await Task.findByIdAndDelete(req.params.id);
        if (!t) return res.status(404).json({ message: "Task not found" });
        return res.status(204).end();
    } catch (err) {return res.status(500).json({ message: "Server error" });
    }
};
