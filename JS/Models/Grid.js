function Grid(height,width){
	this.cells = [];//contain a 2d-array of cells
	this.done = false;//predicator for construction of maze
	this.findPath = false;
	this.w= 30;
	this.start;
	this.end;
	this.showSteps;//Predicator for drawing effect

	//calculate the # of cols and rows
	this.cols = (height-1)/(this.w);
	this.rows = (width-1)/(this.w);
	this.foundPath = false;

	//Maze Constructor
	this.mazeConstructor;

	//solver
	this.solution = new BFS(this.start,this.end);

	//---------Methods
	this.size =function(){
		return this.rows * this.cols;
	}



	//Change Cell Shape
	this.changeShape = function(i,j,shape){
		switch(shape){
			case shapes.Rectangular:
				return new Rectangular(i,j,numWalls.Rectangular);
				break;
			case shapes.Hexagonal:
				return new Hexagonal(i,j,numWalls.Hexagonal);
				break;
			case shapes.Triangular:
				return new Triangular(i,j,numWalls.Triangular);
				break;
		}
	}

	//Set up grid
	this.setUpGrid = function(shape){
		for (var i = 0; i < this.rows; i++) {
			var row = [];
			for(var j =0; j < this.cols;j++){
				var cell = this.changeShape(i,j,shape);
				row.push(cell);
			}
			this.cells.push(row);
		}
	}

	//Initializations
	this.setUp = function(){
		this.setUpGrid(shapes.Rectangular);//Cell shape is rectangualr by default
		this.start = this.cells[0][0];
		this.end = this.cells[this.rows-1][this.cols-1];
		this.mazeConstructor = new RecursiveBackTracker(this.start,this.end);
		this.solution = new BFS(this.start,this.end);


		this.showSteps = document.getElementById('steps').checked;


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
		if(this.showSteps){
			this.mazeConstructor.constructMazeWithSteps();
		}else{
			this.mazeConstructor.constructMaze();
		}
	}


	this.reSolve = function(){
		for (var i = 0; i < this.cells.length; i++) {
			for (var j = 0; j< this.cells[i].length; j++) {
				this.cells[i][j].parent = undefined;
				this.cells[i][j].isPath = false;
			}
		}
		this.foundPath = false;
		this.findPath = false;
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
					this.cells[i][j].inFrontier = false;
				}
			}
	}


	//convert 2d index to 1d
	this.toOneD = function(i,j){
		return i*this.cols + j;
	}


	//reset Maze property when ready to re-contruct
	this.reset = function(){
		//Clear all cells in Grid
		this.cells.length = 0;
		//Ready to reconstruct
		this.done = false;		
	}


	//toggle Drawing effects for both construtor and solver
	this.toggleSteps = function(){
		this.showSteps = !this.showSteps;
	}


}