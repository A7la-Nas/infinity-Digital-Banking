/**
 * Description of Module representing a Confirm form.
 * @module frmAckowledgementController
 */
define(['CommonUtilities', 'OLBConstants', 'ViewConstants', 'FormControllerUtility'], function (commonUtilities, OLBConstants, ViewConstants, FormControllerUtility) {
     
    return /** @alias module:frmAckowledgementController */ {
        /** updates the present Form based on required function.
         * @param {uiDataMap[]} uiDataMap
         */
        updateFormUI: function (uiDataMap) {
            if (uiDataMap.isLoading) {
                FormControllerUtility.showProgressBar(this.view);
            } else {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (uiDataMap.transferAcknowledge) {
                this.updateFastTransferAcknowledgeUI(uiDataMap.transferAcknowledge);
            }
        },
        init: function () {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function () { };
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.initActions();
        },
        preShow: function () {
            this.view.customheadernew.activateMenu("FASTTRANSFERS", "Transfer Money");
            FormControllerUtility.updateWidgetsHeightInInfo(this, ['flxHeader', 'flxFooter']);
            var scope=this;
          scope.view.customheadernew.btnSkipNav.onClick = function() {
           scope.view.lblBillPayAcknowledgement.setActive(true);

             },
             this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack;
             this.view.CustomPopup.doLayout = commonUtilities.centerPopupFlex;
        },
        /**
         * used perform the initialize activities.
         *
         */
           
           onKeyPressCallBack: function(eventObject, eventPayload) {
           var self = this;
           if (eventPayload.keyCode === 27) {
               if (self.view.flxLogout.isVisible === true) {
                  self.view.flxLogout.isVisible = false;
                  self.view.flxDialogs.isVisible = false;
                  self.view.customheadernew.btnLogout.setFocus(true);
               }
           }
           },

        initActions: function () {
            var scopeObj = this;
            if (commonUtilities.isPrintEnabled()) {
                this.view.lblPrintfontIcon.setVisibility(true);
                this.view.flxPrint.onClick = this.onClickPrint;
            } else {
                this.view.lblPrintfontIcon.setVisibility(false);
            }
        },
        /**
         * used to perform the post show activities
         *
         */
        postShow: function () {
            var scopeObj = this;
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            this.view.flxAcknowledgementMain.height= this.view.flxTransactionDetails.minHeight;
            //this.view.confirmDialogAccounts.confirmButtons.setVisibility(false);
            //this.view.confirmDialogAccounts.keyValueAccountType.lblKey.text=kony.i18n.getLocalizedString("i18n.transfers.lblAmount")+"("+applicationManager.getConfigurationManager().getCurrencyCode()+")";
            //this.customiseHeaderComponentforAcknowledgement();
            this.view.forceLayout();
            this.view.btnSavePayee.skin = ViewConstants.SKINS.PFM_BTN_SKIN;
            this.view.btnSavePayee.focusSkin = ViewConstants.SKINS.PFM_BTN_ENABLE_FOCUS;
            if (kony.application.getCurrentBreakpoint() <= 1024) {
                this.view.btnSavePayee.skin = "sknBtnffffffBorder0273e31pxRadius2px";
            }
            this.view.flxDownload.setVisibility(false); // AOLB-997
            applicationManager.getNavigationManager().applyUpdates(this);
            this.view.CustomPopup.centerY="50%";
        },
        /**Returns Date Object from Date Components
         * @param  {array} dateComponents Date Components returned from Calendar Widget
         * @return {date} date
         */
        getDateObj: function (dateComponents) {
            var date = new Date();
            date.setDate(dateComponents[0]);
            date.setMonth(parseInt(dateComponents[1]) - 1);
            date.setFullYear(dateComponents[2]);
            date.setHours(0, 0, 0, 0)
            return date;
        },
        /** Compares Date with todays and tell is its future or not
         * @param  {object} dateComponents object
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
        /**Formats the Currency
         * @param  {Array} amount Array of transactions model
         * @param  {function} currencySymbolNotRequired Needs to be called when cancel button is called
         * @return {function} function to put comma
         */
        formatCurrency: function (amount, currencySymbolNotRequired, currencyCode) {
            return commonUtilities.formatCurrencyWithCommas(amount, currencySymbolNotRequired, currencyCode);
        },
        setCombinedUserView: function (viewModel) {
            var orientationHandler = new OrientationHandler();
            var isMobileDevice = (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile);
            var isTabletDevice = (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet);
            this.view.flxIcon.setVisibility(true);
            this.view.flxImg.setVisibility(true);
            this.view.flxToImg.setVisibility(!kony.sdk.isNullOrUndefined(viewModel.transferData.accountTo.isBusinessAccount));
            this.view.lblSavingsAccount.left = isMobileDevice ? "10%" : (isTabletDevice ? "6%" : "7%");
            this.view.lblToValue.left = isMobileDevice ? "8%" : (isTabletDevice ? "38.5%" : "39.5%");
            this.view.lblValue.left = isMobileDevice ? "8%" : (isTabletDevice ? "38.5%" : "39.5%");
            this.view.imgAccountIcon.text = (viewModel.transferData.accountFrom.isBusinessAccount === "true") ? "r" : "s";
            this.view.imgIcon.text = (viewModel.transferData.accountFrom.isBusinessAccount === "true") ? "r" : "s";
            this.view.imgToIcon.text = (viewModel.transferData.accountTo.isBusinessAccount === "true") || (viewModel.transferData.accountTo.isBusinessPayee === "1") ? "r" : "s";
        },
        /**Entry Point for Transfer Acknowledgement
         * @param {object} viewModel Transfer Data
         */
        updateFastTransferAcknowledgeUI: function (viewModel) {
            var configurationManager = applicationManager.getConfigurationManager();
            var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
            var profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
            this.presenter = applicationManager.getModulesPresentationController({
                "moduleName": "TransferFastUIModule",
                "appName": "TransfersMA"
            });
            this.customizeUIForTransferAcknowledege(viewModel.transferData.header);
            this.view.flxTransferFrom.setVisibility(true);
            this.view.flxTransferTo.setVisibility(true);
            this.view.flxAmount.setVisibility(true);
            this.view.flxFrequency.setVisibility(true);
            this.view.flxStartDate.setVisibility(true);
            this.view.flxNotes.setVisibility(true);
            if (!isSingleCustomerProfile && profileAccess === "both") this.setCombinedUserView(viewModel);
            if (this.isFutureDate(viewModel.transferData.sendOnDateComponents) || (this.isFutureDate(viewModel.transferData.endOnDateComponents))) {
                this.showTransferAcknowledgeForScheduledTransaction(viewModel);
            } else {
                this.showTransferAcknowledgeForRecentTransaction(viewModel);
            }
            /*this.view.confirmDialogAccounts.keyValueBenificiaryName.setVisibility(true);
            this.onBreakpointChange(kony.application.getCurrentBreakpoint());*/
            viewModel.transferData.accountTo.nickName ? viewModel.transferData.accountTo.nickName : viewModel.transferData.accountTo.nickName = viewModel.transferData.accountTo.beneficiaryName;
           this.view.lblValue.text=commonUtilities.truncateStringWithGivenLength(commonUtilities.getAccountName(viewModel.transferData.accountFrom) + "....", 35) + commonUtilities.getLastFourDigit(viewModel.transferData.accountFrom.accountID);
           this.view.lblToValue.text=viewModel.transferData.accountTo.PayPersonId ? commonUtilities.getAccountName(viewModel.transferData.accountTo) : commonUtilities.truncateStringWithGivenLength(commonUtilities.getAccountName(viewModel.transferData.accountTo) + "....", 35) + commonUtilities.getLastFourDigit(viewModel.transferData.accountTo.accountID || viewModel.transferData.accountTo.accountNumber);
            if (viewModel.transferData.frequencyKey !== "Once" && viewModel.transferData.howLongKey === "NO_OF_RECURRENCES") {
                this.view.flxEndDate.setVisibility(true);
                //commonUtilities.setText(this.view.lblEndDateKey, kony.i18n.getLocalizedString("i18n.transfers.lblNumberOfRecurrences") + ":", commonUtilities.getaccessibilityConfig());
                this.view.lblEndDateKey.text= kony.i18n.getLocalizedString("i18n.transfers.lblNumberOfRecurrences") + ":";
                //commonUtilities.setText(this.view.lblEndDateValue, viewModel.transferData.numberOfRecurrences, commonUtilities.getaccessibilityConfig());
                this.view.lblEndDateValue.text=viewModel.transferData.numberOfRecurrences;
                //commonUtilities.setText(this.view.lblDurationValue, kony.i18n.getLocalizedString("i18n.transfers.lblRecurrences"), commonUtilities.getaccessibilityConfig());
                this.view.lblDurationValue.text=kony.i18n.getLocalizedString("i18n.transfers.lblRecurrences");
            }
            if (viewModel.transferData.accountTo.isInternationalAccount === "true") {
                this.view.flxCurrency.setVisibility(true);
                //commonUtilities.setText(this.view.lblCurrencyKey, kony.i18n.getLocalizedString("i18n.common.Currency") + ":", commonUtilities.getaccessibilityConfig());
                  this.view.lblCurrencyKey.text=kony.i18n.getLocalizedString("i18n.common.Currency") + ":";
               // commonUtilities.setText(this.view.lblCurrencyValue, viewModel.transferData.currency, commonUtilities.getaccessibilityConfig());
                this.view.lblCurrencyValue.text=viewModel.transferData.currency;
            } else {
                this.view.flxCurrency.setVisibility(false);
            }
            commonUtilities.setText(this.view.lblAmountValue, applicationManager.getFormatUtilManager().getCurrencySymbol(viewModel.transferData.currency) + " " + this.formatCurrency(viewModel.transferData.amount, true), commonUtilities.getaccessibilityConfig());
            commonUtilities.setText(this.view.lblAmountKey, kony.i18n.getLocalizedString("i18n.StopCheckPayments.Amount"), commonUtilities.getaccessibilityConfig());
            commonUtilities.setText(this.view.lblFrequencyValue, viewModel.transferData.frequencyType, commonUtilities.getaccessibilityConfig());
            commonUtilities.setText(this.view.lblStartDateValue, viewModel.transferData.sendOnDate, commonUtilities.getaccessibilityConfig());
            if (viewModel.transferData.notes === "") this.view.lblNotesValue.text = "None";
            else commonUtilities.setText(this.view.lblNotesValue, viewModel.transferData.notes, commonUtilities.getaccessibilityConfig());
            commonUtilities.setText(this.view.lblRefrenceNumberValue, viewModel.transferData.referenceId, commonUtilities.getaccessibilityConfig());
            //this.view.confirmDialogAccounts.keyValueRoutingNumber.setVisibility(false);
            commonUtilities.setText(this.view.lblSavingsAccount, commonUtilities.getAccountDisplayName(viewModel.transferData.accountFrom), commonUtilities.getaccessibilityConfig());
            commonUtilities.setText(this.view.lblBalanceValue, this.formatCurrency(viewModel.transferData.accountFrom.availableBalance, false, viewModel.transferData.accountFrom.currencyCode), commonUtilities.getaccessibilityConfig());
            this.view.btnSavePayee.setVisibility(true);
            this.view.btnSavePayee.onClick = function () {
                var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "AccountsUIModule",
                    "appName": "HomepageMA"
                });
                accountsModule.presentationController.showAccountsDashboard();
            }.bind(this);
            this.view.btnAddAnotherAccount.onClick = function () {
                this.presenter.showTransferScreen();
            }.bind(this);
            this.view.btnAddAnotherAccount.toolTip = kony.i18n.getLocalizedString("i18n.FastTransfers.NewTransfer");
            this.view.forceLayout();
        },
        /**UI Logic for Transfers
         */
        customizeUIForTransferAcknowledege: function (header) {
            //this.view.flxContainer.setVisibility(true);
            this.view.btnSavePayee.setVisibility(false);
            //commonUtilities.setText(this.view.lblBillPayAcknowledgement, "Transfer Money- Acknowledgement" , commonUtilities.getaccessibilityConfig());
            //commonUtilities.setText(this.view.btnSavePayee, kony.i18n.getLocalizedString("i18n.topmenu.accounts"), commonUtilities.getaccessibilityConfig());
            this.view.btnSavePayee.text = kony.i18n.getLocalizedString("i18n.topmenu.accounts");
           // this.view.btnSavePayee.toolTip = kony.i18n.getLocalizedString("i18n.topmenu.accounts");
            this.view.btnAddAnotherAccount.text = kony.i18n.getLocalizedString("i18n.FastTransfers.NewTransfer");
            this.view.lblTransactionMessage.text = kony.i18n.getLocalizedString("i18n.FastTransfers.YourTransactionHasBeenSuccessful");
            this.view.lblBillPayAcknowledgement.text = header + " - " + kony.i18n.getLocalizedString("i18n.konybb.common.Acknowledgement");
            this.view.forceLayout();
        },
        customizeAccountsButton: function () {
           // commonUtilities.setText(this.view.btnSavePayee, kony.i18n.getLocalizedString("i18n.topmenu.accounts"), commonUtilities.getaccessibilityConfig());
           			this.view.btnSavePayee.text =  kony.i18n.getLocalizedString("i18n.topmenu.accounts");
           // this.view.btnSavePayee.toolTip = kony.i18n.getLocalizedString("i18n.topmenu.accounts");
            this.view.btnSavePayee.skin = ViewConstants.SKINS.PFM_BTN_SKIN;
            this.view.btnSavePayee.focusSkin = ViewConstants.SKINS.PFM_BTN_ENABLE_FOCUS;
            if (kony.application.getCurrentBreakpoint() <= 1024) {
                this.view.btnSavePayee.skin = "sknBtnffffffBorder0273e31pxRadius2px";
            }
            this.view.btnSavePayee.onClick = function () {
                var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "AccountsUIModule",
                    "appName": "HomepageMA"
                });
                accountsModule.presentationController.showAccountsDashboard();
            }.bind(this);
            this.view.forceLayout();
        },
        getDateFromDateComponents: function (dateComponents) {
            var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            return [dateComponents[0], monthNames[dateComponents[1] - 1], dateComponents[2]].join(" ");
        },
        /**Entry Point for Transfer Acknowledgement for Scheduled Transaction
         * @param {object} viewModel Transfer Data
         */
        showTransferAcknowledgeForScheduledTransaction: function (viewModel) {
            //this.view.acknowledgmentModify.setVisibility(true);
            // this.view.btnModifyTransfer.setVisibility(true);
            this.view.btnModifyTransfer.onClick = function () {
                this.modifyTransfer(viewModel.transferData);
            }.bind(this);
            this.view.flxAcknowledgment.setVisibility(true);
            //       this.view.flxAcknowledgementMain.height = "510dp";
            //       this.view.flxTransactionDetails.height = "510dp";
            this.view.flxBalance.setVisibility(true);
            if (viewModel.transferData.status != "Pending") {
                this.view.lblTransactionMessage.text=kony.i18n.getLocalizedString("i18n.FastTransfers.YourTransactionHasBeenScheduledfor");
            } else {
               this.view.lblTransactionMessage.text=kony.i18n.getLocalizedString("i18n.transfers.approvalAck");
            }
            this.view.flxEndDate.setVisibility(true);
            this.view.flxDuration.setVisibility(true);
           // commonUtilities.setText(this.view.lblStartDateKey, kony.i18n.getLocalizedString('i18n.transfers.start_date') + ":", commonUtilities.getaccessibilityConfig());
           this.view.lblStartDateKey.text=kony.i18n.getLocalizedString('i18n.transfers.start_date') + ":";
            if (viewModel.transferData.frequencyKey !== "Once" && viewModel.transferData.howLongKey === "ON_SPECIFIC_DATE") {
               // commonUtilities.setText(this.view.lblEndDateKey, kony.i18n.getLocalizedString("i18n.transfers.end_date") + ":", commonUtilities.getaccessibilityConfig());
               this.view.lblEndDateKey.text=kony.i18n.getLocalizedString("i18n.transfers.end_date") + ":";
               // commonUtilities.setText(this.view.lblEndDateValue, viewModel.transferData.endOnDate, commonUtilities.getaccessibilityConfig());
               this.view.lblEndDateValue.text=viewModel.transferData.endOnDate;
                //commonUtilities.setText(this.view.lblDurationValue, kony.i18n.getLocalizedString("i18n.fastTransfer.dateRange"), commonUtilities.getaccessibilityConfig());
                this.view.lblDurationValue.text=kony.i18n.getLocalizedString("i18n.fastTransfer.dateRange");
            }
            if (viewModel.transferData.frequencyKey !== "Once" && viewModel.transferData.howLongKey === "NO_OF_RECURRENCES") {
                //commonUtilities.setText(this.view.lblEndDateKey, kony.i18n.getLocalizedString("i18n.transfers.lblNumberOfRecurrences") + ":", commonUtilities.getaccessibilityConfig());
                this.view.lblEndDateKey.text = kony.i18n.getLocalizedString("i18n.transfers.lblNumberOfRecurrences") + ":";
                //commonUtilities.setText(this.view.lblEndDateValue, viewModel.transferData.numberOfRecurrences, commonUtilities.getaccessibilityConfig());
                this.view.lblEndDateValue.text= viewModel.transferData.numberOfRecurrences;
               // commonUtilities.setText(this.view.lblDurationValue, kony.i18n.getLocalizedString("i18n.transfers.lblRecurrences"), commonUtilities.getaccessibilityConfig());
               this.view.lblDurationValue.text=kony.i18n.getLocalizedString("i18n.transfers.lblRecurrences");
            }
            if (viewModel.transferData.frequencyKey == "Once") {
                this.view.flxEndDate.setVisibility(false);
                this.view.flxDuration.setVisibility(false);
            }
            this.view.forceLayout();
        },
        /**
         * Entry Point Method of Scheduled Tab
         */
        getScheduledTransactions: function () {
            applicationManager.getModulesPresentationController({
                "moduleName": "TransferFastUIModule",
                "appName": "TransfersMA"
            }).getScheduledUserTransactions();
        },
        /**Modify A Scheduled Transfer
         * @param {object} transferData Transfer Data
         */
        modifyTransfer: function (transferData) {
            this.presenter = applicationManager.getModulesPresentationController({
                "moduleName": "TransferFastUIModule",
                "appName": "TransfersMA"
            });
            var onCancelModifyTransfer = this.getScheduledTransactions;
            var record = {
                transactionType: transferData.transactionType,
                toAccountNumber: transferData.accountTo.accountID,
                fromAccountNumber: transferData.accountFrom.accountID,
                ExternalAccountNumber: transferData.accountTo.accountNumber,
                personId: transferData.accountTo.PayPersonId,
                amount: transferData.amount,
                frequencyType: transferData.frequencyKey,
                numberOfRecurrences: transferData.numberOfRecurrences,
                transactionsNotes: transferData.notes,
                scheduledDate: transferData.sendOnDate,
                frequencyEndDate: transferData.endOnDate,
                frequencyStartDate: transferData.sendOnDate,
                isScheduled: "1",
                transactionDate: transferData.sendOnDate,
                confirmationNumber: transferData.referenceId,
                isModifiedTransferFlow: true,
                serviceName: transferData.serviceName
            }
            this.presenter.showTransferScreen({
                editTransactionObject: record,
                onCancelCreateTransfer: onCancelModifyTransfer
            });
        },
        /**Entry Point for Transfer Acknowledgement for Recent Transaction
         * @param {object} viewModel Transfer Data
         */
        showTransferAcknowledgeForRecentTransaction: function (viewModel) {
            this.view.btnModifyTransfer.setVisibility(false);
            this.view.flxAcknowledgment.setVisibility(true);
            //       this.view.flxAcknowledgementMain.height = "500dp";
            //       this.view.flxTransactionDetails.height = "500dp";
            this.view.flxEndDate.setVisibility(false);
            this.view.flxDuration.setVisibility(false);
            commonUtilities.setText(this.view.lblStartDateKey, kony.i18n.getLocalizedString('i18n.transfers.TransferDate') + ":", commonUtilities.getaccessibilityConfig());
            this.view.flxBalance.setVisibility(true);
            if (viewModel.transferData.status != "Pending") {
                commonUtilities.setText(this.view.lblTransactionMessage, kony.i18n.getLocalizedString("i18n.FastTransfers.YourTransactionHasBeenSuccessful"), commonUtilities.getaccessibilityConfig());
            } else {
                commonUtilities.setText(this.view.lblTransactionMessage, kony.i18n.getLocalizedString("i18n.transfers.approvalAck"), commonUtilities.getaccessibilityConfig());
            }
            //this.view.acknowledgmentModify.setVisibility(false);
            this.view.forceLayout();
        },
        //UI Code
        /**
         * onBreakpointChange : Handles ui changes on .
         * @member of {frmConfirmtransferController}
         * @param {integer} width - current browser width
         * @return {}
         * @throws {}
         */
        onBreakpointChange: function (form, width) {
            var scope = this;
            FormControllerUtility.setupFormOnTouchEnd(width);
           
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            this.customizeAccountsButton();
        },
        onClickPrint: function () {
            var printData = [];
            printData.push({
                key: kony.i18n.getLocalizedString("i18n.common.status"),
                value: this.view.lblTransactionMessage.text
            });
            printData.push({
                key: this.view.lblRefrenceNumber.text,
                value: this.view.lblRefrenceNumberValue.text
            });
            printData.push({
                key: this.view.lblAvailableBalance.text + " " + this.view.lblSavingsAccount.text,
                value: this.view.lblBalanceValue.text
            });
            printData.push({
                key: this.view.lblKey.text,
                value: this.view.lblValue.text
            });
            printData.push({
                key: this.view.lblToKey.text,
                value: this.view.lblToValue.text
            });
            printData.push({
                key: this.view.lblAmountKey.text,
                value: this.view.lblAmountValue.text
            });
            printData.push({
                key: this.view.lblFrequencyKey.text,
                value: this.view.lblFrequencyValue.text
            });
            printData.push({
                key: this.view.lblStartDateKey.text,
                value: this.view.lblStartDateValue.text
            });
            printData.push({
                key: this.view.lblNotesKey.text,
                value: this.view.lblNotesValue.text
            });
            if (this.view.flxEndDate.isVisible) {
                printData.push({
                    key: this.view.lblDurationKey.text,
                    value: this.view.lblDurationValue.text
                });
                printData.push({
                    key: this.view.lblEndDateKey.text,
                    value: this.view.lblEndDateValue.text
                });
            }
            var viewModel = {
                moduleHeader: this.view.lblBillPayAcknowledgement.text,
                tableList: [{
                    tableHeader: this.view.lblHeading1.text,
                    tableRows: printData
                }],
                printCallback: function () {
                    applicationManager.getNavigationManager().navigateTo({
                        appName: 'TransfersMA',
                        friendlyName: 'frmConfirmTransfer'
                    });
                }
            }
            this.presenter.showPrintPage({
                printKeyValueGroupModel: viewModel
            });
        }
    }
});