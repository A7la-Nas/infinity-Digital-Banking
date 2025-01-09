define({
  init : function(){
    try{
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
        var navManager = applicationManager.getNavigationManager();
        var categories = navManager.getCustomInfo("frmPFMEditCategory");
        this.setCategorySegmentData(categories);
        this.setFlowActions();
        this.selectedCategoryId = "9";
        this.selectedCategoryName = "Uncategorised";
   		var currentForm=navManager.getCurrentForm();
   		applicationManager.getPresentationFormUtility().logFormName(currentForm);
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
             * @method onRowClick
             * @return
             */
            this.view.segCategories.onRowClick = function() {
              try {
                var rowIndex = scopeObj.view.segCategories.selectedRowIndex[1];
                var newData = scopeObj.view.segCategories.data;
                for (var i = 0; i < newData.length; i++) {
                    newData[i].flxArrow.skin = "slFboxmb";
                    newData[i].imgArrow.isVisible = false;
                }
                newData[rowIndex].flxArrow.skin = "sknflxf1f1f1Rounded";
                newData[rowIndex].imgArrow.isVisible = true;
                scopeObj.selectedCategoryId = newData[rowIndex].categoryId;
                scopeObj.selectedCategoryName = newData[rowIndex].lblCategory;
                scopeObj.view.segCategories.setData(newData);
              }
              catch(err) {
                throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
              }
            };
            /**
             * Description
             * @method onClick
             * @return
             */
            this.view.customHeader.flxBack.onClick = function() {
              applicationManager.getPresentationUtility().showLoadingScreen();
                var navManager = applicationManager.getNavigationManager();
              	navManager.goBack();
            };
            /**
             * Description
             * @method onClick
             * @return
             */
            this.view.customHeader.btnRight.onClick = function() {
              try {
                applicationManager.getPresentationUtility().showLoadingScreen();
                var accountModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
                accountModule.presentationController.commonFunctionForNavigation("frmPFMTransactionDetails");
              }
              catch(err) {
                applicationManager.getPresentationUtility().dismissLoadingScreen();
                throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, "btnRight.onClick");
              }
            };
            /**
             * Description
             * @method onClick
             * @return
             */
            this.view.btnSave.onClick = function() {
                scopeObj.updateTransaction();
            };
        }
        catch(err) {
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method setRowCategory
     * @param {} skin
     * @param {} src
     * @param {} visibility
     * @return
     */
    setRowCategory: function(skin, src, visibility) {
        try {
            var row = {};
            row.flxArrow = {};
            row.imgArrow = {};
            row.flxArrow.skin = skin;
            row.imgArrow.src = src;
            row.imgArrow.isVisible = visibility;
            return row;
        }
        catch(err) {
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.processingError", GlobalExceptionHandler.ActionConstants.LOG, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method setCategorySegmentData
     * @param {} categories
     * @return
     */
    setCategorySegmentData: function(categories) {
        try {
            var self = this;
            var segData = [];
            var selectedCategory = categories.selectedCategory;
            categories = categories.categories;
            categories.forEach(function(category) {
                var tempJs = {};
                if (selectedCategory === category.categoryId) {
                    tempJs = self.setRowCategory("sknflxf1f1f1Rounded", "tick.png", true);
                } else {
                    tempJs = self.setRowCategory("slFboxmb", "tick.png", false);
                }
                tempJs.template = "flxSelectCategory";
                tempJs.lblCategory = category.categoryName;
                tempJs.categoryId = category.categoryId;
                segData.push(tempJs);
            });
            var dataMap = {
                "flxArrow": "flxArrow",
                "flxSelectCategory": "flxSelectCategory",
                "imgArrow": "imgArrow",
                "lblCategory": "lblCategory",
                "segSelectCategory": "segSelectCategory"
            };
            this.view.segCategories.widgetDataMap = dataMap;
            this.view.segCategories.setData(segData);
            applicationManager.getPresentationUtility().dismissLoadingScreen();
        }
        catch(err) {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method updateTransaction
     * @return
     */
    updateTransaction: function() {
        try {
            applicationManager.getPresentationUtility().showLoadingScreen();
          	var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
            var navManager = applicationManager.getNavigationManager();
            var currentTransactionRecord = navManager.getCustomInfo("frmPFMEditCategory");
            var transactionRecord = {
                "transactionId": currentTransactionRecord.transactionId,
                "categoryId": this.selectedCategoryId
            };
            accountMod.presentationController.updatePFMTransaction(transactionRecord, this.updateTransactionSuccess.bind(this), this.updateTransactionFailure.bind(this));
        }
        catch(err) {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.ServiceCallFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method updateTransactionSuccess
     * @param {} response
     * @return
     */
    updateTransactionSuccess: function(response) {
        try {
            var self = this;
            var navManager = applicationManager.getNavigationManager();
            var currentTransaction = navManager.getCustomInfo("frmPFMTransactionDetails");
            currentTransaction.categoryId = this.selectedCategoryId;
            currentTransaction.categoryName = this.selectedCategoryName;
            navManager.setCustomInfo("frmPFMTransactionDetails", currentTransaction);
            var allTransactions = navManager.getCustomInfo("frmPFMCategorisedTransactions");
            allTransactions.forEach(function(transaction) {
                if (transaction.transactionId === response.transactionId && self.selectedCategoryId != "9") {
                    transaction.categoryId = self.selectedCategoryId;
                    transaction.categoryName = self.selectedCategoryName;
                }
            });
          navManager.setCustomInfo("frmPFMCategorisedTransactions", allTransactions);
          var accountModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
          accountModule.presentationController.commonFunctionForNavigation("frmPFMTransactionDetails");
        }
        catch(err) {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.ServiceCallFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method updateTransactionFailure
     * @param {} response
     * @return
     */
    updateTransactionFailure: function(response) {
        try {
          	applicationManager.getPresentationUtility().dismissLoadingScreen();
            kony.ui.Alert("Snap : " + JSON.stringify(response));
        }
        catch(err) {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.ServiceCallFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    }
});