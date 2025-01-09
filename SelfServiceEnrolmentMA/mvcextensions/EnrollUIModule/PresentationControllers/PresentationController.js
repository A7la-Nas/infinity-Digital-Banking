define(["CommonsMA/AsyncManager/BusinessControllers/BusinessController","CommonUtilities"], function(AsyncManager,CommonUtilities) {
  function Enroll_PresentationController() {
    kony.mvc.Presentation.BasePresenter.call(this);
    //this.logger = applicationManager.getLoggerManager();
    enrollPresentationScope = this;
      this.asyncManager = new AsyncManager();
      this.unmaskedphoneNumber = "";
      this.unmaskedemail= "";
      this.maskedphoneNumber = "";
      this.maskedemail= "";
      this.MFAresponse = "";
  }
  inheritsFrom(Enroll_PresentationController, kony.mvc.Presentation.BasePresenter);
  Enroll_PresentationController.prototype.initializePresentationController = function() {
  };
   /**
  * Common Function For Navigation
  * @member of Enroll_presentationController
  * @param {String} Contains form name.
  */
  Enroll_PresentationController.prototype.commonFunctionForNavigation = function(formName){
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo(formName);
  };
  /**
  * Validates if user is already enrolled
  * @member of Enroll_presentationController
  * @param {json} Contains Lastname, dob and SSN.
  */
  Enroll_PresentationController.prototype.checkUserEnrolled = function(params){
    ////enrollPresentationScope.logger.log("#### checkUserEnrolled started ####");
    var newUserManager = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('NewUserBusinessManager').businessController;
	var inputJson =     {
		"Ssn": params.ssn,
		"LastName": params.userlastname,
		"DateOfBirth": params.dateOfBirth
	};
    newUserManager.checkUserEnrolled(inputJson,enrollPresentationScope.checkUserEnrolledSuccess,enrollPresentationScope.checkUserEnrolledFailure);
  };
  /**
  * checkUserEnrolled Success Callback
  */
  Enroll_PresentationController.prototype.checkUserEnrolledSuccess = function(response){
   var authManager = applicationManager.getAuthManager();
    authManager.setServicekey(response.serviceKey);
    ////enrollPresentationScope.logger.log("#### checkUserEnrolledSuccess in Enroll_PresentationController ####");
    if(response && response.result === "User Not Enrolled"){
	 var controller = applicationManager.getPresentationUtility().getController('frmEnrollSSn', true);
      controller.userNotEnrolled();
      this.getTermsandConditions();
      this.navigateToMFA(response.serviceKey);
    }
    else{
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo("frmAlreadyEnrolled");
    }
  };
   /**
  * get Terms and conditions
  */
  Enroll_PresentationController.prototype.getTermsandConditions = function(){
     var config = applicationManager.getConfigurationManager();
    var locale=config.getLocale();
    var termsAndConditions=config.getTermsAndConditions();
     var param={
     "languageCode": termsAndConditions[locale],
      "termsAndConditionsCode": termsAndConditions["Enroll"]
   };
    var termsAndConditions = applicationManager.getTermsAndConditionsManager();
    termsAndConditions.fetchTermsAndConditionsPreLogin(param,enrollPresentationScope.getTermsandConditionsSuccessCallBack,enrollPresentationScope.getTermsandConditionsErrorCallback);
  };
   Enroll_PresentationController.prototype.getTermsandConditionsSuccessCallBack = function(response){
    var navManager = applicationManager.getNavigationManager();
    // navManager.setCustomInfo("frmTermsAndCondition",{"content":response.termsAndConditionsContent,"flowType":"Enroll"});
    navManager.setCustomInfo("frmTermsAndCondition",{"content":response.termsAndConditionsContent,"flowType":"Enroll","contentTypeID":response.contentTypeId});
   };
  Enroll_PresentationController.prototype.getTermsandConditionsErrorCallback = function(err){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
		 if (err["isServerUnreachable"]) {
         applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
   	 }else{
              var controller = applicationManager.getPresentationUtility().getController('frmEnrollSSn', true);
            var errorMsg = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.enroll.SomethingWrong");
            controller.bindViewError(errorMsg);
        }
   };
    Enroll_PresentationController.prototype.navigateToMFA = function(servicekey){
	var inputJSON={
          "MFAAttributes": {
		"serviceKey": servicekey
			}
		}
         var authManager = applicationManager.getAuthManager();
    authManager.requestEnrollOTP(inputJSON,enrollPresentationScope.navigateToMFASuccessCallback,enrollPresentationScope.navigateToMFAErrorCallback);
    };
   Enroll_PresentationController.prototype.navigateToMFASuccessCallback = function(res){
    	var communicationType = res["MFAAttributes"].communicationType;
	    applicationManager.getAuthManager().setCommunicationType(communicationType);
    	applicationManager.getAuthManager().setMFAResponse(res);
     	if(communicationType === "DISPLAY_ALL"){
            var servicekey = res["MFAAttributes"].serviceKey;
          applicationManager.getAuthManager().setServicekey(servicekey);
           var controller = applicationManager.getPresentationUtility().getController('frmEnrollMFAOption3', true);
          controller.setFormUI(res);
          enrollPresentationScope.commonFunctionForNavigation("frmEnrollMFAOption3");
        }
     else{
         var securitykey = res["MFAAttributes"].securityKey;
          var servicekey = res["MFAAttributes"].serviceKey;
            enrollPresentationScope.unmaskedphoneNumber = res["MFAAttributes"]["customerCommunication"]["phone"][0]["unmasked"];
           enrollPresentationScope.unmaskedemail =  res["MFAAttributes"]["customerCommunication"]["email"][0]["unmasked"];
          applicationManager.getAuthManager().setServicekey(servicekey);
          applicationManager.getAuthManager().setSecurityKey(securitykey);
         var controller = applicationManager.getPresentationUtility().getController('frmEnrollMFASecurityCode', true);
          controller.setFormUI(res);
          enrollPresentationScope.commonFunctionForNavigation("frmEnrollMFASecurityCode");
     }
    };
   Enroll_PresentationController.prototype.navigateToMFAErrorCallback = function(err){
		  applicationManager.getPresentationUtility().dismissLoadingScreen();
		 if (err["isServerUnreachable"]) {
         applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
   	 }else{
              var controller = applicationManager.getPresentationUtility().getController('frmEnrollSSn', true);
            var errorMsg = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.enroll.SomethingWrong");
            controller.bindViewError(errorMsg);
        }
   }
   Enroll_PresentationController.prototype.navigateToOTPScreen = function(data){
	//	 var authManger = applicationManager.getAuthManager();
     enrollPresentationScope.unmaskedphoneNumber = data.phone;
     enrollPresentationScope.unmaskedemail =  data.email;
        var username = applicationManager.getAuthManager().getUserName();
     	var servicekey = applicationManager.getAuthManager().getServicekey();
        var inputJSON = {
          "UserName": username,
          "MFAAttributes" : {
           "serviceKey":  servicekey,
            "OTP": {
              "phone" :  enrollPresentationScope.unmaskedphoneNumber,
              "email" :  enrollPresentationScope.unmaskedemail
            }
        }
        };
            var authManager = applicationManager.getAuthManager();
    authManager.requestEnrollOTP(inputJSON,enrollPresentationScope.navigateToOTPScreenSuccessCallback,enrollPresentationScope.navigateToOTPScreenErrorCallback);
    };
   Enroll_PresentationController.prototype.navigateToOTPScreenSuccessCallback = function(res){
         applicationManager.getAuthManager().setSecurityKey(res["MFAAttributes"].securityKey);
         applicationManager.getAuthManager().setMFAResponse(res);
     var communicationType =  applicationManager.getAuthManager().getCommunicationType();
	    res["MFAAttributes"]["communicationType"] = communicationType;
		 res["MFAAttributes"]["phone"] = enrollPresentationScope.maskedphoneNumber;
  	      res["MFAAttributes"]["email"] = enrollPresentationScope.maskedemail;
    	  var controller = applicationManager.getPresentationUtility().getController('frmEnrollMFASecurityCode', true);
          controller.setFormUI(res);
          enrollPresentationScope.commonFunctionForNavigation("frmEnrollMFASecurityCode");
    };
   Enroll_PresentationController.prototype.navigateToOTPScreenErrorCallback = function(err){
		 applicationManager.getPresentationUtility().dismissLoadingScreen();
		 if (err["isServerUnreachable"]) {
         applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    };
   };
       Enroll_PresentationController.prototype.verifyMFAOTP = function(otp){
		    applicationManager.getPresentationUtility().showLoadingScreen();
		var otp = otp;
     	var servicekey = applicationManager.getAuthManager().getServicekey();
        var securitykey =  applicationManager.getAuthManager().getSecurityKey();
        var inputJSON ={
   			"MFAAttributes":{
      			"serviceKey":servicekey,
    			  "OTP":{
         			"securityKey":securitykey,
       				  "otp": otp
      				}
   				}
			}
          enrollPresentationScope.asyncManager.initiateAsyncProcess(2);
      enrollPresentationScope.getUsernameAndPasswordRulesAndPolicies(enrollPresentationScope.getPasswordRulesAndPolicySuccessCallback,enrollPresentationScope.getPasswordRulesAndPolicyErrorCallback);
        applicationManager.getAuthManager().verifyOTPPreLogin(inputJSON,enrollPresentationScope.verifyMFAOTPSuccessCallback,enrollPresentationScope.verifyMFAOTPErrorCallback);
    };
   Enroll_PresentationController.prototype.verifyMFAOTPSuccessCallback = function(res){
    applicationManager.getAuthManager().setMFAResponse(res);
     	enrollPresentationScope.asyncManager.setSuccessStatus(0, res);
    if (enrollPresentationScope.asyncManager.areAllservicesDone(2)) {
    ////enrollPresentationScope.logger.log("####  OTP validation success call back ####");
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
	var data = navManager.getCustomInfo("frmEnrollSignUp");
          res = enrollPresentationScope.asyncManager.getData(1);
     if(data && data!==null){
      data.usernamePolicy = res.usernamepolicy.content;
       data.passwordPolicy = res.passwordpolicy.content;
    }
    else{
      data = {"usernamePolicy":res.usernamepolicy.content,"passwordPolicy":res.passwordpolicy.content};
    }
    navManager.setCustomInfo("frmEnrollSignUp",data);
    var validationUtility = applicationManager.getValidationUtilManager();
    validationUtility.createRegexForUsernameValidation(res.usernamerules);
    validationUtility.createRegexForPasswordValidation(res.passwordrules);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    navManager.navigateTo("frmEnrollSignUp");
	}
    };
   Enroll_PresentationController.prototype.verifyMFAOTPErrorCallback = function(err){
		 applicationManager.getPresentationUtility().dismissLoadingScreen();
		 if (err["isServerUnreachable"]) {
         applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
         }
         else {
          var controller = applicationManager.getPresentationUtility().getController('frmEnrollMFASecurityCode', true);
      	 controller.showIncorrectOTPError(err.serverErrorRes);
         }
    };
Enroll_PresentationController.prototype.resendMFAOTP = function(data){
        var username = applicationManager.getAuthManager().getUserName();
     	var servicekey = applicationManager.getAuthManager().getServicekey();
       var inputJSON = {
          "MFAAttributes" : {
           "serviceKey":  servicekey,
            "OTP": {
             "phone" :  enrollPresentationScope.unmaskedphoneNumber,
             "email" : enrollPresentationScope.unmaskedemail,
			 "securityKey" : applicationManager.getAuthManager().getSecurityKey()
            }
          }
       };
   		applicationManager.getAuthManager().requestEnrollOTP(inputJSON,enrollPresentationScope.resendMFAOTPSuccessCallback,enrollPresentationScope.resendMFAOTPScreenErrorCallback);
    };
   Enroll_PresentationController.prototype.resendMFAOTPSuccessCallback = function(res){
	    applicationManager.getAuthManager().setSecurityKey(res["MFAAttributes"]["securityKey"]);
     applicationManager.getAuthManager().setMFAResponse(res);
     enrollPresentationScope.MFAresponse = res;
		applicationManager.getPresentationUtility().dismissLoadingScreen();
    };
   Enroll_PresentationController.prototype.resendMFAOTPScreenErrorCallback = function(err){
		 applicationManager.getPresentationUtility().dismissLoadingScreen();
		 if (err["isServerUnreachable"]) {
         applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    	}
     	else {
          var controller = applicationManager.getPresentationUtility().getController('frmEnrollMFASecurityCode', true);
      	 controller.showIncorrectOTPError(err.serverErrorRes);
         }
    };
  /**
  * checkUserEnrolled Failure Callback
  */
  Enroll_PresentationController.prototype.checkUserEnrolledFailure = function(error){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    ////enrollPresentationScope.logger.log("####  checkUserEnrolled failure callback ####");
    if (error["isServerUnreachable"])
      applicationManager.getPresentationInterruptHandler().showErrorMessage("preLogin", error);
    else if(error &&  (error.errorMessage === "Please provide valid Details." || error["serverErrorRes"].dbpErrCode == 10630)){
	   var controller = applicationManager.getPresentationUtility().getController('frmEnrollDOB', true);
       var msg = kony.i18n.getLocalizedString("kony.mb.enroll.validDetails");
       controller.bindViewError(msg);
    }
    else{
      var controller = applicationManager.getPresentationUtility().getController('frmEnrollDOB', true);
      var errorMsg = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.enroll.SomethingWrong");
      controller.bindViewError(errorMsg);
    }
  };
  /**
* Validates the entered SSN
* @member of Enroll_presentationController
* @param {String} SSN - which contains SSN Ex: 123456789 .
*/
  Enroll_PresentationController.prototype.validateEnrollSSN = function(SSN){
    //enrollPresentationScope.logger.log("#### validation on SSN started ####");
    var validationManager = applicationManager.getValidationUtilManager();
    var isValidSSN = validationManager.isValidSSNNumber(SSN);
    if (isValidSSN === true) {
      //enrollPresentationScope.logger.log("#### validation on SSN successful ####");
      var navManager = applicationManager.getNavigationManager();
      //navManager.setCustomInfo("frmEnrollSSn", SSN);
      var newUserManager = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('NewUserBusinessManager').businessController;
      newUserManager.setEnrollAttribute("Ssn",SSN);
    } else {
      //enrollPresentationScope.logger.log("#### validation on SSN failed ####");
      var controller = applicationManager.getPresentationUtility().getController('frmEnrollSSn', true);
      controller.bindViewError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.enroll.enterSSN"));
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
  };
  /**
  * Navigates to frmEnrollSSN
  * @member of Enroll_PresentationController
  * @param {String} lastName - which contains the Last Name. Ex: Stark
  */
  Enroll_PresentationController.prototype.navigateToFrmEnrollSSN = function(lastName){
    //enrollPresentationScope.logger.log("#### navigateToFrmEnrollSSN in Enroll_PresentationController started ####");
    var navManager = applicationManager.getNavigationManager();
    //navManager.setCustomInfo("frmEnrollLastName",lastName);
    var newUserManager = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('NewUserBusinessManager').businessController;
    const legalEntity = navManager.getCustomInfo("frmForgot");
    newUserManager.setEnrollAttribute("LegalEntity",legalEntity);
    newUserManager.setEnrollAttribute("LastName",lastName);
    navManager.navigateTo("frmEnrollSSn");
    //enrollPresentationScope.logger.log("#### navigateToFrmEnrollSSN in Enroll_PresentationController completed ####");
  };
  
  
   /**
  * Navigates to frmEnrollDOB
  * @member of Enroll_PresentationController
  * @param {String} lastName - which contains the Last Name. Ex: Stark
  */
  Enroll_PresentationController.prototype.navigateToFrmEnrollDOB = function(ssn){
    //enrollPresentationScope.logger.log("#### navigateToFrmEnrollDOB in Enroll_PresentationController started ####");
    var navManager = applicationManager.getNavigationManager();
    //navManager.setCustomInfo("frmEnrollLastName",lastName);
    var newUserManager = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('NewUserBusinessManager').businessController;
    newUserManager.setEnrollAttribute("Ssn",ssn);
    navManager.navigateTo("frmEnrollDOB");
    //enrollPresentationScope.logger.log("#### navigateToFrmEnrollDOB in Enroll_PresentationController completed ####");
  };
  /**
  * Validate the Date Of Birth
  * @member of Enroll_PresentationController
  * @param {String} dob - which contains Date Of Birth. Ex: 09-08-1995
  */
  Enroll_PresentationController.prototype.validateDOB = function(dob){
    //enrollPresentationScope.logger.log("#### validateDOB in Enroll_PresentationController started ####");
    var validationManager=kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"ValidationUtilManager","appName":"CommonsMA"}).businessController;
    //var forUtility = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PresentationFormUtility").businessController;
    var forUtility = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"FormatUtilManager","appName":"CommonsMA"}).businessController;
    var isValidDOB= validationManager.isDOBValid(dob);
    if(isValidDOB===true)
    {
      //enrollPresentationScope.logger.log("#### validateDOB in Enroll_PresentationController: Navigating to frmEnrollSSn####");
      var newUserManager = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('NewUserBusinessManager').businessController;
	  var userDOB = forUtility.getDateForFormatting(dob);
      var dateOfBirth = forUtility.getFormatedDateString(new Date(userDOB),forUtility.getBackendDateFormat());
      newUserManager.setEnrollAttribute("DateOfBirth",dateOfBirth);
      return true;
    }
    {
      var controller = applicationManager.getPresentationUtility().getController('frmEnrollDOB', true);
      controller.bindViewError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.validDOB"));
      
    }
    //enrollPresentationScope.logger.log("#### validateDOB in Enroll_PresentationController completed ####");
    return false;
  };
  /**
  * Checks Availability of UserName
  * @member of Enroll_PresentationController
  * @param {String} userName - which contains UserName. Ex: TonyStark
  */
  Enroll_PresentationController.prototype.checkAvailabilityOfUserName = function(userName){
    var newUserManager = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('NewUserBusinessManager').businessController;
    var params = {};
    params.UserName = userName;
    newUserManager.checkUserName(params,enrollPresentationScope.checkAvailabilityOfUserNameSuccess,enrollPresentationScope.checkAvailabilityOfUserNameFailure);
  };
  /**
  * CheckUserName Success Callback
  */
  Enroll_PresentationController.prototype.checkAvailabilityOfUserNameSuccess = function(response){
    //enrollPresentationScope.logger.log("#### checkAvailabilityOfUserNameSuccess in Enroll_PresentationController ####");
    var controller = applicationManager.getPresentationUtility().getController('frmEnrollSignUp', true);
    if(response && response.isUserNameExists === "true")
      controller.bindUserNameIsNotAvailable();
    else
      controller.bindUserNameIsAvailable();
  };
  /**
  * CheckUserName Failure Callback
  */
  Enroll_PresentationController.prototype.checkAvailabilityOfUserNameFailure = function(){
    //enrollPresentationScope.logger.log("#### checkAvailabilityOfUserNameFailure in Enroll_PresentationController ####");
    var controller = applicationManager.getPresentationUtility().getController('frmEnrollSignUp', true);
    controller.bindUserNameIsNotAvailable();
  };
  /**
  * Checks if Password has required characters
  * @member of Enroll_PresentationController
  * @param {String} password - which contains Password. Ex: Kony@123
  */
  Enroll_PresentationController.prototype.validatePassword = function(password){
    //enrollPresentationScope.logger.log("#### validatePassword in Enroll_PresentationController started ####");
    var validationUtilManager = applicationManager.getValidationUtilManager();
    var controller = applicationManager.getPresentationUtility().getController('frmEnrollSignUp', true);
    if(validationUtilManager.isPasswordValidForPolicy(password))
    {
      //enrollPresentationScope.logger.log("#### validatePassword in Enroll_PresentationController: Password is valid ####");
      controller.bindValidPassword();
	  controller.hideFlxRequirements();
    }
    else{
      //enrollPresentationScope.logger.log("#### validatePassword in Enroll_PresentationController: Password is invalid ####");
      controller.showFlxSecurityRequirements();
    }
    //enrollPresentationScope.logger.log("#### validatePassword in Enroll_PresentationController completed ####");
  };
  /**
  * Checks if Password has required characters
  * @member of Enroll_PresentationController
  * @param {String} password - which contains Password. Ex: Kony@123
  * @return Boolean
  */
  Enroll_PresentationController.prototype.isValidPassword = function(password){
    //enrollPresentationScope.logger.log("#### isValidPassword in Enroll_PresentationController ####");
    return applicationManager.getValidationUtilManager().isValidPassword(password);
  };
  /**
* Code to request OTP
* @member of Enroll_presentationController
* @param {callBack} presentationSuccessCallback - invoke the call back with success response.
* @param {callBack} presentationErrorCallback - invoke the call back with error response.
*/
  Enroll_PresentationController.prototype.requestOTP = function(){
    //enrollPresentationScope.logger.log("#### request OTP Code started ####");
    //     var navManager = applicationManager.getNavigationManager();
    //     var ssn =  navManager.getCustomInfo("frmEnrollSSn");
    //     var dateOfBirth = navManager.getCustomInfo("frmEnrollDOB");
    //     var userlastname = navManager.getCustomInfo("frmEnrollLastName");
    var newUserManager = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('NewUserBusinessManager').businessController;
    var userlastname = newUserManager.getEnrollObject().userlastname;
    var dateOfBirth = newUserManager.getEnrollObject().dateOfBirth;
    var ssn =  newUserManager.getEnrollObject().ssn;
    var username = "";
    var requestOTPJSON = {
      "ssn":ssn,
      "userlastname":userlastname,
      "dateOfBirth":dateOfBirth,
      "userName": username
    };
    var authManager = applicationManager.getAuthManager();
    authManager.fetchOTP(requestOTPJSON,enrollPresentationScope.requestOTPSuccess,enrollPresentationScope.requestOTPFailure);
  };
  Enroll_PresentationController.prototype.requestOTPSuccess = function(response){
    //enrollPresentationScope.logger.log("#### request OTP service call success ####");
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    //enrollPresentationScope.logger.log("#### request OTP service call success navigating to frmEnrollSecurity ####");
    navManager.navigateTo("frmEnrollSecurity");
  };
  Enroll_PresentationController.prototype.requestOTPFailure = function(error){
    //enrollPresentationScope.logger.log("#### request OTP service call failed ####");
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (error["isServerUnreachable"]){
      applicationManager.getPresentationInterruptHandler().showErrorMessage("preLogin", error);
    }
    else{
      var controller = applicationManager.getPresentationUtility().getController('frmEnrollSecurityCheck', true);
      var errorMsg = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.enroll.SomethingWrong");
      controller.bindViewError(errorMsg);
      //generic error callback
    }
  };
  /**
* Code to validate OTP
* @member of Enroll_presentationController
* @param {String}  EX: 123456
* @param {callBack} presentationSuccessCallback - invoke the call back with success response.
* @param {callBack} presentationErrorCallback - invoke the call back with error response.
*/
  Enroll_PresentationController.prototype.validateOTP = function(otp){
    //enrollPresentationScope.logger.log("#### validate OTP Code started ####");
    var validationUtilManager = applicationManager.getValidationUtilManager();
    if(validationUtilManager.isValidOTP(otp))
    {
      //enrollPresentationScope.logger.log("####  OTP is valid ####");
      //       var navManager = applicationManager.getNavigationManager();
      //       var ssn =  navManager.getCustomInfo("frmEnrollSSn");
      //       var dateOfBirth = navManager.getCustomInfo("frmEnrollDOB");
      //       var userlastname = navManager.getCustomInfo("frmEnrollLastName");
      var newUserManager = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('NewUserBusinessManager').businessController;
      var userlastname = newUserManager.getEnrollObject().userlastname;
      var dateOfBirth = newUserManager.getEnrollObject().dateOfBirth;
      var ssn =  newUserManager.getEnrollObject().ssn;
      var username = "";
      var verifyOTPJSON = {
        "Otp":otp,
        "Ssn":ssn,
        "LastName":userlastname,
        "DateOfBirth":dateOfBirth,
        "UserName": username
      };
	  enrollPresentationScope.asyncManager.initiateAsyncProcess(2);
      enrollPresentationScope.getUsernameAndPasswordRulesAndPolicies(enrollPresentationScope.getPasswordRulesAndPolicySuccessCallback,enrollPresentationScope.getPasswordRulesAndPolicyErrorCallback);
      var authManager = applicationManager.getAuthManager();
      authManager.verifyOTP(verifyOTPJSON,enrollPresentationScope.validateOTPSuccess,enrollPresentationScope.validateOTPFailure);
    }
    else
    {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var controller = applicationManager.getPresentationUtility().getController('frmEnrollSecurity', true);
      var errormsg =  applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.enterSecurityCode");
      controller.bindGenericError(errormsg);
    }
  };
  Enroll_PresentationController.prototype.validateOTPSuccess = function(response){
	enrollPresentationScope.asyncManager.setSuccessStatus(0, response);
    if (enrollPresentationScope.asyncManager.areAllservicesDone(2)) {
    //enrollPresentationScope.logger.log("####  OTP validation success call back ####");
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
	var data = navManager.getCustomInfo("frmEnrollSignUp");
          res = enrollPresentationScope.asyncManager.getData(1);
     if(data && data!==null){
      data.usernamePolicy = res.usernamepolicy.content;
       data.passwordPolicy = res.passwordpolicy.content;
    }
    else{
      data = {"usernamePolicy":res.usernamepolicy.content,"passwordPolicy":res.passwordpolicy.content};
    }
    navManager.setCustomInfo("frmEnrollSignUp",data);
    var validationUtility = applicationManager.getValidationUtilManager();
    validationUtility.createRegexForUsernameValidation(res.usernamerules);
    validationUtility.createRegexForPasswordValidation(res.passwordrules);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    navManager.navigateTo("frmEnrollSignUp");
	}
  };
  Enroll_PresentationController.prototype.validateOTPFailure = function(error){
	enrollPresentationScope.asyncManager.setErrorStatus(0, error);
    //enrollPresentationScope.logger.log("####  OTP validation error call back ####");
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (error["isServerUnreachable"]){
      applicationManager.getPresentationInterruptHandler().showErrorMessage("preLogin", error);
    }
    else{
      var controller = applicationManager.getPresentationUtility().getController('frmEnrollSecurity', true);
      var errorMsg = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.enroll.enterValidOTP");
      controller.bindGenericError(errorMsg);
    }
  };
  /**
* Code to get cards
* @member of Enroll_presentationController
* @param {callBack} presentationSuccessCallback - invoke the call back with success response.
* @param {callBack} presentationErrorCallback - invoke the call back with error response.
*/
  Enroll_PresentationController.prototype.getCardsForEnroll = function(){
    //enrollPresentationScope.logger.log("#### code for getting cards for enroll started  ####");
    //     var navManager = applicationManager.getNavigationManager();
    //     var ssn =  navManager.getCustomInfo("frmEnrollSSn");
    //     var dateOfBirth = navManager.getCustomInfo("frmEnrollDOB");
    //     var userlastname = navManager.getCustomInfo("frmEnrollLastName");
    var newUserManager = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('NewUserBusinessManager').businessController;
    var userlastname = newUserManager.getEnrollObject().userlastname;
    var dateOfBirth = newUserManager.getEnrollObject().dateOfBirth;
    var ssn =  newUserManager.getEnrollObject().ssn;
    var cardsManager = applicationManager.getCardsManager();
    cardsManager.fetchCardsForEnroll(userlastname,dateOfBirth,ssn,enrollPresentationScope.getCardsForEnrollSuccess,enrollPresentationScope.getCardsForEnrollFailure);
  };
  Enroll_PresentationController.prototype.getCardsForEnrollSuccess = function(response){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    //enrollPresentationScope.logger.log("####  getting cards for enroll success call back ####");
    var data = [];
    for(var i in response){
      var item = response[i];
      data.push({
        "cardType"    : item.cardType,
        "cardNumber"  : item.cardNumber,
      });
    }
    var navManager = applicationManager.getNavigationManager();
    navManager.setCustomInfo("frmEnrollCVV",data);
    //navManager.navigateTo("frmEnrollCVV");
    if(data.length>0){
      //enrollPresentationScope.logger.log("#### code for validation of CVV success navigating to frmEnrollSignUp  ####");
      navManager.navigateTo("frmEnrollCVV");
    }
    else{
      var controller = applicationManager.getPresentationUtility().getController('frmEnrollSecurityCheck', true);
      var errorMsg = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.enroll.noCardsToShow");
      controller.bindViewError(errorMsg);
    }
  };
  Enroll_PresentationController.prototype.getCardsForEnrollFailure = function(error){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    //enrollPresentationScope.logger.log("####  getting cards for enroll failure callback ####");
    if (error["isServerUnreachable"]){
      applicationManager.getPresentationInterruptHandler().showErrorMessage("preLogin", error);
    }
    else{
      var controller = applicationManager.getPresentationUtility().getController('frmEnrollSecurityCheck', true);
      var errorMsg = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.enroll.unableToFetchCards");
      controller.bindViewError(errorMsg);}
  };
  /**
* Code to validate CVV
* @member of Enroll_presentationController
* @param {String} cardNumber Ex: 123456789123456
* @param {String} CVV Ex: 123
* @param {callBack} presentationSuccessCallback - invoke the call back with success response.
* @param {callBack} presentationErrorCallback - invoke the call back with error response.
*/
  Enroll_PresentationController.prototype.validateCVV = function(cardNumber,cvv){
    //enrollPresentationScope.logger.log("#### code for validation of CVV started  ####");
    var validationUtilManager = applicationManager.getValidationUtilManager();
    if (validationUtilManager.isValidCVV(cvv)) {
      //       var navManager = applicationManager.getNavigationManager();
      //       var ssn = navManager.getCustomInfo("frmEnrollSSn");
      //       var dateOfBirth = navManager.getCustomInfo("frmEnrollDOB");
      //       var userlastname = navManager.getCustomInfo("frmEnrollLastName");
      var newUserManager = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('NewUserBusinessManager').businessController;
      var userlastname = newUserManager.getEnrollObject().userlastname;
      var dateOfBirth = newUserManager.getEnrollObject().dateOfBirth;
      var ssn =  newUserManager.getEnrollObject().ssn;
      var username = "";
      var verifyCVVJSon = {
        "ssn": ssn,
        "userlastname": userlastname,
        "dateOfBirth": dateOfBirth,
        "cvv": cvv,
        "cardNumber": cardNumber,
        "userName": username
      };
	  enrollPresentationScope.asyncManager.initiateAsyncProcess(2);
      enrollPresentationScope.getUsernameAndPasswordRulesAndPolicies(enrollPresentationScope.getPasswordRulesAndPolicySuccessCallback,enrollPresentationScope.getPasswordRulesAndPolicyErrorCallback);
      var authManager = applicationManager.getAuthManager();
      authManager.verifyCVV(verifyCVVJSon, enrollPresentationScope.validateCVVSuccess, enrollPresentationScope.validateCVVFailure);
    } else {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var controller = applicationManager.getPresentationUtility().getController('frmEnrollCVV', true);
      var errormsg = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.enterCVV");
      controller.bindGenericError(errormsg);
    }
  };
  Enroll_PresentationController.prototype.validateCVVSuccess = function(response){
	  enrollPresentationScope.asyncManager.setSuccessStatus(0, response);
    if (enrollPresentationScope.asyncManager.areAllservicesDone(2)) {
    //enrollPresentationScope.logger.log("#### code for validation of CVV success  ####");
	 var navManager = applicationManager.getNavigationManager();
	var data = navManager.getCustomInfo("frmEnrollSignUp");
          res = enrollPresentationScope.asyncManager.getData(1);
     if(data && data!==null){
      data.usernamePolicy = res.usernamepolicy.content;
       data.passwordPolicy = res.passwordpolicy.content;
    }
    else{
      data = {"usernamePolicy":res.usernamepolicy.content,"passwordPolicy":res.passwordpolicy.content};
    }
    navManager.setCustomInfo("frmEnrollSignUp",data);
    var validationUtility = applicationManager.getValidationUtilManager();
    validationUtility.createRegexForUsernameValidation(res.usernamerules);
    validationUtility.createRegexForPasswordValidation(res.passwordrules);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    //enrollPresentationScope.logger.log("#### code for validatgion of CVV success navigating to frmEnrollSignUp  ####");
    navManager.navigateTo("frmEnrollSignUp");
	}
  };
  Enroll_PresentationController.prototype.validateCVVFailure = function(error){
	 enrollPresentationScope.asyncManager.setErrorStatus(0, error);
    //enrollPresentationScope.logger.log("#### code for validation of CVV failed  ####");
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (error["isServerUnreachable"]){
      applicationManager.getPresentationInterruptHandler().showErrorMessage("preLogin", error);
    }
    else{
      var controller = applicationManager.getPresentationUtility().getController('frmEnrollCVV', true);
      var errorMsg = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.enroll.unableToVerifyCVV");
      controller.bindGenericError(errorMsg);}
  };
  /**
  * Creates New User by invoking createUserForEnroll of NewUserBusinessManager
  * @member of Enroll_PresentationController
  * @param {String} userName - which contains User Name. Ex: TonyStark
  * @param {String} password - which contains Password. Ex: Kony@123
  */
  Enroll_PresentationController.prototype.createUser = function(userName,password){
    //enrollPresentationScope.logger.log("#### createUser in Enroll_PresentationController ####");
    //     var navManager = applicationManager.getNavigationManager();
    //     var enrollUserObj = {};
    //     enrollUserObj.ssn = navManager.getCustomInfo("frmEnrollSSn");
    //     enrollUserObj.userLastName = navManager.getCustomInfo("frmEnrollLastName");
    //     enrollUserObj.dob = navManager.getCustomInfo("frmEnrollDOB");
    //     enrollUserObj.password = password;
    //     enrollUserObj.userName = userName;
    enrollPresentationScope.UserName = userName;
    var newUserManager = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('NewUserBusinessManager').businessController;
    newUserManager.setEnrollAttribute("UserName",userName);
    newUserManager.setEnrollAttribute("Password", password);
    newUserManager.setEnrollAttribute("serviceKey", applicationManager.getAuthManager().getServicekey());
  	var inputJSON = {
			"UserName": userName,
			"Password": password,
			"serviceKey": applicationManager.getAuthManager().getServicekey()
    }
    newUserManager.createUserForEnroll(enrollPresentationScope.createUserSuccess, enrollPresentationScope.createUserFailure);
  };
  /**
  * createUserForEnroll Success callback
  * @member of Enroll_PresentationController
  */
  Enroll_PresentationController.prototype.createUserSuccess = function(response){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(response.errmsg && response.errmsg.startsWith("This username already being used by another user")){
      var controller = applicationManager.getPresentationUtility().getController('frmEnrollSignUp', true);
      controller.bindUserNameIsNotAvailable();
    }
    else {
      enrollPresentationScope.resetEnrollObj();
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("frmEnrollSignUp",{
        "userName" : enrollPresentationScope.UserName,
        "isEnrollSuccess" : true
      });
      navManager.navigateTo({
                "appName": "AuthenticationMA",
                "friendlyName": "AuthHIDUIModule/frmLoginHID"
            });
    }
  };
  /**
  * createUserForEnroll Failure callback
  * @member of Enroll_PresentationController
  */
  Enroll_PresentationController.prototype.createUserFailure = function(error){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (error["isServerUnreachable"]){
      applicationManager.getPresentationInterruptHandler().showErrorMessage(handleMode, err);
    }
    else{
      var controller = applicationManager.getPresentationUtility().getController('frmEnrollSignUp', true);
      var errorMsg = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.enroll.enrollFailed");
      controller.bindViewError(errorMsg);
    }
  };
  /**
* Code to resend OTP
* @member of Enroll_presentationController
* @param {callBack} presentationSuccessCallback - invoke the call back with success response.
* @param {callBack} presentationErrorCallback - invoke the call back with error response.
*/
  Enroll_PresentationController.prototype.resendOTP = function(){
    //enrollPresentationScope.logger.log("#### code for resend OTP started  ####");
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    //     var navManager = applicationManager.getNavigationManager();
    //     var ssn =  navManager.getCustomInfo("frmEnrollSSn");
    //     var dateOfBirth = navManager.getCustomInfo("frmEnrollDOB");
    //     var userlastname = navManager.getCustomInfo("frmEnrollLastName");
    var newUserManager = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('NewUserBusinessManager').businessController;
    var userlastname = newUserManager.getEnrollObject().userlastname;
    var dateOfBirth = newUserManager.getEnrollObject().dateOfBirth;
    var ssn =  newUserManager.getEnrollObject().ssn;
    var username = "";
    var requestOTPJSON = {
      "ssn":ssn,
      "userlastname":userlastname,
      "dateOfBirth":dateOfBirth,
      "userName": username
    };
    var authManager = applicationManager.getAuthManager();
    authManager.fetchOTP(requestOTPJSON,enrollPresentationScope.resendOTPSuccess,enrollPresentationScope.resendOTPFailure);
  };
  Enroll_PresentationController.prototype.resendOTPSuccess = function(){
    //enrollPresentationScope.logger.log("#### code for resend OTP success  ####");
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
  Enroll_PresentationController.prototype.resendOTPFailure = function(){
    //enrollPresentationScope.logger.log("#### code for resend OTP failure  ####");
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
  Enroll_PresentationController.prototype.getLegalEntity = function() {
    var newUserManager = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('NewUserBusinessManager').businessController;
    return newUserManager.getEnrollObject().LegalEntity;
};
  Enroll_PresentationController.prototype.getEnrollLastName = function(){
    var newUserManager = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('NewUserBusinessManager').businessController;
    return newUserManager.getEnrollObject().LastName;
  };
  Enroll_PresentationController.prototype.getEnrollDOB = function(){
    var newUserManager = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('NewUserBusinessManager').businessController;
    return newUserManager.getEnrollObject().DateOfBirth;
  };
  Enroll_PresentationController.prototype.getEnrollSSN = function() {
        var newUserManager = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('NewUserBusinessManager').businessController;
        return newUserManager.getEnrollObject().Ssn;
    };
  Enroll_PresentationController.prototype.resetEnrollObj = function(formName){
    var newUserManager = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('NewUserBusinessManager').businessController;
    newUserManager.resetEnrollObj();
    var navManager = applicationManager.getNavigationManager();
	navManager.clearStack();
    if(formName === 'frmEnrollLastName')
    {	
      if(CommonUtilities.getSCAType() == 1){
        new kony.mvc.Navigation({"appName" : "SelfServiceEnrolmentMA", "friendlyName" : "frmEnrollActivateProfileHID"}).navigate();
      }else if(CommonUtilities.getSCAType() == 2){
        new kony.mvc.Navigation({"appName" : "SelfServiceEnrolmentMA", "friendlyName" : "frmEnrollActivateProfileUniken"}).navigate();
      }
      else{
        new kony.mvc.Navigation({"appName" : "SelfServiceEnrolmentMA", "friendlyName" : "frmEnrollActivateProfile"}).navigate();
      }
    }
    else
    {
      if(CommonUtilities.getSCAType() == 1){
        new kony.mvc.Navigation({"appName" : "AuthenticationMA", "friendlyName" : "AuthHIDUIModule/frmLoginHID"}).navigate();
      } else if(CommonUtilities.getSCAType() == 2){
        new kony.mvc.Navigation({"appName" : "AuthenticationMA", "friendlyName" : "AuthUnikenUIModule/frmLoginUniken"}).navigate();
      }
      else{
        new kony.mvc.Navigation({"appName" : "AuthenticationMA", "friendlyName" : "frmLogin"}).navigate();
      }
    }
    //navmanager.navigateTo("frmLogin");
    //navManager.goBack();
  };
  Enroll_PresentationController.prototype.getUsernameRulesAndPolicy = function(){
    var userObj = applicationManager.getUserPreferencesManager();
    userObj.fetchUsernameRulesAndPolicy(enrollPresentationScope.getUsernameRulesAndPolicySuccessCallback,enrollPresentationScope.getUsernameRulesAndPolicyErrorCallback);
  };
  Enroll_PresentationController.prototype.getUsernameRulesAndPolicySuccessCallback = function(res){
    var navManager = applicationManager.getNavigationManager();
    var data = navManager.getCustomInfo("frmEnrollSignUp");
    if(data && data!==null){
      data.usernamePolicy = res.usernamepolicy.content;
    }
    else{
      data = {"usernamePolicy":res.usernamepolicy.content};
    }
    navManager.setCustomInfo("frmEnrollSignUp",data);
    var validationUtility = applicationManager.getValidationUtilManager();
    validationUtility.createRegexForUsernameValidation(res.usernamerules);
  };
  Enroll_PresentationController.prototype.getUsernameRulesAndPolicyErrorCallback = function(err){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (errRes["isServerUnreachable"]) {
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errRes);
    }
  };
  Enroll_PresentationController.prototype.getPasswordRulesAndPolicy = function(){
    var userObj = applicationManager.getUserPreferencesManager();
    userObj.fetchPasswordRulesAndPolicy(enrollPresentationScope.getPasswordRulesAndPolicySuccessCallback,enrollPresentationScope.getPasswordRulesAndPolicyErrorCallback);
  };
  Enroll_PresentationController.prototype.getPasswordRulesAndPolicySuccessCallback = function(res){
    var navManager = applicationManager.getNavigationManager();
    var data = navManager.getCustomInfo("frmEnrollSignUp");
  if(data && data!==null){
      data.passwordPolicy = res.passwordpolicy.content;
    }
    else{
      data = {"passwordPolicy":res.passwordpolicy.content};
    }
    navManager.setCustomInfo("frmEnrollSignUp",data);
    var validationUtility = applicationManager.getValidationUtilManager();
    validationUtility.createRegexForPasswordValidation(res.passwordrules);
  };
 	Enroll_PresentationController.prototype.getPasswordRulesAndPolicyErrorCallback = function(err){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (errRes["isServerUnreachable"]) {
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", errRes);
    }
  };
  Enroll_PresentationController.prototype.getUsernameAndPasswordRulesAndPolicies = function(){
    var userObj = applicationManager.getUserPreferencesManager();
    userObj.getUsernameAndPasswordRulesAndPolicies(enrollPresentationScope.getUsernameAndPasswordRulesAndPoliciesSuccessCallback,enrollPresentationScope.getUsernameAndPasswordRulesAndPoliciesErrorCallback);
  };
  Enroll_PresentationController.prototype.getUsernameAndPasswordRulesAndPoliciesSuccessCallback = function(res){
	 enrollPresentationScope.asyncManager.setSuccessStatus(1, res);
     if (enrollPresentationScope.asyncManager.areAllservicesDone(2)) {
    var navManager = applicationManager.getNavigationManager();
    var data = navManager.getCustomInfo("frmEnrollSignUp");
   if(data && data!==null){
      data.usernamePolicy = res.usernamepolicy.content;
       data.passwordPolicy = res.passwordpolicy.content;
    }
    else{
      data = {"usernamePolicy":res.usernamepolicy.content};
       data = {"passwordPolicy":res.passwordpolicy.content};
    }
    navManager.setCustomInfo("frmEnrollSignUp",data);
    var validationUtility = applicationManager.getValidationUtilManager();
    validationUtility.createRegexForUsernameValidation(res.usernamerules);
    validationUtility.createRegexForPasswordValidation(res.passwordrules);
	 navManager.navigateTo("frmEnrollSignUp");
	 }
  };
  Enroll_PresentationController.prototype.getUsernameAndPasswordRulesAndPoliciesErrorCallback = function(err){
	enrollPresentationScope.asyncManager.setErrorStatus(1, err);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (errRes["isServerUnreachable"]) {
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    }
  };
  Enroll_PresentationController.prototype.getLocaleDOB = function(dob) {
        var forUtility = applicationManager.getFormatUtilManager();
        var config = applicationManager.getConfigurationManager();
        var frontEndDateFormat = '';
        var locale = config.getLocale();
        if (locale === 'en' || locale === 'en_US')
            frontEndDateFormat = 'm/d/Y';
        else
            frontEndDateFormat = config.frontendDateFormat[locale];
 	    try {
            dob = dob.replace(/-/g, '\/');
        }
        catch(e) {
            var date = new Date(dob);
            var mm = date.getMonth() + 1;
            var dd = date.getDate();
            var yyyy = date.getFullYear();
            var mmddyyyy = [(mm>9 ? '' : '0') + mm, '/',
                            (dd>9 ? '' : '0') + dd, '/',
                            yyyy
                           ].join('');
            dob = mmddyyyy;
        }
        frontEndDateFormat = 'm/d/Y';
        return forUtility.getFormatedDateString(new Date(dob), frontEndDateFormat);
    };

  Enroll_PresentationController.prototype.getCaptcha = function(){
    var enrollMod = kony.mvc.MDAApplication.getSharedInstance()
    .getModuleManager()
    .getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
    var newUserManager = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('NewUserBusinessManager').businessController;
    var params = {};
    newUserManager.getCaptcha(params,enrollMod.presentationController.getCaptchaSuccessCallback,enrollMod.presentationController.getCaptchaErrorCallback);
  };
  Enroll_PresentationController.prototype.getCaptchaSuccessCallback = function(res){
    var viewController = applicationManager.getPresentationUtility().getController('frmEnroll', true);
    viewController.captchaFunctionSucessCall(res["encodedImage"], res["serviceKey"]);
  };
  Enroll_PresentationController.prototype.getCaptchaErrorCallback = function(err){
    var viewController = applicationManager.getPresentationUtility().getController('frmEnroll', true);
    viewController.captchaFunctionFailureCall();
  };

  Enroll_PresentationController.prototype.enrollRetailUser = function(params){
    var enrollMod = kony.mvc.MDAApplication.getSharedInstance()
    .getModuleManager()
    .getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
    var newUserManager = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('NewUserBusinessManager').businessController;
    params["dateOfBirth"]=params["dateOfBirth"].substr(0, 10);
    newUserManager.enrollRetailUser(params,enrollMod.presentationController.enrollRetailUserSuccessCallback,enrollMod.presentationController.enrollRetailUserErrorCallback);
  };
  
  Enroll_PresentationController.prototype.enrollRetailUserSuccessCallback = function(res) {
    var viewControllerEnroll = applicationManager.getPresentationUtility().getController('frmEnroll', true);
    var navManager = applicationManager.getNavigationManager();
    var isUserExists = false; 
    var isActivationCodeSent = false; 
    var isUserEnrolled = false; 
    var dbpErrMsg = false; 
    var dbpErrCode = false; 
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(!kony.sdk.isNullOrUndefined(res["isUserExists"]))
      isUserExists = (res["isUserExists"] === "true")? true : false;
    if(!kony.sdk.isNullOrUndefined(res["isActivationCodeSent"]))
      isActivationCodeSent = (res["isActivationCodeSent"] === "true")? true : false;
    if(!kony.sdk.isNullOrUndefined(res["isUserEnrolled"]))
      isUserEnrolled = (res["isUserEnrolled"] === "true")? true : false;
    if(!kony.sdk.isNullOrUndefined(res["dbpErrMsg"]))
      dbpErrMsg = res["dbpErrMsg"];
    if(!kony.sdk.isNullOrUndefined(res["dbpErrCode"]))
      dbpErrCode = parseInt(res["dbpErrCode"]);
    if(dbpErrCode || dbpErrMsg) {
      if(dbpErrCode === 10801 || dbpErrCode === 10803 || 
         dbpErrCode === 10808 || dbpErrCode === 10809 ||
         dbpErrCode === 10810 || dbpErrCode === 10811 ||
         dbpErrCode === 10812 || dbpErrCode === 10813 )
        viewControllerEnroll.enrollError(dbpErrCode);
      else viewControllerEnroll.enrollErrorMsg(dbpErrMsg);
    }else if(dbpErrCode === 10802 || dbpErrCode === 10804 || dbpErrCode === 10805 || dbpErrCode === 10806){
      navManager.setCustomInfo("checkEnrollStat", "cantEnroll");  
      navManager.navigateTo("frmEnrollInfo");
    }else if(isUserExists === false) {
      navManager.setCustomInfo("checkEnrollStat", "cantEnroll");  
      navManager.navigateTo("frmEnrollInfo");
    }else if(isUserExists && isUserEnrolled) {
      //user is already activated to Infinity Online Banking
      navManager.setCustomInfo("checkEnrollStat", "EnrolledAndActivated");
      navManager.navigateTo("frmEnrollInfo");
    }else if(isActivationCodeSent || isUserExists) {
      //the user is only enrolled and not yet activated into Infinity Online Banking System
      if(!kony.sdk.isNullOrUndefined(res["firstName"])){
        var fname = res["firstName"];
        navManager.setCustomInfo("userFname", fname);
      }
      if(!kony.sdk.isNullOrUndefined(res["lastName"])){
        var lname = res["lastName"];
        navManager.setCustomInfo("userLname", lname);
      }
      navManager.setCustomInfo("checkEnrollStat", "onlyEnrolled");  
      navManager.navigateTo("frmEnrollInfo");
    }else {
      navManager.setCustomInfo("checkEnrollStat", "activateProfileNow");
      navManager.navigateTo("frmEnrollInfo");
    }
  };
  
  Enroll_PresentationController.prototype.enrollRetailUserErrorCallback = function(error) {
    var viewController = applicationManager.getPresentationUtility().getController('frmEnroll', true);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
//     if (error && error["isServerUnreachable"])
//       viewController.enrollError(0);
//     else
     // viewController.enrollError(error.serverErrorRes.dbpErrCode);
     viewController.enrollErrorMsg(error.errorMessage);
  };
  
  return Enroll_PresentationController;
});