/**
  * @module MessagesManager
 */
define([], function () {
  /**
   *This is class named MessagesManager which handles all functions related to Messages in the application
   *@alias module:MessagesManager
   *@class
   */
  function MessagesManager() {
    /**@member {Integer} unreadMessages Contains number of unread messages are there in current user's mail*/
    this.unreadMessages = null;
    /**@member {Array}  messageCategories Contains data of message categories as Json Array - that the Application supports*/
    this.messageCategories = null;
    this.requests = null;
    this.deletedRequests = null;
	this.priorityMessageCount = null;
  }
  inheritsFrom(MessagesManager, kony.mvc.Business.Delegator);
  MessagesManager.prototype.initializeBusinessController = function () { };
  
  /**
  * Fetches the list of inbox messages(Requests)
  * @param {function} presentationMsgSuccess will be called when call is successfull
  * @param {function} presentationMsgError will be called when call is not successfull
  * @returns {Array} - list of requested Message objects as Json Array
  */
  MessagesManager.prototype.fetchAllRequestsForInbox = function (presentationMsgSuccess, presentationMsgError) {
    var scopeObj = this;
    var messagesRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Message");
    var param = {
      "softDeleteFlag": "false"
    };
    messagesRepo.customVerb('getRequests', param, fetchAllRequestsForInboxCompletionCallback);
    function fetchAllRequestsForInboxCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
        scopeObj.requests = obj.data.customerrequests_view;
        presentationMsgSuccess(obj.data);
      }
      else {
        presentationMsgError(obj.errmsg);
      }
    }
  };
  /**
   * used to get the requests
   * @returns{requests}  request
  */
  MessagesManager.prototype.getRequests = function () {
    return this.requests;
  };
  /**
   * used to get the deleted requests
   * @returns{object}  request
  */
  MessagesManager.prototype.getDeletedRequests = function () {
    return this.deletedRequests;
  }
  /**
  * used to get the un read messages count
  * @returns{string}  count
 */
  MessagesManager.prototype.getUnreadMessagesCount = function () {
    return this.unreadMessages;
  }
  /**
  * Fetches the list of deleted messages(Requests)
  * @param {function} presentationMsgSuccess will be called when call is successfull
  * @param {function} presentationMsgError will be called when call is not successfull
  * @returns {Array} - list of requested Message objects as Json Array
  */
  MessagesManager.prototype.fetchAllRequestsForDeleted = function (presentationMsgSuccess, presentationMsgError) {
    var scopeObj = this;
    var messagesRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Message");
    var userManager = applicationManager.getUserPreferencesManager();
    var param = {
      "softDeleteFlag": "true"
    };
    messagesRepo.customVerb('getRequests', param, fetchAllRequestsForDeletedCompletionCallback);
    function fetchAllRequestsForDeletedCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
        scopeObj.deletedRequests = obj.data.customerrequests_view;
        presentationMsgSuccess(obj.data);
      }
      else {
        presentationMsgError(obj.errmsg);
      }
    }
  };
  /**
  * Fetches the list of categories
  * @param {function} presentationMsgSuccess will be called when call is successfull
  * @param {function} presentationMsgError will be called when call is not successfull
  * @returns {Array} - list of requested Message objects as Json Array
  */
  MessagesManager.prototype.fetchCategoriesForMessages = function (presentationMsgSuccess, presentationMsgError) {
    var messagesRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Message");
    messagesRepo.customVerb('getRequestCategory', {}, fetchCategoriesForMessagesCompletionCallback);
    function fetchCategoriesForMessagesCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
        presentationMsgSuccess(obj.data);
        this.messageCategories = obj.data.requestcategory;
      }
      else {
        presentationMsgError(obj.errmsg);
      }
    }
  };
  /**
  * get the cached list of categories - messageCategories stored in class
  * @returns {Array} - list of Message objects as Json Array
  */
  MessagesManager.prototype.getCategoriesForMessages = function () {
    return this.messageCategories;
  };
  /**
  * Mark the entire request as deleted by making a service call
  * @param {object} record - json consisting of requestid of the request to be deleted
  * @param {function} presentationMsgSuccess will be called when call is successfull
  * @param {function} presentationMsgError will be called when call is not successfull
  */
  MessagesManager.prototype.softDeleteAllMessagesOfARequest = function (record, presentationMsgSuccess, presentationMsgError) {
    var messagesRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Message");
    var userManager = applicationManager.getUserPreferencesManager();
    var params = {
      "softdelete": "true",
      "requestid": record.requestid
    };
    messagesRepo.customVerb('updateRequest', params, softDeleteAllMessagesOfARequestCompletionCallback);
    function softDeleteAllMessagesOfARequestCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
        presentationMsgSuccess(obj.data);
      }
      else {
        presentationMsgError(obj.errmsg);
      }
    }
  };
  /**
  * Delete the entire request permanently
  * @param {object} record - json consisting of requestid of the request to be deleted permanently
  * @param {function} presentationMsgSuccess will be called when call is successfull
  * @param {function} presentationMsgError will be called when call is not successfull
  */
  MessagesManager.prototype.hardDeleteAllMessagesOfARequest = function (record, presentationMsgSuccess, presentationMsgError) {
    var messagesRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Message");
    var userManager = applicationManager.getUserPreferencesManager();
    var params = {
      "harddelete": "true",
      "requestid": record.requestid
    };
    messagesRepo.customVerb('updateRequest', params, hardDeleteAllMessagesOfARequestCompletionCallback);
    function hardDeleteAllMessagesOfARequestCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
        presentationMsgSuccess(obj.data);
      }
      else {
        presentationMsgError(obj.errmsg);
      }
    }
  };
  /**
  * Restore the entire request which was soft deleted
  * @param {object} record - json consisting of requestid of the request to be restored
  * @param {function} presentationMsgSuccess will be called when call is successfull
  * @param {function} presentationMsgError will be called when call is not successfull
  */
  MessagesManager.prototype.restoreDeletedMessagesOfARequest = function (record, presentationMsgSuccess, presentationMsgError) {
    var messagesRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Message");
    var userManager = applicationManager.getUserPreferencesManager();
    var params = {
      "softdelete": "false",
      "requestid": record.requestid
    };
    messagesRepo.customVerb('updateRequest', params, restoreDeletedMessagesOfARequestCompletionCallback);
    function restoreDeletedMessagesOfARequestCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
        presentationMsgSuccess(obj.data);
      }
      else {
        presentationMsgError(obj.errmsg);
      }
    }
  };
  /**
  * Creates a new request by making a service call.
  * @param {object} record - json consisting of following data of the request to be created
  *                        requestcategory - category of the request
  * 					   requestsubject - subject of the request
  *						   messagedescription - actual message to be added to the request
  * @param {function} presentationMsgSuccess will be called when call is successfull
  * @param {function} presentationMsgError will be called when call is not successfull
  */
  MessagesManager.prototype.createNewRequest = function (record, presentationMsgSuccess, presentationMsgError) {
    var messagesRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Message");
    var userManager = applicationManager.getUserPreferencesManager();
    var params = {
      "createdby": userManager.getCurrentUserName(),
      "username": userManager.getCurrentUserName(),
      "requestcategory_id": record.requestcategory_id,
      "Requestsubject": record.requestsubject,
      "messagedescription": record.messagedescription,
      "Priority": "HIGH"
    };
    messagesRepo.customVerb('CreateNewCustomerRequestWithoutAttachment', params, createNewRequestCompletionCallback);
    function createNewRequestCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
        presentationMsgSuccess(obj.data);
      }
      else {
        presentationMsgError(obj.errmsg);
      }
    }
  };
  /**
  * update existing request using a service call.
  * @param {object} record - json consisting of the following data of the request to be updated
  *                        requestid - id of the request
  *						   messagedescription - actual message to be added to the request
  * @param {function} presentationMsgSuccess will be called when call is successfull
  * @param {function} presentationMsgError will be called when call is not successfull
  */
  MessagesManager.prototype.updateExistingRequest = function (record, presentationMsgSuccess, presentationMsgError) {
    var messagesRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("SecureMessaging");
    var userManager = applicationManager.getUserPreferencesManager();
    var params = {
      "createdby": userManager.getCurrentUserName(),
      "username": userManager.getCurrentUserName(),
      //"requestcategory_id":record.requestcategory_id,
      // "Requestsubject":record.requestsubject,
      "messagedescription": record.messagedescription,
      "requestid": record.requestid,
      "Priority": "HIGH"
    };
    messagesRepo.customVerb('CreateNewCustomerRequestWithoutAttachment', params, updateExistingRequestCompletionCallback);
    function updateExistingRequestCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
        presentationMsgSuccess(obj.data);
      }
      else {
        presentationMsgError(obj.errmsg);
      }
    }
  };
  /**
  * Fetches the list of messages in a request
  * @param {object} record - json consisting of requestid of the request whose messages has to be fetched
  * @param {function} presentationMsgSuccess will be called when call is successfull
  * @param {function} presentationMsgError will be called when call is not successfull
  * @returns {Array} -- list of requested Message objects as Json Array
  */
  MessagesManager.prototype.fetchMessagesForARequest = function (record, presentationMsgSuccess, presentationMsgError) {
    var messagesRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Message");
    messagesRepo.customVerb('getAllMessagesForARequest', record, fetchMessagesForARequestCompletionCallback);
    function fetchMessagesForARequestCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
        presentationMsgSuccess(obj.data);
      }
      else {
        presentationMsgError(obj.errmsg);
      }
    }
  };
  /**
  * Update messages of request as read.
  * @param {object} record - json consisting of requestid of the request whose messages status has to be updated as read
  * @param {function} presentationMsgSuccess will be called when call is successfull
  * @param {function} presentationMsgError will be called when call is not successfull
  */
  MessagesManager.prototype.updateRequestAsRead = function (record, presentationMsgSuccess, presentationMsgError) {
    var messagesRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Message");
    var userManager = applicationManager.getUserPreferencesManager();
    var param = {
      "markallasread": "true",
      "requestid": record.requestid
    };
    messagesRepo.customVerb('updateRequest', param, updateRequestAsReadCompletionCallback);
    function updateRequestAsReadCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
        presentationMsgSuccess(obj.data);
      }
      else {
        presentationMsgError(obj.errmsg);
      }
    }
  };
  /**
  * Get total number of requests having unread messages and
  * updates unreadMessages stored in class
  */
  MessagesManager.prototype.fetchNumberOfUnreadMessages = function (presentationMsgSuccess, presentationMsgError) {
    var scope = this;
    var messagesRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Message");
    messagesRepo.customVerb('getUnreadMessageCount', {}, fetchNumberOfUnreadMessagesCompletionCallback);
    function fetchNumberOfUnreadMessagesCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
        scope.unreadMessages = obj.data.unreadMessageCount;
		scope.priorityMessageCount = obj.data.priorityMessageCount;
        if(presentationMsgSuccess){
        presentationMsgSuccess(obj.data);
      }
    }
      else {
        scope.unreadMessages = "";
        if(presentationMsgError){
        presentationMsgError(obj.errmsg);
      }
      }
    }
  };
  /**
  * Get the total number of unreadMessages stored in class
  * @returns {Integer} - unreadMessages as updated by fetchNumberOfUnreadMessages
  */
  MessagesManager.prototype.getTotalNumberOfUnreadMessages = function () {
    return this.unreadMessages;
  };
  /**
   * Method to download given attchement in Messages
   * @param {object} params - required parameters to download attachment
   * @param {string} params.mediaId - Media id of the attachment
   * @param {string} params.fileName - attchement file name to download
   */
  MessagesManager.prototype.downloadMessageAttachement = function (params) {
    /*var mfURL = KNYMobileFabric.mainRef.config.services_meta.RBObjects.url;
    var url = mfURL + "/operations/SecureMessaging/getMessageAttachment?media_id=" + params.mediaId + "&claims_token=" + KNYMobileFabric.currentClaimToken;
    var element = document.createElement('a');
    element.setAttribute('href', url);
    element.setAttribute('download', params.fileName || 'download');
    element.setAttribute('target', '_blank'); //Tmp fix : Chrome blocked cross orgin download- so in chrome we are opening the file in new window.
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);*/

    var mfURL = KNYMobileFabric.mainRef.config.services_meta.SecureMessaging.url;
    var authToken = KNYMobileFabric.currentClaimToken;
    var serviceURL = mfURL + "/objects/Message?Auth_Token=" + authToken;
    serviceURL = serviceURL + "&" + "X-Kony-ReportingParams" + "=" + kony.sdk.getEncodedReportingParamsForSvcid("register_"+"DbxUserLogin"); 
    var paramURL = "&id=" +  params.mediaId;
    paramURL = paramURL + "&fileName="+params.fileName;
    paramURL = paramURL + "&binaryAttrName=Content";
    var url = serviceURL + paramURL;
    if(kony.os.deviceInfo().name==="thinclient"){
      /*   var objSvc = kony.sdk.getCurrentInstance().getObjectService("MessageBinary", {
        "access": "online"
      });
      var dataObject = new kony.sdk.dto.DataObject("media");
      dataObject.addField("Name", params.fileName);
      dataObject.addField("id", params.mediaId);
      objSvc.getBinaryContent(
        {
          "dataObject": dataObject,
          "binaryAttrName": "Content"
        },
        this.downloadMessageAttachementSuccess.bind(this, params),
        this.downloadMessageAttachementFailure.bind(this)
      );*/
      var element = document.createElement('a');
      element.setAttribute('href', url);
      element.setAttribute('download', params.filename || 'download');
      element.setAttribute('target', '_self'); //Tmp fix : Chrome blocked cross orgin download- so in chrome we are opening the file in new window.
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
    else{
      kony.application.openURL(url);
    }
  };
  /**
   * Success call to download an attachment
   * @param {object} params - required parameters to download attachment
   * @param {object} response - contains required attachment Base64 data
   */
  MessagesManager.prototype.downloadMessageAttachementSuccess = function (params, response) {
    var element = document.createElement('a');
    var fileContent = response;
    var base64file = fileContent ? this.getBase64DataType(params.fileName.substring(params.fileName.lastIndexOf(".") + 1)) + fileContent : this.getBase64DataType("txt") + btoa("Failed to fetch file content.");
    element.setAttribute("href", base64file);
    element.setAttribute("download", params.fileName);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  /**
   * Error call to download an attachment
   * @param {object} error - contains error message
   */
  MessagesManager.prototype.downloadMessageAttachementFailure = function (error) {
    kony.print(error.errmsg);
  };
  /**
   * Method to get Base64 type of attachment to be downloaded
   * @param {Object} fileType - type of file/attachment
   */
  MessagesManager.prototype.getBase64DataType = function (fileType) {
    if (fileType === "txt" || fileType.toLowerCase() === "txt")
      return "data:text/plain;base64,";
    else if (fileType === "png" || fileType.toLowerCase() === "png")
      return "data:image/png;base64,";
    else if (fileType === "jpg" || fileType === "jpeg" || fileType.toLowerCase() === "jpg" || fileType.toLowerCase() === "jpeg")
      return "data:image/jpeg;base64,";
    else if (fileType === "doc" || fileType.toLowerCase() === "doc")
      return "data:application/msword;base64,";
    else if (fileType === "docx" || fileType.toLowerCase() === "docx")
      return "data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,";
    else if (fileType === "pdf" || fileType.toLowerCase() === "pdf")
      return "data:application/pdf;base64,";
    else if (fileType === "csv" || fileType.toLowerCase() === "csv")
      return "data:application/vnd.ms-excel;base64,";
  };
  /**
   * Creates a new request with Attachements by making a service call.
   * @param {object} record - json consisting of following data of the request to be created
   * @param {string} record.requestid - json consisting of following data of the request to be created
   * @param {string} record.requestsubject - subject of the request
   * @param {string} record.messagedescription - actual message to be added to the request
   * @param {string} record.requestcategory_id - category of the request
   * @param {object[]} record.files - array of attachements.
   * @param {function} presentationMsgSuccess will be called when call is successfull
   * @param {function} presentationMsgError will be called when call is not successfull
   */
  MessagesManager.prototype.createNewRequestWithAttachments = function (record, presentationMsgSuccess, presentationMsgError) {
    var userManager = applicationManager.getUserPreferencesManager();
    var params = {};
    let repoName = "Message";
    var userManager = applicationManager.getUserPreferencesManager();
    if(!kony.sdk.isNullOrUndefined(record)){ //WIW-1836 fix
    if (record.requestid) {
      params["requestid"] = record.requestid;
    }
    if (record.messageid) {
      params["messageid"] = record.messageid;
    }
    if (record.requestsubject) {
      params["requestsubject"] = record.requestsubject;
    }
    if (record.requeststatus) {
    	params.requeststatus=record.requeststatus;
    }
    if (record.messagestatus) {
    	params.messagestatus=record.messagestatus;
    } 
    if(!record.isNativeApplication){  
      params["messagedescription"] = btoa(record.messagedescription);     
    }else{ 
      params["messagedescription"] = record.messagedescription;     
    }
    params["username"] = userManager.getCurrentUserName();
    params["createdby"] = userManager.getCurrentUserName();
    params["priority"] = "Medium";
    if (record.requestcategory_id) {
      params["requestcategory_id"] = record.requestcategory_id;
    }
    if (record.mediaIds && record.mediaIds.length) {
      params["mediaIds"] = record.mediaIds;
    }
    if(record.isTradeModule){
      if(record.requestcategory_id.includes("RCID_TF_LETTEROFCREDIT") 
         ||   record.requestcategory_id.includes("RCID_TF_GUARANTEES") 
         ||   record.requestcategory_id.includes("RCID_TF_COLLECTIONS")){
        repoName = "TradeFinanceMessages";
      }
      else if(record.requestcategory_id.includes("RCID_TSF_BILLS") ){
        repoName = "TradeSupplyFinanceMessages";
      }
    }
    
    var messagesObj = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository(repoName);
    messagesObj.customVerb('createRequest', params, getCompletionCallback);
    function getCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
        presentationMsgSuccess(obj.data);
      } else {
        presentationMsgError(obj.errmsg);
      }
      }
    }
    /*var userManager = applicationManager.getUserPreferencesManager();
    try {
      var xhr = new XMLHttpRequest();
      var params = new FormData();
      if (record.files && record.files.length) {
        for (var i = 0; i < record.files.length; i++) {
          params.append("fileName" + (i > 0 ? i : ""), record.files[i].file);
        }
      }
      if (record.requestid) {
        params.append("requestid", record.requestid);
      }
      if (record.requestsubject) {
        params.append("requestsubject", record.requestsubject);
      }
      // double encoding is required here. The same encoding technique is used in Spotlight
      params.append("messagedescription", window.btoa(encodeURI(record.messagedescription)));
      params.append("username", userManager.getCurrentUserName());
      params.append("createdby", userManager.getCurrentUserName());
      params.append("priority", "Medium");
      if (record.requestcategory_id) {
        params.append("requestcategory_id", record.requestcategory_id);
      }
      xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
          var response = applicationManager.getServiceResponseHandler().validatingResponse(JSON.parse(this.responseText));
          if (response.status === true) {
              presentationMsgSuccess(response.data);
          } else {
              presentationMsgError(response.errmsg);
          }
        }
      };
      var mfURL = KNYMobileFabric.mainRef.config.services_meta.RBObjects.url;
      var uploadURL = mfURL + "/operations/SecureMessaging/createCustomerRequest";
      xhr.open("POST", uploadURL, true);
      xhr.setRequestHeader("X-Kony-Authorization", KNYMobileFabric.currentClaimToken);
      xhr.send(params);
    } catch (err) {
      self.presentationMsgError(err);
    }*/
  };
  /**
   * Creates media id for each attachement
   * @param {object} record - containing each attachment data
   * @param {function} presentationMsgSuccess will be called when call is successfull
   * @param {function} presentationMsgError will be called when call is not successfull
   */
  MessagesManager.prototype.createMedia = function (record,messageId, presentationMsgSuccess, presentationMsgError,failureCallBack,index) {
    var objSvc = kony.sdk.getCurrentInstance().getObjectService("MessageBinary", {
      "access": "online"
    });
    var dataObject = new kony.sdk.dto.DataObject("media");
    dataObject.addField("Name", record.file.name);
    dataObject.addField("Size", record.file.size);
    objSvc.create(
      {
        "dataObject": dataObject
      },
      this.createMediaBinary.bind(this, record,messageId, presentationMsgSuccess, presentationMsgError,failureCallBack,index),
      this.createMediaFailure.bind(this, presentationMsgError,failureCallBack,index)
    );
  };
  /**
   * Creates binary content for each attachement
   * @param {object} record - containing each attachment data
   * @param {function} presentationMsgSuccess will be called when call is successfull
   * @param {function} presentationMsgError will be called when call is not successfull
   */
  MessagesManager.prototype.createMediaBinary = function (record,messageId, presentationMsgSuccess, presentationMsgError,failureCallBack,index,response) {
    /*var objSvc = kony.sdk.getCurrentInstance().getObjectService("MessageBinary", {
      "access": "online"
    });
    var dataObject = new kony.sdk.dto.DataObject("media");
    dataObject.addField("Content", record.base64);
    dataObject.addField("id", response.id);
    objSvc.createBinaryContent(
      {
        "dataObject": dataObject,
        "binaryAttrName": "Content"
      },
      this.createMediaBinarySuccess.bind(this, record, presentationMsgSuccess),
      this.createMediaFailure.bind(this, presentationMsgError)
    );*/
    
    var params={};
    var userId=applicationManager.getUserPreferencesManager().getUserObj().userId;
    params.documentName=record.file.name;
    params.version="1.0";
    params.userId= userId;
    params.messageId=messageId;
    if(kony.os.deviceInfo().name !=="thinclient"){
      var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
      var encodedString = Base64.encode(record.base64);
      params.content=encodedString;
    }
    else{
      params.content=btoa(record.base64);
    }
    if(response.hasOwnProperty("id")){
       params.id=response.id;
    }
    var messagesObj = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Message");
    messagesObj.customVerb('addAttachment', params, getCompletionCallback);
    var scope=this;
    function getCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
        scope.createMediaBinarySuccess(record, presentationMsgSuccess,obj)
      } else {
        scope.createMediaFailure(presentationMsgError,failureCallBack,index,obj)
      }
    }
  };
    
  MessagesManager.prototype.createMediaBinarySuccess = function (record, presentationMsgSuccess, response) {
    presentationMsgSuccess(response);
  };
  MessagesManager.prototype.createMediaFailure = function (presentationMsgError,failureCallBack,index,error) {
    if(error.hasOwnProperty("errmsg")){
      presentationMsgError(error.errmsg,failureCallBack,index);
    }
    else{
      presentationMsgError("Error while uplaoding document");
    }
  };
  
  MessagesManager.prototype.discardMessageAttachment = function (params, presentationMsgSuccess, presentationMsgError) {
    var messagesObj = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Message");
    messagesObj.customVerb('deleteAttachement', params, getCompletionCallback);
    var scope=this;
    function getCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj.status === true) {
        presentationMsgSuccess();
      } else {
        presentationMsgError();
      }
    }
  };
  return MessagesManager;
});
