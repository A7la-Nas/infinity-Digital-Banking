define({
  timerCounter: 0,
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  preShow: function () {
    this.view.txtNewPassword.setFocus(true);
    this.initActions();
    this.renderTitleBar();
    this.handleData();
    this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
    this.view.customHeader.btnRight.onClick = this.flxBackOnClick;
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
  },
  renderTitleBar :function(){
    var deviceUtilManager = applicationManager.getDeviceUtilManager();
    var isIphone = deviceUtilManager.isIPhone();
    if(!isIphone){
      this.view.flxHeader.isVisible = true;
    }
    else{
      this.view.flxHeader.isVisible = false;
    }
  },
  handleData : function(){

    var cardobjIns = applicationManager.getCardsManager().getCardObject();
    if(!cardobjIns.cardDisplayName)
    {
      this.view.lblRemChars.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cards.newCardNameRemChar")+" "+25
      this.view.txtNewPassword.text = "";
      this.view.btnUpdatePassword.skin = "sknBtna0a0a0SSPReg26px";
      this.view.btnUpdatePassword.setEnabled(false);
    }
  },
  initActions:function()
  {
    this.view.btnUpdatePassword.onClick=this.validateUserName;
    this.view.customHeader.flxBack.onClick=this.goBack;
    this.view.customHeader.btnRight.onClick = this.onCancel;
    this.view.txtNewPassword.onTextChange = this.onLastNameTextChange;
  },
  onLastNameTextChange : function (){
    if(this.view.txtNewPassword.text === "")
    {
      this.view.lblRemChars.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cards.newCardNameRemChar")+" "+25
      this.view.btnUpdatePassword.skin = "sknBtna0a0a0SSPReg26px";
      this.view.btnUpdatePassword.setEnabled(false);
    }
    else
    {
      this.view.lblRemChars.text=applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cards.newCardNameRemChar")+" "+(25-this.view.txtNewPassword.text.length);
      this.view.btnUpdatePassword.skin = "sknBtn055BAF26px";
      this.view.btnUpdatePassword.setEnabled(true);
    }
  },
  validateUserName:function()
  {
       var nickname = this.view.txtNewPassword.text;
             var patt = nickname.match(/[a-zA-Z\s]*/);
             if (patt[0] === nickname) {
               var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
                     manageCardsModule.presentationController.navigateToConfirm(this.view.txtNewPassword.text);
                 
             } else {
                 this.bindViewError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.manageCards.validName"));
             }
        
  },
  bindViewError : function(msg)
  {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    applicationManager.getDataProcessorUtility().showToastMessageError(this,msg);
  },
  flxBackOnClick: function() {
    var navMan = applicationManager.getNavigationManager();
    navMan.goBack();
  },
  cancelCommon:function()
  {
    var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
    manageCardsModule.presentationController.cancelCommon();
  }

});