//Constant variables
//enum type solver methods
const solver = {
	bfs:"bfs",
	dfs:"dfs",
	aStar:"aStar"
}

//enum type constructor method
const constructor = {
	RBT:"recursiveB",
	kruskal:"kruskal",
	prim:"prim"
}


var chosenMeth = solver.bfs;//the chosen solver method
var chosenConstructor = constructor.RBT;//the chosen constructor method

//An predicator for drawing efffect(filling the tiles of the maze)
var isDraw = document.getElementsByName('filling');


//Changes the chosen solver method over on-click event
function chooseMeth(method){
	chosenMeth = method;
}

//listenser for solve event
function selectMeth(){
	if(Maze.foundPath){
		Maze.reSolve();
	}
	
	//initMethod(chooseMeth);
	Maze.changeMeth(chosenMeth);
	Maze.findPath = true;
	loop();
}

//Changes the chosen constructor method over on-clikc event
function chooseConstructor(method){
	chosenConstructor = method;
}


//listener for construct maze event
function selectConstructor(){
	if(Maze.foundPath){
		Maze.reSolve();
	}
	Maze.changeConstructor(chosenConstructor);
	//Reset Maze
	Maze.reset();
	loop();
}


//listener for Filling effect event
function showSteps(){
	Maze.toggleSteps();
}


