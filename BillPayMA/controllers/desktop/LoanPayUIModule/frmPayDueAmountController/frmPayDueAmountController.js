var response = {};
var initialdata = {};
var payDuePartial = 0;
var payOtherPartial = 0;
define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'OLBConstants'], function (FormControllerUtility, CommonUtilities, ViewConstants, OLBConstants) {
  return {
    init: function () {
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      this.view.onDeviceBack = function () { };
      this.presenter = applicationManager.getModulesPresentationController({ 'appName': 'BillPayMA', 'moduleName': 'LoanPayUIModule' });
    },
    /**
     * preShow for frmPayDueAmount form
     */
    preShow: function () {
      var scopeObj = this;
      this.view.customheadernew.activateMenu("Accounts", "My Accounts");
      FormControllerUtility.updateWidgetsHeightInInfo(this, ['flxHeader', 'flxContainer', 'customheadernew', 'flxFooter', 'flxMainContainer', 'flxFormContent']);
      applicationManager.getLoggerManager().setCustomMetrics(this, false, "Loans");
      this.view.LoanPayOff.skin = ViewConstants.SKINS.LOANPAYOFF_SKIN;
      this.view.LoanPayOff.clipBounds = false;
      this.view.PayDueAmount.skin = ViewConstants.SKINS.LOANPAYOFF_SKIN;
      this.view.PayDueAmount.clipBounds = false;
      this.view.PayDueAmount.listbxFrom.skin = ViewConstants.SKINS.LOANS_LISTBOX_NOERROR;
      this.view.PayDueAmount.flxCalender.skin = ViewConstants.SKINS.LOANS_LISTBOX_ERROR;
      this.view.confirmation.flxError.setVisibility(false);
      this.view.flxDownTimeWarning.setVisibility(false);
      this.view.PayDueAmount.CalendarSendDate.hidePreviousNextMonthDates = true;
      //this.view.LoanPayOff.CalendarPyOn.hidePreviousNextMonthDates = true;
      this.view.LoanPayOff.CalenderPayOffDate.hidePreviousNextMonthDates = true;
      //CommonUtilities.setCheckboxState(false, this.view.LoanPayOff.imgCheckbox);
      //CommonUtilities.disableButton(this.view.LoanPayOff.btnConfirm);
      //CommonUtilities.disableButton(this.view.LoanPayOff.btnContinueDetails);
   //   this.view.btnPayDueAccount.toolTip = kony.i18n.getLocalizedString("i18n.payments.payDueAccount");
    //  this.view.btnViewAccountDetail.toolTip = kony.i18n.getLocalizedString("i18n.CardManagement.ViewAccountDetails");
    //  this.view.btnViewStatement.toolTip = kony.i18n.getLocalizedString("i18n.ViewStatements.STATEMENTS");
    // this.view.btnBackToAccountDeatil.toolTip = kony.i18n.getLocalizedString("i18n.payments.bacToAccountDeatil");
     //this.view.btnBackToAccountSummary.toolTip = kony.i18n.getLocalizedString("i18n.ViewStatements.GoToAccountSummary");
   //   this.view.imgClose.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.closeAccount");
      this.view.rtxTC.setVisibility(!CommonUtilities.isMirrorLayoutEnabled())
      this.view.rtxTcArabic.setVisibility(CommonUtilities.isMirrorLayoutEnabled())
      this.view.LoanPayOff.AllForms.RichTextInfo.setVisibility(!CommonUtilities.isMirrorLayoutEnabled())
      this.view.LoanPayOff.AllForms.RichTextInfoArabic.setVisibility(CommonUtilities.isMirrorLayoutEnabled())
      this.view.PayDueAmount.AllForms.RichTextInfo.setVisibility(!CommonUtilities.isMirrorLayoutEnabled())
      this.view.PayDueAmount.AllForms.RichTextInfoArabic.setVisibility(CommonUtilities.isMirrorLayoutEnabled())
      this.initActions();
      applicationManager.getNavigationManager().applyUpdates(this);
	  /*
       this.view.customheadernew.btnSkipNav.onClick = function () {
                scopeObj.view.lblAcknowledgementTitle.setActive(true);
                scopeObj.view.lblConfirmationTitle.setActive(true);
                scopeObj.view.lblHeading.setActive(true);
            }; */
            this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack;
this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
this.view.CustomPopup1.onKeyPress=this.onKeyPressCallBack;
this.view.CustomPopup1.doLayout = CommonUtilities.centerPopupFlex;
this.view.lblAcknowledgementTitle.text= "Loan Due Payment-Acknowledgment";
this.view.btnByPass.onClick = this.byPassFun;
this.view.btnByPass.text="Skip to Account Details";
    },
    byPassFun: function () {
        this.view.btnViewAccountDetail.setActive(true);
    },

       onKeyPressCallBack: function(eventObject, eventPayload) {
           var self = this;
           if (eventPayload.keyCode === 27) {
               if (self.view.flxLogout.isVisible === true) {
                  self.view.flxLogout.isVisible = false;
                  self.view.flxDialogs.isVisible = false;
                  self.view.customheadernew.btnLogout.setFocus(true);
               }
                if (self.view.flxQuitPayment.isVisible === true||self.view.flxQuitPaymentParent.isVisible === true) {
                    self.view.flxQuitPaymentParent.isVisible = false;
                    self.view.flxQuitPayment.isVisible = false;
                    //self.view.flxDialogs.isVisible = false;
                    self.view.confirmation.confirmButtons.btnCancel.setFocus(true);
                }
				self.view.customheadernew.onKeyPressCallBack(eventObject, eventPayload);
            }	
        },
        /**
         * postShow for frmPayDueAmount form
         */
        postShow: function() {
            this.view.customheadernew.collapseAll();
            this.view.PayDueAmount.AllForms.onKeyPress = this.allFormsKeyPress;
            this.view.PayDueAmount.tbxOptional.skin = "sknTbxBdre3e3e3Bckgrndf6f6f6";
            if (kony.application.getCurrentBreakpoint() === 1366) {
                this.view.acknowledgment.minHeight = "500dp";
                this.view.confirmDialog.minHeight = this.view.acknowledgment.minHeight
            }
            if (kony.application.getCurrentBreakpoint() === 640) {
                this.view.confirmation.flxMainWrapper.height = "400dp";
                this.view.PayDueAmount.flxRadioPayOtherAmount.left = "2.5%";
                this.view.PayDueAmount.flxImgInfoIcon.left = "49%";
            } else {
                this.view.PayDueAmount.flxRadioPayOtherAmount.left = "10%";
            }
            this.view.PayDueAmount.flxCalender.height = "50dp";
            this.view.customheadernew.imgKony.setFocus(true);
            this.initializeResponsiveViews();
            this.setFlowActions();
            var context1 = {
                "widget": this.view.PayDueAmount.CalendarSendDate,
                "anchor": "bottom"
            };
            this.view.PayDueAmount.CalendarSendDate.setContext(context1);
            var context2 = {
                "widget": this.view.LoanPayOff.CalenderPayOffDate,
                "anchor": "bottom"
            };
            this.view.LoanPayOff.CalenderPayOffDate.setContext(context2);
            //this.onBreakpointChange(kony.application.getCurrentBreakpoint());
            if (kony.application.getCurrentBreakpoint() < 1366) {
                this.view.btnByPass.isVisible = false;
            }
            this.view.PayDueAmount.lblDueDate1.width = "55%";
            this.view.PayDueAmount.lblDueDate2.width = "45%";
            this.view.PayDueAmount.flxInfoDueDate.accessibilityConfig = {
                "a11yARIA": {
                    "tabindex": -1
                }
            }
            this.view.PayDueAmount.flxAmountDue.clipBounds = false;
            this.view.PayDueAmount.flxAmountOther.clipBounds = false;
            this.view.PayDueAmount.tbxAmount.accessibilityConfig = {
                "a11yARIA": {
                    "aria-autocomplete": "none",
                    "aria-labelledby": "lblPayDueAmount",
                    "tabindex": -1
                }
            };
            this.view.PayDueAmount.tbxTo.accessibilityConfig = {
                "a11yARIA": {
                    "aria-autocomplete": "none",
                    "tabindex": -1,
                    "aria-labelledby": "lblTo"
                }
            };
			this.view.PayDueAmount.flxDollar.accessibilityConfig = {
        "a11yHidden": false,
        "a11yARIA": {
          "tabindex": -1
        }
      };
      this.view.PayDueAmount.lblDollar.accessibilityConfig = {
        "a11yHidden": false,
        "a11yARIA": {
          "tabindex": -1
        }
      };
            if (this.loanContext == "Loan Payoff") {
                this.view.customheadernew.btnSkipNav.onClick = this.btnskipNavLOanPayoff;
                this.view.title = "Loan Payoff";
                this.view.btnByPass2.onClick = this.btnbypassLoanPayoff;
            }
			this.view.LoanPayOff.btnContinueDetails.accessibilityConfig = {
                    "a11yLabel": "Continue transaction"
                };
                this.view.LoanPayOff.btnCancelDetails.accessibilityConfig = {
                    "a11yLabel": "Cancel transaction"
                };
							 this.view.LoanPayOff.flxImgInfoIcon1.accessibilityConfig = {
                    "a11yLabel": "Information",
                    "a11yARIA": {
                        "role": "button",
                        "aria-expanded": false,
                        "tabindex": 0
                    }
                };		

				
        },
		btnskipNavLOanPayoff : function(){
			this.view.lblHeading1.setActive(true);
		},
		btnbypassLoanPayoff : function(){
			this.view.btnPayDueAccount.setActive(true);
		},
        allFormsKeyPress: function(eventObject, eventPayload) {
            if (eventPayload.keyCode === 27) {
                this.view.PayDueAmount.AllForms.isVisible = false;
                this.view.PayDueAmount.flxImgInfoIcon.accessibilityConfig = {
                    "a11yLabel": "Information",
                    "a11yARIA": {
                        "role": "button",
                        "aria-expanded": false,
                        "tabindex": 0
                    }
                }
                eventPayload.preventDefault();
                this.view.PayDueAmount.flxImgInfoIcon.setActive(true);
            }
        },
        /*updateFormUI- function to update View
         * @member of frmPayDueAmountController
         * @param {viewModel} - viewModel
         * @returns {void} - None
         * @throws {void} -None
         */
        updateFormUI: function(viewModel) {
            if (viewModel.ProgressBar) {
                if (viewModel.ProgressBar.show) {
                    FormControllerUtility.showProgressBar(this.view);
                } else {
                    FormControllerUtility.hideProgressBar(this.view);
                }
            }
            if (viewModel.bankDate) {
                if (this.loanContext === "Loan Due") {
                    this.setCalendardate(viewModel.bankDate);
                } else if (this.loanContext === "Loan Payoff") {
                    this.loanPayoffFunctionCall(viewModel.bankDate);
                }
            }
            if (viewModel.accountBalance) {
                this.updateBalanceError(viewModel.accountBalance);
            }
            if (viewModel.accountDetails) {
                this.setaccountDetails(viewModel.accountDetails);
            }
            if (viewModel.payDueDetails) {
                this.payDueDetails(viewModel.payDueDetails);
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (viewModel.properties) {
                this.setAmountValues(viewModel.properties);
            }
            if (viewModel.transferConfirm) {
                this.updateTnC(viewModel.transferConfirm);
            }
            if (viewModel.fetchAmountError) {
                this.showServerError(viewModel.fetchAmountError);
                this.fetchDetails();
            }
            if (viewModel.serverError) {
                this.showServerError(viewModel.serverError);
            }
            if (viewModel.sideMenu) {
                this.updateHamburgerMenu(viewModel.sideMenu);
            }
            if (viewModel.loadAccounts) {
                this.accountsListCallback(viewModel.loadAccounts);
            }
            if (viewModel.loanPayoff) {
                FormControllerUtility.showProgressBar(this.view);
                this.loanPayOffInit(viewModel.loanPayoff);
            }
            if (viewModel.loanDue) {
                FormControllerUtility.showProgressBar(this.view);
                this.loanPayDueAmountInit(viewModel.loanDue);
            }
            if (viewModel.payCompleteMonthlyDue) {
                this.successPayDueAmount(viewModel.payCompleteMonthlyDue.data, viewModel.payCompleteMonthlyDue.referenceId);
            }
            if (viewModel.payCompleteDue) {
                this.successLoanPayoff(viewModel.payCompleteDue.data, viewModel.payCompleteDue.referenceId);
            }
            if (viewModel.payOtherAmount) {
                this.successPayOtherAmount(viewModel.payOtherAmount.data, viewModel.payOtherAmount.referenceId);
            }
            if (viewModel.populateAccountData) {
                this.populateFromAccountValues(viewModel.populateAccountData);
            }
            if (viewModel.updateToAccount) {
                this.updateToAccountDetails(viewModel.updateToAccount);
            }
            if (viewModel.updateFromAccount) {
                this.updateAccountDetails(viewModel.updateFromAccount);
            }
            if (viewModel.validateData) {
                this.validateData(viewModel.validateData);
            }
            if (viewModel.newAccountSelection) {
                viewModel.newAccountSelection.principalBalance = CommonUtilities.formatCurrencyWithCommas(viewModel.newAccountSelection.payoffAmount, false, viewModel.newAccountSelection.currencyCode);
                viewModel.newAccountSelection.payOffCharge = CommonUtilities.formatCurrencyWithCommas(viewModel.newAccountSelection.payOffCharge, false, viewModel.newAccountSelection.currencyCode);
                this.setDataToForm(viewModel.newAccountSelection);
            }
            this.initializeResponsiveViews();
        },
        /**
         * Show UI for Loan Pay Off
         * @member frmPayDueAmountController
         * @param {data}  data data
         */
        loanPayOffInit: function(data) {
            initialdata = data;
            this.loadAccounts();
            this.loanContext = "Loan Payoff";
            this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.payments.payOffLoan");
            if (kony.application.getCurrentBreakpoint() === 640) {
                this.view.LoanPayOff.lblHeader.setVisibility(false);
                this.view.lblConfirmationTitle.setVisibility(false);
                this.view.lblAcknowledgementTitle.setVisibility(false);
                this.view.confirmation.confirmHeaders.lblHeading.text = kony.i18n.getLocalizedString("i18n.payments.confirmTransactionDetail");
                this.view.acknowledgment.confirmHeaders.lblHeading.text = kony.i18n.getLocalizedString("i18n.konybb.common.Acknowledgement");
                this.view.confirmDialog.confirmHeaders.lblHeading.text = kony.i18n.getLocalizedString("i18n.transfers.YourTransactionDetails");
            } else {
                this.view.LoanPayOff.lblHeader.setVisibility(false);
                this.view.lblConfirmationTitle.setVisibility(true);
                this.view.lblAcknowledgementTitle.setVisibility(true);
                this.view.lblHeading1.text = kony.i18n.getLocalizedString("i18n.payments.loanPayOff");
                this.view.lblConfirmationTitle.text = kony.i18n.getLocalizedString("i18n.payments.loanPayOffConfirmation");
                this.view.confirmation.confirmHeaders.lblHeading.text = kony.i18n.getLocalizedString("i18n.transfers.YourTransactionDetails");
                this.view.lblAcknowledgementTitle.text = kony.i18n.getLocalizedString("i18n.payments.acknowledgmentPayOff");
                this.view.acknowledgment.confirmHeaders.lblHeading.text = kony.i18n.getLocalizedString("i18n.konybb.common.Acknowledgement");
                this.view.confirmDialog.confirmHeaders.lblHeading.text = kony.i18n.getLocalizedString("i18n.transfers.YourTransactionDetails");
            }
            this.setDataToForm(data.accounts);
            if (data.fromAccount) {
                this.fromAccount = data.fromAccount;
            }
            this.view.flxDownTimeWarning.setVisibility(false);
            this.view.flxAcknowledgement.setVisibility(false);
            this.view.flxConfirmation.setVisibility(false);
            this.view.LoanPayOff.flxError.setVisibility(false);
            this.view.flxPayDueAmount.setVisibility(false);
            this.view.flxLoanPayOff.setVisibility(true);
            this.view.flxTermsConditions.setVisibility(true);
            this.initializeResponsiveViews();
            this.view.title = "Loan Payoff";
            this.view.btnByPass2.onClick = function() {
                this.view.btnPayDueAccount.setActive(true);
            };
            this.view.customheadernew.btnSkipNav.onClick = this.btnskipNavLOanPayoff;
			this.view.LoanPayOff.flxImgInfoIcon1.accessibilityConfig = {
                                    "a11yLabel": "Pay-off penality " + "Information",
                                    "a11yARIA": {
                                        "role": "button",
                                        "aria-expanded": false,
                                        "tabindex": 0
                                    }
                                };
        },
        /**
         * Show UI for Pay Due Amount Flow
         * @member frmPayDueAmountController
         * @param {data}  data data
         */
        loanPayDueAmountInit: function(data) {
            this.loanContext = "Loan Due";
            this.loadAccounts();
            this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.Accounts.ContextualActions.payDueAmount");
      if (kony.application.getCurrentBreakpoint() === 640) {
                this.view.PayDueAmount.lblHeader.setVisibility(false);
                this.view.lblConfirmationTitle.setVisibility(false);
                 this.view.lblAcknowledgementTitle.setVisibility(false);
                // this.view.lblConfirmationTitle.setVisibility(true);
                // this.view.lblAcknowledgementTitle.setVisibility(true);
                // this.view.lblAcknowledgementTitle.text = kony.i18n.getLocalizedString("i18n.payments.LoanAcknowledgment");
                // this.view.lblConfirmationTitle.text = kony.i18n.getLocalizedString("i18n.payments.DuePaymentConfirmation");
        this.view.confirmation.confirmHeaders.lblHeading.text = kony.i18n.getLocalizedString("i18n.transfers.YourTransactionDetails");
        this.view.acknowledgment.confirmHeaders.lblHeading.text = kony.i18n.getLocalizedString("i18n.konybb.common.Acknowledgement");
        this.view.confirmDialog.confirmHeaders.lblHeading.text = kony.i18n.getLocalizedString("i18n.transfers.YourTransactionDetails");
      } else {
        this.view.PayDueAmount.lblHeader.setVisibility(false);
        this.view.lblConfirmationTitle.setVisibility(true);
        this.view.lblAcknowledgementTitle.setVisibility(true);
                this.view.lblHeading1.text = kony.i18n.getLocalizedString("i18n.Accounts.ContextualActions.payDueAmount");
        this.view.lblConfirmationTitle.text = kony.i18n.getLocalizedString("i18n.payments.DuePaymentConfirmation");
        this.view.confirmation.confirmHeaders.lblHeading.text = kony.i18n.getLocalizedString("i18n.transfers.YourTransactionDetails");
        this.view.lblAcknowledgementTitle.text = kony.i18n.getLocalizedString("i18n.payments.LoanAcknowledgment");
        this.view.acknowledgment.confirmHeaders.lblHeading.text = kony.i18n.getLocalizedString("i18n.konybb.common.Acknowledgement");
        this.view.confirmDialog.confirmHeaders.lblHeading.text = kony.i18n.getLocalizedString("i18n.transfers.YourTransactionDetails");
      }
      this.initActionsLoanDue();
      this.setDataToForm(data.accounts);
      if (data.fromAccount) {
        this.fromAccount = data.fromAccount;
      }
      this.loanPayDueAmountUI();
      this.view.flxPayDueAmount.lblHeading.setVisibility(true);
      this.view.flxPayDueAmount.setVisibility(true);
      this.view.flxLoanPayOff.setVisibility(false);
      this.view.forceLayout();
      this.initializeResponsiveViews();
	   this.view.customheadernew.btnSkipNav.onClick = function () {
                this.view.lblHeading.setActive(true);
	  };
    },
    /**
     * Set UI for Loan Pay Due Amount
     * @member frmPayDueAmountController
     * @param {void} - None
     * @returns {void} - None
     * @throws {void} - None
     */
    loanPayDueAmountUI: function () {
      this.view.flxDownTimeWarning.setVisibility(false);
      this.view.flxTermsConditions.setVisibility(true);
      this.view.flxAcknowledgement.setVisibility(false);
      this.view.flxConfirmation.setVisibility(false);
      this.view.flxPayDueAmount.setVisibility(true);
      this.view.flxLoanPayOff.setVisibility(false);
      this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("kony.mb.accdetails.payDueAmount");
      this.view.title = kony.i18n.getLocalizedString("kony.mb.accdetails.payDueAmount");
      this.view.PayDueAmount.lblDueAmount.isVisible = false;
      this.view.PayDueAmount.tbxOptional.text = "";
      if (applicationManager.getConfigurationManager().modifyLoanPaymentAmount === "false") {
        this.view.PayDueAmount.flxRadioPayOtherAmount.setVisibility(false);
      } else {
        this.view.PayDueAmount.flxRadioPayOtherAmount.setVisibility(true);
      }
      this.dueDate = this.view.PayDueAmount.CalendarSendDate.formattedDate;
      this.dueShownDate = this.view.PayDueAmount.CalendarSendDate.formattedDate;
      this.selectedDate = this.view.PayDueAmount.CalendarSendDate.formattedDate;
      this.showPayDueAmount();
      if (["", null, "0", "0.00"].includes(this.view.PayDueAmount.tbxAmount.text)) {
        FormControllerUtility.disableButton(this.view.PayDueAmount.btnPayAmount);
      } else {
        FormControllerUtility.enableButton(this.view.PayDueAmount.btnPayAmount);
      }
    },
    /**
     * Handle server error, shows serverFlex
     * @member frmPayDueAmountController
     * @param {object} serverError error
     * @returns {void} - None
     * @throws {void} - None
     */
    showServerError: function (serverError) {
      FormControllerUtility.hideProgressBar(this.view);
      this.view.flxDownTimeWarning.setVisibility(true);
      this.view.rtxDowntimeWarning.setVisibility(true);
      this.view.rtxDowntimeWarning.text = serverError;
      this.view.rtxDowntimeWarning.setFocus(true);
      this.view.forceLayout();
    },
    /**
     * Function initialize actions for Loans flow
     * @member frmPayDueAmountController
     * @param {void}  - None
     * @returns {void} - None
     * @throws {void} - None
     */
    initActionsLoanDue: function () {
      this.view.PayDueAmount.btnPayAmount.onClick = this.payDueAmountPay;
      this.view.PayDueAmount.btnCancel.onClick = this.backToAccountLandingPage;
      this.view.PayDueAmount.tbxAmount.onBeginEditing = this.hideAmountError;
      this.view.PayDueAmount.CalendarSendDate.onTouchStart = this.hideCalendarError;
    },
    /**
     * Function to register Actions for Loans
     * @member frmPayDueAmountController
     */
    initActions: function () {
      var scopeObj = this;
      this.view.onBreakpointChange = function () {
        scopeObj.onBreakpointChange(kony.application.getCurrentBreakpoint());
      }
      FormControllerUtility.wrapAmountField(this.view.PayDueAmount.tbxAmount)
        .onKeyUp(this.amountTextboxAction);
      this.view.CustomPopup1.flxCross.onClick = this.quitPopUpNo;
      this.view.CustomPopup1.btnNo.onClick = this.quitPopUpNo;
      this.view.CustomPopup1.btnYes.onClick = this.quitPopUpYes;
      this.view.btnViewAccountDetail.onClick = this.backToAccountDetails;
      this.view.btnBackToAccountSummary.onClick = this.presenter.backToAccount;
      this.view.btnBackToAccountDeatil.onClick = this.backToAccountDetails;
      //this.view.LoanPayOff.listbxTo.onSelection = this.setDataOnNewSelection;
      //this.view.LoanPayOff.listbxFrom.onSelection = this.setSkinToListbox.bind(this, scopeObj.view.LoanPayOff.listbxFrom, scopeObj.view.LoanPayOff.flxError);
      //need to check this function
      // this.view.LoanPayOff.listbxFromDetails.onSelection = this.setSkinToListbox(this, scopeObj.view.LoanPayOff.listbxFrom, scopeObj.view.LoanPayOff.flxError);
      //this.view.LoanPayOff.flxCheckbox.onClick = this.onSelectionOfCheckbox;
      //this.view.LoanPayOff.btnCancel.onClick = this.payDueAmountCancel;
      this.view.LoanPayOff.btnCancelDetails.onClick = this.backToAccountLandingPage;
      //     this.view.LoanPayOff.btnCancel.height = "40dp";
      //     this.view.LoanPayOff.btnConfirm.height = "40dp";
      this.view.LoanPayOff.btnCancelDetails.height = "40dp";
      this.view.LoanPayOff.btnContinueDetails.height = "40dp";
      this.view.PayDueAmount.flxRadioPayDueAmount.onClick = this.payDueAmountRadioButton.bind(this, "Due");
      this.view.PayDueAmount.flxRadioPayOtherAmount.onClick = this.payDueAmountRadioButton.bind(this, "Other");
      this.view.LoanPayOff.btnConfirm.onClick = this.loanDataAfterConfirmation.bind(this);
    },
    /**
     * Function to hide Amount for Pay Due Amount flow
     * @member frmPayDueAmountController
     * @param {void} - None
     * @returns {void} - None
     * @throws {void} - None
     */
    hideAmountError: function () {
      //this.view.PayDueAmount.lblDueAmount.setVisibility(true);
      this.view.PayDueAmount.flxInfoDueAmount.setVisibility(false);
      CommonUtilities.removeDelimitersForAmount(this.view.PayDueAmount.tbxAmount);
    },
    /**
     * Function to Hide Calendar Error
     * @member frmPayDueAmountController
     * @param {void} - None
     * @returns {void} - None
     * @throws {void} - None
     */
    hideCalendarError: function () {
      this.view.PayDueAmount.flxInfoDueDate.setVisibility(false);
      this.view.PayDueAmount.lblDueDate.left = "50.8%";
      this.view.PayDueAmount.lblDueDate.setVisibility(true);
    },
    /**
     * Function to enable and disable Confirm button for Loan Pay Off
     * @member frmPayDueAmountController
     * @param {void} - None
     * @returns {void} - None
     * @throws {void} - None
     */
    onSelectionOfCheckbox: function () {
      if (!CommonUtilities.isChecked(this.view.LoanPayOff.imgCheckbox)) {
        CommonUtilities.setCheckboxState(true, this.view.LoanPayOff.imgCheckbox);
        CommonUtilities.enableButton(this.view.LoanPayOff.btnConfirm);
      } else {
        CommonUtilities.setCheckboxState(false, this.view.LoanPayOff.imgCheckbox);
        CommonUtilities.disableButton(this.view.LoanPayOff.btnConfirm);
      }
    },
    /**
     * Function to show view based on parameter
     * @member frmPayDueAmountController
     * @param {Array} views
     * @returns {void} - None
     * @throws {void} - None
     */
    showView: function (views) {
      this.view.flxMyPaymentAccounts.isVisible = false;
      this.view.flxPayDueAmount.isVisible = false;
      this.view.flxLoanPayOff.isVisible = false;
      this.view.flxPrimaryActions.isVisible = false;
      this.view.flxConfirmation.isVisible = false;
      this.view.flxAcknowledgement.isVisible = false;
      this.view.flxQuitPaymentParent.isVisible = false;
      this.view.flxQuitPayment.isVisible = false;
      this.view.flxDownTimeWarning.isVisible = false;
      for (var i = 0; i < views.length; i++) {
        this.view[views[i]].isVisible = true;
      }
      if (kony.application.getCurrentBreakpoint() == 640 || kony.application.getCurrentBreakpoint() == 1024) {
        this.view.flxPrimaryActions.isVisible = false;
      }
      this.initializeResponsiveViews();
      if(this.view.flxAcknowledgement.isVisible===true){
        this.view.title="Loan Due Payment-Acknowledgement";
        this.view.customheadernew.btnSkipNav.setVisibility(true);
				this.view.customheadernew.btnSkipNav.setActive(true);
      }
      if(this.view.flxConfirmation.isVisible===true){
        this.view.title="Due Payment- Confirmation";
      }
			if(this.view.flxLoanPayOff.isVisible){
				this.view.title = "Loan PayOff";
				this.view.customheadernew.btnSkipNav.setVisibility(true);
				this.view.customheadernew.btnSkipNav.setActive(true);
			}
    },
    /**
     * Function to change UI when radio buttons are toggled,Pay Due Amount
     * @member frmPayDueAmountController
     * @param {String} obj stores context for Pay Due amount - {Due/Other}
     * @returns {void} - None
     * @throws {void} - None
     */
    payDueAmountRadioButton: function(obj) {
      this.view.PayDueAmount.flxError.setVisibility(false);
      this.view.PayDueAmount.flxInfoDueDate.setVisibility(false);
      this.view.PayDueAmount.lblDueDate.setVisibility(true);
      this.view.PayDueAmount.lblInfoAmount.isVisible = false;
      this.view.PayDueAmount.flxInfoDueAmount.isVisible = false;
      this.view.PayDueAmount.listbxFrom.skin = ViewConstants.SKINS.LOANS_LISTBOX_NOERROR;
      this.view.PayDueAmount.tbxAmount.skin = ViewConstants.SKINS.NON_EDITABLETEXTBOX;
      this.view.PayDueAmount.tbxAmount.focusSkin = ViewConstants.SKINS.NON_EDITABLETEXTBOX;
      this.view.PayDueAmount.tbxAmount.hoverSkin = ViewConstants.SKINS.NON_EDITABLETEXTBOX;
      this.view.PayDueAmount.flxCalender.skin = ViewConstants.SKINS.LOANS_LISTBOX_ERROR;
      //this.view.PayDueAmount.flxInfoDueAmount.setVisibility(false);
      //this.view.PayDueAmount.CalendarSendDate.dateFormat = applicationManager.getFormatUtilManager().getDateFormat();
      //this.view.PayDueAmount.CalendarSendDate.dateComponents = CommonUtilities.getServerDateComponent();
      if (obj === "Due") {
          this.validateDate();
          this.view.PayDueAmount.flxRadioPayDueAmount.accessibilityConfig = {
              "a11yARIA": {
                  "role": "radio",
                  "aria-checked": true,
                  "tabindex": 0,
                  "aria-labelledby": "lblPayDueAmount"
              }
          };
          this.view.PayDueAmount.flxRadioPayOtherAmount.accessibilityConfig = {
              "a11yARIA": {
                  "role": "radio",
                  "aria-checked": false,
                  "tabindex": 0,
                  "aria-labelledby": "lblPayOtherAmount"
              }
          };
          this.view.PayDueAmount.imgRadioPayDueAmount.src = ViewConstants.IMAGES.RADIO_BUTTON_ACTIVE;
          this.view.PayDueAmount.imgRadioPayOtherAmount.src = ViewConstants.IMAGES.RADIO_BTN_INACTIVE;
          this.view.PayDueAmount.tbxAmount.skin = "sknTbxBkGrndf6f6f6SSP42424215px";
          this.view.PayDueAmount.tbxAmount.focusSkin = "sknTbxBkGrndf6f6f6SSP42424215px";
          this.view.PayDueAmount.tbxAmount.accessibilityConfig={
              "a11yARIA":{
                  "aria-autocomplete":"none",
                  "aria-labelledby":"lblPayDueAmount",
                  "tabindex":-1
              } 
          }
          this.view.PayDueAmount.tbxAmount.hoverSkin = "sknTbxBkGrndf6f6f6SSP42424215px";
          this.view.PayDueAmount.lblDueAmount.isVisible = true;
          this.view.PayDueAmount.lblDueAmount.text = "(" + kony.i18n.getLocalizedString("i18n.payments.currentDue") + " " + CommonUtilities.formatCurrencyWithCommas(this.dueCurrentAmount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(this.currency)) + "," + kony.i18n.getLocalizedString("i18n.payments.totalOverDueWithColon") + " " + CommonUtilities.formatCurrencyWithCommas(this.dueTotalAmount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(this.currency)) + ")";
          this.view.PayDueAmount.tbxAmount.setEnabled(false);
          if (this.dueAmount == "" || this.dueAmount == null) {
              this.dueAmount = "0.00";
          }
          if (this.dueCurrentAmount === "" || this.dueCurrentAmount === null) {
              this.dueCurrentAmount = "0.00";
          }
          this.view.PayDueAmount.tbxAmount.text = applicationManager.getFormatUtilManager().formatAmount(this.dueAmount);
          if (this.view.PayDueAmount.tbxAmount.text !== "" && this.view.PayDueAmount.tbxAmount.text !== null && this.view.PayDueAmount.tbxAmount.text !== "0" && this.view.PayDueAmount.tbxAmount.text !== "0.00" && this.view.PayDueAmount.tbxAmount.text !== "0,00") {
              FormControllerUtility.enableButton(this.view.PayDueAmount.btnPayAmount);
          } else {
              FormControllerUtility.disableButton(this.view.PayDueAmount.btnPayAmount);
          }
          this.view.PayDueAmount.flxRadioPayDueAmount.setActive(true);
      } else if (obj === "Other") {
          this.validateDate();
          this.view.PayDueAmount.flxRadioPayDueAmount.accessibilityConfig = {
              "a11yARIA": {
                  "role": "radio",
                  "aria-checked": false,
                  "tabindex": 0,
                  "aria-labelledby": "lblPayDueAmount"
              }
          };
          this.view.PayDueAmount.flxRadioPayOtherAmount.accessibilityConfig = {
              "a11yARIA": {
                  "role": "radio",
                  "aria-checked": true,
                  "tabindex": 0,
                  "aria-labelledby": "lblPayOtherAmount"
              }
          };
          this.view.PayDueAmount.CalendarSendDate.skin = ViewConstants.SKINS.LOANDUE_CALENDER_NORMAL;
          this.view.PayDueAmount.CalendarSendDate.focusSkin = ViewConstants.SKINS.LOANDUE_CALENDER_NORMAL;
          this.view.PayDueAmount.CalendarSendDate.hoverSkin = ViewConstants.SKINS.LOANDUE_CALENDER_NORMAL;
          this.view.PayDueAmount.imgRadioPayOtherAmount.src = "radio_btn_inactive.png";
          if (this.view.PayDueAmount.tbxAmount.text !== "" && this.view.PayDueAmount.tbxAmount.text !== null && this.view.PayDueAmount.tbxAmount.text !== "0" && this.view.PayDueAmount.tbxAmount.text !== "0.00" && this.view.PayDueAmount.tbxAmount.text !== "0,00") {
              FormControllerUtility.enableButton(this.view.PayDueAmount.btnPayAmount);
          } else {
              this.view.PayDueAmount.tbxAmount.text = "0.00";
              FormControllerUtility.disableButton(this.view.PayDueAmount.btnPayAmount);
          }
          this.view.PayDueAmount.imgRadioPayDueAmount.src = ViewConstants.IMAGES.RADIO_BTN_INACTIVE;
          this.view.PayDueAmount.imgRadioPayOtherAmount.src = ViewConstants.IMAGES.RADIO_BUTTON_ACTIVE;
          this.view.PayDueAmount.tbxAmount.skin = "sknTbxBdre3e3e3Bckgrndf6f6f6";
          this.view.PayDueAmount.tbxAmount.accessibilityConfig={
              "a11yARIA":{
                  "aria-autocomplete":"none",
                  "aria-labelledby":"lblPayOtherAmount",
                  "tabindex":0
              } 
          }
          this.view.PayDueAmount.tbxAmount.focusSkin = "sknTbxBdre3e3e3Bckgrndf6f6f6";
          this.view.PayDueAmount.tbxAmount.hoverSkin = "sknTbxBdre3e3e3Bckgrndf6f6f6";
          this.view.PayDueAmount.tbxAmount.setEnabled(true);
          this.view.PayDueAmount.lblDueAmount.isVisible = true;
          this.view.PayDueAmount.lblDueAmount.text = "(" + kony.i18n.getLocalizedString("i18n.payments.currentDue") + " " + CommonUtilities.formatCurrencyWithCommas(this.dueCurrentAmount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(this.currency)) + "," + kony.i18n.getLocalizedString("i18n.payments.totalOverDueWithColon") + " " + CommonUtilities.formatCurrencyWithCommas(this.dueTotalAmount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(this.currency)) + ")";
          this.view.PayDueAmount.lblDueDate.text = "(" + kony.i18n.getLocalizedString("i18n.billPay.DueDate") + ": " + this.presenter.getFormattedDateString(this.dueShownDate) + ")";
          this.view.PayDueAmount.flxRadioPayOtherAmount.setActive(true);
      }
      this.initializeResponsiveViews();
  },
    /**
      * Function to show Quit pop up on click of cancel for Pay Due Amount
      * @member frmPayDueAmountController
      * @param {void} - None
      * @returns {void} - None
      * @throws {void} - None
      */
    payDueAmountCancel: function () {
      var height = this.view.flxHeader.info.frame.height + this.view.flxContainer.info.frame.height;
      this.view.flxQuitPayment.height = height + "dp";
      this.view.flxQuitPaymentParent.setVisibility(true);
      this.view.flxQuitPayment.setVisibility(true);
     // this.view.CustomPopup1.lblHeading.setActive(true);
    },
    /**
     * Triggers on click of Pay Amount Button for Pay Due Amount, Show confirmation after validating data
     * @member frmPayDueAmountController
     * @param {void} - None
     * @returns {void} - None
     * @throws {void} - None
     */
    payDueAmountPay: function () {
      var scopeObj = this;
      var isAmountValid = true;
      var isDateBeforeDue = true;
      var data = {};
      isAmountValid = this.amountValidation(this.view.PayDueAmount.tbxAmount.text.trim(), this.balanceInFromAccount, this.dueAmount, this.dueTotalAmount);
      isDateBeforeDue = this.dateValidation(this.view.PayDueAmount.CalendarSendDate.formattedDate, this.dueShownDate);
      this.view.forceLayout();
      if (isAmountValid && isDateBeforeDue) {
        //if (this.view.PayDueAmount.imgRadioPayDueAmount.src === ViewConstants.IMAGES.RADIO_BUTTON_ACTIVE) {
        if (this.view.PayDueAmount.imgRadioPayDueAmount.src === "radiobtn_active_small.png" ||
          this.view.PayDueAmount.imgRadioPayDueAmount.src === "radiobtn_active.png") {
          data = {
            "fromAccount": scopeObj.view.PayDueAmount.listbxFrom.selectedKeyValue[1],
            "fromAccountID": scopeObj.view.PayDueAmount.listbxFrom.selectedKey,
            "toAccount": this.view.PayDueAmount.tbxTo.text,
            "toAccountID": scopeObj.toaccount,
            "amount": scopeObj.dueAmount,
            "date": scopeObj.view.PayDueAmount.CalendarSendDate.formattedDate,
            "description": scopeObj.view.PayDueAmount.tbxOptional.text.trim(),
            "payment": parseFloat(applicationManager.getFormatUtilManager().deFormatAmount(scopeObj.view.PayDueAmount.tbxAmount.text.trim())),
            "penalty": parseFloat(applicationManager.getFormatUtilManager().deFormatAmount(scopeObj.penalty))
          };
          var tdate = CommonUtilities.getServerDateObject().toUTCString();
          if (this.getDateObject(data.date).getTime() <= this.getDateObject(tdate).getTime()) {
            data.isScheduled = "false";
          } else {
            data.isScheduled = "true";
          }
          this.showConfirmationPayDueAmount(data);
        } else {
          if (scopeObj.nextPaymentAmount == "" || scopeObj.nextPaymentAmount == null) {
            scopeObj.nextPaymentAmount = 0;
          }
          data = {
            "fromAccount": scopeObj.view.PayDueAmount.listbxFrom.selectedKeyValue[1],
            "fromAccountID": scopeObj.view.PayDueAmount.listbxFrom.selectedKey,
            "toAccount": this.view.PayDueAmount.tbxTo.text,
            "toAccountID": scopeObj.toaccount,
            "amount": scopeObj.dueAmount,
            "date": scopeObj.view.PayDueAmount.CalendarSendDate.formattedDate,
            "description": scopeObj.view.PayDueAmount.tbxOptional.text.trim(),
            "dueDate": scopeObj.nextPaymentDate,
            "payment": parseFloat(applicationManager.getFormatUtilManager().deFormatAmount(scopeObj.view.PayDueAmount.tbxAmount.text.trim())).toFixed(2),
            "penalty": parseFloat(applicationManager.getFormatUtilManager().deFormatAmount(scopeObj.penalty)),
            "remainingAmount": parseFloat(applicationManager.getFormatUtilManager().deFormatAmount(scopeObj.dueAmount)) - parseFloat(applicationManager.getFormatUtilManager().deFormatAmount(scopeObj.view.PayDueAmount.tbxAmount.text))
          };
          data.remainingAmount = data.remainingAmount.toFixed(2);
          if (data.payment === data.amount) {
            this.view.confirmation.flxError.setVisibility(false);
            this.view.confirmation.confirmButtons.top = "0px";
          } else {
            this.view.confirmation.flxError.setVisibility(true);
            this.view.confirmation.lblError.text = kony.i18n.getLocalizedString("i18n.Error.partialPayment");
            this.view.confirmation.confirmButtons.top = "20px";
            this.view.PayDueAmount.tbxAmount.skin = ViewConstants.SKINS.NON_EDITABLETEXTBOX;
            this.view.PayDueAmount.tbxAmount.focusSkin = ViewConstants.SKINS.NON_EDITABLETEXTBOX;
            this.view.PayDueAmount.tbxAmount.hoverSkin = ViewConstants.SKINS.NON_EDITABLETEXTBOX;
            this.view.confirmation.flxError.setVisibility(true);
          }
          var currDate = CommonUtilities.getServerDateObject().toUTCString();
          if (this.getDateObject(data.date).getTime() <= this.getDateObject(currDate).getTime()) {
            data.isScheduled = "false";
          } else {
            data.isScheduled = "true";
          }
          if (data.remainingAmount > 0) {
            this.view.confirmation.flxPartialPayment.setVisibility(true);
          } else {
            this.view.confirmation.flxPartialPayment.setVisibility(false);
          }
          this.showConfirmationPayOtherAmount(data);
          this.initializeResponsiveViews();
          this.view.forceLayout();
        }
      } else {
        this.initializeResponsiveViews();
        this.view.forceLayout();
      }
    },
    /**
      *  Validate date and show error for Pay Due Amount
      * @member frmPayDueAmountController
      * @param {Date} date
      * @param {Date} dateDue
      * @returns {boolean} true/false
      * @throws {void} - None
      */
    dateValidation: function (date, dateDue) {
      var scopeObj = this;
      if (scopeObj.getDateObject(date).getTime() > scopeObj.getDateObject(dateDue).getTime()) {
        if (applicationManager.getConfigurationManager().loanPaymentAfterDueDateEnabled === "false") {
          scopeObj.view.PayDueAmount.flxError.setVisibility(true);
          scopeObj.view.PayDueAmount.lblError.text = kony.i18n.getLocalizedString("i18n.Error.scheduledDateError");
          scopeObj.view.PayDueAmount.flxCalender.skin = ViewConstants.SKINS.LOANS_FLEX_ERROR;
          scopeObj.view.confirmation.flxError.setVisibility(true);
          scopeObj.initializeResponsiveViews();
          return false;
        }
        if (scopeObj.view.PayDueAmount.flxInfoDueDate.isVisible === false) {
          scopeObj.view.PayDueAmount.flxInfoDueDate.setVisibility(true);
          scopeObj.view.PayDueAmount.lblDueDate.setVisibility(false);
          return false;
        } else {
          return true;
        }
      } else {
        scopeObj.view.PayDueAmount.flxInfoDueDate.setVisibility(false);
        scopeObj.view.PayDueAmount.lblDueDate.setVisibility(true);
        return true;
      }
    },
    /**
     *  Validate amount and show error for Pay Due Amount
     * @member frmPayDueAmountController
     * @param {String} enteredAmount
     * @param {String} accountBalance
     * @param {String} dueAmount
     * @returns {boolean} - true/false
     * @throws {void} - None
     */
    amountValidation: function (enteredAmount, accountBalance, dueAmount, dueTotalAmount) {
      this.currencySymbol = applicationManager.getConfigurationManager().configurations.getItem("CURRENCYCODE");
      if (kony.application.getCurrentBreakpoint() !== 640) {
        this.view.PayDueAmount.flxInfoDueDate.width = "48%";
      }
      this.view.PayDueAmount.lblDueDate1.width = "100%";
      this.view.PayDueAmount.lblDueDate2.width = "100%";
      var scopeObj = this;
      if (enteredAmount === "" || enteredAmount === undefined || parseFloat(enteredAmount) <= 0 || enteredAmount.length < 1) {
        scopeObj.view.PayDueAmount.flxError.setVisibility(true);
        scopeObj.view.PayDueAmount.lblError.text = kony.i18n.getLocalizedString("i18n.login.EnrollAlert");
        this.view.PayDueAmount.tbxAmount.skin = ViewConstants.SKINS.LOANS_FLEX_ERROR;
        this.view.PayDueAmount.tbxAmount.focusSkin = ViewConstants.SKINS.LOANS_FLEX_ERROR;
        this.view.PayDueAmount.tbxAmount.hoverSkin = ViewConstants.SKINS.LOANS_FLEX_ERROR;
        this.view.confirmation.flxError.setVisibility(true);
        scopeObj.initializeResponsiveViews();
        return false;
      }
      enteredAmount = parseFloat(applicationManager.getFormatUtilManager().deFormatAmount(enteredAmount));
      accountBalance = parseFloat(applicationManager.getFormatUtilManager().deFormatAmount(accountBalance));
      //dueAmount = parseFloat(applicationManager.getFormatUtilManager().deFormatAmount(dueAmount));
      dueTotalAmount = parseFloat(applicationManager.getFormatUtilManager().deFormatAmount(dueTotalAmount));
      /*     if (enteredAmount > dueTotalAmount) {
             scopeObj.view.PayDueAmount.flxError.setVisibility(true);
             scopeObj.view.PayDueAmount.lblError.text = kony.i18n.getLocalizedString("i18n.Error.amountMoreThanDueAmount");
             this.view.PayDueAmount.tbxAmount.skin = ViewConstants.SKINS.LOANS_FLEX_ERROR;
             this.view.PayDueAmount.tbxAmount.focusSkin = ViewConstants.SKINS.LOANS_FLEX_ERROR;
             this.view.PayDueAmount.tbxAmount.hoverSkin = ViewConstants.SKINS.LOANS_FLEX_ERROR;
             this.view.confirmation.flxError.setVisibility(true);
             scopeObj.initializeResponsiveViews();
             return false;*/
      if (enteredAmount > accountBalance) {
        scopeObj.view.PayDueAmount.flxError.setVisibility(true);
        scopeObj.view.PayDueAmount.lblError.text = kony.i18n.getLocalizedString("i18n.common.errorInsufficientFunds");
        scopeObj.view.confirmation.flxError.setVisibility(true);
        return false;
      } else if ((enteredAmount + parseFloat(scopeObj.penalty)) > accountBalance) {
        scopeObj.view.PayDueAmount.flxError.setVisibility(true);
        scopeObj.view.PayDueAmount.lblError.text = kony.i18n.getLocalizedString("i18n.Error.insufficientFunds") + " (" + kony.i18n.getLocalizedString("i18n.loan.dueAmount") + ": " + this.currencySymbol + dueAmount + " , " + kony.i18n.getLocalizedString("i18n.loan.Penalty") + " : " + this.currencySymbol + scopeObj.penalty + ")";
        this.view.PayDueAmount.tbxAmount.skin = ViewConstants.SKINS.LOANS_FLEX_ERROR;
        this.view.PayDueAmount.tbxAmount.focusSkin = ViewConstants.SKINS.LOANS_FLEX_ERROR;
        this.view.PayDueAmount.tbxAmount.hoverSkin = ViewConstants.SKINS.LOANS_FLEX_ERROR;
        this.view.confirmation.flxError.setVisibility(true);
        return false;
      } else if (enteredAmount > dueAmount) {
        scopeObj.view.PayDueAmount.flxError.setVisibility(true);
        scopeObj.view.PayDueAmount.lblError.text = kony.i18n.getLocalizedString("i18n.payments.payDueAmountErrorMessage");
        scopeObj.view.confirmation.flxError.setVisibility(true);
        return false;
      } else {
        //       } else if (enteredAmount > (dueAmount+dueTotalAmount)){
        //         scopeObj.view.PayDueAmount.flxError.setVisibility(true);
        //         scopeObj.view.PayDueAmount.lblError.text = "Payment amount cannot be greater than the due amount";
        //         scopeObj.view.PayDueAmount.tbxAmount.skin = ViewConstants.SKINS.LOANS_LISTBOX_ERRORSKIN;
        //         scopeObj.view.PayDueAmount.lblInfoAmount.isVisible = false;
        //         scopeObj.view.PayDueAmount.flxInfoDueAmount.isVisible = false;
        //         scopeObj.view.confirmation.flxError.setVisibility(true);
        //         return false;
        //       }else {
        scopeObj.setSkinToFlex(scopeObj.view.PayDueAmount.tbxAmount, scopeObj.view.PayDueAmount.flxError);
        if (scopeObj.view.PayDueAmount.flxInfoDueAmount.isVisible === false && (dueAmount - enteredAmount) > 0) {
          scopeObj.view.PayDueAmount.flxInfoDueAmount.setVisibility(true);
          scopeObj.view.PayDueAmount.flxInfoDueAmount.width = "48%";
          scopeObj.view.PayDueAmount.lblInfoAmount.width = "100%";
          scopeObj.view.PayDueAmount.lblDueAmount.setVisibility(false);
          var todayDate = CommonUtilities.getServerDateObject().toUTCString();
          var dueDate = this.presenter.getFormattedDateString(this.dueDate);
          this.view.PayDueAmount.lblInfoAmount.isVisible = true;
          scopeObj.view.PayDueAmount.lblInfoAmount.text = kony.i18n.getLocalizedString("i18n.loan.dueAmount") + ": " + CommonUtilities.formatCurrencyWithCommas(dueAmount.toFixed(2), false, this.view.PayDueAmount.lblDollar.text) + ".";
          scopeObj.view.forceLayout()
        } else {
          return true;
        }
      }
      scopeObj.initializeResponsiveViews();
    },
    /**
      *  Set confirmation values
      * @member frmPayDueAmountController
      * @param {JSON} data for left container
      * @param {JSON} extraData for right container
      * @param {JSON} actions for buttons
      * @returns {void} - None
      * @throws {void} - None
      */
    setConfirmationValues: function (data, extraData, actions) {
      if (kony.application.getCurrentBreakpoint() === 640) {
                 this.view.lblConfirmationTitle.setVisibility(false);
                // this.view.lblConfirmationTitle.setVisibility(true);
        this.view.confirmation.confirmHeaders.lblHeading.text = kony.i18n.getLocalizedString("i18n.payments.confirmTransactionDetail");
      } else {
        this.view.lblConfirmationTitle.setVisibility(true);
        this.view.lblConfirmationTitle.text = kony.i18n.getLocalizedString("i18n.payments.DuePaymentConfirmation");
      }
      var target = this.view.confirmation.flxLeft.widgets();
      if (data.Notes) {
        this.view.confirmation.flxContainerPaymentDate.setVisibility(true);
      } else {
        this.view.confirmation.flxContainerPaymentDate.setVisibility(false);
      }
      var i = 0;
      var prop, key, value;
      for (prop in data) {
        key = target[i].widgets()[0].widgets()[0];
        value = target[i].widgets()[2].widgets()[0];
        key.text = prop + ":";
        value.text = data[prop];
        i++;
      }
      if (Object.keys(extraData).length !== 0) {
        this.view.confirmation.flxPartialPayment.isVisible = true;
        target = this.view.confirmation.flxPartialPaymentdetails.widgets();
        i = 1;
        for (prop in extraData) {
          key = target[i].widgets()[0].widgets()[0];
          value = target[i].widgets()[1].widgets()[0];
          key.text = prop;
          value.text = extraData[prop];
          i++;
        }
        this.view.confirmation.confirmButtons.top = "0px";
      } else {
        this.view.confirmation.flxPartialPayment.isVisible = false;
        this.view.confirmation.confirmButtons.top = "20px";
      }
      if (this.loanContext === "Loan Due"){
        CommonUtilities.enableButton(this.view.confirmation.confirmButtons.btnConfirm);
		this.view.confirmation.confirmButtons.btnConfirm.accessibilityConfig = {
			  "a11yLabel" : "confirm due payment"
		  };
		  this.view.confirmation.confirmButtons.btnCancel.accessibilityConfig = {
			  "a11yLabel" : "cancel due payment"
		  };
		  this.view.confirmation.confirmButtons.btnModify.accessibilityConfig = {
			  "a11yLabel" : "modify due payment"
		  };
	  }
      else{
        CommonUtilities.disableButton(this.view.confirmation.confirmButtons.btnConfirm);
	  }
      this.view.confirmation.confirmButtons.btnCancel.onClick = actions.cancel;
      this.view.confirmation.confirmButtons.btnModify.onClick = actions.modify;
      if (CommonUtilities.isCSRMode()) {
        this.view.confirmation.confirmButtons.btnConfirm.onClick = CommonUtilities.disableButtonActionForCSRMode();
        this.view.confirmation.confirmButtons.btnConfirm.skin = CommonUtilities.disableButtonSkinForCSRMode();
        this.view.confirmation.confirmButtons.btnConfirm.focusSkin = CommonUtilities.disableButtonSkinForCSRMode();
      } else {
        if (this.loanContext === "Loan Payoff") {
          this.view.confirmation.confirmButtons.btnConfirm.onClick = this.loanPayOffPayment;
        } else {
          this.view.confirmation.confirmButtons.btnConfirm.onClick = actions.confirm;
        }
      }
      if (this.loanContext === "Loan Due" && extraData["Balance Amount:"] != undefined) {
        var bal = extraData["Balance Amount:"].slice(1);
        bal = parseFloat(bal);
        if (bal > 0) {
          this.view.confirmation.flxPartialPayment.isVisible = true;
        } else {
          this.view.confirmation.flxPartialPayment.isVisible = false;
        }
      }
    },
    /**
      Depending on the locale this method returns the magic number that is required
        to align info popup
    **/
    getMagicNumberForPopup: function () {
      var locale = kony.i18n.getCurrentLocale();
      switch (locale) {
        case "es_ES":
          return -3;
        case "en_US":
          return -2;
        case "en_GB":
          return -2;
        case "de_DE":
          return 1;
        case "fr_FR":
          return 4;
        default:
          return 10;
      }
    },
    /**
    *  Set flow actions
     * @member frmPayDueAmountController
     * @param {void} - None
     * @returns {void} - None
     * @throws {void} - None
     */
    setFlowActions: function () {
      var scopeObj = this;
      /*this.view.LoanPayOff.flxImageInfo.onClick = function () {
        if (scopeObj.view.LoanPayOff.AllForms.isVisible === false){
          scopeObj.view.LoanPayOff.AllForms.left = (scopeObj.view.LoanPayOff.flxImageInfo.frame.x - scopeObj.view.LoanPayOff.lblPayOffPenality.frame.width)+scopeObj.getMagicNumberForPopup()+"%";
          scopeObj.view.LoanPayOff.AllForms.isVisible = true;
        }
        else
          scopeObj.view.LoanPayOff.AllForms.isVisible = false;
      };
      this.view.LoanPayOff.AllForms.flxCross.onClick = function () {
        scopeObj.view.LoanPayOff.AllForms.isVisible = false;
      };*/
    },
    /**
    *  Set Acknowledgement Values
     * @member frmPayDueAmountController
     * @param {JSON} data
     * @param {JSON} details
     * @param {JSON} extraData
     * @returns {void} - None
     * @throws {void} - None
     */
    setAcknowledgementValues: function (data, details, extraData) {
      var i, prop, value, key;
      this.view.acknowledgment.lblTransactionMessage.text = data.message;
      this.view.acknowledgment.ImgAcknowledged.src = data.image;
      this.view.acknowledgment.lblRefrenceNumberValue.text = data.referenceNumber;
      this.view.acknowledgment.lblAccType.text = data.accountType;
      this.view.acknowledgment.lblBalance.text = data.amount;
      if (details.Notes) {
        this.view.confirmDialog.flxContainerDescription.setVisibility(true);
      } else {
        this.view.confirmDialog.flxContainerDescription.setVisibility(false);
      }
      this.view.forceLayout();
      var target = this.view.confirmDialog.flxMain.widgets();
      i = 2;
      for (prop in details) {
        key = target[i].widgets()[0].widgets()[0];
        value = target[i].widgets()[1].widgets()[0];
        key.text = prop;
        value.text = details[prop];
        i++;
      }
      if (Object.keys(details).length > 5) {
        this.view.confirmDialog.flxContainerPenalty.isVisible = true;
        this.view.confirmDialog.flxContainerPartial.isVisible = true;
      } else {
        this.view.confirmDialog.flxContainerPenalty.isVisible = false;
        this.view.confirmDialog.flxContainerPartial.isVisible = false;
      }
      if (Object.keys(extraData).length !== 0) {
        this.view.confirmDialog.flxPartial.isVisible = true;
        target = this.view.confirmDialog.flxPartial.widgets();
        i = 1;
        for (prop in extraData) {
          key = target[i].widgets()[0].widgets()[0];
          value = target[i].widgets()[1].widgets()[0];
          key.text = prop;
          value.text = extraData[prop];
          i++;
        }
      } else {
        this.view.confirmDialog.flxPartial.isVisible = false;
      }
      this.view.forceLayout();
    },
    /**
    *  Show confirmation for Pay Due Amount
     * @member frmPayDueAmountController
     * @param {Object} obj stores transaction details
     * @returns {void} - None
     * @throws {void} - None
     */
    showConfirmationPayDueAmount: function (obj) {
      var scopeObj = this;
      var extraData = {};
      this.view.confirmation.flxWrapper.setVisibility(true);
      this.view.confirmation.flxMainWrapper.setVisibility(false);
      this.view.confirmation.flxPartialPayment.setVisibility(false);
      this.view.confirmation.flxContainerPenaltyAmount.setVisibility(false);
      this.view.confirmation.flxContainerDescription.setVisibility(false);
      var amountLabel = kony.i18n.getLocalizedString("i18n.transfers.lblAmount") + "(" + this.view.PayDueAmount.lblDollar.text + ")";
      let fromLabel = kony.i18n.getLocalizedString("i18n.transfers.lblFrom");
      let toLabel = kony.i18n.getLocalizedString("i18n.transfers.lblTo");
      let dateLabel = kony.i18n.getLocalizedString("kony.mb.transfers.Date");
      let notesLabel = kony.i18n.getLocalizedString("i18n.transfers.Description");
      let paylabel = kony.i18n.getLocalizedString("i18n.PayDueAmount.YouarePaying");
      let dueLabel = kony.i18n.getLocalizedString("i18n.payments.dueDateWithColon");
      let yourPayLabel = kony.i18n.getLocalizedString("i18n.payments.yourPaymentDateWithColon");
      var data = {};
      data[fromLabel] = obj.fromAccount;
      data[toLabel] = obj.toAccount;
      data[dateLabel] = obj.date;
      //data[amountLabel] = CommonUtilities.formatCurrencyWithCommas(obj.amount, false, this.view.PayDueAmount.lblDollar.text);
      data[amountLabel] = this.view.PayDueAmount.lblDollar.text + applicationManager.getFormatUtilManager().formatAmount(obj.amount);
      data[notesLabel] = obj.description;
      scopeObj = this;
      if (scopeObj.getDateObject(this.selectedDate).getTime() > scopeObj.getDateObject(this.dueShownDate).getTime()) {
        scopeObj.view.confirmation.flxPartialPayment.setVisibility(true);
        scopeObj.view.confirmation.flxError.setVisibility(true);
        scopeObj.view.confirmation.flxContainerPartialDate.setVisibility(false);
        scopeObj.view.confirmation.lblError.text = kony.i18n.getLocalizedString("i18n.payments.payDueConfirmationErrorMessage");
        payDuePartial = 1;
        extraData[paylabel] = CommonUtilities.formatCurrencyWithCommas(obj.payment, false, this.view.PayDueAmount.lblDollar.text);
        extraData[dueLabel] = scopeObj.presenter.getFormattedDateString(scopeObj.dueShownDate);
        extraData[yourPayLabel] = scopeObj.presenter.getFormattedDateString(scopeObj.selectedDate);
      } else {
        payDuePartial = 0;
        scopeObj.view.confirmation.flxPartialPayment.setVisibility(false);
        scopeObj.view.confirmation.flxError.setVisibility(false);
      }
      var actions = {
        "cancel": function () {
          scopeObj.showQuitPopUp();
        },
        "modify": function () {
          scopeObj.showPayDueAmount();
          scopeObj.view.lblHeading.setActive(true);
        },
        "confirm": function () {
          scopeObj.successData = obj;
          scopeObj.confirmPayDueAmount(obj, "payCompleteMonthlyDue");
        }
      };
      this.setConfirmationValues(data, extraData, actions);
      this.showView(["flxConfirmation"]);
      this.initializeResponsiveViews();
    },
    /**
    *  Confirm Pay Due Amount/Pay Other Amount
     * @member frmPayDueAmountController
     * @param {Object} obj stores transaction details
     * @param {function} action stores success callback
     * @returns {void} - None
     * @throws {void} - None
     */
    confirmPayDueAmount: function (obj, action) {
      FormControllerUtility.showProgressBar(this.view);
      var amount = "";
      if (this.view.PayDueAmount.imgRadioPayDueAmount.src === ViewConstants.IMAGES.RADIO_BUTTON_ACTIVE) {
        amount = obj.amount;
      } else {
        amount = obj.payment;
      }

      var fromAccount = {};
      fromAccount.accountID = obj.fromAccountID;
      var toAccount = {};
      toAccount.accountID = obj.toAccountID;

      var transferData = {};
      var today = CommonUtilities.getServerDateObject();
      var month = (today.getMonth() + 1) >= 10 ? (today.getMonth() + 1) : ("0" + (today.getMonth() + 1));
      var day = today.getDate() > 9 ? today.getDate() : ("0" + today.getDate());
      var todayDate = month + "/" + day + "/" + today.getFullYear();
      var setdate = obj.date.split("/");
      var selectdate = setdate[0] + "/" + setdate[1] + "/" + setdate[2];
      //var todayDate = applicationManager.getFormatUtilManager().getFormatedDateString(CommonUtilities.getServerDateObject(), applicationManager.getFormatUtilManager().getDateFormat());
      if (todayDate == obj.date) {
        transferData.isScheduled = 0;
      } else {
        transferData.isScheduled = 1;
      }
      transferData.fromAccount = fromAccount;
      amount = parseFloat(amount);
      transferData.amount = amount.toFixed(2);
      transferData.paymentReference = obj.description;
      transferData.accountNumber = "";
      transferData.frequency = "Once";
      transferData.isOwnAccount = "true";
      transferData.toAccount = toAccount;
      transferData.toAccount.currencyCode = this.returnCurrencyCode(this.view.PayDueAmount.lblDollar.text);
      transferData.sendOnDate = selectdate;
      transferData.fromAccount.currencyCode = this.fromAccountCurrency;
      transferData.currency = this.fromAccountCurrency;
      transferData.fromAccountName = this.view.confirmation.lblValue.text;
      transferData.toAccountName = this.view.confirmation.lblValueTo.text;

      transferData.action = action;
      transferData.dueDate = this.dueShownDate;
      transferData.dueAmount = this.dueAmount;
      transferData.balAmount = obj.remainingAmount;
      this.presenter.createTransaction(transferData, false);
    },
    returnCurrencyCode: function (currencySymbol) {
      return applicationManager.getFormatUtilManager().getCurrencySymbolCode(currencySymbol);
    },
    /**
    *  Success Callback for Pay Due Amount
     * @member frmPayDueAmountController
     * @param {Object} data
     * @param {String} response
     * @returns {void} - None
     * @throws {void} - None
     */
    successPayDueAmount: function (data, refId) {
      if (kony.application.getCurrentBreakpoint() === 640) {
                 this.view.lblAcknowledgementTitle.setVisibility(false);
                // this.view.lblAcknowledgementTitle.setVisibility(true);
                // this.view.lblAcknowledgementTitle.text = kony.i18n.getLocalizedString("i18n.payments.LoanAcknowledgment");
        this.view.acknowledgment.confirmHeaders.lblHeading.text = kony.i18n.getLocalizedString("i18n.konybb.common.Acknowledgement");
        this.view.confirmDialog.confirmHeaders.lblHeading.text = kony.i18n.getLocalizedString("i18n.transfers.YourTransactionDetails");
      } else {
        this.view.lblAcknowledgementTitle.setVisibility(true);
        this.view.lblAcknowledgementTitle.text = kony.i18n.getLocalizedString("i18n.payments.LoanAcknowledgment");
        this.view.acknowledgment.confirmHeaders.lblHeading.text = kony.i18n.getLocalizedString("i18n.konybb.common.Acknowledgement");
        this.view.confirmDialog.confirmHeaders.lblHeading.text = kony.i18n.getLocalizedString("i18n.transfers.YourTransactionDetails");
      }
      this.showAcknowledgementLoanPayOff();
      this.view.flxMainAcknowledgment.setVisibility(true);
      if (applicationManager.getConfigurationManager().showLoanUpdateDisclaimer === "true") {
        this.view.acknowledgment.lblTransactionMessage.setVisibility(true);
      } else {
        this.view.acknowledgment.lblTransactionMessage.setVisibility(false);
      }
      this.view.acknowledgment.lblTransactionMessage.text = kony.i18n.getLocalizedString("i18n.loanpay.transactionSuccess");
      this.view.acknowledgment.flxBalance.setVisibility(false);
      this.view.acknowledgment.lblRefrenceNumberValue.text = refId;
      this.view.confirmDialog.lblValue.text = data.fromAccountName;
      this.view.confirmDialog.lblValueTo.text = data.toAccountName;
      this.view.confirmDialog.lblKeyAmount.text = kony.i18n.getLocalizedString("i18n.transfers.lblAmount") + "(" + this.view.PayDueAmount.lblDollar.text + ")" + ":";
      this.view.confirmDialog.lblValueAmount.text = CommonUtilities.formatCurrencyWithCommas(data.amount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(data.toAccount.currencyCode));
      this.view.confirmDialog.lblValueDate.text = data.sendOnDate;
      if (data.paymentReference) {
        this.view.confirmDialog.flxContainerDescription.setVisibility(true);
        this.view.confirmDialog.lblValueDescription.text = data.paymentReference;
      } else {
        this.view.confirmDialog.flxContainerDescription.setVisibility(false);
      }
      if (payDuePartial == 1) {
        this.view.confirmDialog.flxPartial.setVisibility(true);
        this.view.confirmDialog.flxContainerBillAmount.setVisibility(false);
        this.view.confirmDialog.lblKeyBalanceAmount.text = kony.i18n.getLocalizedString("i18n.transfers.lblDate");
        this.view.confirmDialog.lblValueBalanceAmount.text = data.dueDate;
        this.view.confirmDialog.lblKeyPayDate.text = kony.i18n.getLocalizedString("i18n.payments.yourPaymentDateWithColon");
        this.view.confirmDialog.lblValuePayDate.text = data.sendOnDate;
        this.view.confirmDialog.lblValuePaying.text = CommonUtilities.formatCurrencyWithCommas(data.amount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(data.toAccount.currencyCode));
      } else {
        this.view.confirmDialog.flxPartial.setVisibility(false);
        this.view.confirmDialog.flxContainerBillAmount.setVisibility(true);
      }
      FormControllerUtility.hideProgressBar(this.view);
      this.initializeResponsiveViews();
    },
    /**
    *  Success Callback for Pay Other Amount
     * @member frmPayDueAmountController
     * @param {Object} data
     * @param {String} response
     * @returns {void} - None
     * @throws {void} - None
     */
    successPayOtherAmount: function (data, refId) {
      if (kony.application.getCurrentBreakpoint() === 640) {
                this.view.lblAcknowledgementTitle.setVisibility(false);
                // this.view.lblAcknowledgementTitle.setVisibility(true);
                // this.view.lblAcknowledgementTitle.text = kony.i18n.getLocalizedString("i18n.payments.LoanAcknowledgment");
                this.view.acknowledgment.confirmHeaders.lblHeading.text = kony.i18n.getLocalizedString("i18n.konybb.common.Acknowledgement");
                this.view.confirmDialog.confirmHeaders.lblHeading.text = kony.i18n.getLocalizedString("i18n.transfers.YourTransactionDetails");
            } else {
                this.view.lblAcknowledgementTitle.setVisibility(true);
                this.view.lblAcknowledgementTitle.text = kony.i18n.getLocalizedString("i18n.payments.LoanAcknowledgment");
                this.view.acknowledgment.confirmHeaders.lblHeading.text = kony.i18n.getLocalizedString("i18n.konybb.common.Acknowledgement");
                this.view.confirmDialog.confirmHeaders.lblHeading.text = kony.i18n.getLocalizedString("i18n.transfers.YourTransactionDetails");
            }
            this.showAcknowledgementLoanPayOff();
            this.view.flxMainAcknowledgment.setVisibility(true);
            if (applicationManager.getConfigurationManager().showLoanUpdateDisclaimer === "true") {
                this.view.acknowledgment.lblTransactionMessage.setVisibility(true);
            } else {
                this.view.acknowledgment.lblTransactionMessage.setVisibility(false);
            }
            this.view.acknowledgment.lblTransactionMessage.text = kony.i18n.getLocalizedString("i18n.loanpay.transactionSuccess");
            this.view.acknowledgment.flxBalance.setVisibility(false);
            this.view.acknowledgment.lblRefrenceNumberValue.text = refId;
            this.view.confirmDialog.lblKeyAmount.text = kony.i18n.getLocalizedString("i18n.transfers.lblAmount") + "(" + this.view.PayDueAmount.lblDollar.text + ")" + ":";
            this.view.confirmDialog.lblValue.text = data.fromAccountName;
            this.view.confirmDialog.lblValueTo.text = data.toAccountName;
            this.view.confirmDialog.lblValueAmount.text = CommonUtilities.formatCurrencyWithCommas(data.amount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(data.toAccount.currencyCode));
            this.view.confirmDialog.lblValueDate.text = data.sendOnDate;
            if (data.paymentReference) {
                this.view.confirmDialog.flxContainerDescription.setVisibility(true);
                this.view.confirmDialog.lblValueDescription.text = data.paymentReference;
            } else {
                this.view.confirmDialog.flxContainerDescription.setVisibility(false);
            }
            if (payOtherPartial == 0) {
                if (payDuePartial === 0) {
                    this.view.confirmDialog.flxPartial.setVisibility(false);
                    this.view.confirmDialog.flxContainerBillAmount.setVisibility(true);
                } else {
                    this.view.confirmDialog.flxPartial.setVisibility(true);
                    this.view.confirmDialog.flxContainerBillAmount.setVisibility(true);
                    this.view.confirmDialog.lblKeyBillAmount.text = kony.i18n.getLocalizedString("i18n.payments.currentDue");
                    this.view.confirmDialog.lblValueBillAmount.text = CommonUtilities.formatCurrencyWithCommas(data.dueAmount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(data.toAccount.currencyCode));
                    this.view.confirmDialog.lblValuePaying.text = CommonUtilities.formatCurrencyWithCommas(data.amount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(data.toAccount.currencyCode));
                    this.view.confirmDialog.lblKeyBalanceAmount.text = kony.i18n.getLocalizedString("i18n.PayDueAmount.BalanceAmount");
                    this.view.confirmDialog.lblValueBalanceAmount.text = CommonUtilities.formatCurrencyWithCommas(data.balAmount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(data.toAccount.currencyCode));
                    this.view.confirmDialog.lblKeyPayDate.text = kony.i18n.getLocalizedString("i18n.StopCheckPayments.Date");
                    this.view.confirmDialog.lblValuePayDate.text = data.dueDate;
                }
            } else {
                if (payDuePartial == 0) {
                    this.view.confirmDialog.flxPartial.setVisibility(true);
                    this.view.confirmDialog.flxContainerBillAmount.setVisibility(false);
                    this.view.confirmDialog.lblKeyBalanceAmount.text = kony.i18n.getLocalizedString("i18n.transfers.lblDate");
                    this.view.confirmDialog.lblValueBalanceAmount.text = data.dueDate;
                    this.view.confirmDialog.lblKeyPayDate.text = kony.i18n.getLocalizedString("i18n.payments.yourPaymentDateWithColon");
                    this.view.confirmDialog.lblValuePaying.text = CommonUtilities.formatCurrencyWithCommas(data.amount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(data.toAccount.currencyCode));
                    this.view.confirmDialog.lblValuePayDate.text = data.sendOnDate;
                }
            }
            FormControllerUtility.hideProgressBar(this.view);
            this.initializeResponsiveViews();
        },
        /**
         *  Set updated account value for From Account on acknowledgement screen
         * @member frmPayDueAmountController
         * @param {Object} account - from Account
         * @returns {void} - None
         * @throws {void} - None
         */
        updateAccountDetails: function(account) {
            account = account[0];
            this.view.acknowledgment.lblAccType.text = account.accountName;
            this.view.acknowledgment.lblBalance.text = CommonUtilities.formatCurrencyWithCommas(account.availableBalance, false, this.view.PayDueAmount.lblDollar.text);
            this.view.confirmDialog.lblValue.text = account.accountName + " ..." + account.accountID.slice(-4) + " " + this.getDisplayBalance(account);
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
        },
        /**
         *  Set updated account value for To Account on acknowledgement screen
         * @member frmPayDueAmountController
         * @param {Object} account - to Account
         * @returns {void} - None
         * @throws {void} - None
         */
        updateToAccountDetails: function(account) {
            account = account[0];
            this.view.confirmDialog.lblValueTo.text = account.accountName + " ..." + account.accountID.slice(-4) + " " + this.getDisplayToBalance(account);
            this.view.forceLayout();
        },
        /**
         *  Show confirmation for Pay other amount
         * @member frmPayDueAmountController
         * @param {Object} obj stores trannsaction details
         * @returns {void} - None
         * @throws {void} - None
         */
        showConfirmationPayOtherAmount: function(obj) {
            var scopeObj = this;
            var extraData = {};
            this.view.confirmation.flxWrapper.setVisibility(true);
            this.view.confirmation.flxMainWrapper.setVisibility(false);
            this.view.confirmation.flxContainerPenaltyAmount.setVisibility(false);
            this.view.confirmation.flxContainerDescription.setVisibility(false);
            var amountLabel = kony.i18n.getLocalizedString("i18n.transfers.lblAmount") + "(" + this.view.PayDueAmount.lblDollar.text + ")";
            var data = {};
            let fromLabel = kony.i18n.getLocalizedString("i18n.transfers.lblFrom");
            let toLabel = kony.i18n.getLocalizedString("i18n.transfers.lblTo");
            let dateLabel = kony.i18n.getLocalizedString("kony.mb.transfers.Date");
            let notesLabel = kony.i18n.getLocalizedString("i18n.transfers.Description");
            let paylabel = kony.i18n.getLocalizedString("i18n.PayDueAmount.YouarePaying");
            let dueLabel = kony.i18n.getLocalizedString("i18n.payments.dueDateWithColon");
            let yourPayLabel = kony.i18n.getLocalizedString("i18n.payments.yourPaymentDateWithColon");
            let dateColonLabel = kony.i18n.getLocalizedString("i18n.StopCheckPayments.Date");
            let billAmountLabel = kony.i18n.getLocalizedString("i18n.PayDueAmount.YourBillAmount");
            let balanceAmountLabel = kony.i18n.getLocalizedString("i18n.PayDueAmount.BalanceAmount");
            let currentDueLabel = kony.i18n.getLocalizedString("i18n.payments.currentDue");
            data[fromLabel] = obj.fromAccount;
            data[toLabel] = obj.toAccount;
            data[dateLabel] = scopeObj.presenter.getFormattedDateString(scopeObj.view.PayDueAmount.CalendarSendDate.formattedDate);
            data[amountLabel] = CommonUtilities.formatCurrencyWithCommas(obj.payment, false, this.view.PayDueAmount.lblDollar.text);
            data[notesLabel] = obj.description;
            if (scopeObj.getDateObject(obj.date).getTime() > scopeObj.getDateObject(this.dueShownDate).getTime()) {
                scopeObj.view.confirmation.flxError.setVisibility(true);
                scopeObj.view.confirmation.flxContainerPartialDate.setVisibility(false);
                scopeObj.view.confirmation.lblError.text = kony.i18n.getLocalizedString("i18n.payments.payDueConfirmationErrorMessage");
                payDuePartial = 0;
                payOtherPartial = 1;
                extraData = {};
                extraData[paylabel] = CommonUtilities.formatCurrencyWithCommas(obj.payment, false, this.view.PayDueAmount.lblDollar.text);
                extraData[dueLabel] = scopeObj.presenter.getFormattedDateString(this.dueDate);
                extraData[yourPayLabel] = obj.date;
            } else {
                scopeObj.view.confirmation.flxContainerPartialDate.setVisibility(true);
                extraData = {};
                extraData[currentDueLabel] = CommonUtilities.formatCurrencyWithCommas(obj.amount, false, this.view.PayDueAmount.lblDollar.text);
                extraData[paylabel] = CommonUtilities.formatCurrencyWithCommas(obj.payment, false, this.view.PayDueAmount.lblDollar.text);
                extraData[balanceAmountLabel] = CommonUtilities.formatCurrencyWithCommas(obj.remainingAmount, false, this.view.PayDueAmount.lblDollar.text);
                extraData[dateColonLabel] = this.dueShownDate;
                if (obj.remainingAmount !== "0.00") {
                    payOtherPartial = 0;
                    payDuePartial = 1;
                    scopeObj.view.confirmation.flxError.setVisibility(true);
                    scopeObj.view.confirmation.lblError.text = kony.i18n.getLocalizedString("i18n.payments.partialPaymentMessage");
                } else {
                    payOtherPartial = 0;
                    payDuePartial = 0;
                    scopeObj.view.confirmation.flxError.setVisibility(false);
                    //scopeObj.view.confirmation.lblError.text = "You are making a partial payment of your due amount.";
                }
            }
            scopeObj = this;
            var actions = {
                "cancel": function() {
                    scopeObj.showQuitPopUp();
                },
                "modify": function() {
                    scopeObj.showPayDueAmount();
					scopeObj.view.lblHeading.setActive(true);
                },
                "confirm": function() {
                    scopeObj.successData = obj;
                    scopeObj.confirmPayDueAmount(obj, "payOtherAmount");
                }
            };
            this.setConfirmationValues(data, extraData, actions);
            this.showView(["flxConfirmation"]);
            this.initializeResponsiveViews();
        },
        /**
         *  Show acknowledgement for Pay Due amount
         * @member frmPayDueAmountController
         * @param {Object} obj stores trannsaction details
         * @param {boolean} scheduledFlag
         * @returns {void} - None
         * @throws {void} - None
         */
        showAcknowledgementPayDueAmount: function(obj, scheduledFlag) {
            var scopeObj = this;
            var amountLabel = kony.i18n.getLocalizedString("i18n.transfers.lblAmount") + "(" + this.view.PayDueAmount.lblDollar.text + ")";
            var data = {
                "message": kony.i18n.getLocalizedString("i18n.loanpay.transactionSuccess"),
                "image": ViewConstants.IMAGES.SUCCESS_GREEN,
                "referenceNumber": " ",
                "accountType": " ",
                "amount": " ",
            };
            let fromLabel = kony.i18n.getLocalizedString("i18n.transfers.lblFrom");
            let toLabel = kony.i18n.getLocalizedString("i18n.transfers.lblTo");
            let dateLabel = kony.i18n.getLocalizedString("kony.mb.transfers.Date");
            let notesLabel = kony.i18n.getLocalizedString("kony.mb.Accounts.Description");
            var details = {};
            details[fromLabel] = obj.fromAccount;
            details[toLabel] = obj.toAccount;
            details[dateLabel] = obj.date;
            details[amountLabel] = scopeObj.dueAmount;
            details[notesLabel] = obj.description;
            if (scheduledFlag === "true") {
                data.message = kony.i18n.getLocalizedString("i18n.loanpay.scheduledTransaction") + obj.date;
            }
            this.setAcknowledgementValues(data, details, {});
            this.showView(["flxAcknowledgement"]);
        },
        /**
         *  Show acknowledgement for Pay other amount
         * @member frmPayDueAmountController
         * @param {Object} obj stores trannsaction details
         * @param {boolean} scheduledFlag
         * @returns {void} - None
         * @throws {void} - None
         */
        showAcknowledgementPayOtherAmount: function(obj, scheduledFlag) {
            var scopeObj = this;
            var extraData = {};
            var amountLabel = kony.i18n.getLocalizedString("i18n.transfers.lblAmount") + "(" + this.view.PayDueAmount.lblDollar.text + ")";
            var data = {
                "message": kony.i18n.getLocalizedString("i18n.loanpay.transactionSuccess"),
                "image": ViewConstants.IMAGES.SUCCESS_GREEN,
                "referenceNumber": " ",
                "accountType": " ",
                "amount": " ",
            };
            let fromLabel = kony.i18n.getLocalizedString("i18n.transfers.lblFrom");
            let toLabel = kony.i18n.getLocalizedString("i18n.transfers.lblTo");
            let dateLabel = kony.i18n.getLocalizedString("kony.mb.transfers.Date");
            let notesLabel = kony.i18n.getLocalizedString("kony.mb.Accounts.Description");
            var details = {};
            details[fromLabel] = obj.fromAccount;
            details[toLabel] = obj.toAccount;
            details[dateLabel] = scopeObj.presenter.getFormattedDateString(scopeObj.nextPaymentDate);
            details[amountLabel] = obj.amount;
            details[notesLabel] = obj.description;
            let paylabel = kony.i18n.getLocalizedString("i18n.PayDueAmount.YouarePaying");
            let dueLabel = kony.i18n.getLocalizedString("i18n.payments.dueDateWithColon");
            let yourPayLabel = kony.i18n.getLocalizedString("i18n.payments.yourPaymentDateWithColon");
            let dateColonLabel = kony.i18n.getLocalizedString("i18n.StopCheckPayments.Date");
            let billAmountLabel = kony.i18n.getLocalizedString("i18n.PayDueAmount.YourBillAmount");
            let balanceAmountLabel = kony.i18n.getLocalizedString("i18n.PayDueAmount.BalanceAmount");
            if (scopeObj.getDateObject(obj.date).getTime() < scopeObj.getDateObject(this.dueDate).getTime()) {
                extraData = {};
                extraData[billAmountLabel] = CommonUtilities.formatCurrencyWithCommas(obj.amount, false, this.view.PayDueAmount.lblDollar.text);
                extraData[paylabel] = CommonUtilities.formatCurrencyWithCommas(parseFloat(obj.payment, false, this.view.PayDueAmount.lblDollar.text));
                extraData[balanceAmountLabel] = CommonUtilities.formatCurrencyWithCommas(obj.remainingAmount, false, this.view.PayDueAmount.lblDollar.text);
                extraData[dateColonLabel] = obj.date;
            } else {
                extraData = {};
                extraData[paylabel] = CommonUtilities.formatCurrencyWithCommas(parseFloat(obj.payment), false, this.view.PayDueAmount.lblDollar.text);
                extraData[dueLabel] = scopeObj.presenter.getFormattedDateString(scopeObj.nextPaymentDate);
                extraData[yourPayLabel] = obj.date;
                extraData["Late Payment Penalty:"] = CommonUtilities.formatCurrencyWithCommas(obj.penalty, false, this.view.PayDueAmount.lblDollar.text);
            }
            if (scheduledFlag === "true") {
                data.message = kony.i18n.getLocalizedString("i18n.loanpay.scheduledTransaction") + obj.date;
            }
            this.setAcknowledgementValues(data, details, extraData);
            this.showView(["flxAcknowledgement"]);
        },
        /**
         *  Show Loan Pay Off Confirmation
         * @member frmPayDueAmountController
         * @param {void} -None
         * @returns {void} - None
         * @throws {void} - None
         */
        showConfirmationLoanPayOff: function() {
            var scopeObj = this;
            this.view.flxBottom.setVisibility(false);
            var data = {
                "From": "Personal Checking….1234",
                "To": "My Car Loan Account…XXXX9870",
                "PayOff Amount": "$1000",
                "Actual Loan End Date": "07/15/2017",
                "Payment Date": "07/15/2017",
                "Penalty Amount": "$1000",
                "Note": "Car Loan EMI for July"
            };
            scopeObj = this;
            var actions = {
                "cancel": function() {
                    scopeObj.showQuitPopUp();
                },
                "modify": function() {
                    scopeObj.showLoanPayOff();
                },
                "confirm": function() {
                    scopeObj.showAcknowledgementLoanPayOff();
                }
            };
            this.setConfirmationValues(data, {}, actions);
            this.showView(["flxConfirmation"]);
            this.initializeResponsiveViews();
        },
        /**
         *  Show Loan Pay Off Acknowledgement
         * @member frmPayDueAmountController
         * @param {void} -None
         * @returns {void} - None
         * @throws {void} - None
         */
        showAcknowledgementLoanPayOff: function() {
            var scopeObj = this;
            this.showView(["flxAcknowledgement"]);
            this.view.customheadernew.btnSkipNav.onClick = function() {
                this.view.lblAcknowledgementTitle.setActive(true);
            };
        },
        /**
         *  Show Pay Due Amount
         * @member frmPayDueAmountController
         * @param {void} -None
         * @returns {void} - None
         * @throws {void} - None
         */
        showPayDueAmount: function() {
            this.validateDate();
            this.view.PayDueAmount.flxInfoDueAmount.isVisible = false;
            this.view.flxSecondaryActions.setVisibility(false);
            this.showView(["flxPayDueAmount", "flxPrimaryActions"]);
            if (kony.application.getCurrentBreakpoint() === 640 || kony.application.getCurrentBreakpoint() === 1024) {
                this.view.flxPrimaryActions.isVisible = false;
            } else {
                this.view.flxPrimaryActions.isVisible = true;
            }
            this.initializeResponsiveViews();
        },
        /**
         *  Show loan pay off
         * @member frmPayDueAmountController
         * @param {void} -None
         * @returns {void} - None
         * @throws {void} - None
         */
        showLoanPayOff: function() {
            var scopeObj = this;
            this.view.flxBottom.setVisibility(true);
            this.showView(["flxLoanPayOff", "flxPrimaryActions", "flxSecondaryActions"]);
            this.view.forceLayout();
            this.initializeResponsiveViews();
			this.view.customheadernew.btnSkipNav.onClick = this.btnskipNavLOanPayoff;
				 this.view.flxFormContent.scrollToWidget(this.view.flxFormContent.flxscrollassist);
					
        },
        /**
         *  Show quit popup
         * @member frmPayDueAmountController
         * @param {void} -None
         * @returns {void} - None
         * @throws {void} - None
         */
        showQuitPopUp: function() {
            //var height = this.view.flxHeader.frame.height + this.view.flxContainer.frame.height;
            //this.view.flxQuitPayment.height = height + "dp";
            this.view.flxQuitPaymentParent.isVisible = true;
            this.view.flxQuitPayment.isVisible = true;
            this.view.CustomPopup1.lblHeading.setActive(true);
        },
        /**
         *  Triggered on No of Quit Pop up
         * @member frmPayDueAmountController
         * @param {void} -None
         * @returns {void} - None
         * @throws {void} - None
         */
        quitPopUpNo: function() {
            this.view.flxQuitPaymentParent.setVisibility(false);
            this.view.flxQuitPayment.setVisibility(false);
            this.view.confirmation.confirmButtons.btnCancel.setFocus(true);
        },
        /**
         * Triggered on Yes of Quit Pop up
         * @member frmPayDueAmountController
         * @param {void} -None
         * @returns {void} - None
         * @throws {void} - None
         */
        quitPopUpYes: function() {
            this.quitPopUpNo();
            //this.backToAccountDetails();
            this.backToAccountLandingPage();
        },
        /**
         * Function to load all accounts
         * @member frmPayDueAmountController
         * @param {void} -None
         * @returns {void} - None
         * @throws {void} - None
         */
        loadAccounts: function() {
            var scopeObj = this;
            scopeObj.presenter.fetchCheckingAccounts();
        },
        /**
         * Callback to set masterdata for TO FROM account, to set payment accounts
         * @member frmPayDueAmountController
         * @param {Array} response
         * @returns {void} - None
         * @throws {void} - None
         */
        accountsListCallback: function(response) {
            this.initListboxSelectionAction(response);
            this.updateListBox(response);
            this.updateToListBox(response);
            this.updateTransferAccountList(response);
            //this.presenter.fetchUpdatedAccountDetails(this.view.PayDueAmount.listbxFrom.selectedKey, "populateAccountData");
            this.view.PayDueAmount.tbxAmount.setEnabled(false);
        },
        initListboxSelectionAction: function(accounts) {
            this.view.PayDueAmount.listbxFrom.onSelection = this.updateFromAccountValue.bind(this, accounts);
            this.view.PayDueAmount.listbxTo.onSelection = this.updateToAccountValue.bind(this, accounts);
            this.view.PayDueAmount.CalendarSendDate.onSelection = this.setSkinToFlex.bind(this, this.view.PayDueAmount.flxCalender, this.view.PayDueAmount.flxError);
        },
        /**
         * Function to set skin to calendar widget,
         * @member frmPayDueAmountController
         * @param {}
         * @returns {void} - None
         * @throws {void} - None
         */
        setSkinToListbox: function(widgetId, errorWidget) {
            widgetId.skin = ViewConstants.SKINS.LOANS_LISTBOX_NOERROR;
            errorWidget.setVisibility(false);
            this.initializeResponsiveViews();
        },
        /**
         * Function to set skin to calendar widget,
         * @member frmPayDueAmountController
         * @param {}
         * @returns {void} - None
         * @throws {void} - None
         */
        setSkinToFlex: function(widgetId, errorWidget) {
            widgetId.skin = ViewConstants.SKINS.ACCOUNT_NUMBER_TEXTBOX;
            widgetId.focusSkin = ViewConstants.SKINS.EDITABLE_TEXTBOX;
            widgetId.hoverSkin = ViewConstants.SKINS.EDITABLE_TEXTBOX;
            errorWidget.setVisibility(false);
            this.initializeResponsiveViews();
        },
        /**
         * Function to filter accounts for FROM ListBox,
         * @member frmPayDueAmountController
         * @param {Array} fromAccounts
         * @returns {void} - None
         * @throws {void} - None
         */
        updateListBox: function(fromAccounts) {
            var accounts = [];
            for (var i = 0, j = 0; i < fromAccounts.length; i++)
                if (fromAccounts[i].accountType !== "Loan" && fromAccounts[i].accountType !== "Mortgage" && fromAccounts[i].accountType !== "CreditCard") {
                    accounts[j] = fromAccounts[i];
                    j++;
                }
                //this.view.LoanPayOff.listbxFrom.masterData = this.showAccountsForSelection(accounts);
            this.view.LoanPayOff.listbxFromDetails.masterData = this.showAccountsForSelection(accounts);
            this.view.PayDueAmount.listbxFrom.masterData = this.showAccountsForSelection(accounts);
            if (this.fromAccount) {
                //this.view.LoanPayOff.listbxFrom.selectedKey = this.fromAccount;
                this.view.LoanPayOff.listbxFromDetails.selectedKey = this.fromAccount;
                this.view.PayDueAmount.listbxFrom.selectedKey = this.fromAccount;
                this.updateFromAccountValue(fromAccounts);
            } else {
                this.view.LoanPayOff.listbxFromDetails.selectedKey = accounts[0].accountID;
                //this.view.LoanPayOff.listbxFrom.selectedKey = accounts[0].accountID;
                this.view.PayDueAmount.listbxFrom.selectedKey = accounts[0].accountID;
                this.updateFromAccountValue(fromAccounts);
            }
        },
        /**
         * Function to filter accounts for TO ListBox
         * @member frmPayDueAmountController
         * @param {Array} fromAccounts
         * @returns {void} - None
         * @throws {void} - None
         */
        updateToListBox: function(fromAccounts) {
            var accounts = [];
            for (var i = 0, j = 0; i < fromAccounts.length; i++)
                if (fromAccounts[i].accountType === "Loan") {
                    if (fromAccounts[i].principalBalance > 0) {
                        accounts[j] = fromAccounts[i];
                        j++;
                    }
                }
            if (accounts.length > 0) {
                //this.view.LoanPayOff.listbxTo.masterData = this.showAccountsForSelectionToBox(accounts);
                //this.view.LoanPayOff.listbxTo.selectedKey = this.savedAccountID;
            }
            var accounts2 = [];
            for (var k = 0, l = 0; k < fromAccounts.length; k++)
                if (fromAccounts[k].accountType === "Loan" || fromAccounts[k].accountType === "Mortgage") {
                    if (fromAccounts[k].currentAmountDue > 0 && fromAccounts[k].principalBalance > 0) {
                        accounts2[l] = fromAccounts[k];
                        l++;
                    }
                }
            if (accounts2.length > 0) {
                this.view.PayDueAmount.listbxTo.masterData = this.showAccountsForSelectionToBox(accounts2);
                this.view.PayDueAmount.listbxTo.selectedKey = this.savedAccountID;
            }
            var toAccount = this.getAccount(fromAccounts, this.savedAccountID);
            this.setToAccountCurrency(toAccount);
        },
        getAccount: function(data, value) {
            data = data.filter(function(item) {
                return item.accountID === value
            });
            return data[0];
        },
        /**
         * Function to return master data for "For" listBox
         * @member frmPayDueAmountController
         * @param {Array} presentAccounts eligible accounts
         * @returns {void} - None
         * @throws {void} - None
         */
        showAccountsForSelection: function(presentAccounts) {
            var list = [];
            for (var i = 0; i < presentAccounts.length; i++) {
                var tempList = [];
                tempList.push(presentAccounts[i].accountID);
                var tempAccountNumber = presentAccounts[i].accountID;
                tempList.push(presentAccounts[i].accountName + " ..." + tempAccountNumber.slice(-4) + " " + this.getDisplayBalance(presentAccounts[i]));
                list.push(tempList);
            }
            return list;
        },
        /**
         * Get display balance for To ListBox, based on context
         * @member frmPayDueAmountController
         * @param {Object} account account
         * @returns {void} - None
         * @throws {void} - None
         */
        getDisplayToBalance: function(account) {
            if (this.loanContext === "Loan Payoff") {
                return "(" + kony.i18n.getLocalizedString('i18n.loan.payOffAmount') + ":" + CommonUtilities.formatCurrencyWithCommas(account.payoffAmount, false, account.currencyCode) + ")";
            } else if (this.loanContext === "Loan Due") {
                return "(" + kony.i18n.getLocalizedString('i18n.loan.dueAmount') + ":" + CommonUtilities.formatCurrencyWithCommas(account.currentAmountDue, false, account.currencyCode) + ")";
            }
        },
        /**
         * Function to return master data for To listBox
         * @member frmPayDueAmountController
         * @param {Array} presentAccounts eligible accounts
         * @returns {void} - None
         * @throws {void} - None
         */
        showAccountsForSelectionToBox: function(presentAccounts) {
            var list = [];
            for (var i = 0; i < presentAccounts.length; i++) {
                var tempList = [];
                tempList.push(presentAccounts[i].accountID);
                var tempAccountNumber = presentAccounts[i].accountID;
                tempList.push(presentAccounts[i].accountName + " ..." + tempAccountNumber.slice(-4) + " " + this.getDisplayToBalance(presentAccounts[i]));
                list.push(tempList);
            }
            return list;
        },
        /**
         * Function to get display balance in (Available: $123) format
         * @member frmPayDueAmountController
         * @param {Object} account account
         * @returns {void} - None
         * @throws {void} - None
         */
        getDisplayBalance: function(account) {
            return "(" + kony.i18n.getLocalizedString('i18n.common.available') + ":" + CommonUtilities.formatCurrencyWithCommas(account.availableBalance, false, account.currencyCode) + ")";
        },
        /**
         * Function to set Data initially
         * @member frmPayDueAmountController
         * @param {Object} data to initialize from account
         * @returns {void} - None
         * @throws {void} - None
         */
        //setdatatoform is by comparing the loan context
        setDataToForm: function(data) {
            var scopeObj = this;
            this.view.LoanPayOff.tbxOptional.maxTextLength = 150;
            this.view.PayDueAmount.tbxOptional.maxTextLength = 150;
            this.savedAccountID = data.accountID;
            this.flagPayOff = true;
            if (data.closingDate === null || data.closingDate === undefined || data.principalBalance === null || data.principalBalance === undefined || data.payOffCharge === null || data.payOffCharge === undefined) {
                this.flagPayOff = false;
            }
            this.view.PayDueAmount.tbxAmount.text = "";
            this.view.PayDueAmount.lblDollar.text = "";
            if (this.loanContext === "Loan Payoff") {
                if (kony.application.getCurrentBreakpoint() === 640) {
                    this.view.flxBottom.setVisibility(false);
                }
                FormControllerUtility.showProgressBar(this.view);
                //comesin only if loancontext is loan payoff
                this.view.flxPayDueAmount.setVisibility(false);
                this.view.flxLoanPayOff.setVisibility(true);
                this.view.flxSeparatorPrimaryActions.setVisibility(true);
                this.view.flxSecondaryActions.setVisibility(true);
                response = data;
                this.view.flxSecondaryActions.btnPayDueAccount.onClick = this.secondaryaction;
                this.view.flxPayDueAmount.setVisibility(false);
                this.view.flxLoanPayOff.setVisibility(true);
                this.view.lblHeading1.setVisibility(true);
                this.view.LoanPayOff.flxHeader.setVisibility(false);
                this.view.flxConfirmation.lblConfirmationTitle.setVisibility(false);
                this.view.flxAcknowledgement.lblAcknowledgementTitle.setVisibility(false);
                CommonUtilities.enableButton(this.view.LoanPayOff.btnContinueDetails);
                this.view.LoanPayOff.lblTotalPrincipalValue.text = "";
                this.view.LoanPayOff.lblTotalInterestValue.text = "";
                this.view.LoanPayOff.tbxLoanPayOffAmountValue.text = "";
                this.view.LoanPayOff.tbxPayoffPenalityValue.text = "";
                this.view.LoanPayOff.lblActualLoanEndDateValue.text = "";
                this.view.LoanPayOff.lblCurrentDueValue.text = "";
                this.view.LoanPayOff.lblCurrentBalanceValue.text = "";
                this.view.LoanPayOff.CalenderPayOffDate.dateFormat = applicationManager.getFormatUtilManager().getDateFormat();
                this.view.LoanPayOff.CalenderPayOffDate.dateComponents = CommonUtilities.getServerDateComponent();
                this.view.LoanPayOff.lblToValue.text = data.accountName;
                this.view.LoanPayOff.lblToValueDetails.text = data.nickName + " " + data.accountID;
                this.view.LoanPayOff.CalenderPayOffDate.onSelection = this.datechange;
                this.presenter.getTBankDate();
                //Presentation Call to call the simulation
                //this.presenter.simulation(input);
                var account = {
                    "accountID": data.accountID
                };
                this.presenter.payDueDetails(account, "toAccountDetails");
                this.view.LoanPayOff.btnContinueDetails.onClick = this.navigateToConfirmationLoanPayOff;
                this.view.LoanPayOff.tbxLoanPayOffAmountValue.setEnabled(false);
                this.view.LoanPayOff.tbxPayoffPenalityValue.setEnabled(false);
                this.view.LoanPayOff.listbxFromDetails.onSelection = this.checkError;
				this.view.LoanPayOff.flxImgInfoIcon1.accessibilityConfig = {
                                    "a11yLabel": "Pay-off penality " + "Information",
                                    "a11yARIA": {
                                        "role": "button",
                                        "aria-expanded": false,
                                        "tabindex": 0
                                    }
                                };
								
                scopeObj.view.LoanPayOff.AllForms.flxCross.accessibilityConfig = {
                            "a11yLabel": "close the information popup",
                            "a11yARIA": {
                                "role": "button",
                                "tabindex": 0
                            }
                        };
                // this.disableDaySelectionLoanPayOff(this.view.LoanPayOff.CalenderPayOffDate, this.view.LoanPayOff.tbxActualLoanEndDate.text);
                this.view.LoanPayOff.flxImgInfoIcon1.onClick = function() {
                        scopeObj.view.LoanPayOff.AllForms.setVisibility(true);
                    },
                    this.view.LoanPayOff.flxImgInfoIcon.setVisibility(false);
                // accessibility tab nav
                this.view.LoanPayOff.AllForms.flxInformationText.onKeyPress = function(eventObject, eventPayload) {
                        if (eventPayload.keyCode === 27) {
                            scopeObj.view.LoanPayOff.AllForms.setVisibility(false);
                            scopeObj.view.LoanPayOff.flxImgInfoIcon1.accessibilityConfig = {
                                "a11yLabel": "Pay-off penality " + "Information",
                                "a11yARIA": {
                                    "role": "button",
                                    "aria-expanded": false,
                                    "tabindex": 0
                                }
                            }
                            eventPayload.preventDefault();
                            scopeObj.view.LoanPayOff.flxImgInfoIcon1.setActive(true);
                        }
                        if (eventPayload.keyCode === 9) {
                            if (eventPayload.shiftKey) {
                                scopeObj.view.LoanPayOff.AllForms.setVisibility(false);
                                scopeObj.view.LoanPayOff.flxImgInfoIcon1.accessibilityConfig = {
                                    "a11yLabel": "Pay-off penality " + "Information",
                                    "a11yARIA": {
                                        "role": "button",
                                        "aria-expanded": false,
                                        "tabindex": 0
                                    }
                                }
                                eventPayload.preventDefault();
                                scopeObj.view.LoanPayOff.flxImgInfoIcon1.setActive(true);
                            } else {
                                scopeObj.view.LoanPayOff.AllForms.isVisible = false;
                                scopeObj.view.LoanPayOff.flxImgInfoIcon1.accessibilityConfig = {
                                    "a11yLabel": "Pay-off penality " + "Information",
                                    "a11yARIA": {
                                        "role": "button",
                                        "aria-expanded": false,
                                        "tabindex": 0
                                    }
                                }
                                eventPayload.preventDefault();
                                scopeObj.view.LoanPayOff.btnContinueDetails.setActive(true);
                            }
                        }
                    },
                    this.view.LoanPayOff.flxImgInfoIcon1.onKeyPress = function(eventObject, eventPayload) {
                        if (eventPayload.keyCode === 27) {
                            scopeObj.view.LoanPayOff.AllForms.setVisibility(false);
                            scopeObj.view.LoanPayOff.flxImgInfoIcon1.accessibilityConfig = {
                                "a11yLabel": "Pay-off penality " + "Information",
                                "a11yARIA": {
                                    "role": "button",
                                    "aria-expanded": false,
                                    "tabindex": 0
                                }
                            }
                            eventPayload.preventDefault();
                            scopeObj.view.LoanPayOff.flxImgInfoIcon1.setActive(true);
                        }
                        if (eventPayload.keyCode === 9) {
                            if (eventPayload.shiftKey) {
                                scopeObj.view.LoanPayOff.AllForms.setVisibility(false);
                                scopeObj.view.LoanPayOff.flxImgInfoIcon1.accessibilityConfig = {
                                    "a11yLabel": "Pay-off penality " + "Information",
                                    "a11yARIA": {
                                        "role": "button",
                                        "aria-expanded": false,
                                        "tabindex": 0
                                    }
                                }
                                eventPayload.preventDefault();
                                scopeObj.view.LoanPayOff.CalenderPayOffDate.setActive(true);
                            } else {
                                if (scopeObj.view.LoanPayOff.AllForms.isVisible) {
                                    eventPayload.preventDefault();
                                    scopeObj.view.LoanPayOff.AllForms.lblInfo.setActive(true);
                                } else {
                                    eventPayload.preventDefault();
                                    scopeObj.view.LoanPayOff.btnContinueDetails.setActive(true);
                                }
                            }
                        }
                    },
                    this.view.LoanPayOff.flxImgInfoIcon1.onClick = function() {
                        scopeObj.view.LoanPayOff.AllForms.setVisibility(true);
                        scopeObj.view.LoanPayOff.flxImgInfoIcon1.accessibilityConfig = {
                            "a11yLabel": "Pay-off penality " + "Information",
                            "a11yARIA": {
                                "role": "button",
                                "aria-expanded": true,
                                "tabindex": 0
                            }
                        }
                         scopeObj.view.LoanPayOff.AllForms.lblInfo.setActive(true);
                    },
                    this.view.LoanPayOff.AllForms.flxCross.onClick = function() {
                        scopeObj.view.LoanPayOff.AllForms.setVisibility(false);
                        scopeObj.view.LoanPayOff.flxImgInfoIcon1.accessibilityConfig = {
                            "a11yLabel": "Pay-off penality " + "Information",
                            "a11yARIA": {
                                "role": "button",
                                "aria-expanded": false,
                                "tabindex": 0
                            }
                        }
                        scopeObj.view.LoanPayOff.flxImgInfoIcon1.setActive(true);
                    }
                
            }
            
           
            if (this.loanContext === "Loan Due") {
				this.view.PayDueAmount.imgRadioPayDueAmount.src = ViewConstants.IMAGES.RADIO_BUTTON_ACTIVE;
            this.view.PayDueAmount.imgRadioPayOtherAmount.src = ViewConstants.IMAGES.RADIO_BTN_INACTIVE;
            if (data.nextPaymentAmount == "" || data.nextPaymentAmount == null) {
                data.nextPaymentAmount = "0.00";
            }
            var dummyId = CommonUtilities.getLastFourDigit(data.accountID);
            dummyId = "...." + dummyId;
            this.view.PayDueAmount.tbxTo.text = data.nickName + " " + dummyId;
            this.view.PayDueAmount.tbxTo.setEnabled(false);
            var account = {
                "accountID": data.accountID
            };
                this.presenter.getTBankDate();
                this.presenter.payDueDetails(account, "PayDue");
                this.view.PayDueAmount.tbxAmount.setEnabled(false);
                this.view.PayDueAmount.flxInfoDueAmount.setVisibility(false);
                this.penalty = data.lateFeesDue;
                this.dueAmount = parseFloat(data.nextPaymentAmount ? data.nextPaymentAmount : 0) + parseFloat(data.paymentDue ? data.paymentDue : 0);
                this.dueTotalAmount = data.paymentDue;
                this.dueCurrentAmount = data.nextPaymentAmount;
                this.dueDate = data.nextPaymentDate;
                this.availableBalance = data.availableBalance;
                this.view.PayDueAmount.flxInfoDueDate.setVisibility(false);
                this.view.PayDueAmount.flxError.setVisibility(false);
                this.view.PayDueAmount.lblDueDate.setVisibility(true);
                this.view.PayDueAmount.lblDueDate.text = "";
                var amount1 = applicationManager.getFormatUtilManager().deFormatAmount(data.payoffAmount);
                var amount2 = applicationManager.getFormatUtilManager().deFormatAmount(data.payOffCharge);
                this.fullPayOffAmount = Number(amount1) + Number(amount2);
                CommonUtilities.disableOldDaySelection(this.view.PayDueAmount.CalendarSendDate);
                this.view.PayDueAmount.AllForms.flxCross.onKeyPress = function(eventObject, eventPayload) {
                        if (eventPayload.keyCode === 27) {
                            scopeObj.view.PayDueAmount.AllForms.isVisible = false;
                            scopeObj.view.PayDueAmount.flxImgInfoIcon.accessibilityConfig = {
                                "a11yLabel": "Information",
                                "a11yARIA": {
                                    "role": "button",
                                    "aria-expanded": false,
                                    "tabindex": 0
                                }
                            }
                            eventPayload.preventDefault();
                            scopeObj.view.PayDueAmount.flxImgInfoIcon.setActive(true);
                        }
                        if (eventPayload.keyCode === 9) {
                            if (eventPayload.shiftKey) {
                                scopeObj.view.PayDueAmount.AllForms.isVisible = false;
                                scopeObj.view.PayDueAmount.flxImgInfoIcon.accessibilityConfig = {
                                    "a11yLabel": "Information",
                                    "a11yARIA": {
                                        "role": "button",
                                        "aria-expanded": false,
                                        "tabindex": 0
                                    }
                                }
                                eventPayload.preventDefault();
                                scopeObj.view.PayDueAmount.flxImgInfoIcon.setActive(true);
                            } else {
                                scopeObj.view.PayDueAmount.AllForms.isVisible = false;
                                scopeObj.view.PayDueAmount.flxImgInfoIcon.accessibilityConfig = {
                                    "a11yLabel": "Information",
                                    "a11yARIA": {
                                        "role": "button",
                                        "aria-expanded": false,
                                        "tabindex": 0
                                    }
                                }
                                eventPayload.preventDefault();
                                scopeObj.view.PayDueAmount.CalendarSendDate.setActive(true);
                            }
                        }
                    },
                    this.view.PayDueAmount.flxImgInfoIcon.onKeyPress = function(eventObject, eventPayload) {
                        if (eventPayload.keyCode === 27) {
                            scopeObj.view.PayDueAmount.AllForms.isVisible = false;
                            scopeObj.view.PayDueAmount.flxImgInfoIcon.accessibilityConfig = {
                                "a11yLabel": "Information",
                                "a11yARIA": {
                                    "role": "button",
                                    "aria-expanded": false,
                                    "tabindex": 0
                                }
                            }
                            eventPayload.preventDefault();
                            scopeObj.view.PayDueAmount.flxImgInfoIcon.setActive(true);
                        }
                        if (eventPayload.keyCode === 9) {
                            if (eventPayload.shiftKey) {
                                scopeObj.view.PayDueAmount.AllForms.isVisible = false;
                                scopeObj.view.PayDueAmount.flxImgInfoIcon.accessibilityConfig = {
                                    "a11yLabel": "Information",
                                    "a11yARIA": {
                                        "role": "button",
                                        "aria-expanded": false,
                                        "tabindex": 0
                                    }
                                }
                                eventPayload.preventDefault();
                                scopeObj.view.PayDueAmount.flxRadioPayOtherAmount.setActive(true);
                            } else {
                                if (scopeObj.view.PayDueAmount.AllForms.isVisible) {
                                    eventPayload.preventDefault();
                                    scopeObj.view.PayDueAmount.AllForms.lblInfo.setActive(true);
                                }
                            }
                        }
                    },
                    this.view.PayDueAmount.flxImgInfoIcon.onClick = function() {
                        scopeObj.view.PayDueAmount.AllForms.setVisibility(true);
                        scopeObj.view.PayDueAmount.flxImgInfoIcon.accessibilityConfig = {
                            "a11yLabel": "Information",
                            "a11yARIA": {
                                "role": "button",
                                "aria-expanded": true,
                                "tabindex": 0
                            }
                        }
                        scopeObj.view.PayDueAmount.flxImgInfoIcon.setActive(true);
						  if (kony.application.getCurrentBreakpoint() > 640) {
							scopeObj.view.PayDueAmount.AllForms.top = "0dp";
							scopeObj.view.PayDueAmount.AllForms.left = "0dp";
							scopeObj.view.PayDueAmount.flxRadioButtons.zIndex = 2000;
							scopeObj.view.PayDueAmount.flxRadioButtons.clipBounds = false;
						  }
						  else {
							scopeObj.view.PayDueAmount.AllForms.top = "20dp";
							scopeObj.view.PayDueAmount.AllForms.left = "0dp";
							scopeObj.view.PayDueAmount.flxRadioButtons.zIndex = 2000;
							scopeObj.view.PayDueAmount.flxRadioButtons.clipBounds = false;
						  }
                    },
                    this.view.PayDueAmount.AllForms.flxCross.onClick = function() {
                        scopeObj.view.PayDueAmount.AllForms.setVisibility(false);
                        scopeObj.view.PayDueAmount.flxImgInfoIcon.accessibilityConfig = {
                            "a11yLabel": "Information",
                            "a11yARIA": {
                                "role": "button",
                                "aria-expanded": false,
                                "tabindex": 0
                            }
                        }
                        scopeObj.view.PayDueAmount.flxImgInfoIcon.setActive(true);
                    }
            }
            this.view.forceLayout();
        },
        loanPayoffFunctionCall: function(date) {
            var scopeObj = this;
            var bankDate = date.currentWorkingDate || this.view.LoanPayOff.CalenderPayOffDate.formattedDate;
            if (date == true) {
                var caldate = bankDate.split("/");
                bankDate = caldate[2] + "-" + caldate[0] + "-" + caldate[1];
            }
            this.disableOldDaySelection(scopeObj.view.LoanPayOff.CalenderPayOffDate, bankDate);
            var effectiveDate = bankDate.split("-");
            effdate = effectiveDate[0] + effectiveDate[1] + effectiveDate[2];
            //this.view.LoanPayOff.CalenderPayOffDate.dateComponents = date.currentWorkingDate;
            var input = {
                "activityId": "LENDING-CALCULATE-PAYOFF",
                "productId": response.productId.toUpperCase(),
                "effectiveDate": effdate,
                "arrangementId": response.arrangementId
            };
            //Presentation Call to call the simulation
            this.presenter.simulation(input);
        },
        setCalendardate: function(date) {
            var scopeObj = this;
            var bankDate = date.currentWorkingDate;
            if (date == true) {
                var caldate = bankDate.split("/");
                bankDate = caldate[2] + "-" + caldate[0] + "-" + caldate[1];
            }
            this.disableOldDaySelection(scopeObj.view.PayDueAmount.CalendarSendDate, bankDate);
        },
        disableOldDaySelection: function(widgetId, bankDate, numberOfdays) {
            var dateFormat = applicationManager.getFormatUtilManager().getDateFormat();
            var numberOfYearsAllowed = OLBConstants.CALENDAR_ALLOWED_FUTURE_YEARS;
            var futureDate = new Date(CommonUtilities.getServerDateObject().getTime() + (1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 365 /*days*/ * numberOfYearsAllowed));
            if (numberOfdays) {
                var today = new Date(CommonUtilities.getServerDateObject().getTime() + (1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * numberOfdays));
                widgetId.enableRangeOfDates([today.getDate(), today.getMonth() + 1, today.getFullYear()], [futureDate.getDate(), futureDate.getMonth() + 1, futureDate.getFullYear()], "skn", true);
                widgetId.dateComponents = [today.getDate(), today.getMonth() + 1, today.getFullYear()];
            } else {
                var today = new Date(bankDate);
                widgetId.enableRangeOfDates([today.getDate(), today.getMonth() + 1, today.getFullYear()], [futureDate.getDate(), futureDate.getMonth() + 1, futureDate.getFullYear()], "skn", true);
                widgetId.dateComponents = [today.getDate(), today.getMonth() + 1, today.getFullYear()];
            }
        },
        setaccountDetails: function(accounts) {
            this.view.LoanPayOff.lblActualLoanEndDateValue.text = accounts[0].maturityDate ? accounts[0].maturityDate : "-";
            this.view.LoanPayOff.lblCurrentDueValue.text = CommonUtilities.formatCurrencyWithCommas(accounts[0].nextPaymentAmount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(accounts[0].currencyCode));
            this.view.LoanPayOff.lblCurrentBalanceValue.text = CommonUtilities.formatCurrencyWithCommas(accounts[0].currentBalance, false, applicationManager.getFormatUtilManager().getCurrencySymbol(accounts[0].currencyCode));
            this.view.LoanPayOff.lblTotalPrincipalValue.text = CommonUtilities.formatCurrencyWithCommas(accounts[0].principalBalance, false, applicationManager.getFormatUtilManager().getCurrencySymbol(accounts[0].currencyCode));
            response.rointerest = accounts[0].interestRate !== null ? accounts[0].interestRate + "%" : "";
        },
        checkError: function() {
            var accountid = this.view.LoanPayOff.listbxFromDetails.selectedKey;
            var account = {
                "accountID": accountid
            };
            this.presenter.payDueDetails(account, "LoanAccount");
        },
        updateBalanceError: function(accounts) {
            var accountbal = parseFloat(accounts[0].availableBalance);
            var bal = response.totalAmount;
            var dummyId = CommonUtilities.getLastFourDigit(accounts[0].accountID);
            dummyId = "...." + dummyId;
            response.fromAccountName = accounts[0].accountType + " Account ...." + dummyId;
            if (accountbal < bal || accountbal === null && bal !== accountbal) {
                this.view.LoanPayOff.flxError.setVisibility(true);
                this.view.LoanPayOff.imgError.setVisibility(false);
                this.view.LoanPayOff.lblError.setVisibility(true);
                if (kony.application.getCurrentBreakpoint() == 640) {
                    this.view.LoanPayOff.AllForms.top = "700px";
                    this.view.LoanPayOff.AllForms.left = "18%";
                } else if (kony.application.getCurrentBreakpoint() == 1024) {
                    this.view.LoanPayOff.AllForms.top = "520dp";
                    this.view.LoanPayOff.AllForms.left = "18%";
                } else {
                    this.view.LoanPayOff.AllForms.top = "520dp";
                }
                this.view.LoanPayOff.lblError.text = kony.i18n.getLocalizedString("i18n.common.errorInsufficientFunds");
                CommonUtilities.disableButton(this.view.LoanPayOff.btnContinueDetails);
            } else {
                this.view.LoanPayOff.flxError.setVisibility(false);
                this.view.LoanPayOff.imgError.setVisibility(false);
                this.view.LoanPayOff.lblError.setVisibility(false);
                if (kony.application.getCurrentBreakpoint() == 640) {
                    this.view.LoanPayOff.AllForms.top = "640dp";
                    this.view.LoanPayOff.AllForms.left = "18%";
                } else if (kony.application.getCurrentBreakpoint() == 1024) {
                    this.view.LoanPayOff.AllForms.top = "460dp";
                    this.view.LoanPayOff.AllForms.left = "18%";
                } else {
                    this.view.LoanPayOff.AllForms.top = "450dp";
                }
                if (bal <= 0) {
                    CommonUtilities.disableButton(this.view.LoanPayOff.btnContinueDetails);
                } else {
                    CommonUtilities.enableButton(this.view.LoanPayOff.btnContinueDetails);
                }
            }
            FormControllerUtility.hideProgressBar(this.view);
        },
        payDueDetails: function(accounts) {
            this.view.PayDueAmount.CalendarSendDate.skin = ViewConstants.SKINS.LOANDUE_CALENDER_NORMAL;
            this.view.PayDueAmount.CalendarSendDate.focusSkin = ViewConstants.SKINS.LOANDUE_CALENDER_NORMAL;
            this.view.PayDueAmount.CalendarSendDate.hoverSkin = ViewConstants.SKINS.LOANDUE_CALENDER_NORMAL;
            this.populateToAccountValues(accounts[0]);
            this.setToAccountCurrency(accounts[0]);
            if (this.view.PayDueAmount.tbxAmount.text !== "" && this.view.PayDueAmount.tbxAmount.text !== null && this.view.PayDueAmount.tbxAmount.text !== "0" && this.view.PayDueAmount.tbxAmount.text !== "0.00" && this.view.PayDueAmount.tbxAmount.text !== "0,00") {
                FormControllerUtility.enableButton(this.view.PayDueAmount.btnPayAmount);
            } else {
                FormControllerUtility.disableButton(this.view.PayDueAmount.btnPayAmount);
            }
        },
        //function to enable the paydue flow from loanpayoff
        secondaryaction: function() {
            this.loanPayDueAmountInit(initialdata);
        },
        //function to set the data and disable confirm if billAmount service Fails
        fetchDetails: function() {
            var zeroamount = 0;
            this.checkError();
            response.totalinterest = 0, response.totalAmount = 0, response.payofffee = 0;
            this.view.LoanPayOff.lblTotalInterestValue.text = CommonUtilities.formatCurrencyWithCommas(zeroamount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(response.currencyCode));
            this.view.LoanPayOff.tbxLoanPayOffAmountValue.text = CommonUtilities.formatCurrencyWithCommas(zeroamount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(response.currencyCode));
            this.view.LoanPayOff.tbxPayoffPenalityValue.text = CommonUtilities.formatCurrencyWithCommas(zeroamount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(response.currencyCode));
            CommonUtilities.disableButton(this.view.LoanPayOff.btnContinueDetails);
            FormControllerUtility.hideProgressBar(this.view);
        },
        //function to set the values to widgets after the simulation service call
        setAmountValues: function(billAmount) {
            for (i in billAmount.properties) {
                if (billAmount.properties[i].propertyName === 'Principal Interest') response.totalinterest = billAmount.properties[i].interestAmount;
                if (billAmount.properties[i].propertyName === 'Payoff Fee') response.payofffee = billAmount.properties[i].interestAmount;
            }
            response.totalAmount = billAmount.totalAmount;
            this.view.LoanPayOff.lblTotalInterestValue.text = CommonUtilities.formatCurrencyWithCommas(response.totalinterest, false, applicationManager.getFormatUtilManager().getCurrencySymbol(response.currencyCode));
            this.view.LoanPayOff.tbxLoanPayOffAmountValue.text = CommonUtilities.formatCurrencyWithCommas(response.totalAmount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(response.currencyCode));
            this.view.LoanPayOff.tbxPayoffPenalityValue.text = CommonUtilities.formatCurrencyWithCommas(response.payofffee, false, applicationManager.getFormatUtilManager().getCurrencySymbol(response.currencyCode));
            this.checkError();
        },
        //function to change the values of amount and penality afterdatechange
        datechange: function() {
            CommonUtilities.enableButton(this.view.LoanPayOff.btnContinueDetails);
            this.view.flxDownTimeWarning.setVisibility(false);
            var date = this.view.LoanPayOff.CalenderPayOffDate.formattedDate;
            var effectiveDate = date.split("/");
            date = effectiveDate[2] + effectiveDate[0] + effectiveDate[1];
            var input = {
                "activityId": "LENDING-CALCULATE-PAYOFF",
                "productId": response.productId.toUpperCase(),
                "effectiveDate": date,
                "arrangementId": response.arrangementId
            };
            this.presenter.simulation(input);
        },
        //function gets called from LoanPayoff page on click of continue
        navigateToConfirmationLoanPayOff: function() {
            this.view.confirmation.lblFavoriteEmailCheckBoxMain.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
            this.view.flxActions.setVisibility(false);
			
            this.showConfirmationLoanPayOffMine();
            this.view.confirmation.confirmButtons.btnCancel.onClick = this.showQuitPopUp;
            this.view.confirmation.confirmButtons.btnModify.onClick = this.showLoanPayOff;
            this.view.confirmation.confirmButtons.btnConfirm.accessibilityConfig = {
                "a11yLabel": "confirm loan payoff"
            };
            this.view.confirmation.confirmButtons.btnCancel.accessibilityConfig = {
                "a11yLabel": "cancel loan payoff"
            };
            this.view.confirmation.confirmButtons.btnModify.accessibilityConfig = {
                "a11yLabel": "modify loan payoff"
            };
            FormControllerUtility.disableButton(this.view.confirmation.confirmButtons.btnConfirm);
            this.view.confirmation.confirmButtons.btnConfirm.onClick = this.acknowledgementPage;
            this.view.confirmation.flxCheckbox.onClick = this.iAgree;
            this.view.confirmation.btnTermsAndConditions.onClick = this.terms;
            this.view.flxDialogs.flxTermsAndConditionsPopUp.onKeyPress = this.flxCloseTncOnkeyPress;
            this.view.flxClose.onClick = this.hideTermsAndConditionPopUp;
            /* added-4*/
            this.view.customheadernew.btnSkipNav.onClick = this.onbtnskipNavConfirmation;
			this.view.customheadernew.btnSkipNav.setVisibility(true);
            this.view.customheadernew.btnSkipNav.setActive(true);
         this.view.confirmation.flxCheckbox.accessibilityConfig = {
                "a11yLabel": "I Agree to terms and conditions",
                "a11yARIA": {
                    "tabindex": 0,
                    "role": "checkbox",
                    "aria-checked": "false"
                }
            }; 
			
        },
		flxCloseTncOnkeyPress : function (eventObject, eventPayload) {
			if(eventPayload.keyCode===27){
				this.hideTermsAndConditionPopUp();
			}
			if(eventPayload.keyCode===9){
                    if (eventPayload.shiftKey) {
					this.hideTermsAndConditionPopUp();	
					}
			}
		},
		onbtnskipNavConfirmation : function(){
			 this.view.lblConfirmationTitle.setActive(true);
		},
        //function gets called from confirmation page on click of confirm
        acknowledgementPage: function() {
            if (this.loanContext === "Loan Payoff") {
                this.loanPayOffPaymentNew();
            }
        },
        //function gets for termsandconditions
        hideTermsAndConditionPopUp: function() {
            this.view.flxDialogs.setVisibility(false);
            this.view.flxDialogs.flxTermsAndConditionsPopUp.setVisibility(false);
			this.view.confirmation.btnTermsAndConditions.setActive(true);
        },
        toggleFontCheckbox: function(imageWidget) {
            imageWidget.text = imageWidget.text === OLBConstants.FONT_ICONS.CHECBOX_SELECTED ? OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED : OLBConstants.FONT_ICONS.CHECBOX_SELECTED;
        },
        //function to toggle the confirm button by clicking the agree
        iAgree: function() {
            this.toggleFontCheckbox(this.view.confirmation.lblFavoriteEmailCheckBoxMain);
            if (FormControllerUtility.isFontIconChecked(this.view.confirmation.lblFavoriteEmailCheckBoxMain) && !CommonUtilities.isCSRMode()) {
                FormControllerUtility.enableButton(this.view.confirmation.confirmButtons.btnConfirm);
				this.view.confirmation.flxCheckbox.accessibilityConfig = {
                "a11yLabel": "I Agree to terms and conditions",
                "a11yARIA": {
                    "tabindex": 0,
                    "role": "checkbox",
                    "aria-checked": "true"
                }
            };
            this.view.confirmation.flxCheckbox.setActive(true); 
            } else {
                FormControllerUtility.disableButton(this.view.confirmation.confirmButtons.btnConfirm);
				this.view.confirmation.flxCheckbox.accessibilityConfig = {
                "a11yLabel": "I Agree to terms and conditions",
                "a11yARIA": {
                    "tabindex": 0,
                    "role": "checkbox",
                    "aria-checked": "false"
                }
            };
            this.view.confirmation.flxCheckbox.setActive(true); 
            }
			
        },
        //function gets for termsandconditions
        terms: function() {
            var height = this.view.flxHeader.info.frame.height + this.view.flxFooter.info.frame.height + this.view.flxMainContainer.info.frame.height;
            this.view.flxDialogs.flxTermsAndConditionsPopUp.height = height + "dp";
            this.view.flxDialogs.setVisibility(true);
            this.view.flxDialogs.flxTermsAndConditionsPopUp.setVisibility(true);
			this.view.flxDialogs.lblTermsAndConditions.setActive(true);
            this.presenter.termsandconditions();
        },
        //function that sets the text for termsandconditions
        updateTnC: function(TnCContents) {
            this.view.flxDialogs.height = this.view.flxFooter.info.frame.y + this.view.flxFooter.info.frame.height + "dp";
            this.view.flxDialogs.setVisibility(true);
            this.view.flxTermsAndConditionsPopUp.setVisibility(true);
            this.view.flxTCContents.setVisibility(true);
            this.view.flxTC.flxTCContents.rtxTC.text = TnCContents.termsAndConditionsContent;
            FormControllerUtility.hideProgressBar(this.view);
            this.view.forceLayout();
        },
        //function that navigates from loanpayoff to confirmation
        showConfirmationLoanPayOffMine: function() {
            if (kony.application.getCurrentBreakpoint() === 640) {
                this.view.lblConfirmationTitle.setVisibility(false);
                this.view.confirmation.confirmHeaders.lblHeading.text = kony.i18n.getLocalizedString("i18n.payments.confirmTransactionDetail");
				this.view.flxTermsAndConditionsPopUp.enableScrolling = false;
            } else {
                this.view.lblConfirmationTitle.setVisibility(true);
                this.view.lblConfirmationTitle.text = kony.i18n.getLocalizedString("i18n.payments.loanPayOffConfirmation");
                this.view.confirmation.confirmHeaders.lblHeading.text = kony.i18n.getLocalizedString("i18n.transfers.YourTransactionDetails");
            }
            this.view.confirmation.flxWrapper.setVisibility(false);
            this.view.confirmation.flxMainWrapper.setVisibility(true);
            this.view.confirmation.flxRateDetails.setVisibility(true);
            this.view.flxBottom.setVisibility(false);
            var date = this.view.LoanPayOff.CalenderPayOffDate.formattedDate;
            var effectiveDate = date.split("/");
            response.date = effectiveDate[0] + "/" + effectiveDate[1] + "/" + effectiveDate[2];
            date = effectiveDate[2] + "-" + effectiveDate[0] + "-" + effectiveDate[1];
            this.view.confirmation.lblFromValue.text = response.fromAccountName;
            var dummyId = CommonUtilities.getLastFourDigit(response.accountID);
            dummyId = "...." + dummyId;
            this.view.confirmation.lblToValue.text = response.nickName + " " + dummyId;
            this.view.confirmation.lblPayOffAmountValue.text = CommonUtilities.formatCurrencyWithCommas(response.totalAmount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(response.currencyCode));
            this.view.confirmation.lblPayOffPenalityValue.text = CommonUtilities.formatCurrencyWithCommas(response.payofffee, false, applicationManager.getFormatUtilManager().getCurrencySymbol(response.currencyCode));
            this.view.confirmation.lblActualEndDateValue.text = this.view.LoanPayOff.lblActualLoanEndDateValue.text ? this.view.LoanPayOff.lblActualLoanEndDateValue.text : "-";
            this.view.confirmation.lblPayOffDateValue.text = date;
            this.view.confirmation.lblCurrentBalanceValue.text = this.view.LoanPayOff.lblCurrentBalanceValue.text;
            this.view.confirmation.lblTotalPrincipalValue.text = this.view.LoanPayOff.lblTotalPrincipalValue.text;
            this.view.confirmation.lblTotalInterestValue.text = this.view.LoanPayOff.lblTotalInterestValue.text;
            this.view.confirmation.lblRateValue.text = response.rointerest;
            
			this.showView(["flxConfirmation"]);
            this.initializeResponsiveViews();	
			this.view.flxFormContent.forceLayout();			
			this.view.flxFormContent.scrollToWidget(this.view.flxFormContent.flxscrollassist);
			
        },
        //function that calls the transfer service call
        loanPayOffPaymentNew: function() {
            this.view.flxAcknowledgement.lblAcknowledgementTitle.setVisibility(true);
            FormControllerUtility.showProgressBar(this.view);
            var fromAccount = {};
            fromAccount.accountID = this.view.LoanPayOff.listbxFromDetails.selectedKey;
            var toAccount = {};
            toAccount.accountID = response.accountID;
            var transferData = {};
            //var todayDate = applicationManager.getFormatUtilManager().getFormatedDateString(CommonUtilities.getServerDateObject(), applicationManager.getFormatUtilManager().getDateFormat());
            var today = CommonUtilities.getServerDateObject();
            var month = (today.getMonth() + 1) >= 10 ? (today.getMonth() + 1) : ("0" + (today.getMonth() + 1));
            var day = today.getDate() > 9 ? today.getDate() : ("0" + today.getDate());
            var todayDate = month + "/" + day + "/" + today.getFullYear();
            var setdate = response.date.split("/");
            var selectdate = setdate[0] + "/" + setdate[1] + "/" + setdate[2];
            if (todayDate == response.date) {
                transferData.isScheduled = 0;
            } else {
                transferData.isScheduled = 1;
            }
            transferData.fromAccount = fromAccount;
            transferData.amount = response.totalAmount;
            transferData.accountNumber = "";
            transferData.frequency = "Once";
            transferData.isOwnAccount = "true";
            transferData.toAccount = toAccount;
            transferData.toAccount.currencyCode = response.currencyCode;
            transferData.fromAccount.currencyCode = response.currencyCode;
            transferData.currency = response.currencyCode;
            transferData.sendOnDate = selectdate;
            //below three properties is need to set the data to acknowledgment screen and not needed for service call
            transferData.fromAccountName = this.view.confirmation.lblFromValue.text;
            transferData.toAccountName = this.view.confirmation.lblToValue.text;
            transferData.payoffcharges = this.view.confirmation.lblPayOffPenalityValue.text;
            transferData.payoffdate = this.view.confirmation.lblPayOffDateValue.text;
            transferData.loanenddate = this.view.confirmation.lblActualEndDateValue.text;
            transferData.action = "payCompleteDue";
            this.presenter.createTransaction(transferData, false);
        },
        //function that sets the value to acknowledgement screen
        successLoanPayoff: function(data, refId) {
          var scope = this;
            if (kony.application.getCurrentBreakpoint() === 640) {
                this.view.lblAcknowledgementTitle.setVisibility(false);
                this.view.acknowledgment.confirmHeaders.lblHeading.text = kony.i18n.getLocalizedString("i18n.konybb.common.Acknowledgement");
                this.view.confirmDialog.confirmHeaders.lblHeading.text = kony.i18n.getLocalizedString("i18n.transfers.YourTransactionDetails");
            } else {
                this.view.lblAcknowledgementTitle.setVisibility(true);
                this.view.lblAcknowledgementTitle.text = kony.i18n.getLocalizedString("i18n.payments.acknowledgmentPayOff");
                this.view.acknowledgment.confirmHeaders.lblHeading.text = kony.i18n.getLocalizedString("i18n.konybb.common.Acknowledgement");
                this.view.confirmDialog.confirmHeaders.lblHeading.text = kony.i18n.getLocalizedString("i18n.transfers.YourTransactionDetails");
            }
            this.showAcknowledgementLoanPayOff();
            this.view.flxMainAcknowledgment.setVisibility(true);
            this.view.confirmDialog.flxContainerAmount.setVisibility(false);
            this.view.confirmDialog.flxContainerDate.setVisibility(false);
            this.view.confirmDialog.flxContainerDescription.setVisibility(false);
            this.view.confirmDialog.flxContainerPenaltyAmount.setVisibility(false);
            this.view.confirmDialog.flxContainerPartial.setVisibility(false);
            this.view.confirmDialog.flxPartial.setVisibility(false);
            this.view.confirmDialog.flxContainerPayoffAmount.setVisibility(true);
            this.view.confirmDialog.flxContainerPayoffCharges.setVisibility(true);
            this.view.confirmDialog.flxContainerPayOffdate.setVisibility(true);
            this.view.confirmDialog.flxContainerLoanEndDate.setVisibility(true);
            this.view.acknowledgment.lblTransactionMessage.text = kony.i18n.getLocalizedString("i18n.loanpay.transactionSuccess");
            this.view.acknowledgment.flxBalance.setVisibility(false);
            if (kony.application.getCurrentBreakpoint() === 640) this.view.confirmDialog.top = "30dp";
            this.view.acknowledgment.lblRefrenceNumberValue.text = refId;
            //this.view.acknowledgment.lblBalance.text = response.balance;
            //this.view.acknowledgment.lblAccType.text = data.accountName;
            this.view.confirmDialog.lblValue.text = data.fromAccountName;
            this.view.confirmDialog.lblValueTo.text = data.toAccountName;
            this.view.confirmDialog.lblValuePayoffamount.text = CommonUtilities.formatCurrencyWithCommas(data.amount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(data.toAccount.currencyCode));
            this.view.confirmDialog.lblValuePayoffCharges.text = data.payoffcharges;
            this.view.confirmDialog.lblValuePayOffDate.text = data.payoffdate;
            this.view.confirmDialog.lblValueLoanEndDate.text = data.loanenddate;
            if (applicationManager.getConfigurationManager().showLoanUpdateDisclaimer === "true") {
                this.view.acknowledgment.lblTransactionMessage.setVisibility(true);
            }            
           /*added 8*/ 
          this.view.customheadernew.btnSkipNav.onClick = function () {
            scope.view.lblAcknowledgementTitle.setActive(true);
          };
      FormControllerUtility.hideProgressBar(this.view);
      this.initializeResponsiveViews();
      this.view.customheadernew.btnSkipNav.setVisibility(true);
      this.view.customheadernew.btnSkipNav.setActive(true);
    },
    /**
    * Function to disable date selectionm, Loan Pay Off
     * @member frmPayDueAmountController
     * @param {Object} widgetId
     * @param {Date} toDate
     * @returns {void} - None
     * @throws {void} - None
     */
    disableDaySelectionLoanPayOff: function (widgetId, toDate) {
      var date = CommonUtilities.getServerDateObject();
      var dd = date.getDate();
      var mm = date.getMonth() + 1;
      var yy = date.getFullYear();
      var date1 = toDate.split("/");
      if (date1.length === 1) {
        var maxDate = new Date(toDate);
        date1[1] = maxDate.getDate();
        date1[0] = maxDate.getMonth() + 1;
        date1[2] = maxDate.getFullYear();
      }
      widgetId.enableRangeOfDates([dd, mm, yy], [date1[1], date1[0], date1[2]], "skn", true);
    },
    /**
     * Pay Off enable button
      * @member frmPayDueAmountController
      * @param {void} - None
      * @returns {void} - None
      * @throws {void} - None
      */
    enableButtonConfirm: function () {
      this.presenter.fetchUpdatedAccountDetails(this.view.LoanPayOff.listbxFrom.selectedKey, "validateData");
    },
    /**
    * Validate data for Pay Off
     * @member frmPayDueAmountController
     * @param {Object} account account
     * @returns {void} - None
     * @throws {void} - None
     */
    validateData: function (account) {
      if (this.flagPayOff === false) {
        this.view.LoanPayOff.flxError.setVisibility(true);
        this.view.LoanPayOff.lblError.text = kony.i18n.getLocalizedString("i18n.loan.detailsIncorrectMsg");
        this.view.LoanPayOff.listbxFrom.skin = ViewConstants.SKINS.LOANS_LISTBOX_ERRORSKIN;
        this.view.confirmation.flxError.setVisibility(true);
        this.initializeResponsiveViews();
      } else {
        if (account.availableBalance < this.fullPayOffAmount) {
          this.view.LoanPayOff.flxError.setVisibility(true);
          this.view.LoanPayOff.lblError.text = kony.i18n.getLocalizedString("i18n.common.errorInsufficientFunds");
        } else {
          if (!CommonUtilities.isChecked(this.view.LoanPayOff.imgCheckbox)) {
            this.view.LoanPayOff.flxError.setVisibility(true);
            this.view.LoanPayOff.lblError.text = kony.i18n.getLocalizedString("i18n.loan.termsandconditions");
          } else {
            this.view.LoanPayOff.flxError.setVisibility(false);
            this.navigateToConfirmation();
          }
        }
      }
      this.view.forceLayout();
    },
    /**
     * Funtion to get account object for selected account ID of From Listbox
      * @member frmPayDueAmountController
      * @param {frmAccounts} frmAccounts frmAccounts
      * @returns {void} - None
      * @throws {void} - None
      */
    updateFromAccountValue: function (frmAccounts) {
      var selectedKey = this.view.PayDueAmount.listbxFrom.selectedKey;
      var selectedAccount = frmAccounts.filter(function (accounts) {
        return accounts.accountID === selectedKey;
      })[0];
      this.populateFromAccountValues(selectedAccount);
      this.fromAccountCurrency = selectedAccount.currencyCode;
      this.setSkinToListbox(this.view.PayDueAmount.listbxFrom, this.view.PayDueAmount.flxError);
    },
    /**
    * Function to update available balance for validation, when From account is selected
     * @member frmPayDueAmountController
     * @param {Object} account account
     * @returns {void} - None
     * @throws {void} - None
     */
    populateFromAccountValues: function (account) {
      //get amount for validation
      this.balanceInFromAccount = account.availableBalance;
    },
    /**
     * Function to get updated account object for an accountID based on current context, callback to show account details
      * @member frmPayDueAmountController
      * @param {void} - None
      * @returns {void} - None
      * @throws {void} - None
      */
    backToAccountDetails: function () {
      FormControllerUtility.showProgressBar(this.view);
      var selectedKey;
      if (this.loanContext === "Loan Due") {
        selectedKey = this.toaccount;
      } else if (this.loanContext === "Loan Payoff") {
        selectedKey = response.accountID;
      }
      this.presenter.fetchUpdatedAccountDetails(selectedKey, "navigationToAccountDetailsfromLoan");
    },
    backToAccountLandingPage: function () {
      //FormControllerUtility.showProgressBar(this.view);
      this.presenter.backToAccount();
    },
    /**
       * Function to get account object when To account is selected, Pay Due Amount
        * @member frmPayDueAmountController
        * @param {frmAccounts} frmAccounts frmAccounts
        */
    updateToAccountValue: function (frmAccounts) {
      var selectedKey = this.view.PayDueAmount.listbxTo.selectedKey;
      var selectedAccount = frmAccounts.filter(function (accounts) {
        return accounts.accountID === selectedKey;
      })[0];
      selectedAccount.currentAmountDue = CommonUtilities.formatCurrencyWithCommas(selectedAccount.currentAmountDue, false, selectedAccount.currencyCode);
      selectedAccount.currentAmountDue = selectedAccount.currentAmountDue.slice(1);
      this.populateToAccountValues(selectedAccount);
      this.setToAccountCurrency(selectedAccount);
    },
    setToAccountCurrency: function (selectedAccount) {
      var toAccount = selectedAccount;
      this.currency = toAccount.currencyCode;
      this.view.PayDueAmount.lblDollar.text = applicationManager.getFormatUtilManager().getCurrencySymbol(toAccount.currencyCode);
    },
    /**
    * Function to populate and update values when To account is selected, Pay Due Amount
     * @member frmPayDueAmountController
     * @param {object} account account
     * @returns {void} - None
     * @throws {void} - None
     */
    populateToAccountValues: function (account) {
      //due amount //due date //store due amount
      this.availableBalance = account.availableBalance;
      this.toaccount = account.accountID;
      this.dueAmount = parseFloat(account.nextPaymentAmount ? account.nextPaymentAmount : 0) + parseFloat(account.paymentDue ? account.paymentDue : 0);
      this.dueTotalAmount = account.paymentDue;
      this.dueCurrentAmount = account.nextPaymentAmount;
      this.view.PayDueAmount.lblDueAmount.text = "(" + kony.i18n.getLocalizedString("i18n.payments.currentDue") + " " + CommonUtilities.formatCurrencyWithCommas(this.dueCurrentAmount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(account.currencyCode)) + "," + kony.i18n.getLocalizedString("i18n.payments.totalOverDueWithColon") + " " + CommonUtilities.formatCurrencyWithCommas(this.dueTotalAmount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(account.currencyCode)) + ")";
      this.dueDate = account.nextPaymentDate;
      this.view.PayDueAmount.lblDueDate.text = "(" + kony.i18n.getLocalizedString("i18n.billPay.DueDate") + ": " + this.presenter.getFormattedDateString(this.dueDate) + ")";
      this.view.PayDueAmount.lblDueDate.setVisibility(true);
      this.penalty = account.lateFeesDue;
      //       this.view.PayDueAmount.CalendarSendDate.dateFormat = applicationManager.getFormatUtilManager().getDateFormat();
      //       var todayDate = kony.os.date(applicationManager.getFormatUtilManager().getDateFormat());
      //       var endDate  = applicationManager.getFormatUtilManager().getDateObjectFromCalendarString(todayDate, applicationManager.getFormatUtilManager().getDateFormat());
      //       this.view.PayDueAmount.CalendarSendDate.dateComponents = [endDate.getDate(), endDate.getMonth()+1, endDate.getFullYear()];
      if (this.dueAmount == "" || this.dueAmount == null || this.dueAmount == undefined) {
        this.dueAmount = "0.00";
        FormControllerUtility.disableButton(this.view.PayDueAmount.btnPayAmount);
      }
      if (this.dueCurrentAmount == "" || this.dueCurrentAmount == null || this.dueCurrentAmount == undefined) {
        this.dueCurrentAmount = "0.00";
      }
      this.payDueAmountRadioButton("Due");
      this.validateDate();
      this.view.PayDueAmount.CalendarSendDate.onSelection = this.validateDate;
    },
    validateDate: function () {
      var scopeObj = this;
      this.dueShownDate = this.dueDate;
      this.selectedDate = this.view.PayDueAmount.CalendarSendDate.formattedDate;
      if (scopeObj.getDateObject(this.selectedDate).getTime() > scopeObj.getDateObject(this.dueShownDate).getTime()) {
        if (this.dueAmount == 0) {
          this.view.PayDueAmount.CalendarSendDate.skin = ViewConstants.SKINS.LOANDUE_CALENDER_NORMAL;
          this.view.PayDueAmount.CalendarSendDate.focusSkin = ViewConstants.SKINS.LOANDUE_CALENDER_NORMAL;
          this.view.PayDueAmount.CalendarSendDate.hoverSkin = ViewConstants.SKINS.LOANDUE_CALENDER_NORMAL;
          this.view.PayDueAmount.lblDueAmount.setVisibility(false);
          this.view.PayDueAmount.lblDueDate.setVisibility(true);
          this.view.PayDueAmount.flxInfoDueDate.setVisibility(false);
          this.view.PayDueAmount.flxError.setVisibility(true);
          this.view.PayDueAmount.lblError.text = kony.i18n.getLocalizedString("i18n.payments.noPendingDuesErrorMessage");
        } else {
          this.view.PayDueAmount.flxError.setVisibility(false);
          this.view.PayDueAmount.lblInfoAmount.setVisibility(false);
          this.view.PayDueAmount.CalendarSendDate.skin = ViewConstants.SKINS.LOANS_FLEX_ERROR;
          this.view.PayDueAmount.CalendarSendDate.focusSkin = ViewConstants.SKINS.LOANS_FLEX_ERROR;
          this.view.PayDueAmount.CalendarSendDate.hoverSkin = ViewConstants.SKINS.LOANS_FLEX_ERROR;
          this.view.PayDueAmount.lblDueAmount.isVisible = true;
          this.view.PayDueAmount.lblDueDate.setVisibility(false);
          this.view.PayDueAmount.flxInfoDueDate.setVisibility(true);
        }
      } else {
        this.view.PayDueAmount.CalendarSendDate.skin = ViewConstants.SKINS.LOANDUE_CALENDER_NORMAL;
        this.view.PayDueAmount.CalendarSendDate.focusSkin = ViewConstants.SKINS.LOANDUE_CALENDER_NORMAL;
        this.view.PayDueAmount.CalendarSendDate.hoverSkin = ViewConstants.SKINS.LOANDUE_CALENDER_NORMAL;
        this.view.PayDueAmount.lblDueDate.setVisibility(true);
        this.view.PayDueAmount.flxInfoDueDate.setVisibility(false);
      }
    },
    /**
     * Function on click of Pay amount Button, Loan Pay Off
      * @member frmPayDueAmountController
      * @param {void} - None
      * @returns {void} - None
      * @throws {void} - None
      */
    loanDataAfterConfirmation: function () {
      this.enableButtonConfirm();
    },
    /**
     * Navigate to Pay Off confirmation
      * @member frmPayDueAmountController
      * @param {void} - None
      * @returns {void} - None
      * @throws {void} - None
      */
    navigateToConfirmation: function () {
      this.showConfirmationLoanPayOff();
      this.view.confirmation.lblValueAmount.text = this.view.LoanPayOff.tbxLoanPayOffAmount.text.slice(1);
      this.view.confirmation.lblValueDate.text = this.view.LoanPayOff.tbxActualLoanEndDate.text;
      if (this.view.LoanPayOff.tbxPayoffPenality.text !== null && this.view.LoanPayOff.tbxPayoffPenality.text !== "") {
        this.view.confirmation.flxContainerPenaltyAmount.setVisibility(true);
        this.view.confirmation.lblValuePenaltyAmount.text = this.view.LoanPayOff.tbxPayoffPenality.text;
      } else {
        this.view.confirmation.flxContainerPenaltyAmount.setVisibility(false);
      }
      this.view.confirmation.lblValuePaymentDate.text = this.view.LoanPayOff.CalenderPayOffDate.formattedDate;
      if (this.view.LoanPayOff.tbxOptional.text !== null && this.view.LoanPayOff.tbxOptional.text !== "") {
        this.view.confirmation.flxContainerDescription.setVisibility(true);
        this.view.confirmation.lblValueDescription.text = this.view.LoanPayOff.tbxOptional.text.trim();
      } else {
        this.view.confirmation.flxContainerDescription.setVisibility(false);
      }
      this.view.confirmation.lblValue.text = this.view.LoanPayOff.listbxFrom.selectedKeyValue[1];
      this.view.confirmation.lblValueTo.text = this.view.LoanPayOff.listbxTo.selectedKeyValue[1];
      this.view.confirmation.lblKeyAmount.text = kony.i18n.getLocalizedString("i18n.transfers.lblAmount") + "(" + this.view.PayDueAmount.lblDollar.text + ")";
      this.view.forceLayout();
    },
    /**
     * Function to form data and confirm Pay Off
      * @member frmPayDueAmountController
      * @param {void} - None
      * @returns {void} - None
      * @throws {void} - None
      */
    loanPayOffPayment: function () {
      FormControllerUtility.showProgressBar(this.view);
      var data = {};
      var currencyCode = this.returnCurrencyCode(this.view.PayDueAmount.lblDollar.text);
      data.isScheduled = "true";
      var tdate = CommonUtilities.getServerDateObject().toUTCString();
      if (this.getDateObject(this.view.confirmation.lblValuePaymentDate.text).getTime() <= this.getDateObject(tdate).getTime()) {
        data.isScheduled = "false";
      }
      data.fromAccountID = this.view.LoanPayOff.listbxFrom.selectedKey;
      data.toAccountID = this.view.LoanPayOff.listbxTo.selectedKey;
      data.fromAccount = this.view.confirmation.lblValue.text;
      data.toAccount = this.view.confirmation.lblValueTo.text;
      data.notes = this.view.confirmation.lblValueDescription.text;
      data.principalBalance = this.view.confirmation.lblValueAmount.text;
      data.actualLoanEndDate = this.view.confirmation.lblValueDate.text;
      data.payOffCharge = this.view.confirmation.lblValuePenaltyAmount.text.slice(1);
      data.date = this.presenter.getBackendDate(this.view.confirmation.lblValuePaymentDate.text);
      data.amount = this.fullPayOffAmount;
      data.penaltyFlag = "true";
      data.payoffFlag = "true";
      data.transactionCurrency = currencyCode;
      data.toAccountCurrency = currencyCode;
      data.fromAccountCurrency = this.fromAccountCurrency;
      var action = "payCompleteDue";
      this.presenter.payLoanOff(data, action);
    },
    /**
    * Callback for Pay Off Success
     * @member frmPayDueAmountController
     * @param {void} data data
     * @param {String} response response
     * @returns {void} - None
     * @throws {void} - None
     */
    successPayment: function (data, response) {
      this.showAcknowledgementLoanPayOff();
      this.view.flxMainAcknowledgment.setVisibility(true);
      if (data.notes !== null && data.notes !== "") {
        this.view.confirmDialog.flxContainerDescription.setVisibility(true);
      } else
        this.view.confirmDialog.flxContainerDescription.setVisibility(false);
      this.view.confirmDialog.flxPartial.setVisibility(false);
      this.presenter.fetchUpdatedAccountDetails(data.fromAccountID, "updateFromAccount");
      this.presenter.fetchUpdatedAccountDetails(data.toAccountID, "updateToAccount");
      if (data.isScheduled === "true") {
        this.view.acknowledgment.lblTransactionMessage.text = kony.i18n.getLocalizedString("i18n.loan.transactionMsg") + " " + data.date;
        this.view.acknowledgment.flxBalance.setVisibility(false);
        if (kony.application.getCurrentBreakpoint() === 640)
          this.view.confirmDialog.top = "20dp";
      } else {
        this.view.acknowledgment.lblTransactionMessage.text = kony.i18n.getLocalizedString("i18n.PayDueAmount.AcknowlwdgmentMessage");
        this.view.acknowledgment.flxBalance.setVisibility(true);
        if (kony.application.getCurrentBreakpoint() === 640)
          this.view.confirmDialog.top = "30dp";
      }
      this.view.acknowledgment.lblRefrenceNumberValue.text = response;
      this.view.acknowledgment.lblBalance.text = response.balance;
      this.view.acknowledgment.lblAccType.text = response.accountName;
      this.view.confirmDialog.lblValue.text = data.fromAccount;
      this.view.confirmDialog.lblValueTo.text = data.toAccount;
      this.view.confirmDialog.lblValueDescription.text = data.notes;
      this.view.confirmDialog.lblValueAmount.text = CommonUtilities.formatCurrencyWithCommas(data.principalBalance, true, applicationManager.getFormatUtilManager().getCurrencySymbol(data.toAccountCurrency));
      this.view.confirmDialog.lblValueDate.text = data.date;
      this.view.confirmDialog.lblValuePenaltyAmount.text = CommonUtilities.formatCurrencyWithCommas(data.payOffCharge, false, applicationManager.getFormatUtilManager().getCurrencySymbol(data.toAccountCurrency));
      this.view.confirmDialog.lblValuePayDate.text = data.date;
      if (applicationManager.getConfigurationManager().showLoanUpdateDisclaimer === "true") {
        this.view.acknowledgment.lblTransactionMessage.setVisibility(true);
      }
      this.view.confirmDialog.lblKeyAmount.text = kony.i18n.getLocalizedString("i18n.transfers.lblAmount") + "(" + applicationManager.getFormatUtilManager().getCurrencySymbol(data.toAccountCurrency) + ")";
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
    },
    /**
      * Data Map based on account type
       * @member frmPayDueAmountController
       * @param {object} accounts accounts
       * @returns {void} - None
       * @throws {void} - None
       */
    createAccountSegmentsModel: function (accounts) {
      var accountTypeConfig = {};
      accountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.SAVING)] = {
        skin: ViewConstants.SKINS.PAYDUE_ACCOUNT_SAVINGS,
        balanceKey: 'availableBalance',
        balanceTitle: kony.i18n.getLocalizedString('i18n.accounts.availableBalance')
      };
      accountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.CHECKING)] = {
        skin: ViewConstants.SKINS.PAYDUE_ACCOUNT_CHECKING,
        balanceKey: 'availableBalance',
        balanceTitle: kony.i18n.getLocalizedString('i18n.accounts.availableBalance')
      };
      accountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.CREDITCARD)] = {
        skin: ViewConstants.SKINS.PAYDUE_ACCOUNT_CREDITCARD,
        balanceKey: 'currentBalance',
        balanceTitle: kony.i18n.getLocalizedString('i18n.accounts.currentBalance')
      };
      accountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.DEPOSIT)] = {
        skin: ViewConstants.SKINS.ACCOUNT_DETAILS_IDENTIFIER_DEPOSIT,
        balanceKey: 'currentBalance',
        balanceTitle: kony.i18n.getLocalizedString('i18n.accounts.currentBalance')
      };
      accountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.MORTGAGE)] = {
        skin: ViewConstants.SKINS.ACCOUNT_DETAILS_IDENTIFIER_DEPOSIT,
        balanceKey: 'currentBalance',
        balanceTitle: kony.i18n.getLocalizedString('i18n.accounts.currentBalance'),
      };
      accountTypeConfig['Default'] = {
        skin: ViewConstants.SKINS.PAYDUE_ACCOUNT_SAVINGS,
        balanceKey: 'availableBalance',
        balanceTitle: kony.i18n.getLocalizedString('i18n.accounts.availableBalance'),
      };
      var balanceInDollars = function (amount, currencyCode) {
        return CommonUtilities.formatCurrencyWithCommas(amount, false, currencyCode);
      };
      return Object.keys(accountTypeConfig).map(function (type) {
        return accounts.filter(function (account) {
          return account.accountType === type;
        });
      }).map(function (accounts) {
        return accounts.map(function (account) {
          return {
            "flxLeft": {
              "skin": accountTypeConfig[account.accountType].skin
            },
            "lblLeft": " ",
            "lblAccountName": account.nickName || account.accountName,
            "lblBalance": balanceInDollars(account[accountTypeConfig[account.accountType].balanceKey], account.currencyCode),
            "lblAvailableBalance": accountTypeConfig[account.accountType].balanceTitle
          };
        });
      }).reduce(function (p, e) {
        return p.concat(e);
      }, []);
    },
    /**
     * Function to populate Payment accounts
      * @member frmPayDueAmountController
      * @param {Object} accountModel account
      * @returns {void} - None
      * @throws {void} - None
      */
    updateTransferAccountList: function (accountModel) {
      this.view.mypaymentAccounts.segMypaymentAccounts.widgetDataMap = {
        "lblLeft": "lblLeft",
        "lblAccountName": "lblAccountName",
        "flxLeft": "flxLeft",
        "lblBalance": "lblBalance",
        "lblAvailableBalance": "lblAvailableBalance"
      };
      this.view.mypaymentAccounts.segMypaymentAccounts.setData(this.createAccountSegmentsModel(accountModel));
      this.view.forceLayout();
    },
    /**
    * Update data for Pay Off when TO account selection is changed
     * @member frmPayDueAmountController
     * @param {void} - None
     * @returns {void} - None
     * @throws {void} - None
     */
    setDataOnNewSelection: function () {
      this.presenter.fetchUpdatedAccountDetails(this.view.LoanPayOff.listbxTo.selectedKey, "newAccountSelection");
    },
    /**
     * Return Date object for timestamp date
      * @member frmPayDueAmountController
      * @param {Date} dateString dateString
      * @returns {Array} date array
      */
    getDateObject: function (dateString) {
      var index = -1;
      index = dateString.indexOf("T");
      if (index !== -1) {
        return applicationManager.getFormatUtilManager().getDateObjectfromString(dateString);
      } else {
        return applicationManager.getFormatUtilManager().getDateObjectfromString(dateString, applicationManager.getFormatUtilManager().getDateFormat().toUpperCase());
      }
    },
    /**
     * Function to activate/deactivate Pay Due Amount button
      * @member frmPayDueAmountController
      * @param {void} - None
      * @returns {void} - None
      * @throws {void} - None
      */
    changeButtonState: function () {
      if (this.view.PayDueAmount.tbxAmount.text !== "" && this.view.PayDueAmount.tbxAmount.text !== null &&
        this.view.PayDueAmount.tbxAmount.text !== "0" && this.view.PayDueAmount.tbxAmount.text !== "0.00") {
        FormControllerUtility.enableButton(this.view.PayDueAmount.btnPayAmount);
      } else {
        FormControllerUtility.disableButton(this.view.PayDueAmount.btnPayAmount);
      }
    },
    /**
      * Function to perform action onKeyUp of PayDueAmount textbox
      * @member frmPayDueAmountController
      * @param {void} - None
      * @returns {void} - None
      * @throws {void} - None
      */
    amountTextboxAction: function () {
      this.changeButtonState();
      CommonUtilities.validateAmountFieldKeyPress(this.view.PayDueAmount.tbxAmount);
      this.setSkinToFlex(this.view.PayDueAmount.tbxAmount, this.view.PayDueAmount.flxError);
      this.initializeResponsiveViews();
    },
    responsiveViews: {},
    initializeResponsiveViews: function () {
      this.responsiveViews["flxDownTimeWarning"] = this.isViewVisible("flxDownTimeWarning");
      this.responsiveViews["flxPayDueAmount"] = this.isViewVisible("flxPayDueAmount");
      this.responsiveViews["flxLoanPayOff"] = this.isViewVisible("flxLoanPayOff");
      this.responsiveViews["flxConfirmation"] = this.isViewVisible("flxConfirmation");
      this.responsiveViews["flxAcknowledgement"] = this.isViewVisible("flxAcknowledgement");
      this.responsiveViews["flxQuitPayment"] = this.isViewVisible("flxQuitPayment");
      this.responsiveViews["flxQuitPaymentParent"] = this.isViewVisible("flxQuitPaymentParent");
    },
    isViewVisible: function (container) {
      if (this.view[container].isVisible) {
        return true;
      } else {
        return false;
      }
    },
    /**
    * onBreakpointChange : Handles ui changes on .
    * @param {integer} width - current browser width
    */
    orientationHandler: null,
    onBreakpointChange: function (width) {
      kony.print('on breakpoint change');
      if (this.orientationHandler === null) {
        this.orientationHandler = new OrientationHandler();
      }
      this.orientationHandler.onOrientationChange(this.onBreakpointChange);
      this.view.customheadernew.onBreakpointChangeComponent(width);
      this.setupFormOnTouchEnd(width);
      var views;
      this.initializeResponsiveViews();
      var scope = this;
      this.view.CustomPopup1.onBreakpointChangeComponent(scope.view.CustomPopup1, width);
      var responsiveFonts = new ResponsiveFonts();
      if (width === 640) {
        responsiveFonts.setMobileFonts();
        if (this.loanContext == "Loan Payoff") {
          this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.payments.payOffLoan");
          this.responsiveViews.flxLoanPayOff = true;
          this.responsiveViews.flxPayDueAmount = false;
        } else {
          this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("kony.mb.accdetails.payDueAmount");
          this.responsiveViews.flxLoanPayOff = false;
          this.responsiveViews.flxPayDueAmount = true;
        }
        views = Object.keys(this.responsiveViews);
        views.forEach(function (e) {
          scope.view[e].isVisible = scope.responsiveViews[e];
        });
      } else {
        responsiveFonts.setDesktopFonts();
        if (this.loanContext == "Loan Payoff") {
          this.responsiveViews.flxLoanPayOff = true;
          this.responsiveViews.flxPayDueAmount = false;
        } else {
          this.responsiveViews.flxLoanPayOff = false;
          this.responsiveViews.flxPayDueAmount = true;
        }
        views = Object.keys(this.responsiveViews);
        views.forEach(function (e) {
          scope.view[e].isVisible = scope.responsiveViews[e];
        });
        this.view.PayDueAmount.lblDueDate.left = "50.8%";
      }
    },
    setupFormOnTouchEnd: function (width) {
      if (width == 640) {
        this.view.onTouchEnd = function () { }
        this.nullifyPopupOnTouchStart();
      } else {
        if (width == 1024) {
          this.view.onTouchEnd = function () { }
          this.nullifyPopupOnTouchStart();
        } else {
          this.view.onTouchEnd = function () {
            hidePopups();
          }
        }
        var userAgent = kony.os.deviceInfo().userAgent;
        if (userAgent.indexOf("iPad") != -1) {
          this.view.onTouchEnd = function () { }
          this.nullifyPopupOnTouchStart();
        } else if (userAgent.indexOf("Android") != -1 && userAgent.indexOf("Mobile") == -1) {
          this.view.onTouchEnd = function () { }
          this.nullifyPopupOnTouchStart();
        }
      }
    },
    nullifyPopupOnTouchStart: function () { }
  };
});