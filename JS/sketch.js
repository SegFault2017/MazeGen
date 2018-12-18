var done = true;
var Maze = [];
var end;

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
			BFS(end);
			//DFS(end);
		}
	}
}



function mousePressed(){
	var rows = Maze.rows;
	var cols = Maze.cols;
	end = Maze.cells[rows-1][cols-1];

	//initBFS();
	//initDFS();
	Maze.findPath = true;
}






