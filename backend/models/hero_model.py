from sqlmodel import SQLModel, Field
from typing import Optional

from pydantic import BaseModel, conint

class Hero(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    age: int | None = Field(default=None, index=True)
    secret_name: str


class HeroValidator(BaseModel):
    name: str
    age: Optional[conint(ge=0)]
    secret_name: str