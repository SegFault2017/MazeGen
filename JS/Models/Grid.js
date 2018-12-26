function Grid(height,width){
	this.cells = [];//contain a 2d-array of cells
	this.done = false;//predicator for construction of maze
	this.findPath = false;
	this.w= 30;
	this.start;
	this.end;

	//calculate the # of cols and rows
	this.cols = (height/this.w);
	this.rows = (width/this.w);
	this.foundPath = false;

	//Maze Constructor
	this.mazeConstructor;

	//solver
	this.solution = new BFS(this.start,this.end);



	//---------Methods
	this.size =function(){
		return this.rows * this.cols;
	}

	//Initializations
	this.setUp = function(){
		for (var i = 0; i < this.rows; i++) {
			var row = [];
			for (var j = 0; j < this.cols; j++) {
				var cell = new Cell(i,j,this.w);
				row.push(cell);
			}
			this.cells.push(row);
		}

		this.start = this.cells[0][0];
		this.end = this.cells[this.rows-1][this.cols-1];
		this.mazeConstructor = new Kruskal(this.start,this.end);
		this.solution = new BFS(this.start,this.end);

	}

	//Display Maze Grid
	this.show = function(){
		for(var i = 0;i  < this.cells.length;i++){
			for (var j = 0; j < this.cells[i].length; j++) {
				this.cells[i][j].show();
			}
		}
	}

	//Construct Maze by using recursive Back Track
	this.build = function (){
		this.mazeConstructor.constructMaze();
	}


	this.reSolve = function(){
		for (var i = 0; i < this.cells.length; i++) {
			for (var j = 0; j< this.cells[i].length; j++) {
				this.cells[i][j].parent = undefined;
				this.cells[i][j].isPath = false;
			}
		}
	}

	//Change Solver Method
	this.changeMeth = function(method){
		switch(method){
			case solver.bfs:
				this.solution = new BFS(this.start,this.end);
				break;
			case solver.dfs:
				this.solution = new DFS(this.start,this.end);
				break;
			case solver.aStar:
				this.solution = new AStar(this.start,this.end);
				break;
		}
	}

	//Change Constructor Method
	this.changeConstructor = function(method){
		switch(method){
			case constructor.RBT:
			this.mazeConstructor = new RecursiveBackTracker(this.start,this.end);
				break;
			case constructor.kruskal:
			this.mazeConstructor = new Kruskal(this.star,this.end);
				break;
			case constructor.prim:
			this.mazeConstructor = new Prim(this.star,this,end);
				break;
		}
	}


	//Solve this Maze
	this.solve = function(){
		this.solution.findPath();
	}

	//Unvisit all cells in Maze
	this.resetVisited = function(){
	//Reset Visited 
		for (var i = 0; i < this.cells.length; i++) {
			for (var j = 0; j < this.cells[i].length; j++) {
				this.cells[i][j].visited = false;
			}
		}
	}


	//convert 2d index to 1d
	this.toOneD = function(i,j){
		return i*this.cols + j;
	}
}