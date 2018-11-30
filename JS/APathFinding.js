var cols = 5;
var rows = 5;
var grid = new Array();


var openSet = [];
var closeSet = [];
var star;
var end;

var w,h;


function Spot(i,j){
	this.i = i;
	this.j = j;
	this.f = 0;
	this.g = 0;
	this.h = 0;


	this.show = function(color){
		fill(color);
		// console.log("w: %d, h: %d",w,h);
		rect(this.i*w,this.j*h, w-1,h-1);
	} 
}


//Remove an spot from an array

function setUpGrid(){
	//Making a 2d array
	for (var i = 0; i < rows; i++){
		grid[i] = new Array(cols);
	}


	for(var i =0; i < rows ;i++){
		for(var j = 0; j < cols; j++){
			grid[i][j] = new Spot(i,j);
		}
	}


	star = grid[0][0];
	end = grid[rows-1][cols-1];

	openSet.push(star);
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


	if(openSet.length > 0){
		//we can keep going
		var lowestIndex = 0;
		for (var i = 0; i < openSet.length; i++) {
			if(openSet[i].f < openSet[lowestIndex].f){
				lowestIndex = i;
			}
		}

		var current  = openSet[lowestIndex];



		if(openSet[lowestIndex] == end){
			console.log("Done!");
		}

		closeSet.push(current);



	}else{
		//no solution
	}
}