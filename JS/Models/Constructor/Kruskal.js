//Construct edgeList
//Contains all edges of all possible vertices combinationsv
var makeEdges = function(){
	
	var edgeList =[];
	for (var i = 0; i < Maze.cells.length; i++) {
		for (var j = 0; j < Maze.cells[i].length-1; j++) {
			var edge =[];
			//if cells are on top row 
			var current = Maze.cells[i][j];
			var leftCell = Maze.cells[i][j+1];
			edge.push(current,leftCell);
			edgeList.push(edge);
			if(i != 0){
				var topCell = Maze.cells[i-1][j];
				var edge =[];
				edge.push(current,topCell);
				edgeList.push(edge);
			}
		}
	}

	//make edgelist for last column for all rows
	for(var i = 0; i < Maze.cells.length-1;i++){
		var edge =[];
		edge.push(Maze.cells[i][Maze.cols-1]);
		edge.push(Maze.cells[i+1][Maze.cols-1]);
		edgeList.push(edge);
	}

	return edgeList;
}

function Kruskal(start,end){
	Constructor.call(start,end);
	this.disjointSet = new DisJointSet(Maze.size());
	var inOrderEdge = makeEdges();
	//Sort edges by random
	this.edgeList = shuffle(inOrderEdge);

}

Kruskal.prototype = Object.create(Constructor.prototype);


//Kursakal Algorithm
//Start off with every single cell is a disjoint set and
//randomly pick a disjiont set and it's neighbors to join
Kruskal.prototype.constructMaze = function() {

	if(this.disjointSet.subsetSize > 1){
		//1.Randomly select an edge i
		var edge = this.edgeList.pop();
		edge[0].visited = true;
		edge[0].highlight(color(0,255,0));
		edge[1].visited = true;
		edge[1].highlight(color(0,255,0));


		//2.Get subset by converting 2d index to 1d index
		var indexA = Maze.toOneD(edge[0].i,edge[0].j);
		var indexB = Maze.toOneD(edge[1].i,edge[1].j);
		var rootA = this.disjointSet.findRoot(indexA);
		var rootB = this.disjointSet.findRoot(indexB);

		if(rootA != rootB){
			this.disjointSet.union(indexA,indexB);
			this.removeWalls(edge[0],edge[1]);
			edge[0].neighbors.push(edge[1]);
			edge[1].neighbors.push(edge[0]);
		}
		
	}else{
		Maze.done = true;
		Maze.resetVisited();
	}
	


};