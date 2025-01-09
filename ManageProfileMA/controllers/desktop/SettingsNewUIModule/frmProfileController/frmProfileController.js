define(['CommonUtilities', 'CSRAssistUI','FormControllerUtility', 'OLBConstants', 'ViewConstants', 'CampaignUtility'], function(CommonUtilities, CSRAssistUI, FormControllerUtility, OLBConstants, ViewConstants) {
  var orientationHandler = new OrientationHandler();
  var responsiveUtils = new ResponsiveUtils();
  var flexVisibility = false;
  return {
    updateFormUI: function(viewModel) {
      if (viewModel.userProfile) this.updateUserProfileSetttingsView(viewModel.userProfile);
      this.view.lblPersonalDetailsHeading.setActive(true);
    },
    init:function(){
      var self=this;
      this.view.preShow=this.preShow;
      this.view.postShow=this.postShowProfile;
      this.view.flxAccountSettingsCollapseMobile.onClick = this.toggleMenuMobile;
      this.setFlowActions();
      applicationManager.getLoggerManager().setCustomMetrics(this, false, "Profile");
      this.view.onBreakpointChange = function() {
        self.onBreakpointChange(kony.application.getCurrentBreakpoint());
      };
    },
    preShow:function()
    {
      this.view.flxRight.setVisibility(true);
      this.changeProgressBarState(true);
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain','flxMenuItemMobile']);
      this.view.lblCollapseMobile.text  = "O";
      this.view.customheadernew.activateMenu("Settings","Profile Settings");
      this.view.profileMenu.checkLanguage();
      this.view.profileMenu.activateMenu("PROFILESETTINGS","Profile");
      this.setSelectedValue("i18n.ProfileManagement.Profile");
      this.setAccessibility();
      this.view.lblProfileDeleteContent= kony.i18n.getLocalizedString("i18n.Profile.DeleteProfilePictureWarning");
      this.view.flxProfileDeletePopUp.onKeyPress = this.onKeyPressCallBack.bind(this);
      this.view.ProfileInfo.flxCross.onKeyPress = this.onKeyPressCallBack.bind(this);
      this.view.ProfileInfo.lblInfo.onKeyPress = this.onKeyPressCallBack.bind(this);
    
    },
    
    skipToMainContent : function(){
      this.view.lblHeading.setActive(true);
    },

    onKeyPressCallBack: function(eventObject, eventPayload) {
      var self=this;              
      if (eventPayload.keyCode === 27) {
        if(self.view.flxProfileDeletePopUp.isVisible===true)
        {
          self.view.flxProfileDeletePopUp.isVisible = false;
          self.view.flxDialogs.isVisible = false;
          self.view.btnDeletephoto.setFocus(true);
        }
        else if(self.view.ProfileInfo.isVisible === true){
          self.view.ProfileInfo.isVisible = false;
          self.view.flxWhatIsSSN.setActive(true);
        }
        else if (this.view.flxDialogs.isVisible === true) {
          this.view.flxDialogs.isVisible = false;
          this.view.customheadernew.btnLogout.setFocus(true);
        }
      }
      else if (eventPayload.keyCode === 9 && eventPayload.shiftKey && self.view.ProfileInfo.isVisible){
        self.view.ProfileInfo.isVisible = false;
        //self.view.flxWhatIsSSN.setActive(true);
      }
      else if (eventPayload.keyCode === 9 && eventObject.id === "flxCross" && self.view.ProfileInfo.isVisible) {
        self.view.ProfileInfo.isVisible = false;
      }
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
      if (this.view.lblCollapseMobile.text === "O") {
        this.view.lblCollapseMobile.text = "P";
        this.view.flxLeft.setVisibility(true);
        this.view.flxRight.setVisibility(false);
      } else {
        this.view.lblCollapseMobile.text  = "O";
        this.view.flxLeft.setVisibility(false);
        this.view.flxRight.setVisibility(true);
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
      //this.view.ProfileInfo.imgCross.toolTip=kony.i18n.getLocalizedString("i18n.common.close");
      this.view.ProfileInfo.isVisible = false;
      this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight -this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp"; 
      this.setDefaultUserPhoto(); 
      this.changeProgressBarState(false);
      this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
      this.view.customheadernew.collapseAll();
      this.view.customheadernew.btnSkipNav.onClick = this.skipToMainContent.bind(this);
      this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack;
      this.view.forceLayout(); 
      this.view.lblPersonalDetailsHeading.setActive(true);
      this.view.btnDeletePopupNo.accessibilityConfig = {
        a11yLabel:"No, don't remove the profile picture",
        a11yARIA :{
          "tabindex": 0,
          "role": "button",
        }
      }
      this.view.btnDeletePopupYes.accessibilityConfig = {
        a11yLabel:"Yes, remove the profile picture",
        a11yARIA :{
          "tabindex": 0,
          "role": "button",
        }
      }
    },
    /**
	*  Method to set the user photo on the header and the form
	*/
    setDefaultUserPhoto: function() {
      var userImageURLTest = applicationManager.getUserPreferencesManager().getUserImage();
      if (this.view.customheadernew && userImageURLTest === "") {
        this.view.customheadernew.imgUser.src = "";
        this.view.customheadernew.CopyimgToolTip0i580d9acc07c42.src = "";
        this.view.customheadernew.CopyimgToolTip0i580d9acc07c42.src = ViewConstants.IMAGES.USER_DEFAULT_IMAGE;
        this.view.customheadernew.imgUser.src = ViewConstants.IMAGES.USER_DEFAULT_IMAGE;
      }
      if (userImageURLTest === "") {
        this.view.imgProfile.src = ViewConstants.IMAGES.USER_DEFAULT_IMAGE;
      }
      else{
        this.view.imgProfile.base64 = "";
        this.view.customheadernew.imgUser.base64 = "";
        this.view.customheadernew.CopyimgToolTip0i580d9acc07c42.base64 = "";
        this.view.customheadernew.CopyimgToolTip0i580d9acc07c42.base64 = userImageURLTest;
        this.view.imgProfile.base64 = userImageURLTest;
        this.view.customheadernew.imgUser.base64 = userImageURLTest;
      }
      this.view.customheadernew.imgUser.accessibilityConfig = {
        "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson")
      }
    },
    /**
    * *@param {json} data- user data to be displayed in json format
	*  Method to set the user data such as name,dob,ssn and image in the form
	*/
    updateUserProfileSetttingsView: function(data) {
      var userProfileViewModel = {
        name: (data.userlastname === null) ? data.userfirstname : (data.userfirstname === null) ? data.userlastname : data.userfirstname + " " + data.userlastname,
        dob: (data.dateOfBirth.substring(8,10) + "/" + data.dateOfBirth.substring(5,7) + "/" + data.dateOfBirth.substring(0,4)),
        maskedSSN: (data.ssn)?'***-**-' + CommonUtilities.getLastFourDigit(data.ssn):"",
        userImage: data.userImageURL
      };
      this.view.lblAltSocialSecurityValue.text = (data.ssn) ? kony.i18n.getLocalizedString("i18n.Profile.MaskedSSNAltText") + CommonUtilities.getLastFourDigit(data.ssn) : "";
      flexVisibility=true;
      this.view.flxProfileWrapper.setVisibility(flexVisibility);
      this.changeProgressBarState(false);
      this.view.lblNameValue.text = userProfileViewModel.name;
      this.view.lblDOBValue.text = userProfileViewModel.dob;
      this.view.lblSocialSecurityValue.text = userProfileViewModel.maskedSSN;
      //CommonUtilities.setText(this.view.lblNameValue, userProfileViewModel.name , CommonUtilities.getaccessibilityConfig());
      //CommonUtilities.setText(this.view.lblDOBValue, userProfileViewModel.dob , CommonUtilities.getaccessibilityConfig());
      this.view.flxImageError.setVisibility(false);
      if(applicationManager.getConfigurationManager().getProfileImageAvailabilityFlag() === true && userProfileViewModel.userImage && userProfileViewModel.userImage.trim() != "") {
        this.view.imgProfile.base64 = userProfileViewModel.userImage;
        this.view.btnEditPhoto.isVisible = true;
        this.view.btnDeletephoto.isVisible = true;
        this.view.btnAddPhoto.isVisible = false;
        this.view.flxWhatIsSSN.isVisible = false;
      } else if(applicationManager.getConfigurationManager().getProfileImageAvailabilityFlag() === false){
        this.view.imgProfile.src =  ViewConstants.IMAGES.USER_GREY_IMAGE;
        this.view.btnEditPhoto.isVisible = false;
        this.view.btnDeletephoto.isVisible = false;
        this.view.btnAddPhoto.isVisible = false;
        this.view.flxWhatIsSSN.isVisible = false;
      }
      else{
        this.view.imgProfile.src =  ViewConstants.IMAGES.USER_GREY_IMAGE;
        this.view.btnEditPhoto.isVisible = false;
        this.view.btnDeletephoto.isVisible = false;
        this.view.btnAddPhoto.isVisible = true;
        if(kony.application.getCurrentBreakpoint() != 640){
          this.view.flxWhatIsSSN.isVisible = true;
        }
      }
      if(!applicationManager.getConfigurationManager().checkUserPermission("PROFILE_SETTINGS_UPDATE")){
        this.view.btnEditPhoto.isVisible = false;
        this.view.btnDeletephoto.isVisible = false;
        this.view.btnAddPhoto.isVisible = false;
        this.view.flxWhatIsSSN.isVisible = false;
      }
    },
    onBreakpointChange: function (width) {
      FormControllerUtility.setupFormOnTouchEnd(width);
      this.view.flxProfileWrapper.setVisibility(flexVisibility);
      responsiveUtils.onOrientationChange(this.onBreakpointChange);
      this.view.customheadernew.onBreakpointChangeComponent(width);
      this.view.customfooternew.onBreakpointChangeComponent(width);
      this.view.profileMenu.onBreakpointChangeComponent(width);
      orientationHandler.onOrientationChange(this.onBreakpointChange);
      if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
         var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
         //CommonUtilities.setText(this.view.customheadernew.lblHeaderMobile, kony.i18n.getLocalizedString("i18n.ProfileManagement.profilesettings"), accessibilityConfig);
        this.view.flxWhatIsSSN.right = "34%";
        this.view.lblCollapseMobile.left = "15%";
      }
      if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
			this.view.btnEditPhoto.left = "20%";
            this.view.btnDeletephoto.right = "20%";
      }
      this.view.forceLayout();      
    },
    /**
    * *@param {base64} userImage- uploaded user image in base64 format
	*  Method to set the uploaded image in the form
	*/
    bindUploadedImage: function(userImage){
      this.view.flxProfileWrapper.setVisibility(true);
      this.changeProgressBarState(false);
      if(applicationManager.getConfigurationManager().getProfileImageAvailabilityFlag() === true && userImage) {
        this.view.imgProfile.base64 = userImage;
        this.view.btnEditPhoto.isVisible = true;
        this.view.btnDeletephoto.isVisible = true;
        this.view.btnAddPhoto.isVisible = false;
        this.view.flxWhatIsSSN.isVisible = false;
      }
      else if(applicationManager.getConfigurationManager().getProfileImageAvailabilityFlag() === false){
        this.view.imgProfile.src =  ViewConstants.IMAGES.USER_GREY_IMAGE;
        this.view.btnEditPhoto.isVisible = false;
        this.view.btnDeletephoto.isVisible = false;
        this.view.btnAddPhoto.isVisible = false;
        this.view.flxWhatIsSSN.isVisible = false;
      }
      else{
        this.view.imgProfile.src =  ViewConstants.IMAGES.USER_GREY_IMAGE;
        this.view.btnEditPhoto.isVisible = false;
        this.view.btnDeletephoto.isVisible = false;
        this.view.btnAddPhoto.isVisible = true;
        if(kony.application.getCurrentBreakpoint() != 640){
          this.view.flxWhatIsSSN.isVisible = true;
        }         
      }
      this.view.customheadernew.setupUserProfile();
      if(!applicationManager.getConfigurationManager().checkUserPermission("PROFILE_SETTINGS_UPDATE")){
        this.view.btnEditPhoto.isVisible = false;
        this.view.btnDeletephoto.isVisible = false;
        this.view.btnAddPhoto.isVisible = false;
        this.view.flxWhatIsSSN.isVisible = false;
      }
      this.view.forceLayout();
    },
    /**
	*  Method to set the Accessibility configurations
	*/
    setAccessibility: function(){
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      this.view.lblHeading.accessibilityConfig = {
        "a11yARIA": {
          "tabindex": -1
        },
        "a11yLabel": this.view.lblPersonalDetailsHeading.text + " " + kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson")
      };
      this.view.lblCollapseMobile.accessibilityConfig = {
          "a11yARIA": {
               "tabindex": -1
           }
      };
      this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
          "a11yLabel": "Dropdown",
          "a11yARIA": {
               "tabindex": 0,
                "role": "button",
            	"aria-expanded": false
           }
      };
      this.view.flxWhatIsSSN.accessibilityConfig={
        a11yLabel:kony.i18n.getLocalizedString("i18n.settings.readMoreAboutEditPhoto"),
        "a11yARIA": 
        {
          "tabindex": 0,
          "role": "button",
          "aria-hasPopup": "dialog"
        }
      };
      this.view.ProfileInfo.flxCross.accessibilityConfig = {
        "a11yARIA": {
             "tabindex": 0,
              "role": "button",
              "aria-label": kony.i18n.getLocalizedString("i18n.settings.closeEditAddPhotoDialog"),
         }
    };
      this.view.flxProfileImage.accessibilityConfig = {
        "a11yARIA": {
          "tabindex": -1,
          "aria-hidden": true,
        }
      };
       this.view.lblSocialSecurityValue.accessibilityConfig = {
         "tagName": "span",
        "a11yARIA": {
          "tabindex": -1,
          "aria-hidden": true,
        }
      };
    },  
    /**
	*  Method to set the Form Flow Actions such as button onclick events
	*/
    setFlowActions:function(){
      var scopeObj=this;
      this.view.btnDeletePopupYes.onClick = function(){
        scopeObj.view.flxDialogs.isModalContainer = false;
        scopeObj.view.flxDialogs.isVisible = false;
        scopeObj.view.flxProfileDeletePopUp.setVisibility(false);
        FormControllerUtility.showProgressBar(self.view);
        kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsNewUIModule", "appName" : "ManageProfileMA"}).presentationController.userImageDelete();
      };
      this.view.btnDeletePopupNo.onClick = function(){
        scopeObj.view.flxDialogs.isModalContainer = false;
        scopeObj.view.flxDialogs.isVisible = false;
        scopeObj.view.flxProfileDeletePopUp.setVisibility(false);
        scopeObj.view.btnDeletephoto.setFocus(true);
      };
      this.view.flxWhatIsSSN.onClick = function() {
        scopeObj.view.ProfileInfo.isVisible = true;
        scopeObj.view.ProfileInfo.left = "10%";
        scopeObj.view.ProfileInfo.top ="280dp";
        scopeObj.view.ProfileInfo.lblInfo.setActive(true);
        scopeObj.view.forceLayout();
      };
      this.view.ProfileInfo.flxCross.onClick = function() {
        scopeObj.view.ProfileInfo.isVisible = false;
        scopeObj.view.flxWhatIsSSN.setActive(true);
        scopeObj.view.forceLayout();
      };
      this.view.flxprofiledeleteClose.onClick = function(){
        scopeObj.view.flxDialogs.isModalContainer = false;
        scopeObj.view.flxDialogs.isVisible = false;
        scopeObj.view.flxProfileDeletePopUp.setVisibility(false);
        scopeObj.view.btnDeletephoto.setFocus(true);
      };
      if (CommonUtilities.isCSRMode()) {
        this.view.btnAddPhoto.setEnabled(false);
        this.view.btnAddPhoto.skin = CommonUtilities.disableSegmentButtonSkinForCSRMode(13);
      } else {
        this.view.btnAddPhoto.onClick = function() {    
          scopeObj.view.flxImageError.setVisibility(false);				   
          var config = {
            selectMultipleFiles: true,
            filter: ["image/png", "image/jpeg"]
          };
          kony.io.FileSystem.browse(config, this.selectedFileCallback.bind(this));                   
        }.bind(this);
      }
      if (CommonUtilities.isCSRMode()) {
        this.view.btnEditPhoto.setEnabled(false);
        this.view.btnEditPhoto.skin = CommonUtilities.disableSegmentButtonSkinForCSRMode(13);
      } else {
        this.view.btnEditPhoto.onClick = function() {   
          scopeObj.view.flxImageError.setVisibility(false);			  
          var config = {
            selectMultipleFiles: true,
            filter: ["image/png", "image/jpeg"]
          };
          kony.io.FileSystem.browse(config, this.selectedFileCallback.bind(this));                   
        }.bind(this);
      }
      if (CommonUtilities.isCSRMode()) {
        this.view.btnDeletephoto.setEnabled(false);
        this.view.btnDeletephoto.skin = CommonUtilities.disableSegmentButtonSkinForCSRMode(13);
      } else {
        this.view.btnDeletephoto.onClick = function() {
          scopeObj.view.flxImageError.setVisibility(false);
          scopeObj.view.flxDialogs.isVisible = true;
          scopeObj.view.flxDialogs.isModalContainer = true;
          scopeObj.view.flxLogout.isVisible=false;
          scopeObj.view.flxProfileDeletePopUp.isVisible = true;
          scopeObj.view.lblProfileDeleteHeader.setActive(true);
        };
      }
    },
    /**
    * *@param {Image} file - Image file to be converted into base64
	*  Method to convert the image file to base64 format
	*/
    getBase64: function(file, successCallback) {
      var reader = new FileReader();
      reader.onloadend = function() {
        successCallback(reader.result);
      };
      reader.readAsDataURL(file);
    },
    /**
	*  Method to validate the selected image and upload if valid or show error if invalid
	*/
    selectedFileCallback: function(events, files) {
      var scopeObj = this;
      if(files[0].file.type === "image/jpeg" || files[0].file.type === "image/png" || files[0].file.type === "image/jpg"){
        var image = files[0].file.size/1048576;
        if(image <= 2){
          this.getBase64(files[0].file, function(base64String) {
            var base64 = base64String.replace(/data:image\/(png|jpeg);base64\,/,"");
            FormControllerUtility.showProgressBar(scopeObj.view);
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsNewUIModule", "appName" : "ManageProfileMA"}).presentationController.userImageUpdate(base64);                 
          });
        } else{
          this.view.flxImageError.setVisibility(true);
          CommonUtilities.setText(this.view.lblImageError, kony.i18n.getLocalizedString("i18n.profile.Imagesize") , CommonUtilities.getaccessibilityConfig());
          this.view.forceLayout();
        }
      } else {
        this.view.flxImageError.setVisibility(true);
        CommonUtilities.setText(this.view.lblImageError, kony.i18n.getLocalizedString("i18n.profile.notAValidImage") , CommonUtilities.getaccessibilityConfig());
        this.view.forceLayout();
      }
    }
  };
});