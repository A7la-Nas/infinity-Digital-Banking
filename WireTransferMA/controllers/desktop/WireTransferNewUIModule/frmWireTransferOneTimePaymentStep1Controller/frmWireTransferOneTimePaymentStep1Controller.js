define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'OLBConstants', 'CampaignUtility'], function(FormControllerUtility, CommonUtilities, ViewConstants, OLBConstants, CampaignUtility) {
     
    var stateListBoxData;
    var states;
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
            if (context.oneTimeTransfer) {
                this.showOneTimeTransfer(context.oneTimeTransfer);
            }
            if (context.states) {
                this.populateStates(context.states);
            }
            if (context.campaign) {
                CampaignUtility.showCampaign(context.campaign, this.view, "flxMain");
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
            this.view.CustomPopupLogout.onBreakpointChangeComponent(scope.view.CustomPopupLogout, width);
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            FormControllerUtility.setupFormOnTouchEnd(width);
             
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
        },
        preShow: function() {
            this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxRightBar', 'flxMain', 'wireTransferRightbar.flxInfo']);
            this.setInitialActions();
            this.resetOneTimeTransferForms();
            CampaignUtility.fetchPopupCampaigns();

        },
        postShow: function() {
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            this.configureAccountTypeRadioButtons();
        },
        /**
         * Binds initial widget actions - Should be called from pre show
         */
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
                if (scopeObj.view.wireTransferRightbar.flxAccountInfoForAccountTransfer.isVisible === true) scopeObj.view.AllFormsConfirmDetails.top = scopeObj.view.flxRightBar.frame.height - 80 + "dp";
                else scopeObj.view.AllFormsConfirmDetails.top = scopeObj.view.flxRightBar.info.frame.height - 10 + "dp";
                scopeObj.view.forceLayout();
            } else scopeObj.view.AllFormsConfirmDetails.isVisible = false;
        },

        /**
         * Populate List of states in state listbox
         * @param {Object[]} states List of state objects
         * @param {boolean} isEditFlow To mark a edit flow.
         */
        populateStates: function(states, isEditFlow) {
            var data = FormControllerUtility.getListBoxDataFromObjects(states, 'region_Name', 'region_Name');
            this.view.lbxState.masterData = data;
        },

        /**
         * Entry point method for one time transfer
         * @param {object} data  - Data for One Time Transfer
         * @param {function} onCancel  - Optional callback for cancel button
         */
        showOneTimeTransfer: function(data, onCancel) {
            this.setOneTimeTransferValidationActions();
            this.view.lbxCountry.setEnabled(true);
            this.view.lbxCountry.skin = "sknLbxSSP42424215PxBorder727272";
            this.view.lbxCountry.focusSkin = "sknLbxSSP42424215PxBorder727272";
            this.view.lbxCountry.hoverSkin = "sknLbxSSP42424215PxBorder727272";
            states = data.states;
            stateListBoxData = FormControllerUtility.getListBoxDataFromObjects(data.states, 'region_Name', 'region_Name')
            this.view.lbxState.masterData = stateListBoxData;
            if (onCancel === undefined || typeof onCancel !== "function") {
                onCancel = function() {
                    var wireTransferNewModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
                    wireTransferNewModule.presentationController.showLandingPageView();
                }.bind(this);
            }
            this.showOneTimeTransferUI();
            this.configureAccountTypeRadioButtons(data.states, data.countries);
            this.view.flxTypeRadio1.onClick = function() {
                this.RadioBtnAction(this.view.imgRadioBtnRecipient1, this.view.imgRadioBtnRecipient2);
            }.bind(this);
            this.view.flxTypeRadio2.onClick = function() {
                this.RadioBtnAction(this.view.imgRadioBtnRecipient2, this.view.imgRadioBtnRecipient1);
            }.bind(this);
            this.view.CopybtnCancel0c1dff425132b46.onClick = this.showConfirmDialog.bind(this, "i18n.PayAPerson.Quit", "i18n.wireTransfer.cancelOneTimeTransfer", onCancel, "i18n.common.noDontCancel", "i18n.transfers.Cancel");
            this.view.CopybtnCancel0c1dff425132b46.toolTip = kony.i18n.getLocalizedString("i18n.transfers.deleteTransfer");
            this.view.btnProceed.onClick = this.enableOTPStep2.bind(this);
            this.view.btnProceed.toolTip = kony.i18n.getLocalizedString("i18n.common.proceed");
            this.checkAndShowCountryFieldinOTT(data.states, data.countries);
            this.view.lbxCountry.onSelection = this.onCountryChanged.bind(this);
            this.view.customheadernew.activateMenu("Wire Transfer", "Make One Time Payment");
            this.checkOTTRecipientDetailForm();
        },
        enableOTPStep2: function() {
            var wireTransferNewModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
            wireTransferNewModule.presentationController.showWireOneTimeTransferStep2({
                landingPageView: "oneTimeTransfer"
            }, this.getOTTRecipientFormData(), stateListBoxData)
        },
        /**
         * Show Confirm Dialog
         * @param {string} headingKey  - i18n of heading
         * @param {string} messaogeKey  - i18n of message
         * @param {function} onYesPressed  - callback for yes button
         * @param {string} noBtnTooltip  - i18n for tooltip
         * @param {string} yesBtnTooltip - i18n of tooltip
         */
        showConfirmDialog: function(headingKey, messageKey, onYesPressed, noBtnTooltip, yesBtnTooltip) {
            this.view.flxDialogs.setVisibility(true);
            this.view.flxPopup.setVisibility(true);
            var height = this.view.flxHeader.info.frame.height + this.view.flxMain.info.frame.height + this.view.flxFooter.info.frame.height;
            this.view.flxPopup.height = height + "dp";
            this.view.CustomPopup.setFocus(true);
            if (noBtnTooltip) {
                this.view.CustomPopup.btnNo.toolTip = kony.i18n.getLocalizedString(noBtnTooltip);
            } else {
                this.view.CustomPopup.btnNo.toolTip = kony.i18n.getLocalizedString("i18n.common.no");
            }
            if (yesBtnTooltip) {
                this.view.CustomPopup.btnYes.toolTip = kony.i18n.getLocalizedString(yesBtnTooltip);
            } else {
                this.view.CustomPopup.btnYes.toolTip = kony.i18n.getLocalizedString("i18n.common.yes");
            }
            this.view.CustomPopup.lblHeading.text = kony.i18n.getLocalizedString(headingKey);
            this.view.CustomPopup.lblPopupMessage.text = kony.i18n.getLocalizedString(messageKey);
            this.view.forceLayout();
            //Quit Pop-Up Message Box
            this.view.CustomPopup.flxCross.onClick = function() {
                this.view.flxDialogs.setVisibility(false);
                this.view.flxPopup.setVisibility(false);
            }.bind(this);
            this.view.CustomPopup.btnNo.onClick = function() {
                this.view.flxDialogs.setVisibility(false);
                this.view.flxPopup.setVisibility(false);
            }.bind(this);
            this.view.CustomPopup.btnYes.onClick = function() {
                this.view.flxDialogs.setVisibility(false);
                this.view.flxPopup.setVisibility(false);
                if (onYesPressed !== undefined || typeof onYesPressed === "function")
                    onYesPressed();
                else
                    this.enableCancel();
                this.disableTnC();
            }.bind(this);
        },
        disableTnC: function() {
            CommonUtilities.enableButton(this.view.btnConfirm);
        },

        enableCancel: function() {
            this.getWireTransferNewModule().presentationController.showMakeTransferRecipientList();
        },
        /**
         * Resets one time transfer form.
         */
        resetOneTimeTransferForms: function() {
            this.view.tbxRecipientName.text = "";
            this.view.imgRadioBtnAccountType1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
            this.view.imgRadioBtnAccountType2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
            this.view.imgRadioBtnRecipient1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
            this.view.imgRadioBtnRecipient2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
            this.view.tbxAddressLine1.text = ""
            this.view.tbxAddressLine2.text = ""
            this.view.tbxCity.text = ""
            this.view.tbxZipcode.text = "";
            FormControllerUtility.disableButton(this.view.btnProceed);
        },
        /**
         * Binds initial validations actions on text fields of OTT - Should be called from pre show
         */
        setOneTimeTransferValidationActions: function() {
            this.view.tbxRecipientName.onKeyUp = this.checkOTTRecipientDetailForm.bind(this);
            this.view.tbxAddressLine1.onKeyUp = this.checkOTTRecipientDetailForm.bind(this);
            this.view.tbxAddressLine2.onKeyUp = this.checkOTTRecipientDetailForm.bind(this);
            this.view.tbxCity.onKeyUp = this.checkOTTRecipientDetailForm.bind(this);
            this.view.tbxZipcode.onKeyUp = this.checkOTTRecipientDetailForm.bind(this);
        },
        /**
         * Resets form Show one time transfer UI
         */
        showOneTimeTransferUI: function() {
            this.resetUI();
            this.view.flxAccountType.setVisibility(true);
            this.view.lblAddAccountHeading.text = "One Time Transfer";
            this.view.flxTermsAndConditions.setVisibility(true);
            FormControllerUtility.disableButton(this.view.btnProceed);
            this.view.lblHeader.text = kony.i18n.getLocalizedString("i18n.WireTransfer.MakeOneTimeTransfer");
            this.view.forceLayout();
        },
        /**
         * Configure Account Type Radio button based on configurations
         *  @param {Object[]} states List of states
         * @param {object[]} countries List of countries
         */
        configureAccountTypeRadioButtons: function(states, countries) {
            if ((this.checkUserPermission("DOMESTIC_WIRE_TRANSFER_CREATE")) && (this.checkUserPermission("INTERNATIONAL_WIRE_TRANSFER_CREATE"))) {
                this.view.lblAccountTypeRadio1.setVisibility(true);
                this.view.flxAccountTypeRadio1.setVisibility(true);
                this.view.flxAccountTypeRadio1.onClick = function() {
                    this.RadioBtnAction(this.view.imgRadioBtnAccountType1, this.view.imgRadioBtnAccountType2);
                    this.checkAndShowCountryFieldinOTT(states, countries);
                }.bind(this);
                this.view.flxAccountTypeRadio2.setVisibility(true);
                this.view.lblAccountTypeRadio2.setVisibility(true);
                this.view.flxAccountTypeRadio2.onClick = function() {
                    this.RadioBtnAction(this.view.imgRadioBtnAccountType2, this.view.imgRadioBtnAccountType1);
                    this.checkAndShowCountryFieldinOTT(states, countries);
                }.bind(this);
            } else {
                if (this.checkUserPermission("DOMESTIC_WIRE_TRANSFER_CREATE")) {
                    this.view.imgRadioBtnAccountType2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                    this.view.imgRadioBtnAccountType2.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
                    this.view.imgRadioBtnAccountType1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
                    this.view.imgRadioBtnAccountType1.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
                } else {
                    this.view.imgRadioBtnAccountType1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                    this.view.imgRadioBtnAccountType1.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
                    this.view.imgRadioBtnAccountType2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
                    this.view.imgRadioBtnAccountType2.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
                    this.checkAndShowCountryFieldinOTT(states, countries);
                }
                this.view.lblAccountTypeRadio1.setVisibility(true);
                this.view.flxAccountTypeRadio1.setVisibility(true);
                this.view.flxAccountTypeRadio1.onClick = function() {}.bind(this);
                this.view.flxAccountTypeRadio2.setVisibility(true);
                this.view.lblAccountTypeRadio2.setVisibility(true);
                this.view.flxAccountTypeRadio2.onClick = function() {}.bind(this);
                this.view.forceLayout();
            }
        },
        checkUserPermission: function(permission) {
            return applicationManager.getConfigurationManager().checkUserPermission(permission);
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
        getWireTransferNewModule: function() {
            return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule", "appName"
            : "WireTransferMA"});
        },
        /**
         * Fetch states when country is changed on list box
         * @param {Object} widget - Reference to listbox widget
         */
        onCountryChanged: function(widget) {
            var statesSelected = this.getWireTransferNewModule().presentationController.getSpecifiedCitiesAndStates("country", widget.selectedKey, states);
            this.view.lbxState.masterData = FormControllerUtility.getListBoxDataFromObjects(statesSelected.states, 'region_Name', 'region_Name');
        },
        /**
         * Get Recipient  Details for One time transfer (Step 1 data)
         * @returns {Object} - JSON for data
         */
        getOTTRecipientFormData: function() {
            var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
            return {
                wireAccountType: this.view.imgRadioBtnAccountType1.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO ? OLBConstants.WireTransferConstants.ACCOUNT_DOMESTIC : OLBConstants.WireTransferConstants.ACCOUNT_INTERNATIONAL,
                payeeName: this.view.tbxRecipientName.text.trim(),
                type: this.view.imgRadioBtnRecipient1.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO ? OLBConstants.WireTransferConstants.RECIPIENT_INDIVIDUAL : OLBConstants.WireTransferConstants.RECIPIENT_BUSINESS,
                addressLine1: this.view.tbxAddressLine1.text.trim(),
                addressLine2: this.view.tbxAddressLine2.text.trim(),
                cityName: this.view.tbxCity.text.trim(),
                state: this.view.lbxState.selectedKeyValue ? this.view.lbxState.selectedKeyValue[1] : "",
                country: this.view.lbxCountry.selectedKeyValue[1],
                zipCode: this.view.tbxZipcode.text.trim()
            };
        },
        /**
         * Validates domestic recipient details form in OTT
         */
        checkOTTRecipientDetailForm: function() {
            var formData = this.getOTTRecipientFormData();
            if (formData.payeeName === "" ||
                formData.addressLine1 === "" ||
                formData.cityName === "" ||
                formData.zipCode === "" || 
                formData.state === "") {
                FormControllerUtility.disableButton(this.view.btnProceed);
            } else {
                FormControllerUtility.enableButton(this.view.btnProceed);
            }
        },
        /**
         * Check Radio box value and show/ hide country field in OTT
         * @param {object[]} states array of state objects
         * @param {object[]} countries array of country objects
         */
        checkAndShowCountryFieldinOTT: function(states, countries) {
            var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
            var showCountryField = this.view.imgRadioBtnAccountType2.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
            this.view.flxCountry.setVisibility(showCountryField);
            if (showCountryField) {
                var countryListBoxData = FormControllerUtility.getListBoxDataFromObjects(countries, 'Code', 'Name')
                this.view.lbxCountry.masterData = countryListBoxData;
                this.view.lbxCountry.selectedKey = this.view.lbxCountry.masterData[0][0];
            } else {
                stateListBoxData = FormControllerUtility.getListBoxDataFromObjects(states, 'region_Name', 'region_Name')
                this.view.lbxState.masterData = stateListBoxData;
            }
        },
        resetUI: function() {
            this.view.flxPrint.setVisibility(false);
            this.view.flxDownload.setVisibility(false);
            this.view.flxDowntimeWarning.setVisibility(false);
            this.view.rtxDowntimeWarning.setVisibility(false);
        },
        /**
         * Get standard currencies name with their symbols
         * @returns {objetc[]} - array of JSONs with currency name and symbol
         */
        getCurrency: function() {
            return applicationManager.getConfigurationManager().OLBConstants.WireTransferConstants.CURRENCIES;
        },
    };
});