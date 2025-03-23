import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Note as NoteType } from "../types/note.ts";
import Nav from "../components/Nav.tsx";
import '../styles/Note.css';
import HistoryDrawer from "../components/HistoryDrawer.tsx";
import EditForm from "../components/EditForm.tsx";
import Modal from "../components/Modal.tsx";
import {getBackups, getNote} from "../scripts/note_api.ts";

function Note() {
  const [note, setNote] = useState<NoteType | null>(null);
  const [backups, setBackups] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const params = useParams();

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);


  useEffect(() => {
    const fetchAndSetNote = async () => {
      try {
        const note = await getNote(Number(params.id))
        setNote(note);
      } catch (e) {
        console.error(e);
      }
    }

    fetchAndSetNote();
  }, [params.id]);

  useEffect(() => {
    const fetchAndSetBackups = async () => {
      try {
        if (note) {
          const backups = await getBackups(note.id);
          setBackups(backups)
        }
      } catch (e) {
        console.error(e);
      }
    }

    fetchAndSetBackups();
  }, [note]);

  if (!note) return <div>Note not found</div>;

  const noteSaved = (note: NoteType) => {
    console.log(note);
    setNote(note);
    closeModal();
  }

  return (
    <>
      <div className={'note-page'}>
        <div className={'note'}>
          <Nav />
          <header>
            <h1>{note.title}</h1>
            <button onClick={openModal}>Edit</button>
          </header>
          <div>
            <p>{note.content}</p>
          </div>
          <footer>
            <p>Last updated</p>
            <p>{note.updatedAt.split(' ')[0]}</p>
          </footer>
        </div>
        <div className={'history-drawer-container'}>
          <HistoryDrawer backups={backups} />
        </div>
      </div>
      <Modal title={'Edit a note'} open={showModal} onClose={closeModal}>
        <EditForm onSave={noteSaved} note={note} />
      </Modal>
    </>
    )

}

export default Note;