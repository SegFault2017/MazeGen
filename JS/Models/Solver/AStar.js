function AStar(start,end) {
	PathFinding.call(this,start,end);

	//Heuristic Function
	this.heuristic = function(a,b){
		return abs(a.i - b.i) + abs(a.j - b.j);
	}

	//Update Current cell f-cost
	this.calF = function(cell,end,val){
		cell.g = val;
		cell.h = this.heuristic(cell,end);
		cell.f = cell.g + cell.h;
	}
}

//Inherits PathFinding prototypes
AStar.prototype = Object.create(PathFinding.prototype);

//Implement virtual Method -- A Star
AStar.prototype.findPath = function(end) {
	this.start.visited = true;
	if(this.queue.length > 0){
		var lowestC = 0;
		//find lowest cost in frontier
		for (var i = 0; i < this.queue.length; i++) {
			if(this.queue[i].f < this.queue[lowestC].f){
				lowestC = i;
			}
		}

		//current lowest f cost cell
		var current = this.queue[lowestC];
		current.highlight(color(0,255,0));
		this.queue.splice(lowestC,1);

		//Check if exit is found
		if(this.isReachEnd(current)){return;}

		//Find the next lowest neighbor f cost
		for (var i = 0; i < current.neighbors.length; i++) {
			var neighbor = current.neighbors[i];
			if(!neighbor.visited){
				neighbor.visited = true;
				var gCost = current.g + 1;
				if(this.queue.includes(neighbor)){
					if(gCost < neighbor.g){
						this.calF(neighbor,this.end,gCost);
						neighbor.parent = current;
					}
				}else{
					this.calF(neighbor,this.end,gCost);
					neighbor.parent = current;
					this.queue.push(neighbor);
				}
			}
		}

	}else{
		Maze.findPath = false;
	}
};