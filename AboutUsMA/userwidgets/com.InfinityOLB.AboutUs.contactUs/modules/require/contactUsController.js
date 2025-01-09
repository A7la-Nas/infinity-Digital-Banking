define(function() {

	return {
		renderBody:function() {
		var height=this.view.flxDetailsAndImage.frame.height+1+this.view.flxContactCustomerService.frame.height+30;
		if (height<378) {
			this.view.flxScrollDetails.height="378px";
			kony.print("case 1 height :"+height);
		} else if(height<634) {
			this.view.flxScrollDetails.height=height+"px";
			kony.print("case 2 height :"+height);
		} else{
			this.view.flxScrollDetails.height="634px";
			kony.print("case 3 height :"+height);
		}
	}
	};
});