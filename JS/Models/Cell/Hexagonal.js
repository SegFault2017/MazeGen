//Contains the edge points of the hexagon cell
var edgePoints =[];
var isInitialized = false;

//Return a list of edge points of hexagon cell(0,0)
function getEdgePts(angle,radius,numWall){
	//Initializes edgePoints
	for (var i = 0; i < TWO_PI ; i+=angle) {
		var pair = [];
		var sx = cos(i) * radius;
		var sy = sin(i) * radius ;
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

//Apply transformation to shape
Hexagonal.prototype.applyTrans = function() {
	translate(this.hexHeight ,this.hexWidth/2);
	scale(-1,1);
	rotate(PI/2);
};

//Draw after applied trans on a shape with 
//no relevent to other shapes(i.e push and pop)
Hexagonal.prototype.afterTransOnHex = function(x,y1,y2) {
	push();
	this.applyTrans();
	if(this.j %2 == 0){
		this.hexagon(x,y1,this.radius,this.numWall);
	}else{
		this.hexagon(x,y2,this.radius,this.numWall);
	}
	pop();
};

//Display hexagonal cell
Hexagonal.prototype.show = function() {
	var x = this.hexWidth;
	var y = this.hexHeight;
	var spacingX = this.j * (3*x/4);
	var spacingY = this.i * y;
	stroke(51);

	//Draw a line if the cell's  wall is open
	//**********************Wall number DEPENDS on edgePoints*******************
	for (var i = 0; i < edgePoints.length-1; i++) {
		if(this.walls[i]){
			var sx,sx2,sy,sy2;
			sx = spacingX + edgePoints[i][0];
			sx2 = spacingX + edgePoints[i+1][0];
			if(this.j % 2 == 0){
				sy = spacingY + edgePoints[i][1];
				sy2 = spacingY + edgePoints[i+1][1];
			}else{
				sy = spacingY - y/2 + edgePoints[i][1];
				sy2 = spacingY  - y/2 + edgePoints[i+1][1];
			}

			push();
			this.applyTrans();

			if(i != edgePoints.length-1){
				line(sx,sy,sx2,sy2);
			}else{
				 var edgeZeo = edgePoints[0];
				 line(sx,sy,this.i * edgeZeo[0],this.j * edgeZeo[1]);
			}
			pop();
		}
	}

	if(this.visited){
		noStroke();
		fill(255,0,255,100);
		this.afterTransOnHex(spacingX,spacingY,spacingY - y/2);
	}

	if(this.isPath){
		noStroke();
		fill(0,0,255,100);
		this.afterTransOnHex(spacingX,spacingY,spacingY - y/2);
	}

};

//Highlight the hex cell(i,j)
Hexagonal.prototype.highlight = function(color){
	noStroke();
	fill(color);
	var x = this.hexWidth;
	var y = this.hexHeight;
	var spacingX = this.j * (3*x/4);
	var spacingY = this.i * y;
	this.afterTransOnHex(spacingX,spacingY,spacingY - y/2);
};


//Return a list of current's adjacent cells
Hexagonal.prototype.adjacentCells = function() {
	var adj1 = index(this.i-1,this.j);
	var adj2 = index(this.i,this.j+1);
	var adj3;//*
	var adj4 = index(this.i+1,this.j);
	var adj5;//*
	var adj6 = index(this.i,this.j-1);

	if(this.j % 2 == 0){
		adj3 = index(this.i+1,this.j+1);
		adj5 = index(this.i+1,this.j-1);
	}else{
		adj3 = index(this.i-1,this.j+1);
		adj5 = index(this.i-1,this.j-1);
	}



	return [adj1,adj2,adj3,adj4,adj5,adj6];
};



//Version of removeWall
//2.Hexagonal
Hexagonal.prototype.removeWalls = function(next) {
	var diffY = this.i - next.i;
	var diffX = next.j - this.j;
	if(diffY < 0){//current is on top of next
		if(diffX > 0){
			this.walls[0] = false;
			next.walls[3] = false;
		}else if(diffX < 0){
			this.walls[2] = false;
			next.walls[5] = false;
		}else{
			this.walls[1] = false;
			next.walls[4] = false;
		}
		
	}else if(diffY > 0){//current is below next
		if(diffX > 0){
			this.walls[5] = false;
			next.walls[2] = false;
		}else if(diffX < 0){
			this.walls[3] = false;
			next.walls[0] = false;
		}else{
			this.walls[4] = false;
			next.walls[1] = false;
		}
	}else{//current and next are both at the same level
		if(this.j % 2 == 0){//if current is shifted down 
			if(diffX > 0){
				this.walls[5] = false;
				next.walls[2]  =false;
			}else{
				this.walls[3] = false;
				next.walls[0] = false;
			}
		}else{
			if(diffX > 0){
				this.walls[0] = false;
				next.walls[3] = false;
			}else{
				this.walls[2] = false;
				next.walls[5] = false;
			}
		}
	}
};
