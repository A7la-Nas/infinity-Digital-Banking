define({
   preShow:function(){
   this.view.customHeader.flxBack.onClick=this.flxBackOnClick;
   this.view.btnPhoneNumber.onClick = this.btnPhoneNumberOnClick;
   this.view.btnEmail.onClick = this.btnEmailOnClick;
   this.view.customHeader.btnRight.onClick = this.btnRightOnClick;
   this.renderTitleBar();
     if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
            this.view.flxHeader.isVisible = false;
        }else{
            this.view.flxHeader.isVisible = true;
        }
     var navManager = applicationManager.getNavigationManager();
     var currentForm=navManager.getCurrentForm();
     applicationManager.getPresentationFormUtility().logFormName(currentForm);
  },
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
 },
  flxBackOnClick:function(){
  var navMan=applicationManager.getNavigationManager();
  navMan.goBack();
  },
   btnRightOnClick: function() {
       var cLMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
        cLMod.presentationController.cancelCommon();
    },
  renderTitleBar:function(){
        if(applicationManager.getPresentationFormUtility().getDeviceName()==='iPhone')
       {
         this.view.flxHeader.setVisibility(false);
       }
    },
  btnPhoneNumberOnClick:function(){
     var cLMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
        cLMod.presentationController.setCardlessContactType("phone");
  },
  btnEmailOnClick:function(){
      var cLMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
      cLMod.presentationController.setCardlessContactType("email");
  }
 });