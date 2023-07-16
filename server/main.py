from fastapi import FastAPI, HTTPException
from test_data import root
from typing import Optional
from utils import find_node
from models.node_in import NodeIn
from models.node import Node
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChangeParentInput(BaseModel):
    new_parent_id: int


@app.get("/children/")
def read_children(parent_id: Optional[int] = None):
    if parent_id is None:
        return [root.dict_to_client()]

    # Lookup parent node using find_node function
    parent = find_node(root, parent_id)
    if parent is None:
        raise HTTPException(status_code=404, detail="Parent not found")

    # Return children of the parent node
    return [child.dict_to_client() for child in parent.children]


@app.post("/node/{parent_id}")
def add_node(parent_id: int, node_in: NodeIn):
    parent = find_node(root, parent_id)
    if parent is None:
        raise HTTPException(status_code=404, detail="Parent not found")

    Node(**node_in.model_dump(), parent=parent)

    return {"message": "Node added successfully"}


@app.put("/node/{node_id}/change_parent")
def change_parent(node_id: int, input: ChangeParentInput):
    node = find_node(root, node_id)
    if node is None:
        raise HTTPException(status_code=404, detail="Node not found")

    new_parent = find_node(root, input.new_parent_id)
    if new_parent is None:
        raise HTTPException(status_code=404, detail="New parent not found")

    try:
        node.change_parent(new_parent)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    return {"message": "Parent changed successfully"}
