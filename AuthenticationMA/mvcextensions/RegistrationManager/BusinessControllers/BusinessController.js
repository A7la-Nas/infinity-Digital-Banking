/**
*@module RegistrationManager
 */
define([], function() {
/**
 * Description of Registration manager
 *@alias module:RegistrationManager
 *@class
*/
function RegistrationManager(){
  this.pushNotificationSubscribers = [ ];
}
inheritsFrom(RegistrationManager, kony.mvc.Business.Delegator);
RegistrationManager.prototype.initializeBusinessController = function(){};
RegistrationManager.prototype.hideLoadingIndicator = function() {
  kony.application.setApplicationBehaviors({
        "hideDefaultLoadingIndicator": true
    });
};
/**
  * Function to initialize application Manager
  * @member of RegistrationHandler
  * @returns nothing
  */
RegistrationManager.prototype.setActionsForceTouch = function() {
  var cm = applicationManager.getConfigurationManager();
  var userManager = applicationManager.getUserPreferencesManager();
  var username = userManager.getUserName();
  var quickActionItems = JSON.parse(JSON.stringify(cm.quickActionItems));
  quickActionItems.splice(1,3);
  if(!username && username=== "")
   {
      var actionSet= kony.forcetouch.setQuickActionItems(quickActionItems);
   }
};
/**
  * Function to fetch the Device registration status using a service call.
  * @param {JSON} criteria - used to check device registartion status for particular device ID.
  * @param {callBack} presentationSuccessCallback - invoke the call back with success response.
  * @param {callBack} presentationErrorCallback - invoke the call back with error response.
  */
RegistrationManager.prototype.fetchDevRegistrationStatus = function(criteria,presentationSuccessCallback,presentationErrorCallback){
   var self =this;
	var deviceRegistratioRepo  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("DeviceRegistration");
	deviceRegistratioRepo.getByCriteria(criteria,getAllCompletionCallback);
	function  getAllCompletionCallback(status,  data,  error) {
	var srh = applicationManager.getServiceResponseHandler();
    var obj =  srh.manageResponse(status,  data,  error);
    if(obj["status"] === true){
		presentationSuccessCallback(obj["data"]);
    }
    else {
      presentationErrorCallback(obj["errmsg"]);
    }
	}
};
  /**
  * Function to fetch the Device registration status using a service call.
  * @param {JSON} criteria - used to check device registartion status for particular device ID.
  * @param {callBack} presentationSuccessCallback - invoke the call back with success response.
  * @param {callBack} presentationErrorCallback - invoke the call back with error response.
  */
RegistrationManager.prototype.fetchDeviceRegistrationStatus = function(criteria,presentationSuccessCallback,presentationErrorCallback){
   var self =this;
	var deviceRegistratioRepo  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("DeviceRegistration");
	deviceRegistratioRepo.getByCriteria(criteria,getAllCompletionCallback);
	function  getAllCompletionCallback(status,  data,  error) {
	var srh = applicationManager.getServiceResponseHandler();
    var obj =  srh.manageResponse(status,  data,  error);
    if(obj["status"] === true){
		presentationSuccessCallback(obj["data"]);
    }
    else {
      presentationErrorCallback(obj["errmsg"]);
    }
	}
};
/**
  * Function to update device registration status using a service call.
  * @param {record} record - record consist of deviceId which status has to be created or updated.
  * @param {callBack} presentationSuccessCallback - invoke the call back with success response.
  * @param {callBack} presentationErrorCallback - invoke the call back with error response.
  */
RegistrationManager.prototype.updateDeviceRegistrationStatus = function(record,presentationSuccessCallback,presentationErrorCallback)
{
    var  deviceRegistratioRepo  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("DeviceRegistration");
  	deviceRegistratioRepo.save (record,saveCompletionCallback,"online");
	function  saveCompletionCallback(status,  data,  error) {
    var srh = applicationManager.getServiceResponseHandler();
    var obj =  srh.manageResponse(status,  data,  error);
    if(obj["status"] === true){
		presentationSuccessCallback(obj["data"]);
    }
    else {
      presentationErrorCallback(obj["errmsg"]);
    }
	}
};
/**
  * Function to delete device registration using a service call.
  * @param {object} criteria -  record consist of deviceID which is to be deleted
  * @param {callBack} presentationSuccessCallback - invoke the call back with success response.
  * @param {callBack} presentationErrorCallback - invoke the call back with error response.
  */
RegistrationManager.prototype.deleteRegisteredDevice = function(record,presentationSuccessCallback,presentationErrorCallback)
{
    var  deviceRegistratioRepo  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("DeviceRegistration");
    deviceRegistratioRepo.removeById(deviceRegistratioRepo,record,deleteCompletionCallback,"online");
    function  deleteCompletionCallback(status,  data,  error) {
    var srh = applicationManager.getServiceResponseHandler();
    var obj =  srh.manageResponse(status,  data,  error);
    if(obj["status"] === true){
      presentationSuccessCallback(obj["data"]);
    }
    else {
      presentationErrorCallback(obj["errmsg"]);
    }
  }
};
/**
  * Function to Track device registration using a service call.
  * @param {callBack} presentationSuccessCallback - invoke the call back with success response.
  * @param {callBack} presentationErrorCallback - invoke the call back with error response.
  */
RegistrationManager.prototype.trackRegisteredDevice = function(presentationSuccessCallback,presentationErrorCallback)
{
	  var TrackDeviceRegistration = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("TrackDeviceRegistration");
      TrackDeviceRegistration.customVerb('trackDeviceRegistration', {}, completionCallBack);
	  function completionCallBack(status, data, error) {
            var srh = applicationManager.getServiceResponseHandler();
            var obj = srh.manageResponse(status, data, error);
            if (obj.status === true) {
                presentationSuccessCallback(obj.data);
            }
            else {
                presentationErrorCallback(obj.errmsg);
            }
        }
};
/**
  * Function to set setEventTracking API to automatically Capture the Events for Reports
  * @returns nothing
  */
RegistrationManager.prototype.setEventTracking = function() {
  if (!kony.sdk.isNullOrUndefined(KNYMetricsService)) {
    KNYMetricsService.setEventTracking(["FormEntry", "Error", "Crash", "FormExit", "ServiceResponse"]);
  }
};
/**
  * Function to register the callbacks for push notifications
  * @member of RegistrationManager
  * @returns nothing
  */
RegistrationManager.prototype.registerCallBacksForPushNotifications = function(){
  var callbacks = {
    onsuccessfulregistration : this.registerToGCMorAPNSSuccess.bind(this),
    onfailureregistration : this.registerToGCMorAPNSFailure.bind(this),
    onlinenotification : this.receivedOnlineNotification.bind(this),
    offlinenotification : this.receivedOfflineNotification.bind(this),
    onsuccessfulderegistration : this.deRegisterForPushNotificationsSuccess.bind(this),
    onfailurederegistration : this.deRegisterForPushNotificationsFailure.bind(this)
  };
  kony.push.setCallbacks(callbacks);
};

/**
  * Function to register the device for push notifications to FCM, HCM or APNS
  * @member of RegistrationManager
  * @returns nothing
  */
RegistrationManager.prototype.registerForPushNotifications = function(){
  var config = {};
  var deviceUtilManager = applicationManager.getDeviceUtilManager();
  if(deviceUtilManager.isIPhone()){
    config = [0,1,2];
  }
  else{
    if(deviceUtilManager.checkHuaweiservicesSupported()) {
      // Config for Huawei Mobile Services (HMS)
      config = {senderid : "106771767"};
    } else {
      // Config for Google Play Services
      config = {senderid : "796499215173"};
    }
    
  }
  this.registerCallBacksForPushNotifications();
  kony.push.register(config);
};
/**
  * success callback of GCM OR APNS registration
  * @member of RegistrationManager
  * @returns nothing
  */
RegistrationManager.prototype.registerToGCMorAPNSSuccess = function(regId){
  kony.print("Device regstration is successful for push notifications. Registered ID is: "+regId);
  var device = "android";
  var deviceUtilManager = applicationManager.getDeviceUtilManager();
  if(deviceUtilManager.isIPhone()){
    device = "iphone";
  }
  this.subscribeToMFMessagingService(regId,device);
};
/**
  * Failure callback of GCM or APNS registration
  * @member of RegistrationManager
  * @returns nothing
  */
RegistrationManager.prototype.registerToGCMorAPNSFailure = function(error){
  var loggerManager = applicationManager.getLoggerManager();
  loggerManager.log("error "+JSON.stringify(error));
};
/**
 * Helper method to fetch the value of a claim from the current Fabric claims token.
 * @memberof RegistrationManager
 * @param {string} key The key for the sought-after claim token.
 * @returns {string} The value associated with the claim key if present, otherwise either null or undefined.
 */
var getClaimValueFromToken = function(key) {
  var sdkInstance = kony.sdk.getCurrentInstance();
  if (kony.sdk.isNullOrUndefined(sdkInstance)) {
    return undefined;
  }
  var claimsToken = sdkInstance.currentClaimToken;
  if (kony.sdk.isNullOrUndefined(claimsToken)) {
    return undefined;
  }
  var claimsTokenParts = claimsToken.split(".");
  if (claimsTokenParts.length != 3) {
    return undefined;
  }
  var claimsPayload = claimsTokenParts[1];
  var claims = Base64.decode(claimsPayload);
  // Strip any trailing nulls.
  while (claims.length > 0 && claims.charCodeAt(claims.length - 1) === 0) {
    claims = claims.substring(0, claims.length - 1);
  }
  var claimsObj;
  try {
    claimsObj = JSON.parse(claims);
  }
  catch (err) {
    return undefined;
  }
  if (typeof claimsObj !== "object") {
    return undefined;
  }
  return claimsObj[key];
};
/**
  * Function to subscribe the device for push notifications to KPNS
  * @member of RegistrationManager
  * @returns nothing
  */
RegistrationManager.prototype.subscribeToMFMessagingService = function(regId,ostype){
  var deviceId = kony.os.deviceInfo().deviceid;
  var userObj = applicationManager.getUserPreferencesManager();
  var userId = userObj.getUserId();
  // TODO: Remove this check once userId fetch from userObj is working properly.
  if (kony.sdk.isNullOrUndefined(userId) || userId === "") {
    userId = getClaimValueFromToken("_prov_userid");
    if (kony.sdk.isNullOrUndefined(userId)) {
      userId = "";
    }
  }
  try{
    var msgClient = kony.sdk.getCurrentInstance().getMessagingService();
    var name = "androidgcm";
    if(ostype === "iphone"){
      name = "iphone";
    }
    applicationManager.getLoggerManager().log(
      "subscribing to KMS, deviceId = " + deviceId +
      ", regId = " + regId +
      ", userId = " + userId);
    msgClient.register(name,deviceId,regId,userId,function(response){
      var loggerManager = applicationManager.getLoggerManager();
      loggerManager.log("subscription successful");
    },function(error){
      var loggerManager = applicationManager.getLoggerManager();
      loggerManager.log("subscription failed");
    });
  }catch(e){
    var loggerManager = applicationManager.getLoggerManager();
    loggerManager.log(e);
  }
};
/**
  * Function to de register the device for push notifications
  * @member of RegistrationManager
  * @returns nothing
  */
RegistrationManager.prototype.deRegisterForPushNotifications = function(){
  var config = {};
  kony.push.deRegister(config);
};
/**
  * success callback of deregistration to GCM or APNS
  * @member of RegistrationManager
  * @returns nothing
  */
RegistrationManager.prototype.deRegisterForPushNotificationsSuccess = function(){
  this.unSubscribeMFMessagingService();
};
/**
  * Failure callback of deregistration to GCM or APNS
  * @member of RegistrationManager
  * @returns nothing
  */
RegistrationManager.prototype.deRegisterForPushNotificationsFailure = function(){
  this.unSubscribeMFMessagingService();
};
/**
  * Function to unsubscribe the device from KPNS
  * @member of RegistrationManager
  * @returns nothing
  */
RegistrationManager.prototype.unSubscribeMFMessagingService = function(){
  try{
    var msgClient = kony.sdk.getCurrentInstance().getMessagingService();
    msgClient.unregister(function(response){
    },function(error){
    });
  }catch(err){
  }
};
/**
  * Callback function for online notifications.
  * @memberof RegistrationManager
  * @param {object} message The incoming push notification message object.
  */
RegistrationManager.prototype.receivedOnlineNotification = function(message){
  this.receivedNotification(message, "online");
};
/**
  * Callback function for offline notifications.
  * @memberof RegistrationManager
  * @param {object} message The incoming push notification message object.
  */
RegistrationManager.prototype.receivedOfflineNotification = function(message){
  this.receivedNotification(message, "offline");
};
/**
 * Common handler for both online and offline in-app push notifications. Incoming push
 * notifications are published to all registered subscribers.
 * @memberof RegistrationManager
 * @param {object} message The incoming push notification message object.
 * @param {string=} onlineOrOffline Either 'online' or 'offline' to indicate the mode via which the message was received.
 */
RegistrationManager.prototype.receivedNotification = function(message, onlineOrOffline) {
  for (var i = 0; i < this.pushNotificationSubscribers.length; ++i) {
    var pns = this.pushNotificationSubscribers[i];
    // Check whether this subscriber is meant for online or offline notifications (or both!)
    if (!kony.sdk.isNullOrUndefined(pns.onlineStatus) && !([ onlineOrOffline, "both" ].contains(pns.onlineStatus))) {
      continue;
    }
    // Pass the push notification to the subscriber.
    pns.callback(message, onlineOrOffline);
  }
};
/**
 * Add (register) a push notification subscriber.
 * @memberof RegistrationManager
 * @param {string} id A string to uniquely identify the subscriber.
 * @param {function} callback The function to call when an incoming push notification is received.
 * @param {string=} The online/offline mode the subscriber is interested in - 'online', 'offline', or 'both'.
 */
RegistrationManager.prototype.addPushNotificationSubscriber = function(id, callback, onlineStatus) {
  for (var i = 0; i < this.pushNotificationSubscribers.length; i++) {
    var pns = this.pushNotificationSubscribers[i];
    if (pns.id === id) {
      pns.callback = callback;
      pns.onlineStatus = onlineStatus;
      return;
    }
  }
  this.pushNotificationSubscribers.push({
    "id": id,
    "callback": callback,
    "onlineStatus": onlineStatus
  });
};
/**
 * Remove (unregister) a push notification subscriber.
 * @memberof RegistrationManager
 * @param {string} id The unique identifier of the push notification subscriber to remove.
 */
RegistrationManager.prototype.removePushNotificationSubscriber = function(id) {
  for (var i = 0; i < pushNotificationSubscribers.length; ++i) {
    if (this.pushNotificationSubscribers[i].id === id) {
      this.pushNotificationSubscribers.splice(i, 1);
      break;
    }
  }
};
  return RegistrationManager;
});