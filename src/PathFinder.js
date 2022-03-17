(function(){
    function getChebyshevDistance(pointOne, pointTwo){
		var dx = Math.abs(pointTwo.x - pointOne.x);
		var dy = Math.abs(pointTwo.y - pointOne.y);
		return Math.max(dx, dy);
	}

	function getEuclideanDistance(pointOne, pointTwo){
		var dx = pointOne.x - pointTwo.x;
		var dy = pointOne.y - pointTwo.y;
		return Math.sqrt( dx * dx + dy * dy );
	}

	function getManhattanDistance(pointOne, pointTwo){
		var dx = pointOne.x - pointTwo.x;
		var dy = pointOne.y - pointTwo.y;
		return Math.abs(dx + dy);
	}

    function Node(x,y){
		this.x = x;
		this.y = y;
		this.isWalkable = true;
		this.closed = false;
		this.parent = null;
		this.gScore = 0; // distance from parent
		this.hScore; // distance from goal , (default = manhattan Heuristic);
		this.fScore; // g+h
		this.weight = 1;
                
		this.isIn = function(array){
			for(var i=0;i<array.length;i++){
				if(this.x == array[i].x && this.y == array[i].y){
					return true;
				}
			}
			return false;
		}
	}

	function PathFinder(mapBoxesArray){
		var self = this;
		this.mapBoxes = mapBoxesArray;
		this.Nodes = [];

		this.createNodes = function(){
			this.Nodes = [];
			for(var i=0;i<this.mapBoxes.length;i++){
				var mBox = this.mapBoxes[i];
				var n = new Node(mBox.x, mBox.y);
				n.isWalkable = mBox.isWalkable;
				this.mapBoxes[i].node = n;
				this.Nodes.push(n);
			}
		}

		this.getNode = function(x,y){
			for(var i=0; i<this.Nodes.length;i++){
				if(this.Nodes[i].x == x && this.Nodes[i].y == y){
					return this.Nodes[i];
				}
			}
			return null;
		}
                
		this.getNeighbors = function(parent){
			var top = this.getNode(parent.x, parent.y-1);
			var topRight = this.getNode(parent.x+1, parent.y-1);
			var right = this.getNode(parent.x+1, parent.y);
			var rightBottom = this.getNode(parent.x+1, parent.y+1);
			var bottom = this.getNode(parent.x, parent.y+1);
			var bottomLeft = this.getNode(parent.x-1, parent.y+1);
			var left = this.getNode(parent.x-1, parent.y);
			var leftTop = this.getNode(parent.x-1, parent.y-1);
			return [top, topRight, right, rightBottom, bottom, bottomLeft, left, leftTop];
		}

		this.changeToNodesPath = function(path){
			var nodePath = [];
			for(var i=0;i<path.length;i++){
				var pathNode = path[i];
				var node = this.getNode[pathNode[0], pathNode[1]];
				nodePath.push(node);
			}
			return nodePath;
		}

		this.reversePath = function(path){
			var pathReversed = [];
			for(var i=path.length-1;i>=0; i--){
				pathReversed.push(path[i]);
			}
			return pathReversed;
		}

		this.buildPath = function(endnode){
			var node;
			var path = [];
			path.push([endnode.x, endnode.y]);

			node = endnode;
			while(node.parent){
				node = node.parent;
				path.push([node.x, node.y]);

			}
			path = this.reversePath(path);
			//console.group("path");
			//console.log(path);
			//console.groupEnd();
			return path;
		}

		this.DijkstraFind = function(start,goal){
			var startingNode = this.getNode(start[0], start[1]);
			var goalNode = this.getNode(goal[0], goal[1]);
			var OpenList = [];
			var ClosedList = [];

			OpenList.push(startingNode);
			startingNode.closed = true;
			startingNode.gScore = 0;
			startingNode.fScore = 0;
			//startingNode.distanceFromGoal = getChebyshevDistance(startingNode, goalNode);

			//this.showNodeOnMap(startingNode,"#40f080");
			//this.showNodeOnMap(goalNode,"#ff00c0");
			//console.log(this.Nodes);
			var inc = 0;

			while(OpenList.length != 0){

				inc++;
				OpenList.sort(function(a,b){
					return a.gScore - b.gScore;
				});
				currentNode = OpenList.shift();
				//this.map.getBoxAt(currentNode).elem.innerHTML = currentNode.gScore;

				if(!currentNode.isWalkable){
					continue;
				}
				if(currentNode === goalNode){
					var path = this.buildPath(goalNode);
					return path;
				}
				currentNode.closed = true;
				var currentNeighbors = this.getNeighbors(currentNode);

				for(var i=0;i<currentNeighbors.length;i++){
					var neighbor = currentNeighbors[i];
					if(neighbor != null){
						if(neighbor.isWalkable){
							if(neighbor.closed){
								continue;
							}
							

							// manhattan
							// + ( (neighbor.x - currentNode.x === 0 || neighbor.y - currentNode.y === 0) ? 10 : 14 )
							// just checking if diagonal
							// if diagonal set bigger score
							
							var ng;
							if(currentNode.x == neighbor.x || currentNode.y == neighbor.y){
								ng = currentNode.gScore + 10;
							}else{
								ng = currentNode.gScore + 15;
							}


							if(!neighbor.closed || ng < neighbor.gScore){

								ClosedList.push(currentNode);
								neighbor.gScore = ng;
								neighbor.hScore = 10 * (getChebyshevDistance(neighbor, goalNode));

								neighbor.fScore = neighbor.gScore + neighbor.hScore;

								neighbor.parent = currentNode;

								OpenList.push(neighbor);
								neighbor.closed = true;
								//this.showNodeOnMap(neighbor,"#00f070");
								//console.log(inc);
							}
						}else{
							continue;
						}
					}
				}
			}
			
			return [];
			
			//console.log(this.Nodes);

		}

		this.FindPath = function(start, goal){
			this.createNodes();
			var path = this.DijkstraFind(start, goal);
			//console.log(path);
			return path;
		}

		// setup
		this.createNodes();

	}// end pathfinder

	window.PathFinder = PathFinder;
	
})();
