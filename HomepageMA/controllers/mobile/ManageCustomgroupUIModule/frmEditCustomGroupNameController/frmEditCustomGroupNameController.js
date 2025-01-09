define({ 
  timerCounter:0,
  nameFlag:0,

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
      this.view.preShow = this.preShowForm;
      this.view.postShow = this.postShowForm;

    }catch(e){
      kony.print("Exception in init::"+e);}
  },
  //preShowForm is called when the form is pre loaded 
  preShowForm : function(){
    try{
      kony.print("Entered preShowForm");
      this.initActions();
      this.resetForm();
    }catch(e){
      kony.print("Exception in preShowForm::"+e);}
  },
  //postShowForm is called when the form is post loaded
  postShowForm : function(){
    try{
      kony.print("Entered postShowForm");
    }catch(e){
      kony.print("Exception in postShowForm::"+e);}
  },
  /*
     *initActions is to bind the actions form widgets
     *
     */
  initActions: function() {
    try {
      kony.print("Entered initActions");
      this.view.btnSaveandUpdate.onClick=this.onclickSaveandUpdate;
      this.view.txtCustomviewname.onTextChange=this.editCustomNameValidation;
      this.view.customHeader.flxBack.onClick=this.navToPrevForm;
      this.view.onDeviceBack=this.navToPrevForm;
    } catch (e) {
      kony.print("Exception in initActions" + e);
    }
  },
  dummyFunction: function() {

  },
  editCustomNameValidation: function() {
    try {
      kony.print("entered navToPrevForm");

      var code, i, len;
      var str;
      str = this.view.txtCustomviewname.text;
      this.nameFlag = 0;
      for (i = 0, len = str.length; i < len; i++) {
        code = str.charCodeAt(i);
        if (!(code > 47 && code < 58) && // numeric (0-9)
            !(code > 64 && code < 91) && // upper alpha (A-Z)
            !(code > 96 && code < 123)) { // lower alpha (a-z)return false;{
          this.nameFlag = 1;
          break;
        }
      }

      if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone" || applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone"){
        if(this.view.txtCustomviewname.text==="" || this.view.txtCustomviewname.text.length >= 51 || this.view.txtCustomviewname.text===null || this.nameFlag===1){
          this.view.btnSaveandUpdate.setEnabled(false);
          this.view.btnSaveandUpdate.skin = "sknBtnOnBoardingInactive";
        }else{
          this.view.btnSaveandUpdate.setEnabled(true);
          this.view.btnSaveandUpdate.skin = "sknBtn0095e4RoundedffffffSSP26px";
        }
      }
    } catch (e) {
      kony.print("exception navToPrevForm" + e);
    }
  },
  /*
     *resetForm is to reset the entire form widgets

     */
  resetForm: function() {
    try {
      kony.print("Entered resetForm");
      var navMan=applicationManager.getNavigationManager();
      var customviewName = navMan.getCustomInfo("customViewDetails");
      var selectedCustomeView = applicationManager.getNavigationManager().getCustomInfo("editCustomRetainSelectionCheck");
      this.retainFilterSelectionFlag = selectedCustomeView == customviewName.customviewName ? true : false;     
      this.view.txtCustomviewname.text = customviewName.customviewName;
      this.view.btnSaveandUpdate.setEnabled(false);
      this.view.btnSaveandUpdate.skin = "sknBtnOnBoardingInactive";
      this.view.flxPopup.isVisible = false;
      if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
        this.view.flxHeader.isVisible = false;
        this.view.flxeditcustomerdetails.top = "0dp";
        this.view.flxeditcustomerdetails.height = "100%";
        this.view.title =kony.i18n.getLocalizedString("kony.mb.component.header.editCustomGroupName.viewCase");//kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Approvals"); //"Approvals";//
      }else{
        this.view.flxHeader.isVisible = true;
        this.view.customHeader.imgBack.src = "backbutton.png";
        this.view.customHeader.lblLocateUs.text =kony.i18n.getLocalizedString("kony.mb.component.header.editCustomGroupName.viewCase"); //kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Approvals"); //"Approvals";//
        this.view.flxeditcustomerdetails.top = "56dp";
        this.view.flxeditcustomerdetails.height = "93%";
      }
    } catch (e) {
      kony.print("Exception in resetForm" + e);
    }
  },

  onclickSaveandUpdate: function() {
    try {
      applicationManager.getPresentationUtility().showLoadingScreen();
      var navMan = applicationManager.getNavigationManager();
      var customViewAccountid = navMan.getCustomInfo("CustomviewSelectedAccountIds");
      var customviewID = navMan.getCustomInfo("customViewDetails");  
      var customViewName = this.view.txtCustomviewname.text;
      var inputParams = {
        "id":customviewID.id,
        "name": customViewName,
        "accountIds":customViewAccountid
      };
      var screenName = "frmEditCustomGroupName";
      var accountModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('AccountsUIModule');
      accountModule.presentationController.updateCustomview(inputParams,screenName);
    } catch (e) {
      kony.print("exception navToEditCustomView" + e);
    }
  },

  updateCustomViewNameEditSuccessCallBack: function(response){
    try{ 
      if(!kony.sdk.isNullOrUndefined(response)){
        var navManager = applicationManager.getNavigationManager();  
        var accountIds =  kony.sdk.isNullOrUndefined(response.accountIds)?" ": response.accountIds;         
        var json={
          "customviewName":kony.sdk.isNullOrUndefined(response.name)?"-": response.name,
          "id":response.id,
          "accountIds":kony.sdk.isNullOrUndefined(response.accountIds)?"-": response.accountIds,
          "customerId":kony.sdk.isNullOrUndefined(response.customerId)?"-":response.customerId,
        };
        var keyvalue="showDonPopup";
        navManager.setCustomInfo("CustomviewSelectedAccountIds",accountIds);
        navManager.setCustomInfo("customViewDetails",json);
        navManager.setCustomInfo("formFlow",keyvalue); 
        var info = {
            "isEditFlow" : this.retainFilterSelectionFlag,
            "customViewName" : response.name
        };
        navManager.setCustomInfo("editCustomRetainSelectionCheckAction", info);
        navManager.navigateTo("frmCustomView");
      }
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }catch(er){   
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
  },
  /*
     *navToPrevForm - This function is to called to navigate back to prev form
     *
     */
  navToPrevForm: function() {
    try {
      kony.print("entered navToPrevForm");
      var navMan=applicationManager.getNavigationManager();
      navMan.navigateTo("frmCustomView");
    } catch (e) {
      kony.print("exception navToPrevForm" + e);
    }
  },

  fetchErrorcallBack:function(response)
  {
    try {    
      if(!kony.sdk.isNullOrUndefined(response)){
        var scopeObj=this;
        var errorResponse = response.errorMessage;
        this.view.flxPopup.customPopup.lblPopup.text = errorResponse;      
        this.timerCounter=parseInt(this.timerCounter)+1;
        var timerId="timerPopupError"+this.timerCounter;
        this.view.flxPopup.skin = "sknflxff5d6e";
        this.view.customPopup.imgPopup.src = "errormessage.png";    
        this.view.flxPopup.setVisibility(true);
        kony.timer.schedule(timerId, function() {
          scopeObj.view.flxPopup.setVisibility(false);
        }, 1.5, false);             
      }
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }catch(error){
      kony.print("frmACHTransactions fetchErrorcallBack-->"+error);
    }       
  },
});