function index(i,j){
	if(i < 0 || j < 0 || i > Maze.rows-1 || j > Maze.cols-1){
		return undefined;
	}
	return Maze.cells[i][j];
}


//cell classs
function Cell(i,j,numWall){
	//location
	//i represents the ith row na dj represents the jth column	
	this.i = i;
	this.j = j;
	
	this.visited = false;//predicator for visiting
	this.isPath = false;//predicator if current is part of the solution
	this.neighbors = []; //indicate neighbors of current cell
	this.parent = null;//indicate parent of current cell
	this.inFrontier = false;

	//heuristic function
	this.f = 0;
	this.g = 0;
	this.h =0;

	//strokeness
	this.strokeness = 50;


	//0 is always the top wall
	//number of walls per cell(depends on cell shape)
	this.numWall = numWall;
	this.walls = [];
	for(var i =0;i < this.numWall;i++){
		this.walls.push(true);
	}


}

//Return a list of current's adjacent cells 
Cell.prototype.adjacentCells = function(){

}

//Display cell
Cell.prototype.show= function(){

}


//check if this.Neighbous have benn visited or not
Cell.prototype.getNeighbors = function() {
	var unvisited = [];//an array contains unvisited neighbors
	var adjacents = this.adjacentCells();

	for (var i = 0; i < adjacents.length; i++) {
		var cell = adjacents[i];
		if(cell && !cell.visited){
			unvisited.push(cell);
		}
	}

	//if there exist a neighbor that has not yet been visited,
	//randomly pick an neighour to be the wall
	if(unvisited.length > 0 ){
		var chosen  = floor(random(0,unvisited.length));
		return unvisited[chosen];
	}else{
		return undefined;
	}

}


//highlight the cell(i,j)
Cell.prototype.highlight = function(color){
	var x = this.j * Maze.w;
	var y = this.i * Maze.w;
	noStroke();
	fill(color);
	rect(x,y,Maze.w,Maze.w);
}


