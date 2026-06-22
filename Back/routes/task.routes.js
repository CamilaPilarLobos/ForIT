import { Router } from "express";
import { listTask, createTask, updateTask, deleteTask } from "../controllers/task.controller.js";


const router = Router();

router.get("/", listTask);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete ("/:id", deleteTask);


export default router;