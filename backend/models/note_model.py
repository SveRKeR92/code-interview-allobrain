from typing import Optional
from pydantic import BaseModel
from sqlmodel import SQLModel, Field
from datetime import datetime


class Note(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str = Field(index=True)
    content: int | None = Field(default=None, index=True)
    created_at: datetime = Field(default=datetime.now())
    updated_at: datetime = Field(default=datetime.now())


class NoteValidator(BaseModel):
    title: str
    content: Optional[str]