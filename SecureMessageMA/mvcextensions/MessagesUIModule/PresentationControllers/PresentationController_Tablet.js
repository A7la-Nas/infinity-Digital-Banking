define([], function() {
  function Messages_PresentationController() {
    scope_MessagesPresentationController = this;
    scope_MessagesPresentationController.messageTabSelected = "";
    scope_MessagesPresentationController.isCategoriesFetched = false;
    scope_MessagesPresentationController.logger = applicationManager.getLoggerManager();
    kony.mvc.Presentation.BasePresenter.call(scope_MessagesPresentationController);
  }
  inheritsFrom(Messages_PresentationController, kony.mvc.Presentation.BasePresenter);
  Messages_PresentationController.prototype.initializePresentationController = function() {};
  Messages_PresentationController.prototype.commonFunctionForNavigation = function(formName) {
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo(formName);
  };
  Messages_PresentationController.prototype.getCategories = function() {
    if (!scope_MessagesPresentationController.isCategoriesFetched) {
      var msgManager = applicationManager.getMessagesManager();
      msgManager.fetchCategoriesForMessages(scope_MessagesPresentationController.getCategoriesPresentationSuccess, scope_MessagesPresentationController.getCategoriesPresentationError);
    } else {
      scope_MessagesPresentationController.commonFunctionForNavigation("frmNewMessageCategory");
    }
  };
  Messages_PresentationController.prototype.getCategoriesPresentationSuccess = function(res) {
    scope_MessagesPresentationController.isCategoriesFetched = true;
    var navManager = applicationManager.getNavigationManager();
    navManager.setCustomInfo("frmNewMessageCategory", res.requestcategory);
    scope_MessagesPresentationController.commonFunctionForNavigation("frmNewMessageCategory");
  };
  Messages_PresentationController.prototype.getCategoriesPresentationError = function(err) {
    scope_MessagesPresentationController.logger.log("####Error in getCategories");
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (err["isServerUnreachable"])
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
  };
  Messages_PresentationController.prototype.createNewMessage = function(newMessageData) {
    var msgManager = applicationManager.getMessagesManager();
    msgManager.createNewRequest(newMessageData, scope_MessagesPresentationController.createNewMessagePresentationSuccess, scope_MessagesPresentationController.createNewMessagePresentationError);
  };
  Messages_PresentationController.prototype.createNewMessagePresentationSuccess = function(res) {
    var navManager = applicationManager.getNavigationManager();
    var messageData = navManager.getCustomInfo("frmMessages");
    messageData.messagePopupType = "sendSuccess";
    navManager.setCustomInfo("frmMessages",messageData);
    scope_MessagesPresentationController.getInboxRequests();
  };
  Messages_PresentationController.prototype.createNewMessagePresentationError = function(err) {
    scope_MessagesPresentationController.logger.log("####Error in createNewMessage");
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (err["isServerUnreachable"])
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
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
      var controller = applicationManager.getPresentationUtility().getController('frmMessages', true);
      controller.animateInboxToDelete();
      controller.setDataToSegment(deletedRequestsData);
//     }
//     else
//     {
//       scope_MessagesPresentationController.commonFunctionForNavigation("frmMessages");
//     }
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
      requestsData[i].requestsubject = {"text": requestsData[i].requestsubject,"skin": scope_MessagesPresentationController.getSkinForInboxRequest(unreadRequestsCount)};
      var dateobj = formatUtilManager.getDateObjectfromString(requestsData[i].recentMsgDate, "YYYY-MM-DD HH-MM-SS");
      var isToday = formatUtilManager.isTodayDate(dateobj);
      if (isToday) {
        dateString = formatUtilManager.getFormatedDateString(dateobj, formatUtilManager.APPLICATION_TIME_FORMAT);
      }
      else {
        dateString = formatUtilManager.getFormatedDateString(dateobj, formatUtilManager.APPLICATION_DATE_FORMAT);
      }
      requestsData[i].recentMsgDate = dateString;
      requestsData[i].unreadMsgsCount = unreadRequestsCount;
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
    //messageManager.fetchNumberOfUnreadMessages();
     messageManager.fetchNumberOfUnreadMessages(function(){},function(){});
  };
  Messages_PresentationController.prototype.getInboxRequestsPresentationSuccess = function(res) {
    var inboxRequestsDetails = res.customerrequests_view;
    inboxRequestsDetails=scope_MessagesPresentationController.processMessageRequests(inboxRequestsDetails);
    scope_MessagesPresentationController.messageTabSelected = "INBOX";
    var navMan = applicationManager.getNavigationManager();
    var messageData = navMan.getCustomInfo("frmMessages");
    if(messageData && messageData!==null){
      messageData.inboxRequestsDetails = inboxRequestsDetails;
    }
    else{
      messageData = {"inboxRequestsDetails":inboxRequestsDetails};
    }
    navMan.setCustomInfo("frmMessages",messageData);
    if(navMan.getCurrentForm() === "frmMessages")
    {
      var controller = applicationManager.getPresentationUtility().getController('frmMessages', true);
      controller.animateDeleteToInbox();
      controller.setDataToSegment(inboxRequestsDetails);
    }
    else
    {
      scope_MessagesPresentationController.commonFunctionForNavigation("frmMessages");
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
    scope_MessagesPresentationController.currentRequestId = requestId;
    scope_MessagesPresentationController.selectedMessageRowIndex = selectedIndex;
    var messageManager = applicationManager.getMessagesManager();
    var record = {
      "request_id": requestId
    };
    messageManager.fetchMessagesForARequest(record, scope_MessagesPresentationController.getMessagesForARequestPresentationSuccess, scope_MessagesPresentationController.getMessagesForARequestPresentationError);
  };
  Messages_PresentationController.prototype.getMessagesForARequestPresentationSuccess = function(resSuccess) {
    var messagesForARequestArray = resSuccess.messages;
    var requestDetailData = scope_MessagesPresentationController.processMessageDetailsData(messagesForARequestArray);
    var navManager = applicationManager.getNavigationManager();
    var messageDetailsData = navManager.getCustomInfo("frmMessagesDetails");
    var controller = applicationManager.getPresentationUtility().getController('frmMessages', true);
    messageDetailsData.requestDetailData = requestDetailData;
    navManager.setCustomInfo("frmMessagesDetails", messageDetailsData);
    if (scope_MessagesPresentationController.messageTabSelected === "INBOX") {
      	scope_MessagesPresentationController.updateMessageAsRead();
      if (messageDetailsData.unreadMessagesCount > 0) {
        var requestId = messageDetailsData.requestid;
        scope_MessagesPresentationController.updateRequestAsRead(requestId);
      }
    }
    controller.setMessageDetailsData();
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
    for (var i in messagesForARequestArray) {
      var requestDetailJSON = {};
      requestDetailJSON.template = "flxMessagesRight";
      requestDetailJSON.lblFrom = "From : ";
      requestDetailJSON.lblMessage = "Message";
      var dateTimeObj = formatUtilManager.getDateObjectfromString(messagesForARequestArray[i].createdts, "YYYY-MM-DD HH:MM:SS");
      var dateTimeString = formatUtilManager.getFormatedDateString(dateTimeObj, formatUtilManager.APPLICATION_DATE_TIME_FORMAT);
      requestDetailJSON.lblDate = dateTimeString;
      requestDetailJSON.lblMessageDescription = messagesForARequestArray[i].MessageDescription;
      requestDetailJSON.lblFromValue = messagesForARequestArray[i].createdby;
      if (messagesForARequestArray[i].totalAttachments > 0) {
        var attachments = messagesForARequestArray[i].attachments;
        for (var j = 0; j < attachments.length; j++) {
          requestDetailJSON["flxAttachmentMain" + (j + 1)] = {
            isVisible: true
          };
          requestDetailJSON["imgAttachment" + (j + 1)] = {
            "src": "attachment.png"
          };
          //           requestDetailJSON["imgDownload" + (j + 1)] = {
          //             "src": "download.png"
          //           };
          var attachmentName = attachments[j].Name + "." + attachments[j].type;
          requestDetailJSON["lblAttachment" + (j + 1)] = attachmentName;
        }
      }
      requestDetailData.push(requestDetailJSON);
    }
    return requestDetailData;
  };
  Messages_PresentationController.prototype.updateRequestAsRead = function(requestid) {
    var messageManager = applicationManager.getMessagesManager();
    var record = {
      "requestid": requestid
    };
    messageManager.updateRequestAsRead(record, scope_MessagesPresentationController.updateRequestAsReadPresentationSuccess, scope_MessagesPresentationController.updateRequestAsReadPresentationError);
  };
  Messages_PresentationController.prototype.updateRequestAsReadPresentationSuccess = function(resSuccess) {
    var navManager = applicationManager.getNavigationManager();
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
    var controller = applicationManager.getPresentationUtility().getController('frmMessages', true);
    var messageData = navManager.getCustomInfo("frmMessages");
    messageData.messagePopupType = "deleteSuccess";
    navManager.setCustomInfo("frmMessages", messageData);
    controller.showPopup();
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
    var basicConfig = {message: msgText,alertIcon:null,alertType: constants.ALERT_TYPE_CONFIRMATION,alertTitle: applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.messages.DeleteMessage") ,yesLabel:applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertYes"),
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
  return Messages_PresentationController;
});