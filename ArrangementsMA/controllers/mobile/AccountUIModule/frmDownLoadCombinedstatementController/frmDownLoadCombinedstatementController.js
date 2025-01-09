define({ 
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },

  preshow: function () {
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
    } else{
      this.view.flxHeader.isVisible = false;
    }
    this.view.customHeader.lblLocateUs.centerX = "50%";
    var navMan=applicationManager.getNavigationManager();
    navMan.setCustomInfo("CombinedStatementStartDate" , "");
    navMan.setCustomInfo("CombinedStatementEndDate" , "");
    this.view.btnBackToStatement.onClick = this.backToStatements;
    this.view.onDeviceBack = function () { kony.print("Device Back")};
  },

  backToStatements : function(){
    var navMan = applicationManager.getNavigationManager();
    navMan.setCustomInfo("isGenerateNewStatementInvoked" , true);
    navMan.navigateTo("frmAccStatements");
  }
 });