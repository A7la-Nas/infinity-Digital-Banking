define({
//  timerCounter:0,
    init : function(){
		var navManager = applicationManager.getNavigationManager();
		var currentForm=navManager.getCurrentForm();
		applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
	},
   faceIdPreShow:function(){
//     this.view.btnEnable.setVisibility(false);
//     this.view.flxBottomContainer.setVisibility(true);
//     this.view.flxSeperator.setVisibility(true);
    	this.view.customHeader.btnRight.setVisibility(true);
    	if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      		this.view.flxHeader.isVisible = true;
    	}
    	else{
      		this.view.flxHeader.isVisible = false;
   		 }
     	this.view.btnSetAsDefault.onClick = this.btnSetAsDefaultOnClick;
        var navManager = applicationManager.getNavigationManager();
		var flags = navManager.getCustomInfo("frmDevRegFaceIdSetAsDefault");
		if(flags){
          if((flags.popUpMsg!==null)&&(flags.popUpMsg!==""))
         {
             var scopeObj=this;
             applicationManager.getDataProcessorUtility().showToastMessageSuccess(scopeObj,flags.popUpMsg);
        }
	    flags.popUpMsg=null;
         navManager.setCustomInfo("frmDevRegFaceIdSetAsDefault",flags);
		}
	  	var currentForm = navManager.getCurrentForm();
	    applicationManager.getPresentationFormUtility().logFormName(currentForm);
	  	applicationManager.getPresentationUtility().dismissLoadingScreen();
	},
  	btnSetAsDefaultOnClick:function()
  	{
			 var navManager = applicationManager.getNavigationManager();
             var authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
              authMod.presentationController.setBiometricCredentials();
             authMod.presentationController.setFaceIdflag(true);
             authMod.presentationController.setDefaultMode("faceid");
             var data = {loginMode:"faceid"};
             navManager.setCustomInfo("frmDefaultLogin",data);
       	     authMod.presentationController.commonFunctionForNavigation("frmDefaultLogin");
    },
    btnSkipOnClick:function()
  	{
  		 applicationManager.getPresentationUtility().showLoadingScreen();
    	 var authMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
     	authMode.presentationController.defaultLoginToAccounts();
  	},
    imgbackAction : function(){
  		  var navManager = applicationManager.getNavigationManager();
           navManager.goBack();
   }
 });