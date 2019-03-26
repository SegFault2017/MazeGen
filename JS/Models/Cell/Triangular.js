//Equalaterial triangle
var upTri =[];
var downTri = [];

//c = (a^2 - b^2)^0.5
function pythagorean(a,b){
	return Math.sqrt(a*a - b*b);
}

//Draw Triangle
function drawTri(tri){
	triangle(tri[0].x,tri[0].y,
		tri[1].x,tri[1].y,
		tri[2].x,tri[2].y);
}


//Determines whether cell(i,j) is pointing upward or downward
function isPointingUp(i,j){
	if(i %2 == 0 ){//even index rows
		if(j %2 == 0){//cells in even index cols are pointing upward
			return true;
		}else{//cells in odd index cols are pointing downward
			return false;
		}
	}else{//odd index rows
		if(j %2 ==0){//cells in even index cols are pointing downward
			return false;
		}else{//cells in odd index cols are pointing upward
			return true;
		}

	}
}

function Triangular(i,j,numWall){
	Cell.call(this,i,j,numWall);
	this.baseLen = Maze.w;
	this.height = pythagorean(this.baseLen,this.baseLen/2);
	this.isUpward = isPointingUp(this.i,this.j);//indcates whether this cell is pointing upward or downward

	if(this.i == 0 && this.j == 0){
		//Initilizes upward triangle
		var p1,p2,p3;
		p1 = new Point(this.baseLen/2,0);
		p2 = new Point(0,this.height);
		p3 = new Point(this.baseLen,this.height);
		upTri.push(p1,p2,p3);

		//Initializes downward triangle
		p1 = new Point(0,0);
		p2 = new Point(this.baseLen/2,this.height);
		p3 = new Point(this.baseLen,0);
		
		downTri.push(p1,p2,p3);
	}

}

Triangular.prototype = Object.create(Cell.prototype);

//Draw trianglar cells in a pattern:
//alternatives in both columns and rows
Triangular.prototype.drawTri = function(isUpward){
	if(isUpward){
		drawTri(upTri);
	}else{
		drawTri(downTri);
	}
};

//Draw lines for triangular cell's wall
function drawLine(tri,walls) {
	for (var i = 0; i < tri.length; i++) {
		if(walls[i]){
			if(i == tri.length-1){
				line(tri[i].x,tri[i].y,tri[0].x,tri[0].y);
			}else{
				line(tri[i].x,tri[i].y,tri[i+1].x,tri[i+1].y);
			}
		}
	}
}

//Draw trianglar cell with lines
function drawTriWithLine(isUpward,walls) {
	if(isUpward){
		drawLine(upTri,walls);
	}else{
		drawLine(downTri,walls);
	}
}

//Apply transformation to cell and display it
Triangular.prototype.applyTrans = function(fun1) {
	push();
	translate(this.j * this.baseLen/2,this.i * this.height);
	fun1(this.isUpward,this.walls);
	pop();
};

//Dispay aπ trianglar cell
Triangular.prototype.show = function() {
	stroke(51);
	fill(51);
	this.applyTrans(drawTriWithLine);//Apply transformation to cell and draw it

 	if(this.visited){
		noStroke();
		fill(255,0,255,100);
		this.applyTrans(this.drawTri);
	}

	if(this.isPath){
		noStroke();
		fill(0,0,255,100);
		this.applyTrans(this.drawTri);
	}

};


//Highlights a trianglar cell(i,j)
Triangular.prototype.highlight = function(color) {
	stroke(51);
	fill(color);
	this.applyTrans(this.drawTri);
};


//Create a passage between current cell and next cell
Triangular.prototype.removeWalls = function(next) {	
	var diffY = next.i - this.i;
	var diffX = next.j - this.j;

	if(this.isUpward){
		if(diffY != 0){
			this.walls[1] = false;
			next.walls[2] = false;
		}else{
			if(diffX > 0){
				this.walls[2] = false;
				next.walls[0] = false;
			}else{
				this.walls[0] = false;
				next.walls[1] = false;
			}
		}
	}else{
		if(diffY != 0){
			this.walls[2] = false;
			next.walls[1] = false;
		}else{
			if(diffX > 0){
				this.walls[1] = false;
				next.walls[0] = false;
			}else{
				this.walls[0] = false;
				next.walls[2] = false;
			}
		}
	}



};

//Returns a list of adjacent cells 
Triangular.prototype.adjacentCells = function() {
	var adj1,adj2,adj3;
	adj1 = index(this.i,this.j-1);
	adj2 = index(this.i,this.j+1);
	

	if(!this.isUpward){
		adj3 = index(this.i-1,this.j);
	}else{
		adj3 = index(this.i+1,this.j);
	}

	return [adj1,adj2,adj3];

};

