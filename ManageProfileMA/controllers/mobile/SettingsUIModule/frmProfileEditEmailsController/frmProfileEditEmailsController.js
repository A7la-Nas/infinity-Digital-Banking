define({
  timerCounter : 0,
  _Gdata:{},
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  onNavigate : function(param){
    var scope = this;
    if(param === "add")
      scope.successAdd();
    else if(param === "edit")
      scope.successUpdate();
  },
  frmPreShow : function(){
    this.setPreshowData();
    this.setFlowActions();
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  setPreshowData : function(){
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
      this.view.flxMainContainer.top = "56dp";
    }
    else{
      this.view.flxHeader.isVisible = false;
      this.view.flxMainContainer.top = "0dp";
    }
    this.checkForToastMessage();
    this.setEmailsData();
    var configManager = applicationManager.getConfigurationManager();
    if(configManager.isCombinedUser === "true"){
      this.view.flxDetailsMain.top="0dp";
    }else{
      this.view.flxDetailsMain.top="50dp";
    }
    this.view.flxConfirmationPopUp.isVisible=false;
  },
  setFlowActions : function(){
    var scope = this;
    this.view.btnContinue.onClick = function(){
      scope.navToEnterEmail("add");
    };
    this.view.customHeader.flxBack.onClick = function () {
      var navManager = applicationManager.getNavigationManager();
      navManager.goBack();
    };
    this.view.confirmationAlertPopup.onClickflxYes=function(){
      var data=scope._Gdata;
      scope.onSwipeDeleteClick(data);
    };
    this.view.confirmationAlertPopup.onClickflxNo=function(){
      scope.onDeleteSwapeCancel();
    };
    this.view.flxConfirmationPopUp.onClick=function(){
      scope.dummy();
    };
  },
  dummy:function(){
    kony.print("dummy");
  },
  setEmailsData : function(){
    try{
      var dataMap = {
        "lblDetail" : "lblDetail",
        "lblDetailValue" : "lblDetailValue",
        "flxDelete" : "flxDelete",
        "flxDetailsHeader": "flxDetailsHeader",
        "flxHeader": "flxHeader",
        "flxHeaderShadow": "flxHeaderShadow",
        "lblHeader": "lblHeader",
        "flxImgUp":"flxImgUp"
      };
      /*var data = [
      {
        "lblDetail": "Primary Email ID",
        "lblDetailValue": "mante_albin@bednar.io",
        "template" : "flxDetails"
      },
      {
        "lblDetail": "Optional Email ID 01",
        "lblDetailValue": "adella_jaskolski@irwin.biz",
        "template" : "flxDetails"
      },
    ];*/
      var nav = applicationManager.getNavigationManager();
      var data = nav.getCustomInfo('frmProfileEditEmails');
      var temp = data;
      var scope = this;
      var i=0;
      var configManager = applicationManager.getConfigurationManager();
      if(configManager.isCombinedUser === "true"){
        for(i=0;i<data.length;i++){
          for(var j=0;j<data.length;j++){
            temp[j]["index"] = j;
            //temp[j]["flxDelete"] = {"onClick" : scope.onSwipeDeleteClick.bind(scope,data[i][1][j],j)};
            temp[j]["flxDelete"] = {"onClick" : scope.onDeleteSwape.bind(scope,data[i][1][j],j)};
          }

        }
      }else{
        for(i=0;i<data.length;i++){
          temp[i]["index"] = i;
          temp[i]["flxDelete"] = {"onClick" : scope.onSwipeDeleteClick.bind(scope,data[i],i)};
        }
      }
      data = temp;
      this.view.segEmails.widgetDataMap = dataMap;
      if(data.length > 0){
        this.view.segEmails.isVisible = true;
        this.view.lblUSer.text = kony.i18n.getLocalizedString("kony.mb.ProfileEditEmails.USer");
        this.view.segEmails.setData(data);
      }
      else{
        this.view.segEmails.isVisible = false;
        this.view.lblUSer.text = applicationManager.getPresentationUtility().getStringFromi18n('i18n.maps.NoResultsFound');
      }
      if(data.length < 3){
        this.view.btnContinue.isVisible = true;
      }
      else{
        this.view.btnContinue.isVisible  = false;
      }
      this.view.forceLayout();
    }
    catch(er){
      kony.print("catch--->"+er);
    }
  },
  onSwipeDeleteClick : function(data,index){
    var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    settingsMode.presentationController.deleteEmail(data);
  },
  navToEnterEmail : function(param){
    var navigationManager = applicationManager.getNavigationManager();
    navigationManager.setCustomInfo("frmProfileEnterEmailIDFlow",param);
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    settingsMod.presentationController.commonFunctionForNavigation("frmProfileEnterEmailID");
  },
  successUpdate: function () {
    var scopeObj = this;
    this.timerCounter = parseInt(this.timerCounter) + 1;
    var timerId = "timerPopupSuccess" + this.timerCounter;
    this.view.flxPopup.skin = "sknFlx43ce6e";
    this.view.customPopup.imgPopup.src = "confirmation.png";
    this.view.customPopup.lblPopup.text = "email updated successfully";
    this.view.flxPopup.setVisibility(true);
    kony.timer.schedule(timerId, function () {
      scopeObj.view.flxPopup.setVisibility(false);
    }, 3, false);
  },
  successAdd: function () {
    var scopeObj = this;
    this.timerCounter = parseInt(this.timerCounter) + 1;
    var timerId = "timerPopupSuccess" + this.timerCounter;
    this.view.flxPopup.skin = "sknFlx43ce6e";
    this.view.customPopup.imgPopup.src = "confirmation.png";
    this.view.customPopup.lblPopup.text = "email added successfully";
    this.view.flxPopup.setVisibility(true);
    kony.timer.schedule(timerId, function () {
      scopeObj.view.flxPopup.setVisibility(false);
    }, 3, false);
  },
  checkForToastMessage : function(){
    var nav = applicationManager.getNavigationManager();
    var data = nav.getCustomInfo('frmProfileEnterEmailID');
    if(data === "addsuccess"){
      var i18nAdd = applicationManager.getPresentationUtility().getStringFromi18n('kony.profile.addEmailSuccess');
      this.bindViewSuccess(i18nAdd);
    }
    if(data === "updatesuccess"){
      var i18nEdit = applicationManager.getPresentationUtility().getStringFromi18n('kony.profile.editEmailSuccess');
      this.bindViewSuccess(i18nEdit);
    }
    if(data === "deletesuccess"){
      //var i18nEdit = applicationManager.getPresentationUtility().getStringFromi18n('kony.profile.editEmailSuccess');
      this.bindViewSuccess("Email Deleted Successfully");
    }
    nav.setCustomInfo('frmProfileEnterEmailID',null);
    this.view.forceLayout();
  },
  bindViewError : function(msg){
    applicationManager.getDataProcessorUtility().showToastMessageError(this, msg);
  },
  bindViewSuccess : function(msg){
    applicationManager.getDataProcessorUtility().showToastMessageSuccess(this, msg);
  },
  setSegmentOnRowClick : function(rowIndex) {
    var configManager = applicationManager.getConfigurationManager();
    var index;
    var settingsMode;
    if(this.view.segEmails.selectedItems && this.view.segEmails.selectedItems.length>0){
    if(configManager.isCombinedUser === "true"){
      var role= this.view.segEmails.selectedItems[0];
      if(role.isTypeBusiness==="0"){
        index = parseInt(rowIndex);
        settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
        settingsMode.presentationController.navigateToEditEmail(index);
      }
      else{
        kony.print("this is business user email");
      }
    }else{
      var primaryID= this.view.segEmails.selectedItems[0];
      if(primaryID.isPrimary==="true"){
        kony.print("this is primaryId user email");
      }else{
        index = parseInt(rowIndex);
        settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
        settingsMode.presentationController.navigateToEditEmail(index);
      }
    }
    }
  },
  onDeleteSwape : function(){
    this.view.confirmationAlertPopup.lblMessage ="Are you sure do you want to delete this Email ID permanently";
    this.view.flxConfirmationPopUp.isVisible=true;
    if(this.view.segEmails.selectedItems && this.view.segEmails.selectedItems.length>0){
    this._Gdata=this.view.segEmails.selectedItems[0];
      }
  },
  onDeleteSwapeCancel : function(){
    this.view.flxConfirmationPopUp.isVisible=false;
  },

});