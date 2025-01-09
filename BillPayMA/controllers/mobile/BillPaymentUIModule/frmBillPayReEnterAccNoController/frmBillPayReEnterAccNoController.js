define({
    timerCounter:0,
    keypadString: '',
    init : function(){
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    },
    frmPreshow: function() {
 //       this.setDataToForm();
 //       this.updateInputBullets("flxReInputAccNo");
//        this.view.btnContinue.onClick = this.btnContinueOnClick;
        this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
      if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
            this.view.flxHeader.isVisible = false;
        this.view.title = kony.i18n.getLocalizedString("i18n.WireTransfers.ReEnterAccountNumber");
        }
      else{
         this.view.flxHeader.isVisible = true;
        this.view.flxHeader.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.WireTransfers.ReEnterAccountNumber");
      }
        this.view.customHeader.btnRight.onClick = this.btnRightOnClick;
 //       this.renderTitleBar();
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        var navManager = applicationManager.getNavigationManager();
        var currentForm=navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().logFormName(currentForm);
         //this.view.customHeader.btnRight.onClick=this.flxBackOnClick;
    },
  flxBackOnClick: function() {
      var navMan=applicationManager.getNavigationManager();
      navMan.goBack();
    },
  onNavigate:function(context){ 
    var scope = this;     
    this.view.dataEntry.setContext(context,scope);
  },
  
  onContinueReEnterAccountNumber : function(context){
    var isSingleUser = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
    var navManager = applicationManager.getNavigationManager(); 
    if(!kony.sdk.isNullOrUndefined(isSingleUser)){
      if(isSingleUser === false){     
    if(context.hasOwnProperty('billerCategoryId')){
      var categoryId = context.billerCategoryId;
      if(categoryId =="2" || categoryId == "4"){
     navManager.navigateTo("frmBillPayPhoneNumber",false,context);
      }
      else{
         navManager.navigateTo("frmBillPayLinkPayee",false,context);
      }
    }
    else{ 
      navManager.navigateTo("frmBillPayLinkPayee",false,context);
    }
      }else{
//        var navManager = applicationManager.getNavigationManager(); 
        navManager.navigateTo("frmBillPayVerifyDetails",false,context);
      }
    }
  },
  
   btnRightOnClick: function() {
      var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
      var flowType=billPayMod.presentationController.getFlowType();
      billPayMod.presentationController.navToFormBasedOnEntryPoint("createBillPayPayee");
    },
  /*
    btnRightOnClick: function() {
      var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPayModule");
      var flowType=billPayMod.presentationController.getFlowType();
      billPayMod.presentationController.navToFormBasedOnEntryPoint("createBillPayPayee");
    },
    renderTitleBar: function() {
        if (applicationManager.getPresentationFormUtility().getDeviceName() === 'iPhone') {
            this.view.flxHeader.setVisibility(false);
        }
    },
    btnContinueOnClick: function() {
      var configManager = applicationManager.getConfigurationManager();
      var navMan=applicationManager.getNavigationManager();
    if(configManager.isCombinedUser === "true"){
      navMan.setCustomInfo("formflow","frmBillPayReEnterAccNo");
      navMan.navigateTo("frmBenAccountTypeSelect");
    }else{
      if(this.isAccnoMatched()){
        var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPayModule");
         var billerCategoryName = billPayMod.presentationController.getBillPayBillerCategory();
          if(billerCategoryName === "Insurance"){
            billPayMod.presentationController.navToPolicyNumber(this.keypadString,"frmBillPayPolicyNumber");
          }
        else{
          navMan.setEntryPoint("contracts",navMan.getCurrentForm());
          billPayMod.presentationController.navToContractDetails(this.keypadString);
          //billPayMod.presentationController.navToVerifyDetails(this.keypadString,"frmContracts");
        }
      }
      else{
        this.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Manage.missmatchAccountNumber"));
        this.keypadString = '';
        this.updateInputBullets("flxReInputAccNo");
        this.incompleteCodeView();
      }
    }
      },
    bindGenericError : function(msg){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      applicationManager.getDataProcessorUtility().showToastMessageError(this, msg);
    },
    flxBackOnClick: function() {
      var navMan=applicationManager.getNavigationManager();
      navMan.goBack();
    },
    setKeypadChar: function(char) {
        this.keypadString = this.keypadString + char;
        if (this.keypadString.length >= 1 && this.keypadString.length <= 18) {
            this.enterCodePostAction();
        } else if (this.keypadString.length < 1) {
            this.incompleteCodeView();
        } else if (this.keypadString.length > 18) {
            this.keypadString = this.keypadString.slice(0, 18);
            return;
        }
        this.updateInputBullets("flxReInputAccNo");
    },
    clearKeypadChar: function() {
        if (this.keypadString.length === 1) {
            this.incompleteCodeView();
            this.keypadString = '';
            this.updateInputBullets("flxReInputAccNo");
        }
        if (this.keypadString.length !== 0) {
            this.keypadString = this.keypadString.substr(0, this.keypadString.length - 1);
            if (this.keypadString.length < 1) {
                this.incompleteCodeView();
            }
            this.updateInputBullets("flxReInputAccNo");
        }
    },
    updateInputBullets: function(inputFlx) {
        if(this.keypadString===''){
            this.view.lblAccountNumber.text = '|';
        }else{
            this.view.lblAccountNumber.text = this.keypadString;
        }
    },
    enterCodePostAction: function() {
        this.view.btnContinue.setEnabled(true);
        this.view.btnContinue.skin = "sknBtn055BAF26px";
    },
    incompleteCodeView: function() {
        this.view.btnContinue.skin = "sknBtna0a0a0SSPReg26px";
        this.view.btnContinue.setEnabled(false);
    },
  isAccnoMatched:function(){
    var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPayModule");
    var accNum=billPayMod.presentationController.getBillPayAccountNumber();
    if(accNum===this.keypadString){
      return true;
    }
    else{
      return false;
    }
  },
  setDataToForm:function(){
    var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPayModule");
    var reenter=billPayMod.presentationController.getBillPayReEnterAccountNumber();
    if(reenter)
    {
      this.keypadString=reenter;
      this.enterCodePostAction();
    }
    else{
      this.keypadString="";
      this.incompleteCodeView();
    }
  }
  */
});