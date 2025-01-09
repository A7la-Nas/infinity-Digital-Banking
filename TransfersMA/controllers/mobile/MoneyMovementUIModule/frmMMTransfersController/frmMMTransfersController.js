define(['CampaignUtility'], function(CampaignUtility){
  return{
  popupMsg: '',
  timerCounter: 0,
  onNavigate: function(obj) {
    if (obj === undefined) {
      var newObj = {
        "popup": "none"
      };
      obj = newObj;
    }
    if (obj.popup === "successAddRecipient") {
      this.popupMsg = kony.i18n.getLocalizedString("kony.mb.p2p.successAddRecipient");
    }
    if (obj.popup === "none") {
      this.popupMsg = '';
    }
  },
  init: function() {
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm=currentFormObject.id;
    applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
  },
  preShow: function() {
    var self = this;
    this.view.flxMainContainer.skin = "slFboxmb";
    if (this.view.flxHeaderSearchbox.height === "40dp") {
      //this.view.flxHeaderSearchbox.isVisible = false;
      this.view.flxHeaderSearchbox.height = "0dp";
    //this.view.flxSearch.isVisible = true;
      this.view.flxSearch.height = "55dp";
      this.view.flxHeader.isVisible = true;
    }
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
      this.view.flxFooter.isVisible = false;
      this.view.flxMainContainer.top = "0dp";
    } else {
      this.view.flxFooter.isVisible = false;
      this.view.flxMainContainer.top = "56dp";
    }
    this.view.flxSearch.top="0dp";
    this.view.flxGradient.top = 0 + "dp";
    this.view.flxSearch.isVisible = true;
    this.view.flxSearch.height = "55dp";
    this.view.flxGradient.isVisible = true;
    this.view.flxTransferOptions.isVisible = false;
    this.setSegmentData();
    this.addDummyRows(); // added function for docking the header
    this.initActions();
    this.P2PEntitlement();
    if ((this.popupMsg !== null) && (this.popupMsg !== '')) {
      this.showPopupSuccess();
    }
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    this.view.customSearchbox.tbxSearch.placeholder = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.SearchByAmount");
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    this.view.segTransactions.onScrolling = function() {
      self.transactionsSegmentOnScrolling();
    };
    let scopeObj = this;
    function campaignPopUpSuccess(response){
      CampaignUtility.showCampaign(response, scopeObj.view);
    }
    function campaignPopUpError(response){
      kony.print(response, "Campaign Not Found!");
    }
    CampaignUtility.fetchPopupCampaigns(campaignPopUpSuccess, campaignPopUpError);
  },
  addDummyRows: function() {
    var segWidgetDataMap = this.view.segTransactions.widgetDataMap;
    segWidgetDataMap["flxEmptyHeader"] = "flxEmptyHeader";
    segWidgetDataMap["flxEmptyRow"] = "flxEmptyRow";
    this.view.segTransactions.widgetDataMap = segWidgetDataMap;
    var segData = this.view.segTransactions.data;
    if (segData == null || segData == undefined) {
      segData = [];
    }
    var segLength = 0;
    for (let i = 0; i < segData.length; i++) {
      segLength = segLength + (segData[i][1].length * 70) + 49; //66 is the row height and 49 is the header height
    }
    segData.unshift([{
      "template": "flxEmptyHeader",
      "flxEmptyHeader": {
        "height": "0dp"
      }
    },
                     [{
                       "template": "flxEmptyRow",
                       "flxEmptyRow": {
                         "height": "55dp"
                       }
                     }]
                    ]);
    segLength = segLength + 55;
    this.view.segTransactions.setData(segData);
    this.segLength = segLength;
  },
  transactionsSegmentOnScrolling: function() {
    var parallaxSpeed = 1;
    var yOffset = this.view.segTransactions.contentOffsetMeasured.y;
    if(this.view.flxHeaderSearchbox.height === "40dp")
      this.view.flxTransferOptions.top = 40 - (yOffset * parallaxSpeed) + "dp";
    else
      this.view.flxTransferOptions.top = 55 - (yOffset * parallaxSpeed) + "dp";
    this.view.flxSearch.top = 0 - (yOffset * parallaxSpeed) + "dp";
    this.view.flxGradient.top = 0 - (yOffset * parallaxSpeed) + "dp";
  },
  initActions: function() {
    var scope = this;
    var configManager = applicationManager.getConfigurationManager();
    var MenuHandler = applicationManager.getMenuHandler();
    var navMan=applicationManager.getNavigationManager();
    if(configManager.isSMEUser === "false" && configManager.isCombinedUser === "false"){
      MenuHandler.setUpHamburgerForForm(scope, configManager.constants.MENUTRANSFERS);
    }
    this.view.tbxSearch.onTouchStart = this.showSearch;
    this.view.customSearchbox.btnCancel.onClick = this.cancelSearch;
    this.view.segTransactions.onRowClick=this.segTransactionsOnRowClick;
    this.view.customHeader.imgBack.src = "backbutton.png";
    this.view.customHeader.flxBack.onClick = this.backNavigation;
  },
  P2PEntitlement: function() {
    var configManager = applicationManager.getConfigurationManager();
    if (configManager.getConfigurationValue("ispayAPersonEnabled") !== "true") {
      this.view.flxPayAPerson.setVisibility(false);
      this.view.flxMakeTransfer.left = "50dp";
      this.view.flxManage.right = "50dp";
      return;
    }
  },
  segTransactionsOnRowClick: function(selectedRowIndex, selectedSectionIndex) {
    var navMan = applicationManager.getNavigationManager();
    var selectedSectionIndex=Math.floor(this.view.segTransactions.selectedRowIndex[0]);
    var selectedRowIndex=Math.floor(this.view.segTransactions.selectedRowIndex[1]);
    var transactionData = this.view.segTransactions.data[selectedSectionIndex][1][selectedRowIndex];
    var transModPresentationController = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    navMan.setCustomInfo("frmMMTransactionDetails", transactionData);
    navMan.setEntryPoint("frmMMTransactionDetails","Transfers");
    navMan.navigateTo("frmMMTransactionDetails");
  },
  setSegmentData: function() {
    var pendingaccounts = [],
        pendingaccounts = [];
    var navMan = applicationManager.getNavigationManager();
    var transactions = navMan.getCustomInfo("frmMMTransfers");
    if (transactions) {
      if (transactions.res !== undefined && transactions.res !== null) {
        if (transactions.type === "error") this.showErrorPopup(transactions.res);
        else this.showSuccessPopup(transactions.res, transactions.typeOfTransaction);
      }
      transactions.res = null;
      navMan.setCustomInfo("frmMMTransfers", transactions);
      var postedTransaction = transactions.postedTransaction;
      var scheduledTransactions = transactions.scheduledTransactions;    
      this.view.segTransactions.widgetDataMap = {
        lblTransaction: "description",
        lblDate: "scheduledDate",
        lblAmount: "amount",
        transactionId: "transactionId",
        lblAccount: "fromAccountName",
        lblHeader: "lblHeader",
        imgAccount: "image",
        flximage:"flximage",
        flxAccountType:"flxAccountType",
        imgAccountType:"imgAccountType"
      };
      if (postedTransaction.length > 0 && scheduledTransactions.length > 0) {
        var data = [
          [{
            "lblHeader": "Scheduled Transactions"
          }, scheduledTransactions],
          [{
            "lblHeader": "Posted Payments" /*"Posted Transactions"*/
          }, postedTransaction]
        ];
        this.segmentData = data;
        this.view.segTransactions.setData(data);
        this.pendingaccounts = this.view.segTransactions.data[0][1];
        this.postedaccounts = this.view.segTransactions.data[1][1];
        this.view.segTransactions.isVisible = true;
        this.view.flxNoTransactions.isVisible = false;
      } else if (scheduledTransactions.length > 0) {
        var data = [
          [{
            "lblHeader": "Scheduled Transactions"
          }, scheduledTransactions]
        ];
        this.segmentData = data;
        this.view.segTransactions.setData(data);
        this.pendingaccounts = this.view.segTransactions.data[0][1];
        this.postedaccounts = [];
        this.view.segTransactions.isVisible = true;
        this.view.flxNoTransactions.isVisible = false;
      } else if (postedTransaction.length > 0) {
        var data = [
          [{
            "lblHeader": "Posted Payments" /*"Posted Transactions"*/
          }, postedTransaction]
        ];
        this.segmentData = data;
        this.view.segTransactions.setData(data);
        this.postedaccounts = this.view.segTransactions.data[0][1];
        this.pendingaccounts = [];
        this.view.segTransactions.isVisible = true;
        this.view.flxNoTransactions.isVisible = false;
      } else {
        this.segmentData = [];
        this.pendingaccounts = [];
        this.postedaccounts = [];
        this.view.segTransactions.isVisible = false;
        this.view.flxNoTransactions.isVisible = true;
      }
    }
  },
  showSearch: function() {
    var scope = this;
    this.view.flxOuterGradientBlueKA.isVisible = false;
    this.view.flxMainContainer.skin = "sknFlxffffff";
    if (kony.os.deviceInfo().name === "iPhone") {
      if (this.view.flxHeaderSearchbox.height === "40dp") {
        this.view.flxHeaderSearchbox.height = "0dp";
       // this.view.flxHeaderSearchbox.isVisible = false;
        //this.view.flxSearch.isVisible = true;
        this.view.flxSearch.height = "55dp";
        this.view.flxMainContainer.top = "40dp";
        this.view.flxTransferOptions.top = "54dp";
        this.view.flxTransferOptions.isVisible = false;
        this.view.flxGradient.isVisible = false;
      } else {
        //this.view.flxHeaderSearchbox.isVisible = true;
        this.view.flxHeaderSearchbox.height = "40dp";
        this.view.flxSearch.height = "0dp";
        //this.view.flxSearch.isVisible = false;
        this.view.flxMainContainer.top = "40dp";
        this.view.flxTransferOptions.isVisible = false;
        this.view.flxGradient.isVisible = false;
        this.view.customSearchbox.tbxSearch.text = "";
        this.view.customSearchbox.tbxSearch.setFocus(true);
        this.removeDummyRows();
        kony.timer.schedule("timerId", function() {
          scope.view.customSearchbox.tbxSearch.setFocus(true);
        }, 0.1, false);
        this.view.customSearchbox.tbxSearch.onTextChange = this.tbxSearchOnTextChange;
      }
    } else {
      if (this.view.flxHeaderSearchbox.height === "40dp") {
        this.view.flxHeaderSearchbox.height = "0dp";
        //this.view.flxHeaderSearchbox.isVisible = false;
        this.view.flxSearch.height = "55dp";
        //this.view.flxSearch.isVisible = true;
        this.view.flxHeader.isVisible = true;
        this.view.flxMainContainer.top = "56dp";
        this.view.flxGradient.top = "0dp";
        this.view.flxTransferOptions.isVisible = false;
      } else {
        this.view.flxGradient.isVisible = false;
        this.view.flxTransferOptions.isVisible = false;
        this.removeDummyRows();
        this.view.flxSearch.height = "0dp";
        //this.view.flxSearch.isVisible = false;
        this.view.flxHeader.isVisible = false;
        this.view.flxMainContainer.top = "40dp";
        this.view.flxHeaderSearchbox.height = "40dp";
       // this.view.flxHeaderSearchbox.isVisible = true;
        this.view.customSearchbox.tbxSearch.text = "";
        kony.timer.schedule("timerId", function() {
          scope.view.customSearchbox.tbxSearch.setFocus(true);
        }, 0.1, false);
        this.view.customSearchbox.tbxSearch.onTextChange = this.tbxSearchOnTextChange;
      }
    }
    this.view.flxOuterGradientBlueKA.isVisible = false;
  },
  removeDummyRows: function() {
    var data = this.view.segTransactions.data;
    if (data == null || data == undefined) {
      kony.print("no data");
    } else {
      data.shift();
      this.view.segTransactions.setData(data);
    }
  },
  cancelSearch: function() {
    //this.view.flxOuterGradientBlueKA.isVisible = true;
    this.view.flxMainContainer.skin = "slFboxmb";
    this.view.flxHeaderSearchbox.height = "0dp";
    //this.view.flxHeaderSearchbox.isVisible = false;
    //this.view.flxSearch.isVisible = true;
    this.view.flxSearch.height = "55dp";
    //this.view.flxGradient.isVisible = true;
    this.view.flxTransferOptions.isVisible = false;
   // this.view.flxSearch.top = 0 + "dp";
    //this.view.flxGradient.top = "0dp";
    this.view.flxTransferOptions.top = "55dp";
    this.view.segTransactions.top = "0dp";
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
      this.view.flxMainContainer.top = "0dp";
    } else {
      this.view.flxHeader.isVisible = true;
      this.view.flxMainContainer.top = "56dp";
    }
    if (this.segmentData.length > 0) {
      this.view.segTransactions.setData(this.segmentData);
      this.addDummyRows();
      this.view.segTransactions.isVisible = true;
      this.view.flxNoTransactions.isVisible = false;
    } else {
      this.view.segTransactions.isVisible = false;
      this.view.flxNoTransactions.isVisible = true;
      // this.view.flxHeaderNT.isVisible = false;
    }
    //this.view.flxOuterGradientBlueKA.isVisible = true;
  },
  showPopupSuccess: function() {
    var scopeObj = this;
    this.timerCounter = parseInt(this.timerCounter) + 1;
    var timerId = "timerPopupSuccess" + this.timerCounter;
    this.view.flxPopup.skin = "sknFlxBg43ce6eTab";
    this.view.customPopup.imgPopup.src = "confirmation.png";
    this.view.customPopup.lblPopup.text = this.popupMsg;
    this.view.flxPopup.setVisibility(true);
    kony.timer.schedule(timerId, function() {
      scopeObj.view.flxPopup.setVisibility(false);
    }, 3, false);
  },
  showSuccessPopup: function(refID, type) {
    // TO DO i18n's
    var msg;
    if (type === "delete") {
      msg = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfers.transferCancelToast") + (refID.transactionId || refID.referenceId);
    } else {
      if (refID.referenceId) msg = applicationManager.getPresentationUtility().getStringFromi18n("i18n.payments.successTransferMsg") + refID.referenceId;
      else msg = applicationManager.getPresentationUtility().getStringFromi18n("i18n.payments.editTransferMsg") + refID.transactionId;
    }
    applicationManager.getDataProcessorUtility().showToastMessageSuccess(this, msg);
  },
  showErrorPopup: function(err) {
    applicationManager.getDataProcessorUtility().showToastMessageError(this, JSON.stringify(err));
  },
  tbxSearchOnTextChange: function() {
    var searchtext = this.view.customSearchbox.tbxSearch.text.toLowerCase();
    if (searchtext) {
      var data = [],
          headers = [];
      var lblPendingTranHeader = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.pendingTransactions");
      var lblPostedTranHeader = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.postedTransactions");
      headers.push(lblPendingTranHeader);
      headers.push(lblPostedTranHeader);
      data.push(this.pendingaccounts);
      data.push(this.postedaccounts);
      this.view.segTransactions.isVisible = true;
      this.view.flxNoTransactions.isVisible = false;
      this.view.segTransactions.removeAll();
      var searchobj = applicationManager.getDataProcessorUtility().multipleCommonSegmentSearchWithHeaders(["description", "scheduledDate", "unformattedAmount"], searchtext, data, headers);
      if (searchobj.length > 0) {
        if (searchobj[0][0].lblHeader === "Pending Transactions") searchobj[0][0].lblHeader = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.scheduledTransactions");
        this.view.segTransactions.setData(searchobj);
      } else {
        this.view.segTransactions.isVisible = false;
        this.view.flxNoTransactions.isVisible = true;
      }
    } else {
      if (this.segmentData.length > 0) {
        this.view.segTransactions.setData(this.segmentData);
        this.view.segTransactions.isVisible = true;
        this.view.flxNoTransactions.isVisible = false;
      } else {
        this.view.segTransactions.isVisible = false;
        this.view.flxNoTransactions.isVisible = true;
        // this.view.flxHeaderNT.isVisible = false;
      }
    }
  },
    backNavigation:function(){
      try{
        var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"HomepageMA","moduleName":"AccountsUIModule"});
        accountMod.presentationController.showDashboard();
      }catch(er){

 

      }
    }
  };
});