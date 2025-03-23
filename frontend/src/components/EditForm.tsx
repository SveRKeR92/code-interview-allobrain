import {Note} from "../types/note.ts";
import {useFormStatus} from "react-dom";
import {useState} from "react";
import '../styles/EditForm.css';
import {createBackup, createNote, updateNote} from "../scripts/note_api.ts";

interface FormProps {
  note?: Note;
  onSave: (note: Note) => void;
}

function EditForm(props: FormProps) {
  const [title, setTitle] = useState(props.note?.title || "");
  const [content, setContent] = useState(props.note?.content || "");


  const handleSave = async (formData: FormData) => {
    const title = formData.get('title');
    const content = formData.get('content');

    let note: Note | undefined = props.note;
    if (!note) {
      note = await createNote(title as string, content as string);
      await createBackup(note.id);
      resetValues();
    } else {
      note.updateNote(
        title as string,
        content as string
      );
      note = await updateNote(note);
      await createBackup(note.id);
    }
    props.onSave(note);
  }

  const isPending = () => {
    const { pending } = useFormStatus();
    return pending;
  };

  const isDisabled = !title.trim() || isPending();

  const resetValues = () => {
    setTitle("");
    setContent("");
  }

  return (
    <>
      <form action={handleSave} className={'edit-form'}>
        <label>Title</label>
        <input
          type="text"
          name='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Content</label>
        <textarea
          name='content'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type='submit' disabled={isDisabled}>
          Save
        </button>
      </form>
    </>
  )
}

export default EditForm;