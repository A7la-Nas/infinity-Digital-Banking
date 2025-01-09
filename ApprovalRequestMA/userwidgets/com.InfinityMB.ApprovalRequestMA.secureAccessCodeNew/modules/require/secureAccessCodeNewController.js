define(function() {

	return {
      
       preshow: function() {
           this.view.btnProceed.setEnabled(false);
           this.view.flxWarning.setVisibility(false);
           this.view.btnProceed.opacity = 0.5;
      	   this.view.tbxEnterCVVCode.onKeyUp = this.enableNextButton;
           this.view.forceLayout();          
    	},
      
      	enableNextButton: function (eventobject) {
            var secureCode = eventobject.text;
            if(secureCode.length == 6) {
                this.view.btnProceed.setEnabled(true);
                this.view.btnProceed.opacity = 1;
            }
          	else {
                this.view.btnProceed.setEnabled(false);
                this.view.btnProceed.opacity = 0.5;
            }
            this.view.forceLayout();
        }
      
	};
});