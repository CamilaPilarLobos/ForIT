import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API = "http://localhost:8000/api";

export default function EditTaskPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({ title: "", description: ""});
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        (async () => {
        const r = await fetch(`${API}/tasks/${id}`);
        if (!r.ok) return navigate("/tasks");
        const data = await r.json();
        setForm({ 
            title: data.title ?? "", 
            description: data.description ?? "" 
        }); setLoading(false);
        })();
    }, [id, navigate]);

    const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setErrors({});
        
        const r = await fetch(`${API}/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify(form)
        });
        if (r.ok) { 
            navigate("/"); 
            return; 
        }
    };

    if (loading) return <p className="text-center mt-4">Loading…</p>;

    const cls = (name) => `form-control${errors[name] ? " is-invalid" : ""}`;

    return (
        <div className="container" style={{ maxWidth: 700 }}>
        <h1 className="text-center fw-bold my-4">Edit Task</h1>
        <form onSubmit={onSubmit} className="mx-auto" style={{ maxWidth: 640 }}>
            {["title","description"].map((name) => (
            <div className="mb-3"><label className="form-label">Title:</label>
                    <input 
                        type="text" name="title" className={cls("title")} value={form.title} onChange={onChange} 
                    />
                {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
            </div>
            ))}
            <div className="text-center">
            <button type="submit" className="btn btn-success px-4" disabled={saving}>
                {saving ? "Saving…" : "Save Changes"}
            </button>
            {errors.submit && <div className="text-danger mt-2">{errors.submit}</div>}
            </div>
        </form>
        </div>
    );
}
