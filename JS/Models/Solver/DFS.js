function DFS(start,end){
	PathFinding.call(this,start,end);
	this.current = this.start;

	//Return a unvisited neighbor cell
	this.getNeighbor = function(cell){
		for (var i = 0; i < cell.neighbors.length; i++) {
			if(cell.neighbors[i].visited == false){
				return cell.neighbors[i];
			}
	}

	return undefined;
	}
}


//Inherits PathFinding prototypes
DFS.prototype = Object.create(PathFinding.prototype);

//Implement virtual method -- DFS
DFS.prototype.findPath = function(end){
	this.current.visited = true;
	this.current.highlight(color(0,255,0));

	//get next available neighbor
	var next = this.getNeighbor(this.current);
	if(next){
		next.visited = true;
		next.parent = this.current;
		//Check if current cell exits
		if(this.isReachEnd(next)){return;}
		this.stack.push(this.current);
		this.current = next;

	}else if(this.stack.length > 0){
		var cell = this.stack.pop();
		this.current = cell;
	}

	if(this.stack.length == 0){
		Maze.findPath = false;
	}
}
 