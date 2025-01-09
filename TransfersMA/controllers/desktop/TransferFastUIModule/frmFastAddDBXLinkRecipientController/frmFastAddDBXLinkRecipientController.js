define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'OLBConstants'], function (FormControllerUtility, CommonUtilities, ViewConstants, OLBConstants) {
     
    return {
        /**
         * updateFormUI - the entry point method for the form controller.
         * @param {Object} viewModel - it contains the set of view properties and keys.
         */
        mockdata: [{
            "accountname": "ABC Private Company"
        }, {
            "accountname": "ABC Private Company"
        }, {
            "accountname": "ABC Private Company"
        }, {
            "accountname": "ABC Private Company"
        }, {
            "accountname": "ABC Private Company"
        }],
        viewmodel: "",
        updateFormUI: function (viewModel) {
            if (viewModel.isLoading === true) {
                FormControllerUtility.showProgressBar(this.view);
            } else if (viewModel.isLoading === false) {
                FormControllerUtility.hideProgressBar(this.view);
            } else {
                this.setLinkRecipientView(viewModel);
                this.viewmodel = viewModel;
            }
        },
        init: function () {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function () { };
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.view.btnConfirm.toolTip = kony.i18n.getLocalizedString("i18n.common.confirm");
            this.view.btnModify.toolTip = kony.i18n.getLocalizedString("i18n.TransfersEur.btnBack");
            this.view.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
        },
        preShow: function () {
            this.view.customheadernew.activateMenu("FASTTRANSFERS", "Add Infinity Accounts");
            this.view.flxDialogs.setVisibility(false);
            var scopeObj = this;
            var combineduser = applicationManager.getConfigurationManager().isCombinedUser === "true";
            scopeObj.transfersFastPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferFastUIModule").presentationController;
            if (combineduser) {
                scopeObj.view.flxRetailBanking.setVisibility(true);
                scopeObj.view.flxBusinessBanking.setVisibility(true);
            } else {
                scopeObj.view.flxRetailBanking.setVisibility(false);
                scopeObj.view.flxBusinessBanking.setVisibility(false);
                scopeObj.view.flxFeatureContainer.isVisible = true;
            }
            FormControllerUtility.updateWidgetsHeightInInfo(this, ['flxHeader', 'flxFooter']);
        },
        onBreakpointChange: function (form, width) {
            var scope = this;
            FormControllerUtility.setupFormOnTouchEnd(width);
           
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            this.view.CancelPopup.onBreakpointChangeComponent(scope.view.CancelPopup, width);
            this.resetUI();
        },
        /**
         * postShow Actions
         */
        postShow: function () {
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
        },
        /**
         * sets the Domain option where user can select 
         * @param {Object} data contains account details
         */
        setLinkRecipientView: function (data) {
            var scopeObj = this;
            var combineduser = applicationManager.getConfigurationManager().isCombinedUser === "true";
            scopeObj.transfersFastPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferFastUIModule").presentationController;
            var viewModel = data;
            //      
            //have to set company name
            //  viewModel["DBXAccount"] = data;
            var data = this.populateCompanySegment(this.mockdata, this.mockdata)
            this.view.segAllCompanies.setData(data);
            scopeObj.view.flxFeatureContainer.isVisible = false;
            scopeObj.view.forceLayout();
            scopeObj.view.btnCancel.onClick = function () {
                scopeObj.showCancelPopup();
            };
            scopeObj.view.btnModify.onClick = function () {
                applicationManager.getNavigationManager().navigateTo("frmFastAddDBXAccount");
            };
            scopeObj.view.btnConfirm.onClick = function () {
                scopeObj.transfersFastPresentationController.addDBXAccountConfirm(viewModel);
            };
            scopeObj.view.lblradioButton1.onTouchStart = this.onSelectRetailTouchStart;
            scopeObj.view.lblradioButton2.onTouchStart = this.onSelectbusinessTouchStart;
            scopeObj.view.lblCheckSelectAll.onTouchEnd = this.checkAllCompanies;
            scopeObj.view.btnConfirm.skin = ViewConstants.SKINS.BLOCKED;
            scopeObj.view.btnConfirm.hoverSkin = ViewConstants.SKINS.BLOCKED;
            scopeObj.view.btnConfirm.focusSkin = ViewConstants.SKINS.BLOCKED;
            scopeObj.view.btnConfirm.setEnabled(false);
        },
        /**
         * show or hide cancel popup
         */
        showCancelPopup: function () {
            var scopeObj = this;
            scopeObj.view.flxDialogs.setVisibility(true);
            scopeObj.view.flxCancelPopup.setVisibility(true);
            scopeObj.view.flxCancelPopup.left = "0%";
            var popupComponent = scopeObj.view.flxCancelPopup.widgets()[0];
            popupComponent.top = ((kony.os.deviceInfo().screenHeight / 2) - 135) + "px";
            popupComponent.btnYes.onClick = function () {
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxCancelPopup.left = "-100%";
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "AccountsUIModule",
                    "appName": "HomepageMA"
                }).presentationController.showAccountsDashboard();
            };
            popupComponent.btnNo.onClick = function () {
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxCancelPopup.left = "-100%";
            }
            popupComponent.flxCross.onClick = function () {
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxCancelPopup.left = "-100%";
            }
        },
        SetRadioBtnBanking: function (RadioBtnSelected, RadioBtnUnselected) {
            RadioBtnSelected.text = "M";
            RadioBtnSelected.skin = "sknRadioselectedFonticon";
            RadioBtnUnselected.text = "L";
            RadioBtnUnselected.skin = "sknlblOLBFonts0273E420pxOlbFontIcons";
        },
        onSelectRetailTouchStart: function (event) {
            var scopeObj = this;
            scopeObj.SetRadioBtnBanking(this.view.lblradioButton1, this.view.lblradioButton2);
            scopeObj.view.flxFeatureContainer.isVisible = false;
            FormControllerUtility.enableButton(scopeObj.view.btnConfirm);
        },
        onSelectbusinessTouchStart: function (event) {
            var scopeObj = this;
            scopeObj.SetRadioBtnBanking(this.view.lblradioButton2, this.view.lblradioButton1);
            scopeObj.view.flxFeatureContainer.isVisible = true;
        },
        /**
         * Method to populate the Segment with company list
         *  @param {object} accounts - which consists of list of company
         * @returns {object} formatted company in the segment
         */
        populateCompanySegment: function (accounts, selectedAccounts) {
            var scopeObj = this;
            //       var selectedAccounts = selectedAccounts ? selectedAccounts.map(function(account) {
            //         return account.Account_id || account.id;
            //       }) : [];
            return accounts.map(function (account, index) {
                return {
                    // "Account_id": account.Account_id,
                    "lblAccountName": account.accountname,
                    "lblCheckAccount": {
                        text: OLBConstants.FONT_ICONS.CHECBOX_SELECTED, //(selectedAccounts.indexOf(account.Account_id) >= 0) ? OLBConstants.FONT_ICONS.CHECBOX_SELECTED : OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED,
                        skin: "sknlblOLBFonts0273E420pxOlbFontIcons",
                        onTouchEnd: scopeObj.onAccountCheckboxClick.bind(scopeObj, index)
                    }
                };
            });
        },
        /* Method to check or uncheck the checkbox
         * @param {var} index : specifies the row-index
         */
        onAccountCheckboxClick: function (index) {
            var scopeObj = this;
            var accountData = scopeObj.view.segAllCompanies.data;
            FormControllerUtility.toggleFontCheckbox(accountData[index].lblCheckAccount);
            scopeObj.view.segAllCompanies.setDataAt(accountData[index], index);
            scopeObj.CompanyAccessValidation();
            // if(scopeObj.view.btnConfirm.text !== kony.i18n.getLocalizedString("i18n.common.confirm")){
            //checking for any data change
            var flag = 0;
            var accountDataLen = 0;
            for (var i = 0; i < accountData.length; i++) {
                if (accountData[i]["lblCheckAccount"]["text"] === "C") accountDataLen++;
            }
            //         if(this.customRoleObj.selectedAccounts.length !== accountDataLen){
            //           flag=1;
            if (accountDataLen === 0) flag = 0;
            else flag = 1;
            // }
            if (flag) FormControllerUtility.enableButton(scopeObj.view.btnConfirm);
            else FormControllerUtility.disableButton(scopeObj.view.btnConfirm);
            //}
        },
        /**
         * Method to handle navigate to confirmation beneficiery on cancellation of Create User
         */
        CompanyAccessValidation: function () {
            var scopeObj = this;
            var companySegData = scopeObj.view.segAllCompanies.data;
            for (var i in companySegData) {
                if (FormControllerUtility.isFontIconChecked(companySegData[i].lblCheckAccount)) {
                    FormControllerUtility.enableButton(scopeObj.view.btnConfirm);
                    return;
                }
            }
            FormControllerUtility.disableButton(scopeObj.view.btnConfirm);
        },
        /* checkAllCompanies : method to toggle all the checkboxes.
         */
        checkAllCompanies: function () {
            var scopeObj = this;
            var companySegData = scopeObj.view.segAllCompanies.data;
            FormControllerUtility.toggleFontCheckbox(scopeObj.view.lblCheckSelectAll)
            var checkState = scopeObj.view.lblCheckSelectAll.text;
            var checkSkin = scopeObj.view.lblCheckSelectAll.skin;
            var companySegData = scopeObj.view.segAllCompanies.data;
            for (var i in companySegData) {
                companySegData[i].lblCheckAccount.text = checkState;
                companySegData[i].lblCheckAccount.skin = checkSkin;
            }
            this.view.segAllCompanies.setData(companySegData);
            if (FormControllerUtility.isFontIconChecked(scopeObj.view.lblCheckSelectAll)) {
                FormControllerUtility.enableButton(scopeObj.view.btnConfirm);
                return;
            }
            FormControllerUtility.disableButton(scopeObj.view.btnConfirm);
        },
        resetUI: function () {
            var scopeObj = this;
            this.setLinkRecipientView(this.viewmodel);
            var combineduser = applicationManager.getConfigurationManager().isCombinedUser === "true";
            scopeObj.transfersFastPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferFastUIModule").presentationController;
            if (combineduser) {
                scopeObj.view.flxRetailBanking.setVisibility(true);
                scopeObj.view.flxBusinessBanking.setVisibility(true);
            } else {
                scopeObj.view.flxRetailBanking.setVisibility(false);
                scopeObj.view.flxBusinessBanking.setVisibility(false);
            }
            scopeObj.view.btnConfirm.skin = ViewConstants.SKINS.BLOCKED;
            scopeObj.view.btnConfirm.hoverSkin = ViewConstants.SKINS.BLOCKED;
            scopeObj.view.btnConfirm.focusSkin = ViewConstants.SKINS.BLOCKED;
            scopeObj.view.btnConfirm.setEnabled(false);
        }
    };
});