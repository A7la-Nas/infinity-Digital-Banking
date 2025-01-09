define({
    //Type your controller code here
    timerCounter: 0,
    frmPreShow: function() {
        this.fv.submissionView(this.view.btnContinue);
        this.view.txtEmailId.setFocus(true);
        this.view.txtEmailId.onTextChange = this.txtEmailIdOnTextChange;
        this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
        this.disableContinueButton();
       this.view.customHeader.btnRight.onClick = this.btnRightOnClick;
        this.view.btnPickFromContacts.onClick = this.btnPickFromContactsOnClick;
        this.view.btnContinue.onClick = this.btnContinueOnClick;
        this.view.txtEmailId.text='';
        this.renderTitleBar();
        var cLMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
        var data=cLMod.presentationController.getTransactionObject();
        var email =data.cashlessEmail;
       if(email!==null&& email!==''&& email!==undefined)
         this.populateDetails(email);
        this.view.customHeader.btnRight.onClick = this.btnRightOnClick;
      if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
            this.view.flxHeader.isVisible = false;
        }else{
            this.view.flxHeader.isVisible = true;
        }
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().logFormName(currentForm);
    },
  populateDetails:function(email)
  {
    this.view.txtEmailId.text=email;
    this.fv.checkAndUpdateStatusForNull(0, email);
    this.view.forceLayout();
  },
  init : function(){
		var FormValidator = require("FormValidatorManager")
		this.fv = new FormValidator(1);
        var navManager = applicationManager.getNavigationManager();
        var currentForm=navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
	},
    btnRightOnClick: function() {
       var cLMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
        cLMod.presentationController.cancelCommon();
    },
    renderTitleBar: function() {
        if (applicationManager.getPresentationFormUtility().getDeviceName() === 'iPhone') {
            this.view.flxHeader.setVisibility(false);
        }
    },
    flxBackOnClick: function() {
      var navMan=applicationManager.getNavigationManager();
      navMan.goBack();
    },
    txtEmailIdOnTextChange: function() {
      var text = this.view.txtEmailId.text;
      this.fv.checkAndUpdateStatusForNull(0, text);
    },
    enableContinueButton: function() {
        this.view.btnContinue.setEnabled(true);
        this.view.btnContinue.skin = "sknBtn0095e4RoundedffffffSSP26px";
    },
    disableContinueButton: function() {
        this.view.btnContinue.setEnabled(false);
        this.view.btnContinue.skin = "sknBtna0a0a0SSPReg26px";
    },
    btnPickFromContactsOnClick: function() {
      var cLMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
        cLMod.presentationController.navigateToContacts();
    },
    btnContinueOnClick: function() {
      var cLMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
      cLMod.presentationController.setCardlessEmail(this.view.txtEmailId.text,"frmCardLessRecName");
    },
  bindGenericError: function (errorMsg) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scopeObj = this;
    applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
  },
  bindContactData:function(data){
    this.populateDetails(data.email);
  },
  getScope:function(){
    var scope=this;
    return scope;
  }
});