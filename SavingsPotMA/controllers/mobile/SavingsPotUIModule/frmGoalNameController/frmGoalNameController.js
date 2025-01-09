define({ 

  init : function(){
    var scope=this;
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"CALLBACK",currentForm,scope.navigateCustomBack);
  },
  preShow : function(){
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
    }
    else{
      this.view.title=kony.i18n.getLocalizedString("i18n.savingspot.NameYourGoal");
      this.view.flxHeader.isVisible = false;
    }
    var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
    SavingsPotMod.presentationController.targetAmount = "";
    SavingsPotMod.presentationController.targetPeriod = "";
    SavingsPotMod.presentationController.periodicContribution = "";
    var flow=SavingsPotMod.presentationController.getSavingsFlow();
    if(flow){
     var navManager = applicationManager.getNavigationManager();
	var goalDetails = navManager.getCustomInfo({"friendlyName" : "frmSavingsGoalViewDetails", "appName" : "SavingsPotMA"});
   this.setReference(goalDetails.potName);
    }
    else{
    var savingsObj= SavingsPotMod.presentationController.getCreateObject();
    this.setReference(savingsObj.potName);
    }
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    this.view.btnContinue.onClick=this.btnContinueFunction;
    this.view.txtBox.onTextChange=this.onNameChange;
    var specialCharactersSet = "!@#&*_'-.~^|$%()+=}{][/|?,><`:;\"\\";
    this.view.txtBox.restrictCharactersSet = specialCharactersSet.replace("!@#&*_'-.", '');
    this.view.customHeader.flxBack.onTouchEnd = this.navigateCustomBack;
    this.view.customHeader.btnRight.onClick = this.onCancelClick;
    this.view.flxError.setVisibility(false);
  },
  postShow:function(){
    this.onNameChange();
  },
     setReference : function(potName){
    if(potName)
    {
      this.view.txtBox.text = potName;
    }
    else
      this.view.txtBox.text = "";
  },
  navigateCustomBack: function() {
    var SavingsPotMod = applicationManager.getModulesPresentationController("SavingsPotUIModule");
    SavingsPotMod.commonFunctionForgoBack();
  },
  btnContinueFunction:function(){
     this.view.flxError.setVisibility(false);
    var error;
          var navManager = applicationManager.getNavigationManager();
      var potDetails = navManager.getCustomInfo({"friendlyName" : "frmMySavingsPot", "appName" : "SavingsPotMA"});
     var goalNames = this.view.txtBox.text;
     for (var TitleNo in potDetails){
       var data=potDetails[TitleNo];
       if((data.potName && data.potName.toLowerCase() || data.name && data.name.toLowerCase() ) === goalNames.toLowerCase()){
         error="YES";
       }
     }
    if(error){
      this.view.flxError.setVisibility(true);
    }
      else{
    if(this.view.txtBox.text!==null && this.view.txtBox.text!=='')
      {
        var goalName = this.view.txtBox.text;
        var previousForm = navManager.getPreviousForm();
        var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
		var flow=SavingsPotMod.presentationController.getSavingsFlow();
        if(flow)
          { 
		var goalDetails = navManager.getCustomInfo({"friendlyName" : "frmSavingsGoalViewDetails", "appName" : "SavingsPotMA"});
    goalDetails.potName=goalName;
    navManager.setCustomInfo({"friendlyName" : "frmSavingsGoalViewDetails", "appName" : "SavingsPotMA"},goalDetails);
            SavingsPotMod.presentationController.navToBudgetAmount(goalName,{"friendlyName" : "frmEditSavingsGoal", "appName" : "SavingsPotMA"});
      }
        else{
       if (previousForm === "frmCreateGoalVerifyDetails") {      
        SavingsPotMod.presentationController.navToBudgetAmount(goalName,{"friendlyName" : "frmCreateGoalVerifyDetails", "appName" : "SavingsPotMA"});
       }
        else {
        SavingsPotMod.presentationController.navToBudgetAmount(goalName,{"friendlyName" : "frmOptimizeGoal", "appName" : "SavingsPotMA"});
       }}
       }}
  },
  onCancelClick : function(){
    var navManager = applicationManager.getNavigationManager();
      var previousForm = navManager.getPreviousForm();
      var SavingsPotMod = applicationManager.getModulesPresentationController("SavingsPotUIModule");
	var flow=SavingsPotMod.getSavingsFlow();
        if(flow)
          {  SavingsPotMod.setSavingsFlow("");
             SavingsPotMod.clearCreateData();
             SavingsPotMod.commonFunctionForNavigation({"friendlyName" : "frmSavingsGoalViewDetails", "appName" : "SavingsPotMA"});
          }
    else{
    if (previousForm === "frmCreateGoalVerifyDetails") {    
          SavingsPotMod.commonFunctionForNavigation({"friendlyName" : "frmCreateGoalVerifyDetails", "appName" : "SavingsPotMA"});
       } else {
         SavingsPotMod.clearCreateData();
         var createBudgetPermission  = applicationManager.getConfigurationManager().checkUserPermission("BUDGET_POT_CREATE");
         (createBudgetPermission)?navManager.navigateTo({"friendlyName" : "frmSavingsType", "appName" : "SavingsPotMA"}):navManager.navigateTo({"friendlyName" : "frmMySavingsPot", "appName" : "SavingsPotMA"});       }  }
  },
  onNameChange : function(){
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
  }

});