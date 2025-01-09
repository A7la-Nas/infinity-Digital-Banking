  define({
    init : function(){
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    },
    frmPreshow : function()
    {
      if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone")
      {
        this.view.flxHeader.isVisible = false;
       // this.view.flxFooter.isVisible = true;
      }
      else
      {
        this.view.flxHeader.isVisible = true;
        //this.view.flxFooter.isVisible = false;
      }
      if(kony.i18n.getCurrentLocale() === "ar_AE"){
          this.view.customHeader.imgBack.src = "chevronwhiteright.png";
      }else{ 
          this.view.customHeader.imgBack.src = "backbutton.png";
      }
      this.populateNickName();
      var navManager = applicationManager.getNavigationManager();
      this.initActions();
      var currentForm = navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().logFormName(currentForm);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    initActions: function () {
      var scope=this;
      this.view.customHeader.flxBack.onClick=function(){
        var navManager = applicationManager.getNavigationManager();
        navManager.goBack();
      };
      this.view.customHeader.btnRight.onClick=function(){
        scope.onClickCancel();
      };
      this.view.tbxNickname.onTextChange = this.nickNameOnTextChange;
      this.view.btnSave.onClick = this.btnSaveOnClick;
      this.view.imgCross.onTouchStart = this.clearText;
    },
    onClickCancel : function(){
      var navManager = applicationManager.getNavigationManager();
      navManager.goBack();
    },
    populateNickName : function(){
      var navManager = applicationManager.getNavigationManager();
      var data = navManager.getCustomInfo("frmEStmtAccountDetails");
      var nickName = (data && data.nickName && data.nickName!== "" &&data.nickName!== null)?data.nickName:"";
      this.view.tbxNickname.text = nickName;
      if(nickName.length === 0)
      {
        this.view.btnSave.skin = "sknBtna0a0a0SSPReg26px";
        this.view.btnSave.setEnabled(false);
      }
      else
      {
        this.view.btnSave.setEnabled(true);
        this.view.btnSave.skin = "sknBtn0095e4RoundedffffffSSP26px";
      }
    },
    nickNameOnTextChange : function(){
      var nickName = this.view.tbxNickname.text;
      if(nickName.length === 0){
        this.view.btnSave.skin = "sknBtna0a0a0SSPReg26px";
        this.view.btnSave.setEnabled(false);
      }
      else{
        this.view.btnSave.setEnabled(true);
        this.view.btnSave.skin = "sknBtn0095e4RoundedffffffSSP26px";
      }
    },
    clearText : function(){
      this.view.tbxNickname.text = "";
    },
    btnSaveOnClick : function(){
      applicationManager.getPresentationUtility().showLoadingScreen();
      var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "ManageArrangementsUIModule", "appName" : "ManageArrangementsMA"});
      var navManager = applicationManager.getNavigationManager();
      var nickName = this.view.tbxNickname.text;
      var data = navManager.getCustomInfo("frmEStmtAccountDetails");
      var accountID = (data && data.accountID && data.accountID!== "" &&data.accountID!== null)?data.accountID:"";
      var eStatementEnable=(data && data.eStatementEnable && data.eStatementEnable!== "" &&data.eStatementEnable!== null)?data.eStatementEnable:"";
      if(eStatementEnable === "false") eStatementEnable = '0';
      var email= (data && data.email && data.email!==null && data.email !=="" )?data.email:"";
      var accountManager = applicationManager.getAccountManager();
      var accountData = accountManager.getInternalAccountByID(accountID);
      var updatedSettings={"nickName":nickName,"accountID":accountID,"eStatementEnable":eStatementEnable,"email":email,"favouriteStatus":accountData.favouriteStatus};
      settingsMode.presentationController.updateUserAccountSettingsForEstatements(updatedSettings,"updateName");
      navManager.navigateTo({"friendlyName": "ManageArrangementsUIModule/frmEStmtAccountDetails","appName": "ManageArrangementsMA"});
    }
  });