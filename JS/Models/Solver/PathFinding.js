function PathFinding(start,end){
	this.start = start;
	this.end = end;
	this.queue =[];
	this.stack =[];
	this.queue.push(this.start);
	this.stack.push(this.start);
}

//Find Maze Path
PathFinding.prototype.findPath = function() {};


//Construct Path
PathFinding.prototype.constructPath = function() {
	var prev = this.end;
	prev.isPath = true;
	while(prev.parent != undefined) {
		prev = prev.parent;
		prev.isPath = true;
	}
	noFill();
};


//Check if current cell reaches the exit cell
PathFinding.prototype.isReachEnd = function(cell){
	if(cell == this.end){
		Maze.findPath = false;
		Maze.foundPath = true;
		Maze.resetVisited();
		this.constructPath();
		return true;
	}

	return false;
}


