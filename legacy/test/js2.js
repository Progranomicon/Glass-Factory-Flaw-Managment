function myClass(){
	var w=10;
	this.w=20;
	this.getW = function(){
		return this.w;
	}
	this.setW = function(x){
		this.w = x;
	}
}