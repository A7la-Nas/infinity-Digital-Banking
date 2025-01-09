define(['CommonUtilities'],function(CommonUtilities) {
	return {
		checkboxActionDomestic:function(){
          CommonUtilities.toggleFontCheckbox(this.view.lblchecked);
        },
      	checkboxActionInternational:function(){
          CommonUtilities.toggleFontCheckbox(this.view.lblcheckboxchecked);
        },
	};
});