define({
    init : function(){
      try {
        var navManager = applicationManager.getNavigationManager();
        var currentForm=navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    /**
     * Description
     * @method preshow
     * @return
     */
      preshow: function() {
        try {
          if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
              this.view.flxHeader.isVisible = false;
          } else {
              this.view.flxHeader.isVisible = true;
          }
          this.setFlowActions();
          var navManager = applicationManager.getNavigationManager();
          var transactionData = navManager.getCustomInfo("frmPFMTransactionDetails");
          this.setTransactionDetails(this.clone(transactionData));
          this.view.flxEdit.setVisibility(false);
          this.view.customHeader.btnRight.onClick = this.showEditOptions.bind(this);
          var currentForm=navManager.getCurrentForm();
          applicationManager.getPresentationFormUtility().logFormName(currentForm);
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          this.view.flxEdit.onClick = this.hideShadowScreen.bind(this);
          this.view.customHeader.flxBack.onClick = function() {
                applicationManager.getPresentationUtility().showLoadingScreen();
                  var navManager = applicationManager.getNavigationManager();
                  navManager.goBack();
              };
        }
        catch(err) {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
      },
    /**
     * Description
     * @method setTransactionDetails
     * @param {} transaction
     * @return
     */
    setTransactionDetails: function(transaction) {
        try {
            this.view.btnSetCategory.isVisible = true;
            if (transaction.categoryId != "9") {
                this.view.btnSetCategory.isVisible = false;
            }
            this.view.lblTransferValue.text = transaction.transactionAmount.substr(1);
            this.view.lblTransferredToValueTrans.text = transaction.toAccountName + "..." + transaction.toAccountNumber.substr(transaction.toAccountNumber.length - 4, 4);
            this.view.lblTransferredFromValueTrans.text = transaction.fromAccountName + "..." + transaction.fromAccountNumber.substr(transaction.fromAccountNumber.length - 4, 4);
            this.view.lblDescValueTrans.text = transaction.transactionDescription;
            this.view.lblTransDateValueTrans.text = transaction.transactionDate;
            this.view.lblSelectedCategoryValue.text = transaction.categoryName;
            this.view.lblNotesValueTrans.text = transaction.transactionNotes;
            applicationManager.getPresentationUtility().dismissLoadingScreen();
        }
        catch(err) {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method setFlowActions
     * @return
     */
    setFlowActions: function() {
        try {
            var scopeObj = this;
            /**
             * Description
             * @method onClick
             * @return
             */
            this.view.customHeader.flxBack.onClick = function() {
              try {
                applicationManager.getPresentationUtility().showLoadingScreen();
              	var navManager = applicationManager.getNavigationManager();
                var accountModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
      	        accountModule.presentationController.commonFunctionForNavigation("frmPFMCategorisedTransactions");
              }
              catch(err) {
                applicationManager.getPresentationUtility().dismissLoadingScreen();
                throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
              }
            };
            /**
             * Description
             * @method onClick
             * @return
             */
            this.view.btnRepeatTransactionTrans.onClick = function() {
                //navigate to repeat transaction screen
            };
            /**
             * Description
             * @method onClick
             * @return
             */
            this.view.btnDisputeTransaction.onClick = function() {
                //navigate to dispute transaction screen
            };
            /**
             * Description
             * @method onClick
             * @return
             */
            this.view.btnCancelTransaction.onClick = function() {
                //navigate to cancel transaction screen
            };
            /**
             * Description
             * @method onClick
             * @return
             */
            this.view.flxOption1.onClick = function() {
                scopeObj.onEditCategoryClick();
            };
            /**
             * Description
             * @method onClick
             * @return
             */
            this.view.flxOption2.onClick = function() {
                 scopeObj.onEditNoteClick();
            };
            /**
             * Description
             * @method onClick
             * @return
             */
            this.view.btnSetCategory.onClick = function() {
              scopeObj.onEditCategoryClick();
            };
          this.view.flxDismiss.onClick = function(){
            scopeObj.view.flxEdit.isVisible = false;
          };
        }
        catch(err) {
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.LOG, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method onEditCategoryClick
     * @return
     */
    onEditCategoryClick: function() {
        try {
            this.view.flxEdit.setVisibility(false);
            this.view.flxMainContainer.setEnabled(true);
            this.fetchAllPFMCategories();
        }
        catch(err) {
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },
      /**
     * Description
     * @method onEditNoteClick
     * @return
     */
    onEditNoteClick: function() {
        try {
            var navManager = applicationManager.getNavigationManager();
            var transactionData = navManager.getCustomInfo("frmPFMTransactionDetails");
            var category = {
                "transactionId": transactionData.transactionId,
                "transactionNotes": this.view.lblNotesValueTrans.text
            };
          navManager.setCustomInfo("frmPFMEditNote", category);
          var accountModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
          accountModule.presentationController.commonFunctionForNavigation("frmPFMNote");
        }
        catch(err) {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.ServiceCallFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method fetchAllPFMCategories
     * @return
     */
    fetchAllPFMCategories: function() {
        try {
            applicationManager.getPresentationUtility().showLoadingScreen();
			var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
          accountMod.presentationController.getPFMCategories(this.fetchAllPFMCategoriesSuccess.bind(this), this.fetchAllPFMCategoriesFailure.bind(this));
        }
        catch(err) {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.ServiceCallFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method fetchAllPFMCategoriesSuccess
     * @param {} response
     * @return
     */
    fetchAllPFMCategoriesSuccess: function(response) {
        try {
            var navManager = applicationManager.getNavigationManager();
            var transactionData = navManager.getCustomInfo("frmPFMTransactionDetails");
            var category = {
                "transactionId": transactionData.transactionId,
                "selectedCategory": transactionData.categoryId,
                "categories": response
            };
          navManager.setCustomInfo("frmPFMEditCategory", category);
          var accountModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
          accountModule.presentationController.commonFunctionForNavigation("frmPFMEditCategory");
        }
        catch(err) {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.ServiceCallFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method fetchAllPFMCategoriesFailure
     * @param {} response
     * @return
     */
    fetchAllPFMCategoriesFailure: function(response) {
        try {
             kony.print(response);
            applicationManager.getPresentationUtility().dismissLoadingScreen();
      	    if(response["isServerUnreachable"])
                  applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", response);
        }
        catch(err) {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.ServiceCallFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method clone
     * @param {} source
     * @return
     */
    clone: function(source) {
        try {
            var result = source,
                i, len;
            if (!source ||
                source instanceof Number ||
                source instanceof String ||
                source instanceof Boolean) {
                return result;
            } else if (Object.prototype.toString.call(source).slice(8, -1) === 'Array') {
                result = [];
                var resultLen = 0;
                for (i = 0, len = source.length; i < len; i++) {
                    result[resultLen++] = this.clone(source[i]);
                }
            } else if (typeof source === 'object') {
                result = {};
                for (i in source) {
                    if (source.hasOwnProperty(i)) {
                        result[i] = this.clone(source[i]);
                    }
                }
            }
            return result;
        }
        catch(err) {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.processingError", GlobalExceptionHandler.ActionConstants.LOG, arguments.callee.name);
        }
    },
  	showEditOptions : function(){
       if(applicationManager.getDeviceUtilManager().isIPhone()) {
       var actionSheetObject = new kony.ui.ActionSheet(
                                                       {
                                                       "title":null,
                                                       "message":null,
                                                       "showCompletionCallback": null
                                                       }
                                                       );
		applicationManager.actionSheetObject=actionSheetObject;
       var actionEditCategory = new kony.ui.ActionItem(
                                                       {
                                                       "title":"Edit Category",
                                                       "style":constants.ACTION_STYLE_DEFAULT,
                                                       "action": this.onEditCategoryClick
                                                       }
                                                       );
       var actionEditNote = new kony.ui.ActionItem(
                                                      {
                                                      "title":"Edit Note",
                                                      "style":constants.ACTION_STYLE_DEFAULT,
                                                      "action": this.onEditNoteClick
                                                      }
                                                      );
       var actionCancel = new kony.ui.ActionItem(
                                                 {
                                                 "title":"Cancel",
                                                 "style":constants.ACTION_ITEM_STYLE_CANCEL,
                                                 "action": null
                                                 }
                                                 );
       actionSheetObject.addAction(actionEditCategory);
       actionSheetObject.addAction(actionEditNote);
       actionSheetObject.addAction(actionCancel);
       actionSheetObject.show();
       }else{
        this.view.flxEdit.setVisibility(true);
        this.view.flxMainContainer.setEnabled(false);
       }
    },
  	hideShadowScreen : function(){
      this.view.flxEdit.setVisibility(false);
	  this.view.flxMainContainer.setEnabled(true);
    }
});