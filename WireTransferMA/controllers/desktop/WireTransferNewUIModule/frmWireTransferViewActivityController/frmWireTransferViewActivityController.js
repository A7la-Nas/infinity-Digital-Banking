define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'OLBConstants'], function(FormControllerUtility, CommonUtilities, ViewConstants, OLBConstants) {
     
    var orientationHandler = new OrientationHandler();
    return {
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
        },
        onBreakpointChange: function(form, width) {
            var scope = this;
            this.view.CustomPopupLogout.onBreakpointChangeComponent(scope.view.CustomPopupLogout, width);
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            FormControllerUtility.setupFormOnTouchEnd(width);
            this.view.lblAddAccountHeading.setVisibility(true);
             
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
        },
        preShow: function() {
            this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxRightBar', 'wireTransferRightbar.flxInfo', 'wireTransferRightbar.flxAddAccountWindow']);
            this.setInitialActions();
        },
        postShow: function() {
            this.view.customheadernew.forceCloseHamburger();
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            this.view.customheadernew.activateMenu("Wire Transfer", "My Recipients");
            applicationManager.getNavigationManager().applyUpdates(this);
            var break_point = kony.application.getCurrentBreakpoint();
            if (break_point == 640 || orientationHandler.isMobile) {
                this.view.TermsAndConditions.height = "130dp";
                this.view.forceLayout();
            }
        },
        /**
         * Binds initial widget actions - Should be called from pre show
         */
        setInitialActions: function() {
            var scopeObj = this;
            this.view.lblAddAccountHeading.setVisibility(true);
            this.view.wireTransferRightbar.flxInfo.onClick = this.showOneTimeTransferInfo.bind(this);
            //             this.view.AllFormsConfirmDetails.flxCross.onClick = function() {
            //             scopeObj.view.AllFormsConfirmDetails.setVisibility(false);
            //             };
        },
        /**
         * Shows I-icon for one time transfer
         */
        showOneTimeTransferInfo: function() {
            var scopeObj = this;
            if (scopeObj.view.AllFormsConfirmDetails.isVisible === false) {
                scopeObj.view.AllFormsConfirmDetails.isVisible = true;
                scopeObj.view.AllFormsConfirmDetails.left = scopeObj.view.flxRightBar.info.frame.x + scopeObj.view.wireTransferRightbar.flxInfo.info.frame.x - 135 + "dp";
                scopeObj.view.AllFormsConfirmDetails.RichTextInfo.text = kony.i18n.getLocalizedString("i18n.WireTransfer.msgInfo2OneTime");
                if (scopeObj.view.wireTransferRightbar.flxAccountInfoForAccountTransfer.isVisible === true) scopeObj.view.AllFormsConfirmDetails.top = scopeObj.view.flxRightBar.info.frame.height - 80 + "dp";
                else scopeObj.view.AllFormsConfirmDetails.top = scopeObj.view.flxRightBar.info.frame.height - 10 + "dp";
                scopeObj.view.forceLayout();
            } else scopeObj.view.AllFormsConfirmDetails.isVisible = false;
        },
        /**
         * Returns the wire Transfer Module
         * @returns {object} Reference to wire transfer module.
         */
        getWireTransferModule: function() {
            return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule", "appName": "WireTransferMA"});
        },
        /**
         * @param {context} context Context for the UI
         */
        updateFormUI: function(context) {
            if (context.isLoading) {
                FormControllerUtility.showProgressBar(this.view);
            } else {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (context.recipientActivity) {
                var transactions = context.recipientActivity.transactions.Transactions ? context.recipientActivity.transactions.Transactions : context.recipientActivity.transactions;
                this.showRecipientActivity(context.recipientActivity.recipient, transactions);
            }
        },
        /**
         * Shows The recipient activity
         * @param {object} recipient Recipient Object
         * @param {object[]} transactions List of transactions
         */
        showRecipientActivity: function(recipient, transactions) {
            var scopeObj = this;
            //if(applicationManager.getConfigurationManager().isCombinedUser === "true"){
            if (applicationManager.getUserPreferencesManager().profileAccess === "both") {
                this.view.lblAccIcon.setVisibility(false);
                this.view.lblAccIcon.text = recipient.isBusinessPayee === "1" ? "r" : "s";
            } else {
                this.view.lblAccIcon.setVisibility(false);
            }
            this.view.lblHeader.text = kony.i18n.getLocalizedString("i18n.billPay.PaymentActivity");
            this.view.lblAccountName.text = recipient.payeeNickName;
            this.view.lblAccountHolder.text = kony.i18n.getLocalizedString("i18n.common.accountNumber") + " : " + recipient.accountNumber;
            this.view.lblAmountDeducted.text = CommonUtilities.formatCurrencyWithCommas(0);
            this.view.btnbacktopayeelist.onClick = function() {
                scopeObj.getWireTransferModule().presentationController.showManageRecipientList();
            };
            scopeObj.wireTransferActivity(transactions);
        },
        /**
         * Show view activity based on data from backend
         * @param {JSON} viewActivityRecipientTransactions -Activities of particular recipient
         */
        wireTransferActivity: function(viewActivityRecipientTransactions) {
            var scopeObj = this;
            if (viewActivityRecipientTransactions.length > 0) {
                scopeObj.showWireTransferActivityScreen();
                scopeObj.setDataViewActivity(viewActivityRecipientTransactions);
            } else {
                scopeObj.noWireTransferActivity();
            }
        },
        /**
         * Shows the wire transfer activity screen
         */
        showWireTransferActivityScreen: function() {
            this.view.flxWireTransferActivityWindow.setVisibility(true);
            this.view.flxSegment.setVisibility(true);
            this.view.flxNoRecords.setVisibility(false);
        },
        /**
         * Show No activity for recipient screen
         */
        noWireTransferActivity: function() {
            this.showWireTransferActivityScreen();
            this.view.flxSegment.setVisibility(false);
            this.view.flxNoRecords.setVisibility(true);
            this.view.forceLayout();
        },
        /**
         * Bind data for activities for view activities
         * @member frmWireTransferController
         * @param {JSON} viewActivityRecipientTransactions -Activities of particular recipient
         * @returns {void} - None
         * @throws {void} - None
         */
        setDataViewActivity: function(viewActivityRecipientTransactions) {
            var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"HomepageMA", "moduleName": "AccountsUIModule"});
            this.view.lblHeader.text = kony.i18n.getLocalizedString("i18n.billPay.PaymentActivity");
            //  this.view.lblAccountName.text = viewActivityRecipientTransactions[0].payeeNickName;
            this.view.lblAmountDeducted.text = CommonUtilities.formatCurrencyWithCommas(viewActivityRecipientTransactions[0].amountTransferedTillNow, false, viewActivityRecipientTransactions[0].currencyCode);
            var break_point = kony.application.getCurrentBreakpoint();
            var dataMap = {
                "lblpaiddate": "lblpaiddate",
                "lblFrom": "lblFrom",
                "flxFromUser": "flxFromUser",
                "lblFromUser": "lblFromUser",
                "lblFromAccount": "lblFromAccount",
                "lblAmount": "lblAmount",
                "lblAmount1": "lblAmount1",
                "lblStatus": "lblStatus",
                "lblAmountHeader": "lblAmountHeader",
                "lblFromHeader": "lblFromHeader",
                "flxSortTransferActivityNew": "flxSortTransferActivityNew",
                "flxWireTransferActivityMobileNew": "flxWireTransferActivityMobileNew"
            };
            viewActivityRecipientTransactions = viewActivityRecipientTransactions.map(function(dataItem) {
                return {
                    "lblpaiddate": CommonUtilities.getFrontendDateString(dataItem.transactionDate),
                    "lblFrom": (dataItem.fromNickName!=="" && dataItem.fromNickName!==null && dataItem.fromNickName)?dataItem.fromNickName:dataItem.fromAccountName,
                    "lblFromAccount": CommonUtilities.truncateStringWithGivenLength(dataItem.fromNickName, 25),
                    "flxFromUser": {
                        //"isVisible": applicationManager.getConfigurationManager().isCombinedUser === "true" ? true : false
                        "isVisible": applicationManager.getUserPreferencesManager().profileAccess === "both" ? true : false
                    },
                    "lblFromUser": {
                        "text": accountsModule.presentationController.fetchIsBusinessAccount(dataItem.fromAccountNumber) === "true" ? "r" : "s"
                    },
                    "lblAmount": CommonUtilities.formatCurrencyWithCommas(dataItem.amount, false, dataItem.currencyCode),
                    "lblAmount1": CommonUtilities.formatCurrencyWithCommas(dataItem.amount, false, dataItem.currencyCode),
                    "lblStatus": dataItem.statusDescription,
                    "lblAmountHeader": "Running Balance",
                    "lblFromHeader": "From:",
                    "template": "flxSortTransferActivityNew"
                };
            });
            this.view.segTransferActivity.setVisibility(true);
            this.view.segTransferActivity.widgetDataMap = dataMap;
            if (break_point == 640 || orientationHandler.isMobile) {
                for (var i = 0; i < viewActivityRecipientTransactions.length; i++) {
                    viewActivityRecipientTransactions[i].template = "flxWireTransferActivityMobileNew";
                }
            }
            this.view.segTransferActivity.setData(viewActivityRecipientTransactions);
            this.view.flxSegment.setVisibility(true);
            this.view.forceLayout();
            //this.AdjustScreen();
        }
    }
});