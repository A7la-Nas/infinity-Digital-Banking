define({
  init : function(){
		var navManager = applicationManager.getNavigationManager();
		var currentForm=navManager.getCurrentForm();
		applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
	},
  initActions: function () {
    var scope = this;
    this.view.customHeader.btnRight.onClick = this.onClickEdit;
    this.view.flxEditOptions.onClick = function(){
      scope.view.flxEditOptions.isVisible = false;
    };
    this.view.flxCancel.onClick=function(){
      scope.view.flxEditOptions.isVisible = false;
    };
    this.view.customHeader.flxBack.onClick=function(){
      var navManager = applicationManager.getNavigationManager();      
      navManager.goBack();
    };
    this.view.flxEditNickName.onClick=function(){
      applicationManager.getPresentationUtility().showLoadingScreen();
      scope.view.flxEditOptions.isVisible = false;     
      var ManageArrangementsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageArrangementsUIModule");
      ManageArrangementsUIModule.presentationController.commonFunctionForNavigation({"friendlyName": "ManageArrangementsUIModule/frmEStmtEditNickName","appName": "ManageArrangementsMA"});
    };
    this.view.flxChangeEmail.onClick=function(){
      applicationManager.getPresentationUtility().showLoadingScreen();
      scope.view.flxEditOptions.isVisible = false;     
      var ManageArrangementsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageArrangementsUIModule");
      ManageArrangementsUIModule.presentationController.commonFunctionForNavigation({"friendlyName": "ManageArrangementsUIModule/frmEStmtChangeEmail","appName": "ManageArrangementsMA"});
     };
    this.view.btnDisable.onClick =function(){
      var ManageArrangementsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageArrangementsUIModule");
      ManageArrangementsUIModule.presentationController.commonFunctionForNavigation({"friendlyName": "ManageArrangementsUIModule/frmEStmtDisableEStatements","appName": "ManageArrangementsMA"});
     };
    this.view.btnEnable.onClick=function(){
      applicationManager.getPresentationUtility().showLoadingScreen();
      var ManageArrangementsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageArrangementsUIModule");
      ManageArrangementsUIModule.presentationController.commonFunctionForNavigation({"friendlyName": "ManageArrangementsUIModule/frmEStmtEnableEStatements","appName": "ManageArrangementsMA"});
    };
    this.view.flxUnMask.onTouchEnd = function () {
      var navManager = applicationManager.getNavigationManager();
      var data = navManager.getCustomInfo("frmEStmtAccountDetails");
      if (scope.view.imgUnMask.src === "viewactive.png") {
        scope.view.lblAccountNumberValue.text = (data && data.accountID && data.accountID!== "" &&data.accountID!== null)?applicationManager.getDataProcessorUtility().maskAccountNumber(data.accountID):"";
        scope.view.imgUnMask.src = "view.png";
      } else {
        scope.view.lblAccountNumberValue.text = (data && data.accountID && data.accountID!== "" &&data.accountID!== null)?data.accountID:"";
        scope.view.imgUnMask.src = "viewactive.png";
      }
    };
    this.view.flxDismiss.onClick = function(){
      scope.view.flxEdit.isVisible = false;
    };
  },
  frmPreshow : function(){
    if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
            this.view.flxHeader.isVisible = false;
        }
        else{
            this.view.flxHeader.isVisible = true;
        }
        this.initActions();
    if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
      this.view.flxHeader.isVisible = false;
      this.view.flxFooter.isVisible = false;
    }else{
      this.view.flxHeader.isVisible = true;
      this.view.flxFooter.isVisible = false;
    }
    if(kony.i18n.getCurrentLocale() === "ar_AE"){
          this.view.customHeader.imgBack.src = "chevronwhiteright.png";
     }else{ 
          this.view.customHeader.imgBack.src = "backbutton.png";
     }
    this.bindGenericSuccess();
    this.setAcctDetailsData();
    var navManager = applicationManager.getNavigationManager();
    this.initActions();
	var currentForm = navManager.getCurrentForm();
	applicationManager.getPresentationFormUtility().logFormName(currentForm);
	this.view.imgUnMask.src = "view.png";
	applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  setAcctDetailsData : function(){
    var navManager = applicationManager.getNavigationManager();
    var data = navManager.getCustomInfo("frmEStmtAccountDetails");
    if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
      this.view.title=data.nickName;
    }
    this.view.customHeader.lblLocateUs.text=data.nickName;
    this.view.lblAccountNumberValue.text = (data && data.accountID && data.accountID!== "" &&data.accountID!== null)?applicationManager.getDataProcessorUtility().maskAccountNumber(data.accountID):"";
    this.view.lblAccountHolderValue.text = (data && data.accountName && data.accountName!== "" &&data.accountName!== null)?data.accountName:"";
    this.view.lblAccountNickNameValue.text = (data && data.nickName && data.nickName!== "" &&data.nickName!== null)?data.nickName:"";
    this.view.lblReceivingEmailValue.text= (data.email && data.email!==null && data.email !=="" )?data.email:"";
    if (data.eStatementEnable === undefined) {
      data.eStatementEnable = data.eStatementEnable;
    }
    if(data && data.eStatementEnable==="true"){
      this.view.flxReceivingEmail.isVisible=true;
      this.view.lblStatementModeValue.text="E-Statement";
      this.view.btnEnable.isVisible=false;
      this.view.btnDisable.isVisible=true;
    }
    else{
      this.view.flxReceivingEmail.isVisible=false;
      this.view.lblStatementModeValue.text="Paper";
      this.view.btnEnable.isVisible=true;
      this.view.btnDisable.isVisible=false;
    }
    this.view.imgUnMask.src = "view.png";
  },
  onClickEdit:function(){
    var navManager = applicationManager.getNavigationManager();
    var data = navManager.getCustomInfo("frmEStmtAccountDetails");
    var userObj = applicationManager.getUserPreferencesManager();
    var email = userObj.getUserEmail();
       if(applicationManager.getDeviceUtilManager().isIPhone()) {
       var actionSheetObject = new kony.ui.ActionSheet(
                                                       {
                                                       "title":null,
                                                       "message":null,
                                                       "showCompletionCallback": null
                                                       }
                                                       );
		applicationManager.actionSheetObject=actionSheetObject;
       var actionEditNickName = new kony.ui.ActionItem(
                                                       {
                                                       "title":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.accdetails.editNickName"),
                                                       "style":constants.ACTION_STYLE_DEFAULT,
                                                       "action": this.view.flxEditNickName.onClick
                                                       }
                                                       );
       var actionChangeEmail = new kony.ui.ActionItem(
                                                       {
                                                       "title":"Change Email For Statement",
                                                       "style":constants.ACTION_STYLE_DEFAULT,
                                                       "action": this.view.flxChangeEmail.onClick
                                                       }
                                                       );
       var actionCancel = new kony.ui.ActionItem(
                                                 {
                                                 "title":"Cancel",
                                                 "style":constants.ACTION_ITEM_STYLE_CANCEL,
                                                 "action": null
                                                 }
                                                 );
       actionSheetObject.addAction(actionEditNickName);
       if (data && data.eStatementEnable === "true") {
       actionSheetObject.addAction(actionChangeEmail);
       }
       actionSheetObject.addAction(actionCancel);
       actionSheetObject.show();
       }else{
        this.view.flxEditOptions.isVisible = true;
        if (data && data.eStatementEnable === "true") {
            this.view.flxChangeEmail.isVisible = true;
        } else {
            this.view.flxChangeEmail.isVisible = false;
        }
       }
  },
  bindGenericSuccess : function(){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageArrangementsUIModule");
    if(settingsMode.presentationController.eStatementPopup==="enable"){
       applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Settings.enabledeStatements","eStatements has been enabled successfully"));
    }
    else if(settingsMode.presentationController.eStatementPopup==="disable"){
       applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Settings.disabledeStatements","eStatements has been disabled successfully"));
    }
    else if(settingsMode.presentationController.eStatementPopup==="updateEmail"){
       applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Settings.emailIDChanged","Email ID has been changed successfully"));
    }
    else if(settingsMode.presentationController.eStatementPopup==="updateName"){
       applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Settings.updatedNickName","Nickname has been changed successfully"));
    }
    settingsMode.presentationController.eStatementPopup="";
    //this.setDataAfteranOperation();
  },
  /*setDataAfteranOperation : function(){
    var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageArrangementsUIModule");
    var data = settingsMode.presentationController.estatementData;
    if(settingsMode.presentationController.eStatementPopup==="enable"){
      this.view.flxReceivingEmail.isVisible=true;
      this.view.lblStatementModeValue.text="E-Statement";
      this.view.btnEnable.isVisible=false;
      this.view.btnDisable.isVisible=true;
    }
    else if(settingsMode.presentationController.eStatementPopup==="disable"){
      this.view.flxReceivingEmail.isVisible=false;
      this.view.lblStatementModeValue.text="Paper";
      this.view.btnEnable.isVisible=true;
      this.view.btnDisable.isVisible=false;
    }
    else if(settingsMode.presentationController.eStatementPopup==="updateEmail"){
      this.view.lblReceivingEmailValue.text= (data && data.email && data.email!==null && data.email !=="" )?data.email:"";
    }
    else if(settingsMode.presentationController.eStatementPopup==="updateName"){
     this.view.lblAccountNickNameValue.text = (data && data.nickName && data.nickName!== "" &&data.nickName!== null)?data.nickName:"";
    }
  }*/
 });