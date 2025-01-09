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
	var goalDetails = navManager.getCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "frmSavingsGoalViewDetails"});
      var freqDay=goalDetails.frequencyDay;
       var day = freqDay.substring(0,2);
      this.view.lblSelectedDateValue.text=day;
    },
  continueOnClick:function(){
    var navManager = applicationManager.getNavigationManager();
    var freqDay=this.view.lblSelectedDateValue.text +" " + this.view.lblMonths.text;
	var goalDetails = navManager.getCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "frmSavingsGoalViewDetails"});
    goalDetails.frequencyDay=freqDay;
    navManager.setCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "frmSavingsGoalViewDetails"},goalDetails);
	var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
    SavingsPotMod.presentationController.updateFrequencyDay(freqDay);
	navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "frmEditSavingsGoal"});
},
  selectionMethod:function(){
     this.view.segFrequencyDay.rowFocusSkin = "sknFlxf9f9f9";
    var row=this.view.segFrequencyDay.selectedRowItems[0];
    var rowvalue=row.lblOption;
    if(rowvalue.length==1){
      rowvalue="0"+rowvalue;
    }
     this.view.lblSelectedDateValue.text= rowvalue;
  }
});