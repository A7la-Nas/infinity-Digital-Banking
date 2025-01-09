define("ManageProfileMA/SettingsNewUIModule/userfrmAddNewAddressController", ['CommonUtilities', 'CSRAssistUI', 'FormControllerUtility', 'OLBConstants', 'ViewConstants', 'CampaignUtility'], function(CommonUtilities, CSRAssistUI, FormControllerUtility, OLBConstants, ViewConstants, CampaignUtility) {
    var orientationHandler = new OrientationHandler();
    var responsiveUtils = new ResponsiveUtils();
    var primaryCall = false;
    this.getPrimaryPayload = {};
    var globalScope = this;
    return {
        enableSeparateAddress: false,
        /**
         * Init Method 
         */
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShowProfile;
            var scope = this;
            try {
                scope.presenter = applicationManager.getModulesPresentationController({
                    appName: 'ManageProfileMA',
                    moduleName: 'SettingsNewUIModule'
                });
            } catch (err) {
                var errorObj = {
                    "method": "init",
                    "error": err
                };
                scope.onError(errorObj);
            }
            //CommonUtilities.setText(this.view.btnAddNewAddressMobile, kony.i18n.getLocalizedString("i18n.ProfileManagement.AddNewAddress"), CommonUtilities.getaccessibilityConfig());
            //CommonUtilities.setText(this.view.btnAddNewPersonalAddressMobile, kony.i18n.getLocalizedString("i18n.ProfileManagement.AddNewAddress"), CommonUtilities.getaccessibilityConfig());
            this.setFlowActions();
        },
        setFlowActions: function() {
            var scopeObj = this;
            this.view.addressInfo.flxCross.onClick = function() {
                scopeObj.view.addressInfo.isVisible = false;
            }
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = function() {
                scopeObj.onBreakpointChange(kony.application.getCurrentBreakpoint());
            }
            var valManager = applicationManager.getValidationUtilManager();
            this.view.tbxZipcode.onTextChange = function() {
                scopeObj.view.tbxZipcode.restrictCharactersSet = "!@#&*_'-.~^|$%()+=}{][/|?,><`:;\"\\" ;
            };
            /*this.view.tbxAddressLine1.onTextChange = function(){
         //    CommonUtilities.setText(scopeObj.view.tbxAddressLine1,scopeObj.view.tbxAddressLine1.text.trim() , CommonUtilities.getaccessibilityConfig());
             scopeObj.view.tbxAddressLine1.accessibilityConfig ={
                  "a11yValue":scopeObj.view.tbxAddressLine1.text.trim()
              }
            };
            this.view.tbxAddressLine2.onTextChange = function(){
           //     CommonUtilities.setText(scopeObj.view.tbxAddressLine2,scopeObj.view.tbxAddressLine2.text.trim() , CommonUtilities.getaccessibilityConfig());
                scopeObj.view.tbxAddressLine2.accessibilityConfig ={
                    "a11yValue":scopeObj.view.tbxAddressLine2.text.trim()
                }
            };
            this.view.tbxCityName.onTextChange = function(){
         //     CommonUtilities.setText(scopeObj.view.tbxCityName,scopeObj.view.tbxCityName.text.trim() , CommonUtilities.getaccessibilityConfig());
             scopeObj.view.tbxCityName.accessibilityConfig ={
                "a11yValue":scopeObj.view.tbxCityName.text.trim()
            }
            };
            this.view.tbxZipcode.onTextChange = function(){
           //   CommonUtilities.setText(scopeObj.view.tbxZipcode,scopeObj.view.tbxZipcode.text.trim() , CommonUtilities.getaccessibilityConfig());
             scopeObj.view.tbxZipcode.accessibilityConfig ={
                "a11yValue":scopeObj.view.tbxZipcode.text.trim()
            }
            };*/
        },
        onBreakpointChange: function(width) {
            FormControllerUtility.setupFormOnTouchEnd(width);
            responsiveUtils.onOrientationChange(this.onBreakpointChange);
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
            this.view.profileMenu.onBreakpointChangeComponent(width);
            orientationHandler.onOrientationChange(this.onBreakpointChange);
            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.profilesettings");
                this.view.flxLeft.accessibilityConfig = {
                    a11yARIA: {
                        "aria-live": "off",
                        "tabindex": -1
                    }
                }
                this.view.flxRight.accessibilityConfig = {
                    a11yARIA: {
                        "aria-live": "off",
                        "tabindex": -1
                    }
                }
            }
            else {
                this.view.flxLeft.accessibilityConfig = {
                    a11yARIA: {
                        "tabindex": -1
                    }
                }
                this.view.flxRight.accessibilityConfig = {
                    a11yARIA: {
                        "tabindex": -1
                    }
                }
            }
            this.view.forceLayout();
        },
        /**
         *  Method to set the Accessibility configurations
         */
        setAccessibility: function() {
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            //this.view.btnAddNewAddressAdd.toolTip = kony.i18n.getLocalizedString("kony.mb.common.submit");
            //this.view.btnAddNewAddressCancel.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
            this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.profilesettings");
            this.view.btnAddNewAddressAdd.text  = kony.i18n.getLocalizedString("kony.mb.common.submit");
            this.view.btnAddNewAddressCancel.text = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
            this.view.lblSetAsPreferred.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.SaveAsPrimaryCommunication");
            this.view.lblHeading.accessibilityConfig = {
                "a11yARIA": {
                    "tabindex": -1
                },
                "a11yLabel": this.view.lblAddNewAddressHeader.text + " " + kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson")
            }
            this.view.btnAddNewAddressAdd.accessibilityConfig = {
                a11yLabel:"Submit address details"
            };
            this.view.btnAddNewAddressCancel.accessibilityConfig = {
                a11yLabel:"Cancel add address process"
            }
        },

        popUpDismiss: function(eventObject, eventPayload) {
            if (eventPayload.keyCode === 27) {
                if (this.view.flxDialogs.isVisible === true) {
                    this.view.flxDialogs.setVisibility(false);
                }
                if (kony.application.getCurrentBreakpoint() === 640) {
                    if (this.view.flxLeft.isVisible) {
                        this.toggleMenuMobile();
                        this.view.flxAccountSettingsCollapseMobile.setActive(true);
                    }
                }
                this.view.customheadernew.onKeyPressCallBack(eventObject, eventPayload);
            }
        },

        checkboxonClick: function(labelText, parentFlex){
            if (this.view.lblSetAsPreferredCheckBox.text === "C") {
                this.view.flxSetAsPreferredCheckBox.accessibilityConfig = {
                    a11yLabel:"save as primary communication",
                    a11yARIA: {
                        "role": "checkbox",
                        "aria-checked": true,
                    },
                }
            }
            else if(this.view.lblSetAsPreferredCheckBox.text === "D") {
                this.view.flxSetAsPreferredCheckBox.accessibilityConfig = {
                    a11yLabel:"save as primary communication",
                    a11yARIA: {
                        "role": "checkbox",
                        "aria-checked": false,
                    },
                }
            }
        },

        updateFormUI: function(viewModel) {
            if (viewModel !== undefined) {
                if (viewModel.isLoading !== undefined) this.changeProgressBarState(viewModel.isLoading);
                if (viewModel.campaign) {
                    CampaignUtility.showCampaign(viewModel.campaign, this.view, "flxContainer");
                }
                if (viewModel.addNewAddress) this.showAddNewAddressForm(viewModel.addNewAddress);
                if (viewModel.addressList === null) {
                    viewModel.addressList = [];
                    FormControllerUtility.hideProgressBar(this.view);
                }
                if (viewModel.addressList) this.updateAddressList(viewModel.addressList);
            }
            this.view.forceLayout();
            this.view.lblAddNewAddressHeader.setActive(true);
        },
        preShow: function() {
            var self = this;
            applicationManager.getLoggerManager().setCustomMetrics(this, false, "Profile");
            this.view.flxAccountSettingsCollapseMobile.onClick = this.toggleMenuMobile;
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain', 'flxContainer']);
            this.view.lblCollapseMobile.text = "O";
            this.view.flxRight.setVisibility(true);
            this.view.profileMenu.checkLanguage();
            this.view.profileMenu.activateMenu("PROFILESETTINGS", "Address");
            this.view.customheadernew.activateMenu("Settings", "Profile Settings");
            this.setSelectedValue("i18n.ProfileManagement.Address");
            this.view.addressInfo.isVisible = false;
            this.view.flxProfileError.setVisibility(false);
            var currBreakpoint = kony.application.getCurrentBreakpoint();
            if (currBreakpoint === 640 || orientationHandler.isMobile) {
                this.view.flxMain.height = "830dp";
            }
            if (totalAddress == 0 && !(applicationManager.getUserPreferencesManager().getBackendIdentifier() === '')) {
                this.view.flxSupportingDocs.setVisibility(true);
                globalScope.primaryCall = true;
            }
            if (!(applicationManager.getConfigurationManager().checkUserPermission("UPDATE_PRIMARY_ADDRESS")) && totalAddress > 1) {
                this.view.flxSetAsPreferred.setVisibility(false);
                this.view.flxInfoAddAddress.setVisibility(false);
            }
            this.setDataForUploadFileComp();
            var scopeObj = this;
            this.view.btnAddNewAddressCancel.onClick = function() {
                scopeObj.showAddresses();
            };
            this.view.btnAddNewAddressAdd.onClick = function() {
                //write code to ADD new Address
                scopeObj.showAddresses();
            };
            this.view.flxSetAsPreferredCheckBox.onClick = function() {
                if (totalAddress != 0) {
                    scopeObj.toggleFontCheckBox(scopeObj.view.lblSetAsPreferredCheckBox);
                    if (scopeObj.view.lblSetAsPreferredCheckBox.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED) {
                        if (!(applicationManager.getUserPreferencesManager().getBackendIdentifier() === '')) {
                            scopeObj.view.flxSupportingDocs.setVisibility(true);
                            globalScope.primaryCall = true;
                        }
                    } else {
                        if (!(applicationManager.getUserPreferencesManager().getBackendIdentifier() === '')) {
                            scopeObj.view.flxSupportingDocs.setVisibility(false);
                            globalScope.primaryCall = false;
                        }
                    }
                }
                scopeObj.checkboxonClick(scopeObj.view.lblSetAsPreferredCheckBox,scopeObj.view.flxSetAsPreferredCheckBox);
            };
            this.restrictSpecialCharacterSet();
            if (!CommonUtilities.isCSRMode()) {
                this.setNewAddressValidationActions();
                //this.setUpdateAddressValidationActions();
            }
            this.setAccessibility();
            this.view.forceLayout();
        },
        /**
         * *@param {String} text- text that needs to be appended to the upper text in mobile breakpoint
         *  Method to set the text in mobile breakpoint
         */
        setSelectedValue: function(text) {
            var self = this;
            self.view.lblAccountSettingsMobile.text = kony.i18n.getLocalizedString(text);
        },
        toggleFontCheckBox: function(imgCheckBox) {
            if (imgCheckBox.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED) {
                imgCheckBox.text = ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED;
                imgCheckBox.skin = ViewConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
            } else {
                imgCheckBox.text = ViewConstants.FONT_ICONS.CHECBOX_SELECTED;
                imgCheckBox.skin = ViewConstants.SKINS.CHECKBOX_SELECTED_SKIN;
            }
        },
        /**
         * Method to hide all the flex of main body
         * @param {Object} addAddressViewModel - None
         */
        showAddNewAddressForm: function(addAddressViewModel) {
            var self = this;
            if (kony.i18n.getCurrentLocale() === "ar_AE") {
                this.view.lbxCountry.contentAlignment = 'middleright';
                this.view.lbxState.contentAlignment = 'middleright';
            } else {
                this.view.lbxCountry.contentAlignment = 'middleleft';
                this.view.lbxState.contentAlignment = 'middleleft';
            }
            //this.hideAll();
            this.view.flxAddNewAddressWrapper.setVisibility(true);
            var currBreakpoint = kony.application.getCurrentBreakpoint();
            if (currBreakpoint === 640 || orientationHandler.isMobile) {
                this.view.flxAddressWrapper.height = "775dp";
            }
            if (addAddressViewModel.serverError) {
                if (currBreakpoint === 640 || orientationHandler.isMobile) {
                    this.view.flxMain.height = "930dp";
                }
                this.view.flxProfileError.setVisibility(true);
                // CommonUtilities.setText(this.view.rtxError, addAddressViewModel.serverError.errorMessage, CommonUtilities.getaccessibilityConfig());
                this.view.rtxError.text = addAddressViewModel.serverError.errorMessage;
            } else {
                this.view.flxErrorAddAddress.setVisibility(false);
                if (addAddressViewModel.addressTypes.length > 0) {
                    this.view.lbxType.masterData = addAddressViewModel.addressTypes;
                    this.view.lbxType.selectedKey = addAddressViewModel.addressTypeSelected;
                }
                this.view.tbxAddressLine1.text = addAddressViewModel.addressLine1;
                this.view.tbxAddressLine2.text = addAddressViewModel.addressLine2;
                this.view.lbxCountry.masterData = addAddressViewModel.countryNew;
                this.view.lbxCountry.selectedKey = addAddressViewModel.countrySelected;
                this.view.lbxState.masterData = addAddressViewModel.stateNew;
                this.view.lbxState.selectedKey = addAddressViewModel.stateSelected;
                this.view.tbxCityName.text = addAddressViewModel.city;
                this.view.tbxZipcode.text = addAddressViewModel.zipcode;
                this.view.lblSetAsPreferredCheckBox.skin = addAddressViewModel.isPreferredAddress ? ViewConstants.SKINS.CHECKBOX_SELECTED_SKIN : ViewConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
                //                 if(addAddressViewModel.isPreferredAddress){
                //                     this.view.lblSetAsPreferredCheckBox.skin = ViewConstants.SKINS.CHECKBOX_SELECTED_SKIN;
                //                     this.view.flxSupportingDocs.setVisibility(true);
                //                 }
                //                 else{
                //                     this.view.lblSetAsPreferredCheckBox.skin = ViewConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
                //                     this.view.flxSupportingDocs.setVisibility(false);
                //                 }
                if (totalAddress == 0) {
                    addAddressViewModel['isPreferredAddress'] = true;
                }
                var countryId = self.view.lbxCountry.selectedKeyValue[0];
                if (countryId == "1") {
                    self.view.lbxState.setEnabled(false);
                }
                this.view.lbxCountry.onSelection = function() {
                    var data = [];
                    var countryId = self.view.lbxCountry.selectedKeyValue[0];
                    if (countryId == "1") {
                        self.checkNewAddressForm();
                        self.view.lbxState.masterData = addAddressViewModel.stateNew;
                        self.view.lbxState.selectedKey = addAddressViewModel.stateSelected;
                        self.view.lbxCountry.selectedKey = countryId;
                        self.view.lbxState.setEnabled(false);
                    } else {
                        self.view.lbxState.setEnabled(true);
                        self.view.lbxCountry.selectedKey = countryId;
                        data = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                            "moduleName": "SettingsNewUIModule",
                            "appName": "ManageProfileMA"
                        }).presentationController.getSpecifiedCitiesAndStates("country", countryId, addAddressViewModel.stateNew);
                        self.view.lbxState.masterData = data.states;
                        self.view.lbxState.selectedKey = addAddressViewModel.stateSelected;
                        var stateId = self.view.lbxState.selectedKeyValue[0];
                        if (stateId == "lbl1") {
                            self.checkNewAddressForm();
                            self.view.lbxCountry.masterData = addAddressViewModel.countryNew;
                            self.view.lbxCountry.selectedKey = countryId;
                        } else {
                            self.view.lbxState.setEnabled(true);
                            self.checkNewAddressForm();
                        }
                    }
                    // CommonUtilities.setText(self.view.lbxCountry,self.view.lbxCountry.selectedKeyValue[1] , CommonUtilities.getaccessibilityConfig());
                    //CommonUtilities.setText(self.view.lbxState,self.view.lbxState.selectedKeyValue[1] , CommonUtilities.getaccessibilityConfig());
                };
                this.view.lbxState.onSelection = function() {
                    var stateId = self.view.lbxState.selectedKeyValue[0];
                    self.checkNewAddressForm();
                    //CommonUtilities.setText(self.view.lbxState,self.view.lbxState.selectedKeyValue[1] , CommonUtilities.getaccessibilityConfig());
                };
                if (totalAddress == 0) {
                    this.view.lblSetAsPreferredCheckBox.skin = addAddressViewModel.isPreferredAddress ? ViewConstants.SKINS.CHECKBOX_SELECTED_SKIN : ViewConstants.SKINS.CHECKBOX_SELECTED_SKIN;
                    this.view.lblSetAsPreferredCheckBox.text = addAddressViewModel.isPreferredAddress ? ViewConstants.FONT_ICONS.CHECBOX_SELECTED : ViewConstants.FONT_ICONS.CHECBOX_SELECTED;

                } else {
                    this.view.lblSetAsPreferredCheckBox.text = addAddressViewModel.isPreferredAddress ? ViewConstants.FONT_ICONS.CHECBOX_SELECTED : ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED;
                    if (addAddressViewModel.isPreferredAddress) {
                    } else {
                    }
                }
                this.checkNewAddressForm();
                this.view.btnAddNewAddressAdd.onClick = function() {
                    if (globalScope.primaryCall && !(applicationManager.getUserPreferencesManager().getBackendIdentifier() === '')) {
                        globalScope.getPrimaryPayload["isPrimary"] = true;
                        self.getFileData(addAddressViewModel);
                    } else {
                        kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                            "moduleName": "SettingsNewUIModule",
                            "appName": "ManageProfileMA"
                        }).presentationController.saveAddress(self.getNewAddressFormData());
                    }
                }
                this.view.btnAddNewAddressCancel.onClick = function() {
                    //applicationManager.getNavigationManager().navigateTo("frmAddressSettings");
                    FormControllerUtility.showProgressBar(this.view);
                    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                        "moduleName": "SettingsNewUIModule",
                        "appName": "ManageProfileMA"
                    }).presentationController.fetchUser("Addresses");
                };
            }
            this.checkboxonClick(this.view.lblSetAsPreferredCheckBox,this.view.flxSetAsPreferredCheckBox);
        },
        setDataForUploadFileComp: function() {
            var isMandatory = true;
            var navMan = applicationManager.getNavigationManager();
            var files = navMan.getCustomInfo("modifyFileData");
            var filesData = [];
            if (!kony.sdk.isNullOrUndefined(files)) {
                filesData = this.getFormattedFileDataForComp(files);
            }
            var config = {
                "selectMultipleFiles": false,
                "filter": ['image/png', 'image/jpeg', 'application/pdf']
            }
            var dataComp = {
                // "title": kony.i18n.getLocalizedString("kony.onboarding.documents.adddocuments"),
                // "description": kony.i18n.getLocalizedString("kony.onboarding.documents.lblUploadDescription.text"),
                // "uploadFilesDocCallback": this.uploadFilesCallback.bind(this, userActionName, false, key, coApplicantKey, isMandatory, applicantType,areMultipleUserActionsPresent),//userActions[key][i].ActionMetaData.Skippable),
                // "fileSelectedCallback": this.fileSelectedCallBack.bind(this, userActionName),
                // "downloadCallback": this.downloadCallback.bind(this),
                "removeFileCallback": this.removeFileCallback.bind(this, isMandatory),
                // "checkEvidenceCallback": this.checkEvidenceCallback.bind(this, isMandatory),
                // "deleteEvidenceCallback": this.deleteEvidenceCallback.bind(this, isMandatory),
                // "removeFileUpdateCallback": this.removeFileUpdateCallback.bind(this, isMandatory),
                // "removeFileDropdownCallback": this.removeFileDropdownCallback.bind(this, isMandatory),
                // "filesData": filesData,
                "config": config,
                // "fulfilmentId": fulfilmentId,
                // "hasUploadState": false
            };
            this.view.uploadFiles.setData(dataComp);
        },
        getFormattedFileDataForComp: function(files) {
            var fileData = [];
            files.forEach(function(file) {
                var fileObject = {
                    "fileObj": {
                        "documentName": file[1]
                    },
                    documentDescription: "file a added",
                    clientDocID: file[2]
                };
                fileData.push(fileObject);
            })
            return fileData;
        },
        removeFileCallback: function(isMandatory, file, uniqueId, removeSuccess, removeFailure, removeSuccessDocument, isUpload, componentParentData) {
            removeSuccess();
        },
        /**
         * method to get data for a file
         * @returns 
         */
        getFileData: function(addAddressViewModel) {
            var browsedFiles = this.view.uploadFiles.getData();
            var attachments = [],
                fileData = {};
            var reader = new FileReader();
            var scope = this;

            function readFile(index) {
                if (index >= browsedFiles.length) {
                    this.getPrimaryPayload["Documents"] = attachments;
                    this.getPrimaryPayload["UpdatePrimaryAddress"] = scope.getPrimaryNewAddressFormData(addAddressViewModel);
                    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                        "moduleName": "SettingsNewUIModule",
                        "appName": "ManageProfileMA"
                    }).presentationController.saveAddress(this.getPrimaryPayload);
                    //return scope.presenter.getPrimaryAddressPayLoad;
                    //self.uploadUserActionDocument(attachments, userActionName, isSkippable, groupHeader, coApplicantKey, isMandatory, applicantType, filesUploaded, toggleSubmitButton, toggleSkipButton, uploadFileSucessCallback, uploadFileErrorCallback, componentParentData, onDocSubmit, showUploadBtn,{},areMultipleUserActionsPresent,appFulfilmentID);
                } else {
                    var newFile = browsedFiles[index];
                    fileData = {};
                    fileData.fileName = newFile[0].name;
                    fileData.fileType = newFile[0].file.type;
                    fileData.fileInfo = newFile[1];
                    fileData.fileClientId = newFile[2];
                    fileData.fileTypeOfProof = newFile[3];
                    reader.onloadend = function(e) {
                        var base64String = e.target.result;
                        base64String = base64String.replace("data:;base64,", "");
                        base64String = base64String.replace("data:image/png;base64,", "");
                        base64String = base64String.replace("data:application/octet-stream;base64,", "");
                        base64String = base64String.replace("data:image/jpeg;base64,", "");
                        base64String = base64String.replace("data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,", "");
                        base64String = base64String.replace("data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,", "");
                        base64String = base64String.replace("data:application/vnd.ms-excel;base64,", "");
                        fileData.fileContents = base64String.replace("data:application/pdf;base64,", "");
                        attachments.push(fileData);
                        readFile(index + 1);
                    };
                    reader.readAsDataURL(newFile[0].file);
                }
            }
            readFile(0);
        },
        /**
         * Method to show data related to New Address scenario
         * @param {Object} - which sets the data
         */
        getNewAddressFormData: function() {
            var addrLine1 = (this.view.tbxAddressLine1.text) ? this.view.tbxAddressLine1.text.trim() : "";
            var addrLine2 = (this.view.tbxAddressLine2.text) ? this.view.tbxAddressLine2.text.trim() : "";
            var countrySelected = this.view.lbxCountry.selectedKey;
            var stateSelected = (this.view.lbxState.selectedKey !== 'lbl1') ? this.view.lbxState.selectedKey : "";
            var citySelected = (this.view.tbxCityName.text) ? this.view.tbxCityName.text.trim() : "";
            var zipcode = (this.view.tbxZipcode.text) ? this.view.tbxZipcode.text.trim() : "";
            var Addr_type = (this.view.lbxType.selectedKey) ? this.view.lbxType.selectedKey : "";
            // var typeOfProof = data.typeOfProof;
            //var fileContents = data.contents;
            return [{
                addrLine1: addrLine1,
                addrLine2: addrLine2,
                countrySelected: countrySelected, // this.view.lbxCountry.selectedKey,
                zipcode: zipcode,
                isPrimary: this.view.lblSetAsPreferredCheckBox.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED,
                Addr_type: Addr_type,
                stateSelected: stateSelected, //this.view.lbxState.selectedKey,
                citySelected: citySelected, //.selectedKey
                // documents: data
                /*typeOfProof : data.typeOfProof,
                fileName:data.fileName,
                fileType:data.fileType,
                fileInfo:data.fileInfo,
                fileClientId:data.fileClientId,
                fileContents:data.fileContents*/
            }];
            this.checkboxonClick(this.view.lblSetAsPreferredCheckBox,this.view.flxSetAsPreferredCheckBox);
        },
        /**
         * Method to show data related to New Address scenario
         * @param {Object} - which sets the data
         */
        getPrimaryNewAddressFormData: function(addAddressViewModel) {
            var data = applicationManager.getAccountManager().getInternalAccounts();
            var customerId = data[0].coreCustomerId;
            var customerName = data[0].coreCustomerName;
            var addrLine1 = (this.view.tbxAddressLine1.text) ? this.view.tbxAddressLine1.text.trim() : "";
            var addrLine2 = (this.view.tbxAddressLine2.text) ? this.view.tbxAddressLine2.text.trim() : "";
            var countrySelected = this.view.lbxCountry.selectedKeyValue[1];
            var stateSelected = (this.view.lbxState.selectedKey !== 'lbl1') ? this.view.lbxState.selectedKeyValue[1] : "";
            var citySelected = (this.view.tbxCityName.text) ? this.view.tbxCityName.text.trim() : "";
            var zipcode = (this.view.tbxZipcode.text) ? this.view.tbxZipcode.text.trim() : "";
            var Addr_type = (this.view.lbxType.selectedKey) ? this.view.lbxType.selectedKey : "";
            //JSON FORMAT TO RETURN CURRENT AND NEW VALUE
            var AddType = this.getJson("Addr_type", addAddressViewModel.Addr_type, Addr_type);
            var Add1 = this.getJson("AddressLine1", addAddressViewModel.addressLine1, addrLine1);
            var Add2 = this.getJson("AddressLine2", addAddressViewModel.addressLine2, addrLine2);
            var Country = this.getJson("Country", addAddressViewModel.countrySelected, countrySelected);
            var state = this.getJson("State", addAddressViewModel.stateSelected, stateSelected);
            var city = this.getJson("City", addAddressViewModel.city, citySelected);
            var zip = this.getJson("PostalCode", addAddressViewModel.zipcode, zipcode);
            return [{
                addrLine1: addrLine1,
                addrLine2: addrLine2,
                countrySelected: countrySelected, // this.view.lbxCountry.selectedKey,
                zipcode: zipcode,
                isPrimary: this.view.lblSetAsPreferredCheckBox.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED,
                Addr_type: Addr_type,
                stateSelected: stateSelected, //this.view.lbxState.selectedKey,
                citySelected: citySelected,
                customerID: customerId,
                customerName: customerName
            }, {
                "requestData": [
                    Add1,
                    Add2,
                    Country, // this.view.lbxCountry.selectedKey,
                    zip,
                    AddType,
                    state, //this.view.lbxState.selectedKey,
                    city
                ]
            }];
            this.checkboxonClick(this.view.lblSetAsPreferredCheckBox,this.view.flxSetAsPreferredCheckBox);
        },
        /**
         * Method to return JSON format
         */
        getJson: function(fieldName, currentValue, newValue) {
            if (currentValue === undefined) {
                return {
                    "fieldName": fieldName,
                    "displayName": fieldName,
                    "currentValue": "",
                    "newValue": newValue
                };
            } else {
                return {
                    "fieldName": fieldName,
                    "displayName": fieldName,
                    "currentValue": currentValue,
                    "newValue": newValue
                };
            }
        },
        /**
         * Method to validate the address entered
         */
        checkNewAddressForm: function() {
            var addAddressFormData = this.getNewAddressFormData();
            if (addAddressFormData[0].addrLine1 === '') {
                this.disableButton(this.view.btnAddNewAddressAdd);
            } else if (!this.isValid(addAddressFormData[0].zipcode)) {
                this.disableButton(this.view.btnAddNewAddressAdd);
            } else if (addAddressFormData[0].city === '') {
                this.disableButton(this.view.btnAddNewAddressAdd);
            } else if (addAddressFormData[0].countrySelected === "1") {
                this.disableButton(this.view.btnAddNewAddressAdd);
            } else if (addAddressFormData[0].citySelected === "") {
                this.disableButton(this.view.btnAddNewAddressAdd);
            } else {
                this.enableButton(this.view.btnAddNewAddressAdd);
            }
        },
        restrictSpecialCharacterSet: function(){
            var scopeObj = this;
            scopeObj.view.tbxZipcode.restrictCharactersSet = "!@#&*_'-.~^|$%()+=}{][/|?,><`:;\"\\" ;
        },
        isValid: function(zipCode){
            var validationManager = applicationManager.getValidationUtilManager();
            var isValidZipCode = validationManager.isValidZip(zipCode);
            if (isValidZipCode === true) {
                 return true;
            } else return false;
        },
        /**
         *  Method to set ui for the component in mobile breakpoint
         */
         toggleMenuMobile: function() {
            if (this.view.lblCollapseMobile.text == "O") {
                this.view.lblCollapseMobile.text = "P";
                this.view.flxLeft.setVisibility(true);
                this.view.flxRight.setVisibility(false);
                this.view.profileMenu.PROFILESETTINGSflxMenuItem.setActive(true);
                this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
                    a11yARIA : {
                        "aria-labelledby" : "lblAccountSettingsMobile",
                        "aria-expanded" : true,
                        "tabindex" : 0,
                        "role" : "button"
                    }
                }
            } else {
                this.view.lblCollapseMobile.text = "O";
                this.view.flxLeft.setVisibility(false);
                this.view.flxRight.setVisibility(true);
                this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
                    a11yARIA : {
                        "aria-labelledby" : "lblAccountSettingsMobile",
                        "aria-expanded" : false,
                        "tabindex" : 0,
                        "role" : "button"
                    }
                }
                this.view.flxAccountSettingsCollapseMobile.setActive(true);
            }
        },
        changeProgressBarState: function(isLoading) {
            if (isLoading) {
                FormControllerUtility.showProgressBar(this.view);
            } else {
                FormControllerUtility.hideProgressBar(this.view);
            }
        },
        postShowProfile: function() {
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.frame.height - this.view.flxFooter.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            this.view.forceLayout();
            this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
                a11yARIA : {
                    "aria-labelledby" : "lblAccountSettingsMobile",
                    "aria-expanded" : false,
                    "tabindex" : 0,
                    "role" : "button"
                }
            }
            this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex
            this.view.onKeyPress = this.popUpDismiss;
            this.view.CustomPopup.onKeyPress = this.popUpDismiss;
            this.view.lblCollapseMobile.accessibilityConfig = {
                a11yHidden : true,
                a11yARIA : {
                    "tabindex" : -1
                }
            }
            this.view.customheadernew.collapseAll();
            this.view.lblAddNewAddressHeader.setActive(true);
        },
        /**
         * Method to Enable a button
         * @param {String} button - ID of the button to be enabled
         */
        enableButton: function(button) {
            if (!CommonUtilities.isCSRMode()) {
                button.setEnabled(true);
                button.skin = "sknbtnSSPffffff15px0273e3bg";
                button.hoverSkin = "sknBtnFocusSSPFFFFFF15Px0273e3";
                button.focusSkin = "sknBtnHoverSSPFFFFFF15Px0273e3";
            }
        },
        /**
         * Method to Disable a button
         * @param {String} button - ID of the button to be disabled
         */
        disableButton: function(button) {
            button.setEnabled(false);
            button.skin = "sknBtnBlockedSSPFFFFFF15Px";
            button.hoverSkin = "sknBtnBlockedSSPFFFFFF15Px";
            button.focusSkin = "sknBtnBlockedSSPFFFFFF15Px";
        },
        hideAll: function() {
            this.view.flxAddressesWrapper.setVisibility(false);
            this.view.flxAddNewAddressWrapper.setVisibility(false);
        },
        /**
         * Method to assign validation action on the address fields
         */
        setNewAddressValidationActions: function() {
            this.disableButton(this.view.btnAddNewAddressAdd);
            this.view.tbxAddressLine1.onKeyUp = this.checkNewAddressForm.bind(this);
            this.view.tbxAddressLine2.onKeyUp = this.checkNewAddressForm.bind(this);
            this.view.tbxZipcode.onKeyUp = this.checkNewAddressForm.bind(this);
            this.view.tbxCityName.onKeyUp = this.checkNewAddressForm.bind(this);
        },
        showAddresses: function() {
            //this.hideAll();
            this.view.flxAddNewAddressWrapper.setVisibility(true);
            var currBreakpoint = kony.application.getCurrentBreakpoint();
            if (currBreakpoint === 640 || orientationHandler.isMobile) {
                this.view.flxAddNewAddressWrapper.height = "550dp";
            }
        },
    }
});
// define("SettingsNew/frmAddNewAddressControllerActions", {
//     /*
//       This is an auto generated file and any modifications to it may result in corruption of the action sequence.
//     */
//     /** init defined for frmAddNewAddress **/
//     AS_Form_bc82211e950c4e2f9b26f9a5d884c4e8: function AS_Form_bc82211e950c4e2f9b26f9a5d884c4e8(eventobject) {
//         var self = this;
//         return self.init.call(this);
//     }
// });
// define("SettingsNew/frmAddNewAddressController", ["SettingsNew/userfrmAddNewAddressController", "SettingsNew/frmAddNewAddressControllerActions"], function() {
//     var controller = require("SettingsNew/userfrmAddNewAddressController");
//     var controllerActions = ["SettingsNew/frmAddNewAddressControllerActions"];
//     return kony.visualizer.mixinControllerActions(controller, controllerActions);
// });
define("ManageProfileMA/SettingsNewUIModule/frmAddNewAddressControllerActions", {
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** init defined for frmAddNewAddress **/
    AS_Form_bc82211e950c4e2f9b26f9a5d884c4e8: function AS_Form_bc82211e950c4e2f9b26f9a5d884c4e8(eventobject) {
        var self = this;
        this.init();
    }
});
define("ManageProfileMA/SettingsNewUIModule/frmAddNewAddressController", ["ManageProfileMA/SettingsNewUIModule/userfrmAddNewAddressController", "ManageProfileMA/SettingsNewUIModule/frmAddNewAddressControllerActions"], function() {
    var controller = require("ManageProfileMA/SettingsNewUIModule/userfrmAddNewAddressController");
    var controllerActions = ["ManageProfileMA/SettingsNewUIModule/frmAddNewAddressControllerActions"];
    return kony.visualizer.mixinControllerActions(controller, controllerActions);
});
