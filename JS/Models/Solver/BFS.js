function BFS(start,end) {
	PathFinding.call(this,start,end);
}

//Inherits PathFinding prototypes
BFS.prototype = Object.create(PathFinding.prototype);

//Implement virtual method -- BFS
BFS.prototype.findPath = function(){
	this.start.visited = true;
	if(this.queue.length > 0){
		var top = this.queue[0];
		top.highlight(color(0,255,0));
		this.queue.shift();
		//Push unvisited neighbors to stack
		for (var i = 0; i < top.neighbors.length; i++) {
			var cell = top.neighbors[i];
			if(!cell.visited){
				cell.visited = true;
				this.queue.push(cell);
				cell.parent = top;
			}
			//Check if current cell exits
			if(this.isReachEnd(cell)){return;}
		}
	}else{
		Maze.findPath = false;
	}
}