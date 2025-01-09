define({
  
init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
 
  preshow:function(){
    
        if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
            this.view.flxHeader.isVisible = true;
        } else {
            this.view.flxHeader.isVisible = false;
        }
        var controller = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
        controller.getStopChequeReason();
     
       // this.segmentRowClick();
        this.initActions();
  
  },
  initActions:function(){
        this.view.customHeader.flxBack.onClick =this.backOnClick;
//     this.view.customHeader.flxBack.onClick = function() {
//       var controller = applicationManager.getModulesPresentationController("ChequeManagementModule");
//          controller.commonFunctionForgoBack();
//        };
        
    this.view.customHeader.btnRight.onClick = this.onCancelClick;
  },
  backOnClick: function() {
        var loggerManager = applicationManager.getLoggerManager();
        try {
            var navManager = applicationManager.getNavigationManager();
            var currentForm = navManager.getCurrentForm();
            loggerManager.log("#### start : " + currentForm + " :  backOnClick  ####");
            var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"ArrangementsMA", "moduleName":"AccountUIModule"});
            manageCardsModule.presentationController.commonFunctionForNavigation({"appName":"ArrangementsMA", "friendlyName":"frmAmount"});
        } catch (exc) {
            loggerManager.log("#### in catch " + exc + " ####");
        }
    },
segmentRowClick:function(context){
var scopeObj=this;
var selecteddata = "";
scopeObj.StopChequeReason.forEach(function(item) {
if (scopeObj.view.segOptions.data[context.rowIndex].lblOption===item[0]){
selecteddata =item[1];
}
});
var controller = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
controller.setChequeCancelReason(selecteddata);
controller.getStopChequeFee();
},
  onCancelClick:function(){
    var presentation = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
    presentation.commonCancel();
  },
   bindGenericError: function (errorMsg){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scopeObj = this;
     applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
},

bindStopChequeReason : function(data){
var scopeObj =this;
scopeObj.StopChequeReason =data;
var rowdata=[];
data.forEach(function(item){
 rowdata.push({
   "lblOption" : item[0] ,
   "flxMain" : {
"onClick": function(eventobject, context){
scopeObj.segmentRowClick(context); 
}.bind(this)
}
 })
});
this.view.segOptions.setData(rowdata);
}
 


});