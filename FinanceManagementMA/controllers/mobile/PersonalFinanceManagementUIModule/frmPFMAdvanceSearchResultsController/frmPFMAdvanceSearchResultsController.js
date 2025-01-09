define(['CommonUtilities'], function(CommonUtilities) {
  return {
    
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
            var navManager = applicationManager.getNavigationManager();
            var transactions = this.clone(navManager.getCustomInfo("frmPFMAdvanceSearchResults"));
            this.setFlowActions();
            this.setTransactionTypesSegmentData();
            if (!kony.sdk.isNullOrUndefined(transactions) && transactions.length !== 0) {
                    var categoryTransactions=0;
                    for(var i=0;i<transactions.length;i++)
                    {
                        if(transactions[i].categoryId !== "9"){
                            categoryTransactions++;
                        }
                    }
                    if(categoryTransactions !== 0){
                        this.setCategorizedTransactions(transactions);
                        this.view.lblSelectedType.text = kony.i18n.getLocalizedString("i18n.frmPFMAdvanceSearchResult.categorisedTransactions");
                    }
                   // if (transactions[0].categoryId === "9" || transactions[0].categoryName.toLowerCase() === "uncategorised") 
                   else{
                        this.view.lblSelectedType.text = kony.i18n.getLocalizedString("i18n.frmPFMAdvanceSearchResult.uncategorisedTransactions");
                        this.setUncategorizedTransactions(transactions);
                    }
                }
            else {
                this.setCategorizedTransactions(transactions);
            }
            this.view.flxSearchResults.flxHeaderSearchbox.customSearchbox.flxSearchMain.tbxSearch = "";
            this.currentSelected = "categorised";
            this.view.forceLayout();
            var currentForm = navManager.getCurrentForm();
            applicationManager.getPresentationFormUtility().logFormName(currentForm);
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            CommonUtilities.setText(this.view.customSearchbox.btnCancel, kony.i18n.getLocalizedString("i18n.konybb.common.cancel"), accessibilityConfig);
            CommonUtilities.setText(this.view.customSearchbox.tbxSearch, kony.i18n.getLocalizedString("i18n.Search.PlaceholderText"), accessibilityConfig);
        } catch (err) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },
  /**
     * Description
     * @method setCategorizedTransactions
     * @param {} transactions
     * @return
     */
  setCategorizedTransactions: function(transactions) {
    try {
      var formatUtility = applicationManager.getFormatUtilManager();
      var transactionCategories = {};
      var transactionData = [];
      transactions.forEach(function(transaction) {
        if (!transactionCategories[transaction.categoryName]) {
          transactionCategories[transaction.categoryName] = [];
        }
        transactionCategories[transaction.categoryName].push(transaction);
        var date = transaction.transactionDate;
        transaction.transactionDate = date.substr(5, 2) + "/" + date.substr(8, 2) + "/" + date.substr(0, 4);
        transaction.transactionAmount = "-" + formatUtility.formatAmountandAppendCurrencySymbol(transaction.transactionAmount);
      });
      transactionCategories = this.sortObject(transactionCategories);
      for (var category in transactionCategories) {
        if(category.toLowerCase() === "uncategorised" || category.toLowerCase()==="uncategorized"){
        //  continue;
           var tempTransaction = [];
        var headerData = {
          "header": kony.i18n.getLocalizedString("kony.mb.PFM." + category),
          "template": "flxTransHeader"
        };
        var bodyData = transactionCategories[category];
        tempTransaction.push(headerData);
        tempTransaction.push(bodyData);
        transactionData.push(tempTransaction);
        }
        else{
           var tempTransaction = [];
        var headerData = {
          "header": kony.i18n.getLocalizedString("kony.mb.PFM." + category),
          "template": "flxTransHeader"
        };
        var bodyData = transactionCategories[category];
        tempTransaction.push(headerData);
        tempTransaction.push(bodyData);
        transactionData.push(tempTransaction);
        }
       
      }
      this.view.segTransactions.widgetDataMap = {
        "flxShadow": "flxShadow",
        "flxTransHeader": "template",
        "imgUpArrow": "imgUpArrow",
        "lblDate": "transactionDate",
        "lblHeader": "header",
        "lblTransaction": "transactionDescription",
        "lblTransactionAmount": "transactionAmount",
        "segTransHeader": "segTransHeader",
        "segTransactions": "segTransactions"
      };
      this.transactions = transactionData;
      this.view.segTransactions.setData(transactionData);
      this.categorisedData = transactionData;
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
    catch(err) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
    }
  },
  /**
     * Description
     * @method setUncategorizedTransactions
     * @param {} transactions
     * @return
     */
  setUncategorizedTransactions: function(transactions) {
    try {
      var formatUtility = applicationManager.getFormatUtilManager();
      var uncategorisedData = [];
      for(var i=0;i<transactions.length;i++){
        if(transactions[i].categoryName.toLowerCase() ==="uncategorised" || transactions[i].categoryName.toLowerCase()==="uncategorized"){
          var transactionJSON = {};
          var date = transactions[i].transactionDate;
          transactionJSON.categoryName = transactions[i].categoryName;
          transactionJSON.toAccountName = transactions[i].toAccountName;
          transactionJSON.fromAccountName = transactions[i].fromAccountName;
          transactionJSON.transactionNotes = transactions[i].transactionNotes;
          transactionJSON.toAccountNumber = transactions[i].toAccountNumber;
          transactionJSON.fromAccountNumber = transactions[i].fromAccountNumber;
          transactionJSON.transactionDescription = transactions[i].transactionDescription;
          transactionJSON.transactionId = transactions[i].transactionId;
          transactionJSON.categoryId = transactions[i].categoryId;
          transactionJSON.transactionDate = date.substr(5, 2) + "/" + date.substr(8, 2) + "/" + date.substr(0, 4);
          transactionJSON.transactionAmount = "-" + formatUtility.formatAmountandAppendCurrencySymbol(transactions[i].transactionAmount);
          uncategorisedData.push(transactionJSON);
        }
      }
      this.view.segTransactions.widgetDataMap = {
        "flxShadow": "flxShadow",
        "flxTransHeader": "template",
        "imgUpArrow": "imgUpArrow",
        "lblDate": "transactionDate",
        "lblTransaction": "transactionDescription",
        "lblTransactionAmount": "transactionAmount",
        "segTransactions": "segTransactions"
      };
      this.view.segTransactions.setData(uncategorisedData);
      this.uncategorisedData = uncategorisedData;
    }
    catch(err) {
      throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
    }
  },
  setFlowActions: function () {
    try {
      var scopeObj=this;
      this.view.flxDropdownImage.onClick = function() {
        if (scopeObj.view.flxTransactionTypes.isVisible) {
          scopeObj.view.flxTransactionTypes.setVisibility(false);
          scopeObj.view.imgShowTransactionTypes.src = "arrowdown.png";
        } else {
          scopeObj.view.flxTransactionTypes.setVisibility(true);
          scopeObj.view.imgShowTransactionTypes.src = "arrowup.png";
        }
      };
      this.view.customSearchbox.tbxSearch.onTouchEnd = this.tbxOnTouchEnd;
      this.view.customSearchbox.btnCancel.onClick=function(){
        var pfmMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PersonalFinanceManagementUIModule");
        pfmMod.presentationController.commonFunctionForNavigation("frmPFMCategorisedTransactions");
      };
      /**
               * Description
               * @method onRowClick
               * @return
               */
      this.view.segTransactions.onRowClick = function() {
        try {
          var selectedItem = scopeObj.view.segTransactions.selectedItems[0];
          var navManager = applicationManager.getNavigationManager();
          navManager.setCustomInfo("frmPFMTransactionDetails", selectedItem);
          applicationManager.getPresentationUtility().showLoadingScreen();
          var pfmMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PersonalFinanceManagementUIModule");
          pfmMod.presentationController.commonFunctionForNavigation("frmPFMTransactionDetails");
        }
        catch(err){
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, "segTransactions.onRowClick");
        }
      };
    }
    catch(err) {
      throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
    }
  },
  tbxOnTouchEnd:function()
  {
       this.view.flxHeaderSearchbox.customSearchbox.tbxSearch.setFocus = false;
    var navMan = applicationManager.getNavigationManager();
    navMan.goBack();
  },
  /**
     * Description
     * @method setTransactionTypesSegmentData
     * @return
     */
  setTransactionTypesSegmentData: function() {
    try {
      var dataMap = {
        "flxSelectAccountTypes": "flxSelectAccountTypes",
        "flxSeparator": "flxSeparator",
        "imgIcon": "imgIcon",
        "lblName": "lblName",
      };
      var data = [{
        "imgIcon": {
          "src": "tick.png",
          "isVisible": true
        },
        "lblName": {
          "text": kony.i18n.getLocalizedString("i18n.frmPFMAdvanceSearchResult.categorisedTransactions"),
          "skin": "sknLblda8b09SSP26px",
        },
        "template": "flxSelectAccountTypes"
      },
                  {
                    "imgIcon": {
                      "src": "tick.png",
                      "isVisible": false
                    },
                    "lblName": {
                      "text": kony.i18n.getLocalizedString("i18n.frmPFMAdvanceSearchResult.uncategorisedTransactions"),
                      "skin": "sknLbl0095e4SSPRegular26px"
                    },
                    "template": "flxSelectAccountTypes"
                  }
                 ];
      this.view.segTransactionTypes.widgetDataMap = dataMap;
      this.view.segTransactionTypes.setData(data);
      this.view.segTransactionTypes.onRowClick = this.onSegTypesClick.bind(this);
    }
    catch(err) {
      throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
    }
  },
  /**
     * Description
     * @method toggleSegmentElement
     * @param {} data
     * @param {} unselected
     * @param {} selected
     * @param {} visibility1
     * @param {} visibility2
     * @param {} textToBeSet
     * @return
     */
  toggleSegmentElement: function(data, unselected, selected, visibility1, visibility2, textToBeSet) {
    try {
      data[0].lblName.skin = unselected;
      data[0].imgIcon.isVisible = visibility1;
      data[1].lblName.skin = selected;
      data[1].imgIcon.isVisible = visibility2;
      this.view.lblSelectedType.text = textToBeSet;
      return data;
    }
    catch(err) {
      throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
    }
  },
  /**
     * Description
     * @method onSegTypesClick
     * @return
     */
  onSegTypesClick: function() {
    try {
      var scopeobj = this;
      applicationManager.getPresentationUtility().showLoadingScreen();
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("navigationToTransactions",false);
      var transactions = this.clone(navManager.getCustomInfo("frmPFMAdvanceSearchResults"));
      if (scopeobj.view.flxTransactionTypes.isVisible) {
        scopeobj.view.flxTransactionTypes.setVisibility(false);
        scopeobj.view.imgShowTransactionTypes.src = "arrowdown.png";
      } else {
        scopeobj.view.flxTransactionTypes.setVisibility(true);
        scopeobj.view.imgShowTransactionTypes.src = "arrowup.png";
      }
      var selectedItem = this.view.segTransactionTypes.selectedItems[0];
      var data = this.view.segTransactionTypes.data;
      if (selectedItem.lblName.text === kony.i18n.getLocalizedString("i18n.frmPFMAdvanceSearchResult.uncategorisedTransactions")) {
        this.currentSelected = "uncategorised";
        data = this.toggleSegmentElement(data, "sknLbl0095e4SSPRegular26px", "sknLblda8b09SSP26px", false, true, kony.i18n.getLocalizedString("i18n.frmPFMAdvanceSearchResult.uncategorisedTransactions"));
        this.setUncategorizedTransactions(transactions);
      } else {
        this.currentSelected = "categorised";
        this.setCategorizedTransactions(transactions);
        data = this.toggleSegmentElement(data, "sknLblda8b09SSP26px", "sknLbl0095e4SSPRegular26px", true, false, kony.i18n.getLocalizedString("i18n.frmPFMAdvanceSearchResult.categorisedTransactions"));
      }
      this.view.segTransactionTypes.setData(data);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
    catch(err) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
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
      throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.processingError", GlobalExceptionHandler.ActionConstants.LOG, arguments.callee.name);
    }
  },
  /**
     * Description
     * @method sortObject
     * @param {} o
     * @return
     */
  sortObject: function(o) {
    try {
      var sorted = {},
          key, a = [];
      for (key in o) {
        if (o.hasOwnProperty(key)) {
          a.push(key);
        }
      }
      a.sort();
      for (key = 0; key < a.length; key++) {
        sorted[a[key]] = o[a[key]];
      }
      return sorted;
    }
    catch(err) {
      throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.processingError", GlobalExceptionHandler.ActionConstants.LOG, arguments.callee.name);
    }
  },
    
  };
});