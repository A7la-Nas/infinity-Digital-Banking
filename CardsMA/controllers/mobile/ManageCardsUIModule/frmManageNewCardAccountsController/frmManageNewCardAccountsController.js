define({
  segmentData: null,
  savingAccounts: [],
  checkingAccounts: [],
  savingDataShown: [],
  checkingDataShown: [],
  init: function() {
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
  },
  preShow: function() {
    this.view.flxDescription.isVisible = true;
    this.setSegmentData();
    this.view.segTransactions.onRowClick = this.navigateToNewCardList;
    this.view.tbxSearch.onTextChange = this.tbxSearchOnTextChange;
    this.view.tbxSearch.text="";
    if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
      this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
      this.view.customHeader.btnRight.onClick = this.cancelCommon;
    }
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  postShow: function() {},
  setSegmentData: function() {
    var navMan = applicationManager.getNavigationManager();
    var data = navMan.getCustomInfo("frmManageNewCardAccounts");
    this.savingAccounts = data[1];
    this.checkingAccounts = data[0];
    this.checkingDataShown = data[0];
    this.savingDataShown = data[1];
    this.view.segTransactions.widgetDataMap = {
      lblAccountName: "nickName",
      lblBankName: "bankName",
      lblAccountBalValue: "availableBalance",
      lblAccountBal: "accountBalanceType",
      lblHeader: "lblHeader",
      flxMain: "flxMain",
      imgUpArrow: "imgUpArrow",
      imgBankIcon:"imgBankIcon"
    };
    this.view.flxNoTransactions.isVisible = false;
    var self = this;
    this.view.segTransactions.isVisible = true;
    if (this.savingAccounts.length > 0 && this.checkingAccounts.length > 0) {
      var data = [
        [{
          "lblHeader": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.myCheckingAccounts") + "(" + this.checkingAccounts.length + ")",
          "imgUpArrow": {
            "src": "arrowup.png",
            "onTouchStart": function(widgetreg) {
              self.arrowCheckingCollapseOnClick(widgetreg);
            }
          }
        }, this.checkingAccounts],
        [{
          "lblHeader": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.mySavingsAccounts") + "(" + this.savingAccounts.length + ")",
          "imgUpArrow": {
            "src": "arrowup.png",
            "onTouchStart": function(widgetreg) {
              self.arrowSavingCollapseOnClick(widgetreg);
            }
          }
        }, this.savingAccounts]
      ]
      this.segmentData = data;
      this.view.segTransactions.setData(data);
    } else if (this.savingAccounts.length > 0) {
      var data = [
        [{
          "lblHeader": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.mySavingsAccounts") + "(" + this.savingAccounts.length + ")",
          "imgUpArrow": {
            "src": "arrowup.png",
            "onTouchStart": function(widgetreg) {
              self.arrowSavingCollapseOnClick(widgetreg);
            }
          }
        }, this.savingAccounts]
      ];
      this.segmentData = data;
      this.checkingAccounts = [];
      this.view.segTransactions.setData(data);
    } else if (this.checkingAccounts.length > 0) {
      var data = [
        [{
          "lblHeader": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.myCheckingAccounts") + "(" + this.checkingAccounts.length + ")",
          "imgUpArrow": {
            "src": "arrowup.png",
            "onTouchStart": function(widgetreg) {
              self.arrowCheckingCollapseOnClick(widgetreg);
            }
          }
        }, this.checkingAccounts]
      ];
      this.savingAccounts = [];
      this.segmentData = data;
      this.view.segTransactions.setData(data);
    } else {
      this.segmentData = [];
      this.view.flxNoTransactions.isVisible = true;
      this.view.lblNoTransaction.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.BillPay.NoAccountsAvailable");
      this.view.segTransactions.isVisible = false;
      this.view.flxDescription.isVisible = false;
    }
    this.view.flxMainContainer.forceLayout();
  },
  navigateToNewCardList: function() {
    //  var accountType= this.view.segTransactions.selectedRowIndex[0]==0?"Checking":"Savings";
    //  var accountType=this.view.segTransactions.selectedItems[0].accountType;
    var accountType = this.view.segTransactions.selectedItems[0];
        var availableBalance = accountType.availableBalance;
        if(availableBalance.slice(0,1) == "-"){
            applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("kony.mb.cardManage.negativeBalance"));
        }
        else{
            applicationManager.getPresentationUtility().showLoadingScreen();
    var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
    manageCardsModule.presentationController.getSelectCardProducts(accountType);
        }
  },
  tbxSearchOnTextChange: function() {
    var self = this;
    var searchtext = this.view.tbxSearch.text.toLowerCase();
    //  var searchSegmentData = applicationManager.getDataProcessorUtility().commonSectionSegmentSearch("nickName", searchtext, data, headers);
    var searchSegmentCheckingData = [];
    var searchSegmentSavingData = [];
    searchSegmentCheckingData = applicationManager.getDataProcessorUtility().commonSegmentSearch("nickName", searchtext, this.checkingAccounts);
    searchSegmentSavingData = applicationManager.getDataProcessorUtility().commonSegmentSearch("nickName", searchtext, this.savingAccounts);
    this.checkingDataShown = searchSegmentCheckingData;
    this.savingDataShown = searchSegmentSavingData;
    this.view.segTransactions.isVisible = true;
    if (searchSegmentCheckingData.length > 0 && searchSegmentSavingData.length > 0) {
      var data = [
        [{
          "lblHeader": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.myCheckingAccounts") + "(" + searchSegmentCheckingData.length + ")",
          "imgUpArrow": {
            "src": "arrowup.png",
            "onTouchStart": function(widgetreg) {
              self.arrowCheckingCollapseOnClick(widgetreg);
            }
          }
        }, searchSegmentCheckingData],
        [{
          "lblHeader": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.mySavingsAccounts") + "(" + searchSegmentSavingData.length + ")",
          "imgUpArrow": {
            "src": "arrowup.png",
            "onTouchStart": function(widgetreg) {
              self.arrowSavingCollapseOnClick(widgetreg);
            }
          }
        }, searchSegmentSavingData]
      ]
      this.segmentData = data;
      this.view.segTransactions.setData(this.segmentData);
    } else if (searchSegmentCheckingData.length > 0) {
      var data = [
        [{
          "lblHeader": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.myCheckingAccounts") + "(" + searchSegmentCheckingData.length + ")",
          "imgUpArrow": {
            "src": "arrowup.png",
            "onTouchStart": function(widgetreg) {
              self.arrowCheckingCollapseOnClick(widgetreg);
            }
          }
        }, searchSegmentCheckingData]
      ];
      this.segmentData = data;
      this.view.segTransactions.setData(data);
    } else if (searchSegmentSavingData.length > 0) {
      var data = [
        [{
          "lblHeader": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.mySavingsAccounts") + "(" + searchSegmentSavingData.length + ")",
          "imgUpArrow": {
            "src": "arrowup.png",
            "onTouchStart": function(widgetreg) {
              self.arrowSavingCollapseOnClick(widgetreg);
            }
          }
        }, searchSegmentSavingData]
      ];
      this.segmentData = data;
      this.view.segTransactions.setData(data);
    } else {
      this.view.flxNoTransactions.isVisible = true;
      //this.view.flxHeaderNT.isVisible=false;
      //this.view.flxSeperator3.isVisible=false;
      //  this.view.flxNoTransactions.top = "0dp";
      this.view.lblNoTransaction.isVisible = true;
      this.view.segTransactions.isVisible = false;
    }
    this.view.flxMainContainer.forceLayout();
  },
  arrowCheckingCollapseOnClick: function(widgetreg) {
    if (widgetreg.src == "arrowup.png") {
      this.segmentData[0][0]["imgUpArrow"]["src"] = "arrowdown.png"
      this.segmentData[0][1] = [];
      this.view.segTransactions.setData(this.segmentData);
    } else {
      this.segmentData[0][0]["imgUpArrow"]["src"] = "arrowup.png"
      this.segmentData[0][1] = this.checkingDataShown;
      this.view.segTransactions.setData(this.segmentData);
    }
    this.view.flxMainContainer.forceLayout();
  },
  arrowSavingCollapseOnClick: function(widgetreg) {
    var sectionindex = this.segmentData.length - 1;
    if (widgetreg.src == "arrowup.png") {
      this.segmentData[sectionindex][0]["imgUpArrow"]["src"] = "arrowdown.png"
      this.segmentData[sectionindex][1] = [];
      this.view.segTransactions.setData(this.segmentData);
    } else {
      this.segmentData[sectionindex][0]["imgUpArrow"]["src"] = "arrowup.png"
      this.segmentData[sectionindex][1] = this.savingDataShown;
      this.view.segTransactions.setData(this.segmentData);
    }
    this.view.flxMainContainer.forceLayout();
  },
  flxBackOnClick: function() {
    var navMan = applicationManager.getNavigationManager();
    navMan.goBack();
  },
  cancelCommon:function()
  {
    var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
    manageCardsModule.presentationController.cancelCommon();
  }

});