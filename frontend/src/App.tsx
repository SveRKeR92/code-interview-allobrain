import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Note} from './types/note'
import './App.css'
import './styles/Note.css'

function App() {
  const [notes, setNotes] = useState<Note[]>([])

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
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Notes</h1>
      <ul className="note-list">
        {notes.map(note => (
          <li key={note.id}>
            <NoteCard note={note} />
          </li>
        ))}
      </ul>
    </>
  )
}

function NoteCard({ note }: { note: Note }) {
  return(
    <>
      <div className="note-card">
        {note.title}
        <br/>
        {note.content}
        <br/>
        {note.toString()}
      </div>
    </>
  )
}

export default App
