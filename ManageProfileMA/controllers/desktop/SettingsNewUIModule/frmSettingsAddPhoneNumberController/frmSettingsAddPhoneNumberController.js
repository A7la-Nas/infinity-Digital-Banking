define(["CommonUtilities", "FormControllerUtility", "OLBConstants", "ViewConstants"], function(CommonUtilities, FormControllerUtility, OLBConstants, ViewConstants) {
  var orientationHandler = new OrientationHandler();
  var responsiveUtils = new ResponsiveUtils();
  return{ 
    enableSeparateContact : false,
    updateFormUI: function(viewModel) {
      if (viewModel !== undefined) {
        if (viewModel.serverError) {
          this.showServerError(viewModel.serverError);
        } else {
          if (viewModel.isLoading !== undefined) {
            this.changeProgressBarState(viewModel.isLoading);
          }
          if(viewModel.addPhoneViewModel){
            this.updateAddPhoneViewModel(viewModel.addPhoneViewModel);
          }
        }
      }
      this.view.lblAddPhoneNumberHeading.setActive(true);
    },
    init : function(){
      this.view.preShow = this.preshow;
      this.view.postShow = this.postshow;
      this.setFlowActions();

    },
    preshow : function(){   
        var self = this;
      this.view.flxRight.setVisibility(true);
      this.view.tbxAddPhoneNumber.text = "";
      applicationManager.getLoggerManager().setCustomMetrics(this, false, "Phone");
      this.view.flxAccountSettingsCollapseMobile.onClick = this.toggleMenuMobile;
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain','flxMenuItemMobile']);
      this.view.lblCollapseMobile.text  = "O";
      this.view.customheadernew.activateMenu("Settings","Profile Settings");
      this.view.profileMenu.checkLanguage();
      this.view.profileMenu.activateMenu("PROFILESETTINGS","Phone");
	  FormControllerUtility.hideErrorForTextboxFields(this.view.tbxAddPhoneNumberCountryCode,this.view.flxError);
      this.setSelectedValue("i18n.Profilemanagement.lblPhone");
      this.setAccessibility();
      /*this.view.CopyimgWarning0d045e22dc1104f.accessibilityConfig = {
            "a11yARIA": 
            {
                "tabindex" : -1
            }
      };*/
      this.view.onBreakpointChange = function() {
        self.onBreakpointChange(kony.application.getCurrentBreakpoint());
      }
      
      this.view.forceLayout();
    },
    postshow : function(){
      this.view.lblWarning.text = kony.i18n.getLocalizedString("i18n.profilemanagement.primaryNumberExists");
      applicationManager.getNavigationManager().applyUpdates(this);
      this.CheckBoxesAccessibiltyChange();
      this.view.CopyCustomPopup0gd4b76fc44a74b.onKeyPress = this.onKeyPressCallBack;
      this.view.CopyCustomPopup0gd4b76fc44a74b.doLayout = CommonUtilities.centerPopupFlex;
      this.view.onKeyPress = this.onKeyPressCallBack;
      this.view.lblAddPhoneNumberHeading.setActive(true);
    },
    
     /**
	*  Method to implement escape functionality for accessibility
	*/
    onKeyPressCallBack: function(eventObject, eventPayload){
      if (eventPayload.keyCode === 27) {
        if (this.view.flxDialogs.isVisible === true) {
          this.view.flxDialogs.isVisible = false;
          this.view.customheadernew.btnLogout.setFocus(true);
        }
        if(kony.application.getCurrentBreakpoint()===640){
          if(this.view.flxLeft.isVisible === true){
            this.toggleMenuMobile();
            this.view.flxAccountSettingsCollapseMobile.setActive(true);
          }
        }
        this.view.customheadernew.onKeyPressCallBack(eventObject,eventPayload);
      }
    },
     /**
	*  Method to set the Accessibility configurations for checkboxes
	*/
    CheckBoxesAccessibiltyChange: function() {
      var scopeObj=this;
      if (scopeObj.view.lblAddCheckBox3.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED){
        scopeObj.view.flxAddCheckBox3.accessibilityConfig = {
          "a11yARIA": {
            "aria-labelledby": "lblAddOption3",
            "role": "checkbox",
            "aria-checked": true
          }
        };
      }
      else{
        scopeObj.view.flxAddCheckBox3.accessibilityConfig = {
          "a11yARIA": {
            "aria-labelledby": "lblAddOption3",
            "role": "checkbox",
            "aria-checked": false
          }
        };
      }
      if (scopeObj.view.lblAddCheckBox4.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED){
        scopeObj.view.flxAddCheckBox4.accessibilityConfig = {
          "a11yARIA": {
            "aria-labelledby": "lblAddOption4",
            "role": "checkbox",
            "aria-checked": true
          }
        };
      }
      else{
        scopeObj.view.flxAddCheckBox4.accessibilityConfig = {
          "a11yARIA": {
            "aria-labelledby": "lblAddOption4",
            "role": "checkbox",
            "aria-checked": false
          }
        };
      }
    },


    /**
	*  Method to set the Accessibility configurations
	*/
    setAccessibility: function(){
      //CommonUtilities.setText(this.view.customheadernew.lblHeaderMobile, kony.i18n.getLocalizedString("i18n.ProfileManagement.profilesettings"), accessibilityConfig);
      //CommonUtilities.setText(this.view.lblAddPhoneNumberHeading, kony.i18n.getLocalizedString("i18n.ProfileManagement.AddPhoneNumber"), accessibilityConfig);
      //CommonUtilities.setText(this.view.lblAddPhoneNumberType, kony.i18n.getLocalizedString("i18n.ProfileManagement.Type"), accessibilityConfig);
      //CommonUtilities.setText(this.view.lblAddPhoneNumber, kony.i18n.getLocalizedString("i18n.ProfileManagement.PhoneNumber"), accessibilityConfig);
      //CommonUtilities.setText(this.view.lblAddOption3, kony.i18n.getLocalizedString("i18n.ProfileManageemnt.Makemyprimaryphonenumber"), accessibilityConfig);
      //CommonUtilities.setText(this.view.lblAddOption4, kony.i18n.getLocalizedString("i18n.alertSettings.markAlertComm"), accessibilityConfig);
      this.view.btnAddPhoneNumberSave.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.Save");
      this.view.btnAddPhoneNumberCancel.text = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
     // CommonUtilities.setText(this.view.lblWarning, kony.i18n.getLocalizedString("i18n.profilemanagement.primaryNumberExists"), accessibilityConfig);
      this.view.lblAddPleaseChoose.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.pleasechoosewhatservice");
      this.view.lblContentHeader.accessibilityConfig = {
        "a11yARIA": {
          "tabindex": -1
        },
        "a11yLabel": this.view.lblAddPhoneNumberHeading.text + " " + kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson")
      };
      this.view.btnAddPhoneNumberSave.accessibilityConfig = {
        "a11yLabel": "Save new phone number"
      };
      this.view.btnAddPhoneNumberCancel.accessibilityConfig = {
        "a11yLabel": "Cancel add phone number process"
      };
      
     },  

    /* *@param {String} text- text that needs to be appended to the upper text in mobile breakpoint
	*  Method to set the text in mobile breakpoint
	*/
    setSelectedValue: function (text) {
      var self = this;
      self.view.lblAccountSettingsMobile.text = kony.i18n.getLocalizedString(text);
    },

    /**
	* *@param {Boolean} isLoading- True or false to show/hide the progess bar
	*  Method to set show/hide the progess bar
	*/
    changeProgressBarState: function(isLoading) {
      if (isLoading) {
        FormControllerUtility.showProgressBar(this.view);
      } else {
        FormControllerUtility.hideProgressBar(this.view);
      }
    },
    /**
	*  Method to set ui for the component in mobile breakpoint
	*/
    toggleMenuMobile: function () {
      if (this.view.lblCollapseMobile.text == "O") {
        this.view.lblCollapseMobile.text = "P";
        this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
          "a11yARIA": {
            "aria-labelledby": "lblAccountSettingsMobile",
            "role": "button",
            "aria-expanded": true
          }
        };
        this.view.flxLeft.setVisibility(true);
        this.view.flxRight.setVisibility(false);
      } else {
        this.view.lblCollapseMobile.text  = "O";
        this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
          "a11yARIA": {
            "aria-labelledby": "lblAccountSettingsMobile",
            "role": "button",
            "aria-expanded": false
          }
        };
        this.view.flxLeft.setVisibility(false);
        this.view.flxRight.setVisibility(true);
      }
    }, 
    setFlowActions : function(){
      var scopeObj = this;
      this.view.btnAddPhoneNumberCancel.onClick = this.onCancelClick;
      /*this.view.tbxAddPhoneNumber.onTextChange = function(){
        scopeObj.view.tbxAddPhoneNumber.accessibilityConfig = {
                                   "a11yValue": scopeObj.view.tbxAddPhoneNumber.text.trim()
                               };
      };
      this.view.tbxAddPhoneNumberCountryCode.onTextChange = function(){
        scopeObj.view.tbxAddPhoneNumberCountryCode.accessibilityConfig = {
                                   "a11yValue": scopeObj.view.tbxAddPhoneNumberCountryCode.text.trim()
                               };
      };*/
      var valManager = applicationManager.getValidationUtilManager();
      var specialCharactersSet = "~#^|$%&*!@()_-+=}{][/|?,.><`':;\"\\";
      var alphabetsSet = "abcdefghijklmnopqrstuvwxyz";
      this.view.tbxAddPhoneNumber.restrictCharactersSet = specialCharactersSet + alphabetsSet + alphabetsSet.toUpperCase();
      this.view.tbxAddPhoneNumber.maxTextLength = 13;
      this.view.tbxAddPhoneNumberCountryCode.restrictCharactersSet = specialCharactersSet.replace('+', '') + alphabetsSet + alphabetsSet.toUpperCase();
      this.view.tbxAddPhoneNumberCountryCode.maxTextLength = 4;
      this.view.tbxAddPhoneNumber.onTextChange = function(){
        var phoneNo = scopeObj.view.tbxAddPhoneNumber.text.replace(/\D/g, '');
        scopeObj.view.tbxAddPhoneNumber.text = phoneNo;
        valManager.isValidPhoneNumber(scopeObj.view.tbxAddPhoneNumber.text);
      };
      this.view.tbxAddPhoneNumberCountryCode.onTextChange = function(){
        var countryCode = scopeObj.view.tbxAddPhoneNumberCountryCode.text.replace(/\D\+/g, '');
        scopeObj.view.tbxAddPhoneNumberCountryCode.text = countryCode;
        valManager.isValidCountryCode(scopeObj.view.tbxAddPhoneNumberCountryCode.text);
      };
      this.view.lbxAddPhoneNumberType.onSelection = function(){
        CommonUtilities.setText(scopeObj.view.lbxAddPhoneNumberType,scopeObj.view.lbxAddPhoneNumberType.selectedKey , CommonUtilities.getaccessibilityConfig());
      };
      this.view.flxAddCheckBox3.onClick = function() {
        scopeObj.toggleFontCheckBox(scopeObj.view.lblAddCheckBox3);
        scopeObj.CheckBoxesAccessibiltyChange();
      };
      this.view.flxAddCheckBox4.onClick = function() {
        scopeObj.toggleFontCheckBox(scopeObj.view.lblAddCheckBox4);
        scopeObj.CheckBoxesAccessibiltyChange();
      };
      if (CommonUtilities.isCSRMode()) {
        this.view.btnAddPhoneNumberSave.onClick = CommonUtilities.disableButtonActionForCSRMode();
        this.view.btnAddPhoneNumberSave.skin = CommonUtilities.disableButtonSkinForCSRMode();
      } else {
        this.view.btnAddPhoneNumberSave.onClick = this.btnAddPhoneNumberSaveOnClick;
        this.setAddNewPhoneValidationActions();
      }
    },
   
    onCancelClick : function(){
      applicationManager.getNavigationManager().navigateTo("frmSettingsPhoneNumbers");
      //kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsNewUIModule", "appName" : "ManageProfileMA"}).presentationController.navigateToForm("frmSettingsPhoneNumbers"); 
    },
    
     /**
         * Method to update add phone number UI based non the error or success senario
         */
        validateAddPhoneNumberForm: function() {
            var phoneData = this.getNewPhoneFormData();
            if ((!applicationManager.getValidationUtilManager().isValidPhoneNumber(phoneData.phoneNumber)) || (phoneData.phoneNumber.length < 7 && phoneData.phoneNumber.length > 15)) {
                FormControllerUtility.showErrorForTextboxFields(this.view.tbxAddPhoneNumber, this.view.flxError);
                this.view.CopylblError0f2f036aaf7534c.text = kony.i18n.getLocalizedString("i18n.profile.notAValidPhoneNumber");
                return false;
            }else{
				FormControllerUtility.hideErrorForTextboxFields(this.view.tbxAddPhoneNumber, this.view.flxError);
            }
            if(!applicationManager.getValidationUtilManager().isValidPhoneNumberCountryCode(phoneData.phoneCountryCode) ){
                   FormControllerUtility.showErrorForTextboxFields(this.view.tbxAddPhoneNumberCountryCode,this.view.flxError);
                   this.view.CopylblError0f2f036aaf7534c.text = kony.i18n.getLocalizedString("i18n.profile.enterPhoneNumberCountryCode");
                   return false;
                 }
            else {
                
                    FormControllerUtility.hideErrorForTextboxFields(this.view.tbxAddPhoneNumberCountryCode,this.view.flxError);
            }
			return true;
        },
        btnAddPhoneNumberSaveOnClick : function() {
          var scaType = CommonUtilities.getSCAType();
          if(scaType == 0)
          this.btnAddPhoneNumberSaveCall("false");
         
       else
       this.SCARMScall();
        },
        SCARMScall : function(){
          FormControllerUtility.showProgressBar(this.view);
          let rmsComponent = new com.temenos.infinity.sca.rmsComponent({"appName" : "ResourcesHIDMA"});
          let scopeObj = this;
          scopeObj.action = "PROFILE_SETTINGS_UPDATE";
          let appSessionId = "";
          if(OLBConstants.CLIENT_PROPERTIES && OLBConstants.CLIENT_PROPERTIES.SCA_RISK_ASSESSMENT && OLBConstants.CLIENT_PROPERTIES.SCA_RISK_ASSESSMENT.toUpperCase() === "TRUE")
           appSessionId = applicationManager.getRmsSessionID();
          rmsComponent.rmsActionSuccess = function(output) {
            FormControllerUtility.hideProgressBar(this.view);
            if (output.userBlock == "true") {
              output.errorMessage = kony.i18n.getLocalizedString("kony.sca.rms.userBlock");
              var viewProperties = {
                isLoading: false,
                addPhoneViewModel: {
                  serverError:  output
                }
              };
              scopeObj.updateFormUI(viewProperties);
    
            }
            else {
              
              scopeObj.stepUp = output.stepUp;
              scopeObj.btnAddPhoneNumberSaveCall(scopeObj.stepUp);
            }
          };
          rmsComponent.rmsActionFailure = function(output) {
            FormControllerUtility.hideProgressBar(this.view);
            scopeObj.stepUp = "true";
            scopeObj.btnAddPhoneNumberSaveCall(scopeObj.stepUp);
          };
          rmsComponent.rmsActionCreate(scopeObj.action, appSessionId);
        },
        btnAddPhoneNumberSaveCall : function(isMFARequired){
          if (this.validateAddPhoneNumberForm()) {
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsNewUIModule", "appName" : "ManageProfileMA"}).presentationController.savePhoneNumber(this.getNewPhoneFormData(),isMFARequired);
            this.view.flxHeader.setFocus(true);
          }
        },
   

    /**
       * Method to update the module while adding a new phone number
       * @param {Object} addPhoneViewModel- responce from backend after fetching phone number
       */
    updateAddPhoneViewModel: function(addPhoneViewModel) {
      var scopeObj= this;
      this.checkAddNewPhoneForm();
      if (addPhoneViewModel.serverError) {
        this.view.flxError.setVisibility(true);
        this.view.CopylblError0f2f036aaf7534c.text = addPhoneViewModel.serverError.errorMessage;
      } else {
        this.showAddPhonenumber();
        this.view.flxError.setVisibility(false);
        //this.view.imgAddRadioBtnUS.src = addPhoneViewModel.countryType === 'domestic' ?  ViewConstants.IMAGES.ICON_RADIOBTN: ViewConstants.IMAGES.ICON_RADIOBTN_ACTIVE ;
        if(addPhoneViewModel.phoneTypes.length>0){
          this.view.lbxAddPhoneNumberType.masterData = addPhoneViewModel.phoneTypes;
          this.view.lbxAddPhoneNumberType.selectedKey = addPhoneViewModel.phoneTypeSelected;
        }
        scopeObj.view.lbxAddPhoneNumberType.text = addPhoneViewModel.phoneTypeSelected;
        this.view.tbxAddPhoneNumber.text = addPhoneViewModel.phoneNumber;
        this.view.tbxAddPhoneNumber.skin = "skntbxffffffBordere3e3e3SSP15px424242";
        this.view.tbxAddPhoneNumberCountryCode.skin = "skntbxffffffBordere3e3e3SSP15px424242";
        this.view.tbxAddPhoneNumberCountryCode.text = addPhoneViewModel.phoneCountryCode;
        this.view.lblAddCheckBox3.skin = addPhoneViewModel.isPrimary ? ViewConstants.SKINS.CHECKBOX_SELECTED_SKIN : ViewConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
        //this.view.lblAddCheckBox3.text = addPhoneViewModel.isPrimary ? ViewConstants.FONT_ICONS.CHECBOX_SELECTED : ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED;
        this.view.lblAddCheckBox4.skin = addPhoneViewModel.isAlertsRequired ? ViewConstants.SKINS.CHECKBOX_SELECTED_SKIN : ViewConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
        //this.view.lblAddCheckBox4.text = addPhoneViewModel.isAlertsRequired ? ViewConstants.FONT_ICONS.CHECBOX_SELECTED : ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED;
        // this.setAddPhoneServicesData(addPhoneViewModel.services);
          if(addPhoneViewModel.isPrimary)
                {
                  this.view.lblAddCheckBox3.text = ViewConstants.FONT_ICONS.CHECBOX_SELECTED;           
                } else {
                  this.view.lblAddCheckBox3.text = ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED;
                }
                if(addPhoneViewModel.isAlertsRequired)
                {
                  this.view.lblAddCheckBox4.text =  ViewConstants.FONT_ICONS.CHECBOX_SELECTED;               
                } else {
                  this.view.lblAddCheckBox4.text = ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED;
                }
        if(addPhoneViewModel.isFirstPhoneNumber){
          this.view.flxWarning.setVisibility(false);
          this.view.lblAddCheckBox3.skin = ViewConstants.SKINS.CHECKBOX_SELECTED_SKIN;
        }
        else{
          this.view.flxWarning.setVisibility(true);
        this.view.flxAddPhoneNumberButtons.setVisibility(true);
        }
      }
      
    },
   
    /**
       * Method to enable/disable button based on the new phone number entered
       */
    checkAddNewPhoneForm: function() {
      var formdata = this.getNewPhoneFormData();
      if (formdata.phoneNumber === "") {
        this.disableButton(this.view.btnAddPhoneNumberSave);
      } else {
        this.enableButton(this.view.btnAddPhoneNumberSave);
      }
    },
    /**
       * Method to show data related to phone numbers
       * @returns {Object} - contains the type, phoneNumber, isPrimary, services, receivePromotions attributes.
       */
    getNewPhoneFormData: function() {
      return {
        type: this.view.lbxAddPhoneNumberType.selectedKey,
        phoneNumber: this.view.tbxAddPhoneNumber.text.trim(),
        phoneCountryCode: this.view.tbxAddPhoneNumberCountryCode.text.trim(),
        isPrimary: this.view.lblAddCheckBox3.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED,
        isAlertsRequired: this.view.lblAddCheckBox4.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED,
        /* services: this.view.segAddPhoneNumbersOption1.data == undefined ? {} : this.view.segAddPhoneNumbersOption1.data
                  .filter(function(data) {
                      return data.lblCheckBox.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED
                  })
                  .map(function(data) {
                      return data.id
                  }),*/
        receivePromotions: false,
      }
    },
     /**
       * Method to assign validation action on the new phone entered fields
       */
      setAddNewPhoneValidationActions: function() {
          this.view.tbxAddPhoneNumber.onKeyUp = this.checkAddNewPhoneForm.bind(this);
      },
    showAddPhonenumber: function() {
      this.view.flxAddPhoneNumberCountryCode.setVisibility(true);
      if(applicationManager.getConfigurationManager().getCountryCodeFlag() == true){
        this.view.tbxAddPhoneNumberCountryCode.setVisibility(true);
      }else{
        this.view.tbxAddPhoneNumberCountryCode.setVisibility(false);
      }
      if(kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsNewUIModule", "appName" : "ManageProfileMA"}).presentationController.getenableSeparateContact())
      {
        this.view.flxAddOption4.setVisibility(true);
      } else {
        this.view.flxAddOption4.setVisibility(false);
      }
    },

    /**
    * onBreakpointChange : Handles ui changes on .
    * @member of {frmCreateSavingsGoalController}
    * @param {integer} width - current browser width
    * @return {}
    * @throws {}
    */
   onBreakpointChange: function (width) {
      FormControllerUtility.setupFormOnTouchEnd(width);
      responsiveUtils.onOrientationChange(this.onBreakpointChange);
      this.view.customheadernew.onBreakpointChangeComponent(width);
      this.view.customfooternew.onBreakpointChangeComponent(width);
      this.view.profileMenu.onBreakpointChangeComponent(width);
      orientationHandler.onOrientationChange(this.onBreakpointChange);
      if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
        this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.profilesettings");
        this.view.flxLeft.accessibilityConfig = {
          "a11yARIA": {
            "tabindex": -1,
            "aria-live": "off"
          }
        };
        this.view.flxRight.accessibilityConfig = {
          "a11yARIA": {
            "tabindex": -1,
            "aria-live": "off"
          }
        };
      }
     else{
       this.view.flxLeft.accessibilityConfig = {
          "a11yARIA": {
            "tabindex": -1
          }
       };
       this.view.flxRight.accessibilityConfig = {
          "a11yARIA": {
            "tabindex": -1
          }
       };      
     }
      this.view.forceLayout();
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
    /**
       * Method to Enable a button
       * @param {String} button - ID of the button to be enabled
       */
      enableButton: function(button) {
          if(!CommonUtilities.isCSRMode()){
             button.setEnabled(true);
            button.skin = "sknbtnSSPffffff15px0273e3bg";
                button.hoverSkin = "sknbtnSSPffffff15px0273e3bg";//sknBtnHoverSSPFFFFFF15Px0273e3
                button.focusSkin = "sknbtnSSPffffff15px0273e3bg";//sknBtnFocusSSPFFFFFF15Px0273e3
          }
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

  };
});