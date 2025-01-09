define(function() {

	return {
		renderBody:function() {
		var height=this.view.rtxBody.frame.height+30;
		if (height<378) {
			this.view.flxScrollDetails.height="378px";
		} else if(height<634) {
			this.view.flxScrollDetails.height=height+"px";
		} else{
			this.view.flxScrollDetails.height="634px";
		}
	}
	};
});