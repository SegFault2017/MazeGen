//Constant variables
const solver = {
	bfs:"bfs",
	dfs:"dfs",
	aStar:"aStar"
}

const constructor = {
	RBT:"recursiveB",
	kruskal:"kruskal",
	prim:"prim"
}

var chosenMeth = solver.bfs;
var chosenConstructor = constructor.RBT;


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
}

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
	Maze.recoverWalls();
	Maze.done = false;
}
