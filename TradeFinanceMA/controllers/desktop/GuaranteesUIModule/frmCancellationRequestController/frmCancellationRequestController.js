define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants', 'FormatUtil'], function (CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants, FormatUtil) {

  this.lcData;
  this.documentsList = [];
  let document = '';
  this.docReferenceValues = [];
  this.deletedIndex;
  this.serviceParams = {
    "guaranteesSRMSId": "",
    "supportingDocument": "",
    "cancellationStatus": "Requested",
    "messageToBank": "",
	"billType": ""
  };
  this.amendmentData = {};
  this.regExpForCheckArrayInString = /[\[\]]+/;
  const NA = kony.i18n.getLocalizedString("i18n.common.NA");

  return {

    /**
    * @api : init
    * This function for executing the lines of code only once
    * @return : NA
    */
    init: function () {
      var scope = this;
      try {
        scope.view.preShow = scope.preShow;
        scope.view.postShow = scope.postShow;
        scope.view.onDeviceBack = function () { };
        scope.view.onBreakpointChange = scope.onBreakpointChange;
        scope.presenter = applicationManager.getModulesPresentationController({
          'appName': 'TradeFinanceMA',
          'moduleName': 'GuaranteesUIModule'
        });
        scope.navManager = applicationManager.getNavigationManager();
        scope.initActions();
      } catch (err) {
        var errorObj = {
          "level": "frmCancellationRequestController",
          "method": "init",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : onNavigate
    * This function for executing the preShow and postShow
    * @return : NA
    */
    onNavigate: function (params) {
      var scope = this;
      try {
        lcData = params;
        if (lcData && lcData.guaranteesSRMSId) {
          lcData = params;
          scope.serviceParameter = {

          };
          scope.setGuaranteeDetails();
        }
        scope.init();
      } catch (err) {
        var errorObj = {
          "level": "frmCancellationRequestController",
          "method": "onNavigate",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : preShow
    * This function for executing the primary functions before rendering UI
    * @return : NA
    */
    preShow: function () {
      var scope = this;
      try {
        FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter']);
        scope.view.customheadernew.forceCloseHamburger();
        scope.view.customheadernew.activateMenu("TradeFinance", "Guarantees");
        scope.view.flxDialogs.height = kony.os.deviceInfo().screenHeight + 120 + "dp";
        
      } catch (err) {
        var errorObj = {
          "level": "frmCancellationRequestController",
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
    postShow: function () {
      var scope = this;
      try {
        scope.seti18nkeys();
        scope.togglePopUp();
        scope.view.segUploadDocs.removeAll();
        scope.view.txtMessageToBankValue.text = "";
        FormControllerUtility.disableButton(scope.view.btnConfirmAndSubmit);
        scope.view.lblPhysicalCheckbox.text = "D";
        scope.view.lblPhysicalCheckbox1.text = "D";
        scope.view.txtMessageToBankValue.restrictCharactersSet = "~#^|$%&*!@()_-+=}{][/|?,.><`':;\"\\";
      } catch (err) {
        var errorObj = {
          "level": "frmCancellationRequestController",
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
    onBreakpointChange: function (form, width) {
      var scope = this;
      try {
        this.view.customheadernew.onBreakpointChangeComponent(width);
        this.view.customfooternew.onBreakpointChangeComponent(width);
      } catch (err) {
        var errorObj = {
          "level": "frmCancellationRequestController",
          "method": "onBreakpointChange",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : seti18nkeys
    * This function sets i18n keys for static labels
    * @return : NA
    */
    seti18nkeys: function () {
      var scope = this;
      try {
        scope.view.lblBeneficiaryDetailsKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.BeneficiaryDetails") + ":";
        scope.view.lblTransRefKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.TransactionRef") + ":";
        scope.view.lblProductTypeKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.productType") + ":";
        scope.view.lblBillTypeKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.gtAndSlbcWithColon");
        scope.view.lblAmountKey.text = kony.i18n.getLocalizedString("i18n.ChequeManagement.Amount");
        scope.view.lblIssueDateKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.IssueDate") + ":";
        scope.view.lblExpiryTypeKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.expiryType") + ":";
        scope.view.lblExpiryDateKey.text = kony.i18n.getLocalizedString("i18n.ImportLC.ExpiryDate") + ":";
        scope.view.lblInstructingPartyKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.InstructingParty") + ":";
        scope.view.lblApplicantPartyKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ApplicantParty") + ":";
        scope.view.lblAmendmentNo.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentNo") + ":";
      }
      catch (err) {
        var errorObj = {
          "level": "frmCancellationRequestController",
          "method": "seti18nkeys",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : initActions
    * This function for changing the UI depending upon breakpoint
    * @return : NA
    */
    initActions: function () {
      var scope = this;
      try {
        scope.view.btnViewDetails.onClick = scope.togglePopUp.bind(this, "flxViewSBLCDetailsPopup", true);
        scope.view.flxPopUpClose.onClick = scope.togglePopUp.bind(this, "flxMainRequestCancellation", false);
        scope.view.btnConfirmAndSubmit.onClick = scope.togglePopUp.bind(this, "flxMainRequestCancellation", true);
        scope.view.flxCrossSBLC.onClick = scope.togglePopUp.bind(this, "flxViewSBLCDetailsPopup", false);
        scope.view.btnDontSubmit.onClick = scope.togglePopUp.bind(this, "flxMainRequestCancellation", false);
        scope.view.flxInfoClose.onClick = scope.toggleUploadDocumentInfoPopup.bind(this, false);
        scope.view.flxUploadInfoIcon.onClick = scope.toggleUploadDocumentInfoPopup.bind(this, true);
        scope.view.btnUpload.onClick = scope.browseSupportingDocument.bind(this);
        scope.view.UploadDocumentPopup.btnNo.onClick = scope.togglePopUp.bind(this, "flxUploadDocumentPopup", false);
        scope.view.UploadDocumentPopup.flxCross.onClick = scope.togglePopUp.bind(this, "flxUploadDocumentPopup", false);
        scope.view.UploadDocumentPopup.btnYes.onClick = scope.tryAgainBrowse.bind(this);
        scope.view.flxCheckBox1.onClick = scope.toggleCheckbox.bind(this, "lblPhysicalCheckbox", false);
        scope.view.flxCheckBox.onClick = scope.toggleCheckbox.bind(this, "lblPhysicalCheckbox1", false);
        scope.view.txtMessageToBankValue.onBeginEditing = scope.toggleCheckbox.bind(this, "lblPhysicalCheckbox1", true);
        scope.view.txtMessageToBankValue.onTextChange = scope.confirmAndSubmitEnableOrDisable.bind(this);
        scope.view.btnCanelRequest.onClick = scope.createAmendment.bind(this);
        scope.view.btnCancel.onClick = function () {
          new kony.mvc.Navigation({
            "appName": "TradeFinanceMA",
            "friendlyName": "GuaranteesUIModule/frmGuaranteesLCDetails"
          }).navigate();
        };
      }
      catch (err) {
        var errorObj = {
          "level": "frmCancellationRequestController",
          "method": "initActions",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * updateFormUI - the entry point method for the form controller.
    * @param {Object} viewModel - it contains the set of view properties and keys.
    */
    updateFormUI: function (viewModel) {
      var scope = this;
      try {
        if (viewModel.isLoading === true) {
          FormControllerUtility.showProgressBar(this.view);
        } else if (viewModel.isLoading === false) {
          FormControllerUtility.hideProgressBar(this.view);
        }
        if (viewModel && viewModel.guaranteesSRMSId) {
          lcData = viewModel;
          scope.serviceParameter = {};
          scope.setGuaranteeDetails();
        }
        if (viewModel.uploadDocument) {
          this.storeReferenveValues(viewModel.uploadDocument[0].documentReference);
        }
        if (viewModel.deleteDocument) {
          this.deleteUploadedDocument();
        }
        if (viewModel.createAmendSuccess) {
          amendmentData = viewModel.createAmendSuccess;
          amendmentData["flag"] = "Cancellation Request";
          amendmentData["LCDetails"] = lcData;
          let finalData = Object.assign(lcData, amendmentData);
          new kony.mvc.Navigation({
            "appName": "TradeFinanceMA",
            "friendlyName": "GuaranteesUIModule/frmAmendmentAcknowledgement"
          }).navigate(finalData);
        }
        if (viewModel.serverError) {
          scope.serverError = viewModel.serverError;
        }
      } catch (err) {
        var errorObj = {
          "level": "frmCancellationRequestController",
          "method": "updateFormUI",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : togglePopUp
    * This function handles popup visibility
    * @return : NA
    */
    togglePopUp: function (popUpID, visibility) {
      var scope = this;
      try {
        if (visibility === undefined) {
          scope.view.flxDialogs.setVisibility(false);
          scope.view.flxMainRequestCancellation.setVisibility(false);
          scope.view.flxViewSBLCDetailsPopup.setVisibility(false);
          scope.view.flxUploadDocumentPopup.setVisibility(false);
        }
        else {
          scope.view.flxDialogs.setVisibility(visibility);
          scope.view[popUpID].setVisibility(visibility);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmCancellationRequestController",
          "method": "togglePopUp",
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
        const formatUtilManager = applicationManager.getFormatUtilManager();
        scope.view.lblPopupBodyContent1.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ConfirmTheRequestCancellation") + " - " + (lcData.guaranteesReferenceNo ? lcData.guaranteesReferenceNo : NA) + "?";
        scope.view.lblBeneficiaryDetailsValue.text = lcData.beneficiaryName ? lcData.beneficiaryName : NA;
        scope.view.lblTransRefValue.text = lcData.guaranteesReferenceNo ? lcData.guaranteesReferenceNo : NA;
        scope.view.lblProductTypeValue.text = lcData.productType ? lcData.productType : NA;
        scope.view.lblBillTypeValue.text = lcData.guaranteeAndSBLCType ? lcData.guaranteeAndSBLCType : NA;
        scope.view.lblAmountValue.text = lcData.amount ? formatUtilManager.formatAmountandAppendCurrencySymbol(lcData.amount, lcData.currency) : NA;
        scope.view.lblIssueDateValue.text = lcData.issueDate ? CommonUtilities.getDateAndTimeInUTC(lcData.issueDate).substr(0, 10) : NA;
        scope.view.lblExpiryTypeValue.text = lcData.expiryType ? lcData.expiryType : NA;
        scope.view.lblExpiryDateValue.text = lcData.expiryDate ? CommonUtilities.getDateAndTimeInUTC(lcData.expiryDate).substr(0, 10) : NA;
        scope.view.lblInstructingPartyValue.text = lcData.instructingParty && regExpForCheckArrayInString.test(lcData.instructingParty) ? JSON.parse(lcData.instructingParty.replace(/'/g, "\""))[0].contractId : NA;
        scope.view.lblApplicantPartyValue.text = lcData.applicantParty ? lcData.applicantParty : NA;
        //Amendment Details
        scope.view.lblAmendmentNoValue.text = lcData.amendmentNo ? (JSON.parse(lcData.amendmentNo.replace(/'/g, "\"")).amendmentNo) ? (JSON.parse(lcData.amendmentNo.replace(/'/g, "\"")).amendmentNo) : NA : NA;
        scope.view.GuaranteeDetails.setContext({ data: lcData, showSwiftTags: false });
      } catch (err) {
        var errorObj = {
          "level": "frmCancellationRequestController",
          "method": "setGuaranteeDetails",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : createAmendment
    * This function makes the createAmendment service call
    * @return : NA
    */
    createAmendment: function (visibility) {
      var scope = this;
      try {
        serviceParams.guaranteesSRMSId = !kony.sdk.isNullOrUndefined(lcData.guaranteesSRMSId) ? lcData.guaranteesSRMSId : "";
		serviceParams.billType = !kony.sdk.isNullOrUndefined(lcData.guaranteeAndSBLCType) ? lcData.guaranteeAndSBLCType : "";
        serviceParams.guaranteesReference = !kony.sdk.isNullOrUndefined(lcData.guaranteesReference) ? lcData.guaranteesReference : "";
        serviceParams.amount = !kony.sdk.isNullOrUndefined(lcData.amount) ? lcData.amount : "";
        serviceParams.productType = !kony.sdk.isNullOrUndefined(lcData.productType) ? lcData.productType : "";
        serviceParams.issueDate = !kony.sdk.isNullOrUndefined(lcData.issueDate) ? CommonUtilities.getBackendDateFormat(lcData.issueDate, "mm/dd/yyyy") : "";
		serviceParams.expiryDate = !kony.sdk.isNullOrUndefined(lcData.expiryDate) ? CommonUtilities.getBackendDateFormat(lcData.expiryDate, "mm/dd/yyyy") : "";
        serviceParams.currency = !kony.sdk.isNullOrUndefined(lcData.currency) ? lcData.currency : "";
        serviceParams.messageToBank = scope.view.txtMessageToBankValue.text;
        serviceParams.supportingDocument = JSON.stringify(documentsList.map(d => d[0]));
        lcData['benificiaryName'] = lcData['beneficiaryName'];
        let finData = Object.assign(lcData,serviceParams);
        scope.presenter.createAmendment(finData, "frmCancellationRequest");
      } catch (err) {
        var errorObj = {
          "level": "frmCancellationRequestController",
          "method": "createAmendment",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : toggleUploadDocumentInfoPopup
     * This function handles Upload info icon popup visibility
     * @return : NA
     */
    toggleUploadDocumentInfoPopup: function (visibility) {
      var scope = this;
      try {
        scope.view.flxInfoUploadMsg.setVisibility(visibility);
      } catch (err) {
        var errorObj = {
          "level": "frmCancellationRequestController",
          "method": "toggleUploadDocumentInfoPopup",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : browseSupportingDocument
    * This function enables the file upload window
    * @return : NA
    */
    browseSupportingDocument: function () {
      var scope = this;
      try {
        var config = {
          selectMultipleFiles: false,
          filter: ["application/pdf", "image/jpeg", "image/png", "image/bmp", "application/x-zip-compressed", "application/msword", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel", ".csv"]
        };
        if (documentsList.length >= scope.presenter.guaranteeConfig.documentsLimit) {
          scope.togglePopUp("flxUploadDocumentPopup", true);
          scope.view.UploadDocumentPopup.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AttachmentLimitExceededErrorMsg");
          scope.view.forceLayout();
          return;
        }
        kony.io.FileSystem.browse(config, scope.selectedFileCallback);
      } catch (err) {
        var errorObj = {
          "level": "frmCancellationRequestController",
          "method": "browseSupportingDocument",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : selectedFileCallback
    * This function is triggered on sucessful file upload
    * @return : NA
    */
    selectedFileCallback: function (events, files) {
      var scope = this;
      try {
        scope.toggleCheckbox("lblPhysicalCheckbox", true);
        const extensions = scope.presenter.guaranteeConfig.fileExtensions;;
        var fileNameRegex = new RegExp("^[a-zA-Z0-9]*[.][.a-zA-Z0-9]*[^.]$");
        if (files.length > 0) {
          const extension = files[0].file.name.split('.').pop();
          if (extension && !extensions.hasOwnProperty(extension)) {
            scope.togglePopUp("flxUploadDocumentPopup", true);
            scope.view.UploadDocumentPopup.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.TransfersEur.AttachmentTypeErrorMsg1") + " " + files[0].name + " " + kony.i18n.getLocalizedString("i18n.TransfersEur.AttachmentTypeErrorMsg3");
            scope.view.forceLayout();
            return;
          }
          if (files[0].file.size >= scope.presenter.guaranteeConfig.documentMaxSize) {
            scope.togglePopUp("flxUploadDocumentPopup", true);
            scope.view.UploadDocumentPopup.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.TransfersEur.AttachmentTypeErrorMsg1") + " " + files[0].name + " " + kony.i18n.getLocalizedString("i18n.TransfersEur.AttachmentSizeErrorMsg");
            scope.view.forceLayout();
            return;
          } else {
            var fileData = {};
            scope.togglePopUp("flxUploadDocumentPopup", false);
            document = [files[0].name, extensions[extension]];
            fileData.fileName = files[0].name;
            fileData.fileType = files[0].file.type;
            scope.getBase64(files[0].file, function (base64String) {
              fileData.fileContents = base64String.split(';base64,')[1];
              let fileDataItemParsed = [fileData.fileName, fileData.fileType, fileData.fileContents].join('~');
              scope.presenter.uploadDocument(fileDataItemParsed, scope.view.id);
            });
          }
        }
        scope.view.forceLayout();
      } catch (err) {
        var errorObj = {
          "level": "frmCancellationRequestController",
          "method": "selectedFileCallback",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : getBase64
    * This function fetches Base64 format of the file
    * @return : NA
    */
    getBase64: function (file, successCallback) {
      var scope = this;
      try {
        var reader = new FileReader();
        reader.onloadend = function () {
          successCallback(reader.result);
        };
        reader.readAsDataURL(file);
      } catch (err) {
        var errorObj = {
          "level": "frmCancellationRequestController",
          "method": "getBase64",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : storeReferenveValues
    * This function stores the referenceIDs of uploaded files in array
    * @return : NA
    */
    storeReferenveValues: function (key) {
      var scope = this;
      try {
        documentsList.push(document);
        docReferenceValues.push(key);
        this.setAttachmentsDataToSegment();
      } catch (err) {
        var errorObj = {
          "level": "frmCancellationRequestController",
          "method": "storeReferenveValues",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : setAttachmentsDataToSegment
    * This function sets Doc data to the segment
    * @return : NA
    */
    setAttachmentsDataToSegment: function () {
      var scope = this;
      try {
        if (documentsList.length === 0) {
          scope.view.segUploadDocs.removeAll();
          scope.view.flxUploadDocSeg.setVisibility(true);
          scope.confirmAndSubmitEnableOrDisable();
          return;
        }
        scope.view.flxUploadDocSeg.setVisibility(true);
        var attachmentsData = [];
        for (const document of documentsList) {
          attachmentsData.push({
            "imgPDF": {
              "src": document[1] || 'aa_password_error.png'
            },
            "fileName": {
              text: document[0],
              toolTip: document[0]
            },
            "lblDelete": {
              "text": "S"
            },
            "removeAction": {
              "onClick": scope.deleteAttachment.bind(scope)
            },
            "template": "flxExportLCDrawingsUploadDocument"
          });
        }
        scope.view.segUploadDocs.widgetDataMap = {
          "imgPDF": "imgPDF",
          "lblDocumentName": "fileName",
          "lblDelete": "lblDelete",
          "flxDelete": "removeAction"
        };
        scope.view.segUploadDocs.setData(attachmentsData);
        scope.confirmAndSubmitEnableOrDisable();
        scope.view.forceLayout();
      } catch (err) {
        var errorObj = {
          "level": "frmCancellationRequestController",
          "method": "setAttachmentsDataToSegment",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : deleteAttachment
    * This function invlokes delete document service call
    * @return : NA
    */
    deleteAttachment: function () {
      var scope = this;
      try {
        deletedIndex = scope.view.segUploadDocs.selectedRowIndex[1];
        scope.presenter.deleteDocument(docReferenceValues[deletedIndex], this.view.id);
        scope.togglePopUp("flxUploadDocumentPopup", false);
      } catch (err) {
        var errorObj = {
          "level": "frmCancellationRequestController",
          "method": "deleteAttachment",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : deleteUploadedDocument
    * This function removes the deleted document from the segment
    * @return : NA
    */
    deleteUploadedDocument: function () {
      var scope = this;
      try {
        documentsList.splice(deletedIndex, 1);
        docReferenceValues.splice(deletedIndex, 1);
        scope.setAttachmentsDataToSegment();
      } catch (err) {
        var errorObj = {
          "level": "frmCancellationRequestController",
          "method": "deleteUploadedDocument",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : toggleCheckbox
    * This method handles visibility checkboxes
    * @return : NA
    */
    toggleCheckbox: function (widget, enable) {
      var scope = this;
      try {
        if (this.view[widget].text === "D" || enable) {
          this.view[widget].text = "C";
        } else {
          this.view[widget].text = "D";
        }
        scope.confirmAndSubmitEnableOrDisable();
      } catch (err) {
        var errorObj = {
          "level": "frmCancellationRequestController",
          "method": "toggleCheckbox",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : confirmAndSubmitEnableOrDisable
    * This method enables/disables the Confirm & Submit button
    * @return : NA
    */
    confirmAndSubmitEnableOrDisable: function () {
      var scope = this;
      try {
        var isEnabled = true, isEnabled1 = true;
        if (scope.view.lblPhysicalCheckbox.text === "C" || scope.view.lblPhysicalCheckbox1.text === "C") {
          if (scope.view.lblPhysicalCheckbox.text === "C") {
            if (scope.view.segUploadDocs.data.length > 0) {
              isEnabled = true;
            }
            else {
              isEnabled = false;
            }
          }
          if (scope.view.lblPhysicalCheckbox1.text === "C") {
            if (scope.view.txtMessageToBankValue.text !== "") {
              isEnabled1 = true;
            }
            else {
              isEnabled1 = false;
            }
          }
        }
        else {
          FormControllerUtility.disableButton(scope.view.btnConfirmAndSubmit);
          return;
        }

        if (isEnabled && isEnabled1)
          FormControllerUtility.enableButton(scope.view.btnConfirmAndSubmit);
        else
          FormControllerUtility.disableButton(scope.view.btnConfirmAndSubmit);

      } catch (err) {
        var errorObj = {
          "level": "frmCancellationRequestController",
          "method": "confirmAndSubmitEnableOrDisable",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : tryAgainBrowse
    * This method retriggers file upload window upon false upload
    * @return : NA
    */
    tryAgainBrowse: function () {
      var scope = this;
      try {
        this.view.flxDialogs.setVisibility(visibility);
        this.view[flxpopup].setVisibility(visibility);
      } catch (err) {
        var errorObj = {
          "level": "frmCancellationRequestController",
          "method": "tryAgainBrowse",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : onError
    * Error thrown from catch block in component and shown on the form
    * @return : NA
    */
    onError: function (err) {
      var error = err;
    }
  };
});