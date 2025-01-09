define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants', 'FormatUtil'], function (CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants, FormatUtil) {
  let viewDetailsResponse;
  let isAccept = false;
  let presenter;
  let guaranteesLCDetails;
  let GUARANTEES_TAB = kony.i18n.getLocalizedString("i18n.TradeFinance.GuaranteesReceivedLC");
  let AMENDMENTS_TAB = kony.i18n.getLocalizedString("i18n.ImportLC.Amendments");
  let CLAIMS_TAB = "Claims";
  let currentTab = GUARANTEES_TAB;
  let selectedRecord;
  let navData;
  let lcDetails;
  let isNoRecordsAvailable = false;
  let isPrintNavigation = false;
  let segLCAccountType = '';
  let segLCStatusType = '';
  let segTimePeriods = '';
  let navToLCDetails = false;
  let isSearchEnabled = false;
  let sortApplied = false;
  let upperLimit = 10;
  let tabSelection = false;
  let onClickViewAmendments = false;
  let isTablet = false;
  let serviceParameters = {
    "searchString": "",
    "pageSize": "",
    "pageOffset": "",
    "sortByParam": "receivedOn",
    "sortOrder": "",
    "timeParam": "",
    "timeValue": "6,MONTH",
    "filterByValue": "receivedOn",
    "filterByParam": ""
  };
  let liabilityParams = {
    "guaranteeSrmsId": "",
    "releaseDate": "",
    "amountToRelease": "",
    "liabilityDetails": "",   
    "messageToBank": ""
};
  this.sortField = {
    "imgColumnAmendmentsTab1": "applicant",
    "imgColumnAmendmentsTab2": "guaranteeSrmsId",
    "imgColumnAmendmentsTab3": "amendmentSrmsId",
    "imgColumnAmendmentsTab4": "receivedOn",
    "imgColumnAmendmentsTab5": "amendmentNo",
    "imgColumnAmendmentsTab6": "status",
    "imgColumnClaimsTab1": "beneficiaryName",
    "imgColumnClaimsTab2": "productType",
    "imgColumnClaimsTab3": "claimAmount",
    "imgColumnClaimsTab4": "serviceRequestTime",
    "imgColumnClaimsTab5": "status"
  };

  this.orientationHandler = new OrientationHandler();
  this.formatUtil;
  this.regExpForCheckArrayInString = /[\[\]]+/;
  this.isRecentLCViewDetailsBtnOnClick = false;
  const NA = kony.i18n.getLocalizedString("i18n.common.NA");
  const specialCharactersSet = "*<>=";
  const HEADER = 'header';
  const SWIFT_TAG = 'swiftTag';
  return {
    /**
     * @api : onNavigate
     * This function for executing the postShow, displayData and methods given
     * @return : NA
     */
    onNavigate: function (record) {
      var scope = this;
      try {
        this.view.preShow = this.preShow;
        this.view.postShow = this.postShow;
        this.view.onBreakpointChange = this.onBreakpointChange;
        this.view.onDeviceBack = function () { };
        scope.presenter = applicationManager.getModulesPresentationController({
          appName: 'TradeFinanceMA',
          moduleName: 'GuaranteesReceivedUIModule'
        });
        viewDetailsResponse = record || JSON.parse(JSON.stringify(scope.presenter.guaranteeData));
      } catch (err) {
        var errorObj = {
          "method": "onNavigate",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : preShow
     * Gets invoked initially before rendering of UI
     * @return : NA
     */
    preShow: function () {
      var scope = this;
      try {
        scope.view.customheadernew.activateMenu("TradeFinance", "GuaranteesReceived");
        FormControllerUtility.updateWidgetsHeightInInfo(this.view, ["flxHeader", "flxFooter",]);
        scope.view.customheadernew.forceCloseHamburger();
        scope.seti18nKeys();
        this.initActions();
        scope.setDataInViewDetailsComponent();
        scope.renderSwiftAndAdvices();
        scope.view.flxMainPaymentPopup.doLayout = CommonUtilities.centerPopupFlex;
      } catch (err) {
        var errorObj = {
          "method": "preShow",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : postShow
     * Gets invoked initially after rendering of UI
     * @return : NA
     */
    postShow: function () {
      var scope = this;
      try {
        this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
        applicationManager.getNavigationManager().applyUpdates(this);
        scope.view.flxVerticalEllipsisDropdown.setVisibility(false);
      } catch (err) {
        var errorObj = {
          "method": "postShow",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : initActions
     * Handling input actions
     * @return : NA
     */
    initActions: function () {
      var scope = this;
      try {
        scope.view.lblVerticalEllipsis.onTouchEnd = () => {
          if(scope.view.flxVerticalEllipsisDropdown.isVisible) {
              scope.view.flxVerticalEllipsisDropdown.setVisibility(false);
          }
          else {
              scope.view.flxVerticalEllipsisDropdown.setVisibility(true);
          }
        };
        scope.view.flxVerticalEllipsisBody.onClick = this.renderPrintAndDownload.bind(this);
        scope.view.flxAckSuccessMessageMain.setVisibility(false);
        scope.view.flxSelfAcceptance.setVisibility(false);
        scope.view.flxContent.top = '20dp';
        scope.view.btnTab1.onClick = scope.setTabData.bind(scope, GUARANTEES_TAB);
        scope.view.btnTab2.onClick = scope.setTabData.bind(scope, AMENDMENTS_TAB);
        scope.view.btnTab3.onClick = scope.setTabData.bind(scope, CLAIMS_TAB);
        scope.view.tbxSearch.text = "";
        scope.view.imgClear.setVisibility(false);
        scope.view.tbxSearch.onTextChange = function () {
          if (scope.view.tbxSearch.text.length > 0) scope.view.imgClear.setVisibility(true);
          else scope.view.imgClear.setVisibility(false);
        };
        scope.view.imgClear.onTouchEnd = function () {
          scope.view.tbxSearch.text = "";
          scope.isSearchEnabled = false;
          scope.view.imgClear.setVisibility(false);
          scope.fetchDashboardData();
        };
        if (!kony.sdk.isNullOrUndefined(scope.view.tbxSearch.text)) {
          scope.view.imgClear.setVisibility(false);
        }
        scope.view.tbxSearch.onDone = scope.getSearchData;
        scope.view.btnTab1.onClick = scope.setTabData.bind(scope, GUARANTEES_TAB);
        scope.view.btnTab2.onClick = scope.setTabData.bind(scope, AMENDMENTS_TAB);
        scope.view.btnTab3.onClick = scope.setTabData.bind(scope, CLAIMS_TAB);
        scope.setTabData(GUARANTEES_TAB);
        scope.view.txtAmountTobeReleased.onKeyUp = scope.validateInput.bind(this);
        scope.view.txtReleaseLiabilityDetails.onKeyUp = scope.validateInput.bind(this);
        scope.view.btnSubmit.onClick = scope.submitLiability.bind(this);
      } catch (err) {
        var errorObj = {
          "method": "initActions",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setDataInViewDetailsComponent
     * Appending data in View details component
     * @return : NA
     */
    setDataInViewDetailsComponent: function () {
      var scope = this;
      try {
        if (viewDetailsResponse && viewDetailsResponse.guaranteeSrmsId) {
          this.view.GuaranteeReceivedDetails.setContext(viewDetailsResponse);
        }
        scope.renderButtons();
        // Processing tabs
        if (viewDetailsResponse.hasOwnProperty('lastAmendmentDetails')) {
          let lastAmendmentDetails = JSON.parse(viewDetailsResponse.lastAmendmentDetails.replace(/'/g, "\""));
          if (Object.keys(lastAmendmentDetails).length > 0) {
            scope.view.flxContent.top = '0dp';
            scope.view.flxSwitchParent.setVisibility(true);
            scope.view.flxGuranteeTab.setVisibility(true);
            scope.view.flxAmendments.setVisibility(true);
          }
        }
        if (viewDetailsResponse.hasOwnProperty('claimInformation')) {
          let claimInformation = JSON.parse(viewDetailsResponse.claimInformation.replace(/'/g, "\""));
          if (Object.keys(claimInformation).length > 0) {
            scope.view.flxContent.top = '0dp';
            scope.view.flxSwitchParent.setVisibility(true);
            scope.view.flxGuranteeTab.setVisibility(true);
            scope.view.flxClaims.setVisibility(true);
          }
        }
      } catch (err) {
        var errorObj = {
          "method": "setDataInViewDetailsComponent",
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
    onBreakpointChange: function () {
      var scope = this;
      try {
        var currentBreakpoint = kony.application.getCurrentBreakpoint();
        scope.view.customheadernew.onBreakpointChangeComponent(currentBreakpoint);
        scope.view.customfooternew.onBreakpointChangeComponent(currentBreakpoint);
        if (currentBreakpoint > 640 && currentBreakpoint <= 1024) {
          isTablet = true;
        } else if (kony.application.getCurrentBreakpoint() === 1366 || kony.application.getCurrentBreakpoint() === 1380) {
          isTablet = false;
        }
      } catch (err) {
        var errorObj = {
          "method": "onBreakpointChange",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : renderSelfAcceptance
     * It'll render Self Acceptance flex
     * @return : NA
     */
    renderSelfAcceptance: function () {
      var scope = this;
      try {
        scope.view.imgRadioAccept.src = 'radio_btn_inactive.png';
        scope.view.flxRejectReasons.setVisibility(false);
        scope.view.flxMessageToBank.setVisibility(false);
        scope.view.flxSelfAcceptance.setVisibility(true);
        scope.view.flxAcceptContainer.cursorType = "pointer";
        scope.view.flxRejectSection.cursorType = "pointer";
        FormControllerUtility.disableButton(scope.view.btnSubmitConsent);
        scope.view.flxAcceptContainer.onClick = scope.acceptOrReject.bind(scope, true);
        scope.view.flxRejectSection.onClick = scope.acceptOrReject.bind(scope, false);
      } catch (err) {
        var errorObj = {
          "method": "onBreakpointChange",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : acceptOrReject
     * Toggling in between self acceptance and rejection
     * @param : N/A
     * @return : NA
     */
    acceptOrReject: function (isAcceptArg) {
      var scope = this;
      try {
        if (isAcceptArg) {
          isAccept = true;
          scope.view.imgRadioAccept.src = 'radiobtn_active.png';
          scope.view.imgRadioReject.src = 'radio_btn_inactive.png';
          scope.view.flxRejectReasons.setVisibility(false);
          scope.view.flxMessageToBank.setVisibility(false);
          scope.enableOrDisableSubmitButton(true);
        } else {
          isAccept = false;
          scope.view.imgRadioAccept.src = 'radio_btn_inactive.png';
          scope.view.imgRadioReject.src = 'radiobtn_active.png';
          scope.view.flxRejectReasons.setVisibility(true);
          scope.view.flxMessageToBank.setVisibility(true);
          scope.view.txtAreaRejectReason.restrictCharactersSet = specialCharactersSet;
          scope.view.txtAreaRejectReason.onKeyUp = scope.validateInputText;
          if (scope.view.txtAreaRejectReason.text.length === 0)
            scope.enableOrDisableSubmitButton(false);
          else
            scope.enableOrDisableSubmitButton(true);
        }
      } catch (err) {
        var errorObj = {
          "method": "acceptOrReject",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : validateInputText
     * Validating input text and toggling the submit button
     * @return : NA
     */
    validateInputText: function () {
      var scope = this;
      try {
        let enableSubmitButton = scope.view.txtAreaRejectReason.text.length > 0 ? true : false;
        scope.enableOrDisableSubmitButton(enableSubmitButton);
      } catch (err) {
        var errorObj = {
          "method": "validateInputText",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : enableOrDisableSubmitButton
     * Enabling or disabling the submit button
     * @param {boolean} enableSubmitButton - boolean to check the condition of enabling or disabling
     * @return : NA
     */
    enableOrDisableSubmitButton: function (enableSubmitButton) {
      var scope = this;
      try {
        if (enableSubmitButton)
          FormControllerUtility.enableButton(scope.view.btnSubmitConsent);
        else
          FormControllerUtility.disableButton(scope.view.btnSubmitConsent);
      } catch (err) {
        var errorObj = {
          "method": "enableOrDisableSubmitButton",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : handleNavigation
     * All navigations will handled here
     * @return : NA
     */
    handleNavigation: function (formName) {
      var scope = this;
      try {
        new kony.mvc.Navigation({
          "appName": "TradeFinanceMA",
          "friendlyName": "GuaranteesReceivedUIModule/frmGuaranteesReceivedDashboard"
        }).navigate();
      } catch (err) {
        var errorObj = {
          "method": "handleNavigation",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : submitRejectOrAccept
     * Submitting the guarantee based on user actions
     * @return : NA
     */
    submitRejectOrAccept: function () {
      var scope = this;
      try {
        if (scope.view.btnSubmitConsent.text === kony.i18n.getLocalizedString("i18n.TradeFinance.SubmitConsent")) {
          let selfAcceptancePayload = {};
          selfAcceptancePayload.guaranteeSrmsId = viewDetailsResponse.guaranteeSrmsId;
          if (isAccept) {
            selfAcceptancePayload.selfAcceptance = OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.ACCEPTED;
          } else {
            selfAcceptancePayload.selfAcceptance = OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.REJECTED;
            selfAcceptancePayload.reasonForSelfRejection = scope.view.txtAreaRejectReason.text;
            if (this.view.txtMessageToBankValue.text.length > 0) {
              selfAcceptancePayload.messageToBank = this.view.txtMessageToBankValue.text;
            }
          }
          // Calling service which is present in presentation controller
          let guaranteesReceivedUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("GuaranteesReceivedUIModule");
          guaranteesReceivedUIModule.presentationController.acceptOrRejectGuarantee(selfAcceptancePayload, "frmGuaranteeReceivedViewDetails");
        } else if (scope.view.btnSubmitConsent.text === kony.i18n.getLocalizedString("i18n.TradeFinance.createNewClaim")) {
          scope.presenter.showGuaranteesReceivedScreen({
            context: 'createGuaranteeClaim',
            data: viewDetailsResponse,
            form: scope.view.id
          });
        } else if (scope.view.btnSubmitConsent.text === kony.i18n.getLocalizedString("i18n.TradeFinance.releaseLiability")) {
          scope.view.flxDialogs.height = "130%";
          scope.view.flxDialogs.setVisibility(true);
          scope.view.flxLiabilityPopup.setVisibility(true);
          scope.renderLiabilityPopup()
        }
      } catch (err) {
        var errorObj = {
          "method": "submitRejectOrAccept",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : updateFormUI
     * Updating the form UI based on server response
     * @return : NA
     */
    updateFormUI: function (viewModel) {
      var scope = this;
      try {
        // Toggling the loader
        if (viewModel.isLoading === true) {
          FormControllerUtility.showProgressBar(this.view);
        } else if (viewModel.isLoading === false) {
          FormControllerUtility.hideProgressBar(this.view);
        }
        if (viewModel.hasOwnProperty('serverError')) {
          scope.view.imgAckSuccessMessageIcon.src = 'error_yellow.png';
          scope.view.imgAckSuccessMessageIcon.imageScaleMode = constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS;
          scope.view.flxAckSuccessMessageMain.setVisibility(true);
          scope.view.lblAckSuccessMessage.text = viewModel.serverError;
          scope.scrollToTop();
        }
        if (viewModel.status === OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.SUBMITTED_TO_BANK) {
          console.log(viewModel.acceptOrRejectGuarantee);
          scope.view.imgAckSuccessMessageIcon.src = 'success_green.png';
          scope.view.imgAckSuccessMessageIcon.imageScaleMode = constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS;
          scope.view.flxAckSuccessMessageMain.setVisibility(true);
          scope.view.lblAckSuccessMessage.text = kony.i18n.getLocalizedString("i18n.TradeFinance.SelfAcceptanceSuccess");
          scope.scrollToTop();
          scope.view.flxSelfAcceptance.setVisibility(false);
          viewDetailsResponse = viewModel;
          scope.setDataInViewDetailsComponent();
        }
        if (viewModel.status === OLBConstants.RELEASE_LIABILITY_STATUS.SUCCESS) {
          scope.view.imgAckSuccessMessageIcon.src = 'success_green.png';
          scope.view.imgAckSuccessMessageIcon.imageScaleMode = constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS;
          scope.view.flxAckSuccessMessageMain.setVisibility(true);
          scope.view.lblAckSuccessMessage.text = kony.i18n.getLocalizedString("i18n.TradeFinance.releaseLiabilityAckMsg");
          scope.scrollToTop();
          scope.view.flxSelfAcceptance.setVisibility(false);
          scope.view.flxSubmitButtonActions.setVisibility(false);
          scope.view.flxBackButtonActions.setVisibility(true);
          scope.view.btnViewAllGT.setVisibility(false);
          scope.view.btnBack.setVisibility(true);
          scope.presenter.getReceivedGuaranteeById({
            "guaranteeSrmsId": viewDetailsResponse.guaranteeSrmsId
          }, "frmGuaranteeReceivedViewDetails");
        }
        if(viewModel.liabilityDetails){
            scope.view.GuaranteeReceivedDetails.setContext(viewModel);
        } 
        if (viewModel.ReceivedAmendments) {
          scope.guaranteesLCDetails = viewModel.ReceivedAmendments;
          scope.setDashboardData();
          scope.lcDetails = scope.guaranteesLCDetails;
        }
        if (navToLCDetails && viewModel.guaranteeSrmsId && !(viewModel.amendmentSrmsId) && !(scope.currentTab === AMENDMENTS_TAB)) {
          navToLCDetails = false;
          new kony.mvc.Navigation({
            "appName": "TradeFinanceMA",
            "friendlyName": "GuaranteesReceivedUIModule/frmGuaranteeReceivedViewDetails"
          }).navigate(viewModel);
        }
        if (navToLCDetails && (viewModel.guaranteeSrmsId && viewModel.amendmentSrmsId) && scope.currentTab === AMENDMENTS_TAB) {
          navToLCDetails = false;
          selectedRecord = viewModel;
          scope.presenter.getReceivedGuaranteeById({
            "guaranteeSrmsId": viewModel.guaranteeSrmsId
          }, "frmGuaranteeReceivedViewDetails");
        }
        if (viewModel.guaranteeSrmsId && !(viewModel.amendmentSrmsId) && scope.currentTab === AMENDMENTS_TAB) {
          selectedRecord["LCDetails"] = viewModel;
          if (!isPrintNavigation) {
            new kony.mvc.Navigation({
              "appName": "TradeFinanceMA",
              "friendlyName": "GuaranteesReceivedUIModule/frmReceivedGuaranteeAmendment"
            }).navigate(selectedRecord);
          } else {
            isPrintNavigation = false;
            let dataObj = {
              lcData: selectedRecord,
              previousFormName: 'frmGuaranteeReceivedViewDetails'
            };
            new kony.mvc.Navigation({
              "appName": "TradeFinanceMA",
              "friendlyName": "GuaranteesReceivedUIModule/frmPrintReceivedGuaranteeAmendments"
            }).navigate(dataObj);
          }
        }
        if (viewModel.GuaranteeClaims) {
          scope.guaranteesLCDetails = viewModel.GuaranteeClaims;
          scope.setDashboardData();
        }
      } catch (err) {
        var errorObj = {
          "method": "updateFormUI",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : scrollToTop
     * Scrolling to top to show success/failure banner
     * @return : NA
     */
    scrollToTop: function () {
      var scope = this;
      try {
        this.view.flxFormContent.setContentOffset({ x: "0%", y: "0%" }, true);
        this.view.forceLayout();
      } catch (err) {
        var errorObj = {
          "method": "scrollToTop",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : renderButtons
     * Rendring the buttons based on status of the record
     * @return : NA
     */
    renderButtons: function () {
      var scope = this;
      try {
        if (viewDetailsResponse.status === OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.NEW) {
          scope.view.btnSubmitConsent.text = kony.i18n.getLocalizedString("i18n.TradeFinance.SubmitConsent");
          scope.view.flxSubmitButtonActions.setVisibility(true);
          scope.view.flxBackButtonActions.setVisibility(false);
          FormControllerUtility.enableButton(scope.view.btnSubmitConsent);
          scope.renderSelfAcceptance();
        } else if (viewDetailsResponse.status === OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.SUBMITTED_TO_BANK) {
          scope.view.btnViewAllGT.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ViewAllGTAndSBLC");
          scope.view.flxSubmitButtonActions.setVisibility(false);
          scope.view.flxBackButtonActions.setVisibility(true);
          FormControllerUtility.enableButton(scope.view.btnViewAllGT);
        } else if (viewDetailsResponse.status === OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.APPROVED || viewDetailsResponse.status === OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.CLAIM_HONOURED || viewDetailsResponse.status === OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.CLAIM_EXTENDED || viewDetailsResponse.status === OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.CLAIM_REJECTED) {
          scope.view.flxSubmitButtonActions.setVisibility(true);
          scope.view.flxBackButtonActions.setVisibility(false);
          FormControllerUtility.enableButton(scope.view.btnSubmitConsent);
          let totalAmountReleased = 0;
          if(viewDetailsResponse.liabilityDetails){
            let liabilityInfo = JSON.parse(viewDetailsResponse.liabilityDetails.replace(/'/g, "\""));
            let totalAmountReleasedArray = liabilityInfo.map(item => item.amountToRelease);
            for(i = 0 ; i < totalAmountReleasedArray.length ; i++){
              totalAmountReleased += parseFloat(totalAmountReleasedArray[i]);
            }
          }
          if(parseFloat(totalAmountReleased) >= viewDetailsResponse.amount){
            scope.view.flxSubmitButtonActions.setVisibility(false);
            scope.view.flxBackButtonActions.setVisibility(true);
            scope.view.btnViewAllGT.setVisibility(false);
            scope.view.btnBack.setVisibility(true);
          } else {
              scope.view.btnSubmitConsent.text = kony.i18n.getLocalizedString("i18n.TradeFinance.releaseLiability");
          }
          if (viewDetailsResponse.hasOwnProperty('claimInformation') && !scope.presenter.isEmptyNullOrUndefined(viewDetailsResponse.claimInformation)) {
            let claimInformation = JSON.parse(viewDetailsResponse.claimInformation.replace(/'/g, "\""));
            let keys = Object.keys(claimInformation);
            // Checking that claimInformation contains only Claim Honoured or other
            let allClaimsAreSettled = keys.filter(claimsKey => claimInformation[claimsKey] === kony.i18n.getLocalizedString("i18n.TradeFinance.ClaimHonoured")).length === keys.length;
            if (!allClaimsAreSettled) scope.view.btnSubmitConsent.text = kony.i18n.getLocalizedString("i18n.TradeFinance.createNewClaim");
          }
        } else {
          scope.view.flxSubmitButtonActions.setVisibility(false);
          scope.view.flxBackButtonActions.setVisibility(true);
          scope.view.btnViewAllGT.setVisibility(false);
          scope.view.btnBack.setVisibility(true);
        }
        scope.view.btnConsentBack.onClick = scope.handleNavigation;
        scope.view.btnSubmitConsent.onClick = scope.submitRejectOrAccept;
        scope.view.btnViewAllGT.onClick = scope.handleNavigation;
        scope.view.btnBack.onClick = scope.handleNavigation;
      } catch (err) {
        var errorObj = {
          "method": "renderButtons",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    renderPrintAndDownload: function() {
      var scope = this;
      try {
        scope.view.segVerticalDropdownEllipsis.widgetDataMap = {
              flxLCAccountType: 'flxLCAccountType',
              imgLCCheckbox: 'imgLCCheckbox',
              lblLCCheckbox: 'lblLCCheckbox',
              lblLCAccountType: 'lblLCAccountType'
          };
          let masterData = [];
          scope.presenter.contextualMenuData.map(item => {
              masterData.push({
                  flxLCAccountType: {
                      bottom: '0dp',
                      height: '40dp',
                      onClick: scope.onPrintAndDownloadRowClick.bind(scope, item.id),
                      cursorType: 'pointer',
                      isVisible: scope.contextualItemCondition(item.id)
                  },
                  imgLCCheckbox: {
                      isVisible: true,
                      src: item.src
                  },
                  lblLCCheckbox: {
                      isVisible: false
                  },
                  lblLCAccountType:  item.text
              });
          });
          scope.view.segVerticalDropdownEllipsis.setData(masterData);
      } catch (err) {
          var errorObj = {
              "method": "renderPrintAndDownload",
              "error": err
          };
          scope.onError(errorObj);
      }
  },

  contextualItemCondition: function (id) {
    var scope = this;
    try {
      if (id == 'raiseQuery') {
        if (viewDetailsResponse.status.toLowerCase() === (OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.APPROVED).toLowerCase()) {
          return true;
        } else {
          return false;
        }
      }
      if (isTablet && id == 'print') {
        return false;
      }
      return true;
    } catch (err) {
      var errorObj = {
        "method": "contextualItemCondition",
        "error": err
      };
      scope.onError(errorObj);
    }
  },

    /**
     * @api : navigatetoPrint
     * Navigating to print
     * @return : NA
     */
    onPrintAndDownloadRowClick: function (id) {
      var scope = this;
      try {
      let formNameForPrint;
      scope.view.flxVerticalEllipsisDropdown.setVisibility(false);
      if (id == 'print') {
      let dataObj = {
        navData: viewDetailsResponse,
        previousFormName: 'frmGuaranteeReceivedViewDetails'
      }
      if (scope_configManager.swiftEnabled && viewDetailsResponse.status === OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.APPROVED) {
        formNameForPrint = 'frmPrintSwiftReceivedGuarantee';
      } else {
        formNameForPrint = 'frmPrintReceivedGuarantees';
      }
      new kony.mvc.Navigation({
        "appName": "TradeFinanceMA",
        "friendlyName": `GuaranteesReceivedUIModule/${formNameForPrint}`
      }).navigate(dataObj);
    } else if (id == "download") {
      scope.presenter.generateReceivedGuaranteesLC({
        "guaranteeSrmsId": viewDetailsResponse.guaranteeSrmsId
      });
      } else if (id == 'raiseQuery') {
        let record = viewDetailsResponse;
        let queryObj = {};
        const formatUtilManager = applicationManager.getFormatUtilManager();
        queryObj.subject = `${kony.i18n.getLocalizedString("i18n.TradeFinance.queryTradeFinance")} - ${record.guaranteeSrmsId}`;
        queryObj.descriptionObj = {};
        record.amount && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.ChequeManagement.Amount")] = record.amount ? formatUtilManager.formatAmountandAppendCurrencySymbol(record.amount) : NA);
        record.lcType && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.GTAndSlbc")] = record.lcType);
        record.applicantName && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.applicantName")] = record.applicantName);
        record.productType && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.productType")] = record.productType);
        record.expectedIssueDate && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.IssueDate")] = record.expectedIssueDate ? CommonUtilities.getDateAndTimeInUTC(record.expectedIssueDate).substr(0, 10) : NA);
        queryObj.tradeModule = true;
        scope.presenter.showMessagesScreen(queryObj);
      }
    } catch (err) {
      var errorObj = {
          "method": "onPrintAndDownloadRowClick",
          "error": err
      };
      scope.onError(errorObj);
  }
},

    /**
     * @api : renderSwiftAndAdvices
     * Navigating to print
     * @return : NA
     */
    renderSwiftAndAdvices: function () {
      var scope = this;
      try {
        let swiftMessagesLength = 0;
        let paymentAdvicesLength = 0;
        let swiftMessages = [];
        let paymentAdvices = [];
        let swiftAndAdviceRecords = [];
        if (viewDetailsResponse.hasOwnProperty('PaymentAdvices')) {
          paymentAdvices = viewDetailsResponse.PaymentAdvices;
          paymentAdvicesLength = paymentAdvices.length;
        }
        if (viewDetailsResponse.hasOwnProperty('SwiftMessages')) {
          swiftMessages = viewDetailsResponse.SwiftMessages;
          swiftMessagesLength = swiftMessages.length;
        }

        swiftAndAdviceRecords = [...paymentAdvices, ...swiftMessages];
        if (swiftMessagesLength > 0 || paymentAdvicesLength > 0) {
          scope.view.flxSwiftAdvicesMain.setVisibility(true);
          scope.view.lblSwiftAndAdvices.cursorType = "pointer";
          scope.view.lblSwiftAndAdvices.text = kony.i18n.getLocalizedString("i18n.ImportLC.SwiftsAdvices") + "(" + (swiftMessagesLength + paymentAdvicesLength) + ")";
          scope.view.flxSwiftAdvicesMain.onClick = scope.renderSwiftAndAdviceOptions.bind(scope, swiftAndAdviceRecords);
        } else {
          scope.view.flxSwiftAdvicesMain.setVisibility(false);
        }
      } catch (err) {
        var errorObj = {
          "method": "renderSwiftAndAdvices",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : renderSwiftAndAdviceOptions
     * Navigating to print
     * @param {array} : swiftAndAdviceRecords to lod in segment
     * @return : NA
     */
    renderSwiftAndAdviceOptions: function (swiftAndAdviceRecords) {
      var scope = this;
      try {
        scope.view.flxSwiftAdvicesinfo.setVisibility(!scope.view.flxSwiftAdvicesinfo.isVisible);
        scope.view.segSwiftAdvicesInfoContent.widgetDataMap = { lblValue: "lblValue" };

        // Processing swiftAndAdviceRecords data
        let masterData = [];
        swiftAndAdviceRecords.map(item => {
          let tempMasterData = {
            lblValue: {
              "text": item.hasOwnProperty('adviceName') ?
                kony.i18n.getLocalizedString("i18n.TradeFinance.PaymentAdvice") + ' (' + scope.presenter.getConvertedDate(item, 'paymentDate') + ')'
                :
                kony.i18n.getLocalizedString("i18n.TradeFinance.swiftMT") + ' (' + scope.presenter.getConvertedDate(item, 'createdDate') + ')',
              "cursorType": "pointer"
            }
          }
          masterData.push(tempMasterData);
        });

        // setting data into segment
        scope.view.segSwiftAdvicesInfoContent.setData(masterData);
        scope.view.segSwiftAdvicesInfoContent.onRowClick = this.onRowClickOfSwiftAndAdvices.bind(scope, swiftAndAdviceRecords);
      } catch (err) {
        var errorObj = {
          "method": "renderSwiftAndAdviceOptions",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : onRowClickOfSwiftAndAdvices
     * Displaying popup based on user click on Swift And Advices dropdown
     * @arg {swiftAndAdviceRecords} : Available records in Swift And Advices dropdown
     * @return : NA
     */
    onRowClickOfSwiftAndAdvices: function (swiftAndAdviceRecords) {
      var scope = this;
      try {
        // Selected item always at [1]
        let currentSelectedRowIndex = this.view.segSwiftAdvicesInfoContent.selectedRowIndex[1]
        let selectedRecord = swiftAndAdviceRecords[currentSelectedRowIndex];
        scope.view.flxSwiftAdvicesinfo.setVisibility(false);
        scope.view.flxDialogs.setVisibility(true);
        scope.view.flxSwiftDetailsPopup.setVisibility(false);
        scope.view.flxMainPaymentPopup.setVisibility(false);
        if (selectedRecord.hasOwnProperty('adviceName')) {
          // Payment Advice Logic
          scope.view.flxMainPaymentPopup.setVisibility(true);
          scope.view.lblPaymentAdvice.text = kony.i18n.getLocalizedString("i18n.TradeFinance.PaymentAdvice");
          // Configuring segments
          scope.view.segPaymentAdvice.widgetDataMap = { lblLeft1: "lblLeft1", lblRight1: "lblRight1" };
          // Processing swiftAndAdviceRecords data
          let masterData = [
            {
              lblLeft1: scope.presenter.renderI18nKeys('i18n.TransfersEur.Beneficiary', true),
              lblRight1: scope.presenter.getDynamicData(selectedRecord, 'beneficiary')
            },
            {
              lblLeft1: scope.presenter.renderI18nKeys('i18n.billPay.PaymentDate', true),
              lblRight1: scope.presenter.getConvertedDate(selectedRecord, 'paymentDate')
            },
            {
              lblLeft1: scope.presenter.renderI18nKeys('i18n.common.creditedAmount', true),
              lblRight1: scope.presenter.getDynamicData(selectedRecord, 'currency') + " " + scope.presenter.getDynamicData(selectedRecord, 'creditedAmount')
            },
            {
              lblLeft1: scope.presenter.renderI18nKeys('i18n.TradeFinance.CreditedAccount', true),
              lblRight1: selectedRecord.creditedAccount ? CommonUtilities.getMaskedAccName(selectedRecord.creditedAccount)[0] : NA
            },
            {
              lblLeft1: scope.presenter.renderI18nKeys('i18n.TradeFinance.ChargesDebited', true),
              lblRight1: scope.presenter.getDynamicData(selectedRecord, 'currency') + " " + scope.presenter.getDynamicData(selectedRecord, 'charges')
            },
            {
              lblLeft1: scope.presenter.renderI18nKeys('i18n.TradeFinance.AdvisingBank', true),
              lblRight1: scope.presenter.getDynamicData(selectedRecord, 'advisingBank')
            },
            {
              lblLeft1: scope.presenter.renderI18nKeys('i18n.TradeFinance.claimRefNoWithColon', false),
              lblRight1: scope.presenter.getDynamicData(selectedRecord, 'orderId')
            }
          ];
          // setting data into segment
          scope.view.segPaymentAdvice.setData(masterData);
          scope.view.flxSearchIcon.cursorType = "pointer";
          scope.view.flxSearchIcon.onClick = scope.closePopup.bind(scope, 'flxMainPaymentPopup');
        } else {
          // Swift MT popup logic
          scope.view.flxSwiftDetailsPopup.setVisibility(true);
          scope.view.flxCross.cursorType = 'pointer';
          scope.view.flxCross.onClick = scope.closePopup;
          scope.renderSwiftMTPopup(selectedRecord);
        }
      } catch (err) {
        var errorObj = {
          "method": "onRowClickOfSwiftAndAdvices",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
         * Displaying popup based on user click on Release Liability
         *@return : NA
         */
         renderLiabilityPopup: function() {
          var scope = this;
          try {
              scope.view.flxLiabilityContainer.top = "100dp";
              scope.view.txtAmountTobeReleased.text = "";
              scope.view.txtReleaseLiabilityDetails.text = "";
              scope.view.txtMessageToBank.text = "";
              FormControllerUtility.disableButton(scope.view.btnSubmit);
              scope.view.lblAmountError.setVisibility(false);
              let releasedAmount = 0;
                if(viewDetailsResponse.liabilityDetails) {
                    let liabilityInfo = JSON.parse(viewDetailsResponse.liabilityDetails.replace(/'/g, "\""));
                    let totalAmountReleasedArray = liabilityInfo.map(item => item.amountToRelease);
                    for (i = 0; i < totalAmountReleasedArray.length; i++) {
                        releasedAmount += parseFloat(totalAmountReleasedArray[i]);
                    }  
                }
              scope.view.lblOutstandingAmount.text = "(" + scope.presenter.renderI18nKeys("i18n.TradeFinance.outstandingAmount", false) + ": " + viewDetailsResponse.currency + " " + (parseFloat(viewDetailsResponse.amount) - parseFloat(releasedAmount))+ ")";
              scope.view.txtCurrency.text = viewDetailsResponse.currency;
              scope.view.txtCurrency.setEnabled(false);
              scope.view.flxCrossIcon.cursorType = 'pointer';
              scope.view.flxCrossIcon.onClick = scope.closePopup;
              scope.view.flxButtons.btnCancel.onClick = scope.closePopup;
              CommonUtilities.disableOldDaySelection(scope.view.calDateOfRelease);
              const regex = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_-\\?/+={[]}:;<>'`|\"";
              scope.view.txtAmountTobeReleased.restrictCharactersSet = regex;
          } catch (err) {
              var errorObj = {
                  "method": "renderLiabilityPopup",
                  "error": err
              };
              scope.onError(errorObj);
          }
      },
      validateInput: function () {
          var scope = this;
          let enableSubmitButton = scope.view.txtReleaseLiabilityDetails.text.length > 0 && JSON.parse(scope.view.txtAmountTobeReleased.text) <= viewDetailsResponse.amount;
          if (JSON.parse(scope.view.txtAmountTobeReleased.text) > viewDetailsResponse.amount) {
            scope.view.lblAmountError.setVisibility(true);
          } else {
            scope.view.lblAmountError.setVisibility(false);
          }
          if (enableSubmitButton) {
            FormControllerUtility.enableButton(scope.view.btnSubmit);
          }
          else {
            FormControllerUtility.disableButton(scope.view.btnSubmit);
          }
        },
        submitLiability: function() {
          var scope = this;
          liabilityParams.guaranteeSrmsId = viewDetailsResponse.guaranteeSrmsId;
          liabilityParams.releaseDate = scope.view.calDateOfRelease.formattedDate;
          liabilityParams.amountToRelease = scope.view.txtAmountTobeReleased.text;
          liabilityParams.liabilityDetails = scope.view.txtReleaseLiabilityDetails.text;
          liabilityParams.messageToBank = scope.view.txtMessageToBank.text;
          scope.presenter.releaseLiability(liabilityParams, "frmGuaranteeReceivedViewDetails");
          scope.view.flxDialogs.setVisibility(false);
          scope.view.flxLiabilityPopup.setVisibility(false);
      },

    /**
     * @api : closePopup
     * Closing the popup based on popup name
     * @arg {popupFlexName} : Popup flex name
     * @return : NA
     */
    closePopup: function (popupFlexName) {
      var scope = this;
      try {
        scope.view.flxDialogs.setVisibility(false);
        scope.view[popupFlexName].setVisibility(false);
      } catch (err) {
        var errorObj = {
          "method": "closePopup",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : seti18nKeys
     * Navigating to print
     * @return : NA
     */
    seti18nKeys: function () {
      var scope = this;
      try {
        scope.view.lblLCSubHeader.text = kony.i18n.getLocalizedString("i18n.TradeFinance.receivedGuaranteeStandbyLC");
        scope.view.btnTab.text = kony.i18n.getLocalizedString("i18n.TradeFinance.GuaranteeAndStandbyLC");
        scope.view.btnAmendmentsTab.text = kony.i18n.getLocalizedString("i18n.ImportLC.Amendments");
        scope.view.btnClaimsTab.text = kony.i18n.getLocalizedString("i18n.TradeFinance.claims");
        scope.view.lblContainerHeadingContent.text = kony.i18n.getLocalizedString("i18n.TradeFinance.GTSBLCDetails");
        scope.view.lblSelfAcceptanaceHeader.text = kony.i18n.getLocalizedString("i18n.TradeFinance.SelfAcceptance");
        scope.view.lblAcceptanceRaised.text = kony.i18n.getLocalizedString("i18n.TradeFinance.yourAcceptance");
        scope.view.lblAccept.text = kony.i18n.getLocalizedString("i18n.TradeFinance.Accept");
        scope.view.lblReject.text = kony.i18n.getLocalizedString("i18n.konybb.myApproval.Reject");
        scope.view.lblRejectReasons.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ReasonSelfRejection");
        scope.view.txtAreaRejectReason.placeholder = kony.i18n.getLocalizedString("i18n.TradeFinance.enterTextHere");
        scope.view.lblMessageToBank.text = kony.i18n.getLocalizedString("i18n.TradeFinance.MessageToBank");
        scope.view.txtMessageToBankValue.placeholder = kony.i18n.getLocalizedString("i18n.TradeFinance.enterTextHere");
        scope.view.btnConsentBack.text = kony.i18n.getLocalizedString("i18n.TransfersEur.btnBack");
        scope.view.btnBack.text = kony.i18n.getLocalizedString("i18n.TransfersEur.btnBack");
      } catch (err) {
        var errorObj = {
          "method": "seti18nKeys",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
  * @api : setTabData
  * To set segment data for tab on button click
  * @return : NA
  */
    setTabData: function (tabName) {
      var scope = this;
      try {
        scope.currentTab = tabName;
        scope.setTabNavigation();
      } catch (err) {
        var errorObj = {
          "method": "setTabData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
   * @api : getSearchData
   * Gets on search
   * @return : NA
   */
    getSearchData: function () {
      var scope = this;
      try {
        var searchString = this.view.tbxSearch.text;
        this.lowerLimit = 1;
        scope.view.PaginationContainer.setPageSize(10);
        if (searchString !== null && searchString !== undefined) {
          this.isSearchEnabled = true;
          if (scope.currentTab === AMENDMENTS_TAB) {
            scope.serviceParameters.pageSize = "11";
            scope.serviceParameters.pageOffset = "0";
            scope.serviceParameters.searchString = searchString;
            scope.presenter.getReceivedGuaranteesAmendments(scope.serviceParameters, "frmGuaranteeReceivedViewDetails");
          } else if (scope.currentTab === CLAIMS_TAB) {
            scope.serviceParameters.pageSize = "11";
            scope.serviceParameters.pageOffset = "0";
            scope.serviceParameters.searchString = searchString;
            scope.presenter.getGuaranteeClaims(scope.serviceParameters, "frmGuaranteeReceivedViewDetails");
          }
          downloadXLSXData = scope.serviceParameters;
        } else {
          this.isSearchEnabled = false;
        }
      }
      catch (err) {
        var errorObj = {
          "method": "getSearchData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
   * @api : fetchDashboardData
   * This method will invoked to fetch the dashboard data 
   * @return : NA
   */
    fetchDashboardData: function (params) {
      try {
        var scope = this;
        if (params !== 'pagination' && params !== "sort") {
          scope.view.PaginationContainer.setLowerLimit(1);
          scope.view.PaginationContainer.setPageSize(10);
          scope.view.PaginationContainer.setIntervalHeader();
        }
        var searchStringtext = scope.view.tbxSearch.text;
        var pageOffsetValue = (params === "pagination" || params === "sort") ? scope.view.PaginationContainer.getPageOffset() : 0;
        scope.serviceParameters.searchString = searchStringtext;
        scope.serviceParameters.pageOffset = JSON.stringify(pageOffsetValue);
        if (scope.currentTab === AMENDMENTS_TAB) {
          scope.serviceParameters.filterByParam = "guaranteeSrmsId";
          scope.serviceParameters.filterByValue = viewDetailsResponse.guaranteeSrmsId;
          scope.presenter.getReceivedGuaranteesAmendments(scope.serviceParameters, "frmGuaranteeReceivedViewDetails");
        } else if (scope.currentTab === CLAIMS_TAB) {
          scope.serviceParameters.filterByParam = "guaranteesSRMSId";
          scope.serviceParameters.filterByValue = viewDetailsResponse.guaranteeSrmsId;
          scope.presenter.getGuaranteeClaims(scope.serviceParameters, "frmGuaranteeReceivedViewDetails");
        }
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteeReceivedViewDetailsController",
          "method": "fetchDashboardData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
* @api : setViewActions
* Set the default actions for component
* @return : NA
*/
    setViewActions: function () {
      var scope = this;
      try {
        var imageName = "";
        if (scope.currentTab === AMENDMENTS_TAB) {
          imageName = "flxAmendmentsColumn";
        } else {
          imageName = "flxClaimsColumn";
        }
        scope.view[imageName + 1].onClick = scope.sortRecords.bind(this, 1);
        scope.view[imageName + 2].onClick = scope.sortRecords.bind(this, 2);
        scope.view[imageName + 3].onClick = scope.sortRecords.bind(this, 3);
        scope.view[imageName + 4].onClick = scope.sortRecords.bind(this, 4);
        scope.view[imageName + 5].onClick = scope.sortRecords.bind(this, 5);
        scope.view[imageName + 6].onClick = scope.sortRecords.bind(this, 6);
        scope.view[imageName + 7] && (scope.view[imageName + 7].onClick = scope.sortRecords.bind(this, 7));
        scope.selectedTab = 1;
      } catch (err) {
        var errorObj = {
          "method": "setViewActions",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
   * @api : setDefaultSort
   * Method to set default sort icon image
   * @return : NA
   */
    setDefaultSort: function (widget) {
      var scope = this;
      try {
        for (const key in sortField) {
          scope.view[key].src = "sortingfinal_1.png";
        }
        scope.view[widget].src = "sorting_next.png";
      } catch (err) {
        var errorObj = {
          "method": "setDefaultSort",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
   * @api : sortRecords
   * Update sort icons and trigger a action to business controller to sort
   * @return : NA
   */
    sortRecords: function (columnNo) {
      var scope = this;
      try {
        var sortType = "";
        scope.serviceParameters.filterByParam = "";
        scope.serviceParameters.filterByValue = "";
        scope.sortApplied = true;
        var imageName = "";
        if (scope.currentTab === AMENDMENTS_TAB) {
          imageName = "imgColumnAmendmentsTab";
        } else if (scope.currentTab === CLAIMS_TAB) {
          imageName = "imgColumnClaimsTab";
        }
        var field = sortField[imageName + columnNo];
        if (scope.view[imageName + columnNo].src === "sortingfinal.png") {
          scope.view[imageName + columnNo].src = "sorting_previous.png";
          sortType = "DESC";
        } else if (scope.view[imageName + columnNo].src === "sorting_previous.png") {
          scope.view[imageName + columnNo].src = "sorting_next.png";
          sortType = "ASC";
        } else {
          scope.view[imageName + columnNo].src = "sorting_previous.png";
          sortType = "DESC";
        }
        for (var i = 1; i <= 7; i++) {
          if (i !== columnNo && scope.view[imageName + i]) {
            scope.view[imageName + i].src = "sortingfinal.png";
          }
        }
        scope.serviceParameters.sortByParam = field;
        scope.serviceParameters.sortOrder = sortType;
        scope.fetchDashboardData("sort");
      } catch (err) {
        var errorObj = {
          "method": "sortRecords",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
   * @api : setSegmentWidgetDataMap
   * This method will set the widget data map for segImportLCList segment
   * @return : NA
   */
    setSegmentWidgetDataMap: function () {
      var scope = this;
      try {
        if (scope.currentTab === CLAIMS_TAB) {
          this.view.segTransactionList.widgetDataMap = {
            "btnAction": "btnAction",
            "btnAction1": "btnAction1",
            "btnAction2": "btnAction2",
            "btnAction3": "btnAction3",
            "flxAction": "flxAction",
            "flxDropdown": "flxDropdown",
            "flxIdentifier": "flxIdentifier",
            "flxInitiatedClaimsList1": "flxInitiatedClaimsList1",
            "flxInitiatedClaimsList2": "flxInitiatedClaimsList2",
            "lblColumn1": "lblColumn1",
            "lblColumn2": "lblColumn2",
            "lblColumn3": "lblColumn3",
            "lblColumn4": "lblColumn4",
            "lblColumn5": "lblColumn5",
            "lblDropdown": "lblDropdown",
            "lblIdentifier": "lblIdentifier",
            "lblRowColumn1Key": "lblRowColumn1Key",
            "lblRowColumn1Value": "lblRowColumn1Value",
            "lblRowColumn2Key": "lblRowColumn2Key",
            "lblRowColumn2Value": "lblRowColumn2Value",
            "lblRowColumn3Key": "lblRowColumn3Key",
            "lblRowColumn3Value": "lblRowColumn3Value",
            "lblRowColumn4Key": "lblRowColumn4Key",
            "lblRowColumn4Value": "lblRowColumn4Value",
            "lblRow2Column1Key": "lblRow2Column1Key",
            "lblRow2Column1Value": "lblRow2Column1Value",
            "lblRow2Column2Key": "lblRow2Column2Key",
            "lblRow2Column2Value": "lblRow2Column2Value"
          };
        } else {
          this.view.segTransactionList.widgetDataMap = {
            "flxDropDown": "flxDropDown",
            "imgDropdown": "imgDropdown",
            "lblCoulmnTabValue1": "lblCoulmnTabValue1",
            "lblCoulmnTabValue2": "lblCoulmnTabValue2",
            "lblCoulmnTabValue3": "lblCoulmnTabValue3",
            "lblCoulmnTabValue4": "lblCoulmnTabValue4",
            "lblCoulmnTabValue5": "lblCoulmnTabValue5",
            "lblCoulmnTabValue6": "lblCoulmnTabValue6",
            "btnAction": "btnAction",
            "lblLCData1": "lblLCData1",
            "lblLCDataValue1": "lblLCDataValue1",
            "lblLCData2": "lblLCData2",
            "lblLCDataValue2": "lblLCDataValue2",
            "lblLCData3": "lblLCData3",
            "lblLCDataValue3": "lblLCDataValue3",
            "lblLCData4": "lblLCData4",
            "lblLCDataValue4": "lblLCDataValue4",
            "lblLCData5": "lblLCData5",
            "lblLCDataValue5": "lblLCDataValue5",
            "lblLCData6": "lblLCData6",
            "lblLCDataValue6": "lblLCDataValue6",
            "lblLCData7": "lblLCData7",
            "lblLCDataValue7": "lblLCDataValue7",
            "lblLCData8": "lblLCData8",
            "lblLCDataValue8": "lblLCDataValue8",
            "lblLCData9": "lblLCData9",
            "lblLCDataValue9": "lblLCDataValue9",
            "lblLCData10": "lblLCData10",
            "lblLCDataValue10": "lblLCDataValue10",
            "lblLCData11": "lblLCData11",
            "lblLCDataValue11": "lblLCDataValue11",
            "lblLCData12": "lblLCData12",
            "lblLCDataValue12": "lblLCDataValue12",
            "btnViewDetails": "btnViewDetails",
            "btnCreateNewLC": "btnCreateNewLC",
            "btnDownload": "btnDownload",
            "btnPrint": "btnPrint",
            "flxLCRowData8": "flxLCRowData8",
            "flxLCRowData7": "flxLCRowData7",
            "flxActionTab": "flxActionTab",
            "flxLCRowData12": "flxLCRowData12",
            "flxColumn3": "flxColumn3",
            "flxColumn4": "flxColumn4",
            "flxColumn5": "flxColumn5",
            "flxColumn6": "flxColumn6",
            "flxLCRowDetails2": "flxLCRowDetails2",
            "flxLCRowDetails3": "flxLCRowDetails3",
            "flxColumn2": "flxColumn2",
            "flxLCRowData3": "flxLCRowData3",
            "flxLCRowData6": "flxLCRowData6",
            "flxLCRowData4": "flxLCRowData4",
            "flxLCRowData2": "flxLCRowData2",
            "flxLCRowData5": "flxLCRowData5",
            "flxLCRowData11": "flxLCRowData11",
            "flxLCRowData10": "flxLCRowData10",
            "flxLCRowData9": "flxLCRowData9",
            "flxLCRowDetails": "flxLCRowDetails",
            "flxLCRowDetails1": "flxLCRowDetails1",
            "flxLCTransactionListRow": "flxLCTransactionListRow",
            "flxTopSeperator": "flxTopSeperator",
            "btnCreateClaim": "btnCreateClaim"
          };
        }
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteeReceivedViewDetailsController",
          "method": "setSegmentWidgetDataMap",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
   * @api : setDashboardData
   * This method will invoked to set dashboard data 
   * @return : NA
   */
    setDashboardData: function () {
      var scope = this;
      try {
        scope.previousIndex = undefined;
        if (scope.guaranteesLCDetails && scope.guaranteesLCDetails.length > 0) {
          scope.view.segTransactionList.setVisibility(true);
          scope.view.flxNoTransactions.setVisibility(false);
          scope.view.flxPagination.setVisibility(true);
        } else {
          scope.view.segTransactionList.setVisibility(false);
          scope.view.flxNoTransactions.setVisibility(true);
          scope.view.flxPagination.setVisibility(false);
          return;
        }
        const offset = scope.view.PaginationContainer.getPageOffset();
        if (offset === 0) {
          scope.view.flxPagination.PaginationContainer.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_INACTIVE;
        } else {
          scope.view.flxPagination.PaginationContainer.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_ACTIVE;
        }
        if (scope.guaranteesLCDetails.length > 10) {
          scope.view.flxPagination.PaginationContainer.imgPaginationNext.src = "pagination_next_active_container.png";
          scope.view.flxPagination.PaginationContainer.imgPaginationNext.imageScaleMode = constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS;
        } else {
          scope.view.flxPagination.PaginationContainer.imgPaginationNext.src = "pagination_next_inactive.png";
        }
        var rowTemplate = scope.getSegmentTemplate();
        scope.view.segTransactionList.rowTemplate = rowTemplate.row;
        const segData = scope.getSegmentData(scope.guaranteesLCDetails.slice(0, 10));
        scope.view.segTransactionList.setData(segData);
        scope.view.forceLayout();
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteeReceivedViewDetailsController",
          "method": "setDashboardData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : getSegmentData
    * This method will set listing data in dashboard
    * @return : NA
    */
    getSegmentData: function (ReceivedLCData) {
      var scope = this;
      const formatUtilManager = applicationManager.getFormatUtilManager();
      try {
        var orientationHandler = new OrientationHandler();
        scope.setSegmentWidgetDataMap();
        var breakpoint = kony.application.getCurrentBreakpoint();
        let template = "",
          segData = [];
        if (breakpoint === 1024 || orientationHandler.isTablet) {
          if (scope.currentTab === CLAIMS_TAB) {
            scope.view.imgColumnClaimsTab1.src = sorting_next.png;
            template = "flxInitiatedClaimsList2";
            for (const record of ReceivedLCData) {
              segData.push(Object.assign({
                "lblDropdown": "O",
                "flxInitiatedClaimsList2": {
                  "height": "50dp",
                  "skin": "sknflxffffffnoborder"
                },
                "lblIdentifier": {
                  "skin": "sknffffff15pxolbfonticons"
                },
                "flxIdentifier": {
                  "skin": "sknFlxIdentifier"
                },
                "flxDropdown": {
                  "onClick": this.handleSegmentRowView.bind(this)
                },
                "lblColumn1": record.beneficiaryName || NA,
                "lblColumn2": record.productType || NA,
                "lblColumn3": record.status || NA,
                "template": template,
                "lblRowColumn1Key": kony.i18n.getLocalizedString("i18n.TradeFinance.TransactionRef"),
                "lblRowColumn2Key": kony.i18n.getLocalizedString("i18n.TradeFinance.GTAndSlbc"),
                "lblRow2Column1Key": kony.i18n.getLocalizedString("i18n.TradeFinance.demandType"),
                "lblRow2Column2Key": kony.i18n.getLocalizedString("i18n.TradeFinance.newExtensionDate"),
                "lblRowColumn1Value": record.claimsSRMSId || NA,
                "lblRowColumn2Value": record.guaranteeAndSBLCType || NA,
                "lblRow2Column1Value": record.demandType || NA,
                "lblRow2Column2Value": record.newExtensionDate || NA,
                "btnAction": {
                  "text": kony.i18n.getLocalizedString(record.status.toLowerCase() === 'draft' ? 'i18n.ImportLC.ContinueEditing' : 'i18n.common.ViewDetails'),
                  "toolTip": kony.i18n.getLocalizedString(record.status.toLowerCase() === 'draft' ? 'i18n.ImportLC.ContinueEditing' : 'i18n.common.ViewDetails'),
                  "onClick": function () {
                    scope.presenter.showGuaranteesReceivedScreen({
                      context: record.status.toLowerCase() === 'draft' ? 'createGuaranteeClaim' : 'viewClaimDetails',
                      form: scope.view.id,
                      data: record
                    });
                  }
                },
                "btnAction1": {
                  "text": kony.i18n.getLocalizedString("i18n.common.Download"),
                  "toolTip": kony.i18n.getLocalizedString("i18n.common.Download"),
                  "onClick": function () {
                    scope.presenter.generateGuaranteesReceivedClaims(record);
                  }
                },
                "btnAction2": {
                  isVisible: false
                }
              }, record));
            }
          }
          else if (scope.currentTab === AMENDMENTS_TAB) {
            template = "flxLCAmendmentsCollapseTablet";
            for (const record of ReceivedLCData) {
              var beneficiaryName = record.beneficiaryDetails ? JSON.parse(record.beneficiaryDetails.replaceAll("'", "\""))[0].beneficiaryName : NA;
              segData.push(Object.assign(record, {
                "imgDropdown": "arrow_down.png",
                "flxDropDown": {
                  "onClick": scope.onSegmentRowToggle.bind(this)
                },
                "lblCoulmnTabValue1": beneficiaryName,
                "lblCoulmnTabValue3": {
                  "text": record.amendmentSrmsId ? record.amendmentSrmsId : NA,
                  "isVisible": true,
                  "width": "100%",
                  "left": "0%"
                },
                "lblCoulmnTabValue4": {
                  "text": record.receivedOn ? CommonUtilities.getFrontendDateString(record.receivedOn, applicationManager.getConfigurationManager().frontendDateFormat) : NA,
                  "isVisible": true,
                  "width": "100%",
                  "left": "0%"
                },
                "lblCoulmnTabValue6": {
                  "text": record.status ? record.status : NA,
                  "isVisible": true,
                  "width": "100%",
                  "left": "0%"
                },
                "template": template,
                "lblLCData1": kony.i18n.getLocalizedString("i18n.TradeFinance.productType"),
                "lblLCData2": "GT & SBLC Type",
                "lblLCData3": kony.i18n.getLocalizedString("kony.mb.common.Amount"),
                "lblLCData4": "Ammend Num",
                "lblLCData5": kony.i18n.getLocalizedString("i18n.TradeFinance.expiryType"),
                "lblLCData6": kony.i18n.getLocalizedString("i18n.TradeFinance.InstructingParty"),
                "lblLCData7": "Transaction Ref",
                "lblLCDataValue1": record.productType ? record.productType : NA,
                "lblLCDataValue2": record.lcType ? record.lcType : NA,
                "lblLCDataValue3": record.amendAmount ? record.currency + "" + record.amendAmount : NA, //need to format amount and currency
                "lblLCDataValue4": record.amendmentNo ? record.amendmentNo : NA,
                "lblLCDataValue5": record.amendExpiryType ? record.amendExpiryType : NA,
                "lblLCDataValue7": record.guaranteeSrmsId ? record.guaranteeSrmsId : NA,
                "flxColumn2": {
                  "isVisible": false
                },
                "flxColumn3": {
                  "left": "23%",
                  "isVisible": true
                },
                "flxColumn4": {
                  "left": "49%",
                  "isVisible": true
                },
                "flxColumn6": {
                  "left": "66%",
                  "isVisible": true
                },
                "flxLCRowDetails2": {
                  "isVisible": true
                },
                "btnDownload": {
                  "text": kony.i18n.getLocalizedString("i18n.common.Download"),
                  "toolTip": kony.i18n.getLocalizedString("i18n.common.Download"),
                  "onClick": function () {
                    scope.presenter.generateGuaranteesReceivedAmendments({
                      "amendmentSRMSRequestId": record.amendmentSrmsId
                    }, "frmGuaranteesReceivedDashboard");
                  }
                },
                "btnAction": {
                  "text": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
                  "toolTip": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
                  "onClick": function () {
                    scope.navigateLCView(record);
                  }
                },
                "btnPrint": {
                  "text": kony.i18n.getLocalizedString("i18n.accounts.print"),
                  "toolTip": kony.i18n.getLocalizedString("i18n.accounts.print"),
                  "onClick": function () {
                    selectedRecord = record;
                    isPrintNavigation = true;
                    scope.presenter.getReceivedGuaranteeById({
                      "guaranteeSrmsId": record.guaranteeSrmsId
                    }, "frmGuaranteesReceivedDashboard");
                  }
                }
              }, record));
            }
          }
        } else {
          if (scope.currentTab === CLAIMS_TAB) {
            scope.view.flxSegHeaderClaims.forceLayout();
            template = "flxInitiatedClaimsList1";
            for (const record of ReceivedLCData) {
              segData.push(Object.assign({
                "lblDropdown": "O",
                "flxInitiatedClaimsList1": {
                  "height": "50dp",
                  "skin": "sknflxffffffnoborder"
                },
                "lblIdentifier": {
                  "skin": "sknffffff15pxolbfonticons"
                },
                "flxIdentifier": {
                  "skin": "sknFlxIdentifier"
                },
                "flxDropdown": {
                  "onClick": this.handleSegmentRowView.bind(this)
                },
                "lblColumn1": record.beneficiaryName || NA,
                "lblColumn2": record.productType || NA,
                "lblColumn3": (record.claimCurrency && record.claimAmount) ? `${record.claimCurrency} ${formatUtilManager.formatAmount(record.claimAmount)}` : NA,
                "lblColumn4": record.createdOn ? formatUtilManager.getFormattedCalendarDate(record.createdOn) : NA,
                "lblColumn5": record.status || NA,
                "template": template,
                "lblRowColumn1Key": kony.i18n.getLocalizedString("i18n.TradeFinance.TransactionRef"),
                "lblRowColumn2Key": kony.i18n.getLocalizedString("i18n.TradeFinance.GTAndSlbc"),
                "lblRowColumn3Key": kony.i18n.getLocalizedString("i18n.Wealth.expiryDate"),
                "lblRowColumn4Key": kony.i18n.getLocalizedString("i18n.TradeFinance.demandType"),
                "lblRow2Column1Key": kony.i18n.getLocalizedString("i18n.TradeFinance.newExtensionDate"),
                "lblRow2Column2Key": kony.i18n.getLocalizedString("kony.mb.cardManage.issuingBank"),
                "lblRowColumn1Value": record.claimsSRMSId || NA,
                "lblRowColumn2Value": record.guaranteeAndSBLCType || NA,
                "lblRowColumn3Value": record.expiryDate ? formatUtilManager.getFormattedCalendarDate(record.expiryDate) : NA,
                "lblRowColumn4Value": record.demandType || NA,
                "lblRow2Column1Value": record.newExtensionDate || NA,
                "lblRow2Column2Value": record.issuingBank || NA,
                "btnAction": {
                  "text": kony.i18n.getLocalizedString(record.status.toLowerCase() === 'draft' ? 'i18n.ImportLC.ContinueEditing' : 'i18n.common.ViewDetails'),
                  "toolTip": kony.i18n.getLocalizedString(record.status.toLowerCase() === 'draft' ? 'i18n.ImportLC.ContinueEditing' : 'i18n.common.ViewDetails'),
                  "onClick": function () {
                    scope.presenter.showGuaranteesReceivedScreen({
                      context: record.status.toLowerCase() === 'draft' ? 'createGuaranteeClaim' : 'viewClaimDetails',
                      form: scope.view.id,
                      data: record
                    });
                  }
                },
                "btnAction1": {
                  "text": kony.i18n.getLocalizedString("i18n.common.Download"),
                  "toolTip": kony.i18n.getLocalizedString("i18n.common.Download"),
                  "onClick": function () {
                    scope.presenter.generateGuaranteesReceivedClaims(record);
                  }
                },
                "btnAction2": {
                  "text": kony.i18n.getLocalizedString("i18n.accounts.print"),
                  "toolTip": kony.i18n.getLocalizedString("i18n.accounts.print"),
                  "onClick": function () {
                    scope.presenter.showGuaranteesReceivedScreen({
                      context: 'printClaim',
                      form: scope.view.id,
                      data: Object.assign({
                        printCallback: function () {
                          applicationManager.getNavigationManager().navigateTo({ appName: 'TradeFinanceMA', friendlyName: 'frmGuaranteesReceivedDashboard' }, false, { flowType: 'Claims' });
                        }
                      }, record)
                    });
                  }
                }
              }, record));
            }
          }
          else if (scope.currentTab === AMENDMENTS_TAB) {
            template = "flxLCAmendmentsCollapse";
            for (const record of ReceivedLCData) {
              var beneficiaryName = record.beneficiaryDetails ? JSON.parse(record.beneficiaryDetails.replaceAll("'", "\""))[0].beneficiaryName : NA;
              segData.push(Object.assign(record, {
                "imgDropdown": "arrow_down.png",
                "flxDropDown": {
                  "onClick": scope.onSegmentRowToggle.bind(this)
                },
                "lblCoulmnTabValue1": beneficiaryName,
                "lblCoulmnTabValue2": record.guaranteeSrmsId ? record.guaranteeSrmsId : NA,
                "lblCoulmnTabValue3": {
                  "text": record.amendmentSrmsId ? record.amendmentSrmsId : NA,
                  "isVisible": true,
                  "width": "100%",
                  "left": "0%"
                },
                "lblCoulmnTabValue4": {
                  "text": record.receivedOn ? CommonUtilities.getFrontendDateString(record.receivedOn, applicationManager.getConfigurationManager().frontendDateFormat) : NA,
                  "isVisible": true,
                  "width": "100%",
                  "left": "0%"
                },
                "lblCoulmnTabValue5": {
                  "text": record.amendmentNo ? record.amendmentNo : NA,
                  "isVisible": true,
                  "width": "100%",
                  "left": "0%"
                },
                "lblCoulmnTabValue6": record.status ? record.status : NA,
                "template": template,
                "lblLCData1": kony.i18n.getLocalizedString("i18n.TradeFinance.productType"),
                "lblLCData2": "GT & SBLC Type",
                "lblLCData3": kony.i18n.getLocalizedString("kony.mb.common.Amount"),
                "lblLCData4": kony.i18n.getLocalizedString("i18n.TradeFinance.amdEffectiveDate"),
                "lblLCData5": kony.i18n.getLocalizedString("i18n.TradeFinance.expiryType"),
                "lblLCData6": kony.i18n.getLocalizedString("i18n.TradeFinance.InstructingParty"),
                "lblLCData7": kony.i18n.getLocalizedString("i18n.TradeFinance.CancellationStatus"),
                "lblLCDataValue1": record.productType ? record.productType : NA,
                "lblLCDataValue2": record.lcType ? record.lcType : NA,
                "lblLCDataValue3": record.amendAmount ? record.currency + "" + record.amendAmount : NA, //need to format amount and currency
                "lblLCDataValue5": record.amendExpiryType ? record.amendExpiryType : NA,
                "lblLCDataValue7": record.cancellationStatus ? record.cancellationStatus : NA,
                "flxLCRowDetails": {
                  "height": "170dp"
                },
                "flxLCRowData3": {
                  "isVisible": true,
                  "left": "51%"
                },
                "flxColumn3": {
                  "left": "36%",
                  "isVisible": true
                },
                "flxColumn4": {
                  "left": "49%",
                  "isVisible": true
                },
                "flxColumn5": {
                  "left": "57.8%",
                  "isVisible": true
                },
                "flxLCRowDetails2": {
                  "isVisible": true
                },
                "flxLCRowDetails5": {
                  "isVisible": true
                },
                "flxLCRowData4": {
                  "isVisible": true
                },
                "flxLCRowData6": {
                  "isVisible": true,
                  "width": "25%"
                },
                "flxLCRowDetails2": {
                  "isVisible": true
                },
                "flxLCRowData8": {
                  "isVisible": false
                },
                "flxLCRowData7": {
                  "isVisible": record.cancellationStatus ? true : false,
                  "left": "55.5%"
                },
                "flxLCRowData4": {
                  isVisible: false
                },
                "flxLCRowData6": {
                  isVisible: false
                },
                "btnDownload": {
                  "text": kony.i18n.getLocalizedString("i18n.common.Download"),
                  "toolTip": kony.i18n.getLocalizedString("i18n.common.Download"),
                  "onClick": function () {
                    scope.presenter.generateGuaranteesReceivedAmendments({
                      "amendmentSRMSRequestId": record.amendmentSrmsId
                    }, "frmGuaranteeReceivedViewDetails");
                  }
                },
                "btnAction": {
                  "text": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
                  "toolTip": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
                  "onClick": function () {
                    scope.navigateLCView(record);
                  }
                },
                "btnPrint": {
                  "text": kony.i18n.getLocalizedString("i18n.accounts.print"),
                  "toolTip": kony.i18n.getLocalizedString("i18n.accounts.print"),
                  "onClick": function () {
                    selectedRecord = record;
                    isPrintNavigation = true;
                    scope.presenter.getReceivedGuaranteeById({
                      "guaranteeSrmsId": record.guaranteeSrmsId
                    }, "frmGuaranteeReceivedViewDetails");
                  }
                }
              }, record));
            }
          }
        }
        return segData;
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteeReceivedViewDetailsController",
          "method": "getSegmentData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : navigateLCView
    * This method navigates screen to Create Guarantee flow or View Details based on the status.
    * @return : NA
    */
    navigateLCView: function (data) {
      var scope = this;
      try {
        const navManager = applicationManager.getNavigationManager();
        navToLCDetails = true;
        if (scope.currentTab === AMENDMENTS_TAB) {
          scope.presenter.getReceivedGuaranteeAmendmentsById({
            "amendmentSrmsId": data.amendmentSrmsId
          }, "frmGuaranteeReceivedViewDetails");
        }
      } catch (err) {
        var errorObj = {
          "method": "navigateLCView",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : onSegmentRowToggle
    * This metod will show expand and collapse row to show detailed view
    * @return : NA
    */
    onSegmentRowToggle: function () {
      var scope = this;
      try {
        var index = scope.view.segTransactionList.selectedRowIndex;
        var sectionIndex = index[0];
        var rowIndex = index[1];
        var data = scope.view.segTransactionList.data;
        var rowData = data[rowIndex];
        scope.rowData = rowData;
        var section = data.length;
        var segTemplate = scope.getSegmentTemplate();
        if (data[rowIndex].template !== segTemplate.expanded) {
          if (scope.previousIndex !== null && scope.previousIndex !== undefined && scope.previousIndex !== "") {
            data[scope.previousIndex].template = segTemplate.row;
            data[scope.previousIndex].imgDropdown = {
              image: "arrow_down.png"
            };
            switch (segTemplate.row) {
              case "flxLCAmendmentsCollapse":
                data[scope.previousIndex].lblCoulmnTabValue3.width = "100%";
                data[scope.previousIndex].lblCoulmnTabValue3.left = "0%"
                data[scope.previousIndex].lblCoulmnTabValue4.width = "100%";
                data[scope.previousIndex].lblCoulmnTabValue4.left = "0%"
                data[scope.previousIndex].lblCoulmnTabValue5.width = "100%";
                data[scope.previousIndex].lblCoulmnTabValue5.left = "0%"
                break;
              case "flxLCAmendmentsCollapseTablet":
                data[scope.previousIndex].lblCoulmnTabValue3.width = "100%";
                data[scope.previousIndex].lblCoulmnTabValue3.left = "0%";
                data[scope.previousIndex].lblCoulmnTabValue4.width = "100%";
                data[scope.previousIndex].lblCoulmnTabValue4.left = "0%";
                data[scope.previousIndex].lblCoulmnTabValue6.width = "100%";
                data[scope.previousIndex].lblCoulmnTabValue6.left = "0%";
            }
            scope.view.segTransactionList.setDataAt(data[scope.previousIndex], scope.previousIndex, sectionIndex);
          }
          data[rowIndex].imgDropdown = {
            image: "chevron_up.png"
          };
          data[rowIndex].template = segTemplate.expanded;
          scope.previousIndex = JSON.parse(JSON.stringify(rowIndex));
          switch (segTemplate.expanded) {
            case "flxLCAmendmentsExpand":
              data[rowIndex].lblCoulmnTabValue3.width = "110dp";
              data[rowIndex].lblCoulmnTabValue3.left = "35.5%";
              data[rowIndex].lblCoulmnTabValue4.width = "110dp";
              data[rowIndex].lblCoulmnTabValue4.left = "49%";
              data[rowIndex].lblCoulmnTabValue5.width = "110dp";
              data[rowIndex].lblCoulmnTabValue5.left = "57.8%";
              break;
            case "flxLCAmendmentsExpandTablet":
              data[scope.previousIndex].lblCoulmnTabValue3.width = "100%";
              data[scope.previousIndex].lblCoulmnTabValue3.left = "22%";
              data[scope.previousIndex].lblCoulmnTabValue4.width = "100%";
              data[scope.previousIndex].lblCoulmnTabValue4.left = "48%";
              data[scope.previousIndex].lblCoulmnTabValue6.width = "100%";
              data[scope.previousIndex].lblCoulmnTabValue6.left = "66%";
              break;
          }
          scope.view.segTransactionList.setDataAt(data[rowIndex], rowIndex, sectionIndex);
        } else {
          switch (segTemplate.row) {
            case "flxLCAmendmentsCollapse":
              data[scope.previousIndex].lblCoulmnTabValue3.width = "100%";
              data[scope.previousIndex].lblCoulmnTabValue3.left = "0%"
              data[scope.previousIndex].lblCoulmnTabValue4.width = "100%";
              data[scope.previousIndex].lblCoulmnTabValue4.left = "0%"
              data[scope.previousIndex].lblCoulmnTabValue5.width = "100%";
              data[scope.previousIndex].lblCoulmnTabValue5.left = "0%"
              break;
            case "flxLCAmendmentsCollapseTablet":
              data[scope.previousIndex].lblCoulmnTabValue3.width = "100%";
              data[scope.previousIndex].lblCoulmnTabValue3.left = "0%";
              data[scope.previousIndex].lblCoulmnTabValue4.width = "100%";
              data[scope.previousIndex].lblCoulmnTabValue4.left = "0%";
              data[scope.previousIndex].lblCoulmnTabValue6.width = "100%";
              data[scope.previousIndex].lblCoulmnTabValue6.left = "0%";
          }
          data[rowIndex].imgDropdown = {
            image: "arrow_down.png"
          };
          data[rowIndex].template = segTemplate.row;
          scope.view.segTransactionList.setDataAt(data[rowIndex], rowIndex, sectionIndex);
        }
        if (scope.view.flxListDropdown.isVisible === true) {
          scope.view.flxListDropDown.setVisibility = false;
        }
        scope.view.forceLayout();
      } catch (err) {
        var errorObj = {
          "method": "onSegmentRowToggle",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : setTabNavigation
    * This metod handles tab Navigation
    * @return : NA
    */
    setTabNavigation: function () {
      var scope = this;
      try {
        scope.view.tbxSearch.text = "";
        scope.view.imgClear.setVisibility(false);
        scope.view.segTransactionList.removeAll();
        scope.view.flxPagination.setVisibility(false);
        scope.view.flxListingDetails.width = "100%";
        scope.view.btnTab1.skin = "ICSknBtnAccountSummarySelected2";
        scope.view.btnTab2.skin = "ICSknBtnAccountSummaryUnselected2";
        scope.view.btnTab3.skin = "ICSknBtnAccountSummaryUnselected2";
        //Setting tab header data
        scope.view.flxSegHeaderAmendments.setVisibility(false);
        scope.view.tbxSearch.placeholder = scope.presenter.renderI18nKeys("i18n.TradeFinance.guaranteesSearchPlaceholder", false);
        if (scope.isSearchEnabled === false) {
          scope.view.tbxSearch.text = "";
          scope.view.imgClear.setVisibility(false);
        }
        if (scope.currentTab === GUARANTEES_TAB) {
          scope.view.flxContainerHeaderContent.setVisibility(true);
          scope.view.flxGuaranteeReceivedDetails.setVisibility(true);
          scope.view.flxButtonsActions.setVisibility(true);
          scope.view.flxMainContainer.setVisibility(false);
          scope.view.lblLCSubHeader.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.ReceivedGTAndSBLC", false) + "-" + viewDetailsResponse.guaranteeSrmsId;
          scope.view.flxContent.setVisibility(true);
          scope.view.flxListingDetails.setVisibility(false);
        }
        if (scope.currentTab === AMENDMENTS_TAB) {
          scope.view.flxContent.setVisibility(true);
          scope.view.flxContainerHeaderContent.setVisibility(false);
          scope.view.flxGuaranteeReceivedDetails.setVisibility(false);
          scope.view.flxSelfAcceptance.setVisibility(false);
          scope.view.flxButtonsActions.setVisibility(false);
          scope.view.flxMainContainer.setVisibility(false);
          scope.view.flxListingDetails.setVisibility(true);
          sortField.imgCoulmnTab3 = "billType";
          scope.serviceParameters = {
            searchString: "",
            pageSize: "11",
            pageOffset: 0,
            sortByParam: "amendRequestedDate",
            sortOrder: "DESC",
            timeParam: "amendRequestedDate",
            timeValue: "",
            filterByValue: "",
            filterByParam: "",
          };
          scope.switchToAmendmentsTab();
        }
        else if (scope.currentTab === CLAIMS_TAB) {
          scope.view.flxContent.setVisibility(true);
          scope.view.flxContainerHeaderContent.setVisibility(false);
          scope.view.flxGuaranteeReceivedDetails.setVisibility(false);
          scope.view.flxSelfAcceptance.setVisibility(false);
          scope.view.flxButtonsActions.setVisibility(false);
          scope.view.flxMainContainer.setVisibility(false);
          scope.view.flxListingDetails.setVisibility(true);
          scope.serviceParameters = {
            searchString: "",
            pageSize: "11",
            pageOffset: 0,
            sortByParam: "serviceRequestTime",
            sortOrder: "DESC",
            timeParam: "serviceRequestTime",
            timeValue: "6,MONTH",
            filterByValue: "",
            filterByParam: ""
          };
          scope.switchToClaimsTab();
        }
        scope.setViewActions();
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteeReceivedViewDetailsController",
          "method": "setTabNavigation",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
   * @api : switchToLOCTab
   * This metod handles functionalities on click of LOC Tab
   * @return : NA
   */
    switchToLOCTab: function () {
      var scope = this;
      try {

      } catch (err) {
        var errorObj = {
          "method": "switchToLOCTab",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    switchToAmendmentsTab: function () {
      var scope = this;
      try {
        scope.currentTab = AMENDMENTS_TAB;
        scope.view.lblLCSubHeader.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.ReceivedGTAndSBLC", false);
        scope.view.btnTab1.skin = "ICSknBtnAccountSummaryUnselected2";
        scope.view.btnTab2.skin = "ICSknBtnAccountSummarySelected2";
        scope.view.btnTab3.skin = "ICSknBtnAccountSummaryUnselected2";
        scope.view.flxSegLCHeader.setVisibility(false);
        scope.view.flxSegHeaderAmendments.setVisibility(true);
        scope.view.flxSegHeaderClaims.setVisibility(false);
        scope.view.tbxSearch.placeholder = kony.i18n.getLocalizedString("i18n.TradeFinance.guaranteesSearchPlaceholder");
        scope.setPaginationComponent(kony.i18n.getLocalizedString("i18n.ImportLC.Amendments"));
        var rowTemplate = scope.getSegmentTemplate();
        scope.view.segTransactionList.rowTemplate = rowTemplate.row;
        scope.setSegmentWidgetDataMap();
        scope.fetchDashboardData();
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteeReceivedViewDetailsController",
          "method": "switchToAmendmentsTab",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
     * @api : switchToClaimsTab
     * This metod handles functionalities on click of Claims Tab
     * @return : NA
     */
    switchToClaimsTab: function () {
      var scope = this;
      try {
        var breakpoint = kony.application.getCurrentBreakpoint();
        if (breakpoint === 1024 || orientationHandler.isTablet) {
          scope.setDefaultSort("imgColumnClaimsTab1");
        }
        else {
          scope.setDefaultSort("imgColumnClaimsTab4");
        }
        scope.currentTab = CLAIMS_TAB;
        scope.view.lblLCSubHeader.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.ReceivedGTAndSBLC", false);
        scope.isClaimsTabRendered = true;
        scope.view.btnTab1.skin = "ICSknBtnAccountSummaryUnselected2";
        scope.view.btnTab2.skin = "ICSknBtnAccountSummaryUnselected2";
        scope.view.btnTab3.skin = "ICSknBtnAccountSummarySelected2";
        scope.view.flxSegLCHeader.setVisibility(false);
        scope.view.flxSegHeaderAmendments.setVisibility(false);
        scope.view.flxClaimsHeader.setVisibility(true);
        scope.view.flxSegHeaderClaims.setVisibility(true);
        scope.view.tbxSearch.placeholder = scope.presenter.renderI18nKeys("i18n.TradeFinance.guaranteesSearchPlaceholder", false);
        scope.setPaginationComponent("Claims");
        var rowTemplate = scope.getSegmentTemplate();
        scope.view.segTransactionList.rowTemplate = rowTemplate.row;
        scope.setSegmentWidgetDataMap();
        scope.fetchDashboardData();
      } catch (err) {
        var errorObj = {
          "method": "switchToClaimsTab",
          "error": err
        };
        scope.onError(errorObj);
      }
    },    /**
      * @api : setPaginationComponent
      * This method will invoked to set pagination variables
      * @return : NA
      */
    setPaginationComponent: function (pageHeader) {
      var scope = this;
      try {
        scope.view.PaginationContainer.setPageSize(10);
        scope.view.PaginationContainer.setLowerLimit(1);
        scope.view.PaginationContainer.setPageHeader(pageHeader);
        scope.view.PaginationContainer.setServiceDelegate(scope.fetchDashboardData.bind(scope, 'pagination'));
        scope.view.PaginationContainer.setIntervalHeader();
      } catch (err) {
        var errorObj = {
          "method": "setPaginationComponent",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
* @api : getSegmentTemplate
* This metod will return segment template for breakpoint
* @return : {JSON}
*/
    getSegmentTemplate: function () {
      var scope = this;
      try {
        var segmentTemplate = {};
        var orientationHandler = new OrientationHandler();
        var breakpoint = kony.application.getCurrentBreakpoint();
        if (breakpoint === 1024 || orientationHandler.isTablet) {
          if (scope.currentTab === AMENDMENTS_TAB) {
            segmentTemplate["row"] = "flxLCAmendmentsCollapseTablet";
            segmentTemplate["expanded"] = "flxLCAmendmentsExpandTablet";
          } else if (scope.currentTab === CLAIMS_TAB) {
            segmentTemplate["row"] = "flxLCClaimsCollapseTablet";
            segmentTemplate["expanded"] = "flxLCClaimsExpandTablet";
          }
        } else {
          if (scope.currentTab === AMENDMENTS_TAB) {
            segmentTemplate["row"] = "flxLCAmendmentsCollapse";
            segmentTemplate["expanded"] = "flxLCAmendmentsExpand";
          } else if (scope.currentTab === CLAIMS_TAB) {
            segmentTemplate["row"] = "flxLCClaimsListCollapse";
            segmentTemplate["expanded"] = "flxLCClaimsListExpand";
          }
        }
        return segmentTemplate;
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteeReceivedViewDetailsController",
          "method": "getSegmentTemplate",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : navigateToPrint
     * Navigating to the print based on condition
     * @return : NA
     */
    navigateToPrint: function () {
      var scope = this;
      try {
        let dataObj = {
          lcData,
          previousFormName: 'frmReceivedGuaranteeAmendment'
        }
        formNameForPrint = 'frmPrintReceivedGuaranteeAmendments';
        new kony.mvc.Navigation({
          "appName": "TradeFinanceMA",
          "friendlyName": `GuaranteesReceivedUIModule/${formNameForPrint}`
        }).navigate(dataObj);
      } catch (err) {
        var errorObj = {
          "level": "frmReceivedGuaranteeAmendmentController",
          "method": "navigateToPrint",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : navigateToDownload
     * Navigation to download
     * @return : NA
     */
    navigateToDownload: function () {
      var scope = this;
      try {
        scope.presenter.generateGuaranteesReceivedAmendments({
          "amendmentSRMSRequestId": lcData.amendmentSrmsId
        }, "frmReceivedGuaranteeAmendment");
      } catch (err) {
        var errorObj = {
          "level": "frmReceivedGuaranteeAmendmentController",
          "method": "navigateToDownload",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : renderSwiftMTPopup
     * Rendering the data into swift popup
     * @arg  {swiftData} : Data to render the swift popup
     * @return : NA
    */
    renderSwiftMTPopup: function (swiftData) {
      var scope = this;
      try {
        scope.view.lblSwiftMessage.text = kony.i18n.getLocalizedString("i18n.TradeFinance.swiftMT") + " (" + scope.presenter.getConvertedDate(swiftData, 'createdDate') + ")";
        // Swift message always will be in English. That's why we hard coded the text in English below
        scope.view.lblSwiftMessageHeading.text = "*********************SWIFT AUTH. CORRECT************************";
        scope.view.lblSwiftMessageDetails.text = "*********************MESSAGE************************";
        scope.view.lblSwiftMessageFooterTwo.text = " *****************************End of Message**************************";
        scope.view.segSwiftPrimaryDetails.widgetDataMap = { lblSwiftDetailsKey: "lblSwiftDetailsKey" };
        let headerMasterData = [
          {
            lblSwiftDetailsKey: `Bcode: ${swiftData.bCode ? swiftData.bCode : NA}`
          },
          {
            lblSwiftDetailsKey: `BIC: ${swiftData.bic ? swiftData.bic : NA}`
          },
          {
            lblSwiftDetailsKey: `Transfer Date/Time: ${swiftData.transferDateOrTime ? swiftData.transferDateOrTime : NA}`
          },
          {
            lblSwiftDetailsKey: `Type: ${swiftData.type ? swiftData.type : NA}`
          }
        ];
        scope.view.segSwiftPrimaryDetails.setData(headerMasterData);

        this.view.segSwiftDetails.widgetDataMap = { lblSwiftDetailsKey: "lblSwiftDetailsKey", lblSwiftDetailsValue: "lblSwiftDetailsValue" };
        let swiftKeys = Object.keys(swiftData);
        let masterData = [];
        masterData.push(
          {
            lblSwiftDetailsKey: 'MESSAGE BODY',
            lblSwiftDetailsValue: '',
          }
        );
        swiftKeys.map(item => {
          if (item !== 'bCode' && item !== 'bic' && item !== 'transferDateOrTime' && item !== 'type' && item !== 'createdDate' && item !== 'orderId' && item !== 'swiftsAndAdvicesSrmsRequestOrderID') {
              masterData.push(
                {
                  lblSwiftDetailsKey: scope.parseTheData(swiftData[item], SWIFT_TAG),
                  lblSwiftDetailsValue: scope.parseTheData(swiftData[item])
                }
              );
          }
        });

        scope.view.segSwiftDetails.setData(masterData);
      } catch (err) {
        var errorObj = {
          "method": "renderSwiftMTPopup",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : parseTheData
     * Convertin string to JSON 
     * @arg {partialResponse} : Response from the service
     * @arg {renderType} : What to render
     * @return : NA
    */
    parseTheData: function (partialResponse, renderType) {
      var scope = this;
      try {
        partialResponse = JSON.parse(partialResponse.replace(/'/g, "\""));
        if (renderType === HEADER) {
          return  partialResponse.fieldName + ": " + partialResponse.fieldValue;
        } else if (renderType === SWIFT_TAG) {
          return  partialResponse.swiftTag + ": " + partialResponse.fieldName;
        }
        return partialResponse.fieldValue;
      } catch (err) {
        var errorObj = {
          "method": "parseTheData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
     * Method to handle the segment row view on click of dropdown
     */
    handleSegmentRowView: function () {
      try {
        const rowIndex = this.view.segTransactionList.selectedRowIndex[1];
        const data = this.view.segTransactionList.data;
        const breakpoint = kony.application.getCurrentBreakpoint();
        let expandedHeight;
        if (this.currentTab === CLAIMS_TAB) {
          expandedHeight = (breakpoint === 1024 || orientationHandler.isTablet) ? "188dp" : "200dp";
        }
        let pre_val;
        let requiredView = [];
        const collapsedView = ["O", false, "sknFlxIdentifier", "sknffffff15pxolbfonticons", "50dp", "sknflxffffffnoborder"];
        const expandedView = ["P", true, "sknflxBg4a90e2op100NoBorder", "sknSSP4176a415px", expandedHeight, "slFboxBGf8f7f8B0"];
        if (this.previousIndex === rowIndex) {
          requiredView = data[rowIndex].lblDropdown === "P" ? collapsedView : expandedView;
          this.toggleSegmentRowView(rowIndex, requiredView);
        } else {
          if (this.previousIndex >= 0) {
            pre_val = this.previousIndex;
            this.toggleSegmentRowView(pre_val, collapsedView);
          }
          pre_val = rowIndex;
          this.toggleSegmentRowView(rowIndex, expandedView);
        }
        this.previousIndex = rowIndex;
      } catch (err) {
        const errorObj = {
          "level": "frmReceivedGuaranteeAmendmentController",
          "method": "handleSegmentRowView",
          "error": err
        };
        this.onError(errorObj);
      }
    },
    /**
     * Method to toggle the segment row view
     * @param {Number} index - index of segment row to toggle
     * @param {Array} viewData - data which need to be assigned to toggled view
     */
    toggleSegmentRowView: function (index, viewData) {
      try {
        let data = this.view.segTransactionList.data[index];
        const template = data.template;
        data.lblDropdown = viewData[0];
        data.flxIdentifier.isVisible = viewData[1];
        data.flxIdentifier.skin = viewData[2];
        data.lblIdentifier.skin = viewData[3];
        data[template].height = viewData[4];
        data[template].skin = viewData[5];
        this.view.segTransactionList.setDataAt(data, index);
      } catch (err) {
        const errorObj = {
          "level": "frmReceivedGuaranteeAmendmentController",
          "method": "toggleSegmentRowView",
          "error": err
        };
        this.onError(errorObj);
      }
    },
    /**
    * @api : onError
    * Error thrown from catch block in component and shown on the form
    * @return : NA
    */
    onError: function (err) {
      var error = err;
      error.level = "frmViewDetailsController";
      // kony.ui.Alert(error);
    }
  };
});