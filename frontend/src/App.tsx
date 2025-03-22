import {useEffect, useState} from 'react'
import {Note} from './types/note'
import './styles/App.css'
import NoteCard from "./components/NoteCard.tsx";
import {NavLink} from "react-router";
import Modal from "./components/Modal.tsx";
import EditForm from "./components/EditForm.tsx";
import {getAllNotes} from "./scripts/note_api.ts";

function App() {
  const [notes, setNotes] = useState<Note[]>([])
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const noteSaved = (note: Note) => {
    setNotes(notes.concat(note))
    closeModal();
  }

  useEffect(() => {
    const fetchAndSetNotes = async () => {
      try {
        const notes = await getAllNotes();
        setNotes(notes);
      } catch (e) {
        console.error(e);
      }
    }

    fetchAndSetNotes();
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
      <button onClick={openModal}>Create new note</button>
      <Modal title={'Create a Note'} open={showModal} onClose={closeModal}>
        <EditForm onSave={noteSaved}/>
      </Modal>
    </>
  )
}

export default App
