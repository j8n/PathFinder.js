function Map(width, height){
	this.elem;
	this.boxes = [];
	this.width = width;
	this.height = height;


	this.createMap = function(){
		this.elem = document.createElement("div");
		this.elem.style.position = "relative";
		this.elem.style.boxSizing = "border-box";
		this.elem.style.width = (this.width*_BoxSide)+"px";
		this.elem.style.height = (this.height*_BoxSide)+"px";
		this.elem.style.margin = "0 auto";

		document.body.style.width = "auto"; //width*_BoxSide+"px";
		document.body.appendChild(this.elem);
	}

	this.createBoxes = function(){
		for(var i=0;i<height;i++){
			for(var ii=0;ii<width;ii++){
				var b = new Box(ii,i,this.elem);
				this.boxes.push(b);
			}
		}
	}

	this.getBoxAt = function(Node_){
		for(var i=0;i<this.boxes.length;i++){
			if(this.boxes[i].x == Node_.x && this.boxes[i].y == Node_.y){
				return this.boxes[i];
			}
		}
		return null;
	}

	this.resetAll = function(){
		for(var i=0; i<this.boxes.length; i++){
			var b = this.boxes[i];
			b.setColors();
		}
	}




	this.createMap();
	this.createBoxes();
};
