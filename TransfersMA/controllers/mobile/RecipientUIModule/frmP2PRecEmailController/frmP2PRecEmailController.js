define({
    //Type your controller code here
    timerCounter:0,
    init : function(){
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    },
    frmPreShow: function() {
        this.view.txtEmailId.setFocus(true);
        this.view.txtEmailId.onTextChange = this.txtEmailIdOnTextChange;
        this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
        this.disableContinueButton();
        this.view.customHeader.btnRight.onClick = this.onClickCancel;
        this.view.btnPickFromContacts.onClick = this.btnPickFromContactsOnClick;
        this.view.btnContinue.onClick=this.btnContinueOnClick;
        this.renderTitleBar();
        this.setDataToForm();
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        var navManager = applicationManager.getNavigationManager();
        var currentForm=navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().logFormName(currentForm);
    },
    renderTitleBar: function() {
        if (applicationManager.getPresentationFormUtility().getDeviceName() === 'iPhone') {
            this.view.flxHeader.setVisibility(false);
        }
    },
    flxBackOnClick: function() {
      	var navManager = applicationManager.getNavigationManager();
		navManager.goBack();
    },
    txtEmailIdOnTextChange: function() {
        if ((this.view.txtEmailId.text !== '') && (this.view.txtEmailId.text !== undefined) && kony.string.isValidEmail(this.view.txtEmailId.text)) {
            this.enableContinueButton();
        } else {
          this.disableContinueButton();
        }
    },
    enableContinueButton: function() {
        this.view.btnContinue.setEnabled(true);
        this.view.btnContinue.skin = "sknBtn055BAF26px";
    },
    disableContinueButton: function() {
        this.view.btnContinue.setEnabled(false);
        this.view.btnContinue.skin = "sknBtna0a0a0SSPReg26px";
    },
    btnPickFromContactsOnClick: function() {
          var p2pMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonUIModule");
        p2pMod.presentationController.navigateToContacts("email");
      },
    btnContinueOnClick: function() {
      if(this.view.txtEmailId.text){
      var p2pMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonUIModule");
      p2pMod.presentationController.navigateToP2PRecipientNamefromEmail("frmP2PRecipientName",this.view.txtEmailId.text);
      }
    },
   onClickCancel: function() {
     var p2pMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonUIModule");
     p2pMod.presentationController.navToFormBasedOnEntryPoint("createP2PPayee");
   },
  setDataToForm:function(){
    var payeeMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonUIModule");
    var recipientData=payeeMod.presentationController.getP2PPayeeDetails();
    if(recipientData && recipientData.email){
      this.view.txtEmailId.text=recipientData.email;
      //this.enableContinueButton();
      this.txtEmailIdOnTextChange();
    }
    else{
      this.view.txtEmailId.text="";
      this.disableContinueButton();
    }
    this.view.forceLayout();
  } ,
  bindGenericError : function(msg){
    	applicationManager.getPresentationUtility().dismissLoadingScreen();
    	applicationManager.getDataProcessorUtility().showToastMessageError(this,msg);
  	},
  getScope:function(){
    var scope=this;
    return scope;
  },
  bindContactData:function(){
    this.setDataToForm();
  }
});