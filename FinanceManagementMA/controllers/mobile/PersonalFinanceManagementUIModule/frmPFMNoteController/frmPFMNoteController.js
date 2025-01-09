define({
    preshow: function () {
      try {
        if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
          this.view.flxHeader.isVisible = false;
        } else {
          this.view.flxHeader.isVisible = true;
        }
        var navManager = applicationManager.getNavigationManager();
        var currentTransactionRecord = navManager.getCustomInfo("frmPFMEditNote");
        this.view.txtNote.text = currentTransactionRecord.transactionNotes;
        this.setFlowActions();
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    /**
     * Description
     * @method updateNote
     * @return
     */
    updateNote: function() {
        try {
            applicationManager.getPresentationUtility().showLoadingScreen();
          	var pfmMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PersonalFinanceManagementUIModule");
            var navManager = applicationManager.getNavigationManager();
            var currentTransactionRecord = navManager.getCustomInfo("frmPFMEditNote");
            var transactionRecord = {
                "transactionId": currentTransactionRecord.transactionId,
                "transactionNotes": this.view.txtNote.text,
            };
            pfmMod.presentationController.updatePFMTransaction(transactionRecord, this.updateNoteSuccess.bind(this), this.updateNoteFailure.bind(this));
        }
        catch(err) {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.ServiceCallFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },
      /**
     * Description
     * @method updateNoteSuccess
     * @param {} response
     * @return
     */
    updateNoteSuccess: function(response) {
    try {
    var self = this;
	var navManager = applicationManager.getNavigationManager();
	var currentTransactionRecord = navManager.getCustomInfo("frmPFMEditNote");
	var currentTransaction = navManager.getCustomInfo("frmPFMTransactionDetails");
	//currentTransaction.categoryId = currentTransactionRecord.transactionId;
	currentTransaction.isNoteUpdated='true'
	currentTransaction.transactionNotes = this.view.txtNote.text;
	navManager.setCustomInfo("frmPFMTransactionDetails", currentTransaction);
	var pfmMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PersonalFinanceManagementUIModule");
	pfmMod.presentationController.commonFunctionForNavigation("frmPFMTransactionDetails");
	}
        catch(err) {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.ServiceCallFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method updateNoteFailure
     * @param {} response
     * @return
     */
    updateNoteFailure: function(response) {
        try {
          	applicationManager.getPresentationUtility().dismissLoadingScreen();
             if (response["isServerUnreachable"]) applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", response);
        }
        catch(err) {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.ServiceCallFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },
    setFlowActions: function () {
      try {
        var scopeObj = this;
        this.view.btnSave.isVisible = true;
        this.view.btnSave.onClick =  scopeObj.updateNote;
        this.view.customHeader.flxBack.onClick = function () {
          var pfmMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PersonalFinanceManagementUIModule");
          pfmMod.presentationController.commonFunctionForNavigation("frmPFMTransactionDetails");
        };
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    }
});