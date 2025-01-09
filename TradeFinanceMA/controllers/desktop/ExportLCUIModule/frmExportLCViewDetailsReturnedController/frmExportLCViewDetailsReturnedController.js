define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants', 'FormatUtil'], function(CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants, FormatUtil) {

  let recordData = null;
  let finalResponse = {};
  let discrepancy;
  let params = {};
  let drawingDate;
  let lcDetails = {};
  let userDiscrepancySelectionFromNavigation = {};
  let visibileContinue = false;
  return {
    //Type your controller code here 
    onNavigate: function(record) {
      if (record && record.ExportLetterOfCredit && !record.hasOwnProperty('userDiscrepancySelection')) {
        recordData = record;
        //finalResponse.lcResponse = record.ExportLetterOfCredit;
      } else if (record.hasOwnProperty('userDiscrepancySelection')) {
        userDiscrepancySelectionFromNavigation = record;
        visibileContinue = true;
        // Handling back navigation from frmReviseDrawingDocUpload (Pre filling Response to Discrepancies flex)
        discrepancy = record.userDiscrepancySelection;
        this.responsetoDescrepancy();
      }
      recordData.printCancel = record && record.hasOwnProperty('printCancel') ? record.printCancel : false;
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      //this.view.init = this.init;
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
    preShow: function() {
      var scope = this;
      this.view.txtReturnMessageToBankValue.text = "";
      this.exportLCPresenter = applicationManager.getModulesPresentationController({
        appName: 'TradeFinanceMA',
        moduleName: 'ExportLCUIModule'
      });
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter']);
      scope.view.customheadernew.forceCloseHamburger();
      scope.view.customheadernew.activateMenu("TradeFinance", "Exports");
      this.view.flxDialogs.height = kony.os.deviceInfo().screenHeight + 120 + "dp";
      this.initButtonActions();
      scope.setDataFori18n();
    },

    postShow: function() {
      if (!recordData.printCancel) {
        FormControllerUtility.showProgressBar(this.view);
        this.exportLCPresenter.getExportDrawingByIdSuccess("frmExportLCViewDetailsReturned", recordData.ExportDrawing);
      }
      this.exportLCPresenter.getExportLetterOfCredit(recordData.ExportLetterOfCredit.exportLCId, "frmExportLCViewDetailsReturned");
    },

    /**
     * @api : updateFormUI
     * Method to initiate loading values into UI
     * @arg: viewModel - response of service
     * @return : NA
     */
    updateFormUI: function(viewModel) {
      var scope = this;
      try {
        if (viewModel.isLoading === true) {
          FormControllerUtility.showProgressBar(this.view);
        } else if (viewModel.isLoading === false) {
          FormControllerUtility.hideProgressBar(this.view);
        }
        if (viewModel.getExportLetterOfCredit) {
          lcDetails = viewModel.getExportLetterOfCredit;
          finalResponse.lcResponse = viewModel.getExportLetterOfCredit.ExportLC[0];
          this.exportLCPresenter.getExportDrawingById(recordData.ExportDrawing.drawingReferenceNo, "frmExportLCViewDetailsReturned");
        }
        if (viewModel.getExportDrawing) {
          finalResponse.drawingResponse = viewModel.getExportDrawing;
          scope.view.lblSubHeader.text = kony.i18n.getLocalizedString("i18n.TradeFinance.Exports") +
            "-" +
            kony.i18n.getLocalizedString("i18n.TradeFinance.Drawing") +
            "-" +
            recordData.ExportDrawing.drawingReferenceNo;
          // Initiating function to set data in LC summery flex         
          scope.setDataInLcUI();
          drawingDate = CommonUtilities.getFrontendDateStringInUTC(finalResponse.drawingResponse.drawingCreatedDate, applicationManager.getConfigurationManager().getConfigurationValue("frontendDateFormat"));
          scope.setDataInDrawingDetailsUI();
          scope.returnByBankDiscrepancies();
          FormControllerUtility.hideProgressBar(this.view);
          scope.responsetoDescrepancy();
          if (finalResponse.drawingResponse.hasOwnProperty("discrepanciesHistory")) {
            scope.view.flxViewReturnedByBankHistory.setVisibility(true);
          } else {
            scope.view.flxViewReturnedByBankHistory.setVisibility(false);
          }
        }
      } catch (err) {
        var errorObj = {
          "level": "frmExportLCViewDetailsReturnedController",
          "method": "updateFormUI",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    initButtonActions: function() {
      var scope = this;
      try {
        scope.view.flxDrawingDetailsDropdown.cursorType = "pointer";
        scope.view.flxDrawingDetailsDropdown.onClick = scope.toggleDrawingDetailsVisibility.bind(this, this.view.imgDrawingDetailsDropdown);
        scope.view.btnContinueRevise.setEnabled(false);
        scope.view.btnContinueRevise.skin = "ICSknbtnDisablede2e9f036px";
        scope.view.btnWithoutRevise.setVisibility(false);
        scope.view.btnWithoutRevise.onClick = scope.submitPopup.bind(this);
        scope.view.btnBackResponse.onClick = scope.formNavigation.bind(this, "btnBackResponse");
        scope.view.btnContinueRevise.onClick = scope.formNavigation.bind(this, "btnContinueRevise");
        this.view.flxViewLCDetails.onClick = scope.viewLCPopup.bind(this, true);
        this.view.flxCross.onClick = scope.viewLCPopup.bind(this, false);
        this.view.flxViewReturnedByBankHistory.onClick = scope.discrepencyPopup.bind(this, true);
        this.view.flxSearchClose.onClick = scope.discrepencyPopup.bind(this, false);
        scope.view.flxVerticalEllipsisBody.onClick = scope.renderPrintAndDownload.bind(this);
                scope.view.lblVerticalEllipsis.onTouchEnd = () => {
                    if (scope.view.flxVerticalEllipsisDropdown.isVisible) {
                        scope.view.flxVerticalEllipsisDropdown.setVisibility(false);
                    }
                    else {
                        scope.view.flxVerticalEllipsisDropdown.setVisibility(true);
                    }
                };
        if (visibileContinue === true){
          scope.view.btnContinueRevise.setEnabled(true);
          scope.view.btnContinueRevise.skin = "sknBtnNormalSSPFFFFFF15Px";
        }
        else{
          scope.view.btnContinueRevise.setEnabled(false);
          scope.view.btnContinueRevise.skin = "ICSknbtnDisablede2e9f036px";
        }
      } catch (err) {
        var errorObj = {
          "level": "frmExportLCViewDetailsReturnedController",
          "method": "initButtonActions",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    toggleDrawingDetailsVisibility: function(imgDropdown) {
      var scope = this;
      try {
        if (imgDropdown.src === "arrowup_sm.png") {
          imgDropdown.src = "dropdown.png";
          scope.view.flxDrawingContent.setVisibility(false);
        } else {
          imgDropdown.src = "arrowup_sm.png";
          scope.view.flxDrawingContent.setVisibility(true);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmExportLCViewDetailsReturnedController",
          "method": "toggleDrawingDetailsVisibility",
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
        scope.view.lblExportLCReviewSubmit.text = kony.i18n.getLocalizedString("i18n.TradeFinance.Exports") + "-" + kony.i18n.getLocalizedString("i18n.TradeFinance.Drawing");
        scope.view.lblApplicant.text = kony.i18n.getLocalizedString("i18n.ExportLC.Applicant") + ":";
        scope.view.lblLCRefNo.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AdvisingLCRefNo") + ":";
        scope.view.lblLCType.text = kony.i18n.getLocalizedString("i18n.ImportLC.LCType") + ":";
        scope.view.lblIssueBank.text = kony.i18n.getLocalizedString("kony.mb.cardManage.issuingBank") + ":";
        scope.view.lblLCAmount.text = kony.i18n.getLocalizedString("i18n.ExportLC.LCAmount") + ":";
        scope.view.lblIssueDate.text = kony.i18n.getLocalizedString("i18n.TradeFinance.IssueDate") + ":";
        scope.view.lblIssueLCRefNo.text = kony.i18n.getLocalizedString("i18n.TradeFinance.IssuingLCRefNo") + ":";
        scope.view.lblLCUntilizedAmount.text = kony.i18n.getLocalizedString("i18n.TradeFinance.LCUntilizedAmount") + ":";
        scope.view.lblExpiryDate.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ExpiryDate") + ":";
        scope.view.lblDiscrepanciesandResponseValue.text = kony.i18n.getLocalizedString("i18n.TradeFinance.Discrepancies") + "-" + kony.i18n.getLocalizedString("i18n.TradeFinance.ReturnedbyBank");
      } catch (err) {
        var errorObj = {
          "level": "FormController",
          "method": "setDataFori18n",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    setDataInLcUI: function() {
      var scope = this;
      try {
        var breakpoint = kony.application.getCurrentBreakpoint();
        var orientationHandler = new OrientationHandler();

        finalResponse.lcResponse.amountFormatted = scope.formatAmount(finalResponse.lcResponse.currency, finalResponse.lcResponse.amount);
        finalResponse.lcResponse.issueDateFormatted = scope.getFormattedDate(finalResponse.lcResponse.issueDate);
        finalResponse.lcResponse.utilizedLCAmountFormatted = scope.formatAmount(finalResponse.lcResponse.currency, finalResponse.lcResponse.utilizedLCAmount);
        finalResponse.lcResponse.expiryDateFormatted = scope.getFormattedDate(finalResponse.lcResponse.expiryDate);

        if (breakpoint === 1024 ||
          orientationHandler.isTablet) {
          scope.view.flxLCSummaryTablet.setVisibility(true);
          scope.view.flxLCSummaryBody.setVisibility(false);
          scope.view.segLCSummaryContent.widgetDataMap = {
            lblReview: "lblReview",
            lblReviewValue1: "lblReviewValue1"
          };

          var lcSummaryTabData = [{
            lblReview: {
              text: kony.i18n.getLocalizedString("i18n.ExportLC.Applicant") + ":"
            },
            lblReviewValue1: {
              text: finalResponse.lcResponse.applicant
            }
          }, {
            lblReview: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.AdvisingLCRefNo") + ":"
            },
            lblReviewValue1: {
              text: finalResponse.lcResponse.exportLCId
            }
          }, {
            lblReview: {
              text: kony.i18n.getLocalizedString("i18n.ExportLC.LCAmount") + ":"
            },
            lblReviewValue1: {
              text: finalResponse.lcResponse.amountFormatted
            }
          }, {
            lblReview: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.LCUntilizedAmount") + ":"
            },
            lblReviewValue1: {
              text: finalResponse.lcResponse.utilizedLCAmount
            }
          }, {
            lblReview: {
              text: kony.i18n.getLocalizedString("i18n.ImportLC.LCType") + ":"
            },
            lblReviewValue1: {
              text: finalResponse.lcResponse.lcType
            }
          }, {
            lblReview: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.IssueDate") + ":"
            },
            lblReviewValue1: {
              text: finalResponse.lcResponse.issueDateFormatted
            }
          }, {
            lblReview: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.ExpiryDate") + ":"
            },
            lblReviewValue1: {
              text: finalResponse.lcResponse.expiryDateFormatted
            }
          }, {
            lblReview: {
              text: kony.i18n.getLocalizedString("kony.mb.cardManage.issuingBank") + ":"
            },
            lblReviewValue1: {
              text: finalResponse.lcResponse.issuingBank
            }
          }, {
            lblReview: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.IssuingLCRefNo") + ":"
            },
            lblReviewValue1: {
              text: finalResponse.lcResponse.lcReferenceNo
            }
          }];

          scope.view.segLCSummaryContent.setData(lcSummaryTabData);
        } else {
          scope.view.flxLCSummaryTablet.setVisibility(false);
          scope.view.flxLCSummaryBody.setVisibility(true);
          scope.view.lblApplicantName.text = finalResponse.lcResponse.applicant;
          scope.view.lblRightLCRefNo.text = finalResponse.lcResponse.exportLCId;
          scope.view.lblLCTypeValue.text = finalResponse.lcResponse.lcType;
          scope.view.lblIssueBankValue.text = finalResponse.lcResponse.issuingBank;
          scope.view.lblLCAmountValue.text = finalResponse.lcResponse.amountFormatted;
          scope.view.lblIssueDateValue.text = finalResponse.lcResponse.issueDateFormatted;
          scope.view.lblIssuingRefNoValue.text = finalResponse.lcResponse.lcReferenceNo;
          scope.view.lblLCUntilizedAmountValue.text = finalResponse.lcResponse.utilizedLCAmountFormatted;
          scope.view.lblExpiryDateValue.text = finalResponse.lcResponse.expiryDateFormatted;
        }
      } catch (err) {
        var errorObj = {
          "level": "frmExportLCViewDetailsReturnedController",
          "method": "setDataInLcUI",
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
  contextualItemCondition: function(id) {
      var scope = this;
      try {
          if (scope.isTablet && id == 'print') {
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
          scope.exportLCPresenter.printExportDrawing({
            drawingSummary: recordData,
            printCallback: function () {
              applicationManager.getNavigationManager().navigateTo({
                appName: 'TradeFinanceMA',
                friendlyName: 'frmExportLCViewDetailsReturned'
              }, false, {
                printCancel: true
              });
            }
          });
        } else if (id == "download") {
          scope.exportLCPresenter.generateExportDrawing({
            drawingReferenceNo: recordData.ExportDrawing.drawingReferenceNo
          }, 'frmExportLCViewDetailsReturned');
        } 
      } catch (err) {
        var errorObj = {
          "level": "frmExportLCViewDetailsReturnedController",
          "method": "onPrintAndDownloadRowClick",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : getFormattedDate
     * This function is for formatting the date
     * @arg: NA
     * @return : NA
     */
    getFormattedDate: function(dateString) {
      var scope = this;
      try {
        var date = new Date(dateString);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var formatDate = date.getDate();
        if (formatDate < 10) {
          formatDate = "0" + formatDate;
        }
        if (month < 10) {
          month = "0" + month;
        }
        return month + "/" + formatDate + "/" + year;
      } catch (err) {
        var errorObj = {
          "level": "frmExportLCViewDetailsReturnedController",
          "method": "getFormattedDate",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    formNavigation: function(widgetName) {
      var scope = this;
      try {
        var formFriendlyName;
        if (widgetName === "btnContinueRevise") {
          formFriendlyName = "frmReviseDrawingDocUpload";
          let userDiscrepancySelection = [];
          this.view.segResponseDiscrepant.data.map(function(selectedDataFromDiscrepancySeg){
            userDiscrepancySelection.push({
              "title": selectedDataFromDiscrepancySeg.lblDiscrepancyReason.text,
              "userResponse": selectedDataFromDiscrepancySeg.lblSearchHere.text,
              "userComment": selectedDataFromDiscrepancySeg.txtAreaComment.text
            });
          });
          params.userDiscrepancySelection = userDiscrepancySelection;
          params["returnMessageToBank"] = this.view.txtReturnMessageToBankValue.text;
          params.response = finalResponse;
        } else if (widgetName === "btnWithoutRevise") {
          scope.view.flxDialogs.setVisibility(false);
          scope.view.flxLogout.setVisibility(true);
          scope.view.flxMainSubmit.setVisibility(false);
          var backendPhysicalDocs = params.originalUploadedDocs;
          var backendphysicalDocs = params.originalPhysicalDocuments;
          var backendDiscrepancies = params.discrepencies;
          backendDiscrepancies = JSON.stringify(backendDiscrepancies);
          params.discrepencies = backendDiscrepancies;
          delete params.originalPhysicalDocuments;
          delete params.originalUploadedDocs;
          params.uploadedDocuments = backendPhysicalDocs;
          params.physicalDocuments = backendphysicalDocs;
          params["returnMessageToBank"] = this.view.txtReturnMessageToBankValue.text;
          JSON.stringify(params);
          this.exportLCPresenter.updateExportDrawings(params, "frmExportLCDrawingAcknowledgement");
          formFriendlyName = "frmExportLCDrawingAcknowledgement";
        } else if (widgetName === "btnBackResponse") {
          this.navigateToDrawings();
          return;
        }
        var data;
        if (widgetName === "btnWithoutRevise") {
          data = finalResponse.lcResponse;
        } else {
          data = params;
          data["lcResponse"] = finalResponse.lcResponse;
          data["lcResponse"]["SwiftsAndAdvises"] = recordData.ExportLetterOfCredit.SwiftsAndAdvises;
        }
        new kony.mvc.Navigation({
          "appName": "TradeFinanceMA",
          "friendlyName": "ExportLCUIModule" + "/" + formFriendlyName
        }).navigate(data);
      } catch (err) {
        var errorObj = {
          "level": "frmExportLCViewDetailsReturnedController",
          "method": "formNavigation",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    navigateToDrawings: function () {
      applicationManager.getNavigationManager().navigateTo({
        appName: "TradeFinanceMA",
        friendlyName: "ExportLCUIModule/frmExportLCDashboard"
      }, false, {
        flowType: 'GetAllExportDrawings'
      });
    },

    formatAmount: function(currency, amount) {
      var scope = this;
      try {
        var currCode = new FormatUtil().getCurrencySymbol(currency);
        var newLcAmount = new FormatUtil().formatAmountAndAddCurrencySymbol(amount, currCode);
        return newLcAmount;
      } catch (err) {
        var errorObj = {
          "level": "frmExportLCViewDetailsReturnedController",
          "method": "formatAmount",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    setDataInDrawingDetailsUI: function() {
      var scope = this;
      try {
        this.view.flxDrawingDetails.setVisibility(true);
        this.view.lblDrawingDetails.text = kony.i18n.getLocalizedString("i18n.ImportLC.DrawingDetails");
        this.view.lblDrawingStatusKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.DrawingStatus") + ":";
        this.view.lblDrawingStatusValue.text = recordData.ExportDrawing.status;
        this.view.lblDrawingRefKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.DrawingRefNo") + ":";
        this.view.lblDrawingRefValue.text = recordData.ExportDrawing.drawingReferenceNo;
        this.view.lblDrawingCreatedKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.DrawingCreatedDate") + ":";
        this.view.lblDrawingCreatedValue.text = recordData.ExportDrawing.drawingCreatedDateFormatted;
        this.view.lblDrawingAmountKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.DrawingAmount") + ":";
        this.view.lblDrawingAmountValue.text = recordData.ExportDrawing.drawingAmountFormatted;
        this.view.lblAmountCreditedKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.AmounttobeCreditedto") + ":";
        this.view.lblAmountCreditedValue.text = CommonUtilities.getMaskedAccName(recordData.ExportDrawing.amountToBeCreditedTo)[0];
        this.view.lblAmountCreditedValueInfo.text = "(" + kony.i18n.getLocalizedString("i18n.TradeFinance.OtherBeneficiaryName") + ")";
        this.view.lblFinanceUSKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.Financeus") + ":";
        this.view.lblFinanceUSValue.text = recordData.ExportDrawing.financeBillFormatted;
        this.view.lblFinanceUSInfo.text = "(" + kony.i18n.getLocalizedString("i18n.TradeFinance.ExportDrawingCheckContent") + ")";
        this.view.lblUploadDocsKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.UploadedDocuments") + ":";
        // Setting upload documents data into segment
        scope.view.segUploadDocuments.widgetDataMap = {
                    lblListValue: "lblListValue", 
                    "flxDropdownValue" : "flxDropdownValue"
                };
        // Processing upload documents data
        var uploadDocData = [];
        JSON.parse(recordData.ExportDrawing.uploadedDocuments).map(function (docData) {
          uploadDocData.push({
            lblListValue: docData,
            "flxDropdownValue" : {
              "hoverSkin": "slFbox",
            }
          })
        });
        // setting data into segment
        scope.view.segUploadDocuments.setData(uploadDocData);
        this.view.lblPhysicalDocDetailsKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.PhysicalDocumentDetails") + ":";
        // Setting physical documents data into segment
        this.view.segPhysicalDocuments.widgetDataMap = {
                    lblListValue: "lblListValue", 
                    "flxDropdownValue" : "flxDropdownValue"
                };
        // Processing physical documents data
        var physicalDocData = [];
        recordData.ExportDrawing.physicalDocumentsFormatted.map(function (docData) {
          physicalDocData.push({
            lblListValue: docData,
            "flxDropdownValue" : {
              "hoverSkin": "slFbox",
            }
          })
        });
        // setting data into segment
        this.view.segPhysicalDocuments.setData(physicalDocData);
        this.view.lblDiscrepanciesKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.Forwarddespiteanydiscrepancies") + ":";
        this.view.lblDiscrepanciesValue.text = recordData.ExportDrawing.forwardDocumentsFormatted;
        this.view.lblDiscrepanciesValueInfo.text = "(" + kony.i18n.getLocalizedString("i18n.TradeFinance.ExportDocumentCheckContent") + ")";
        this.view.lblChargesDebitKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ChargesDebitAccount") + ":";
        this.view.lblChargesDebitValue.text = CommonUtilities.getMaskedAccName(recordData.ExportDrawing.chargesDebitAccount)[0];
        this.view.lblMsgToBankKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.MessageToBankDrawings") + ":";
        if ('messageToBank' in recordData.ExportDrawing) {
          this.view.lblMsgToBankValue.text = recordData.ExportDrawing.messageToBank;
        } 
        else {
          this.view.lblMsgToBankValue.setVisibility(false);
          this.view.lblMsgToBankKey.setVisibility(false);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmExportLCViewDetailsReturnedController",
          "method": "setDataInDrawingDetailsUI",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    order: function(number) {
      if (number % 100 >= 11 && number % 100 <= 13)
        return number + "th";

      switch (number % 10) {
        case 1:
          return number + "st";
        case 2:
          return number + "nd";
        case 3:
          return number + "rd";
      }

      return number + "th";
    },

    returnByBankDiscrepancies: function() {
      var scope = this;
      try {
        //var disOrder = scope.order(finalResponse.drawingResponse.wholeDiscrepanciesHistory.length - 1);
       if(finalResponse.drawingResponse.hasOwnProperty("discrepanciesHistory")){
          var disOrder = scope.order(finalResponse.drawingResponse.wholeDiscrepanciesHistory.length+1);
          scope.view.lblDiscrepanciesandResponseValue.text = kony.i18n.getLocalizedString("i18n.TradeFinance.Discrepancies") + " - " + kony.i18n.getLocalizedString("i18n.TradeFinance.ReturnedbyBank") + " (" + (disOrder) + ")";
          scope.view.lblViewReturnedByBankHistory.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ViewReturnedbyBankHistory") + " (" + (finalResponse.drawingResponse.wholeDiscrepanciesHistory.length) +  ")";
          scope.view.lblResponseDiscrepancyHeader.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ResponsetoDiscrepancies") + " (" + (disOrder) + ")";
        }
        else{
          scope.view.lblResponseDiscrepancyHeader.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ResponsetoDiscrepancies") + " (1st)";
          scope.view.lblDiscrepanciesandResponseValue.text = kony.i18n.getLocalizedString("i18n.TradeFinance.Discrepancies") + " - " + kony.i18n.getLocalizedString("i18n.TradeFinance.ReturnedbyBank") + " (1st)";
        }
        scope.view.lblTotalDocumentsValue.text = finalResponse.drawingResponse.totalDocuments;
        scope.view.segDocumentsValueContainer.widgetDataMap = {
          lblHeading: "lblHeading"
        };
        // segment data
        let docMasterData = [];
        JSON.parse(finalResponse.drawingResponse.returnedDocuments).map(function (docData) {
          docMasterData.push({
            lblHeading: docData
          })
        });
        //set the data to segment
        scope.view.segDocumentsValueContainer.setData(docMasterData);
        scope.view.lblDocStatusValue.text = finalResponse.drawingResponse.documentStatus;
        scope.view.segDiscrepancyResponse.widgetDataMap = {
          lblLeft1: "lblLeft1",
          lblRight1: "lblRight1"
        };
        // segment data
        let discrepancyMasterData = finalResponse.drawingResponse.discrepanciesAndResponse;
        //set the data to segment
        scope.view.segDiscrepancyResponse.setData(discrepancyMasterData);
      } catch (err) {
        var errorObj = {
          "level": "frmExportLCViewDetailsReturnedController",
          "method": "returnByBankDiscrepancies",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    formatDiscrepancy: function() {
      var scope = this;
      try {
        discrepancy = finalResponse.drawingResponse.discrepencies;
        discrepancy = discrepancy.replace(/'/g, '"');
        discrepancy = JSON.parse(discrepancy);
      } catch (err) {
        var errorObj = {
          "level": "frmExportLCViewDetailsReturnedController",
          "method": "formatDiscrepancy",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    responsetoDescrepancy: function() {
      var scope = this;
      try {
        var breakpoint = kony.application.getCurrentBreakpoint();
        var orientationHandler = new OrientationHandler();
        if (breakpoint === 1024 || orientationHandler.isTablet) {
          scope.view.segResponseDiscrepant.rowTemplate = "flxResponseToDiscrepancyTablet";
        }
        else{
          scope.view.segResponseDiscrepant.rowTemplate = "flxResponseToDiscrepancy";
        }
        //scope.view.txtReturnMessageToBankValue.restrictCharactersSet = "~!@#$%^&*()_-\\?/+={[]}:;,.<>'`|\"";
        userDiscrepancySelectionFromNavigation.hasOwnProperty('userDiscrepancySelection') ? scope.view.txtReturnMessageToBankValue.text = userDiscrepancySelectionFromNavigation.returnMessageToBank : scope.formatDiscrepancy();
        scope.view.segResponseDiscrepant.widgetDataMap = {
          lblDiscrepancy1: "lblDiscrepancy1",
          lblDiscrepancyReason: "lblDiscrepancyReason",
          flxDropdownimg: "flxDropdownimg",
          lblAddComment: "lblAddComment",
          flxEnterComment: "flxEnterComment",
          lblEnterCommentHere: "lblEnterCommentHere",
          lblRemoveComment: "lblRemoveComment",
          flxRemoveComment: "flxRemoveComment",
          flxDropdown: "flxDropdown",
          lblSearchHere: "lblSearchHere",
          imgDropdown: "imgDropdown",
          lblAddComment: "lblAddComment",
          flxDiscrepancyExtraComment: "flxDiscrepancyExtraComment",
          flxDiscrepancyReason1: "flxDiscrepancyReason1",
          flxDiscrepancyReason2: "flxDiscrepancyReason2",
          flxDiscrepancyReason3: "flxDiscrepancyReason3",
          lblDiscrepancyReason1: "lblDiscrepancyReason1",
          lblDiscrepancyReason2: "lblDiscrepancyReason2",
          lblDiscrepancyReason3: "lblDiscrepancyReason3",
          txtAreaComment: "txtAreaComment",
          lblSearchHere: "lblSearchHere"
        };
        var responseToDiscrepancyData = [];
        discrepancy.forEach((element, index) => {
          var key = Object.keys(element)[0];
          responseToDiscrepancyData.push({
            lblDiscrepancy1: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.Discrepancy" + (index + 1)) + ":"
            },
            lblDiscrepancyReason: {
              text: userDiscrepancySelectionFromNavigation.hasOwnProperty('userDiscrepancySelection') ? element.title : key
            },
            imgDropdown: {
              src: "dropdown.png"
            },
            flxEnterComment: {
              isVisible: userDiscrepancySelectionFromNavigation.hasOwnProperty('userDiscrepancySelection') && element.userComment.length > 0 ? true : false
            },
            flxRemoveComment: {
              isVisible: false
            },
            flxDropdown: {
              isVisible: false
            },
            flxDropdownimg: {
              onClick: scope.segResponseDiscrepancyOnClick.bind(this, "flxDropdownimg")
            },
            flxDiscrepancyExtraComment: {
              onClick: scope.segResponseDiscrepancyOnClick.bind(this, "flxDiscrepancyExtraComment")
            },
            flxRemoveComment: {
              onClick: scope.segResponseDiscrepancyOnClick.bind(this, "flxRemoveComment")
            },
            lblDiscrepancyReason1: {
              text: "I Accept this discrepancy, I will submit a revised document"
            },
            lblDiscrepancyReason2: {
              text: "I Accept this discrepancy, Please proceed with the existing document "
            },
            lblDiscrepancyReason3: {
              text: "I Reject this discrepancy, I will not submit any document"
            },
            txtAreaComment: {
              text: userDiscrepancySelectionFromNavigation.hasOwnProperty('userDiscrepancySelection') ? element.userComment : "",
              onKeyUp: scope.usercommentUpdate.bind(this)
            },
            lblSearchHere: {
              text: userDiscrepancySelectionFromNavigation.hasOwnProperty('userDiscrepancySelection') ? element.userResponse : kony.i18n.getLocalizedString("i18n.common.selecthere")
            },
            flxDiscrepancyReason1: {
              isVisible: true
            },
            flxDiscrepancyReason2: {
              isVisible: true
            },
            flxDiscrepancyReason3: {
              isVisible: true
            },
          })
        })

        scope.view.segResponseDiscrepant.setData(responseToDiscrepancyData);
      } catch (err) {
        var errorObj = {
          "level": "frmExportLCViewDetailsReturnedController",
          "method": "responsetoDescrepancy",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    segResponseDiscrepancyOnClick: function(widgetName) {
      var scope = this;
      try {
        var data = scope.view.segResponseDiscrepant.data;
        var index = scope.view.segResponseDiscrepant.selectedRowIndex;
        var sectionIndex = index[0];
        var rowIndex = index[1];
        if (widgetName === "flxDropdownimg") {
          if (data[rowIndex].flxDropdown.isVisible === false) {
            data[rowIndex].imgDropdown.src = "arrowup_sm.png";
            data[rowIndex].flxDropdown.isVisible = true;
          } else {
            data[rowIndex].imgDropdown.src = "dropdown.png";
            data[rowIndex].flxDropdown.isVisible = false;
          }
        } else if (widgetName === "flxDiscrepancyExtraComment") {
          if (data[rowIndex].flxEnterComment.isVisible === false) {
            data[rowIndex].flxEnterComment.isVisible = true;
            data[rowIndex].flxRemoveComment.isVisible = true;
            data[rowIndex].imgDropdown.src = "dropdown.png";
            data[rowIndex].flxDropdown.isVisible = false;
          } else {
            data[rowIndex].flxEnterComment.isVisible = false;
            data[rowIndex].flxRemoveComment.isVisible = false;
          }
        } else if (widgetName === "flxRemoveComment") {
          data[rowIndex].flxEnterComment.isVisible = false;
          data[rowIndex].txtAreaComment.text = "";
          scope.usercommentUpdate();
          data[rowIndex].flxRemoveComment.isVisible = false;
        } else if (widgetName === "txtAreaComment") {
          scope.discrepancyReasonLblUpdate.bind(this, data[rowIndex].txtAreaComment);
        }

        data[rowIndex].flxDiscrepancyReason1.onClick = scope.discrepancyReasonLblUpdate.bind(this, data[rowIndex].lblDiscrepancyReason1, "userResponse");
        data[rowIndex].flxDiscrepancyReason2.onClick = scope.discrepancyReasonLblUpdate.bind(this, data[rowIndex].lblDiscrepancyReason2, "userResponse");
        data[rowIndex].flxDiscrepancyReason3.onClick = scope.discrepancyReasonLblUpdate.bind(this, data[rowIndex].lblDiscrepancyReason3, "userResponse");

        scope.view.segResponseDiscrepant.setData(data, rowIndex);

      } catch (err) {
        var errorObj = {
          "level": "frmExportLCViewDetailsReturnedController",
          "method": "segResponseDiscrepancyOnClick",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    discrepancyReasonLblUpdate: function(discReasonText, UserAction) {
      var scope = this;
      try {
        var submitWithoutRevise = false;
        var data = scope.view.segResponseDiscrepant.data;
        var index = scope.view.segResponseDiscrepant.selectedRowIndex;
        var sectionIndex = index[0];
        var rowIndex = index[1];
        if (UserAction === "userResponse") {
          data[rowIndex].lblSearchHere.text = discReasonText.text;
          data[rowIndex].imgDropdown.src = "dropdown.png";
          data[rowIndex].flxDropdown.isVisible = false;
          var withoutReviseReason = 0;
          for (var z = 0; z < data.length; z++) {
            if (data[z].lblSearchHere.text === data[z].lblDiscrepancyReason3.text) {
              withoutReviseReason++;
            } else if (data[z].lblSearchHere.text !== "Select here") {
              submitWithoutRevise = true;
            }
          }
          if (withoutReviseReason > 0) {
            if (withoutReviseReason === data.length || submitWithoutRevise === true) {
              scope.view.btnWithoutRevise.setVisibility(true);
            }
          } else {
            scope.view.btnWithoutRevise.setVisibility(false);
          }
        }
        var selectDiscrepancyReason = 0;
        var userResponse = [];
        var userComment = [];
        var key;
        for (var i = 0; i < data.length; i++) {
          if (data[i].lblSearchHere.text !== "Select here") {
            selectDiscrepancyReason++;
          }
          userResponse.push(data[i].lblSearchHere.text);
          userComment.push(data[i].txtAreaComment.text);
        }
        discrepancy.forEach((element, index) => {
          key = Object.keys(element)[0];
          element[key].userComment = userComment[index];
          element[key].userResponse = userResponse[index];
        });
        if (selectDiscrepancyReason === data.length) {
          scope.continueReviseBtn(true);
        } else {
          scope.continueReviseBtn(false);
        }
        scope.view.segResponseDiscrepant.setData(data, rowIndex);
        scope.updateParams(discrepancy);
      } catch (err) {
        var errorObj = {
          "level": "frmExportLCViewDetailsReturnedController",
          "method": "discrepancyReasonLblUpdate",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    submitWithoutReviseVisibility: function(btnVisibility) {
      var scope = this;
      try {
        if (btnVisibility === true) {
          scope.view.btnWithoutRevise.setEnabled(true);
          scope.view.btnWithoutRevise.setVisibility(true);
        } else {
          scope.view.btnWithoutRevise.setEnabled(false);
          scope.view.btnWithoutRevise.setVisibility(false);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmExportLCViewDetailsReturnedController",
          "method": "submitWithoutReviseVisibility",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    continueReviseBtn: function(visibility) {
      var scope = this;
      try {
        if (visibility === true) {
          scope.view.btnContinueRevise.setEnabled(true);
          scope.view.btnContinueRevise.skin = "sknBtnNormalSSPFFFFFF15Px";
        } else {
          scope.view.btnContinueRevise.setEnabled(false);
          scope.view.btnContinueRevise.skin = "ICSknbtnDisablede2e9f036px";
        }
      } catch (err) {
        var errorObj = {
          "level": "frmExportLCViewDetailsReturnedController",
          "method": "continueReviseBtn",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    usercommentUpdate: function() {
      var scope = this;
      try {
        var data = scope.view.segResponseDiscrepant.data;
        var userComment = [];
        for (i = 0; i < data.length; i++) {
          userComment.push(data[i].txtAreaComment.text);
        }
        var key;
        discrepancy.forEach((element, index) => {
          key = Object.keys(element)[0];
          element[key].userComment = userComment[index];
        });
        scope.updateParams(discrepancy);
      } catch (err) {
        var errorObj = {
          "level": "frmExportLCViewDetailsReturnedController",
          "method": "usercommentUpdate",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    updateParams: function(discrepancyData) {
      var scope = this;
      try {
        finalResponse.drawingResponse.discrepencies = discrepancyData;
        params = finalResponse.drawingResponse;
        if (finalResponse.drawingResponse.hasOwnProperty("httpresponse")) {
          delete params.httpresponse;
          delete params.httpStatusCode;
          delete params.opstatus;
        }
      } catch (err) {
        var errorObj = {
          "level": "frmExportLCViewDetailsReturnedController",
          "method": "updateParams",
          "error": err
        };
      }
    },

    submitPopup: function() {
      var scope = this;
      scope.view.flxDialogs.setVisibility(true);
      scope.view.flxLogout.setVisibility(false);
      scope.view.flxMainSubmit.setVisibility(true);
      scope.view.btnYes.onClick = scope.formNavigation.bind(this, "btnWithoutRevise");
      scope.view.btnNo.onClick = function() {
        scope.view.flxDialogs.setVisibility(false);
        scope.view.flxLogout.setVisibility(true);
        scope.view.flxMainSubmit.setVisibility(false);
      }
      scope.view.flxSearch01.onTouchEnd = function() {
        scope.view.flxDialogs.setVisibility(false);
        scope.view.flxLogout.setVisibility(true);
        scope.view.flxMainSubmit.setVisibility(false);
      }
    },


    viewLCPopup: function(visibility) {
      var scope = this;
      try {
        if (visibility === true) {
          this.view.lblLCTypeKey.text = kony.i18n.getLocalizedString("i18n.ImportLC.LCType") + ":";
          this.view.lblLCRefNoKey.text = kony.i18n.getLocalizedString("i18n.ExportLC.LCReferenceNumber") + ":";
          this.view.lblApplicantKey.text = kony.i18n.getLocalizedString("i18n.ExportLC.Applicant") + ":";
          this.view.lblExpireDateKey.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ExpiryDate") + ":";
          scope.view.flxDialogs.setVisibility(true);
          scope.view.flxLogout.setVisibility(false);
          scope.view.flxViewLCDetailsPopup.setVisibility(true);
          scope.view.flxGoodShipmentBody.setVisibility(true);
          scope.view.flxLCDetails.setVisibility(true);
          scope.view.flxLCDetailsData.setVisibility(true);
          let exportLCdata = recordData.ExportLetterOfCredit;
          let swiftsAndAdvises = (lcDetails.SwiftsAndAdvises) ? lcDetails.SwiftsAndAdvises[0] : "";
          //Assigning LC Details
          scope.view.lblLCDetailsHeader.text = "Export LC - " + exportLCdata.exportLCId;
          scope.view.lblLCTypeeValue.text = exportLCdata.lcType;
          scope.view.lblLCRefNoValue.text = exportLCdata.exportLCId;
          scope.view.lblLCApplicantValue.text = exportLCdata.applicant;
          scope.view.lblLCApplicantAddValue.text = exportLCdata.applicantaddress;
          scope.view.lblLCIssueBankalue.text = exportLCdata.issuingBank;
          scope.view.lblLCIssueBankAddValue.text = exportLCdata.issuingbankaddress;
          scope.view.lblLCIssueDateValue.text = exportLCdata.issueDateFormatted;
          scope.view.lblLCExpireDateValue.text = exportLCdata.expiryDateFormatted;
          scope.view.lblLCAmountValuee.text = applicationManager.getConfigurationManager().getCurrency(exportLCdata.currency) + " " + exportLCdata.amount;
          //Assigning Beneficiary Details
          scope.view.lblBenNameValue.text = exportLCdata.beneficiaryName;
          scope.view.lblBenAddValue.text = exportLCdata.beneficiaryAddress;
          scope.view.lblDescriptionValue.text = exportLCdata.goodsDescription;
          scope.view.lblAddValue.text = exportLCdata.additionalConditions;
          scope.view.lblConfirmValue.text = exportLCdata.confirmInstructions;
          scope.view.lblShipmentValue.text = exportLCdata.latestShipmentDateFormatted;
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
          "level": "frmExportLCViewDetailsReturnedController",
          "method": "viewLCPopup",
          "error": err
        };
        scope.onError(errorObj);
      }
    },


    discrepencyPopup: function(visibility) {
      var scope = this;
      try {
        if (visibility === true) {
          scope.view.flxDialogs.setVisibility(true);
          scope.view.flxLogout.setVisibility(false);
          scope.view.flxMainReturnBankPopup.setVisibility(true);
          const userObj = applicationManager.getUserPreferencesManager().getUserObj();
          scope.view.lblReturnByBank.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ReturnedbyBank") + " (" + (finalResponse.drawingResponse.wholeDiscrepanciesHistory.length + 1) + ")";
          scope.view.segReturnByBank01.widgetDataMap = {
            lblReturnBank: "lblReturnBank",
            lblReturnDate: "lblReturnDate",
            lblReasonReturn: "lblReasonReturn",
            lblRightValue: "lblRightValue",
            lblReasonReturn02: "lblReasonReturn02",
            lblRightValue02: "lblRightValue02",
            lblReasonReturn03: "lblReasonReturn03",
            lblRightValue03: "lblRightValue03"
          };
          var data = finalResponse.drawingResponse.wholeDiscrepanciesHistory;
          var discrepenciesHistoryData = [];
          var discHistoryOrder = (data.length) + 1;
          for (var i = 0; i < data.length; i++) {
            discHistoryOrder--;
            discrepenciesHistoryData.push({
              lblReturnBank: {
                text: kony.i18n.getLocalizedString("i18n.TradeFinance.ReturnedbyBank") + " (" + scope.order(discHistoryOrder) + ")"
              },
              lblReturnDate: {
                text: scope.getFormattedDate(data[i].returnedDate)
              },
              lblReasonReturn: {
                text: kony.i18n.getLocalizedString("i18n.TradeFinance.ReasonforReturn") + ":"
              },
              lblRightValue: {
                text: data[i].reasonForReturn
              },
              lblReasonReturn02: {
                text: kony.i18n.getLocalizedString("i18n.TradeFinance.ReturnMessagetoBank") + ":"
              },
              lblRightValue02: {
                text: data[i].messageToBank ? data[i].messageToBank : "NA"
              },
              lblReasonReturn03: {
                text: kony.i18n.getLocalizedString("i18n.TradeFinance.CorporateUserName") + ":"
              },
              lblRightValue03: {
                text: userObj.userfirstname + ' ' + userObj.userlastname
              }
            })
          }

          scope.view.segReturnByBank01.setData(discrepenciesHistoryData);
        } else {
          scope.view.flxDialogs.setVisibility(false);
          scope.view.flxLogout.setVisibility(true);
          scope.view.flxMainReturnBankPopup.setVisibility(false);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmExportLCViewDetailsReturnedController",
          "method": "discrepencyPopup",
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