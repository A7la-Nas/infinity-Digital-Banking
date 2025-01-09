define({
  init : function(){
    try {
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.LOG, arguments.callee.name);
      }
    },
    /**
     * Description
     * @method pfmSelectTimePreshow
     * @return
     */
    pfmSelectTimePreshow: function() {
      try {
		if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
            this.view.flxHeader.isVisible = false;
        } else {
            this.view.flxHeader.isVisible = true;
        }
        this.setActions();
        // based on the selectedData, change the value in the segment
      	var navManager = applicationManager.getNavigationManager();
   		var currentForm=navManager.getCurrentForm();
   		applicationManager.getPresentationFormUtility().logFormName(currentForm);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
      catch(err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.LOG, arguments.callee.name);
      }
    },
    /**
     * Description
     * @method pfmSelectTimePostShow
     * @return
     */
    pfmSelectTimePostShow: function() {
        //  Post show
        try {
            var navManager = applicationManager.getNavigationManager();
            var selectedData = navManager.getCustomInfo("frmPFMSelectTimePeriod");
            if (selectedData.currentSelected === "month") {
                this.view.segCategories.selectedRowIndex = [0, 0];
            } else if (selectedData.currentSelected === "year") {
                this.view.segCategories.selectedRowIndex = [0, 1];
            }
          	this.view.customHeader.flxBack.onClick = this.navigateBackToPFMHome.bind(this);
            applicationManager.getPresentationUtility().dismissLoadingScreen();
        }
        catch(err) {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.LOG, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method setActions
     * @return
     */
    setActions: function() {
        try {
            this.view.btnViewChart.onClick = this.onViewChartClick.bind(this);
        }
        catch(err) {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.LOG, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method onViewChartClick
     * @return
     */
    onViewChartClick: function() {
        try {
            //get selected value
            var selectedRowData = this.view.segCategories.selectedRowItems[0];
            var selectedValue = "day";
            if (selectedRowData.lblName === "Monthly") {
                selectedValue = "month";
            } else if (selectedRowData.lblName === "Yearly") {
                selectedValue = "year";
            }
            var navManager = applicationManager.getNavigationManager();
            var selectedData = navManager.getCustomInfo("frmPFMSelectTimePeriod");
            selectedData.currentSelected = selectedValue;
            navManager.setCustomInfo("frmPFMSelectTimePeriod", selectedData);
            var accountModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
            accountModule.presentationController.commonFunctionForNavigation("frmPFMMyMoney");
        }
        catch(err) {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.LOG, arguments.callee.name);
        }
    },
  	navigateBackToPFMHome : function(){
      var navManager = applicationManager.getNavigationManager();
      navManager.goBack();
    }
});