function Constructor(start,end){
	this.start = start;
	this.end = end;

}

Constructor.prototype.constructMaze = function(){
	
}

Constructor.prototype.removeWalls = function(current,next){
	var diffX = current.j - next.j;
	if(diffX > 0 ){
		current.walls[Dir.left] = false;
		next.walls[Dir.right] = false;
	}else if(diffX < 0){
		current.walls[Dir.right] = false;
		next.walls[Dir.left] = false;
	}else{
		var diffY = current.i - next.i;
		if(diffY > 0 ){
			current.walls[Dir.top] = false;
			next.walls[Dir.bottom] = false;
		}else{
			current.walls[Dir.bottom] = false;
			next.walls[Dir.top] = false;
		}
	}
}



