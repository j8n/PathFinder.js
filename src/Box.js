function Box(x,y,parent){
	var self = this;
	this.x = x;
	this.y = y;
	this.left = this.x * _BoxSide;
	this.top = this.y * _BoxSide;
	this.node;
	this.isWalkable = true;
	this.defaultColor = "#ffffff";
	this.hoverColor = "#a0c0e0";
	this.notWalkableColor = "#303030";
	
	this.elem = document.createElement("div");
	this.elem.style.position = "absolute";
	this.elem.style.boxSizing = "border-box";
	this.elem.style.border = "0.5px solid #808080";
	this.elem.style.width = _BoxSide+"px";
	this.elem.style.height = _BoxSide+"px";
	this.elem.style.boxSizing = "border-box";
	this.elem.style.left = (this.left) +"px";
	this.elem.style.top = (this.top)+"px";
	this.elem.setAttribute("x",this.x);
	this.elem.setAttribute("y", this.y);
	parent.appendChild(this.elem);
	
	this.elem.onmouseover = function(){
		this.style.border = "2px solid #606060";
		printInfoBox(self.x, self.y, self.node.isWalkable);

		if(RightIsDown){
			self.setWalkable();
			self.setColors();
		}
	}
	
	this.elem.onmouseout = function(){
		this.style.border = "0.5px solid #808080";
	}

	this.setSEBoxes = function(){
		if(!this.node.isWalkable){
			return;
		}
		if(startBox !== null && endBox !== null){
			startBox = null;
			endBox = null;
		}
		if(startBox === null){
			startBox = this.node;
		}else{
			endBox = this.node;
		}
		//console.log("boxes set");	
	}

	this.setWalkable = function(){
		this.isWalkable = (this.isWalkable) ? false : true;
		this.node.isWalkable = this.isWalkable;
		//console.log("walkable set");
	}
	
	this.setColors = function(){
		this.defaultColor = "#ffffff";

		if(!this.node.isWalkable){
			this.defaultColor = "#606060";
		}

		if(this.node === startBox){
			this.defaultColor = "#f00050";
		}
		
		if(this.node === endBox){
			this.defaultColor = "#00f050";
		}

		this.elem.style.backgroundColor = this.defaultColor;
		//console.log("colors set");
	}
	
	this.elem.onmousedown = function(e){
		// left button
		if(e.button === 0){
			self.setSEBoxes();
		}
		// right button
		else if(e.button === 2){
			self.setWalkable();
		}

		self.setColors();
		theMap.resetAll();
		printInfoBox(self.x, self.y, self.node.isWalkable);
	}
};
