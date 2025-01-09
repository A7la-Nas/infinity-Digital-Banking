define(['CommonUtilities', 'CSRAssistUI','FormControllerUtility', 'OLBConstants', 'ViewConstants', 'CampaignUtility'], function(CommonUtilities, CSRAssistUI, FormControllerUtility, OLBConstants, ViewConstants, CampaignUtility) {
  var orientationHandler = new OrientationHandler();
  var responsiveUtils = new ResponsiveUtils();
  return {
    updateFormUI: function(viewModel) {
      if (viewModel !== undefined) {
        if (viewModel.isLoading !== undefined) this.changeProgressBarState(viewModel.isLoading);
        if (viewModel.emailError) this.showEmailError(viewModel.emailError);
        if (viewModel.campaign) {
          CampaignUtility.showCampaign(viewModel.campaign, this.view, "flxContainer");
        }   
         if (viewModel.emailList) this.updateEmailList(viewModel.emailList);
         if (viewModel.emails) this.setEmailsToLbx(viewModel.emails);
             
      }
      this.view.lblAddNewEmailHeading.setActive(true);
    },
    preShow:function()
    {
      var self=this;
      this.view.flxRight.setVisibility(true);
      applicationManager.getLoggerManager().setCustomMetrics(this, false, "Profile");
      this.view.postShow=this.postShowProfile;
      this.view.flxAccountSettingsCollapseMobile.onClick = this.toggleMenuMobile;
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain','flxMenuItemMobile']);
      this.view.lblCollapseMobile.text  = "O";
      this.view.profileMenu.checkLanguage();
      this.view.profileMenu.activateMenu("PROFILESETTINGS","Email");
      this.view.customheadernew.activateMenu("Settings","Profile Settings");
      this.setSelectedValue("i18n.ProfileManagement.EmailId");
      this.setFlowActions();
      this.resetAddEmailForm();
      this.setAccessibility();
      this.view.onBreakpointChange = function() {
        self.onBreakpointChange(kony.application.getCurrentBreakpoint());
           }
      /*this.view.imgPrimaryNumberexists.accessibilityConfig = {
            "a11yARIA": 
            {
                "tabindex" : -1
            }
        };*/
      /*this.view.tbxEmailId.accessibilityConfig = {
                                   "a11yLabel": kony.i18n.getLocalizedString("i18n.Profile.Enteremail")
                               };*/
      this.view.forceLayout();
    },
    /**
	* *@param {String} text- text that needs to be appended to the upper text in mobile breakpoint
	*  Method to set the text in mobile breakpoint
	*/
    setSelectedValue: function (text) {
     var self = this;
      CommonUtilities.setText(self.view.lblAccountSettingsMobile, kony.i18n.getLocalizedString(text) , CommonUtilities.getaccessibilityConfig());
    },
    /**
	*  Method to set ui for the component in mobile breakpoint
	*/
    toggleMenuMobile: function () {
      if (this.view.lblCollapseMobile.text == "O") {
        this.view.lblCollapseMobile.text = "P";
        this.view.flxLeft.setVisibility(true);
        this.view.flxRight.setVisibility(false);
        this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
          "a11yARIA" : {
            "aria-labelledby": "lblAccountSettingsMobile",
            "role" : "button",
            "aria-expanded": true
            }         
        };
      } else {
        this.view.lblCollapseMobile.text  = "O";
        this.view.flxLeft.setVisibility(false);
        this.view.flxRight.setVisibility(true);
        this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
          "a11yARIA" : {
            "aria-labelledby": "lblAccountSettingsMobile",
            "role": "button",
            "aria-expanded": false
            }         
        };
      }
    }, 
      /**
       * Method to enable/disable button based on the email entered
       */
      checkAddEmailForm: function() {
        if(this.view.tbxEmailId.text.length>0){
          if (applicationManager.getValidationUtilManager().isValidEmail(this.view.tbxEmailId.text)) {
              this.enableButton(this.view.btnAddEmailIdAdd);
              FormControllerUtility.hideErrorForTextboxFields(this.view.tbxEmailId, this.view.flxErrorAddNewEmail);
          } else {
              this.disableButton(this.view.btnAddEmailIdAdd);
              FormControllerUtility.showErrorForTextboxFields(this.view.tbxEmailId, this.view.flxErrorAddNewEmail);
              this.view.flxErrorAddNewEmail.accessibilityConfig = {
                "a11yARIA": {
                    "tabindex": -1,
					"role":"alert"
                }
            };
              CommonUtilities.setText(this.view.CopylblError0e8bfa78d5ffc48, kony.i18n.getLocalizedString("i18n.payments.validEmailMessage"), CommonUtilities.getaccessibilityConfig());
          }
        }
      },
      /**
       * Method to set the validation function while entering email
       */
      setAddEmailValidationActions: function() {
          var scopeObj = this;
          this.disableButton(this.view.btnAddEmailIdAdd);
          this.view.tbxEmailId.onEndEditing = function() {
              scopeObj.checkAddEmailForm();
          };
      },
     /**
       * Method to Enable a button
       * @param {String} button - ID of the button to be enabled
       */
      enableButton: function(button) {
          if(!CommonUtilities.isCSRMode()){
             button.setEnabled(true);
             button.skin = "sknbtnSSPffffff15px0273e3bg";
             button.hoverSkin = "sknBtnFocusSSPFFFFFF15Px0273e3";
             button.focusSkin = "sknBtnHoverSSPFFFFFF15Px0273e3";
          }
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
    postShowProfile: function() { 
      applicationManager.getNavigationManager().applyUpdates(this);
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
	  //CommonUtilities.setText(this.view.lblHeading, kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson"), accessibilityConfig);
      this.view.forceLayout();
      this.view.onKeyPress = this.onKeyPressCallBack;
      this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack;
      this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
      this.view.customheadernew.collapseAll();
      this.view.lblAddNewEmailHeading.setActive(true);
    },

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

    onBreakpointChange: function (width) {
      var scope = this;
      FormControllerUtility.setupFormOnTouchEnd(width);
      responsiveUtils.onOrientationChange(this.onBreakpointChange);
      this.view.customheadernew.onBreakpointChangeComponent(width);
      this.view.customfooternew.onBreakpointChangeComponent(width);
      this.view.profileMenu.onBreakpointChangeComponent(width);
      orientationHandler.onOrientationChange(this.onBreakpointChange);
      if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        CommonUtilities.setText(this.view.customheadernew.lblHeaderMobile, kony.i18n.getLocalizedString("i18n.ProfileManagement.profilesettings"), accessibilityConfig);
      }
      this.view.forceLayout();      
    },
    setAccessibility: function(){
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      //this.view.btnAddEmailIdCancel.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
      //this.view.btnAddEmailIdAdd.toolTip = kony.i18n.getLocalizedString("i18n.ProfileManagement.ADD");
      //this.view.customheadernew.lblAccounts.toolTip=kony.i18n.getLocalizedString("i18n.topmenu.accounts");
      //CommonUtilities.setText(this.view.customheadernew.lblHeaderMobile, kony.i18n.getLocalizedString("i18n.ProfileManagement.profilesettings"), accessibilityConfig);
      //CommonUtilities.setText(this.view.lblAddNewEmailHeading, kony.i18n.getLocalizedString("i18n.ProfileManagement.AddNewEmail"), accessibilityConfig);
      //CommonUtilities.setText(this.view.lblMarkAsPrimaryEmail, kony.i18n.getLocalizedString("i18n.ProfileManagement.MarkAsPrimaryEmail"), accessibilityConfig);
      //CommonUtilities.setText(this.view.lblMarkAsAlertCommEmail, kony.i18n.getLocalizedString("i18n.alertSettings.markAlertComm"), accessibilityConfig);
      CommonUtilities.setText(this.view.btnAddEmailIdCancel, kony.i18n.getLocalizedString("i18n.transfers.Cancel"), accessibilityConfig);
      CommonUtilities.setText(this.view.btnAddEmailIdAdd, kony.i18n.getLocalizedString("i18n.ProfileManagement.ADD"), accessibilityConfig);
      //CommonUtilities.setText(this.view.lblPrimaryNumberexists, kony.i18n.getLocalizedString("i18n.profile.anotherEmail"), accessibilityConfig);
      this.view.lblMarkAsPrimaryEmail.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.MarkAsPrimaryEmail");
      this.view.lblMarkAsAlertCommEmail.text = kony.i18n.getLocalizedString("i18n.alertSettings.markAlertComm");
      this.view.lblHeading.accessibilityConfig = {
        "a11yARIA": {
          "tabindex": -1
        },
        "a11yLabel": this.view.lblAddNewEmailHeading.text + " " + kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson")
      };
      this.view.btnAddEmailIdAdd.accessibilityConfig = {
                                   "a11yLabel": "Add new email address"
                               };
      this.view.btnAddEmailIdCancel.accessibilityConfig = {
                                   "a11yLabel": "Cancel add email process"
                               };
      if (this.view.lblMarkAsPrimaryEmailCheckBox.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED) {
                this.view.lblMarkAsPrimaryEmailCheckBox.accessibilityConfig = {
                    "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.AddEmailMakeThisAsPrimaryEmailChecked"),
                     "a11yHidden":true
                };
            } else {
                this.view.lblMarkAsPrimaryEmailCheckBox.accessibilityConfig = {
                    "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.AddEmailMakeThisAsPrimaryEmailUnchecked"),
                     "a11yHidden":true
                };
            }
      if (this.view.lblMarkAsAlertCommEmailCheckBox.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED) {
                this.view.lblMarkAsAlertCommEmailCheckBox.accessibilityConfig = {
                    "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.AddEmailMarkThisEmailForAlertCommunicationChecked"),
                    "a11yHidden":true
                };
            } else {
                this.view.lblMarkAsAlertCommEmailCheckBox.accessibilityConfig = {
                    "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.AddEmailMarkThisEmailForAlertCommunicationUnchecked"),
                    "a11yHidden":true
                };
            }
      
      //CommonUtilities.setText(this.view.lblHeading, kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson"), accessibilityConfig);
      this.view.lblCollapseMobile.accessibilityConfig = {
        "a11yARIA": {
            "tabindex": -1
        }
      };
      this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
        "a11yLabel": "Dropdown",
        "a11yARIA": {
          "role": "button",           
          "aria-expanded":false
          }         
      };
      this.view.flxMarkAsPrimaryEmailCheckbox.accessibilityConfig = {
         "a11yARIA": {
            "aria-checked": false,
            "aria-labelledby": "lblMarkAsPrimaryEmail",
            "role": "checkbox",
            "tabindex": 0
          }
       };
       this.view.flxMarkAsAlertCommEmailCheckBox.accessibilityConfig = {
          "a11yARIA": {
            "aria-checked": false,
            "aria-labelledby": "lblMarkAsAlertCommEmailCheckBox",
            "role": "checkbox",
            "tabindex": 0
           }
       };
    /*   this.view.imgPrimaryNumberexists.accessibilityConfig = {
        "a11yARIA": {
            "tabindex": -1
        },
        "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.AddEmailAnotherPrimaryEmailExistsInfo")
      };*/
     
    },  
    /**
	*  Method to set the Form Flow Actions such as button onclick events
	*/
    setFlowActions: function () {
      var scopeObj = this;
      try {
        /*this.view.tbxEmailId.onTextChange = function(){
            CommonUtilities.setText(scopeObj.view.tbxEmailId,scopeObj.view.tbxEmailId.text.trim() , CommonUtilities.getaccessibilityConfig());
            scopeObj.view.tbxEmailId.accessibilityConfig ={
                  "a11yValue":scopeObj.view.tbxEmailId.text.trim()
            }
        };*/
        this.view.btnAddEmailIdAdd.onClick = function () {
          //add code to ADD new email
          if (CommonUtilities.getSCAType() == 0) {
            //here false implies isMFARequired : false for base infinity
            this.btnAddEmailIdCall("false");
          }
          else if (CommonUtilities.getSCAType() == 1) {
            this.SCARMScall();
          } else if (CommonUtilities.getSCAType() == 2) {
            this.btnAddEmailIdCall();
          }
        }.bind(this);
        this.view.flxMarkAsPrimaryEmailCheckbox.onClick = function () {
          this.toggleFontCheckBox(this.view.lblMarkAsPrimaryEmailCheckBox);
          if (this.view.lblMarkAsPrimaryEmailCheckBox.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED) {
            this.view.flxMarkAsPrimaryEmailCheckbox.accessibilityConfig = {
              "a11yARIA": {
                "aria-checked": true,
                "aria-labelledby": "lblMarkAsPrimaryEmail",
                "role": "checkbox",
                "tabindex": 0
              }
            };
            this.view.lblMarkAsPrimaryEmailCheckBox.accessibilityConfig = {
              "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.AddEmailMakeThisAsPrimaryEmailChecked"),
              "a11yHidden": true
            };
          } else {
            this.view.flxMarkAsPrimaryEmailCheckbox.accessibilityConfig = {
              "a11yARIA": {
                "aria-checked": false,
                "aria-labelledby": "lblMarkAsPrimaryEmail",
                "role": "checkbox",
                "tabindex": 0
              }
            };
            this.view.lblMarkAsPrimaryEmailCheckBox.accessibilityConfig = {
              "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.AddEmailMakeThisAsPrimaryEmailUnchecked"),
              "a11yHidden": true
            };
          }
          scopeObj.view.flxMarkAsPrimaryEmailCheckbox.setActive(true);
        }.bind(this);

        this.view.flxMarkAsAlertCommEmailCheckBox.onClick = function () {
          this.toggleFontCheckBox(this.view.lblMarkAsAlertCommEmailCheckBox);
          if (this.view.lblMarkAsAlertCommEmailCheckBox.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED) {
            this.view.flxMarkAsAlertCommEmailCheckBox.accessibilityConfig = {
              "a11yARIA": {
                "aria-checked": true,
                "aria-labelledby": "lblMarkAsAlertCommEmailCheckBox",
                "role": "checkbox",
                "tabindex": 0
              }
            };
            this.view.lblMarkAsAlertCommEmailCheckBox.accessibilityConfig = {
              "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.AddEmailMarkThisEmailForAlertCommunicationChecked"),
              "a11yHidden": true
            };
          } else {
            this.view.flxMarkAsAlertCommEmailCheckBox.accessibilityConfig = {
              "a11yARIA": {
                "aria-checked": false,
                "aria-labelledby": "lblMarkAsAlertCommEmailCheckBox",
                "role": "checkbox",
                "tabindex": 0
              }
            };
            this.view.lblMarkAsAlertCommEmailCheckBox.accessibilityConfig = {
              "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.AddEmailMarkThisEmailForAlertCommunicationUnchecked"),
              "a11yHidden": true
            };
          }
          scopeObj.view.flxMarkAsAlertCommEmailCheckBox.setActive(true);
        }.bind(this);
        this.view.btnAddEmailIdCancel.onClick = function () {
          this.showEmail();
        }.bind(this);
        // FormControllerUtility.showProgressBar(scopeObj.view);
        if (!CommonUtilities.isCSRMode()) {

          this.setAddEmailValidationActions();

        }
        this.view.imgPrimaryNumberexists.onTextChange = function () {
          //CommonUtilities.setText(scopeObj.view.tbxEmailId,scopeObj.view.tbxEmailId.text.trim() , CommonUtilities.getaccessibilityConfig());
          scopeObj.view.tbxEmailId.setText = scopeObj.view.tbxEmailId.text.trim();
        };
      } catch (err) {
        var errorObj = {
          "level": "frmProfileAddEmailController",
          "method": "setFlowActions",
          "error": err
        };
        scopeObj.onError(errorObj);
      }
    },

    SCARMScall : function(){
      FormControllerUtility.showProgressBar(this.view);
        let rmsComponent = new com.temenos.infinity.sca.rmsComponent({"appName" : "ResourcesHIDMA"});
        let scopeObj = this;
        scopeObj.action = "PROFILE_SETTINGS_UPDATE";
        let appSessionId = "";
        if(OLBConstants.CLIENT_PROPERTIES && OLBConstants.CLIENT_PROPERTIES.SCA_RISK_ASSESSMENT && OLBConstants.CLIENT_PROPERTIES.SCA_RISK_ASSESSMENT.toUpperCase() === "TRUE")
         appSessionId = applicationManager.getRmsSessionID();
        rmsComponent.rmsActionSuccess =function(output) {
            FormControllerUtility.hideProgressBar(this.view);
              if (output.userBlock == "true") {
            output.errorMessage = kony.i18n.getLocalizedString("kony.sca.rms.userBlock");
            scopeObj.showEmailError(output);
          }
          else {
            scopeObj.stepUp = output.stepUp;
            scopeObj. btnAddEmailIdCall(scopeObj.stepUp);
          }
        };
        rmsComponent.rmsActionFailure = function(output) {
          FormControllerUtility.hideProgressBar(this.view);
          scopeObj.stepUp = "true";
          scopeObj. btnAddEmailIdCall(scopeObj.stepUp);
        };
        rmsComponent.rmsActionCreate(scopeObj.action, appSessionId);
    },

    btnAddEmailIdCall : function(isMFARequired){
      kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsNewUIModule", "appName" : "ManageProfileMA"}).presentationController.saveEmail(this.getNewEmailData(),isMFARequired);
    },
       /**
       * Method to assign images when checkbox is clicked
       * @param {String} imgCheckBox- ID of the checkbox
       */
      toggleCheckBox: function(imgCheckBox) {
          if (imgCheckBox.src === ViewConstants.IMAGES.UNCHECKED_IMAGE) {
              imgCheckBox.src = ViewConstants.IMAGES.CHECKED_IMAGE;
          } else {
              imgCheckBox.src = ViewConstants.IMAGES.UNCHECKED_IMAGE;
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
     /**
       * Method to show data related to New Email scenario
       */
      getNewEmailData: function() {
          return {
              value: this.view.tbxEmailId.text,
              isPrimary: this.view.lblMarkAsPrimaryEmailCheckBox.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED,
              isAlertsRequired: this.view.lblMarkAsAlertCommEmailCheckBox.text  === ViewConstants.FONT_ICONS.CHECBOX_SELECTED
          };
      },
     /**
       * Method to reset the fields while adding email
       */
      resetAddEmailForm: function() {
          this.view.tbxEmailId.text = "";
          this.view.lblMarkAsPrimaryEmailCheckBox.skin = ViewConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
        CommonUtilities.setText(this.view.lblMarkAsPrimaryEmailCheckBox, ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED , CommonUtilities.getaccessibilityConfig());
        
        this.view.lblMarkAsAlertCommEmailCheckBox.skin = ViewConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
        CommonUtilities.setText(this.view.lblMarkAsAlertCommEmailCheckBox, ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED , CommonUtilities.getaccessibilityConfig());
          this.view.flxErrorAddNewEmail.setVisibility(false);
          this.disableButton(this.view.btnAddEmailIdAdd);
        //show /hide alert communication option
          this.view.flxAlertCommAddEmail.setVisibility(kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsNewUIModule", "appName" : "ManageProfileMA"}).presentationController.getenableSeparateContact());
        
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
     /**
       * Method used to show the email view.
       */
      showEmail: function() {
         		  kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsNewUIModule", "appName" : "ManageProfileMA"}).presentationController.showUserEmail();
      },
      /**
       * Method to update the list of emails
       * @param {Object} emailListViewModel- list of emails
       */
      updateEmailList: function(emailListViewModel) {
       //   this.view.customheader.customhamburger.activateMenu("Settings", "Profile Settings");
          this.showEmail();
          if (emailListViewModel.length >= 3 || !applicationManager.getConfigurationManager().checkUserPermission("PROFILE_SETTINGS_UPDATE")) {
              this.view.btnAddNewEmail.setVisibility(false);
          //    this.view.settings.btnEditAddNewEmail.setVisibility(false);
          } else {
              this.view.btnAddNewEmail.setVisibility(true);
       //       this.view.settings.btnEditAddNewEmail.setVisibility(true);
       //       this.view.settings.btnAddNewPersonalEmail.setVisibility(true);
          }
          
          this.setEmailSegmentData(emailListViewModel);
         // this.setSelectedSkin("flxEmail");
      },
       editPrimaryEmail: function(emailObj) {
             applicationManager.getNavigationManager().navigateTo('frmProfileEditEmail');
          var viewProperties = {
           emailObj:emailObj
        };
        applicationManager.getNavigationManager().updateForm(viewProperties, "frmProfileEditEmail");
    
     
       },
     editEmail: function(emailObj) {
             applicationManager.getNavigationManager().navigateTo('frmProfileEditEmail');
          var viewProperties = {
           editemailObj:emailObj
        };
        applicationManager.getNavigationManager().updateForm(viewProperties, "frmProfileEditEmail");
    
     
       },
       showEmailError: function(errorMessage) {
        this.view.flxProfileError.setVisibility(true);
      CommonUtilities.setText(this.view.rtxError, errorMessage.errorMessage , CommonUtilities.getaccessibilityConfig());
    },

    /**
     * @api : onError
     * Error thrown from catch block in component and shown on the form
     * @return : NA
     */
    onError: function (err) {
      let errMsg = JSON.stringify(err);
    },

  };
});