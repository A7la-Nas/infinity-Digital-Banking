define(["FormControllerUtility", "CommonUtilities", "OLBConstants"], function (FormControllerUtility, CommonUtilities, OLBConstants) {
  const responsiveUtils = new ResponsiveUtils();
  const NA = kony.i18n.getLocalizedString("i18n.common.NA");
  let claimData = {}, guaranteeData = {};
  let sectionIndex, rowIndex, formatUtilManager;
  let isTablet = false;
  return {
    /**
     * Sets the initial actions for form
     */
    init: function () {
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      this.view.onDeviceBack = function () { };
      this.view.onBreakpointChange = this.onBreakpointChange;
      this.initFormActions();
    },
    /**
     * @api : onBreakpointChange
     * This function for changing the UI depending upon breakpoint
     * @return : NA
     */
    onBreakpointChange: function (form, width) {
      FormControllerUtility.setupFormOnTouchEnd(width);
      var currentBreakpoint = kony.application.getCurrentBreakpoint();
      responsiveUtils.onOrientationChange(this.onBreakpointChange);
      this.view.customheadernew.onBreakpointChangeComponent(width);
      this.view.customfooternew.onBreakpointChangeComponent(width);
      if (currentBreakpoint > 640 && currentBreakpoint <= 1024) {
        isTablet = true;
      } else if (kony.application.getCurrentBreakpoint() === 1366 || kony.application.getCurrentBreakpoint() === 1380) {
        isTablet = false;
      }
    },
    /**
     * Performs the actions required before rendering form
     */
    preShow: function () {
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ["flxHeader", "flxFooter",]);
      this.view.customheadernew.forceCloseHamburger();
      this.view.customheadernew.activateMenu("TradeFinance", "GuaranteesReceived");
      this.presenter.reviseClaimData = (this.presenter.reviseClaimData.isRevise) ? JSON.parse(JSON.stringify(this.presenter.reviseClaimData)) : JSON.parse(JSON.stringify(this.presenter.claimData));
      claimData = JSON.parse(JSON.stringify(this.presenter.claimData));
      guaranteeData = JSON.parse(JSON.stringify(this.presenter.guaranteeData));
      this.view.lblDiscrepancy.text = `${kony.i18n.getLocalizedString("i18n.TradeFinance.discrepanciesReturnedByBank")} (1st)`;
      if (!this.presenter.reviseClaimData.isRevise) {
        this.populateSegments();
        this.view.txtMessageToBank.text = ""
      };
    },
    /**
     * Performs the actions required after rendering form
     */
    postShow: function () {
      this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
      applicationManager.getNavigationManager().applyUpdates(this);
      this.view.flxSuccessMessage.setVisibility(false);
      this.view.flxErrorMessage.setVisibility(false);
      this.view.flxGuaranteeDetailsPopup.setVisibility(false);
      this.view.GuaranteeReceivedDetails.setContext(guaranteeData);
      this.view.flxVerticalEllipsisDropdown.setVisibility(false);
    },
    /**
     * Method to initialise form actions
     */
    initFormActions: function () {
      const scope = this;
      this.presenter = applicationManager.getModulesPresentationController({
        appName: 'TradeFinanceMA',
        moduleName: 'GuaranteesReceivedUIModule'
      });
      formatUtilManager = applicationManager.getFormatUtilManager();
      this.view.lblMessageToBank.text = kony.i18n.getLocalizedString("i18n.TradeFinance.ReturnMessagetoBank(Optional)");
      this.view.lblViewGuaranteeDetails.cursorType = "pointer";
      this.view.flxErrorClose.onClick = () => scope.view.flxErrorMessage.setVisibility(false);
      this.view.flxSuccessClose.onClick = () => scope.view.flxSuccessMessage.setVisibility(false);
      this.view.lblClaimIcon.onTouchEnd = this.toggleDropdown.bind(this, 'flxClaimDetailsContainer', 'lblClaimIcon');
      this.view.lblDiscrepancyIcon.onTouchEnd = this.toggleDropdown.bind(this, 'flxSegDiscrepancy', 'lblDiscrepancyIcon');
      this.view.lblDocStatusIcon.onTouchEnd = this.toggleDropdown.bind(this, 'flxDocDetails', 'lblDocStatusIcon');
      this.view.lblPaymentDetailsIcon.onTouchEnd = this.toggleDropdown.bind(this, 'flxPaymentDetails', 'lblPaymentDetailsIcon');
      this.view.lblResponseDiscrepancyHeaderIcon.onTouchEad = this.toggleDropdown.bind(this, 'flxResponseDetails', 'lblResponseDiscrepancyHeaderIcon');
      this.view.btnContinueToRevise.onClick = () => {
        const formData = scope.getFormData();
        scope.presenter.reviseClaimData = Object.assign(scope.presenter.reviseClaimData, formData, {
          'isRevise': true
        });
        scope.presenter.showView({
          form: 'frmReviseClaim'
        });
      };
      this.view.btnSubmitWithoutRevise.onClick = this.togglePopup.bind(this, true);
      this.view.Popup.flxCross.onClick = this.togglePopup.bind(this, false);
      this.view.btnBackRevise.onClick = () => {
        scope.presenter.showGuaranteesReceivedScreen({
          context: 'viewAllInitiatedClaims'
        });
      }
      this.view.btnBack.onClick = () => {
        scope.presenter.showGuaranteesReceivedScreen({
          context: 'viewAllInitiatedClaims'
        });
      }
      this.view.lblVerticalEllipsis.onTouchEnd = () => {
        if(scope.view.flxVerticalEllipsisDropdown.isVisible) {
            scope.view.flxVerticalEllipsisDropdown.setVisibility(false);
        }
        else {
            scope.view.flxVerticalEllipsisDropdown.setVisibility(true);
        }
      };
      this.view.flxVerticalEllipsisBody.onClick = scope.renderPrintAndDownload.bind(this);
      this.view.lblCross.onTouchEnd = () => scope.view.flxReturnedHistory.setVisibility(false)
      this.view.lblViewGuaranteeDetails.onTouchEnd = () => scope.view.flxGuaranteeDetailsPopup.setVisibility(true)
      this.view.lblViewHistory.onTouchEnd = () => scope.view.flxReturnedHistory.setVisibility(true)
      this.view.flxGuaranteeDetailsClose.onClick = () => scope.view.flxGuaranteeDetailsPopup.setVisibility(false)
      this.view.flxMainContainer.onClick = scope.toggleSegment.bind(this);
      this.view.flxFormContent.onClick = scope.toggleSegment.bind(this);
      this.view.flxSwiftMessageClose.onClick = scope.closePopup.bind(this, "flxSwiftMessagePopup");
      this.view.flxPaymentAdviceClose.onClick = scope.closePopup.bind(this, "flxPaymentAdvicePopup");
      this.view.segSwiftAndAdvicesInfo.onRowClick = this.showSwiftAndAdvices;
      this.view.flxSwiftAndAdvices.onClick = () => scope.view.flxSwiftAndAdvicesInfo.setVisibility(!scope.view.flxSwiftAndAdvicesInfo.isVisible);
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
          if (claimData.status.toLowerCase() === (OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.PROCESSING_WITH_BANK).toLowerCase()) {
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
    onPrintAndDownloadRowClick: function (id) {
      var scope = this;
      try {
        scope.view.flxVerticalEllipsisDropdown.setVisibility(false);
        if (id == 'print') {
          scope.presenter.showGuaranteesReceivedScreen({
            context: 'printClaim',
            form: scope.view.id,
            data: Object.assign(claimData, {
              'guaranteeSrmsId': guaranteeData.guaranteeSrmsId
            })
          });
        } else if (id == "download") {
          scope.presenter.generateGuaranteesReceivedClaims(claimData);
        } else if (id == 'raiseQuery') {
          let record = claimData;
          let queryObj = {};
          queryObj.subject = `${kony.i18n.getLocalizedString("i18n.TradeFinance.queryTradeFinance")} - ${record.claimsSRMSId}`;
          queryObj.descriptionObj = {};
          record.guaranteesReferenceNo && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.TransactionRef")] = record.guaranteesReferenceNo);
          record.createdOn && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.ReceivedOn")] = record.createdOn);
          record.claimAmount && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.konybb.Common.Amount")] = record.claimAmount);
          record.expiryDate && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.ImportLC.ExpiryDate")] = record.expiryDate);
          record.beneficiaryName && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.ApplicantParty")] = record.beneficiaryName);
          queryObj.tradeModule = true;
          scope.presenter.showMessagesScreen(queryObj);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmViewClaimDetailsController",
          "method": "onPrintAndDownloadRowClick",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    togglePopup: function (visibility) {
      const scope = this;
      if (visibility) {
        this.view.Popup.btnYes.text = kony.i18n.getLocalizedString("i18n.common.yes");
        this.view.Popup.btnNo.text = kony.i18n.getLocalizedString("i18n.common.no");
        this.view.Popup.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.TradeFinance.areYouSureYouWantToSubmitThisWithoutReviseTheClaim");
        this.view.Popup.btnYes.toolTip = this.view.Popup.btnYes.text;
        this.view.Popup.btnNo.toolTip = this.view.Popup.btnNo.text;
        this.view.Popup.lblHeading.text = kony.i18n.getLocalizedString("i18n.TradeFinance.submitWithoutReviseClaim");
        this.view.Popup.btnYes.onClick = () => {
          const formData = scope.getFormData();
          scope.presenter.reviseClaimData = Object.assign(scope.presenter.reviseClaimData, formData, {
            'isRevise': true
          });
          scope.togglePopup(false);
          scope.presenter.updateGuaranteeClaim('frmCreateClaimAck');
        };
        this.view.Popup.btnNo.onClick = this.togglePopup.bind(this, false);
      }
      this.view.flxDialogs.setVisibility(visibility);
      this.view.flxPopup.setVisibility(visibility);
      this.view.forceLayout();
    },
    toggleTextArea: function (txtRef, lblRef) {
      if (this.view[txtRef].isVisible) {
        this.view[txtRef].setVisibility(false);
        this.view[lblRef].text = kony.i18n.getLocalizedString('i18n.TradeFinance.AddComment(Optional)')
      } else {
        this.view[txtRef].setVisibility(true);
        this.view[lblRef].text = kony.i18n.getLocalizedString('i18n.TradeFinance.RemoveComment');
      }
    },
    toggleDropdown: function (flxRef, lblRef) {
      if (this.view[flxRef].isVisible) {
        this.view[flxRef].setVisibility(false);
        this.view[lblRef].text = "O";
      } else {
        this.view[flxRef].setVisibility(true);
        this.view[lblRef].text = "P";
      }
    },
    toggleSectionHeader: function (params) {
      this.view.GuaranteeReceivedDetails.toggleSectionHeader(params);
    },

    /**
     * @api :toggleSegment
     * Will help to toggle the segment
     * @return : NA
    */
    toggleSegment: function () {
      var scope = this;
      try {
        if (!kony.sdk.isNullOrUndefined(rowIndex)) {
          let rowData = this.view.segDiscrepancyResponses.data[rowIndex];
          if (rowData.flxDropdown.isVisible) {
            rowData.imgDropdown.src = "dropdown.png";
            rowData.flxDropdown.isVisible = false;
          }
          this.view.segDiscrepancyResponses.setDataAt(rowData, rowIndex);
        }
      } catch (err) {
        var errorObj = {
          "method": "toggleSegment",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * Entry point method for the form controller
     * @param {Object} viewModel - it contains the set of view properties and keys.
     */
    updateFormUI: function (viewModel) {
      if (viewModel.isLoading === true) {
        FormControllerUtility.showProgressBar(this.view);
      } else if (viewModel.isLoading === false) {
        FormControllerUtility.hideProgressBar(this.view);
      }
      if (viewModel.claimsSRMSId) {
        this.showSuccessMessage();
        this.populateSegments();
      }
      if (viewModel.serverError) {
        this.showServerError(viewModel.serverError);
      }
    },
    showServerError: function (errorMsg) {
      if (errorMsg) {
        this.view.flxFormContent.setContentOffset({
          x: "0%",
          y: "0%"
        }, true);
        this.view.flxErrorMessage.setVisibility(true);
        this.view.flxSuccessMessage.setVisibility(false);
        this.view.lblErrorMessage.text = errorMsg;
        this.view.forceLayout();
      }
    },
    showSuccessMessage: function () {
      this.view.flxFormContent.setContentOffset({
        x: "0%",
        y: "0%"
      }, true);
      this.view.flxErrorMessage.setVisibility(false);
      this.view.flxSuccessMessage.setVisibility(true);
      this.view.forceLayout();
    },
    populateGuaranteeSummaryDetails: function () {
      this.view.lblValue1.text = guaranteeData.applicantName || guaranteeData.beneficiaryName || NA;
      this.view.lblValue2.text = guaranteeData.guaranteeSrmsId || guaranteeData.guaranteesSRMSId || NA;
      this.view.lblValue3.text = guaranteeData.productType || NA;
      this.view.lblValue4.text = guaranteeData.lcType || guaranteeData.guaranteeAndSBLCType || NA;
      this.view.lblValue5.text = (guaranteeData.currency && guaranteeData.amount) ? `${guaranteeData.currency} ${formatUtilManager.formatAmount(guaranteeData.amount)}` : NA;
      this.view.lblValue6.text = (guaranteeData.currency && guaranteeData.amount) ? `${guaranteeData.currency} ${formatUtilManager.formatAmount(guaranteeData.amount - (guaranteeData.utilizedAmount || 0))}` : NA;
      this.view.lblValue7.text = guaranteeData.expectedIssueDate ? formatUtilManager.getFormattedCalendarDate(guaranteeData.expectedIssueDate) : NA;
      this.view.lblValue8.text = guaranteeData.expiryType || NA;
      this.view.lblValue9.text = guaranteeData.expiryDate ? formatUtilManager.getFormattedCalendarDate(guaranteeData.expiryDate) : NA;
      this.view.lblValue10.text = guaranteeData.issuingBankName || NA;
    },
    populateSegments: function () {
      this.view.lblHeading.text = `${kony.i18n.getLocalizedString("i18n.TradeFinance.receivedGtAndSblcClaim")} - ${claimData.claimsSRMSId}`;
      this.populateClaimDetails();
      this.populateGuaranteeSummaryDetails();
      this.populateReturnedHistory();
      this.populateDiscrepancies();
      if (claimData.status.toLowerCase() === OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.RETURNED_BY_BANK.toLowerCase()) {
        this.populateDiscrepanciesResponses();
        this.view.flxResponseToDiscrepancies.setVisibility(true);
        this.view.flxDetailsActions.setVisibility(false);
      } else {
        this.view.flxResponseToDiscrepancies.setVisibility(false);
        this.view.flxDetailsActions.setVisibility(true);
        if (claimData.returnedDocuments || claimData.status.toLowerCase() === OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.CLAIM_EXTENDED.toLowerCase()) {
          this.view.flxDocStatus.setVisibility(true);
          this.view.flxDocDetails.bottom = claimData.returnedDocuments ? "20dp" : "0dp";
          claimData.returnedDocuments && this.populateDocStatusDetails();
          if (claimData.paymentStatus) {
            this.view.flxPaymentsDetails.setVisibility(true);
            this.populatePaymentDetails();
          } else {
            this.view.flxPaymentsDetails.setVisibility(false);
          }
        } else {
          this.view.flxDocStatus.setVisibility(false);
        }
      }
      this.populateSwiftAndAdvices();
      this.view.forceLayout();
    },
    populateDiscrepancies: function () {
      if (!claimData.discrepancies) {
        this.view.flxDiscrepancies.setVisibility(false);
        return
      }
      this.view.flxDiscrepancies.setVisibility(true);
      this.view.segDiscrepanciesReturnedByBank.widgetDataMap = {
        "lblKey": "lblKey",
        "lblValue": "lblValue",
        "flxMain": "flxMain"
      };
      const documents = claimData.returnedDocuments ? claimData.returnedDocuments.split(',') : [];
      let segData = [{
        lblKey: {
          text: kony.i18n.getLocalizedString('i18n.TradeFinance.totalDocumentsWithColon')
        },
        lblValue: {
          text: documents.length.toString()
        }
      }];
      for (let i = 0; i < documents.length; i++) {
        segData.push({
          lblKey: {
            text: kony.i18n.getLocalizedString('i18n.TradeFinance.documentsWithColon'),
            isVisible: i === 0
          },
          lblValue: {
            text: documents[i]
          },
          flxMain: {
            top: i === 0 ? "20dp" : "10dp"
          }
        });
      }
      segData.push({
        lblKey: {
          text: kony.i18n.getLocalizedString('i18n.TradeFinance.documentStatusWithColon')
        },
        lblValue: {
          text: claimData.documentStatus || NA
        }
      }, {
        lblKey: {
          text: kony.i18n.getLocalizedString('i18n.TradeFinance.reasonForReturnedWithColon')
        },
        lblValue: {
          text: claimData.reasonForReturn || NA
        }
      });
      let discrepancies = JSON.parse(claimData.discrepancies.replace(/'/g, '"'));
      discrepanciesLength = (discrepancies[discrepancies.length - 1].reasonForReturn) ? discrepancies.length - 1 : discrepancies.length;
      for (let i = 0; i < discrepanciesLength; i++) {
        segData.push({
          lblKey: {
            text: `${kony.i18n.getLocalizedString('i18n.TradeFinance.Discrepancy')} ${i+1}:`
          },
          lblValue: {
            text: discrepancies[i].discrepancy || NA,
            skin: "sknLblSSP42424215pxBold"
          }
        })
        if (discrepancies[i].userResponse) {
          segData.push({
            lblKey: {
              text: `D${i+1} ${kony.i18n.getLocalizedString('i18n.TradeFinance.UserResponse')}:`
            },
            lblValue: {
              text: discrepancies[i].userResponse || NA
            }
          })
        };
        if (discrepancies[i].userComment) {
          segData.push({
            lblKey: {
              text: `D${i+1} ${kony.i18n.getLocalizedString('i18n.TradeFinance.UserComment')}:`
            },
            lblValue: {
              text: discrepancies[i].userComment || NA
            }
          })
        }
      }
      this.view.segDiscrepanciesReturnedByBank.setData(segData);
      this.view.forceLayout();
    },
    populateClaimDetails: function () {
      this.view.segClaimDetails.widgetDataMap = {
        "lblKey": "lblKey",
        "lblValue": "lblValue",
        "flxMain": "flxMain"
      };
      let segData = [{
        lblKey: {
          text: kony.i18n.getLocalizedString('i18n.TradeFinance.claimStatusWithColon')
        },
        lblValue: {
          text: claimData.status || NA,
          skin: "sknLblSSP42424215pxBold"
        }
      }, {
        lblKey: {
          text: kony.i18n.getLocalizedString('i18n.TradeFinance.claimRefNoWithColon')
        },
        lblValue: {
          text: claimData.claimsSRMSId || NA
        }
      }, {
        lblKey: {
          text: kony.i18n.getLocalizedString('i18n.TradeFinance.createdOnWithColon')
        },
        lblValue: {
          text: claimData.createdOn ? formatUtilManager.getFormattedCalendarDate(claimData.createdOn) : NA
        }
      }, {
        lblKey: {
          text: kony.i18n.getLocalizedString('i18n.wealth.amountColon')
        },
        lblValue: {
          text: (claimData.claimCurrency && claimData.claimAmount) ? `${claimData.claimCurrency} ${formatUtilManager.formatAmount(claimData.claimAmount)}` : NA
        }
      }, {
        lblKey: {
          text: kony.i18n.getLocalizedString('i18n.TradeFinance.claimCreditAccountWithColon')
        },
        lblValue: {
          text: claimData.claimCreditAccount ? this.getAccountDisplayName(claimData.claimCreditAccount) : NA
        }
      }, {
        lblKey: {
          text: kony.i18n.getLocalizedString('i18n.TradeFinance.chargesDebitAccountWithColon')
        },
        lblValue: {
          text: claimData.chargesDebitAccount ? this.getAccountDisplayName(claimData.chargesDebitAccount) : NA
        }
      }, {
        lblKey: {
          text: kony.i18n.getLocalizedString('i18n.TradeFinance.demandTypeWithColon')
        },
        lblValue: {
          text: claimData.demandType || NA
        }
      }];
      if (claimData.demandType === 'Pay/Extend') {
        segData.push({
          lblKey: {
            text: kony.i18n.getLocalizedString('i18n.TradeFinance.newExtensionDateWithColon')
          },
          lblValue: {
            text: claimData.newExtensionDate || NA
          }
        });
      }
      if (claimData.documentInformation) {
        const documents = JSON.parse(claimData.documentInformation.replace(/'/g, '"'));
        for (let i = 0; i < documents.length; i++) {
          segData.push({
            lblKey: {
              text: kony.i18n.getLocalizedString('i18n.TradeFinance.uploadedDocumentsWithColon'),
              isVisible: i === 0
            },
            lblValue: {
              text: documents[i].documentName
            },
            flxMain: {
              top: i === 0 ? "20dp" : "10dp"
            }
          });
        }
      } else {
        segData.push({
          lblKey: {
            text: kony.i18n.getLocalizedString('i18n.TradeFinance.uploadedDocumentsWithColon'),
            isVisible: true
          },
          lblValue: {
            text: NA,
            isVisible: true
          }
        });
      }
      if (claimData.productType === 'Standby LC') {
        if (claimData.physicalDocuments) {
          const physicalDocuments = JSON.parse(claimData.physicalDocuments.replace(/'/g, '"'));
          for (let i = 0; i < physicalDocuments.length; i++) {
            segData.push({
              lblKey: {
                text: kony.i18n.getLocalizedString('i18n.TradeFinance.physicalDocumentDetailsWithColon'),
                isVisible: i === 0
              },
              lblValue: {
                text: `${physicalDocuments[i].documentTitle} (${physicalDocuments[i].originalsCount} ${physicalDocuments[i].originalsCount === 'Will not submit' ? '' : 'Originals'}, ${physicalDocuments[i].copiesCount} ${physicalDocuments[i].copiesCount === 'Will not submit' ? '' : 'Copies'})`
              },
              flxMain: {
                top: i === 0 ? "20dp" : "10dp"
              }
            });
          }
        } else {
          segData.push({
            lblKey: {
              text: kony.i18n.getLocalizedString('i18n.TradeFinance.physicalDocumentDetailsWithColon')
            },
            lblValue: {
              text: NA
            }
          });
        }
        segData.push({
          lblKey: {
            text: kony.i18n.getLocalizedString('i18n.TradeFinance.forwardDespiteAnyDiscrepanciesWithColon')
          },
          lblValue: {
            text: claimData.forwardDocuments === 'Unselected' ? claimData.forwardDocuments : `${claimData.forwardDocuments}\n(${kony.i18n.getLocalizedString('i18n.TradeFinance.ExportDocumentCheckContent')})`
          }
        });
      }
      segData.push({
        lblKey: {
          text: kony.i18n.getLocalizedString('i18n.TradeFinance.otherDemandDetailsWithColon')
        },
        lblValue: {
          text: claimData.otherDemandDetails || NA
        }
      }, {
        lblKey: {
          text: kony.i18n.getLocalizedString('i18n.TradeFinance.messageToBankWithColon')
        },
        lblValue: {
          text: claimData.messageToBank || NA
        }
      });
      this.view.segClaimDetails.setData(segData);
      this.view.forceLayout();
    },
    populateDiscrepanciesResponses: function () {
      const breakpoint = kony.application.getCurrentBreakpoint();
      const orientationHandler = new OrientationHandler();
      this.view.btnSubmitWithoutRevise.setVisibility(false);
      FormControllerUtility.disableButton(this.view.btnContinueToRevise);
      this.view.segDiscrepancyResponses.rowTemplate = (breakpoint === 1024 || orientationHandler.isTablet) ? "flxResponseToDiscrepancyTablet" : "flxResponseToDiscrepancy";
      const discrepancies = JSON.parse(claimData.discrepancies.replace(/'/g, '"'));
      this.view.segDiscrepancyResponses.widgetDataMap = {
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
        flxSearchHere: "flxSearchHere",
        flxDiscrepancyExtraComment: "flxDiscrepancyExtraComment",
        flxDiscrepancyReason1: "flxDiscrepancyReason1",
        flxDiscrepancyReason2: "flxDiscrepancyReason2",
        flxDiscrepancyReason3: "flxDiscrepancyReason3",
        lblDiscrepancyReason1: "lblDiscrepancyReason1",
        lblDiscrepancyReason2: "lblDiscrepancyReason2",
        lblDiscrepancyReason3: "lblDiscrepancyReason3",
        txtAreaComment: "txtAreaComment",
        lblSearchHere: "lblSearchHere",
        flxResponseToDiscrepancy: "flxResponseToDiscrepancy"
      };
      let segDiscrepancyResponsesData = [];
      discrepancies.forEach((discrepancy, idx) => {
        segDiscrepancyResponsesData.push({
          lblDiscrepancy1: {
            text: `${kony.i18n.getLocalizedString("i18n.TradeFinance.Discrepancy")} ${idx + 1}:`
          },
          lblDiscrepancyReason: {
            text: discrepancy.discrepancy
          },
          imgDropdown: {
            src: "dropdown.png"
          },
          flxEnterComment: {
            isVisible: !!discrepancy.userComment
          },
          flxRemoveComment: {
            isVisible: false
          },
          flxDropdown: {
            isVisible: false
          },
          flxResponseToDiscrepancy: {
            onClick: this.segResponseDiscrepancyOnClick.bind(this, "flxDiscrepancyExtraComment")
          },
          flxSearchHere: {
            onClick: this.segResponseDiscrepancyOnClick.bind(this, "flxDropdownimg")
          },
          flxDiscrepancyExtraComment: {
            onClick: this.segResponseDiscrepancyOnClick.bind(this, "flxDiscrepancyExtraComment")
          },
          flxRemoveComment: {
            onClick: this.segResponseDiscrepancyOnClick.bind(this, "flxRemoveComment")
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
            text: discrepancy.userComment || ""
          },
          lblSearchHere: {
            text: discrepancy.userResponse || kony.i18n.getLocalizedString("i18n.common.selecthere")
          },
          flxDiscrepancyReason1: {
            isVisible: true,
            onClick: this.userResponseUpdate.bind(this, "lblDiscrepancyReason1")
          },
          flxDiscrepancyReason2: {
            isVisible: true,
            onClick: this.userResponseUpdate.bind(this, "lblDiscrepancyReason2")
          },
          flxDiscrepancyReason3: {
            isVisible: true,
            onClick: this.userResponseUpdate.bind(this, "lblDiscrepancyReason3")
          },
        })
      })
      this.view.segDiscrepancyResponses.setData(segDiscrepancyResponsesData);
    },
    userResponseUpdate: function (lblWidget) {
      let discrepancyResponsesData = this.view.segDiscrepancyResponses.data;
      const [sectionIndex, rowIndex] = this.view.segDiscrepancyResponses.selectedRowIndex;
      discrepancyResponsesData[rowIndex].lblSearchHere.text = discrepancyResponsesData[rowIndex][lblWidget]['text'];
      discrepancyResponsesData[rowIndex].imgDropdown.src = "dropdown.png";
      discrepancyResponsesData[rowIndex].flxDropdown.isVisible = false;
      this.view.segDiscrepancyResponses.setDataAt(discrepancyResponsesData[rowIndex], rowIndex);
      let submitWithoutRevise = 0;
      let selectedDiscrepancyReason = 0;
      for (const discrepancy of discrepancyResponsesData) {
        if (discrepancy.lblSearchHere.text === discrepancy.lblDiscrepancyReason3.text) {
          submitWithoutRevise++;
        }
        if (discrepancy.lblSearchHere.text !== kony.i18n.getLocalizedString("i18n.common.selecthere")) {
          selectedDiscrepancyReason++;
        }
      }
      this.view.btnSubmitWithoutRevise.setVisibility(submitWithoutRevise > 0);
      if (selectedDiscrepancyReason === discrepancyResponsesData.length) {
        FormControllerUtility.enableButton(this.view.btnContinueToRevise);
        this.view.btnSubmitWithoutRevise.skin = "ICSknsknBtnffffffBorder0273e31pxRadius2px";
        this.view.btnSubmitWithoutRevise.setEnabled(true);
      } else {
        FormControllerUtility.disableButton(this.view.btnContinueToRevise);
        this.view.btnSubmitWithoutRevise.skin = "ICSknbtnDisablede2e9f036px";
        this.view.btnSubmitWithoutRevise.setEnabled(false);
      }
    },
    segResponseDiscrepancyOnClick: function (widgetName) {
      [sectionIndex, rowIndex] = this.view.segDiscrepancyResponses.selectedRowIndex;
      let rowData = this.view.segDiscrepancyResponses.data[rowIndex];
      if (widgetName === "flxDropdownimg") {
        let nextRowIndex = 0;
        if(rowIndex === 0) nextRowIndex = 1;
        let nextRowData = this.view.segDiscrepancyResponses.data[nextRowIndex];
        if (rowData.flxDropdown.isVisible) {
          rowData.imgDropdown.src = "dropdown.png";
          rowData.flxDropdown.isVisible = false;
        } else {
          rowData.imgDropdown.src = "arrowup_sm.png";
          rowData.flxDropdown.isVisible = true;
        }
        if(nextRowData.flxDropdown.isVisible) {
          nextRowData.imgDropdown.src = "dropdown.png";
          nextRowData.flxDropdown.isVisible = false;
          this.view.segDiscrepancyResponses.setDataAt(nextRowData, nextRowIndex);
        }
      } else if (widgetName === "flxDiscrepancyExtraComment") {
        rowData.flxEnterComment.isVisible = true;
        rowData.flxRemoveComment.isVisible = true;
        rowData.imgDropdown.src = "dropdown.png";
        rowData.flxDropdown.isVisible = false;
      } else if (widgetName === "flxRemoveComment") {
        rowData.flxEnterComment.isVisible = false;
        rowData.txtAreaComment.text = "";
        rowData.flxRemoveComment.isVisible = false;
      }
      this.view.segDiscrepancyResponses.setDataAt(rowData, rowIndex);
    },
    populatePaymentDetails: function () {
      this.view.segPaymentDetails.widgetDataMap = {
        "lblKey": "lblKey",
        "lblValue": "lblValue",
        "flxMain": "flxMain"
      };
      let segData = [{
        lblKey: {
          text: kony.i18n.getLocalizedString('i18n.TradeFinance.paymentStatusWithColon')
        },
        lblValue: {
          text: claimData.paymentStatus
        }
      }];
      if (claimData.paymentStatus == "Rejected") {
        segData.push({
          lblKey: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.rejectedDateWithColon"),
            isVisible: true
          },
          lblValue: {
            text: claimData.paymentSettledDate ? formatUtilManager.getFormattedCalendarDate(claimData.paymentSettledDate) : NA,
            isVisible: true
          }
        }, {
          lblKey: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.reasonForRejectionWithColon"),
            isVisible: true
          },
          lblValue: {
            text: claimData.reasonForReturn || NA,
            isVisible: true
          }
        });
      } else {
        if (claimData.paymentStatus == "Done") {
          segData.push({
            lblKey: {
              text: kony.i18n.getLocalizedString("i18n.TradeFinance.paymentDateWithColon"),
              isVisible: true
            },
            lblValue: {
              text: claimData.paymentSettledDate ? formatUtilManager.getFormattedCalendarDate(claimData.paymentSettledDate) : NA,
              isVisible: true
            }
          });
        }
        segData.push({
          lblKey: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.totalAmountToBePaidWithColon"),
            isVisible: true
          },
          lblValue: {
            text: (claimData.claimCurrency && claimData.claimAmount) ? `${claimData.claimCurrency} ${formatUtilManager.formatAmount(claimData.claimAmount)}` : NA,
            isVisible: true
          }
        }, {
          lblKey: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.claimCreditAccountWithColon"),
            isVisible: true
          },
          lblValue: {
            text: claimData.claimCreditAccount ? this.getAccountDisplayName(claimData.claimCreditAccount) : NA,
            isVisible: true
          }
        });
      }
      this.view.segPaymentDetails.setData(segData);
      this.view.forceLayout();
    },
    populateDocStatusDetails: function () {
      this.view.segDocDetails.widgetDataMap = {
        "lblKey": "lblKey",
        "lblValue": "lblValue",
        "flxMain": "flxMain"
      };
      let segData = [];
      if (claimData.status !== "Claim Extended") {
        const documents = claimData.returnedDocuments ? claimData.returnedDocuments.split(',') : [];
        this.view.lblDocStatus.text = kony.i18n.getLocalizedString('i18n.ImportDrawings.DocumentStatus')
        segData.push({
          lblKey: {
            text: kony.i18n.getLocalizedString('i18n.TradeFinance.totalDocumentsWithColon')
          },
          lblValue: {
            text: documents.length.toString()
          }
        });
        for (let i = 0; i < documents.length; i++) {
          segData.push({
            lblKey: {
              text: kony.i18n.getLocalizedString('i18n.TradeFinance.documentsWithColon'),
              isVisible: i === 0
            },
            lblValue: {
              text: documents[i]
            },
            flxMain: {
              top: i === 0 ? "20dp" : "10dp"
            }
          });
        }
        segData.push({
          lblKey: {
            text: kony.i18n.getLocalizedString('i18n.TradeFinance.documentStatusWithColon')
          },
          lblValue: {
            text: claimData.documentStatus || NA
          }
        });
      } else {
        this.view.lblDocStatus.text = kony.i18n.getLocalizedString('i18n.TradeFinance.extendedDetails')
        segData.push({
          lblKey: {
            text: kony.i18n.getLocalizedString('i18n.TradeFinance.applicantConsentWithColon')
          },
          lblValue: {
            text: claimData.applicantConsent || NA
          }
        }, {
          lblKey: {
            text: kony.i18n.getLocalizedString('i18n.TradeFinance.extensionApprovedDateWithColon')
          },
          lblValue: {
            text: claimData.extensionApprovedDate || NA
          }
        }, {
          lblKey: {
            text: kony.i18n.getLocalizedString('i18n.TradeFinance.newExtensionDateWithColon')
          },
          lblValue: {
            text: claimData.newExtensionDate || NA
          }
        });
      }
      segData.push({
        lblKey: {
          text: kony.i18n.getLocalizedString('i18n.TradeFinance.messageFromBankWithColon')
        },
        lblValue: {
          text: claimData.messageFromBank || NA
        }
      });
      this.view.segDocDetails.setData(segData);
      this.view.forceLayout();
    },
    getOrdinalNumeral: function (n) {
      const s = ['th', 'st', 'nd', 'rd'];
      const v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    },
    populateReturnedHistory: function () {
      if (!claimData.returnedHistory) {
        this.view.lblViewHistory.setVisibility(false);
        this.view.lblDiscrepancyIcon.setVisibility(true);
        return
      };
      let history = JSON.parse(claimData.returnedHistory.replace(/'/g, '"')).reverse();
      if (claimData.status.toLowerCase() === OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.RETURNED_BY_BANK.toLowerCase()) {
          this.view.lblViewHistory.text = `${kony.i18n.getLocalizedString("i18n.TradeFinance.ViewReturnedbyBankHistory")} (${history.length})`;
          this.view.lblDiscrepancy.text = `${kony.i18n.getLocalizedString("i18n.TradeFinance.discrepanciesReturnedByBank")} (${this.getOrdinalNumeral(history.length + 1)})`;                }
      else {
          history.shift();
          this.view.lblViewHistory.text = `${kony.i18n.getLocalizedString("i18n.TradeFinance.ViewReturnedbyBankHistory")} (${history.length})`;
          this.view.lblDiscrepancy.text =  `${kony.i18n.getLocalizedString("i18n.TradeFinance.DiscrepanciesandResponse")} (${this.getOrdinalNumeral(history.length + 1)})`
      }
      this.view.lblViewHistory.setVisibility(history.length > 0);
      this.view.lblDiscrepancyIcon.setVisibility(history.length === 0);
      this.view.lblReturnedHistory.text = `${kony.i18n.getLocalizedString("i18n.TradeFinance.ReturnbyBankHistory")} (${history.length})`;
      this.view.segReturnedHistory.widgetDataMap = {
        "flxHeader": "flxHeader",
        "lblReturnBank": "lblReturnBank",
        "lblReturnDate": "lblReturnDate",
        "flxSeparator1": "flxSeparator1",
        "flxSeparator2": "flxSeparator2",
        "lblKey1": "lblKey1",
        "lblValue1": "lblValue1",
        "lblKey2": "lblKey2",
        "lblValue2": "lblValue2",
        "lblKey3": "lblKey3",
        "lblValue3": "lblValue3",
      };
      let segReturnedHistoryData = [], i = 0;
      for (const record of history) {
        let historyObj = record.discrepancies.pop()
        segReturnedHistoryData.push({
          "flxHeader": {
            "skin": "sknflxbgf7f7f7op100Bordere3e3e3radius2pxTopBottom",
            "top": i === 0 ? "0dp" : "20dp",
            "width": "100%",
            "left": "0dp"
          },
          "flxSeparator1": {
            "isVisible": false
          },
          "flxSeparator2": {
            "isVisible": false
          },
          "lblReturnBank": {
            "text": `${kony.i18n.getLocalizedString("i18n.TradeFinance.ReturnedbyBank")} (${this.getOrdinalNumeral(history.length - i)})`,
            "left": "2.5%"
          },
          "lblReturnDate": {
            "text": record.returnedTime ? `${formatUtilManager.getFormattedCalendarDate(record.returnedTime)}, ${new Date(record.returnedTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}` : NA
          },
          "lblKey1": {
            "text": kony.i18n.getLocalizedString("i18n.TradeFinance.reasonForReturnedWithColon")
          },
          "lblValue1": {
            "text": historyObj.reasonForReturn || NA
          },
          "lblKey2": {
            "text": kony.i18n.getLocalizedString("i18n.TradeFinance.returnMessageToBankWithColon")
          },
          "lblValue2": {
            "text": historyObj.returnMessageToBank || NA
          },
          "lblKey3": {
            "text": kony.i18n.getLocalizedString("i18n.TradeFinance.corporateUserNameWithColon")
          },
          "lblValue3": {
            "text": historyObj.corporateUserName || NA
          },
          "template": "flxLGReturnedHistory"
        });
        i++
      }
      this.view.segReturnedHistory.setData(segReturnedHistoryData)
    },
    populateSwiftAndAdvices: function () {
      if (claimData.PaymentAdvices.length === 0 && claimData.SwiftMessages.length === 0) {
        this.view.flxSwiftAndAdvices.setVisibility(false);
        return;
      }
      this.view.flxSwiftAndAdvices.setVisibility(true);
      this.view.lblSwiftAndAdvices.text = `${kony.i18n.getLocalizedString("i18n.ImportLC.SwiftsAdvices")} (${claimData.SwiftMessages.length + claimData.PaymentAdvices.length})`;
      this.view.segSwiftAndAdvicesInfo.widgetDataMap = {
        "lblListValue": "lblListValue"
      };
      let segData = [];
      for (const paymentAdvice of claimData.PaymentAdvices) {
        segData.push({
          lblListValue: {
            text: `${kony.i18n.getLocalizedString("i18n.TradeFinance.PaymentAdvice")} (${formatUtilManager.getFormattedCalendarDate(paymentAdvice.paymentDate)})`,
            skin: 'sknLblSSP72727215px'
          },
          recordType: 'paymentAdvice'
        });
      }
      for (const swiftMessage of claimData.SwiftMessages) {
        segData.push({
          lblListValue: {
            text: `${kony.i18n.getLocalizedString("i18n.TradeFinance.swiftMT")} (${formatUtilManager.getFormattedCalendarDate(swiftMessage.createdDate)})`,
            skin: 'sknLblSSP72727215px'
          },
          recordType: 'swiftMessage'
        });
      }
      this.view.segSwiftAndAdvicesInfo.setData(segData);
    },
    showSwiftAndAdvices: function () {
      const index = this.view.segSwiftAndAdvicesInfo.selectedRowIndex[1];
      const rowData = this.view.segSwiftAndAdvicesInfo.data[index];
      this.view.flxSwiftAndAdvicesInfo.setVisibility(false);
      this.view.flxSwiftMessagePopup.setVisibility(false);
      this.view.flxPaymentAdvicePopup.setVisibility(false);
      if (rowData['recordType'] === 'paymentAdvice') {
        const paymentAdvice = claimData.PaymentAdvices[index];
        this.view.flxPaymentAdvicePopup.setVisibility(true);
        this.view.flxDialogs.height = "100%";
        this.view.flxDialogs.setVisibility(true);
        this.view.segPaymentAdvice.widgetDataMap = {
          "lblKey": "lblKey",
          "lblValue": "lblValue"
      };
      const segData = [{
          lblKey: kony.i18n.getLocalizedString('i18n.TradeFinance.BeneficiaryWithColon'),
          lblValue: paymentAdvice.beneficiary || NA
        }, {
          lblKey: kony.i18n.getLocalizedString('i18n.payments.paymentDateWithColon'),
          lblValue: paymentAdvice.paymentDate ? formatUtilManager.getFormattedCalendarDate(paymentAdvice.paymentDate) : NA
        }, {
          lblKey: kony.i18n.getLocalizedString('i18n.TradeFinance.creditedAmountWithColon'),
          lblValue: (paymentAdvice.currency && paymentAdvice.creditedAmount) ? `${formatUtilManager.getCurrencySymbol(paymentAdvice.currency)} ${formatUtilManager.formatAmount(paymentAdvice.creditedAmount)} ` : NA
        }, {
          lblKey: kony.i18n.getLocalizedString('i18n.TradeFinance.creditedAccountWithColon'),
          lblValue: paymentAdvice.creditedAccount ? this.getAccountDisplayName(paymentAdvice.creditedAccount) : NA
        }, {
          lblKey: kony.i18n.getLocalizedString('i18n.TradeFinance.chargesDebitedWithColon'),
          lblValue: (paymentAdvice.currency && paymentAdvice.charges) ? `${formatUtilManager.getCurrencySymbol(paymentAdvice.currency)} ${formatUtilManager.formatAmount(paymentAdvice.charges)} ` : NA
        }, {
          lblKey: kony.i18n.getLocalizedString('i18n.TradeFinance.AdvisingBankWithColon'),
          lblValue: paymentAdvice.advisingBank || NA
        }, {
          lblKey: kony.i18n.getLocalizedString('i18n.TradeFinance.claimRefNoWithColon'),
          lblValue: paymentAdvice.orderId || NA
        }];
        this.view.segPaymentAdvice.setData(segData);
      } else {
        const swiftMessage = JSON.parse(JSON.stringify(claimData.SwiftMessages[index - claimData.PaymentAdvices.length]));
        this.view.flxDialogs.setVisibility(true);
        this.view.flxSwiftMessagePopup.setVisibility(true);
        this.view.flxDialogs.height = "425%";
        this.view.segSwiftPrimaryDetails.widgetDataMap = {
          "lblSwiftDetailsKey": "lblSwiftDetailsKey"
        };
        let segSwiftPrimaryData = [{
          lblSwiftDetailsKey: `Bcode: ${swiftMessage.bCode}`
        }, {
          lblSwiftDetailsKey: `BIC: ${swiftMessage.bic}`
        }, {
          lblSwiftDetailsKey: `Transfer Date/Time: ${swiftMessage.transferDateOrTime}`
        }, {
          lblSwiftDetailsKey: `Type: ${swiftMessage.type}`
        }];
        this.view.segSwiftPrimaryDetails.setData(segSwiftPrimaryData);
        this.view.segSwiftMessage.widgetDataMap = {
          "lblSwiftDetailsKey": "lblSwiftDetailsKey",
          "lblSwiftDetailsValue": "lblSwiftDetailsValue"
        };
        ['bCode', 'bic', 'transferDateOrTime', 'type', 'createdDate', 'swiftsAndAdvicesSrmsRequestOrderID', 'orderId'].forEach(e => delete swiftMessage[e]);
        let segSwiftMessageData = [{
          lblSwiftDetailsKey: 'MESSAGE BODY',
          lblSwiftDetailsValue: '',
        }];
        for (const swiftKey in swiftMessage) {
          const swiftValue = JSON.parse(swiftMessage[swiftKey].replace(/'/g, '"'));
          segSwiftMessageData.push({
            lblSwiftDetailsKey: `${swiftValue.swiftTag}: ${swiftValue.fieldName}`,
            lblSwiftDetailsValue: swiftValue.fieldValue
          });
        }
        this.view.segSwiftMessage.setData(segSwiftMessageData);
      }
    },
    closePopup: function (popupFlexName) {
        this.view.flxDialogs.setVisibility(false);
        this.view[popupFlexName].setVisibility(false);
    },
    getAccountDisplayName: function (accId) {
      const accounts = applicationManager.getAccountManager().getInternalAccounts() || [];
      for (const account of accounts) {
        if (account.accountID === accId) return CommonUtilities.getAccountDisplayName(account);
      }
      return accId;
    },
    getFormData: function () {
      let formData = {
        'returnMessageToBank': this.view.txtMessageToBank.text
      };
      const userObj = applicationManager.getUserPreferencesManager().getUserObj();
      let discrepancy = this.view.segDiscrepancyResponses.data.reduce(function (acc, obj) {
        acc.push({
          discrepancy: obj.lblDiscrepancyReason.text,
          userResponse: obj.lblSearchHere.text,
          userComment: obj.txtAreaComment.text,
        });
        return acc;
      }, []);
      discrepancy.push({
        reasonForReturn: claimData.reasonForReturn,
        corporateUserName: [userObj.userfirstname, userObj.userlastname].join(' ').trim(),
        returnMessageToBank: formData['returnMessageToBank'] || NA
      })
      formData['discrepancies'] = JSON.stringify(discrepancy)
      return formData;
    },
    onError: function (err) {
      kony.print(JSON.stringify(err));
    }
  };
});