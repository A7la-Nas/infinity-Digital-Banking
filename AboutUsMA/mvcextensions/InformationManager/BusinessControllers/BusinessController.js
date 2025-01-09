/**
*@module InformationManager
 */
define([], function() {
/**
  * Information Manager used to get the details of the Support form
  * @alias module:InformationManager
  * @class
  */
function InformationManager(){
};
inheritsFrom(InformationManager, kony.mvc.Business.Delegator);
InformationManager.prototype.initializeBusinessController = function(){};
/**
  * fetch application FAQs using service call
  * @param {function} presentationSuccessCallback  will be called when call is successfull
  * @param {function} presentationErrorCallback will be called when call is not successfull
  */
InformationManager.prototype.fetchFAQs = function(presentationSuccessCallback,presentationErrorCallback){
	var self =this;
	var infoFAQ  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Information");
	infoFAQ.customVerb('getFAQs',{},getAllCompletionCallback);
	function  getAllCompletionCallback(status,  data,  error) {
     var srh = applicationManager.getServiceResponseHandler();
    var obj =  srh.manageResponse(status,  data,  error,presentationSuccessCallback,presentationErrorCallback);
    if(obj["status"] === true){
		presentationSuccessCallback(obj["data"]);
    }
    else {
      presentationErrorCallback(obj["errmsg"]);
    }
	}
};
/**
  * fetch application PrivacyPolicy using service call
  * @param {function} presentationSuccessCallback  will be called when call is successfull
  * @param {function} presentationErrorCallback will be called when call is not successfull
  */
InformationManager.prototype.fetchPrivacyPolicy = function(presentationSuccessCallback,presentationErrorCallback){
	var self =this;
	var infoPrivacyPolicy  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Information");
	infoPrivacyPolicy.customVerb('getPrivacyPolicy',{},getAllCompletionCallback);
	function  getAllCompletionCallback(status,  data,  error) {
     var srh = applicationManager.getServiceResponseHandler();
    var obj =  srh.manageResponse(status,  data,  error,presentationSuccessCallback,presentationErrorCallback);
    if(obj["status"] === true){
		presentationSuccessCallback(obj["data"]);
    }
    else {
      presentationErrorCallback(obj["errmsg"]);
    }
	}
};
/**
  * fetch AboutUs details using a service call
  * @param {function} presentationSuccessCallback  will be called when call is successfull
  * @param {function} presentationErrorCallback will be called when call is not successfull
  */
InformationManager.prototype.fetchAboutUs = function(presentationSuccessCallback,presentationErrorCallback){
	var self =this;
	var infoAboutus  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Informationcontent");
	infoAboutus.customVerb('getAboutUs',{"infoType":"AboutUs"},getAllCompletionCallback);
	function  getAllCompletionCallback(status,  data,  error) {
     var srh = applicationManager.getServiceResponseHandler();
    var obj =  srh.manageResponse(status,  data,  error,presentationSuccessCallback,presentationErrorCallback);
    if(obj["status"] === true){
		presentationSuccessCallback(obj["data"]);
    }
    else {
      presentationErrorCallback(obj["errmsg"]);
    }
	}
};
/**
  * fetch the Terms and Conditions using a service call.
  * @param {function} presentationSuccessCallback  will be called when call is successfull
  * @param {function} presentationErrorCallback will be called when call is not successfull
  */
InformationManager.prototype.fetchTermsAndConditions = function(presentationSuccessCallback,presentationErrorCallback)
{
	var self =this;
	var infoTerms  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Informationcontent");
	infoTerms.customVerb('getTermsAndConditions',{},getAllCompletionCallback);
	function  getAllCompletionCallback(status,  data,  error) {
     var srh = applicationManager.getServiceResponseHandler();
    var obj =  srh.manageResponse(status,  data,  error,presentationSuccessCallback,presentationErrorCallback);
    if(obj["status"] === true){
		presentationSuccessCallback(obj["data"]);
    }
    else {
      presentationErrorCallback(obj["errmsg"]);
    }
	}
};
/**
  * fetch the Contacts using a service call.
  * @param {function} presentationSuccessCallback  will be called when call is successfull
  * @param {function} presentationErrorCallback will be called when call is not successfull
  */
InformationManager.prototype.fetchContactUs = function(presentationSuccessCallback,presentationErrorCallback)
{
	var self =this;
	var infoContact  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Information");
	infoContact.customVerb('getContactUs',{},getAllCompletionCallback);
	function  getAllCompletionCallback(status,  data,  error) {
    var srh = applicationManager.getServiceResponseHandler();
    var obj =  srh.manageResponse(status,  data,  error,presentationSuccessCallback,presentationErrorCallback);
    if(obj["status"] === true){
		presentationSuccessCallback(obj["data"]);
    }
    else {
      presentationErrorCallback(obj["errmsg"]);
    }
	}
};
return InformationManager;
});