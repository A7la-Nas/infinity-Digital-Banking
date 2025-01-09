define({
  sec: -1,
  row: -1,
  segmentHeight: 0,
  payeesList: 0,
  rowTemplateHeight: 70,
  sectionTemplateHeight: 60,
  rowTemplateP2PHeight: 110,
  searchData: [],
  init: function () {
    var scope = this;
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm = currentFormObject.id;
    applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.navigateCustomBack);
  },
  navigateCustomBack: function () {
    if (kony.os.deviceInfo().name === "iPhone")
      this.view.customSearchbox.tbxSearch.setFocus(false);
    var transMod = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    transMod.commonFunctionForgoBack();
  },
  //Purpose is to scroll to the selected row while moving to and fro between screens.
  postShow: function () {
    //     var scope = this;
    //     if (this.sec !== "" && this.row !== "" && this.sec !== -1 && this.row !== -1) {
    //       if (!(this.sec === 0 && this.row === 0)) {
    //         if ((kony.os.deviceInfo().name !== "iPhone")) {
    //           //Need to invoke scroll manually (only in android) to get the UX experience of docking whenever segment rendered data is greater than viewable area.
    //           if (parseInt(this.segmentHeight) > this.view.segTransactions.frame.height || (this.view.segTransactions.frame.height - (this.segmentHeight)) < this.rowTemplateHeight)
    //             this.scrollManually();
    //         } else {
    //           scope.view.segTransactions.selectedRowIndex = [this.sec + 1, this.row];
    //         }
    //       }
    //     }
    if (this.segmentHeight > 0 || this.view.flxNoAccounts.isVisible) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
  },

  preShow: function () {
    var self = this;
    this.segmentHeight = 0;
    this.payeesList = 0;
    this.view.flxMainContainer.skin = "slfSbox";
    if (this.view.flxHeaderSearchbox.height === "40dp") {
      // this.view.flxHeaderSearchbox.isVisible = false;
      this.view.flxHeaderSearchbox.height = "0dp";
      // this.view.flxSearch.isVisible = true;
      this.view.flxSearch.height = "55dp";
    }
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
      this.view.flxOuterGradient.height = "223dp";
      this.view.flxSearch.top = 0 + "dp";
      this.view.flxDescription.top = 55 + "dp";
      this.view.flxGradient.top = "0dp";
      // this.view.flxGradient.isVisible = true;
      this.view.segTransactions.top = "0dp";
      this.view.flxMainContainer.top = "0dp";
    } else {
      this.view.flxHeader.isVisible = true;
      this.view.flxSearch.top = 0 + "dp";
      this.view.flxDescription.top = 55 + "dp";
      this.view.flxGradient.top = "0dp";
      this.view.flxMainContainer.top = "56dp";
      // this.view.segTransactions.top = "0dp";
    }
    this.initActions();
    var transMod = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    if(transMod.areAllServicesDone()){
      this.setSegmentData();
    }
    this.addDummyRows();
    this.view.flxSearch.height = "55dp";
    // this.view.flxSearch.isVisible = true;
    // this.view.flxDescription.isVisible = true;
    this.view.flxDescription.height = "48dp";
    this.view.flxGradient.isVisible = true;
    this.view.flxNoTransactions.isVisible = false;
    this.view.customSearchbox.tbxSearch.placeholder = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.ToAccountPlaceholder");
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    this.view.segTransactions.onScrolling = function () {
      self.transactionsSegmentOnScrolling();
    };
  },
  cancelOnClick: function () {
    var transMod = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    transMod.cancelCommon();
  },
  initActions: function () {
    var self = this;
    this.view.tbxSearch.onTouchStart = function () {
      if (kony.os.deviceInfo().name === "iPhone") {
        self.view.flxOuterGradient.height = "0dp";
        kony.timer.schedule("timerId", function () {
          self.showSearch();
        }, 0.1, false);
      }
      else {
        self.showSearch();
      }
    }
    this.view.customSearchbox.btnCancel.onClick = function () {
      if (kony.os.deviceInfo().name === "iPhone") {
        self.view.flxOuterGradient.height = "223dp";
        kony.timer.schedule("timerId", function () {
          self.cancelSearch();
        }, 0.1, false);
      }
      else {
        self.cancelSearch();
      }
    }
    this.stack = [];
    this.segTransactionsData = "";
    this.view.customSearchbox.tbxSearch.onTextChange = this.tbxSearchOnTextChange;
    this.view.customHeader.btnRight.onClick = this.cancelOnClick;
    this.view.customHeader.flxBack.onClick = this.navigateCustomBack;
    this.view.segTransactions.onRowClick = this.onSegRowClick;
    this.view.btnTransferToNewAccount.onClick = this.enterAddNew;
    this.view.btnNewAccount.onClick = this.enterAddNewBen;
  },

  onSegRowClick: function () {
    var secindex, rowindex, selectedAccount;
    var transMod = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    if (Array.isArray(this.view.segTransactions.data[0])) {
      secindex = Math.floor(this.view.segTransactions.selectedRowIndex[0]);
      rowindex = Math.floor(this.view.segTransactions.selectedRowIndex[1]);
      selectedAccount = this.view.segTransactions.data[secindex][1][rowindex];
    } else {
      rowindex = Math.floor(this.view.segTransactions.selectedRowIndex[1]);
      selectedAccount = this.view.segTransactions.data[rowindex];
    }
    var transObj= transMod.getTransObject();
    var transactionManager = applicationManager.getTransactionManager();
    if (transObj && transObj.addedRecipientDetails && transObj.addedRecipientDetails.beneficiaryName == selectedAccount.accountName && ((transObj.addedRecipientDetails.accountNumber == selectedAccount.accountID) || transObj.addedRecipientDetails.IBAN == selectedAccount.IBAN)) {
      transactionManager.setTransactionAttribute("isRecipientAdded",true);
    }
    else{
      transactionManager.setTransactionAttribute("isRecipientAdded",false);
    }
    if (selectedAccount.transactionMode === applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers")) {
      var navMan = applicationManager.getNavigationManager();
      navMan.setEntryPoint("editbeneficiary","frmEuropeTransferToAccountSM");  
      navMan.setEntryPoint("selectedcurrency", "frmEuropeTransferToAccountSM");
      transMod.getBeneficiaryCurrency(selectedAccount.accountID);
    }
    transMod.selectedToAccountData = selectedAccount;
    transMod.setToAccountData(selectedAccount);
  },

  transactionsSegmentOnScrolling: function () {
    var parallaxSpeed = 1;
    var yOffset = this.view.segTransactions.contentOffsetMeasured.y;
    if (this.view.flxHeaderSearchbox.height === "40dp")
      this.view.flxDescription.top = 40 - (yOffset * parallaxSpeed) + "dp";
    else
      this.view.flxDescription.top = 55 - (yOffset * parallaxSpeed) + "dp";
    this.view.flxSearch.top = 0 - (yOffset * parallaxSpeed) + "dp";
    this.view.flxGradient.top = 0 - (yOffset * parallaxSpeed) + "dp";
  },

  setSegmentData: function () {
    this.view.segTransactions.widgetDataMap = this.getWidgetDataMap();
    var configManager = applicationManager.getConfigurationManager();
    var transMod = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    var navMan=applicationManager.getNavigationManager();
    var segData = [];
    this.searchData = [];
    // var recentList = transMod.getFilteredRecentAccounts();
    // var processedRecentsData = transMod.processRecentsData(recentList);
    // if (processedRecentsData.length > 0) {
    //   var recentsData = [];
    //   var length = processedRecentsData.length;
    //   var recentsSectionHeaderData = {};
    //   recentsSectionHeaderData["lblHeader"] = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.Recent")+" (" + length + ")";
    //   if (length > 0) {
    //     recentsData.push(recentsSectionHeaderData);
    //     recentsData.push(processedRecentsData);
    //     this.calcualteSegmentRenderedDataHeight(1 , processedRecentsData.length);
    //     segData.push(recentsData);
    //   }
    // }
    if (configManager.checkUserPermission("INTRA_BANK_FUND_TRANSFER_CREATE") || configManager.checkUserPermission("INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE") || configManager.checkUserPermission("INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE")) {
      var toAccounts = transMod.getToAccounts();
      var internalBenificiaries = toAccounts.internalBenificiaries;
      var externalBenificiaries = toAccounts.externalBenificiaries;
      var internationalBenificiaries = toAccounts.internationalBenificiaries;
      var externalAccountsList = [];
      if (internalBenificiaries && internalBenificiaries !== 0) {
        externalAccountsList = externalAccountsList.concat(transMod.addTransactionMode(internalBenificiaries, applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers")));
      }
      if (externalBenificiaries && externalBenificiaries !== 0) {
        externalAccountsList = externalAccountsList.concat(transMod.addTransactionMode(externalBenificiaries, applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts")));
      }
      if (internationalBenificiaries && internationalBenificiaries !== 0) {
        externalAccountsList = externalAccountsList.concat(transMod.addTransactionMode(internationalBenificiaries, applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer")));
      }
      var fromAccountMembershipId = navMan.getCustomInfo("frmAccdataMembershipID");
      var filteredToAccount = transMod.filterToAccountsByMembershipId(fromAccountMembershipId,externalAccountsList);
      var processToData = transMod.processExternalAccountsData(filteredToAccount);
      this.populateSearchData(processToData);
      // if (processedRecentsData.length > 0) {
      //   processToData = transMod.removeExternalAccountsWhichAreInRecents(processToData, processedRecentsData);
      // }  
      var extAccData = [];
      var length = processToData.length;
      var extAccountsSectionHeaderData = {};
      if (length > 1) {
        extAccountsSectionHeaderData["lblHeader"] = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.SavedRecipients")+" (" + length + ")";
        extAccountsSectionHeaderData["imgUpArrow"] = "arrowup.png";
      }
      if (length == 1) {
        extAccountsSectionHeaderData["lblHeader"] = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Europe.SavedRecipient")+" (" + length + ")";
        extAccountsSectionHeaderData["imgUpArrow"] = "arrowup.png";
      }
      if (length > 0) {
        extAccData.push(extAccountsSectionHeaderData);
        extAccData.push(processToData);
        this.calcualteSegmentRenderedDataHeight(1,processToData.length);
        segData.push(extAccData);
      }
    }

    this.sec = -1;
    this.row = -1;
    var transObj = transMod.getTransObject();
    for (var i = 0; i < segData.length; i++) {
      for (var j = 0; j < segData[i][1].length; j++) {
        if (transObj && transObj.transactionType) {
          if (transObj && transObj.toAccountNumber && transObj.toAccountNumber == segData[i][1][j].accountID) {
            segData[i][1][j].flxMain = {
              "skin": "sknFlxF6F6F6mb"
            };
            this.sec = i;
            this.row = j;
          } else {
            segData[i][1][j].flxMain = {
              "skin": "slFboxmb"
            };
          }
        }
      }
    }
    if (segData.length > 0) {
      this.view.flxNoAccounts.isVisible = false;
      this.view.segTransactions.isVisible = true;
      this.view.segTransactions.setData(segData);
      this.segmentData = this.view.segTransactions.data;
    } else {
      this.segmentData = [];
      this.view.flxNoAccounts.isVisible = true;
      this.view.segTransactions.isVisible = false;
      this.view.lblNoAccounts.isVisible = true;
      this.view.lblNoAccounts2.isVisible = true;
    }
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  getWidgetDataMap: function () {
    var dataMap = {
      lblAccountName: "processedName",
      lblBankName: "bankName",
      lblAccountBalValue: "availableBalance",
      lblAccountBal: "accountBalanceType",
      lblHeader: "lblHeader",
      imgUpArrow: "imgUpArrow",
      flxMain: "flxMain",
      imgBankIcon: "imgBankIcon",
      accountTypeFlx: "accountTypeFlx"
    };
    return dataMap;
  },
  addDummyRows: function () {
    var segWidgetDataMap = this.view.segTransactions.widgetDataMap;
    segWidgetDataMap["flxEmptyHeader"] = "flxEmptyHeader";
    segWidgetDataMap["flxEmptyRow"] = "flxEmptyRow";
    this.view.segTransactions.widgetDataMap = segWidgetDataMap;
    var segData = this.view.segTransactions.data;
    if (segData === null || segData === undefined) {
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
                         "height": "104dp"
                       }
                     }]
                    ]);
    segLength = segLength + 104;
    this.view.segTransactions.setData(segData);
    this.segLength = segLength;
  },
  removeDummyRows: function () {
    var data = this.view.segTransactions.data;
    if (data === null || data === undefined) {
      kony.print(kony.i18n.getLocalizedString("i18n.konybb.common.NoData"));
    }
    else {
      data.shift();
      this.view.segTransactions.setData(data);
    }
  },
  showSearch: function () {
    var self = this;
    this.view.flxMainContainer.skin = "slFSbox0gff85612494c44Tab";
    if (kony.os.deviceInfo().name === "iPhone") {
      if (this.view.flxHeaderSearchbox.height === "40dp") {
        this.view.flxHeaderSearchbox.height = "0dp";
        this.view.flxSearch.height = "55dp";
        this.view.flxMainContainer.top = "40dp";
        // this.view.flxSearch.isVisible = true;
        //  this.view.flxHeaderSearchbox.isVisible = false;
        this.view.flxDescription.top = "55dp";
        //   this.view.flxDescription.isVisible = true;
        this.view.flxDescription.height = "48dp";
        this.view.flxGradient.isVisible = true;
      } else {
        if (this.view.flxNoAccounts.isVisible) {
          this.view.lblNoAccounts.isVisible = false;
          this.view.lblNoAccounts2.isVisible = false;
        }
        //this.view.flxMainContainer.skin = "slFSbox0gff85612494c44Tab";
        this.view.flxHeaderSearchbox.height = "40dp";
        // this.view.flxHeaderSearchbox.isVisible = true;
        // this.view.flxSearch.isVisible = false;
        this.view.flxSearch.height = "0dp";
        this.view.flxMainContainer.top = "40dp";
        // this.view.flxDescription.isVisible = false;
        this.view.flxDescription.height = "0dp";
        this.view.flxGradient.isVisible = false;
        this.view.customSearchbox.tbxSearch.text = "";
        this.view.customSearchbox.tbxSearch.setFocus(true);
        this.removeDummyRows();
        this.view.segTransactions.isVisible = false;
        this.view.flxNoTransactions.isVisible = true;
        this.view.lblNoTransaction.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.SearchForAnAccountOrRecipient");
        this.view.btnTransferToNewAccount.isVisible = false;
        kony.timer.schedule("timerId", function () {
          self.view.customSearchbox.tbxSearch.setFocus(true);
        }, 0.1, false);
        this.view.customSearchbox.tbxSearch.onTextChange = this.tbxSearchOnTextChange;
      }
    } else {
      if (this.view.flxHeaderSearchbox.height === "40dp") {
        //this.view.flxHeaderSearchbox.isVisible = false;
        this.view.flxHeaderSearchbox.height = "0dp";
        // this.view.flxSearch.isVisible = true;
        this.view.flxSearch.height = "55dp";
        this.view.flxHeader.isVisible = true;
        this.view.flxMainContainer.top = "56dp";
        this.view.flxGradient.top = "0dp";
        this.view.flxDescription.height = "0dp";
        //this.view.flxDescription.isVisible = false;
      } else {
        if (this.view.flxNoAccounts.isVisible) {
          this.view.lblNoAccounts.isVisible = false;
          this.view.lblNoAccounts2.isVisible = false;
        }
        this.view.flxGradient.isVisible = false;
        this.view.flxDescription.height = "0dp";
        //this.view.flxDescription.isVisible = false;
        this.removeDummyRows();
        this.view.flxSearch.height = "0dp";
        //this.view.flxSearch.isVisible = false;
        this.view.flxHeader.isVisible = false;
        this.view.flxMainContainer.top = "40dp";
        this.view.flxHeaderSearchbox.height = "40dp";
        //this.view.flxHeaderSearchbox.isVisible = true;
        this.view.customSearchbox.tbxSearch.text = "";
        this.view.segTransactions.isVisible = false;
        this.view.flxNoTransactions.isVisible = true;
        this.view.lblNoTransaction.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.SearchForAnAccountOrRecipient");
        this.view.btnTransferToNewAccount.isVisible = false;
        kony.timer.schedule("timerId", function () {
          self.view.customSearchbox.tbxSearch.setFocus(true);
        }, 0.1, false);
        this.view.customSearchbox.tbxSearch.onTextChange = this.tbxSearchOnTextChange;
      }
    }
  },
  tbxSearchOnTextChange: function () {
    var searchtext = this.view.customSearchbox.tbxSearch.text.toLowerCase();
    if (searchtext) {
      var data = this.segmentData;
      //data.push(this.searchData);
      this.view.segTransactions.isVisible = true;
      this.view.flxNoTransactions.isVisible = false;
      this.view.segTransactions.removeAll();
      var searchobj = [];
      searchobj = applicationManager.getDataProcessorUtility().segmentSearchWithMultipleHeaders(["accountName", "accountID", "nickName", "IBAN", "name"], searchtext, data);
      //var searchobj = applicationManager.getDataProcessorUtility().multipleCommonSegmentSearch(["accountName", "accountID", "nickName", "IBAN", "name"], searchtext, data[0]);
      if (searchobj.length > 0) {
        //this.view.segTransactions.widgetDataMap = this.getWidgetDataMapNoHeader();
        this.view.segTransactions.setData(searchobj);
      } else {
        this.view.segTransactions.isVisible = false;
        this.view.flxNoTransactions.isVisible = true;
        this.view.lblNoTransaction.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.NoResultsFound");
        this.view.btnTransferToNewAccount.isVisible = true;
      }
    } else {
      if (this.segmentData.length > 0) {
        this.view.segTransactions.isVisible = false;
        this.view.flxNoTransactions.isVisible = true;
        this.view.lblNoTransaction.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.SearchForAnAccountOrRecipient");
        this.view.btnTransferToNewAccount.isVisible = false;
      } else {
        this.view.segTransactions.isVisible = false;
        this.view.flxNoTransactions.isVisible = true;
        this.view.lblNoTransaction.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.NoResultsFound");
        this.view.btnTransferToNewAccount.isVisible = true;
      }
    }
  },
  cancelSearch: function () {
    this.view.flxMainContainer.skin = "slfSbox";
    this.view.flxHeaderSearchbox.height = "0dp";
    // this.view.flxHeaderSearchbox.isVisible = false;
    // this.view.flxSearch.isVisible = true;
    this.view.flxSearch.height = "55dp";
    this.view.flxGradient.isVisible = true;
    this.view.flxDescription.height = "48dp";
    // this.view.flxDescription.isVisible = true;
    //  this.view.flxSearch.top = 0 + "dp";
    this.view.flxGradient.top = "0dp";
    this.view.flxDescription.top = "55dp";
    this.view.segTransactions.top = "0dp";
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
      this.view.flxMainContainer.top = "0dp";
    } else {
      this.view.flxHeader.isVisible = true;
      this.view.flxMainContainer.top = "56dp";
    }
    if (this.segmentData.length > 0) {
      //this.view.segTransactions.widgetDataMap = this.getWidgetDataMap();
      //this.view.segTransactions.setData(this.segmentData);
      var cancelSearchSegmentData = [];
      cancelSearchSegmentData = this.settingCancelSearchSegmentData();
      this.view.segTransactions.setData(cancelSearchSegmentData);
      this.addDummyRows();
      this.view.segTransactions.isVisible = true;
      this.view.flxNoTransactions.isVisible = false;
    } else {
      this.addDummyRows();
      this.view.flxNoAccounts.isVisible = true;
      this.view.segTransactions.isVisible = false;
      this.view.flxNoTransactions.isVisible = false;
      this.view.lblNoAccounts.isVisible = true;
      this.view.lblNoAccounts2.isVisible = true;
    }
  },
  settingCancelSearchSegmentData: function() {
    var segEachData = [];
    var combinedRowHeader = [];
    var finalArr = [];
    var data = this.segmentData;
    for (var i = 0; i < data.length; i++) {
      segEachData = [];
      combinedRowHeader = [];
      if (!kony.sdk.isNullOrUndefined(data[i][1])) {
        for (var j = 0; j < data[i][1].length; j++) {
          segEachData.push(data[i][1][j]);
        }
      }
      if (!kony.sdk.isNullOrUndefined(data[i][0])) {
        if (data[i][0].lblHeader) {
          data[i][0].lblHeader = (data[i][0].lblHeader).split("(")[0] + "(" + segEachData.length + ")";
          combinedRowHeader.push(data[i][0]);
          combinedRowHeader.push(segEachData);
          finalArr.push(combinedRowHeader);
        }
      }
    }
    return finalArr;
  },
  getWidgetDataMapNoHeader: function () {
    var dataMap = {
      lblAccountName: "processedName",
      lblBankName: "bankName",
      lblAccountBalValue: "availableBalance",
      lblAccountBal: "accountBalanceType"
    };
    return dataMap;
  },
  populateSearchData: function (data) {
    this.searchData = this.searchData.concat(data);
  },
  scrollManually: function () {
    var scope = this;
    scope.view.segTransactions.selectedRowIndex = [this.sec + 1, this.row - 2];
    var parallaxSpeed = 1;
    if (Math.abs(this.view.segTransactions.frame.height - (this.segmentHeight)) < this.rowTemplateHeight && this.payeesList !== 0)
      var yOffset = this.view.segTransactions.contentOffsetMeasured.y + this.sectionTemplateHeight;
    else
      var yOffset = this.view.segTransactions.contentOffsetMeasured.y + (2 * this.rowTemplateHeight);
    if (this.view.flxHeaderSearchbox.height === "40dp") this.view.flxDescription.top = 40 - (yOffset * parallaxSpeed) + "dp";
    else this.view.flxDescription.top = 55 - (yOffset * parallaxSpeed) + "dp";
    this.view.flxSearch.top = 0 - (yOffset * parallaxSpeed) + "dp";
    this.view.flxGradient.top = 0 - (yOffset * parallaxSpeed) + "dp";
  },
  calcualteSegmentRenderedDataHeight: function (numberOfSections, numberOfRows) {
    this.segmentHeight = parseInt(this.segmentHeight) + (numberOfSections * this.sectionTemplateHeight);
    if (numberOfRows) {
      this.segmentHeight = this.segmentHeight + (numberOfRows * this.rowTemplateHeight);
    }
    //This executes only when P2P server is down as there won't be any rows.
    else {
      this.segmentHeight = this.segmentHeight + this.rowTemplateP2PHeight;
    }
  },
  //This executes when the form is loaded ahead and services are in transition state and after service execution this is invoked from presentation layer.
  bindDataAfterTransition: function (flag) {
    if (flag) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
    if (this.segmentHeight === 0) {
      this.setSegmentData();
    }
  },
  rowExpandCollapse: function(context) {
    var scope = this;
    try {
      var stackLength = scope.stack.length;
      var sectionIndex = context.section;
      var data = this.view.segTransactions.data;
      var extAccountsSectionHeaderData = data[sectionIndex][0];
      if (extAccountsSectionHeaderData["imgUpArrow"] === "arrowup.png"){
        this.segTransactionsData = '';
      }
      if (!JSON.stringify(data).includes("flxNoRecords")) {
        if (extAccountsSectionHeaderData["imgUpArrow"] === "arrowup.png") {
          if (this.segTransactionsData === '') this.segTransactionsData = JSON.parse(JSON.stringify(this.view.segTransactions.data));
          extAccountsSectionHeaderData["imgUpArrow"] = "arrowdown.png";
          data[sectionIndex][1] = [];
          this.view.segTransactions.setData(data);
        } else {
          extAccountsSectionHeaderData["imgUpArrow"] = "arrowup.png";
          data[sectionIndex][1] = this.segTransactionsData[sectionIndex][1];
          this.view.segTransactions.setData(data);
        }
      }
      //}
    } catch (err) {
      var errorObj = {
        "errorInfo": "Error in rowExpandCollapse",
        "errorLevel": "Configuration",
        "error": err
      };
      scope.onError(errorObj);
    }
  },

  enterAddNewBen: function() {
    var transMod = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    var navMan = applicationManager.getNavigationManager();
    navMan.setEntryPoint("createEuropeExternalBenificiaries","frmEuropeTransferToAccountSM");
    if(transMod.stateNavigation){
      transMod.initializeStateData(false, "");
      var formname = "frmEuropeTransferToAccountSM";
      var index = navMan.getFormIndex(formname);
      var stackLength = navMan.stack.length;
      if(index === null)
        navMan.setFormIndex(formname,stackLength-1);
      else{
        for(var i = stackLength - 1; i > index; i--){
          navMan.removeFormIndex(navMan.stack[i]);
          navMan.stack.pop();
        }
      }
    }
    transMod.enterAddNewBen();
  }
});