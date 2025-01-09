define(["FormControllerUtility", "CommonUtilities", "OLBConstants"], function (FormControllerUtility, CommonUtilities, OLBConstants) {
  const NA = kony.i18n.getLocalizedString("i18n.common.NA");
  let guaranteeData = {}, claimData = {}, contentScope, contentPopupScope, titleActionScope, formatUtilManager;
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
      this.view.formTemplate12.onError = this.onError;
      this.initFormActions();
    },
    onBreakpointChange: function (form, width) {
      responsiveUtils.onOrientationChange(this.onBreakpointChange);
      var currentBreakpoint = kony.application.getCurrentBreakpoint();
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
      guaranteeData = JSON.parse(JSON.stringify(this.presenter.guaranteeData));
      claimData = JSON.parse(JSON.stringify(this.presenter.receivedClaimData));
      contentPopupScope.setVisibility(false);
    },
    /**
     * Performs the actions required after rendering form
     */
    postShow: function () {
      applicationManager.getNavigationManager().applyUpdates(this);
      this.view.formTemplate12.pageTitle = `${kony.i18n.getLocalizedString('i18n.TradeFinance.issuedGtAndSblcClaim')} - ${claimData.claimsSRMSId}`;
      this.resetForm();
      this.populateGtAndSblcDetails();
      this.populateClaimDetails();
      this.setAccountsData();
      this.populateSwiftAndAdvices();
      this.populateReturnedHistory();
      titleActionScope.flxVerticalEllipsisDropdown.setVisibility(false);
      contentPopupScope.flxGtAndSblcDetails.GuaranteeDetails.setContext({ data: guaranteeData, showSwiftTags: false });
    },
    /**
     * Method to initialise form actions
     */
    initFormActions: function () {
      const scope = this;
      this.presenter = applicationManager.getModulesPresentationController({ appName: 'TradeFinanceMA', moduleName: 'GuaranteesUIModule' });
      contentScope = this.view.formTemplate12.flxContentTCCenter;
      contentPopupScope = this.view.formTemplate12.flxContentPopup;
      titleActionScope = this.view.formTemplate12.flxTCButtons;
      formatUtilManager = applicationManager.getFormatUtilManager();
      contentScope.lblAcceptanceOptionIcon1.onTouchEnd = this.toggleAcceptanceOption.bind(this, 1);
      contentScope.lblAcceptanceOptionIcon2.onTouchEnd = this.toggleAcceptanceOption.bind(this, 2);
      contentScope.lblAcceptanceOptionIcon3.onTouchEnd = this.toggleAcceptanceOption.bind(this, 3);
      contentScope.lblDiscrepancyAcceptanceOptionIcon1.onTouchEnd = this.toggleDiscrepancyAcceptanceOption.bind(this, 1);
      contentScope.lblDiscrepancyAcceptanceOptionIcon2.onTouchEnd = this.toggleDiscrepancyAcceptanceOption.bind(this, 2);
      contentScope.flxDebitAccountDropdown.onClick = this.toggleDropdown.bind(this, contentScope.flxDebitAccountList, contentScope.lblDebitAccountDropdown);
      contentScope.segDebitAccount.onRowClick = this.segRowClick.bind(this, contentScope.segDebitAccount, contentScope.lblSelectedDebitAccount, contentScope.flxDebitAccountList, contentScope.lblDebitAccountDropdown);
      contentScope.lblOverdraftCheckbox.onTouchEnd = this.toggleCheckbox.bind(this, contentScope.lblOverdraftCheckbox);
      contentScope.txtReasonForRejection.onEndEditing = this.enableOrDisableSubmitButton;
      contentScope.btnBack.onClick = () => scope.presenter.showGuaranteesScreen({ context: 'viewAllReceivedClaims' });
      contentScope.btnSubmit.onClick = function () {
        const formData = scope.getFormData();
        scope.presenter.receivedClaimData = Object.assign(scope.presenter.receivedClaimData, formData);
        scope.view.formTemplate12.pageTitle = kony.i18n.getLocalizedString('i18n.TradeFinance.issuedGtAndSblcClaimReview');
        contentScope.flxPaymentInstructions.setVisibility(false);
        contentScope.flxReviewPaymentInstructions.setVisibility(true);
        titleActionScope.setVisibility(false);
        scope.populatePaymentInstructions();
      };
      contentScope.btnReviewClose.onClick = this.showPopup;
      contentScope.btnReviewBack.onClick = function () {
        scope.view.formTemplate12.pageTitle = `${kony.i18n.getLocalizedString('i18n.TradeFinance.issuedGtAndSblcClaim')} - ${claimData.claimsSRMSId}`;
        contentScope.flxPaymentInstructions.setVisibility(true);
        contentScope.flxReviewPaymentInstructions.setVisibility(false);
        titleActionScope.setVisibility(true);
      };
      contentScope.btnReviewSubmit.onClick = () => scope.presenter.updateReceivedClaim('frmReceivedClaimAcknowledgement');
      contentScope.btnDetailsBack.onClick = () => scope.presenter.showGuaranteesScreen({ context: 'viewAllReceivedClaims' });
      contentScope.btnViewGtAndSblcDetails.onClick = () => {
        contentPopupScope.setVisibility(true);
        contentPopupScope.flxGtAndSblcDetailsPopup.setVisibility(true);
      };
      contentPopupScope.flxGtAndSblcDetailsClose.onClick = this.togglePopup.bind(this, 'flxGtAndSblcDetailsPopup', false);
      contentPopupScope.flxPaymentAdviceClose.onClick = this.togglePopup.bind(this, 'flxPaymentAdvicePopup', false);
      contentPopupScope.flxSwiftMessageClose.onClick = this.togglePopup.bind(this, 'flxSwiftMessagePopup', false);
      contentPopupScope.lblReturnedHistoryClose.onTouchEnd = this.togglePopup.bind(this, 'flxReturnedHistoryPopup', false);
      titleActionScope.lblSwiftAndAdvices.cursorType = "pointer";
      titleActionScope.flxSwiftAndAdvices.onClick = () => titleActionScope.flxSwiftAndAdvicesInfo.setVisibility(!titleActionScope.flxSwiftAndAdvicesInfo.isVisible);
      titleActionScope.segSwiftAndAdvicesInfo.onRowClick = this.showSwiftAndAdvices;
      titleActionScope.lblVerticalEllipsis.onTouchEnd = () => {
        if(titleActionScope.flxVerticalEllipsisDropdown.isVisible) {
          titleActionScope.flxVerticalEllipsisDropdown.setVisibility(false);
        }
        else {
          titleActionScope.flxVerticalEllipsisDropdown.setVisibility(true);
        }
      };
      titleActionScope.flxVerticalEllipsis.onClick = this.renderPrintAndDownload.bind(this);
      contentScope.flxReviewPaymentDetailsDropdown.onClick = this.togglePaymentDetails;
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
      if (viewModel.serverError) {
        this.showServerError(viewModel.serverError);
      }
    },
    renderPrintAndDownload: function () {
      var scope = this;
      try {
        titleActionScope.segVerticalDropdownEllipsis.widgetDataMap = {
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
        titleActionScope.segVerticalDropdownEllipsis.setData(masterData);
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
          if (claimData.claimStatus.toLowerCase() === (OLBConstants.CLAIMS_RECEIVED_STATUS.PROCESSING_BY_BANK).toLowerCase()) {
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
        titleActionScope.flxVerticalEllipsisDropdown.setVisibility(false);
        if (id == 'print') {
          applicationManager.getNavigationManager().navigateTo({
            appName: 'TradeFinanceMA',
            friendlyName: 'frmPrintReceivedClaims'
          });
        } else if (id == "download") {
          scope.presenter.generateReceivedClaimReport(claimData);
        } else if (id == 'raiseQuery') {
          let record = claimData;
          let queryObj = {};
          let ReceivedDate = record.receivedOn ? formatUtilManager.getFormattedCalendarDate(record.receivedOn) : NA;
          queryObj.subject = `${kony.i18n.getLocalizedString("i18n.TradeFinance.queryTradeFinance")} - ${record.claimsSRMSId}`;
          queryObj.descriptionObj = {};
          record.claimsSRMSId && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.ClaimRefNo")] = record.claimsSRMSId);
          record.claimAmount && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.claimAmount")] = record.claimAmount);
          record.receivedOn && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.ReceivedOn")] = ReceivedDate);
          record.demandType && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.demandType")] = record.demandType);
          record.expectedSettlementDate && (queryObj.descriptionObj[kony.i18n.getLocalizedString("i18n.TradeFinance.expectedSettlementDate")] = record.expectedSettlementDate);
          queryObj.tradeModule = true;
          scope.presenter.showMessagesScreen(queryObj);
        }
      } catch (err) {
        var errorObj = {
          "level": "frmInwardCollectionsViewDetailsController",
          "method": "onPrintAndDownloadRowClick",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    toggleAcceptanceOption: function (idx) {
      for (let i = 1; i <= 3; i++) {
        if (i === idx) {
          contentScope['lblAcceptanceOptionIcon' + i].text = this.presenter.resourcesConstants.fontIcons.radioSelected;
          contentScope['lblAcceptanceOptionIcon' + i].skin = this.presenter.resourcesConstants.skins.radioSelected;
        } else {
          contentScope['lblAcceptanceOptionIcon' + i].text = this.presenter.resourcesConstants.fontIcons.radioUnselected;
          contentScope['lblAcceptanceOptionIcon' + i].skin = this.presenter.resourcesConstants.skins.radioUnselected;
        }
      }
      contentScope.flxDebitAccount.setVisibility(idx === 1);
      contentScope.flxNewExtensionDate.setVisibility(idx === 2);
      contentScope.flxReasonForRejection.setVisibility(idx === 3);
      this.enableOrDisableSubmitButton();
    },
    toggleDiscrepancyAcceptanceOption: function (idx) {
      for (let i = 1; i <= 2; i++) {
        if (i === idx) {
          contentScope['lblDiscrepancyAcceptanceOptionIcon' + i].text = this.presenter.resourcesConstants.fontIcons.radioSelected;
          contentScope['lblDiscrepancyAcceptanceOptionIcon' + i].skin = this.presenter.resourcesConstants.skins.radioSelected;
        } else {
          contentScope['lblDiscrepancyAcceptanceOptionIcon' + i].text = this.presenter.resourcesConstants.fontIcons.radioUnselected;
          contentScope['lblDiscrepancyAcceptanceOptionIcon' + i].skin = this.presenter.resourcesConstants.skins.radioUnselected;
        }
      }
      contentScope.flxDebitAccount.setVisibility(idx === 1);
      contentScope.flxReasonForRejection.setVisibility(idx === 2);
      this.enableOrDisableSubmitButton();
    },
    toggleDropdown: function (flxDropdownList, lblDropdownIcon) {
      if (flxDropdownList.isVisible) {
        flxDropdownList.setVisibility(false);
        lblDropdownIcon.text = this.presenter.resourcesConstants.fontIcons.chevronDown;
      } else {
        flxDropdownList.setVisibility(true);
        lblDropdownIcon.text = this.presenter.resourcesConstants.fontIcons.chevronUp;
      }
    },
    segRowClick: function (segDropdown, lblSelectedValue, flxSegDropdown, lblDropdownIcon) {
      const data = segDropdown.selectedRowItems[0];
      lblSelectedValue.text = data.value.text;
      lblSelectedValue.toolTip = data.value.toolTip;
      lblSelectedValue.skin = "sknLblSSP15pxtrucation";
      flxSegDropdown.setVisibility(false);
      lblDropdownIcon.text = this.presenter.resourcesConstants.fontIcons.chevronDown;
      this.enableOrDisableSubmitButton();
    },
    toggleCheckbox: function (lblCheckbox) {
      if (lblCheckbox.text === this.presenter.resourcesConstants.fontIcons.checkboxUnselected) {
        lblCheckbox.text = this.presenter.resourcesConstants.fontIcons.checkboxSelected;
      } else {
        lblCheckbox.text = this.presenter.resourcesConstants.fontIcons.checkboxUnselected;
      }
    },
    resetForm: function () {
      titleActionScope.setVisibility(true);
      contentScope.segDebitAccount.selectedRowIndex = null;
      contentScope.lblSelectedDebitAccount.text = kony.i18n.getLocalizedString('i18n.common.selecthere');
      contentScope.lblSelectedDebitAccount.toolTip = "";
      contentScope.lblSelectedDebitAccount.skin = "sknLblSSP72727215px";
      contentScope.flxDebitAccountList.setVisibility(false);
      for (let i = 1; i <= 3; i++) {
        contentScope['lblAcceptanceOptionIcon' + i].text = this.presenter.resourcesConstants.fontIcons.radioUnselected;
        contentScope['lblAcceptanceOptionIcon' + i].skin = this.presenter.resourcesConstants.skins.radioUnselected;
      }
      for (let i = 1; i <= 2; i++) {
        contentScope['lblDiscrepancyAcceptanceOptionIcon' + i].text = this.presenter.resourcesConstants.fontIcons.radioUnselected;
        contentScope['lblDiscrepancyAcceptanceOptionIcon' + i].skin = this.presenter.resourcesConstants.skins.radioUnselected;
      }
      contentScope.flxDocumentDetails.setVisibility(false);
      contentScope.flxConfirmAcceptance.setVisibility(false);
      contentScope.flxDiscrepancyAcceptance.setVisibility(false);
      contentScope.flxDebitAccount.setVisibility(false);
      contentScope.flxNewExtensionDate.setVisibility(false);
      contentScope.flxReasonForRejection.setVisibility(false);
      contentScope.lblOverdraftCheckbox.text = this.presenter.resourcesConstants.fontIcons.checkboxUnselected;
      contentScope.txtReasonForRejection.text = '';
      contentScope.txtMessageToBank.text = '';
      contentScope.flxPaymentDetails.setVisibility(false);
      contentScope.flxPaymentInstructions.setVisibility(false);
      contentScope.flxReviewPaymentInstructions.setVisibility(false);
      contentScope.flxReviewPaymentDetails.setVisibility(false);
      contentScope.flxReviewActions.setVisibility(false);
      contentScope.flxDetailsActions.setVisibility(false);
      if ([OLBConstants.CLAIMS_RECEIVED_STATUS.NEW, OLBConstants.CLAIMS_RECEIVED_STATUS.RETURNED_BY_BANK, OLBConstants.CLAIMS_RECEIVED_STATUS.CLAIM_HONOURED_PENDING_CONSENT].some(s => { return s.toLowerCase() === claimData.claimStatus.toLowerCase(); })) {
        contentScope.flxPaymentInstructions.setVisibility(true);
        contentScope.flxReviewActions.setVisibility(true);
        if (claimData.claimType === 'Demand') {
          contentScope.lblPaymentInstructionsHeading.text = kony.i18n.getLocalizedString('i18n.TradeFinance.demandDetails');
          contentScope.flxConfirmAcceptance.setVisibility(true);
          contentScope.flxAcceptanceOption2.setVisibility(claimData.demandType === 'Pay/Extend');
          contentScope.lblNewExtensionDateValue.text = claimData.newExtensionDate ? formatUtilManager.getFormattedCalendarDate(claimData.newExtensionDate) : NA;
        } else {
          contentScope.lblPaymentInstructionsHeading.text = kony.i18n.getLocalizedString('i18n.TradeFinance.presentationDetails');
          contentScope.flxDocumentDetails.setVisibility(true);
          contentScope.flxDebitAccount.setVisibility(true);
          this.setDocumentDetails();
        }
        if (claimData.claimStatus.toLowerCase() === OLBConstants.CLAIMS_RECEIVED_STATUS.CLAIM_HONOURED_PENDING_CONSENT.toLowerCase()) {
          this.populatePaymentDetails();
        }
        this.enableOrDisableSubmitButton();
      } else {
        contentScope.flxReviewPaymentInstructions.setVisibility(true);
        contentScope.flxDetailsActions.setVisibility(true);
        this.populatePaymentInstructions();
      }
    },
    populateGtAndSblcDetails: function () {
      contentScope.lblValue1.text = guaranteeData.beneficiaryName || NA;
      contentScope.lblValue2.text = guaranteeData.guaranteesSRMSId || NA;
      contentScope.lblValue3.text = guaranteeData.productType || NA;
      contentScope.lblValue4.text = guaranteeData.guaranteeAndSBLCType || NA;
      contentScope.lblValue5.text = (guaranteeData.currency && guaranteeData.amount) ? `${guaranteeData.currency} ${formatUtilManager.formatAmount(guaranteeData.amount)}` : NA;
      contentScope.lblValue6.text = (guaranteeData.currency && guaranteeData.amount) ? `${guaranteeData.currency} ${formatUtilManager.formatAmount(guaranteeData.amount - (guaranteeData.utilizedAmount || 0))}` : NA;
      contentScope.lblValue7.text = guaranteeData.issueDate ? formatUtilManager.getFormattedCalendarDate(guaranteeData.issueDate) : NA;
      contentScope.lblValue8.text = guaranteeData.expiryType || NA;
      contentScope.lblValue9.text = guaranteeData.expiryDate ? formatUtilManager.getFormattedCalendarDate(guaranteeData.expiryDate) : NA;
      contentScope.lblValue10.text = claimData.advisingBank || NA;
      contentPopupScope.lblGtAndSblcDetailsHeading.text = `${kony.i18n.getLocalizedString('i18n.TradeFinance.GuaranteeAndStandbyLC')} - ${guaranteeData.guaranteesSRMSId}`;
    },
    populateClaimDetails: function () {
      contentScope.segClaimDetails.widgetDataMap = {
        "btnAction": "btnAction",
        "imgCountdown": "imgCountdown",
        "lblCountdown": "lblCountdown",
        "lblKey": "lblKey",
        "lblValue": "lblValue",
        "flxCountdown": "flxCountdown",
        "flxMain": "flxMain"
      };
      const countdown = this.presenter.getCountdownValues(claimData.receivedOn, claimData.expectedSettlementDate);
      let segData = [
        {
          lblKey: {
            text: kony.i18n.getLocalizedString('i18n.TradeFinance.claimStatusWithColon')
          },
          lblValue: {
            text: (claimData.claimStatus.toLowerCase() === OLBConstants.CLAIMS_RECEIVED_STATUS.RETURNED_BY_BANK.toLowerCase()) && (!!claimData.returnCount) ? `${claimData.claimStatus} (${parseInt(claimData.returnCount) + 1})` : claimData.claimStatus || NA,
            skin: "sknLblSSP42424215pxBold"
          },
          btnAction: {
            text: `${kony.i18n.getLocalizedString("i18n.TradeFinance.viewHistory")} (${claimData.returnCount})`,
            left: '150dp',
            isVisible: claimData.claimStatus.toLowerCase() === OLBConstants.CLAIMS_RECEIVED_STATUS.RETURNED_BY_BANK.toLowerCase() && !!claimData.discrepancyHistory,
            onClick: this.togglePopup.bind(this, 'flxReturnedHistoryPopup', true)
          }
        },
        {
          lblKey: {
            text: kony.i18n.getLocalizedString('i18n.TradeFinance.claimRefNoWithColon')
          },
          lblValue: {
            text: claimData.claimsSRMSId || NA
          }
        },
        {
          lblKey: {
            text: kony.i18n.getLocalizedString('i18n.TradeFinance.claimTypeWithColon')
          },
          lblValue: {
            text: claimData.claimType || NA
          }
        },
        {
          lblKey: {
            text: kony.i18n.getLocalizedString('i18n.wealth.amountColon')
          },
          lblValue: {
            text: (claimData.claimCurrency && claimData.claimAmount) ? `${claimData.claimCurrency} ${formatUtilManager.formatAmount(claimData.claimAmount)}` : NA
          }
        },
        {
          lblKey: {
            text: kony.i18n.getLocalizedString('i18n.TradeFinance.receivedOnWithColon')
          },
          lblValue: {
            text: claimData.receivedOn ? formatUtilManager.getFormattedCalendarDate(claimData.receivedOn) : NA
          }
        },
        {
          lblKey: {
            text: kony.i18n.getLocalizedString('i18n.TradeFinance.expectedSettlementDateWithColon')
          },
          lblValue: {
            text: claimData.expectedSettlementDate ? formatUtilManager.getFormattedCalendarDate(claimData.expectedSettlementDate) : NA
          },
          flxCountdown: {
            isVisible: !!countdown,
            left: "100dp"
          },
          imgCountdown: {
            src: countdown ? countdown.imgCountdown : ''
          },
          lblCountdown: {
            text: countdown ? countdown.lblCountdown : ''
          }
        }
      ];
      if (claimData.claimType === 'Demand') {
        segData.push(
          {
            lblKey: {
              text: kony.i18n.getLocalizedString('i18n.TradeFinance.demandTypeWithColon')
            },
            lblValue: {
              text: claimData.demandType
            }
          }
        );
        if (claimData.demandType === 'Pay/Extend') {
          segData.push(
            {
              lblKey: {
                text: kony.i18n.getLocalizedString('i18n.TradeFinance.newExtensionDateWithColon')
              },
              lblValue: {
                text: claimData.newExtensionDate ? formatUtilManager.getFormattedCalendarDate(claimData.newExtensionDate) : NA
              }
            }
          );
        }
        const documents = JSON.parse(claimData.documents.replace(/'/g, '"'));
        for (let i = 0; i < documents.length; i++) {
          segData.push(
            {
              lblKey: {
                text: kony.i18n.getLocalizedString('i18n.TradeFinance.documentsWithColon'),
                isVisible: i === 0
              },
              lblValue: {
                text: documents[i].documentName
              },
              flxMain: {
                top: i === 0 ? "20dp" : "10dp"
              }
            }
          );
        }
        if (claimData.physicalDocuments) {
          const physicalDocuments = JSON.parse(claimData.physicalDocuments.replace(/'/g, '"'));
          for (let i = 0; i < physicalDocuments.length; i++) {
            segData.push(
              {
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
              }
            );
          }
          segData.push(
            {
              lblKey: {
                text: kony.i18n.getLocalizedString('i18n.TradeFinance.forwardDespiteAnyDiscrepanciesWithColon')
              },
              lblValue: {
                text: claimData.forwardDocuments === 'Unselected' ? claimData.forwardDocuments : `${claimData.forwardDocuments}\n(${kony.i18n.getLocalizedString('i18n.TradeFinance.ExportDocumentCheckContent')})`
              }
            }
          );
        }
        segData.push(
          {
            lblKey: {
              text: kony.i18n.getLocalizedString('i18n.TradeFinance.otherDemandDetailsWithColon')
            },
            lblValue: {
              text: claimData.otherDemandDetails
            }
          }
        );
      } else {
        segData.push(
          {
            lblKey: {
              text: kony.i18n.getLocalizedString('i18n.TradeFinance.presentationDetailsWithColon')
            },
            lblValue: {
              text: claimData.presentationDetails || NA
            }
          }
        );
      }
      segData.push(
        {
          lblKey: {
            text: kony.i18n.getLocalizedString('i18n.TradeFinance.messageFromBankWithColon')
          },
          lblValue: {
            text: claimData.messageFromBank || NA
          }
        }
      );
      contentScope.segClaimDetails.setData(segData);
    },
    setDocumentDetails: function () {
      contentScope.segDocumentDetails.widgetDataMap = {
        "lblKey": "lblKey",
        "lblValue": "lblValue",
        "flxMain": "flxMain"
      };
      const documents = JSON.parse(claimData.documents.replace(/'/g, '"'));
      let segData = [
        {
          lblKey: {
            text: kony.i18n.getLocalizedString('i18n.TradeFinance.totalDocumentsWithColon')
          },
          lblValue: {
            text: documents.length.toString()
          }
        }
      ];
      for (let i = 0; i < documents.length; i++) {
        segData.push(
          {
            lblKey: {
              text: kony.i18n.getLocalizedString('i18n.TradeFinance.documentsWithColon'),
              isVisible: i === 0
            },
            lblValue: {
              text: documents[i].documentName
            },
            flxMain: {
              top: i === 0 ? "20dp" : "10dp"
            }
          }
        );
      }
      segData.push(
        {
          lblKey: {
            text: kony.i18n.getLocalizedString('i18n.TradeFinance.documentStatusWithColon')
          },
          lblValue: {
            text: claimData.documentStatus || NA,
            skin: "sknLblSSP42424215pxBold"
          }
        }
      );
      if (claimData.discrepancyDetails) {
        const discrepancies = JSON.parse(claimData.discrepancyDetails.replace(/'/g, '"'));
        for (let i = 0; i < discrepancies.length; i++) {
          segData.push({
            lblKey: {
              text: `${kony.i18n.getLocalizedString('i18n.TradeFinance.Discrepancy')} ${i + 1}:`
            },
            lblValue: {
              text: discrepancies[i] || NA
            }
          });
        }
        contentScope.flxDiscrepancyAcceptance.setVisibility(true);
      }
      contentScope.segDocumentDetails.setData(segData);
      contentScope.forceLayout();
    },
    setAccountsData: function () {
      const accountsData = applicationManager.getAccountManager().getInternalAccounts();
      contentScope.segDebitAccount.widgetDataMap = {
        lblListValue: 'value'
      };
      let segAccountData = [];
      for (const account of accountsData) {
        const accName = CommonUtilities.getAccountDisplayName(account);
        segAccountData.push({
          key: account.accountID,
          value: {
            text: accName,
            toolTip: accName
          },
          template: 'flxListDropdown'
        });
      }
      contentScope.segDebitAccount.setData(segAccountData);
      const segHeight = (segAccountData.length * 41 > 205) ? "205dp" : `${segAccountData.length * 41}dp`;
      contentScope.flxDebitAccountList.height = segHeight;
    },
    getFormData: function () {
      let formData = {
        'claimAcceptance': '',
        'discrepancyAcceptance': '',
        'debitAccount': '',
        'debitAccountFormatted': '',
        'requestedOverdraft': '',
        'reasonForRejection': contentScope.flxReasonForRejection.isVisible ? contentScope.txtReasonForRejection.text : '',
        'messageToBank': contentScope.txtMessageToBank.text
      };
      if (contentScope.flxConfirmAcceptance.isVisible) {
        formData['claimAcceptance'] = ({
          [contentScope.lblAcceptanceOptionIcon1.text]: 'Accepted to Pay',
          [contentScope.lblAcceptanceOptionIcon2.text]: 'Accepted to Extend',
          [contentScope.lblAcceptanceOptionIcon3.text]: 'Rejected'
        })[this.presenter.resourcesConstants.fontIcons.radioSelected];
      } else {
        formData['discrepancyAcceptance'] = ({
          [contentScope.lblDiscrepancyAcceptanceOptionIcon1.text]: 'Accepted',
          [contentScope.lblDiscrepancyAcceptanceOptionIcon2.text]: 'Rejected'
        })[this.presenter.resourcesConstants.fontIcons.radioSelected];
      }
      if (contentScope.flxDebitAccount.isVisible && contentScope.segDebitAccount.selectedRowIndex) {
        formData['debitAccount'] = contentScope.segDebitAccount.selectedRowItems[0].key;
        formData['debitAccountFormatted'] = contentScope.segDebitAccount.selectedRowItems[0].value.text;
        formData['requestedOverdraft'] = this.presenter.resourcesConstants.fontIcons.checkboxSelected ? 'Yes' : 'No';
      }
      return formData;
    },
    enableOrDisableSubmitButton: function () {
      const formData = this.getFormData();
      if ((contentScope.flxConfirmAcceptance.isVisible && !formData['claimAcceptance']) || (contentScope.flxDiscrepancyAcceptance.isVisible && !formData['discrepancyAcceptance']) || (contentScope.flxDebitAccount.isVisible && !formData['debitAccount']) || (contentScope.flxReasonForRejection.isVisible && !formData['reasonForRejection'])) {
        FormControllerUtility.disableButton(contentScope.btnSubmit);
      } else {
        FormControllerUtility.enableButton(contentScope.btnSubmit);
      }
    },
    populatePaymentDetails: function () {
      contentScope.flxPaymentDetails.setVisibility(true);
      contentScope.segPaymentDetails.widgetDataMap = {
        "lblKey": "lblKey",
        "lblValue": "lblValue",
        "flxMain": "flxMain"
      };
      let segData = [
        {
          lblKey: {
            text: kony.i18n.getLocalizedString('i18n.TradeFinance.paymentStatusWithColon')
          },
          lblValue: {
            text: claimData.paymentStatus || NA
          }
        },
        {
          lblKey: {
            text: kony.i18n.getLocalizedString('i18n.TradeFinance.settledDateWithColon')
          },
          lblValue: {
            text: claimData.settledDate ? formatUtilManager.getFormattedCalendarDate(claimData.settledDate) : NA
          }
        },
        {
          lblKey: {
            text: kony.i18n.getLocalizedString('i18n.TradeFinance.totalAmountToBePaidWithColon')
          },
          lblValue: {
            text: (claimData.claimCurrency && claimData.claimAmount) ? `${claimData.claimCurrency} ${formatUtilManager.formatAmount(claimData.claimAmount)}` : NA
          }
        }
      ];
      contentScope.segPaymentDetails.setData(segData);
    },
    populatePaymentInstructions: function () {
      claimData = JSON.parse(JSON.stringify(this.presenter.receivedClaimData));
      contentScope.lblReviewPaymentInstructionsHeading.text = kony.i18n.getLocalizedString(claimData.claimType === 'Demand' ? 'i18n.TradeFinance.demandDetails' : 'i18n.TradeFinance.presentationDetails');
      contentScope.segReviewPaymentInstructions.widgetDataMap = {
        "lblKey": "lblKey",
        "lblValue": "lblValue",
        "flxMain": "flxMain"
      };
      let segData = [];
      if (claimData.claimType === 'Presentation') {
        const documents = JSON.parse(claimData.documents.replace(/'/g, '"'));
        segData.push(
          {
            lblKey: {
              text: kony.i18n.getLocalizedString('i18n.TradeFinance.totalDocumentsWithColon')
            },
            lblValue: {
              text: documents.length.toString()
            }
          }
        );
        for (let i = 0; i < documents.length; i++) {
          segData.push(
            {
              lblKey: {
                text: kony.i18n.getLocalizedString('i18n.TradeFinance.documentsWithColon'),
                isVisible: i === 0
              },
              lblValue: {
                text: documents[i].documentName
              },
              flxMain: {
                top: i === 0 ? "20dp" : "10dp"
              }
            }
          );
        }
        segData.push(
          {
            lblKey: {
              text: kony.i18n.getLocalizedString('i18n.TradeFinance.documentStatusWithColon')
            },
            lblValue: {
              text: claimData.documentStatus || NA,
              skin: "sknLblSSP42424215pxBold"
            }
          }
        );
        if (claimData.discrepancyDetails) {
          const discrepancies = JSON.parse(claimData.discrepancyDetails.replace(/'/g, '"'));
          for (let i = 0; i < discrepancies.length; i++) {
            segData.push({
              lblKey: {
                text: `${kony.i18n.getLocalizedString('i18n.TradeFinance.Discrepancy')} ${i + 1}:`
              },
              lblValue: {
                text: discrepancies[i] || NA
              }
            });
          }
        }
        if (claimData.discrepancyAcceptance) {
          segData.push(
            {
              lblKey: {
                text: kony.i18n.getLocalizedString('i18n.TradeFinance.applicantAcceptanceWithColon')
              },
              lblValue: {
                text: claimData.discrepancyAcceptance,
                skin: "sknLblSSP42424215pxBold"
              }
            }
          );
        }
        if (claimData.discrepancyAcceptance === 'Rejected') {
          segData.push(
            {
              lblKey: {
                text: kony.i18n.getLocalizedString('i18n.TradeFinance.reasonForRejectionWithColon')
              },
              lblValue: {
                text: claimData.reasonForRejection || NA
              }
            }
          );
        } else {
          segData.push(
            {
              lblKey: {
                text: kony.i18n.getLocalizedString('i18n.TradeFinance.amountToDebitedFromWithColon')
              },
              lblValue: {
                text: claimData.debitAccountFormatted || this.presenter.getAccountDisplayName(claimData.debitAccount) || NA
              }
            },
            {
              lblKey: {
                text: kony.i18n.getLocalizedString('i18n.TradeFinance.requestedOverdraftWithColon')
              },
              lblValue: {
                text: claimData.requestedOverdraft || NA
              }
            }
          );
        }
      } else {
        segData.push(
          {
            lblKey: {
              text: kony.i18n.getLocalizedString('i18n.TradeFinance.applicantAcceptanceWithColon')
            },
            lblValue: {
              text: claimData.claimAcceptance,
              skin: "sknLblSSP42424215pxBold"
            }
          }
        );
        if (claimData.claimAcceptance === 'Accepted to Pay') {
          segData.push(
            {
              lblKey: {
                text: kony.i18n.getLocalizedString('i18n.TradeFinance.amountToDebitedFromWithColon')
              },
              lblValue: {
                text: claimData.debitAccountFormatted || this.presenter.getAccountDisplayName(claimData.debitAccount) || NA
              }
            },
            {
              lblKey: {
                text: kony.i18n.getLocalizedString('i18n.TradeFinance.requestedOverdraftWithColon')
              },
              lblValue: {
                text: claimData.requestedOverdraft || NA
              }
            }
          );
        } else if (claimData.claimAcceptance === 'Accepted to Extend') {
          segData.push(
            {
              lblKey: {
                text: kony.i18n.getLocalizedString('i18n.TradeFinance.newExtensionDateWithColon')
              },
              lblValue: {
                text: claimData.newExtensionDate || NA
              }
            }
          );
        } else if (claimData.claimAcceptance === 'Rejected') {
          segData.push(
            {
              lblKey: {
                text: kony.i18n.getLocalizedString('i18n.TradeFinance.reasonForRejectionWithColon')
              },
              lblValue: {
                text: claimData.reasonForRejection || NA
              }
            }
          );
        }
      }
      segData.push(
        {
          lblKey: {
            text: kony.i18n.getLocalizedString('i18n.TradeFinance.messageToBankWithColon')
          },
          lblValue: {
            text: claimData.messageToBank || NA
          }
        }
      );
      contentScope.segReviewPaymentInstructions.setData(segData);
      if ([OLBConstants.CLAIMS_RECEIVED_STATUS.REJECTED, OLBConstants.CLAIMS_RECEIVED_STATUS.CLAIM_HONOURED, OLBConstants.CLAIMS_RECEIVED_STATUS.CLAIM_HONOURED_APPLICANT_REJECTED].some(s => { return s.toLowerCase() === claimData.claimStatus.toLowerCase(); })) {
        contentScope.flxReviewPaymentDetails.setVisibility(true);
        contentScope.flxReviewPaymentDetailsContainer.setVisibility(true);
        contentScope.lblReviewPaymentDetailsDropdownIcon.text = this.presenter.resourcesConstants.fontIcons.chevronUp;
        contentScope.segReviewPaymentDetails.widgetDataMap = {
          "lblKey": "lblKey",
          "lblValue": "lblValue",
          "flxMain": "flxMain"
        };
        let segPaymentDetailsData = [{
          lblKey: {
            text: kony.i18n.getLocalizedString('i18n.TradeFinance.paymentStatusWithColon')
          },
          lblValue: {
            text: claimData.paymentStatus || NA
          }
        }];
        if (claimData.claimStatus.toLowerCase() === OLBConstants.CLAIMS_RECEIVED_STATUS.REJECTED.toLowerCase()) {
          segPaymentDetailsData.push(
            {
              lblKey: {
                text: kony.i18n.getLocalizedString('i18n.TradeFinance.rejectedDateWithColon')
              },
              lblValue: {
                text: claimData.rejectedDate ? formatUtilManager.getFormattedCalendarDate(claimData.rejectedDate) : NA
              }
            },
            {
              lblKey: {
                text: kony.i18n.getLocalizedString('i18n.TradeFinance.reasonForRejectionWithColon')
              },
              lblValue: {
                text: claimData.reasonForRejection || NA
              }
            }
          );
        } else {
          segPaymentDetailsData.push(
            {
              lblKey: {
                text: kony.i18n.getLocalizedString('i18n.TradeFinance.settledDateWithColon')
              },
              lblValue: {
                text: claimData.settledDate ? formatUtilManager.getFormattedCalendarDate(claimData.settledDate) : NA
              }
            },
            {
              lblKey: {
                text: kony.i18n.getLocalizedString('i18n.TradeFinance.totalAmountToBePaidWithColon')
              },
              lblValue: {
                text: (claimData.claimCurrency && claimData.claimAmount) ? `${claimData.claimCurrency} ${formatUtilManager.formatAmount(claimData.claimAmount)}` : NA
              }
            }
          );
        }
        if (claimData.claimStatus.toLowerCase() === OLBConstants.CLAIMS_RECEIVED_STATUS.CLAIM_HONOURED.toLowerCase()) {
          segPaymentDetailsData.push(
            {
              lblKey: {
                text: kony.i18n.getLocalizedString('i18n.TradeFinance.claimDebitAccountWithColon')
              },
              lblValue: {
                text: claimData.debitAccount ? this.presenter.getAccountDisplayName(claimData.debitAccount) : NA
              }
            }
          );
        }
        contentScope.segReviewPaymentDetails.setData(segPaymentDetailsData);
      }
    },
    showPopup: function () {
      const cancelPopupContext = {
        heading: kony.i18n.getLocalizedString('i18n.konybb.common.cancel'),
        message: kony.i18n.getLocalizedString('i18n.PayAPerson.CancelAlert'),
        yesClick: () => this.presenter.showGuaranteesScreen({ context: 'viewAllReceivedClaims' })
      };
      this.view.formTemplate12.setPopup(cancelPopupContext);
    },
    populateSwiftAndAdvices: function () {
      claimData.paymentAdvices = claimData.hasOwnProperty('paymentAdvices') ? JSON.parse(claimData.paymentAdvices.replace(/'/g, '"')) : [];
      claimData.swiftMessages = claimData.hasOwnProperty('swiftMessages') ? JSON.parse(claimData.swiftMessages.replace(/'/g, '"')) : [];
      if (claimData.paymentAdvices.length === 0 && claimData.swiftMessages.length === 0) {
        titleActionScope.flxSwiftAndAdvices.setVisibility(false);
        return;
      }
      titleActionScope.flxSwiftAndAdvices.setVisibility(true);
      titleActionScope.lblSwiftAndAdvices.text = `${kony.i18n.getLocalizedString("i18n.ImportLC.SwiftsAdvices")} (${claimData.swiftMessages.length + claimData.paymentAdvices.length})`;
      titleActionScope.segSwiftAndAdvicesInfo.widgetDataMap = {
        "lblListValue": "lblListValue"
      };
      let segData = [];
      for (const paymentAdvice of claimData.paymentAdvices) {
        segData.push({
          lblListValue: {
            text: `${kony.i18n.getLocalizedString("i18n.TradeFinance.PaymentAdvice")} (${formatUtilManager.getFormattedCalendarDate(paymentAdvice.paymentDate)})`,
            skin: 'sknLblSSP72727215px'
          },
          recordType: 'paymentAdvice'
        });
      }
      for (const swiftMessage of claimData.swiftMessages) {
        segData.push({
          lblListValue: {
            text: `${kony.i18n.getLocalizedString("i18n.TradeFinance.swiftMTClaimReceived")} (${formatUtilManager.getFormattedCalendarDate(swiftMessage.createdDate)})`,
            skin: 'sknLblSSP72727215px'
          },
          recordType: 'swiftMessage'
        });
      }
      titleActionScope.segSwiftAndAdvicesInfo.setData(segData);
    },
    showSwiftAndAdvices: function () {
      const index = titleActionScope.segSwiftAndAdvicesInfo.selectedRowIndex[1];
      const rowData = titleActionScope.segSwiftAndAdvicesInfo.data[index];
      titleActionScope.flxSwiftAndAdvicesInfo.setVisibility(false);
      contentPopupScope.setVisibility(true);
      contentPopupScope.flxSwiftMessagePopup.setVisibility(false);
      contentPopupScope.flxPaymentAdvicePopup.setVisibility(false);
      if (rowData['recordType'] === 'paymentAdvice') {
        const paymentAdvice = claimData.paymentAdvices[index];
        contentPopupScope.flxPaymentAdvicePopup.setVisibility(true);
        contentPopupScope.segPaymentAdvice.widgetDataMap = {
          "lblKey": "lblKey",
          "lblValue": "lblValue"
        };
        const segData = [
          {
            lblKey: kony.i18n.getLocalizedString('i18n.TradeFinance.BeneficiaryWithColon'),
            lblValue: paymentAdvice.beneficiary || NA
          },
          {
            lblKey: kony.i18n.getLocalizedString('i18n.payments.paymentDateWithColon'),
            lblValue: paymentAdvice.paymentDate ? formatUtilManager.getFormattedCalendarDate(paymentAdvice.paymentDate) : NA
          },
          {
            lblKey: kony.i18n.getLocalizedString('i18n.TradeFinance.debitedAmountWithColon'),
            lblValue: (paymentAdvice.currency && paymentAdvice.debitedAmount) ? `${paymentAdvice.currency} ${formatUtilManager.formatAmount(paymentAdvice.debitedAmount)} ` : NA
          },
          {
            lblKey: kony.i18n.getLocalizedString('i18n.TradeFinance.debitedAccountWithColon'),
            lblValue: paymentAdvice.debitedAccount ? this.presenter.getAccountDisplayName(paymentAdvice.debitedAccount) : NA
          },
          {
            lblKey: kony.i18n.getLocalizedString('i18n.TradeFinance.chargesDebitedWithColon'),
            lblValue: (paymentAdvice.currency && paymentAdvice.charges) ? `${paymentAdvice.currency} ${formatUtilManager.formatAmount(paymentAdvice.charges)} ` : NA
          },
          {
            lblKey: kony.i18n.getLocalizedString('i18n.TradeFinance.issuingBankWithColon'),
            lblValue: paymentAdvice.issuingBank || NA
          },
          {
            lblKey: kony.i18n.getLocalizedString('i18n.TradeFinance.claimRefNoWithColon'),
            lblValue: paymentAdvice.orderId || NA
          }
        ];
        contentPopupScope.segPaymentAdvice.setData(segData);
      } else {
        const swiftMessage = JSON.parse(JSON.stringify(claimData.swiftMessages[index - claimData.paymentAdvices.length]));
        contentPopupScope.flxSwiftMessagePopup.setVisibility(true);
        contentPopupScope.lblSwiftMessageHeading.text = rowData['lblListValue']['text'];
        contentPopupScope.segSwiftPrimaryDetails.widgetDataMap = {
          "lblSwiftDetailsKey": "lblSwiftDetailsKey"
        };
        let segSwiftPrimaryData = [
          {
            lblSwiftDetailsKey: `Bcode: ${swiftMessage.bCode}`
          },
          {
            lblSwiftDetailsKey: `BIC: ${swiftMessage.bic}`
          },
          {
            lblSwiftDetailsKey: `Transfer Date/Time: ${swiftMessage.transferDateOrTime}`
          },
          {
            lblSwiftDetailsKey: `Type: ${swiftMessage.type}`
          }
        ];
        contentPopupScope.segSwiftPrimaryDetails.setData(segSwiftPrimaryData);
        contentPopupScope.segSwiftMessage.widgetDataMap = {
          "lblSwiftDetailsKey": "lblSwiftDetailsKey",
          "lblSwiftDetailsValue": "lblSwiftDetailsValue"
        };
        ['bCode', 'bic', 'transferDateOrTime', 'type', 'createdDate'].forEach(e => delete swiftMessage[e]);
        let segSwiftMessageData = [
          {
            lblSwiftDetailsKey: 'MESSAGE BODY',
            lblSwiftDetailsValue: '',
          }
        ];
        for (const swiftKey in swiftMessage) {
          const swiftValue = JSON.parse(swiftMessage[swiftKey].replace(/'/g, '"'));
          segSwiftMessageData.push(
            {
              lblSwiftDetailsKey: `${swiftValue.swiftTag}: ${swiftValue.fieldName}`,
              lblSwiftDetailsValue: swiftValue.fieldValue
            }
          );
        }
        contentPopupScope.segSwiftMessage.setData(segSwiftMessageData);
      }
    },
    populateReturnedHistory: function () {
      if (!claimData.discrepancyHistory) return;
      const returnedHistory = JSON.parse(claimData.discrepancyHistory.replace(/'/g, '"'));
      claimData.returnCount = parseInt(claimData.returnCount);
      contentPopupScope.lblReturnedHistory.text = `${kony.i18n.getLocalizedString("i18n.TradeFinance.ReturnbyBankHistory")} (${claimData.returnCount})`;
      contentPopupScope.segReturnedHistory.widgetDataMap = {
        "flxHeader": "flxHeader",
        "flxSeparator1": "flxSeparator1",
        "flxSeparator2": "flxSeparator2",
        "lblReturnBank": "lblReturnBank",
        "lblReturnDate": "lblReturnDate",
        "lblKey1": "lblKey1",
        "lblValue1": "lblValue1",
        "lblKey2": "lblKey2",
        "lblValue2": "lblValue2",
        "lblKey3": "lblKey3",
        "lblValue3": "lblValue3",
      };
      let segReturnedHistoryData = [];
      for (let i = claimData.returnCount; i > 0; i--) {
        const record = returnedHistory['returnHistory' + i];
        segReturnedHistoryData.push({
          "flxHeader": {
            "skin": "sknflxbgf7f7f7op100Bordere3e3e3radius2pxTopBottom",
            "top": i === claimData.returnCount ? "0dp" : "20dp",
            "width": "100%",
            "left": "0dp",
            "height": "40dp"
          },
          "flxSeparator1": {
            "isVisible": false
          },
          "flxSeparator2": {
            "isVisible": false
          },
          "lblReturnBank": {
            "left": "3%",
            "text": `${kony.i18n.getLocalizedString("i18n.TradeFinance.ReturnedbyBank")} (${CommonUtilities.getOrdinalNumeral(i)})`
          },
          "lblReturnDate": {
            "text": record.returnedTime ? `${formatUtilManager.getFormattedCalendarDate(record.returnedTime)}, ${new Date(record.returnedTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}` : NA
          },
          "lblKey1": {
            "text": kony.i18n.getLocalizedString("i18n.TradeFinance.reasonForReturnedWithColon")
          },
          "lblValue1": {
            "text": record.reasonForReturned || NA
          },
          "lblKey2": {
            "text": kony.i18n.getLocalizedString("i18n.TradeFinance.returnMessageToBankWithColon")
          },
          "lblValue2": {
            "text": record.returnMessageToBank || NA
          },
          "lblKey3": {
            "text": kony.i18n.getLocalizedString("i18n.TradeFinance.corporateUserNameWithColon")
          },
          "lblValue3": {
            "text": record.corporateUserName || NA
          },
          "template": "flxLGReturnedHistory"
        });
      }
      contentPopupScope.segReturnedHistory.setData(segReturnedHistoryData);
    },
    togglePopup: function (flxWidget, visibility) {
      contentPopupScope.setVisibility(visibility);
      contentPopupScope[flxWidget].setVisibility(visibility);
    },
    togglePaymentDetails: function () {
      if (contentScope.lblReviewPaymentDetailsDropdownIcon.text === this.presenter.resourcesConstants.fontIcons.chevronUp) {
        contentScope.lblReviewPaymentDetailsDropdownIcon.text = this.presenter.resourcesConstants.fontIcons.chevronDown;
        contentScope.flxReviewPaymentDetailsContainer.setVisibility(false);
      } else {
        contentScope.lblReviewPaymentDetailsDropdownIcon.text = this.presenter.resourcesConstants.fontIcons.chevronUp;
        contentScope.flxReviewPaymentDetailsContainer.setVisibility(true);
      }
      contentScope.forceLayout();
    },
    /**
     * Error thrown from catch block of form controller
     */
    onError: function (err) {
      kony.print(JSON.stringify(err));
    }
  };
});