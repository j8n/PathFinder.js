function PathModeller(pathFinder){
	this.pathFinder = pathFinder;
	this.mapBoxes = this.pathFinder.mapBoxes;

	this.showNodeOnMap = function(node, color){
		var x = node.x;
		var y = node.y;
		var testingBox;
		for(var i=0;i<this.mapBoxes.length;i++){
			testingBox = this.mapBoxes[i];
			if(testingBox.node.x == x && testingBox.node.y == y ){
				testingBox.defaultColor = color;
				testingBox.elem.style.backgroundColor = testingBox.defaultColor;
			}
		}
		return false;
	}

	this.showPathOnMap = function(path){
		//console.log("show path on map")
		for(var i=1;i<path.length-1;i++){
			var pathNode = path[i];
			var node = this.pathFinder.getNode(pathNode[0], pathNode[1]);
			this.showNodeOnMap(node, "#a0c0e0");
		}
	}
}
