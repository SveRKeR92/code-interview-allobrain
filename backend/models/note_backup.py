from pydantic import BaseModel
from sqlmodel import SQLModel, Field
from datetime import datetime


class NoteBackup(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True, index=True)
    note_id: int = Field(foreign_key="note.id")
    title: str = Field(nullable=False)
    content: str | None = Field(nullable=False)
    created_at: str = Field(default=datetime.now())


class NoteBackupValidator(BaseModel):
    note_id: int