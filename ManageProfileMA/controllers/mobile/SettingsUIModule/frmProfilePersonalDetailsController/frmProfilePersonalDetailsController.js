 define({
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  frmPreShow : function(){
    this.setPreshowData();
    this.setFlowActions();
    this.setCameraProperties();
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var configManager = applicationManager.getConfigurationManager();
    
    if((configManager.isRBUser === "true" || configManager.isCombinedUser === "true") && applicationManager.getConfigurationManager().checkUserPermission("PROFILE_SETTINGS_UPDATE")){
      this.view.customHeader.btnRight.isVisible = true;
    }
    else{
      this.view.customHeader.btnRight.isVisible = false;
      if (applicationManager.getPresentationFormUtility().getDeviceName() == "iPhone") {
        try {
          var rightBarButtonItem = new kony.ui.BarButtonItem({
            type: configManager.constants.BAR_BUTTON_TITLE,
            style: configManager.constants.BAR_ITEM_STYLE_PLAIN,
            enabled: true,
            tintColor: "FFFFFF00",
            metaData: {
              title: " "
            }
          });
          this.view.setRightBarButtonItems({
            items: [rightBarButtonItem],
            animated: true
          });
        }
        catch(err) {
        }       
      }

    }
    var settings = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName": "SettingsUIModule","appName": "ManageProfileMA"});
    settings.presentationController.showUserProfileImage();
    var deviceManager = applicationManager.getDeviceUtilManager();
    deviceManager.detectDynamicInstrumentation();
  },
  setPreshowData : function(){
    this.view.flxEditOptions.setVisibility(false);
    this.view.flxEditProfilePicture.setVisibility(false);
    this.setDetailsData();
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
      this.view.flxMainContainer.top = "56dp";
    }
    else{
      this.view.flxHeader.isVisible = false;
      this.view.flxMainContainer.top = "0dp";
      this.view.flxDetailsMain.top = "60dp";
    }
  },
  setFlowActions : function(){
    var scope = this;
    this.view.flxChangeProfilePicture.onClick = function(){
      scope.showChangeProfileOptions();
    };
    this.view.flxUploadProfilePicture.onClick = function(){
      scope.showChangeProfileOptions();
    };
    this.view.flxRemoveProfilePicture.onClick = function(){
     var basicConfig = {
        message: kony.i18n.getLocalizedString("kony.mb.PersonalProfileDetails.ProfilePictureRemovalWarning"),
        alertType: constants.ALERT_TYPE_CONFIRMATION,
        yesLabel: kony.i18n.getLocalizedString("kony.mb.common.AlertYes"),
        noLabel: kony.i18n.getLocalizedString("kony.mb.common.AlertNo"),
        alertHandler: function(response){
          scope.view.flxEditOptions.setVisibility(false);
          if(response){
            var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
            settingsMode.presentationController.removeProfileImage();
          }
        }
      };
      applicationManager.getPresentationUtility().showAlertMessage(basicConfig, {});
    };
    this.view.flxEditPhoneNumbers.onClick = function(){
      scope.navToEditPhoneNumber();
    };
    this.view.flxEditEmail.onClick = function(){
      scope.navToEditEmail();
    };
    this.view.flxEditAddress.onClick = function(){
      scope.navToEditAddress();
    };
    this.view.cameraWidget.onCapture = function(){
     
      scope.onClickTakePicture();
      scope.view.flxEditProfilePicture.setVisibility(false);
      scope.view.flxEditOptions.setVisibility(false);
    };
    this.view.flxChoose.onClick = function(){
//       scope.uploadInstructionsAlert();
      scope.onClickChooseFromGallery(true);
      scope.view.flxEditProfilePicture.setVisibility(false);
      scope.view.flxEditOptions.setVisibility(false);
    };
    this.view.customHeader.btnRight.onClick = function(){
      scope.showOptions();
    };
    this.view.flxTop.onClick = function(){
      scope.view.flxEditOptions.setVisibility(false);
    };
    this.view.flxTopProfile.onClick = function(){
      scope.view.flxEditProfilePicture.setVisibility(false);
    };
    this.view.customHeader.flxBack.onClick = function(){
      var nav = applicationManager.getNavigationManager();
      nav.goBack();
    };
  },
  goBack : function(){
  var navManager = applicationManager.getNavigationManager();
  navManager.navigateTo("frmSettings");
  },
onClickTakePicture : function(){
     //#ifdef android
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    settingsMod.presentationController.commonFunctionForNavigation("frmProfilePersonalDetails");
     //#endif
     var rawBytes = this.view.cameraWidget.rawBytes;
     this.imageRawBytes = rawBytes;
     var imageObject=kony.image.createImage(rawBytes);
     imageObject.scale(0.5);
     var rawBytesAfterCompression=imageObject.getImageAsRawBytes();
     var base64Image=kony.convertToBase64(rawBytesAfterCompression);
     if(applicationManager.getDeviceUtilManager().isIPhone()) {
        	 imageObject.compress(0.5);
             rawBytesAfterCompression = imageObject.getImageAsRawBytes();
             base64Image = kony.convertToBase64(rawBytesAfterCompression);
     }
     else{
       while(base64Image && base64Image.length > 2000000){
             imageObject.compress(0.5);
             rawBytesAfterCompression = imageObject.getImageAsRawBytes();
             base64Image = kony.convertToBase64(rawBytesAfterCompression);
     	 }
     }
     if(base64Image){
       var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
           settingsMode.presentationController.uploadProfilePicture(base64Image);
     }
   },
   uploadInstructionsAlert : function(){
     var scope = this;
     var basicConfig = {
        message: kony.i18n.getLocalizedString("kony.mb.PersonalProfileDetails.uploadInstructions1")+"\n"+kony.i18n.getLocalizedString("kony.mb.PersonalProfileDetails.uploadInstructions2")+"\n"+kony.i18n.getLocalizedString("kony.mb.PersonalProfileDetails.uploadInstructions3"),
        alertType: constants.ALERT_TYPE_CONFIRMATION,
        yesLabel: kony.i18n.getLocalizedString("kony.mb.common.continue"),
        noLabel: kony.i18n.getLocalizedString("kony.mb.common.Cancel"),
        alertHandler: scope.onClickChooseFromGallery
      };
      kony.ui.Alert(basicConfig, {});
   },
   onClickChooseFromGallery : function(response){
     try{
     var scope = this;
     if(response){
       var queryContext = {
         mimetype: "image/*"
       };
       kony.phone.openMediaGallery(gallerySelectionCallback, queryContext);
     }
     function gallerySelectionCallback(rawBytes,permissionStatus){
       if(rawBytes !== null && rawBytes !== ""){
         scope.imageRawBytes = rawBytes;
         var imageObject=kony.image.createImage(rawBytes);
         imageObject.scale(0.5);
         var rawBytesAfterCompression=imageObject.getImageAsRawBytes();
         var base64 = kony.convertToBase64(rawBytesAfterCompression);
         if(applicationManager.getDeviceUtilManager().isIPhone()) {
        	 imageObject.compress(0.5);
             rawBytesAfterCompression = imageObject.getImageAsRawBytes();
             base64Image = kony.convertToBase64(rawBytesAfterCompression);
		}
		else{
			 while(base64 && base64.length > 2000000){
				imageObject.compress(0.5);
				rawBytesAfterCompression = imageObject.getImageAsRawBytes();
				base64Image = kony.convertToBase64(rawBytesAfterCompression);
			}
        }
         if(base64 !== null && base64 !== undefined && base64 !== ""){
           var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
           settingsMode.presentationController.uploadProfilePicture(base64);
         }
         else if(permissionStatus === kony.application.PERMISSION_DENIED){
           var i18nPermission = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.gallery.permissionDenied");
           scope.bindViewError(i18nPermission);
         } else {
           var i18nNo = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.gallery.noImageSelected");
           scope.bindViewError(i18nNo);
         }
       }
     }
   }catch(err){
     kony.print(err);
   }
   },
   bindUploadedImage : function(){
     try{
     var rawBytes = this.imageRawBytes;
     this.imageRawBytes = "";
     if(rawBytes){
       var base64Str = kony.convertToBase64(rawBytes);
       this.view.imgUser.base64 = base64Str;
       this.view.imgUser.width = "100%";
       this.view.imgUser.height = "100%";
       rawBytes = "";
     }}catch(err){
       kony.print("error in bindUploadedImage"+err);
     }
   },
  setDetailsData : function(){
    var dataMap = {
      "flxDetails": "flxDetails",
      "flxMain" : "flxMain",
      "flxDetailsHeader": "flxDetailsHeader",
      "flxHeader": "flxHeader",
      "flxHeaderShadow": "flxHeaderShadow",
      "flxSeparator": "flxSeparator",
      "lblDetail": "lblDetail",
      "lblDetailValue": "lblDetailValue",
      "lblHeader": "lblHeader"
    };
    var nav = applicationManager.getNavigationManager();
    var data = nav.getCustomInfo('frmProfilePersonalDetails');
    var name = nav.getCustomInfo('frmProfilePersonalDetails1');
    this.view.lblUSer.text = name;
    kony.print("$$$$$####   data is "+JSON.stringify(data)+" &&&&&");
    this.view.segDetails.widgetDataMap = dataMap;
    this.view.segDetails.setData(data);
	var profilepicture =  applicationManager.getUserPreferencesManager().getUserImage();
     var configManager = applicationManager.getConfigurationManager();
    if(profilepicture && configManager.getProfileImageAvailabilityFlag()){
      this.view.imgUser.base64 = profilepicture;
      this.view.imgUser.width = "100%";
      this.view.imgUser.height = "100%";
    }
    else{
      this.view.imgUser.src = "profileicon.png";
      this.view.imgUser.width = "90%";
      this.view.imgUser.height = "90%";
    }
    this.view.forceLayout();
  },
   removeProfilePicture : function(){
     this.view.imgUser.src = "profileicon.png";
     this.view.imgUser.width = "90%";
     this.view.imgUser.height = "90%";
     this.view.forceLayout();
   },
  navToChangeProfilePicture : function(){
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    settingsMod.presentationController.commonFunctionForNavigation("frmChangeProfilePicture");
  },
  navToEditPhoneNumber : function(){
    var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    settingsMode.presentationController.navigateToEditPhoneNumber({"flow":"null"});
  },
  navToEditEmail : function(){
    var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    settingsMode.presentationController.navigateToAddOrEditEmail("null");
  },
  navToEditAddress : function(){
    var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    settingsMode.presentationController.navigateToEditOrAddAddress();
  },
  takePictureIphone : function(){
    this.view.cameraWidget.takePicture();
  },
  showChangeProfileOptions : function(){
    this.view.flxEditOptions.setVisibility(false);
    if(applicationManager.getDeviceUtilManager().isIPhone()) {
      var actionSheetObject = new kony.ui.ActionSheet(
        {
          "title":null,
          "message":null,
          "showCompletionCallback": null
        }
      );
	  applicationManager.actionSheetObject=actionSheetObject;
      var actionTakePicture = new kony.ui.ActionItem(
        {
          "title":"Take a Picture",
          "style":constants.ACTION_STYLE_DEFAULT,
          "action": this.takePictureIphone
        }
      );
      var actionChooseFromGallery = new kony.ui.ActionItem(
        {
          "title":"Choose From Gallery",
          "style":constants.ACTION_STYLE_DEFAULT,
          "action": this.view.flxChoose.onClick
        }
      );
      var actionCancel = new kony.ui.ActionItem(
        {
          "title":"Cancel",
          "style":constants.ACTION_ITEM_STYLE_CANCEL,
          "action": null
        }
      );
      actionSheetObject.addAction(actionTakePicture);
      actionSheetObject.addAction(actionChooseFromGallery);
      actionSheetObject.addAction(actionCancel);
      actionSheetObject.show();
    }else{
      this.view.flxEditProfilePicture.setVisibility(true);
    }
  },
  showOptions : function(){
    var configManager = applicationManager.getConfigurationManager();
    var isProfileImageEnabled = configManager.getProfileImageAvailabilityFlag();
    var profileImage = applicationManager.getUserPreferencesManager().getUserImage();
    if(applicationManager.getDeviceUtilManager().isIPhone())
    {
      var actionSheetObject = new kony.ui.ActionSheet(
        {
          "title":null,
          "message":null,
          "showCompletionCallback": null
        }
      );
	  applicationManager.actionSheetObject=actionSheetObject;
      var actionUploadProfilePicture = new kony.ui.ActionItem(
        {
          "title":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.ProfilePersonalDetails.UploadProfilePicture","Upload Profile Picture"),
          "style":constants.ACTION_STYLE_DEFAULT,
          "action": this.view.flxUploadProfilePicture.onClick
        }
      );
      var actionChangeProfilePicture = new kony.ui.ActionItem(
        {
          "title":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.ProfilePersonalDetails.ChangeProfilePicture","Change Profile Picture"),
          "style":constants.ACTION_STYLE_DEFAULT,
          "action": this.view.flxChangeProfilePicture.onClick
        }
      );
      var actionRemoveProfilePicture = new kony.ui.ActionItem(
        {
          "title":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.profilePersonalDetails.RemoveProfilePicture","Remove Profile Picture"),
          "style":constants.ACTION_STYLE_DEFAULT,
          "action": this.view.flxRemoveProfilePicture.onClick
        }
      );
      var actionUpdatePhoneNo = new kony.ui.ActionItem(
        {
          "title":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.ProfilePersonalDetails.EditPhoneNumbers","Add or Update Phone Numbers"),
          "style":constants.ACTION_STYLE_DEFAULT,
          "action": this.view.flxEditPhoneNumbers.onClick
        }
      );
      var actionUpdateEmails = new kony.ui.ActionItem(
        {
          "title":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.ProfilePersonalDetails.EditEmail","Add or Update Emails"),
          "style":constants.ACTION_STYLE_DEFAULT,
          "action": this.view.flxEditEmail.onClick
        }
      );
      var actionEditAddress = new kony.ui.ActionItem(
        {
          "title":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.ProfilePersonalDetails.EditAdress","Add or Edit Address"),
          "style":constants.ACTION_STYLE_DEFAULT,
          "action": this.view.flxEditAddress.onClick
        }
      );
      var actionCancel = new kony.ui.ActionItem(
        {
          "title":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.Cancel","Cancel"),
          "style":constants.ACTION_ITEM_STYLE_CANCEL,
          "action": null
        }
      );
      if(profileImage && isProfileImageEnabled){
          actionSheetObject.addAction(actionChangeProfilePicture);
          actionSheetObject.addAction(actionRemoveProfilePicture);
      }
      else if(isProfileImageEnabled)
        actionSheetObject.addAction(actionUploadProfilePicture);
      actionSheetObject.addAction(actionUpdatePhoneNo);
      actionSheetObject.addAction(actionUpdateEmails);
      actionSheetObject.addAction(actionEditAddress);
      actionSheetObject.addAction(actionCancel);
      actionSheetObject.show();
    }else{
      if(profileImage && isProfileImageEnabled){
        this.view.flxChangeProfilePicture.setVisibility(true);
        this.view.flxRemoveProfilePicture.setVisibility(true);
        this.view.flxUploadProfilePicture.setVisibility(false);
        this.view.flxOptions.height = "250dp"
      }
      else if(isProfileImageEnabled){
        this.view.flxChangeProfilePicture.setVisibility(false);
        this.view.flxRemoveProfilePicture.setVisibility(false);
        this.view.flxUploadProfilePicture.setVisibility(true);
        this.view.flxOptions.height = "200dp"
      }
      else{
        this.view.flxChangeProfilePicture.setVisibility(false);
        this.view.flxRemoveProfilePicture.setVisibility(false);
        this.view.flxUploadProfilePicture.setVisibility(false);
        this.view.flxOptions.height = "150dp"
      }
      this.view.flxEditOptions.setVisibility(true);
    }
  },
   bindViewError : function(msg){
     applicationManager.getDataProcessorUtility().showToastMessageError(this, msg);
   },
   bindViewSuccess : function(msg){
     applicationManager.getDataProcessorUtility().showToastMessageSuccess(this, msg);
   },
   setCameraProperties: function() {
    var deviceUtilManager = applicationManager.getDeviceUtilManager();
    var isIphone = deviceUtilManager.isIPhone();
    if(!isIphone){
      this.view.cameraWidget.cameraOptions = {
          hideControlBar: true
      };
    }
  }
 });