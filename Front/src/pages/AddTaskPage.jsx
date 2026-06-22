import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:8000/api"; 

export default function AddTaskPage() {
    const [form, setForm] = useState({
        title: "",
        description: "",
        completed: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSubmitting(true);
        try {
        const r = await fetch(`${API}/tasks`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        if (!r.ok) throw new Error("Error al crear la tarea");
        await r.json(); 
        navigate("/tasks");
        } catch (err) {
        setError("No se pudo guardar la tarea. Revisa el título y la descripción.");
        } finally {
        setSubmitting(false);
        }
    };

    return (
        <div className="container" style={{ maxWidth: 700 }}>
        <h1 className="text-center fw-bold my-4">New Task</h1>

        <form onSubmit={onSubmit} className="mx-auto" style={{ maxWidth: 640 }}>
            <div className="mb-3">
            <label className="form-label">Title:</label>
            <input
                type="text"
                className="form-control"
                name="title"
                value={form.title}
                onChange={onChange}
                placeholder=""
            />
            </div>

            <div className="mb-3">
            <label className="form-label">Description:</label>
            <input
                type="text"
                className="form-control"
                name="description"
                value={form.description}
                onChange={onChange}
            />
            </div>

            <div className="mb-3">
            <label className="form-label">Completed:</label>
            <input
                type="text"
                className="form-control"
                name="completed"
                value={form.completed}
                onChange={onChange}
            />
            </div>

            <div className="text-center">
            <button type="submit" className="btn btn-success px-4" disabled={submitting}>
                {submitting ? "Saving…" : "Add Task"}
            </button>
            {error && <div className="text-danger mt-2">{error}</div>}
            </div>
        </form>
        </div>
    );
}
