define({
    init : function(){
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    },
    preShow: function () {
        if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
            this.view.flxHeader.isVisible = false;
        }
        this.initActions();
   
    },
    initActions: function () {
        this.view.customHeader.flxBack.onClick = function(){
           var navMan=applicationManager.getNavigationManager();
           navMan.goBack();
        };
        this.view.btnContinue.onClick = this.continueOnClick;
       this.view.segFrequencyDay.onRowClick=this.selectionMethod;
        this.setDataToForm();
  },
    goBackNav: function(){
      var navMan=applicationManager.getNavigationManager();
           navMan.goBack();
    },
    setDataToForm: function(){
    var navManager = applicationManager.getNavigationManager();
	var goalDetails = navManager.getCustomInfo({"friendlyName" : "frmSavingsGoalViewDetails", "appName" : "SavingsPotMA"});
      var freqDay=goalDetails.frequencyDay;
       var day = freqDay.substring(17,20);
      this.view.lblSelectedDayValue.text=day;
    },
  continueOnClick:function(){
      var navManager = applicationManager.getNavigationManager();
      var temp= this.view.lblSelectedDayValue.text;
    var freqDay=this.view.lbWeeks.text+ " " +  temp.substring(0,3);
	var goalDetails = navManager.getCustomInfo({"friendlyName" : "frmSavingsGoalViewDetails", "appName" : "SavingsPotMA"});
    goalDetails.frequencyDay=freqDay;
    navManager.setCustomInfo({"friendlyName" : "frmSavingsGoalViewDetails", "appName" : "SavingsPotMA"},goalDetails);
	var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
    SavingsPotMod.presentationController.updateFrequencyDay(freqDay);
	navManager.navigateTo({"friendlyName" : "frmEditSavingsGoal", "appName" : "SavingsPotMA"});
},
    selectionMethod:function(){
         this.view.segFrequencyDay.rowFocusSkin = "sknFlxf9f9f9";
    var row=this.view.segFrequencyDay.selectedRowItems[0];
    var rowvalue=row.lblOption;
     this.view.lblSelectedDayValue.text= rowvalue;
  }
});