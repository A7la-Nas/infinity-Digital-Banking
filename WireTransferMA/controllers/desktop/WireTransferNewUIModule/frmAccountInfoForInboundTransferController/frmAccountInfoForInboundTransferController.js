define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'OLBConstants'], function(FormControllerUtility, CommonUtilities, ViewConstants, OLBConstants) {
     
    return {
        updateFormUI: function(context) {
            if (context.isLoading) {
                FormControllerUtility.showProgressBar(this.view);
            } else {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (context.resetForm) {
                this.resetUI();
            }
            if (context.accountDetailsForInbound) {
                this.showCheckingAccountsForInbound(context.accountDetailsForInbound.checkingAccounts);
            }
        },
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
        },
        onBreakpointChange: function(form, width) {
            var scope = this;
            FormControllerUtility.setupFormOnTouchEnd(width);
             
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            this.view.CustomPopupLogout.onBreakpointChangeComponent(scope.view.CustomPopupLogout, width);
        },
        preShow: function() {
            this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxRightBar', 'wireTransferRightbar.flxInfo']);
            this.setInitialActions();

        },
        postShow: function() {
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
        },
        /**
         * Show Checking Accounts For Details for Inbound Transfer. Binds On Selection and trigger details method
         * @member frmWireTransferController
         * @param {array}  checkingAccounts Checking Accounts
         */
        showCheckingAccountsForInbound: function(checkingAccounts) {
            function listBoxMapper(checkingAccount) {
                return [checkingAccount.accountID, CommonUtilities.getAccountDisplayName(checkingAccount)];
            }
            if (checkingAccounts.length > 0) {
                this.view.lbxAccountNumber.masterData = checkingAccounts.map(listBoxMapper);
                this.showInboundDetails(checkingAccounts[0])
                this.view.lbxAccountNumber.onSelection = function() {
                    var selectedId = this.view.lbxAccountNumber.selectedKey;
                    this.showInboundDetails(checkingAccounts.filter(function(account) {
                        return account.accountID === selectedId
                    })[0]);
                }.bind(this);
                this.showAccountDetailsForInboundTransferViewUI();
            } else {
                this.view.flxNoAccounts.setVisibility(true);
                this.view.flxButtons.setVisibility(false);
                this.view.flxSeperatorAccountInfo.setVisibility(false);
                this.view.flxDetails.setVisibility(false);
            }
        },
        setInitialActions: function() {
            var scopeObj = this;
            this.view.wireTransferRightbar.flxInfo.onClick = this.showOneTimeTransferInfo.bind(this);
            this.view.AllFormsConfirmDetails.flxCross.onClick = function() {
                scopeObj.view.AllFormsConfirmDetails.setVisibility(false);
            };
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
         * Show Details of Account Object for Inbound Transfer
         * @member frmWireTransferController
         * @param {object}  accountObject Account Model Object
         */
        showInboundDetails: function(accountObject) {
            var userObject = applicationManager.getUserPreferencesManager().getUserObj();
            var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
            var userObject = applicationManager.getUserPreferencesManager().getUserObj();
            var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
            this.view.rtxLeftValueAccount1.text = accountObject.accountID;
            this.view.rtxLeftValueAccount2.text = userObject.userfirstname + " " + userObject.userlastname;
            this.view.rtxLeftValueAccount3.text = accountObject.jointAccountHolder1;
            this.view.rtxRightValueAccount3.text = accountObject.jointAccountHolder2;
            this.view.rtxLeftValueBank1.text = userObject.bankName;
            this.view.rtxRightValueBank1.text = accountObject.intermediaryBankName;
            this.view.rtxLeftValueBank2.text = accountObject.bankAddress;
            this.view.rtxRightValueBank2.text = accountObject.intermediaryBankAddress;
            this.view.rtxLeftValueBank3.text = accountObject.routingNumber;
            this.view.rtxRightValueBank3.text = accountObject.intermediaryBankSwiftCode;
            this.view.rtxLeftValueBank4.text = accountObject.swiftCode;
            this.view.rtxLeftValueBank5.text = accountObject.accountCurrency || OLBConstants.CURRENCY_NAME;
            this.view.rtxLeftValueBank6.text = CommonUtilities.formatCurrencyWithCommas(applicationManager.getConfigurationManager().wireTranferFees);
            var scope = this.view;
            this.sample(scope.rtxLeftValueAccount1, scope.rtxLeftValueAccount2, scope.rtxLeftValueAccount3, scope.rtxLeftValueBank1, scope.rtxRightValueBank1, scope.rtxLeftValueBank2, scope.rtxRightValueBank2, scope.rtxLeftValueBank3, scope.rtxRightValueBank3, scope.rtxLeftValueBank4, scope.rtxLeftValueBank5, scope.rtxLeftValueBank6)
        },
        sample: function() {

            for (var i = 0; i < arguments.length; i++) {
                var parentflx = arguments[i].parent.id;
                if (arguments[i].text) {
                    this.view[parentflx].setVisibility(true);
                } else
                    this.view[parentflx].setVisibility(false);
            }
        },
        /**
         * Toggles the visibility of Row in account details page based data its passes
         * @param {object}  rowObject in format {rowId: 'id of the row', left: {key: 'i18n', value: 'value'}, right: {key: 'i18n', value: 'value'}}
         */
        inboundConfigureRow: function(rowObject) {
            //var view  = this.view.inboundTransfer;
            var rowView = rowObject.rowId;
            var leftVisible = false,
                rightVisible = false;
            if (rowObject.left && rowObject.left.value) {
                view.rowView.flxLeftKeyValue.setVisibility(true);
                this.view.rowView.lblLeftKey.text = kony.i18n.getLocalizedString(rowObject.left.key);
                this.view.rowView.rtxLeftValue.text = rowObject.left.value;
                leftVisible = true;
            } else {
                this.view.rowView.flxLeftKeyValue.setVisibility(false);
            }
            if (rowObject.right && rowObject.right.value) {
                this.view.rowView.flxRightKeyValue.setVisibility(true);
                this.view.rowView.lblRightKey.text = kony.i18n.getLocalizedString(rowObject.right.key);
                this.view.rowView.rtxRightValue.text = rowObject.right.value;
                rightVisible = true;
            } else {
                this.view.rowView.flxRightKeyValue.setVisibility(false);
            }
            this.view.rowView.parent.setVisibility(leftVisible || rightVisible);
        },
        /**
         * Shows UI for Account Details for Inbound Transfer
         * @member frmWireTransferController
         * @return {void} None
         *  @throws {void} - None
         */
        showAccountDetailsForInboundTransferViewUI: function() {
            this.resetUI();
            this.view.flxDetails.setVisibility(true);
            this.view.flxNoAccounts.setVisibility(false);
            this.view.flxSeperatorAccountInfo.setVisibility(true);
            this.view.flxInboundTransfer.setVisibility(true);
            this.view.lblAddAccountHeading.text = kony.i18n.getLocalizedString("i18n.WireTransfer.accountInfoHeading");
            //this.view.customheader.lblHeaderMobile.text = this.view.lblAddAccountHeading.text;
            this.view.flxTermsAndConditions.setVisibility(true);
            this.view.customheadernew.activateMenu("WIRE TRANSFER");
            this.view.flxButtons.setVisibility(false);
        },
        // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        /**
         * Resets the UI - Hide all major UI Components
         */
        resetUI: function() {
            this.view.flxPrint.setVisibility(false);
            this.view.flxDownload.setVisibility(false);
            this.view.flxDowntimeWarning.setVisibility(false);
            this.view.rtxDowntimeWarning.setVisibility(false);
        },
    };
});