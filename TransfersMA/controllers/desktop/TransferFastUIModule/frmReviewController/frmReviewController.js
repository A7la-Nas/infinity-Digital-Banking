/***************************************************************************/
define(['commonUtilities', 'OLBConstants', 'ViewConstants', 'FormControllerUtility'], function (commonUtilities, OLBConstants, ViewConstants, FormControllerUtility) {
     
    return {
        init: function () {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function () { };
            this.view.onBreakpointChange = this.onBreakpointChange;
        },
        preShow: function () {
            this.view.customheadernew.activateMenu("FASTTRANSFERS", "Transfer Money");
            FormControllerUtility.updateWidgetsHeightInInfo(this, ['flxHeader', 'flxFooter']);
            this.view.btnConfirm.toolTip="";
            this.view.btnModify.toolTip="";
            this.view.btnConfirm.accessibilityConfig = {
                a11yLabel:"Confirm Transaction details"
            };
            this.view.btnModify.accessibilityConfig = {
                a11yLabel:"Modify Transaction details"
            };
            this.view.btnCancel.accessibilityConfig = {
                a11yLabel:"Cancel Transaction"
            };
            this.view.title="Transfer Confirmation";
            this.view.customheadernew.btnSkipNav.onClick = this.skipNav;
        },
        postShow: function () {
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            this.view.CustomPopupLogout.onKeyPress = this.onKeyPressCallBack;
            this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack;
            this.view.CustomPopup.doLayout = commonUtilities.centerPopupFlex;
            this.view.CustomPopupLogout.doLayout = commonUtilities.centerPopupFlex;
        },

        skipNav: function() {
                this.view.lblConfirmBillPay.setActive(true);
        },

        onKeyPressCallBack: function(eventObject, eventPayload) {
            if (eventPayload.keyCode === 27) {
                if (this.view.flxLogout.isVisible === true) {
                    this.view.flxLogout.isVisible = false;
                    this.view.flxDialogs.isVisible = false;
                    this.view.customheadernew.btnLogout.setFocus(true);
                }
                else if(this.view.flxPopup.isVisible === true){
                    this.view.flxPopup.isVisible = false;
                    this.view.flxDialogs.isVisible = false;
                    this.view.btnCancel.setFocus(true);
                }
                this.view.customheadernew.onKeyPressCallBack(eventObject, eventPayload);
            }
        },

        onBreakpointChange: function (form, width) {
            var scope = this
            FormControllerUtility.setupFormOnTouchEnd(width);
           
            this.view.customheadernew.onBreakpointChangeComponent();
            this.view.customfooternew.onBreakpointChangeComponent();
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            this.view.CustomPopupLogout.onBreakpointChangeComponent(scope.view.CustomPopupLogout, width);
            if (width === 640) {
                commonUtilities.setText(this.view.customheadernew.lblHeaderMobile, "Confirm", commonUtilities.getaccessibilityConfig());
                this.view.CustomPopupLogout.width = "75%";
            } else {
                commonUtilities.setText(this.view.customheadernew.lblHeaderMobile, "", commonUtilities.getaccessibilityConfig());
            }
        },
        /** updates the present Form based on required function.
         * @param {object} viewModel model on which new pathe should decide
         */
        updateFormUI: function (viewModel) {
            if (viewModel.isLoading) {
                FormControllerUtility.showProgressBar(this.view);
            } else {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (viewModel.transferConfirm) {
                this.updateTransferReviewDetails(viewModel.transferConfirm);
            }
            /*if (viewModel.payABill) {
              this.updateBillPayReviewForm(viewModel.payABill);
              this.bindSingleBillPayData(viewModel.payABill);
            }*/
            if (viewModel.ProgressBar) {
                if (viewModel.ProgressBar.show) {
                    FormControllerUtility.showProgressBar(this.view);
                } else {
                    FormControllerUtility.hideProgressBar(this.view);
                }
            }
        },
        /**
         * used to get the amount
         * @param {number} amount amount
         * @returns {number} amount
         */
        deformatAmount: function (amount) {
            return applicationManager.getFormatUtilManager().deFormatAmount(amount);
        },
        /**
   /**pre show of Review single pay screen
   */
        preShowFrmReviewSinglePay: function () {
            //this.view.flxMainSinglePay.setVisibility(true);
            //this.view.flxMainBulkPay.setVisibility(false);
            //this.view.customheadernew.forceCloseHamburger();
            //this.view.customheadernew.rightcontainer.isVisible=false;
        },
        setCombinedUserView: function (viewModel) {
            var orientationHandler = new OrientationHandler();
            var isMobileDevice = ((kony.application.getCurrentBreakpoint() === 640) || orientationHandler.isMobile);
            var isTabletDevice = ((kony.application.getCurrentBreakpoint() === 1024) || orientationHandler.isTablet);
            this.view.flxFromIcon.setVisibility(true);
            this.view.flxToIcon.setVisibility(!kony.sdk.isNullOrUndefined(viewModel.accountTo.isBusinessAccount));
            this.view.lblValue.left = isMobileDevice ? "7%" : (isTabletDevice ? "26%" : "25%");
            this.view.lblToValue.left = isMobileDevice ? "7%" : (isTabletDevice ? "26%" : "25%");
            if (viewModel.accountFrom.isBusinessAccount === "true") this.view.imgIcon.text = "r";
            else this.view.imgIcon.text = "s";
            if (viewModel.accountTo.isBusinessAccount === "true" || viewModel.accountTo.isBusinessPayee === "1") this.view.imgToIcon.text = "r";
            else this.view.imgToIcon.text = "s";
        },
        /** Shows Transfer Confirmation
         * @param {object} transferConfirm Transfer Details
         */
        updateTransferReviewDetails: function (transferConfirm) {
            this.view.lblHeading.text = kony.i18n.getLocalizedString("i18n.transfers.transferDetails");
            var configurationManager = applicationManager.getConfigurationManager();
            var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
            var profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
            var viewModel = transferConfirm.transferData;
            var scopeObj = this;
            if (commonUtilities.isCSRMode() && transferConfirm.makeTransferViewModel.isEdit) {
                this.view.btnConfirm.skin = FormControllerUtility.disableButtonSkinForCSRMode();
            }
            this.preShowFrmReviewSinglePay();
            this.view.flxPopup.setVisibility(false);
            if (!isSingleCustomerProfile && profileAccess === "both") this.setCombinedUserView(viewModel);
            //this.view.flxdeliverby.setVisibility(false);
            commonUtilities.setText(this.view.lblFrequencyKey, kony.i18n.getLocalizedString("i18n.transfers.lblFrequency"), commonUtilities.getaccessibilityConfig());
            /*this.view.breadcrumb.setBreadcrumbData([{
              text: kony.i18n.getLocalizedString("i18n.hamburger.transfers")
            }, {
              text: kony.i18n.getLocalizedString("i18n.transfers.confirmTransfer")
            }]);
            this.view.breadcrumb.btnBreadcrumb1.toolTip = kony.i18n.getLocalizedString("i18n.hamburger.transfers");
            this.view.breadcrumb.lblBreadcrumb2.toolTip = kony.i18n.getLocalizedString("i18n.transfers.confirmTransfer");*/
            commonUtilities.setText(this.view.CustomPopup.lblHeading, kony.i18n.getLocalizedString('i18n.transfer.QuitTransfer'), commonUtilities.getaccessibilityConfig());
            commonUtilities.setText(this.view.lblKey,kony.i18n.getLocalizedString("i18n.payments.transferFromWithColon"), commonUtilities.getaccessibilityConfig());
            commonUtilities.setText(this.view.lblValue, commonUtilities.getAccountDisplayName(viewModel.accountFrom), commonUtilities.getaccessibilityConfig());
            commonUtilities.setText(this.view.lblToKey,kony.i18n.getLocalizedString("i18n.payments.transferToWithColon"), commonUtilities.getaccessibilityConfig());
            commonUtilities.setText(this.view.lblToValue, viewModel.accountTo.beneficiaryName ? (viewModel.accountTo.nickName ? viewModel.accountTo.nickName : viewModel.accountTo.beneficiaryName) + " ...." + commonUtilities.getLastFourDigit(viewModel.accountTo.accountNumber) : (viewModel.accountTo.PayPersonId ? (viewModel.accountTo.nickName ? viewModel.accountTo.nickName : viewModel.accountTo.name) : (commonUtilities.getAccountDisplayName(viewModel.accountTo))), commonUtilities.getaccessibilityConfig());
            if (viewModel.accountTo.isInternationalAccount === "true") {
                this.view.flxCurrency.setVisibility(true);
                commonUtilities.setText(this.view.lblCurrencyKey,kony.i18n.getLocalizedString("kony.i18n.verifyDetails.currency"), commonUtilities.getaccessibilityConfig());
                commonUtilities.setText(this.view.lblCurrencyValue, viewModel.currency, commonUtilities.getaccessibilityConfig());
            } else {
                this.view.flxCurrency.setVisibility(false);
            }
            commonUtilities.setText(this.view.lblAmountKey,kony.i18n.getLocalizedString("i18n.wealth.amountColon"), commonUtilities.getaccessibilityConfig());
            commonUtilities.setText(this.view.lblAmountValue, applicationManager.getFormatUtilManager().getCurrencySymbol(viewModel.currency) + " " + this.formatCurrency(viewModel.amount, true), commonUtilities.getaccessibilityConfig());
            commonUtilities.setText(this.view.lblDateKey, kony.i18n.getLocalizedString('i18n.transfers.start_date') + ":", commonUtilities.getaccessibilityConfig());
            commonUtilities.setText(this.view.lblDateValue, viewModel.sendOnDate, commonUtilities.getaccessibilityConfig());
            commonUtilities.setText(this.view.lblFrequencyKey, kony.i18n.getLocalizedString("i18n.PayPerson.frequency") , commonUtilities.getaccessibilityConfig());
            commonUtilities.setText(this.view.lblFrequencyValue, viewModel.frequencyKey, commonUtilities.getaccessibilityConfig());
            commonUtilities.setText(this.view.lblDurationKey, kony.i18n.getLocalizedString("i18n.Wealth.duration"), commonUtilities.getaccessibilityConfig());
            this.view.flxFrequency.setVisibility(true);
            commonUtilities.setText(this.view.lblNoteKey,kony.i18n.getLocalizedString("i18n.PayAPerson.Note") , commonUtilities.getaccessibilityConfig());
            if (viewModel.notes === "") this.view.lblNoteValue.text = "none";
            else commonUtilities.setText(this.view.lblNoteValue, viewModel.notes, commonUtilities.getaccessibilityConfig());
            if (viewModel.frequencyKey !== kony.i18n.getLocalizedString("i18n.transfers.frequency.once") && viewModel.howLongKey === "ON_SPECIFIC_DATE") {
                this.view.flxTransferEndDate.setVisibility(true);
                this.view.flxDuration.setVisibility(true);
                commonUtilities.setText(this.view.lblDurationValue, kony.i18n.getLocalizedString("i18n.transfers.DateRange"), commonUtilities.getaccessibilityConfig());
                commonUtilities.setText(this.view.lblEndDateKey, kony.i18n.getLocalizedString("i18n.transfers.end_date") + ":", commonUtilities.getaccessibilityConfig());
                commonUtilities.setText(this.view.lblEndDateValue, viewModel.endOnDate, commonUtilities.getaccessibilityConfig());
            } else if (viewModel.frequencyKey !== kony.i18n.getLocalizedString("i18n.transfers.frequency.once") && viewModel.howLongKey === "NO_OF_RECURRENCES") {
                this.view.flxDuration.setVisibility(false);
                this.view.flxTransferEndDate.setVisibility(true);
                commonUtilities.setText(this.view.lblEndDateKey,kony.i18n.getLocalizedString("i18n.transfers.lblNumberOfRecurrencescolon"), commonUtilities.getaccessibilityConfig());
                commonUtilities.setText(this.view.lblEndDateValue, viewModel.noOfRecurrences, commonUtilities.getaccessibilityConfig());
            } else {
                this.view.flxDuration.setVisibility(false);
                this.view.flxTransferEndDate.setVisibility(false);
            }
            //this.view.btnConfirm.toolTip = kony.i18n.getLocalizedString('i18n.common.confirmTransaction');
            if (commonUtilities.isCSRMode() && transferConfirm.makeTransferViewModel.isEdit) {
                this.view.btnConfirm.onClick = FormControllerUtility.disableButtonActionForCSRMode();
            } else {
                this.view.btnConfirm.onClick = this.saveTransfer.bind(this, transferConfirm);
            }
            this.view.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.transfers.deleteTransfer");
            this.view.btnCancel.onClick = function () {
                scopeObj.showTransferCancelPopup();
            }.bind(this);
            //this.view.btnModify.toolTip = kony.i18n.getLocalizedString('i18n.common.modifyTransaction');
            this.view.btnModify.onClick = function () {
                applicationManager.getModulesPresentationController({
                    "moduleName": "TransferFastUIModule",
                    "appName": "TransfersMA"
                }).modifyTransaction(transferConfirm);
            }.bind(this);
            this.view.customheadernew.activateMenu("Transfers");
            this.view.forceLayout();
        },
        /**Formats the Currency
         * @param  {Array} amount Array of transactions model
         * @param  {function} onCancelCreateTransfer Needs to be called when cancel button is called
         */
        formatCurrency: function (amount, currencySymbolNotRequired) {
            return commonUtilities.formatCurrencyWithCommas(amount, currencySymbolNotRequired);
        },
        /** Callback for Review transfer button
         * @param {object} transferConfirm Transfer Details
         */
        saveTransfer: function (transferConfirm) {
            commonUtilities.showProgressBar(this.view);
            if (transferConfirm.makeTransferViewModel.editTransaction) {
                applicationManager.getModulesPresentationController({
                    "moduleName": "TransferFastUIModule",
                    "appName": "TransfersMA"
                }).editTransfer(this.updateTransactionObject(transferConfirm.makeTransferViewModel.editTransaction.editTransactionObject, transferConfirm.transferData));
            } else {
                if (transferConfirm.makeTransferViewModel && transferConfirm.makeTransferViewModel.repeatTransaction) {
                    this.filterTransferData(transferConfirm.transferData, transferConfirm.makeTransferViewModel.repeatTransaction.serviceName);
                } else {
                    this.filterTransferData(transferConfirm.transferData);
                }
            }
        },
        /** Filter the Data
         * @param {object} transferData Transfer Details
         */
        filterTransferData: function (transferData, serviceName) {
            var accountsModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("DigitalArrangements");
            var transactionType = transferData.accountTo.accountID ? 'InternalTransfer' : (transferData.accountTo.type === "P2P_ACCOUNT" ? 'P2P' : 'ExternalTransfer');
            var toAccountNumber = transferData.accountTo.accountID ? transferData.accountTo.accountID : transferData.accountTo.accountNumber;
            var externalAccountNumber = transactionType === "ExternalTransfer" ? transferData.accountTo.accountNumber : null;
            var personId = transferData.accountTo.PayPersonId ? transferData.accountTo.PayPersonId : transferData.accountTo.personId;
            var commandData = {
                Id: transferData.Id,
                fromAccountNumber: transferData.accountFrom,
                accountFrom: transferData.accountFrom,
                accountTo: transferData.accountTo,
                amount: transferData.amount,
                transactionAmount: transferData.amount,
                notes: transferData.notes,
                ExternalAccountNumber: externalAccountNumber,
                personId: personId,
                p2pContact: transferData.accountTo.primaryContactForSending,
                isScheduled: this.isFutureDate(transferData.sendOnDateComponents) || transferData.frequencyKey !== 'Once' ? "1" : "0",
                transactionType: transactionType,
                toAccountNumber: toAccountNumber,
                frequencyType: transferData.frequencyKey,
                numberOfRecurrences: transferData.howLongKey === 'NO_OF_RECURRENCES' ? transferData.noOfRecurrences : null,
                frequencyEndDate: transferData.howLongKey === 'ON_SPECIFIC_DATE' ? transferData.endOnDate : null,
                scheduledDate: transferData.sendOnDate,
                sendOnDateComponents: transferData.sendOnDateComponents,
                endOnDateComponents: transferData.endOnDateComponents,
                sendOnDate: transferData.sendOnDate,
                endOnDate: transferData.endOnDate,
                frequencyKey: transferData.frequencyKey,
                howLongKey: transferData.howLongKey,
                toAccountCurrency: transferData.toAccountCurrency,
                fromAccountCurrency: transferData.fromAccountCurrency,
                header: transferData.header,
                currency: transferData.currency,
                swiftCode: transferData.swiftCode,
                beneficiaryName: transferData.beneficiaryName
            }
            if (serviceName) {
                commandData.serviceName = serviceName;
            }
            applicationManager.getModulesPresentationController({
                "moduleName": "TransferFastUIModule",
                "appName": "TransfersMA"
            }).createTransfer(commandData);
        },
        /** Compares Date with todays and tell is its future or not
         * @param  {object} date object
         * @returns {boolean} True for future else false
         */
        isFutureDate: function (dateComponents) {
            var dateObj = this.getDateObj(dateComponents)
            var endTimeToday = commonUtilities.getServerDateObject();
            var minutes = ViewConstants.MAGIC_NUMBERS.MAX_MINUTES;
            endTimeToday.setHours(ViewConstants.MAGIC_NUMBERS.MAX_HOUR, minutes, minutes, minutes);
            if (dateObj.getTime() > endTimeToday.getTime()) {
                return true;
            }
            return false;
        },
        /** Show Transfer Cancel popup for Cancel Button
         * @param {function} onCancelListener function call on click of cancel button
         */
        showTransferCancelPopup: function () {
            var self = this;
            var orientationHandler = new OrientationHandler();
            var currBreakpoint = kony.application.getCurrentBreakpoint();
            self.view.CustomPopup.height = '268dp';
            if (kony.application.getCurrentBreakpoint() <= 640) {
                self.view.CustomPopup.height = '250dp';
              }
            if (currBreakpoint === 640) {
                self.view.CustomPopup.width = "80%";
            } else if (currBreakpoint === 1024 || orientationHandler.isTablet) {
                self.view.CustomPopup.width = "60%";
            } else {
                self.view.CustomPopup.width = "43%";
            }
            commonUtilities.setText(this.view.CustomPopup.lblHeading, kony.i18n.getLocalizedString("i18n.payments.cancelTransfer"), commonUtilities.getaccessibilityConfig());
            this.view.flxPopup.setVisibility(true);
            this.view.flxDialogs.setVisibility(true);
            this.view.CustomPopup.lblHeading.setFocus(true);
            var height = self.view.flxFooter.info.frame.height + self.view.flxFooter.info.frame.y;
            self.view.flxPopup.height = height + ViewConstants.POSITIONAL_VALUES.DP;
            this.view.CustomPopup.btnYes.onClick = function () {
                var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "AccountsUIModule",
                    "appName": "HomepageMA"
                });
                accountsModule.presentationController.showAccountsDashboard();
                self.view.flxDialogs.setVisibility(false);
                self.view.flxPopup.setVisibility(false);
            };
           // this.view.CustomPopup.btnYes.toolTip = kony.i18n.getLocalizedString("i18n.transfers.deleteTransfer");
            var scopeObj=this;
            this.view.CustomPopup.flxCross.onClick = function () {
                self.view.flxDialogs.setVisibility(false);
                self.view.flxPopup.setVisibility(false);
                self.view.btnCancel.setActive(true);
            };
            this.view.CustomPopup.btnNo.onClick = function () {
                self.view.flxDialogs.setVisibility(false);
                self.view.flxPopup.setVisibility(false);
                self.view.btnCancel.setActive(true);
            }
            scopeObj.view.CustomPopup.lblHeading.accessibilityConfig = {
                a11yARIA:{
                    tabindex:-1
                }
            }
            scopeObj.view.CustomPopup.flxCross.accessibilityConfig = {
                a11yLabel : "Cancel this Cancel dialog",
                a11yARIA : {
                  tabindex : 0,
                  role : "button"
                }
            }
            scopeObj.view.CustomPopup.btnYes.accessibilityConfig = {
                a11yLabel : "Yes, cancel this process",
                a11yARIA : {
                    tabindex : 0,
                    role : "button"
                  }
            }
            scopeObj.view.CustomPopup.btnNo.accessibilityConfig = {
                a11yLabel : "No, don't Cancel this process",
                a11yARIA : {
                    tabindex : 0,
                    role : "button"
                  }
            }
            scopeObj.view.CustomPopup.lblHeading.setActive(true);
            scopeObj.view.CustomPopup.accessibilityConfig = {
                a11yARIA:{
                    tabindex:-1,
                    role:"dialog"
                }
            };
            scopeObj.view.CustomPopup.isModalContainer = true;
            this.view.forceLayout();
            scopeObj.view.flxPopup.height = '100%';
        },
        /** If editing a transaction, updates transaction object
         * @param {object} transaction Existing transaction
         * @param {object} viewModel Transfer Data
         */
        updateTransactionObject: function (transaction, viewModel) {
            transaction.accountFrom = viewModel.accountFrom;
            transaction.accountTo = viewModel.accountTo;
            transaction.fromAccountNumber = viewModel.accountFrom.accountID;
            transaction.amount = viewModel.amount;
            transaction.transactionsNotes = viewModel.notes;
            transaction.frequencyType = viewModel.frequencyKey;
            transaction.scheduledDate = viewModel.sendOnDate;
            transaction.numberOfRecurrences = viewModel.noOfRecurrences === "" && viewModel.howLongKey === 'NO_OF_RECURRENCES' ? null : viewModel.noOfRecurrences;
            transaction.frequencyStartDate = viewModel.sendOnDate;
            transaction.frequencyEndDate = viewModel.endOnDate;
            return transaction;
        },
        /** Get date from date components
         * @param {object} dateComponents Date Components from calendar object
         */
        getDateObj: function (dateComponents) {
            var date = new Date();
            date.setDate(dateComponents[0]);
            date.setMonth(parseInt(dateComponents[1]) - 1);
            date.setFullYear(dateComponents[2]);
            date.setHours(0, 0, 0, 0)
            return date;
        },
    }
});