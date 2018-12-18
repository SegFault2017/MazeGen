var queue = []; //queue for DFS
var start; //start node

//initilization for BFS
function initBFS(){
	queue = [];
	start = current;
	queue.push(start);
	start.visited = true;
	start.parent = undefined;	
}

//BFS algorithm
function BFS(end){
	if(queue.length > 0){
		var top = queue[0];
		queue.splice(0,1);
		//Push unvisited neighbors to stack
		for (var i = 0; i < top.neighbors.length; i++) {
			var cell = top.neighbors[i];
			if(!cell.visited){
				cell.visited = true;
				queue.push(cell);
				cell.parent = top;
			}
			if(cell == end){//Construct path if found
				Maze.findPath = false;
				Maze.foundPath = true;
				resetVisited();
				ConstructPath(end);
			}
		}
	}else{
		Maze.findPath = false;
	}
}

//initilization for BFS
function initDFS(){
	stack = [];
	start = current;
	stack.push(start);
	start.visited = true;
	start.parent = undefined;
}

function getNeighbor(cell){
	for (var i = 0; i < cell.neighbors.length; i++) {
		if(!cell.neighbors[i].visited){
			return cell.neighbors[i];
		}
	}

	return undefined;
}


//DFS algorithm
function DFS(end){
	start.highlight(color(0,255,0));
	var next = getNeighbor(start);
	if(next){
		next.visited = true;
		next.parent = start;
		if(next == end){//Contruct path if found
			Maze.findPath = false;
			Maze.foundPath = true;
			resetVisited();
			ConstructPath(end);
			return;
		}
		stack.push(next);
		start = next;

	}else if(stack.length > 0){
		var cell = stack.pop();
		start = cell;
	}else{
		Maze.findPath = false;
	}

}



//Construct Path
function ConstructPath(end){
	var prev = end;
	prev.isPath = true;
	while(prev.parent != undefined) {
		prev = prev.parent;
		prev.isPath = true;
	}
	noFill();
}

