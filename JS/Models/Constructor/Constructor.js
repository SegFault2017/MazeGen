function Constructor(start,end){
	this.start = start;
	this.end = end;

}

Constructor.prototype.constructMaze = function(){
	
}

Constructor.prototype.constructMazeWithSteps= function(){

}


//Create a passage between current and next
Constructor.prototype.removeWalls = function(current,next){
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



