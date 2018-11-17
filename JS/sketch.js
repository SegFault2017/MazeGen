
//gvs
var cols,rows;
var w  = 20;
var grid = []; //an array to store cells
var current; // the current cell



var stack = [];//stack of cell


function setup(){
	createCanvas(400,400);
	//frameRate(5);

	//calculate the # of cols and rows
	rows = (height/w);
	cols = (width/w);


	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < cols; j++) {
			var cell = new Cell(i,j);
			grid.push(cell)
		}
	}
	//current selss starts at 0,0
	current = grid[0];
}

function draw(){
	background(51);
	for(var i = 0;i  < grid.length;i++){
		grid[i].show();
	}

	recursiveBackTrack();


}

//Recursive backTrack
function recursiveBackTrack(){
	current.visited = true;
	current.highlight();
	var next= current.checkNeighbors();
	if(next){
		next.visited = true;
		stack.push(current);
		removeWalls(current,next);
		current = next;
	}else if(stack.length > 0){
		//current cell is stuck cannot move forward
		var cell = stack.pop();
		//pop off the cell from the stack and make it as the current cell
		current = cell;

	}

	if(current.i == 0 && current.j == 0){
		noLoop();
	}
}

//remove walls between current and next
function removeWalls(current,next){

	var diffX = current.j - next.j;
	if(diffX > 0 ){
		current.walls[1] = false;
		next.walls[3] = false;
	}else if(diffX < 0){
		current.walls[3] = false;
		next.walls[1] = false;
	}else{
		var diffY = current.i - next.i;
		if(diffY > 0 ){
			current.walls[0] = false;
			next.walls[2] = false;
		}else{
			current.walls[2] = false;
			next.walls[0] = false;
		}
	}



}


