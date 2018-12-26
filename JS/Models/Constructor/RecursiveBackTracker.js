function RecursiveBackTracker(start,end){
	Constructor.call(this,start,end);
	this.current = this.start;
	this.stack=[];
	this.stack.push(this.current);
}

RecursiveBackTracker.prototype = Object.create(Constructor.prototype);

RecursiveBackTracker.prototype.constructMaze = function(){
	//Recursive backTrack
	while(this.stack.length != 0){
		this.current.visited = true;
		this.current.highlight(color(0,255,0));
		var next= this.current.getNeighbors();
		if(next){
			next.visited = true;
			this.current.neighbors.push(next);
			next.neighbors.push(this.current);
			this.stack.push(this.current);
			this.removeWalls(this.current,next);
			this.current = next;
		}else if(this.stack.length > 0){
			var cell = this.stack.pop();
			//pops off the cell from the stack and make it as the current cell
			this.current = cell;
		}
	}
	Maze.done = true;
	Maze.resetVisited();
}