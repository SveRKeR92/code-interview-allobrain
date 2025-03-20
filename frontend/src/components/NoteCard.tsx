import {Note} from "../types/note.ts";

function NoteCard({ note }: { note: Note }) {
  return(
    <>
      <div className="note-card">
        <h3>{note.title}</h3>
      </div>
    </>
  )
}

export default NoteCard;