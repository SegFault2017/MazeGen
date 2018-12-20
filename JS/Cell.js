function Grid(height,width){
	this.cells = [];//contain a 2d-array of cells
	this.done = false;//predicator for construction of maze
	this.findPath = false;
	this.w= 20;
	//calculate the # of cols and rows
	this.cols = (height/this.w);
	this.rows = (width/this.w);
	this.foundPath = false;

	//heuristic function
	this.f = 0;
	this.g = 0;
	this.h =0;


	this.setUp = function(){
		for (var i = 0; i < this.rows; i++) {
			var row = [];
			for (var j = 0; j < this.cols; j++) {
				var cell = new Cell(i,j,this.w);
				row.push(cell);
			}
			this.cells.push(row);
		}
		current = this.cells[0][0];
		current.parent = undefined;
		stack.push(current);

	}

	this.show = function(){
		for(var i = 0;i  < this.cells.length;i++){
			for (var j = 0; j < this.cells[i].length; j++) {
				this.cells[i][j].show();
			}
		}
	}

	//Construct Maze by using recursive Back Track
	this.ConstructMaze = function (){
		recursiveBackTrack();
	}
}


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
	//i represents the ith row na dj represents the jth column	
	this.i = i;
	this.j = j;
	this.w = w;
	var x = this.j * Maze.w;
	var y = this.i * Maze.w;
	this.visited = false;
	this.isPath = false;
	this.neighbors = []; 
	var parent = null;


	this.walls = [true,true,true,true]; //An array to store the existence of the wall correspnd to the cel
	//in this orider [top,left,bottom,right]

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


	//check if this.Neighbous have benn visited or not
	this.checkNeighbors = function() {
		var unvisited = [];//an array contains unvisited neighbors
		var top = index(i-1,j);
		var right = index(i,j+1);
		var left = index(i,j-1);
		var bottom = index(i+1,j);

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
	this.highlight = function(color){
		noStroke();
		fill(color);
		rect(x,y,Maze.w,Maze.w);
	}
}

