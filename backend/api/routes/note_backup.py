from fastapi import APIRouter, HTTPException
from fastapi.params import Depends
from sqlmodel import Session

from database import get_session
from models.note_backup import NoteBackup, NoteBackupValidator
from repositories.note_backup_repository import NoteBackupRepository
from repositories.note_repository import NoteRepository

router = APIRouter()

def get_note_backup_repository(session: Session = Depends(get_session)):
    return NoteBackupRepository(session)

def get_note_repository(session: Session = Depends(get_session)):
    return NoteRepository(session)

@router.get("/note_backup")
def read_notes_backup(
    backup_repository: NoteBackupRepository = Depends(get_note_backup_repository)
):
    notes_backups = backup_repository.get_all_note_backups()
    return notes_backups


@router.get("/note_backup/{note_id}")
def read_note_backup(
    note_id: int,
    backup_repository: NoteBackupRepository = Depends(get_note_backup_repository)
):
    note_backup = backup_repository.get_note_backup_by_id(note_id)
    if note_backup is None:
        raise HTTPException(status_code=404, detail="Note backup not found")
    return note_backup


@router.post("/note_backup")
def create_note_backup(
    note_validator: NoteBackupValidator,
    backup_repository: NoteBackupRepository = Depends(get_note_backup_repository),
    note_repository: NoteRepository = Depends(get_note_repository)
):
    note = note_repository.get_note_by_id(note_validator.note_id)
    note_backup = NoteBackup(
        note_id=note_validator.note_id,
        title=note.title,
        content=note.content,
    )
    return backup_repository.create_note_backup(note_backup)


@router.delete("/note_backup/{note_id}")
def delete_note_backup(
    note_id: int,
    backup_repository: NoteBackupRepository = Depends(get_note_backup_repository)
):
    delete_response = backup_repository.delete_note_backup(note_id)
    if not delete_response:
        raise HTTPException(status_code=404, detail="Note backup not found")
    return {"ok": True}