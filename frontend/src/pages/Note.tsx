import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Note as NoteType } from "../types/note.ts";
import Nav from "../components/Nav.tsx";
import '../styles/Note.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

function Note() {
  const [note, setNote] = useState<NoteType | null>(null);
  const params = useParams();

  useEffect(() => {
    fetch(`${API_BASE_URL}/notes/${params.id}`)
      .then((r) => r.json())
      .then((json: any) => {
        const newNote = new NoteType(json.id, json.title, json.content, json.created_at, json.updated_at);
        setNote(newNote);
      })
      .catch((e) => console.error(e))
  }, [params.id]);

  if (!note) return <div>Note not found</div>;

  return (
    <>
      <div className={'note-page'}>
        <Nav />
        <h1>{note.title}</h1>
        <div>
          <p>{note.content}</p>
        </div>
        <footer>
          <p>Last updated</p>
          <p>{note.updatedAt}</p>
        </footer>
      </div>
    </>
    )

}

export default Note;