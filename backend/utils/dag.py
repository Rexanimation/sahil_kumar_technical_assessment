from typing import List, Dict, Set
from schemas import Node, Edge

def build_adjacency_list(nodes: List[Node], edges: List[Edge]) -> Dict[str, List[str]]:
    adj = {node.id: [] for node in nodes}
    for edge in edges:
        if edge.source in adj:
            adj[edge.source].append(edge.target)
    return adj

def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    if not nodes:
        return True
    
    adj = build_adjacency_list(nodes, edges)
    visited: Set[str] = set()
    rec_stack: Set[str] = set()
    
    def has_cycle(node_id: str) -> bool:
        visited.add(node_id)
        rec_stack.add(node_id)
        
        for neighbor in adj.get(node_id, []):
            if neighbor not in visited:
                if has_cycle(neighbor):
                    return True
            elif neighbor in rec_stack:
                return True
        
        rec_stack.remove(node_id)
        return False
    
    for node in nodes:
        if node.id not in visited:
            if has_cycle(node.id):
                return False
    
    return True

def validate_pipeline(nodes: List[Node], edges: List[Edge]) -> Dict:
    num_nodes = len(nodes)
    num_edges = len(edges)
    dag_valid = is_dag(nodes, edges)
    
    message = ""
    if num_nodes == 0:
        message = "Pipeline is empty. Add some nodes to get started."
    elif not dag_valid:
        message = "Pipeline contains a cycle! Please remove circular connections."
    elif num_edges == 0 and num_nodes > 1:
        message = "Pipeline is valid but nodes are not connected."
    else:
        message = f"Pipeline is valid! {num_nodes} nodes, {num_edges} edges."
    
    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": dag_valid,
        "message": message
    }
