function Rectangular(i,j,numWall){
	Cell.call(this,i,j,numWall);

}


Rectangular.prototype = Object.create(Cell.prototype);


//Display Rectangular cell
Rectangular.prototype.show = function(){

	var x = this.j * Maze.w;
	var y = this.i * Maze.w;
	stroke(51);

	//Draw a line if the cell's wall is open
	if(this.walls[0]){
		line(x,y,x+Maze.w,y);
	}
	
	if(this.walls[1]){
		line(x,y,x,y+Maze.w);
	}

	if(this.walls[2]){
		line(x,y+Maze.w,x+Maze.w,y+Maze.w);
	}
	
	if(this.walls[3]){
		line(x+Maze.w,y,x+Maze.w,y+Maze.w);
	}
	

	if(this.visited){
		noStroke();
		fill(255,0,255,100);
		rect(x,y,Maze.w,Maze.w);
	}

	if(this.isPath){
		noStroke();
		fill(0,0,255,100);
		rect(x,y,Maze.w,Maze.w);
	}
};

//Highlight the rect cell(i,j)
Rectangular.prototype.highlight = function(color) {
	var x = this.j * Maze.w;
	var y = this.i * Maze.w;
	noStroke();
	fill(color);
	rect(x,y,Maze.w,Maze.w);
};

//Return a list of current's adjacent cells
Rectangular.prototype.adjacentCells = function(){
	var adj1 = index(this.i-1,this.j);//top
	var adj2 = index(this.i,this.j+1);//right
	var adj3 = index(this.i,this.j-1);//left
	var adj4 = index(this.i+1,this.j);//bottom

	return [adj1,adj2,adj3,adj4];
};


//Versions of removeWalls
//1.Rectangular
Rectangular.prototype.removeWalls = function(next){
	var diffX = this.j - next.j;
	if(diffX > 0 ){
		this.walls[1] = false;
		next.walls[3] = false;
	}else if(diffX < 0){
		this.walls[3] = false;
		next.walls[1] = false;
	}else{
		var diffY = this.i - next.i;
		if(diffY > 0 ){
			this.walls[0] = false;
			next.walls[2] = false;
		}else{
			this.walls[2] = false;
			next.walls[0] = false;
		}
	}
};
