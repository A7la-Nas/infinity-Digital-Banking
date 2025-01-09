define(['CampaignUtility'], function(CampaignUtility){
  return{
  timerCounter: 0,
  segData : [],
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
	this.view.onNavigate = this.onNavigate;
  },
  onNavigate: function () {
	    // Footer Menu
		if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {//osama
		  var footerMenuUtility = require("FooterMenuUtility");
		  this.footerMenuUtility =
			footerMenuUtility.getFooterMenuUtilityInstance();
		  var cm = applicationManager.getConfigurationManager();
		  this.footerMenuUtility.entitlements = {
			features: cm.getUserFeatures(),
			permissions: cm.getUserPermissions(),
		  };
		  this.footerMenuUtility.scope = this;
		}
    },
  frmMessagesPreShow: function () {
    this.setPreshowData();
    this.view.customHeader.lblLocateUs.contentAlignment = 5;
    this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.AlertsAndMessages.Message");
    this.setFlowActions();
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){//osama
      this.view.flxHeader.isVisible = true;
      this.view.flxFooter.isVisible = false;
	  //Footer menu
	  this.footerMenuUtility.setFooterMenuItems(this, "flxPrimary500");
			this.view.customHeader.flxBack.isVisible = false;
    }
    else{
      this.view.flxHeader.isVisible = false;
      this.view.flxFooter.isVisible = true;
    }
	this.showPopup();
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    let scopeObj = this;
    function campaignPopUpSuccess(response){
      CampaignUtility.showCampaign(response, scopeObj.view);
    }
    function campaignPopUpError(response){
      kony.print(response, "Campaign Not Found!");
    }
    CampaignUtility.fetchPopupCampaigns(campaignPopUpSuccess, campaignPopUpError);
    var deviceManager = applicationManager.getDeviceUtilManager();
    deviceManager.detectDynamicInstrumentation();
  },
  setPreshowData: function () {
    var scope = this;
    this.segData = [];
    var configManager = applicationManager.getConfigurationManager();
    var MenuHandler =  applicationManager.getMenuHandler();
    MenuHandler.setUpHamburgerForForm(scope,configManager.constants.MENUMESSAGES);
    scope.setDefaultSkinForAllTabs();
    scope.setTabSelectedSkins();
    this.view.flxSearch.setVisibility(configManager.checkUserPermission("MESSAGES_CREATE_OR_REPLY"));
    this.view.flxDeleted.setVisibility(configManager.checkUserPermission("MESSAGES_DELETE"));
    this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.AlertsAndMessages.Message");
    scope.resetFormUI();
    scope.setDataBasedOnSelectedTab();
  },
  onDelete :function(){
    var rowId = applicationManager.getPresentationUtility().rowIndexforSwipe;
    var selectedMessageDetails = this.segData[rowId];
    var navManager = applicationManager.getNavigationManager();
    var data = navManager.getCustomInfo("frmMessagesDetails");
    if(!data)
    {
     data = {};
    }
    data.requestid = selectedMessageDetails.id;
    navManager.setCustomInfo("frmMessagesDetails",data);
    var MessageModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("MessagesUIModule");
    MessageModule.presentationController.onDeleteMessages();
  },
  onSwipeReply : function(){
    var rowid = applicationManager.getPresentationUtility().rowIndexforSwipe;
    applicationManager.getPresentationUtility().showLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var data = navManager.getCustomInfo("frmMessagesDetails");
    if(!data)
    {
     data = {};
    }
    data.showReply = true;
    navManager.setCustomInfo("frmMessagesDetails",data);
    this.navToMessageDetails(rowid);
  },
  setDataBasedOnSelectedTab : function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var messagesMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("MessagesUIModule");
    var navManager = applicationManager.getNavigationManager();
    var messageData=navManager.getCustomInfo("frmMessages");
    if(messagesMod.presentationController.messageTabSelected === "INBOX")
      this.setDataToSegment(messageData.inboxRequestsDetails);
    else
      this.setDataToSegment(messageData.deleteRequestDetails);
  },
  setFlowActions: function () {
    var scopeObj = this;
    //osama
    this.view.onDeviceBack = this.backNavigation;
    this.view.flxInbox.onClick = this.onInboxTabSelection;
    this.view.flxDeleted.onClick = this.onDeletedTabSelection;
    this.view.tbxSearch.onTouchStart = this.onSearch;
    this.view.customSearchbox.tbxSearch.onTextChange = this.onSearchingMessages;
    this.view.customSearchbox.btnCancel.onTouchEnd = this.onSearchCancel;
    this.view.flxSearch.onClick = this.navToNewMessage;
   // this.view.segMessagesInbox.onRowClick = this.navToMessageDetails;
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  //osama
  backNavigation: function () {
      try {
        var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"HomepageMA","moduleName":"AccountsUIModule"});
        accountMod.presentationController.showDashboard();
      } catch (er) {
      }
    },
  setTabSelectedSkins: function () {
    this.setDefaultSkinForAllTabs();
    var messagesMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("MessagesUIModule");
    if(messagesMod.presentationController.messageTabSelected === "INBOX"){
      this.view.flxInbox.skin = "sknFlxffffff";
      this.view.flxInboxIndicator.skin = "sknFlx1a98ff";
    }
    else{
      this.view.flxDeleted.skin = "sknFlxffffff";
      this.view.flxDeletedIndicator.skin = "sknFlx1a98ff";
    }
  },
  animateInboxToDelete:function(){
    var scope=this;
    this.view.flxDraftIndicator.left="0%";
    this.view.flxDraftIndicator.skin="sknFlx1a98ff";
    this.view.flxDraftIndicator.setVisibility(true);
    this.view.flxInboxIndicator.skin="sknFlxffffff";
    this.view.flxDraftIndicator.animate(
    kony.ui.createAnimation({
      0:{
        left:"0%","stepConfig":{}
      },
      100:{
        left:"50%","stepConfig":{}
      }
    }),
    {
      fillMode:kony.anim.FILL_MODE_FORWARDS,duration:0.3
    },
    {
      animationEnd: function() {
        scope.view.flxDraftIndicator.setVisibility(false);
        scope.setTabSelectedSkins();
      }
    }
    );
  },
  animateDeleteToInbox: function(){
    var scope=this;
    this.view.flxDraftIndicator.left="50%";
    this.view.flxDraftIndicator.skin="sknFlx1a98ff";
    this.view.flxDraftIndicator.setVisibility(true);
    this.view.flxDeletedIndicator.skin="sknFlxffffff";
    this.view.flxDraftIndicator.animate(
    kony.ui.createAnimation({
      0:{
        left:"50%","stepConfig":{}
      },
      100:{
        left:"0%","stepConfig":{}
      }
    }),
    {
      fillMode:kony.anim.FILL_MODE_FORWARDS,duration:0.3
    },
    {
      animationEnd: function() {
        scope.view.flxDraftIndicator.setVisibility(false);
        scope.setTabSelectedSkins();
      }
    }
    );
  },
  setDefaultSkinForAllTabs: function () {
    this.view.flxDeleted.skin = "sknFlxf9f9f9";
    this.view.flxDeletedIndicator.skin = "sknFlxf9f9f9";
    this.view.flxDraft.skin = "sknFlxf9f9f9";
    this.view.flxDraftIndicator.skin = "sknFlxf9f9f9";
    this.view.flxInbox.skin = "sknFlxf9f9f9";
    this.view.flxInboxIndicator.skin = "sknFlxf9f9f9";
  },
  onSearch :function(){
    var scopeObj = this;
	kony.timer.schedule("timerId", function() {
                           scopeObj.view.customSearchbox.tbxSearch.setFocus(true);
                           }, 0.2, false);
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      scopeObj.view.flxHeader.isVisible = false;
      scopeObj.view.flxHeaderSearchbox.isVisible = true;
      scopeObj.view.customSearchbox.tbxSearch.text = "";
      scopeObj.view.flxMainContainer.top = "38dp";
      scopeObj.view.flxMessagesTabs.top = "0dp";
      scopeObj.view.flxMessages.top = "50dp";
      scopeObj.view.flxSearchHeader.isVisible = false;
    }
    else{
      scopeObj.view.flxHeader.isVisible = false;
      scopeObj.view.flxHeaderSearchbox.isVisible = true;
      scopeObj.view.customSearchbox.tbxSearch.setFocus(true);
      scopeObj.view.customSearchbox.tbxSearch.text = "";
      scopeObj.view.flxMainContainer.top = "0dp";
      scopeObj.view.flxMessagesTabs.top = "39dp";
      scopeObj.view.flxMessages.top = "90dp";
      scopeObj.view.flxSearchHeader.isVisible = false;
    }
  },
  resetFormUI : function(){
    var scopeObj = this;
    var deviceUtilManager = applicationManager.getDeviceUtilManager();
    var isIphone = deviceUtilManager.isIPhone();
    if(!isIphone){
      this.view.flxHeader.isVisible = true;
      this.view.flxMainContainer.top = "56dp";
      scopeObj.view.flxMessagesTabs.top = "50dp";
      scopeObj.view.flxMessages.top = "100dp";
      this.view.flxFooter.setVisibility(false);//osama
    }
    else{
      this.view.flxHeader.isVisible = false;
      this.view.flxMainContainer.top = "0dp";
      scopeObj.view.flxMessagesTabs.top = "50dp";
      scopeObj.view.flxMessages.top = "100dp";
      this.view.flxFooter.setVisibility(true);
    }
    scopeObj.view.tbxSearch.text = "";
    scopeObj.view.flxHeaderSearchbox.isVisible = false;
    scopeObj.view.flxSearchHeader.isVisible = true;
  },
  onSearchCancel : function(){
    var scopeObj = this;
    scopeObj.resetFormUI();
    var navManager = applicationManager.getNavigationManager();
    var messageData=navManager.getCustomInfo("frmMessages");
    var messagesMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("MessagesUIModule");
    if(messagesMod.presentationController.messageTabSelected === "INBOX")
      scopeObj.setDataToSegment(messageData.inboxRequestsDetails);
    else
      scopeObj.setDataToSegment(messageData.deleteRequestDetails);
  },
  onSearchingMessages : function(){
    var searchtext=this.view.customSearchbox.tbxSearch.text.toLowerCase();
    var navManager = applicationManager.getNavigationManager();
    var messageData=navManager.getCustomInfo("frmMessages");
    var requestsDetails = [];
    var messagesMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("MessagesUIModule");
    if(messagesMod.presentationController.messageTabSelected === "INBOX")
      requestsDetails = messageData.inboxRequestsDetails;
    else
      requestsDetails = messageData.deleteRequestDetails;
    if(searchtext && requestsDetails )
    {
      this.view.segMessagesInbox.removeAll();
      var data = requestsDetails;
      for(var i=0 ; i<data.length; i++)
      {
        data[i].requestsubjecttext = data[i].requestsubject.text;
      }
      var searchSegData = applicationManager.getDataProcessorUtility().commonSegmentSearch("requestsubjecttext",searchtext,data);
      this.setDataToSegment(searchSegData);
    }
    else if(!searchtext && requestsDetails){
      this.setDataToSegment(requestsDetails);
    }
    this.segData = requestsDetails;
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  resetNoMessageLabelBasedOnData : function(data){
    if(data && data.length>0){
      this.hideNoMessagesLabel();
    }
    else{
      this.showNoMessagesLabel();
    }
  },
  onInboxTabSelection :function () {
    applicationManager.getPresentationUtility().showLoadingScreen();
    this.view.customSearchbox.tbxSearch.text = "";
    var messagesModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("MessagesUIModule");
    messagesModule.presentationController.getInboxRequests();
  },
  onDeletedTabSelection: function () {
    applicationManager.getPresentationUtility().showLoadingScreen();
    this.view.customSearchbox.tbxSearch.text = "";
    var messagesModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("MessagesUIModule");
    messagesModule.presentationController.getDeleteRequests();
  },
  navToNewMessage:  function () {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var messagesMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("MessagesUIModule");
    var navManager = applicationManager.getNavigationManager();
    navManager.setEntryPoint("messageCategory","frmMessages");
    messagesMod.presentationController.getCategories();
  },
  navigateToAccountsDashboard: function () {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
    accountMod.presentationController.showDashboard();
  },
  setDataToSegment : function(segmentData){
    var dataMap = this.getDataMap();
    this.animateRight(applicationManager.getPresentationUtility().rowIndexforSwipe);
    var messagesMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("MessagesUIModule");
    for (var i = 0; i < segmentData.length; i++) {
      let isPriorityMsg = parseInt(segmentData[i].priorityCount) > 0 ;
      segmentData[i].flxDelete={};
      segmentData[i].flxReply={};
      segmentData[i].lblDelete={"text": "Delete"};
      segmentData[i].lblReply={"text": "Reply"};
      segmentData[i].imgDelete={"scr": "deleteicon.png"};
      segmentData[i].imgReply={"scr": "replyicon.png"};
      segmentData[i].imgMsgIcon = {"isVisible" :  isPriorityMsg};
      segmentData[i].requestsubject.maxwidth = isPriorityMsg ? "228dp" : "188dp";
      segmentData[i].requestsubject.left = isPriorityMsg ? "10dp" : "20dp";
    }
    for(var i=0;i<segmentData.length;i++){
      segmentData[i].flxDelete.onClick = this.onDelete;
       segmentData[i].flxReply.onClick = this.onSwipeReply;
    }
    if(segmentData)
    {
      this.view.segMessagesInbox.widgetDataMap = dataMap;
      this.view.segMessagesInbox.setData(segmentData);
      this.resetNoMessageLabelBasedOnData(segmentData);
      this.segData = segmentData;
    }
    else
    {
      this.resetNoMessageLabelBasedOnData(segmentData);
    }
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    this.view.forceLayout();
  },
  navToMessageDetails: function (param) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var selectedMessageRow = param;
    var data = this.view.segMessagesInbox.data;
    //var selectedMessageRow = this.view.segMessagesInbox.selectedIndex[0];
   // var requestIdForSelectedRequest = this.view.segMessagesInbox.selectedRowItems[0].id;
   var requestIdForSelectedRequest = data[selectedMessageRow].id;
   //var subjectForSelectedRequest = this.view.segMessagesInbox.selectedRowItems[0].requestsubject;
   var subjectForSelectedRequest = data[selectedMessageRow].requestsubject;
   var category = data[selectedMessageRow].requestcategory_id;
   subjectForSelectedRequest.skin = "sknLbl424242SSP26px";
   var isPriorityMessage = data[selectedMessageRow].isPriorityMessage;
   // var unreadMessagesCount = parseInt(this.view.segMessagesInbox.selectedRowItems[0].unreadMsgsCount);
    var unreadMessagesCount = parseInt(data[selectedMessageRow].unreadMsgsCount);
    var navManager = applicationManager.getNavigationManager();
    var data =  navManager.getCustomInfo("frmMessagesDetails");
    if(!data)
      {
        data = {};
      }
    data.requestid = requestIdForSelectedRequest;
    data.subject = subjectForSelectedRequest;
    data.unreadMessagesCount = unreadMessagesCount;
    data.category=category;
    data.isPriorityMessage = isPriorityMessage;
    navManager.setCustomInfo("frmMessagesDetails",data);
    var MessageModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("MessagesUIModule");
    MessageModule.presentationController.getMessagesForARequest(requestIdForSelectedRequest,selectedMessageRow);
  },
  showNoMessagesLabel : function(){
    this.hideMessagesFlex();
    this.showNoTransactionsLabel();
  },
  hideNoMessagesLabel : function(){
    this.hideNoTransactionsLabel();
    this.showMessagesFlex();
  },
  getDataMap : function()
  {
    var dataMap = {
      "flxDelete": "flxDelete",
      "flxDeleteReply": "flxDeleteReply",
      "flxMessagesMain": "flxMessagesMain",
      "flxMessagesShadow": "flxMessagesShadow",
      "flxReply": "flxReply",
      "flxmain": "flxmain",
      "imgDelete": "imgDelete",
      "imgReply": "imgReply",
      "lblDelete": "lblDelete",
      "lblReply": "lblReply",
      "lblRequestId":"id",
      "lblDescription": "firstMessage",
      "lblSubject": "requestsubject",
      "lblTime": "recentMsgDate",
      "lblNumber":"unreadMsgsPerThread",
      "unreadMsgsCount":"unreadMsgsCount",
      "lblReqId":"id",
      "lblCategory":"requestcategory_id",
      "imgMsgIcon": "imgMsgIcon"
    };
    return dataMap;
  },
  showNoTransactionsLabel:function(){
    this.view.flxNoTransactions.setVisibility(true);
  },
  hideNoTransactionsLabel:function(){
    this.view.flxNoTransactions.setVisibility(false);
  },
  showMessagesFlex:function(){
    this.view.flxMessages.setVisibility(true);
  },
  hideMessagesFlex:function(){
    this.view.flxMessages.setVisibility(false);
  },
  bindGenericSuccess : function(msg)
  {
    //applicationManager.getPresentationUtility().dismissLoadingScreen();
    applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,msg);
  },
  showPopup : function(){
    var navManager = applicationManager.getNavigationManager();
    var messageData = navManager.getCustomInfo("frmMessages");
    if(messageData.messagePopupType && messageData.messagePopupType !== "")
    {
      var popupMessage;
      switch (messageData.messagePopupType)
      {
        case "deletePermanentlySuccess" :
          popupMessage = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Messages.DeletePermanentlyPopup");
          break;
        case "deleteSuccess" :
          popupMessage = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Messages.DeletePopup");
          break;
        case "restoreSuccess" :
          popupMessage = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Messages.MessageRestoredPopup");
          break;
        case "sendSuccess" :
          popupMessage = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Messages.MessageSentPopup");
          break;
      }
      messageData.messagePopupType = "";
      navManager.setCustomInfo("frmMessages",messageData);
      this.bindGenericSuccess(popupMessage);
    }
  },
  onSwipeOfRequest : function () {
    this.animateReplyDelete(2);
  },
  animateRight : function(rowNumber){
    var animObj = this.getTransAnimDefinition("0%");
    this.view.segMessagesInbox.animateRows({
      rows: [{
        sectionIndex:0,
        rowIndex: rowNumber
      }],
      widgets: ["flxMessagesMainSwipe"],
      animation : this.swipeObj
    });
  },
  getTransAnimDefinition : function(leftVal) {
    var transAnimDef1 = {
      "100": {
        "left": leftVal,
        "stepConfig": {
          "timingFunction": kony.anim.LINEAR
        },
        "rectified": true
      }
    };
    var animConf = {
      "delay": 0,
      "iterationCount": 1,
      "fillMode": kony.anim.FILL_MODE_FORWARDS,
      "duration": 0.5
    };
    this.swipeObj = {
      definition: kony.ui.createAnimation(transAnimDef1),
      config :animConf,
      callbacks:null
    };
  },
  };
});