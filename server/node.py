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
        if self.is_child_of(child):
            raise ValueError(f'{child.name} is a parent of {self.name}')
        self.children.append(child)
        child.change_parent(self)

    def change_parent(self, new_parent):
        if self.is_child_of(new_parent):
            raise ValueError(f'{new_parent.name} is a parent of {self.name}')
        self.parent = new_parent
        self.height = new_parent.height + 1
        for child in self.children:
            child.change_parent(self)

    def is_child_of(self, node):
        current = self.parent
        while current is not None:
            if current.id == node.id:
                return True
            current = current.parent
        return False

    def dict_to_client(self):
        return {
            "id": self.id,
            "name": self.name,
            "is_manager": self.is_manager,
            "department": self.department,
            "is_developer": self.is_developer,
            "programming_language": self.programming_language,
            "children": [child.dict_to_client() for child in self.children],
            "height": self.height,
            "parent_id": self.parent.id
        }

    class Config:
        arbitrary_types_allowed = True
