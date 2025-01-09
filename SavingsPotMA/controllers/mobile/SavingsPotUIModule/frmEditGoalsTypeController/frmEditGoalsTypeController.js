define({

  init: function () {
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    },

  preShow: function () {
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
    }
  applicationManager.getPresentationUtility().showLoadingScreen();
    this.initActions();

  },
  initActions: function () {
    this.view.segGoalsType.onRowClick = this.segRowClick;
    this.view.customHeader.flxBack.onClick = this.onBack;
    this.view.customHeader.btnRight.onClick = this.onCancelClick;
  },
  postShow:function(){
     var GoalsTypes=[];
    var navManager = applicationManager.getNavigationManager();
    //var category=navManager.getCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "frmEditGoalsType"});
    var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
    var category = SavingsPotMod.presentationController.getPotCategory();
	var goalDetails = navManager.getCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "frmSavingsGoalViewDetails"});
	var selectedType=goalDetails.savingsType;
    var selImg;
         for (var TitleNo in category){
       var data=category[TitleNo];
           var TitImge;
           switch(data.name){
             case "EDUCATION":
               TitImge="educationgoal.png";
               break;
             case "FAMILY_EXPENSES":
               TitImge="familyexpenses.png";
               break;
             case "HOUSING":
               TitImge="house.png";
               break;
             case "INVESTMENT":
               TitImge="retirement.png";
               break;
             case "TRAVEL":
               TitImge="travelgoal.png";
               break;
             case "VEHICLE":
               TitImge="vehicle.png";
               break;
             default:
               TitImge="other.png";
           }           
           if(data.description.toLowerCase() === selectedType.toLowerCase()){
             selImg="tickmark_green.png";
              }
              else{
             selImg="";
              }
    var storeData = { 
          Title: data.description,
			Name: data.name,
          img:selImg,
		TitImg: TitImge
        };
    GoalsTypes.push(storeData);
    }
        this.view.segGoalsType.widgetDataMap={
      lblTitle: "Title",
      lblName: "Name",
      imgArrow:"img",
      imgTitle:"TitImg"
    };
this.view.segGoalsType.setData(GoalsTypes);
 applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  onBack : function () {
    var navigationMan=applicationManager.getNavigationManager();
    navigationMan.goBack();
  },
    onCancelClick : function(){
            var SavingsPotMod = applicationManager.getModulesPresentationController("SavingsPotUIModule");
      SavingsPotMod.setSavingsFlow("");       
      SavingsPotMod.clearCreateData();
		var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "frmSavingsGoalViewDetails"}); 
  },
  segRowClick: function(){
    var datum=this.view.segGoalsType.selectedRowItems[0];
    var navManager = applicationManager.getNavigationManager();
	var goalDetails = navManager.getCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "frmSavingsGoalViewDetails"});
    goalDetails.savingsType=datum.Title;
    goalDetails.savingsName=datum.Name;
    navManager.setCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "frmSavingsGoalViewDetails"},goalDetails);
     var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
	SavingsPotMod.presentationController.navToGoalName(datum.Title,datum.Name, {"appName" : "SavingsPotMA", "friendlyName" : "frmEditSavingsGoal"});
  }
});
