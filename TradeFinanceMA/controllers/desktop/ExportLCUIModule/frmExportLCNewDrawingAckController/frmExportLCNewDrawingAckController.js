define(["FormControllerUtility", "CommonUtilities"], function (FormControllerUtility, CommonUtilities) {
  let lcData;
  let responseForFormExportLCDetails = {};
  return {
    ackData: '',
    //Type your controller code here 
    onNavigate: function (params) {
      if(!kony.sdk.isNullOrUndefined(params)){
        lcData = params["lcData"];
      }
      this.init();
    },
    init: function () {
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      this.view.onDeviceBack = function () { };
      this.view.onBreakpointChange = this.onBreakpointChange;
      this.presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ExportLCUIModule").presentationController;
      this.navManager = applicationManager.getNavigationManager();
      this.initActions();
      this.setDataFori18n();
    },
    preShow: function () {
      var scope = this;
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter']);
      scope.view.customheadernew.forceCloseHamburger(); 
      scope.view.customheadernew.activateMenu("TradeFinance", "Exports");
      scope.view.flxSuccess.setVisibility(false);
      scope.view.flxError.setVisibility(false);
    },
    postShow: function () {
      var scope = this;
      scope.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
      applicationManager.getNavigationManager().applyUpdates(this);
    },
    onBreakpointChange: function (form, width) {
      var scope = this;
      this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
      FormControllerUtility.setupFormOnTouchEnd(width);
      this.view.customheadernew.onBreakpointChangeComponent(width);
      this.view.customfooternew.onBreakpointChangeComponent(width);
    },
    initActions: function () {
      var scope = this;
      this.view.btnActionsDrawings.onClick = scope.navigateToDrawings.bind(this, "btnActionsDrawings");
      this.view.btnActionsExportLC.onClick = scope.navigateToDashboard.bind(this, "btnActionsExportLC");
      this.view.btnViewLCReport.onClick = scope.navigatoToLcReport.bind(this, "btnViewLCReport");
      this.view.flxDrawingDetailsDropdown.cursorType = "pointer";
      this.view.flxDrawingDetailsDropdown.onClick = scope.toggleContent.bind(this);
      this.view.flxCloseBtn.onClick = function () {
        scope.view.flxSuccess.setVisibility(false);
      }
    },
    /**
         * @api : setDataFori18n
         * Assigning i18n keys
         * @arg: NA
         * @return : NA
         */
    setDataFori18n: function(){ 
      var scope = this;
      try{
        scope.view.lblExportLCAck.text = kony.i18n.getLocalizedString("i18n.TradeFinance.Exports")+"-"+kony.i18n.getLocalizedString("i18n.TradeFinance.CreateNewDrawing")+"-"+kony.i18n.getLocalizedString("i18n.wealth.acknowledgement");
        scope.view.lblDrawingRefKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.DrawingRefNo")+":" ;  
        scope.view.lblDrawingCreatedKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.DrawingCreatedDate")+":" ; 
        scope.view.lblDrawingAmountKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.DrawingAmount")+":" ; 
        scope.view.lblAmountCreditedKey.text =  kony.i18n.getLocalizedString("i18n.TradeFinance.AmounttobeCreditedto")+":" ; 
        scope.view.lblFinanceUSKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.Financeus")+":" ; 
        scope.view.lblUploadDocsKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.UploadedDocuments")+":" ; 
        scope.view.lblPhysicalDocDetailsKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.PhysicalDocumentDetails")+":" ; 
        scope.view.lblDiscrepanciesKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.Forwarddespiteanydiscrepancies")+":" ; 
        scope.view.lblChargesDebitKey.text =  kony.i18n.getLocalizedString("i18n.TradeFinance.ChargesDebitAccount") +":" ; 
        scope.view.lblMsgToBankKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.MessageToBankDrawings") + ":" ;
        scope.view.lblApplicant.text =  kony.i18n.getLocalizedString("i18n.ExportLC.Applicant")+":" ;
        scope.view.lblAdvisingRefNo.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AdvisingLCRefNo")+":" ;
        scope.view.lblLCAmount.text =  kony.i18n.getLocalizedString("i18n.ExportLC.LCAmount")+":" ;
        scope.view.lblExpiryDate.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ExpiryDate")+":" ;
        scope.view.lblAmountCreditedValueInfo.text = "("+kony.i18n.getLocalizedString("i18n.TradeFinance.OtherBeneficiaryName")+")";
        scope.view.lblDiscrepanciesValueInfo.text ="("+kony.i18n.getLocalizedString("i18n.TradeFinance.KindlyForwardDoc")+")";        
      }catch(err) {
        var errorObj = {
          "level": "FormController",
          "method": "setDataFori18n",
          "error": err
        };
           scope.onError(errorObj);
      }
    }, 
    updateFormUI: function (viewModel) {
      if (viewModel.isLoading === true) {
        FormControllerUtility.showProgressBar(this.view);
      } else if (viewModel.isLoading === false) {
        FormControllerUtility.hideProgressBar(this.view);
      }
      if (viewModel.drawings) {
        this.setUIData(viewModel.drawings);
        this.ackData = viewModel.drawings;
      }
      if (viewModel.serverError) {
        this.view.flxError.setVisibility(true);
        this.view.lblErrorMsg.text = viewModel.serverError;
      }
      if (viewModel.getExportLetterOfCredit) {
        responseForFormExportLCDetails.ExportLetterOfCredit = viewModel.getExportLetterOfCredit.ExportLC[0];
        this.presenter.getExportLCAmmendments(lcData.exportLCId, this.view.id);
      }
      if (viewModel.getExportLCAmmendments) {
        responseForFormExportLCDetails.ExportAmendments = viewModel.getExportLCAmmendments.ExportLcAmendments;
        applicationManager.getNavigationManager().navigateTo({
          appName: "TradeFinanceMA",
          friendlyName: "ExportLCUIModule/frmExportLCDetails"
        }, false, responseForFormExportLCDetails)
      }
    },
    navigatoToLcReport: function () {
      this.presenter.getExportLetterOfCredit(lcData.exportLCId, this.view.id);
    },
    navigateToDashboard: function () {
      applicationManager.getNavigationManager().navigateTo({
        appName: "TradeFinanceMA",
        friendlyName: "ExportLCUIModule/frmExportLCDashboard"
      }, false, {
        flowType: 'GetAllExportLettersOfCredit'
      });
    },
    navigateToDrawings: function () {
      applicationManager.getNavigationManager().navigateTo({
        appName: "TradeFinanceMA",
        friendlyName: "ExportLCUIModule/frmExportLCDashboard"
      }, false, {
        flowType: 'GetAllExportDrawings'
      });
    },
    toggleContent: function () {
      if (this.view.imgDrawingDetailsDropdown.src === "dropdown_expand.png") {
        this.view.imgDrawingDetailsDropdown.src = "dropdown_collapse.png";
        this.view.flxDrawingContent.setVisibility(true);
      } else {
        this.view.imgDrawingDetailsDropdown.src = "dropdown_expand.png"
        this.view.flxDrawingContent.setVisibility(false);
      }
    },
    
    setUIData: function(data) {
      var scope = this;
      let physicalDocumentsData = [];
      let uploadDocumentsData = [];
      let documentsWidgetDataMap = {
          "lblListValue": "lblListValue",
          "flxDropdownValue": "flxDropdownValue"
      };
      scope.view.segUploadDocuments.widgetDataMap = documentsWidgetDataMap;
      scope.view.segPhysicalDocuments.widgetDataMap = documentsWidgetDataMap;
      for (var i = 0; i < data.formData.physicalDocumentsData.length; i++) {
          physicalDocumentsData[i] = {
              "lblListValue": {
                  "text": data.formData.physicalDocumentsData[i].lblListValue.text,
                  "left": "0px"
              },
              "flxDropdownValue": {
                 "hoverSkin": "slFbox"
              },
              "template": "flxDropdownValue"
          }
      }
      for (var j = 0; j < data.formData.uploadedDocumentsData.length; j++) {
          uploadDocumentsData[j] = {
              "lblListValue": {
                  "text": data.formData.uploadedDocumentsData[j].lblListValue.text,
                  "left": "0px"
              }, 
              "flxDropdownValue": {
                        "hoverSkin": "slFbox"
               },
              "template": "flxDropdownValue"
          }
      }
      scope.view.segPhysicalDocuments.setData(physicalDocumentsData);
      scope.view.segUploadDocuments.setData(uploadDocumentsData);
      scope.view.flxSuccess.setVisibility(true);
      scope.exportLCdata = data;
      scope.view.lblDrawingRefValue.text = data.drawingReferenceNo;
      scope.view.lblDrawingCreatedValue.text = this.presenter.formatUtilManager.getFormattedCalendarDate(data.drawingCreatedDate, "mm/dd/yyyy");
      scope.view.lblDrawingAmountValue.text = this.presenter.configurationManager.getCurrency(data.currency) + " " + this.presenter.formatUtilManager.formatAmount(data.drawingAmount);
      scope.view.lblAmountCreditedValue.text = data.formData.formattedCreditAccount;
      scope.view.lblFinanceUSValue.text = (data.financeBill === "Yes") ? "Selected" : "Unselected";
      scope.view.lblUploadDocsValue.text = data.uploadedDocuments;
      scope.view.lblPhysicalDocDetailsValue.text = data.physicalDocumentsDetails;
      scope.view.lblDiscrepanciesValue.text = (data.forwardDocuments === "Yes") ? "Selected" : "Unselected";
      scope.view.lblChargesDebitValue.text = data.formData.formattedChargesDebitAccount;
      scope.view.lblMsgToBankValue.text = data.messageToBank ? data.messageToBank : "NA"
      scope.view.lblApplicantValue.text = data.applicant;
      scope.view.lblAdvisingRefValue.text = data.advisingBankReference;
      scope.view.lblLCAmoutValue.text = this.presenter.configurationManager.getCurrency(data.currency) + " " + applicationManager.getFormatUtilManager().formatAmount(data.lcAmount);
      scope.view.lblExpiryDateValue.text = CommonUtilities.getFrontendDateStringInUTC(data.expiryDate, applicationManager.getConfigurationManager().getConfigurationValue("frontendDateFormat"));
    }
  }
});