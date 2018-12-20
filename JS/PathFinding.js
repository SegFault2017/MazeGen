var queue = []; //queue for DFS
var start; //start node


//initialization
function initMethod(method){
	start = current;
	start.visited = true;
	start.parent = undefined;
	if(method == BFSMeth || AStarMeth){
		queue = [];
		queue.push(start);
	}else{
		stack = [];
		stack.push(start);
	}
}

//BFS algorithm
function BFS(end){
	if(queue.length > 0){
		var top = queue[0];
		queue.shift();
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
				return;
			}
		}
	}else{
		Maze.findPath = false;
	}
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


//Heuristic function
//return Euclidean Distance
function heuristic(a,b){
	//return dist(a.i,a.j,b.i,b.j);
	return abs(a.i-b.i) + abs(a.j - b.j);
}

//Calculate f cose
function calF(cell,end,val){
	cell.g = val;
	cell.h = heuristic(cell,end);
	cell.f = cell.g + cell.h;
}


//A* algorithm
function AStar(end){
	if(queue.length > 0){
		var lowestC = 0;
		//find lowest cost in frontier
		for (var i = 0; i < queue.length; i++) {
			if(queue[i].f < queue[lowestC].f){
				lowestC = i;
			}
		}

		//current lowest f cost cell
		current = queue[lowestC];
		current.highlight(color(0,255,0));
		queue.splice(lowestC,1);

		if(current == end){
			Maze.findPath = false;
			Maze.foundPath = true;
			resetVisited();
			ConstructPath(end);
			return;
		}

		
		for (var i = 0; i < current.neighbors.length; i++) {
			var neighbor = current.neighbors[i];
			if(!neighbor.visited){
				neighbor.visited = true;
				var gCost = current.g + 1;
				if(queue.includes(neighbor)){
					if(gCost < neighbor.g){
						calF(neighbor,end,gCost);
						neighbor.parent = current;
					}
				}else{
					calF(neighbor,end,gCost);
					neighbor.parent = current;
					queue.push(neighbor);
				}	
			}
		}

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

