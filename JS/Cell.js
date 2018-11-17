//conver 2d index to 1d index
function index(i,j){
	if(i < 0 || j < 0 || i > rows -1 || j > cols -1){
		return undefined;
	}
	return i*cols + j;
}

//add unvisited neighbours
function pushNeighbors(cell,neighbors){
	if(cell && !cell.visited){
		neighbors.push(cell);
	}
}



//cell classs

function Cell(i,j){
	//i represents the ith row na dj represents the jth column	
	this.i = i;
	this.j = j;
	var x = this.j * w;
	var y = this.i * w;
	this.visited = false; 

	this.walls = [true,true,true,true]; //An array to store the existence of the wall correspnd to the cel
	//in this orider [top,left,bottom,right]

	this.show = function(){
		var strokeness = 255;
		stroke(strokeness);

		if(this.walls[0]){
			line(x,y,x+w,y);
		}
		
		if(this.walls[1]){
			line(x,y,x,y+w);
		}

		if(this.walls[2]){
			line(x,y+w,x+w,y+w);
		}
		
		if(this.walls[3]){
			line(x+w,y,x+w,y+w);
		}

		if(this.visited){
			noStroke();
			fill(255,0,255,100);
			rect(x,y,w,w);
		}
	}


	//check if this.Neighbous have benn visited or not
	this.checkNeighbors = function() {
		var neighbors = [];//an array contains unvisited neighbors
		var top = grid[index(i-1,j)];
		var right = grid[index(i,j+1)];
		var left = grid[index(i,j-1)];
		var bottom = grid[index(i+1,j)];

		pushNeighbors(top,neighbors);
		pushNeighbors(right,neighbors);
		pushNeighbors(left,neighbors);
		pushNeighbors(bottom,neighbors);

		//if there exist a neighbor that has not yet been visited,
		//randomly pick an neighour to be the wall

		if(neighbors.length > 0 ){
			var chosen  = floor(random(0,neighbors.length));
			return neighbors[chosen];
		}else{
			return undefined;
		}
	}

	//highlight current cell
	this.highlight = function(){
		noStroke();
		fill(0,0,255,100);
		rect(x,y,w,w);
	}
}

