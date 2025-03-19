from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session
from database import get_session
from repositories.note_repository import NoteRepository
from models.note_model import NoteValidator, Note

router = APIRouter()

def get_note_repository(session: Session = Depends(get_session)):
    return NoteRepository(session)

@router.post("/notes/")
def create_note(note_request: NoteValidator, note_repository: NoteRepository = Depends(get_note_repository)):
    note = Note(**note_request.model_dump())
    db_note = note_repository.create_note(note)
    return db_note

@router.get("/notes/")
def read_notes(note_repository: NoteRepository = Depends(get_note_repository)):
    notes = note_repository.get_all_notes()
    return notes

@router.get("/notes/{note_id}")
def read_note(note_id: int, note_repository: NoteRepository = Depends(get_note_repository)):
    db_note = note_repository.get_note_by_id(note_id)
    if db_note is None:
        raise HTTPException(status_code=404, detail="Note not found")
    return db_note

@router.put("/notes/{note_id}")
def update_note(note_id: int, note_request: NoteValidator, note_repository: NoteRepository = Depends(get_note_repository)):
    note = Note(**note_request.model_dump())
    db_note = note_repository.update_note(note_id, note)
    if db_note is None:
        raise HTTPException(status_code=404, detail="Note not found")
    return db_note

@router.delete("/notes/{note_id}")
def delete_note(note_id: int, note_repository: NoteRepository = Depends(get_note_repository)):
    delete_response = note_repository.delete_note(note_id)
    if not delete_response:
        raise HTTPException(status_code=404, detail="Note not found")
    return {"ok": True}