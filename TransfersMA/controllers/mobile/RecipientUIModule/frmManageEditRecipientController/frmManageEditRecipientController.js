define({
    init : function(){
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    },
    preShow: function () {
        if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
            this.view.flxHeader.isVisible = false;
        }
		this.populateName();
        this.initActions();
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        var navManager = applicationManager.getNavigationManager();
        var currentForm=navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().logFormName(currentForm);
    },
  	initActions: function () {
        var scope = this;
        this.view.customHeader.flxBack.onClick = function () {
            var navMan=applicationManager.getNavigationManager();
			navMan.goBack();
        }
        this.view.customHeader.btnRight.onClick = function () {
          scope.onClickCancel();
       }
        this.view.btnSave.onClick = function(){
          	applicationManager.getPresentationUtility().showLoadingScreen();
          var p2pMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonUIModule");
          if(p2pMod.presentationController.getFlowType()==="editP2P"){
            var p2pMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonUIModule");
            p2pMod.presentationController.updateP2PRecipient(scope.view.txtRecipientName.text);
          }
			else{
                var transferModulePresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
				transferModulePresentationController.updateBenificiaryNickName(scope.view.txtRecipientName.text);
			}
        }
    },
	populateName:function(){
      var p2pMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonUIModule");
     //var specialCharactersSet = "~#^|$%&*!@()_-+=}{][/|?,.><`':;\"\\";
     var specialCharactersSet = "~#^|$%&*!@()_-+=}{][/|?,.><`':;\"\\\u0600-\u06FF";
      this.view.txtRecipientName.restrictCharactersSet = specialCharactersSet.replace("!@#&*_'-.,", '');
      if(p2pMod.presentationController.getFlowType()==="editP2P"){
      this.view.txtRecipientName.maxTextLength=50;
      var recipientData=p2pMod.presentationController.getP2PPayeeDetails();
		if(recipientData && recipientData.nickName){
			this.view.txtRecipientName.text=recipientData.nickName;
		}
      }
     else{
        this.view.txtRecipientName.maxTextLength=50;
        var transferModPresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
    	var benificiaryDetails=transferModPresentationController.getBenificiaryData();
        if(benificiaryDetails && benificiaryDetails.nickName){
        	this.view.txtRecipientName.text=benificiaryDetails.nickName;
       }
      }
	},
  onClickCancel:function(){
    var navMan=applicationManager.getNavigationManager();
    navMan.goBack();
  },
  
  showErrorPopup: function(err){
    applicationManager.getDataProcessorUtility().showToastMessageError(this,err);
  }
});