//add unvisited neighbours
function pushNeighbors(cell,unvisited){
	if(cell && !cell.visited){
		unvisited.push(cell);
	}
}


function index(i,j){
	if(i < 0 || j < 0 || i > Maze.rows-1 || j > Maze.cols-1){
		return undefined;
	}
	return Maze.cells[i][j];
}


//cell classs
function Cell(i,j,w){
	//location
	//i represents the ith row na dj represents the jth column	
	this.i = i;
	this.j = j;
	this.w = w;
	var x = this.j * Maze.w;
	var y = this.i * Maze.w;
	this.visited = false;//predicator for visiting
	this.isPath = false;//predicator if current is part of the solution
	this.neighbors = []; //indicate neighbors of current cell
	this.parent = null;//indicate parent of current cell
	this.inFrontier = false;

	//heuristic function
	this.f = 0;
	this.g = 0;
	this.h =0;

	//0 is always the top wall
	this.walls = [true,true,true,true]; //An array to store the existence of the wall correspnd to the cel
	//in this orider [top,left,bottom,right]


	//Display cell
	this.show = function(){
		var strokeness = 255;
		stroke(strokeness);

		if(this.walls[0]){
			line(x,y,x+Maze.w,y);
		}
		
		if(this.walls[1]){
			line(x,y,x,y+Maze.w);
		}

		if(this.walls[2]){
			line(x,y+Maze.w,x+Maze.w,y+Maze.w);
		}
		
		if(this.walls[3]){
			line(x+Maze.w,y,x+Maze.w,y+Maze.w);
		}

		if(this.visited){
			noStroke();
			fill(255,0,255,100);
			rect(x,y,Maze.w,Maze.w);
		}

		if(this.isPath){
			noStroke();
			fill(0,0,255,100);
			rect(x,y,Maze.w,Maze.w);
		}
	}

}
	//check if this.Neighbous have benn visited or not
	Cell.prototype.getNeighbors = function() {
		var unvisited = [];//an array contains unvisited neighbors
		var top = index(this.i-1,this.j);
		var right = index(this.i,this.j+1);
		var left = index(this.i,this.j-1);
		var bottom = index(this.i+1,this.j);

		pushNeighbors(top,unvisited);
		pushNeighbors(right,unvisited);
		pushNeighbors(left,unvisited);
		pushNeighbors(bottom,unvisited);

		//if there exist a neighbor that has not yet been visited,
		//randomly pick an neighour to be the wall
		if(unvisited.length > 0 ){
			var chosen  = floor(random(0,unvisited.length));
			return unvisited[chosen];
		}else{
			return undefined;
		}
	}


	//highlight current cell
	Cell.prototype.highlight = function(color){
		var x = this.j * Maze.w;
		var y = this.i * Maze.w;
		noStroke();
		fill(color);
		rect(x,y,Maze.w,Maze.w);
	}

	//Recover walls in all 4 directions
	Cell.prototype.recoverWalls = function(){
		this.walls[0] = true;
		this.walls[1] = true;
		this.walls[2] = true;
		this.walls[3] = true;
	}

	//Clear neighbors
	Cell.prototype.clearNeighbors = function(){
		this.neighbors.splice(0,this.neighbors.length);
	}


