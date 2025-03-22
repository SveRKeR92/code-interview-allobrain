import {Note} from "../types/note.ts";
import {useFormStatus} from "react-dom";
import {useState} from "react";
import '../styles/EditForm.css';

interface FormProps {
  note?: Note;
  onSave: (note: Note) => void;
}

function EditForm(props: FormProps) {
  const [title, setTitle] = useState(props.note?.title || "");
  const [content, setContent] = useState(props.note?.content || "");


  const handleSave = (formData: FormData) => {
    const title = formData.get('title');
    const content = formData.get('content');

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';
    fetch(`${API_BASE_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        content,
      })
    })
      .then((r) => r.json())
      .then((json: any) => {
        const newNote = new Note(json.id, json.title, json.content, json.created_at, json.updated_at);
        resetValues();
        props.onSave(newNote);
      })
      .catch((e) => console.error(e))
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