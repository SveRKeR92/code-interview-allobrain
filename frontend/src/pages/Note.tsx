import {useNavigate, useParams} from "react-router";
import { useEffect, useState } from "react";
import { Note as NoteType } from "../types/note.ts";
import Nav from "../components/Nav.tsx";
import '../styles/Note.css';
import HistoryDrawer from "../components/HistoryDrawer.tsx";
import EditForm from "../components/EditForm.tsx";
import Modal from "../components/Modal.tsx";
import {deleteNote, getBackups, getNote, updateNote} from "../scripts/note_api.ts";
import {NoteBackup} from "../types/noteBackup.ts";

function Note() {
  const [note, setNote] = useState<NoteType | null>(null);
  const [backups, setBackups] = useState<any[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const params = useParams();

  const openEditModal = () => setShowEditModal(true);
  const closeEditModal = () => setShowEditModal(false);
  const openDeleteModal = () => setShowDeleteModal(true);
  const closeDeleteModal = () => setShowDeleteModal(false);

  let navigate = useNavigate();

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
    closeEditModal();
  }

  const handleDelete = async () => {
    await deleteNote(note.id);
    closeDeleteModal();
    navigate('/');
  }

  const handleBackup = async (selectedBackup: NoteBackup) => {
    console.log(selectedBackup);
    const updatedNote = new NoteType(
      note.id,
      selectedBackup.title,
      selectedBackup.content,
      note.createdAt,
      note.updatedAt,
    )
    await updateNote(note);
    setNote(updatedNote);
  }

  return (
    <>
      <div className={'note-page'}>
        <div className={'note'}>
          <Nav />
          <header>
            <h1>{note.title}</h1>
            <div className={'btn-container'}>
              <button onClick={openEditModal}>Edit</button>
              <button onClick={openDeleteModal}>Delete</button>
            </div>
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
          <HistoryDrawer backups={backups} onBackup={handleBackup}/>
        </div>
      </div>
      <Modal title={'Edit a note'} open={showEditModal} onClose={closeEditModal}>
        <EditForm onSave={noteSaved} note={note} />
      </Modal>
      <Modal title={'Are you sure to delete this note ?'} open={showDeleteModal} onClose={closeDeleteModal}>
        <button onClick={handleDelete}>Confirm</button>
      </Modal>
    </>
    )

}

export default Note;