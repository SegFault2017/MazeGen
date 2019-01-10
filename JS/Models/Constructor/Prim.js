
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

	//Mark cell's valid neighbors as "in frontier"
	this.mark = function(cell){
		var neighbors = this.getValidNeighbor(cell,false);
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
		var neighbors = this.getValidNeighbor(next,true).filter(n => n != undefined);
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
		var neighbors = this.getValidNeighbor(next,true).filter(n => n != undefined);
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


