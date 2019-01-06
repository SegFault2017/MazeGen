function Hexagonal(i,j,numWall){
	Cell.call(i,j,numWall);

}

Hexagonal.prototype = Object.create(Cell.prototype);
