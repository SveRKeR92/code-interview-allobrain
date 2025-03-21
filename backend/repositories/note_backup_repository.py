from sqlmodel import select

from database import SessionDep
from models.note_backup import NoteBackup


class NoteBackupRepository:
    def __init__(self, db: SessionDep):
        self.db = db

    def get_note_backup_by_id(self, note_backup_id: int) -> NoteBackup:
        return self.db.get(NoteBackup, note_backup_id)

    def get_all_note_backups(self, offset: int = 0, limit: int = 100) -> list[NoteBackup]:
        return self.db.exec(select(NoteBackup).offset(offset).limit(limit)).all()

    def get_note_backups_by_note_id(self, note_id: int) -> list[NoteBackup]:
        return self.db.exec(select(NoteBackup).where(NoteBackup.note_id == note_id)).all()

    def create_note_backup(self, note_backup: NoteBackup) -> NoteBackup:
        self.db.add(note_backup)
        self.db.commit()
        self.db.refresh(note_backup)
        return note_backup

    def delete_note_backup(self, note_backup_id: int) -> bool:
        note_backup = self.get_note_backup_by_id(note_backup_id)
        if note_backup:
            self.db.delete(note_backup)
            self.db.commit()
            return True
        return False