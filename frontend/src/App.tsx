import {useEffect, useState} from 'react'
import {Note} from './types/note'
import './styles/App.css'
import NoteCard from "./components/NoteCard.tsx";
import {NavLink} from "react-router";
import Modal from "./components/Modal.tsx";
import EditForm from "./components/EditForm.tsx";

function App() {
  const [notes, setNotes] = useState<Note[]>([])
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => setShowModal(false);

  const noteSaved = (note: Note) => {
    setNotes(notes.concat(note))
    closeModal();
  }

  useEffect(() => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';
    fetch(`${API_BASE_URL}/notes`)
      .then(r => r.json())
      .then((json: any[]) =>
        setNotes(
          json.map(
            data => new Note(data.id, data.title, data.content, data.created_at, data.updated_at)
          )
        )
      )
      .catch(e => console.error(e))
  }, [])

  return (
    <>
      <h1>Notes</h1>
      <ul className="note-list">
        {notes.map(note => (
          <li key={note.id}>
            <NavLink className={'link'} to={`/note/${note.id}`}>
              <NoteCard note={note} />
            </NavLink>
          </li>
        ))}
      </ul>
      <button onClick={() => setShowModal(true)}>Create new note</button>
      <Modal title={'Create a Note'} open={showModal} onClose={closeModal}>
        <EditForm onSave={noteSaved}/>
      </Modal>
    </>
  )
}

export default App
