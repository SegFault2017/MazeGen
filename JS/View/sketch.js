var Maze = [];

function setup(){
	// frameRate(30);
	var cnv = createCanvas(600,600);
	cnv.parent('board');
	Maze = new Grid(height,width);
	Maze.setUp();
	// frameRate(10);
}

function draw(){
	background(51);

	Maze.show();
	if (!Maze.done) {
		Maze.build();
		
	}else{//Maze is bulit
		//Path is found

		if(Maze.foundPath){
			noLoop();
		}

		if(Maze.findPath){
			Maze.solve();
		}else{
			noLoop();
		}	
	}
}

