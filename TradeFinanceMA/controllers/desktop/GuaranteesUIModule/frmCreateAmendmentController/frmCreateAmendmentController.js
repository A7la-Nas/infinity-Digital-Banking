define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants', 'FormatUtil'], function(CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants, FormatUtil) {
  let document = '';
  let deletedIndex;
  let editedBenDetails = "";
  let docReferenceValues = [];
  let lcData = "";
  let isReviseFlow = false;
  let benIndex = 1;
  let benCount = 0;
  let beneficiaryList = new Map();
  let payLoaddata = "";
  let documentsList = [];
  let dataBeforeEditing = {};
  let beneficiaries = [];
  let updatedBeneficiaries = [];
  let getBeneficiaryDatafromComponent = {};
  const NA = kony.i18n.getLocalizedString("i18n.common.NA");
  let regExpForCheckDateInString = /[\-\-]/g;
  return {

    /**
     * @api : init
     * This function for executing the lines of code only once
     * @return : NA
     */
    init: function() {
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      this.view.onBreakpointChange = this.onBreakpointChange;
    },

    /**
     * @api : onNavigate
     * This function for executing the preShow and postShow
     * @return : NA
     */
    onNavigate: function(data) {
      var scope = this;
      scope.setDefaultUI();
      lcData = data;
      isReviseFlow = lcData.isReviseFlow;
      this.presenter = applicationManager.getModulesPresentationController({
        'appName': 'TradeFinanceMA',
        'moduleName': 'GuaranteesUIModule'
      });
    },

    /**
     * @api : preShow
     * This function for executing the primary functions before rendering UI
     * @return : NA
     */
    preShow: function() {
      var scope = this;
      try {
        scope.setSegementData();
        scope.setGuaranteeDetails();

      } catch (err) {
        var errorObj = {
          "level": "frmCreateAmendmentController",
          "method": "preShow",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : postShow
     * This function for executing the primary functions after rendering UI
     * @return : NA
     */
    postShow: function() {
      var scope = this;
      try {
        scope.initButtonActions();
        this.presenter.getBeneficiaries(this.view.id);
        if (isReviseFlow) {
          scope.setReviseFlowUI(true);
          scope.view.lblHeading.text = kony.i18n.getLocalizedString("i18n.TradeFinance.IssuedGTAndSBLC") + " - " + kony.i18n.getLocalizedString("i18n.TradeFinance.Amendment") + " - " + lcData.amendmentReference;
          scope.prefillReviseData();
        } else {
          scope.setReviseFlowUI(false);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmCreateAmendmentController",
          "method": "postShow",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : onBreakpointChange
     * This function for changing the UI depending upon breakpoint
     * @return : NA
     */
    onBreakpointChange: function() {
      var scope = this;
      try {
        var currentBreakpoint = kony.application.getCurrentBreakpoint();
        scope.view.customheadernew.onBreakpointChangeComponent(currentBreakpoint);
        scope.view.customfooternew.onBreakpointChangeComponent(currentBreakpoint);
      } catch (err) {
        var errorObj = {
          "level": "frmCreateAmendmentController",
          "method": "onBreakpointChange",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : initButtonActions
     * This function is for defining the widget actions
     * @return : NA
     */
    initButtonActions: function() {
      var scope = this;
      try {
        this.view.btnReviewContinue.onClick = scope.setReviewScreenOrMainScreen.bind(this, "review");
        this.view.btnBack.onClick = scope.buttonNavigation.bind(this, "cancel");

        this.view.btnSubmitReview.onClick = scope.createAmendment.bind(this);
        this.view.btnBackReview.onClick = scope.setReviewScreenOrMainScreen.bind(this, "main");
        this.view.btnCancelReview.onClick = scope.showPopup.bind(this, "cancel");

        this.view.flxExpiryTypeDropDown.onClick = scope.showExpiryTypeSegment.bind(this);
        this.view.btnViewDetails.onClick = scope.showPopup.bind(this, "lcdetails");

        this.view.Popup.btnYes.onClick = scope.buttonNavigation.bind(this, "cancel");
        this.view.Popup.btnNo.onClick = scope.showPopup.bind(this, "cancel", false);
        this.view.Popup.flxCross.onClick = scope.showPopup.bind(this, "cancel", false);

        this.view.flxCrossSBLC.onClick = scope.showPopup.bind(this, "lcdetails", false);
        this.view.flxCrossEditBen.onClick = scope.showPopup.bind(this, "editben", false);
        this.view.btnEditCancel.onClick = scope.showPopup.bind(this, "editben", false);

        this.view.flxCheckBoxEffectiveDate.onClick = scope.toggleCheckBoxClick.bind(this, "effectivedate", this.view.lblCheckBoxEffectiveDate);
        this.view.flxCheckBoxLCAmount.onClick = scope.toggleCheckBoxClick.bind(this, "lcamount", this.view.lblCheckBoxLCAmount);
        this.view.flxCheckBoxExpiryType.onClick = scope.toggleCheckBoxClick.bind(this, "expirytype", this.view.lblCheckBoxExpiryType);
        this.view.flxCheckBoxBeneficiaryDetails.onClick = scope.toggleCheckBoxClick.bind(this, "benlist", this.view.lblCheckBoxBeneficiaryDetails);
        this.view.flxCheckBoxAmendmentDetails.onClick = scope.toggleCheckBoxClick.bind(this, "amenddetails", this.view.lblCheckBoxOtherAmendments);
        this.view.flxCheckBoxAmendmentCharges.onClick = scope.toggleCheckBoxClick.bind(this, "charges", this.view.lblCheckBoxAmendmentCharges);
        this.view.flxCheckBoxUploadDocuments.onClick = scope.toggleCheckBoxClick.bind(this, "upload", this.view.lblCheckBoxUploadDocuments);
        this.view.flxCheckBoxMessageToBank.onClick = scope.toggleCheckBoxClick.bind(this, "returnmessage", this.view.lblCheckBoxMessageToBank);

        this.view.txtMessageToBank.onEndEditing = scope.enableOrDisableContinue.bind(this);
        this.view.txtAmendmentDetails.onEndEditing = scope.enableOrDisableContinue.bind(this);
        this.view.txtAmendmentCharges.onEndEditing = scope.enableOrDisableContinue.bind(this);
        this.view.tbxExpiryCondition.onEndEditing = scope.enableOrDisableContinue.bind(this);

        this.view.btnAddNewBenificiary.onClick = scope.showPopup.bind(this, "addben");
        this.view.btnAddCancel.onClick = scope.showPopup.bind(this, "addben", false);
        this.view.flxCrossAddBen.onClick = scope.showPopup.bind(this, "addben", false);

        this.view.btnAddBeneficiary.onClick = function() {
          scope.showPopup("addben", false);
          let benData = scope.view.BeneficiaryDetails.getData();
          getBeneficiaryDatafromComponent = benData;
          if (benData.saveBeneficiary) {
            scope.saveBeneficiaryForFutureUse(benData);
          } else {
            scope.addNewBenificiary(benData);
          }
          scope.view.BeneficiaryDetails.clearFields();
        }

        this.view.btnUpdate.onClick = function() {
          scope.showPopup("editben", false);
          let benData = scope.view.EditBeneficiaryDetails.getData();
          getBeneficiaryDatafromComponent = benData;
          if (dataBeforeEditing.hasOwnProperty('payeeId')) {
            benData.id = dataBeforeEditing.payeeId;
          }
          if (benData.saveBeneficiary || benData.hasOwnProperty('id')) {
            scope.saveBeneficiaryForFutureUse(benData);
          } else {
            scope.updateBenificiary(benData);
          }
          scope.view.EditBeneficiaryDetails.clearFields();
        }

        this.view.btnUploadNewFile.onClick = this.browseSupportingDocument.bind(this);
        scope.view.flxUploadInfoIcon.onClick = function() {
          scope.view.flxInfoUploadMsg.setVisibility(true);
        }
        scope.view.flxInfoClose.onClick = function() {
          scope.view.flxInfoUploadMsg.setVisibility(false);
        }
        scope.view.UploadDocumentPopup.btnNo.onClick = this.togglePopup.bind(this, false, "flxUploadDocumentPopup");
        scope.view.UploadDocumentPopup.btnYes.onClick = this.tryAgainBrowse.bind(this);
        scope.view.UploadDocumentPopup.flxCross.onClick = this.togglePopup.bind(this, false, "flxUploadDocumentPopup");

        this.view.expiryDate.tbxDateInputKA.onEndEditing = this.checkDate.bind(this, this.view.expiryDate.tbxDateInputKA, "expiry", this.view.lblExpiryDateError);

        this.view.tbxAmount.restrictCharactersSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_-\\?/+={[]}:;,<>'`|\"";
        this.view.tbxExpiryCondition.restrictCharactersSet = "~!@#$%^&*()_-\\?/+={[]}:;<>'`|\"";
        scope.view.tbxAmount.onEndEditing = function () {
          scope.view.tbxAmount.text = scope.formatAmount(scope.view.tbxAmount.text, {
            "locale": "",
            "positiveFormat": "{CS}{D}",
            "negativeFormat": "-({CS}{D})",
            "fractionDigits": "2"
          });
        }
        this.view.flxErrorClose.onClick = function() {
          scope.view.flxErrorMessage.setVisibility(false);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmCreateAmendmentController",
          "method": "initButtonActions",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : updateFormUI
     * This function to set UI when landing on screen.
     * @return : NA
     */
    updateFormUI: function(viewModel) {
      if (viewModel.isLoading === true) {
        FormControllerUtility.showProgressBar(this.view);
      } else if (viewModel.isLoading === false) {
        FormControllerUtility.hideProgressBar(this.view);
      }
      if (viewModel.uploadDocument) {
        this.storeReferenceValues(viewModel.uploadDocument[0].documentReference);
      }
      if (viewModel.createAmendSuccess) {
        this.buttonNavigation("submit", viewModel.createAmendSuccess);
      }
      if (viewModel.updateAmendSuccess) {
        this.buttonNavigation("submit", viewModel.updateAmendSuccess);
      }
      if (viewModel.deleteDocument) {
        this.removeDocumentReference();
      }
      if (viewModel.beneficiaries) {
        beneficiaries = viewModel.beneficiaries;
        this.constructBeneficiarySegmentData();
      }
      if (viewModel.editPayee) {
        var scope = this;
        if (viewModel.editPayee[0].dbpErrMsg !== "") {
          this.view.lblErrorMessage.text = viewModel.editPayee[0].dbpErrMsg;
          this.view.flxErrorMessage.setVisibility(true);
        } else {
          beneficiaries.push(getBeneficiaryDatafromComponent);
          scope.updateBenificiary(getBeneficiaryDatafromComponent);

        }
      }
      if (viewModel.payeeIds) {
        var scope = this;
        scope.addNewBenificiary(getBeneficiaryDatafromComponent);
        beneficiaries.push(getBeneficiaryDatafromComponent);
      }

      if (viewModel.serverError) {
        this.view.lblErrorMessage.text = viewModel.serverError;
        this.view.flxErrorMessage.setVisibility(true);
      }
    },

    /**
     * @api : setDefaultUI
     * This function to set default UI when landing on screen.
     * @return : NA
     */
    setDefaultUI: function() {
      var scope = this;
      try {
        this.disableOldDaySelection(this.view.calEffectiveDate);
        this.view.calEffectiveDate.dateEditable=false;
        this.view.lblHeading.text = kony.i18n.getLocalizedString("i18n.TradeFinance.IssuedGTAndSBLC") + " - " + kony.i18n.getLocalizedString("i18n.TradeFinance.CreateNewAmendment");
        this.view.tbxExpiryCondition.placeholder = kony.i18n.getLocalizedString("i18n.konybb.Common.Enterhere");
        this.clearFields();
        this.view.flxAmendRequiredFields.setVisibility(true);
        this.view.flxReviseAmendDetails.setVisibility(false);
        this.view.flxErrorMessage.setVisibility(false);
        this.view.flxDialogs.setVisibility(false);
        this.view.flxAmendmentDetails.setVisibility(true);
        this.view.flxAmendmentRequest.setVisibility(false);
        this.view.flxReviewActionButtons.setVisibility(false);
        this.view.flxActionButtons.setVisibility(true);
        this.view.flxAmendEffectiveDate.setVisibility(true);
        this.view.lblAmountHeader.text = kony.i18n.getLocalizedString("kony.mb.common.Amount");
        this.view.flxLCAmount.setVisibility(true);
        this.view.flxExpiryType.setVisibility(true);
        this.view.flxExpiryTypeDynamicFields.setVisibility(false);
        this.view.flxInfoUploadMsg.setVisibility(false);
        this.view.lblExpiryDateError.setVisibility(false);
        this.view.lblEffectiveDateError.setVisibility(false);
        this.view.flxCheckBoxEffectiveDate.setVisibility(false);

        this.showExpandedView("lcamount", false);
        this.showExpandedView("expirytype", false);
        this.showExpandedView("benlist", false);
        this.showExpandedView("amenddetails", false);
        this.showExpandedView("upload", false);
        this.showExpandedView("returnmessage", false);
        this.showExpandedView("charges", false);

        this.view.btnReviewContinue.text = "Review & Submit";
        this.enableOrDisableButton(scope.view.btnReviewContinue, false);
        this.view.btnBack.text = kony.i18n.getLocalizedString("i18n.konybb.common.cancel");

        this.view.BeneficiaryDetails.setFlowType("add");
        this.view.EditBeneficiaryDetails.setFlowType("edit");

      } catch (err) {
        var errorObj = {
          "level": "frmCreateAmendmentController",
          "method": "setDefaultUI",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : disableOldDaySelection
     * This function to disable the past days in widget
     * @return : NA
     */
    disableOldDaySelection: function(widgetId, dateValue) {
      try {
        let today;
        var numberOfYearsAllowed = OLBConstants.CALENDAR_ALLOWED_FUTURE_YEARS;
        if (!kony.sdk.isNullOrUndefined(dateValue)) {
          today = new Date(dateValue).getTime() > new Date().getTime() ? new Date(dateValue) : new Date();
        } else {
          today = new Date();
        }
        var futureDate = new Date(today.getTime() + (1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 365 /*days*/ * numberOfYearsAllowed));
        widgetId.enableRangeOfDates([today.getDate(), today.getMonth() + 1, today.getFullYear()], [futureDate.getDate(), futureDate.getMonth() + 1, futureDate.getFullYear()], "skn", true);
        widgetId.dateComponents = [today.getDate(), today.getMonth() + 1, today.getFullYear()];
      } catch (err) {
        var errorObj = {
          "level": "frmCreateAmendmentController",
          "method": "disableOldDaySelection",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : clearExistingBeneficiaries
     * This function to clear all existing benefeciaries and set to empty.
     * @return : NA
     */
    clearExistingBeneficiaries: function() {
      try {
        for(benIndex; benIndex >= 1; benIndex--) {
          let newBenDetails = this.view['B' + benIndex + "flxBeneficiary1"];
          if (!kony.sdk.isNullOrUndefined(newBenDetails)) {
            this.view.flxBenificiaryList.remove(newBenDetails);
          }
        }
      } catch (err) {
        var errorObj = {
          "level": "frmCreateAmendmentController",
          "method": "clearExistingBeneficiaries",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : clearFields
     * This function to clear all fields and set to empty.
     * @return : NA
     */
    clearFields: function() {
      this.clearExistingBeneficiaries();
      this.view.tbxAmount.text = "";
      this.view.flxBeneficiary1.setVisibility(false);
      this.view.lblBeneficiaryName1.text = "";
      this.view.rtxBenAddress1.text = "";
      this.view.lblSelectHere.text = kony.i18n.getLocalizedString("i18n.common.selecthere");
      this.view.tbxExpiryCondition.text = "";
      this.view.txtAmendmentDetails.text = "";
      this.view.txtAmendmentCharges.text = "";
      this.view.txtMessageToBank.text = "";
      this.view.segDocuments.removeAll();
      this.view.lblCheckBoxEffectiveDate.text = "D";
      this.view.lblCheckBoxLCAmount.text = "D";
      this.view.lblCheckBoxExpiryType.text = "D";
      this.view.lblCheckBoxBeneficiaryDetails.text = "D";
      this.view.lblCheckBoxOtherAmendments.text = "D";
      this.view.lblCheckBoxAmendmentCharges.text = "D";
      this.view.lblCheckBoxUploadDocuments.text = "D";
      this.view.lblCheckBoxMessageToBank.text = "D";
      document = '';
      deletedIndex = "";
      docReferenceValues = [];
      lcData = "";
      isReviseFlow = false;
      benIndex = 1;
      benCount = 0;
      editedBenDetails = "";
      beneficiaryList = new Map();
      documentsList = [];
      payLoaddata = "";
      beneficiaries = [];
      dataBeforeEditing = {};
      updatedBeneficiaries = [];
    },

    /**
     * @api : showExpandedView
     * This function to set expanded UI on checkbox click.
     * @return : NA
     */
    showExpandedView: function(param, visibility) {
      switch (param) {
        case "lcamount": {
          this.view.lblAmountHeader.setVisibility(!visibility);
          this.view.flxCurrency.setVisibility(visibility);
          this.view.flxAmount.setVisibility(visibility);
          break;
        }
        case "expirytype": {
          this.view.flxExpiryTypeDropDownContainer.setVisibility(visibility);
          break;
        }
        case "benlist": {
          this.view.flxBeneficiaryListContainer.setVisibility(visibility);
          break;
        }
        case "amenddetails": {
          this.view.txtAmendmentDetails.setVisibility(visibility);
          break;
        }
        case "upload": {
          this.view.flxSegDocuments.setVisibility(visibility);
          this.view.btnUploadNewFile.setVisibility(visibility);
          this.view.flxUploadInfoIcon.setVisibility(visibility);
          break;
        }
        case "returnmessage": {
          this.view.txtMessageToBank.setVisibility(visibility);
          break;
        }
        case "charges": {
          this.view.txtAmendmentCharges.setVisibility(visibility);
          break;
        }
        case "effectivedate": {
          this.view.flxAmendEffectiveDate.setVisibility(visibility);
          break;
        }
      }
      this.enableOrDisableContinue();
    },

    /**
     * @api : setSegementData
     * This function for setting segment data.
     * @return : NA
     */
    setSegementData: function() {
      var scope = this;
      try {
        this.view.segExpiryTypeValues.widgetDataMap = {
          "flxAccountTypes": "flxAccountTypes",
          "lblUsers": "lblUsers",
          "lblSeparator": "lblSeparator"
        };

        var segData = [
          [{},
            [{
              lblUsers: {
                text: kony.i18n.getLocalizedString("i18n.TradeFinance.openEnded"),
                toolTip: kony.i18n.getLocalizedString("i18n.TradeFinance.openEnded"),
                isVisible: true,
              },
              flxAccountTypes: {
                onClick: scope.setDynamicFields.bind(this, "open"),
                isVisible: true,
              },
            }, {
              lblUsers: {
                text: kony.i18n.getLocalizedString("i18n.konybb.Common.Date"),
                toolTip: kony.i18n.getLocalizedString("i18n.konybb.Common.Date"),
                isVisible: true,
              },
              flxAccountTypes: {
                onClick: scope.setDynamicFields.bind(this, "date"),
                isVisible: true,
              },
            }, {
              lblUsers: {
                text: kony.i18n.getLocalizedString("i18n.ExportLC.AdditionalConditions").slice(11),
                toolTip: kony.i18n.getLocalizedString("i18n.ExportLC.AdditionalConditions").slice(11),
                isVisible: true,
              },
              flxAccountTypes: {
                onClick: scope.setDynamicFields.bind(this, "conditions"),
                isVisible: true,
              },
            }, ]
          ]
        ];
        this.view.segExpiryTypeValues.setData(segData);
      } catch (err) {
        var errorObj = {
          "level": "frmCreateAmendmentController",
          "method": "setSegementData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : showPopup
     * This function for showing and closing different popups.
     * @return : NA
     */
    showPopup: function(param, show) {
      if (kony.sdk.isNullOrUndefined(show)) {
        show = true;
      }
      this.view.flxLogout.setVisibility(false);
      this.view.flxViewSBLCDetailsPopup.setVisibility(false);
      this.view.flxCancelPopup.setVisibility(false);
      this.view.flxAddBenificiaryPopup.setVisibility(false);
      this.view.flxUploadDocumentPopup.setVisibility(false);
      this.view.flxDialogs.setVisibility(true && show);
      if (param === "lcdetails") {
        this.view.flxDialogs.height = "410%";
      } else if (param === "addben" || param === "editben") {
        this.view.flxDialogs.height = "150%";
      } else {
        this.view.flxDialogs.height = "100%";
      }
      switch (param) {
        case "cancel": {
          this.view.flxCancelPopup.setVisibility(true && show);
          break;
        }
        case "lcdetails": {
          this.view.flxViewSBLCDetailsPopup.setVisibility(true && show);
          break;
        }
        case "uploaddoc": {
          this.view.flxUploadDocumentPopup.setVisibility(true && show);
          break;
        }
        case "addben": {
          this.view.BeneficiaryDetails.showOrHideSwiftTags(false);
          this.view.flxAddBenificiaryPopup.setVisibility(true && show);
          break;
        }
        case "editben": {
          this.view.EditBeneficiaryDetails.showOrHideSwiftTags(false);
          this.view.flxEditBenDetailsPopup.setVisibility(true && show);
          break;
        }
      }
    },

    /**
     * @api : prefillBeneficiaries
     * This function for prefilling existing beneficiaries.
     * @return : NA
     */
    prefillBeneficiaries: function(benData) {
      for (i = 0; i < benData.length; i++) {
        this.addNewBenificiary(benData[i], false);
      }
    },

    /**
     * @api : addNewBenificiary
     * This function for adding new beneficiaries.
     * @return : NA
     */
    addNewBenificiary: function(data, newBenFlag) {
      var scope = this;
      try {
        benCount++;
        benIndex++;
        data.isChanged = true;
        let add1 = data.address1 !== "" ? data.address1 : "";
        let add2 = data.address2 !== "" ? "</br>" + data.address2 : "";
        let city = data.city !== "" ? "</br>" + data.city : "";
        let state = data.state !== "" ? "</br>" + data.state : "";
        let zip = data.zipcode !== "" ? ", " + data.zipcode : "";
        let country = data.country !== "" ? "</br>" + data.country : "";
        let status = "(" + kony.i18n.getLocalizedString("i18n.payments.addedBy").slice(0, 5) + ")";
        if (!kony.sdk.isNullOrUndefined(newBenFlag) && !newBenFlag) {
          status = "";
          data.isChanged = false;
        }
        if (benCount > 4) {
          this.view.btnAddNewBenificiary.setVisibility(false);
        } else {
          this.view.btnAddNewBenificiary.setVisibility(true);
        }
        if ((!beneficiaryList.has(data.payeeId) && beneficiaryList.has(data.beneficiaryName)) ||
          (beneficiaryList.has(data.payeeId))
        ) {
          benCount--;
          benIndex--;
          scope.updateBenificiary(data);
        } else {
          this.view.flxBenificiaryList.add(this.view.flxBeneficiary1.clone('B' + benIndex));
          var newBen = this.view['B' + benIndex + "flxBeneficiary1"];
          this.view.flxBenificiaryList.setVisibility(true);
          newBen.setVisibility(true);
          newBen['B' + benIndex + 'flxQuickActions1']['B' + benIndex + "btnEdit1"].onClick = scope.editBeneficiary.bind(this, data, newBen);
          newBen['B' + benIndex + 'flxQuickActions1']['B' + benIndex + "btnEdit1"].setVisibility(true);
          newBen['B' + benIndex + 'flxQuickActions1']['B' + benIndex + "btnRemove1"].onClick = scope.removeBeneficiary.bind(this, data, newBen);
          newBen['B' + benIndex + 'flxQuickActions1']['B' + benIndex + "btnRemove1"].setVisibility(true);
          newBen['B' + benIndex + "rtxBenAddress1"].text = add1 + add2 + city + state + zip + country;
          newBen['B' + benIndex + "rtxBenAddress1"].setVisibility(true);
          newBen['B' + benIndex + "flxBeneficiaryName1"]['B' + benIndex + "lblBeneficiaryName1"].text = data.beneficiaryName;
          newBen['B' + benIndex + "flxBeneficiaryName1"]['B' + benIndex + "lblBeneficiaryName1"].setVisibility(true);
          newBen['B' + benIndex + "flxBeneficiaryName1"]['B' + benIndex + "lblBeneficiaryStatus1"].text = status;
          newBen['B' + benIndex + "flxBeneficiaryName1"]['B' + benIndex + "lblBeneficiaryStatus1"].setVisibility(true);
          if (data.hasOwnProperty("id")) {
            data.payeeId = data.id;
          }
          let key = data.payeeId ? data.payeeId : data.beneficiaryName;
          beneficiaryList.set(key, data);
          scope.getUpdatedBeneficiaryList();
          scope.constructBeneficiarySegmentData();
        }
      } catch (err) {
        var errorObj = {
          "level": "frmCreateAmendmentController",
          "method": "addNewBenificiary",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : updateBenificiary
     * This function for adding new beneficiaries.
     * @return : NA
     */
    updateBenificiary: function(data) {
      var scope = this;
      try {
        let add1 = data.address1 !== "" ? data.address1 : "";
        let add2 = data.address2 !== "" ? "</br>" + data.address2 : "";
        let state = data.state !== "" ? "</br>" + data.state : "";
        let zip = data.zipcode !== "" ? "</br>" + data.zipcode : "";
        let country = data.country !== "" ? "</br>" + data.country : "";
        var status = "(" + kony.i18n.getLocalizedString("kony.mb.alert.UpdatedAddress").slice(0, 7) + ")";
        let id = editedBenDetails.id.slice(0, 2);
        if (data.beneficiaryName !== editedBenDetails[id + "flxBeneficiaryName1"][id + "lblBeneficiaryName1"].text) {
          beneficiaryList.delete(editedBenDetails[id + "flxBeneficiaryName1"][id + "lblBeneficiaryName1"].text);
        }
        editedBenDetails[id + 'flxQuickActions1'][id + "btnEdit1"].onClick = scope.editBeneficiary.bind(this, data, editedBenDetails);
        editedBenDetails[id + 'flxQuickActions1'][id + "btnEdit1"].setVisibility(true);
        editedBenDetails[id + 'flxQuickActions1'][id + "btnRemove1"].onClick = scope.removeBeneficiary.bind(this, data, editedBenDetails);
        editedBenDetails[id + 'flxQuickActions1'][id + "btnRemove1"].setVisibility(true);
        editedBenDetails[id + "rtxBenAddress1"].text = add1 + add2 + state + zip + country;
        editedBenDetails[id + "rtxBenAddress1"].setVisibility(true);
        editedBenDetails[id + "flxBeneficiaryName1"][id + "lblBeneficiaryName1"].text = data.beneficiaryName;
        editedBenDetails[id + "flxBeneficiaryName1"][id + "lblBeneficiaryName1"].setVisibility(true);
        if (data.hasOwnProperty(id)) data.payeeId = data.id;
        let key = data.payeeId ? data.payeeId : data.beneficiaryName;
        data.isChanged = true;
        beneficiaryList.set(key, data);
        editedBenDetails[id + "flxBeneficiaryName1"][id + "lblBeneficiaryStatus1"].text = status;
        scope.getUpdatedBeneficiaryList();
        scope.constructBeneficiarySegmentData();
      } catch (err) {
        var errorObj = {
          "level": "frmCreateAmendmentController",
          "method": "updateBenificiary",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : editBeneficiary
     * This function for editing beneficiary details.
     * @return : NA
     */
    editBeneficiary: function(data, benDetails) {
      var scope = this;
      try {
        this.showPopup("editben");
        this.constructBeneficiarySegmentData();
        this.view.EditBeneficiaryDetails.preFillDataForEdit(data);
        scope.enableOrDisableButton(scope.view.btnUpdate, true);
        editedBenDetails = benDetails;
        dataBeforeEditing = data;
        scope.getUpdatedBeneficiaryList();
        scope.constructBeneficiarySegmentData();
      } catch (err) {
        var errorObj = {
          "level": "frmCreateAmendmentController",
          "method": "editBeneficiary",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : removeBeneficiary
     * This function to remove beneficiary details.
     * @return : NA
     */
    removeBeneficiary: function (data, param) {
      var scope = this;
      try {
        let key = data.payeeId ? data.payeeId : data.beneficiaryName;
        beneficiaryList.delete(key);
        this.view.flxBenificiaryList.remove(param);
        benCount--;
        if (benCount < 5) {
          this.view.btnAddNewBenificiary.setVisibility(true);
        } else {
          this.view.btnAddNewBenificiary.setVisibility(false);
        }
        scope.getUpdatedBeneficiaryList();
        scope.constructBeneficiarySegmentData();
      } catch (err) {
        var errorObj = {
          "level": "frmCreateAmendmentController",
          "method": "removeBeneficiary",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : constructBeneficiarySegmentData
     * This function for constructing beneficiary details.
     * @return : NA
     */
    constructBeneficiarySegmentData: function() {
      let segData = [];
      let beneficiaryListData = updatedBeneficiaries.length == 0 ? beneficiaries : updatedBeneficiaries;
      const beneficiaryMapping = {
        'sameBank': kony.i18n.getLocalizedString('kony.mb.approvalsAndRequest.filter.sameBank'),
        'domestic': kony.i18n.getLocalizedString('i18n.ProfileManagement.Domestic'),
        'international': kony.i18n.getLocalizedString('i18n.ProfileManagement.International'),
        'trade': kony.i18n.getLocalizedString('i18n.TradeFinance.tradeBeneficiary')
      };
      beneficiaryListData.forEach(row => {
        row['flxBeneficiaryList'] = {
          'skin': 'slFbox'
        };
        row['lblBeneficiary'] = {
          'text': row.accountNumber ? (row.beneficiaryName + '...' + row.accountNumber.slice(-4)) : row.beneficiaryName
        };
        row['flxBankName'] = {
          'isVisible': row.bankName ? true : false
        };
        row['lblBankName'] = {
          'text': row.bankName || ''
        };
        row['imgBank'] = {
          'isVisible': false
        };
      });
      const groupedBeneficiaryData = this.groupBeneficiaryData(beneficiaryListData);
      for (const key in beneficiaryMapping) {
        if (!groupedBeneficiaryData[key] || groupedBeneficiaryData[key].length === 0) continue;
        segData.push([{
            'lblHeading': beneficiaryMapping[key] + ' (' + groupedBeneficiaryData[key].length + ')'
          },
          groupedBeneficiaryData[key]
        ]);
      }
      beneficiaryListData = segData;
      this.view.BeneficiaryDetails.setData(beneficiaryListData);
      this.view.EditBeneficiaryDetails.setData(beneficiaryListData);
    },

    /**
     * @api : groupBeneficiaryData
     * This function for grouping beneficiary data.
     * @return : NA
     */
    groupBeneficiaryData: function(data) {
      return data.reduce(function(acc, obj) {
        (acc[obj['payeeType']] = acc[obj['payeeType']] || []).push(obj);
        return acc;
      }, {});
    },

    /**
     * @api : toggleCheckBoxClick
     * This function for checkbox clicks.
     * @return : NA
     */
    toggleCheckBoxClick: function(param, labelStatus) {
      try {
        if (labelStatus.text == "D") {
          labelStatus.text = "C";
          this.showExpandedView(param, true);
        } else {
          labelStatus.text = "D";
          this.showExpandedView(param, false);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmCreateAmendmentController",
          "method": "toggleCheckBoxClick",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : storeReferenceValues
     * This function for storing ref values.
     * @return : NA
     */
    storeReferenceValues: function(key) {
      documentsList.push(document);
      docReferenceValues.push(key);
      this.setAttachmentsDataToSegment();
    },

    /**
     * @api : tryAgainBrowse
     * This function for retry upload.
     * @return : NA
     */
    tryAgainBrowse: function() {
      this.togglePopup(false, "flxUploadDocumentPopup");
      this.browseSupportingDocument();
    },

    /**
     * @api : togglePopup
     * This function for popup show.
     * @return : NA
     */
    togglePopup: function(visibility, flxpopup) {
      this.view.flxDialogs.setVisibility(visibility);
      this.view[flxpopup].setVisibility(visibility);
    },

    /**
     * @api : toggleUploadDocumentInfoPopup
     * This function for toggling upload info popup.
     * @return : NA
     */
    toggleUploadDocumentInfoPopup: function(visibility) {
      this.view.flxInfoUploadMsg.setVisibility(visibility);
    },

    /**
     * @api : browseSupportingDocument
     * This function for checking the supported docs.
     * @return : NA
     */
    browseSupportingDocument: function() {
      var scope = this;
      try {
        var config = {
          selectMultipleFiles: false,
          filter: ["application/pdf", "image/jpeg", "image/png", "image/bmp", "application/x-zip-compressed", "application/msword", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel", ".csv"]
        };
        if (documentsList.length >= this.presenter.guaranteeConfig.documentsLimit) {
          scope.view.UploadDocumentPopup.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AttachmentLimitExceededErrorMsg");
          scope.togglePopup(true, 'uploadDocument');
          return;
        }
        kony.io.FileSystem.browse(config, scope.selectedFileCallback);
      } catch (err) {
        var errorObj = {
          "level": "frmCreateAmendmentController",
          "method": "browseSupportingDocument",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : selectedFileCallback
     * This callback function for upload doc.
     * @return : NA
     */
    selectedFileCallback: function(events, files) {
      var scope = this;
      try {
        let extensions = this.presenter.guaranteeConfig.fileExtensions;
        if (files.length > 0) {
          let extension = files[0].file.name.split('.').pop();
          if (extension && !extensions.hasOwnProperty(extension)) {
            scope.togglePopup(true, 'flxUploadDocumentPopup');
            scope.view.UploadDocumentPopup.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.TransfersEur.AttachmentTypeErrorMsg1") + " " + files[0].name + " " + kony.i18n.getLocalizedString("i18n.TransfersEur.AttachmentTypeErrorMsg2");
            return;
          }
          if (files[0].file.size >= scope.presenter.guaranteeConfig.documentMaxSize) {
            scope.togglePopup(true, 'flxUploadDocumentPopup');
            scope.view.UploadDocumentPopup.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.TransfersEur.AttachmentTypeErrorMsg1") + " " + files[0].name + " " + kony.i18n.getLocalizedString("i18n.TradeFinance.AttachmentExceededSizeErrorMsg");
            return;
          }
          var fileData = {};
          scope.togglePopup(false, "flxUploadDocumentPopup");
          document = [files[0].name, extensions[extension]];
          fileData.fileName = files[0].name;
          fileData.fileType = files[0].file.type;
          scope.getBase64(files[0].file, function(base64String) {
            fileData.fileContents = base64String.split(';base64,')[1];
            let fileDataItemParsed = [fileData.fileName, fileData.fileType, fileData.fileContents].join('~');
            scope.presenter.uploadDocument(fileDataItemParsed, scope.view.id);
          });
        }
        scope.view.forceLayout();
      } catch (err) {
        var errorObj = {
          "level": "frmCreateAmendmentController",
          "method": "selectedFileCallback",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : getBase64
     * getBase64 value
     * @return : NA
     */
    getBase64: function(file, successCallback) {
      var reader = new FileReader();
      reader.onloadend = function() {
        successCallback(reader.result);
      };
      reader.readAsDataURL(file);
    },

    /**
     * @api : setAttachmentsDataToSegment
     * On row click of segDropdownListCurrency
     * @arg: NA
     * @return : NA
     */
    setAttachmentsDataToSegment: function() {
      var scope = this;
      try {
        if (documentsList.length === 0) {
          scope.view.segDocuments.removeAll();
          this.view.flxSegDocuments.setVisibility(false);
          this.view.btnUploadNewFile.setVisibility(false);
          scope.toggleCheckBoxClick("upload", this.view.lblCheckBoxUploadDocuments);
          return;
        }
        this.view.flxSegDocuments.setVisibility(true);
        this.view.btnUploadNewFile.setVisibility(true);
        let segData = [];
        for (let document of documentsList) {
          segData.push({
            "imgPDF": {
              src: document[1] || 'aa_password_error.png'
            },
            "lblDocumentName": {
              text: document[0],
              toolTip: document[0]
            },
            "lblDelete": {
              text: "S"
            },
            "flxDelete": {
              onClick: scope.deleteAttachment.bind(scope),
              cursorType: "pointer"
            },
            "template": "flxExportLCDrawingsUploadDocument"
          });
        }
        scope.view.segDocuments.widgetDataMap = {
          "imgPDF": "imgPDF",
          "lblDocumentName": "lblDocumentName",
          "lblDelete": "lblDelete",
          "flxDelete": "flxDelete"
        };
        scope.view.segDocuments.setData(segData);
        scope.view.forceLayout();
        scope.enableOrDisableContinue();
      } catch (err) {
        var errorObj = {
          "level": "frmCreateAmendmentController",
          "method": "setAttachmentsDataToSegment",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : deleteAttachment
     * This function for deleting attachements from segment.
     * @return : NA
     */
    deleteAttachment: function() {
      var scope = this;
      try {
        let scope = this;
        deletedIndex = this.view.segDocuments.selectedRowIndex[1];
        scope.presenter.deleteDocument(docReferenceValues[deletedIndex], this.view.id);
        scope.togglePopup(false, "flxUploadDocumentPopup");
      } catch (err) {
        var errorObj = {
          "level": "frmCreateAmendmentController",
          "method": "deleteAttachment",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : removeDocumentReference
     * This function for removing attachements reference in cache.
     * @return : NA
     */
    removeDocumentReference: function() {
      var scope = this;
      try {
        documentsList.splice(deletedIndex, 1);
        docReferenceValues.splice(deletedIndex, 1);
        scope.setAttachmentsDataToSegment();
      } catch (err) {
        var errorObj = {
          "level": "frmCreateAmendmentController",
          "method": "removeDocumentReference",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : buttonNavigation
     * This function for navigation on button clicks.
     * @return : NA
     */
    buttonNavigation: function(param, data) {
      this.navManager = applicationManager.getNavigationManager();
      let formName = "";
      let sendData = "";
      switch (param) {
        case "cancel": {
          formName = "frmGuaranteesLCDashboard";
          break;
        }
        case "submit": {
          formName = "frmAmendmentAcknowledgement";
          sendData = data;
          break;
        }
      }
      this.navManager.navigateTo({
        appName: "TradeFinanceMA",
        friendlyName: formName
      }, false, sendData);
    },

    /**
     * @api : showExpiryTypeSegment
     * Show or hide segment.
     * @return : NA
     */
    showExpiryTypeSegment: function() {
      if (this.view.lblDropDown.text === "O") {
        this.view.lblDropDown.text = "P";
        this.view.flxSegExpiryTypeValues.setVisibility(true);
      } else {
        this.view.lblDropDown.text = "O";
        this.view.flxSegExpiryTypeValues.setVisibility(false);
      }
    },

    /**
     * @api : setDynamicFields
     * Set UI as per selected option.
     * @return : NA
     */
    setDynamicFields: function(param) {
      var scope = this;
      try {
        switch (param) {
          case "open": {
            this.view.flxExpiryTypeDynamicFields.setVisibility(false);
            this.view.tbxExpiryCondition.text = "";
            this.view.lblSelectHere.text = kony.i18n.getLocalizedString("i18n.TradeFinance.openEnded");
            break;
          }
          case "date": {
            this.view.flxExpiryTypeDynamicFields.setVisibility(true);
            this.view.lblExpiryDateHeader.text = kony.i18n.getLocalizedString("i18n.ImportLC.ExpiryDate");
            this.view.flxExpiryDateDynamic.setVisibility(true);
            this.view.flxExpiryConditionDynamic.setVisibility(false);
            this.view.tbxExpiryCondition.text = "";
            this.view.expiryDate.left = "0dp";
            this.view.lblSelectHere.text = kony.i18n.getLocalizedString("i18n.konybb.Common.Date");
            break;
          }
          case "conditions": {
            this.view.lblExpiryDateHeader.text = kony.i18n.getLocalizedString("i18n.ImportLC.ExpiryDate") + " (" + kony.i18n.getLocalizedString("kony.mb.common.optional") + ")";
            this.view.flxExpiryTypeDynamicFields.setVisibility(true);
            this.view.flxExpiryDateDynamic.setVisibility(true);
            this.view.flxExpiryConditionDynamic.setVisibility(true);
            this.view.expiryDate.left = "0dp";
            this.view.lblSelectHere.text = kony.i18n.getLocalizedString("i18n.ExportLC.AdditionalConditions").slice(11);
            break;
          }
        }
        this.showExpiryTypeSegment();
        this.enableOrDisableContinue();
        this.view.flxSegExpiryTypeValues.setVisibility(false);
      } catch (err) {
        var errorObj = {
          "level": "frmCreateAmendmentController",
          "method": "setDynamicFields",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setGuaranteeDetails
     * Set UI as per initial screen.
     * @return : NA
     */
    setGuaranteeDetails: function () {
      var scope = this;
      try {
        const guarantee = lcData.LCDetails;
        let instructingPartyValue = guarantee.instructingParty ? guarantee.instructingParty.replace(/\[|\]/g, '') : NA;
        this.view.lblBeneficiaryDetailsValue.text = guarantee.beneficiaryName || NA;
        this.view.lblTransRefValue.text = guarantee.relatedTransactionReference || guarantee.guaranteesSRMSId || NA;
        this.view.lblProductTypeValue.text = guarantee.productType || NA;
        this.view.lblBillTypeValue.text = guarantee.guaranteeAndSBLCType || NA;
        this.view.lblAmountValue.text = (guarantee.currency && guarantee.amount) ? `${guarantee.currency} ${applicationManager.getFormatUtilManager().formatAmount(guarantee.amount)}` : NA;
        this.view.lblIssueDateValue.text = guarantee.issueDate || NA;
        this.view.lblExpiryTypeValue.text = guarantee.expiryType || NA;
        this.view.lblExpiryDateValue.text = guarantee.expiryDate || NA;
        if (!guarantee.instructingParty) {
          this.view.lblInstructingPartyValue.text = NA;
        } else {
          this.view.lblInstructingPartyValue.text = (this.isJSON(guarantee.instructingParty)) ? JSON.parse(instructingPartyValue.replace(/\'/g, "\"")).contractId : guarantee.instructingParty;
        }
        this.view.lblApplicantPartyValue.text = guarantee.applicantParty || NA;
        this.view.lblAmendmentNumberValue.text = guarantee.amendmentNo ? (JSON.parse(guarantee.amendmentNo.replace(/'/g, "\"")).amendmentNo) ? (Number(JSON.parse(guarantee.amendmentNo.replace(/'/g, "\"")).amendmentNo) + 1).toString() : guarantee.amendmentNo : "1"
        this.view.lblCurrencySymbol.text = guarantee.currency;
        let benlistValues = kony.sdk.isNullOrUndefined(guarantee.beneficiaryDetails) || guarantee.beneficiaryDetails === "" ? NA : JSON.parse(guarantee.beneficiaryDetails.replace(/'/g, "\""));
        this.view.GuaranteeDetails.setContext({
          data: guarantee,
          showSwiftTags: false
        });
        if (benlistValues.length > 0) {
          scope.prefillBeneficiaries(benlistValues);
          scope.toggleCheckBoxClick("benlist", this.view.lblCheckBoxBeneficiaryDetails);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmCreateAmendmentController",
          "method": "setGuaranteeDetails",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setReviseFlowUI
     * Set UI forr revise screen.
     * @return : NA
     */
    setReviseFlowUI: function(param) {
      this.view.flxReviseAmendDetails.setVisibility(param);
      this.view.flxAmendDetailsValue.setVisibility(!param);
      this.view.flxAmendmentSeparator.setVisibility(!param);
    },

    /**
     * @api : prefillReviseData
     * Set Data for revise screen.
     * @return : NA
     */
    prefillReviseData: function() {
      var scope = this;
      try {
        if (!kony.sdk.isNullOrUndefined(lcData.supportingDocument)) {
          const extensions = this.presenter.guaranteeConfig.fileExtensions;
          let documentNames = [];
          let amendDocs = JSON.parse(lcData.supportingDocument.replace(/'/g, "\""));
          for(i=0; i<amendDocs.length; i++){
            docReferenceValues.push(amendDocs[i]["documentReferences"]);
            documentNames.push(amendDocs[i]["documentName"]);
          }
          documentsList = documentNames.map(d => [d, extensions[d.split('.').pop()]]);
          this.setAttachmentsDataToSegment();
          scope.toggleCheckBoxClick("upload", this.view.lblCheckBoxUploadDocuments);
      }
        if (lcData.amendAmount) {
          scope.view.tbxAmount.text = lcData.amendAmount;
          scope.view.lblCurrencySymbol.text = lcData.amendCurrency ? lcData.amendCurrency : lcData.LCDetails.currency;
          scope.toggleCheckBoxClick("lcamount", this.view.lblCheckBoxLCAmount);
        }
        if (lcData.amendDetails) {
          scope.view.txtAmendmentDetails.text = lcData.amendDetails;
          scope.toggleCheckBoxClick("amenddetails", this.view.lblCheckBoxOtherAmendments);
        }
        if (lcData.amendCharges) {
          scope.view.txtAmendmentCharges.text = lcData.amendCharges;
          scope.toggleCheckBoxClick("charges", this.view.lblCheckBoxAmendmentCharges);
        }
        if (lcData.messageToBank) {
          scope.view.txtMessageToBank.text = lcData.messageToBank;
          scope.toggleCheckBoxClick("returnmessage", this.view.lblCheckBoxMessageToBank);
        }
        if (lcData.amendExpiryType) {
          scope.view.lblSelectHere.text = lcData.amendExpiryType;
          if (lcData.amendExpiryType === kony.i18n.getLocalizedString("i18n.TradeFinance.openEnded")) {
            scope.setDynamicFields("open");
          }
          if (lcData.amendExpiryType === kony.i18n.getLocalizedString("i18n.konybb.Common.Date")) {
            scope.setDynamicFields("date");
            var expiryDateFormatted = lcData.amendExpiryDate ? CommonUtilities.getDateAndTimeInUTC(lcData.amendExpiryDate).substr(0, 10) : "";
            this.view.expiryDate.left = "0dp";
            this.view.expiryDate.setText(expiryDateFormatted);
          }
          if (lcData.amendExpiryType === kony.i18n.getLocalizedString("i18n.ExportLC.AdditionalConditions").slice(11)) {
            scope.setDynamicFields("conditions");
            var expiryDateFormatted = lcData.amendExpiryDate ? CommonUtilities.getDateAndTimeInUTC(lcData.amendExpiryDate).substr(0, 10) : "";
            this.view.expiryDate.setText(expiryDateFormatted);
            lcData.expiryCondition ? this.view.tbxExpiryCondition.text = lcData.expiryCondition : this.view.tbxExpiryCondition.text = "";
          }
          scope.toggleCheckBoxClick("expirytype", this.view.lblCheckBoxExpiryType);

        }
        if (lcData.amendmentEffectiveDate) {
          this.disableOldDaySelection(scope.view.calEffectiveDate, lcData.amendmentEffectiveDate);
        }
        this.setReviseAmendDetails();
        this.enableOrDisableContinue();

      } catch (err) {
        var errorObj = {
          "level": "frmCreateAmendmentController",
          "method": "prefillReviseData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setReviseAmendDetails
     * Set UI as per revise flow.
     * @return : NA
     */
    setReviseAmendDetails: function() {
      var scope = this;
      try {
        var breakpoint = kony.application.getCurrentBreakpoint();
        var orientationHandler = new OrientationHandler();
        if (breakpoint === 1024 || orientationHandler.isTablet) {
          scope.view.segReviseAmendDetails.rowTemplate = "flxAmendRowTemplateTablet";
        } else {
          scope.view.segReviseAmendDetails.rowTemplate = "flxAmendRowTemplate";
        }
        scope.view.segReviseAmendDetails.widgetDataMap = {
          "flxAmendmentRowTemplate": "flxAmendmentRowTemplate",
          "flxAmendmentRowTemplateTablet": "flxAmendmentRowTemplateTablet",
          "flxreviewRows": "flxreviewRows",
          "lblReview": "lblReview",
          "flxReviewRight": "flxReviewRight",
          "flxReviewValues": "flxReviewValues",
          "lblReviewValue1": "lblReviewValue1"
        };
        let segAmendmentDetails = [{
          lblReview: {
            text: kony.i18n.getLocalizedString("i18n.billPay.Status") + ":"
          },
          lblReviewValue1: {
            text: lcData.amendStatus ? lcData.amendStatus : NA,
            skin: lcData.amendStatus.toLowerCase() === (OLBConstants.GUARANTEE_LC_STATUS.RETURNED_BY_BANK).toLowerCase() ? "bblblskn424242Bold" : "bbSknLbl424242SSP15Px"
          }
        }, {
          lblReview: {
            text: lcData.amendStatus.toLowerCase() === (OLBConstants.GUARANTEE_LC_STATUS.REJECTED_BY_BANK).toLowerCase() ? kony.i18n.getLocalizedString("i18n.TradeFinance.rejectedReason") + ":" : kony.i18n.getLocalizedString("i18n.TradeFinance.reasonForReturned") + ":"
          },
          lblReviewValue1: {
            text: lcData.amendStatus.toLowerCase() === (OLBConstants.GUARANTEE_LC_STATUS.REJECTED_BY_BANK).toLowerCase() ? lcData.rejectedReason ? lcData.rejectedReason : NA : lcData.reasonForReturned ? lcData.reasonForReturned : NA
          },

          flxreviewRows: {
            isVisible: lcData.amendStatus.toLowerCase() === (OLBConstants.GUARANTEE_LC_STATUS.REJECTED_BY_BANK).toLowerCase() || lcData.amendStatus.toLowerCase() === (OLBConstants.GUARANTEE_LC_STATUS.RETURNED_BY_BANK).toLowerCase() ? true : false
          }
        }, {
          lblReview: {
            text: lcData.amendStatus.toLowerCase() === (OLBConstants.GUARANTEE_LC_STATUS.REJECTED_BY_BANK).toLowerCase() ? kony.i18n.getLocalizedString("i18n.TradeFinance.RejectedDate") + ":" : lcData.amendStatus.toLowerCase() === (OLBConstants.GUARANTEE_LC_STATUS.APPROVED).toLowerCase() ? kony.i18n.getLocalizedString("i18n.TradeFinance.ApprovedDate") + ":" : NA
          },
          lblReviewValue1: {
            text: lcData.amendStatus.toLowerCase() === (OLBConstants.GUARANTEE_LC_STATUS.REJECTED_BY_BANK).toLowerCase() ? lcData.rejectedDate ? lcData.rejectedDate : NA : lcData.approvedDate ? lcData.approvedDate : NA
          },
          flxreviewRows: {
            isVisible: lcData.amendStatus.toLowerCase() === (OLBConstants.GUARANTEE_LC_STATUS.APPROVED).toLowerCase() || lcData.amendStatus.toLowerCase() === (OLBConstants.GUARANTEE_LC_STATUS.REJECTED_BY_BANK).toLowerCase() ? true : false
          }
        }, {
          lblReview: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentNo") + ":"
          },
          lblReviewValue1: {
            text: lcData.amendmentNo ? lcData.amendmentNo : NA
          }
        }, {
          lblReview: {
            text: kony.i18n.getLocalizedString("i18n.serviceRequests.RequestedDate") + ":"
          },
          lblReviewValue1: {
            text: lcData.amendRequestedDate ? CommonUtilities.getFrontendDateStringInUTC(lcData.amendRequestedDate, applicationManager.getConfigurationManager().getConfigurationValue("frontendDateFormat")) : NA
          }
        }, {
          lblReview: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentReference") + ":"
          },
          lblReviewValue1: {
            text: lcData.amendmentReference ? lcData.amendmentReference : NA
          }
        }];
        scope.view.segReviseAmendDetails.setData(segAmendmentDetails);
      } catch (err) {
        var errorObj = {
          "level": "frmViewAmendmentDetailsController",
          "method": "setReviseAmendDetails",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    
    /**
     * @api : setReviewScreenOrMainScreen
     * Set UI as per review screen.
     * @return : NA
     */
    setReviewScreenOrMainScreen: function(param) {
      var scope = this;
      let flag = true;
      this.view.lblHeading.text = kony.i18n.getLocalizedString("i18n.TradeFinance.IssuedGTAndSBLC") + " - " + kony.i18n.getLocalizedString("i18n.TradeFinance.CreateNewAmendment") + " - " + kony.i18n.getLocalizedString("i18n.kony.BulkPayments.ViewRequests");
      if (param === "main") {
        this.view.lblHeading.text = kony.i18n.getLocalizedString("i18n.TradeFinance.IssuedGTAndSBLC") + " - " + kony.i18n.getLocalizedString("i18n.TradeFinance.CreateNewAmendment");
        this.view.flxErrorMessage.setVisibility(false);
        flag = false;
      }
      try {
        this.view.flxActionButtons.setVisibility(!flag);
        this.view.flxReviewActionButtons.setVisibility(flag);
        this.view.flxAmendmentRequest.setVisibility(flag);
        this.view.flxAmendDetailsValue.setVisibility(flag && !isReviseFlow); //do not show in case of revise flow
        this.view.flxAmendmentSeparator.setVisibility(flag && !isReviseFlow); //do not show in case of revise flow
        this.view.flxAmendRequiredFields.setVisibility(!flag);
        payLoaddata = this.createPayload(flag);
        this.setReviewSegementData(flag, payLoaddata);
      } catch (err) {
        var errorObj = {
          "level": "frmCreateAmendmentController",
          "method": "setReviewScreenOrMainScreen",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setReviewSegementData
     * sets Data for review page.
     * @param: flag shows whether it is main screen or review screen.
     * @param: payloadData is the data to be set in review screen.
     * @return : NA
     */
    setReviewSegementData: function(flag, payloadData) {
      var scope = this;
      try {
        if (!flag) {} else {
          benData = kony.sdk.isNullOrUndefined(payloadData.beneficiaryDetails) || payloadData.beneficiaryDetails === "" ? "" : JSON.parse(payloadData.beneficiaryDetails);
          docData = kony.sdk.isNullOrUndefined(payloadData.supportingDocument) || payloadData.supportingDocument === "" ? "" : JSON.parse(payloadData.supportingDocument);
          this.view.segAmendmentRequestedDetails.widgetDataMap = {
            "flxAmendmentRowTemplate": "flxAmendmentRowTemplate",
            "flxreviewRows": "flxreviewRows",
            "lblReview": "lblReview",
            "flxReviewRight": "flxReviewRight",
            "flxReviewValues": "flxReviewValues",
            "lblReviewValue1": "lblReviewValue1",
            "flxReviewUploadDocumentsRowTemplate": "flxReviewUploadDocumentsRowTemplate",
            "lblReviewLeft": "lblReviewLeft",
            "flxDocument": "flxDocument",
            "imgDownloadIcon": "imgDownloadIcon",
            "lblDocumentName": "lblDocumentName",
            "flxRowTemplateSeparator": "flxRowTemplateSeparator",
            "flxReviewDetailsRowTemplate": "flxReviewDetailsRowTemplate",
            "flxDetails": "flxDetails",
            "flxHeading": "flxHeading",
            "lblHeading1": "lblHeading1",
            "lblHeading2": "lblHeading2",
            "lblDetailsRow1": "lblDetailsRow1",
            "lblDetailsRow2": "lblDetailsRow2",
            "lblDetailsRow3": "lblDetailsRow3",
            "lblDetailsRow4": "lblDetailsRow4",
            "template": "template"
          };
          let amendmentRequestedDetails = [];
          let amendDate = {
            lblReview: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentEffectiveDate") + ":"
            },
            lblReviewValue1: {
              text: kony.sdk.isNullOrUndefined(payloadData.formattedAmendmentEffectiveDate) || payloadData.formattedAmendmentEffectiveDate === "" ? NA : payloadData.formattedAmendmentEffectiveDate
            },
            template: "flxAmendRowTemplate"
          };
          let amount = {
            lblReview: {
              text: kony.i18n.getLocalizedString("i18n.konybb.Common.Amount") + ":"
            },
            lblReviewValue1: {
              text: kony.sdk.isNullOrUndefined(payloadData.amendAmount) || payloadData.amendAmount === "" ? NA : payloadData.currency + " " + payloadData.amendAmount,
            },
            template: "flxAmendRowTemplate"
          };
          let expiryType = {
            lblReview: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.expiryType") + ":"
            },
            lblReviewValue1: {
              text: kony.sdk.isNullOrUndefined(payloadData.amendExpiryType) || payloadData.amendExpiryType === "" ? NA : payloadData.amendExpiryType,
            },
            template: "flxAmendRowTemplate"
          };
          amendmentRequestedDetails.push(amendDate);
          amendmentRequestedDetails.push(amount);
          amendmentRequestedDetails.push(expiryType);

          if (payloadData.amendExpiryType === kony.i18n.getLocalizedString("i18n.konybb.Common.Date")) {
            let expiryDate = {
              lblReview: {
                text: kony.i18n.getLocalizedString("i18n.ImportLC.ExpiryDate") + ":"
              },
              lblReviewValue1: {
                text: kony.sdk.isNullOrUndefined(payloadData.amendExpiryDate) || payloadData.amendExpiryDate === "" ? NA : payloadData.amendExpiryDate,
              },
              template: "flxAmendRowTemplate"
            };
            amendmentRequestedDetails.push(expiryDate);
          }
          if (payloadData.amendExpiryType === kony.i18n.getLocalizedString("i18n.ExportLC.AdditionalConditions").slice(11)) {
            if (kony.sdk.isNullOrUndefined(payloadData.amendExpiryDate) || payloadData.amendExpiryDate === "") {
              //don't add the expiryDate field as it is empty and is optional.
            } else {
              let expiryDate = {
                lblReview: {
                  text: kony.i18n.getLocalizedString("i18n.ImportLC.ExpiryDate") + ":"
                },
                lblReviewValue1: {
                  text: kony.sdk.isNullOrUndefined(payloadData.amendExpiryDate) || payloadData.amendExpiryDate === "" ? NA : payloadData.amendExpiryDate,
                },
                template: "flxAmendRowTemplate"
              };
              amendmentRequestedDetails.push(expiryDate);
            }
            let expiryCondition = {
              lblReview: {
                text: kony.i18n.getLocalizedString("i18n.TradeFinance.expiryConditionOptional").slice(0, 16) + ":"
              },
              lblReviewValue1: {
                text: kony.sdk.isNullOrUndefined(payloadData.amendExpiryCondition) || payloadData.amendExpiryCondition === "" ? NA : payloadData.amendExpiryCondition,
              },
              template: "flxAmendRowTemplate"
            };
            amendmentRequestedDetails.push(expiryCondition);
          }

          for (let i = 0; i < benData.length; i++) {
            let data = {
              lblReviewLeft: {
                text: i === 0 ? kony.i18n.getLocalizedString("i18n.TradeFinance.BeneficiaryDetails") + ":" : ""
              },
              lblHeading1: {
                text: benData[i].beneficiaryName,
                skin: benData[i].isChanged ? "bblblskn424242Bold" : "bbSknLbl424242SSP15Px"
              },
              lblHeading2: {
                text: benData[i].beneficiaryName,
                isVisible: false
              },
              lblDetailsRow1: {
                text: benData[i].address1,
                isVisible: true
              },
              lblDetailsRow2: {
                text: benData[i].address2,
                isVisible: true
              },
              lblDetailsRow3: {
                text: benData[i].state,
                isVisible: true
              },
              lblDetailsRow4: {
                text:  benData[i].zipcode && benData[i].zipcode!= "" ? benData[i].city + ", " + benData[i].zipcode : benData[i].city ,
                isVisible: true
              },
              flxreviewRows: {
                left: "17dp"
              },
              template: "flxReviewDetailsRowTemplate"
            }
            amendmentRequestedDetails.push(data);
          }
          let otherAmend = {
            lblReview: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.OtherAmendmentDetails") + ":"
            },
            lblReviewValue1: {
              text: kony.sdk.isNullOrUndefined(payloadData.amendDetails) || payloadData.amendDetails === "" ? NA : payloadData.amendDetails,
              skin: "ICSKNLbl42424215PxWordBreak"
            },
            template: "flxAmendRowTemplate"
          };
          let chargesData = {
            lblReview: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentCharges") + ":"
            },
            lblReviewValue1: {
              text: kony.sdk.isNullOrUndefined(payloadData.amendCharges) || payloadData.amendCharges === "" ? NA : payloadData.currency + " " + applicationManager.getFormatUtilManager().formatAmount(payloadData.amendCharges),
              skin: "ICSKNLbl42424215PxWordBreak"
            },
            template: "flxAmendRowTemplate"
          };
          amendmentRequestedDetails.push(otherAmend);
          amendmentRequestedDetails.push(chargesData);
          for (let i = 0; i < docData.length; i++) {
            data = {
              lblReviewLeft: {
                text: i === 0 ? kony.i18n.getLocalizedString("i18n.TradeFinance.UploadDocuments") + ":" : ""
              },
              lblDocumentName: {
                text: docData[i].documentName
              },
              flxreviewRows: {
                isVisible: docData.length > 0 ? true : false
              },
              template: "flxReviewUploadDocumentsRowTemplate"
            }
            amendmentRequestedDetails.push(data);
          }
          let messageToBank = {
            lblReview: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.MessageToBankDrawings") + ":"
            },
            lblReviewValue1: {
              text: kony.sdk.isNullOrUndefined(payloadData.messageToBank) || payloadData.messageToBank === "" ? NA : payloadData.messageToBank,
              skin: "ICSKNLbl42424215PxWordBreak"
            },
            template: "flxAmendRowTemplate"
          };
          amendmentRequestedDetails.push(messageToBank);
          this.view.segAmendmentRequestedDetails.setData(amendmentRequestedDetails);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmCreateAmendmentController",
          "method": "setReviewSegementData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : getTodayDate
     * To get today date
     * @return : NA
     */
    getTodayDate: function() {
      var scope = this;
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();
      today = mm + '/' + dd + '/' + yyyy;
      return today;
    },

    /**
     * @api : checkdate
     * vchecking whether the entered date is valid or not
     * @return : NA */
    checkDate: function(widgetName, val, errLabel) {
      if (val === "expiry") {
        this.view.expiryDate.lblDatePlaceholderKA.isVisible = true;
      }
      var dateArr = widgetName.text.split("/");
      var todayDate = this.getTodayDate();
      var month = parseInt(dateArr[0]);
      let monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if (month > 12 || month < 1) {
        errLabel.isVisible = true;
        widgetName.skin = "ICSknTextBoxEE0005";
        this.enableOrDisableContinue();
        return;
      }
      var date = parseInt(dateArr[1]);
      let year = parseInt(dateArr[2]);
      if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
        monthLength[1] = 29;
      }
      if (date > monthLength[month - 1] || date < 1) {
        errLabel.isVisible = true;
        widgetName.skin = "ICSknTextBoxEE0005";
        this.enableOrDisableContinue();
        return;
      }
      if (Date.parse(widgetName.text) < Date.parse(todayDate)) {
        errLabel.isVisible = true;
        widgetName.skin = "ICSknTextBoxEE0005";
        this.enableOrDisableContinue();
        return;
      }
      errLabel.isVisible = false;
      widgetName.skin = "skntbxSSP42424215pxnoborder";
      this.enableOrDisableContinue();
    },

    /**
     * @api : onError
     * Error thrown from catch block in component and shown on the form
     * @return : NA
     */
    onError: function(err) {
      var errMsg = JSON.stringify(err);
    },

    /**
     * @api : enableOrDisableContinue
     * Enables or disables the continue button.
     * @return : NA
     */
    enableOrDisableContinue: function() {
      var scope = this;
      try {
        if (
          ((this.view.lblCheckBoxLCAmount.text === "C" && this.view.tbxAmount.text != "" || this.view.lblCheckBoxLCAmount.text === "D")) &&
          ((this.view.lblCheckBoxExpiryType.text === "C" && (
              (this.view.lblSelectHere.text === kony.i18n.getLocalizedString("i18n.TradeFinance.openEnded")) ||
              (this.view.lblSelectHere.text === kony.i18n.getLocalizedString("i18n.konybb.Common.Date") && this.view.expiryDate.lblEnteredDateKA.text !== "" && this.view.expiryDate.tbxDateInputKA.skin !== "ICSknTextBoxEE0005") ||
              (this.view.lblSelectHere.text === kony.i18n.getLocalizedString("i18n.ExportLC.AdditionalConditions").slice(11) && this.view.tbxExpiryCondition.text !== "" && this.view.expiryDate.tbxDateInputKA.skin !== "ICSknTextBoxEE0005"))) ||
            this.view.lblCheckBoxExpiryType.text === "D") &&
          ((this.view.lblCheckBoxLCAmount.text === "C" && this.view.tbxAmount.text != "") || this.view.lblCheckBoxLCAmount.text === "D") &&
          ((this.view.lblCheckBoxOtherAmendments.text === "C" && this.view.txtAmendmentDetails.text != "") || this.view.lblCheckBoxOtherAmendments.text === "D") &&
          ((this.view.lblCheckBoxUploadDocuments.text === "C" && docReferenceValues.length > 0) || this.view.lblCheckBoxUploadDocuments.text === "D") &&
          ((this.view.lblCheckBoxAmendmentCharges.text === "C" && this.view.txtAmendmentCharges.text != "") || this.view.lblCheckBoxAmendmentCharges.text === "D") &&
          ((this.view.lblCheckBoxMessageToBank.text === "C" && this.view.txtMessageToBank.text != "") || this.view.lblCheckBoxMessageToBank.text === "D") &&

          (this.view.lblCheckBoxLCAmount.text === "C" || this.view.lblCheckBoxExpiryType.text === "C" || this.view.lblCheckBoxBeneficiaryDetails.text === "C" ||
            this.view.lblCheckBoxOtherAmendments.text === "C" || this.view.lblCheckBoxUploadDocuments.text === "C" || this.view.lblCheckBoxAmendmentCharges.text === "C" ||
            this.view.lblCheckBoxMessageToBank.text === "C")
        ) {
          this.enableOrDisableButton(scope.view.btnReviewContinue, true);
        } else {
          this.enableOrDisableButton(scope.view.btnReviewContinue, false);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmCreateAmendmentController",
          "method": "enableOrDisableContinue",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : createAmendment
     * calls the create amendment presentation method.
     * @return : NA
     */
    createAmendment: function() {
      try {
        if (isReviseFlow) {
          this.presenter.updateAmendment(payLoaddata, "frmCreateAmendment");
        } else {
          this.presenter.createAmendment(payLoaddata, "frmCreateAmendment");
        }
      } catch (err) {
        var errorObj = {
          "level": "frmCreateAmendmentController",
          "method": "createAmendment",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : getUpdatedBeneficiaryList
     * to update the beneficiary list in case of add or delete or edit.
     * @return : NA.
     */
    getUpdatedBeneficiaryList: function() {
      updatedBeneficiaries = [];
      for (i = 0; i < beneficiaries.length; i++) {
        let keyToSearch = beneficiaries[i].hasOwnProperty("Id") ? beneficiaries[i]["Id"] : beneficiaries[i].beneficiaryName
        if (beneficiaryList.has(keyToSearch)) {
          // do nothing
        } else {
          // add to the updated beneficiaries list.
          updatedBeneficiaries.push(beneficiaries[i]);
        }
      }
    },

    /**
     * @api : createPayload
     * create payload for review screen.
     * @return : the payload created.
     */
    createPayload: function(flag) {
      try {
        let supportingDocument = [];
        if (documentsList.length === docReferenceValues.length) {
          for(let i = 0; i < documentsList.length; i++){
            supportingDocument.push({
              "documentName": documentsList[i][0],
              "documentReferences": Array.isArray(docReferenceValues[i]) ? docReferenceValues[i][0] : docReferenceValues[i]
            });
          }
        }
        if (flag) {
          benList = this.createBeneficiaryList();
          const amendmentEffectiveDate = this.view.calEffectiveDate.formattedDate.split('/');
          var payload = {
            "benificiaryName": benList[0] ? benList[0].beneficiaryName : NA,
            "guaranteesReference": kony.sdk.isNullOrUndefined(lcData.LCDetails.guaranteesReference) ? "" : lcData.LCDetails.guaranteesReference,
            "currency": kony.sdk.isNullOrUndefined(lcData.LCDetails.currency) ? "" : lcData.LCDetails.currency,
            "amount": kony.sdk.isNullOrUndefined(lcData.LCDetails.amount) ? "" : lcData.LCDetails.amount,
            "expiryDate": kony.sdk.isNullOrUndefined(lcData.LCDetails.expiryDate) ? "" : CommonUtilities.getBackendDateFormat(lcData.LCDetails.expiryDate, "mm/dd/yyyy"),
            "productType": kony.sdk.isNullOrUndefined(lcData.LCDetails.productType) ? "" : lcData.LCDetails.productType,
            "issueDate": kony.sdk.isNullOrUndefined(lcData.LCDetails.issueDate) ? "" : CommonUtilities.getBackendDateFormat(lcData.LCDetails.issueDate, "mm/dd/yyyy"),
            "instructingParty": kony.sdk.isNullOrUndefined(lcData.LCDetails.instructingParty) ? "" : lcData.LCDetails.instructingParty,
            "billType": kony.sdk.isNullOrUndefined(lcData.LCDetails.guaranteeAndSBLCType) ? "" : lcData.LCDetails.guaranteeAndSBLCType,
            "expiryType": kony.sdk.isNullOrUndefined(lcData.LCDetails.expiryType) ? "" : lcData.LCDetails.expiryType,
            "applicantParty": kony.sdk.isNullOrUndefined(lcData.LCDetails.applicantParty) ? "" : lcData.LCDetails.applicantParty,
            "amendmentNo": kony.sdk.isNullOrUndefined(lcData.amendmentNo) ? "" : lcData.amendmentNo,
            "amendmentEffectiveDate": [amendmentEffectiveDate[2], amendmentEffectiveDate[0], amendmentEffectiveDate[1]].join('-'),
            "formattedAmendmentEffectiveDate": this.view.calEffectiveDate.formattedDate,
            "amendAmount": this.view.lblCheckBoxLCAmount.text === "C" ? applicationManager.getFormatUtilManager().deFormatAmount(this.view.tbxAmount.text) : "",
            "beneficiaryDetails": this.view.lblCheckBoxBeneficiaryDetails.text === "C" ? JSON.stringify(benList) : "",
            "amendCurrency": kony.sdk.isNullOrUndefined(lcData.amendCurrency) ? "" : lcData.amendCurrency,
            "amendExpiryType": this.view.lblCheckBoxExpiryType.text === "C" ? this.view.lblSelectHere.text : "",
            "amendExpiryDate": this.view.lblCheckBoxExpiryType.text === "C" ? this.view.expiryDate.lblEnteredDateKA.text === "" ? "" : CommonUtilities.getBackendDateFormat(this.view.expiryDate.lblEnteredDateKA.text, "mm/dd/yyyy") : "",
            "amendExpiryCondition": this.view.lblCheckBoxExpiryType.text === "C" ? this.view.tbxExpiryCondition.text : "",
            "amendDetails": this.view.lblCheckBoxOtherAmendments.text === "C" ? this.view.txtAmendmentDetails.text : "",
            "messageToBank": this.view.lblCheckBoxMessageToBank.text === "C" ? this.view.txtMessageToBank.text : "",
            "amendCharges": this.view.lblCheckBoxAmendmentCharges.text === "C" ? this.view.txtAmendmentCharges.text : "",
            "supportingDocument": this.view.lblCheckBoxUploadDocuments.text === "C" ? JSON.stringify(supportingDocument) : "",
            "documentReferences": this.view.lblCheckBoxUploadDocuments.text === "C" ? JSON.stringify(docReferenceValues) : "",
            "documentName": this.view.lblCheckBoxUploadDocuments.text === "C" ? JSON.stringify(documentsList.map(d => d[0])) : "",
            "amendStatus": !kony.sdk.isNullOrUndefined(lcData.amendStatus) ? lcData.amendStatus : "",
            "amendRequestedDate": !kony.sdk.isNullOrUndefined(lcData.amendRequestedDate) ? lcData.amendRequestedDate : "",
            "amendmentReference": !kony.sdk.isNullOrUndefined(lcData.amendmentReference) ? lcData.amendmentReference : "",
            "amendmentSRMSRequestId": !kony.sdk.isNullOrUndefined(lcData.amendmentSRMSRequestId) ? lcData.amendmentSRMSRequestId : "",
            "cancellationStatus": !kony.sdk.isNullOrUndefined(lcData.cancellationStatus) ? lcData.cancellationStatus : "",
            "corporateUserName": !kony.sdk.isNullOrUndefined(lcData.corporateUserName) ? lcData.corporateUserName : "",
            "guaranteesSRMSId": !kony.sdk.isNullOrUndefined(lcData.LCDetails.guaranteesSRMSId) ? lcData.LCDetails.guaranteesSRMSId : "",
            'relatedTransactionReference': lcData.LCDetails.relatedTransactionReference || ""
          };
          if (lcData.historyCount && lcData.historyCount > 0) {
            let historyValue = {
                "ReasonforReturned": lcData.reasonForReturned ? lcData.reasonForReturned : NA,
                "CorporatorName": payload.benificiaryName,
                "ReturnMessageToBank": payload.messageToBank,
                "rejectedDate": lcData.rejectedDate ? lcData.rejectedDate : NA,
            };
            payload["amendmentHistory" + lcData.historyCount] = JSON.stringify(historyValue);
        }
          return payload;
        }
      } catch (err) {
        var errorObj = {
          "level": "frmCreateAmendmentController",
          "method": "createPayload",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : createBeneficiaryList
     * create an array of added beneficiaries
     * @return : beneficiary list
     */
    createBeneficiaryList: function() {
      let benList = [];
      beneficiaryList.forEach((value, key) => {
        benList.push(value);
      });
      return benList;
    },

    /**
     * @api : saveBeneficiaryForFutureUse
     * save newly created beneficiaries
     * @return : NA
     */
    saveBeneficiaryForFutureUse: function(data) {
      data.name = data.beneficiaryName;
      let arr = [];
      arr.push(data);
      if (!kony.sdk.isNullOrUndefined(data.id)) {
        data.isCorporate = "false";
        this.presenter.editPayee(data, this.view.id);
      } else {
        let param = {
          "payeeDetails": JSON.stringify(arr)
        };
        this.presenter.createCorporatePayee(param, this.view.id);
      }
    },

    /**
         * @api : formatAmount
         * format Amount after entering
         * @return : NA
         */
    formatAmount: function (amount, formatData) {
      var scope = this;
      try {
        scope.enableOrDisableContinue();
        return applicationManager.getFormatUtilManager().formatAmount(amount, formatData);
      } catch (err) {
        var errorObj = {
          "level": "frmCreateAmendmentController",
          "method": "formatAmount",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    
    /**
     * @api : enableOrDisableButton
     * enable or disable skins for buttons.
     * @return : NA
     */
    enableOrDisableButton: function(btnRef, flag) {
      btnRef.setEnabled(flag);
      flag ? btnRef.skin = "ICSknContinueEnabled" : btnRef.skin = "ICSknbtnDisablede2e9f036px";
    },

     /**
     * Method to check whether a string is JSON object or not
     * @param {string} val - contains value to be checked
     * @returns {boolean} - validity of value
     */
    isJSON: function (val) {
      try {
        val = val.replace(/'/g, '"');
        return (JSON.parse(val) && !!val);
      } catch (e) {
        return false;
      }
    },
    
    /**
     * @api : enableOrDisableSubmitButton
     * enable or disable the add beneficiary popup action button
     * @return : NA
     */
    enableOrDisableSubmitButton: function(param) {
      var scope = this;
      let flowType = param === "add" ? "" : "Edit";

      if (this.view[flowType + "BeneficiaryDetails"].flxSelectBeneficiary.isVisible) {
        this.view[flowType + "BeneficiaryDetails"].flxBankDetails.setVisibility(false);
        this.view[flowType + "BeneficiaryDetails"].flxBeneficiaryDetails.setVisibility(true);
        if (flowType === "add") {
          scope.view.BeneficiaryDetails.flxSelectedBeneficiaryDetails.setVisibility(true);
          scope.view.BeneficiaryDetails.flxBeneficiaryDetails.setVisibility(true);
        }
      } else {
        this.view[flowType + "BeneficiaryDetails"].flxExistingBeneficiaryDetails.setVisibility(false);
        this.view[flowType + "BeneficiaryDetails"].flxEnterBeneficiaryDetails.setVisibility(true);

      }
      this.view[flowType + "BeneficiaryDetails"].flxMarkAdvisingBankCheckbox.setVisibility(false);

      scope.view.BeneficiaryDetails.lblExistingBeneficiaryWarning.isVisible === false && (scope.view.BeneficiaryDetails.tbxBeneficiaryName.text != "" || this.view.BeneficiaryDetails.lblBeneficiaryDetailsFieldValue1.text != "") ? scope.enableOrDisableButton(scope.view.btnAddBeneficiary, true) : scope.enableOrDisableButton(scope.view.btnAddBeneficiary, false);
      scope.view.EditBeneficiaryDetails.lblExistingBeneficiaryWarning.isVisible === false && scope.view.EditBeneficiaryDetails.tbxBeneficiaryName.text != "" ? scope.enableOrDisableButton(scope.view.btnUpdate, true) : scope.enableOrDisableButton(scope.view.btnUpdate, false);

    }
  };
});