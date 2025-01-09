define({ 

  _isApprovalsOrRequests : "",
  _constantsSkin : {"headerImgUp" : "arrowupblue.png","imgReject" : "cancelreject.png","imgApprove" : "approvetick.png", "flxApproveSkin": "sknUnderlinef639afTab","flxRejectSkin" : "sknflxf6f6f6Bcg"},
  _approvalsReqModule: null,  
  /*
     *init is called when the form is loaded , initialisation happen here
     *
     */
  init : function(){
    try{
      kony.print("Entered init");
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();

      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
      this._approvalsReqModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ApprovalsReqUIModule");

      this.view.preShow = this.preShowForm;

    }catch(e){
      kony.print("Exception in init::"+e);}
  },

  //preShowForm is called when the form is pre loaded 
  preShowForm : function(){
    try{
      kony.print("Entered preShowForm");
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().logFormName(currentForm);

     /* this.initActions();
      this.resetForm();
      this.fetchDataBasedOnPermissions();*/
    }catch(e){
      kony.print("Exception in preShowForm::"+e);}
  },
  
  


});