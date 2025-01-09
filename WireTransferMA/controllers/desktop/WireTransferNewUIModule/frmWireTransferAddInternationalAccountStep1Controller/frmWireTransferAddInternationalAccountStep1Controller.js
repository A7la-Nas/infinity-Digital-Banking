define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'OLBConstants'], function(FormControllerUtility, CommonUtilities, ViewConstants, OLBConstants) {
     
    var cancel, stateListBoxData;
    var addRecipientStates;
    var editRecipientStates;
    var ADD_RECIPIENTS_STEPS = {
        RECIPIENT_DETAILS: 1,
        RECIPIENT_ACCOUNT_DETAILS: 2
    }
    var orientationHandler = new OrientationHandler();
    return {
        editPayeeData: null,
        updateFormUI: function(context) {
            if (context.isLoading) {
                FormControllerUtility.showProgressBar(this.view);
            } else {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (context.resetForm) {
                this.resetUI();
            }
            if (context.addPayee) {
                cancel = context.onCancel;
                this.showAddPayee(context.addPayee)
            }
            if (context.states) {
                this.populateStates(context.states);
            }
            if (context.editPayee) {
                this.editPayeeData = context.editPayee;
                this.showEditRecipientUI(context.editPayee);
            }
            if (context.saveRecipientServerError) {
                this.showSaveRecipientServerError(context.saveRecipientServerError);
            }
        },
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.restrictSpecialCharacters();
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
            this.view.btnProceed.onClick = function() {
                this.enableInternationalStep2();
            }.bind(this);
            this.setDomesticAddFormValidationActions();
            this.view.btnInternationalAccount.setEnabled(true);
            this.view.btnDomesticAccount.setEnabled(true);
            this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
            //this.setStateForDomesticInternationalTabButton();
            this.setInitialActions();
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxRightBar', 'flxMain', 'wireTransferRightbar', 'wireTransferRightbar.flxInfo', 'wireTransferRightbar.flxAddAccountWindow']);
        },
        postShow: function() {
            this.view.customheadernew.activateMenu("WIRE TRANSFER", "Add Recipient");
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            applicationManager.executeAuthorizationFramework(this);
        },
        showDomesticTab: function() {
            this.view.btnDomesticAccount.setVisibility(true);
        },
        hideDomesticTab: function() {
            this.view.btnDomesticAccount.setVisibility(false);
        },
        resetUI: function() {
            this.view.flxPrint.setVisibility(false);
            this.view.flxDownload.setVisibility(false);
            this.view.flxDowntimeWarning.setVisibility(false);
            this.view.rtxDowntimeWarning.setVisibility(false);
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
        /**
         * Show Edit Recipient UI
         * @param {Object} context - data
         */
        showEditRecipientUI: function(context, onCancel) {
            var payee = context.payee;
            var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
            var scopeObj = this;
            scopeObj.resetUI();
            this.view.flxTabs.setVisibility(false);
            scopeObj.resetOneTimeTransferValidationActions();
            this.view.lbxCountry.setEnabled(true); //User cannot change country while Editing
            this.view.lbxCountry.skin = "sknDisableF7F7F7lst";
            this.view.lbxCountry.focusSkin = "sknDisableF7F7F7lst";
            this.view.lbxCountry.hoverSkin = "sknDisableF7F7F7lst";
            this.view.lblAddAccountHeading.text = kony.i18n.getLocalizedString('i18n.PayAPerson.EditRecipient');
            this.view.btnProceed.toolTip = kony.i18n.getLocalizedString("i18n.common.saveChanges");
            this.view.btnCancel1.toolTip = kony.i18n.getLocalizedString("i18n.common.cancelUpdate");
            // this.view.btnCancel1.onClick = function() {
            //     this.getWireTransferNewModule().presentationController.showMakeTransferRecipientList();
            // }.bind(this);
            this.view.btnCancel1.onClick = this.showConfirmDialog.bind(this, "i18n.transfers.Cancel", "i18n.wireTransfers.cancelEditRecipient", onCancel, "i18n.common.noDontCancel", "i18n.transfers.Cancel");
            this.view.flxTypeRadio1.onClick = function() {
                scopeObj.RadioBtnAction(scopeObj.view.imgRadioBtnRecipientType1, scopeObj.view.imgRadioBtnRecipientType2);
            };
            this.view.flxTypeRadio2.onClick = function() {
                scopeObj.RadioBtnAction(scopeObj.view.imgRadioBtnRecipientType2, scopeObj.view.imgRadioBtnRecipientType1);
            };
            var countryShow = payee.wireAccountType === OLBConstants.WireTransferConstants.ACCOUNT_INTERNATIONAL
            if (countryShow) {
                this.view.lbxCountry.masterData = FormControllerUtility.getListBoxDataFromObjects(context.countries, "Code", "Name");
                this.view.lbxCountry.selectedValue = OLBConstants.WireTransferConstants.DOMESTIC_DEFAULT_COUNTRY;
                this.view.lbxCountry.onSelection = this.onCountryChanged.bind(this);
                this.view.lbxCountry.selectedKey = scopeObj.returnKeyForListboxFromValue(this.view.lbxCountry, payee.country);
            }
            editRecipientStates = context.states;
            stateListBoxData = FormControllerUtility.getListBoxDataFromObjects(context.states, "region_Name", "region_Name");
            scopeObj.view.lbxState.masterData = stateListBoxData;
            scopeObj.view.lbxState.selectedKey = this.returnKeyForListboxFromValue(this.view.lbxState, payee.state);
            scopeObj.view.wireTransferRightbar.flxAddKonyAccount.setVisibility(false);
            scopeObj.view.wireTransferRightbar.flxAddNonKonyAccount.setVisibility(false);
            FormControllerUtility.enableButton(this.view.btnProceed);
            if (CommonUtilities.isCSRMode()) {
                this.view.btnProceed.onClick = CommonUtilities.disableButtonActionForCSRMode();
                this.view.btnProceed.skin = CommonUtilities.disableButtonSkinForCSRMode();
                this.view.btnProceed.hoverSkin = CommonUtilities.disableButtonSkinForCSRMode();
                this.view.btnProceed.focusSkin = CommonUtilities.disableButtonSkinForCSRMode();
            }
            this.view.tbxRecipientName.text = payee.payeeName;
            if (payee.type === OLBConstants.WireTransferConstants.RECIPIENT_INDIVIDUAL) {
                this.view.imgRadioBtnRecipientType2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                this.view.imgRadioBtnRecipientType1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
            } else {
                this.view.imgRadioBtnRecipientType2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
                this.view.imgRadioBtnRecipientType1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
            }
            this.view.tbxAddressLine1.text = payee.addressLine1;
            this.view.tbxAddressLine2.text = payee.addressLine2 ? payee.addressLine2 : "";
            this.view.tbxCity.text = payee.cityName;
            this.view.tbxZipcode.text = payee.zipCode;
            this.view.forceLayout();
            //this.AdjustScreen();
        },
        /**
         * Resets UI Actions
         */
        resetOneTimeTransferValidationActions: function() {
            this.view.tbxRecipientName.onKeyUp = null;
            this.view.tbxAddressLine1.onKeyUp = null;
            this.view.tbxAddressLine2.onKeyUp = null;
            this.view.tbxCity.onKeyUp = null;
            this.view.tbxZipcode.onKeyUp = null;
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
            this.view.btnDomesticAccount.onClick = this.onAddDomesticAccount.bind(this);
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
         * Right Bar Add Domestic Account Listener
         */
        onAddDomesticAccount: function() {
            var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
            wireTransferModule.presentationController.showWireTransferAddRecipientStep1({
                landingPageView: "addRecipient"
            });
            this.view.imgRadioBtnRecipientType1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
            this.view.imgRadioBtnRecipientType1.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
            this.view.imgRadioBtnRecipientType2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
            this.view.imgRadioBtnRecipientType2.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
        },
        /**
         * Shows Add Button based on Configurations
         */
        setStateForDomesticInternationalTabButton: function() {
            if (applicationManager.getConfigurationManager().isInternationalWireTransferEnabled === "false") {
                this.view.btnInternationalAccount.skin = "sknbtnfbfbfbBottomBordere3e3e3csr";
                this.view.btnInternationalAccount.setEnabled(false);
            } else {
                this.view.btnInternationalAccount.skin = "sknBtnAccountSummarySelected";
                this.view.btnInternationalAccount.setEnabled(true);
            }
            if (applicationManager.getConfigurationManager().isDomesticWireTransferEnabled === "false") {
                this.view.btnDomesticAccount.skin = "sknbtnfbfbfbBottomBordere3e3e3csr";
                this.view.btnDomesticAccount.setEnabled(false);
            } else {
                this.view.btnDomesticAccount.setEnabled(true);
            }
        },
        setDomesticAddFormValidationActions: function() {
            this.view.tbxRecipientName.onKeyUp = this.checkAddRecipientDetailForm.bind(this);
            this.view.tbxAddressLine1.onKeyUp = this.checkAddRecipientDetailForm.bind(this);
            this.view.tbxAddressLine2.onKeyUp = this.checkAddRecipientDetailForm.bind(this);
            this.view.tbxCity.onKeyUp = this.checkAddRecipientDetailForm.bind(this);
            this.view.tbxZipcode.onKeyUp = this.checkAddRecipientDetailForm.bind(this);
        },
        checkAddRecipientDetailForm: function() {
            var formData = this.getRecipientFormData();
            if (formData.payeeName === "" || formData.addressLine1 === "" || formData.cityName === "" || formData.zipCode === "") {
                FormControllerUtility.disableButton(this.view.btnProceed);
            } else {
                FormControllerUtility.enableButton(this.view.btnProceed);
            }
        },
        showAddPayee: function(addPayeeData) {
            var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
            this.showInternationalAddForm(addPayeeData.states, addPayeeData.countries, addPayeeData.onCancel);
        },

        ShowDomesticAccountUI: function() {
            this.showAddRecipientsScreen();
            this.view.btnDomesticAccount.skin = "sknBtnAccountSummarySelected";
            this.ShowAllSeperators();
            this.view.flxTabsSeperator3.setVisibility(false);
            this.view.lblAddAccountHeading.text = kony.i18n.getLocalizedString("i18n.PayAPerson.AddRecipient");
            this.view.customheadernew.lblHeaderMobile.text = this.view.lblAddAccountHeading.text;
        },
        /**
         * Shows The Seperator of tabs
         */
        ShowAllSeperators: function() {
            this.view.forceLayout();
        },
        /**
         * UI logic for  add  recipient form
         */
        showAddRecipientsScreen: function() {
            this.resetUI();
            this.view.customheadernew.activateMenu("WIRE TRANSFER", "Add Recipient");
            //this.view.flxAddRecipientsWindow.setVisibility(true);
            this.view.wireTransferRightbar.flxAddKonyAccount.setVisibility(false);
            this.view.wireTransferRightbar.flxAddNonKonyAccount.setVisibility(false);
            this.view.flxTermsAndConditions.setVisibility(true);
            this.view.lblAddAccountHeading.text = kony.i18n.getLocalizedString("i18n.PayAPerson.AddRecipient");
        },
        getRecipientFormData: function() {
            var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
            var country = this.view.lbxState.selectedKeyValue !== null ? this.view.lbxCountry.selectedKeyValue[1] : null;
            return {
                payeeName: this.view.tbxRecipientName.text.trim(),
                type: this.view.imgRadioBtnRecipientType1.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO ? OLBConstants.WireTransferConstants.RECIPIENT_INDIVIDUAL : OLBConstants.WireTransferConstants.RECIPIENT_BUSINESS,
                addressLine1: this.view.tbxAddressLine1.text.trim(),
                addressLine2: this.view.tbxAddressLine2.text.trim(),
                cityName: this.view.tbxCity.text.trim(),
                state: this.view.lbxState.selectedKeyValue !== null ? this.view.lbxState.selectedKeyValue[1] : null,
                country: country,
                zipCode: this.view.tbxZipcode.text.trim()
            };
        },
        /**
         * Entry point for international add form
         * @param {Object[]} states - List of states
         * @param {Object[]} countries - List of countries
         * @param {function} [onCancel] - Optional Call back for cancel button
         */
        showInternationalAddForm: function(states, countries, onCancel) {
            var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
            var scopeObj = this;
            this.view.flxTabs.setVisibility(true);
            this.showInternationalAccountUI();
            this.resetAddRecipientForms();
            stateListBoxData = FormControllerUtility.getListBoxDataFromObjects(states, 'region_Name', 'region_Name')
            this.view.lbxState.masterData = stateListBoxData;
            var countryListBoxData = FormControllerUtility.getListBoxDataFromObjects(countries, 'Code', 'Name')
            this.view.lbxCountry.masterData = countryListBoxData;
            // this.view.lbxCountry.selectedKey = OLBConstants.WireTransferConstants.DOMESTIC_COUNTRY_NAME;
            addRecipientStates = states;
            this.view.lbxCountry.onSelection = this.onCountryChangedAdd.bind(this);
            this.view.lbxState.masterData = stateListBoxData;
            this.view.flxTypeRadio1.onClick = function() {
                scopeObj.RadioBtnAction(scopeObj.view.imgRadioBtnRecipientType1, scopeObj.view.imgRadioBtnRecipientType2);
            };
            this.view.flxTypeRadio2.onClick = function() {
                scopeObj.RadioBtnAction(scopeObj.view.imgRadioBtnRecipientType2, scopeObj.view.imgRadioBtnRecipientType1);
            };
            this.view.btnCancel1.onClick = this.showConfirmDialog.bind(this, "i18n.transfers.Cancel", "i18n.wireTransfers.cancelAddRecipient", onCancel, "i18n.common.noDontCancel", "i18n.transfers.Cancel");
        },
        enableInternationalStep2: function() {
            var previousForm = kony.application.getPreviousForm().id;
            var modify = false;
            if (previousForm === "frmWireTransferAddInternationalAccountConfirm")
                modify = true;
            var wireTransferNewModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
            wireTransferNewModule.presentationController.showWireTransferAddInternationalRecipientStep2(this.getRecipientFormData(), this.editPayeeData, stateListBoxData, modify);
        },
        resetAddRecipientForms: function() {
            this.view.tbxRecipientName.text = "";
            this.view.imgRadioBtnRecipientType1.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
            this.view.imgRadioBtnRecipientType1.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
            this.view.imgRadioBtnRecipientType2.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
            this.view.imgRadioBtnRecipientType2.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED_FONT;
            this.view.tbxAddressLine1.text = ""
            this.view.tbxAddressLine2.text = ""
            this.view.tbxCity.text = ""
            this.view.tbxZipcode.text = "";
            FormControllerUtility.disableButton(this.view.btnProceed);
        },

        /**
         * Fetch states when country is changed on list box
         * @param {Object} widget - Reference to listbox widget
         */
        onCountryChanged: function(widget) {
            var statesSelected = this.getWireTransferNewModule().presentationController.getSpecifiedCitiesAndStates("country", widget.selectedKey, editRecipientStates);
            this.view.lbxState.masterData = FormControllerUtility.getListBoxDataFromObjects(statesSelected.states, 'region_Name', 'region_Name');
        },
        onCountryChangedAdd: function(widget) {
            var statesSelected = this.getWireTransferNewModule().presentationController.getSpecifiedCitiesAndStates("country", widget.selectedKey, addRecipientStates);
            this.view.lbxState.masterData = FormControllerUtility.getListBoxDataFromObjects(statesSelected.states, 'region_Name', 'region_Name');
        },
        /**
         * Show Confirm Dialog
         * @param {string} headingKey  - i18n of heading
         * @param {string} messageKey  - i18n of message
         * @param {function} onYesPressed  - callback for yes button
         * @param {string} noBtnTooltip  - i18n for tooltip
         * @param {string} yesBtnTooltip - i18n of tooltip
         */
        showConfirmDialog: function(headingKey, messageKey, onYesPressed, noBtnTooltip, yesBtnTooltip) {
            this.view.flxDialogs.setVisibility(true);
            this.view.flxPopup.setVisibility(true);
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
        enableCancel: function() {
            this.getWireTransferNewModule().presentationController.showMakeTransferRecipientList();
        },
        disableTnC: function() {
            CommonUtilities.enableButton(this.view.btnConfirm);
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
         * Shows the UI for international add
         * @param {void} - None
         * @returns {void} - None
         */
        showInternationalAccountUI: function() {
            this.showAddRecipientsScreen();
            //this.view.btnInternationalAccount.skin = "sknBtnAccountSummarySelected";
            if (applicationManager.getConfigurationManager().isDomesticWireTransferEnabled !== "false") {
                this.view.btnDomesticAccount.skin = "sknBtnAccountSummaryUnselected";
            }
            this.ShowAllSeperators();
            this.view.flxCountry.setVisibility(true);
            this.view.flxTabsSeperator1.setVisibility(false);
            var text1 = kony.i18n.getLocalizedString("i18n.transfers.wireTransfer");
            var text2 = kony.i18n.getLocalizedString("i18n.WireTransfers.AddRecipientInternational");
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
         * Method to restrict Special Characters entry in textbox
         */
        restrictSpecialCharacters: function() {
            var scopeObj = this;
            var specialCharactersSet = "~#^|$%&*!@()_-+=}{][/|?,.><`':;\"\\";
            var spaceSet = " ";
            var alphabetsSet = "abcdefghijklmnopqrstuvwxyz";
            var numericSet = "0123456789";

            scopeObj.view.tbxZipcode.restrictCharactersSet = specialCharactersSet + spaceSet;
            scopeObj.view.tbxRecipientName.restrictCharactersSet = specialCharactersSet.replace("!@#&*_'-.,", '');
            // scopeObj.view.tbxAddressLine1.restrictCharactersSet = specialCharactersSet.replace("!@#&*_'-.,", '');    ARB-25075
            // scopeObj.view.tbxAddressLine2.restrictCharactersSet = specialCharactersSet.replace("!@#&*_'-.,", '');    ARB-25075
            scopeObj.view.tbxCity.restrictCharactersSet = numericSet + specialCharactersSet;
        },
        /**
         * 
         * @param error message to display
         */
        showSaveRecipientServerError: function(viewModel) {
            this.showServerError(viewModel.errorMessage);
        },
        /**
         * Handle server error, shows serverFlex
         * @param {object} serverError error
         */
        showServerError: function(serverError) {
            this.view.flxDowntimeWarning.setVisibility(true);
            this.view.rtxDowntimeWarning.setVisibility(true);
            this.view.rtxDowntimeWarning.text = serverError;
        }
    };
});