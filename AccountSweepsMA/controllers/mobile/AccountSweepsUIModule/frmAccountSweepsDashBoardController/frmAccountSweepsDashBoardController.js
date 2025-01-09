define({
  //Type your controller code here
  rowIndexForSwipe: -1,
  previousSection: -1,
  swipeObj: {},
  filterVisible: 0,
  finalData: [],
  sweepAccData: [],
  searchVariable: 0,
  /**
   * init is called when the form is loaded , initialisation happen here
   */
  init: function () {
    var scope = this;
    this.view.preShow = this.preShowForm;
    this.view.postShow = this.postShowForm;
    this.SWEEP_ACTIVE =  "activegreendot.png";
    this.SWEEP_INACTIVE = "inactivegreydot.png";
    applicationManager.getPresentationFormUtility().initCommonActions(this, "NO", this.view.id, scope.navigateCustomBack);
  },
  /***
   * OnNavigate is called when the form is navigated after init
   */
  onNavigate: function () {
    var self = this;
    this.presenter = applicationManager.getModulesPresentationController({
      moduleName: "AccountSweepsUIModule",
      appName: "AccountSweepsMA",
    });
    this.navManager = applicationManager.getNavigationManager();
    let context = this.navManager.getCustomInfo("AllSweeps");
    this.view.flxDeletePopup.isVisible = false;
	this.presenter.flowType = "AccountSweep";
    context && (context.dbpErrMsg || context.errorMessage) ? this.bindGenericError(context.dbpErrMsg || context.errorMessage) : this.updateForm(context);
    this.view.flxFilter.onTouchStart = function () {
      self.view.flxAccountsFilter.isVisible = true;
      self.setFilterData(context);
    };
    kony.application.dismissLoadingScreen();
  },

  /***
   * navigateCustomBack is triggered native/ ios back event
   */
  navigateCustomBack: function () {
    this.presenter.commonFunctionForgoBack();
    this.resetGlobalVariable();
  },

  /***
   * native/ios cancel event
   */
  cancelOnClick: function () {
    this.presenter.cancelCommon({"appName": "HomepageMA", "friendlyName": "frmUnifiedDashboard"});
    this.resetGlobalVariable();
  },
  /**
   * preShowForm is called when the form is pre loaded
   */
  preShowForm: function () {
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
    } else{
      this.view.flxHeader.isVisible = true;
    }
    //this.view.flxNoSearch.isVisible = false;
    this.view.flxAccountsFilter.isVisible = false;
    this.view.flxSearchClose.isVisible = false;
    this.view.tbxSearch.text = "";
    let custominfoCD = applicationManager.getNavigationManager().getCustomInfo("frmCustomerDashboard");
	if(!kony.sdk.isNullOrUndefined(custominfoCD) && (custominfoCD.reDesignFlow === "true")){
        this.view.flxCustomerId.setVisibility(true);
        this.view.lblCustomerIdValue.text = this.presenter.coreCustomerId;
        this.view.flxCustomerId.top = "55dp";
        this.view.flxNoAccounts.top = "109dp";
        this.view.flxCondition.top = "105dp";
        this.view.flxSegment.top = "164dp";
		this.view.flxNoSearch.top = "160dp";
    }else{
        this.view.flxCustomerId.setVisibility(false);
        this.view.flxNoAccounts.top = "54dp";
        this.view.flxCondition.top = "55dp";
        this.view.flxSegment.top = "109dp";
		this.view.flxNoSearch.top = "105dp";
    }    
    this.initActions();
  },

  /**
   * postShowForm is called when the form is post loaded
   */
  postShowForm: function () {},

  /**
   * initActions has all form action declarations
   */
  initActions: function () {
    var self = this;
    this.view.customHeader.btnRight.onClick = this.navigateCustomBack;
    this.view.customHeader.flxBack.onTouchStart = this.navigateCustomBack;
    //osama
    this.view.onDeviceBack = this.navigateCustomBack;
    this.view.nativePopup.setVisibility(false);
    this.view.flxClose.onTouchStart = function () {
      self.view.flxAccountsFilter.isVisible = false;
    };
    this.view.segSweepAccounts.onRowClick =
      this.segSweepAccountsRowClick.bind(this);
    this.view.segFilter.onRowClick = this.setSelectedFilter.bind(this);
    this.view.btnNewAccount.isVisible = this.checkUserPermission("ACCOUNT_SWEEP_CREATE");
    this.view.tbxSearch.onTextChange = this.tbxSearchOnTextChange.bind(this);
    this.view.flxSearchClose.onTouchStart = this.clearSearch;
    this.view.btnNewAccount.onClick = this.createSweep;
    this.view.flxCustomerIdImage.onTouchStart = this.onClickCustomerId;
    this.view.lblCustomerIdValue.onTouchStart = this.onClickCustomerId;
  },

  /**
     *updateForm : Will be called by the navigate method, when current form is to be updated
     @param{object}
  */

  updateForm: function (context) {
    if (context.length === 0 ) {
      if (this.filterVisible === 1) {
        this.setAccountsVisibily(this.filterVisible);
      } else {
        this.view.segSweepAccounts.isVisible = false;
        this.view.flxSegment.isVisible = false;
        this.view.flxCondition.isVisible = false;
        this.view.flxNoAccounts.isVisible = true;
		this.view.flxSearch.isVisible = false;
       // this.view.flxFooter.skin = "sknFlxf8f7f8";
      }
    } else {
      this.filterVisible = 0;
      this.setAccountsVisibily(this.filterVisible);
      this.view.segSweepAccounts.isVisible = true;
      this.setSegmentData(context);
    }
  },

  /**
     *setAccountsVisibily : Will be called by the updateForm method
     *@param{int}
  */
  setAccountsVisibily: function (filterSearch) {
    this.view.flxCondition.isVisible = true;
	this.view.flxSearch.isVisible = true;
    this.view.flxNoAccounts.isVisible = false;
    this.view.flxSegment.isVisible = filterSearch === 1 ? false : true;
    this.view.flxNoSearch.isVisible = filterSearch === 1 ? true : false;
    this.view.lblNoRecord.text = kony.i18n.getLocalizedString("kony.mb.transfers.noRecordFound");
   // this.view.flxFooter.skin = "slFbox0e6f1958661e64a";
  },

  /**
     * setFilterData : sets filter Name in filter UI
     * @param{object}
  */
  setFilterData: function (context) {
    this.view.segFilter.widgetDataMap = this.getFilterWidgetDataMap();
    var filterData = [
      "i18n.AccountsDetails.ALL",
      "i18n.signatory.above",
      "i18n.accountsweeps.below",
      "i18n.accountsweeps.both",
    ];
    var data = [];
    if (this.finalData.length === 0) {
      for (var i = 0; i < filterData.length; i++) {
        if (
          kony.i18n.getLocalizedString(filterData[i]) ===
          kony.i18n.getLocalizedString("i18n.AccountsDetails.ALL")
        ) {
          data["lblFilterOption"] = {
            text:
              kony.i18n.getLocalizedString("i18n.AccountsDetails.ALL") +
              " " +
              "(" +
              context.length +
              ")",
          };
          data["imgFilterSelectedIcon"] = {
            src: "new_tickmark.png",
            isVisible: true,
          };
        } else {
          data["lblFilterOption"] = {
            text: kony.i18n.getLocalizedString(filterData[i]),
          };
          data["imgFilterSelectedIcon"] = {
            src: "new_tickmark.png",
            isVisible: false,
          };
        }
        this.finalData.push(data);
        data = [];
      }
    }
    this.view.segFilter.setData(this.finalData);
    this.view.forceLayout();
  },

  /**
     *setSelectedFilter : sets selected filter Name Data in UI 
  */ 
  setSelectedFilter: function (seguiWidget, sectionIndex, rowIndex) {
    var filterName;
    var segmentData = this.view.segFilter.data[rowIndex];
    if(segmentData.lblFilterOption.text.includes("All")){
      filterName = segmentData.lblFilterOption.text.split(" (")[0];
    } else {
      filterName = segmentData.lblFilterOption.text;
    }
    this.setIdBasedValueFromArray(segmentData);
    this.view.tbxSearch.text = "";
    this.view.flxSearchClose.isVisible = false;
    this.presenter.setSweepsAttribute(
      "filterByValue",
      filterName === "All"
        ? ""
        : filterName
    );
    this.presenter.setSweepsAttribute(
      "filterByParam",
      filterName === "All" ? "" : "sweepType"
    );
    this.filterVisible = 1;
    this.view.segSweepAccounts.removeAll();
    this.presenter.getSweeps(this.presenter.coreCustomerId);
    this.view.flxAccountsFilter.isVisible = false;
  },

  /**
     *setIdBasedValueFromArray : Will be called by the setSelectedFilter method
     *@param{object}
  */
  setIdBasedValueFromArray: function (segmentData) {
    try {
      var filterOption = [];
      var selectedFilter = JSON.parse(JSON.stringify(segmentData));
      var selectedFilterIcon = "new_tickmark.png";
      this.finalData.forEach(function (item) {
        var filter = {
          lblFilterOption: { text: item.lblFilterOption.text },
          imgFilterSelectedIcon: {
            src: "new_tickmark.png",
            isVisible:
              item.lblFilterOption.text === selectedFilter.lblFilterOption.text
                ? true
                : false,
          },
        };
        filterOption.push(filter);
      });
      this.view.segFilter.setData(filterOption);
      this.finalData = filterOption;
      this.view.forceLayout();
    } catch (err) {
      var errObj = {
        errorInfo:
          "Error while setting Filter Headers and Options List in the UI.",
        errorLevel: "Configuration",
        error: err,
      };
      this.onError(errObj);
    }
  },

  /**
     * setSegmentData : Will be called by the setSelectedFilter method
     * @param{object}
  */
  setSegmentData: function (data) {
    var self = this;
    this.bankDate = this.presenter.bankDate["currentWorkingDate"];
    var bankDate = new Date(this.bankDate).getTime();
    this.view.segSweepAccounts.widgetDataMap = this.getSegWidgetDataMap();
    for (var i = 0; i < data.length; i++) {
      var forUtility = applicationManager.getFormatUtilManager();
      var isSweepActive = true;
      if(!kony.sdk.isNullOrUndefined(data[i].endDate)){
        var endDate = this.convertDate(data[i].endDate)
        if(endDate <= bankDate){
            isSweepActive = false;
        }
      }      
      data[i]["imgStatusIndicator"] = {
        "src" : isSweepActive ? this.SWEEP_ACTIVE : this.SWEEP_INACTIVE
      }
      data[i]["lblStatus"] = {
        "text" : isSweepActive ? kony.i18n.getLocalizedString("i18n.CardManagement.ACTIVE") : kony.i18n.getLocalizedString("i18n.CardManagement.inactive")
      }
      data[i]["flxRightSideContents"] = {
        "width" : isSweepActive ? "140dp" : "70dp"
      }
      data[i]["flxSwipeBtn1"] = {
        isVisible: this.checkUserPermission("ACCOUNT_SWEEP_EDIT"),
        onClick: function () {
          var RowData = self.view.segSweepAccounts.data[self.rowIndexForSwipe];
          self.editRow(RowData);
        },
      };
      data[i]["flxSwipeBtn2"] = {
        isVisible: this.checkUserPermission("ACCOUNT_SWEEP_DELETE"),
        onClick: function () {
          var RowData = self.view.segSweepAccounts.data[self.rowIndexForSwipe];
          self.deleteRow(RowData);
        },
        "isVisible" : isSweepActive
      };
      data[i]["processedPrimaryName"] = {
        "text": applicationManager.getPresentationUtility().formatText(data[i].primaryAccountName, 10, data[i].primaryAccountNumber, 4)
      };
      data[i]["processedSecondaryName"] = {
        "text": applicationManager.getPresentationUtility().formatText(data[i].secondaryAccountName, 10, data[i].secondaryAccountNumber, 4)
      };
      if (!this.presenter.isEmptyNullUndefined(data[i].aboveSweepAmount) && !this.presenter.isEmptyNullUndefined(data[i].belowSweepAmount)) {
        data[i]["flxRightSideContents"] = {
            "height" : "120dp"
        }
      }else{
        data[i]["flxRightSideContents"] = {
            "height" : "95dp"
        }
      }
      if (!this.presenter.isEmptyNullUndefined(data[i].belowSweepAmount)) {
        data[i]["belowValue"] = {
          isVisible: true,
          text: kony.i18n.getLocalizedString("i18n.accountsweeps.below") + " " + forUtility.formatAmountandAppendCurrencySymbol( data[i].belowSweepAmount, data[i].currencyCode ),
        };
      } 
      if (!this.presenter.isEmptyNullUndefined(data[i].aboveSweepAmount)) {
        data[i]["aboveValue"] = {
          isVisible: true,
          text: kony.i18n.getLocalizedString("i18n.signatory.above") + " " + forUtility.formatAmountandAppendCurrencySymbol( data[i].aboveSweepAmount, data[i].currencyCode ),
        };
      }
    }
    this.view.flxSegment.isVisible = true;
    this.view.segSweepAccounts.isVisible = true;
    this.sweepAccData = data;
    this.view.segSweepAccounts.setData(data);
    this.view.flxNoAccounts.isVisible = false;
    this.view.forceLayout();
  },

  /**
     * segSweepAccountsRowClick : performs on row click on segment
  */
  segSweepAccountsRowClick: function () {
    var rowindex = Math.floor(this.view.segSweepAccounts.selectedRowIndex[1]);
    sweepData = this.view.segSweepAccounts.data[rowindex];
    this.presenter.setSweepAccountsForTransactions(sweepData);
    this.navManager.navigateTo("frmViewAccountSweep");
  },

  /**
     * tbxSearchOnTextChange : This method will be called when search is triggered
  */
  tbxSearchOnTextChange: function () {
    var searchtext = this.view.tbxSearch.text.toLowerCase();
    if (searchtext.length >= 2) {
      this.searchVariable = 1;
      this.view.flxSegment.isVisible = true;
      this.view.segSweepAccounts.isVisible = true;
      this.view.flxNoSearch.isVisible = false;
      this.view.flxSearchClose.isVisible = true;
      this.view.segSweepAccounts.removeAll();
      var searchobj = applicationManager
        .getDataProcessorUtility()
        .multipleCommonSegmentSearch(
          [
            "primaryAccountNumber",
            "secondaryAccountNumber",
            "primaryAccountName",
            "secondaryAccountName"
          ],
          searchtext,
          this.sweepAccData
        );
      if (searchobj.length > 0) {
        this.view.segSweepAccounts.setData(searchobj);
      } else {
        this.view.flxSegment.isVisible = false;
        this.view.segSweepAccounts.isVisible = false;
        this.view.flxNoSearch.isVisible = true;
        this.view.lblNoRecord.text = kony.i18n.getLocalizedString("kony.mb.transfers.noSearchResultFound");
      }
    } else {
      this.view.flxSearchClose.isVisible = false;
      this.view.flxSegment.isVisible = true;
      this.view.segSweepAccounts.isVisible = true;
      this.view.flxNoSearch.isVisible = false;
      if (this.searchVariable !== 0) {
        this.view.segSweepAccounts.setData(this.sweepAccData);
      }
      this.searchVariable = 0;
    }
  },

  /**
     * clearSearch : This method is responsible for clearing the search text
  */
  clearSearch: function () {
    if (this.searchVariable !== 0) {
      this.view.flxSegment.isVisible = true;
      this.view.segSweepAccounts.isVisible = true;
      this.view.segSweepAccounts.setData(this.sweepAccData);
      this.view.flxSearchClose.isVisible = false;
    }
    this.searchVariable = 0;
    this.view.flxNoSearch.isVisible = false;
    this.view.tbxSearch.text = "";
  },

  /**
     * editRow : This method is called while onClicking edit in Swipe
     * @param{json}
  */
  editRow: function (rowData) {
    this.presenter.setSweepAccountsForTransactions(rowData);
    this.navManager.setEntryPoint("AccountSweepsFlow", "Edit");
    this.presenter.getAllAccounts("frmSweepsAmount", "frmAccountSweepsDashBoard", this.presenter.coreCustomerId);
  },

  /**
     * deleteRow : This method is called while delete edit in Swipe
     * @param{json}
  */
  deleteRow: function (rowData) {
    var scope = this;
    var bankDate = this.presenter.bankDate["currentWorkingDate"];
    var bankDate = new Date(bankDate).getTime();
    var popupMessageText = kony.i18n.getLocalizedString("i18n.AccountSweep.DeactivateSweepPresent");
    if (!kony.sdk.isNullOrUndefined(rowData.endDate)) {
        var endDate = rowData.endDate.split("/");
        endDate = new Date(endDate[2], endDate[1] - 1, endDate[0])
        endDate = endDate.getTime();
        if (bankDate < endDate) {
            popupMessageText = kony.i18n.getLocalizedString("i18n.AccountSweep.DeactivateSweepFuture");
            popupMessageText = popupMessageText.replace("*", rowData.endDate ? rowData.endDate : "Future Date");
        }
    }
    this.view.nativePopup.btnCancel.onClick = function(){
        scope.view.nativePopup.setVisibility(false);
    }
    this.view.nativePopup.btnContinue.onClick = scope.deleteHandler.bind(scope, rowData, true);
    this.view.nativePopup.lblPopupMessage.text = popupMessageText;
    this.view.nativePopup.setVisibility(true);
    // var basicProperties = {
    //   message:
    //     kony.i18n.getLocalizedString("i18n.accountsweeps.deleteTheRule") +
    //     ' " ' +
    //     rowData.processedPrimaryName.text +
    //     ' " ' +
    //     "?",
    //   alertType: constants.ALERT_TYPE_CONFIRMATION,
    //   yesLabel: kony.i18n.getLocalizedString("i18n.common.yes"),
    //   noLabel: kony.i18n.getLocalizedString("i18n.common.no"),
    //   alertHandler: scope.deleteHandler.bind(scope, rowData),
    // };
    // var pspConfig = {};
    // kony.ui.Alert(basicProperties, pspConfig);
  },

  /**
     * deleteHandler : responsible for deleting account Sweep
     * @param{json}
  */
  deleteHandler: function (rowIndex, response) {
    var scope = this;
    if (response == true) {
      this.navManager.setEntryPoint("AccountSweepsFlow", "Delete");
      scope.view.nativePopup.setVisibility(false);
      this.presenter.getSweepsDelete(rowIndex);
    }
  },

  /**
     * PopupHandler : Responsible for showing the delete popup
     * @param{object}
  */
  PopupHandler: function (response) {
    var scope = this;
    if (response.errorMessage) {
      var errorObject = {};
      var errorText = kony.i18n.getLocalizedString(
        "i18n.accountSweeps.SweepCouldNotBeCanceled"
      );
      errorObject.formattedFailedText = errorText;
      errorObject.isSuccess = false;
      this.view.CancelTransactionPopup.setContext(errorObject);
      this.view.CancelTransactionPopup.isVisible=true;
      this.view.flxDeletePopup.setVisibility(true);
      this.view.CancelTransactionPopup.contextualActionButtonOnClick =
        function (btnAction) {
          if (btnAction)
          scope.presenter.commonFunctionForNavigation("frmAccountSweepsDashBoard");
        };
    } else {
      var formattedResponse = [];
      var data = {};
      var context = {};
      data.message = response.message;
      formattedResponse.push(data);
    //   context.messageDetails = JSON.stringify(formattedResponse);
      var successText = kony.i18n.getLocalizedString(
        "i18n.accountSweeps.sweepSuccessfullyCanceled"
      );
      context.formattedSuccessText = successText;
      context.isSuccess = true;
      context.confirmationNumber = response.serviceRequestId;
      this.view.CancelTransactionPopup.setContext(context);
      this.view.CancelTransactionPopup.isVisible=true;
      this.view.flxDeletePopup.setVisibility(true);
      this.view.CancelTransactionPopup.contextualActionButtonOnClick =
        function (btnAction) {
          if (btnAction) scope.presenter.getSweeps(this.presenter.coreCustomerId);
        };
    }
  },

  /**
   * getSegWidgetDataMap - responsible for getting the widgetDataMap
   * @return datamap
  */
  getSegWidgetDataMap: function () {
    var dataMap = {
      lblAccountName: "processedPrimaryName",
      lblAboveValue: "aboveValue",
      lblBelowValue: "belowValue",
      flxAccountsMain: "flxAccountsMain",
      flxRightSideContents: "flxRightSideContents",
      flxSwipeBtn1: "flxSwipeBtn1",
      flxSwipeBtn2: "flxSwipeBtn2",
      lblStatus: "lblStatus",
      imgStatusIndicator: "imgStatusIndicator",
      flxRightSideContents: "flxRightSideContents",
      flxSwipeBtn1: "flxSwipeBtn1",
      flxSwipeBtn2: "flxSwipeBtn2",
      flxRightSideContents: "flxRightSideContents"
    };
    return dataMap;
  },

  /**
   * getFilterWidgetDataMap - responsible for getting the widgetDataMap
   * @return FilterdataMap
  */
  getFilterWidgetDataMap: function () {
    var FilterdataMap = {
      lblFilterOption: "lblFilterOption",
      imgFilterSelectedIcon: "imgFilterSelectedIcon",
    };
    return FilterdataMap;
  },

  /**
   * Component swipeRowOption
   * swipe the segment row and show options
   * widgetInfo {object} - this will be details about the segment
   * swipeInfo {object} - this will be swipe row information like swiped left or right
   */
  swipeRowOption: function (widgetInfo, swipeInfo) {
    if (this.rowIndexForSwipe >= 0 && this.previousSection >= 0) {
      this.animateRight(this.rowIndexForSwipe, this.previousSection);
    }
    this.rowIndexForSwipe = swipeInfo.row;
    this.previousSection = swipeInfo.section;
    if (swipeInfo.swipeDirection === 1) {
      this.animateLeft(swipeInfo.row, swipeInfo.section);
    } else if (swipeInfo.swipeDirection === 2) {
      this.animateRight(swipeInfo.row, swipeInfo.section);
    }
  },

  animateLeft: function (rowNumber, sectionNumber) {
    var shiftPixels = this.getShiftPixels(rowNumber);
    if (sectionNumber === 0) {
      this.getTransAnimDefinition(shiftPixels);
      this.view.segSweepAccounts.animateRows({
        rows: [
          {
            sectionIndex: sectionNumber,
            rowIndex: rowNumber,
          },
        ],
        widgets: ["flxAccountsMain"],
        animation: this.swipeObj,
      });
    }
  },
  animateRight: function (rowNumber, sectionNumber) {
    if (sectionNumber === 0) {
      this.getTransAnimDefinition("0dp");
      this.view.segSweepAccounts.animateRows({
        rows: [
          {
            sectionIndex: sectionNumber,
            rowIndex: rowNumber,
          },
        ],
        widgets: ["flxAccountsMain"],
        animation: this.swipeObj,
      });
    }
  },

  getShiftPixels: function (rowNumber) {
    var isSwipeButton1Visible = this.view.segSweepAccounts.data[rowNumber].flxSwipeBtn1.isVisible;
    var isSwipeButton2Visible = this.view.segSweepAccounts.data[rowNumber].flxSwipeBtn2.isVisible;
    if (isSwipeButton1Visible && isSwipeButton2Visible) {
      return "-140dp";
    } else if (!isSwipeButton1Visible && !isSwipeButton2Visible) {
      return "0dp";
    }
    return "-70dp";
  },

  getTransAnimDefinition: function (leftVal) {
    var transAnimDef1 = {
      100: {
        left: leftVal,
        stepConfig: {
          timingFunction: kony.anim.LINEAR,
        },
        rectified: true,
      },
    };
    var animConf = {
      delay: 0,
      iterationCount: 1,
      fillMode: kony.anim.FILL_MODE_FORWARDS,
      duration: 0.5,
    };
    this.swipeObj = {
      definition: kony.ui.createAnimation(transAnimDef1),
      config: animConf,
      callbacks: null,
    };
  },

  createSweep: function () {
    this.navManager.setEntryPoint("AccountSweepsFlow", "Create");
    this.presenter.isSecondaryEdit = false;
    var accountSweepMan = applicationManager.getAccountSweepsManager();
    accountSweepMan.clearSweepsObject();
    this.presenter.getAllAccounts("frmAccountSweepsPrimaryAccount","frmAccountSweepsDashBoard", this.presenter.coreCustomerId);
  },

  /**
   * checkUserPermission - Checks whether user has permission
   * @returns {boolean}
 */
  checkUserPermission: function (permission) {
    return applicationManager
      .getConfigurationManager()
      .checkUserPermission(permission);
  },

  /**
   * resetGlobalVariable - Resets the Global Variables
 */
  resetGlobalVariable: function () {
    this.rowIndexForSwipe = -1;
    this.previousSection = -1;
    this.swipeObj = {};
    this.filterVisible = 0;
    this.finalData = [];
    this.sweepAccData = [];
    this.searchVariable = 0;
  },

  bindGenericError: function (errorMsg) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    applicationManager.getDataProcessorUtility().showToastMessageError(this, errorMsg);
  },

  convertDate : function(date){
    date = date.split("/");
    date = new Date(date[2],date[1]-1,date[0])
    date = date.getTime();
    return date;
  },

  onClickCustomerId: function(){
    this.navManager.navigateTo("frmSweepCustomers");
  }

});
