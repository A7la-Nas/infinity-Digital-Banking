define({
  segmentData: null,
  sec: -1,
  row: -1,
  segmentHeight: 0,
  rowTemplateHeight: 70,
  sectionTemplateHeight: 60,
  init: function () {
    var scope = this;
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm = currentFormObject.id;
    applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.navigateCustomBack);
  },

  navigateCustomBack: function () {
    if (kony.os.deviceInfo().name === "iPhone")
      this.view.customSearchbox.tbxSearch.setFocus(false);
    var navMan = applicationManager.getNavigationManager();
    navMan.navigateTo(navMan.getEntryPoint("frmQRFromAccount"));
  },

  preShow: function () {
    this.view.flxMainContainer.skin = "slfSbox";
    var self = this;
    this.segmentHeight = 0;
    if (this.view.flxHeaderSearchbox.height === "40dp") {
      this.view.flxHeaderSearchbox.height = "0dp";
      this.view.flxSearch.height = "55dp";
      this.view.flxHeader.isVisible = true;
    }
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
      this.view.flxOuterGradient.height = "223dp";
      this.view.flxSearch.top = 0 + "dp";
      this.view.flxDescription.top = 55 + "dp";
      this.view.flxGradient.top = "0dp";
      this.view.flxMainContainer.top = "0dp";
    } else {
      this.view.flxHeader.isVisible = true;
      this.view.flxSearch.top = 0 + "dp";
      this.view.flxDescription.top = 55 + "dp";
      this.view.flxGradient.top = "0dp";
      this.view.flxMainContainer.top = "56dp";
    }
    this.initActions();
    this.setSegmentData(this.decideCatergoryOfContracts());
    this.addDummyRows();
    this.view.flxSearch.height = "55dp";
    this.view.flxDescription.height = "48dp";
    this.view.flxGradient.isVisible = true;
    this.view.customSearchbox.tbxSearch.placeholder = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.FromAccountPlaceholder");
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    if (navManager.getEntryPoint("frmQRFromAccount") === "frmQRActivation") {
      this.view.title = kony.i18n.getLocalizedString("kony.mb.default.account");
      this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.default.account");
    }
    else {
      this.view.title = kony.i18n.getLocalizedString("kony.mb.MM.TransferFrom");
      this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.MM.TransferFrom");
    }
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    this.view.segTransactions.onScrolling = function () {
      self.transactionsSegmentOnScrolling();
    };
    var deviceManager = applicationManager.getDeviceUtilManager();
    deviceManager.detectDynamicInstrumentation();
    applicationManager.getPresentationUtility().dismissLoadingScreen();
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
    this.segTransactionsData = "";
    this.stack = [];
    this.searchobje = [];
    this.view.customSearchbox.tbxSearch.onTextChange = this.tbxSearchOnTextChange;
    this.view.flxNoTransactions.isVisible = false;
    this.view.customHeader.flxBack.onClick = this.navigateCustomBack;
    this.view.segTransactions.onRowClick = this.onRowClick;
  },

  onRowClick: function () {
    var scope = this;
    var navMan = applicationManager.getNavigationManager();
    var secindex, rowindex, frmaccdata;
    if (Array.isArray(this.view.segTransactions.data[0])) {
      secindex = Math.floor(this.view.segTransactions.selectedRowIndex[0]);
      rowindex = Math.floor(this.view.segTransactions.selectedRowIndex[1]);
      frmaccdata = this.view.segTransactions.data[secindex][1][rowindex];
      var navMan = applicationManager.getNavigationManager();
      navMan.setCustomInfo("frmQRFromAccount", frmaccdata);
    }
    else {
      rowindex = Math.floor(this.view.segTransactions.selectedRowIndex[1]);
      frmaccdata = this.view.segTransactions.data[rowindex];
    }
    if (frmaccdata.accountID) {
      var transMod = applicationManager.getModulesPresentationController({ "moduleName": "QRPaymentsUIModule", "appName": "TransfersMA" });
      transMod.setFromAccountsForTransactions(frmaccdata);
      if (navMan.getEntryPoint("frmQRFromAccount") === "frmQRActivation") {
        navMan.navigateTo('frmQRActivation');
      }
      else if (navMan.getEntryPoint("frmQRFromAccount") === "frmQRVerify") {
        navMan.navigateTo('frmQRVerify');
      }
      else {
        navMan.setEntryPoint("frmQRAmount", "frmQRFromAccount");
        navMan.navigateTo('frmQRAmount');
      }

    }
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

  decideCatergoryOfContracts: function () {
    var userPrefManager = applicationManager.getUserPreferencesManager();
    if (userPrefManager.isSingleCustomerProfile) {
      this.contractCase = 1;
    }
    else {
      this.contractCase = 2;
    }

    return this.contractCase;
  },

  setSegmentData: function (contractCase) {
    var navMan = applicationManager.getNavigationManager();
    var data = navMan.getCustomInfo("frmQRFromAccount");
    var transMod = applicationManager.getModulesPresentationController({ "moduleName": "QRPaymentsUIModule", "appName": "TransfersMA" });
    data.fromaccounts = transMod.getSavingsAndCheckingsAccounts(data.fromaccounts);
    if (!kony.sdk.isNullOrUndefined(data)) {
      var segData;
      switch (contractCase) {
        case 1:
          segData = this.setSegmentForSingleContractCase(data);
          break;
        case 2:
          segData = this.setSegmentForMultipleContractsCase(data);
          break;
      }
      this.setFinalProcessedDataToSegment(segData);
    }
    else {
      this.view.segTransactions.isVisible = false;
      this.view.flxNoAccounts.isVisible = true;
      this.view.lblNoAccounts.isVisible = true;
      this.view.lblAddABankAccount.isVisible = true;
    }
  },

  setSegmentForSingleContractCase: function (data) {
    var transMod = applicationManager.getModulesPresentationController({ "moduleName": "QRPaymentsUIModule", "appName": "TransfersMA" });
    var accountsList = data.fromaccounts;
    this.view.segTransactions.rowTemplate = "flxAccountsTransfers";
    this.view.segTransactions.widgetDataMap = this.getWidgetDataMap();
    this.processedData = transMod.processAccountsData(accountsList);
    var viewBindData = transMod.processViewFormattedData(this.processedData);
    viewBindData = transMod.orderByPriority(viewBindData);
    var segData = [];
    if (this.processedData.length > 0) {
      for (var key in viewBindData) {
        var sectionHeaderData = {};
        var combinedData = [];
        if (key != "CreditCard") {
          if (viewBindData[key].length > 1) {
            sectionHeaderData["lblHeader"] = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.My") + " " + key + " " + applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.accounts") + " (" + viewBindData[key].length + ")";
            sectionHeaderData["imgUpArrow"] = "arrowup.png";
          } else {
            sectionHeaderData["lblHeader"] = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.My") + " " + key + " " + applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.mm.account") + " (" + viewBindData[key].length + ")";
            sectionHeaderData["imgUpArrow"] = "arrowup.png";
          }
        }
        var rowDataForSection = transMod.sortByPrefrence(viewBindData[key]);
        if (rowDataForSection.length > 0) {
          combinedData.push(sectionHeaderData);
          combinedData.push(rowDataForSection);
          this.calcualteSegmentRenderedDataHeight(1, rowDataForSection.length);
          segData.push(combinedData);
        }
      }
    }
    segData = this.getSegDataWithHighlightedRow(segData);
    return segData;
  },

  setSegmentForMultipleContractsCase: function (data) {
    var transMod = applicationManager.getModulesPresentationController({ "moduleName": "QRPaymentsUIModule", "appName": "TransfersMA" });
    var accountsList = data.fromaccounts;

    this.view.segTransactions.rowTemplate = "flxAccountsTransfers";
    this.view.segTransactions.widgetDataMap = this.getWidgetDataMap();
    this.processedData = transMod.processAccountsData(accountsList);

    var viewBindData = transMod.processDataMembershipNameWise(this.processedData);
    var segData = [];
    var personalAccountsKey = kony.i18n.getLocalizedString("kony.mb.fastTransfers.personalAccounts");
    if (this.processedData.length > 0) {
      if (!kony.sdk.isNullOrUndefined(viewBindData[personalAccountsKey])) {
        let sectionHeaderData = {};
        let combinedData = [];
        sectionHeaderData["lblHeader"] = personalAccountsKey + " (" + viewBindData[personalAccountsKey].length + ")";
        sectionHeaderData["imgUpArrow"] = "arrowup.png";
        let rowDataForSection = transMod.sortByPrefrence(viewBindData[personalAccountsKey]);
        if (rowDataForSection.length > 0) {
          combinedData.push(sectionHeaderData);
          combinedData.push(rowDataForSection);
          this.calcualteSegmentRenderedDataHeight(1, rowDataForSection.length);
          segData.push(combinedData);
        }
      }

      for (var key in viewBindData) {
        if (key !== personalAccountsKey) {
          var sectionHeaderData = {};
          var combinedData = [];
          sectionHeaderData["lblHeader"] = key + " (" + viewBindData[key].length + ")";
          sectionHeaderData["imgUpArrow"] = "arrowup.png";
          var rowDataForSection = transMod.sortByPrefrence(viewBindData[key]);
          if (rowDataForSection.length > 0) {
            combinedData.push(sectionHeaderData);
            combinedData.push(rowDataForSection);
            this.calcualteSegmentRenderedDataHeight(1, rowDataForSection.length);
            segData.push(combinedData);
          }
        }
      }
    }

    segData = this.getSegDataWithHighlightedRow(segData);
    return segData;
  },

  getSegDataWithHighlightedRow: function (segData) {
    var transMod = applicationManager.getModulesPresentationController({ "moduleName": "QRPaymentsUIModule", "appName": "TransfersMA" });
    this.sec = -1;
    this.row = -1;
    var transObj = transMod.getTransObject();
    for (var i = 0; i < segData.length; i++) {
      for (var j = 0; j < segData[i][1].length; j++) {
        if (transObj && transObj.fromAccountNumber == segData[i][1][j].accountID) {
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

    return segData;
  },

  setFinalProcessedDataToSegment: function (segData) {
    if (segData.length > 0) {
      this.view.flxNoTransactions.isVisible = false;
      this.view.segTransactions.isVisible = true;
      this.view.segTransactions.setData(segData);
      this.segmentData = this.view.segTransactions.data;
    }
    else {
      this.segmentData = [];
      this.view.flxNoTransactions.isVisible = true;
      this.view.lblNoTransaction.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.NoResultsFound");
      this.view.segTransactions.isVisible = false;
    }
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
      kony.print("no data");
    }
    else {
      data.shift();
      this.view.segTransactions.setData(data);
    }
  },
  getWidgetDataMap: function () {
    var dataMap = {
      lblAccountName: "processedName",
      lblBankName: "accountType",
      lblAccountBalValue: "availableBalance",
      lblAccountBal: "accountBalanceType",
      lblHeader: "lblHeader",
      imgUpArrow: "imgUpArrow",
      flxMain: "flxMain",
      imgBankIcon: "imgBankIcon",
      accountTypeFlx: "accountTypeFlx",
      flximgBank: "flximgBank",
      imgBank: "imgBankIcon",
      flxAccountType: "flxAccountType",
      imgAccountType: "src",
      flximgBankIcon: "flximgBankIcon"
    };
    return dataMap;
  },
  resetSearch: function () {
    this.view.customSearchbox.tbxSearch.text = ""
    if (this.segmentdata && this.segmentdata.length > 0) {
      this.view.segTransactions.setData(this.segmentdata);
      this.view.segTransactions.isVisible = true;
      this.view.flxNoTransactions.isVisible = false;
    }
    else {
      this.view.segTransactions.isVisible = false;
      this.view.flxNoTransactions.isVisible = true;
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
        this.view.flxDescription.top = "54dp";
        this.view.flxDescription.height = "48dp";
        this.view.flxGradient.isVisible = true;
      } else {
        if (this.view.flxNoAccounts.isVisible) {
          this.view.lblNoAccounts.isVisible = false;
          this.view.lblAddABankAccount.isVisible = false;
        }
        this.view.flxHeaderSearchbox.height = "40dp";
        this.view.flxSearch.height = "0dp";
        this.view.flxMainContainer.top = "40dp";
        this.view.flxDescription.height = "0dp";
        this.view.flxGradient.isVisible = false;
        this.view.customSearchbox.tbxSearch.text = "";
        this.view.customSearchbox.tbxSearch.setFocus(true);
        this.removeDummyRows();
        this.view.segTransactions.isVisible = false;
        this.view.flxNoTransactions.isVisible = true;
        this.view.lblNoTransaction.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.SearchForAnAccount");
        kony.timer.schedule("timerId", function () {
          self.view.customSearchbox.tbxSearch.setFocus(true);
        }, 0.1, false);
        this.view.customSearchbox.tbxSearch.onTextChange = this.tbxSearchOnTextChange;
      }
    } else {
      if (this.view.flxHeaderSearchbox.height === "40dp") {
        this.view.flxHeaderSearchbox.height = "0dp";
        this.view.flxSearch.height = "55dp";
        this.view.flxHeader.isVisible = true;
        this.view.flxMainContainer.top = "56dp";
        this.view.flxGradient.top = "0dp";
        this.view.flxDescription.height = "0dp";
      } else {
        if (this.view.flxNoAccounts.isVisible) {
          this.view.lblNoAccounts.isVisible = false;
          this.view.lblAddABankAccount.isVisible = false;
        }
        this.view.flxGradient.isVisible = false;
        this.view.flxDescription.height = "0dp";
        this.removeDummyRows();
        this.view.flxSearch.height = "0dp";
        this.view.flxHeader.isVisible = false;
        this.view.flxMainContainer.top = "40dp";
        this.view.flxHeaderSearchbox.height = "40dp";
        this.view.customSearchbox.tbxSearch.text = "";
        this.view.segTransactions.isVisible = false;
        this.view.flxNoTransactions.isVisible = true;
        this.view.lblNoTransaction.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.SearchForAnAccount");
        kony.timer.schedule("timerId", function () {
          self.view.customSearchbox.tbxSearch.setFocus(true);
        }, 0.1, false);
        this.view.customSearchbox.tbxSearch.onTextChange = this.tbxSearchOnTextChange;
      }
    }
  },
  tbxSearchOnTextChange: function () {
    var searchtext = this.view.customSearchbox.tbxSearch.text.toLowerCase();
    if (searchtext && searchtext.length > 3) {
      var data = this.segmentData;
      this.view.segTransactions.isVisible = true;
      this.view.flxNoTransactions.isVisible = false;
      this.view.segTransactions.removeAll();
      var searchobj = applicationManager.getDataProcessorUtility().segmentSearchWithMultipleHeaders(["accountName", "accountID", "nickName"], searchtext, data);
      this.searchobje = searchobj;
      if (searchobj.length > 0) {
        this.view.segTransactions.setData(searchobj);
      } else {
        this.view.segTransactions.isVisible = false;
        this.view.flxNoTransactions.isVisible = true;
        this.view.lblNoTransaction.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.NoResultsFound");
      }
    } else {
      if (this.segmentData.length > 0) {
        this.view.segTransactions.isVisible = false;
        this.view.flxNoTransactions.isVisible = true;
        this.view.lblNoTransaction.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.SearchForAnAccount");
      } else {
        this.view.segTransactions.isVisible = false;
        this.view.flxNoTransactions.isVisible = true;
        this.view.lblNoTransaction.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.NoResultsFound");
      }
    }
  },

  cancelSearch: function () {
    this.view.flxMainContainer.skin = "slfSbox";
    this.view.flxHeaderSearchbox.height = "0dp";
    this.view.flxSearch.height = "55dp";
    this.view.flxGradient.isVisible = true;
    this.view.flxDescription.height = "48dp";
    this.view.flxSearch.top = 0 + "dp";
    this.view.flxGradient.top = "0dp";
    this.view.flxDescription.top = "55dp";
    this.view.segTransactions.top = "0dp";
    this.searchobje = [];
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
      this.view.flxMainContainer.top = "0dp";
    } else {
      this.view.flxHeader.isVisible = true;
      this.view.flxMainContainer.top = "56dp";
    }
    if (this.segmentData.length > 0) {
      var cancelSearchSegmentData = [];
      cancelSearchSegmentData = this.settingCancelSearchSegmentData();
      this.view.segTransactions.setData(cancelSearchSegmentData);
      this.addDummyRows();
      this.view.segTransactions.isVisible = true;
      this.view.flxNoTransactions.isVisible = false;
    } else {
      this.view.flxNoAccounts.isVisible = true;
      this.view.lblNoAccounts.isVisible = true;
      this.view.lblAddABankAccount.isVisible = true;
      this.addDummyRows();
      this.view.segTransactions.isVisible = false;
      this.view.flxNoTransactions.isVisible = false;
    }
  },

  settingCancelSearchSegmentData: function () {
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
  rowExpandCollapse: function (context) {
    var scope = this;
    try {
      var stackLength = scope.stack.length;
      var sectionIndex = context.section;
      if (this.segTransactionsData === '') this.segTransactionsData = JSON.parse(JSON.stringify(this.view.segTransactions.data));
      var data = this.view.segTransactions.data;
      var selectedHeaderData = data[sectionIndex][0];
      if (!JSON.stringify(data).includes("flxNoRecords")) {
        if (selectedHeaderData["imgUpArrow"] === "arrowup.png") {
          if (this.searchobje.length !== 0) {
            selectedHeaderData["imgUpArrow"] = "arrowdown.png";
            this.segTransactionsDat = JSON.parse(JSON.stringify(this.searchobje));
            data[sectionIndex][1] = [];
            this.view.segTransactions.setData(data);
          }
          else {
            selectedHeaderData["imgUpArrow"] = "arrowdown.png";
            data[sectionIndex][1] = [];
            this.view.segTransactions.setData(data);
          }
        } else {
          selectedHeaderData["imgUpArrow"] = "arrowup.png";
          if (this.searchobje.length !== 0) {
            this.segTransactionsDat = JSON.parse(JSON.stringify(this.searchobje));
            data[sectionIndex][1] = this.segTransactionsDat[sectionIndex][1];
            this.view.segTransactions.setData(data);
          }
          else {
            data[sectionIndex][1] = this.segTransactionsData[sectionIndex][1];
            this.view.segTransactions.setData(data);
          }
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
  }
});