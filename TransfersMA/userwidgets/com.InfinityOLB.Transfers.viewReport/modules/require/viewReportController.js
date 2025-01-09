define(function() {

	return {
      
       closeViewReport: function() {
        var currForm=kony.application.getCurrentForm();
        currForm.flxTransferViewReport.setVisibility(false);
        currForm.forceLayout();
    }

	};
});