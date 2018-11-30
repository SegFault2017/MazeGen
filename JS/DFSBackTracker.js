//gvs
var stack = [];//stack of cell
var current;//current selss starts at 0,0



function resetVisited(){
	//Reset Visited 
		for (var i = 0; i < Maze.cells.length; i++) {
			for (var j = 0; j < Maze.cells[i].length; j++) {
				Maze.cells[i][j].visited = false;
			}
		}
}

//Recursive backTrack
function recursiveBackTrack(){
	current.visited = true;
	current.highlight(color(0,255,0));
	var next= current.checkNeighbors();
	if(next){
		next.visited = true;
		current.neighbors.push(next);
		next.neighbors.push(current);
		stack.push(current);
		removeWalls(current,next);
		current = next;
	}else if(stack.length > 0){
		var cell = stack.pop();
		//pop off the cell from the stack and make it as the current cell
		current = cell;

	}

	//Maze is constructed
	if(stack.length == 0){
		//current.highlight();
		Maze.done = true;
		resetVisited();


	}
}

//remove walls between current and next
function removeWalls(current,next){

	var diffX = current.j - next.j;
	if(diffX > 0 ){
		current.walls[1] = false;
		next.walls[3] = false;
	}else if(diffX < 0){
		current.walls[3] = false;
		next.walls[1] = false;
	}else{
		var diffY = current.i - next.i;
		if(diffY > 0 ){
			current.walls[0] = false;
			next.walls[2] = false;
		}else{
			current.walls[2] = false;
			next.walls[0] = false;
		}
	}

}


