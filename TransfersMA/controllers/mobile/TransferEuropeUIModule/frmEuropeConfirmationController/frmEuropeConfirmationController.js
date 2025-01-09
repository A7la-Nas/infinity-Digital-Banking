define({
  init: function () {
    var scope=this;
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm=currentFormObject.id;
    applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.navigateCustomBack);
  },
  navigateCustomBack: function() {
    var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"HomepageMA","moduleName":"AccountsUIModule"});
    accountMod.presentationController.showDashboard();
  },
  preShow: function () {
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
    }
    this.initActions();
    this.setupUI();
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
  },
  initActions: function () {
    var scope = this;
    var transferModule = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    //this.view.customHeader.btnRight.onClick = this.cancelOnClick;
    scope.view.customHeader.flxSearch.onClick = scope.enableShare;
    scope.view.customHeader.flxSearch.isVisible = true;
    scope.view.customHeader.flxSearch.src ="share.png";
    scope.view.btnDashboard.onClick = function (){
      transferModule.haveLimitsBeenFetched = false;
      transferModule.clearEuropeFlowAtributes();
      var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"HomepageMA","moduleName":"AccountsUIModule"});
      accountMod.presentationController.showDashboard();
      
    };
    scope.view.btnNewTransfer.onClick = function () {
      var navMan = applicationManager.getNavigationManager();
      //navMan.setEntryPoint("ManageMMFlow","frmMMTransferFromAccount");
      navMan.setEntryPoint("europeTransferFlow","frmDashboardAggregated");
      navMan.setEntryPoint("startFromFlow","frmEuropeTransferFromAccount");
      transferModule.clearEuropeFlowAtributes();
      applicationManager.getPresentationUtility().showLoadingScreen();
      transferModule.getFromAccounts();
    };
    scope.view.btnTryAgain.onClick=function(){
      var navMan = applicationManager.getNavigationManager();
      //navMan.setEntryPoint("ManageMMFlow","frmMMTransferFromAccount");
      navMan.setEntryPoint("europeTransferFlow","frmDashboardAggregated");
      navMan.setEntryPoint("startFromFlow","frmEuropeTransferFromAccount");
      transferModule.clearEuropeFlowAtributes();
      applicationManager.getPresentationUtility().showLoadingScreen();
      transferModule.getFromAccounts();
    };
    scope.view.flxFurtherDetailsHeader.onTouchEnd = function() {
      if (scope.view.flxFurtherDetails.isVisible === false) {
        scope.view.imgUpArrow.src = "arrowup.png";
        scope.view.flxFurtherDetails.isVisible = true;
      }
      else {
        scope.view.imgUpArrow.src = "arrowdown.png";
        scope.view.flxFurtherDetails.isVisible = false;
      }
    };
    this.view.flxSupportingDocumentsValue.removeAll();
    this.view.lblUploadFailedMsg.isVisible = false;
    this.view.lblUploadFailedMsg.text = "";
  },
  setupUI : function () {
    var transactionManager = applicationManager.getTransactionManager();
    var transferPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    var transferObject = transactionManager.getTransactionObject();
    if (!kony.sdk.isNullOrUndefined(transferObject.errmsg)){
      this.view.flxConfirmationMain.isVisible = false;
      this.view.flxError.isVisible = true;
      this.view.flxButtons.isVisible = false;
      this.view.flxInfoList.isVisible = true;
      var errDetails = transferObject.errmsg;
      if (errDetails.length > 1) {
        for (i = 0; i < 3; i++) {
          errDetails[i].imgIcon = "inactivegreydot.png";
          }
          if (errDetails.length > 3) {
          errDetails = errDetails.slice(0, 3); 
          }
          this.view.lblTitle.text = applicationManager.getPresentationUtility().getStringFromi18n("i18n.kony.transfers.transferFailedDetails");
          this.view.segErrorList.widgetDataMap = {"lblGenericMsgInfo": "message","imgIcon": "imgIcon"};
          this.view.segErrorList.setData(errDetails);
        } else {
          this.view.lblTitle.text = applicationManager.getPresentationUtility().getStringFromi18n("i18n.kony.transfers.transferFailed");
          this.view.segErrorList.widgetDataMap = {"lblGenericMsgInfo": "message","imgIcon": "imgIcon"};
          this.view.segErrorList.setData(errDetails);
        }
      if (kony.os.deviceInfo().name === "iPhone") {
        var disableButtonConfig = {"animated":false,"items":[]};
		this.view.setRightBarButtonItems(disableButtonConfig);
      }
      else {
     this.view.customHeader.flxSearch.isVisible = false;
      }  
    }
    else {
      var navigationManager = applicationManager.getNavigationManager();
      var approvalStatus = navigationManager.getCustomInfo("frmEuropeConfirmation");
      if (approvalStatus && approvalStatus === "Pending") {
        this.view.lblSuccessMessage.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.ApprovalRequests.TransactionApproval");
      }
      else {
        if (transferObject.isScheduled === "0")
          this.view.lblSuccessMessage.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.successfulTransfer");
        else
          this.view.lblSuccessMessage.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.TransferScheduled");
      }  
      this.view.flxConfirmationMain.isVisible = true;
      this.view.flxError.isVisible = false;
      this.view.flxButtons.isVisible = true;
      if (transferPresentationController.getEuropeFlowType() === "EXTERNAL") {
        this.setSavedRecipientLabel(transferObject);
//         this.view.flxFurtherDetailsHeader.isVisible = true;
        this.view.flxFurtherDetails.isVisible = true;
      }
      else {
        if (transferPresentationController.isLoansAccountType) {
          this.view.lblSavedRecipient.isVisible = true;
          this.view.lblSavedRecipient.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.loans.AckMessage");
//           this.view.flxFurtherDetailsHeader.isVisible = false;
          this.view.flxFurtherDetails.isVisible = false;
        }
        else {
        	this.view.lblSavedRecipient.isVisible = false;
//         	this.view.flxFurtherDetailsHeader.isVisible = false;
        	//this.view.flxFurtherDetails.isVisible = false;
        }  
      }
      this.setSegmentData();
    }
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  
  setSavedRecipientLabel : function(transferObject) {
    if(transferObject.isRecipientAdded) {
      this.view.lblSavedRecipient.isVisible = true;
      this.view.lblSavedRecipient.text = transferObject.addedRecipientDetails.beneficiaryName + "\n" + applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfersEurope.saveBeneficiaries");
    } 
    else {
      this.view.lblSavedRecipient.isVisible = false;	  
    }
  },
  
  setSegmentData : function () {
    var transferPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    this.view.flxSupportingDocumentsValue.bottom = "0dp";
    var navMan = applicationManager.getNavigationManager();
    var successfulUploads = navMan.getCustomInfo("successfulUploads");
    var entryPoint = navMan.getEntryPoint("europeTransferFlow");
    var sucessfulUploadFileNames = [];
    if (entryPoint === "frmTransferActivitiesTransfersEurope" || entryPoint === "frmTransferActivitiesRecurringEurope") {
      var existingAttachments = navMan.getCustomInfo("existingAttachments");
      if (existingAttachments) {
        for (var i = 0; i < existingAttachments.length; i++) {
          sucessfulUploadFileNames.push(existingAttachments[i].fileName);
        }
      }
    }
    sucessfulUploadFileNames = sucessfulUploadFileNames.concat(successfulUploads);
    var failedUploads = navMan.getCustomInfo("failedUploads");
    if (sucessfulUploadFileNames && sucessfulUploadFileNames.length > 0) {
      for (var i = 0; i < sucessfulUploadFileNames.length; i++) {
        var flxDocumentNameSuccess = new kony.ui.FlexContainer({
          "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
          "clipBounds": true,
          "id": "flxDocumentNameSuccess" + i,
          "isVisible": true,
          "layoutType": kony.flex.FLOW_HORIZONTAL,
          "top": "7px",
          "skin": "sknFlxE5E5EABorder17px",
          "zIndex": 1
        }, {}, {});
        var lblSupportingDocumentNameSuccess = new kony.ui.Label({
          "id": "lblSupportingDocumentNameSuccess" + i,
          "isVisible": true,
          "skin": "sknlabelSSPSemibold42424213px",
          "zIndex": 1,
          "text": sucessfulUploadFileNames[i]
        }, {
          "contentAlignment": constants.CONTENT_ALIGN_CENTER,
          "paddingInPixel": false,
          "padding": [3, 1, 0, 1]
        }, {});
        flxDocumentNameSuccess.add(lblSupportingDocumentNameSuccess);
        this.view.flxSupportingDocumentsValue.add(flxDocumentNameSuccess);
      }
      this.view.flxSupportingDocuments.setVisibility(true);
    }
    if (failedUploads && failedUploads.length > 0) {
      var failedDocs = failedUploads.join();
      this.view.lblUploadFailedMsg.isVisible = true;
      if (failedUploads.length === 1) {
        this.view.lblUploadFailedMsg.text = kony.i18n.getLocalizedString("kony.mb.Europe.AttachmentUploadErrorMsg") + "\"" + failedDocs + "\"";
      } else {
        this.view.lblUploadFailedMsg.text = kony.i18n.getLocalizedString("kony.mb.Europe.AttachmentUploadErrorMsg2") + "\"" + failedDocs + "\"";
      }
      for (var i = 0; i < failedUploads.length; i++) {
        var flxDocumentNameFailed = new kony.ui.FlexContainer({
          "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
          "clipBounds": true,
          "id": "flxDocumentNameFailed" + i,
          "isVisible": true,
          "layoutType": kony.flex.FLOW_HORIZONTAL,
          "top": "7px",
          "skin": "sknFlxE5E5EABorder17px",
          "zIndex": 1
        }, {}, {});
        var img = new kony.ui.Image2({
          "id": "image" + i,
          "isVisible": true,
          "src": "alert.png",
          "height": "15dp",
          "width": "15dp",
          "left": "3%",
          "top": "10px"
        }, {
          imageScaleMode: constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS
        }, {});
        var lblSupportingDocumentNameFailed = new kony.ui.Label({
          "id": "lblSupportingDocumentNameFailed" + i,
          "isVisible": true,
          "skin": "sknIabelEE0005SSPsb34px",
          "zIndex": 1,
          "text": failedUploads[i]
        }, {
          "contentAlignment": constants.CONTENT_ALIGN_CENTER,
          "padding": [2, 1, 0, 1],
          "paddingInPixel": false
        }, {});
        flxDocumentNameFailed.add(img);
        flxDocumentNameFailed.add(lblSupportingDocumentNameFailed);
        this.view.flxSupportingDocumentsValue.add(flxDocumentNameFailed);
      }
      this.view.flxSupportingDocuments.setVisibility(true);
    }
    if (sucessfulUploadFileNames && failedUploads && sucessfulUploadFileNames.length === 0 && failedUploads.length === 0) {
//       var flxDocumentName = new kony.ui.FlexContainer({
//         "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
//         "clipBounds": true,
//         "id": "flxDocumentName" + i,
//         "isVisible": true,
//         "layoutType": kony.flex.FLOW_HORIZONTAL,
//         "top": "7px",
//         "skin": "sknFlxE5E5EABorder17px",
//         "zIndex": 1
//       }, {}, {});
//       var lblSupportingDocumentName = new kony.ui.Label({
//         "id": "lblSupportingDocumentNameSuccess" + i,
//         "isVisible": true,
//         "skin": "sknlabelSSPSemibold42424213px",
//         "zIndex": 1,
//         "text": kony.i18n.getLocalizedString("i18n.common.none")
//       }, {
//         "contentAlignment": constants.CONTENT_ALIGN_CENTER,
//         "paddingInPixel": false,
//         "padding": [3, 1, 0, 1]
//       }, {});
//       flxDocumentName.add(lblSupportingDocumentName);
//       this.view.flxSupportingDocumentsValue.add(flxDocumentName);
      this.view.flxSupportingDocuments.setVisibility(false);
      this.view.forceLayout();
    }
    if (transferPresentationController.getEuropeFlowType() === "EXTERNAL") {
      var extraData = transferPresentationController.getFurtherDetailsData();
      this.view.segFurtherDetails.widgetDataMap = this.getWidgetDataMap();
      var processedExtraData = applicationManager.getDataProcessorUtility().removeRowsWithEmptyValueFromSegmentData(extraData, this.view.segFurtherDetails.widgetDataMap.lblDetails);
      this.view.segFurtherDetails.setData(processedExtraData);
      this.view.segFurtherDetails.isVisible = true;
      this.setChargesData();
    } else {
      this.view.segFurtherDetails.isVisible = false;
      this.setChargesData();
      // to map the total debit value only in transfer between own account
      var extraData = transferPresentationController.getFurtherDetailsData();
      this.view.segFurtherDetails.widgetDataMap = this.getWidgetDataMap();
      if (extraData[0].property === "Total Debit" || extraData[0].property === "Total Debit with Charges") {
        var totaldebit = [];
        totaldebit[0] = extraData[0];
        this.view.segFurtherDetails.setData(totaldebit);
        this.view.segFurtherDetails.isVisible = true;
      }
    }
    var segData = transferPresentationController.getConfirmationScreenData();
    this.view.segDetails.widgetDataMap = this.getWidgetDataMap();
    var segmentData = applicationManager.getDataProcessorUtility().removeRowsWithEmptyValueFromSegmentData(segData, this.view.segDetails.widgetDataMap.lblDetails);
    var segData2 = [];
    var index = segmentData.findIndex(obj => obj.property === kony.i18n.getLocalizedString("kony.mb.transfersEurope.reference"));
    if (index !== -1) {
      for (var i = index; i < segmentData.length; i++) {
        segData2 = segmentData.splice(i);
      }
    }
    else{
      this.view.flxSupportingDocumentsValue.bottom = "10dp";
    }
    this.view.segDetails.setData(segmentData);
    this.view.segDetails2.widgetDataMap = this.getWidgetDataMap();
    this.view.segDetails2.setData(segData2);
  },
  setChargesData : function(){
      // to map the charges breakdown of nay available for all types of transfer
       var transferPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
      //if (scope_TransfersPresentationController.transactionMode !== applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers")) {
        var chargesData = transferPresentationController.getChargesBreakdown();
        if(chargesData.length>0){
        this.view.segChargesBreakdown.widgetDataMap = this.getWidgetDataMap();
        this.view.segChargesBreakdown.setData(chargesData);
        this.view.flxChargesBreakdown.isVisible = true;
        }
        
     // }
        else {
        this.view.flxChargesBreakdown.isVisible = false;
      }
  },
  getWidgetDataMap : function () {
    var map = {
      lblTitle:"property",
      lblDetails:"value",
      flxAccountType:"flxAccountType",
      imgAccountType:"imgAccountType"
    }
    return map;
  },
  

  showSharePopup : function (base64String, transactionID) {
    var fileName = transactionID + "Report.pdf";
	  this.view.socialshare.shareWithBase64(base64String, fileName);
  },

  bindGenericError: function (errorMsg) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scopeObj = this;
    applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
  },

  enableShare: function() {
    var scope = this;
    var warnObject = {};
    var navMan = applicationManager.getNavigationManager();
    var transactionData =navMan.getCustomInfo("frmTransfersDetailsEurope");
    warnObject.messageDetails = kony.i18n.getLocalizedString('i18n.payments.personalInformation');
    warnObject.formattedWarnText = kony.i18n.getLocalizedString('i18n.payments.keepYourInformationSafe');
    warnObject.isSuccess = kony.i18n.getLocalizedString('i18n.payments.warning');
    this.view.CancelTransactionPopup.setContext(warnObject);
    this.view.flxWarningPopup.setVisibility(true);
    this.view.CancelTransactionPopup.contextualActionButtonOnClick = function(btnAction){
      if(btnAction === kony.i18n.getLocalizedString('i18n.transfers.Cancel')) {
        scope.view.flxWarningPopup.setVisibility(false);
      } else {
        var transferModule = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    // var segData = transferModule.getConfirmationScreenData();
    // this.createPDFComponent();
    // /* Calling the component's API to generate the PDF */
    // this.view.pdfGenerator.generatePdfUsingHtmlString(segData);
        transferModule.enableShare();
        scope.view.flxWarningPopup.setVisibility(false);
      }
    };
  },
  createPDFComponent: function(){

    var pdfGenerator = new com.konymp.pdfgenerator(
      {
        "clipBounds": true,
        "height": "0dp",
        "id": "pdfGenerator",
        "isVisible": true,
        "left": "0dp",
        "top": "0dp",
        "width": "0dp",
        "zIndex": 1
      }, {}, {});
    /* Setting the component's properties */
    pdfGenerator.fileName = "Report";
    pdfGenerator.orientation = "p";
    pdfGenerator.format = "a4";
    pdfGenerator.compress = false;
    pdfGenerator.unit = "mm";
    pdfGenerator.leftprop = 0;
    pdfGenerator.topprop = 0;
    pdfGenerator.imageprop = '';
    //       pdfGenerator.widthprop = 842;
    //       pdfGenerator.bottomprop = 0;

    /*Adding the component to a Form*/ 
    this.view.add(pdfGenerator);
   
  }
//   cancelOnClick : function () {
//     var transferModule = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
//     transferModule.cancelCommon();
//   },
});