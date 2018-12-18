var done = true;
var Maze = [];
var end;


var BFS = "bfs";
var DFS = "dfs";
var chosenMeh = BFS;


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
	if(chosenMeh == BFS){
		BFS(end);
	}else{
		DFS(end);
	}
}

function chooseMeth(method){
	chosenMeh = method;
}

function constructMeth(){
	var rows = Maze.rows;
	var cols = Maze.cols;
	end = Maze.cells[rows-1][cols-1];
	Maze.findPath = true;

	if(chosenMeh == BFS){
		initBFS();
	}else{
		initDFS();
	}

}






