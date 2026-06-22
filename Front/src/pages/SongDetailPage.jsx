import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const API = "http://localhost:8000/api";

function SongDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [song, setSong] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
        const r = await fetch(`${API}/songs/${id}`);
        if (!r.ok) { navigate("/songs"); return; }
        const data = await r.json();
        setSong(data);
        setLoading(false);
        })();
    }, [id, navigate]);

    const handleDelete = async () => {
        if (!window.confirm("Delete this song?")) return;
        const r = await fetch(`${API}/songs/${id}`, { method: "DELETE" });
        if (r.status === 204 || r.ok) navigate("/songs");
        else alert("Couldn't delete the song");
    };

    if (loading) return <p className="text-center mt-4">Loading…</p>;
    if (!song) return null;

    return (
        <div className="container">
        <h1 className="display-3 fw-bold text-center my-4">{song.title}</h1>

        <div className="text-center fs-5 mb-4">
            <p className="mb-2"><strong>Artist:</strong> {song.artist || "-"}</p>
            <p className="mb-2"><strong>Genre:</strong> {song.genre || "-"}</p>
            <p className="mb-2"><strong>Album:</strong> {song.album || "-"}</p>
        </div>

        <div className="text-center">
            <Link to={`/songs/${id}/edit`} className="btn btn-info me-2">Edit Song</Link>
            <button className="btn btn-danger" onClick={handleDelete}>Delete Song</button>
        </div>
        </div>
    );
}

export default SongDetailPage;

