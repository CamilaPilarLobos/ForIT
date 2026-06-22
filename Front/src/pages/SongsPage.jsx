import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const API = "http://localhost:8000/api";

export default function SongsPage() {
    const [q, setQ] = useState("");
    const [songs, setSongs] = useState([]);    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const load = async (query) => {
        try {
        setLoading(true);
        setError("");
        const qs = query ? `?q=${encodeURIComponent(query)}` : "";
        const r = await fetch(`${API}/songs${qs}`);
        if (!r.ok) throw new Error("Error al cargar canciones");
        const data = await r.json();          
        setSongs(data);
        } catch (e) {
        setError("No se pudieron cargar las canciones.");
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => { load(""); }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        load(q);
    };

    return (
        <div className="container">
        <h1 className="display-3 fw-bold text-center my-4">All Songs</h1>

        <form className="mx-auto mb-4" style={{ maxWidth: 540 }} onSubmit={onSubmit}>
            <input
            className="form-control"
            placeholder="Search songs by name, artist, or genre"
            value={q}
            onChange={(e)=>setQ(e.target.value)}
            />
        </form>

        {loading ? (
            <p className="text-center text-muted">Loading…</p>
        ) : error ? (
            <p className="text-center text-danger">{error}</p>
        ) : (
            <ul className="list-unstyled text-center fs-5">
            {songs.map((s) => (
                <li key={s._id} className="mb-2">
                <Link to={`/songs/${s._id}`} className="link-primary fw-semibold">
                    {s.title}
                </Link>
                <span className="text-muted">
                    {" "}by {s.artist} {s.genre ? `(${s.genre})` : ""}
                </span>
                </li>
            ))}
            </ul>
        )}
        </div>
    );
}
