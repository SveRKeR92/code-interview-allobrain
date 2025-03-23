import {Note} from "../types/note.ts";
import {NoteBackup} from "../types/noteBackup.ts";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';


export const getAllNotes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/notes`);
    const json: any[] = await response.json();
    return json.map(
      data => new Note(data.id, data.title, data.content, data.created_at, data.updated_at)
    )
  } catch (e) {
    console.error(e);
    throw e;
  }
}


export const getNote = async (id: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/notes/${id}`);
    const json: any = await response.json();
    return new Note(json.id, json.title, json.content, json.created_at, json.updated_at)
  } catch (e) {
    console.error(e);
    throw e;
  }
}


export const createNote = async (title: string, content: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        content,
      })
    })

    const json: any = await response.json();
    return new Note(json.id, json.title, json.content, json.created_at, json.updated_at)
  } catch (e) {
    console.error(e);
    throw e;
  }
}


export const updateNote = async (note: Note) => {
  try {
    const response = await fetch(`${API_BASE_URL}/notes/${note.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: note.title,
        content: note.content,
      })
    })
    const json: any = await response.json();
    return new Note(json.id, json.title, json.content, json.created_at, json.updated_at)
  } catch (e) {
    console.error(e);
    throw e;
  }
}


export const createBackup = async (noteId: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/note_backup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        note_id: noteId,
      })
    })
    return await response.json()
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export const getBackups = async (noteId: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/note_backup/${noteId}`);
    const json: any[] = await response.json()
    return json.map(
      data => new NoteBackup(data.id, data.title, data.content, data.created_at)
    )
  } catch (e) {
    console.error(e);
    throw e;
  }
}