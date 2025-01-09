define(['CommonUtilities', 'CSRAssistUI', 'FormControllerUtility', 'OLBConstants', 'ViewConstants', 'CampaignUtility'], function (CommonUtilities, CSRAssistUI, FormControllerUtility, OLBConstants, ViewConstants, CampaignUtility) {
  var orientationHandler = new OrientationHandler();
  var responsiveUtils = new ResponsiveUtils();
  return {
    updateFormUI: function (viewModel) {
      if (viewModel !== undefined) {
        if (viewModel.isLoading !== undefined) this.changeProgressBarState(viewModel.isLoading);
        if (viewModel.editAlertCommError) this.showEmailError(viewModel.editAlertCommError);
        if (viewModel.campaign) {
          CampaignUtility.showCampaign(viewModel.campaign, this.view, "flxContainer");
        }
        if (viewModel.emailList) this.updateEmailList(viewModel.emailList);
        if (viewModel.emails) this.setEmailsToLbx(viewModel.emails);
        if (viewModel.emailObj) this.updateEmailList(viewModel.emailObj);
        if (viewModel.editemailObj) this.editEmail(viewModel.editemailObj)
      }
      this.view.lblEditEmailHeading.setActive(true);
    },
    preShow: function () {
      var self = this;
      this.view.flxRight.setVisibility(true);
      applicationManager.getLoggerManager().setCustomMetrics(this, false, "Profile");
      this.view.postShow = this.postShowProfile;
      this.view.flxAccountSettingsCollapseMobile.onClick = this.toggleMenuMobile;
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain', 'flxMenuItemMobile']);
      this.view.lblCollapseMobile.text = "O";
      this.view.profileMenu.checkLanguage();
      this.view.profileMenu.activateMenu("PROFILESETTINGS", "Email");
      this.view.customheadernew.activateMenu("Settings", "Profile Settings");
      this.setSelectedValue("i18n.ProfileManagement.EmailId");
      this.setFlowActions();
      this.setAccessibility();
      /*this.view.imgPrimaryNumberexists.accessibilityConfig = {
            "a11yARIA": 
            {
                "tabindex" : -1
            }
      };*/
      this.view.onBreakpointChange = function () {
        self.onBreakpointChange(kony.application.getCurrentBreakpoint());
      }
      this.view.forceLayout();
      this.view.lblEditEmailHeading.setActive(true);
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
        this.view.lblCollapseMobile.text = "O";
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
    /**
  * *@param {Boolean} isLoading- True or false to show/hide the progess bar
  *  Method to set show/hide the progess bar
  */
    changeProgressBarState: function (isLoading) {
      if (isLoading) {
        FormControllerUtility.showProgressBar(this.view);
      } else {
        FormControllerUtility.hideProgressBar(this.view);
      }
    },
    postShowProfile: function () {
      applicationManager.getNavigationManager().applyUpdates(this);
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      this.view.rtxEditEmail.text=kony.i18n.getLocalizedString("i18n.profilemanagement.rtxEmailId")+"<span style = \"color:red;\">*</span>"
	  this.view.lblHeading.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson");
      this.view.forceLayout();
      this.view.tbxEditEmailId.skin = "sknTbxSSPffffff15PxBorder727272opa20";
      this.view.onKeyPress = this.onKeyPressCallBack;
      this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack;
      this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
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
        this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.profilesettings");
      }
      this.view.forceLayout();
    },
    /**
  *  Method to set the Accessibility configurations
  */
    setAccessibility: function () {
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      //this.view.btnEditEmailIdCancel.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
     // this.view.btnEditEmailIdSave.toolTip = kony.i18n.getLocalizedString("i18n.ProfileManagement.Save");
     // this.view.customheadernew.lblAccounts.toolTip=kony.i18n.getLocalizedString("i18n.topmenu.accounts");
      //CommonUtilities.setText(this.view.customheadernew.lblHeaderMobile, kony.i18n.getLocalizedString("i18n.ProfileManagement.profilesettings"), accessibilityConfig);
      //CommonUtilities.setText(this.view.lblEditEmailHeading, kony.i18n.getLocalizedString("i18n.ProfileManagement.EditEmail"), accessibilityConfig);
      //CommonUtilities.setText(this.view.lblEditMarkAsPrimaryEmail, kony.i18n.getLocalizedString("i18n.ProfileManagement.MarkAsPrimaryEmail"), accessibilityConfig);
      //CommonUtilities.setText(this.view.lblEditMarkAsAlertCommEmail, kony.i18n.getLocalizedString("i18n.alertSettings.markAlertComm"), accessibilityConfig);
      // CommonUtilities.setText(this.view.btnEditEmailIdCancel, kony.i18n.getLocalizedString("i18n.transfers.Cancel"), accessibilityConfig);
      // CommonUtilities.setText(this.view.btnEditEmailIdSave, kony.i18n.getLocalizedString("i18n.ProfileManagement.Save"), accessibilityConfig);
      //CommonUtilities.setText(this.view.lblPrimaryNumberexists, kony.i18n.getLocalizedString("i18n.profile.anotherEmail"), accessibilityConfig);
      this.view.btnEditEmailIdSave.accessibilityConfig = {
                                  "a11yLabel": "Save email address details"
                              };
      this.view.lblEditMarkAsPrimaryEmailName.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.MarkAsPrimaryEmail");
      this.view.lblEditMarkAsAlertCommEmail.text = kony.i18n.getLocalizedString("i18n.alertSettings.markAlertComm");
      this.view.btnEditEmailIdCancel.accessibilityConfig = {
                                  "a11yLabel": "Cancel edit email process"
                              };
     //CommonUtilities.setText(this.view.lblHeading, kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson"), accessibilityConfig);
      this.view.lblHeading.accessibilityConfig = {
        "a11yARIA": {
          "tabindex": -1
        },
        "a11yLabel": this.view.lblEditEmailHeading.text + " " + kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson")
      };
      this.view.lblCollapseMobile.accessibilityConfig = {
        "a11yARIA": {
            "tabindex": -1,
            "a11yHidden": true
        }
      };
      this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
        "a11yLabel": "Dropdown",
         "a11yARIA": {
          "role": "button",           
          "aria-expanded":false
          }     
      };
      this.view.flxEditMarkAsPrimaryEmailCheckBox.accessibilityConfig = {
        "a11yARIA": {
             "aria-checked": false,
            "aria-labelledby": "lblEditMarkAsPrimaryEmailName",
            "role": "checkbox",
            "tabindex": 0
        }
      };
      this.view.flxEditMarkAsAlertCommEmailCheckBox.accessibilityConfig = {
        "a11yARIA": {
             "aria-checked": false,
            "aria-labelledby": "lblEditMarkAsAlertCommEmailCheckBox",
            "role": "checkbox",
            "tabindex": 0
        }
      };
      this.view.imgPrimaryNumberexists.accessibilityConfig = {
        "a11yARIA": {
            "tabindex": -1,
            "aria-hidden": true
        }
      };
      this.view.rtxEditEmail.accessibilityConfig = {
        "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.i18n.ProfileManagement.EmailIdMandatoryIcon")
      };
      this.view.btnEditEmailIdSave.accessibilityConfig = {
        "a11yLabel":  "Save email address details"
      };
      this.view.btnEditEmailIdCancel.accessibilityConfig = {
        "a11yLabel": "Cancel edit email process"
      };

    },
    /**
  *  Method to set the Form Flow Actions such as button onclick events
  */
    setFlowActions: function () {
      var scopeObj = this;
      this.view.btnEditEmailIdCancel.onClick = function () {
        this.showEmail();
      }.bind(this);
      if (!CommonUtilities.isCSRMode()) {
        this.setEmailValidationActions();
      }
      this.view.flxEditMarkAsPrimaryEmailCheckBox.onClick = function () {
        scopeObj.toggleFontCheckBox(this.view.lblEditMarkAsPrimaryEmailCheckBox);
        if (this.view.lblEditMarkAsPrimaryEmailCheckBox.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED) {
          this.view.flxEditMarkAsPrimaryEmailCheckBox.accessibilityConfig = {
            "a11yARIA": {
              "aria-checked": true,
              "aria-labelledby": "lblEditMarkAsPrimaryEmailName",
              "role": "checkbox",
              "tabindex": 0
            }
          };
          this.view.lblEditMarkAsPrimaryEmailCheckBox.accessibilityConfig = {
            "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.EditEmailMakeThisAsPrimaryEmailChecked"),
            "a11yHidden":true
          };
        } else {
          this.view.flxEditMarkAsPrimaryEmailCheckBox.accessibilityConfig = {
            "a11yARIA": {
              "aria-checked": false,
              "aria-labelledby": "lblEditMarkAsPrimaryEmailName",
              "role": "checkbox",
              "tabindex": 0
            }
          };
          this.view.lblEditMarkAsPrimaryEmailCheckBox.accessibilityConfig = {
            "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.EditEmailMakeThisAsPrimaryEmailUnchecked"),
            "a11yHidden":true
          };
        }
        scopeObj.view.flxEditMarkAsPrimaryEmailCheckBox.setActive(true);
      }.bind(this)
      this.view.flxEditMarkAsAlertCommEmailCheckBox.onClick = function () {
        this.toggleFontCheckBox(this.view.lblEditMarkAsAlertCommEmailCheckBox);
        if (this.view.lblEditMarkAsAlertCommEmailCheckBox.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED) {
          this.view.flxEditMarkAsAlertCommEmailCheckBox.accessibilityConfig = {
            "a11yARIA": {
              "aria-checked": true,
              "aria-labelledby": "lblEditMarkAsAlertCommEmailCheckBox",
              "role": "checkbox",
              "tabindex": 0
            }
          };
          this.view.lblEditMarkAsAlertCommEmailCheckBox.accessibilityConfig = {
            "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.EditEmailMarkThisEmailForAlertCommunicationChecked"),
            "a11yHidden":true
          };
        } else {
          this.view.flxEditMarkAsAlertCommEmailCheckBox.accessibilityConfig = {
            "a11yARIA": {
              "aria-checked": false,
              "aria-labelledby": "lblEditMarkAsAlertCommEmailCheckBox",
              "role": "checkbox",
              "tabindex": 0
            }
          };
          this.view.lblEditMarkAsAlertCommEmailCheckBox.accessibilityConfig = {
            "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.EditEmailMarkThisEmailForAlertCommunicationUnchecked"),
            "a11yHidden":true
          };
        }
        scopeObj.view.flxEditMarkAsAlertCommEmailCheckBox.setActive(true);
      }.bind(this)
      /*this.view.tbxEditEmailId.onTextChange = function(){
              //CommonUtilities.setText(scopeObj.view.tbxEditEmailId,scopeObj.view.tbxEditEmailId.text.trim() , CommonUtilities.getaccessibilityConfig());
              scopeObj.view.tbxEditEmailId.accessibilityConfig ={
                "a11yValue":scopeObj.view.tbxEditEmailId.text.trim()
              }
      };*/
    },
    /**
    * Method to assign images when checkbox is clicked
    * @param {String} imgCheckBox- ID of the checkbox
    */
    toggleCheckBox: function (imgCheckBox) {
      if (imgCheckBox.src === ViewConstants.IMAGES.UNCHECKED_IMAGE) {
        imgCheckBox.src = ViewConstants.IMAGES.CHECKED_IMAGE;
      } else {
        imgCheckBox.src = ViewConstants.IMAGES.UNCHECKED_IMAGE;
      }
    },
    toggleFontCheckBox: function (imgCheckBox) {
      if (imgCheckBox.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED) {
        imgCheckBox.text = ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED;
        imgCheckBox.skin = ViewConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
      } else {
        imgCheckBox.text = ViewConstants.FONT_ICONS.CHECBOX_SELECTED;
        imgCheckBox.skin = ViewConstants.SKINS.CHECKBOX_SELECTED_SKIN;
      }
    },
    setEmailValidationActions: function(){
      var scopeObj = this;
      this.disableButton(this.view.btnEditEmailIdSave);
      this.view.tbxEditEmailId.onEndEditing = function () {
        scopeObj.checkEditEmailForm();
      };
    },    
    /**
      * Method used to show the email view.
      */
    showEmail: function () {
      kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsNewUIModule", "appName" : "ManageProfileMA"}).presentationController.showUserEmail();
    },
    showEditEmail: function () {
      //   this.resetUpdateEmailForm();
      this.view.flxEditEmailWrapper.setVisibility(true);
    },
    /**
     * Method to reset fields in the UI of Email module
     */
    resetUpdateEmailForm: function () {
      this.view.tbxEditEmailId.text = "";
      //CommonUtilities.setText(this.view.lblEditMarkAsPrimaryEmailCheckBox, ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED, CommonUtilities.getaccessibilityConfig());
      this.view.lblEditMarkAsPrimaryEmailCheckBox.skin = ViewConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
      //CommonUtilities.setText(this.view.lblEditMarkAsAlertCommEmailCheckBox, ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED, CommonUtilities.getaccessibilityConfig());
      this.view.lblEditMarkAsAlertCommEmailCheckBox.skin = ViewConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
      this.disableButton(this.view.btnEditEmailIdSave);
      this.view.flxErrorEditEmail.setVisibility(false);
      this.view.lblEmailValue.setVisibility(false);
      this.view.tbxEditEmailId.setVisibility(true);
    },

    /**
     * Method to update the list of emails
     * @param {Object} emailListViewModel- list of emails
     */
    updateEmailList: function (emailObj) {
      var scopeObj = this;
      try {
        this.view.lblEditMarkAsPrimaryEmailName.setVisibility(false);
        this.view.flxEditMarkAsPrimaryEmailCheckBox.setVisibility(false);
        this.view.flxAnotherprimaryNumberExists.setVisibility(false);

        this.view.lblEditMarkAsAlertCommEmail.setVisibility(true);
        this.view.flxEditMarkAsAlertCommEmailCheckBox.setVisibility(kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "SettingsNewUIModule", "appName": "ManageProfileMA" }).presentationController.getenableSeparateContact());
        //  this.view.flxEditMarkAsAlertCommEmailCheckBox.top=this.view.lblEditMarkAsPrimaryEmail.isVisible?"120dp":"80dp";
        this.view.flxAnotherprimaryNumberExists.setVisibility(this.view.lblEditMarkAsPrimaryEmailName.isVisible);
        if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
          //      this.view.flxAnotherprimaryNumberExists.top = emailObj.isAlertsRequired==="true"?"170dp":"120dp";
          this.view.flxEditMarkAsAlertCommEmailCheckBox.top = "20dp";

        }
        else {
          this.view.flxEditMarkAsAlertCommEmailCheckBox.top = "80dp";

          //      this.view.flxAnotherprimaryNumberExists.top = emailObj.isAlertsRequired==="true"?"170dp":"120dp";
        }
        //  this.view.lblEditMarkAsAlertCommEmail.top=this.view.lblEditMarkAsPrimaryEmail.isVisible?"115px":"85px";
        //CommonUtilities.setText(this.view.lblEditMarkAsAlertCommEmailCheckBox, ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED, CommonUtilities.getaccessibilityConfig());
        this.view.lblEditMarkAsAlertCommEmailCheckBox.text = emailObj.isAlertsRequired === "true" ? ViewConstants.FONT_ICONS.CHECBOX_SELECTED : ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED;
        this.view.lblEditMarkAsAlertCommEmailCheckBox.skin = emailObj.isAlertsRequired === "true" ? ViewConstants.SKINS.CHECKBOX_SELECTED_SKIN : ViewConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
        if (this.view.lblEditMarkAsPrimaryEmailCheckBox.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED) {
          this.view.lblEditMarkAsPrimaryEmailCheckBox.accessibilityConfig = {
            "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.EditEmailMakeThisAsPrimaryEmailChecked"),
            "a11yHidden": true
          };
        } else {
          this.view.lblEditMarkAsPrimaryEmailCheckBox.accessibilityConfig = {
            "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.EditEmailMakeThisAsPrimaryEmailUnchecked"),
            "a11yHidden": true
          };
        }
        if (this.view.lblEditMarkAsAlertCommEmailCheckBox.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED) {
          this.view.lblEditMarkAsAlertCommEmailCheckBox.accessibilityConfig = {
            "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.EditEmailMarkThisEmailForAlertCommunicationChecked"),
            "a11yHidden": true
          };
        } else {
          this.view.lblEditMarkAsAlertCommEmailCheckBox.accessibilityConfig = {
            "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.EditEmailMarkThisEmailForAlertCommunicationUnchecked"),
            "a11yHidden": true
          };
        }

        //  this.view.lblEditMarkAsAlertCommEmailCheckBox.skin = ViewConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
        this.view.forceLayout();
        scopeObj.showEditEmail();
        if (emailObj.isTypeBusiness === "1") {
          this.view.tbxEditEmailId.setVisibility(false);
          this.view.lblEmailValue.setVisibility(true);
          this.view.lblEmailValue.text = emailObj.Value;
          CommonUtilities.setText(scopeObj.view.lblEmailValue, scopeObj.view.lblEmailValue.text, CommonUtilities.getaccessibilityConfig());
        }
        scopeObj.view.tbxEditEmailId.text = emailObj.Value;
        //CommonUtilities.setText(scopeObj.view.tbxEditEmailId, scopeObj.view.tbxEditEmailId.text.trim(), CommonUtilities.getaccessibilityConfig());
        /*scopeObj.view.tbxEditEmailId.accessibilityConfig ={
             "a11yValue":scopeObj.view.tbxEditEmailId.text.trim()
        };*/
        this.checkUpdateEmailForm();
        if (CommonUtilities.isCSRMode()) {
          scopeObj.view.btnEditEmailIdSave.onClick = CommonUtilities.disableButtonSkinForCSRMode();
          scopeObj.view.btnEditEmailIdSave.skin = CommonUtilities.disableButtonSkinForCSRMode();
        } else {
          scopeObj.view.btnEditEmailIdSave.onClick = function () {
            if (CommonUtilities.getSCAType() == 0) {
              //here false implies isMFARequired : false for base infinity
              scopeObj.btnEditEmailIdCall(emailObj, "false");
            }
            else if (CommonUtilities.getSCAType() == 1) {
              scopeObj.SCARMScall(emailObj);
            } else if (CommonUtilities.getSCAType() == 2) {
              scopeObj.btnEditEmailIdCall(emailObj);
            }
          };
        }
        scopeObj.checkUpdateEmailForm();
      } catch (err) {
        var errorObj = {
          "level": "frmProfileEditEmailController",
          "method": "updateEmailList",
          "error": err
        };
        scopeObj.onError(errorObj);
      }
    },

    /**
      * Method to Disable a button
      * @param {String} button - ID of the button to be disabled
      */
    disableButton: function (button) {
      button.setEnabled(false);
      button.skin = "sknBtnBlockedSSPFFFFFF15Px";
      button.hoverSkin = "sknBtnBlockedSSPFFFFFF15Px";
      button.focusSkin = "sknBtnBlockedSSPFFFFFF15Px";
    },
    /**
     * Method to enable/disable button based on the email entered after editing
     */
    checkUpdateEmailForm: function () {
      if (!CommonUtilities.isCSRMode()) {
        if (applicationManager.getValidationUtilManager().isValidEmail(this.view.tbxEditEmailId.text)) {
          this.enableButton(this.view.btnEditEmailIdSave);
        } else {
          this.disableButton(this.view.btnEditEmailIdSave);
        }
      }
    },
    /**
     * Method to Enable a button
     * @param {String} button - ID of the button to be enabled
     */
    enableButton: function (button) {
      if (!CommonUtilities.isCSRMode()) {
        button.setEnabled(true);
        button.skin = "sknbtnSSPffffff15px0273e3bg";
        button.hoverSkin = "sknBtnFocusSSPFFFFFF15Px0273e3";
        button.focusSkin = "sknBtnHoverSSPFFFFFF15Px0273e3";
      }
    },

    /**
* Method to edit the email which is already set
* @param {Object} emailObj- JSON object of the email with all fields comminf from backend
*/
    editEmail: function (emailObj) {
      var scopeObj = this;
      try {
        this.view.lblEditMarkAsPrimaryEmailName.setVisibility(!(emailObj.isPrimary === "true"));
        this.view.flxEditMarkAsPrimaryEmailCheckBox.setVisibility(!(emailObj.isPrimary === "true"));
        this.view.flxAnotherprimaryNumberExists.setVisibility(true);

        //CommonUtilities.setText(scopeObj.view.lblEditMarkAsPrimaryEmailCheckBox, ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED, CommonUtilities.getaccessibilityConfig());
        scopeObj.view.lblEditMarkAsPrimaryEmailCheckBox.skin = ViewConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
        /*if (!(kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile)) {
          this.view.flxEditMarkAsAlertCommEmailCheckBox.top = this.view.lblEditMarkAsPrimaryEmail.isVisible ? "120px" : "80px";
          this.view.flxAnotherprimaryNumberExists.top = this.view.lblEditMarkAsPrimaryEmail.isVisible ? "170px" : "120px";
        }*/
        //  this.view.lblEditMarkAsAlertCommEmail.top=this.view.lblEditMarkAsPrimaryEmail.isVisible?"115px":"85px";
        this.view.lblEditMarkAsAlertCommEmail.setVisibility(true);
        this.view.flxEditMarkAsAlertCommEmailCheckBox.setVisibility(kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "SettingsNewUIModule", "appName": "ManageProfileMA" }).presentationController.getenableSeparateContact());
        this.view.lblEditMarkAsAlertCommEmailCheckBox.text = emailObj.isAlertsRequired ? ViewConstants.FONT_ICONS.CHECBOX_SELECTED : ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED;
        this.view.lblEditMarkAsAlertCommEmailCheckBox.skin = emailObj.isAlertsRequired ? ViewConstants.SKINS.CHECKBOX_SELECTED_SKIN : ViewConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
        this.view.lblEditMarkAsAlertCommEmailCheckBox.text = ViewConstants.FONT_ICONS.CHECBOX_UNSELECTED;
        if (this.view.lblEditMarkAsPrimaryEmailCheckBox.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED) {
          this.view.lblEditMarkAsPrimaryEmailCheckBox.accessibilityConfig = {
            "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.EditEmailMakeThisAsPrimaryEmailChecked"),
            "a11yHidden": true
          };
        } else {
          this.view.lblEditMarkAsPrimaryEmailCheckBox.accessibilityConfig = {
            "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.EditEmailMakeThisAsPrimaryEmailUnchecked"),
            "a11yHidden": true
          };
        }
        if (this.view.lblEditMarkAsAlertCommEmailCheckBox.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED) {
          this.view.lblEditMarkAsAlertCommEmailCheckBox.accessibilityConfig = {
            "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.EditEmailMarkThisEmailForAlertCommunicationChecked"),
            "a11yHidden": true
          };
        } else {
          this.view.lblEditMarkAsAlertCommEmailCheckBox.accessibilityConfig = {
            "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.EditEmailMarkThisEmailForAlertCommunicationUnchecked"),
            "a11yHidden": true
          };
        }
        scopeObj.showEditEmail();
        if (emailObj.isTypeBusiness === "1") {
          this.view.tbxEditEmailId.setVisibility(false);
          this.view.lblEmailValue.setVisibility(true);
          this.view.lblEmailValue.text = emailObj.Value;
          CommonUtilities.setText(scopeObj.view.lblEmailValue, scopeObj.view.lblEmailValue.text, CommonUtilities.getaccessibilityConfig());
        }
        this.view.forceLayout();
        scopeObj.view.tbxEditEmailId.text = emailObj.Value;
        this.checkUpdateEmailForm();
        if (CommonUtilities.isCSRMode()) {
          scopeObj.view.btnEditEmailIdSave.onClick = CommonUtilities.disableButtonActionForCSRMode();
          scopeObj.view.btnEditEmailIdSave.skin = CommonUtilities.disableButtonSkinForCSRMode();
        } else {
          scopeObj.view.btnEditEmailIdSave.onClick = function () {
            if (CommonUtilities.getSCAType() == 0) {
              //here false implies isMFARequired : false for base infinity
              scopeObj.btnEditEmailIdCall(emailObj, "false");
            }
            else if (CommonUtilities.getSCAType() == 1) {
              scopeObj.SCARMScall(emailObj);
            } else if (CommonUtilities.getSCAType() == 2) {
              scopeObj.btnEditEmailIdCall(emailObj);
            }
          };
        }
        // scopeObj.checkAddEmailForm();
      } catch (err) {
        var errorObj = {
          "level": "frmProfileEditEmailController",
          "method": "editEmail",
          "error": err
        };
        scopeObj.onError(errorObj);
      }
    },

    SCARMScall : function(emailObj){
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
            scopeObj. btnEditEmailIdCall(emailObj,scopeObj.stepUp);
          }
        };
        rmsComponent.rmsActionFailure = function(output) {
          FormControllerUtility.hideProgressBar(this.view);
          scopeObj.stepUp = "true";
          scopeObj. btnEditEmailIdCall(emailObj,scopeObj.stepUp);
        };
        rmsComponent.rmsActionCreate(scopeObj.action, appSessionId);
    },
    btnEditEmailIdCall : function(emailObj,isMFARequired){
      let scopeObj = this;
      kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsNewUIModule", "appName" : "ManageProfileMA"}).presentationController.editEmail({
            id: emailObj.id,
            extension: emailObj.Extension,
            email: scopeObj.view.tbxEditEmailId.text,
            isPrimary: scopeObj.view.lblEditMarkAsPrimaryEmailCheckBox.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED ? true : false,
            isAlertsRequired: scopeObj.view.lblEditMarkAsAlertCommEmailCheckBox.text === ViewConstants.FONT_ICONS.CHECBOX_SELECTED ? true : false,
            isTypeBusiness: emailObj.isTypeBusiness
          },isMFARequired);
    },
    /**
  * Method to enable/disable button based on the email entered after editing
  */
    checkUpdateEmailForm: function () {
      if (!CommonUtilities.isCSRMode()) {
        if (applicationManager.getValidationUtilManager().isValidEmail(this.view.tbxEditEmailId.text)) {
          this.enableButton(this.view.btnEditEmailIdSave);
        } else {
          this.disableButton(this.view.btnEditEmailIdSave);
        }
      }
    },
    checkEditEmailForm: function () {
      if (this.view.tbxEditEmailId.text.length > 0) {
        if (applicationManager.getValidationUtilManager().isValidEmail(this.view.tbxEditEmailId.text)) {
          this.enableButton(this.view.btnEditEmailIdSave);
          FormControllerUtility.hideErrorForTextboxFields(this.view.tbxEditEmailId, this.view.flxErrorEditEmail);
          if (kony.application.getCurrentBreakpoint() >= 1366){
            this.view.flxEditEmail.height = "90%";
          }
        } else {
          this.disableButton(this.view.btnEditEmailIdSave);
          FormControllerUtility.showErrorForTextboxFields(this.view.tbxEditEmailId, this.view.flxErrorEditEmail);
          this.view.flxErrorEditEmail.accessibilityConfig = {
            "a11yARIA": {
              "tabindex": -1,
              "role": "alert"
            }
          };
          CommonUtilities.setText(this.view.CopylblError0e702a95b68d041, kony.i18n.getLocalizedString("i18n.payments.validEmailMessage"), CommonUtilities.getaccessibilityConfig());
          if (kony.application.getCurrentBreakpoint() >= 1366){
            this.view.flxEditEmail.height = "81%";
          }
        }
      } else {
        this.disableButton(this.view.btnEditEmailIdSave);
      }
    },
    showEmailError: function (errorMessage) {
      this.view.flxProfileError.setVisibility(true);
      CommonUtilities.setText(this.view.rtxError, errorMessage.errorMessage, CommonUtilities.getaccessibilityConfig());
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