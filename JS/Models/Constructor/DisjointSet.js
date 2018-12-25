function DisJointSet(n){
	var rank = [];
	var id = [];

	for (var i = 0; i < n; i++) {
		rank[i] = 0;
		parent[i] = i;
	}


	this.findRoot = function(index){
		if(index != this.parent[index]){
			this.parent[index] = this.findRoot(parent[index]);
		}
			return this.parent[index];
	}

	this.union = function(a,b){
		var rootA = this.findRoot(a);
		var rootB = this.findRoot(b);

		if(this.rank[rootA] > this.rank[rootB]){
			this.parent[rootB] = rootA;
		}else if(this.rank[rootB] > this.rank[rootA]){
			this.parent[rootA] = rootB;
		}else{
			this.parent[rootA] = rootB;
			this.rank[rootB] += 1;
		}
	}

}