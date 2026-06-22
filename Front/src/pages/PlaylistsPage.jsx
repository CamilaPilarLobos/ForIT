import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API = "http://localhost:8000/api"; 
export default function PlaylistsPage() {
    const [q, setQ] = useState("");
    const [list, setList] = useState([]);   
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        (async () => {
        try {
            setLoading(true);
            const r = await fetch(`${API}/playlists`);
            if (!r.ok) throw new Error("Error al cargar playlists");
            const data = await r.json();         
            setList(data);
        } catch (e) {
            setError("No se pudieron cargar las playlists.");
        } finally {
            setLoading(false);
        }
        })();
    }, []);

    const filtered = q
        ? list.filter(p => p.name.toLowerCase().includes(q.toLowerCase()))
        : list;

    return (
        <div className="container">

        <h1 className="display-3 fw-bold text-center my-4">All Playlists</h1>


        <form className="mx-auto mb-4" style={{ maxWidth: 540 }} onSubmit={(e)=>e.preventDefault()}>
            <input
            className="form-control"
            placeholder="Search playlists"
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
            {filtered.map(pl => (
                <li key={pl._id} className="mb-3">
                <Link to={`/playlists/${pl._id}`} className="link-primary fw-semibold">
                    {pl.name}
                </Link>
                </li>
            ))}
            </ul>
        )}
        </div>
    );
}
