define({
    init : function(){
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    },
    frmPreShow: function() {
        this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
        this.view.customHeader.btnRight.onClick = this.flxBackOnClick;
        this.view.btnContinue.onClick = this.btnContinueOnClick;
        this.view.customHeader.btnRight.onClick = this.onClickCancel;
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
    btnContinueOnClick: function() {
      var p2pMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonUIModule");
      applicationManager.getPresentationUtility().showLoadingScreen();
      p2pMod.presentationController.addP2PRecipient(this.view.txtNickName.text);
    },
  enableContinueButton: function() {
    this.view.btnContinue.setEnabled(true);
    this.view.btnContinue.skin = "sknBtn0095e4RoundedffffffSSP26px";
  },
  disableContinueButton: function() {
    this.view.btnContinue.setEnabled(false);
    this.view.btnContinue.skin = "sknBtna0a0a0SSPReg26px";
  },
    setDataToForm : function(){
      var p2pMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonUIModule");
      var recipientDetails=p2pMod.presentationController.getP2PPayeeDetails();
      var specialCharactersSet = "~#^|$%&*!@()_-+=}{][/|?,.><`':;\"\\";
      this.view.txtNickName.restrictCharactersSet = specialCharactersSet.replace("!@#&*_'-.,", '');
      this.view.txtNickName.maxTextLength=50;
      if(recipientDetails.name){
       this.view.lblRecipientNameValue.text=recipientDetails.name;
      }
      if(recipientDetails.phone){
        this.view.lblPhoneNo.text=kony.i18n.getLocalizedString("kony.mb.common.phoneNo");
         this.view.lblPhoneValue.text=recipientDetails.phone;
      }
      if(recipientDetails.email){
         this.view.lblPhoneNo.text=kony.i18n.getLocalizedString("kony.tab.OBEmail");
         this.view.lblPhoneValue.text=recipientDetails.email;
      }
      if(recipientDetails.nickName){
        this.view.txtNickName.text=recipientDetails.nickName;
      }else if(recipientDetails.nickName===null || recipientDetails.nickName===undefined){
        this.view.txtNickName.text= "";
      }
      if(recipientDetails.totalContractCustomerSelected){
        this.view.lblLinkedWithValue.text = recipientDetails.totalContractCustomerSelected + kony.i18n.getLocalizedString("i18n.payments.customerIDs");
      }
    },
   onClickCancel: function() {
     var p2pMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonUIModule");
     p2pMod.presentationController.navToFormBasedOnEntryPoint("createP2PPayee");
    }
});