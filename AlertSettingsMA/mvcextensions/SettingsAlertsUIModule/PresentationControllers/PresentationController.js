define(["CommonsMA/AsyncManager/BusinessControllers/BusinessController"], function(AsyncManager) {
  function Settings_PresentationController() {
    scope_SettingsPresenter = this;
    var defaultAcc;
    kony.mvc.Presentation.BasePresenter.call(this);
    this.flowType="";
    this.newUserName="";
    this.eStatementPopup="";
    this.estatementData={};
    this.currLatitude ="";
    this.currLongitude ="";
    scope_SettingsPresenter.userAddressFlowtype = null;
    this.AddressTypes = {
      "ADR_TYPE_WORK": 'Work',
      "ADR_TYPE_HOME": 'Home'
    };
    this.asyncManager = new AsyncManager();
    this.alertsManager = applicationManager.getAlertsManager();
    scope_SettingsPresenter.consentRespData = null;
    scope_SettingsPresenter.tppData = null;
    scope_SettingsPresenter.numberOfAsyncForAlerts = 2;
    scope_SettingsPresenter.numberOfAsyncForLocation = 3;
    this.selectedCityAndStateCodes="";
    this.userPreferredAddress="";
    this.alertsCurrency="";
    this.accountNum = "";
	scope_SettingsPresenter.numberOfDays = 10;
  }
  inheritsFrom(Settings_PresentationController, kony.mvc.Presentation.BasePresenter);
  Settings_PresentationController.prototype.initializePresentationController = function() {
  };
  Settings_PresentationController.prototype.commonFunctionForNavigation = function(formName) {
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo(formName);
  };
  Settings_PresentationController.prototype.getUsernameRulesAndPolicy = function(){
    var userObj = applicationManager.getUserPreferencesManager();
    userObj.fetchUsernameRulesAndPolicy(scope_SettingsPresenter.getUsernameRulesAndPolicySuccessCallback,scope_SettingsPresenter.getUsernameRulesAndPolicyErrorCallback);
  };
  Settings_PresentationController.prototype.getUsernameRulesAndPolicySuccessCallback = function(res){
    var navManager = applicationManager.getNavigationManager();
    var data = navManager.getCustomInfo("frmProfileUsername");
    if(data && data!==null){
      data.usernamePolicy = (res && res.usernamepolicy)?res.usernamepolicy.content:"";
    }
    else{
      data = {"usernamePolicy":(res && res.usernamepolicy)?res.usernamepolicy.content:""};
    }
    navManager.setCustomInfo("frmProfileUsername",data);
    var validationUtility = applicationManager.getValidationUtilManager();
    validationUtility.createRegexForUsernameValidation(res.usernamerules);
    scope_SettingsPresenter.navigateToChangeUserName();
  };
  Settings_PresentationController.prototype.getUsernameRulesAndPolicyErrorCallback = function(err){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (err["isServerUnreachable"]) {
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    }
  };
  Settings_PresentationController.prototype.getPasswordRulesAndPolicy = function(){
    var userObj = applicationManager.getUserPreferencesManager();
    userObj.fetchPasswordRulesAndPolicy(scope_SettingsPresenter.getPasswordRulesAndPolicySuccessCallback,scope_SettingsPresenter.getPasswordRulesAndPolicyErrorCallback);
  };
  Settings_PresentationController.prototype.getPasswordRulesAndPolicySuccessCallback = function(res){
    var navManager = applicationManager.getNavigationManager();
    var data = navManager.getCustomInfo("frmProfileChangeandUpdatePassword");
    if(data && data!==null){
      data.passwordPolicy = res.passwordpolicy.content;
    }
    else{
      data = {"passwordPolicy":res.passwordpolicy.content};
    }
    navManager.setCustomInfo("frmProfileChangeandUpdatePassword",data);
    var validationUtility = applicationManager.getValidationUtilManager();
    validationUtility.createRegexForPasswordValidation(res.passwordrules);
    scope_SettingsPresenter.navigateToChangePassword();
  };
  Settings_PresentationController.prototype.getPasswordRulesAndPolicyErrorCallback = function(err){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (errRes["isServerUnreachable"]) {
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errRes);
    }
  };
  Settings_PresentationController.prototype.updateUserAddressData = function(userData){
    var userObj = applicationManager.getUserPreferencesManager();
    userObj.setuserAddressAttribute("addressLine1",(userData.addressLine1 && userData.addressLine1 !== "" && userData.addressLine1 !== null) ? userData.addressLine1 : "");
    userObj.setuserAddressAttribute("addressLine2", (userData.addressLine2 && userData.addressLine2 !== "" && userData.addressLine2 !== null) ? userData.addressLine2 : "");
    userObj.setuserAddressAttribute("state", (userData.state && userData.state !== "" && userData.state !== null) ? userData.state : "");
    userObj.setuserAddressAttribute("city",  (userData.city && userData.city !== "" && userData.city !== null) ? userData.city : "");
    userObj.setuserAddressAttribute("country",  (userData.country && userData.country !== "" && userData.country !== null) ? userData.country : "");
    userObj.setuserAddressAttribute("countryCode", (userData.countryId && userData.countryId !== "" && userData.countryId !== null)?userData.countryId:(userData.countryCode && userData.countryCode !== "" && userData.countryCode !== null)? userData.countryCode : "");
    userObj.setuserAddressAttribute("zipcode",  (userData.zipcode && userData.zipcode !== "" && userData.zipcode !== null) ? userData.zipcode : "");
  };
  Settings_PresentationController.prototype.updateUserAddressDataOnEdit = function(userData){
    var userObj = applicationManager.getUserPreferencesManager();
    userObj.setuserAddressAttribute("addressLine1", (userData.AddressLine1 && userData.AddressLine1 !== "" && userData.AddressLine1 !== null) ? userData.AddressLine1 : "");
    userObj.setuserAddressAttribute("addressLine2", (userData.AddressLine2 && userData.AddressLine2 !== "" && userData.AddressLine2 !== null) ? userData.AddressLine2 : "");
    userObj.setuserAddressAttribute("state", (userData.RegionName && userData.RegionName !== "" && userData.RegionName !== null) ? userData.RegionName : "");
    userObj.setuserAddressAttribute("city",  (userData.City_id && userData.City_id !== "" && userData.City_id !== null) ? userData.City_id : "");
    userObj.setuserAddressAttribute("cityName",  (userData.CityName && userData.CityName !== "" && userData.CityName !== null) ? userData.CityName : "");
    userObj.setuserAddressAttribute("country",   (userData.CountryName && userData.CountryName !== "" && userData.CountryName !== null) ? userData.CountryName : "");
    userObj.setuserAddressAttribute("zipcode",  (userData.ZipCode && userData.ZipCode !== "" && userData.ZipCode !== null) ? userData.ZipCode : "");
    userObj.setuserAddressAttribute("addressType",  (userData.AddressType && userData.AddressType !== "" && userData.AddressType !== null) ? userData.AddressType : "");
    //userObj.setuserAddressAttribute("isPreferredAddress", (userData.isPreferredAddress && userData.isPreferredAddress !== "" && userData.isPreferredAddress !== null) ? userData.isPreferredAddress : "");
    userObj.setuserAddressAttribute("isPreferredAddress", (userData.isPrimary && userData.isPrimary !== "" && userData.isPrimary !== null) ? userData.isPrimary : "");
    userObj.setuserAddressAttribute("addressId",  (userData && userData.Address_id && userData.Address_id !== "" && userData.Address_id !== null) ? userData.Address_id : "");
    userObj.setuserAddressAttribute("cityId",  (userData && userData.City_id && userData.City_id !== "" && userData.City_id !== null) ? userData.City_id : "");
    userObj.setuserAddressAttribute("countryCode",  (userData && userData.countryCode && userData.countryCode !== "" && userData.countryCode !== null)? userData.countryCode :(userData && userData.CountryCode && userData.CountryCode !== "" && userData.CountryCode !== null)?userData.CountryCode : "");
    userObj.setuserAddressAttribute("countryId",  (userData && userData.Country_id && userData.Country_id !== "" && userData.Country_id !== null) ? userData.Country_id : "");
    userObj.setuserAddressAttribute("regionCode",  (userData && userData.RegionCode && userData.RegionCode !== "" && userData.RegionCode !== null) ? userData.RegionCode : "");
    userObj.setuserAddressAttribute("stateId",  (userData && userData.Region_id && userData.Region_id !== "" && userData.Region_id !== null) ? userData.Region_id : "");
  };
  Settings_PresentationController.prototype.clearUserAddressData = function(){
    var userObj = applicationManager.getUserPreferencesManager();
    userObj.clearUserAddressData();
  };
  Settings_PresentationController.prototype.getUserAddressData = function(){
    var userObj = applicationManager.getUserPreferencesManager();
    return userObj.getuserAddressObject();
  };
  Settings_PresentationController.prototype.updateUserAddressTypeData = function(userData){
    var userObj = applicationManager.getUserPreferencesManager();
    userObj.setuserAddressAttribute("addressType",  (userData.addressType && userData.addressType !== "" && userData.addressType !== null) ? userData.addressType : "");
    userObj.setuserAddressAttribute("addressTypeForDisplay",  (userData.addressTypeForDisplay && userData.addressTypeForDisplay !== "" && userData.addressTypeForDisplay !== null) ? userData.addressTypeForDisplay : "");
  };
  Settings_PresentationController.prototype.updateUserPreferredAddressData = function(userData){
    var userObj = applicationManager.getUserPreferencesManager();
    //userObj.setuserAddressAttribute("isPreferredAddress",  (userData.isPreferredAddress && userData.isPreferredAddress !== "" && userData.isPreferredAddress !== null) ? userData.isPreferredAddress : "");
    userObj.setuserAddressAttribute("isPreferredAddress",  (userData.isPrimary && userData.isPrimary !== "" && userData.isPrimary !== null) ? userData.isPrimary : "");
  };
  Settings_PresentationController.prototype.updateUserAddressID = function(userData){
    var userObj = applicationManager.getUserPreferencesManager();
    userObj.setuserAddressAttribute("addressId",  (userData && userData.addressId && userData.addressId !== "" && userData.addressId !== null) ? userData.addressId : "");
  };
  Settings_PresentationController.prototype.updateUserAddressFlowType = function(userData){
    scope_SettingsPresenter.userAddressFlowtype =  userData;
  };
  Settings_PresentationController.prototype.getUserAddressFlowType = function(userData){
    return scope_SettingsPresenter.userAddressFlowtype;
  };
  Settings_PresentationController.prototype.setDataDefaultLogin = function(selectedAcntRow){
    if(selectedAcntRow === 0){
      var accountManager = applicationManager.getAccountManager();
      accountManager.fetchInternalAccounts(scope_SettingsPresenter.presentationAccountsSucc, scope_SettingsPresenter.presentationAccountsErr);
    }
    else if(selectedAcntRow === 1){
      var data = this.defaultAccounts();
      var navMan = applicationManager.getNavigationManager();
      navMan.setCustomInfo("frmSetDefaultAccount",data);
      navMan.navigateTo("frmSetDefaultAccount");
    }
  };
  Settings_PresentationController.prototype.onClickPaperlessCampaign = function(){
    var accountManager = applicationManager.getAccountManager();
    accountManager.fetchInternalAccounts(scope_SettingsPresenter.presentationAccountsSucc, scope_SettingsPresenter.presentationAccountsErr);

  };
  Settings_PresentationController.prototype.presentationAccountsSucc = function(res){
    let successRes = res.filter(item => (!(["CLOSED"].includes(item["accountStatus"].toUpperCase()))));
    var navMan = applicationManager.getNavigationManager();
    navMan.setCustomInfo("frmEStmtAccountPreferences",successRes);
     navMan.navigateTo({
            "appName": "ManageArrangementsMA",
            "friendlyName": "ManageArrangementsUIModule/frmEStmtAccountPreferences"
        });
  };
  Settings_PresentationController.prototype.presentationAccountsErr = function(errRes){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (errRes["isServerUnreachable"]) {
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errRes);
    }
  };
  Settings_PresentationController.prototype.setDataDefaultAccLogin = function(selectedAcntRow){
    var accountObj = applicationManager.getAccountManager();
    var navManager = applicationManager.getNavigationManager();
    var acctInfo;
    var configManager = applicationManager.getConfigurationManager();
    if (configManager.isFastTransfersFlowEnabled() === false){
      if(selectedAcntRow === 0){
        acctInfo = accountObj.getFromTransferSupportedAccounts();
        scope_SettingsPresenter.defaultAcc = "default_account_transfers";
      }
      else if(selectedAcntRow === 1){
        acctInfo = accountObj.getBillPaySupportedAccounts();
        scope_SettingsPresenter.defaultAcc = "default_account_billPay";
      }
      else if(selectedAcntRow === 2){
        acctInfo = accountObj.getFromTransferSupportedAccounts();
        scope_SettingsPresenter.defaultAcc = "default_account_payments";
      }
      else if(selectedAcntRow === 3){
        acctInfo = accountObj.getCardLessWithdrawlSupportedAccounts();
        scope_SettingsPresenter.defaultAcc = "default_account_cardless";
      }
      else if(selectedAcntRow === 4){
        acctInfo = accountObj.getDepositSupportedAccounts();
        scope_SettingsPresenter.defaultAcc = "default_account_deposit";
      }
    } else   {
      if(selectedAcntRow === 0){
        acctInfo = accountObj.getBillPaySupportedAccounts();
        scope_SettingsPresenter.defaultAcc = "default_account_billPay";
      }
      else if(selectedAcntRow === 1){
        acctInfo = accountObj.getCardLessWithdrawlSupportedAccounts();
        scope_SettingsPresenter.defaultAcc = "default_account_cardless";
      }
      else if(selectedAcntRow === 2){
        acctInfo = accountObj.getDepositSupportedAccounts();
        scope_SettingsPresenter.defaultAcc = "default_account_deposit";
      }
    }
    var tempData = navManager.getCustomInfo("frmPreferencesDefaultAccount");
    tempData[1] = acctInfo;
    navManager.setCustomInfo("frmPreferencesDefaultAccount",tempData);
    navManager.navigateTo("frmPreferencesDefaultAccount");
  };
  Settings_PresentationController.prototype.defaultAccountBack = function(accId){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var userObj = applicationManager.getUserPreferencesManager();
    var defaultAccString = scope_SettingsPresenter.defaultAcc;
    var dataJSON = {};
    dataJSON[scope_SettingsPresenter.defaultAcc] = accId;
    userObj.updateAccount(dataJSON,scope_SettingsPresenter.updateAccSuccess,scope_SettingsPresenter.updateAccFailure);
  };
  Settings_PresentationController.prototype.updateAccSuccess = function(success) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var userObj = applicationManager.getUserPreferencesManager();
    applicationManager.getPresentationUtility().showLoadingScreen();
    userObj.fetchUser(scope_SettingsPresenter.fetchUserSuccess,scope_SettingsPresenter.fetchUserFailure);
  };
  Settings_PresentationController.prototype.updateAccFailure = function(err) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (err["isServerUnreachable"]){
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    }
  };
  Settings_PresentationController.prototype.fetchUserSuccess = function(success){
    var currentForm = kony.application.getCurrentForm().id;
    if(currentForm === "frmProfilePersonalDetails"){
      var formController = applicationManager.getPresentationUtility().getController('frmProfilePersonalDetails',true);
    }else {
      scope_SettingsPresenter.getDevDetails();
      var navManager = applicationManager.getNavigationManager();
      var data = scope_SettingsPresenter.defaultAccounts();
      var defaultAccountChangei18NMsg= kony.i18n.getLocalizedString("konymb.settings.defaultAccountSettings");
      data.popUpMsg = (defaultAccountChangei18NMsg);
      navManager.setCustomInfo("frmSetDefaultAccount",data);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      navManager.navigateTo("frmSetDefaultAccount");
    }
  };
  Settings_PresentationController.prototype.fetchUserFailure = function(err) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (err["isServerUnreachable"]){
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    }
  };
  Settings_PresentationController.prototype.presentationUserImageSuccess = function(resSuccess){
    var userPreferencesManager = applicationManager.getUserPreferencesManager();
    userPreferencesManager.setUserImage(resSuccess.UserImage);
  };
  Settings_PresentationController.prototype.presentationUserImageError = function(err){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (err["isServerUnreachable"])
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
  };
  Settings_PresentationController.prototype.navigateToChangeUserName = function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var userObj = applicationManager.getUserPreferencesManager();
    var userName = userObj.getUserName();
    var userFirstName = userObj.getUserFirstName();
    var userLastName = userObj.getUserLastName();
    var fullName = userFirstName+" "+userLastName;
    var navigationManager = applicationManager.getNavigationManager();
    navigationManager.setCustomInfo('frmProfileChangeUsername',fullName);
    var data = navigationManager.getCustomInfo("frmProfileUsername");
    if(data && data!==null){
      data.userName = userName;
    }
    else{
      data = {"userName":userName};
    }
    navigationManager.setCustomInfo("frmProfileUsername",data);
    navigationManager.navigateTo('frmProfileUsername');
    //navigationManager.navigateTo('frmProfileChangeUsername');
  };
  Settings_PresentationController.prototype.updateUserName = function(newUserName){
    this.newUserName=newUserName;
    var validationUtility = applicationManager.getValidationUtilManager();
    var isValidUserName = validationUtility.isUsernameValidForPolicy(newUserName);
    var controller = applicationManager.getPresentationUtility().getController('frmProfileUsername',true);
    if(isValidUserName === false){
      var i18nMsg1 = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.OnBoarding.invalidusername", "Please enter a valid username");
      controller.bindViewError(i18nMsg1);
      controller.showFlxSecurityRequirementsUsername();
      return;
    }
    var userObj = applicationManager.getUserPreferencesManager();
    var oldUserName = userObj.getUserName();
    if(oldUserName === newUserName){
      var i18nMsg = applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.profile.usernameSame',"New username can't be same as current username");
      controller.bindViewError(i18nMsg);
      return;
    }
    applicationManager.getPresentationUtility().showLoadingScreen();
    controller.hideFlxRequirementsUsername();
    var userData = {"oldUserName":oldUserName,
                    "newUserName":newUserName,
                   };
    userObj.updateUserName(userData,scope_SettingsPresenter.updateUserNameSuccess,scope_SettingsPresenter.updateUserNameFailure);
  };
  Settings_PresentationController.prototype.updateUserNameSuccess = function(res){
    if(res.MFAAttributes && res.MFAAttributes.isMFARequired == "true"){
      var mfaJSON = {
        "flowType" : "UPDATE_USERNAME",
        "response" : res
      };
      applicationManager.getMFAManager().initMFAFlow(mfaJSON);
    }
    else
    {
      var userObj = applicationManager.getUserPreferencesManager();
      userObj.setCurrentUserName(this.newUserName);
      userObj.saveUserName(this.newUserName);
      var navManager = applicationManager.getNavigationManager();
      var loginData = navManager.getCustomInfo("frmLoginToast");
      if(loginData)
        loginData.postupdateusernameandpassword = applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.profile.changeUsername');
      else
        loginData = {"postupdateusernameandpassword": applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.Profile.changeUsername')};
      navManager.setCustomInfo("frmLoginToast",loginData);
      var authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
      authMod.presentationController.onLogout();
    }
  };
  Settings_PresentationController.prototype.updateUserNameFailure = function(err){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(err&&err["isServerUnreachable"]){
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
      return;
    }
    //var i18n_string = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.enroll.usernameUnavailableMsg");
    var controller = applicationManager.getPresentationUtility().getController('frmProfileUsername',true);
    scope_SettingsPresenter.navigateToChangeUserName();
    controller.bindViewError(err.errorMessage);
  };
  Settings_PresentationController.prototype.navigateToChangePassword = function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var userObj = applicationManager.getUserPreferencesManager();
    var userName = userObj.getUserName();
    var oldPassword = userObj.getPassword();
    var navManager = applicationManager.getNavigationManager();
    navManager.setCustomInfo('frmProfileChangePassword',userName);
    navManager.setCustomInfo('frmProfileChangeAndUpdatePassword',userName);
    navManager.navigateTo('frmProfileChangeAndUpdatePassword');
  };
  Settings_PresentationController.prototype.validatePassword = function(password){
    var validationUtility = applicationManager.getValidationUtilManager();
    //if(validationUtility.isValidPassword(password) === false){
    if(validationUtility.isPasswordValidForPolicy(password) === false){
      var formController = applicationManager.getPresentationUtility().getController('frmProfileChangeAndUpdatePassword',true);
      formController.showFlxSecurityRequirements();
    }
  };
  Settings_PresentationController.prototype.checkAndUpdatePassword = function(oldPassword,newPassword,reEnteredPassword){
    var formController = applicationManager.getPresentationUtility().getController('frmProfileChangeAndUpdatePassword',true);
    /*   if(password !== oldPassword){
       var i18nV = applicationManager.getPresentationUtility().getStringFromi18n('kony.profile.currentpasswordWrong');
       formController.bindViewError(i18nV);
       return;
     }*/
    var validationUtility = applicationManager.getValidationUtilManager();
    var isValidPassword = validationUtility.isPasswordValidForPolicy(newPassword);
    if(isValidPassword === false){
      var i18nV1 = applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.common.invalidPassword');
      formController.bindViewError(i18nV1);
      return;
    }
    if(newPassword !== reEnteredPassword){
      var i18nP = applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.enroll.passwordNotMatch');
      formController.bindViewError(i18nP);
      return;
    }
    applicationManager.getPresentationUtility().showLoadingScreen();
    var userManager = applicationManager.getUserPreferencesManager();
    var record = {
      "oldPassword":oldPassword,
      "newPassword":newPassword,
    };
    userManager.updateUserPassword(record,scope_SettingsPresenter.updatePasswordSuccess,scope_SettingsPresenter.updatePasswordFailure);
  };
  Settings_PresentationController.prototype.updatePasswordSuccess = function(res){
    if(res.MFAAttributes && res.MFAAttributes.isMFARequired == "true"){
      var mfaJSON = {
        "flowType" : "UPDATE_PASSWORD",
        "response" : res
      };
      applicationManager.getMFAManager().initMFAFlow(mfaJSON);
    }
    else
    {
      // //      applicationManager.getPresentationUtility().dismissLoadingScreen();
      // //      var nav = applicationManager.getNavigationManager();
      // //      nav.setCustomInfo('frmProfileChangeAndUpdatePassword','passwordUpdated');
      // //      nav.navigateTo('frmSettings');
      var navManager = applicationManager.getNavigationManager();
      var loginData = navManager.getCustomInfo("frmLoginToast");
      if(loginData)
        loginData.postupdateusernameandpassword = applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.profile.changePassword');
      else
        loginData = {"postupdateusernameandpassword": applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.Profile.changePassword')};
      navManager.setCustomInfo("frmLoginToast",loginData);
      var authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
      authMod.presentationController.passwordUpdateLogout();
    }
  };
  Settings_PresentationController.prototype.updatePasswordFailure = function(err){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    navManager.setCustomInfo('frmProfileChangeAndUpdatePassword',err);
    navManager.navigateTo('frmProfileChangeAndUpdatePassword');

    // applicationManager.getPresentationUtility().dismissLoadingScreen();
    // if(err&&err["isServerUnreachable"]){
    //   applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    //   return;
    // }
    // var formController = applicationManager.getPresentationUtility().getController('frmProfileChangeAndUpdatePassword',true);
    // if(err.errorMessage) {
    //   formController.bindViewError(err.errorMessage);
    // } else {
    //   var i18nStr = applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.enroll.SomethingWrong');
    //   formController.bindViewError(i18nStr);
    // }
  };
  Settings_PresentationController.prototype.getCountryCodes = function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var userPrefManager = applicationManager.getUserPreferencesManager();
    userPrefManager.getCountryCodes(scope_SettingsPresenter.getCountryCodesSuccess, scope_SettingsPresenter.getCountryCodesError);
  };
  Settings_PresentationController.prototype.getCountryCodesSuccess = function(data){
    scope_SettingsPresenter.commonFunctionForNavigation("frmProfileCountry");
    var controller = applicationManager.getPresentationUtility().getController('frmProfileCountry', true);
    controller.setFormUI(data.countrycode);
  };
  Settings_PresentationController.prototype.getCountryCodesError = function(err){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(err&&err["isServerUnreachable"]){
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
      return;
    }
  };
  Settings_PresentationController.prototype.navigateToProfilePersonalDetails = function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    //      var userObj = applicationManager.getUserPreferencesManager();
    //      var userDetails = userObj.getUserObj();
    // scope_SettingsPresenter.getUserAllPhoneNumbers();
    //      var navigationManager = applicationManager.getNavigationManager();
    //      navigationManager.navigateTo('frmProfilePersonalDetails');
    var userObj = applicationManager.getUserPreferencesManager();
    var data = userObj.getEntitlementPhoneNumbers();
    scope_SettingsPresenter.getUserAllPhoneNumbersSuccess(data);
    var addData = userObj.getEntitlementAddresses();
    scope_SettingsPresenter.getUserAllAddressesSuccess(addData);
    var navigationManager = applicationManager.getNavigationManager();
    navigationManager.navigateTo('frmProfilePersonalDetails');
  };
  Settings_PresentationController.prototype.setDataAfterProfileUpdate = function(){
    var userObj = applicationManager.getUserPreferencesManager();
    var PhoneData = userObj.getEntitlementPhoneNumbers();
    var addData = userObj.getEntitlementAddresses();
    scope_SettingsPresenter.getUserAllPhoneNumbersSuccess(PhoneData);
    scope_SettingsPresenter.getUserAllAddressesSuccess(addData);
  };
  Settings_PresentationController.prototype.navigateToProfileChangeLanguage = function(){
    var navigationManager = applicationManager.getNavigationManager();
    navigationManager.navigateTo('frmSettingsChangeLanguage');
  };
  Settings_PresentationController.prototype.getDevDetails = function(){
    var loginData = {};
    var navManager = applicationManager.getNavigationManager();
    var userObj = applicationManager.getUserPreferencesManager();
    var devManager = applicationManager.getDeviceUtilManager();
    loginData.accPreview = userObj.isAccountPreviewEnabled();
    loginData.deviceReg = userObj.isDeviceRegistered();
    loginData.defLoginMode = userObj.getDefaultAuthMode();
    loginData.pin = userObj.isAppLoginPinSet();
    loginData.faceId = userObj.isFacialAuthEnabled();
    loginData.isRememberMeOn = userObj.isRememberMeOn();
    //loginData.istouchIdAvail = devManager.isTouchIDSupported();
    //loginData.isFaceIdAvail = devManager.isFaceIDSupported();
    navManager.setCustomInfo("frmSettings", loginData);
  };
  Settings_PresentationController.prototype.getAuthModeData = function()
  {
    var authMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
    return authMode.presentationController.getAuthFlags();
  };
  Settings_PresentationController.prototype.acctPreviewBack = function(Status){
    var userObj = applicationManager.getUserPreferencesManager();
    var navManager = applicationManager.getNavigationManager();
    var accStatus;
    if(Status === true){
      accStatus = "On";
    }
    else{
      accStatus = "Off";
    }
    var controller = applicationManager.getPresentationUtility().getController('frmSettings', true);
    userObj.updateAccountPreviewFlag(Status);
    controller.updateSegmentData("Account Preview",accStatus);
    navManager.navigateTo("frmSettings");
  };
  Settings_PresentationController.prototype.getUserAllPhoneNumbers = function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var userObj = applicationManager.getUserPreferencesManager();
    userObj.fetchAllPhoneNumbers(scope_SettingsPresenter.getUserAllPhoneNumbersSuccess,scope_SettingsPresenter.getUserAllPhoneNumbersFailure);
  };
  Settings_PresentationController.prototype.getUserAllPhoneNumbersSuccess = function(data){
    var result = [];
    for(var i =0;i<data.length;i++){
      var temp = {};
      //var name = data[i].type;
      var name = data[i].Extension===undefined?"Mobile":data[i].Extension;
      if(data[i].isPrimary === "true"){
        name += ' (Marked as Primary)';
      }
      else if(data[i].countryType && data[i].countryType.toLowerCase() === 'international'){
        name += '(International)';
      }
      temp.lblDetail = name;
      //temp.lblDetailValue = data[i].phoneNumber;
      temp.lblDetailValue = data[i].Value;
      temp.template = 'flxDetails';
      result.push(temp);
    }
    var result1 = [];
    if(result.length > 0){
      var temp1 = {};
      temp1.lblHeader = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.ProfilePersonalDetails.RegisteredPhoneNumbers");
      temp1.template = 'flxDetailsHeader';
      result1.push(temp1);
      result1.push(result);
    }
    var dobssn = [];
    var userObj = applicationManager.getUserPreferencesManager();
    var dob = userObj.getUserDOB();
    dob = dob.substring(0,10);
    var forUtility=applicationManager.getFormatUtilManager();
    var dateobj=forUtility.getDateObjectfromString(dob,"YYYY-MM-DD");
    dob = forUtility.getFormatedDateString(dateobj,forUtility.getApplicationDateFormat());
    var ssn = applicationManager.getDataProcessorUtility().maskAccountNumber(userObj.getSSN());
    var email = userObj.getEntitlementEmailIds();
    var temp2 = {};
    temp2.lblDetail = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.EnrollDOB.Title");
    temp2.lblDetailValue =  dob;
    temp2.template = "flxDetails";
    var temp3 = {
      "lblDetail": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Forgot.EnterSSNTitle"),
      "lblDetailValue": ssn,
      "flxSeparator": {"isVisible" : false},
      "template" : "flxDetails"
    };
    dobssn.push(temp2);
    dobssn.push(temp3);
    var answer = [];
    answer.push({});
    answer.push(dobssn);
    var segmentData = [];
    segmentData.push(answer);
    if(result1.length > 0)
      segmentData.push(result1);
    var emails = [];
    var header = {
      "lblHeader": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Profile.RegisteredEmailIDs"),
      "template" : "flxDetailsHeader"
    };
    emails.push(header);
    var emailData =[];
    var rowData = {};
    for (var i = 0; i < email.length; i++) {
      if (email[i].isPrimary === "true") {
        rowData = {
          "lblDetail": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.ProfilePersonalDetails.PrimaryEmailID"),
          "lblDetailValue": email[i].Value,
          "template": "flxDetails"
        }
        emailData.push(rowData);
      }
      else {
        rowData = {
          "lblDetail": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Profile.SecondaryEmailID"),
          "lblDetailValue": email[i].Value,
          "template": "flxDetails"
        }
        emailData.push(rowData);
      }
    }
    emails.push(emailData);
    if(emails.length > 1 && emailData.length > 0)
      segmentData.push(emails);
    scope_SettingsPresenter.segmentProfileData = segmentData;
    applicationManager.getPresentationUtility().dismissLoadingScreen();     //scope_SettingsPresenter.getUserAllAddresses();
    var userObj = applicationManager.getUserPreferencesManager();
    //      var data = userObj.getEntitlementAddresses();
    //      scope_SettingsPresenter.getUserAllAddressesSuccess(data);
  };
  Settings_PresentationController.prototype.getUserAllPhoneNumbersFailure = function(err){
    kony.print(JSON.stringify(err));
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(err && err["isServerUnreachable"]){
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    }
  };
  Settings_PresentationController.prototype.getUserAllAddresses = function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var userObj = applicationManager.getUserPreferencesManager();
    userObj.fetchUserAllAddresses(scope_SettingsPresenter.getUserAllAddressesSuccess,scope_SettingsPresenter.getUserAllAddressesFailure);
  };
  Settings_PresentationController.prototype.getUserAllAddressesSuccess = function(data){
    var addressArray = [];
    var header = {
      "lblHeader": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.ProfilePersonalDetails.RegisteredAddress"),
      "template" : "flxDetailsHeader"
    };
    var addressSegData = [];
    for(var i =0;i<data.length;i++){
      var type = this.AddressTypes[data[i].AddressType];
      if (data[i].isPrimary === "true") {
        type = type + "(Marked as communicating address)";
      }
      var addr = "";
      if(data[i].AddressLine1 !== undefined && data[i].AddressLine1 !== "")
        addr = data[i].AddressLine1+", ";
      if(data[i].AddressLine2 !== undefined && data[i].AddressLine2 !== "")
      {
        addr = addr+data[i].AddressLine2+", ";
      }
      if(data[i].City_id !== undefined && data[i].City_id !== "")
      {
        addr = addr+data[i].City_id+", ";
      }
      if(data[i].RegionName !== undefined && data[i].ZiRegionNamepCode !== "")
      {
        addr = addr+data[i].RegionName+", ";
      }
      if(data[i].CountryName !== undefined && data[i].CountryName !== "")  
      {
        addr = addr+data[i].CountryName+", ";
      }
      if(data[i].ZipCode !== undefined && data[i].ZipCode !== "")
      {
        addr = addr+data[i].ZipCode;
      }
      var row = {
        "lblDetail": type,
        "lblDetailValue": addr,
        "template" : "flxDetails"
      };
      addressSegData.push(row);
    }
    addressArray.push(header);
    addressArray.push(addressSegData);
    var segmentData = scope_SettingsPresenter.segmentProfileData;
    if(addressArray.length > 1 && addressSegData.length > 0)
      segmentData.push(addressArray);
    var navigationManager = applicationManager.getNavigationManager();
    navigationManager.setCustomInfo('frmProfilePersonalDetails',segmentData);
    var userObj = applicationManager.getUserPreferencesManager();
    var userFirstName = userObj.getUserFirstName();
    var userLastName = userObj.getUserLastName();
    navigationManager.setCustomInfo('frmProfilePersonalDetails1',userFirstName+" "+userLastName);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
  Settings_PresentationController.prototype.getUserAllAddressesFailure = function(err){
    kony.print(JSON.stringify(err));
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(err && err["isServerUnreachable"]){
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    }     var navigationManager = applicationManager.getNavigationManager();
    navigationManager.navigateTo('frmProfilePersonalDetails');
  };
  Settings_PresentationController.prototype.navigateToAddOrEditEmail = function(flow){
    try{
      applicationManager.getPresentationUtility().showLoadingScreen();
      var userObj = applicationManager.getUserPreferencesManager();
      var email = userObj.getEntitlementEmailIds();
      var configManager = applicationManager.getConfigurationManager();
      if(configManager.isRBUser === "true" || configManager. isSMEUser === "true"){
        var data = [];
        var rowData = {};
        for (var i = 0; i < email.length; i++) {
          if (email[i].isPrimary === "true") {
            rowData = {
              "lblDetail": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.ProfilePersonalDetails.PrimaryEmailID"),
              "lblDetailValue": email[i].Value,
              "isPrimary": email[i].isPrimary,
              "id":email[i].id,
              "template" : "flxMain"
            }
            data.push(rowData);
          }
          else {
            rowData = {
              "lblDetail": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Profile.SecondaryEmailID"),
              "lblDetailValue": email[i].Value,
              "isPrimary": email[i].isPrimary,
              "id":email[i].id,
              "template" : "flxMain"
            }
            data.push(rowData);
          }
        }
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo('frmProfileEditEmails',data);
        navManager.setCustomInfo('frmProfileEnterEmailID',flow);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        navManager.navigateTo('frmProfileEditEmails');
      }else{
        //       var userObj = applicationManager.getUserPreferencesManager();
        //       var phoneNumbers = userObj.getEntitlementPhoneNumbers();
        var viewController = applicationManager.getPresentationUtility().getController('frmProfileEditEmails', true);
        var rowData = [];
         orgAccounts = {
           "Personal Banking Email Detail": [],
          "Business Banking Email Detail": []
        };
        for (var i = 0; i < email.length; i++) {
          if (email[i].isTypeBusiness === "1") {
            orgAccounts["Business Banking Email Detail"].push(email[i]);
          } else {
            orgAccounts["Personal Banking Email Detail"].push(email[i]);
          }
        }
        for (var key in orgAccounts) {
          var headerJson = {
            "template": "flxApprovalReqExpColHeader",
            "flxImgUp": {"isVisible": false},
            "lblHeader": {"text": key }
          };
          rowArray=[];
          for(var i=0;i<orgAccounts[key].length;i++){
            var type = orgAccounts[key][i].Extension;
            if (orgAccounts[key][i].isPrimary === "true") {
              type = type + "(Marked as Primary)";
            } else if (orgAccounts[key][i].countryType && orgAccounts[key][i].countryType.toLowerCase() === "international") {
              type = type + "(International)";
            }else if(orgAccounts[key][i].isPrimary === "false" && type===""){
              type = type + "Personal";
            }else if(orgAccounts[key][i].isTypeBusiness==="0" && kony.sdk.isNullOrUndefined(type)){
              type ="Personal";
            }
            if(orgAccounts[key][i].isTypeBusiness==="1" && kony.sdk.isNullOrUndefined(type)){
              type ="Business";
            }
            var rowJson={
              "id" : orgAccounts[key][i].id,
              "lblDetail" : type,
              "lblDetailValue" : orgAccounts[key][i].Value,
              "isPrimary" : orgAccounts[key][i].isPrimary,
              "template" : "flxMain",
              "flxDelete":{ onClick:viewController.onDeleteSwape},
              "isTypeBusiness" :kony.sdk.isNullOrUndefined(orgAccounts[key][i].isTypeBusiness) ? "0" : orgAccounts[key][i].isTypeBusiness
            };
            rowArray.push(rowJson);
          }
          if(rowArray.length!==0)
          {
            rowData.push([headerJson, rowArray]);
          }
        }
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo('frmProfileEditEmails',rowData);
        navManager.setCustomInfo('frmProfileEnterEmailID',flow);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        navManager.navigateTo('frmProfileEditEmails');
      }
      //var secondaryEmail = userObj.getUserObj().secondaryemail;
      //var secondaryEmail2 = userObj.getUserObj().secondaryemail2;
    }catch(er){
      kony.print("error--->"+er);
    }
  };
  Settings_PresentationController.prototype.navigateToEditPhoneNumber = function(info){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var configManager = applicationManager.getConfigurationManager();
    if(configManager.isRBUser === "true" || configManager. isSMEUser === "true"){
      var userObj = applicationManager.getUserPreferencesManager();
      //var phoneNumbers = userObj.getUserAllPhoneNumbers();
      var phoneNumbers = userObj.getEntitlementPhoneNumbers();
      var data = [];
      for(var i=0;i<phoneNumbers.length;i++){
        var temp ={};
        //var type = phoneNumbers[i].type;
        var type = phoneNumbers[i].Extension===undefined?"":phoneNumbers[i].Extension;
        if(phoneNumbers[i].isPrimary === "true"){
          type = type + "(Marked as Primary)";
        }else if(phoneNumbers[i].countryType && phoneNumbers[i].countryType.toLowerCase() === "international"){
          type = type + "(International)";
        }
        temp.id = phoneNumbers[i].id;
        temp.lblDetail = type;
        //temp.lblDetailValue = phoneNumbers[i].phoneNumber;
        temp.lblDetailValue = phoneNumbers[i].Value;
        temp.isPrimary = phoneNumbers[i].isPrimary;
        temp.template = "flxMain";
        data.push(temp);
      }
      var customData = {};
      customData.data = data;
      if(info !== undefined && info !== null)
        customData.context = info.flow;
      var nav = applicationManager.getNavigationManager();
      nav.setCustomInfo('frmProfileEditPhoneNumbers',customData);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      nav.setCustomInfo('frmProfileEditPhoneNumberMain',info.flow)
      nav.navigateTo('frmProfileEditPhoneNumbers');
    }else {
      var viewController = applicationManager.getPresentationUtility().getController('frmProfileEditPhoneNumbers', true);
      var userObj = applicationManager.getUserPreferencesManager();
      var phoneNumbers = userObj.getEntitlementPhoneNumbers();
      var rowData = [];
      orgAccounts = {
        "Personal Banking Phone Number Detail": [],
        "Business Banking Phone Number Detail": []
      };
      for (var i = 0; i < phoneNumbers.length; i++) {
        if (phoneNumbers[i].isTypeBusiness === "1") {
          orgAccounts["Business Banking Phone Number Detail"].push(phoneNumbers[i]);
        } else {
          orgAccounts["Personal Banking Phone Number Detail"].push(phoneNumbers[i]);
        }
      }
      for (var key in orgAccounts) {
         var headerJson = {
            "template": "flxApprovalReqExpColHeader",
            "flxImgUp": {"isVisible": false},
            "lblHeader": {"text": key }
          };
        rowArray=[];
        for(var i=0;i<orgAccounts[key].length;i++){
          var type = orgAccounts[key][i].Extension;
          if (orgAccounts[key][i].isPrimary === "true") {
            type = type + "(Marked as Primary)";
          } else if (orgAccounts[key][i].countryType && orgAccounts[key][i].countryType.toLowerCase() === "international") {
            type = type + "(International)";
          }
          var rowJson={
            "id" : orgAccounts[key][i].id,
            "lblDetail" : type,
            "lblDetailValue" : orgAccounts[key][i].Value,
            "isPrimary" : orgAccounts[key][i].isPrimary,
            "template" : "flxMain",
            "flxDelete":{ onClick:viewController.onDeleteSwape},
            "isTypeBusiness" :kony.sdk.isNullOrUndefined(orgAccounts[key][i].isTypeBusiness) ? "0" : orgAccounts[key][i].isTypeBusiness
          };
          rowArray.push(rowJson);
        }
        if(rowArray.length!==0)
        {
          rowData.push([headerJson, rowArray]);
        }
      }

      var customData = {};
      customData = rowData;
      if (info !== undefined && info !== null) customData.context = info.flow;
      var nav = applicationManager.getNavigationManager();
      nav.setCustomInfo('frmProfileEditPhoneNumbers', rowData);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      nav.setCustomInfo('frmProfileEditPhoneNumberMain', info.flow)
      nav.navigateTo('frmProfileEditPhoneNumbers');
    }
  };
  Settings_PresentationController.prototype.navigateToEditOrAddAddress = function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var userObj = applicationManager.getUserPreferencesManager();
    var addressObj = userObj.getEntitlementAddresses();
    var result = [];
    for(var i =0;i<addressObj.length;i++){
      var type = this.AddressTypes[addressObj[i].AddressType];
      if (addressObj[i].isPrimary === "true") {
        type = type + "(Marked as communicating address)";
      }

      var details = addressObj[i].AddressLine1;
      if(addressObj[i].AddressLine2)
        details = details +","+addressObj[i].AddressLine2;
      if(addressObj[i].City_id)
        details = details+","+addressObj[i].City_id;
      if(addressObj[i].RegionName)
        details = details+ ", " + addressObj[i].RegionName;
      if(addressObj[i].CountryName)
        details = details+","+addressObj[i].CountryName;
      var temp = {
        "imgDelete": {"src" : "deleteicon.png"},
        "lblDelete": "Delete",
        "lblDetail": type,
        "lblDetailValue": details,
        "template" : "flxAddress",
        "addressId" : addressObj[i].Address_id,
        "isPrimary" : addressObj[i].isPrimary
      };
      result.push(temp);
    }
    var navManager = applicationManager.getNavigationManager();
    navManager.setCustomInfo('frmProfileEditAddressList', result);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    navManager.navigateTo('frmProfileEditAddressList');
  };
  Settings_PresentationController.prototype.naviagteToProfileEditPhoneNumber = function(index){
    var userObj = applicationManager.getUserPreferencesManager();
    //var phoneNumbers = userObj.getUserAllPhoneNumbers();
    var phoneNumbers = userObj.getEntitlementPhoneNumbers();
    var selectedPhone = phoneNumbers[index];
    var navManager = applicationManager.getNavigationManager();
    var jsonV = {};
    jsonV.data = selectedPhone;
    jsonV.flow = "edit";
    navManager.setCustomInfo('frmProfileEditPhoneNumberMain',jsonV);
    navManager.navigateTo('frmProfileEditPhoneNumberMain');
  };
  Settings_PresentationController.prototype.updateUserPhoneNumber = function(data){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var userObj = applicationManager.getUserPreferencesManager();
    var phoneNumbers = [{
      "id": data.id,
      "Extension": data.Extension===undefined?"Mobile":data.Extension,
      "isPrimary": (data.isPrimary === "true") ? "1" : "0",
      "phoneNumber": data.phoneNumber,
      "phoneCountryCode":data.phoneCountryCode,
      "countryType":data.countryType
    }];
    phoneNumbers = JSON.stringify(phoneNumbers);
    phoneNumbers = phoneNumbers.replace(/"/g, "'");
    var params = {
      "phoneNumbers": phoneNumbers,
      "userName": userObj.getCurrentUserName(),
      "modifiedByName": userObj.getCurrentUserName()
    };
    userObj.updateUserProfileDetails(params,scope_SettingsPresenter.updateUserPhoneNumberSuccess, scope_SettingsPresenter.updateUserPhoneNumberFailure);
  };
  Settings_PresentationController.prototype.updateUserPhoneNumberSuccess = function(data){
    if(data.MFAAttributes && data.MFAAttributes.isMFARequired == "true"){
      const mfaManager = applicationManager.getMFAManager();
      const mfaJSON = {
        "flowType" : "UPDATE_PHONE_NUMBER",
        "response" : data,
        "objectServiceDetails": {
          "serviceName": "RBObjects",
          "dataModel": "User",
          "operationName": "updateCustomerDetails"
        }
      };
      mfaManager.initMFAFlow(mfaJSON);
    } else {
      scope_SettingsPresenter.updateUserResponse(success,failure);
      function success(data){
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        scope_SettingsPresenter.navigateToEditPhoneNumber({"flow":"editsuccess"});
        scope_SettingsPresenter.setDataAfterProfileUpdate();
      }
      function failure(error) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
    }
  };
  Settings_PresentationController.prototype.updateUserPhoneNumberFailure = function(err){
    kony.print(JSON.stringify(err));
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(err && err["isServerUnreachable"]){
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    }else{
      var controller = applicationManager.getPresentationUtility().getController('frmProfileEditPhoneNumbers', true);
     scope_SettingsPresenter.navigateToEditPhoneNumber({
              "flow": ""
          });
    controller.bindViewError(err.errorMessage);
  }
  };
  Settings_PresentationController.prototype.refreshPersonalDetailsData = function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var userObj = applicationManager.getUserPreferencesManager();
    //var phoneData = userObj.getUserAllPhoneNumbers();
    var phoneData = userObj.getEntitlementPhoneNumbers();
    var data = phoneData;
    var result = [];
    for(var i =0;i<data.length;i++){
      var temp = {};
      //var name = data[i].type;
      var name = data[i].Extension===undefined?"Mobile":data[i].Extension;
      if(data[i].isPrimary === "true"){
        name += ' (Marked as Primary)';
      }
      else if(data[i].countryType && data[i].countryType.toLowerCase() === 'international'){
        name += '(International)';
      }
      temp.lblDetail = name;
      //temp.lblDetailValue = data[i].phoneNumber;
      temp.lblDetailValue = data[i].Value;
      temp.template = 'flxDetails';
      result.push(temp);
    }
    var result1 = [];
    if(result.length > 0){
      var temp1 = {};
      temp1.lblHeader = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.ProfilePersonalDetails.RegisteredPhoneNumbers");
      temp1.template = 'flxDetailsHeader';
      result1.push(temp1);
      result1.push(result);
    }
    var dobssn = [];
    var dob = userObj.getUserDOB();
    dob = dob.substring(0,10);
    var forUtility=applicationManager.getFormatUtilManager();
    var dateobj=forUtility.getDateObjectfromString(dob,"YYYY-MM-DD");
    dob = forUtility.getFormatedDateString(dateobj,forUtility.getApplicationDateFormat());
    var ssn = applicationManager.getDataProcessorUtility().maskAccountNumber(userObj.getSSN());
    var email = userObj.getUserEmail();
    var secondaryEmail = userObj.getUserObj().secondaryemail;
    var secondaryEmail2 = userObj.getUserObj().secondaryemail2;
    var temp2 = {};
    temp2.lblDetail = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.EnrollDOB.Title");
    temp2.lblDetailValue =  dob;
    temp2.template = "flxDetails";
    var temp3 = {
      "lblDetail": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Forgot.EnterSSNTitle"),
      "lblDetailValue": ssn,
      "flxSeparator": {"isVisible" : false},
      "template" : "flxDetails"
    };
    dobssn.push(temp2);
    dobssn.push(temp3);
    var answer = [];
    answer.push({});
    answer.push(dobssn);
    var segmentData = [];
    segmentData.push(answer);
    if(result1.length > 0)
      segmentData.push(result1);
    var emails = [];
    var header = {
      "lblHeader": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Profile.RegisteredEmailIDs"),
      "template" : "flxDetailsHeader"
    };
    emails.push(header);
    var emailData =[];
    var rowData = {
      "lblDetail": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.ProfilePersonalDetails.PrimaryEmailID"),
      "lblDetailValue": email,
      "template" : "flxDetails"
    };
    var rowData1 = {
      "lblDetail": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Profile.SecondaryEmailID"),
      "lblDetailValue": secondaryEmail,
      "template" : "flxDetails"
    };
    var rowData2 = {
      "lblDetail": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Profile.SecondaryEmailID2"),
      "lblDetailValue": secondaryEmail2,
      "flxSeparator": {"isVisible" : false},
      "template" : "flxDetails"
    };
    if(email){
      emailData.push(rowData);
    }
    if(secondaryEmail){
      emailData.push(rowData1);
    }
    if(secondaryEmail2){
      emailData.push(rowData2);
    }
    emails.push(emailData);
    if(emails.length > 1 && emailData.length > 0)
      segmentData.push(emails);
    var addressData = userObj.getEntitlementAddresses();
    data  = addressData;
    var addressArray = [];
    var header = {
      "lblHeader": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.ProfilePersonalDetails.RegisteredAddress"),
      "template" : "flxDetailsHeader"
    };
    var addressSegData = [];
    for(var i =0;i<data.length;i++){
      var type = this.AddressTypes[data[i].AddressType];
      if(data[i].isPrimary === "true"){
        type = type + "(Marked as communicating address)";
      }
      var addr = "";
      if(data[i].AddressLine1 !== undefined && data[i].AddressLine1 !== "")
        addr = data[i].AddressLine1+", ";
      if(data[i].AddressLine2 !== undefined && data[i].AddressLine2 !== "")
      {
        addr = addr+data[i].AddressLine2+", ";
      }
      if(data[i].City_id !== undefined && data[i].City_id !== "")
      {
        addr = addr+data[i].City_id+", ";
      }
      if(data[i].RegionName !== undefined && data[i].ZiRegionNamepCode !== "")
      {
        addr = addr+data[i].RegionName+", ";
      }
      if(data[i].CountryName !== undefined && data[i].CountryName !== "")  
      {
        addr = addr+data[i].CountryName+", ";
      }
      if(data[i].ZipCode !== undefined && data[i].ZipCode !== "")
      {
        addr = addr+data[i].ZipCode;
      }
      var row = {
        "lblDetail": type.charAt(0).toUpperCase()+type.slice(1),
        "lblDetailValue": addr,
        "template" : "flxDetails"
      };
      addressSegData.push(row);
    }
    addressArray.push(header);
    addressArray.push(addressSegData);
    if(addressArray.length > 1 && addressSegData.length > 0)
      segmentData.push(addressArray);
    var navigationManager = applicationManager.getNavigationManager();
    navigationManager.setCustomInfo('frmProfilePersonalDetails',segmentData);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
  Settings_PresentationController.prototype.createOrUpdatePhoneBuilderObject = function(key,value){
    if(scope_SettingsPresenter.phoneBuilderObject === null || scope_SettingsPresenter.phoneBuilderObject === undefined){
      scope_SettingsPresenter.phoneBuilderObject = {};
    }
    scope_SettingsPresenter.phoneBuilderObject[key] = value;
  };
  Settings_PresentationController.prototype.getPhoneBuilderObject = function(){
    return scope_SettingsPresenter.phoneBuilderObject;
  };
  Settings_PresentationController.prototype.navigateToProfileContactType = function(){
    var navigationManager = applicationManager.getNavigationManager();
    navigationManager.setCustomInfo("frmProfileContactType","add");
    navigationManager.navigateTo("frmProfileContactType");
  };
  Settings_PresentationController.prototype.addUserPhoneNumber = function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var obj = scope_SettingsPresenter.getPhoneBuilderObject();
    var phoneNumbers = [{
      "isPrimary": (obj.isPrimary === "true") ? "1" : "0",
      "phoneNumber": obj.phoneNumber,
      "phoneCountryCode":obj.phoneCountryCode,
      "phoneExtension":obj.phoneExtension,
      "Extension": obj.type
    }];
    phoneNumbers = JSON.stringify(phoneNumbers);
    phoneNumbers = phoneNumbers.replace(/"/g, "'");
    var params = {
      "phoneNumbers": phoneNumbers,
      "userName": applicationManager.getUserPreferencesManager().getCurrentUserName(),
      "modifiedByName": applicationManager.getUserPreferencesManager().getCurrentUserName()
    };
    applicationManager.getUserPreferencesManager().updateUserProfileDetails(params, scope_SettingsPresenter.addUserPhoneNumberSuccess,scope_SettingsPresenter.addUserPhoneNumberFailure);
  };
  Settings_PresentationController.prototype.addUserPhoneNumberSuccess = function(data){
    if(data.MFAAttributes && data.MFAAttributes.isMFARequired == "true"){
      const mfaManager = applicationManager.getMFAManager();
      const mfaJSON = {
        "flowType" : "ADD_PHONE_NUMBER",
        "response" : data,
        "objectServiceDetails": {
          "serviceName": "RBObjects",
          "dataModel": "User",
          "operationName": "updateCustomerDetails"
        }
      };
      mfaManager.initMFAFlow(mfaJSON);
    } else {
      scope_SettingsPresenter.updateUserResponse(success,failure);
      function success(data){
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        scope_SettingsPresenter.navigateToEditPhoneNumber({"flow":"addsuccess"});
        scope_SettingsPresenter.setDataAfterProfileUpdate();
      }
      function failure(err){
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if(err && err["isServerUnreachable"]){
          applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
        }
      }
    }
  };
  Settings_PresentationController.prototype.addUserPhoneNumberFailure = function(err){
    kony.print(JSON.stringify(err));
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(err && err["isServerUnreachable"]){
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    }else{
      var controller = applicationManager.getPresentationUtility().getController('frmProfileEditPhoneNumbers', true);
     scope_SettingsPresenter.navigateToEditPhoneNumber({
              "flow": ""
          });
    controller.bindViewError(err.errorMessage);
  }
  };
  Settings_PresentationController.prototype.navigateToAddPhoneNumberConfirmPage = function(){
    var obj = scope_SettingsPresenter.getPhoneBuilderObject();
    var nav = applicationManager.getNavigationManager();
    nav.setCustomInfo('frmProfileConfirmDetails',obj);
    nav.navigateTo('frmProfileConfirmDetails');
  };
  Settings_PresentationController.prototype.updateDeviceRegistration = function(){
    var registrationManager = applicationManager.getRegistrationManager();
    var deviceUtilManager = applicationManager.getDeviceUtilManager();
    var record = {
      "deviceId": deviceUtilManager.getDeviceInfo().deviceID
    };
    registrationManager.updateDeviceRegistrationStatus(record, this.presentationDeviceSuccess, this.presentationDeviceError);
  };
  Settings_PresentationController.prototype.showSettings = function()
  {
    scope_SettingsPresenter.getDevDetails();
    var navObj = applicationManager.getNavigationManager();
    var keys = navObj.getCustomInfo("frmSettings");
    keys.popUpMsg = "";
    navObj.setCustomInfo("frmSettings",keys);
    navObj.navigateTo({"appName" : "AlertSettingsMA", "friendlyName" : "SettingsAlertsUIModule/frmSettings"});
    //navObj.navigateTo("frmSettings");
  };
  Settings_PresentationController.prototype.presentationDeviceSuccess = function(success){
    var userObj = applicationManager.getUserPreferencesManager();
    var navManager = applicationManager.getNavigationManager();
    userObj.updateDeviceRegisterFlag(true);
    scope_SettingsPresenter.getDevDetails();
    var keys = navManager.getCustomInfo("frmSettings");
    keys.popUpMsg = kony.i18n.getLocalizedString("kony.mb.Device.Registration.Successful");
    navManager.setCustomInfo("frmSettings",keys);
    navManager.navigateTo("frmSettings");
  };
  Settings_PresentationController.prototype.presentationDeviceError = function(err){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (err["isServerUnreachable"]) {
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    }
    else
    {
      if(!kony.sdk.isNullOrUndefined(err.errorMessage))
      {
        alert(err.errorMessage);
      }
    }
  };
  Settings_PresentationController.prototype.deRegisterDevice = function(formContext){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var registrationManager = applicationManager.getRegistrationManager();
    var deviceUtilManager = applicationManager.getDeviceUtilManager();
    var record = {
      "deviceId": deviceUtilManager.getDeviceInfo().deviceID
    };
    registrationManager.deleteRegisteredDevice(record,this.deleteRegSuccess.bind(this, formContext),this.deleteRegError.bind(this, formContext));
  };
  Settings_PresentationController.prototype.deleteRegSuccess = function(formContext, success){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
    var userObj = applicationManager.getUserPreferencesManager();
    userObj.updateAccountPreviewFlag(false);
    userObj.setDefaultAuthMode("password");
    authMod.presentationController.onLogout();
  };
  Settings_PresentationController.prototype.deleteRegError = function(error){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (error["isServerUnreachable"])
    {
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
    }
    else
      alert(error.errorMessage);
  };
  Settings_PresentationController.prototype.setPinAsDefault = function(){
    var userObj = applicationManager.getUserPreferencesManager();
    var navManager = applicationManager.getNavigationManager();
    var defaultAuth = "pin";
    userObj.setDefaultAuthMode(defaultAuth);
    var controller = applicationManager.getPresentationUtility().getController('frmPreferencesPin', true);
    controller.bindViewSuccess(kony.i18n.getLocalizedString("kony.mb.PIN.has.been.selected.as.default.login"));
    navManager.navigateTo("frmSettings");
  };
  Settings_PresentationController.prototype.verifyCurrPin = function(pin){
    var userObj = applicationManager.getUserPreferencesManager();
    if(userObj.verifyAppLoginPin(pin)){
      this.verifyPinSuccess({"result":"true"});
    } else {
      this.verifyPinSuccess({"result":"false"});
    }
    //userObj.verifyExistingPin(pin,this.verifyPinSuccess,this.verifyPinFailure);
  };
  Settings_PresentationController.prototype.verifyPinSuccess = function(success){
    if(success.result == "true"){
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo("frmPreferencesResetStep2");
    }
    else{
      var controller = applicationManager.getPresentationUtility().getController('frmPreferencesResetStep1', true);
      controller.clearKeyPadString();
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var controller = applicationManager.getPresentationUtility().getController('frmPreferencesResetStep1', true);
      controller.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Enter.Correct.Pin"));
    }
  };
  Settings_PresentationController.prototype.verifyPinFailure = function(error){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (error["isServerUnreachable"])
    {
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
    }
    else
      alert(error.errorMessage);
  };
  Settings_PresentationController.prototype.updatePin = function(pin){
    var userObj = applicationManager.getUserPreferencesManager();
    userObj.setAppLoginPin(pin);
    this.updatePinSuccess({});
    //userObj.createPin(pin,this.updatePinSuccess,this.updatePinError);
  };
  Settings_PresentationController.prototype.updatePinSuccess= function(success){
    //  applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,kony.i18n.getLocalizedString("kony.mb.Please.enter.a.update.pin"));
    var navManager = applicationManager.getNavigationManager();
    var msgData = {popUpMsg:"Sign in PIN has been changed successfully."/*"Login Pin has been changed successfully."*/};
    navManager.setCustomInfo("frmPreferencesPin",msgData) ;
    navManager.navigateTo("frmPreferencesPin");
  };
  Settings_PresentationController.prototype.updatePinError= function(error){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (error["isServerUnreachable"])
    {
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
    }
    else
      alert(error.errorMessage);
  };
  Settings_PresentationController.prototype.addressSearch = function(searchText){
    var locationManager = applicationManager.getLocationManager();
    if(scope_SettingsPresenter.currLatitude && scope_SettingsPresenter.currLongitude){
      searchText.currLongitude = scope_SettingsPresenter.currLongitude;
      searchText.currLatitude = scope_SettingsPresenter.currLatitude;
      locationManager.fetchAddressSuggestions(searchText,scope_SettingsPresenter.addressSearchPresentationSuccessCallback, scope_SettingsPresenter.addressSearchPresentationErrorCallback);
    }
    else{
      var positionoptions = {
        timeout: 64000,
        fastestInterval: 0,
        minimumTime: 0
      };
      applicationManager.getPresentationUtility().showLoadingScreen();
      kony.location.getCurrentPosition(geoLocationSuccessCallBack,geoLocationErrorCallBack, positionoptions);
      function geoLocationSuccessCallBack(response) {
        try {
          searchText.currLatitude = response.coords.latitude;
          scope_SettingsPresenter.currLatitude = response.coords.latitude;
          searchText.currLongitude = response.coords.longitude;
          scope_SettingsPresenter.currLongitude = response.coords.longitude;
          locationManager.fetchAddressSuggestions(searchText,scope_SettingsPresenter.addressSearchPresentationSuccessCallback, scope_SettingsPresenter.addressSearchPresentationErrorCallback);
        } catch (err) {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
        }
      }
      function geoLocationErrorCallBack(err) {
        var deviceUtilManager = applicationManager.getDeviceUtilManager();
        var isIphone = deviceUtilManager.isIPhone();
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (err.code == 1) {
          var i18nKey = applicationManager.getPresentationUtility().getStringFromi18n("i18n.maps.locationPermissionDenied");
          applicationManager.getDataProcessorUtility().showToastMessageError(scope,i18nKey);
        }
        if (err.code == 3 && !isIphone) {
          var i18n_timeOut = applicationManager.getPresentationUtility().getStringFromi18n("i18n.maps.locationTimeOut");
          applicationManager.getDataProcessorUtility().showToastMessageError(scope,i18n_timeOut);
        }
        if (err.code == 2 && !isIphone) {
          var i18n_turnOnLocationAlert = applicationManager.getPresentationUtility().getStringFromi18n("i18n.maps.turnOnLocationAlert");
          kony.ui.Alert(i18n_turnOnLocationAlert, onClickSettingsOrCancelHandler, constants.ALERT_TYPE_CONFIRMATION, "Cancel", "Settings", "");
        }
        function onClickSettingsOrCancelHandler(response){
          if (response === true) {
            kony.print("User not willing to on GPS");
            locationManager.fetchAddressSuggestions(searchText,scope_SettingsPresenter.addressSearchPresentationSuccessCallback, scope_SettingsPresenter.addressSearchPresentationErrorCallback);
          } else {
            LocationSettings.open();
          }
        }
      }
    }
  };
  Settings_PresentationController.prototype.addressSearchPresentationSuccessCallback = function(res) {
    kony.print("Success in addressSearch");
    var controller = applicationManager.getPresentationUtility().getController('frmProfileAddAddress', true);
    controller.setSearchData(res);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
  Settings_PresentationController.prototype.addressSearchPresentationErrorCallback = function(err) {
    kony.print("Error in addressSearch");
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
  Settings_PresentationController.prototype.updateProfileAddress = function() {
    var context=scope_SettingsPresenter.getUserAddressData();
    //var city=this.selectedCityAndStateCodes.city;
    var state=(this.selectedCityAndStateCodes.state!=='lbl1')?this.selectedCityAndStateCodes.state:"";
    var preferredAddress = this.userPreferredAddress;
    if (preferredAddress == "1" || preferredAddress == "true") {
      preferredAddress = "1";
    } else {
      preferredAddress = "0";
    }
    var addresses = [{
      "Addr_type": context.addressType,
      "isPrimary": preferredAddress,
      "addrLine1": context.addressLine1,
      "addrLine2": context.addressLine2,
      "ZipCode": context.zipcode,
      "City_id": context.city,
      "Addr_id": context.addressId,
      "countryCode":context.countryCode,
      "Region_id": state
    }],
        addresses = JSON.stringify(addresses);
    addresses = addresses.replace(/"/g, "'");
    var params = {
      "Addresses": addresses,
      "userName": applicationManager.getUserPreferencesManager().getCurrentUserName(),
      "modifiedByName": applicationManager.getUserPreferencesManager().getCurrentUserName()
    };
    var userPreferencesManager = applicationManager.getUserPreferencesManager();
    userPreferencesManager.updateUserProfileDetails(params,scope_SettingsPresenter.updateProfileAddressPresentationSuccessCallback, scope_SettingsPresenter.updateProfileAddressPresentationErrorCallback);
  };
  Settings_PresentationController.prototype.updateProfileAddressPresentationSuccessCallback = function(res) {
    //     kony.print("Success in updateProfileAddress");
    //     scope_SettingsPresenter.getUserAllAddressesData();
    //     var navManager = applicationManager.getNavigationManager();
    //     var data = {
    //       "message" : "AddressUpdated"
    //     };
    //     navManager.setCustomInfo("frmProfileEditAddressList1",data);
    //    applicationManager.getPresentationUtility().dismissLoadingScreen();
    scope_SettingsPresenter.updateUserResponse(success,failure);
    function success(data){
      var navManager = applicationManager.getNavigationManager();
      var data = {
        "message" : "AddressUpdated"
      };
      navManager.setCustomInfo("frmProfileEditAddressList1", data);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      scope_SettingsPresenter.navigateToEditOrAddAddress();
      scope_SettingsPresenter.setDataAfterProfileUpdate();
    }
    function failure(error){
      kony.print("error "+JSON.stringify(error)+error);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
  };
  Settings_PresentationController.prototype.updateProfileAddressPresentationErrorCallback = function(err) {
    kony.print("Error in updateProfileAddress");
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(err && err["isServerUnreachable"]){
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    }
  };
  Settings_PresentationController.prototype.createProfileAddress = function(data) {
    var userPreferencesManager = applicationManager.getUserPreferencesManager();
    var addressObj=scope_SettingsPresenter.getUserAddressData();
    var city=this.selectedCityAndStateCodes.city;
    var state=this.selectedCityAndStateCodes.state;
    var preferredAddress=this.userPreferredAddress;
    if(preferredAddress=="1"|| preferredAddress==true){
      preferredAddress="1";
    }
    else{
      preferredAddress="0";
    }
    var addresses = [{
      Addr_type: addressObj.addressType,
      addrLine1: addressObj.addressLine1,
      addrLine2: addressObj.addressLine2,
      City_id: addressObj.city,
      ZipCode: addressObj.zipcode,
      isPrimary: preferredAddress,
      countryCode : addressObj.countryCode,
      Region_id: state
    }];
    addresses = JSON.stringify(addresses);
    addresses = addresses.replace(/"/g, "'");
    var params = {
      "Addresses": addresses,
      "userName": applicationManager.getUserPreferencesManager().getCurrentUserName(),
      "modifiedByName": applicationManager.getUserPreferencesManager().getCurrentUserName()
    };
    userPreferencesManager.updateUserProfileDetails(params,scope_SettingsPresenter.createProfileAddressPresentationSuccessCallback, scope_SettingsPresenter.createProfileAddressPresentationErrorCallback);
  };
  Settings_PresentationController.prototype.createProfileAddressPresentationSuccessCallback = function(res) {
    //     kony.print("Success in createProfileAddress");
    //     scope_SettingsPresenter.getUserAllAddressesData();
    //     var navManager = applicationManager.getNavigationManager();
    //     var data = {
    //       "message" : "AdressAdded"
    //     };
    //     navManager.setCustomInfo("frmProfileEditAddressList1",data);
    //     applicationManager.getPresentationUtility().dismissLoadingScreen();
    this.selectedCityAndStateCodes={};
    kony.print("Success in createProfileAddress");
    //scope_SettingsPresenter.getUserAllAddressesData();
    scope_SettingsPresenter.updateUserResponse(success,failure);
    function success(data){
      var navManager = applicationManager.getNavigationManager();
      var data = {
        "message" : "AdressAdded"
      };
      navManager.setCustomInfo("frmProfileEditAddressList1", data);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      scope_SettingsPresenter.navigateToEditOrAddAddress();
      scope_SettingsPresenter.setDataAfterProfileUpdate();
    }
    function failure(error){
      kony.print("error "+JSON.stringify(error)+error);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
  };
  Settings_PresentationController.prototype.createProfileAddressPresentationErrorCallback = function(err) {
    kony.print("Error in createProfileAddress");
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(err && err["isServerUnreachable"]){
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    }
  };
  Settings_PresentationController.prototype.deleteProfileAddress = function(data) {
    var userPreferencesManager = applicationManager.getUserPreferencesManager();
    var main_user = applicationManager.getUserPreferencesManager().getUserName();
    var params = {"userName" : main_user,
                  "deleteAddressID": data.addressId
                 };
    //userPreferencesManager.deleteAddress(data,scope_SettingsPresenter.deleteProfileAddressPresentationSuccessCallback, scope_SettingsPresenter.deleteProfileAddressPresentationErrorCallback);
    userPreferencesManager.updateUserProfileDetails(params,scope_SettingsPresenter.deleteProfileAddressPresentationSuccessCallback, scope_SettingsPresenter.deleteProfileAddressPresentationErrorCallback);
  };
  Settings_PresentationController.prototype.updateUserResponse = function(success,failure) {
    var userPreferencesManager = applicationManager.getUserPreferencesManager();
    var main_user = applicationManager.getUserPreferencesManager().getUserName();
    // var params = {"userName" : main_user};
    userPreferencesManager.fetchUser(success,failure);
  };
  Settings_PresentationController.prototype.deleteProfileAddressPresentationSuccessCallback = function(res) {
    kony.print("Success in deleteProfileAddress");
    //scope_SettingsPresenter.getUserAllAddressesData();
    scope_SettingsPresenter.updateUserResponse(success,failure);
    function success(data){
      var navManager = applicationManager.getNavigationManager();
      var data = {
        "message" : "AddressDeleted"
      };
      navManager.setCustomInfo("frmProfileEditAddressList1", data);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      scope_SettingsPresenter.navigateToEditOrAddAddress();
      scope_SettingsPresenter.setDataAfterProfileUpdate();
    }
    function failure(error){
      kony.print("error "+JSON.stringify(error)+error);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
  };
  Settings_PresentationController.prototype.deleteProfileAddressPresentationErrorCallback = function(err) {
    kony.print("Error in deleteProfileAddress");
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(err && err["isServerUnreachable"]){
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    }
  };
  Settings_PresentationController.prototype.navigateToEditEmail = function(index){
    var userObj = applicationManager.getUserPreferencesManager();
    var email = userObj.getEntitlementEmailIds();
    //var secondaryEmail = userObj.getUserObj().secondaryemail;
    //var secondaryEmail2 = userObj.getUserObj().secondaryemail2;
    var data = {
      "email": email[index].Value,
      "index": index,
      "isPrimary": email[index].isPrimary,
      "id": email[index].id
    }
    var navManager = applicationManager.getNavigationManager();
    navManager.setCustomInfo('frmProfileEnterEmailID',data);
    navManager.setCustomInfo('frmProfileEnterEmailIDFlow',"edit");
    navManager.navigateTo('frmProfileEnterEmailID');
  };
  Settings_PresentationController.prototype.updateEmail = function(data){
    var validationManager = applicationManager.getValidationUtilManager();
    if(validationManager.isValidEmail(data.email) === false){
      var formController = applicationManager.getPresentationUtility().getController('frmProfileEnterEmailID',true);
      var i18nV = applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.OnBoarding.InvalidEmail');
      formController.bindViewError(i18nV);
      return;
    }
    applicationManager.getPresentationUtility().showLoadingScreen();
    var emailIds = [{
      "id": data.id,
      "isPrimary": (data.isPrimary === "true") ? "1" : "0",
      "value": data.email
    }];
    emailIds = JSON.stringify(emailIds);
    emailIds = emailIds.replace(/"/g, "'");
    var params = {
      "EmailIds": emailIds,
      "userName": applicationManager.getUserPreferencesManager().getCurrentUserName(),
      "modifiedByName": applicationManager.getUserPreferencesManager().getCurrentUserName()
    };
    applicationManager.getUserPreferencesManager().updateUserProfileDetails(params, scope_SettingsPresenter.updateEmailPresentationSuccessCallback, scope_SettingsPresenter.updateEmailPresentationErrorCallback);
  };
  Settings_PresentationController.prototype.updateEmailPresentationSuccessCallback = function(res) {
    if(res.MFAAttributes && res.MFAAttributes.isMFARequired == "true"){
      const mfaManager = applicationManager.getMFAManager();
      const mfaJSON = {
        "flowType" : "UPDATE_EMAIL",
        "response" : res,
        "objectServiceDetails": {
          "serviceName": "RBObjects",
          "dataModel": "User",
          "operationName": "updateCustomerDetails"
        }
      };
      mfaManager.initMFAFlow(mfaJSON);
    } else {
      scope_SettingsPresenter.updateUserResponse(success,failure);
      function success(data) {
        var navManager = applicationManager.getNavigationManager();
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        scope_SettingsPresenter.navigateToAddOrEditEmail("updatesuccess");
        scope_SettingsPresenter.setDataAfterProfileUpdate();
      }
      function failure(error) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
    }
  };
  Settings_PresentationController.prototype.updateEmailPresentationErrorCallback = function(err) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(err && err["isServerUnreachable"]){
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    }
  };
  Settings_PresentationController.prototype.deleteEmail = function(data){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var userManager = applicationManager.getUserPreferencesManager();
    var main_user = userManager.getUserName();
    var params = {"userName" : main_user,
                  "deleteCommunicationID": data.id,
                  "communicationType": "EmailIds"
                 };
    userManager.updateUserProfileDetails(params, scope_SettingsPresenter.deleteEmailPresentationSuccessCallback, scope_SettingsPresenter.deleteEmailPresentationErrorCallback);
  };
  Settings_PresentationController.prototype.deleteEmailPresentationSuccessCallback = function(res) {
    if(res.MFAAttributes && res.MFAAttributes.isMFARequired == "true"){
      const mfaManager = applicationManager.getMFAManager();
      const mfaJSON = {
        "flowType" : "REMOVE_EMAIL",
        "response" : res,
        "objectServiceDetails": {
          "serviceName": "RBObjects",
          "dataModel": "User",
          "operationName": "updateCustomerDetails"
        }
      };
      mfaManager.initMFAFlow(mfaJSON);
    } else {
      scope_SettingsPresenter.updateUserResponse(success,failure);
      function success(data){
        var navManager = applicationManager.getNavigationManager();
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        scope_SettingsPresenter.navigateToAddOrEditEmail("deletesuccess");
        scope_SettingsPresenter.setDataAfterProfileUpdate();
      }
      function failure(error){
        kony.print("error "+JSON.stringify(error)+error);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
    }
  };
  Settings_PresentationController.prototype.deleteEmailPresentationErrorCallback = function(err) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(err && err["isServerUnreachable"]){
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    }
  };
  Settings_PresentationController.prototype.addEmail = function(data){
    var validationManager = applicationManager.getValidationUtilManager();
    if(!validationManager.isValidEmail(data.email)){
      var formController = applicationManager.getPresentationUtility().getController('frmProfileEnterEmailID',true);
      var i18nV = applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.OnBoarding.InvalidEmail');
      formController.bindViewError(i18nV);
      return;
    }
    var isEmailAlreadyPresent = function(emailIds, emailAddress){
      for (var i = 0; i < emailIds.length; i++) {
        var existingEmail = emailIds[i].Value;
       
       if(typeof(existingEmail)=== "string" && typeof(emailAddress)=== "string" && existingEmail.toUpperCase() === emailAddress.toUpperCase()) {
         if(!kony.sdk.isNullOrUndefined(emailIds[i].isTypeBusiness) && emailIds[i].isTypeBusiness == 1 ){ // we should not check with business profile emails as we will be creating emails only for personal account
           return false;
         }
         else{
           return true;
         }
       }
      }
    }
    applicationManager.getPresentationUtility().showLoadingScreen();
    var entitlementEmailIds = applicationManager.getUserPreferencesManager().getEntitlementEmailIds();
    if (isEmailAlreadyPresent(entitlementEmailIds, data.email)) {
      this.addEmailFailureCallBack(kony.i18n.getLocalizedString("kony.mb.Profile.emailAlreadyExists"));
    }
    else {
      if (entitlementEmailIds.length < 3) {
        var emailIds = [{
          "isPrimary": (data.isPrimary === "true") ? "1" : "0",
          "value": data.email,
          "Extension": "Personal"
        }];
        emailIds = JSON.stringify(emailIds);
        emailIds = emailIds.replace(/"/g, "'");
        var params = {
          "EmailIds": emailIds,
          "userName": applicationManager.getUserPreferencesManager().getCurrentUserName(),
          "modifiedByName": applicationManager.getUserPreferencesManager().getCurrentUserName()
        };
        applicationManager.getUserPreferencesManager().updateUserProfileDetails(params, scope_SettingsPresenter.addEmailSuccessCallBack, scope_SettingsPresenter.addEmailFailureCallBack);
      }
      else {
        this.addEmailFailureCallBack("We currently do not support adding more than three emails for a user");
      }
    }
  };
  Settings_PresentationController.prototype.addEmailSuccessCallBack = function(res){
    if(res.MFAAttributes && res.MFAAttributes.isMFARequired == "true"){
      const mfaManager = applicationManager.getMFAManager();
      const mfaJSON = {
        "flowType" : "ADD_EMAIL",
        "response" : res,
        "objectServiceDetails": {
          "serviceName": "RBObjects",
          "dataModel": "User",
          "operationName": "updateCustomerDetails"
        }
      };
      mfaManager.initMFAFlow(mfaJSON);
    } else {
      scope_SettingsPresenter.updateUserResponse(success,failure);
      function success(data){
        var navManager = applicationManager.getNavigationManager();
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        scope_SettingsPresenter.navigateToAddOrEditEmail("addsuccess");
        scope_SettingsPresenter.setDataAfterProfileUpdate();
      }
      function failure(error){
        kony.print("error "+JSON.stringify(error)+error);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
    }
  };
  Settings_PresentationController.prototype.addEmailFailureCallBack = function(error){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (error && error["isServerUnreachable"]){
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
    }
    else {
      var controller = applicationManager.getPresentationUtility().getController('frmProfileEnterEmailID', true);
      controller.bindViewError(error);
    }
  };
  Settings_PresentationController.prototype.removeProfileImage = function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var userObj = applicationManager.getUserPreferencesManager();
    var params = {};
    userObj.deleteUserProfileImage(params,scope_SettingsPresenter.removeProfilePictureSuccess,scope_SettingsPresenter.removeProfilePictureFailure);
  };
  Settings_PresentationController.prototype.removeProfilePictureSuccess = function(data){
    var formController = applicationManager.getPresentationUtility().getController('frmProfilePersonalDetails',true);
    formController.removeProfilePicture();
    var userObj = applicationManager.getUserPreferencesManager();
    userObj.fetchUserImage(scope_SettingsPresenter.presentationUserImageSuccess,scope_SettingsPresenter.presentationUserImageError);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
  Settings_PresentationController.prototype.removeProfilePictureFailure = function(err){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(err && err["isServerUnreachable"]){
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
      return;
    }
    var formController = applicationManager.getPresentationUtility().getController('frmProfilePersonalDetails',true);
    var i18nStr = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.enroll.SomethingWrong");
    formController.bindViewError(i18nStr);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
  Settings_PresentationController.prototype.uploadProfilePicture = function(base64){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var userObj = applicationManager.getUserPreferencesManager();
    var params = {};
    params.UserImage = base64;
    userObj.updateUserProfileImage(params,scope_SettingsPresenter.uploadProfilePictureSuccess,scope_SettingsPresenter.uploadProfilePictureFailure);
  };
  Settings_PresentationController.prototype.uploadProfilePictureSuccess = function(data){
    var formController = applicationManager.getPresentationUtility().getController('frmProfilePersonalDetails',true);
    var i18nStr = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.ProfileManagement.photoUploaded");
    formController.bindViewSuccess(i18nStr);
    formController.bindUploadedImage();
    var userObj = applicationManager.getUserPreferencesManager();
    userObj.fetchUserImage(scope_SettingsPresenter.presentationUserImageSuccess,scope_SettingsPresenter.presentationUserImageError);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    navManager.setEntryPoint("Feedback","frmProfilePersonalDetails");
    var feedbackModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("FeedBackModule");
    feedbackModule.presentationController.showFeedbackPopup({from : "profilesettingorlogout"});
  };
  Settings_PresentationController.prototype.uploadProfilePictureFailure = function(err){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(err && err["isServerUnreachable"]){
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
      return;
    }
    var formController = applicationManager.getPresentationUtility().getController('frmProfilePersonalDetails',true);
    var i18nStr = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.enroll.SomethingWrong");
    formController.bindViewError(i18nStr);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
  Settings_PresentationController.prototype.deleteUserPhoneNumber = function(id){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var userObj = applicationManager.getUserPreferencesManager();
    var main_user =userObj.getUserName();
    var params = {
      "userName": main_user,
      "deleteCommunicationID": id,
      "communicationType": "phoneNumbers"
    };
    //userObj.deleteUserPhoneNumber(id,scope_SettingsPresenter.deleteUserPhoneNumberSuccess,scope_SettingsPresenter.deleteUserPhoneNumberFailure);
    userObj.updateUserProfileDetails(params,scope_SettingsPresenter.deleteUserPhoneNumberSuccess,scope_SettingsPresenter.deleteUserPhoneNumberFailure);
  };
  Settings_PresentationController.prototype.deleteUserPhoneNumberSuccess = function(data){
    if(data.MFAAttributes && data.MFAAttributes.isMFARequired == "true"){
      const mfaManager = applicationManager.getMFAManager();
      const mfaJSON = {
        "flowType" : "REMOVE_PHONE_NUMBER",
        "response" : data,
        "objectServiceDetails": {
          "serviceName": "RBObjects",
          "dataModel": "User",
          "operationName": "updateCustomerDetails"
        }
      };
      mfaManager.initMFAFlow(mfaJSON);
    } else {
      var userObj = applicationManager.getUserPreferencesManager();
      //userObj.fetchAllPhoneNumbers(success,failure);
      scope_SettingsPresenter.updateUserResponse(success,failure);
      function success(data){
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        scope_SettingsPresenter.navigateToEditPhoneNumber({"flow":"deletesuccess"});
        //scope_SettingsPresenter.refreshPersonalDetailsData();
        scope_SettingsPresenter.setDataAfterProfileUpdate();
      }
      function failure(error){
        kony.print("error "+JSON.stringify(error)+error);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
    }
  };
  Settings_PresentationController.prototype.deleteUserPhoneNumberFailure = function(error){
    kony.print("error "+JSON.stringify(error));
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(error && error["isServerUnreachable"]){
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
    }
  };
  Settings_PresentationController.prototype.getUserAllAddressesData = function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var userObj = applicationManager.getUserPreferencesManager();
    userObj.fetchUserAllAddresses(scope_SettingsPresenter.getUserAllAddressesDataSuccess,scope_SettingsPresenter.getUserAllAddressesDataFailure);
  };
  Settings_PresentationController.prototype.getUserAllAddressesDataSuccess = function(data){
    scope_SettingsPresenter.navigateToEditOrAddAddress();
    scope_SettingsPresenter.refreshPersonalDetailsData();
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
  Settings_PresentationController.prototype.verifyOTP = function(otp,formName){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var validationUtilManager = applicationManager.getValidationUtilManager();
    if (validationUtilManager.isValidOTP(otp)) {
      var authManager = applicationManager.getAuthManager();
      var params = {"Otp" : otp};
      authManager.verifyOTP(params,verifyOtpSuccess,verifyOtpFailure);
    }else{
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var controller = applicationManager.getPresentationUtility().getController('frmProfileSecurityCode', true);
      var errormsg = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.enterSecurityCode");
      controller.bindGenericError(errormsg);
    }
    function verifyOtpSuccess(response){
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo(formName);
    }
    function verifyOtpFailure(err){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      if (err["isServerUnreachable"])
      {
        applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
      }
      else
      {
        var controller = applicationManager.getPresentationUtility().getController('frmProfileSecurityCode', true);
        var errorMsg = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.invalidSecurityCode");
        controller.bindGenericError(errorMsg);
      }
    }
  };
  Settings_PresentationController.prototype.getUserAllAddressesDataFailure = function(err){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(err && err["isServerUnreachable"]){
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    }
  };
  Settings_PresentationController.prototype.skipNavigation = function(){
    var navigationManager = applicationManager.getNavigationManager();
    var authMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
    if(authMode.presentationController.flowType == "login"){
      navigationManager.navigateTo("frmDashboardAggregated");
    }
    else{
      navigationManager.navigateTo("frmSettings");
    }
    this.flowType="";
  };
  Settings_PresentationController.prototype.getAllAccountAlerts = function(successCallback,failureCallback){
    var settingsManager = applicationManager.getSettingsManager();
    settingsManager.getAllAccountAlerts(successCallback,failureCallback);
  };
  Settings_PresentationController.prototype.getDealsAndSecurityAlerts = function(successCallback,failureCallback){
    var settingsManager = applicationManager.getSettingsManager();
    settingsManager.getDealsAndSecurityAlerts(successCallback,failureCallback);
  };
  Settings_PresentationController.prototype.updateUserAccountAlerts = function(inputParams,successCallback,failureCallback){
    var settingsManager = applicationManager.getSettingsManager();
    settingsManager.updateUserAccountAlerts(inputParams,successCallback,failureCallback);
  };
  Settings_PresentationController.prototype.updateUserAlerts = function(inputParams,successCallback,failureCallback){
    var settingsManager = applicationManager.getSettingsManager();
    settingsManager.updateUserAlerts(inputParams,successCallback,failureCallback);
  };
  Settings_PresentationController.prototype.updateAccountAlertsFlag = function(record,successCallback,failureCallback){
    var userObj = applicationManager.getUserPreferencesManager();
    userObj.updateAccountAlertsFlag(record,successCallback,failureCallback);
  };
  Settings_PresentationController.prototype.defaultAccounts = function(){
    var userObj = applicationManager.getUserPreferencesManager();
    var accountObj = applicationManager.getAccountManager();
    var acctId = userObj.getDefaultAccountforTransfers();
    var defaultTransferAcc = accountObj.getInternalAccountByID(acctId);
    acctId = userObj.getDefaultAccountforBillPay();
    var defaultBillPayAcc  = accountObj.getInternalAccountByID(acctId);
    acctId = userObj.getDefaultAccountforPayments();
    var defaultPaymentsAcc = accountObj.getInternalAccountByID(acctId);
    acctId = userObj.getDefaultAccountforCardlessPayments();
    var defaultCardlessAcc = accountObj.getInternalAccountByID(acctId);
    acctId = userObj.getDefaultAccountforDeposit();
    var defaultDepositAcc  = accountObj.getInternalAccountByID(acctId);
    var data=[
      {"lblTitle":"Transfers","lblValue":defaultTransferAcc.nickName,"imgArrow":"chevron.png","lblAccId":defaultTransferAcc.accountID},
      {"lblTitle":"Bill Pay","lblValue":defaultBillPayAcc.nickName,"imgArrow":"chevron.png","lblAccId":defaultBillPayAcc.accountID},
      {"lblTitle":"Pay a person","lblValue":defaultPaymentsAcc.nickName,"imgArrow":"chevron.png","lblAccId":defaultPaymentsAcc.accountID},
      {"lblTitle":"Cash Withdrawal","lblValue":defaultCardlessAcc.nickName,"imgArrow":"chevron.png","lblAccId":defaultCardlessAcc.accountID},
      {"lblTitle":"Deposits","lblValue":defaultDepositAcc.nickName,"imgArrow":"chevron.png","lblAccId":defaultDepositAcc.accountID}
    ];
    return(data);
  };
  Settings_PresentationController.prototype.updateUserAccountSettingsForEstatements = function(params,eStatementPopup){
    var accountObj = applicationManager.getAccountManager();
    this.estatementData=params;
    accountObj.updateUserAccountSettingsForEstatements(params,scope_SettingsPresenter.estatementPresentationSuccessCallback.bind(this,eStatementPopup),scope_SettingsPresenter.estatementPresentationErrorCallback);
  };
  Settings_PresentationController.prototype.estatementPresentationSuccessCallback = function(eStatementPopup,resSuccess){
    /*var controller = applicationManager.getPresentationUtility().getController('frmEStmtAccountDetails', true);
    controller.bindGenericSuccess();*/
    this.eStatementPopup=eStatementPopup;
    scope_SettingsPresenter.updateJsonData();
  };
  Settings_PresentationController.prototype.estatementPresentationErrorCallback = function(reserr){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (reserr["isServerUnreachable"]) {
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", reserr);
    }
  };
  Settings_PresentationController.prototype.setaccountNum = function (params) {
    this.accountNum = params;
  };
  Settings_PresentationController.prototype.getaccountNum = function () {
    return this.accountNum;
  };
  Settings_PresentationController.prototype.updateJsonData = function(){
    var navManager = applicationManager.getNavigationManager();
    var accountData = navManager.getCustomInfo("frmEStmtAccountDetails");
    // var selectedrow=accountData.selectedRow;
    var accountsPreferenceData = navManager.getCustomInfo("frmEStmtAccountPreferences");
    var accountNumber = this.getaccountNum();
    for (i = 0; i < accountsPreferenceData.length; i++) {
      if (accountsPreferenceData[i].accountID === accountNumber) {
        if (scope_SettingsPresenter.eStatementPopup === "enable") {
          accountsPreferenceData[i].eStatementEnable = "true";
          accountData.eStatementEnable = "true";
          accountsPreferenceData[i].email = this.estatementData.email;
          accountData.email = this.estatementData.email;
          accountsPreferenceData[i].nickName = this.estatementData.nickName;
          accountData.nickName = this.estatementData.nickName;
        }
        else if (scope_SettingsPresenter.eStatementPopup === "disable") {
          accountsPreferenceData[i].eStatementEnable = "false";
          accountData.eStatementEnable = "false";
          accountsPreferenceData[i].nickName = this.estatementData.nickName;
          accountData.nickName = this.estatementData.nickName;
        }
        else if (scope_SettingsPresenter.eStatementPopup === "updateEmail") {
          accountsPreferenceData[i].email = this.estatementData.email;
          accountData.email = this.estatementData.email;
        }
        else if (scope_SettingsPresenter.eStatementPopup === "updateName") {
          accountsPreferenceData[i].nickName = this.estatementData.nickName;
          accountData.nickName = this.estatementData.nickName;
        }
      }
    }
    navManager.setCustomInfo("frmEStmtAccountDetails", accountData);
    navManager.setCustomInfo("frmEStmtAccountPreferences", accountsPreferenceData);
    navManager.navigateTo("frmEStmtAccountDetails");
    navManager.setEntryPoint("Feedback", "frmEStmtAccountDetails");
    var feedbackModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("FeedBackModule");
    feedbackModule.presentationController.showFeedbackPopup({ from: "profilesettingorlogout" });
  };
  /**
* used to get alert categories applicable for the user.
* @param {function} getAlertCategoryListPresentationSuccessCallback will be called when call is successful
* @param {function} getAlertCategoryListPresentationErrorCallback will be called when call is not successful
*/
  Settings_PresentationController.prototype.getAlertCategoryList = function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var alertsManager = applicationManager.getAlertsManager();
    alertsManager.fetchAlertsCategory(scope_SettingsPresenter.getAlertCategoryListPresentationSuccessCallback,scope_SettingsPresenter.getAlertCategoryPreferencePresentationErrorCallback);
    //scope_SettingsPresenter.getAlertChannelsData();
  };
  Settings_PresentationController.prototype.getAlertCategoryListPresentationSuccessCallback = function(resSuccess){
    var controller = applicationManager.getPresentationUtility().getController('frmSettings', true, {
            "appName":"AlertSettingsMA",
            "formName":"frmSettings"
        });
    var alertLevel = resSuccess.alertConfiguration ? resSuccess.alertConfiguration[0].alertPreferenceView : null;
    scope_SettingsPresenter.alertsManager.setAlertLevelConfiguration(alertLevel);
    controller.bindData(resSuccess);
  };
  Settings_PresentationController.prototype.getAlertCategoryListPresentationErrorCallback = function(reserr){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (reserr["isServerUnreachable"]) {
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", reserr);
    }else {
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo("frmSuccessAndError");
    }
  };
   /**
  * used to channels master data
  * @param {function} getAlertChannelsPresentationSuccessCallback will be called when call is successful
  * @param {function} getAlertChannelsPresentationErrorCallback will be called when call is not successful
  */
  Settings_PresentationController.prototype.getAlertChannelsData = function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var alertsManager = applicationManager.getAlertsManager();
    alertsManager.fetchAlertChannels({},scope_SettingsPresenter.getAlertChannelsPresentationSuccessCallback,scope_SettingsPresenter.getAlertChannelsPresentationErrorCallback);
  };
  Settings_PresentationController.prototype.getAlertChannelsPresentationSuccessCallback = function(resSuccess){
    var navManager = applicationManager.getNavigationManager();
    navManager.setCustomInfo("alertsChannels",resSuccess.channels);
  };
  Settings_PresentationController.prototype.getAlertChannelsPresentationErrorCallback = function(reserr){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (reserr["isServerUnreachable"]) {
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", reserr);
    }else {
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo("frmSuccessAndError");
    }
  };
  /**
* used to set the alert preferences of particular alert.
* @param {object} params - contains the categoryID, subscription value, channelPreferences and typePreferences.
* @param {Boolean} isMasterSwitchEnable - check if master switch is enabled.
* @param {function} setAlertPreferencesPresentationSuccessCallback will be called when call is successful
* @param {function} setAlertPreferencesPresentationErrorCallback will be called when call is not successful
*/
  Settings_PresentationController.prototype.setAlertPreferences = function(params, formName){
    var alertsManager = applicationManager.getAlertsManager();
    alertsManager.setAlertPreferences(params, scope_SettingsPresenter.setAlertPreferencesPresentationSuccessCallback.bind(this, formName), scope_SettingsPresenter.setAlertPreferencesPresentationErrorCallback);
  };
  Settings_PresentationController.prototype.setAlertPreferencesPresentationSuccessCallback = function(formName, resSuccess){
	var navManager = applicationManager.getNavigationManager();
    var categoryID = scope_SettingsPresenter.getAlertsCategoryID();
	var accountId = scope_SettingsPresenter.getAccountID();
	var accountTypeId = scope_SettingsPresenter.getAccountTypeID();
	var params = {
		"AlertCategoryId": categoryID
	};
    var categoryInfo = navManager.getCustomInfo("selectedCategoryInfo");
	if(categoryInfo.isAccountLevel === "true" && applicationManager.getConfigurationManager().getAccountIDLevelAlertsFlag() === true){
	  params.AccountId = accountId;
	} else if(categoryInfo.isAccountLevel === "true" && applicationManager.getConfigurationManager().getAccountIDLevelAlertsFlag() === false){
	  params.AccountTypeId = accountTypeId;
	}
    if(categoryInfo.isAccountLevel === "true"){
      var alertAccountName = navManager.getCustomInfo("frmAlertsListHeader");
      var editPreferController = applicationManager.getPresentationUtility().getController('frmAlertsEditPreferences', true);
      //update subscription status in listing screen
      if(editPreferController.isMasterSwitchToggle === true  ||
        formName === "frmAlertGroupsList"){ 
        var controller = applicationManager.getPresentationUtility().getController('frmAlertsAccountPref', true);
        controller.updateData(alertAccountName);
      }
      scope_SettingsPresenter.getAlertsBasedOnAccounts(params,true, formName);
    }else {
      scope_SettingsPresenter.getAlertsBasedOnCategoryID(true, formName);
    }
	
	navManager.setEntryPoint("Feedback","frmAlertsEditPreferences");
	var SettingsAlertsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsAlertsUIModule", "appName" : "AlertSettingsMA"});
	SettingsAlertsUIModule.presentationController.showFeedbackPopup({from : "profilesettingorlogout"});
  //applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
  Settings_PresentationController.prototype.setAlertPreferencesPresentationErrorCallback = function(reserr){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (reserr["isServerUnreachable"]) {
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", reserr);
    }else {
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo("frmSuccessAndError");
    }
  };
  /**
* used to set the category id to Alerts manager.
*/
  Settings_PresentationController.prototype.setAlertsCategoryID = function(categoryId) {
    scope_SettingsPresenter.alertsManager.setCategoryId(categoryId);
  };
  /**
* used to get the category id from Alerts manager.
*/
  Settings_PresentationController.prototype.getAlertsCategoryID = function() {
    return scope_SettingsPresenter.alertsManager.getCategoryId();
  };
   /**
  * used to set the alert group id to Alerts manager.
  */
  Settings_PresentationController.prototype.setAlertsGroupID = function(alertGroupId) {
    scope_SettingsPresenter.alertsManager.setAlertsGroupID(alertGroupId);
  };
  /**
  * used to get the alert group id from Alerts manager.
  */
  Settings_PresentationController.prototype.getAlertsGroupID = function() {
    return scope_SettingsPresenter.alertsManager.getAlertsGroupID();
  };
  /**
  * used to set the alert id to Alerts manager.
  */
  Settings_PresentationController.prototype.setAlertID = function(alertId) {
    scope_SettingsPresenter.alertsManager.setAlertID(alertId);
  };
  /**
  * used to get the alert id from Alerts manager.
  */
  Settings_PresentationController.prototype.getAlertID = function() {
    return scope_SettingsPresenter.alertsManager.getAlertID();
  };
  /**
* used to set the Account id to Alerts manager.
*/
  Settings_PresentationController.prototype.setAccountID = function(accountId) {
    scope_SettingsPresenter.alertsManager.setaccountId(accountId);
  };
  /**
* used to get the Account id from Alerts manager.
*/
  Settings_PresentationController.prototype.getAccountID = function() {
    return scope_SettingsPresenter.alertsManager.getaccountId();
  };
  /**
* used to set the Account id to Alerts manager.
*/
  Settings_PresentationController.prototype.setAccountTypeID = function(accountTypeID) {
    scope_SettingsPresenter.alertsManager.setaccountTypeId(accountTypeID);
  };
  /**
* used to get the Account id from Alerts manager.
*/
  Settings_PresentationController.prototype.getAccountTypeID = function() {
    return scope_SettingsPresenter.alertsManager.getaccountTypeId();
  };
  /**
  * used to fetch alert preferences level configuration
  */
  Settings_PresentationController.prototype.getAlertLevelConfiguration = function(){
    return scope_SettingsPresenter.alertsManager.getAlertLevelConfiguration();
  };
  /**
  * used to fetch alerts and preferences present in a particular category.
  * @param: isEdit - flag to indicate fetch after update
  * @param: formName - name of from
  */
  Settings_PresentationController.prototype.getAlertsBasedOnCategoryID = function(isEdit, formName){
    var categoryID = scope_SettingsPresenter.getAlertsCategoryID();
    var params = {
      "AlertCategoryId": categoryID
    };
    applicationManager.getPresentationUtility().showLoadingScreen();
    scope_SettingsPresenter.fetchCategoryDetails(params, isEdit, formName);
  };
  /**
  * used to fetch the alerts for account or account type.
  * @param {String} params - contains the account type or account ID.
  * @param {String} isEdit - flag to indicate get or update 
  * @param: formName - name of from
  */
  Settings_PresentationController.prototype.getAlertsBasedOnAccounts = function(params,isEdit, formName){
    applicationManager.getPresentationUtility().showLoadingScreen();
    scope_SettingsPresenter.fetchCategoryDetails(params,isEdit, formName);
  };
  /**
  * used to fetch the alert type preferences present in a particular category.
  * @param {String} params - contains the categoryID value.
  * @param {String} onUpdate - flag to denote fetch or get on update call
  * @param {String} form name - name of form the function is called
  * @param {function} fetchAlertsInCategoryPresentationSuccessCallback will be called when call is successful
  * @param {function} fetchAlertsInCategoryPresentationErrorCallback will be called when call is not successful
  */
  Settings_PresentationController.prototype.fetchCategoryDetails = function(params,onUpdate, formName) {
    if(onUpdate === true){ //fetch after update
      scope_SettingsPresenter.alertsManager.fetchAlertsInCategory(params, scope_SettingsPresenter.fetchAlertsInCatAfterUpdatePrstnSuccessCallback.bind(this, formName), scope_SettingsPresenter.fetchAlertsInCategoryPresentationErrorCallback);
    } else{ //fetch on navigation to screen
      scope_SettingsPresenter.alertsManager.fetchAlertsInCategory(params, scope_SettingsPresenter.fetchAlertsInCategoryPresentationSuccessCallback, scope_SettingsPresenter.fetchAlertsInCategoryPresentationErrorCallback);
    }
    
  };
  Settings_PresentationController.prototype.fetchAlertsInCategoryPresentationSuccessCallback = function(resSuccess) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var alertData = resSuccess;
    var alertLevel = scope_SettingsPresenter.getAlertLevelConfiguration();
    navManager.setCustomInfo("frmAlertsEditPreferences",alertData);
    if(alertLevel === "CATEGORY"){
      applicationManager.getNavigationManager().navigateTo({"appName" : "AlertSettingsMA", "friendlyName" : "SettingsAlertsUIModule/frmAlertsEditPreferences"});
        //applicationManager.getNavigationManager().navigateTo("frmAlertsEditPreferences");
    } else if(alertLevel === "GROUP" || alertLevel === "ALERT"){
      navManager.setCustomInfo("frmAlertGroupsList",alertData);
      applicationManager.getNavigationManager().navigateTo({"appName" : "AlertSettingsMA", "friendlyName" : "SettingsAlertsUIModule/frmAlertGroupsList"});
       //applicationManager.getNavigationManager().navigateTo("frmAlertGroupsList");
    }else{

    }
  };
  Settings_PresentationController.prototype.fetchAlertsInCatAfterUpdatePrstnSuccessCallback = function(formName, response){
     applicationManager.getPresentationUtility().showLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var alertData = response;
    navManager.setCustomInfo("frmAlertsEditPreferences",alertData);
    if(formName && formName === "frmAlertsMinimumBalance"){
      var alertminimumBalanceController = applicationManager.getPresentationUtility().getController('frmAlertsMinimumBalance', true);
      //for switch toggle remain in same screen
      if(alertminimumBalanceController.isTypePreferenceToggle === true){
        navManager.navigateTo({"appName" : "AlertSettingsMA", "friendlyName" : "SettingsAlertsUIModule/frmAlertsMinimumBalance"});
        //navManager.navigateTo("frmAlertsMinimumBalance");
      }else{  
        navManager.navigateTo({"appName" : "AlertSettingsMA", "friendlyName" : "SettingsAlertsUIModule/frmAlertsEditPreferences"});
        //navManager.navigateTo("frmAlertsEditPreferences");
      }
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    } else if(formName && formName === "frmAlertGroupsList"){
      navManager.navigateTo({"appName" : "AlertSettingsMA", "friendlyName" : "SettingsAlertsUIModule/frmAlertGroupsList"});
      //navManager.navigateTo("frmAlertGroupsList");
    } else{
      navManager.navigateTo({"appName" : "AlertSettingsMA", "friendlyName" : "SettingsAlertsUIModule/frmAlertsEditPreferences"});
       //navManager.navigateTo("frmAlertsEditPreferences");
    }
  };
  Settings_PresentationController.prototype.fetchAlertsInCategoryPresentationErrorCallback = function(reserr){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (reserr["isServerUnreachable"]) {
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", reserr);
    }else {
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo("frmSuccessAndError");
    }
  };
  /**
  * used to bind data for alerts minimum balance form
  * @param {object} setPreferenceData - contains the request param for set  alert preference.
  * @param {Integer} masterSwitchIndex - Master switch index of alert category
  */
  Settings_PresentationController.prototype.setDataForMinimumBalance = function(setPreferenceData, masterSwitchIndex) {
    var controller = applicationManager.getPresentationUtility().getController('frmAlertsMinimumBalance', true);
    controller.bindData(setPreferenceData, masterSwitchIndex);
  };
  /**
  * set data to alert communication screen
  */
  Settings_PresentationController.prototype.setAlertCommunicationData = function() {
    var userManager = applicationManager.getUserPreferencesManager();
    var userDetails = userManager.getUserObj();
    var controller = applicationManager.getPresentationUtility().getController('frmAlertsCommunication', true);
    controller.bindData(userDetails);
  };
  /**
  * naviagte to alert communication edit screen
  * @param {object} communicationDetails - {"type":"PHONE","assignedValue":"","data":""}
  */
  Settings_PresentationController.prototype.navigateToAlertsCommunicationEdit = function(communicationDetails) {
    var userManager = applicationManager.getUserPreferencesManager();
    var userDetails = userManager.getUserObj();
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo({"appName" : "AlertSettingsMA", "friendlyName" : "SettingsAlertsUIModule/frmAlertsCommunicationEdit"});
     //navManager.navigateTo("frmAlertsCommunicationEdit");
    communicationDetails.data = userDetails;
    var controller = applicationManager.getPresentationUtility().getController('frmAlertsCommunicationEdit', true);
    controller.bindData(communicationDetails);
  };
  /**
  * naviagte to alert frequency selection screen
  *  @param {Object}: freqObj-{"id":"","value":"","time":""}
  * @param {Object}: setPreferenceData - request param for setAlertPreference
  */
  Settings_PresentationController.prototype.navigateToAlertFrequencySelection = function(freqObj, setPreferenceData) {
    var controller = applicationManager.getPresentationUtility().getController('frmAlertsFrequencySelection', true);
    controller.bindData(freqObj, setPreferenceData);
  };
   /**
  * naviagte to alert day/date selection screen
  *  @param {Object}: freqObj-{"id":"","value":"","time":""}
  * @param {Object}: setPreferenceData - request param for setAlertPreference
  */
  Settings_PresentationController.prototype.navigateToAlertsDaySelection = function(freqObj, setPreferenceData) {
    var controller = applicationManager.getPresentationUtility().getController('frmAlertsDaySelection', true);
    controller.bindData(freqObj, setPreferenceData);
  };
  /**
  * naviagte to alert time selection screen
  * @param {Object}: freqObj-{"id":"","value":"","time":""}
  * @param {Object}: setPreferenceData - request param for setAlertPreference
  */
  Settings_PresentationController.prototype.navigateToAlertsTimeSelection = function(freqObj, setPreferenceData) {
    var controller = applicationManager.getPresentationUtility().getController('frmAlertsTimeSelection', true);
    controller.bindData(freqObj, setPreferenceData);
  };
  /**
  * update alert communication phone number details
  * @param {Object}: phoneNumbers
  */
  Settings_PresentationController.prototype.updateAlertCommunicationPhoneNumber = function(phoneNumbers){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var userObj = applicationManager.getUserPreferencesManager();
    var params = {
      "phoneNumbers": phoneNumbers,
      "userName": userObj.getCurrentUserName(),
      "modifiedByName": userObj.getCurrentUserName()
    };
    userObj.updateUserProfileDetails(params,scope_SettingsPresenter.updateAlertCommunicationSuccess, scope_SettingsPresenter.updateAlertCommunicationFailure);
  };
  /**
  * update alert communication email details
  * @param {Object}: emailId
  */
  Settings_PresentationController.prototype.updateAlertCommunicationEmailId = function(emailId){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var userObj = applicationManager.getUserPreferencesManager();
    var params = {
      "EmailIds": emailId,
      "userName": userObj.getCurrentUserName(),
      "modifiedByName": userObj.getCurrentUserName()
    };
    userObj.updateUserProfileDetails(params,scope_SettingsPresenter.updateAlertCommunicationSuccess, scope_SettingsPresenter.updateAlertCommunicationFailure);
  };
  Settings_PresentationController.prototype.updateAlertCommunicationSuccess = function(data){
    scope_SettingsPresenter.updateUserResponse(success,failure);
    function success(data){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      scope_SettingsPresenter.setAlertCommunicationData();
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo({"appName" : "AlertSettingsMA", "friendlyName" : "SettingsAlertsUIModule/frmAlertsCommunicationEdit"});
      // navManager.navigateTo("frmAlertsCommunicationEdit");
    }
    function failure(error) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
  };
  Settings_PresentationController.prototype.updateAlertCommunicationFailure = function(err){
    kony.print(JSON.stringify(err));
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(err && err["isServerUnreachable"]){
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    }
  };
   
  Settings_PresentationController.prototype.initiateAsyncCallsForLocation=function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    scope_SettingsPresenter.asyncManager.initiateAsyncProcess(scope_SettingsPresenter.numberOfAsyncForLocation);
    scope_SettingsPresenter.getCountriesList();
    scope_SettingsPresenter.getStatesList();
    scope_SettingsPresenter.getCitiesList();
  };
  Settings_PresentationController.prototype.getCountriesList=function(){
    var userPreferencesManager=applicationManager.getUserPreferencesManager();
    userPreferencesManager.getCountryList(scope_SettingsPresenter.getCountriesListSuccessCB,scope_SettingsPresenter.getCountriesListFailureCB);
  };
  Settings_PresentationController.prototype.getCountriesListSuccessCB=function(resSuccess){
    scope_SettingsPresenter.asyncManager.setSuccessStatus(0,resSuccess);
    if(scope_SettingsPresenter.asyncManager.areAllservicesDone(scope_SettingsPresenter.numberOfAsyncForLocation))
    {
      scope_SettingsPresenter.navToEnterLocationDetailsScreen();
    }
  };
  Settings_PresentationController.prototype.getCountriesListFailureCB=function(resErr){
    scope_SettingsPresenter.asyncManager.setErrorStatus(0,resErr);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(resErr["isServerUnreachable"])
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", resErr);
  };
  Settings_PresentationController.prototype.getStatesList=function(){
    var userPreferencesManager=applicationManager.getUserPreferencesManager();
    userPreferencesManager.getStatesList(scope_SettingsPresenter.getStatesListSuccessCB,scope_SettingsPresenter.getStatesListFailureCB);
  };
  Settings_PresentationController.prototype.getStatesListSuccessCB=function(resSuccess){
    scope_SettingsPresenter.asyncManager.setSuccessStatus(1,resSuccess);
    if(scope_SettingsPresenter.asyncManager.areAllservicesDone(scope_SettingsPresenter.numberOfAsyncForLocation))
    {
      scope_SettingsPresenter.navToEnterLocationDetailsScreen();
    }
  };
  Settings_PresentationController.prototype.getStatesListFailureCB=function(resErr){
    scope_SettingsPresenter.asyncManager.setErrorStatus(1,resErr);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(resErr["isServerUnreachable"])
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", resErr);
  };
  Settings_PresentationController.prototype.getCitiesList=function(){
    var userPreferencesManager=applicationManager.getUserPreferencesManager();
    userPreferencesManager.getCityList(scope_SettingsPresenter.getCitiesListSuccessCB,scope_SettingsPresenter.getCitiesListFailureCB);
  };
  Settings_PresentationController.prototype.getCitiesListSuccessCB=function(resSuccess){
    scope_SettingsPresenter.asyncManager.setSuccessStatus(2,resSuccess);
    if(scope_SettingsPresenter.asyncManager.areAllservicesDone(scope_SettingsPresenter.numberOfAsyncForLocation))
    {
      scope_SettingsPresenter.navToEnterLocationDetailsScreen();
    }
  };
  Settings_PresentationController.prototype.getCitiesListFailureCB=function(resErr){
    scope_SettingsPresenter.asyncManager.setErrorStatus(2,resErr);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(resErr["isServerUnreachable"])
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", resErr);
  };
  Settings_PresentationController.prototype.navToEnterLocationDetailsScreen=function(){
    var locationDetails = {};
    locationDetails.Countries = scope_SettingsPresenter.asyncManager.getData(0).records;
    locationDetails.States = scope_SettingsPresenter.asyncManager.getData(1).records;
    locationDetails.Cities = scope_SettingsPresenter.asyncManager.getData(2).records;
    var userPreferencesManager=applicationManager.getUserPreferencesManager();
    userPreferencesManager.setLocationDetails(locationDetails);
    var flowType=scope_SettingsPresenter.getUserAddressFlowType();
    if(flowType=="edit"){
      scope_SettingsPresenter.commonFunctionForNavigation("frmProfileEditAddress");
    }
    else if(flowType=="add"){
      scope_SettingsPresenter.commonFunctionForNavigation("frmProfileAddAddress");
    }
  };
  Settings_PresentationController.prototype.getCountryData=function(){
    var userPreferencesManager=applicationManager.getUserPreferencesManager();
    var countryData=userPreferencesManager.getCountryData();
    return countryData;
  };
  Settings_PresentationController.prototype.getStatesData=function(){
    var userPreferencesManager=applicationManager.getUserPreferencesManager();
    var statesData=userPreferencesManager.getStatesData();
    return statesData;
  };
  Settings_PresentationController.prototype.getCitiesData=function(){
    var userPreferencesManager=applicationManager.getUserPreferencesManager();
    var citiesData=userPreferencesManager.getCitiesData();
    return citiesData;
  };
  Settings_PresentationController.prototype.filterStatesBasedOnCountryId=function(countryId){
    var userPreferencesManager=applicationManager.getUserPreferencesManager();
    var statesData=userPreferencesManager.filterStatesBasedOnCountryId(countryId);
    return statesData;
  };
  Settings_PresentationController.prototype.filterCitiesBasedOnCountryIdAndStateId=function(countryCode,cityCode){
    var userPreferencesManager=applicationManager.getUserPreferencesManager();
    var citiesData=userPreferencesManager.filterCitiesBasedOnCountryIdAndStateId(countryCode,cityCode);
    return citiesData;
  };
  Settings_PresentationController.prototype.updateCityAndStateCode=function(codes){
    this.selectedCityAndStateCodes=codes;
    var addressObj=scope_SettingsPresenter.getUserAddressData();
    addressObj["countryId"]=codes.countryId;
    addressObj["stateId"]=codes.state;
    addressObj["cityId"]=codes.city;
  }
  Settings_PresentationController.prototype.getCityAndStateCode=function(){
    return this.selectedCityAndStateCodes;
  }
  Settings_PresentationController.prototype.updateUserSelectedAddressData=function(address){
    this.userPreferredAddress=address.isPreferredAddress;
  };
  Settings_PresentationController.prototype.isValidZipCode = function(zipCode, form) {
    var validationManager = applicationManager.getValidationUtilManager();
    var isValidZipCode = validationManager.isValidZip(zipCode);
    var controller = applicationManager.getPresentationUtility().getController(form, true);
    if (isValidZipCode === true) {
      controller.validateZipCode();
    } else {
      controller.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("i18n.common.invalidZipCode"));
    }
  };
  Settings_PresentationController.prototype.getCustomerAccountAlertPreference = function() {
    scope_SettingsPresenter.alertsManager.getCustomerAccountAlertPreference(scope_SettingsPresenter.getCustomerAccountAlertPreferencePresentationSuccessCallback, scope_SettingsPresenter.getCustomerAccountAlertPreferencePresentationErrorCallback);
  };
  Settings_PresentationController.prototype.getCustomerAccountAlertPreferencePresentationSuccessCallback = function (resSuccess) {
    try {
      let accountsAlertsData = resSuccess.accountInfo;
      let accountManager = applicationManager.getAccountManager();
      accountManager.fetchInternalAccounts(scope_SettingsPresenter.presentationFetchAccountsForAlertsSucc.bind(scope_SettingsPresenter, accountsAlertsData), scope_SettingsPresenter.presentationFetchAccountsForAlertsErr.bind(scope_SettingsPresenter));
    } catch (err) {
      let controller = _kony.mvc.GetController('SettingsAlertsUIModule/frmAlertsAccountPref', true,{"appName" : "AlertSettingsMA"});
      controller.setUpdateFlag();
      let navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("frmAlertsAccountPref", resSuccess.accountInfo);
      navManager.navigateTo({ "appName": "AlertSettingsMA", "friendlyName": "SettingsAlertsUIModule/frmAlertsAccountPref" });
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
  };
  Settings_PresentationController.prototype.presentationFetchAccountsForAlertsSucc = function(accountsAlertsData, resSuccess){
    let accountsData = resSuccess;
    let accountStatusMap = {};
    accountsData.forEach(account => {
      accountStatusMap[account.Account_id] = account.accountStatus ? account.accountStatus : "";
    });
    let accountsAlertsFilteredData = [];
    for (accountAlertIndex in accountsAlertsData) {
      let accountAlert = accountsAlertsData[accountAlertIndex];
      let accountID = accountAlert.accountID;
      if (accountStatusMap[accountID] && !(["CLOSED"].includes(accountStatusMap[accountID].toUpperCase()))) {
        accountsAlertsFilteredData.push(accountAlert);
      }
    }
    var controller = _kony.mvc.GetController('SettingsAlertsUIModule/frmAlertsAccountPref', true,{"appName" : "AlertSettingsMA"});
    controller.setUpdateFlag();
    var navManager = applicationManager.getNavigationManager();
    navManager.setCustomInfo("frmAlertsAccountPref", accountsAlertsFilteredData);
    navManager.navigateTo({"appName" : "AlertSettingsMA", "friendlyName" : "SettingsAlertsUIModule/frmAlertsAccountPref"});
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
  Settings_PresentationController.prototype.presentationFetchAccountsForAlertsErr = function(errRes){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (errRes["isServerUnreachable"]) {
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errRes);
    }
  };
  Settings_PresentationController.prototype.getEnableEStatements = function() {
    var config = applicationManager.getConfigurationManager();
    var locale=config.getLocale();
    var termsAndConditions=config.getTermsAndConditions();
    var parmns={
      "languageCode": termsAndConditions[locale],
      "termsAndConditionsCode": termsAndConditions["EStatements"]
    };
    var tncman  =applicationManager.getTermsAndConditionsManager();
    tncman.fetchTermsAndConditionsPostLogin(parmns,scope_SettingsPresenter.termsAndConditionSuccessCallback,scope_SettingsPresenter.termsAndConditionErrorCallback);
  };
  Settings_PresentationController.prototype.termsAndConditionSuccessCallback = function(response){
    var SettingsAlertsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
    var navManager = applicationManager.getNavigationManager();
    navManager.setCustomInfo("frmEStmtTermsAndConditions",response.termsAndConditionsContent);
    if(response.contentTypeId == "URL"){
      kony.application.openURL(response.termsAndConditionsContent);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
    else{
      navManager.navigateTo("frmEStmtTermsAndConditions");
    }
  };
  Settings_PresentationController.prototype.termsAndConditionErrorCallback = function(reserr){
    if (reserr["isServerUnreachable"])
    {
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", reserr);
    }
  };
  Settings_PresentationController.prototype.getTnCForDisablingEBankingAccess = function(){
    var config = applicationManager.getConfigurationManager();
   var locale=config.getLocale();
   var termsAndConditions=config.getTermsAndConditions();
    var param={
    "languageCode": termsAndConditions[locale],
     "termsAndConditionsCode": termsAndConditions["OnlineBankingAccess"]
  };
   var termsAndConditions = applicationManager.getTermsAndConditionsManager();
   termsAndConditions.fetchTermsAndConditionsPostLogin(param,scope_SettingsPresenter.getTermsandConditionsSuccessCallBack,scope_SettingsPresenter.getTermsandConditionsErrorCallback);
 };
 Settings_PresentationController.prototype.getTermsandConditionsSuccessCallBack = function(response){
   var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("frmTermsAndCondition", {
            "content": response.termsAndConditionsContent,
            "flowType": "DisableEBanking",
            "contentTypeID": response.contentTypeId
        });
        navManager.navigateTo("frmTermsAndCondition",true);
  };
  Settings_PresentationController.prototype.getTermsandConditionsErrorCallback = function(err){
     applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (err["isServerUnreachable"]) {
        applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
     }else{
             var controller = applicationManager.getPresentationUtility().getController('frmEBankingAccess', true);
           var errorMsg = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.enroll.SomethingWrong");
           controller.bindViewError(errorMsg);
       }
  };

  Settings_PresentationController.prototype.disableEBankingAccess = function(){
    var userPrefManager = applicationManager.getUserPreferencesManager();
    var userName = userPrefManager.getUserObj().userName;
    var params = {
      "UserName": userName,
      "Status":"SUSPENDED"
    };
    userPrefManager.updateUserStatus(params,this.disableEBankingAccessSuccess,this.disableEBankingAccessError);
   };

   Settings_PresentationController.prototype.disableEBankingAccessSuccess = function(response){
    if (response.MFAAttributes && response.MFAAttributes.isMFARequired == "true") {
      const mfaManager = applicationManager.getMFAManager();
      const mfaJSON = {
        flowType: "SUSPEND_USER",
        response: response,
        objectServiceDetails: {
          serviceName: "RBObjects",
          dataModel: "DbxUser",
          operationName: "updateDBXUserStatus",
        },
      };
      mfaManager.initMFAFlow(mfaJSON);
    } else {
      var authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
      authMod.presentationController.disableEBankingLogout();
    }
   };

   Settings_PresentationController.prototype.disableEBankingAccessError = function(error)
   {
    if (error["isServerUnreachable"]) {
        applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
     }else{
           var controller = applicationManager.getPresentationUtility().getController('frmTermsAndCondition', true);
           var errorMsg = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.enroll.SomethingWrong");
           controller.bindGenericError(errorMsg);
       }
   };

  Settings_PresentationController.prototype.getCustomerAccountAlertPreferencePresentationErrorCallback = function(reserr){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
  Settings_PresentationController.prototype.checkExistingPassword = function(currentPassword){
    var userPreferencesManager=applicationManager.getUserPreferencesManager();
    userPreferencesManager.checkExistingPassword(currentPassword, this.checkExistingPasswordSuccess.bind(this), this.checkExistingPasswordFailure.bind(this));
  };
  Settings_PresentationController.prototype.checkExistingPasswordSuccess = function(response){
    var formController = applicationManager.getPresentationUtility().getController('frmProfileChangeAndUpdatePassword',true);
    if (response.result === "The user is verified") {
      formController.updatePassword(response);
    } else if(response.result === "Invalid Credentials"){
      formController.onInvalidCurrentPassword();
    } else{
      var i18nV = applicationManager.getPresentationUtility().getStringFromi18n('kony.error.StandardErrorMessage');
      formController.bindViewError(i18nV);
    }
  };
  Settings_PresentationController.prototype.checkExistingPasswordFailure = function(resErr){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(resErr["isServerUnreachable"])
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", resErr);
    else
    {
      var formController = applicationManager.getPresentationUtility().getController('frmProfileChangeAndUpdatePassword',true);
      var i18nV = applicationManager.getPresentationUtility().getStringFromi18n('kony.error.StandardErrorMessage');
      formController.bindViewError(i18nV);
    }
  };
  
  Settings_PresentationController.prototype.getConsentData = function() {
    var settingsManager = applicationManager.getSettingsManager();
    settingsManager.getConsentData(this.getConsentDataSuccess, this.getConsentDataError);
    
  };
  
  Settings_PresentationController.prototype.getConsentDataSuccess = function(response) {

    scope_SettingsPresenter.consentRespData = response;
    var controller = applicationManager.getPresentationUtility().getController('frmConsentManagement', true);  

    if(response.consentTypes !== undefined){
      controller.setSegmentData(scope_SettingsPresenter.mapConsentData(response));
    }else{
      controller.showErrorMessage(applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.consent.no.records'));
    }

  };

  Settings_PresentationController.prototype.getConsentDataError = function(error) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var controller = applicationManager.getPresentationUtility().getController('frmConsentManagement', true);
      controller.showErrorMessage(error.errorMessage);

  };
  
  Settings_PresentationController.prototype.updateConsentData = function(consentDetails) {
    
    var consentData = {
      "arrangementId": consentDetails.consentTypes[0].arrangementId,
      "consent": JSON.stringify({
        'consentTypes': consentDetails.consentTypes[0].consents
      }, ['consentTypes','consentType', 'consentGiven', 'subTypes', 'consentSubType', 'consentSubTypeGiven']).replace(/"/g, "'").replace(/consentSubTypeGiven/g, "subTypeConsentGiven")

    };
    var settingsManager = applicationManager.getSettingsManager();
    settingsManager.updateConsentData(consentData, this.updateConsentDataSuccess, this.updateConsentDataError);
    
  };
  
  Settings_PresentationController.prototype.updateConsentDataSuccess = function(response) {
    
   scope_SettingsPresenter.getConsentData();
    
  };

  Settings_PresentationController.prototype.updateConsentDataError = function(error) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var controller = applicationManager.getPresentationUtility().getController('frmConsentManagement', true);
      controller.showErrorMessage(error.errorMessage);

  };

  Settings_PresentationController.prototype.updateUserConsent = function(inputParams,successCallback,failureCallback){
    var settingsManager = applicationManager.getSettingsManager();
    settingsManager.updateUserAlerts(inputParams,successCallback,failureCallback);
  };

  
  Settings_PresentationController.prototype.mapConsentData = function(response) {

    
    var resConsentTypes = response.consentTypes[0].consents;
    var viewEditBtn = false;
    var allConsent = [];    

    for (var item in resConsentTypes) {
      var consData = [];
      var subTypesPresent = "";
      var consentGivenYes = "";
      var placeholderText = "";
      
      switch(resConsentTypes[item].consentType){

            case "CREDITCHECK" :placeholderText = applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.consent.creditCheck'); 
              break;
            case "DATAPROFILING" :placeholderText = applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.consent.dataProfiling'); 
              break;
            case "DIRECTMKTING" :placeholderText = applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.consent.directMarketing'); 
              break;
            case "PERSONALLOAN" :placeholderText = applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.consent.personalLoan'); 
              break;
            default :placeholderText = applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.consent.dataProfiling'); 
          };
      if (resConsentTypes[item].subTypes)  {
        subTypesPresent = true;

        for (var subItem in resConsentTypes[item].subTypes){
          
          var subTypeChannel;
          
          switch(resConsentTypes[item].subTypes[subItem].consentSubType){

            case "EMAIL" : subTypeChannel = applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.consent.email'); 
              break;
            case "PHONE" :subTypeChannel = applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.consent.phone'); 
              break;
            case "SMS" : subTypeChannel = applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.consent.sms'); 
              break;
            default : subTypeChannel = applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.Alerts.pushNotifications'); 
          };
                              
          var consentDataRow = {          
          "lblDetailsConsent" : {
            "text":subTypeChannel,
            "accessibilityconfig": {
              "a11yLabel": subTypeChannel
          }
          },           
            lblValue : "",
            switchSelectIndex : ""
          };
          
          if(resConsentTypes[item].subTypes[subItem].consentSubTypeGiven === "YES"){
            consentGivenYes = true;
            consentDataRow.switchSelectIndex = {"isVisible":true, "selectedIndex":0, "enable":((resConsentTypes[item].consentBlock === "YES")?false:true)};
            consentDataRow.lblValue = {"isVisible":true, "text": applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.common.Yes'), "accessibilityConfig": {"a11yLabel": applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.common.Yes')}};
          } else {
            consentDataRow.switchSelectIndex = {"isVisible":true, "selectedIndex":1, "enable":((resConsentTypes[item].consentBlock === "YES")?false:true)};     
            consentDataRow.lblValue = {"isVisible":true, "text": applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.common.No'), "accessibilityConfig": {"a11yLabel": applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.common.No')}};
          }

          consData.push(consentDataRow);
        }
      } else {

        subTypesPresent = false;
        var consentDataRow = {
          lblDetailsConsent : "",
          lblValue : "",
          switchSelectIndex : ""
        };

        consentDataRow.lblDetailsConsent = {"text":applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.consent.allow') + ' ' + resConsentTypes[item].consentTypeName, "accessibilityConfig": {"a11yLabel": applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.consent.allow') + ' ' + resConsentTypes[item].consentTypeName}};                
        
        if(resConsentTypes[item].consentGiven === "YES"){
          consentGivenYes = true;
          consentDataRow.switchSelectIndex = {"isVisible":true, "selectedIndex":0, "enable":((resConsentTypes[item].consentBlock === "YES")?false:true)}; 
          consentDataRow.lblValue = {"isVisible":true, "text" : applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.common.Yes'), "accessibilityConfig": {"a11yLabel": applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.common.Yes')}};
        } else {
          consentDataRow.switchSelectIndex = {"isVisible":true, "selectedIndex":1, "enable":((resConsentTypes[item].consentBlock === "YES")?false:true)};
          consentDataRow.lblValue = {"isVisible":true, "text" : applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.common.No'), "accessibilityConfig": {"a11yLabel": applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.common.No')}};
        }

        consData.push(consentDataRow);
      }

      var consHeader  = {
        "lblConsentHeading" : {
          "text":resConsentTypes[item].consentTypeName,
          "accessibilityConfig": {
          "a11yLabel":resConsentTypes[item].consentTypeName
          }
        },
        "lblPlaceholder":{
          "text":placeholderText,
          "accessibilityConfig": {
          "a11yLabel":placeholderText
          }
        }
      };
          

      if (resConsentTypes[item].consentBlock === "YES") {
        consHeader.lblErrorText = {"isVisible" : true, "text" : applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.consent.block.message'), "accessibilityConfig": {"a11yLabel": applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.consent.block.message')}};
        consHeader.imgErrorIcon = {"isVisible" : true};
 
        if (consentGivenYes === true) {
          consHeader.lblConsentBlocked = {"isVisible" : true, "text" : applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.consent.block.alert'), "accessibilityConfig": {"a11yLabel": applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.consent.block.alert')}};
        }    
      } else {
        viewEditBtn = true;
      }

      allConsent.push([
        consHeader,
        consData 
      ]);
    };
     
     return {allConsent:allConsent, viewEditBtn:viewEditBtn};   
     
   };

  
  Settings_PresentationController.prototype.getTPPData = function() {
    var settingsManager = applicationManager.getSettingsManager();
    settingsManager.getPSD2ConsentData(this.getTPPDataSuccess, this.getTPPDataError);
  };

  Settings_PresentationController.prototype.getTPPDataSuccess = function(response) {
    var notRevoked = [];
    for (item in response.consentTypes){
      if (response.consentTypes[item].consentStatus.toUpperCase() !== "REVOKEDBYPSU") {
        notRevoked.push(response.consentTypes[item]);
      }
    };
    scope_SettingsPresenter.tppData = notRevoked;
    var controller = applicationManager.getPresentationUtility().getController('frmSelectTPP', true); 
    if(response.consentTypes !== undefined && notRevoked.length){
      controller.setSegmentData(scope_SettingsPresenter.mapTPPData(notRevoked));
    }else{
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      controller.showErrorMessage(applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.consent.no.tpp'));
    }
  };
  Settings_PresentationController.prototype.getTPPDataError = function(error) {	
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var controller = applicationManager.getPresentationUtility().getController('frmSelectTPP', true);
    controller.showErrorMessage(error.errorMessage);
  };

  Settings_PresentationController.prototype.mapTPPData = function(response) {
    var formatUtil = applicationManager.getFormatUtilManager();
    var tppData = [];

    for (var item in response) {
      if(response[item].consentStatus.toUpperCase() !== "REVOKEDBYPSU"){
        var isBlocked = false;
        var lblDaysLeft;

        if (response[item].consentStatus !== undefined && response[item].consentStatus.toUpperCase() === "EXPIRED") {
          lblDaysLeft = {
            "skin":"sknLblEE0005SSPR37px",
            "text": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.consent.expired.status"),
            "accessibilityConfig": {"a11yLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.consent.expired.status")}
          };
          if (response[item].tppStatus !== undefined && response[item].tppStatus.toUpperCase() === "BLOCKED") {
            isBlocked = true;
          }
        } else {
          if (response[item].tppStatus !== undefined && response[item].tppStatus.toUpperCase() === "BLOCKED") {
            isBlocked = true;
            
            lblDaysLeft = {
              "skin":"sknLblEE0005SSPR37px",
              "text": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.consent.blocked.status"),
              "accessibilityConfig": {"a11yLabel":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.consent.blocked.status")}
            };
          } else{
            var ddValid = response[item].validUntil.substring(0,2);
            var mmValid = response[item].validUntil.substring(3,6);
            var yyyyValid = response[item].validUntil.substring(7,11);
            //"YYYY-MM-DD"
            var validDate = yyyyValid + "-" + mmValid + "-" + ddValid;
            var dateDiff = formatUtil.getNumberOfDaysBetweenTwoDates(formatUtil.getDateObjectfromString(validDate), new Date());
            var skinDaysLeft = (dateDiff < scope_SettingsPresenter.numberOfDays)?"sknLblE5690BSSPR37px":"sknLbl04AA16SSPR37px";
            var textDaysLeft = dateDiff.toString() + " " + applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.consent.days.left");
            lblDaysLeft = {"skin":skinDaysLeft,"text":textDaysLeft,"accessibilityConfig": {"a11yLabel":textDaysLeft}};

          }
        }

        var labelTPP = (response[item].thirdpartyprovider !== undefined && response[item].thirdpartyprovider !== "")? response[item].thirdpartyprovider : "Third Party Provider Bank"

        var imageTPP = {"src":response[item].imagePath,
                        "accessibilityConfig": {
                        "a11yLabel":response[item].thirdpartyprovider + "logo"
                      }};
        var tppRecord  = {
          "id": response[item].arrangementId,
          "imgTPP" : imageTPP,			
          "lblTPP" : labelTPP,
          "lblDaysLeft" : lblDaysLeft,
          "isBlocked" : isBlocked};
        tppData.push(tppRecord);
      }

    }
    return tppData;
  };
  Settings_PresentationController.prototype.updatePSD2Consent = function(arrangementId){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var settingsManager = applicationManager.getSettingsManager();
    var mfaManager = applicationManager.getMFAManager();
    mfaManager.setMFAFlowType("PSD2_TPP_CONSENT_REVOKED");
    var consentString = "{'consentStatuses': [{'consentStatus': 'revokedByPsu'}]}"
    
    var params = {
      "arrangementId": arrangementId,
      "consent": consentString,
    };
    settingsManager.updatePSD2ConsentData(params,scope_SettingsPresenter.updatePSDConsentSuccess, scope_SettingsPresenter.updatePSDConsentFailure);
  };
  
  Settings_PresentationController.prototype.updatePSDConsentSuccess = function(data){
    
  
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    
      if(data.MFAAttributes && data.MFAAttributes.isMFARequired == "true"){
        var mfaJSON = {
          "flowType" : "PSD2_TPP_CONSENT_REVOKED",
          "response" : data
        };
        applicationManager.getMFAManager().initMFAFlow(mfaJSON);
      } else {
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo("frmSelectTPP");
      }
   
    
  };
  
  Settings_PresentationController.prototype.updatePSDConsentFailure = function(error){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var controller = applicationManager.getPresentationUtility().getController('frmSelectTPP', true);
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo("frmSelectTPP");
    controller.showErrorMessage(error.errorMessage);
  };
  
  
  Settings_PresentationController.prototype.mapTPPSelectBank = function(rowId) {
    var controller = applicationManager.getPresentationUtility().getController('frmTppBankNameSelection', true);     
    var formatUtil = applicationManager.getFormatUtilManager();
    var accountDataTpp = [];
    var tppResponse = scope_SettingsPresenter.tppData;
    var ddValid = tppResponse[rowId].validUntil.substring(0,2);
    var mmValid = tppResponse[rowId].validUntil.substring(3,6);
    var yyyyValid = tppResponse[rowId].validUntil.substring(7,11);
    //"YYYY-MM-DD"
    var validDate = yyyyValid + "-" + mmValid + "-" + ddValid;

    var configManager = applicationManager.getConfigurationManager()
    var expiryDate = formatUtil.getFormatedDateString(new Date(validDate), configManager.frontendDateFormat[configManager.getLocale()]);
  
    
    var accounts = tppResponse[rowId].accountIBANs;
    
    for (var item in accounts) {

      let ibanItem = accounts[item].accountIBAN;
      if (ibanItem.length > 6){
        ibanItem = ibanItem.match(/.{4}/g).join(' ');
      }

      var accDetails  = {
        "lblTitle" : accounts[item].shortName,
        "lblDetails" : ibanItem
      };
      accountDataTpp.push(accDetails);
    }
    controller.showExpiryDate(expiryDate);
    controller.setSegmentData(accountDataTpp);
    controller.view.forceLayout();
  };
    
  Settings_PresentationController.prototype.mapAccountDetails = function(rowId, iban, rowIndexTppRes) {
    var controller = applicationManager.getPresentationUtility().getController('frmTppAccountDetails', true);          
    var consentTypeTpp = [];
    var tppResponse = scope_SettingsPresenter.tppData;    
    var accounts = tppResponse[rowIndexTppRes].accountIBANs;

    var consentTypes = accounts[rowId].consents;
    for(var type in consentTypes){
      if(consentTypes[type].consentType !== "allPsd2"){

        consentTypeTpp.push({"lblTitle" : kony.i18n.getLocalizedString("i18n.ProfileManagement.consent." + consentTypes[type].consentType + ".description"),
                             "lblDetails" : kony.i18n.getLocalizedString("i18n.ProfileManagement.consent." + consentTypes[type].consentType + ".details")
                            });
      }

    }
    controller.setSegmentData(consentTypeTpp);
  };
  Settings_PresentationController.prototype.showFeedbackPopup = function(context){
    var valManager = applicationManager.getValidationUtilManager();
    if(valManager.isFeedBackScreenRequired(context)){
      KNYMetricsService.sendCustomMetrics("frmInAppFeedbackRating", {"Show Rating":"Users Asked To Provide Feedback"});
      var config = applicationManager.getConfigurationManager();
            var scope = this;
            var basicProperties =
            {
                "message": "Are you enjoying the app?",
                "alertType": constants.ALERT_TYPE_CONFIRMATION,
                "alertTitle": "We Value Your Feedback",
                "yesLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.Yes"),
                "noLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertNo"),
                "alertIcon": "appicon.png",
                "alertHandler": function(response) {
                    if(response){
                       scope_FeedbackPresenter.StoreRatingPopup();
                        KNYMetricsService.sendCustomMetrics("frmInAppFeedbackRating", {"Store Rating":"Users Enjoying App"});
                    }else{
                      scope_FeedbackPresenter.showFeedBack();
                      KNYMetricsService.sendCustomMetrics("frmInAppFeedbackRating", {"Dismiss Rating":"Users Not Enjoying App"});
                    }
                }
            };
        applicationManager.getPresentationUtility().showAlertMessage(basicProperties, {});
    }
    };
  return Settings_PresentationController;
});