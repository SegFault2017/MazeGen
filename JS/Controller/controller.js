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
var chosenConstructor = constructor.kruskal;


function chooseMeth(method){
	chosenMeth = method;
}

function selectMeth(){
	if(!Maze.findPath){
		Maze.reSolve();
	}
	
	//initMethod(chooseMeth);
	Maze.changeMeth(chosenMeth);
	Maze.findPath = true;
}

function chooseConstructor(method){
	chosenConstructor = method;
}

function selectConstructor(){
	Maze.changeConstructor(chosenMeth);
}
