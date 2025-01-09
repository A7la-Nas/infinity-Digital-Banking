define(["CommonUtilities", "FormControllerUtility", "OLBConstants", "ViewConstants"], function(CommonUtilities, FormControllerUtility, OLBConstants, ViewConstants) {
     
    var orientationHandler = new OrientationHandler();
    //var stateListBoxData;
    var addRecipientDomestic;
    flowStatus = false;
    var editData = {
        "recipientID": "",
        "isDeleted": "",
        "templateRecipientCategory": ""
    };
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
            if (context.states) {
                this.populateStates(context.states);
            }
            if (context.permissions) {
                if (context.permissions.internationalPermission)
                    this.view.btnInternationalAccount.setVisibility(true);
                else
                    this.view.btnInternationalAccount.setVisibility(false);
            }
            if (context.Edit) {
                this.view.btnInternationalAccount.setEnabled(false);
                this.populatefields(context.Edit);
                if (context.Edit.templateRecipientCategory === "EXTRACTEDFROMFILE") {
                    editData.templateRecipientCategory = context.Edit.templateRecipientCategory;
                }
                editData.recipientID = context.Edit.recipientID;
                editData.isDeleted = context.Edit.isDeleted;
                if (context.Edit.transactionType === "Individual") {
                    this.view.imgRadioBtnRecipientType2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                    this.view.imgRadioBtnRecipientType2.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
                    this.view.imgRadioBtnRecipientType1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
                    this.view.imgRadioBtnRecipientType1.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
                } else {
                    this.view.imgRadioBtnRecipientType1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                    this.view.imgRadioBtnRecipientType1.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
                    this.view.imgRadioBtnRecipientType2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
                    this.view.imgRadioBtnRecipientType2.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
                }
                flowStatus = true;
                this.enableBtnProceed();
            }
            if (context) {
                if (context.serverError)
                    this.showServerError(context.serverError);
                else {
                    this.showServerError(false);
                    if (context.showLoadingIndicator) {
                        if (context.showLoadingIndicator.status === true)
                            FormControllerUtility.showProgressBar(this.view);
                        else
                            FormControllerUtility.hideProgressBar(this.view);
                    }
                }
            }
        },

        init: function() {
            var scopeObj = this;
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.btnCancel1.onClick = this.cancelOnClick;
            // this.view.btnProceed.onClick = this.proceedOnClick;	
            this.view.tbxZipcode.maxTextLength = 20;
            this.view.tbxCompanyZipCode.maxTextLength = 20;
            this.view.btnInternationalAccount.onClick = function() {
                scopeObj.navToInternational();
            };
            this.view.flxTypeRadio1.onClick = function() {
                scopeObj.RadioBtnAction(scopeObj.view.imgRadioBtnRecipientType1, scopeObj.view.imgRadioBtnRecipientType2);
            };
            this.view.flxTypeRadio2.onClick = function() {
                scopeObj.RadioBtnAction(scopeObj.view.imgRadioBtnRecipientType2, scopeObj.view.imgRadioBtnRecipientType1);
            };
            this.view.lblStatus.onTouchEnd = function() {
                scopeObj.toggleEditRecipientView();
            };
            this.view.lblStatus.onTouchStart = function() {
                scopeObj.toggleProductSelectionCheckbox();
            };
            this.view.tbxRecipientAccountNumber.onBeginEditing = function() {
                scopeObj.hideErrorFlexAddRecipient();
            };
            this.view.tbxReEnterAccountNumber.onBeginEditing = function() {
                scopeObj.hideErrorFlexAddRecipient();
            };
            this.view.btnCancel1.onClick = function() {
                scopeObj.cancelOnClick();
            };
            this.view.btnProceed.onClick = function() {
                scopeObj.proceedOnClick();
            };
            this.view.tbxRecipientName.onKeyUp = function() {
                scopeObj.enableBtnProceed();
            };
            this.view.tbxAddressLine1.onKeyUp = function() {
                scopeObj.enableBtnProceed();
            };
            this.view.tbxAddressLine2.onKeyUp = function() {
                scopeObj.enableBtnProceed();
            };
            this.view.tbxCity.onKeyUp = function() {
                scopeObj.enableBtnProceed();
            };
            this.view.tbxZipcode.onKeyUp = function() {
                scopeObj.enableBtnProceed();
            };
            this.view.tbxRoutingNumber.onKeyUp = function() {
                scopeObj.enableBtnProceed();
            };
            this.view.tbxRecipientAccountNumber.onKeyUp = function() {
                scopeObj.enableBtnProceed();
            };
            this.view.tbxReEnterAccountNumber.onKeyUp = function() {
                scopeObj.enableBtnProceed();
            };
            this.view.tbxAccountNickName.onKeyUp = function() {
                scopeObj.enableBtnProceed();
            };
            this.view.tbxRecipientBankName.onKeyUp = function() {
                scopeObj.enableBtnProceed();
            };
            this.view.tbxBankAddressLine1.onKeyUp = function() {
                scopeObj.enableBtnProceed();
            };
            this.view.tbxBankAddressLIne2.onKeyUp = function() {
                scopeObj.enableBtnProceed();
            };
            this.view.tbxCompanyCity.onKeyUp = function() {
                scopeObj.enableBtnProceed();
            };
            this.view.tbxCompanyZipCode.onKeyUp = function() {
                scopeObj.enableBtnProceed();
            };
            if (this.checkAtLeastOnePermission([
                    OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_CREATE_RECEPIENT
                ])) {
                this.view.flxAddtoExistingRecipientLIst.setVisibility(true);
            } else {
                this.view.flxAddtoExistingRecipientLIst.setVisibility(false);
            }
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
        },

        onBreakpointChange: function(form, width) {
            var scope = this;
            FormControllerUtility.setupFormOnTouchEnd(width);
             
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
            this.view.deletePopup.onBreakpointChangeComponent(scope.view.deletePopup, width);
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            this.view.CustomPopupCancel.onBreakpointChangeComponent(scope.view.CustomPopupCancel, width);
        },

        preShow: function() {
            this.view.tbxReEnterAccountNumber.skin = "sknTbxSSPffffff15PxBorder727272opa20";
            this.view.tbxRecipientAccountNumber.skin = "sknTbxSSPffffff15PxBorder727272opa20";
            this.view.btnInternationalAccount.setEnabled(true);
            FormControllerUtility.disableButton(this.view.btnProceed);
            this.view.lblStatus.text = "D";
            this.view.flxAddtoExistingRecipientLIst.setEnabled(true);
            this.view.flxError.setVisibility(false);
            this.resetAddrecipientData();
            this.toolTips();
            this.setAccessibilityConfig();
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter']);
        },

        postShow: function() {
            this.view.customheadernew.forceCloseHamburger();
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            this.view.customheadernew.activateMenu("Wire Transfer", "Create New Template");
            applicationManager.getNavigationManager().applyUpdates(this);
        },
        checkUserPermission: function(permission) {
            return applicationManager.getConfigurationManager().checkUserPermission(permission);
        },

        checkAtLeastOnePermission: function(permissions) {
            return permissions.some(this.checkUserPermission);
        },
        /*
         *function to form JSON with the entered fields
         */
        toolTips: function() {
            this.view.lblRecipientName.toolTip = kony.i18n.getLocalizedString("i18n.transfers.benificiaryName");
            this.view.lblRecipientType.toolTip = kony.i18n.getLocalizedString("i18n.FastTransfers.SelectARecipientType");
            this.view.lblRecipientAddress.toolTip = kony.i18n.getLocalizedString("i18n.WireTransfer.RecipientsAddress");
            this.view.lblCity.toolTip = kony.i18n.getLocalizedString("i18n.common.city");
            this.view.lblState.toolTip = kony.i18n.getLocalizedString("i18n.common.state");
            this.view.lblZipcode.toolTip = kony.i18n.getLocalizedString("i18n.common.zipcode");
            this.view.lblRoutingNumber.toolTip = kony.i18n.getLocalizedString("i18n.accounts.routingNumber");
            this.view.lblRecipientAccountNumber.toolTip = kony.i18n.getLocalizedString("i18n.WireTransfer.recipientAccountNumber");
            this.view.lblReEnterAccountNumber.toolTip = kony.i18n.getLocalizedString("i18n.WireTransfers.ReEnterAccountNumber");
            this.view.lblAccountNickName.toolTip = kony.i18n.getLocalizedString("i18n.transfers.accountNickName");
            this.view.lblRecipientBankName.toolTip = kony.i18n.getLocalizedString("i18n.WireTransfers.RecipientBankName");
            this.view.lblBankAddress.toolTip = kony.i18n.getLocalizedString("i18n.transfers.bankAddress");
            this.view.lblCompanyCity.toolTip = kony.i18n.getLocalizedString("i18n.common.city");
            this.view.lblCompanyState.toolTip = kony.i18n.getLocalizedString("i18n.common.state");
            this.view.lblCompanyZipCode.toolTip = kony.i18n.getLocalizedString("i18n.common.zipcode");
            this.view.lblRadioOpt1.toolTip = kony.i18n.getLocalizedString("i18n.WireTransfer.Individual");
            this.view.lblRadioOpt2.toolTip = kony.i18n.getLocalizedString("i18n.WireTransfer.Business");
            this.view.btnCancel1.toolTip = kony.i18n.getLocalizedString("i18n.ProfileManagement.BACK");
            this.view.btnProceed.toolTip = kony.i18n.getLocalizedString("i18n.ProfileManagement.ADD");

        },

        setAccessibilityConfig: function() {
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            CommonUtilities.setText(this.view.lblRecipientName, kony.i18n.getLocalizedString("i18n.transfers.benificiaryName"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblRecipientType, kony.i18n.getLocalizedString("i18n.FastTransfers.SelectARecipientType"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblRecipientAddress, kony.i18n.getLocalizedString("i18n.WireTransfer.RecipientsAddress"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblCity, kony.i18n.getLocalizedString("i18n.common.city"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblState, kony.i18n.getLocalizedString("i18n.common.state"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblZipcode, kony.i18n.getLocalizedString("i18n.common.zipcode"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblRoutingNumber, kony.i18n.getLocalizedString("i18n.accounts.routingNumber"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblRecipientAccountNumber, kony.i18n.getLocalizedString("i18n.WireTransfer.recipientAccountNumber"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblReEnterAccountNumber, kony.i18n.getLocalizedString("i18n.WireTransfers.ReEnterAccountNumber"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblAccountNickName, kony.i18n.getLocalizedString("i18n.transfers.accountNickName"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblRecipientBankName, kony.i18n.getLocalizedString("i18n.WireTransfers.RecipientBankName"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblBankAddress, kony.i18n.getLocalizedString("i18n.transfers.bankAddress"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblCompanyCity, kony.i18n.getLocalizedString("i18n.common.city"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblCompanyState, kony.i18n.getLocalizedString("i18n.common.state"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblCompanyZipCode, kony.i18n.getLocalizedString("i18n.common.zipcode"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblRadioOpt1, kony.i18n.getLocalizedString("i18n.WireTransfer.Individual"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblRadioOpt2, kony.i18n.getLocalizedString("i18n.WireTransfer.Business"), accessibilityConfig);
            CommonUtilities.setText(this.view.btnCancel1, kony.i18n.getLocalizedString("i18n.ProfileManagement.BACK"), accessibilityConfig);
            CommonUtilities.setText(this.view.btnProceed, kony.i18n.getLocalizedString("i18n.ProfileManagement.ADD"), accessibilityConfig);
            CommonUtilities.setText(this.view.btnDomesticAccount, kony.i18n.getLocalizedString("i18n.WireTransfer.DomesticAccount"), accessibilityConfig);
            CommonUtilities.setText(this.view.btnInternationalAccount, kony.i18n.getLocalizedString("i18n.WireTransfer.InternationalAccount"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblStep1, kony.i18n.getLocalizedString("i18n.payaperson.RecipientDetails"), accessibilityConfig);
        },


        /**
         * Method to show server error
         * @param {Boolean} status true/false
         */
        showServerError: function(status) {
            if (status === false) {
                this.view.flxDowntimeWarning.setVisibility(false);
            } else {
                this.view.rtxDowntimeWarning.text = status.errorMessage;
                this.view.rtxDowntimeWarning.toolTip = status.errorMessage;
                this.view.flxDowntimeWarning.setVisibility(true);
                //this.view.flxDowntimeWarningr.setFocus(true);
            }
            this.view.forceLayout();
        },
        /*
         *function to form JSON with the entered fields
         */
        enteredData: function() {
            var isBusinessPayeeValue;
            if (applicationManager.getConfigurationManager().isSMEUser === "true") {
                isBusinessPayeeValue = "1";
            }
            if (applicationManager.getConfigurationManager().isRBUser === "true") {
                isBusinessPayeeValue = "0";
            }
            //if(applicationManager.getConfigurationManager().isCombinedUser === "true") {
            if (applicationManager.getUserPreferencesManager().isSingleCustomerProfile === false) {
                isBusinessPayeeValue = "0";
            }

            var data = {
                recipientName: this.view.tbxRecipientName.text,
                addressLine1: this.view.tbxAddressLine1.text,
                addressLine2: this.view.tbxAddressLine2.text,
                city: this.view.tbxCity.text,
                state: this.view.lbxState.selectedKeyValue[1],
                zipCode: this.view.tbxZipcode.text,
                routingNumber: this.view.tbxRoutingNumber.text,
                accountNumber: this.view.tbxRecipientAccountNumber.text,
                nickName: this.view.tbxAccountNickName.text,
                bankName: this.view.tbxRecipientBankName.text,
                accountAddressLine1: this.view.tbxBankAddressLine1.text,
                accountRecipientAddressLine2: this.view.tbxBankAddressLIne2.text,
                accountCity: this.view.tbxCompanyCity.text,
                selectRecipientType: "Individual",
                accountState: this.view.lbxCompanyState.selectedKeyValue[1],
                accountZipcode: this.view.tbxCompanyZipCode.text,
                isBusinessPayee: isBusinessPayeeValue
            };
            return data;
        },

        /*
         * function to prepopulate fileds when Eddit flow is triggered
         */
        populatefields: function(editRecipientDomestic) {
            //stateListBoxData = FormControllerUtility.getListBoxDataFromObjects(context.states, "region_Name", "region_Name");
            this.view.tbxRecipientName.text = editRecipientDomestic.recipientName;
            this.view.tbxAddressLine1.text = editRecipientDomestic.recipientAddressLine1;
            this.view.tbxAddressLine2.text = editRecipientDomestic.recipientAddressLine2;
            //this.view.lbxState.masterData = stateListBoxData;
            this.view.lbxState.selectedKey = this.returnKeyForListboxFromValue(this.view.lbxState, editRecipientDomestic.recipientState);
            this.view.tbxCity.text = editRecipientDomestic.recipientCity,
                this.view.tbxZipcode.text = editRecipientDomestic.recipientZipCode;
            this.view.tbxRoutingNumber.text = editRecipientDomestic.routingNumber;
            this.view.tbxRecipientAccountNumber.text = editRecipientDomestic.recipientAccountNumber;
            this.view.tbxReEnterAccountNumber.text = editRecipientDomestic.recipientAccountNumber;
            this.view.tbxAccountNickName.text = editRecipientDomestic.accountNickname;
            this.view.tbxRecipientBankName.text = editRecipientDomestic.recipientBankName;
            this.view.tbxBankAddressLine1.text = editRecipientDomestic.recipientBankAddress1;
            this.view.tbxBankAddressLIne2.text = editRecipientDomestic.recipientBankAddress2;
            this.view.tbxCompanyCity.text = editRecipientDomestic.recipientBankcity;
            //this.view.lbxCompanyState.masterData = stateListBoxData;
            this.view.lbxCompanyState.selectedKey = this.returnKeyForListboxFromValue(this.view.lbxCompanyState, editRecipientDomestic.recipientBankstate);
            this.view.tbxCompanyZipCode.text = editRecipientDomestic.recipientBankZipCode;
            this.view.btnProceed.text = kony.i18n.getLocalizedString("i18n.konybb.common.SaveAndUpdate");
        },
        /*
         *Function to reset fields
         */
        resetAddrecipientData: function() {
            this.view.tbxRecipientName.text = "";
            this.view.tbxAddressLine1.text = "";
            this.view.tbxAddressLine2.text = "";
            this.view.tbxCity.text = "";
            this.view.lbxState.selectedKey = null;
            this.view.tbxZipcode.text = "";
            this.view.tbxRoutingNumber.text = "";
            this.view.tbxRecipientAccountNumber.text = "";
            this.view.tbxReEnterAccountNumber.text = "";
            this.view.tbxAccountNickName.text = "";
            this.view.tbxRecipientBankName.text = "";
            this.view.tbxBankAddressLine1.text = "";
            this.view.tbxBankAddressLIne2.text = "";
            this.view.tbxCompanyCity.text = "";
            this.view.lbxCompanyState.selectedKey = null;
            this.view.tbxCompanyZipCode.text = "";
            this.view.imgRadioBtnRecipientType2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
            this.view.imgRadioBtnRecipientType2.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
            this.view.imgRadioBtnRecipientType1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
            this.view.imgRadioBtnRecipientType1.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
            FormControllerUtility.disableButton(this.view.btnProceed);
        },


        getWireTransferNewModule: function() {
            return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule", "appName"
            : "WireTransferMA"});
        },

        toggleEditRecipientView: function() {
            if (this.view.lblStatus.text === OLBConstants.SWITCH_ACTION.OFF) {
                this.view.lblStatus.text = OLBConstants.SWITCH_ACTION.ON;
            }
            if (this.view.lblStatus.text === OLBConstants.SWITCH_ACTION.ON) {
                this.view.lblStatus.text = OLBConstants.SWITCH_ACTION.OFF;
            }
        },

        /**
         * Populate List of states in state listbox
         * @param {Object[]} states List of state objects     
         */
        populateStates: function(states) {
            var data = FormControllerUtility.getListBoxDataFromObjects(states, 'region_Name', 'region_Name');
            this.view.lbxState.masterData = data;
            this.view.lbxCompanyState.masterData = data;
        },

        /**
         * fetch the states according to country which is passed and to navigate to frmCreateTempAddInternational form
         * @param {Object[]} frmCreateTempAddInternational (form name)       
         */
        navToInternational: function() {
            var states = this.getWireTransferNewModule().presentationController.getStates();
            // applicationManager.getNavigationManager().navigateTo("frmCreateTempAddInternational");
            var obj = {
                "context": this,
                "callbackModelConfig": {
                    "frmCreateTempAddInternational": true
                }
            };
            var navManager = kony.mvc.getNavigationManager();
            navManager.navigate(obj);
            applicationManager.getNavigationManager().updateForm({
                states: states.region_details_view,
            }, "frmCreateTempAddInternational");
        },

        /**
         * Toggles the Radio Button selection state for Image Labels rendered by font icons
         * @param {object} RadioBtn1 Refernce to image widget 1
         * @param {object} RadioBtn2 Refernce to image widget 2
         */
        RadioBtnAction: function(RadioBtn1, RadioBtn2) {
            if (RadioBtn1.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
                RadioBtn1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                RadioBtn1.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
                RadioBtn2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
                RadioBtn2.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
            } else {
                RadioBtn2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                RadioBtn2.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
                RadioBtn1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
                RadioBtn1.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
            }
        },
        /**
         * Toggle Select Product Checkbox of Select Products Segment
         * @param {object}  index of row
         */
        toggleProductSelectionCheckbox: function() {
            if (this.view.lblStatus.text === "C") {
                this.view.lblStatus.text = "D";
            } else {
                this.view.lblStatus.text = "C";
            }
        },
        /**
         * used for cancel button action in  the manually added receipients flow
         * @returns {string} cancel button action
         */
        cancelOnClick: function() {
            // applicationManager.getNavigationManager().navigateTo("frmBulkTemplateAddRecipients");
            var obj = {
                "context": this,
                "callbackModelConfig": {
                    "frmBulkTemplateAddRecipients": true
                }
            };
            var navManager = kony.mvc.getNavigationManager();
            navManager.navigate(obj);
        },
        /**
         * used for proceed button action in  the manually added receipients flow
         * @returns {string} proceed buttin onclick
         */
        enableBtnProceed: function() {
            if (this.view.tbxRecipientName.text !== "" && this.view.tbxAddressLine1.text != "" && this.view.tbxCity.text != "" && this.view.tbxZipcode.text != "" && this.view.tbxRoutingNumber.text != "" && this.view.tbxRecipientAccountNumber.text != "" &&
                this.view.tbxAccountNickName.text != "" && this.view.tbxRecipientBankName.text != "" && this.view.tbxBankAddressLine1.text != "" && this.view.tbxCompanyCity.text != "" && this.view.tbxCompanyZipCode.text != "") {
                FormControllerUtility.enableButton(this.view.btnProceed);
            } else {
                FormControllerUtility.disableButton(this.view.btnProceed);
            }
        },

        addRecipientManuallyData: function(data) {
            var scope = this;
            var isBusinessPayeeValue;
            if (applicationManager.getConfigurationManager().isSMEUser === "true") {
                isBusinessPayeeValue = "1";
            }
            if (applicationManager.getConfigurationManager().isRBUser === "true") {
                isBusinessPayeeValue = "0";
            }
            //if(applicationManager.getConfigurationManager().isCombinedUser === "true") {
            if (applicationManager.getUserPreferencesManager().isSingleCustomerProfile === false) {
                isBusinessPayeeValue = "0";
            }

            var parms = {
                "recipientName": data.recipientName,
                "recipientAddressLine1": data.addressLine1,
                "recipientAddressLine2": data.addressLine2,
                "recipientCity": data.city,
                "recipientState": data.state,
                "recipientZipCode": data.zipCode,
                "routingNumber": data.routingNumber,
                "recipientCountryName": "United States",
                "recipientAccountNumber": data.accountNumber,
                "accountNickname": data.nickName,
                "recipientBankName": data.bankName,
                "recipientBankAddress1": data.accountAddressLine1,
                "recipientBankAddress2": data.accountRecipientAddressLine2,
                "recipientBankcity": data.accountCity,
                "recipientBankstate": data.accountState,
                "recipientBankZipCode": data.accountZipcode,
                "bulkWireTransferType": "Domestic",
                "transactionType": data.selectRecipientType,
                "internationalRoutingNumber": "",
                "payeeId": null,
                "templateRecipientCategory": "MANUALLYADDED",
                "isBusinessPayee": isBusinessPayeeValue
            };
            scope.addRecipientDomestic = parms;
            return parms;
        },
        /*
         * function for error senarios when re-entered accountNumber is not eaual to account number
         */
        hideErrorFlexAddRecipient: function() {
            this.view.tbxReEnterAccountNumber.skin = "sknTbxSSPffffff15PxBorder727272opa20";
            this.view.tbxRecipientAccountNumber.skin = "sknTbxSSPffffff15PxBorder727272opa20";
            this.view.flxError.setVisibility(false);
        },

        /*
         * function to reset UI when edit fow is triggered
         */
        reSetCheckbox: function(recipientType) {
            if (recipientType == "ExistingRecipient") {
                this.view.lblStatus.text = "C";
                this.view.flxAddtoExistingRecipientLIst.setEnabled(false);
            } else {
                this.view.lblStatus.text = "D";
                this.view.flxAddtoExistingRecipientLIst.setEnabled(false);
            }
        },
        /*
         * function for the proceed onClick
         */
        proceedOnClick: function() {
            var scope = this;
            var wireTransferNewModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
            var data = scope.addRecipientManuallyData(scope.enteredData());
            if (this.view.imgRadioBtnRecipientType1.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO)
                data.transactionType = kony.i18n.getLocalizedString("i18n.WireTransfer.Individual");
            else
                data.transactionType = kony.i18n.getLocalizedString("i18n.WireTransfer.Business");
            if (this.view.tbxRecipientAccountNumber.text != this.view.tbxReEnterAccountNumber.text) {
                this.view.tbxReEnterAccountNumber.skin = "skntxtSSP424242BorderFF0000Op100Radius2px";
                this.view.tbxRecipientAccountNumber.skin = "skntxtSSP424242BorderFF0000Op100Radius2px";
                this.view.lblError.text = "Entered account number is not matching with Re-Entered Account Number";
                this.view.flxError.setVisibility(true);
                FormControllerUtility.disableButton(this.view.btnProceed);
            } else {
                this.view.tbxReEnterAccountNumber.skin = "sknTbxSSPffffff15PxBorder727272opa20";
                this.view.tbxRecipientAccountNumber.skin = "sknTbxSSPffffff15PxBorder727272opa20";
                var wireTransferNewModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
                var counter = wireTransferNewModule.presentationController.isBWTAdditionOfRecordPossible();
                if (counter === 0) {
                    this.view.lblError.text = "Recipient can't be added";
                    this.view.flxError.setVisibility(true);
                    FormControllerUtility.disableButton(this.view.btnProceed);
                } else {
                    this.view.flxError.setVisibility(false);
                    FormControllerUtility.showProgressBar(this.view);
                    if (flowStatus === false)
                        scope.sendRecipientData(scope.addRecipientDomestic);
                    else
                        scope.sendEditRecipientData(scope.addRecipientDomestic, editData);
                }
            }
        },
        /*
         * function 
         */
        sendRecipientData: function(data) {
            var wireTransferNewModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
            if (this.view.lblStatus.text === "D") {
                var newData = [];
                newData.push(data);
                wireTransferNewModule.presentationController.addAdditionalKeysInRecipientsRecord(newData, OLBConstants.RECIPIENT_CATEGORY.MANUALLY_ADDED);
                wireTransferNewModule.presentationController.addData(newData, false);
                wireTransferNewModule.presentationController.toggleAddRecFlag();
                wireTransferNewModule.presentationController.navigateToAddRecipientsForm();
            } else {
                data.templateRecipientCategory = "EXISTINGRECIPIENT";
                wireTransferNewModule.presentationController.addRecipientsManually(data, "addRecipient");
            }
        },
        /*
         *
         */
        sendEditRecipientData: function(data, editData) {
            var wireTransferNewModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
            data.recipientID = editData.recipientID;
            data.isDeleted = editData.isDeleted;
            if (editData.templateRecipientCategory === "EXTRACTEDFROMFILE") {
                data.templateRecipientCategory = editData.templateRecipientCategory;
            }
            if (this.view.lblStatus.text === "D") {
                var newData = [];
                newData.push(data);
                wireTransferNewModule.presentationController.addData(newData, true);
                wireTransferNewModule.presentationController.toggleAddRecFlag();
                wireTransferNewModule.presentationController.navigateToAddRecipientsForm();
            } else {
                data.templateRecipientCategory = "EXISTINGRECIPIENT";
                wireTransferNewModule.presentationController.addRecipientsManually(data, "addRecipient");
            }
            flowStatus = false;
        },
        /**
         * Return key corresponding to value for Listbox
         * @param {widget} listbox -widget Id
         * @param {string} value -value for which key need to be searched
         * @returns {string} Key of the listbox
         */
        returnKeyForListboxFromValue: function(listbox, value) {
            var data = listbox.masterData;
            data = data.filter(function(item) {
                return item[1] === value
            });
            return data[0] ? data[0][0] : listbox.masterData[0][0];
        },
    };
});