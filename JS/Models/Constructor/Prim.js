
//Pick a random row
function randomRow(){
	return floor(random(0,Maze.rows-1));
}

//Pick a random column
function randomCol(){
	return floor(random(0,Maze.cols-1));
}

//Return a valid(cond) neighbor of cell(i,j) 
function validNeighbor(i,j,cond){
	var neighbor = index(i,j);
	if(!neighbor || !(neighbor.visited == cond)){
		return undefined;
	}

	return neighbor;
}


function Prim(start,end){
	Constructor.call(this.start,this.end);
	//Randomly pick a cell first
	this.current = Maze.cells[randomRow()][randomCol()];
	this.current.visited = true;
	this.frontier =[];

	//--------------------Methods
	//Return a list of valid(cond) neighbors of cell
	//Max members in neighbor list is 4
	this.getValidNeighbor = function(cell,cond){
		var top = validNeighbor(cell.i-1,cell.j,cond);
		var right = validNeighbor(cell.i,cell.j+1,cond);
		var left = validNeighbor(cell.i,cell.j-1,cond);
		var bottom = validNeighbor(cell.i+1,cell.j,cond);

		return [top,right,left,bottom];
	};

	this.getValidNeighborForH = function(cell,cond){
		var north = validNeighbor(cell.i-1,cell.j,cond);
		var south = validNeighbor(cell.i+1,cell.j,cond);
		var east = validNeighbor(cell.i,cell.j+1,cond);
		var west = validNeighbor(cell.i,cell.j-1,cond);

		var adj1,adj2;

		if(this.j %2 == 0){
			adj1 = validNeighbor(cell.i-1,cell.j+1,cond);
			adj2 = validNeighbor(cell.i-1,cell.j-1,cond);
		}else{
			adj1 = validNeighbor(cell.i+1,cell.j+1,cond);
			adj2 = validNeighbor(cell.i+1,cell.j-1,cond);

		}

		return [north,south,east,west,adj1,adj2];

	}

	this.getValidNeighborForT = function(cell,cond){
		var adj1;
		var adj2 = validNeighbor(cell.i,cell.j-1,cond);
		var adj3 = validNeighbor(cell.i,cell.j+1,cond)
		if(cell.isUpward){
			adj1 = validNeighbor(cell.i+1,cell.j,cond);
		}else{
			adj1 = validNeighbor(cell.i-1,cell.j,cond);
		}

		return [adj1,adj2,adj3];

	}




	this.getValidNeigh = function(cell,cond){
		var neighbors;
		switch(Maze.shape){
			case shapes.Rectangular:
				neighbors = this.getValidNeighbor(cell,cond);
				break;
			case shapes.Hexagonal:
				neighbors = this.getValidNeighbor(cell,cond);
				break;
			case shapes.Triangular:
				neighbors = this.getValidNeighborForT(cell,cond);
				break;
			
		}
		return neighbors;

	}

	//Mark cell's valid neighbors as "in frontier"
	this.mark = function(cell){
		var neighbors = this.getValidNeigh(cell,false);
		for (var i = 0; i < neighbors.length; i++) {
			if(neighbors[i] && !neighbors[i].inFrontier){
				neighbors[i].inFrontier = true;
				this.frontier.push(neighbors[i]);
			}
		}

	};

	//Display frontier
	this.showFrontier = function(){
		for (var i = 0; i < this.frontier.length; i++) {
			this.frontier[i].highlight(color(255,0,0,100));
		}
	};


	//Initialize frontier
	this.mark(this.current);
	
}

Prim.prototype = Object.create(Constructor.prototype);

//Prim's Algorithm
//1.Start by selceting a random cell on the grid
//2.Iterate through until the frontier set is empty
//3.choose a random frontier cell
//4.choose a random valid neighbor of the chosen frontier cell
//5.make a passage of the chosen frontier cell and its chosen neighbor
Prim.prototype.constructMaze = function(){
	while(this.frontier.length >0){//Iterate through until the frontier set is empty
		this.showFrontier();

		//choose a random frontier cell
		var rand = floor(random(0,this.frontier.length));
		var next = this.frontier[rand];
		next.visited = true;
		this.frontier.splice(rand,1);

		//choose a random valid neighbor of the chosen frontier cell
		var neighbors = this.getValidNeigh(next,true).filter(n => n != undefined);
		var visitedNeighbor = neighbors[floor(random(0,neighbors.length))];

		//make a passage of the chosen frontier cell and its chosen neighbor
		visitedNeighbor.removeWalls(next);
		visitedNeighbor.neighbors.push(next);
		next.neighbors.push(visitedNeighbor);
		this.mark(next);
	}
	Maze.done = true;
	Maze.resetVisited();
};

Prim.prototype.constructMazeWithSteps = function() {
	if(this.frontier.length >0){//Iterate through until the frontier set is empty
		this.showFrontier();

		//choose a random frontier cell
		var rand = floor(random(0,this.frontier.length));
		var next = this.frontier[rand];
		next.visited = true;
		this.frontier.splice(rand,1);

		//choose a random valid neighbor of the chosen frontier cell
		var neighbors = this.getValidNeigh(next,true).filter(n => n != undefined);
		var visitedNeighbor = neighbors[floor(random(0,neighbors.length))];

		//make a passage of the chosen frontier cell and its chosen neighbor
		visitedNeighbor.removeWalls(next);
		visitedNeighbor.neighbors.push(next);
		next.neighbors.push(visitedNeighbor);
		this.mark(next);
	}else{
		Maze.done = true;
		Maze.resetVisited();
	}
};


