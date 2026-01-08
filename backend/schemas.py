from typing import List, Dict, Optional
from pydantic import BaseModel

class Node(BaseModel):
    id: str
    data: Dict = {}
    position: Dict = {}
    type: Optional[str] = None

class Edge(BaseModel):
    id: str
    source: str
    target: str
    type: Optional[str] = None

class PipelineData(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

class PipelineResult(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool
    message: str
