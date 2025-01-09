define([], function() {
    function Settings_PresentationController() {
        scope_SettingsPresenter = this;
        var defaultAcc;
        kony.mvc.Presentation.BasePresenter.call(this);
		this.flowType="";
        this.eStatementPopup="";
        this.estatementData={};
        scope_SettingsPresenter.userAddressFlowtype = null;      
        scope_SettingsPresenter.numberOfAsyncForLocation=3;
        this.selectedCityAndStateCodes="";
        this.userPreferredAddress="";
      	this.newUserName="";
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
   Settings_PresentationController.prototype.updateUserAddressData = function(userData){
    var userObj = applicationManager.getUserPreferencesManager();
    userObj.setuserAddressAttribute("addressLine1",(userData.addressLine1 && userData.addressLine1 !== "" && userData.addressLine1 !== null) ? userData.addressLine1 : "");
    userObj.setuserAddressAttribute("addressLine2", (userData.addressLine2 && userData.addressLine2 !== "" && userData.addressLine2 !== null) ? userData.addressLine2 : "");
    userObj.setuserAddressAttribute("state", (userData.state && userData.state !== "" && userData.state !== null) ? userData.state : "");
    userObj.setuserAddressAttribute("city",  (userData.city && userData.city !== "" && userData.city !== null) ? userData.city : "");
    userObj.setuserAddressAttribute("country",  (userData.country && userData.country !== "" && userData.country !== null) ? userData.country : "");
    userObj.setuserAddressAttribute("zipcode",  (userData.zipcode && userData.zipcode !== "" && userData.zipcode !== null) ? userData.zipcode : "");
  };
  Settings_PresentationController.prototype.updateUserAddressDataOnEdit = function(userData){
    var userObj = applicationManager.getUserPreferencesManager();
    userObj.setuserAddressAttribute("addressLine1", (userData.AddressLine1 && userData.AddressLine1 !== "" && userData.AddressLine1 !== null) ? userData.AddressLine1 : "");
    userObj.setuserAddressAttribute("addressLine2", (userData.AddressLine2 && userData.AddressLine2 !== "" && userData.AddressLine2 !== null) ? userData.AddressLine2 : "");
    userObj.setuserAddressAttribute("state", (userData.RegionName && userData.RegionName !== "" && userData.RegionName !== null) ? userData.RegionName : "");
    userObj.setuserAddressAttribute("city",  (userData.CityName && userData.CityName !== "" && userData.CityName !== null) ? userData.CityName : "");
    userObj.setuserAddressAttribute("country",   (userData.CountryName && userData.CountryName !== "" && userData.CountryName !== null) ? userData.CountryName : "");
    userObj.setuserAddressAttribute("zipcode",  (userData.ZipCode && userData.ZipCode !== "" && userData.ZipCode !== null) ? userData.ZipCode : "");
    userObj.setuserAddressAttribute("addressType",  (userData.AddressType && userData.AddressType !== "" && userData.AddressType !== null) ? userData.AddressType : "");
    //userObj.setuserAddressAttribute("isPreferredAddress", (userData.isPreferredAddress && userData.isPreferredAddress !== "" && userData.isPreferredAddress !== null) ? userData.isPreferredAddress : "");
    userObj.setuserAddressAttribute("isPreferredAddress", (userData.isPrimary && userData.isPrimary !== "" && userData.isPrimary !== null) ? userData.isPrimary : "");
    userObj.setuserAddressAttribute("addressId",  (userData && userData.Address_id && userData.Address_id !== "" && userData.Address_id !== null) ? userData.Address_id : "");
    userObj.setuserAddressAttribute("cityId",  (userData && userData.City_id && userData.City_id !== "" && userData.City_id !== null) ? userData.City_id : "");
    userObj.setuserAddressAttribute("countryCode",  (userData && userData.CountryCode && userData.CountryCode !== "" && userData.CountryCode !== null) ? userData.CountryCode : "");
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
    userObj.setuserAddressAttribute("isPreferredAddress",  (userData.isPreferredAddress && userData.isPreferredAddress !== "" && userData.isPreferredAddress !== null) ? userData.isPreferredAddress : "");
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
  Settings_PresentationController.prototype.presentationAccountsSucc = function(successRes){
    	 var navMan = applicationManager.getNavigationManager();
    	 navMan.setCustomInfo("frmEStmtAccountPreferences",successRes);
         navMan.navigateTo("frmEStmtAccountPreferences");
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
            scope_SettingsPresenter.getDevDetails();
            var navManger = applicationManager.getNavigationManager();
            var data = scope_SettingsPresenter.defaultAccounts();
            data.popUpMsg = ("Default Account has been changed successfully");
             navManger.setCustomInfo("frmSetDefaultAccount",data);
            applicationManager.getPresentationUtility().dismissLoadingScreen();
          	navManger.navigateTo("frmSetDefaultAccount");
   };
   Settings_PresentationController.prototype.fetchUserFailure = function(err) {
   	         applicationManager.getPresentationUtility().dismissLoadingScreen();
			 if (err["isServerUnreachable"]){
				applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
			}
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
     else{
       var navManager = applicationManager.getNavigationManager();
       var msg = kony.i18n.getLocalizedString("kony.mb.Profile.changeUsername");
       var loginData = {"toastMessage": msg,"typeSuccess": true};
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
     var i18n_string = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.enroll.usernameUnavailableMsg");
     var controller = applicationManager.getPresentationUtility().getController('frmProfileUsername',true);
     controller.bindViewError(i18n_string);
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
   Settings_PresentationController.prototype.navigateToChangePassword = function(){
			applicationManager.getPresentationUtility().showLoadingScreen();
            var userObj = applicationManager.getUserPreferencesManager();
            var userName = userObj.getUserName();
            var oldPassword = userObj.getPassword();
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo('frmProfileChangePassword',userName);
            navManager.navigateTo('frmProfileChangeAndUpdatePassword');
   };
  Settings_PresentationController.prototype.validatePassword = function(password){
    var validationUtility = applicationManager.getValidationUtilManager();
    if(validationUtility.isValidPassword(password) === false){
      var formController = applicationManager.getPresentationUtility().getController('frmProfileChangeAndUpdatePassword',true);
      formController.showFlxSecurityRequirements();
    }
  };
   Settings_PresentationController.prototype.checkAndUpdatePassword = function(oldPassword,newPassword,reEnteredPassword){
      var userObj = applicationManager.getUserPreferencesManager();
     var password = userObj.getPassword();
     var formController = applicationManager.getPresentationUtility().getController('frmProfileChangeAndUpdatePassword',true);
     if(password !== oldPassword){
       var i18nV = applicationManager.getPresentationUtility().getStringFromi18n('kony.profile.currentpasswordWrong');
       formController.bindViewError(i18nV);
       return;
     }
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
     else{
       var navManager = applicationManager.getNavigationManager();
       var msg = kony.i18n.getLocalizedString("kony.mb.Profile.changePassword");
       var loginData = {"toastMessage": msg,"typeSuccess": true};
       navManager.setCustomInfo("frmLoginToast",loginData);
       var authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
       authMod.presentationController.onLogout();
     }
   };
   Settings_PresentationController.prototype.updatePasswordFailure = function(err){
     applicationManager.getPresentationUtility().dismissLoadingScreen();
     if(err&&err["isServerUnreachable"]){
       applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
       return;
     }
     var formController = applicationManager.getPresentationUtility().getController('frmProfileChangeAndUpdatePassword',true);
     var i18nStr = applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.enroll.SomethingWrong');
     formController.bindViewError(i18nStr);
   };
   Settings_PresentationController.prototype.navigateToProfilePersonalDetails = function(){
     applicationManager.getPresentationUtility().showLoadingScreen();
     var userObj = applicationManager.getUserPreferencesManager();
     var userDetails = userObj.getUserObj();
     scope_SettingsPresenter.getUserAllPhoneNumbers();
   };
   Settings_PresentationController.prototype.getDevDetails = function(){
      var loginData = {};
     var navManager = applicationManager.getNavigationManager();
     var userObj = applicationManager.getUserPreferencesManager();
     var devManager = applicationManager.getDeviceUtilManager();
     loginData.accPreview = userObj.isAccountPreviewEnabled();
     loginData.deviceReg = userObj.isDeviceRegistered();
     loginData.defLoginMode = userObj.getDefaultAuthMode();
     loginData.pin = userObj.isPinSet();
     loginData.faceId = userObj.isFacialAuthEnabled();
	  loginData.isRememberMeOn = userObj.isRememberMeOn();
     loginData.istouchIdAvail = devManager.isTouchIDSupported();
     navManager.setCustomInfo("frmSettings", loginData);
   };
    Settings_PresentationController.prototype.getAuthModeData = function()
    {
      var authMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
     	return authMode.presentationController.getAuthFlags();
    };
   Settings_PresentationController.prototype.acctPreviewBack = function(Status){
      var userObj = applicationManager.getUserPreferencesManager();
      var navManger = applicationManager.getNavigationManager();
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
      navManger.navigateTo("frmSettings");
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
       var name = (data[i].type === "" ||data[i].type === undefined ||data[i].type === null)? "Mobile" : data[i].type;
       if(data[i].isPrimary === "1"){
         name += '(Marked as Primary)';
       }
       else if(data[i].countryType && data[i].countryType.toLowerCase() === 'international'){
         name += '(International)';
       }
       temp.lblDetail = name;
       temp.lblDetailValue = data[i].phoneNumber;
       temp.template = 'flxDetails';
       result.push(temp);
     }
     var result1 = [];
     if(result.length > 0){
       var temp1 = {};
       temp1.lblHeader = "Registered Phone Number";
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
     dob = forUtility.getFormatedDateString(dateobj,forUtility.APPLICATION_DATE_FORMAT);
     var ssn = applicationManager.getDataProcessorUtility().maskAccountNumber(userObj.getSSN());
     var email = userObj.getUserEmail();
     var secondaryEmail = userObj.getUserObj().secondaryemail;
     var secondaryEmail2 = userObj.getUserObj().secondaryemail2;
     var temp2 = {};
     temp2.lblDetail = "Date of Birth";
     temp2.lblDetailValue =  dob;
     temp2.template = "flxDetails";
     var temp3 = {
           "lblDetail": kony.i18n.getLocalizedString("kony.tab.Forgot.EnterSSNTitle"),
           "lblDetailValue": ssn,
           "flxSeparator": {"isVisible" : false},
           "template" : "flxDetails"
         };
     dobssn.push(temp2);
     dobssn.push(temp3);
     var answer = [];
     answer.push({"lblHeader":"Personal Details","template":"flxDetailsHeader"});
     answer.push(dobssn);
     var segmentData = [];
     segmentData.push(answer);
     if(result1.length > 0)
        segmentData.push(result1);
     var emails = [];
     var header = {
        "lblHeader": "Registered Email ID's" ,
        "template" : "flxDetailsHeader"
      };
     emails.push(header);
     var emailData =[];
     var rowData = {
         "lblDetail": "Primary Email ID",
         "lblDetailValue": email,
         "template" : "flxDetails"
       };
     var rowData1 = {
       "lblDetail": "Secondary Email ID",
        "lblDetailValue": secondaryEmail,
        "template" : "flxDetails"
     };
     var rowData2 = {
          "lblDetail": "Secondary Email ID2",
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
     scope_SettingsPresenter.segmentProfileData = segmentData;
     //scope_SettingsPresenter.getUserAllAddresses();
//      var userObj = applicationManager.getUserPreferencesManager();
//      var addressObj = userObj.getEntitlementAddresses();
//      scope_SettingsPresenter.getUserAllAddressesSuccess(addressObj);
     var userPreferencesManager = applicationManager.getUserPreferencesManager();
    var main_user = applicationManager.getUserPreferencesManager().getUserName();
    var params = {"userName" : main_user};
    userPreferencesManager.fetchEntitlementsForUser(params,scope_SettingsPresenter.getUserAllAddressesSuccess,scope_SettingsPresenter.getUserAllAddressesFailure);
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
        "lblHeader": "Registered Addresses" ,
        "template" : "flxDetailsHeader"
      };
     var addressSegData = [];
     data=data.Addresses;
     for(var i =0;i<data.length;i++){
       data[i].addressLine1=data[i].AddressLine1;
       data[i].addressLine2=data[i].AddressLine2;
       data[i].city=data[i].CityName;
       data[i].country=data[i].CountryName;
       data[i].isPreferredAddress=data[i].isPrimary;
       data[i].addressId=data[i].Address_id;
       data[i].addressType=data[i].AddressType;
       data[i].zipcode=data[i].ZipCode;
       data[i].state=data[i].RegionName;
       var type = data[i].addressType;
       if(type=="ADR_TYPE_HOME"){
         	type = "Home";
         }
         else{
           type = "Work";
         }
       if(data[i].isPreferredAddress === "1" || data[i].isPreferredAddress === "true"){
         	type = type + "(Marked as communicating address)";
       }
          var addr = "";
       if(data[i].addressLine1 !== undefined && data[i].addressLine1 !== "")
         addr = data[i].addressLine1+", ";
       if(data[i].addressLine2 !== undefined && data[i].addressLine2 !== "")
         {
          addr = addr+data[i].addressLine2+", ";
         }
       if(data[i].city !== undefined && data[i].city !== "")
         {
          addr = addr+data[i].city+", ";
         }
       if(data[i].state !== undefined && data[i].state !== "")
         {
          addr = addr+data[i].state+", ";
         }
       if(data[i].country !== undefined && data[i].country !== "")  
         {
           addr = addr+data[i].country+", ";
         }
       if(data[i].zipcode !== undefined && data[i].zipcode !== "")
         {
           addr = addr+data[i].zipcode;
         }
       var isPreferredAddress=data[i].isPreferredAddress;
       var row = {
         "lblDetail": type,
         "lblDetailValue": addr,
         "template" : "flxDetails",
         "isPreferredAddress":isPreferredAddress
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
     navigationManager.navigateTo('frmProfilePersonalDetails');
   };
   Settings_PresentationController.prototype.getUserAllAddressesFailure = function(err){
     kony.print(JSON.stringify(err));
     applicationManager.getPresentationUtility().dismissLoadingScreen();
     if(err && err["isServerUnreachable"]){
       applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
     }
   };
   Settings_PresentationController.prototype.navigateToAddOrEditEmail = function(flow){
     applicationManager.getPresentationUtility().showLoadingScreen();
     var userObj = applicationManager.getUserPreferencesManager();
     var email = userObj.getUserEmail();
     var secondaryEmail = userObj.getUserObj().secondaryemail;
     var secondaryEmail2 = userObj.getUserObj().secondaryemail2;
     var data = [];
     if(email){
       data.push(
       {
        "lblDetail": "Primary Email ID",
        "lblDetailValue": email,
        "template" : "flxMain"
       }
       );
     }
     if(secondaryEmail){
       data.push(
       {
         "lblDetail": "Secondary Email ID",
        "lblDetailValue": secondaryEmail,
        "template" : "flxMain"
       }
       );
     }
     if(secondaryEmail2){
       data.push({
         "lblDetail": "Secondary Email ID2",
        "lblDetailValue": secondaryEmail2,
        "template" : "flxMain"
       });
     }
     var navManager = applicationManager.getNavigationManager();
     navManager.setCustomInfo('frmProfileEditEmails',data);
     navManager.setCustomInfo('frmProfileEnterEmailID',flow);
     applicationManager.getPresentationUtility().dismissLoadingScreen();
     navManager.navigateTo('frmProfileEditEmails');
   };
   Settings_PresentationController.prototype.navigateToEditPhoneNumber = function(info){
     applicationManager.getPresentationUtility().showLoadingScreen();
     var userObj = applicationManager.getUserPreferencesManager();
     var phoneNumbers = userObj.getUserAllPhoneNumbers();
     var data = [];
     for(var i=0;i<phoneNumbers.length;i++){
       var temp ={};
       var type = phoneNumbers[i].type;
       if(phoneNumbers[i].isPrimary === '1'){
         type = type + "(Marked as Primary)";
       }else if(phoneNumbers[i].countryType && phoneNumbers[i].countryType.toLowerCase() === "international"){
         type = type + "(International)";
       }
       temp.id = phoneNumbers[i].id;
       temp.lblDetail = type;
       temp.lblDetailValue = phoneNumbers[i].phoneNumber;
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
   };
   Settings_PresentationController.prototype.navigateToEditOrAddAddress = function(){
     applicationManager.getPresentationUtility().showLoadingScreen();
     var userObj = applicationManager.getUserPreferencesManager();
     var addressObj = userObj.getEntitlementAddresses();
     var result = [];
     for(var i =0;i<addressObj.length;i++){
       addressObj[i].addressLine1=addressObj[i].AddressLine1;
       addressObj[i].addressLine2=addressObj[i].AddressLine2;
       addressObj[i].city=addressObj[i].CityName;
       addressObj[i].country=addressObj[i].CountryName;
       addressObj[i].isPreferredAddress=addressObj[i].isPrimary;
       addressObj[i].addressId=addressObj[i].Address_id;
       addressObj[i].addressType=addressObj[i].AddressType;
       addressObj[i].state=addressObj[i].RegionName;
       addressObj[i].zipcode=addressObj[i].ZipCode;
       var type = addressObj[i].addressType;
        if(type=="ADR_TYPE_HOME"){
         	type = "Home";
         }
         else{
           type = "Work";
         }
       if(addressObj[i].isPreferredAddress === "1" || addressObj[i].isPreferredAddress === "true"){
         	type = type + "(Marked as communicating address)";
       }
       var details = addressObj[i].addressLine1+","+addressObj[i].addressLine2+","+addressObj[i].city+","+addressObj[i].state+","+addressObj[i].country+","+addressObj[i].zipcode;
       var isPreferredAddress=addressObj[i].isPreferredAddress;
       var temp = {
         "imgDelete": {"src" : "deleteicon.png"},
         "lblDelete": "Delete",
         "lblDetail": type,
         "lblDetailValue": details,
         "isPreferredAddress":isPreferredAddress,
         "template" : "flxAddress",
         "addressId" : addressObj[i].addressId
       };
       result.push(temp);
     }
     var navManager = applicationManager.getNavigationManager();
     navManager.setCustomInfo('frmProfileEditAddressList',result);
     navManager.navigateTo('frmProfileEditAddressList');
     applicationManager.getPresentationUtility().dismissLoadingScreen();
   };
   Settings_PresentationController.prototype.naviagteToProfileEditPhoneNumber = function(index){
     var userObj = applicationManager.getUserPreferencesManager();
     var phoneNumbers = userObj.getUserAllPhoneNumbers();
     index = parseInt(index[1]);
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
     userObj.updateUserPhoneNumber(data,scope_SettingsPresenter.updateUserPhoneNumberSuccess,scope_SettingsPresenter.updateUserPhoneNumberFailure);
   };
   Settings_PresentationController.prototype.updateUserPhoneNumberSuccess = function(data){
     var userObj = applicationManager.getUserPreferencesManager();
     userObj.fetchAllPhoneNumbers(success,failure);
     function success(data){
       applicationManager.getPresentationUtility().dismissLoadingScreen();
       scope_SettingsPresenter.navigateToEditPhoneNumber({"flow":"editsuccess"});
       scope_SettingsPresenter.refreshPersonalDetailsData();
     }
     function failure(err){
       applicationManager.getPresentationUtility().dismissLoadingScreen();
     if(err && err["isServerUnreachable"]){
       applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
     }
     }
   };
   Settings_PresentationController.prototype.updateUserPhoneNumberFailure = function(err){
     kony.print(JSON.stringify(err));
     applicationManager.getPresentationUtility().dismissLoadingScreen();
     if(err && err["isServerUnreachable"]){
       applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
     }
   };
   Settings_PresentationController.prototype.refreshPersonalDetailsData = function(){
     applicationManager.getPresentationUtility().showLoadingScreen();
     var userObj = applicationManager.getUserPreferencesManager();
     var phoneData = userObj.getUserAllPhoneNumbers();
     var data = phoneData;
     var result = [];
     for(var i =0;i<data.length;i++){
       var temp = {};
       var name = (data[i].type === "" ||data[i].type === undefined ||data[i].type === null)? "Mobile" : data[i].type ;
       if(data[i].isPrimary === "1"){
         name += '(Marked as Primary)';
       }
       else if(data[i].countryType && data[i].countryType.toLowerCase() === 'international'){
         name += '(International)';
       }
       temp.lblDetail = name;
       temp.lblDetailValue = data[i].phoneNumber;
       temp.template = 'flxDetails';
       result.push(temp);
     }
     var result1 = [];
     if(result.length > 0){
       var temp1 = {};
       temp1.lblHeader = "Registered Phone Number";
       temp1.template = 'flxDetailsHeader';
       result1.push(temp1);
       result1.push(result);
     }
     var dobssn = [];
     var dob = userObj.getUserDOB();
     dob = dob.substring(0,10);
     var forUtility=applicationManager.getFormatUtilManager();
     var dateobj=forUtility.getDateObjectfromString(dob,"YYYY-MM-DD");
     dob = forUtility.getFormatedDateString(dateobj,forUtility.APPLICATION_DATE_FORMAT);
     var ssn = applicationManager.getDataProcessorUtility().maskAccountNumber(userObj.getSSN());
     var email = userObj.getUserEmail();
     var secondaryEmail = userObj.getUserObj().secondaryemail;
     var secondaryEmail2 = userObj.getUserObj().secondaryemail2;
     var temp2 = {};
     temp2.lblDetail = "Date of Birth";
     temp2.lblDetailValue =  dob;
     temp2.template = "flxDetails";
     var temp3 = {
           "lblDetail": kony.i18n.getLocalizedString("kony.tab.Forgot.EnterSSNTitle"),
           "lblDetailValue": ssn,
           "flxSeparator": {"isVisible" : false},
           "template" : "flxDetails"
         };
     dobssn.push(temp2);
     dobssn.push(temp3);
     var answer = [];
     answer.push({"lblHeader":"Personal Details","template":"flxDetailsHeader"});
     answer.push(dobssn);
     var segmentData = [];
     segmentData.push(answer);
     if(result1.length > 0)
        segmentData.push(result1);
     var emails = [];
     var header = {
        "lblHeader": "Registered Email ID's" ,
        "template" : "flxDetailsHeader"
      };
     emails.push(header);
     var emailData =[];
     var rowData = {
         "lblDetail": "Primary Email ID",
         "lblDetailValue": email,
         "template" : "flxDetails"
       };
     var rowData1 = {
       "lblDetail": "Secondary Email ID",
        "lblDetailValue": secondaryEmail,
        "template" : "flxDetails"
     };
     var rowData2 = {
          "lblDetail": "Secondary Email ID2",
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
     //var addressData = userObj.getUserAllAddresses();
     var addressData = userObj.getEntitlementAddresses();
     data  = addressData;
     var addressArray = [];
     var header = {
        "lblHeader": "Registered Addresses" ,
        "template" : "flxDetailsHeader"
      };
     var addressSegData = [];
     for(var i =0;i<data.length;i++){
       data[i].addressType=data[i].AddressType;
       data[i].isPreferredAddress=data[i].isPrimary;
       data[i].addressLine1=data[i].AddressLine1;
       data[i].addressLine2=data[i].AddressLine2;
       data[i].city=data[i].CityName;
       data[i].country=data[i].CountryName;
       data[i].zipcode=data[i].ZipCode;
       data[i].country=data[i].CountryName;
       data[i].state=data[i].RegionName;
       var type = data[i].addressType;
        if(type=="ADR_TYPE_HOME"){
         	type = "Home";
         }
         else{
           type = "Work";
         }
       if(data[i].isPreferredAddress === "1"|| data[i].isPreferredAddress === "true"){
         	type = type + "(Marked as communicating address)";
       }
       var addr = "";
       if(data[i].addressLine1 !== undefined && data[i].addressLine1 !== "")
         addr = data[i].addressLine1+", ";
       if(data[i].addressLine2 !== undefined && data[i].addressLine2 !== "")
         {
          addr = addr+data[i].addressLine2+", ";
         }
       if(data[i].city !== undefined && data[i].city !== "")
         {
          addr = addr+data[i].city+", ";
         }
       if(data[i].state !== undefined && data[i].state !== "")
         {
          addr = addr+data[i].state+", ";
         }
       if(data[i].country !== undefined && data[i].country !== "")  
         {
           addr = addr+data[i].country+", ";
         }
       if(data[i].zipcode !== undefined && data[i].zipcode !== "")
         {
           addr = addr+data[i].zipcode;
         }
       var isPreferredAddress=data[i].isPreferredAddress;
       var row = {
         "lblDetail": type,
         "lblDetailValue": addr,
         "template" : "flxDetails",
         "isPreferredAddress":isPreferredAddress
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
     obj.receivePromotions = "0";
     obj.extension = "";
     var userObj = applicationManager.getUserPreferencesManager();
     userObj.createPhoneNumber(obj,scope_SettingsPresenter.addUserPhoneNumberSuccess,scope_SettingsPresenter.addUserPhoneNumberFailure);
   };
   Settings_PresentationController.prototype.addUserPhoneNumberSuccess = function(data){
     var userObj = applicationManager.getUserPreferencesManager();
     userObj.fetchAllPhoneNumbers(success,failure);
     function success(data){
       applicationManager.getPresentationUtility().dismissLoadingScreen();
       scope_SettingsPresenter.navigateToEditPhoneNumber({"flow":"addsuccess"});
       scope_SettingsPresenter.refreshPersonalDetailsData();
     }
     function failure(err){
       applicationManager.getPresentationUtility().dismissLoadingScreen();
     if(err && err["isServerUnreachable"]){
       applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
     }
     }
   };
   Settings_PresentationController.prototype.addUserPhoneNumberFailure = function(err){
     kony.print(JSON.stringify(err));
     applicationManager.getPresentationUtility().dismissLoadingScreen();
     if(err && err["isServerUnreachable"]){
       applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
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
      navObj.navigateTo("frmSettings");
    };
   Settings_PresentationController.prototype.presentationDeviceSuccess = function(success){
        var userObj = applicationManager.getUserPreferencesManager();
        var navManger = applicationManager.getNavigationManager();
        userObj.updateDeviceRegisterFlag(true);
        scope_SettingsPresenter.getDevDetails();
        var keys = navManger.getCustomInfo("frmSettings");
        keys.popUpMsg = kony.i18n.getLocalizedString("kony.mb.Device.Registration.Successful");
       navManger.setCustomInfo("frmSettings",keys);
       navManger.navigateTo("frmSettings");
   };
   Settings_PresentationController.prototype.presentationDeviceError = function(err){
       applicationManager.getPresentationUtility().dismissLoadingScreen();
       alert(err);
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
   Settings_PresentationController.prototype.deleteRegSuccess = function( formContext, success){
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
      var navManger = applicationManager.getNavigationManager();
      var defaultAuth = "pin";
      userObj.setDefaultAuthMode(defaultAuth);
      var controller = applicationManager.getPresentationUtility().getController('frmPreferencesPin', true);
      controller.bindViewSuccess(kony.i18n.getLocalizedString("kony.mb.PIN.has.been.selected.as.default.login"));
      navManger.navigateTo("frmSettings");
   };
   Settings_PresentationController.prototype.verifyCurrPin = function(pin){
       var userObj = applicationManager.getUserPreferencesManager();
       userObj.verifyExistingPin(pin,this.verifyPinSuccess,this.verifyPinFailure);
   };
   Settings_PresentationController.prototype.verifyPinSuccess = function(success){
      if(success.result == "true"){
        var navManger = applicationManager.getNavigationManager();
        navManger.navigateTo("frmPreferencesResetStep2");
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
       userObj.createPin(pin,this.updatePinSuccess,this.updatePinError);
    };
    Settings_PresentationController.prototype.updatePinSuccess= function(success){
    //  applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,kony.i18n.getLocalizedString("kony.mb.Please.enter.a.update.pin"));
       	var navManger = applicationManager.getNavigationManager();
      	var msgData = {popUpMsg:"Login Pin has been changed successfully."};
     	navManger.setCustomInfo("frmPreferencesPin",msgData) ;
      	navManger.navigateTo("frmPreferencesPin");
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
  Settings_PresentationController.prototype.addressSearch = function(searchText) {
    var locationManager = applicationManager.getLocationManager();
    locationManager.fetchAddressSuggestions(searchText,scope_SettingsPresenter.addressSearchPresentationSuccessCallback,scope_SettingsPresenter.addressSearchPresentationErrorCallback);
  };
  Settings_PresentationController.prototype.addressSearchPresentationSuccessCallback = function(res) {
    kony.print("Success in addressSearch");
    var controller = applicationManager.getPresentationUtility().getController("frmProfileAddAddress", true);
    controller.setSearchData(res);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
  Settings_PresentationController.prototype.addressSearchEditFlow = function(searchText) {
	var locationManager = applicationManager.getLocationManager();
	locationManager.fetchAddressSuggestions(searchText, scope_SettingsPresenter.addressSearchEditFlowPresentationSuccessCallback, scope_SettingsPresenter.addressSearchPresentationErrorCallback);
  };
  Settings_PresentationController.prototype.addressSearchEditFlowPresentationSuccessCallback = function(res) {
	kony.print("Success in addressSearch");
	var controller = applicationManager.getPresentationUtility().getController("frmProfileEditAddress", true);
	controller.setSearchData(res);
	applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
  Settings_PresentationController.prototype.addressSearchPresentationErrorCallback = function(err) {
    kony.print("Error in addressSearch");
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
  Settings_PresentationController.prototype.updateProfileAddress = function() {
//     var userPreferencesManager = applicationManager.getUserPreferencesManager();
//     userPreferencesManager.updateAddress(scope_SettingsPresenter.getUserAddressData(),scope_SettingsPresenter.updateProfileAddressPresentationSuccessCallback, scope_SettingsPresenter.updateProfileAddressPresentationErrorCallback);
    var context=scope_SettingsPresenter.getUserAddressData();
    var city=this.selectedCityAndStateCodes.city;
    var state=this.selectedCityAndStateCodes.state;
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
                "City_id": city,
                "Addr_id": context.addressId,
                "Region_id": state
            }],
            addresses = JSON.stringify(addresses);
        addresses = addresses.replace(/"/g, "'");
        var params = {
            "addresses": addresses,
            "userName": applicationManager.getUserPreferencesManager().getCurrentUserName(),
            "modifiedByName": applicationManager.getUserPreferencesManager().getCurrentUserName()
        };
    var userPreferencesManager = applicationManager.getUserPreferencesManager();
    userPreferencesManager.updateUserProfileDetails(params,scope_SettingsPresenter.updateProfileAddressPresentationSuccessCallback, scope_SettingsPresenter.updateProfileAddressPresentationErrorCallback);
  };
  Settings_PresentationController.prototype.updateProfileAddressPresentationSuccessCallback = function(res) {
    kony.print("Success in updateProfileAddress");
    this.selectedCityAndStateCodes={};
//     scope_SettingsPresenter.getUserAllAddressesData();
//     var navManager = applicationManager.getNavigationManager();
//     var data = {
//       "message" : "AddressUpdated"
//     };
//     navManager.setCustomInfo("frmProfileEditAddressList1",data);
//    applicationManager.getPresentationUtility().dismissLoadingScreen();
    scope_SettingsPresenter.updateEntitlementsResponse(success,failure);
         function success(data){
    var navManager = applicationManager.getNavigationManager();
    var data = {
      "message" : "AddressUpdated"
    };
    navManager.setCustomInfo("frmProfileEditAddressList1", data);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    scope_SettingsPresenter.navigateToEditOrAddAddress();
    scope_SettingsPresenter.refreshPersonalDetailsData();
    //scope_SettingsPresenter.setDataAfterProfileUpdate();
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
			City_id: city,
			ZipCode: addressObj.zipcode,
			isPrimary: preferredAddress,
			Region_id: state
		}];
		addresses = JSON.stringify(addresses);
		addresses = addresses.replace(/"/g, "'");
		var params = {
		    "addresses": addresses,
            "userName": applicationManager.getUserPreferencesManager().getCurrentUserName(),
            "modifiedByName": applicationManager.getUserPreferencesManager().getCurrentUserName()
        };
    userPreferencesManager.updateUserProfileDetails(params,scope_SettingsPresenter.createProfileAddressPresentationSuccessCallback, scope_SettingsPresenter.createProfileAddressPresentationErrorCallback);
//     var userPreferencesManager = applicationManager.getUserPreferencesManager();
//     userPreferencesManager.createAddress(scope_SettingsPresenter.getUserAddressData(),scope_SettingsPresenter.createProfileAddressPresentationSuccessCallback, scope_SettingsPresenter.createProfileAddressPresentationErrorCallback);
  };
  Settings_PresentationController.prototype.createProfileAddressPresentationSuccessCallback = function(res) {
    kony.print("Success in createProfileAddress");
    this.selectedCityAndStateCodes={};
//     scope_SettingsPresenter.getUserAllAddressesData();
//     var navManager = applicationManager.getNavigationManager();
//     var data = {
//       "message" : "AdressAdded"
//     };
//     navManager.setCustomInfo("frmProfileEditAddressList1",data);
//     applicationManager.getPresentationUtility().dismissLoadingScreen();
    scope_SettingsPresenter.updateEntitlementsResponse(success,failure);
         function success(data){
    var navManager = applicationManager.getNavigationManager();
    var data = {
      "message" : "AdressAdded"
    };
    navManager.setCustomInfo("frmProfileEditAddressList1", data);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    scope_SettingsPresenter.navigateToEditOrAddAddress();
    scope_SettingsPresenter.refreshPersonalDetailsData();
    //scope_SettingsPresenter.setDataAfterProfileUpdate();
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
//     var userPreferencesManager = applicationManager.getUserPreferencesManager();
//     userPreferencesManager.deleteAddress(data,scope_SettingsPresenter.deleteProfileAddressPresentationSuccessCallback, scope_SettingsPresenter.deleteProfileAddressPresentationErrorCallback);
    var userPreferencesManager = applicationManager.getUserPreferencesManager();
    var main_user = applicationManager.getUserPreferencesManager().getUserName();
    var params = {"userName" : main_user,
                  "deleteAddressID": data.addressId
                 };
    //userPreferencesManager.deleteAddress(data,scope_SettingsPresenter.deleteProfileAddressPresentationSuccessCallback, scope_SettingsPresenter.deleteProfileAddressPresentationErrorCallback);
    userPreferencesManager.updateUserProfileDetails(params,scope_SettingsPresenter.deleteProfileAddressPresentationSuccessCallback, scope_SettingsPresenter.deleteProfileAddressPresentationErrorCallback);
  };
  Settings_PresentationController.prototype.deleteProfileAddressPresentationSuccessCallback = function(res) {
//     kony.print("Success in deleteProfileAddress");
//     scope_SettingsPresenter.getUserAllAddressesData();
//     var navManager = applicationManager.getNavigationManager();
//     var data = {
//       "message" : "AddressDeleted"
//     };
//     navManager.setCustomInfo("frmProfileEditAddressList1",data);
//     applicationManager.getPresentationUtility().dismissLoadingScreen();
    scope_SettingsPresenter.updateEntitlementsResponse(success,failure);
         function success(data){
    var navManager = applicationManager.getNavigationManager();
    var data = {
      "message" : "AddressDeleted"
    };
    navManager.setCustomInfo("frmProfileEditAddressList1", data);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    scope_SettingsPresenter.navigateToEditOrAddAddress();
    scope_SettingsPresenter.refreshPersonalDetailsData();
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
     var user  = userObj.getUserObj();
     var email = "";
     var isPrimary = 1;
     if(index === 0){
       email = user.email;
     }
     if(index === 1){
       email = user.secondaryemail;
       isPrimary = 0;
       if(email === null || email === undefined || email === ""){
         email = user.secondaryemail2;
       }
     }
     if(index === 2){
       email = user.secondaryemail2;
       isPrimary = 0;
     }
     var data = {};
     data.index = index;
     data.email = email;
     data.isPrimary = isPrimary;
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
     var index = data.index;
     var updateData = {};
     var userObj = applicationManager.getUserPreferencesManager();
     if(index === 0){
       var email = data.email;
       userObj.updatePrimaryEmail(email,successCallback,failureCallback);
     }
	 if(index === 1){
	   var oldEmail = userObj.getUserObj().secondaryemail;
	   var updateEmail = {"secondaryemail": data.email};
	   if (!oldEmail) {
		 oldEmail = userObj.getUserObj().secondaryemail2;
		 updateEmail.secondaryemail2 = updateEmail.secondaryemail;
		 delete updateEmail.secondaryemail;
	   }
	   if(data.isPrimary === 1){
		 var primaryEmail = userObj.getUserEmail();
		 var  updatedEmail = data.email;
		 var jsonParams = {};
		 jsonParams.email = updatedEmail;
		 var oldSecondaryEmail = userObj.getUserObj().secondaryemail;
		 if(oldSecondaryEmail !== null && oldSecondaryEmail !== undefined && oldSecondaryEmail !== "")
		   jsonParams.secondaryemail = primaryEmail;
		 else{
		   jsonParams.secondaryemail2 = primaryEmail;
		 }
		 userObj.partialUpdateOnUserObj(jsonParams,successCallback,failureCallback);
	   }
	   else{
		 userObj.partialUpdateOnUserObj(updateEmail, successCallback, failureCallback);
	   }
	 }
     if(index === 2){
       if(data.isPrimary === 1){
         var primaryEmail1 = userObj.getUserEmail();
         var updatedEmail1 = data.email;
         var params = {};
         params.email = updatedEmail1;
         params.secondaryemail2 = primaryEmail1;
         userObj.partialUpdateOnUserObj(params,successCallback,failureCallback);
       }
       else{
         userObj.partialUpdateOnUserObj({"secondaryemail2":data.email},successCallback,failureCallback);
       }
     }
       function successCallback(data){
           userObj.fetchUser(success,failure);
		   function success(data){
			 scope_SettingsPresenter.navigateToAddOrEditEmail("updatesuccess");
             applicationManager.getPresentationUtility().dismissLoadingScreen();
			 scope_SettingsPresenter.refreshPersonalDetailsData();
		   }
		   function failure(error){
			   applicationManager.getPresentationUtility().dismissLoadingScreen();
		   }
         }
       function failureCallback(error){
         applicationManager.getPresentationUtility().dismissLoadingScreen();
         kony.print("error"+JSON.stringify(error));
       }
   };
   Settings_PresentationController.prototype.deleteEmail = function(index){
         var userManager = applicationManager.getUserPreferencesManager();
         if(index === 1){
           var whichEmail = "secondaryemail";
           var secondaryEmail = userManager.getUserObj().secondaryemail;
           if(secondaryEmail === "" || secondaryEmail === undefined || secondaryEmail === null){
             whichEmail = "secondaryemail2";
           }
           applicationManager.getPresentationUtility().showLoadingScreen();
           var jsonParams = {};
           jsonParams[whichEmail] = "";
           userManager.partialUpdateOnUserObj(jsonParams,successCallback,failureCallback);
         }
        if(index === 2){
           applicationManager.getPresentationUtility().showLoadingScreen();
           userManager.partialUpdateOnUserObj({"secondaryemail2":""},successCallback,failureCallback);
        }
         function successCallback(data){
           userManager.fetchUser(success,failure);
		   function success(data){
			 scope_SettingsPresenter.navigateToAddOrEditEmail("deletesuccess");
             applicationManager.getPresentationUtility().dismissLoadingScreen();
             scope_SettingsPresenter.refreshPersonalDetailsData();
		   }
		   function failure(error){
			   applicationManager.getPresentationUtility().dismissLoadingScreen();
		   }
         }
         function failureCallback(error){
         }
   };
   Settings_PresentationController.prototype.addEmail = function(data){
     applicationManager.getPresentationUtility().showLoadingScreen();
     var validationManager = applicationManager.getValidationUtilManager();
     if(validationManager.isValidEmail(data.email) === false){
       applicationManager.getPresentationUtility().dismissLoadingScreen();
       var formController = applicationManager.getPresentationUtility().getController('frmProfileEnterEmailID',true);
       var i18nV = applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.OnBoarding.InvalidEmail');
       formController.bindViewError(i18nV);
       return;
     }
     var userManager = applicationManager.getUserPreferencesManager();
     var userObj = userManager.getUserObj();
     var email = userObj.email;
     var secondaryEmail = userObj.secondaryemail;
     var secondaryEmail2 = userObj.secondaryemail2;
     var jsonParams = {};
     if(data.isPrimary === 1){
       jsonParams.email = data.email;
       if(secondaryEmail === null || secondaryEmail === undefined){
         jsonParams.secondaryemail = email;
       }
       else if(secondaryEmail2 === null || secondaryEmail2 === undefined){
         jsonParams.secondaryemail2 = email;
       }
     }
     else{
       if(secondaryEmail === null || secondaryEmail === undefined){
         jsonParams.secondaryemail = data.email;
       }
       else if(secondaryEmail2 === null || secondaryEmail2 === undefined){
         jsonParams.secondaryemail2 = data.email;
       }
     }
     userManager.partialUpdateOnUserObj(jsonParams,success,failure);
     function success(data){
       userManager.fetchUser(success1,failure1);
		   function success1(data){
			   scope_SettingsPresenter.navigateToAddOrEditEmail("addsuccess");
             applicationManager.getPresentationUtility().dismissLoadingScreen();
             scope_SettingsPresenter.refreshPersonalDetailsData();
		   }
		   function failure1(error){
			   applicationManager.getPresentationUtility().dismissLoadingScreen();
     if(err && err["isServerUnreachable"]){
       applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
     }
		   }
     }
     function failure(error){
       applicationManager.getPresentationUtility().dismissLoadingScreen();
       kony.print(JSON.stringify(error));
     if(err && err["isServerUnreachable"]){
       applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
     }
     }
   };
   Settings_PresentationController.prototype.uploadProfilePicture = function(base64){
     applicationManager.getPresentationUtility().showLoadingScreen();
     var userObj = applicationManager.getUserPreferencesManager();
     var params = {};
     params.userImage = base64;
     userObj.updateUserDetails(params,scope_SettingsPresenter.uploadProfilePictureSuccess,scope_SettingsPresenter.uploadProfilePictureFailure);
   };
   Settings_PresentationController.prototype.uploadProfilePictureSuccess = function(data){
     var formController = applicationManager.getPresentationUtility().getController('frmProfilePersonalDetails',true);
     var i18nStr = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.ProfileManagement.photoUploaded");
     formController.bindViewSuccess(i18nStr);
     formController.bindUploadedImage();
     applicationManager.getPresentationUtility().dismissLoadingScreen();
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
     userObj.deleteUserPhoneNumber(id,scope_SettingsPresenter.deleteUserPhoneNumberSuccess,scope_SettingsPresenter.deleteUserPhoneNumberFailure);
   };
   Settings_PresentationController.prototype.deleteUserPhoneNumberSuccess = function(data){
     var userObj = applicationManager.getUserPreferencesManager();
     userObj.fetchAllPhoneNumbers(success,failure);
     function success(data){
       applicationManager.getPresentationUtility().dismissLoadingScreen();
       scope_SettingsPresenter.navigateToEditPhoneNumber({"flow":"deletesuccess"});
       scope_SettingsPresenter.refreshPersonalDetailsData();
     }
     function failure(error){
       kony.print("error "+JSON.stringify(error)+error);
       applicationManager.getPresentationUtility().dismissLoadingScreen();
     }
   };
   Settings_PresentationController.prototype.deleteUserPhoneNumberFailure = function(error){
     kony.print("error "+JSON.stringify(error));
     applicationManager.getPresentationUtility().dismissLoadingScreen();
     if(err && err["isServerUnreachable"]){
       applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
     }
   };
    Settings_PresentationController.prototype.getUserAllAddressesData = function(){
     applicationManager.getPresentationUtility().showLoadingScreen();
     var userObj = applicationManager.getUserPreferencesManager();
     userObj.fetchUserAllAddresses(scope_SettingsPresenter.getUserAllAddressesDataSuccess,scope_SettingsPresenter.getUserAllAddressesDataFailure);
   };
   Settings_PresentationController.prototype.getUserAllAddressesDataSuccess = function(data){
     scope_SettingsPresenter.refreshPersonalDetailsData();
	 scope_SettingsPresenter.navigateToEditOrAddAddress();
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
  Settings_PresentationController.prototype.getAllAccountAlerts = function(){
        var settingsManager = applicationManager.getSettingsManager();
        settingsManager.getAllAccountAlerts(scope_SettingsPresenter.getAllAccountAlertsSuccess,scope_SettingsPresenter.getAllAccountAlertsFailure);
    };
	Settings_PresentationController.prototype.getAllAccountAlertsSuccess = function(response){
  	var navManager = applicationManager.getNavigationManager();
    navManager.setCustomInfo("frmAlertsAccountList", response);
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule(ManageArrangementsUIModule);
    settingsMod.presentationController.commonFunctionForNavigation("frmAlertsAccountList");
  };
  Settings_PresentationController.prototype.getAllAccountAlertsFailure = function(err){
     applicationManager.getPresentationUtility().dismissLoadingScreen();
     if(err && err["isServerUnreachable"]){
       applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
     }
   };
  	Settings_PresentationController.prototype.getDealsAndSecurityAlerts = function(){
       var settingsManager = applicationManager.getSettingsManager();
       settingsManager.getDealsAndSecurityAlerts(scope_SettingsPresenter.getDealsAndSecurityAlertsSuccess,scope_SettingsPresenter.getDealsAndSecurityAlertsFailure);
    };
  Settings_PresentationController.prototype.getDealsAndSecurityAlertsSuccess = function(response){
  	 var navManager = applicationManager.getNavigationManager();
     var alertType = navManager.getCustomInfo("frmSettingsAlertType");
     response.push(alertType);
     navManager.setCustomInfo("frmAlertsDealsAndSecurity", response);
     var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule(ManageArrangementsUIModule);
     settingsMod.presentationController.commonFunctionForNavigation("frmAlertsDealsAndSecurity");
   };
  Settings_PresentationController.prototype.getDealsAndSecurityAlertsFailure = function(err){
     applicationManager.getPresentationUtility().dismissLoadingScreen();
     if(err && err["isServerUnreachable"]){
       applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
     }
   };
  Settings_PresentationController.prototype.updateUserAccountAlerts = function(inputParams){
       var settingsManager = applicationManager.getSettingsManager();
	   settingsManager.updateUserAccountAlerts(inputParams,scope_SettingsPresenter.updateUserAccountAlertsSuccess,scope_SettingsPresenter.updateUserAccountAlertsFailure);
    };
  Settings_PresentationController.prototype.updateUserAccountAlertsSuccess = function(response){
  	 var navManager = applicationManager.getNavigationManager();
     var frmAlertsAccountDetailController = applicationManager.getPresentationUtility().getController('frmAlertsAccountDetail',true);
     var formObject = navManager.getCustomInfo("updateUserAccountAlerts");
     if(formObject === "toggleSegAlertSettingListRowFlag"){
       frmAlertsAccountDetailController.updateSegAlertSettingListRowFlagSuccess(response);
     }
     else if(formObject === "toggleSingleAccountAlertsRequired"){
       frmAlertsAccountDetailController.updateSingleAccountAlertsRequiredFlagSuccess(response);
     }
    else if(formObject === "updateTime"){
      var frmAlertsBalanceUpdateController = applicationManager.getPresentationUtility().getController('frmAlertsBalanceUpdate',true);
      frmAlertsBalanceUpdateController.updateTimeSuccess(response);
    }
    else if(formObject === "updateBalance"){
      var frmAlertsMinimumBalanceController = applicationManager.getPresentationUtility().getController('frmAlertsMinimumBalance',true);
      frmAlertsMinimumBalanceController.updateBalanceSuccess(response);
    }
   };
  Settings_PresentationController.prototype.updateUserAccountAlertsFailure = function(err){
     applicationManager.getPresentationUtility().dismissLoadingScreen();
     if(err && err["isServerUnreachable"]){
       applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
     }
   };
  Settings_PresentationController.prototype.updateUserAlerts = function(inputParams){
       var settingsManager = applicationManager.getSettingsManager();
       settingsManager.updateUserAlerts(inputParams,scope_SettingsPresenter.updateUserAlertsSuccess,scope_SettingsPresenter.updateUserAlertsFailure);
    };
  Settings_PresentationController.prototype.updateUserAlertsSuccess = function(response){
  	 try {
	      	var navManager = applicationManager.getNavigationManager();
     	  	var frmAlertsDealsAndSecurityController = applicationManager.getPresentationUtility().getController('frmAlertsDealsAndSecurity',true);
     		var formObject = navManager.getCustomInfo("DealsAndSecurityAlertsToggle");
    		 if(formObject === "bankingIDChange"){
      			 frmAlertsDealsAndSecurityController.updateBankingIDChangeFlagSuccess(response);
    		 }
     		else if(formObject === "passwordChange"){
       			frmAlertsDealsAndSecurityController.updatePasswordChangeFlagSuccess(response);
    		 }
    		else if(formObject === "passwordExpired"){
      			frmAlertsDealsAndSecurityController.updatePasswordExpiredFlagSuccess(response);
   			 }
    		else if(formObject === "communicationChange"){
      			frmAlertsDealsAndSecurityController.updateAddressOrPhoneChangeFlagSuccess(response);
   			 }
       		else if(formObject === "newPayeeAdded"){
      			frmAlertsDealsAndSecurityController.updateNewPayeeAddedFlagSuccess(response);
   			 }
       		else if(formObject === "payeeDetailsUpdated"){
      			frmAlertsDealsAndSecurityController.updatePayeeDetailsUpdatedFlagSuccess(response);
   			 }
       		else if(formObject === "newDealsAvailable"){
      			frmAlertsDealsAndSecurityController.updateNewDealsAvailableSuccess(response);
   			 }
       		else if(formObject === "dealsExpiring"){
      			frmAlertsDealsAndSecurityController.updateDealsExpiringInOneDayFlagSuccess(response);
   			 }
         }
     catch(err) {
              applicationManager.getPresentationUtility().dismissLoadingScreen();
              throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.FailedToUpdateAlertSettings", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
            }
   };
  Settings_PresentationController.prototype.updateUserAlertsFailure = function(err){
     applicationManager.getPresentationUtility().dismissLoadingScreen();
     if(err && err["isServerUnreachable"]){
       applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
     }
   };
    Settings_PresentationController.prototype.updateAccountAlertsFlag = function(record){
      var userObj = applicationManager.getUserPreferencesManager();
      userObj.updateAccountAlertsFlag(record,scope_SettingsPresenter.updateAccountAlertsFlagSuccess,scope_SettingsPresenter.updateAccountAlertsFlagFailure);
    };
	Settings_PresentationController.prototype.updateAccountAlertsFlagSuccess = function(response){
		var navManager = applicationManager.getNavigationManager();
		var frmAlertsAccountListController = applicationManager.getPresentationUtility().getController('frmAlertsAccountList',true);
		var formObject = navManager.getCustomInfo("updateAccountAlertsFlag");
		if(formObject === "toggleAlertsRequiredFlag"){
			frmAlertsAccountListController.updateAccountAlertsFlagSuccess(response);
		}
   };
  Settings_PresentationController.prototype.updateAccountAlertsFlagFailure = function(err){
     applicationManager.getPresentationUtility().dismissLoadingScreen();
     if(err && err["isServerUnreachable"]){
       applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
     }
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
                    {"lblTitle":"Transfers","lblValue":defaultTransferAcc.nickName,"imgArrow":"segmentarrow.png","lblAccId":defaultTransferAcc.accountID},
                    {"lblTitle":"Bill Pay","lblValue":defaultBillPayAcc.nickName,"imgArrow":"segmentarrow.png","lblAccId":defaultBillPayAcc.accountID},
                    {"lblTitle":"Pay A person","lblValue":defaultPaymentsAcc.nickName,"imgArrow":"segmentarrow.png","lblAccId":defaultPaymentsAcc.accountID},
                    {"lblTitle":"Cash Withdrawal","lblValue":defaultCardlessAcc.nickName,"imgArrow":"segmentarrow.png","lblAccId":defaultCardlessAcc.accountID},
                    {"lblTitle":"Deposits","lblValue":defaultDepositAcc.nickName,"imgArrow":"segmentarrow.png","lblAccId":defaultDepositAcc.accountID}
         ];
         return(data);
  };
  Settings_PresentationController.prototype.updateUserAccountSettingsForEstatements = function(params,eStatementPopup){
    var accountObj = applicationManager.getAccountManager();
    this.eStatementPopup=eStatementPopup;
    this.estatementData=params;
    accountObj.updateUserAccountSettingsForEstatements(params,scope_SettingsPresenter.estatementPresentationSuccessCallback,scope_SettingsPresenter.estatementPresentationErrorCallback);
  };
  Settings_PresentationController.prototype.estatementPresentationSuccessCallback = function(resSuccess){
    var controller = applicationManager.getPresentationUtility().getController('frmEStmtAccountDetails', true);
    controller.bindGenericSuccess();
    scope_SettingsPresenter.updateJsonData();
  };
  Settings_PresentationController.prototype.estatementPresentationErrorCallback = function(reserr){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (reserr["isServerUnreachable"]) {
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", reserr);
        }
  };
  Settings_PresentationController.prototype.updateJsonData = function(){
    var navManager = applicationManager.getNavigationManager();
    var accountData = navManager.getCustomInfo("frmEStmtAccountDetails");
    var selectedrow=accountData.selectedRow;
    var accountsPreferenceData=navManager.getCustomInfo("frmEStmtAccountPreferences");
     if(scope_SettingsPresenter.eStatementPopup==="enable"){
       accountsPreferenceData[selectedrow].eStatementEnable="true";
       accountData.eStatementEnable="true";
       accountsPreferenceData[selectedrow].email=this.estatementData.email;
       accountData.email=this.estatementData.email;
       accountsPreferenceData[selectedrow].nickName=this.estatementData.nickName;
      accountData.nickName=this.estatementData.nickName;
     }
    else if(scope_SettingsPresenter.eStatementPopup==="disable"){
      accountsPreferenceData[selectedrow].eStatementEnable="false";
      accountData.eStatementEnable="false";
      accountsPreferenceData[selectedrow].nickName=this.estatementData.nickName;
      accountData.nickName=this.estatementData.nickName;
    }
    else if(scope_SettingsPresenter.eStatementPopup==="updateEmail"){
      accountsPreferenceData[selectedrow].email=this.estatementData.email;
      accountData.email=this.estatementData.email;
    }
    else if(scope_SettingsPresenter.eStatementPopup==="updateName"){
      accountsPreferenceData[selectedrow].nickName=this.estatementData.nickName;
      accountData.nickName=this.estatementData.nickName;
    }
    navManager.setCustomInfo("frmEStmtAccountDetails",accountData);
    navManager.setCustomInfo("frmEStmtAccountPreferences",accountsPreferenceData);
    navManager.navigateTo("frmEStmtAccountDetails");
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
  Settings_PresentationController.prototype.updateCityAndStateCode=function(codes){
    this.selectedCityAndStateCodes=codes;
    var addressObj=scope_SettingsPresenter.getUserAddressData();
    addressObj["countryId"]=codes.countryId;
    addressObj["stateId"]=codes.state;
    addressObj["cityId"]=codes.city;
  };
  Settings_PresentationController.prototype.getCityAndStateCode=function(){
    return this.selectedCityAndStateCodes;
  };
  Settings_PresentationController.prototype.updateUserSelectedAddressData=function(address){
    this.userPreferredAddress=address.isPreferredAddress;
  };
  Settings_PresentationController.prototype.setDataAfterProfileUpdate = function(){
     var userObj = applicationManager.getUserPreferencesManager();
	 var PhoneData = userObj.getEntitlementPhoneNumbers();
     var addData = userObj.getEntitlementAddresses();
     scope_SettingsPresenter.getUserAllPhoneNumbersSuccess(PhoneData);
     scope_SettingsPresenter.getUserAllAddressesSuccess(addData);
   };
    Settings_PresentationController.prototype.updateEntitlementsResponse = function(success,failure) {
	var userPreferencesManager = applicationManager.getUserPreferencesManager();
    var main_user = applicationManager.getUserPreferencesManager().getUserName();
    var params = {"userName" : main_user};
    userPreferencesManager.fetchEntitlementsForUser(params,success,failure);
  };
    return Settings_PresentationController;
});