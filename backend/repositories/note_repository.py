from database import SessionDep
from models.note_model import Note
from sqlmodel import select

class NoteRepository:
    def __init__(self, db: SessionDep):
        self.db = db

    def get_note_by_id(self, note_id: int) -> Note:
        return self.db.get(Note, note_id)

    def get_all_notes(self, offset: int = 0, limit: int = 100) -> list[Note]:
        return self.db.exec(select(Note).offset(offset).limit(limit)).all()

    def create_note(self, note: Note) -> Note:
        self.db.add(note)
        self.db.commit()
        self.db.refresh(note)
        return note

    def update_note(self, note_id: int, updated_note: Note) -> Note:
        note = self.get_note_by_id(note_id)
        if note:
            for key, value in updated_note.model_dump().items():
                setattr(note, key, value)
            self.db.commit()
            self.db.refresh(note)
        return note

    def delete_note(self, note_id: int) -> bool:
        note = self.get_note_by_id(note_id)
        if note:
            self.db.delete(note)
            self.db.commit()
            return True
        return False