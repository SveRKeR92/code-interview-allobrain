from typing import Optional

from pydantic import BaseModel, conint


class HeroValidator(BaseModel):
    id : Optional[int] = None
    name: str
    age: Optional[conint(ge=0)]
    secret_name: str