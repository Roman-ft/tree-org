from typing import Optional
from pydantic import BaseModel


class NodeIn(BaseModel):
    id: int
    name: str
    is_manager: bool = False
    department: Optional[str] = None
    is_developer: bool = False
    programming_language: Optional[str] = None
    height: int = 0
