from typing import Optional, List
from pydantic import BaseModel, model_validator


class Node(BaseModel):
    id: int
    name: str
    parent: Optional['Node'] = None
    is_manager: bool = False
    department: Optional[str] = None
    is_developer: bool = False
    programming_language: Optional[str] = None
    children: List['Node'] = []
    height: int = 0

    @model_validator(mode="before")
    def validate_fields(self, values):
        if self.get('department') is not None and self.get('is_manager') is False:
            raise ValueError("Department only available for manager.")
        if self.get('programming_language') is not None and self.get('is_manager') is False:
            raise ValueError("Programming language must be set for a developer.")
        return self

    def add_child(self, child):
        self.children.append(child)
        child.change_parent(self)

    def change_parent(self, new_parent):
        self.parent = new_parent
        self.height = new_parent.height + 1
        for child in self.children:
            child.change_parent(self)

    class Config:
        arbitrary_types_allowed = True
