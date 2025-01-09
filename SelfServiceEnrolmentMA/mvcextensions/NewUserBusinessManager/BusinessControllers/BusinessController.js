/**
  * @module NewUserBusinessManager
 */
define([], function() {
  /**
   *This is class named NewUserBusinessManager which handles all functions related to New user onboarding process in the application
   *@alias module:NewUserBusinessManager
   *@class
   */
  function NewUserBusinessManager() {
    var modelDefinition=kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("ExternalUsers_1");
    /**@member {object} object which resembles the MF object "ExternalUsers_1"*/
    this.newUserInfo=new modelDefinition();
    var modelDefinitionUser=kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("ExternalUsers_1");
    /**@member {object} object which resembles the MF object "User"*/
    this.enrollObj=new modelDefinitionUser();
  }
  inheritsFrom(NewUserBusinessManager, kony.mvc.Business.Delegator);
  NewUserBusinessManager.prototype.initializeBusinessController = function(){};
  /**
  * Set a particular key of enroll object("User") field stored in the object in the class.
  * @param {String} key - key of the enroll object which has to be set
  * @param {String} value - value which has to be set
  */
  NewUserBusinessManager.prototype.setEnrollAttribute = function(key,value)
  {
    this.enrollObj[key]=value;
  };
  /**
  * Set primary key Attribute for the object("User")
  * Since it is a primary key, a new model has to be created with primary key value as parameter
  * and all the data obtained uptil now has to be set again to this new definition
  * @param {object} - data - a json consisting of 2 keys
  *                 userName - primary key for "User" object
  */
  NewUserBusinessManager.prototype.setPrimarykeyAttribute = function(data)
  {
    var modelDefinition=kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("ExternalUsers_1");
    this.enrollprimarykeyObj = new modelDefinition(data);
    this.enrollprimarykeyObj.LastName = this.enrollObj.LastName;
    this.enrollprimarykeyObj.DateOfBirth = this.enrollObj.DateOfBirth;
    this.enrollprimarykeyObj.Ssn = this.enrollObj.Ssn;
    this.enrollprimarykeyObj.Organization_Id = this.enrollObj.Organization_Id;
    this.enrollObj = this.enrollprimarykeyObj;
  };
  /**
  * Get the enroll object field stored in the object in the class.
  * @returns {object} - enroll object of the user
  */
  NewUserBusinessManager.prototype.getEnrollObject = function()
  {
    return this.enrollObj;
  };
  /**
  * Resets all the enroll Object variables to their default values
  */
  NewUserBusinessManager.prototype.resetEnrollObj = function() {
    var modelDefinition=kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("ExternalUsers_1");
    this.enrollObj=new modelDefinition();
  };
  /**
  * Resets all the new user Object variables to their default values
  */
  NewUserBusinessManager.prototype.resetNewUserBusinessManager = function() {
    var modelDefinition=kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("ExternalUsers_1");
    this.newUserInfo=new modelDefinition();
  };
  /**
  * Check wheather the user's phone number is already registered by making a service call.
  * @param {object} data -  phone number which has to be verified.
  * @param {function} presentationSuccessCallback - invoke the call back with success response.
  * @param {function} presentationErrorCallback - invoke the call back with error response.
  */
  NewUserBusinessManager.prototype.customGetExistingUserPhone = function(data, presentationSuccessCallback, presentationErrorCallback) {
    var self = this;
    var existingUserPhone  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ExternalUsers_1");
    existingUserPhone.customVerb('verifyExistingUserByPhone', data, getAllCompletionCallback);
    function  getAllCompletionCallback(status,  data,  error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      } else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };
  /**
  * Check wheather user's email is already registered by making a service call.
  * @param {object} data -  email id which has to be verified.
  * @param {function} presentationSuccessCallback - invoke the call back with success response.
  * @param {function} presentationErrorCallback - invoke the call back with error response.
  */
  NewUserBusinessManager.prototype.customGetExistingUserEmail = function(data, presentationSuccessCallback, presentationErrorCallback) {
    var self = this;
    var existingUserEmail  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ExternalUsers_1");
    existingUserEmail.customVerb('verifyExistingUserByEmail', data, getAllCompletionCallback);
    function  getAllCompletionCallback(status,  data,  error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      } else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };
  /**
  * Creates username and password for a new user.
  * @param {object} params - Username and password.
  * @param {function} presentationSuccessCallback - invoke the call back with success response.
  * @param {function} presentationErrorCallback - invoke the call back with error response.
  */
  NewUserBusinessManager.prototype.createCredentialsForNewUser = function(params, presentationSuccessCallback, presentationErrorCallback) {
    var self = this;
    var createCredentials  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ExternalUsers_1");
    createCredentials.save(params, getAllCompletionCallback, "online");
    function  getAllCompletionCallback(status,  data,  error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      } else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };
  /**
  * Check wheather username  is already registered by making a service call.
  * @param {object} params - username which has to be verified.
  * @param {function} presentationSuccessCallback - invoke the call back with success response.
  * @param {function} presentationErrorCallback - invoke the call back with error response.
  */
  NewUserBusinessManager.prototype.checkUserName = function(params, presentationSuccessCallback, presentationErrorCallback) {
    var self = this;
    var checkUserName  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ExternalUsers_1");
    checkUserName.customVerb('verifyDbxUserName', params,  getAllCompletionCallback);
    function  getAllCompletionCallback(status,  data,  error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      } else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };
  /**
  * Updates user info at each and every step in new user onboarding.
  * @param {object} params - fields which are to be updated in backend.
  * @param {function} presentationSuccessCallback - invoke the call back with success response.
  * @param {function} presentationErrorCallback - invoke the call back with error response.
  */
  NewUserBusinessManager.prototype.customCreatePersonalInfo = function(params, presentationSuccessCallback, presentationErrorCallback) {
    var self = this;
    var NUOData = params;
    var createPersonalInfo  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ExternalUsers_1");
    createPersonalInfo.customVerb("createPersonalInfo", NUOData, getAllCompletionCallback);
    function  getAllCompletionCallback(status,  data,  error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        self.updateNewUserInfo(NUOData);
        presentationSuccessCallback(obj["data"]);
      } else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };
  /**
  * Fetches the personal,employment,financial information of the user.
  * @param {function} presentationSuccessCallback - invoke the call back with success response.
  * @param {function} presentationErrorCallback - invoke the call back with error response.
  */
  NewUserBusinessManager.prototype.customGetUserPersonalInfo = function(presentationSuccessCallback, presentationErrorCallback) {
    var self = this;
    var getPersonalInfo  = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ExternalUsers_1");
    getPersonalInfo.customVerb("getUserPersonalInfo", {} , getAllCompletionCallback);
    function  getAllCompletionCallback(status,  data,  error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        self.updateNewUserInfo(data[0]);
        presentationSuccessCallback(obj["data"]);
      } else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };
  /**
  * deletes previously stored data of user in new user onboarding.
  * @param {function} presentationSuccessCallback - invoke the call back with success response.
  * @param {function} presentationErrorCallback - invoke the call back with error response.
  */
  NewUserBusinessManager.prototype.resetNewUserData = function(presentationSuccessCallback, presentationErrorCallback) {
    var self = this;
    var resetNewUserData  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ExternalUsers_1");
    resetNewUserData.customVerb("resetNewUserData", {}, getAllCompletionCallback);
    function  getAllCompletionCallback(status,  data,  error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      } else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };
  /**
  * Gets user's credit check information.
  * @param {object} params - ssn number.
  * @param {function} presentationSuccessCallback - invoke the call back with success response.
  * @param {function} presentationErrorCallback - invoke the call back with error response.
  */
  NewUserBusinessManager.prototype.userCreditCheck = function(params, presentationSuccessCallback, presentationErrorCallback) {
    var self = this;
    var userCreditCheck  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ExternalUsers_1");
    userCreditCheck.customVerb("userCreditCheck", params, getAllCompletionCallback);
    function  getAllCompletionCallback(status,  data,  error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      } else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };
  /**
  * Creates Security question.
  * @param {object} params - answers that user has entered .
  * @param {function} presentationSuccessCallback - invoke the call back with success response.
  * @param {function} presentationErrorCallback - invoke the call back with error response.
  */
  NewUserBusinessManager.prototype.verifySecurityQuestions = function(params, presentationSuccessCallback, presentationErrorCallback) {
    var self = this;
    var createSecurityQuestions  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("NewUserSecurityQuestions");
    createSecurityQuestions.update(params, getAllCompletionCallback, "online");
    function  getAllCompletionCallback(status,  data,  error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      } else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };
  /**
  * Uploads the user's signature by making a service call.
  * @param {object} params -rawBytes of Signature image which user has signed.
  * @param {function} presentationSuccessCallback - invoke the call back with success response.
  * @param {function} presentationErrorCallback - invoke the call back with error response.
  */
  NewUserBusinessManager.prototype.signatureUpload = function(params, presentationSuccessCallback, presentationErrorCallback) {
    var self = this;
    var signatureUpload  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ExternalUsers_1");
    signatureUpload.customVerb("signatureUpload", params, getAllCompletionCallback);
    function  getAllCompletionCallback(status,  data,  error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      } else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };
  /**
  * Gets user's state information in the onboarding process.
  * @param {function} presentationSuccessCallback - invoke the call back with success response.
  * @param {function} presentationErrorCallback - invoke the call back with error response.
  */
  NewUserBusinessManager.prototype.customRequestState = function(presentationSuccessCallback, presentationErrorCallback) {
    var self = this;
    var customRequestState  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ExternalUsers_1");
    customRequestState.customVerb("getUserState", {}, getAllCompletionCallback);
    function  getAllCompletionCallback(status,  data,  error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      } else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };
  /**
  * request OTP from user object.
  * @param {function} presentationSuccessCallback - invoke the call back with success response.
  * @param {function} presentationErrorCallback - invoke the call back with error response.
  */
  NewUserBusinessManager.prototype.customRequestOTP = function(presentationSuccessCallback, presentationErrorCallback) {
    var self = this;
    var customRequestOTP  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ExternalUsers_1");
    customRequestOTP.customVerb("dbxRequestOTP", {}, getAllCompletionCallback);
    function  getAllCompletionCallback(status,  data,  error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        self.setEnrollAttribute('securityKey', obj['data'].securityKey);
        presentationSuccessCallback(obj["data"]);
      } else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };
  /**
  * Uploads documents of user in new user onboarding process.
  * @param {object} params - rawbytes of image that is to be uploaded
  * @param {function} presentationSuccessCallback - invoke the call back with success response.
  * @param {function} presentationErrorCallback - invoke the call back with error response.
  */
  NewUserBusinessManager.prototype.uploadDocumentForNewUser = function(params, presentationSuccessCallback, presentationErrorCallback) {
    var self = this;
    var uploadDocumentForNewUser  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("uploadDocuments");
    uploadDocumentForNewUser.save(params, getAllCompletionCallback, "online");
    function  getAllCompletionCallback(status,  data,  error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      } else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };
  /**
  * updates the fields in newUserInfo JSON.
  * @param {object} newUserJSON - fields that are to be updated in newUserInfo JSON.
  */
  NewUserBusinessManager.prototype.updateNewUserInfo = function(newUserJSON) {
    var keysLength = Object.keys(newUserJSON).length;
    if(keysLength > 0){
      for(var key in newUserJSON){
        if(key!=="userId"){
          this.newUserInfo[key]=(newUserJSON[key] && newUserJSON[key] !== "" && newUserJSON[key] !== null) ? newUserJSON[key] : "";
        }
      }
    }
    else{
      var modelDefinition=kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("ExternalUsers_1");
      this.newUserInfo=new modelDefinition();
    }
  };
  /**
  * Gets the data of new user
  * @returns {object} - the new user information
  */
  NewUserBusinessManager.prototype.getNewUserInfo = function() {
    return this.newUserInfo;
  };
  /**
  * Gives info about user enrollment
  * @param {function} presentationSuccess - invoke the call back with success response.
  * @param {function} presentationError - invoke the call back with error response.
  * @returns {boolean} - whether user is enrolled or not
  */
  NewUserBusinessManager.prototype.checkUserEnroll = function(presentationSuccess,presentationError){
    var konyRef = kony.sdk.getCurrentInstance();
    var identityObject = konyRef.getIdentityService(applicationManager.getConfigurationManager().constants.IDENTITYSERVICENAME);
    identityObject.getUserAttributes(successCallBack,errorCallBack);
    function successCallBack(res)
    {
      presentationSuccess({"isEnrolled":res.isEnrolled,"userName":res.userName});
    }
    function errorCallBack(err)
    {
      presentationError(err);
    }
  };
  /**
  * verify if user is already enrolled
  * @params {object} params - enrollUserObj - contains ssn,userLastName,dob
  * @param {function} successCallback - invoke the call back with success response.
  * @param {function} errorCallback - invoke the call back with error response.
  */
  NewUserBusinessManager.prototype.checkUserEnrolled = function(params,successCallback,errorCallback){
    var userRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ExternalUsers");
    userRepo.customVerb("checkUserEnrolled", params, completionCallback);
    function completionCallback(status,data,error){
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        successCallback(obj["data"]);
      } else {
        errorCallback(obj["errmsg"]);
      }
    }
  };
  /**
  * sets username and password to enrollObj
  * @param {String} username - contains username
  * @param {String} password - contains password
  */
  NewUserBusinessManager.prototype.setUsernameAndPassword = function(userData){
    var userDetails = {
      "UserName": userData.uName
  };
  this.setPrimarykeyAttribute(userDetails);
  this.enrollObj.Password = userData.password;
  this.enrollObj.serviceKey = userData.serviceKey
  };
  /**
  * sets dateOfBirth,userlastname,ssn to enrollObj
  * @param {Json} detailsJSON - contains dateOfBirth,userlastname,ssn
  */
  NewUserBusinessManager.prototype.setUserDetailsForEnroll = function(detailsJSON){
    this.resetEnrollObj();
    this.enrollObj.DateOfBirth = detailsJSON.DateOfBirth;
    this.enrollObj.LastName = detailsJSON.LastName;
    this.enrollObj.Ssn = detailsJSON.Ssn;
    this.enrollObj.Organization_Id = detailsJSON.Organization_Id;
  };
  /**
  * create the user via enroll flow
  * @param {function} successCallback - invoke the call back with success response.
  * @param {function} errorCallback - invoke the call back with error response.
  */
  NewUserBusinessManager.prototype.createUserForEnroll = function(successCallback,errorCallback){
    var userRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ExternalUsers_2");
    userRepo.customVerb("createUser", this.enrollObj, completionCallback);
    function completionCallback(status,data,error){
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        successCallback(obj["data"]);
      } else {
        errorCallback(obj["errmsg"]);
      }
    }
  };
  /**
  * create the Business Banking user via enroll flow
  * @param {function} successCallback - invoke the call back with success response.
  * @param {function} errorCallback - invoke the call back with error response.
  */
  NewUserBusinessManager.prototype.createBBUserForEnroll = function(successCallback,errorCallback){
    var userRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ExternalUsers_1");
    userRepo.customVerb("RegisterMBOwner", this.enrollObj, completionCallback);
    function completionCallback(status,data,error){
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        successCallback(obj["data"]);
      } else {
        errorCallback(obj["errmsg"]);
      }
    }
  };
  NewUserBusinessManager.prototype.requestOTPPreLoginMB = function(params,successCallback,errorCallback){
    var userRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ExternalUsers_1");
    userRepo.customVerb("requestOTPPreLoginMB", params, completionCallback);
    function completionCallback(status,data,error){
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        successCallback(obj["data"]);
      } else {
        errorCallback(obj["errmsg"]);
      }
    }
  };
  NewUserBusinessManager.prototype.verifyOTPPreLoginMB = function(params,successCallback,errorCallback){
    var userRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ExternalUsers_1");
    userRepo.customVerb("verifyOTPPreLoginMB", params, completionCallback);
    function completionCallback(status,data,error){
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        successCallback(obj["data"]);
      } else {
        errorCallback(obj["errmsg"]);
      }
    }
  };
  /**
  * gets the security questions for new user
  * @param {function} presentationSuccessCallback - invoke the call back with success response.
  * @param {function} presentationErrorCallback - invoke the call back with error response.
  */
  NewUserBusinessManager.prototype.getAllSecurityQuestions=function(presentationSuccessCallback, presentationErrorCallback)
  {
    var  secQue  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("NewUserSecurityQuestions");
    secQue.getAll(completionCallback);
    function completionCallback(status,data,error){
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      } else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };
  /**
  * Function to login into the application with username and password for new user onboarding process.
  * @param {object} UsernamePasswordJSON - used to send the entered userName and Password.
  * @param {function} presentationSuccessCallback - invoke the call back with success response.
  * @param {function} presentationErrorCallback - invoke the call back with error response.
  */
  NewUserBusinessManager.prototype.login = function(UsernamePasswordJSON,presentationSuccess,presentationError){
    var authParams = {
      "username": UsernamePasswordJSON.username,
      "password": UsernamePasswordJSON.password,
      "loginOptions": {
        "isOfflineEnabled": false
      }
    };
    authClient = KNYMobileFabric.getIdentityService("NUOApplicantLogin");
    authClient.login(authParams,successCallback,errorCallback);
    function successCallback(resSuccess){
      presentationSuccess(resSuccess);
    }
    function errorCallback(resError){
      presentationError(resError);
    }
  };
  /**
  * Function to logout from the application for new user onboarding process.
  * @param {function} presentationSuccessCallback - invoke the call back with success response.
  * @param {function} presentationErrorCallback - invoke the call back with error response.
  */
  NewUserBusinessManager.prototype.logout = function(presentationSuccess,presentationError){
    var self = this;
    var authParams = {
      "loginOptions": {
        "isOfflineEnabled": false
      }
    };
    try {
      authClient.logout(logoutSuccessCallback,logoutErrorCallback, authParams);
    } catch (err) {
      kony.print(err);
    }
    function logoutSuccessCallback(resSuccess){
      presentationSuccess(resSuccess);
    }
    function logoutErrorCallback(resError){
      presentationError(resError);
    }
  };

  /**
  * Function to generate new base64 captcha image.
  * @param {object} params - empty params.
  * @param {function} presentationSuccessCallback - invoke the call back with success response.
  * @param {function} presentationErrorCallback - invoke the call back with error response.
  */
  NewUserBusinessManager.prototype.getCaptcha = function (params, presentationSuccessCallback, presentationErrorCallback) {
    var requestObject = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("EnrollmentSecurity");
    //kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("Security");
    requestObject.customVerb('generateCaptchaForEnrollment', params, completionCallback);
    function completionCallback(status, data, error) {
      var serviceResponseHandler = applicationManager.getServiceResponseHandler();
      var responseObject = serviceResponseHandler.manageResponse(status, data, error, presentationSuccessCallback, presentationErrorCallback);
      if (responseObject["status"] === true) {
        presentationSuccessCallback(responseObject["data"]);
      }
      else {
        presentationErrorCallback(responseObject["errmsg"]);
      }
    }
  };

  /**
  * Function to enroll Retail User
  * @param {object} params - empty params.
  * @param {function} presentationSuccessCallback - invoke the call back with success response.
  * @param {function} presentationErrorCallback - invoke the call back with error response.
  */
  NewUserBusinessManager.prototype.enrollRetailUser = function(verifyUserJSON,presentationSuccessCallback,presentationErrorCallback){
    var userRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("ExternalUsers_1");
    var params = verifyUserJSON;
    userRepo.customVerb('enrollRetailUser',params,getAllCompletionCallback);
    function getAllCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj =  srh.manageResponse(status, data, error,presentationSuccessCallback,presentationErrorCallback);
      if(obj["status"] === true){
        presentationSuccessCallback(obj["data"]);
      }
      else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
  };

  return NewUserBusinessManager;
});