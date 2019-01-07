//Contains the edge points of the hexagon cell
var edgePoints =[];
var isInitialized = false;
//Return a list of edge points of hexagon cell(0,0)
function getEdgePts(angle,radius,numWall){
	//Initializes edgePoints
	for (var i = 0; i < TWO_PI; i+=angle) {
		var pair = [];
		var sx = cos(i) * radius + radius;
		var sy = sin(i) * radius - floor(sin(4*angle) * radius);
		pair.push(sx,sy);
		edgePoints.push(pair);
	}
}

function Hexagonal(i,j,numWall){
	Cell.call(this,i,j,numWall);
	this.angle = TWO_PI/numWall;
	//radius of hexagon
	this.radius = Maze.w/2;	

	//Width of the hexagon cell
	this.hexWidth = 2*cos(0)*(this.radius);
	//Height of the hexagon cell
	this.hexHeight = abs(2*(floor(sin(4*this.angle)*this.radius)));

	//Initilize edgePoints
	if(!isInitialized){
		isInitialized = true;
		getEdgePts(this.angle,this.radius,this.numWall);
	}
	
}


Hexagonal.prototype = Object.create(Cell.prototype);

//Draw a hexagon
Hexagonal.prototype.hexagon = function(x,y,radius,numWall){
	var pairs = edgePoints;
	beginShape();
	for (var i = 0; i < pairs.length; i++) {
		vertex(x+pairs[i][0],y + pairs[i][1]);
	}
	endShape(CLOSE);
}

//Display hexagonal cell
Hexagonal.prototype.show = function() {
	var x = this.hexWidth;
	var y = this.hexHeight;
	var spacingX = this.j * x;
	var spacingY = this.i * y;
	// this.hexagon(this.i * x,this.j * y,this.radius,this.numWall);
	stroke(255);
	// stroke(51);



	// //Draw a line if the cell's  wall is open
	for (var i = 0; i < edgePoints.length-1; i++) {
		if(this.walls[i]){
			var sx = spacingX + edgePoints[i][0];
			var sy = spacingY + edgePoints[i][1];
			var sx2 = spacingX + edgePoints[i+1][0];
			var sy2 = spacingY + edgePoints[i+1][1];
			if(i != edgePoints.length-1){
				line(sx,sy,sx2,sy2);
			}else{
				 var edgeZeo = edgePoints[0];
				 line(sx,sy,(this.i+1) * edgeZeo[0],(this.j + 1) * edgeZeo[1]);
			}
		}
	}

	if(this.visited){
		noStroke();
		fill(255,0,255,100);
		hexagon(spacingX,spacingY,this.radius,this.numWall);
	}

	if(this.isPath){
		noStroke();
		fill(0,0,255,100);
		hexagon(spacingX,spacingY,this.radiu,this.numWall);
	}



};
