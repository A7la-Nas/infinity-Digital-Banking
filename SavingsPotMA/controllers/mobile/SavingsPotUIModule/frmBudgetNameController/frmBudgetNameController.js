define({ 

  init : function(){
    var scope=this;
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"CALLBACK",currentForm,scope.navigateCustomBack);
  },
  navigateCustomBack: function() {
    var SavingsPotMod = applicationManager.getModulesPresentationController("SavingsPotUIModule");
    SavingsPotMod.commonFunctionForgoBack();
  },
  preShow : function(){
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
    }
    else{
      this.view.title=kony.i18n.getLocalizedString("i18n.savingspot.NameYourBudget");
      this.view.flxHeader.isVisible = false;
    }
    var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
    var flow=SavingsPotMod.presentationController.getSavingsFlow();
    if(flow){
     var navManager = applicationManager.getNavigationManager();
	var goalDetails = navManager.getCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "frmBudgetPotDetails"});
   this.setReference(goalDetails.potName);
    }
    else{
     var savingsObj= SavingsPotMod.presentationController.getCreateObject();
    this.setReference(savingsObj.potName);
    }
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    this.view.btnContinue.onClick=this.btnContinueFunction;
    this.view.customHeader.flxBack.onTouchEnd = this.navigateCustomBack;
    this.view.customHeader.btnRight.onClick = this.onCancelClick;
    this.view.txtBox.onTextChange = this.ontextChange.bind(this);
    var specialCharactersSet = "!@#&*_'-.~^|$%()+=}{][/|?,><`:;\"\\";
    this.view.txtBox.restrictCharactersSet = specialCharactersSet.replace("!@#&*_'-.", '');
    this.view.flxError.setVisibility(false);
  },
  postShow:function(){
    this.ontextChange();
  },
  onBack : function () {
    var navigationMan=applicationManager.getNavigationManager();
    navigationMan.goBack();
  },
  ontextChange: function(){
     var length = this.view.txtBox.text.length;
     this.view.lblLength.text = length+"/30";
     if(this.view.txtBox.text!==null && this.view.txtBox.text!=='')
    {
      this.view.btnContinue.setEnabled(true);
      this.view.btnContinue.skin = "sknBtn055BAF26px";
    }
    else
    {
      this.view.btnContinue.setEnabled(false);
      this.view.btnContinue.skin = "sknBtna0a0a0SSPReg26px";
    }
  },
   setReference : function(potName){
    if(potName)
    {
      this.view.txtBox.text = potName;
    }
    else
      this.view.txtBox.text = "";
  },
  btnContinueFunction:function(){
         this.view.flxError.setVisibility(false);
    var error;
          var navManager = applicationManager.getNavigationManager();
      var potDetails = navManager.getCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "frmMySavingsPot"});
     var goalNames = this.view.txtBox.text;
     for (var TitleNo in potDetails){
       var data=potDetails[TitleNo];
       if(data.potName==goalNames){
         error="YES";
       }
     }
    if(error){
      this.view.flxError.setVisibility(true);
    }
      else{
       if(this.view.txtBox.text!==null && this.view.txtBox.text!=='')
      {
        var budgetname = this.view.txtBox.text;
        var previousForm = navManager.getPreviousForm();
        var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
		var flow=SavingsPotMod.presentationController.getSavingsFlow();
        if(flow)
          { 
		var goalDetails = navManager.getCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "frmBudgetPotDetails"});
    goalDetails.potName=budgetname;
    navManager.setCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "frmBudgetPotDetails"},goalDetails);
            SavingsPotMod.presentationController.navToBudgetAmount(budgetname,{"appName" : "SavingsPotMA", "friendlyName" : "frmEditBudget"});
      }
        else{
        if (previousForm === "frmCreateBudgetVerifyDetails") {    
          SavingsPotMod.presentationController.navToBudgetAmount(budgetname,{"appName" : "SavingsPotMA", "friendlyName" : "frmCreateBudgetVerifyDetails"});
       } else {
        SavingsPotMod.presentationController.navToBudgetAmount(budgetname,{"appName" : "SavingsPotMA", "friendlyName" : "frmBudgetfundAmount"});
       }
      }}}
  },
  onCancelClick : function(){
      var navManager = applicationManager.getNavigationManager();
      var previousForm = navManager.getPreviousForm();
      var SavingsPotMod = applicationManager.getModulesPresentationController("SavingsPotUIModule");
      var flow=SavingsPotMod.getSavingsFlow();
        if(flow)
          {  
             SavingsPotMod.commonFunctionForNavigation({"appName" : "SavingsPotMA", "friendlyName" : "frmEditBudget"});
          }
    else{
    if (previousForm === "frmBudgetfundAmount") {    
          SavingsPotMod.commonFunctionForNavigation({"appName" : "SavingsPotMA", "friendlyName" : "frmCreateBudgetVerifyDetails"});
       } else {
         SavingsPotMod.clearCreateData();
         var createGoalPermission  = applicationManager.getConfigurationManager().checkUserPermission("GOAL_POT_CREATE");
    	 (createGoalPermission)?navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "frmSavingsType"}):navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "frmMySavingsPot"});
       }    
  }},

});