//Abstract data - Binary Heap Priority Queue
function Node(prioity,item){
	this.prioity = prioity;
	this.item = item;

	this.swap = function(other){
		var temp = new Node(this.prioity,this.item);
		this.prioity = other.prioity;
		this.item = other.item;
		other.item = temp.item;
		other.prioity = temp.prioity;
	}

}


function MinHeap(){
	this.pQueue =[];
	this.getParent = function(i){
		return Math.floor((i-1)/2);
	}

	this.getLeft = function(i){
		return 2*i + 1;
	}

	this.getRight = function(i){
		return 2*i + 2;
	}
	
	//insert operation: insert a new node with given priority and given item 
	//into the heap
	this.insert = function(prioity,item){
		var i = this.pQueue.length;
		this.pQueue[i] = new Node(prioity, item);
	

		while(i !=0  && 
			this.pQueue[i].prioity < this.pQueue[this.getParent(i)].prioity){
			this.pQueue[i].swap(this.pQueue[this.getParent(i)]);
			i = this.getParent(i);
		}

	}

	//extract the root from the heap
	this.extract = function(){
		if(this.pQueue.length == 0){
			return undefined;
		}
		var current = this.pQueue[0];

		//swap the root of heap with last node
		this.pQueue[0].swap(this.pQueue[this.pQueue.length-1]);
		var removed = this.pQueue.pop();

		//bubble down
		var i = 0;

		do{
			var smallVal;
			var left = this.pQueue[this.getLeft(i)];
			var right = this.pQueue[this.getRight(i)];

			if(left == null && right == null){
				return removed;
			}else if(left == null){
				smallVal = right;
			}else if (right == null){
				smallVal = left;
			}else{
				if(left.prioity < right.prioity){
					smallVal = left;
					i = this.getLeft(i);
				}else{
					smallVal = right;
					i = this.getRight(i);
				}
			}
			
			if(current.prioity > smallVal.prioity){
				current.swap(smallVal);
			}else{
				break;
			}
			
		}while(1)

		return removed;

	}

	this.search = function(target){
		for(var i = 0;i < this.pQueue.length;i++){
			if(this.pQueue[i] === target){
				return true;
			}
		}
		return false;
	}

	this.getMin = function(){
		return this.pQueue[0];
	}




}