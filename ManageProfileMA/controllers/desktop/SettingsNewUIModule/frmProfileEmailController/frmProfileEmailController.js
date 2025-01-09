define(['CommonUtilities', 'CSRAssistUI','FormControllerUtility', 'OLBConstants', 'ViewConstants', 'CampaignUtility'], function(CommonUtilities, CSRAssistUI, FormControllerUtility, OLBConstants, ViewConstants, CampaignUtility) {
  var orientationHandler = new OrientationHandler();
  var responsiveUtils = new ResponsiveUtils();
  return {
    updateFormUI: function(viewModel) {
      if (viewModel !== undefined) {
        if (viewModel.isLoading !== undefined) this.changeProgressBarState(viewModel.isLoading);
        if (viewModel.campaign) {
          CampaignUtility.showCampaign(viewModel.campaign, this.view, "flxContainer");
        }   
        if(viewModel.deleteEmailError) this.showError(viewModel.deleteEmailError);
         if (viewModel.emailList) this.updateEmailList(viewModel.emailList);
         if (viewModel.emails) this.setEmailsToLbx(viewModel.emails);      
      }
      this.view.lblEmailHeading.setActive(true);
    },
    preShow:function()
    {
      var self=this;
      this.view.flxRight.setVisibility(true);
      this.view.flxErrorContainer.setVisibility(false);
      applicationManager.getLoggerManager().setCustomMetrics(this, false, "Profile");
      this.view.postShow=this.postShowProfile;
      this.view.flxAccountSettingsCollapseMobile.onClick = this.toggleMenuMobile;
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain','flxMenuItemMobile','flxContainer']);
      this.view.lblCollapseMobile.text  = "O";
      this.view.profileMenu.checkLanguage();
      this.view.profileMenu.activateMenu("PROFILESETTINGS","Email");
      this.view.customheadernew.activateMenu("Settings","Profile Settings");
      this.setSelectedValue("i18n.ProfileManagement.EmailId");
      this.setFlowActions();
      this.setAccessibility();
      this.view.onBreakpointChange = function() {
        self.onBreakpointChange(kony.application.getCurrentBreakpoint());
      }
      this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
      this.view.forceLayout();
      this.view.lblEmailHeading.setActive(true);
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
      } else {
        this.view.lblCollapseMobile.text  = "O";
        this.view.flxLeft.setVisibility(false);
        this.view.flxRight.setVisibility(true);
          this.view.btnAddNewEmailMobile.setVisibility(true);
            this.view.btnAddNewEmail.setVisibility(false);
      }
    },
    showError: function(data){
      this.view.flxErrorContainer.setVisibility(true);
      this.view.lblImageError.text = data.errorMessage;
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
      this.view.onKeyPress = this.onKeyPressCallBack.bind(this);
      this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack.bind(this);
      this.view.flxDeletePopUp.onKeyPress = this.onKeyPressCallBack.bind(this);
      this.view.forceLayout();
      if (kony.application.getCurrentBreakpoint() === 640) {
        this.view.flxProfile.height = "450dp";
        this.view.flxRight.minHeight = "470dp";
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
      this.view.forceLayout();      
    },
    /**
	*  Method to set the Accessibility configurations
	*/
    setAccessibility: function(){
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      //CommonUtilities.setText(this.view.customheadernew.lblHeaderMobile, kony.i18n.getLocalizedString("i18n.ProfileManagement.profilesettings"), accessibilityConfig);
     // CommonUtilities.setText(this.view.lblEmailHeading, kony.i18n.getLocalizedString("i18n.ProfileManagement.EmailId"), accessibilityConfig);
      CommonUtilities.setText(this.view.btnAddNewEmail, kony.i18n.getLocalizedString("i18n.ProfileManagement.AddNewEmail"), accessibilityConfig);
      CommonUtilities.setText(this.view.btnAddNewEmailMobile, kony.i18n.getLocalizedString("i18n.ProfileManagement.AddNewEmail"), accessibilityConfig);
      //CommonUtilities.setText(this.view.lblHeading, kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson"), accessibilityConfig);
      CommonUtilities.setText(this.view.btnAddNewPersonalEmail, kony.i18n.getLocalizedString("i18n.ProfileManagement.AddNewEmail"), accessibilityConfig);
      CommonUtilities.setText(this.view.btnAddNewBusinessEmail, kony.i18n.getLocalizedString("i18n.ProfileManagement.AddNewEmail"), accessibilityConfig);
      this.view.lblHeading.accessibilityConfig = {
        "a11yARIA": {
          "tabindex": -1
        },
        "a11yLabel": this.view.lblEmailHeading.text + " " + kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson")
      };
      this.view.lblCollapseMobile.accessibilityConfig = {
        "a11yARIA": {
            "tabindex": -1
        }
      };
      this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
        "a11yLabel": "Dropdown"
      };
      this.view.segEmailIds.accessibilityConfig = {
        "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.EmailsList"),
        "a11yARIA": {
          "tabindex": -1
        }
      };
     
     
    },  
    /**
	*  Method to set the Form Flow Actions such as button onclick events
	*/
    setFlowActions:function(){
      var scopeObj=this;
      this.view.ProfileInfo.flxCross.onClick = function() {
        scopeObj.view.ProfileInfo.isVisible = false;
        scopeObj.view.forceLayout();
      };
      
        this.view.btnAddNewEmail.onClick = function() {
             applicationManager.getNavigationManager().navigateTo("frmProfileAddEmail");  
          };
     this.view.btnAddNewEmailMobile.onClick = function(){
                  applicationManager.getNavigationManager().navigateTo("frmProfileAddEmail");  
     
     }
      
    },
    onKeyPressCallBack: function (eventObject, eventPayload) {
      var scopeObj = this;
      if (eventPayload.keyCode === 27) {
        if (scopeObj.view.flxLogout.isVisible === true) {
          scopeObj.view.flxLogout.isVisible = false;
          scopeObj.view.flxDialogs.isVisible = false;
          scopeObj.view.customheadernew.btnLogout.setActive(true);
        }
        if (scopeObj.view.flxDeletePopUp.isVisible === true) {
          scopeObj.view.flxDeletePopUp.isVisible = false;
          scopeObj.view.flxDialogs.isVisible = false;
        }
      }
    },
     /**
       * Method used to show the email view.
       */
      showEmail: function() {
          this.view.flxEmailWrapper.setVisibility(true);
          this.view.ProfileInfo.setVisibility(false);
      },
      /**
       * Method to update the list of emails
       * @param {Object} emailListViewModel- list of emails
       */
      updateEmailList: function(emailListViewModel) {
       //   this.view.customheader.customhamburger.activateMenu("Settings", "Profile Settings");
          this.showEmail();
         var currBreakpoint = kony.application.getCurrentBreakpoint();
          if (emailListViewModel.length >= 3 || !applicationManager.getConfigurationManager().checkUserPermission("PROFILE_SETTINGS_UPDATE")) {
                if (currBreakpoint === 640 || orientationHandler.isMobile) {
              this.view.btnAddNewEmailMobile.setVisibility(false);
                this.view.btnAddNewEmail.setVisibility(false);
                }
            else{
               this.view.btnAddNewEmailMobile.setVisibility(false);
            this.view.btnAddNewEmail.setVisibility(false);
            }
          //    this.view.settings.btnEditAddNewEmail.setVisibility(false);
          } else {
              if (currBreakpoint === 640 || orientationHandler.isMobile) {
              this.view.btnAddNewEmailMobile.setVisibility(true);
                 this.view.btnAddNewEmail.setVisibility(false);
                }
            else{
              this.view.btnAddNewEmail.setVisibility(true);
               this.view.btnAddNewEmailMobile.setVisibility(false);
            }
       //       this.view.settings.btnEditAddNewEmail.setVisibility(true);
       //       this.view.settings.btnAddNewPersonalEmail.setVisibility(true);
          }
          
          this.setEmailSegmentData(emailListViewModel);
         // this.setSelectedSkin("flxEmail");
      },
      sortByPrimary: function(arr, val, prop) {
        var top = [];
        var rest = [];
        for (var el of arr) {
          if (el[prop] == val) {
            top.push(el)
          } else {
            rest.push(el);
          }
        }
        return top.concat(rest);
      },
      /**
       * Method to set all the Data comming from backend to the email module
       * @param {Object} emailList - List of all the emails of the user
       */
      setEmailSegmentData: function(emailListNotSorted) {
          var emailList = this.sortByPrimary(emailListNotSorted, "true", "isPrimary");
          var isCombinedUser = applicationManager.getConfigurationManager().getConfigurationValue('isCombinedUser') === "true";
          var scopeObj = this;
          var personalEmailList = [];
          var businessEmailList = [];
        if(isCombinedUser){
          emailList.forEach(function(item){
            if(!kony.sdk.isNullOrUndefined(item.isTypeBusiness)&&item.isTypeBusiness==="1")
              businessEmailList.push(item);
            else
              personalEmailList.push(item);
          });
          this.view.flxCombinedEmail.setVisibility(true);
          this.view.settings.flxEmails.setVisibility(false);
        }
        else{
          this.view.flxCombinedEmail.setVisibility(false);
          this.view.flxEmails.setVisibility(true);
        }
          function getDeleteEmailListener(emailObj) {
              return function() {
                  var currForm = scopeObj.view;
                  //currForm.flxDeletePopUp.height = currForm.flxHeader.info.frame.height + currForm.flxContainer.info.frame.height + currForm.flxFooter.frame.height+ "dp";
                  currForm.flxDialogs.setVisibility(true);
                  currForm.flxDeletePopUp.setVisibility(true);
                  currForm.flxLogout.setVisibility(false);
                  currForm.flxDialogs.isModalContainer = true;
                  currForm.forceLayout();
                  currForm.flxDelete.top = "195dp";
                  currForm.flxDelete.accessibilityConfig = {
                    "a11yARIA": {
                        "role": "dialog",
                        "tabindex": -1
                    }
                  }
                  currForm.flxDialogs.accessibilityConfig = {
                    "a11yARIA": {
                        "tabindex": -1
                    }
                  }
                  currForm.lblDeleteHeader.setActive(true);
                  currForm.flxDeleteClose.accessibilityConfig = {
                    a11yLabel: kony.i18n.getLocalizedString("i18n.settings.closeDeleteDialog"),
                    a11yARIA: {
                      tabindex: 0,
                      role: "button"
                    }
                  };
                 currForm.btnDeleteNo.accessibilityConfig = {
                    a11yLabel: kony.i18n.getLocalizedString("i18n.settings.noDontDeleteEmail"),
                    a11yARIA: {
                      tabindex: 0,
                      role: "button"
                    }
                  };
                 currForm.btnDeleteYes.accessibilityConfig = {
                    a11yLabel: kony.i18n.getLocalizedString("i18n.settings.yesDeleteEmail"),
                    a11yARIA: {
                      tabindex: 0,
                      role: "button"
                    }
                  };
                 currForm.btnDeleteNo.onClick = function() {
                  		scopeObj.view.flxDialogs.isModalContainer = false;
                        scopeObj.view.flxDialogs.setVisibility(false);
                        scopeObj.view.flxDeletePopUp.setVisibility(false);
                        scopeObj.view.forceLayout();
                        var segData = scopeObj.view.segEmailIds.data;
                        for (var i = 0; i < segData.length; i++) {
                          if (emailObj.Value === segData[i].lblEmail.text) {
                            scopeObj.view.segEmailIds.setActive(i, 0, "flxProfileManagementEmail.flxRow.flxDeleteAction.btnDelete");
                          }
                        }
                    };
                  currForm.btnDeleteYes.onClick = function() {
                      kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsNewUIModule", "appName" : "ManageProfileMA"}).presentationController.deleteEmail(emailObj);
                      scopeObj.view.flxDelete.setFocus(true);
                      scopeObj.view.flxDialogs.isModalContainer = false;
                      scopeObj.view.flxDialogs.isModalContainer = false;
                      scopeObj.view.flxDialogs.setVisibility(false);
                      scopeObj.view.flxDeletePopUp.setVisibility(false);
                      scopeObj.view.forceLayout();
                  };
                  scopeObj.view.flxDeleteClose.onClick = function() {
                    scopeObj.view.flxDialogs.isModalContainer = false;
                    scopeObj.view.flxDeletePopUp.setVisibility(false);
                    scopeObj.view.flxDialogs.setVisibility(false);
                    scopeObj.view.forceLayout();
                    var segData = scopeObj.view.segEmailIds.data;
                    for (var i = 0; i < segData.length; i++) {
                      if (emailObj.Value === segData[i].lblEmail.text) {
                        scopeObj.view.segEmailIds.setActive(i, 0, "flxProfileManagementEmail.flxRow.flxDeleteAction.btnDelete");
                      }
                    }
                  };
              }
          }
          var dataMap = {
              "btnDelete": "btnDelete",
              "btnEdit": "btnEdit",
              "flxDeleteAction": "flxDeleteAction",
              "flxEdit": "flxEdit",
              "flxEmail": "flxEmail",
              "flxPrimary": "flxPrimary",
              "flxUsedFor": "flxUsedFor",
              "flxProfileManagementEmail": "flxProfileManagementEmail",
              "flxRow": "flxRow",
              "lblSeperator": "lblSeperator",
              "lblPrimary": "lblPrimary",
              "lblUsedFor": "lblUsedFor",
              "lblEmail": "lblEmail",
              "template":"template"
          };
        var flexWidth="135px";
        var textToShow="";
        if(isCombinedUser){
          var personalData = personalEmailList.map(function(emailObj) {            
            if(emailObj.isPrimary === "true"&&emailObj.isAlertsRequired === "true"&&scopeObj.enableSeparateContact){
              flexWidth="175px";
              textToShow=kony.i18n.getLocalizedString("i18n.alertSettings.PrimaryAlertComm");
            }else if(emailObj.isAlertsRequired === "true"&&scopeObj.enableSeparateContact){
              flexWidth="120px";
              textToShow=kony.i18n.getLocalizedString("i18n.alertSettings.alertComm");
            }else if(emailObj.isPrimary === "true"){
              flexWidth="135px";
              textToShow=kony.i18n.getLocalizedString("i18n.alertSettings.PrimaryComm");
            }
          var dataObject = {
            "lblEmail": {
              "text": (kony.application.getCurrentBreakpoint() === 640 && emailObj.Value.length >= 25) ? emailObj.Value.substring(0,25) + "..." : emailObj.Value,
              /*"accessibilityConfig": {
                "a11yLabel": emailObj.Value,
              }*/
            },
            "flxUsedFor": {
                "isVisible":emailObj.isPrimary === "true" || (emailObj.isAlertsRequired === "true"&&scopeObj.enableSeparateContact) ?true:false
              },
            "flxPrimary":{                
                "width":"170dp"
              },
            "lblPrimary": {
              "text": textToShow,
              "accessibilityConfig": {
                "tagName": "span"
              },
            },
            "lblUsedFor":{
                "text": kony.i18n.getLocalizedString("i18n.alertSettings.Usedfor"),
                /*"accessibilityConfig": {
                  "a11yLabel": kony.i18n.getLocalizedString("i18n.alertSettings.Usedfor")
                }*/
              },
            "btnDelete": {
              "text": emailObj.isPrimary == "true" ? " " : kony.i18n.getLocalizedString("i18n.transfers.deleteExternalAccount"),
              "accessibilityConfig": {
                "a11yARIA":{
                  "aria-haspopup": true
              },
                "a11yLabel": emailObj.isPrimary == "true" ? " " : ("Delete Email Address " + emailObj.Value),
              },
              "onClick": CommonUtilities.isCSRMode() ? CommonUtilities.disableButtonActionForCSRMode() : getDeleteEmailListener(emailObj),
              "skin": CommonUtilities.isCSRMode() ? CommonUtilities.disableSegmentButtonSkinForCSRMode(13) : "sknBtnSSPFont4176a415px",
              "isVisible": emailObj.isPrimary == "true"?false:true
            },
            "btnEdit": {
              "text": kony.i18n.getLocalizedString("i18n.billPay.Edit"),
              "accessibilityConfig": {
                "a11yLabel": "Edit email address " + (emailObj.Value || ""),
              },
              "onClick": (emailObj.isPrimary == "true") ?  scopeObj.editPrimaryEmail.bind(scopeObj, emailObj) : scopeObj.editPrimaryEmail.bind(scopeObj, emailObj) ,
              "isVisible" : applicationManager.getConfigurationManager().checkUserPermission("PROFILE_SETTINGS_UPDATE")
            },
            "lblSeperator": {
              "text":"",
              "accessibilityConfig": {
                "a11yLabel": "",
              }
              },
            "Extension": emailObj.Extension,
            "template":"flxProfileManagementEmail"
          }
              if (CommonUtilities.isCSRMode()) {
                  dataObject.btnDelete.skin = CommonUtilities.disableSegmentButtonSkinForCSRMode(13);
              }
              return dataObject;
          })
        var businessData = businessEmailList.map(function(emailObj) {
          if(emailObj.isPrimary === "true"&&emailObj.isAlertsRequired === "true"){
              flexWidth="175px";
              textToShow=kony.i18n.getLocalizedString("i18n.alertSettings.PrimaryAlertComm");
            }else if(emailObj.isAlertsRequired === "true"){
              flexWidth="120px";
              textToShow=kony.i18n.getLocalizedString("i18n.alertSettings.alertComm");
            }else if(emailObj.isPrimary === "true"){
              flexWidth="135px";
              textToShow=kony.i18n.getLocalizedString("i18n.alertSettings.PrimaryComm");
            }
          var dataObject = {
            "lblEmail": {
              "text": (kony.application.getCurrentBreakpoint() === 640 && emailObj.Value.length >= 25) ? emailObj.Value.substring(0,25) + "..." : emailObj.Value,
              /*"accessibilityConfig": {
                "a11yLabel": emailObj.Value,
              }*/
            },
            "flxUsedFor": {
                "isVisible":emailObj.isPrimary === "true" || (emailObj.isAlertsRequired === "true"&&scopeObj.enableSeparateContact) ?true:false
              },
            "flxPrimary":{                
                "width":"170dp"
              },
            "lblPrimary": {
              "text": textToShow,
              "accessibilityConfig": {
                "tagName": "span"
              },
            },
            "lblUsedFor":{
                "text": kony.i18n.getLocalizedString("i18n.alertSettings.Usedfor")/*,
                "accessibilityConfig": {
                  "a11yLabel": kony.i18n.getLocalizedString("i18n.alertSettings.Usedfor")
                }*/
              },
            "btnDelete": {
              "text": emailObj.isPrimary == "true" ? " " : kony.i18n.getLocalizedString("i18n.transfers.deleteExternalAccount"),
              "accessibilityConfig": {
                "a11yARIA":{
                  "aria-haspopup": true
              },
                "a11yLabel": emailObj.isPrimary == "true" ? " " : ("Delete Email Address "+ emailObj.Value)
              },
              "onClick": CommonUtilities.isCSRMode() ? CommonUtilities.disableButtonActionForCSRMode() : getDeleteEmailListener(emailObj),
              "skin": CommonUtilities.isCSRMode() ? CommonUtilities.disableSegmentButtonSkinForCSRMode(13) : "sknBtnSSPFont4176a415px",
              "isVisible": false
            },
            "btnEdit": {
              "text": kony.i18n.getLocalizedString("i18n.billPay.Edit"),
              "accessibilityConfig": {
                "a11yLabel": "Edit email address " + emailObj.Value
              },
              "onClick": (emailObj.isPrimary == "true") ? scopeObj.editPrimaryEmail.bind(scopeObj, emailObj) : scopeObj.editEmail.bind(scopeObj, emailObj),
              "isVisible" : applicationManager.getConfigurationManager().checkUserPermission("PROFILE_SETTINGS_UPDATE")
            },
            "lblSeperator": {
              "text":"",
              "accessibilityConfig": {
                "a11yLabel": "",
              }
              },
            "Extension": emailObj.Extension,
            "template":"flxProfileManagementEmail"
          }
              if (CommonUtilities.isCSRMode()) {
                  dataObject.btnDelete.skin = CommonUtilities.disableSegmentButtonSkinForCSRMode(13);
              }
              return dataObject;
          })
          this.view.settings.segPersonalEmailIds.widgetDataMap = dataMap;
          this.view.settings.segBusinessEmailIds.widgetDataMap = dataMap;
          if(kony.application.getCurrentBreakpoint() === 1024){
              for(var i=0;i<personalData.length;i++){
              personalData[i].template = "flxProfileManagementEmailTablet";
           }
         };
        if(kony.application.getCurrentBreakpoint() === 1024){
              for(var i=0;i<businessData.length;i++){
              businessData[i].template = "flxProfileManagementEmailTablet";
           }
         };
          if(personalData.length === 3)
            this.view.btnAddNewPersonalEmail.setVisibility(false);
          else
            this.view.btnAddNewPersonalEmail.setVisibility(true);
          if(personalData.length === 0)
            this.view.flxPersonalEmailBody.setVisibility(false);
          else
            this.view.flxPersonalEmailBody.setVisibility(true);
          if(businessData.length === 0)
            this.view.flxBusinessEmailBody.setVisibility(false);
          else
            this.view.flxBusinessEmailBody.setVisibility(true);
          this.view.segPersonalEmailIds.setData(personalData);
          this.view.segBusinessEmailIds.setData(businessData);
        }
        else{
          var data = emailList.map(function(emailObj) {
            if(emailObj.isPrimary === "true"&&emailObj.isAlertsRequired === "true"){
              flexWidth="175px";
              textToShow=kony.i18n.getLocalizedString("i18n.alertSettings.PrimaryAlertComm");
            }else if(emailObj.isAlertsRequired === "true"){
              flexWidth="120px";
              textToShow=kony.i18n.getLocalizedString("i18n.alertSettings.alertComm");
            }else if(emailObj.isPrimary === "true"){
              flexWidth="135px";
              textToShow=kony.i18n.getLocalizedString("i18n.alertSettings.PrimaryComm");
            }
          var dataObject = {
            "lblEmail": {
              "text": (kony.application.getCurrentBreakpoint() === 640 && emailObj.Value.length >= 25) ? emailObj.Value.substring(0,25)+ "..." : emailObj.Value,/*,
              "accessibilityConfig": {
                "a11yLabel": emailObj.Value,
              }*/
            },
            "flxUsedFor": {
                "isVisible":emailObj.isPrimary === "true" || (emailObj.isAlertsRequired === "true") ?true:false
              },
            "flxPrimary":{                
                "width":"170dp"
              },
            "lblPrimary": {
              "text": textToShow,
              "accessibilityConfig": {
                "tagName": "span"
              },
            },
            "lblUsedFor":{
                "text": kony.i18n.getLocalizedString("i18n.alertSettings.Usedfor")/*,
                "accessibilityConfig": {
                  "a11yLabel": kony.i18n.getLocalizedString("i18n.alertSettings.Usedfor")
                }*/
              },
            "btnDelete": {
              "text": emailObj.isPrimary == "true" ? " " : kony.i18n.getLocalizedString("i18n.transfers.deleteExternalAccount"),
              "accessibilityConfig": {
                "a11yARIA":{
                  "aria-haspopup": true
              },
                "a11yLabel": emailObj.isPrimary == "true" ? " " : ("Delete Email Address " + emailObj.Value),
              },
              "onClick": CommonUtilities.isCSRMode() ? CommonUtilities.disableButtonActionForCSRMode() : getDeleteEmailListener(emailObj),
              "skin": CommonUtilities.isCSRMode() ? CommonUtilities.disableSegmentButtonSkinForCSRMode(13) : "sknBtnSSPFont4176a415px",
              "isVisible":emailObj.isPrimary == "true"?false:true
            },
            "btnEdit": {
              "text": kony.i18n.getLocalizedString("i18n.billPay.Edit"),
              "accessibilityConfig": {
                "a11yLabel": "Edit email address "  + emailObj.Value,
              },
              "onClick": (emailObj.isPrimary == "true") ? scopeObj.editPrimaryEmail.bind(scopeObj, emailObj) : scopeObj.editEmail.bind(scopeObj, emailObj),
              "isVisible": applicationManager.getConfigurationManager().checkUserPermission("PROFILE_SETTINGS_UPDATE")?(emailObj.isPrimary === "true" ?false:true):false
            },
            "lblSeperator": {
              "text":"",
              "accessibilityConfig": {
                "a11yLabel": "",
              }
              },
            "Extension": emailObj.Extension,
            "template":"flxProfileManagementEmail"
          }
              if (CommonUtilities.isCSRMode()) {
                  dataObject.btnDelete.skin = CommonUtilities.disableSegmentButtonSkinForCSRMode(13);
              }
              return dataObject;
          })
          this.view.segEmailIds.widgetDataMap = dataMap;
          if(kony.application.getCurrentBreakpoint() === 1024){
              for(var i=0;i<data.length;i++){
              data[i].template = "flxProfileManagementEmailTablet";
           }
         };
          this.view.segEmailIds.setData(data);
        }
        
          FormControllerUtility.hideProgressBar(this.view);
          this.view.forceLayout();
      },
       editPrimaryEmail: function(emailObj) {
             applicationManager.getNavigationManager().navigateTo('frmProfileEditEmail');
          var viewProperties = {
           emailObj:emailObj
        };
    //     applicationManager.getNavigationManager().navigateTo('frmProfileEmail');
     
        applicationManager.getNavigationManager().updateForm(viewProperties, "frmProfileEditEmail");
    
     
       },
     editEmail: function(emailObj) {
             applicationManager.getNavigationManager().navigateTo('frmProfileEditEmail');
          var viewProperties = {
           editemailObj:emailObj
        };
    //     applicationManager.getNavigationManager().navigateTo('frmProfileEmail');
     
        applicationManager.getNavigationManager().updateForm(viewProperties, "frmProfileEditEmail");
    
     
       }
  };
});