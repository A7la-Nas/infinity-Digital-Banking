define({
  keypadString: '',
  timerCounter:0,
  /*
    onNavigate: function(obj) {
        if (obj === undefined) {
            return;
        }
        if (obj === "addManually") {
        }
    },
    */
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  frmPreshow: function() {
    //      this.setDataToForm();
    //      this.updateInputBullets("flxInputAccNo");
    //      this.view.btnContinue.onClick = this.btnContinueOnClick;
    this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
    //       this.view.imgCheckbox.onTouchEnd=this.onCheckBoxTouchEnd;
    //       this.renderTitleBar();
    if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
      this.view.flxHeader.isVisible = false;
    }
    else{
      this.view.flxHeader.isVisible = true;
    }
    this.initActions();
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
  },
  onNavigate:function(context){ 
    var scope = this;    
    this.view.dataEntry.setContext(context,scope);
  },

  initActions: function() {
    var scope = this;
    this.view.customHeader.btnRight.onClick = function() {
      scope.onClickCancel();
    };
  },

  onClickCancel:function(){
    var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
    billPayMod.presentationController.navToFormBasedOnEntryPoint("createBillPayPayee");
  },

  onContinueAccountNumber : function(context){
   var isSingleUser = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
    if(!kony.sdk.isNullOrUndefined(isSingleUser)){
      if(isSingleUser === false){

    if(context['accountNumberCheckbox'] == true){
      var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
      var navManager = applicationManager.getNavigationManager();  
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
    }
    else{                 
      var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
      var navManager = applicationManager.getNavigationManager(); 
      navManager.navigateTo("frmBillPayReEnterAccNo",false,context);
    }          
      }
      else{
       var navManager = applicationManager.getNavigationManager(); 
      navManager.navigateTo("frmBillPayVerifyDetails",false,context);
    }
    }
    
  },
  
  flxBackOnClick: function() {
    var navMan=applicationManager.getNavigationManager();
    navMan.setCustomInfo("Back", true);
    navMan.goBack();
  },
  /*
    btnRightOnClick: function() {
      var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
      var flowType=billPayMod.presentationController.getFlowType();
      billPayMod.presentationController.navToFormBasedOnEntryPoint("createBillPayPayee");
    },
    renderTitleBar: function() {
        if (applicationManager.getPresentationFormUtility().getDeviceName() === 'iPhone') {
            this.view.flxHeader.setVisibility(false);
        }
      },
    btnContinueOnClick: function() {
      if(this.view.imgCheckbox.src === "remembermetick.png"){
        var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
        var navMan=applicationManager.getNavigationManager();
        navMan.setEntryPoint("contracts",navMan.getCurrentForm());
        billPayMod.presentationController.navToContractDetailsWithoutAccountNum();
        //billPayMod.presentationController.navToVerifyDetailsWithoutAccountNum("frmBillPayVerifyDetails");
      }
      else{
        var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
        billPayMod.presentationController.navToReenterAccNum(this.keypadString,"frmBillPayReEnterAccNo");
      }
    },
    flxBackOnClick: function() {
      var navMan=applicationManager.getNavigationManager();
      navMan.goBack();
    },
    setKeypadChar: function(char) {
        this.keypadString = this.keypadString + char;
        if (this.keypadString.length >= 1 && this.keypadString.length <= 18) {
            this.view.imgCheckbox.src = "remeberme.png";
            this.enterCodePostAction();
        } else if (this.keypadString.length < 1) {
            this.incompleteCodeView();
        } else if (this.keypadString.length > 18) {
            this.keypadString = this.keypadString.slice(0, 18);
            return;
        }
        this.updateInputBullets("flxInputAccNo");
    },
    clearKeypadChar: function() {
        if (this.keypadString.length === 1) {
            this.incompleteCodeView();
            this.keypadString = '';
            this.updateInputBullets("flxInputAccNo");
        }
        if (this.keypadString.length !== 0) {
            this.keypadString = this.keypadString.substr(0, this.keypadString.length - 1);
            if (this.keypadString.length < 1) {
                this.incompleteCodeView();
            }
            this.updateInputBullets("flxInputAccNo");
        }
		else{
        this.enterCodePostAction();
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
      if(this.view.lblAccountNumber.text.length > 1 && this.view.lblAccountNumber.text.length < 50){
        this.view.btnContinue.setEnabled(true);
        this.view.btnContinue.skin = "sknBtn055BAF26px";
      }
      else {
        this.incompleteCodeView();
      }
    },
    incompleteCodeView: function() {
        this.view.btnContinue.skin = "sknBtna0a0a0SSPReg26px";
        this.view.btnContinue.setEnabled(false);
    },
  onCheckBoxTouchEnd: function(){
    if(this.view.imgCheckbox.src === "remeberme.png"){
      this.view.imgCheckbox.src = "remembermetick.png";
      this.keypadString='';
      this.updateInputBullets("flxInputAccNo");
      this.enterCodePostAction();
    }else{
      this.view.imgCheckbox.src = "remeberme.png";
      this.incompleteCodeView();
    }
  },
  setDataToForm:function(){
     var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
     var accNum=billPayMod.presentationController.getBillPayAccountNumber();
     if(billPayMod.presentationController.getManuallyAddedFlag()==="true"){
       this.view.flxCheckbox.isVisible=true;
     }else if(billPayMod.presentationController.getManuallyAddedFlag()==="false"){
       this.view.flxCheckbox.isVisible=false;
     }
    if(accNum || billPayMod.presentationController.getIsPayeeWithOutAccNum()){
        this.keypadString = accNum;
        this.enterCodePostAction();
    }
    else{
      this.keypadString = '';
      this.view.imgCheckbox.src ="remeberme.png";
      this.incompleteCodeView();
    }
  },
  bindGenericError : function(msg){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    applicationManager.getDataProcessorUtility().showToastMessageError(this, msg);
  },
  */
});