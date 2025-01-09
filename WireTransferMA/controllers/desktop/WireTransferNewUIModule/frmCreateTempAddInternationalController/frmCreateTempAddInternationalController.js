define(["CommonUtilities", "FormControllerUtility", "OLBConstants", "ViewConstants"], function(CommonUtilities, FormControllerUtility, OLBConstants, ViewConstants) {
     
    var orientationHandler = new OrientationHandler();
    var addRecipientInternational;
    //var stateListBoxData;
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
                if (context.permissions.domesticPermission)
                    this.view.btnDomesticAccount.setVisibility(true);
                else
                    this.view.btnDomesticAccount.setVisibility(false);
            }
            if (context.showtoast) {

            }
            if (context.Edit) {
                this.view.btnDomesticAccount.setEnabled(false);
                this.populatefields(context.Edit);
                flowStatus = true;
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
                if (context.Edit.templateRecipientCategory === "EXTRACTEDFROMFILE") {
                    editData.templateRecipientCategory = context.Edit.templateRecipientCategory;
                }
                editData.recipientID = context.Edit.recipientID;
                editData.isDeleted = context.Edit.isDeleted;
                this.enableBtnProceed();
            }
            if (context) {
                if (context.serverError)
                    this.showServerError(context.serverError);
                else {
                    this.showServerError(false);
                    if (context.showLoadingIndicator) {
                        if (context.showLoadingIndicator.status === true)
                            FormControllerUtility.showProgressBar(this.view)
                        else
                            FormControllerUtility.hideProgressBar(this.view)
                    }
                }
            }
        },

        init: function() {
            var scopeObj = this;
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.tbxZipcode.maxTextLength = 20;
            this.view.tbxCompanyZipCode.maxTextLength = 20;
            this.view.btnDomesticAccount.onClick = function() {
                scopeObj.navToDomestic();
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
            this.view.btnCancel1.onClick = function() {
                scopeObj.cancelOnClick();
            };
            this.view.btnProceed.onClick = function() {
                scopeObj.proceedOnClick();
            };
            this.view.tbxRecipientAccountNumber.onBeginEditing = function() {
                scopeObj.hideErrorFlexAddRecipient();
            };
            this.view.tbxReEnterAccountNumber.onBeginEditing = function() {
                scopeObj.hideErrorFlexAddRecipient();
            };
            this.view.lblStatus.onTouchStart = function() {
                scopeObj.toggleProductSelectionCheckbox();
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
            this.view.tbxSwiftCode.onKeyUp = function() {
                scopeObj.enableBtnProceed();
            };
            this.view.tbxInternationalRoutingNumber.onKeyUp = function() {
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
                    OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_CREATE_RECEPIENT
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
            this.view.deletePopup.onBreakpointChangeComponent(scope.view.deletePopup, width);
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            this.view.CustomPopupCancel.onBreakpointChangeComponent(scope.view.CustomPopupCancel, width);
            FormControllerUtility.setupFormOnTouchEnd(width);
             
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
        },

        preShow: function() {
            this.view.tbxReEnterAccountNumber.skin = "sknTbxSSPffffff15PxBorder727272opa20";
            this.view.tbxRecipientAccountNumber.skin = "sknTbxSSPffffff15PxBorder727272opa20";
            FormControllerUtility.disableButton(this.view.btnProceed);
            this.view.lblStatus.text = "D";
            this.view.flxError.setVisibility(false);
            this.resetAddrecipientData();
            this.toolTips();
            this.setAccessibilityConfig();
            this.view.tbxInternationalRoutingNumber.text = "";
            this.view.tbxSwiftCode.text = "";
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
            this.view.tbxInternationalRoutingNumber.toolTip = kony.i18n.getLocalizedString("i18n.WireTransfer.internationalRoutingCode");
            this.view.tbxSwiftCode.toolTip = kony.i18n.getLocalizedString("i18n.accounts.swiftCode");
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
        /*function to create JSON with all the entered fields*/
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
                selectRecipientType: "Individual",
                addressLine1: this.view.tbxAddressLine1.text,
                addressLine2: this.view.tbxAddressLine2.text,
                city: this.view.tbxCity.text,
                state: this.view.lbxState.selectedKeyValue[1],
                zipCode: this.view.tbxZipcode.text,
                swiftCode: this.view.tbxSwiftCode.text,
                internationalRoutingNumber: this.view.tbxInternationalRoutingNumber.text,
                accountNumber: this.view.tbxRecipientAccountNumber.text,
                nickName: this.view.tbxAccountNickName.text,
                bankName: this.view.tbxRecipientBankName.text,
                accountAddressLine1: this.view.tbxBankAddressLine1.text,
                accountRecipientAddressLine2: this.view.tbxBankAddressLIne2.text,
                accountCity: this.view.tbxCompanyCity.text,
                accountState: this.view.lbxCompanyState.selectedKeyValue[1],
                accountZipcode: this.view.tbxCompanyZipCode.text,
                isBusinessPayee: isBusinessPayeeValue
            };
            return data;
        },
        /*
         * function to prepopulate fileds when Eddit flow is triggered
         */
        populatefields: function(editRecipientInternational) {
            // stateListBoxData = FormControllerUtility.getListBoxDataFromObjects(context.states, "region_Name", "region_Name");
            this.view.tbxRecipientName.text = editRecipientInternational.recipientName;
            this.view.tbxAddressLine1.text = editRecipientInternational.recipientAddressLine1;
            this.view.tbxAddressLine2.text = editRecipientInternational.recipientAddressLine2;
            // this.view.lbxState.masterData = stateListBoxData;
            this.view.lbxState.selectedKey = this.returnKeyForListboxFromValue(this.view.lbxState, editRecipientInternational.recipientState);
            this.view.tbxCity.text = editRecipientInternational.recipientCity;
            this.view.tbxZipcode.text = editRecipientInternational.recipientZipCode;
            // this.view.tbxRoutingNumber.text = editRecipientInternational.routingNumber;
            this.view.tbxRecipientAccountNumber.text = editRecipientInternational.recipientAccountNumber;
            this.view.tbxReEnterAccountNumber.text = editRecipientInternational.recipientAccountNumber;
            this.view.tbxAccountNickName.text = editRecipientInternational.accountNickname;
            this.view.tbxRecipientBankName.text = editRecipientInternational.recipientBankName;
            this.view.tbxBankAddressLine1.text = editRecipientInternational.recipientBankAddress1;
            this.view.tbxBankAddressLIne2.text = editRecipientInternational.recipientBankAddress2;
            this.view.tbxCompanyCity.text = editRecipientInternational.recipientBankcity;
            //this.view.lbxCompanyState.masterData = stateListBoxData;
            this.view.lbxCompanyState.selectedKey = this.returnKeyForListboxFromValue(this.view.lbxCompanyState, editRecipientInternational.recipientBankstate);
            this.view.tbxCompanyZipCode.text = editRecipientInternational.recipientBankZipCode;
            this.view.tbxInternationalRoutingNumber.text = editRecipientInternational.internationalRoutingNumber;
            this.view.tbxSwiftCode.text = editRecipientInternational.swiftCode;
            this.view.btnProceed.text = kony.i18n.getLocalizedString("i18n.konybb.common.SaveAndUpdate");
        },
        /*
         *navigate to the frmCreateTempAddDomestic
         */
        navToDomestic: function() {
            // applicationManager.getNavigationManager().navigateTo("frmCreateTempAddDomestic");
            var obj = {
                "context": this,
                "callbackModelConfig": {
                    "frmCreateTempAddDomestic": true
                }
            };
            var navManager = kony.mvc.getNavigationManager();
            navManager.navigate(obj);
        },

        /*function to reset all feilds to null*/
        resetAddrecipientData: function() {
            this.view.tbxRecipientName.text = "";
            this.view.tbxAddressLine1.text = "";
            this.view.tbxAddressLine2.text = "";
            this.view.tbxCity.text = "";
            this.view.lbxState.selectedKey = null;
            this.view.tbxZipcode.text = "";
            this.view.tbxRoutingNumber.text = "";
            this.view.tbxSwiftCode.text = "";
            this.view.tbxInternationalRoutingNumber.text = "";
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
                // this.view.flxDowntimeWarningr.setFocus(true);
            }
            this.view.forceLayout();
        },

        getWireTransferNewModule: function() {
            return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule", "appName"
            : "WireTransferMA"});
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

        toggleEditRecipientView: function() {
            if (this.view.lblStatus.text === OLBConstants.SWITCH_ACTION.OFF) {
                this.view.lblStatus.text = OLBConstants.SWITCH_ACTION.ON;
            }
            if (this.view.lblStatus.text === OLBConstants.SWITCH_ACTION.ON) {
                this.view.lblStatus.text = OLBConstants.SWITCH_ACTION.OFF;
            }
        },
        /*
         *function to populate states in the list box
         */
        populateStates: function(states) {
            var data = FormControllerUtility.getListBoxDataFromObjects(states, 'region_Name', 'region_Name');
            this.view.lbxState.masterData = data;
            this.view.lbxCompanyState.masterData = data;
        },

        /*
         *function to enable btnProceed
         */
        enableBtnProceed: function() {
            if (this.view.tbxRecipientName.text !== "" && this.view.tbxAddressLine1.text != "" && this.view.tbxCity.text != "" && this.view.tbxZipcode.text != "" && this.view.tbxSwiftCode.text !== "" && this.view.tbxInternationalRoutingNumber.text !== "" && this.view.tbxRecipientAccountNumber.text != "" && this.view.tbxAccountNickName.text != "" && this.view.tbxRecipientBankName.text != "" && this.view.tbxBankAddressLine1.text != "" && this.view.tbxCompanyCity.text != "" && this.view.tbxCompanyZipCode.text != "") {
                FormControllerUtility.enableButton(this.view.btnProceed);
            } else {
                FormControllerUtility.disableButton(this.view.btnProceed);
            }
        },
        /*
         *function to form JSON to send to backend with no spaces
         */
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
                "recipientCountryName": "United States",
                "swiftCode": data.swiftCode,
                "internationalRoutingNumber": data.internationalRoutingNumber,
                "recipientAccountNumber": data.accountNumber,
                "accountNickname": data.nickName,
                "recipientBankName": data.bankName,
                "recipientBankAddress1": data.accountAddressLine1,
                "recipientBankAddress2": data.accountRecipientAddressLine2,
                "recipientBankcity": data.accountCity,
                "recipientBankstate": data.accountState,
                "recipientBankZipCode": data.accountZipcode,
                "bulkWireTransferType": "International",
                "transactionType": data.selectRecipientType,
                "payeeId": null,
                "templateRecipientCategory": "MANUALLYADDED",
                "isBusinessPayee": isBusinessPayeeValue
            };
            scope.addRecipientInternational = parms;
            return parms;
        },

        /*
         *function to reset error senarios
         */
        hideErrorFlexAddRecipient: function() {
            this.view.tbxReEnterAccountNumber.skin = "sknTbxSSPffffff15PxBorder727272opa20";
            this.view.tbxRecipientAccountNumber.skin = "sknTbxSSPffffff15PxBorder727272opa20";
            this.view.flxError.setVisibility(false);
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
        /*
         *function for btnProceed onClick
         */
        proceedOnClick: function() {
            var scope = this;
            var data = scope.addRecipientManuallyData(scope.enteredData());
            if (this.view.imgRadioBtnRecipientType1.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO)
                data.transactionType = kony.i18n.getLocalizedString("i18n.WireTransfer.Individual");
            else
                data.transactionType = kony.i18n.getLocalizedString("i18n.WireTransfer.Business");
            if (this.view.tbxRecipientAccountNumber.text != this.view.tbxReEnterAccountNumber.text) {
                this.view.tbxReEnterAccountNumber.skin = "skntxtSSP424242BorderFF0000Op100Radius2px";
                this.view.tbxRecipientAccountNumber.skin = "skntxtSSP424242BorderFF0000Op100Radius2px";
                FormControllerUtility.disableButton(this.view.btnProceed);
                this.view.lblError.text = kony.i18n.getLocalizedString(" i18n.WireTransfer.EnterAccountNumber"),
                    this.view.flxError.setVisibility(true);
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
                        scope.sendRecipientData(scope.addRecipientInternational);
                    else
                        scope.sendEditRecipientData(scope.addRecipientInternational, editData);
                }
            }
        },

        /*
         * function 
         */
        sendRecipientData: function(data) {
            if (this.view.lblStatus.text === "D") {
                var newData = [];
                newData.push(data);
                var wireTransferNewModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
                wireTransferNewModule.presentationController.addAdditionalKeysInRecipientsRecord(newData, OLBConstants.RECIPIENT_CATEGORY.MANUALLY_ADDED);
                wireTransferNewModule.presentationController.addData(newData, false);
                wireTransferNewModule.presentationController.toggleAddRecFlag();
                wireTransferNewModule.presentationController.navigateToAddRecipientsForm();
            } else {
                data.templateRecipientCategory = "EXISTINGRECIPIENT";
                var wireTransferNewModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
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