define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants', 'FormatUtil'], function(CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants, FormatUtil) {

let recordData = null;
let finalResponse = {};
let lcDetails = {};
let amendmentDetails = {};
let amendmentRecord = {}; 
let params = {};
let navData = {};
let isTablet = false;
let tradefinanceModule;
  return {
    onNavigate: function(record) {
      recordData = record;
      lcDetails = record.ExportLetterOfCredit;
      amendmentRecord = record.ExportAmendment;
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      this.view.onBreakpointChange = this.onBreakpointChange;
      //this.view.init = this.init;
    },
    
    preShow: function(){
      var scope = this;
      try{
        scope.view.flxAcknowledgement.setVisibility(false);
        this.navManager = applicationManager.getNavigationManager();
        this.exportLCPresenter = applicationManager.getModulesPresentationController({
          appName: 'TradeFinanceMA',
          moduleName: 'ExportLCUIModule'
        });
      }
      catch(err){
        var errorObj = {
          "level": "frmExportAmendmentViewDetailsController",
          "method": "preShow",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    postShow: function(){
      var scope = this;
      try{
        FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter']);
        scope.view.customheadernew.forceCloseHamburger();
        scope.view.customheadernew.activateMenu("TradeFinance", "Exports");
        scope.view.imgRadioAccept.src = "radio_btn_inactive.png";
        scope.view.imgRadioReject.src = "radio_btn_inactive.png";
        scope.view.txtAreaRejectReason.text = "";
        scope.initButtonActions();
        scope.view.flxVerticalEllipsisDropdown.setVisibility(false);
        scope.view.lblExportAmendDetailsHeader.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ExportAmendment") + " - " + amendmentRecord.amendmentReferenceNo + " - " +  kony.i18n.getLocalizedString("kony.mb.common.details") ;
        this.exportLCPresenter.getExportLCAmendmentById(amendmentRecord.amendmentSRMSRequestId, "frmExportAmendmentViewDetails");
        tradefinanceModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ImportLCUIModule");
        this.view.flxLCDetailsContainer.doLayout = CommonUtilities.centerPopupFlex;
        this.view.ExportLCDetails.setContext(lcDetails);
      }
      catch(err){
        var errorObj = {
          "level": "frmExportAmendmentViewDetailsController",
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
        if (currentBreakpoint > 640 && currentBreakpoint <= 1024) {
          isTablet = true;
        } else if (kony.application.getCurrentBreakpoint() === 1366 || kony.application.getCurrentBreakpoint() === 1380) {
          isTablet = false;
        }
      } catch (err) {
        var errorObj = {
          "level": "frmExportAmendmentViewDetailsController",
          "method": "onBreakpointChange",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    
    initButtonActions: function(){
      var scope = this;
      try{
        scope.view.txtAreaRejectReason.onKeyUp = scope.selfAcceptanceToggleActions.bind(this, "txtAreaRejectReason");
        scope.view.flxAcceptRadioImg.onClick = scope.selfAcceptanceToggleActions.bind(this, "imgRadioAccept");
        scope.view.flxRejecttRadioImg.onClick = scope.selfAcceptanceToggleActions.bind(this, "imgRadioReject");
        scope.view.flxLCViewDetails.onClick = () => {
          scope.view.flxLCDetailsPopup.setVisibility(true);
        }
        scope.view.btnLCPopupClose.onClick = () => {
          scope.view.flxLCDetailsPopup.setVisibility(false);
        }
        scope.view.btnBack.onClick = scope.navigateClose.bind(this);
        scope.view.btnConsentBack.onClick = scope.navigateClose.bind(this);
        scope.view.btnBack.toolTip =  kony.i18n.getLocalizedString("i18n.TransfersEur.btnBack");
        scope.view.btnSubmitConsent.text = kony.i18n.getLocalizedString("i18n.TradeFinance.SubmitConsent");
        scope.view.btnBack.cursorType = "pointer";
        scope.view.btnSubmitConsent.toolTip =  kony.i18n.getLocalizedString("i18n.TransfersEur.btnBack");
        scope.view.btnSubmitConsent.cursorType = "pointer";
        scope.view.flxAcknowledgeClose.onClick = function(){
          scope.view.flxAcknowledgement.setVisibility(false);
        },
        scope.view.btnSubmitConsent.onClick = scope.updateExportAmendments.bind(this);
        scope.view.flxVerticalEllipsisBody.onClick = scope.renderPrintAndDownload.bind(this);
        scope.view.lblVerticalEllipsis.onTouchEnd = () => {
          if (scope.view.flxVerticalEllipsisDropdown.isVisible) {
            scope.view.flxVerticalEllipsisDropdown.setVisibility(false);
          } else {
            scope.view.flxVerticalEllipsisDropdown.setVisibility(true);
          }
        };
      }
      catch(err){
        var errorObj = {
          "level": "frmExportAmendmentViewDetailsController",
          "method": "initButtonActions",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
      * updateFormUI - the entry point method for the form controller.
      * @param {Object} viewModel - it contains the set of view properties and keys.
      */
    updateFormUI: function(viewModel){
      var scope = this;
      try{
         if (viewModel.isLoading === true) {
           FormControllerUtility.showProgressBar(this.view);
         } else if (viewModel.isLoading === false) {
           FormControllerUtility.hideProgressBar(this.view);
         }
        if (viewModel.exportLCAmendmentById) {
         // this.setViewLCDetails(viewModel.getExportLetterOfCredit);
          amendmentDetails = viewModel.exportLCAmendmentById;
          if(amendmentDetails.selfAcceptance === "Pending"){
            scope.view.flxSubmitButtonActions.setVisibility(true);
            scope.view.flxBackButtonActions.setVisibility(false);
            scope.view.flxSelfAcceptance.setVisibility(true);
            scope.view.flxRejectReasons.setVisibility(false);
            scope.submitConsentBtn(false);
          }
          else{
            scope.view.flxSubmitButtonActions.setVisibility(false);
            scope.view.flxBackButtonActions.setVisibility(true);
            scope.view.flxSelfAcceptance.setVisibility(false);
            scope.view.flxAcknowledgement.setVisibility(false);            
          }
        }
        if (viewModel.updatedExportLCAmendment) {
          //this.setViewLCDetails(viewModel.getExportLetterOfCredit);
          amendmentDetails = viewModel.updatedExportLCAmendment;
          scope.view.flxAcknowledgement.setVisibility(true);
          scope.view.flxSubmitButtonActions.setVisibility(false);
          scope.view.flxSelfAcceptance.setVisibility(false);
          scope.view.flxBackButtonActions.setVisibility(true);          
        }
        scope.setLCSummaryData();
        scope.setAmendmentDetailsData();
        scope.setAmendmetRequestedData();
        scope.setAmendmentChargesData();
      }
      catch(err){
        var errorObj = {
          "level": "frmExportAmendmentViewDetailsController",
          "method": "setsegAmendmentWidgetDataMap",
          "error": err
        };
        scope.onError(errorObj);
      } 
    },
    
    setLCSummaryData: function(){
      var scope = this;
      try{
        const userObj = applicationManager.getUserPreferencesManager().getUserObj();
        //set i18n keys
        scope.view.lblLCSummary.text =  kony.i18n.getLocalizedString("i18n.TradeFinance.LCSummary");
        scope.view.lblViewLCDetails.text =  kony.i18n.getLocalizedString("i18n.TradeFinance.ViewLCDetails");
        scope.view.lblBeneficiary.text =  kony.i18n.getLocalizedString("i18n.TradeFinance.Beneficiary") + ":";
        scope.view.lblLCRefNo.text =  kony.i18n.getLocalizedString("i18n.TradeFinance.LCRefNo") + ":";
        scope.view.lblLCType.text =  kony.i18n.getLocalizedString("i18n.ImportLC.LCType") + ":";
        scope.view.lblLCAmount.text =  kony.i18n.getLocalizedString("i18n.ExportLC.LCAmount") + ":";
        scope.view.lblIssueDate.text =  kony.i18n.getLocalizedString("i18n.TradeFinance.IssueDate") + ":";
        scope.view.lblExpiryDate.text =  kony.i18n.getLocalizedString("i18n.TradeFinance.ExpiryDate") + ":";
        scope.view.lblPaymentTerms.text =  kony.i18n.getLocalizedString("i18n.TradeFinance.PaymentTerms") + ":";
        scope.view.lblCustomerName.text =  kony.i18n.getLocalizedString("i18n.accountDetail.customerName") + ":";
        scope.view.lblCustomerID.text =  kony.i18n.getLocalizedString("kony.18n.approvalMatrix.lblCustomerID");
        scope.view.lblViewLCDetails.toolTip = kony.i18n.getLocalizedString("i18n.TradeFinance.ViewLCDetails");  
        scope.view.lblSelfAcceptanaceHeader.text = kony.i18n.getLocalizedString("i18n.TradeFinance.SelfAcceptance");
        scope.view.lblAmendmentRaised.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AcceptanceAmendmentRaised");
        scope.view.lblRejectReasons.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ReasonSelfRejection");
        // LC details Value
        scope.view.lblBeneficiaryValue.text = lcDetails.beneficiaryName;
        scope.view.lblLCRefNoValue01.text = lcDetails.lcReferenceNo;
        scope.view.lblLCTypeValue.text = lcDetails.lcType;
        scope.view.lblLCAmountValue1.text = lcDetails.amountFormatted;
        scope.view.lblIssueDateValue.text = lcDetails.issueDateFormatted;
        scope.view.lblExpiryDateValue.text = lcDetails.expiryDateFormatted;
        scope.view.lblPaymentTermsValue.text = lcDetails.paymentTerms;
        scope.view.lblCustomerNameValue.text = userObj.userfirstname + ' ' + userObj.userlastname;
        scope.view.lblCustomerIDValue.text = userObj.CoreCustomers[0].coreCustomerID;
      }
      catch(err){
        var errorObj = {
          "level": "frmExportAmendmentViewDetailsController",
          "method": "setLCSummaryData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    renderPrintAndDownload: function () {
      var scope = this;
      try {
        scope.view.segVerticalDropdownEllipsis.widgetDataMap = {
          flxLCAccountType: 'flxLCAccountType',
          imgLCCheckbox: 'imgLCCheckbox',
          lblLCCheckbox: 'lblLCCheckbox',
          lblLCAccountType: 'lblLCAccountType'
        };
        let masterData = [];
        scope.exportLCPresenter.contextualMenuData.map(item => {
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
            lblLCAccountType: item.text
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
          if (recordData.ExportAmendment.amendmentStatus === OLBConstants.EXPORT_AMENDMENT_STATUS.APPROVED) {
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
     * @api : navigateToPrint
     * Navigating to the print based on condition
     * @return : NA
     */
    onPrintAndDownloadRowClick: function (id) {
      var scope = this;
      try {
        scope.view.flxVerticalEllipsisDropdown.setVisibility(false);
        if (id == 'print') {
          navData.importLCId = amendmentDetails.amendmentSRMSRequestId;
          let navigationToPrintData = {};
          navData = amendmentDetails;
          navData["frmName"] = "frmExportAmendDetails";
          navigationToPrintData["LOCNavData"] = lcDetails;
          navigationToPrintData["Data"] = navData;
          tradefinanceModule.presentationController.navigateToForm("TradeFinanceMA", "ImportLCUIModule/frmAmendmentsPrint", navigationToPrintData);
        } else if (id == "download") {
          scope.exportLCPresenter.generateExportAmendment({
            amendmentReferenceNo: amendmentDetails.amendmentSRMSRequestId
          }, 'frmExportAmendmentViewDetails');
        } else if (id == 'raiseQuery') {
          let record = recordData.ExportAmendment;
          let queryObj = {};
          queryObj.subject = `${kony.i18n.getLocalizedString("i18n.TradeFinance.queryTradeFinance")} - ${record.amendmentSRMSRequestId}`;
          queryObj.descriptionObj = {};
          record.amendmentStatus && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.AmendedStatus")] = record.amendmentStatus);
          record.amendmentReceivedDateFormatted && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.AmendedOn")] = record.amendmentReceivedDateFormatted);
          record.lcType && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.ImportLC.LCType")] = record.lcType);
          record.amendmentChargesPayer && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.ChargesPaidBy")] = record.amendmentChargesPayer);
          record.lcType && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.PaymentTerms")] = record.lcType);
          queryObj.tradeModule = true;
          scope.exportLCPresenter.showMessagesScreen(queryObj);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmExportAmendmentViewDetailsController",
          "method": "onPrintAndDownloadRowClick",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    setsegAmendmentWidgetDataMap: function (segName) {
      var scope = this;
      try {
        var breakpoint = kony.application.getCurrentBreakpoint();
        var orientationHandler = new OrientationHandler();
        if (breakpoint === 1024 || orientationHandler.isTablet) {
          scope.view[segName].rowTemplate = "flxAmendRowTemplateTablet";
        }
        else{
          scope.view[segName].rowTemplate = "flxAmendRowTemplate";
        }
        scope.view[segName].widgetDataMap = {
          "flxAmendmentRowTemplate" : "flxAmendmentRowTemplate",
          "flxreviewRows" : "flxreviewRows",
          "lblReview" : "lblReview",
          "flxReviewRight" : "flxReviewRight",
          "flxReviewValues" : "flxReviewValues",
          "lblReviewValue1" : "lblReviewValue1"
        };

      }
      catch (err) {
        var errorObj = {
          "level": "frmExportAmendmentViewDetailsController",
          "method": "setsegAmendmentWidgetDataMap",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    setAmendmentDetailsData: function(){
      var scope = this;
      try{
        scope.view.lblAmendmentDetails.text =  kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentDetails");
        scope.setsegAmendmentWidgetDataMap("segAmendmentDetails");
        var selfAcceptanceRejectDate = amendmentDetails.selfAcceptanceDate ?  amendmentDetails.selfAcceptanceDate : amendmentDetails.selfRejectedDate;
        var AmendmentDetails = [{
          lblReview: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentReference") + ":"
          },
          lblReviewValue1: {
            text: amendmentDetails.amendmentReferenceNo       
        }
        },{
          lblReview: {
            text:  kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentNumber") + ":"
          },
          lblReviewValue1: {
            text: amendmentDetails.amendmentNo        
        }
        },{
          lblReview: {
            text:  kony.i18n.getLocalizedString("i18n.TradeFinance.ReceivedOn") + ":"
          },
          lblReviewValue1: {
            text: amendmentDetails.amendmentReceivedDate ? CommonUtilities.getDateAndTimeInUTC(amendmentDetails.amendmentReceivedDate).substr(0,10) : kony.i18n.getLocalizedString("i18n.common.NA")        
        }
        },{
          lblReview: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentStatus") + ":"
          },
          lblReviewValue1: {
            text: amendmentDetails.amendmentStatus,
            skin: 'sknlbl424242SSP15pxSemibold'       
        }
        },{
          lblReview: {
            text:  kony.i18n.getLocalizedString("i18n.ImportLC.Acceptance") + "/" +  kony.i18n.getLocalizedString("i18n.TradeFinance.RejectionDate") + ":"
          },
          lblReviewValue1: {
            text: selfAcceptanceRejectDate ? CommonUtilities.getDateAndTimeInUTC(selfAcceptanceRejectDate).substr(0,10) : kony.i18n.getLocalizedString("i18n.common.NA")          
        }
        },{
          lblReview: {
            text:  kony.i18n.getLocalizedString("i18n.TradeFinance.SelfAcceptance") + ":"
          },
          lblReviewValue1: {
            text:  amendmentDetails.selfAcceptance 
        }
        }];
        scope.view.segAmendmentDetails.setData(AmendmentDetails);
      }
      catch(err){
        var errorObj = {
          "level": "frmExportAmendmentViewDetailsController",
          "method": "setAmendmentDetailsData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },


    setAmendmetRequestedData: function(){
      var scope = this;
      try{
        scope.view.lblAmendmentsReqHeader.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmetsRequested");
        scope.view.lblAmendLCAmount.text =  kony.i18n.getLocalizedString("i18n.ExportLC.LCAmount") + ":";
        scope.view.lblOtherAmendments.text = kony.i18n.getLocalizedString("i18n.TradeFinance.OtherAmendments") + ":";
        let formatUtil = applicationManager.getFormatUtilManager();
        var lcAmountDiff = formatUtil.formatAmountandAppendCurrencySymbol(amendmentDetails.newLcAmount - amendmentDetails.oldLcAmount, amendmentDetails.lcCurrency);
        this.view.lblAmendmentsReqHeader.text =  kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentsRequested");
        scope.setsegAmendmentWidgetDataMap("segAmendmentsRequested");
        var AmendmentRequestedDetails = [{
          lblReview: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.ExpiryDate") + ":"
          },
          lblReviewValue1: {
            text: amendmentDetails.lcExpiryDate ? CommonUtilities.getDateAndTimeInUTC(amendmentDetails.lcExpiryDate).substr(0,10) : kony.i18n.getLocalizedString("i18n.common.NA")       
        }
        },{
          lblReview: {
            text:  kony.i18n.getLocalizedString("i18n.TradeFinance.AmendLatestShipmentDate") + ":"
          },
          lblReviewValue1: {
            text: amendmentDetails.latestShipmentDate ? CommonUtilities.getDateAndTimeInUTC(amendmentDetails.latestShipmentDate).substr(0,10) : kony.i18n.getLocalizedString("i18n.common.NA")      
        }
        },{
          lblReview: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.PeriodOfPresentation") + ":"
          },
          lblReviewValue1: {
            text: amendmentDetails.periodOfPresentation       
        }
        }];
        scope.view.segAmendmentsRequested.setData(AmendmentRequestedDetails);       
        scope.view.lblAmednLCAmountValue.text = amendmentDetails.newLcAmount? formatUtil.formatAmountandAppendCurrencySymbol(amendmentDetails.newLcAmount, amendmentDetails.lcCurrency) :  kony.i18n.getLocalizedString("i18n.common.NA"); 
        scope.view.lblAmendLCAmountDiffValue.text = "LC amount is " + (amendmentDetails.lcAmountStatus).toLowerCase() + " by " + lcAmountDiff;
        this.view.lblOtherAmendmentsDetails.text = amendmentDetails.otherAmendments;
      }
      catch(err){
        var errorObj = {
          "level": "frmExportAmendmentViewDetailsController",
          "method": "setAmendmetRequestedData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    setAmendmentChargesData: function(){
      var scope = this;
      try{
        this.view.lblAmendmentsCharges.text =  kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentCharges");
        scope.setsegAmendmentWidgetDataMap("segAmendmentCharges");
        var AmendmentChargesDetails = [{
          lblReview: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.ChargesWillBePaidBy") + ":"
          },
          lblReviewValue1: {
            text: amendmentDetails.amendmentChargesPayer + " (" +   kony.i18n.getLocalizedString("i18n.TransfersEur.Me") + ")"   
        }
        },{
          lblReview: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.ChargesDebitAccount") + ":"
          },
          lblReviewValue1: {
            text: amendmentDetails.chargesDebitAccount = amendmentDetails.chargesDebitAccount ? CommonUtilities.getMaskedAccName(amendmentDetails.chargesDebitAccount)[0] : kony.i18n.getLocalizedString("i18n.common.NA")       
        }
        }];
        scope.view.segAmendmentCharges.setData(AmendmentChargesDetails);
      }
      catch(err){
        var errorObj = {
          "level": "frmExportAmendmentViewDetailsController",
          "method": "setAmendmentChargesData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    
    selfAcceptanceToggleActions: function(imgName){
      var scope = this;
      try{
        if (imgName === "imgRadioAccept") {
          if (scope.view["imgRadioAccept"].src === "radio_btn_inactive.png") {
            scope.view["imgRadioAccept"].src = "radiobtn_active.png";
            scope.view.flxRejectReasons.setVisibility(false);
            scope.view["imgRadioReject"].src = "radio_btn_inactive.png";
            scope.view.txtAreaRejectReason.text = "";
            scope.submitConsentBtn(true);
          } else {
            scope.view["imgRadioAccept"].src = "radio_btn_inactive.png";
            scope.view.flxRejectReasons.setVisibility(false);
            scope.view["imgRadioReject"].src = "radio_btn_inactive.png";
            scope.submitConsentBtn(false);
          }
        } else if (imgName === "imgRadioReject") {
          if (scope.view["imgRadioReject"].src === "radio_btn_inactive.png") {
            scope.view["imgRadioReject"].src = "radiobtn_active.png";
            scope.view.flxRejectReasons.setVisibility(true);
            scope.view["imgRadioAccept"].src = "radio_btn_inactive.png";
            scope.submitConsentBtn(false);
          } else {
            scope.view["imgRadioReject"].src = "radio_btn_inactive.png";
            scope.view.flxRejectReasons.setVisibility(false);
            scope.view["imgRadioAccept"].src = "radio_btn_inactive.png";
            scope.submitConsentBtn(false);
          }
        }
        else if("txtAreaRejectReason"){
          if(scope.view["txtAreaRejectReason"].text!== ""){
            scope.submitConsentBtn(true);
          }
          else{
            scope.submitConsentBtn(false);
          }
        }
      }
      catch(err){
        var errorObj = {
          "level": "frmExportAmendmentViewDetailsController",
          "method": "setAmendmentChargesData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    
    navigateClose: function(){
      this.navManager.navigateTo({
        appName: "TradeFinanceMA",
        friendlyName: "ExportLCUIModule/frmExportLCDashboard"
      }, false, {
        flowType: 'GetAllExportAmendments'
      });
    },
    
    navigateSubmit: function(){
      this.navManager.navigateTo({
        appName: "TradeFinanceMA",
        friendlyName: "ExportLCUIModule/frmExportLCDashboard"
      }, false, {
        flowType: 'GetAllExportLettersOfCredit'
      });
    },
        
    updateExportAmendments: function(){
      var scope = this;
      try{
        if(scope.view.imgRadioAccept.src === "radiobtn_active.png"){
          params.selfAcceptance = "Accepted"
        }
        else{
          params.selfAcceptance = "Rejected";
          params.reasonForSelfRejection = scope.view.txtAreaRejectReason.text;
        }
        params.amendmentSRMSRequestId = amendmentDetails.amendmentSRMSRequestId;
        this.exportLCPresenter.updateExportLCAmendment(params, "frmExportAmendmentViewDetails");        
      }
      catch(err){
        var errorObj = {
          "level": "frmExportAmendmentViewDetailsController",
          "method": "updateExportAmendments",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    
    submitConsentBtn: function(visibility) {
      var scope = this;
      try {
        if (visibility === true) {
          scope.view.btnSubmitConsent.setEnabled(true);
          scope.view.btnSubmitConsent.skin = "sknBtnNormalSSPFFFFFF15Px";
        } else {
          scope.view.btnSubmitConsent.setEnabled(false);
          scope.view.btnSubmitConsent.skin = "ICSknbtnDisablede2e9f036px";
        }
      } catch (err) {
        var errorObj = {
          "level": "frmExportAmendmentViewDetailsController",
          "method": "submitConsentBtn",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    
    onError: function(err) {
      var error = err;
      //alert(err);
    },

  };

});