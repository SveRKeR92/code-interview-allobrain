import {Note} from "../types/note.ts";
import '../styles/NoteCard.css'

interface NoteCardProps {
  note: Note;
}

function NoteCard(props: NoteCardProps) {
  return(
    <>
      <div className="note-card">
        <h3>{props.note.title}</h3>
      </div>
    </>
  )
}

export default NoteCard;