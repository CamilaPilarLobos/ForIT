import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import taskRoutes from './routes/task.routes.js';

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());

const PORT = Number(process.env.PORT) || 8000;
const URI  = process.env.MONGOBD; 

app.get("/", (_req, res) => {res.json({ ok: true, msg: "lista de Tareas funcionando" });
});
app.use('/api/tasks', taskRoutes);

if (!URI) {
    console.error(" Falta la variable MONGOBD en server/.env");
    process.exit(1);
}

connectDB(URI).then(() => {
    app.listen(PORT, () => {
    console.log(` API on http://localhost:${PORT}`);
    });
});
