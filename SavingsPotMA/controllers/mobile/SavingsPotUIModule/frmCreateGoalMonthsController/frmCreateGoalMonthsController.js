define({
  keypadString:'',
  isPeriodUsed : false,
  timerCounter: 0,
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  preShow: function(){
    if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
      this.view.flxHeader.setVisibility(false);
    }
    this.view.btnContinue.onClick =this.continueOnClick;
    this.view.customHeader.flxBack.onClick = this.onBack;
             var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
    var flow=SavingsPotMod.presentationController.getSavingsFlow();
    if(flow){
     var navManager = applicationManager.getNavigationManager();
	var goalDetails = navManager.getCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "frmSavingsGoalViewDetails"});
   this.setReference(goalDetails.targetPeriod);
    }
    else{
      var savingsObj= SavingsPotMod.presentationController.getCreateObject();
    this.setReference(savingsObj.targetPeriod);
        }
  },
  postShow: function(){
        this.updateAmountValue();
  }, 
  setReference : function(targetPeriod){
    if(targetPeriod)
    {
      this.keypadString = targetPeriod;
      if (targetPeriod == "0"){
            this.view.lblAmount.text = "";
            this.keypadString = ""; 
         }
    }
    else{
      this.view.lblAmount.text = "";
      this.keypadString = "";
    }
  },
   onBack : function () {
    var navigationMan=applicationManager.getNavigationManager();
    navigationMan.goBack();
  },
  setKeypadChar: function (char) {
    var char = char.toString();
    if(this.keypadString===''){
       this.keypadString=char;
       }else{
         this.keypadString=this.keypadString+char;
       }
    this.updateAmountValue();
  },
  clearKeypadChar: function () {
    if(this.keypadString ==='') return;
   var value = (this.keypadString / 10).toString();
     if(parseInt(value)>0){
       var value1=value.split('.')[0];
    this.keypadString=value1;
     var count=this.keypadString.split("");
    if(count===0){
      this.keypadString='';
      }
    }
else{
    this.keypadString='';
}
    this.updateAmountValue();
  },
  updateAmountValue: function(){
    if(this.keypadString===''){
      this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
      this.view.btnContinue.setEnabled(false);
      this.view.lblAmount.text = this.view.keypad.formatAmount(this.keypadString);
    }else{
      var finalValue = this.keypadString;
      this.view.btnContinue.skin = "sknBtn0095e4RoundedffffffSSP26px";
      this.view.btnContinue.setEnabled(true);
      this.view.lblAmount.text = this.view.keypad.formatAmount(finalValue);
    }
  },
     
  continueOnClick :function()
  {
     var targetPeriod = this.view.lblAmount.text;
      var navManager = applicationManager.getNavigationManager();
         var SavingsPotModule = applicationManager.getModulesPresentationController("SavingsPotUIModule");
     SavingsPotModule.setSavingsType("targetPeriod");
     var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
	SavingsPotMod.presentationController.targetPeriod = targetPeriod;
    var flow=SavingsPotMod.presentationController.getSavingsFlow();
        if(flow)
          { 
		var goalDetails = navManager.getCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "frmSavingsGoalViewDetails"});
		goalDetails.targetPeriod=targetPeriod;
    navManager.setCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "frmSavingsGoalViewDetails"},goalDetails);
	SavingsPotMod.presentationController.navToOptimizeGoal(targetPeriod,{"appName" : "SavingsPotMA", "friendlyName" : "frmEditOptimizeGoal"});
          }
    else{
        var previousForm = navManager.getPreviousForm();
        if (previousForm === "frmCreateGoalVerifyDetails") {
         SavingsPotModule.initializeStateData(true,{"appName" : "SavingsPotMA", "friendlyName" : "frmOptimizeGoal"});
        }
	SavingsPotMod.presentationController.navToOptimizeGoalTargetPeriod(targetPeriod,{"appName" : "SavingsPotMA", "friendlyName" : "frmOptimizeGoal"});
    }
  }
});
