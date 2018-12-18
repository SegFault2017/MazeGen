var done = true;
var Maze = [];
var end;


var BFSMeth = "bfs";
var DFSMeth = "dfs";
var chosenMeth = BFSMeth;


function setup(){
	var cnv = createCanvas(600,600);
	cnv.parent('board');
	Maze = new Grid(height,width);
	Maze.setUp();
}

function draw(){
	background(51);
	Maze.show();
	if (!Maze.done) {
		Maze.ConstructMaze();
	}else{
		if(Maze.findPath){
			execMethod();
		}
	}
}

function execMethod(){
	if(chosenMeth == BFSMeth){
		BFS(end);
	}else{
		DFS(end);
	}
}


function chooseMeth(method){
	chosenMeth = method;
}

function constructMeth(){
	var rows = Maze.rows;
	var cols = Maze.cols;
	end = Maze.cells[rows-1][cols-1];
	Maze.findPath = true;

	if(chosenMeth == BFSMeth){
		initBFS();
	}else{
		initDFS();
	}

}






