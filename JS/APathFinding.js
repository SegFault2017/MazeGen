var cols = 25;
var rows = 25;
var grid = new Array();


var openSet = [];
var closeSet = [];
var star;
var end;
var current;
var w,h;
var path = [];


function Spot(i,j){
	this.i = i;
	this.j = j;
	this.f = 0;
	this.g = 0;
	this.h = 0;
	this.neighbors =[];
	this.prev = undefined;

	this.addNeighbors = function(){
		var i = this.i;
		var j = this.j;
		if(i < rows-1){
			this.neighbors.push(grid[i+1][j]);
		}
		if(i > 0){
			this.neighbors.push(grid[i-1][j]);
		}
		if(j < cols - 1){
			this.neighbors.push(grid[i][j+1]);
		}
		if(j >0 ){
			this.neighbors.push(grid[i][j-1]);
		}
		
		
		
		
	}

	this.show = function(color){
		fill(color);
		rect(this.i*w,this.j*h, w-1,h-1);
	} 


}


//Remove an spot from an array

function setUpGrid(){
	w = width/cols;
	h = height/rows;
	//Making a 2d array
	for (var i = 0; i < rows; i++){
		grid[i] = new Array(cols);
	}


	for(var i =0; i < rows ;i++){
		for(var j = 0; j < cols; j++){
			grid[i][j] = new Spot(i,j);
		}
	}


	for(var i =0;i < rows; i++){
		for(var j = 0; j < cols;j++){
			grid[i][j].addNeighbors();
		}
	}


	star = grid[0][0];
	current = star;
	end = grid[rows-1][cols-1];

	openSet.push(star);
}


function removeFromArray(item,arr){
	for (var i = 0; i < arr.length; i++) {
		if(arr[i] === item){
			arr.splice(i,1);
		}
	}
}

function heuristic(a,b){
	 return dist(a.i,a.j,b.i,b.j);
	//return abs(a.i - b.i) + abs(a.j - b.j);
}



function findPath(){
	//show grid
	for(var i = 0; i< rows ; i++){
		for (var j = 0; j < cols; j++){
			grid[i][j].show(color(255));
		}
	}

	//show coloseSet
	for (var i = 0; i < closeSet.length; i++) {
		closeSet[i].show(color(255,0,0));
	}

	//Show OpenSet
	for (var i = 0; i < openSet.length; i++) {
		openSet[i].show(color(0,255,0));
	}


	//show path
	path = [];
		var tmp = current;
		path.push(tmp);
		while(tmp.prev){
			path.push(tmp);
			tmp = tmp.prev;
		}
	for (var i = 0; i < path.length; i++) {
		path[i].show(color(0,0,255));
	}


	if(openSet.length > 0){
		//we can keep going
		var winner = 0;
		for (var i = 0; i < openSet.length; i++) {
			if(openSet[i].f < openSet[winner].f){
				winner = i;
			}
		}

		current  = openSet[winner];

		if(openSet[winner] === end){
			noLoop();
			console.log("Done!");
		}

		removeFromArray(current,openSet);
		closeSet.push(current);

		var neighbors = current.neighbors;
		for (var i = 0; i < neighbors.length; i++) {
			var neighbor = neighbors[i];
			if(!closeSet.includes(neighbor)){
				var temp = current.g +sqrt(2);
				if(openSet.includes(neighbor)){
					if(temp < neighbor.g){
						neighbor.g = temp;
						neighbor.h = heuristic(neighbor,end);
						neighbor.f = neighbor.g + neighbor.h;
						neighbor.prev = current;
					}
				}else{
					neighbor.g = temp;
					neighbor.prev = current;
					openSet.push(neighbor);
					neighbor.h = heuristic(neighbor,end);
					neighbor.f = neighbor.g + neighbor.h;
				}

				

			}

		}

	}else{
		//no solution
	}
}