define(["FormControllerUtility", "CommonUtilities"], function (FormControllerUtility, CommonUtilities) {
  let finalResponse = {};
  let filesToBeUploaded = [];
  let uploadedAttachments = [];
  let count = 1;
  let documentTitle = [];
  let docReferenceValues = [];
  let financeUsflag;
  let discrepanciesflag;
  let assignmentOfProceedsFlag = false;
  let creditAccountSelected = false;
  let debitAccountSelected = false;
  let docTitleRowClick = false;
  let uploadDocumentsNames = [];
  let attachments = [];
  let base64Content = [];
  let disableSkin = "bbsknA0A0A015px";
  let enableSkin = "bbSknLbl424242SSP15Px";
  let documentUploadsIndex = 0;
  let isOtherDocumentsVisible = false;
  let FINANCE_US_AND_KINDLY_FORWARD_CHECKBOX_TOGGLE = "Yes";
  return {
    /**
         * @api : init
         * This function will execute user navigated to present form
         * @return : NA
         */
    init: function() {
      var scope = this;
      try {
        this.presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ExportLCUIModule").presentationController;
      } catch (err) {
        var errorObj = {
          "level": "frmReviseDrawingDocUploadController",
          "method": "init",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
         * @api : onNavigate
         * This function will execute user navigated to present form
         * @return : NA
         */
    onNavigate: function(record) {
      var scope = this;
      try {
        finalResponse = record;
        scope.view.preShow = scope.preShow;
        scope.view.postShow = scope.postShow;
        scope.setSegmentData();
      } catch (err) {
        var errorObj = {
          "level": "frmReviseDrawingDocUploadController",
          "method": "onNavigate",
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
          "level": "FormController",
          "method": "onBreakpointChange",
          "error": err
        };
        scope.onError(errorObj);
      }
    },


    /**
         * @api : preShow
         * Performs the actions required before rendering form
         * @return : NA
         */
    preShow: function() {
      var scope = this;
      try {
        scope.financeUsflag = finalResponse.financeBillFormatted === "Selected" ? true : false;
        scope.discrepanciesflag =  finalResponse.forwardDocumentsFormatted  === "Selected" ? true : false;
        FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter']);
        scope.view.customheadernew.forceCloseHamburger();
        scope.view.customheadernew.activateMenu("TradeFinance", "Exports");
        this.view.flxDialogs.height = kony.os.deviceInfo().screenHeight + 120 + "dp";
        scope.initActions();
        scope.setDataFori18n();
        scope.view.imgCheckBox.src = "inactive.png";
      } catch (err) {
        var errorObj = {
          "level": "frmReviseDrawingDocUploadController",
          "method": "preShow",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
         * @api : postShow
         * Performs the actions required after rendering component
         * @return : NA
         */
    postShow: function() {
      var scope = this;
      try {
        scope.setDataInResponseToDiscrepancies();
        // Hiding other drawing fields
        if(finalResponse.otherDrawingFiledsEnabled === true){
          scope.view.imgSwitchIcon.src = "inactive_btn.png";
          scope.toggleOtherDrawingFields();
        }
        else{
          scope.view.imgSwitchIcon.src = "active_btn.png";
          scope.toggleOtherDrawingFields();
        }
        scope.view.flxSwitchIconimg.cursorType = "pointer";
        scope.view.flxSwitchIconimg.onClick = scope.toggleOtherDrawingFields.bind(scope);
        scope.preFillingDrawingAmountAndAmountCredited();
      } catch (err) {
        var errorObj = {
          "level": "frmReviseDrawingDocUploadController",
          "method": "postShow",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
         * @api : initActions
         * It'll deal about buttonClicks
         * @arg: NA
         * @return : NA
         */
    initActions: function() {
      var scope = this;
      try {
        //scope.disableButton(scope.view.btnContinueReview);
        scope.presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ExportLCUIModule").presentationController;
        scope.view.flxUploadDocSeg.setVisibility(false);
        scope.view.btnContinueReview.onClick = this.navigateSaveandContinue.bind(this);
        scope.view.flxDropdownCurrency.onClick = this.openCurrencyDropdown.bind(this);
        scope.view.segDropdownListCurrency.onRowClick = this.segDropdownListCurrencyRowClick.bind(this);
        scope.view.flxSelecetCreditAccount.onClick = this.toggleCreditAccountDropdown.bind(this);
        scope.view.flxDiscrepancyDropdown.onClick=scope.togglefrmReviseDrawingDocUploadVisibility.bind(this,this.view.imgDiscrepancyDropdown);
        scope.view.segCreditAccounts.onRowClick = this.segCreditAccountsRowClick.bind(this);
        scope.view.segDocTitleDropdown.onRowClick = this.segDocTitleDropdownRowClick.bind(this, "segDocTitleDropdown", "lblSelectEnter", 1);
        scope.view.segSelectOriginalCopies.onRowClick = this.segDocTitleDropdownRowClick.bind(this, "segSelectOriginalCopies", "lblOriginalsCount", 2);
        scope.view.segCopiesCount.onRowClick = this.segDocTitleDropdownRowClick.bind(this, "segCopiesCount", "lblCopiesCount", 3);
        scope.view.flxBankAccountValue.onClick = this.toggleDebitAccountDropdown.bind(this);
        scope.view.segDebitedFromDropdown.onRowClick = this.segDebitAccountsRowClick.bind(this);
        scope.view.btnUpload.onClick = this.browseSupportingDocument.bind(this);
        scope.view.tbxAmount.onEndEditing = function () {
          scope.view.tbxAmount.text = scope.formatAmount(scope.view.tbxAmount.text);
          scope.enableOrDisableContinueButton();
        };
        scope.view.flxCheckBox.onClick = this.toggleCheckbox.bind(this, "imgCheckBox", "financeUsflag");
        scope.view.flxCheckBox02.onClick = this.toggleCheckbox.bind(this, "imgPhysicalCheckbox02", "discrepanciesflag");
        scope.view.btnAdd1.onClick = this.addToTheList.bind(this, true);
        scope.view.btnAdd2.onClick = this.addToTheList.bind(this, false);
        scope.view.flxCreditRadioActive.onClick = this.ontoggleCreditRadioButton.bind(this);
        scope.view.flxAssignProceeds.onClick = this.ontoggleAssignProceedsRadioButton.bind(this);
        scope.view.flxInfoIcon.onClick = this.toggleAmountInfoPopup.bind(this, true);
        scope.view.flxAssignInfoClose.onClick = this.toggleAmountInfoPopup.bind(this, false);
        scope.view.flxUploadInfoIcon.onClick = this.toggleUploadDocumentInfoPopup.bind(this, true);
        scope.view.flxInfoClose.onClick = this.toggleUploadDocumentInfoPopup.bind(this, false);
        scope.view.UploadDocumentPopup.btnNo.onClick = this.togglePopup.bind(this, false, "flxUploadDocumentPopup");
        scope.view.UploadDocumentPopup.btnYes.onClick = this.tryAgainBrowse.bind(this);
        scope.view.UploadDocumentPopup.flxCross.onClick = this.togglePopup.bind(this, false, "flxUploadDocumentPopup");
        scope.view.flxViewLCDetails.onClick = scope.viewLCPopup.bind(this, true);
        scope.view.flxCross.onClick = scope.viewLCPopup.bind(this, false);
        scope.view.btnCancel.onClick = scope.navigationOnButtonClick.bind(this, "btnCancel");
        scope.view.btnBack.onClick = scope.navigationOnButtonClick.bind(this, "btnBack");
        scope.view.txtAreaAssignmentofProceeds.onEndEditing = function () {
          scope.enableOrDisableContinueButton();
        };
      } catch (err) {
        var errorObj = {
          "level": "frmReviseDrawingDocUploadController",
          "method": "initActions",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    updateFormUI: function(viewModel) {
      if (viewModel.isLoading === true) {
        FormControllerUtility.showProgressBar(this.view);
      } else if (viewModel.isLoading === false) {
        FormControllerUtility.hideProgressBar(this.view);
      }
      if (viewModel.uploadDocuments) {
        this.storeReferenveValues(viewModel.uploadDocuments[0].documentReference);
      }
    },
    /**
         * @api : setDataInResponseToDiscrepancies
         * Setting DataInResponseToDiscrepancies
         * @arg: NA
         * @return : NA
         */
    setDataInResponseToDiscrepancies: function() {
      var scope = this;
      try {
        scope.view.lblTotalDocumentsValue.text = finalResponse.response.drawingResponse.totalDocuments;
        // Setting data into documents list
        scope.view.segDocumentsValueContainer.widgetDataMap = {
          lblHeading: "lblHeading"
        };
        // Processing document data
        var docMasterData = [];
        JSON.parse(finalResponse.response.drawingResponse.uploadedDocuments).map(function(docData) {
            docMasterData.push({
                lblHeading: docData
            })
        });
        // setting data into segment
        scope.view.segDocumentsValueContainer.setData(docMasterData);
        scope.view.lblDocStatusValue.text = finalResponse.response.drawingResponse.documentStatus;
        scope.view.lblDocStatusValue.text = finalResponse.response.drawingResponse.documentStatus;
        // Setting data into Discrepancy History
        scope.view.segDiscrepancyResponse.widgetDataMap = {
          lblLeft1: "lblLeft1",
          lblRight1: "lblRight1"
        };
        // Segment data
        let discrepancyMasterData = [];
        // Reason for return
        discrepancyMasterData.push({
          "lblLeft1": kony.i18n.getLocalizedString("i18n.TradeFinance.ReasonforReturn") + ":",
          "lblRight1": finalResponse.response.drawingResponse.reasonForReturn
        });
        // Discrepancies data
        finalResponse.userDiscrepancySelection.map(function(paymentItem, index) {
          if ('title' in paymentItem && paymentItem.title.length > 0) {
            discrepancyMasterData.push({
              lblLeft1: kony.i18n.getLocalizedString("i18n.TradeFinance.Discrepancy") + " " + (index + 1) + ":",
              lblRight1: {
                text: paymentItem.title,
                skin: "sknlbl424242SSP15pxSemibold"
              }
            });
          }
          if ('userResponse' in paymentItem && paymentItem.userResponse.length > 0) {
            discrepancyMasterData.push({
              lblLeft1: kony.i18n.getLocalizedString("i18n.TradeFinance.D") + (index + 1) + " " + kony.i18n.getLocalizedString("i18n.TradeFinance.UserResponse") + ":",
              lblRight1: paymentItem.userResponse
            });
          }
          if ('userComment' in paymentItem && paymentItem.userComment.length > 0) {
            discrepancyMasterData.push({
              lblLeft1: kony.i18n.getLocalizedString("i18n.TradeFinance.D") + (index + 1) + " " + kony.i18n.getLocalizedString("i18n.TradeFinance.UserComment") + ":",
              lblRight1: paymentItem.userComment
            });
          }
        });
        // Return message to bank
        if ('returnMessageToBank' in finalResponse && finalResponse.returnMessageToBank.length > 0) {
          discrepancyMasterData.push({
            "lblLeft1": kony.i18n.getLocalizedString("i18n.TradeFinance.ReturnMessagetoBank") + ":",
            "lblRight1": finalResponse.returnMessageToBank
          });
        }
        else{
          discrepancyMasterData.push({
            "lblLeft1": kony.i18n.getLocalizedString("i18n.TradeFinance.ReturnMessagetoBank") + ":",
            "lblRight1": kony.i18n.getLocalizedString("i18n.common.NA")
          });
        }
        scope.view.segDiscrepancyResponse.setData(discrepancyMasterData);
      } catch (err) {
        var errorObj = {
          "level": "frmReviseDrawingDocUploadController",
          "method": "setDataInResponseToDiscrepancies",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
         * @api : preFillingDrawingAmountAndAmountCredited
         * FFunctionality of Drawing Amount Flex
         * @arg: NA
         * @return : NA
         */
    preFillingDrawingAmountAndAmountCredited: function() {
      var scope = this;
      try {
        // Setting pre-filled data
        scope.view.lblSelectedValueCurrency.text = finalResponse.response.drawingResponse.currency;
        scope.view.tbxAmount.text = finalResponse.response.drawingResponse.drawingAmount;
        // Please Finance us for... checkbox logic
        if (scope.financeUsflag === true) {
          scope.view.imgCheckBox.src = "active.png";
        } else {
          scope.view.imgCheckBox.src = "inactive.png";
        }
        if (scope.discrepanciesflag === true) {
          scope.view.imgPhysicalCheckbox02.src = "active.png";
        } else {
          scope.view.imgPhysicalCheckbox02.src = "inactive.png";
        }
        // Credit Account and Assignment of Proceeds radio button logic
        if ('creditAccount' in finalResponse.response.drawingResponse) {
          scope.view.imgCreditRadioActive.src = "radiobtn_active.png";
          scope.view.imgAssignRadioActive.src = "radio_btn_inactive.png";
          scope.view.flxtbxAssignmentProceeds.setVisibility(false);
          this.view.flxSelectCreditAmount.setVisibility(true);
          scope.view.lblSelectCreditAccount.text = finalResponse.response.drawingResponse.creditAccount;
          var creditData = scope.view.segCreditAccounts.data;
          for (let i = 0; i < creditData.length; i++) {
            if (finalResponse.response.drawingResponse.creditAccount === creditData[i].accountID) {
              this.view.lblSelectCreditAccount.text = creditData[i].lblListValue.text;
              break;
            }
          }
          scope.creditAccountSelected = true;
        } else if ('externalAccount' in finalResponse.response.drawingResponse) {
          scope.view.imgCreditRadioActive.src = "radio_btn_inactive.png";
          scope.view.imgAssignRadioActive.src = "radiobtn_active.png";
          scope.view.flxtbxAssignmentProceeds.setVisibility(true);
          this.view.flxSelectCreditAmount.setVisibility(false);
          scope.view.txtAreaAssignmentofProceeds.text = finalResponse.response.drawingResponse.externalAccount;
          scope.assignmentOfProceedsFlag = finalResponse.response.drawingResponse.externalAccount ? true : false;
        }
        let values = eval(finalResponse.response.drawingResponse.physicalDocuments)
        count = values.length;
        scope.setDocumentsData();
        scope.disableSkin = "bbsknA0A0A015px";
        let segmentData = scope.view.segSelectDocTitle.data;
        for (let i = 0; i < values.length; i++) {
          const docTitleVisibility = documentTitle.includes(values[i]["title"]);
          segmentData[i].flxSelectDocTitle.isVisible = docTitleVisibility;
          segmentData[i].flxTextField.isVisible = !docTitleVisibility;
          segmentData[i].lblSelectEnter.text = values[i]["title"];
          segmentData[i].tbxEnterTitle.text = values[i]["title"];
          segmentData[i].lblOriginalsCount.text = values[i]["count1"];
          segmentData[i].lblCopiesCount.text = values[i]["count2"];
          scope.view.segSelectDocTitle.setDataAt(segmentData[i], i);
          scope.docTitleRowClick =  false;
          if(segmentData[i].lblSelectEnter.text !== "Select Document Title"){
            let rowIndex = documentTitle.indexOf(segmentData[i].lblSelectEnter.text);
            if(rowIndex > -1){
            scope.view.segDocTitleDropdown.data[rowIndex].lblField.skin = scope.disableSkin;
            scope.view.segDocTitleDropdown.setDataAt(scope.view.segDocTitleDropdown.data[rowIndex], rowIndex);
            scope.docTitleRowClick =  true;
            }
          }
          // scope.documentTitle.splice(rowIndex, 1);
          // scope.setDocumentsDropdownSegmentData("segDocTitleDropdown", scope.documentTitle);
        }
        if(finalResponse.response.drawingResponse.chargesDebitAccount){
          var debitData = scope.view.segDebitedFromDropdown.data;
          for (var i = 0; i < debitData.length; i++) {
            if (finalResponse.response.drawingResponse.chargesDebitAccount === debitData[i].accountID) {
              scope.view.lblBankAccountValue.text = debitData[i].lblListValue.text;
              break;
            }
          }
          this.debitAccountSelected =  true;
        }
        scope.view.txtMessageToBankValue.text = finalResponse.response.drawingResponse.messageToBank || "";
        if(finalResponse.response.drawingResponse.documentReference){
          filesToBeUploaded = [];
          scope.uploadDocumentsNames = JSON.parse(finalResponse.response.drawingResponse.uploadedDocuments);
          let extensions = ["pdf", "jpeg", "doc", "xlsx", "bmp", "zip"];
          let extensionsImages = ["pdf_image.png", "jpeg_image.png", "xls_image.png", "pdf_image.png", "jpeg_image.png", "xls_image.png", "xls_image.png"];
          for(let j = 0; j < scope.uploadDocumentsNames.length; j++){
            let extn = extensionsImages[extensions.indexOf(scope.uploadDocumentsNames[j].split(".")[1])]
            filesToBeUploaded.push([scope.uploadDocumentsNames[j],extn]);
          }
          scope.setAttachmentsDataToSegment();
          let docVal = finalResponse.response.drawingResponse.documentReference.split(",");
          for(var k = 0; k < docVal.length; k++){
            docReferenceValues.push(docVal[k]);
          }
          scope.presenter.retrieveDocuments(docReferenceValues.toString(),this.view.id);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmReviseDrawingDocUploadController",
          "method": "preFillingDrawingAmountAndAmountCredited",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
         * @api : toggleOtherDrawingFields
         * Toggling other drawing fields in UI
         * @arg: NA
         * @return : NA
         */
    toggleOtherDrawingFields: function() {
      var scope = this;
      try {
        if (scope.view.imgSwitchIcon.src === "inactive_btn.png") {
          // Displaying other drawing fields
          isOtherDocumentsVisible = true;
          scope.view.imgSwitchIcon.src = "active_btn.png";
          scope.view.flxDrawingAmount.setVisibility(true);
          scope.view.flxAmountCredited.setVisibility(true);
          scope.view.flxChargesAccount.setVisibility(true);
        } else {
          // Hiding other drawing fields
          isOtherDocumentsVisible = false;
          scope.view.imgSwitchIcon.src = "inactive_btn.png";
          scope.view.flxDrawingAmount.setVisibility(false);
          scope.view.flxAmountCredited.setVisibility(false);
          scope.view.flxChargesAccount.setVisibility(false);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmReviseDrawingDocUploadController",
          "method": "toggleOtherDrawingFields",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
         * @api : openCurrencyDropdown
         * For opening currency dropdown
         * @arg: NA
         * @return : NA
         */
    openCurrencyDropdown: function() {
      var scope = this;
      try {
        if (scope.view.flxDropdownListCurrency.isVisible) {
          scope.view.flxDropdownListCurrency.setVisibility(false);
          scope.view.imgDropdownIconCurrency.src = "dropdown_expand.png";
        } else {
          scope.view.flxDropdownListCurrency.setVisibility(true);
          scope.view.imgDropdownIconCurrency.src = "dropdown_collapse.png";
        }
      } catch (err) {
        var errorObj = {
          "level": "frmReviseDrawingDocUploadController",
          "method": "openCurrencyDropdown",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
         * @api : segDropdownListCurrencyRowClick
         * On row click of segDropdownListCurrency
         * @arg: NA
         * @return : NA
         */
    segDropdownListCurrencyRowClick: function() {
      var scope = this;
      try {
        var selectedAccount = scope.view.segDropdownListCurrency.selectedRowItems[0];
        scope.view.lblSelectedValueCurrency.text = selectedAccount.lblListValue;
        scope.openCurrencyDropdown();
      } catch (err) {
        var errorObj = {
          "level": "frmReviseDrawingDocUploadController",
          "method": "segDropdownListCurrencyRowClick",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
         * @api : toggleCreditAccountDropdown
         * On row click of segDropdownListCurrency
         * @arg: NA
         * @return : NA
         */
    toggleCreditAccountDropdown: function() {
      var scope = this;
      try {
        if (this.view.flxSegCreditAccount.isVisible) {
          this.view.flxSegCreditAccount.setVisibility(false);
          this.view.imgCreditAccountDropDown.src = "dropdown_expand.png";
        } else {
          this.view.flxSegCreditAccount.setVisibility(true);
          this.view.imgCreditAccountDropDown.src = "dropdown_collapse.png";
        }
      } catch (err) {
        var errorObj = {
          "level": "frmReviseDrawingDocUploadController",
          "method": "toggleCreditAccountDropdown",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
         * @api : segCreditAccountsRowClick
         * On row click of segCreditAccounts
         * @arg: NA
         * @return : NA
         */
    segCreditAccountsRowClick: function() {
      var scope = this;
      try {
        var selectedAccount = this.view.segCreditAccounts.selectedRowItems[0];
        this.creditAccountID = selectedAccount.accountID;
        creditAccountSelected = true;
        this.view.lblSelectCreditAccount.text = selectedAccount.lblListValue.text;
        this.toggleCreditAccountDropdown();
      } catch (err) {
        var errorObj = {
          "level": "frmReviseDrawingDocUploadController",
          "method": "segCreditAccountsRowClick",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    storeReferenveValues: function(key) {
      var scope = this;
      docReferenceValues.push(key);
    },
    tryAgainBrowse: function() {
      this.togglePopup(false, "flxUploadDocumentPopup");
      this.browseSupportingDocument();
    },
    browseSupportingDocument: function() {
      var scope = this;
      var config = {
        selectMultipleFiles: false,
        filter: ["application/pdf",
                 "image/jpeg","image/png","image/bmp",
                 "application/x-zip-compressed", 
                 "application/msword","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                 "application/vnd.ms-excel", ".csv"]
      };
      kony.io.FileSystem.browse(config, scope.selectedFileCallback);
      scope.documentCount = filesToBeUploaded.length;
    },
    getBase64: function(file, successCallback) {
      var reader = new FileReader();
      reader.onloadend = function() {
        successCallback(reader.result);
      };
      reader.readAsDataURL(file);
    },
    selectedFileCallback: function(events, files) {
      var scope = this;
      var maxAttachmentsAllowed = 5;
      var fileNameRegex = new RegExp("^[a-zA-Z0-9]*[.][.a-zA-Z0-9]*[^.]$");
      if (this.documentCount === filesToBeUploaded.length) {
        if (files.length > 0) {
          var fileName = files[0].file.name;
          var extension = files[0].file.name.split('.');
          let extensions = ["pdf", "jpeg", "doc", "xlsx", "bmp", "zip"];
          let extensionsImages = ["pdf_image.png", "jpeg_image.png", "word.png", "excel.png", "png.png", "zip.png"];
          if (extension.length > 0 && !extensions.includes(extension[extension.length - 1])) {
            scope.togglePopup(true, "flxUploadDocumentPopup");
            scope.view.UploadDocumentPopup.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.TransfersEur.AttachmentTypeErrorMsg1") + " " + files[0].name + " " + kony.i18n.getLocalizedString("i18n.TransfersEur.AttachmentTypeErrorMsg2");
            scope.view.forceLayout();
            return;
          }
          if (files[0].file.size >= 250000000) {
            scope.togglePopup(true, "flxUploadDocumentPopup");
            scope.view.UploadDocumentPopup.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.TransfersEur.AttachmentTypeErrorMsg1") + " " + files[0].name + " " + kony.i18n.getLocalizedString("i18n.TradeFinance.AttachmentSizeErrorMsg");
            scope.view.forceLayout();
            return;
          } else if (filesToBeUploaded.length >= maxAttachmentsAllowed) {
            scope.togglePopup(true, "flxUploadDocumentPopup");
            scope.view.UploadDocumentPopup.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AttachmentLimitExceededErrorMsg");
            scope.view.forceLayout();
            return;
          } else {
            var fileData = {};
            scope.togglePopup(false, "flxUploadDocumentPopup");
            let img = extensionsImages[extensions.indexOf(extension[extension.length - 1])];
            filesToBeUploaded.push([files[0].name, img]);
            scope.uploadDocumentsNames.push(files[0].name);
            fileData.fileName = files[0].name;
            fileData.fileType = files[0].file.type;
            scope.getBase64(files[0].file, function(base64String) {
              attachments = [];
              base64String = base64String.replace("data:;base64\,", "");
              base64String = base64String.replace("data:application\/octet-stream;base64\,", "");
              base64String = base64String.replace("data:image\/jpeg;base64\,", "");
              base64String = base64String.replace("data:image\/png;base64\,", "");
              fileData.fileContents = base64String.replace("data:application/pdf;base64\,", "");
              fileData.fileContents = base64String.replace("data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64\,", "");
              fileData.fileContents = base64String.replace("data:application/msword;base64\,", "");
              fileData.fileContents = base64String.replace("data:application/x-zip-compressed;base64\,", "");
              fileData.fileContents = base64String.replace("data:image/bmp;base64\,", "");
              attachments.push(fileData);
              var fileDataItemParsed = attachments.map(function(item) {
                return item['fileName'] + "-" + item['fileType'] + "-" + item['fileContents'];
              });
              uploadedAttachments.push(fileDataItemParsed[0]);
              base64Content.push(fileData.fileContents);
              scope.uploadDocumentCall();
            });
          }
        }
      } else return;
      if (filesToBeUploaded.length <= maxAttachmentsAllowed) {
        scope.setAttachmentsDataToSegment();
      }
      scope.view.forceLayout();
    },
    formatAmount: function(amount) {
      if (amount === undefined || amount === null) {
        this.enableOrDisableContinueButton();
        return;
      }
      return applicationManager.getFormatUtilManager().formatAmount(amount);
    },
    deFormatAmount: function(amount) {
      if (amount === undefined || amount === null) {
        return;
      }
      return applicationManager.getFormatUtilManager().deFormatAmount(amount);
    },
    navigateSaveandContinue: function() {
      var data = this.getFormDetails();
      finalResponse.response.drawingResponse.returnMessageToBank = finalResponse.returnMessageToBank;
      data.finalResponse = finalResponse;
      let navManager = applicationManager.getNavigationManager();
      navManager.navigateTo({
        appName: "TradeFinanceMA",
        friendlyName: "ExportLCUIModule/frmExportLCReviewSubmit"
      }, false, data);
    },
    addToTheList: function(visibility) {
      var scope = this;
      count++;
      scope.view.lblDocumentError.setVisibility(false);
      var data = {
        "flxSelectDocTitle": {
          "isVisible": visibility,
          "onClick": scope.toggleDocumentDropdown.bind(scope, "flxSegDocTitleDropdown", 1)
        },
        "flxTextField": {
          "isVisible": !visibility
        },
        "lblSelectEnter": {
          "text": "Select Document Title"
        },
        "lblOriginalsCount": {
          "text": "Originals Count"
        },
        "lblCopiesCount": {
          "text": "Copies Count"
        },
        "lblDropDown1": {
          "text": "O"
        },
        "lblDropDown2": {
          "text": "O"
        },
        "lblDropDown3": {
          "text": "O"
        },
        "flxOriginalCount": {
          "onClick": scope.toggleDocumentDropdown.bind(scope, "flxSegSelectOriginal", 2)
        },
        "flxCopiesCount": {
          "onClick": scope.toggleDocumentDropdown.bind(scope, "flxSegCopiesCount", 3)
        },
        "flxDelete": {
          "isVisible": true,
          "onClick": scope.deleteDocuments.bind(scope)
        },
        "tbxEnterTitle": {
          "text": "",
          "onEndEditing": scope.enableOrDisableContinueButton.bind(scope)
        },
        "template": "flxSelectDocumentTitle"
      };
      scope.view.segSelectDocTitle.addDataAt(data, count - 1);
      if (count === 20) {
        scope.disableOrEnable("btnAdd1", false);
        scope.disableOrEnable("btnAdd2", false);
      }
      if (documentTitle.length === 1 || count === 13) {
        scope.disableOrEnable("btnAdd1", false);
      }
      scope.enableOrDisableContinueButton();
    },
    disableOrEnable: function(widget, flag, param) {
      this.view[widget].skin = flag ? "ICSknsknBtnffffffBorder0273e31pxRadius2px" : "ICSknbtnDisablede2e9f036px";
      this.view[widget].onClick = flag ? this.addToTheList.bind(this, param) : null;
    },
    segDocTitleDropdownRowClick: function(segment, selectedKey, count) {
      var scope = this;
      var selectedAccount = this.view[segment].selectedRowItems[0];
      let rowIndex = scope.view[segment].selectedRowIndex[1];
      var data = scope.view.segSelectDocTitle.data[documentUploadsIndex];
      if (count === 1 && scope.view[segment].data[rowIndex].lblField.skin === disableSkin) {
        return;
      }
      if (count === 1 && data[selectedKey].text !== "Select Document Title") {
        let index = documentTitle.indexOf(data[selectedKey].text);
        scope.view[segment].data[index].lblField.skin = enableSkin;
        scope.view[segment].setDataAt(scope.view[segment].data[index], index);
      }
      data[selectedKey].text = selectedAccount.lblField.text;
      if (count !== 1 && data[selectedKey].text !== "Will not submit") {
        let appenedLbl = count === 2 ? " Originals" : " Copies";
        data[selectedKey].text = selectedAccount.lblField.text + appenedLbl;
      }
      data["lblDropDown" + count].text = "O";
      scope.view.segSelectDocTitle.setDataAt(data, documentUploadsIndex);
      scope.closeDocumentDropdowns();
      if (count === 1) {
        scope.view[segment].data[rowIndex].lblField.skin = disableSkin;
        scope.view[segment].setDataAt(scope.view[segment].data[rowIndex], rowIndex);
      }
      scope.enableOrDisableContinueButton();
    },
    closeDocumentDropdowns: function() {
      var scope = this;
      scope.view.flxDropdowns.setVisibility(false);
      scope.view.flxSegDocTitleDropdown.setVisibility(false);
      scope.view.flxSegSelectOriginal.setVisibility(false);
      scope.view.flxSegCopiesCount.setVisibility(false);
    },
    enableOrDisableContinueButton: function() {
      var scope = this;
      let amountFlag = (this.view.tbxAmount.text === "" || this.view.tbxAmount.text <= 0) ? false : true;
      if (!scope.view.flxSelectCreditAmount.isVisible) {
        scope.assignmentOfProceedsFlag = (this.view.txtAreaAssignmentofProceeds.text === "") ? false : true;
      } else {
        scope.assignmentOfProceedsFlag = scope.creditAccountSelected;
      }
      let length = scope.view.segSelectDocTitle.data.length;
      for (i = 0; i < length; i++) {
        let segSelected = scope.view.segSelectDocTitle.data[i];
        var docNameFlag = segSelected.flxTextField.isVisible ? (segSelected.tbxEnterTitle.text === "" ? false : true) : (segSelected.lblSelectEnter.text !== "Select Document Title" ? true : false);
        if (segSelected.lblCopiesCount.text !== "Copies Count" && segSelected.lblOriginalsCount.text !== "Originals Count" && docNameFlag) {
          scope.docTitleRowClick = true;
        } else {
          scope.docTitleRowClick = false;
        }
      }
  	  if(length === 0)  {
  		  scope.docTitleRowClick = false;
  	  }
      if (scope.debitAccountSelected && scope.docTitleRowClick && scope.assignmentOfProceedsFlag && amountFlag && this.view.segUploadDocs.data.length > 0) {
        scope.enableButton(scope.view.btnContinueReview);
      } else {
        scope.disableButton(scope.view.btnContinueReview);
      }
    },
    enableButton: function(btnWidget) {
      btnWidget.setEnabled(true);
      btnWidget.skin = "ICSknsknBtnSSPffffff15pxBg0273e3";
    },
    disableButton: function(btnWidget) {
      btnWidget.setEnabled(false);
      btnWidget.skin = "ICSknbtnDisablede2e9f036px";
    },
    getFormDetails: function() {
      var scope = this;
      var formDetails = {};
      let length = scope.view.segSelectDocTitle.data.length;
      let physicalDocumentsDetails = [];
      for (i = 0; i < length; i++) {
        let segSelected = scope.view.segSelectDocTitle.data[i];
        var docName = segSelected.flxTextField.isVisible ? segSelected.tbxEnterTitle.text : segSelected.lblSelectEnter.text;
        physicalDocumentsDetails[i] = docName + " (" + segSelected.lblOriginalsCount.text + ", " + segSelected.lblCopiesCount.text + ")";
      }
      formDetails.drawingAmount = this.deFormatAmount(this.view.tbxAmount.text);
      formDetails.amountCreditedTo = (scope.view.flxSelectCreditAmount.isVisible) ? scope.view.lblSelectCreditAccount.text : scope.view.txtAreaAssignmentofProceeds.text;
      formDetails.financeUs = scope.financeUsflag ? "Selected" : "Unselected";
      formDetails.uploadedDocuments = scope.uploadDocumentsNames;
      formDetails.physicalDocumentsDetails = physicalDocumentsDetails;
      formDetails.discrepancies = scope.discrepanciesflag ? "Selected" : "Unselected";
      formDetails.chargesDebitAccount = scope.view.lblBankAccountValue.text;
      formDetails.messageToTheBank = scope.view.txtMessageToBankValue.text;
      formDetails.uploadAttachments = uploadedAttachments;
      formDetails.physicalDocumentsSegmentData = scope.view.segSelectDocTitle.data;
      formDetails.creditAccountIDFormatted = scope.view.lblSelectCreditAccount.text;
      formDetails.debitAccountFormatted = scope.view.lblBankAccountValue.text;
      formDetails.currency = scope.view.lblSelectedValueCurrency.text;
      formDetails.documentReference = docReferenceValues.join(",");
      formDetails.otherDrawingFiledsEnabled = isOtherDocumentsVisible;
      return formDetails;
    },
    /**
         * @api : uploadDocumentCall
         * On row click of segDropdownListCurrency
         * @arg: NA
         * @return : NA
         */
    uploadDocumentCall: function() {
      var scope = this;
      try {
        let documents = uploadedAttachments.toString();
        if (uploadedAttachments.length > 0) {
          this.presenter.uploadExportLCDocuments(documents, this.view.id);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmReviseDrawingDocUploadController",
          "method": "uploadDocumentCall",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    ontoggleCreditRadioButton: function() {
      this.view.flxSelectCreditAmount.setVisibility(true);
      this.view.flxtbxAssignmentProceeds.setVisibility(false);
      this.ontoggleRadioButton("imgCreditRadioActive", "imgAssignRadioActive");
    },
    ontoggleAssignProceedsRadioButton: function() {
      this.view.flxtbxAssignmentProceeds.setVisibility(true);
      this.view.flxSelectCreditAmount.setVisibility(false);
      this.ontoggleRadioButton("imgAssignRadioActive", "imgCreditRadioActive");
    },
    ontoggleRadioButton: function(selectedWidget, unselectedWidget) {
      if (this.view[selectedWidget].src === "radiobtn_active.png") {
        this.view[selectedWidget].src = "radio_btn_inactive.png";
        this.view[unselectedWidget].src = "radiobtn_active.png";
      } else {
        this.view[unselectedWidget].src = "radio_btn_inactive.png";
        this.view[selectedWidget].src = "radiobtn_active.png";
      }
      this.enableOrDisableContinueButton();
    },
    toggleAmountInfoPopup: function(visibility) {
      this.view.flxAssignInfoUploadMsg.setVisibility(visibility);
    },
    toggleUploadDocumentInfoPopup: function(visibility) {
      this.view.flxInfoUploadMsg.setVisibility(visibility);
    },
    toggleCheckbox: function(widget, param) {
      var scope = this;
      if (this.view[widget].src === "activecheckbox.png") {
        this.view[widget].src = "inactive.png";
        param === "discrepanciesflag" ? scope.discrepanciesflag = false : scope.financeUsflag = false;
        param === "discrepanciesflag" ? finalResponse.financeBillFormatted = "Unselected" : finalResponse.forwardDocumentsFormatted = "Unselected";
        param === "discrepanciesflag" ? finalResponse.financeBill = "No" : finalResponse.forwardDocuments = "No";
      } else {
        this.view[widget].src = "activecheckbox.png";
        param === "discrepanciesflag" ? scope.discrepanciesflag = true : scope.financeUsflag = true;
        param === "discrepanciesflag" ? finalResponse.financeBillFormatted = "Selected" : finalResponse.forwardDocumentsFormatted = "Selected";
        param === "discrepanciesflag" ? finalResponse.financeBill = "Yes" : finalResponse.forwardDocuments = "Yes";
      }
    },
    togglePopup: function(visibility, flxpopup) {
      this.view.flxDialogs.setVisibility(visibility);
      this.view[flxpopup].setVisibility(visibility);
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
        scope.view.flxUploadDocSeg.setVisibility(true);
        var attachmentsData = [];
        this.uploadDocumentsNames=[];
        for (var i = 0; i < filesToBeUploaded.length; i++) {
          attachmentsData[i] = {
            "imgPDF": {
              "src": filesToBeUploaded[i][1] ? filesToBeUploaded[i][1] : "errormessage.png"
            },
            "fileName": filesToBeUploaded[i][0],
            "lblDelete":{
              "text":"S"
            },
            "removeAction": {
              "onClick": scope.deleteAttachment.bind(scope)
            },
            "template": "flxExportLCDrawingsUploadDocument"
          };
          this.uploadDocumentsNames.push(filesToBeUploaded[i][0]);
        }
        scope.view.segUploadDocs.widgetDataMap = {
          "imgPDF": "imgPDF",
          "lblDocumentName": "fileName",
          "lblDelete": "lblDelete",
          "flxDelete": "removeAction"
        };
        scope.view.segUploadDocs.setData(attachmentsData);
        scope.enableOrDisableContinueButton();
        scope.view.forceLayout();
      } catch (err) {
        var errorObj = {
          "level": "frmReviseDrawingDocUploadController",
          "method": "setAttachmentsDataToSegment",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    deleteAttachment: function() {
      var scope = this;
      var index = scope.view.segUploadDocs.selectedRowIndex;
      var sectionIndex = index[0];
      var rowIndex = index[1];
      var deletedAttachment = scope.view.segUploadDocs.data[rowIndex];
      scope.view.segUploadDocs.removeAt(rowIndex, sectionIndex);
      scope.enableOrDisableContinueButton();
      scope.removeAttachments(deletedAttachment);
      // Removing doc from array to display in frmExportLCReviewSubmitController
      const deletedDocIndex = scope.uploadDocumentsNames.indexOf(deletedAttachment.fileName);
      if (deletedDocIndex > -1) {
        scope.uploadDocumentsNames.splice(deletedDocIndex, 1); // 2nd parameter (1) means remove one item only
      }
    },
    removeAttachments: function(data) {
      var scope = this;
      for (var i = 0; i < filesToBeUploaded.length; i++) {
        if (filesToBeUploaded[i][0] === data.fileName) {
          filesToBeUploaded.splice(i, 1);
          docReferenceValues.splice(i, 1);
          attachments.splice(i, 1);
          uploadedAttachments.splice(i, 1);
          break;
        }
      }
      scope.togglePopup(false, "flxUploadDocumentPopup");
      scope.setAttachmentsDataToSegment();
    },
    /**
         * @api : toggleDocumentDropdown
         * On row click of segDropdownListCurrency
         * @arg: NA
         * @return : NA
         */
    toggleDocumentDropdown: function(flxwidget, count) {
      var scope = this;
      try {
        var index = scope.view.segSelectDocTitle.selectedRowIndex;
        var rowIndex = index[1];
        documentUploadsIndex = rowIndex;
        var data = scope.view.segSelectDocTitle.data[rowIndex];
        scope.documentsflag = data["flxSelectDocTitle"].isVisible;
        if (scope.view[flxwidget].isVisible) {
          scope.view[flxwidget].setVisibility(false);
          data["lblDropDown" + count].text = "O";
        } else {
          scope.view.flxSegDocTitleDropdown.setVisibility(false);
          scope.view.flxSegSelectOriginal.setVisibility(false);
          scope.view.flxSegCopiesCount.setVisibility(false);
          // if (isOtherDocumentsVisible) {
          //   scope.view[flxwidget].top = 350 + (50 * rowIndex) + "dp";
          // } else {
            scope.view[flxwidget].top = (60 * rowIndex) + "dp";
          // }
          data["lblDropDown1"].text = "O";
          data["lblDropDown2"].text = "O";
          data["lblDropDown3"].text = "O";
          scope.view[flxwidget].setVisibility(true);
          scope.view.flxDropdowns.setVisibility(true);
          data["lblDropDown" + count].text = "P";
        }
        if(scope.view.flxSegDocTitleDropdown.isVisible === false && scope.view.flxSegSelectOriginal.isVisible === false && scope.view.flxSegCopiesCount.isVisible === false){
          scope.view.flxDropdowns.setVisibility(false);
        }
        scope.view.segSelectDocTitle.setDataAt(data, rowIndex);
      } catch (err) {
        var errorObj = {
          "level": "frmReviseDrawingDocUploadController",
          "method": "toggleDocumentDropdown",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    deleteDocuments: function() {
      var scope = this;
      var index = scope.view.segSelectDocTitle.selectedRowIndex;
      var sectionIndex = index[0];
      var rowIndex = index[1];
      count--;
      let segmentData = scope.view.segSelectDocTitle.data[rowIndex];
      if (segmentData.flxSelectDocTitle.isVisible === true && segmentData.lblSelectEnter.text !== "Select Document Title") {
        // let addedValue = segmentData.lblSelectEnter.text;
        // scope.documentTitle.push(addedValue);
        // scope.setDocumentsDropdownSegmentData("segDocTitleDropdown", scope.documentTitle);
        let index = documentTitle.indexOf(segmentData.lblSelectEnter.text);
        scope.view.segDocTitleDropdown.data[index].lblField.skin = enableSkin;
        scope.view.segDocTitleDropdown.setDataAt(scope.view.segDocTitleDropdown.data[index], index);
      }
      scope.view.segSelectDocTitle.removeAt(rowIndex, sectionIndex);
      if (scope.count < 20) {
        scope.disableOrEnable("btnAdd1", true, true);
        scope.disableOrEnable("btnAdd2", true, false);
      }
      if (count === 0) {
        scope.view.lblDocumentError.setVisibility(true);
      }
      scope.enableOrDisableContinueButton();
    },
    /**
         * @api : setSegmentData
         * On row click of segDropdownListCurrency
         * @arg: NA
         * @return : NA
         */
    setSegmentData: function() {
      var scope = this;
      try {
        var currency = {
          'EUR': "EUR",
          'USD': "USD"
        };
        documentTitle = ["Drafts", "Invoices", "B/L or AWB", "Shipment Advice", "Cert. of Origin", "Insurance", "Packing List", " Weight List", "Inspection Cert.", "Beneficiary Cert.", "TCN/TWB", " Original LC", "Amendment"];
        var documentCopy = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "Will not submit"];
        var creditAccountsData = [];
        var currencySegmentData = [];
        let accountObj = applicationManager.getAccountManager();
        let accountData = accountObj.getInternalAccounts();
        let accountsWidgetDataMap = {
          "lblListValue": "lblListValue",
          "flxDropdownValue": "flxDropdownValue"
        };
        scope.view.segDropdownListCurrency.widgetDataMap = accountsWidgetDataMap;
        for (key in currency) {
          currencySegmentData.push({
            "template": "flxDropdownValue",
            "lblListValue": currency[key]
          });
        }
        scope.view.segDropdownListCurrency.setData(currencySegmentData);
        scope.view.segCreditAccounts.widgetDataMap = accountsWidgetDataMap;
        for (var i = 0; i < accountData.length; i++) {
          creditAccountsData[i] = {
            "lblListValue": {
              "text": CommonUtilities.getAccountDisplayName(accountData[i])
            },
            "accountID": accountData[i].account_id,
            "template": "flxDropdownValue"
          };
        }
        scope.view.segCreditAccounts.setData(creditAccountsData);
        scope.view.segDebitedFromDropdown.widgetDataMap = accountsWidgetDataMap;
        scope.view.segDebitedFromDropdown.setData(creditAccountsData);
        scope.setDocumentsDropdownSegmentData("segDocTitleDropdown", documentTitle);
        scope.setDocumentsDropdownSegmentData("segSelectOriginalCopies", documentCopy);
        scope.setDocumentsDropdownSegmentData("segCopiesCount", documentCopy);
        scope.setDocumentsData();
      } catch (err) {
        var errorObj = {
          "level": "frmReviseDrawingDocUploadController",
          "method": "setSegmentData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
         * @api : setDocumentsDropdownSegmentData
         * Setting document data into segment
         * @arg: NA
         * @return : NA
         */
    setDocumentsDropdownSegmentData: function(segment, records) {
      var scope = this;
      try {
        let segmentData = [];
        let documentsCopiesWidgetDataMap = {
          "flxDocumentDropDown": "flxDocumentDropDown",
          "flxLabel": "flxLabel",
          "flxMain": "flxMain",
          "lblField": "lblField"
        };
        this.view[segment].widgetDataMap = documentsCopiesWidgetDataMap;
        for (var i = 0; i < records.length; i++) {
          segmentData[i] = {
            "lblField": {
              "text": records[i],
              "skin": enableSkin
            },
            "template": "flxDocumentDropDown"
          };
        }
        this.view[segment].setData(segmentData);
      } catch (err) {
        var errorObj = {
          "level": "frmReviseDrawingDocUploadController",
          "method": "setDocumentsDropdownSegmentData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
         * @api : setDocumentsData
         * Setting document data into segment
         * @arg: NA
         * @return : NA
         */
    setDocumentsData: function() {
      var scope = this;
      try {
        scope.view.segSelectDocTitle.widgetDataMap = {
          "flxCopiesCount": "flxCopiesCount",
          "flxDelete": "flxDelete",
          "flxMain": "flxMain",
          "flxOriginalCount": "flxOriginalCount",
          "flxSelectDocTitle": "flxSelectDocTitle",
          "flxSelectDocument": "flxSelectDocument",
          "flxSelectDocumentTitleTablet": "flxSelectDocumentTitleTablet",
          "flxTextField": "flxTextField",
          "lblDelete": "lblDelete",
          "lblDropDown1": "lblDropDown1",
          "lblDropDown2": "lblDropDown2",
          "lblDropDown3": "lblDropDown3",
          "lblCopiesCount": "lblCopiesCount",
          "lblOriginalsCount": "lblOriginalsCount",
          "lblSelectEnter": "lblSelectEnter",
          "tbxEnterTitle": "tbxEnterTitle"
        };
        var documentsData = [];
        for (var i = 0; i < count; i++) {
          documentsData[i] = {
            "flxSelectDocTitle": {
              "isVisible": true,
              "onClick": scope.toggleDocumentDropdown.bind(scope, "flxSegDocTitleDropdown", 1)
            },
            "flxTextField": {
              "isVisible": false
            },
            "lblSelectEnter": {
              "text": "Select Document Title"
            },
            "lblOriginalsCount": {
              "text": "Originals Count"
            },
            "lblCopiesCount": {
              "text": "Copies Count"
            },
            "lblDropDown1": {
              "text": "O"
            },
            "lblDropDown2": {
              "text": "O"
            },
            "lblDropDown3": {
              "text": "O"
            },
            "flxOriginalCount": {
              "onClick": scope.toggleDocumentDropdown.bind(scope, "flxSegSelectOriginal", 2)
            },
            "flxCopiesCount": {
              "onClick": scope.toggleDocumentDropdown.bind(scope, "flxSegCopiesCount", 3)
            },
            "tbxEnterTitle": {
              "text": ""
            },
            "flxDelete": {
              "isVisible": true,
              "onClick": scope.deleteDocuments.bind(scope)
            },
            "template": "flxSelectDocumentTitle"
          };
          //documentsData[0].flxDelete.isVisible = false;
        }
        scope.view.segSelectDocTitle.setData(documentsData);
      } catch (err) {
        var errorObj = {
          "level": "frmReviseDrawingDocUploadController",
          "method": "setDocumentsData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
         * @api : toggleDebitAccountDropdown
         * Toggle debit ac dropdown
         * @arg: NA
         * @return : NA
         */
    toggleDebitAccountDropdown: function() {
      var scope = this;
      try {
        if (this.view.flxSegDebitedFromDropdown.isVisible) {
          this.view.flxSegDebitedFromDropdown.setVisibility(false);
          this.view.imgBankAccountDropDown.src = "dropdown_expand.png";
        } else {
          this.view.flxSegDebitedFromDropdown.setVisibility(true);
          this.view.imgBankAccountDropDown.src = "dropdown_collapse.png";
        }
      } catch (err) {
        var errorObj = {
          "level": "frmReviseDrawingDocUploadController",
          "method": "toggleDebitAccountDropdown",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
         * @api : segDebitAccountsRowClick
         * Row click for segDebitAccounts
         * @arg: NA
         * @return : NA
         */
    segDebitAccountsRowClick: function() {
      var scope = this;
      try {
        var selectedAccount = this.view.segDebitedFromDropdown.selectedRowItems[0];
        this.debitAccountID = selectedAccount.accountID;
        debitAccountSelected = true;
        this.view.lblBankAccountValue.text = selectedAccount.lblListValue.text;
        this.toggleDebitAccountDropdown();
      } catch (err) {
        var errorObj = {
          "level": "frmReviseDrawingDocUploadController",
          "method": "segDebitAccountsRowClick",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : navigationOnButtonClick
     * Will trigger when user clicks on buttons
     * @arg: NA
     * @return : NA
     */
    navigationOnButtonClick: function (btnID) {
      var scope = this;
      try {
        if (btnID === "btnCancel") {
          formName = "frmExportLCDashboard";
          // Displaying cancel popup
          scope.view.flxDialogs.setVisibility(true);
          scope.view.flxLogout.setVisibility(true);
          scope.view.CustomPopup.lblHeading.text = kony.i18n.getLocalizedString("i18n.TransfersEur.btnCancel");
          scope.view.CustomPopup.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.confirmcancelchanges")
          scope.view.CustomPopup.btnNo.text = kony.i18n.getLocalizedString("i18n.common.no");
          scope.view.CustomPopup.btnYes.text = kony.i18n.getLocalizedString("i18n.common.yes");
          scope.view.CustomPopup.btnNo.onClick = scope.cancelPopupButtonClick.bind(this, "btnNo");
          scope.view.CustomPopup.btnYes.onClick = scope.cancelPopupButtonClick.bind(this, "btnYes");
          scope.view.CustomPopup.lblcross.onTouchEnd = scope.cancelPopupButtonClick.bind(this, "lblcross");
        } else if (btnID === "btnBack") {
          let navManager = applicationManager.getNavigationManager();
          navManager.navigateTo({
            appName: "TradeFinanceMA",
            friendlyName: "ExportLCUIModule/frmExportLCViewDetailsReturned"
          }, false, {userDiscrepancySelection: finalResponse.userDiscrepancySelection, returnMessageToBank: finalResponse.returnMessageToBank});
        }
      } catch (err) {
        var errorObj = {
          "level": "frmReviseDrawingDocUploadController",
          "method": "navigationOnButtonClick",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : navigationOnButtonClick
     * Will trigger when user clicks on buttons
     * @arg: NA
     * @return : NA
     */
    cancelPopupButtonClick: function (btnID) {
      var scope = this;
      try {
        scope.view.flxDialogs.setVisibility(false);
        scope.view.flxLogout.setVisibility(false);
        if (btnID === "btnYes") {
          let navManager = applicationManager.getNavigationManager();
          navManager.navigateTo({
            appName: "TradeFinanceMA",
            friendlyName: "ExportLCUIModule/frmExportLCDashboard"
          }, false);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmReviseDrawingDocUploadController",
          "method": "cancelPopupButtonClick",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setDataFori18n
     * Assigning i18n keys
     * @arg: NA
     * @return : NA
     */
    setDataFori18n: function() {
      var scope = this;
      try {
        scope.view.lblSubHeader.text = kony.i18n.getLocalizedString("i18n.TradeFinance.Exports") + " - " + kony.i18n.getLocalizedString("i18n.TradeFinance.Drawing") + " - " + finalResponse.response.drawingResponse.drawingReferenceNo;
        scope.view.lblDiscrepanciesandResponseValue.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ResponsetoDiscrepancies");
        scope.view.lblTotalDocuments.text = kony.i18n.getLocalizedString("i18n.TradeFinance.TotalDocuments") + ":";
        scope.view.lblDocuments.text = kony.i18n.getLocalizedString("i18n.TradeFinance.UploadDocuments") + ":";
        scope.view.lblDocStatus.text = kony.i18n.getLocalizedString("i18n.TradeFinance.DocumentStatus") + ":";
        scope.view.lblReviseDrawing.text = kony.i18n.getLocalizedString("i18n.TradeFinance.RevisetheDrawing");
        scope.view.lblViewLCDetails.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ViewLCDetails");
        scope.view.lblDrawingAmount.text = kony.i18n.getLocalizedString("i18n.TradeFinance.TheDrawingAmount");
        scope.view.lblSwitchText.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ShowOtherDrawingFieldstoRevise");
        scope.view.lblCurrency.text = kony.i18n.getLocalizedString("i18n.common.Currency");
        scope.view.lblAmount.text = kony.i18n.getLocalizedString("i18n.TradeFinance.DrawingAmount");
        scope.view.lblDrawingContent.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ExportDrawingCheckContent");
        scope.view.lblAmountToBeCredited.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AmounttobeCreditedto");
        scope.view.lblCreditAccount.text = kony.i18n.getLocalizedString("i18n.konybb.Common.CreditAccount");
        scope.view.lblAssignProceeds.text = "Assignment of Proceeds";
        // scope.view.lblAssignProceeds.text = kony.i18n.getLocalizedString("i18n.TradeFinance.SelectCreditAccount");
        scope.view.txtAreaAssignmentofProceeds.text = kony.i18n.getLocalizedString("Other beneficiary name/ internal/ external account");
        scope.view.lblUploadScannedDocs.text = kony.i18n.getLocalizedString("i18n.TradeFinance.Uploadscanneddocuments");
        scope.view.btnUpload.text = kony.i18n.getLocalizedString("i18n.TradeFinance.UploadDocument");
        scope.view.lblPhysicalDocTitle.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ExportPysicalDocTitle");
        scope.view.btnAdd1.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AddTitlefromList");
        scope.view.btnAdd2.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AddTitleMaually");
        scope.view.lblPhysicalDocContent.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ExportDocumentCheckContent");
        scope.view.lblChargesAccount.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ChargesAccountandMessagetoBank");
        scope.view.lblChargesDebitAcc.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ChargesDebitAccount");
        scope.view.lblMessageToBank.text = kony.i18n.getLocalizedString("i18n.TradeFinance.MessageToBank");
        scope.view.btnCancel.text = kony.i18n.getLocalizedString("i18n.TransfersEur.btnCancel");
        scope.view.btnBack.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.BACK");
        scope.view.btnContinueReview.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ContinuetoReview");
      } catch (err) {
        var errorObj = {
          "level": "frmReviseDrawingDocUploadController",
          "method": "setDataFori18n",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    
    
    viewLCPopup: function(visibility) {
      var scope = this;
      try {
        if (visibility === true) {
          scope.view.flxDialogs.setVisibility(true);
          scope.view.flxLogout.setVisibility(false);
          scope.view.flxViewLCDetailsPopup.setVisibility(true);
           let exportLCdata = finalResponse.lcResponse;
          let swiftsAndAdvises = (finalResponse.lcResponse.SwiftsAndAdvises) ? finalResponse.lcResponse.SwiftsAndAdvises[0] : "";
          //Assigning LC Details
          scope.view.lblLCDetailsHeader.text = "Export LC - " + exportLCdata.exportLCId;
          scope.view.lblLCTypeeValue.text = exportLCdata.lcType;
          scope.view.lblLCRefNoValue.text = exportLCdata.exportLCId;
          scope.view.lblLCApplicantValue.text = exportLCdata.applicant;
          scope.view.lblLCApplicantAddValue.text = exportLCdata.applicantaddress;
          scope.view.lblLCIssueBankalue.text = exportLCdata.issuingBank;
          scope.view.lblLCIssueBankAddValue.text = exportLCdata.issuingbankaddress;
          scope.view.lblLCIssueDateValue.text = exportLCdata.issueDate;
          scope.view.lblLCExpireDateValue.text = exportLCdata.expiryDate;
          scope.view.lblLCAmountValuee.text = applicationManager.getConfigurationManager().getCurrency(exportLCdata.currency) + " " + exportLCdata.amount;
          //Assigning Beneficiary Details
          scope.view.lblBenNameValue.text = exportLCdata.beneficiaryName;
          scope.view.lblBenAddValue.text = exportLCdata.beneficiaryAddress;
          scope.view.lblDescriptionValue.text = exportLCdata.goodsDescription;
          scope.view.lblAddValue.text = exportLCdata.additionalConditions;
          scope.view.lblConfirmValue.text = exportLCdata.confirmInstructions;
          scope.view.lblShipmentValue.text = exportLCdata.latestShipmentDate;
          scope.view.segUploadedDocs.widgetDataMap = {
            "flxDocContent": "flxDocContent",
            "flxDocumentName": "flxDocumentName",
            "flxExportLCUploadDocPopup": "flxExportLCUploadDocPopup",
            "flxMain": "flxMain",
            "flxPDFImage": "flxPDFImage",
            "imgPDF": "imgPDF",
            "lblDocumentName": "lblDocumentName"
          };
          let docnames = [];
          let uploadDocs = exportLCdata.uploadedFiles.split(",");
          for (var i = 0; i < uploadDocs.length; i++) {
            docnames[i] = {
              "lblDocumentName": {
                "text": uploadDocs[i]
              },
              "template": "flxExportLCUploadDocPopup"
            };
          }
          scope.view.segUploadedDocs.setData(docnames);
          scope.view.lblDocNameValue.text = exportLCdata.documentName;
          if(swiftsAndAdvises){
            scope.view.flxSwiftMessage.setVisibility(true);
            scope.view.lblMessageTypeValue.text = swiftsAndAdvises ? swiftsAndAdvises.swiftMessageType : "NA";
            scope.view.lblDeliveredValue.text = swiftsAndAdvises ? swiftsAndAdvises.swiftMessage : "NA";
            scope.view.lblSwiftDateValue.text = swiftsAndAdvises ? applicationManager.getFormatUtilManager().getFormattedCalendarDate(swiftsAndAdvises.swiftDate, "dd/mm/yyyy") : "NA";
            scope.view.lblMessageCategoryValue.text = swiftsAndAdvises ? swiftsAndAdvises.swiftCategory : "NA";
          }
          else {
            scope.view.flxSwiftMessage.setVisibility(false);
          }
        } else {
          scope.view.flxDialogs.setVisibility(false);
          scope.view.flxLogout.setVisibility(true);
          scope.view.flxViewLCDetailsPopup.setVisibility(false);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmReviseDrawingDocUploadController",
          "method": "viewLCPopup",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    togglefrmReviseDrawingDocUploadVisibility: function(imgDiscrepancyDropdown){
      var scope = this;
      if(imgDiscrepancyDropdown.src === "arrowup_sm.png"){
      imgDiscrepancyDropdown.src = "dropdown.png";
      this.view.flxDiscrepanciesMain.setVisibility(false);
        
    }
      else{
      imgDiscrepancyDropdown.src = "arrowup_sm.png";
      this.view.flxDiscrepanciesMain.setVisibility(true);
       
}
},
    /**
     * @api : onError
     * Error thrown from catch block in component and shown on the form
     * @arg: err - object based on error
     * @return : NA
     */
    onError: function(err) {
      let errMsg = JSON.stringify(err);
      kony.ui.Alert(errMsg);
    },
  };
});