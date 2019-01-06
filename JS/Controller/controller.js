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

//enum type for cell shape
const shapes = {
	Rectangular:"Rectangular",
	Hexagonal:"Hexagonal",
	Triangular:"Triangular"
}

//number of walls for each shape
const numWalls = {
	Rectangular: 4,
	Hexagonal: 6,
	Triangular: 3
}


var chosenMeth = solver.bfs;//the chosen solver method
var chosenConstructor = constructor.RBT;//the chosen constructor method
var chosenShape = shapes.Rectangular;//Rectangular as the default shape


//--------------------------------Solver Listener
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

//-------------------------------Construtctor Listener
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
	Maze.setUpGrid(chosenShape);
	loop();
}


//listener for Filling effect event
function showSteps(){
	Maze.toggleSteps();
}


//--------------------------------Shapes of Cell
function chooseShape(shape){
	chosenShape = shape;
}
