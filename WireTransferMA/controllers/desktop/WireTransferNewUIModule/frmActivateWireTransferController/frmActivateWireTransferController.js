define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'OLBConstants'], function(FormControllerUtility, CommonUtilities, ViewConstants, OLBConstants) {
     
    return {
        /**
         * @param {context} context Context for the UI
         */
        updateFormUI: function(context) {
            if (context.isLoading) {
                FormControllerUtility.showProgressBar(this.view);
            } else {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (context.activationScreen) {
                this.showActivationScreen(context.activationScreen)
            }
            if (context.resetForm) {
                this.resetUI();
            }
            if (context.TnCcontent) {
                this.bindTnCData(context.TnCcontent);
            }
            if (context.TnCFailure) {
                this.disableTnC();
            }
        },
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            FormControllerUtility.setRequestUrlConfig(this.view.brwBodyTnC);
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
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain']);
            this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
            this.view.flxDefaultAccountForSendingInfo.onClick = this.onInfoClick;
            this.view.ProfileInfo.flxCross.onClick = this.onInfoClose;
        },
        postShow: function() {
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
        },
        bindTnCData: function(TnCcontent) {
            CommonUtilities.disableButton(this.view.btnProceed);
            this.view.lblFavoriteEmailCheckBoxMain.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
            this.view.flxIAgree.setVisibility(true); 
            if (TnCcontent.contentTypeId === OLBConstants.TERMS_AND_CONDITIONS_URL) {
                this.view.btnTermsAndConditions.onClick = function() {
                    window.open(TnCcontent.termsAndConditionsContent);
                }
            } else {
                this.view.btnTermsAndConditions.onClick = this.showTermsAndConditionPopUp;
                this.setTnCDATASection(TnCcontent.termsAndConditionsContent);
                FormControllerUtility.setHtmlToBrowserWidget(this, this.view.brwBodyTnC, TnCcontent.termsAndConditionsContent);
            }
            this.view.flxClose.onClick = this.hideTermsAndConditionPopUp;
            this.view.lblFavoriteEmailCheckBoxMain.onTouchEnd = this.toggleTnC.bind(this, this.view.lblFavoriteEmailCheckBoxMain);
        },
        showTermsAndConditionPopUp: function() {
            FormControllerUtility.setLblCheckboxState(FormControllerUtility.isFontIconChecked(this.view.lblFavoriteEmailCheckBoxMain), this.view.lblFavoriteEmailCheckBoxMain);
            this.view.flxDialogs.setVisibility(true);
            this.view.flxTermsAndConditionsPopUp.setVisibility(true);
            this.view.forceLayout();
        },
        setTnCDATASection: function(content) {
            this.view.rtxTC.text = content;
        },
        hideTermsAndConditionPopUp: function() {
            this.view.flxDialogs.setVisibility(false);
            this.view.flxTermsAndConditionsPopUp.setVisibility(false);
        },

        toggleTnC: function(widget) {
            CommonUtilities.toggleFontCheckbox(widget);
            if (widget.text === OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED && !CommonUtilities.isCSRMode())
                CommonUtilities.disableButton(this.view.btnProceed);
            else
                this.validateForm();
        },      	
        validateForm: function() {
            if (FormControllerUtility.isFontIconChecked(this.view.lblFavoriteEmailCheckBoxMain) && this.view.lbxDefaultAccountForSending.selectedKey) {
                CommonUtilities.enableButton(this.view.btnProceed); 
            }
        },
        disableTnC: function() {
            this.view.flxIAgree.setVisibility(false);
            CommonUtilities.enableButton(this.view.btnProceed);
        },
        enableTnC: function() {
            CommonUtilities.disableButton(this.view.btnProceed);
            this.view.flxIAgree.setVisibility(true);
        },
        onInfoClick: function() {
            this.view.ProfileInfo.setVisibility(true);
            this.view.forceLayout();
        },

        onInfoClose: function() {
            this.view.ProfileInfo.setVisibility(false);
            this.view.forceLayout();
        },
        /**
         * Returns the wire Transfer Module
         * @returns {object} Reference to wire transfer module.
         */
        getWireTransferModule: function() {
            return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule", "appName": "WireTransferMA"});
        },
        /**
         * View Entry Point Method for Activation Screen
         * @param {object} activationScreenData Data for activation screen data
         * @param {Account[]} activationScreenData.checkingAccounts Accounts with type checking
         */
        showActivationScreen: function(activationScreenData) {
            var scopeObj = this;
            if (activationScreenData.checkingAccounts.length === 0) {
                this.getWireTransferModule().presentationController.showNotEligibleScreen();
                return;
            }
            this.showActivationScreenUI();
            FormControllerUtility.setLblCheckboxState(false, this.view.lblFavoriteEmailCheckBoxMain);
            FormControllerUtility.disableButton(this.view.btnProceed);
            this.view.btnCancel.onClick = function() {
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxTermsAndConditionsPopUp.setVisibility(false);
            };
            this.view.btnCancel1.onClick = function() {
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxTermsAndConditionsPopUp.setVisibility(false);
                if (applicationManager.getUserPreferencesManager().isUserLoggedin()) {
                    var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"HomepageMA", "moduleName": "AccountsUIModule"});
                    accountsModule.presentationController.showAccountsDashboard();
                }

            };
            this.view.flxClose.onClick = function() {
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxTermsAndConditionsPopUp.setVisibility(false);
            };
            this.view.btnSave.onClick = function() {
                FormControllerUtility.setLblCheckboxState(true, scopeObj.view.lblFavoriteEmailCheckBoxMain);
                if (FormControllerUtility.isFontIconChecked(scopeObj.view.lblFavoriteEmailCheckBoxMain) && scopeObj.view.lbxDefaultAccountForSending.selectedKey) {
                    FormControllerUtility.enableButton(scopeObj.view.btnProceed);
                } else {
                    FormControllerUtility.disableButton(scopeObj.view.btnProceed);
                }
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxTermsAndConditionsPopUp.setVisibility(false);
            };
            this.view.flxTCContentsCheckbox.onClick = function() {
                FormControllerUtility.toggleFontCheckbox(scopeObj.view.lblFavoriteEmailCheckBoxMain);
            };
            if (CommonUtilities.isCSRMode()) {
                this.view.btnProceed.onClick = FormControllerUtility.disableButtonActionForCSRMode();
                this.view.btnProceed.skin = FormControllerUtility.disableButtonSkinForCSRMode();
            } else {
                this.view.btnProceed.onClick = this.activateWireTransfer;
            }
            this.mapCheckingAccountsForActivation(activationScreenData.checkingAccounts);
        },
        /**
         * Map Checking Acccounts for activation in list box
         * @param {Account[]} checkingAccounts Accounts with type checking
         */
        mapCheckingAccountsForActivation: function(checkingAccounts) {
            var listBoxData = FormControllerUtility.getListBoxDataFromObjects(checkingAccounts, "accountID", CommonUtilities.getAccountDisplayName);
            this.view.lbxDefaultAccountForSending.masterData = listBoxData;
            this.view.lbxDefaultAccountForSending.onSelection = this.validateForm.bind(this);
        },
        /**
         * Activate wire transfers.
         */
        activateWireTransfer: function() {
            var defaultAccountID = this.view.lbxDefaultAccountForSending.selectedKey;
            this.getWireTransferModule().presentationController.activateWireTransfer(defaultAccountID);
        },
        /**
         * Shows the UI component for Activation screen.
         */
        showActivationScreenUI: function() {
            this.resetUI();
            this.view.customheadernew.activateMenu("WIRE TRANSFER");
            this.view.flxActivateWireTransfer.setVisibility(true);
            this.view.lblAddAccountHeading.text = kony.i18n.getLocalizedString("i18n.WireTransfer.ActivateWireTransfer");
        },
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