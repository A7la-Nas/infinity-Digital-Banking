define(['CommonUtilities'], function(CommonUtilities) {

  this.messageId="";
  this.requestId="";
  this.mediaIdArray=[];

  function Messages_PresentationController() {
    scope_MessagesPresentationController = this;
    scope_MessagesPresentationController.messageTabSelected = "";
    scope_MessagesPresentationController.isCategoriesFetched = false;
    scope_MessagesPresentationController.clientAppProperties = null;
    scope_MessagesPresentationController.logger = applicationManager.getLoggerManager();
    kony.mvc.Presentation.BasePresenter.call(scope_MessagesPresentationController);
  }
  inheritsFrom(Messages_PresentationController, kony.mvc.Presentation.BasePresenter);
  Messages_PresentationController.prototype.initializePresentationController = function() {};
  Messages_PresentationController.prototype.commonFunctionForNavigation = function(formName) {
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo(formName);
  };

  Messages_PresentationController.prototype.clearMessageAndRequestId = function () {
    this.messageId="";
    this.requestId="";
    this.mediaIdArray=[];
  };

  Messages_PresentationController.prototype.getCategories = function() {
    if (!scope_MessagesPresentationController.isCategoriesFetched) {
      var msgManager = applicationManager.getMessagesManager();
      msgManager.fetchCategoriesForMessages(scope_MessagesPresentationController.getCategoriesPresentationSuccess, scope_MessagesPresentationController.getCategoriesPresentationError);
    } else {
      scope_MessagesPresentationController.commonFunctionForNavigation({"appName":"SecureMessageMA","friendlyName":"MessagesUIModule/frmNewMessageCategory"});
    }
  };
  Messages_PresentationController.prototype.getCategoriesPresentationSuccess = function(res) {
    scope_MessagesPresentationController.isCategoriesFetched = true;
    var navManager = applicationManager.getNavigationManager();
    navManager.setCustomInfo("frmNewMessageCategory", res.requestcategory);
    scope_MessagesPresentationController.commonFunctionForNavigation({"appName":"SecureMessageMA","friendlyName":"MessagesUIModule/frmNewMessageCategory"});
  };
  Messages_PresentationController.prototype.getCategoriesPresentationError = function(err) {
    scope_MessagesPresentationController.logger.log("####Error in getCategories");
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (err["isServerUnreachable"])
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
  };
  //   Messages_PresentationController.prototype.createNewMessage = function(newMessageData) {
//     var msgManager = applicationManager.getMessagesManager();
//     msgManager.createNewRequest(newMessageData, scope_MessagesPresentationController.createNewMessagePresentationSuccess, scope_MessagesPresentationController.createNewMessagePresentationError);
//   };
  
  Messages_PresentationController.prototype.createNewMessage = function(requestParams) {
    var scopeObj = this;
    var requestId;
    var messageManager = applicationManager.getMessagesManager();
    if(requestParams.requestid!=null && requestParams.requestid !=undefined){
      requestId=requestParams.requestid;
    }
    else{
      requestId=this.requestId;
    }
          
    var requestMessageInputs = {
      "requestid": requestId,
      "requestsubject": requestParams.requestsubject,
      "messagedescription": requestParams.messagedescription,
      "requestcategory_id": requestParams.requestcategory_id,
      "requeststatus": "SID_OPEN",
      "messageid":scopeObj.messageId,
      "messagestatus":"",
      "isNativeApplication":requestParams.isNativeApplication
    }
    
    requestMessageInputs["mediaIds"] = scopeObj.mediaIdArray; 
    messageManager.createNewRequestWithAttachments(
      requestMessageInputs, 
      scopeObj.createNewMessagePresentationSuccess.bind(scopeObj, requestParams), 
      scopeObj.createNewMessagePresentationError.bind(scopeObj, requestParams)
    );
  };
	
  Messages_PresentationController.prototype.discardMessageAttachment = function (mediaId,enableSendButton) {
    var requestParams={};
    var scopeObj=this;
    var messageManager = applicationManager.getMessagesManager();
    requestParams.mediaId=mediaId;
    messageManager.discardMessageAttachment(
      requestParams, 
      scopeObj.discardSuccessCallback.bind(scopeObj,mediaId,enableSendButton), 
      scopeObj.discardErrorCallback.bind(scopeObj,enableSendButton)
    );
  };
  
  Messages_PresentationController.prototype.discardSuccessCallback = function (mediaId,enableSendButton) {
    var index = this.mediaIdArray.indexOf(mediaId);
    if (index > -1) {
      this.mediaIdArray.splice(index, 1);
    }
    enableSendButton();
    kony.print("Sucessfully deleted attachment")
  };
   
   Messages_PresentationController.prototype.discardErrorCallback = function (enableSendButton) {
     enableSendButton();
     kony.print("Error deleting attachment")
   };
  
  Messages_PresentationController.prototype.onNewRequestWithAttachmentsFailsforRequestId = function (requestParams, response) {
    kony.print("error for dummy upload");
  };

  Messages_PresentationController.prototype.onNewRequestWithAttachmentsSuccessforRequestId = function(newMessageData, requestMessageInputs, response) {
    var userName=applicationManager.getUserPreferencesManager().getUserObj()["userName"];
     var scopeObj = this;
    if(response.hasOwnProperty("rawResponse")){
    	requestMessageInputs.messageid = response.rawResponse[userName].requestMessage.messageId;
    	requestMessageInputs.requestid = response.rawResponse[userName].customerRequest.requestId;
    }else{
        requestMessageInputs.messageid = response[userName].requestMessage.messageId;
    	requestMessageInputs.requestid = response[userName].customerRequest.requestId;
    }
    var msgManager = applicationManager.getMessagesManager();
    requestMessageInputs.files= newMessageData.files;
    var mediaID = [];
    if (newMessageData.files && newMessageData.files.length) {
        this.getAllMediaID(requestMessageInputs.files, requestMessageInputs.messageid, function (mediaIDArray) {
          mediaIDArray.forEach(function (mediaIdString, i) {
            mediaID[i] = mediaIdString;
          });
          requestMessageInputs["mediaIds"] = mediaID;
          msgManager.createNewRequestWithAttachments(
            requestMessageInputs, 
            this.createNewMessagePresentationSuccess.bind(scopeObj,newMessageData), 
            this.createNewMessagePresentationError.bind(scopeObj,newMessageData)
          );
        }.bind(this));
    } else {
      msgManager.createNewRequestWithAttachments(
        requestMessageInputs,
        this.createNewMessagePresentationSuccess.bind(scopeObj,newMessageData), 
        this.createNewMessagePresentationError.bind(scopeObj,newMessageData)
      );
    }		
  };
  Messages_PresentationController.prototype.getAllMediaID = function (fileArray, messageId, callback) {
	var msgManager = applicationManager.getMessagesManager();
    var count = 0;
    var mediaIDArray = [];
    function individualCallback(index, response) {
      var mediaIDString = response.data.id;
      count++;
      mediaIDArray.splice(index, 0, mediaIDString);
      if (count === fileArray.length) {
        callback(mediaIDArray);
      }
    }
    fileArray.forEach(function (fileObject, index) {
    msgManager.createMedia(fileObject, messageId, individualCallback.bind(null, index), scope_MessagesPresentationController.createNewMessagePresentationError);
    }.bind(this));
  }; 
  
  Messages_PresentationController.prototype.createNewMessagePresentationSuccess = function(res) {
    var navManager = applicationManager.getNavigationManager();
    scope_MessagesPresentationController.clearMessageAndRequestId();
    var messageData = navManager.getCustomInfo("frmMessages");
	if(!messageData) messageData = {};
    messageData.messagePopupType = "sendSuccess";
    navManager.setCustomInfo("frmMessages",messageData);
    scope_MessagesPresentationController.getInboxRequests();
  };
  Messages_PresentationController.prototype.createNewMessagePresentationError = function(err,failureCallBack,index) {
    scope_MessagesPresentationController.logger.log("####Error in createNewMessage");
    if(failureCallBack!=null && failureCallBack!=undefined){
      failureCallBack(index);
    }
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (err["isServerUnreachable"])
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    else if(err["serverErrorRes"])
      {
        var controller = applicationManager.getPresentationUtility().getController('frmNewMessage', true);
		if(err["serverErrorRes"].validationError)
		{
           var validationError = err["serverErrorRes"].validationError;
           controller.bindGenericError(validationError);
		}
        else if (err["serverErrorRes"].errmsg)
          {
           var errorMsg = err["serverErrorRes"].errmsg;
           controller.bindGenericError(errorMsg);
          }
      }
  };
  Messages_PresentationController.prototype.getDeleteRequests = function() {
    var messageManager = applicationManager.getMessagesManager();
    messageManager.fetchAllRequestsForDeleted(scope_MessagesPresentationController.getDeleteRequestsPresentationSuccess, scope_MessagesPresentationController.getDeleteRequestsPresentationError);
  };
  Messages_PresentationController.prototype.getDeleteRequestsPresentationSuccess = function(res) {
    var deletedRequestsData = res.customerrequests_view;
    deletedRequestsData=scope_MessagesPresentationController.processMessageRequests(deletedRequestsData);
    scope_MessagesPresentationController.messageTabSelected = "DELETED";
    var navMan = applicationManager.getNavigationManager();
    var messageData = navMan.getCustomInfo("frmMessages");
    if(messageData && messageData!==null){
      messageData.deleteRequestDetails = deletedRequestsData;
    }
    else{
      messageData = {"deleteRequestDetails":deletedRequestsData};
    }
    navMan.setCustomInfo("frmMessages",messageData);
    if(navMan.getCurrentForm() === "frmMessages")
    {
      var controller = applicationManager.getPresentationUtility().getController('frmMessages', true);
      controller.animateInboxToDelete();
      controller.setDataToSegment(deletedRequestsData);
    }
    else
    {
      scope_MessagesPresentationController.commonFunctionForNavigation("frmMessages");
    }
  };
  Messages_PresentationController.prototype.getDeleteRequestsPresentationError = function(err) {
    scope_MessagesPresentationController.logger.log("####Error in getDeleteRequests" + err);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (err["isServerUnreachable"])
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
  };
  Messages_PresentationController.prototype.processMessageRequests = function(requestsData){
    var formatUtilManager = applicationManager.getFormatUtilManager();
    for (var i = 0; i < requestsData.length; i++) {
      var unreadRequestsCount = parseInt(requestsData[i].unreadmsgs);
      var dateString = null;
      //OSAMA
      requestsData[i].requestsubject = {"text": requestsData[i].requestsubject,"skin": scope_MessagesPresentationController.getSkinForInboxRequest(unreadRequestsCount)};
      //requestsData[i].requestsubject = {"text": decodeURI(Base64.decode(requestsData[i].requestsubject)),"skin": scope_MessagesPresentationController.getSkinForInboxRequest(unreadRequestsCount)};
      var dateobj = formatUtilManager.getDateObjectfromString(requestsData[i].recentMsgDate, "YYYY-MM-DD HH-MM-SS");
      var isToday = formatUtilManager.isTodayDate(dateobj);
      dateString = CommonUtilities.getDateAndTime(requestsData[i].recentMsgDate);
      /*if (isToday) {
        dateString = formatUtilManager.getFormatedDateString(dateobj, formatUtilManager.APPLICATION_TIME_FORMAT);
      }
      else {
        dateString = formatUtilManager.getFormatedDateString(dateobj, formatUtilManager.getApplicationDateFormat());
      }*/
      requestsData[i].firstMessage = decodeURI(Base64.decode(requestsData[i].firstMessage));
      requestsData[i].recentMsgDate = dateString;
      requestsData[i].unreadMsgsCount = unreadRequestsCount;
      requestsData[i].isPriorityMessage = requestsData[i].hasOwnProperty("priorityCount") && parseInt(requestsData[i].priorityCount) > 0;
      if(unreadRequestsCount === 0)
        requestsData[i].unreadMsgsPerThread = "";
      else
        requestsData[i].unreadMsgsPerThread = "(" + unreadRequestsCount + ")";
    }
    return requestsData;
  };
  Messages_PresentationController.prototype.getInboxRequests=function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var messageManager = applicationManager.getMessagesManager();
    messageManager.fetchAllRequestsForInbox(scope_MessagesPresentationController.getInboxRequestsPresentationSuccess,scope_MessagesPresentationController.getInboxRequestsPresentationError);
    messageManager.fetchNumberOfUnreadMessages(function(){},function(){});
  };
  Messages_PresentationController.prototype.fetchClientAppProperties = function () {
    var scope = this;
    if(!scope.clientAppProperties){
      var config = kony.sdk.getCurrentInstance().getConfigurationService();
      config.getAllClientAppProperties(function(res) {
        scope.clientAppProperties = res;
        scope.getInboxRequests();
      }, function(err) { scope.getInboxRequests(); });
    }
  };
  Messages_PresentationController.prototype.getInboxRequests=function(){
    var scope = this;
    applicationManager.getPresentationUtility().showLoadingScreen();
    var messageManager = applicationManager.getMessagesManager();
    messageManager.fetchAllRequestsForInbox(scope_MessagesPresentationController.getInboxRequestsPresentationSuccess,scope_MessagesPresentationController.getInboxRequestsPresentationError);
    messageManager.fetchNumberOfUnreadMessages(function(data){
      let isPriorityMessagesNotAvailable = (CommonUtilities.CLIENT_PROPERTIES.MB_ENABLE_SECURE_MESSAGE !== undefined && CommonUtilities.CLIENT_PROPERTIES.MB_ENABLE_SECURE_MESSAGE.toUpperCase() === "FALSE");
      if(isPriorityMessagesNotAvailable){
        messageManager.priorityMessageCount = 0;
      }
    },function(){});
  };
  Messages_PresentationController.prototype.getInboxRequestsPresentationSuccess = function(res) {
    var inboxRequestsDetails = res.customerrequests_view;
    inboxRequestsDetails=scope_MessagesPresentationController.processMessageRequests(inboxRequestsDetails);
    scope_MessagesPresentationController.messageTabSelected = "INBOX";
    var navMan = applicationManager.getNavigationManager();
    var messageData = navMan.getCustomInfo("frmMessages");
    if(messageData && messageData!==null){
      messageData.inboxRequestsDetails = inboxRequestsDetails;
    } else{
      messageData = {"inboxRequestsDetails":inboxRequestsDetails};
    }
    navMan.setCustomInfo("frmMessages",messageData);
    if(navMan.getCurrentForm() === "frmMessages") {
      var controller = applicationManager.getPresentationUtility().getController('frmMessages', true);
      controller.animateDeleteToInbox();
      controller.setDataToSegment(inboxRequestsDetails);
    } else {
      var frmName = {  "appName": "SecureMessageMA", "friendlyName": "MessagesUIModule/frmMessages" };
      navMan.navigateTo(frmName);
    }
  };
  Messages_PresentationController.prototype.getInboxRequestsPresentationError = function(err) {
    scope_MessagesPresentationController.logger.log("####Error in getInboxRequests " + err);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (err["isServerUnreachable"])
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
  };
  Messages_PresentationController.prototype.getSkinForInboxRequest = function(unreadRequestsCount) {
    if (unreadRequestsCount > 0) {
      return "sknLbl424242SSPBold26px";
    } else {
      return "sknLbl424242SSP26px";
    }
  };
  Messages_PresentationController.prototype.getMessagesForARequest = function(requestId,selectedIndex) {
    scope_MessagesPresentationController.selectedMessageRowIndex = selectedIndex;
    var messageManager = applicationManager.getMessagesManager();
    var record = {
      "request_id": requestId
    };
    scope_MessagesPresentationController.clearMessageAndRequestId();
    messageManager.fetchMessagesForARequest(record, scope_MessagesPresentationController.getMessagesForARequestPresentationSuccess, scope_MessagesPresentationController.getMessagesForARequestPresentationError);
  };
  Messages_PresentationController.prototype.getMessagesForARequestPresentationSuccess = function(resSuccess) {
    var messagesForARequestArray = resSuccess.messages;
     var navManager = applicationManager.getNavigationManager();
     var messageDetailsData = navManager.getCustomInfo("frmMessagesDetails");
    var requestDetailData = scope_MessagesPresentationController.processMessageDetailsData(messagesForARequestArray);
    messageDetailsData.requestDetailData = requestDetailData;
    navManager.setCustomInfo("frmMessagesDetails", messageDetailsData);
    if (scope_MessagesPresentationController.messageTabSelected === "INBOX") {
      scope_MessagesPresentationController.updateMessageAsRead();
      if (messageDetailsData.unreadMessagesCount > 0) {
        var requestId = messageDetailsData.requestid;
        scope_MessagesPresentationController.updateRequestAsRead(requestId);
      } else {
        navManager.navigateTo("frmMessagesDetails");
      }
    } else {
      navManager.navigateTo("frmMessagesDetails");
    }
  };
  Messages_PresentationController.prototype.getMessagesForARequestPresentationError = function(err) {
    scope_MessagesPresentationController.logger.log("####Couldn't fetch messages for the request");
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (err["isServerUnreachable"])
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
  };
  Messages_PresentationController.prototype.updateMessageAsRead = function() {
    var index = scope_MessagesPresentationController.selectedMessageRowIndex;
    var navManager = applicationManager.getNavigationManager();
    var msgData = navManager.getCustomInfo("frmMessages");
    var requestsData = msgData.inboxRequestsDetails;
    if(requestsData[index] && requestsData[index].unreadMsgsCount !== 0){
      requestsData[index].unreadMsgsPerThread = "";
      requestsData[index].requestsubject["skin"] = scope_MessagesPresentationController.getSkinForInboxRequest(0);
      requestsData[index].unreadMsgsCount = 0;
      msgData.inboxRequestsDetails = requestsData;
      navManager.setCustomInfo("frmMessages", msgData);
    }
  };
  Messages_PresentationController.prototype.processMessageDetailsData = function(messagesForARequestArray) {
    var requestDetailData = [];
    var formatUtilManager = applicationManager.getFormatUtilManager();
     var navManager = applicationManager.getNavigationManager();
    var cusdata =  navManager.getCustomInfo("frmMessagesDetails");
    var MessageModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("MessagesUIModule");
    for (var i in messagesForARequestArray) {
      var requestDetailJSON = {};
      requestDetailJSON.template = "flxMessagesRight";
      requestDetailJSON.lblFrom = "From: ";
      requestDetailJSON.lblMessage = "Message: ";
      var dateTimeString = CommonUtilities.getDateAndTime(messagesForARequestArray[i].createdts);
      requestDetailJSON.lblDate = dateTimeString;
      requestDetailJSON.lblMessageDescription = decodeURI(Base64.decode(messagesForARequestArray[i].MessageDescription));
      requestDetailJSON.lblFromValue = messagesForARequestArray[i].createdby;
      requestDetailJSON.lblReqVal=messagesForARequestArray[i].CustomerRequest_id;
      requestDetailJSON.lblCategoryVal=cusdata.category;
      if (messagesForARequestArray[i].totalAttachments > 0) {
        var attachments = messagesForARequestArray[i].attachments;
        for (var j = 0; j < attachments.length; j++) {
          requestDetailJSON["flxAttachmentMain" + (j + 1)] = {
            isVisible: true
          };
          requestDetailJSON["flxDownload" + (j + 1)] = {
            "isVisible": true,
            "onClick": MessageModule.presentationController.downloadAttachment.bind(this,attachments[j])
          };
          requestDetailJSON["imgDownload" + (j + 1)] = {
            "src": "download.png",
            "height":"30dp",
            "width":"30dp"
          };
          //var attachmentName = attachments[j].Name + "." + attachments[j].type;
          var attachmentName = attachments[j].Name;
          requestDetailJSON["lblAttachment" + (j + 1)] = attachmentName;
          var attachment = attachmentName.split(".");
          if(attachment.length===2){
            var attachmentType = attachment[1];
            if(attachmentType === "doc"){
              requestDetailJSON["imgAttachment" + (j + 1)] = {
              "src": "doc_image.png",
                "height":"20dp",
                "width":"20dp"
              };
            } else if(attachmentType === "pdf"){
              requestDetailJSON["imgAttachment" + (j + 1)] = {
              "src": "pdf_image.png",
                "height":"20dp",
                "width":"20dp"
              };
            }else if(attachmentType === "docx"){
              requestDetailJSON["imgAttachment" + (j + 1)] = {
              "src": "docx_image.png",
                "height":"20dp",
                "width":"20dp"
              };
            }else if(attachmentType === "jpeg"){
              requestDetailJSON["imgAttachment" + (j + 1)] = {
              "src": "jpeg_image.png",
              "height":"20dp",
              "width":"20dp"
              };
            }else if(attachmentType === "png"){
              requestDetailJSON["imgAttachment" + (j + 1)] = {
              "src": "png_image.png",
                "height":"20dp",
                "width":"20dp"
              };
            }
          }
        }
      }
      requestDetailData.push(requestDetailJSON);
    }
    return requestDetailData;
  };

  Messages_PresentationController.prototype.uploadMedia = function(fileObject,requestId,successCallback,failureCallBack,index) {
    var scopeObj = this;
    applicationManager.getPresentationUtility().showLoadingScreen();
    var messagesManager = applicationManager.getMessagesManager();
	  var status="SID_DRAFT";
    var subject="Draft Subject"
    if(requestId != null && requestId !=undefined && requestId.trim() !=""){
      status="SID_OPEN";
      subject="";
    }
    function individualCallback(response) {
      if(scopeObj.mediaIdArray==null || scopeObj.mediaIdArray== undefined){
        scopeObj.mediaIdArray=[];
      }
      scopeObj.mediaIdArray.push(response.data.id);
      successCallback(response.data.id);
    };
    var requestMessageInputs = {
      "requestid":requestId,
      "requestsubject":subject,
      "messagedescription": "Draft Description",
      "requestcategory_id": "RCID_CREDITCARD",
      "requeststatus": status,
      "messagestatus":"DRAFT",
      "isNativeApplication":true
    }

    function onCreateNewRequestSuccess(fileObject,response) {
      var userName = applicationManager.getUserPreferencesManager().getUserObj().userName;
      //var userName = "10****70";//osama
      var messageId = "";
      var requestId="";
      //osama
      userName = userName.slice(0,2) + "****" + userName.slice(-2);
      if(response.hasOwnProperty("rawResponse")){
        messageId = response.rawResponse[userName].requestMessage.messageId;
        requestId = response.rawResponse[userName].customerRequest.requestId;
      }else{
        messageId = response[userName].requestMessage.messageId;
        requestId = response[userName].customerRequest.requestId;
      }
      scopeObj.messageId = messageId;
      scopeObj.requestId = requestId;
      var messagesManager = applicationManager.getMessagesManager();
      messagesManager.createMedia(fileObject, scopeObj.messageId, individualCallback.bind(this), scope_MessagesPresentationController.createNewMessagePresentationError.bind(scopeObj),failureCallBack,index);
    }

    function onCreateNewRequestFailure(response) {
      kony.print("Error while creating Drafted message");
    }
    if (scopeObj.messageId != null && scopeObj.messageId != undefined && scopeObj.messageId.trim() != "") {
      messagesManager.createMedia(fileObject, scopeObj.messageId, individualCallback.bind(this),  scope_MessagesPresentationController.createNewMessagePresentationError.bind(scopeObj),failureCallBack,index);
    } else {
      messagesManager.createNewRequestWithAttachments(requestMessageInputs, onCreateNewRequestSuccess.bind(scopeObj, fileObject), onCreateNewRequestFailure.bind(scopeObj));
    }
  };

  Messages_PresentationController.prototype.updateRequestAsRead = function(requestid) {
    var messageManager = applicationManager.getMessagesManager();
    var record = {
      "requestid": requestid
    };
    messageManager.updateRequestAsRead(record, scope_MessagesPresentationController.updateRequestAsReadPresentationSuccess, scope_MessagesPresentationController.updateRequestAsReadPresentationError);
  };
  Messages_PresentationController.prototype.updateRequestAsReadPresentationSuccess = function(resSuccess) {
	var messageManager = applicationManager.getMessagesManager();
    messageManager.fetchNumberOfUnreadMessages();
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo("frmMessagesDetails");
  };
  Messages_PresentationController.prototype.updateRequestAsReadPresentationError = function(err) {
    var navManager = applicationManager.getNavigationManager();
    scope_MessagesPresentationController.logger.log("####updation of request as read failed");
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (err["isServerUnreachable"])
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
    else
      navManager.navigateTo("frmMessagesDetails");
  };
  Messages_PresentationController.prototype.deleteMessages = function() {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var data = navManager.getCustomInfo("frmMessagesDetails");
    var msgManager = applicationManager.getMessagesManager();
    msgManager.softDeleteAllMessagesOfARequest(data, scope_MessagesPresentationController.deleteMessagesPresentationSuccess, scope_MessagesPresentationController.deleteMessagesPresentationError);
  };
  Messages_PresentationController.prototype.deleteMessagesPresentationSuccess = function(res) {
    var navManager = applicationManager.getNavigationManager();
    var messageData = navManager.getCustomInfo("frmMessages");
    messageData.messagePopupType = "deleteSuccess";
    navManager.setCustomInfo("frmMessages", messageData);
    scope_MessagesPresentationController.getInboxRequests();
  };
  Messages_PresentationController.prototype.deleteMessagesPresentationError = function(err) {
    scope_MessagesPresentationController.logger.log("####Error in deleteMessages");
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (err["isServerUnreachable"])
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
  };
  Messages_PresentationController.prototype.restoreMessagesOfARequest = function() {
    var navManager = applicationManager.getNavigationManager();
    var data = navManager.getCustomInfo("frmMessagesDetails");
    var msgManager = applicationManager.getMessagesManager();
    msgManager.restoreDeletedMessagesOfARequest(data, scope_MessagesPresentationController.restoreMessagesOfARequestPresentationSuccess, scope_MessagesPresentationController.restoreMessagesOfARequestPresentationError);
  };
  Messages_PresentationController.prototype.restoreMessagesOfARequestPresentationSuccess = function(res) {
    var navManager = applicationManager.getNavigationManager();
    var messageData = navManager.getCustomInfo("frmMessages");
    messageData.messagePopupType = "restoreSuccess";
    navManager.setCustomInfo("frmMessages",messageData);
    scope_MessagesPresentationController.getInboxRequests();
  };
  Messages_PresentationController.prototype.restoreMessagesOfARequestPresentationError = function(err) {
    scope_MessagesPresentationController.logger.log("####Error in restoreMessagesOfARequest");
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (err["isServerUnreachable"])
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
  };
  Messages_PresentationController.prototype.deleteMessagesPermanently = function() {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var data = navManager.getCustomInfo("frmMessagesDetails");
    var msgManager = applicationManager.getMessagesManager();
    msgManager.hardDeleteAllMessagesOfARequest(data, scope_MessagesPresentationController.deleteMessagesPermanentlyPresentationSuccess, scope_MessagesPresentationController.deleteMessagesPermanentlyPresentationError);
  };
  Messages_PresentationController.prototype.deleteMessagesPermanentlyPresentationSuccess = function(res) {
    var navManager = applicationManager.getNavigationManager();
    var messageData = navManager.getCustomInfo("frmMessages");
    messageData.messagePopupType = "deletePermanentlySuccess";
    navManager.setCustomInfo("frmMessages", messageData);
    scope_MessagesPresentationController.getDeleteRequests();
  };
  Messages_PresentationController.prototype.deleteMessagesPermanentlyPresentationError = function(err) {
    scope_MessagesPresentationController.logger.log("####Error in deleteMessagesPermanently");
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (err["isServerUnreachable"])
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
  };
  Messages_PresentationController.prototype.replyMessagesOfARequest = function(replyMessage)
  {
    var navManager = applicationManager.getNavigationManager();
    var data = navManager.getCustomInfo("frmMessagesDetails");
    var params = {};
    data.messagedescription = replyMessage;
    var msgManager = applicationManager.getMessagesManager();
    msgManager.updateExistingRequest(data,scope_MessagesPresentationController.replyMessagesOfARequestPresentationSuccess,scope_MessagesPresentationController.replyMessagesOfARequestPresentationError);
  };
  Messages_PresentationController.prototype.replyMessagesOfARequestPresentationSuccess = function(resSuccess)
  {
    var navManager = applicationManager.getNavigationManager();
    var messageData = navManager.getCustomInfo("frmMessages");
    messageData.messagePopupType = "sendSuccess";
    navManager.setCustomInfo("frmMessages",messageData);
    scope_MessagesPresentationController.getInboxRequests();
  };
  Messages_PresentationController.prototype.replyMessagesOfARequestPresentationError = function(err)
  {
    scope_MessagesPresentationController.logger.log("####message not added to request");
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (err["isServerUnreachable"])
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
  };
  Messages_PresentationController.prototype.getUnreadMessagesCount = function() {
    var msgManager = applicationManager.getMessagesManager();
    msgManager.fetchNumberOfUnreadMessages(scope_MessagesPresentationController.getUnreadMessagesCountPresentationSuccess, scope_MessagesPresentationController.getUnreadMessagesCountPresentationError);
  };
  Messages_PresentationController.prototype.getUnreadMessagesCountPresentationSuccess = function(res) {
    var navManager = applicationManager.getNavigationManager();
    var data = {
      "unreadMessageCount" : res.operationRecord.unreadMessageCount
    };
    navManager.setCustomInfo("frmMenu",data);
    var controller = applicationManager.getPresentationUtility().getController('frmMenu', true);
    controller.setUnreadMessagesCounttoView();
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
  Messages_PresentationController.prototype.getUnreadMessagesCountPresentationError = function(err) {
    scope_MessagesPresentationController.logger.log("####Error in getUnreadMessagesCount");
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (err["isServerUnreachable"])
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
  };
  Messages_PresentationController.prototype.onDeleteMessages = function(){
    var msgText;
    if(scope_MessagesPresentationController.messageTabSelected === "INBOX")
    {
      msgText = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Messages.DeleteMessageAlertText");
    }
    else if(scope_MessagesPresentationController.messageTabSelected === "DELETED")
    {
      msgText =  applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Messages.DeleteMessagePremanentlyAlertText");
    }
    var basicConfig = {message: msgText,alertIcon:null,alertType: constants.ALERT_TYPE_CONFIRMATION,yesLabel:applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertYes"),
                       noLabel: applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertNo"), alertHandler: scope_MessagesPresentationController.deleteRequest
                      };
    var pspConfig = {};
    applicationManager.getPresentationUtility().showAlertMessage(basicConfig, pspConfig);
  };
  Messages_PresentationController.prototype.deleteRequest = function(response){
    if(response===true)
    {
      applicationManager.getPresentationUtility().showLoadingScreen();
      if(scope_MessagesPresentationController.messageTabSelected === "INBOX")
      {
        scope_MessagesPresentationController.deleteMessages();
      }
      else if(scope_MessagesPresentationController.messageTabSelected === "DELETED")
      {
        scope_MessagesPresentationController.deleteMessagesPermanently();
      }
    }
  };
  Messages_PresentationController.prototype.downloadAttachment = function (attachments) {
    var messagesManager = applicationManager.getMessagesManager();
    var mediaId = attachments.media_Id;
    var fileName = attachments.Name;
    var params = {
      mediaId: mediaId,
      fileName: fileName
    };
    messagesManager.downloadMessageAttachement(params);
  };
  return Messages_PresentationController;
});