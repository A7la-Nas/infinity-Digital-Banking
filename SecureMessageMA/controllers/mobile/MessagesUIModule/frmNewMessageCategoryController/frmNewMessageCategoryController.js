define({
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  frmMessagesCategoryPreShow : function(){
    this.setPreshowData();
    this.setFlowActions();
    this.renderTitleBar();
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  renderTitleBar :function(){
    var deviceUtilManager = applicationManager.getDeviceUtilManager();
    var isIphone = deviceUtilManager.isIPhone();
    if(!isIphone){
      this.view.flxHeader.isVisible = true;
    }
    else{
      this.view.flxHeader.isVisible = false;
    }
  },
  setPreshowData : function(){
    this.setCategoryData();
    this.view.customHeader.lblLocateUs.contentAlignment = 5;
    this.view.customHeader.flxSearch.isVisible = false;
    this.view.customHeader.btnRight.text = kony.i18n.getLocalizedString("kony.mb.common.Cancel");
    this.view.customHeader.btnRight.isVisible = true;
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
      this.view.flxPickCategory.top = "56dp";
      this.view.flxCategory.top = "96dp";
    }
    else{
      this.view.flxHeader.isVisible = false;
      this.view.flxPickCategory.top = "0dp";
      this.view.flxCategory.top = "46dp";
    }
  },
  setFlowActions : function(){
    var scopeObj = this;
    this.view.customHeader.flxBack.onClick = this.goBack;
    this.view.customHeader.btnRight.onClick = this.navToMessages;
    this.view.segCategory.onRowClick = this.onCategoryClick;
  },
  goBack : function(){
    var navManager = applicationManager.getNavigationManager();
    navManager.goBack();
  },
  navToMessages : function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    if(navManager.getEntryPoint("messageCategory") === "frmMessages")
    {
      var MessageModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("MessagesUIModule");
      if(MessageModule.presentationController.messageTabSelected === "INBOX")
      {
        MessageModule.presentationController.getInboxRequests();
      }
      else if(MessageModule.presentationController.messageTabSelected === "DELETED")
      {
        MessageModule.presentationController.getDeleteRequests();
      }
    }
    else
    {
      navManager.goBack();
    }
  },
  onCategoryClick : function(){
      var navManager = applicationManager.getNavigationManager();
      var data = this.view.segCategory.selectedItems[0].categoryId;
      var category=this.view.segCategory.selectedItems[0].lblCategory;
 	    navManager.setCustomInfo("frmNewMessage",data);
      navManager.setCustomInfo("frmNewMessage1",category);
      var messagesMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("MessagesUIModule");
      messagesMod.presentationController.commonFunctionForNavigation("frmNewMessage");
  },
  setCategoryData : function(){
    var dataMap = {
      "flxArrow": "flxArrow",
      "flxCategory": "flxCategory",
      "lblSeparator": "lblSeparator",
      "imgArrow": "imgArrow",
      "lblCategory": "lblCategory",
    };
    var navManager = applicationManager.getNavigationManager();
    this.view.segCategory.removeAll();
 	var categoriesData = navManager.getCustomInfo("frmNewMessageCategory");
    var data = [];
    if(categoriesData && categoriesData !== null){
    for(var i=0;i<categoriesData.length;i++)
      {
       var temp = {
        "lblSeparator": ".",
        "imgArrow": {"src" : "chevron.png"},
        "lblCategory": categoriesData[i].Name,
        "template": "flxCategory",
        "categoryId": categoriesData[i].id
      };
       data.push(temp);
      }
    this.view.segCategory.widgetDataMap = dataMap;
    this.view.segCategory.setData(data);
    }
    }
});