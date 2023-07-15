from fastapi import FastAPI, HTTPException
from test_data import root
from typing import Optional
from utils import find_node
app = FastAPI()


@app.get("/children/")
def read_children(parent_id: Optional[int] = None):
    if parent_id is None:
        # If no id is provided, return root's children
        return [child.dict_to_client() for child in root.children]

    # Lookup parent node using find_node function
    parent = find_node(root, parent_id)
    if parent is None:
        raise HTTPException(status_code=404, detail="Parent not found")

    # Return children of the parent node
    return [child.dict_to_client() for child in parent.children]