define({
    timerCounter:0,
    isBusinessPayee:"0",
    init : function(){
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
      var FormValidator = require("FormValidatorManager")
	  this.fv = new FormValidator(2);
    },
    frmPreShow: function() {
  //      this.fv.submissionView(this.view.btnContinue);
   //     this.view.btnContinue.onClick = this.btnContinueOnClick;
        this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
       if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
            this.view.flxHeader.isVisible = false;
        }
      else{
         this.view.flxHeader.isVisible = true;
         this.view.flxMainContainerNew.top = "56dp";
      }
        this.view.customHeader.btnRight.onClick = this.btnRightOnClick;
 //       this.renderTitleBar();
 //       this.setDataToForm();
 //      this.initActions();
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        var navManager = applicationManager.getNavigationManager();
        var currentForm=navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().logFormName(currentForm);
      },
  btnRightOnClick: function() {
      var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
      var flowType=billPayMod.presentationController.getFlowType();
      billPayMod.presentationController.navToFormBasedOnEntryPoint("createBillPayPayee");
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
    */
   onNavigate:function(context){ 
       var scope = this;           
       this.view.payeeVerifyAck.setContext(context,scope);
   },
  navigateToPayeeLinkedCustomerIDForm: function(context){
     var navManager = applicationManager.getNavigationManager(); 
     navManager.navigateTo("frmBillPayLinkPayee",false,context);
  },
  navigateTofrmAcknowledgment : function(context){
    if(context.hasOwnProperty('response')){
      context.payeeId = context.response.payeeId;
    }
      var navManager = applicationManager.getNavigationManager(); 
     navManager.navigateTo("frmPayeeAcknowledgement",false,context);
  },
  
    flxBackOnClick: function() {
      var navMan=applicationManager.getNavigationManager();
      navMan.goBack();
    },
  /*
    btnContinueOnClick: function() {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var nickName=this.view.txtAccNickName.text;
        var nameOnBill=this.view.txtAccNickName.text;
        var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
        billPayMod.presentationController.isAcknowledgmentFlow = true;
        billPayMod.presentationController.createBillPayPayee(this.view.txtAccNickName.text,this.view.txtNameOnBill.text,this.isBusinessPayee);
    },
    */
  initActions:function(){
    var scope=this;
    this.view.txtNameOnBill.onTextChange = function(){
      var text = scope.view.txtNameOnBill.text;
      scope.fv.checkAndUpdateStatusForNull(0,text);
    };
    this.view.txtAccNickName.onTextChange = function(){
      var text = scope.view.txtAccNickName.text;
      scope.fv.checkAndUpdateStatusForNull(1,text);
    };
  },
  /*
  validateFormUI : function(){
    var formValues =[];
    formValues.push(this.view.txtNameOnBill.text);
    formValues.push(this.view.txtAccNickName.text);
    this.fv.preshowCheck(formValues);
  },
  setDataToForm:function(){
    var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
    var payeeData=billPayMod.presentationController.getPayeeDetails();
    var specialCharactersSet = "~#^|$%&*!@()_-+=}{][/|?,.><`':;\"\\";
    this.view.txtNameOnBill.restrictCharactersSet = specialCharactersSet.replace("@#&*_'-.,", '');
    this.view.txtNameOnBill.maxTextLength=50;
    this.view.txtAccNickName.restrictCharactersSet = specialCharactersSet.replace("@#&*_'-.,", '');
    this.view.txtAccNickName.maxTextLength=50;
    if(billPayMod.presentationController.getManuallyAddedFlag()==="false"){
      if(payeeData.billerCategoryName === "Credit Card" || payeeData.billerCategoryName === "Utilities"){
        this.view.flxAccNo.isVisible = true;
        this.view.flxPhoneNumber.isVisible = false;
        this.view.flxRelationNumber.isVisible = false;
        this.view.flxPolicyNumber.isVisible = false;
        this.view.lblAccNoValue.text = applicationManager.getDataProcessorUtility().maskAccountNumber(payeeData.accountNumber);
      }
      else if(payeeData.billerCategoryName === "Phone"){
        this.view.flxAccNo.isVisible = false;
        this.view.flxPhoneNumber.isVisible = true;
        this.view.flxRelationNumber.isVisible = true;
        this.view.flxPolicyNumber.isVisible = false;
        this.view.lblPhoneNumberValue.text = applicationManager.getDataProcessorUtility().maskAccountNumber(payeeData.phone);
        this.view.lblRelationNumberValue.text = applicationManager.getDataProcessorUtility().maskAccountNumber(payeeData.accountNumber);
      }
      else{
        this.view.flxAccNo.isVisible = true;
        this.view.flxPhoneNumber.isVisible = false;
        this.view.flxRelationNumber.isVisible = false;
        this.view.flxPolicyNumber.isVisible = true;
        this.view.lblAccNoValue.text = applicationManager.getDataProcessorUtility().maskAccountNumber(payeeData.accountNumber);
        this.view.lblPolicyNumberValue.text = applicationManager.getDataProcessorUtility().maskAccountNumber(payeeData.phone);
      }
    }
    else{
      this.view.flxAccNo.isVisible = true;
      this.view.flxPhoneNumber.isVisible = false;
      this.view.flxRelationNumber.isVisible = false;
      this.view.flxPolicyNumber.isVisible = false;
      if(payeeData.accountNumber){
        var accnum=payeeData.accountNumber;
        this.view.lblAccNoValue.text=applicationManager.getDataProcessorUtility().maskAccountNumber(accnum);
      }
      else if(payeeData.accountNumber===""){
        this.view.lblAccNoValue.text="Not Available";
      }
    }
    this.view.lblPayeeFullNameValue.text = (payeeData.payeeName && payeeData.payeeName !== "" && payeeData.payeeName!== null)?payeeData.payeeName:"";
    if(billPayMod.presentationController.getPayeeAddressDetails())
    {
      var payeeAddress=billPayMod.presentationController.getPayeeAddressDetails();
      if(payeeAddress.street || payeeAddress.addressLine2 || payeeAddress.cityName|| payeeAddress.zipCode || payeeAddress.state ){
        var address="";
        if(payeeAddress.addressLine1){
          address=address+payeeAddress.addressLine1+",";
        }
        if(payeeAddress.street){
          address=address+payeeAddress.street+",";
        }
        if(payeeAddress.addressLine2){
          address=address+payeeAddress.addressLine2+",";
        }
        if(payeeAddress.cityName){
          address=address+payeeAddress.cityName+",";
        }
        if(payeeAddress.state){
          address=address+payeeAddress.state+",";
        }
        if(payeeAddress.zipCode){
          address=address+payeeAddress.zipCode;
        }
        this.view.lblPayeeAddressValue.text=address;
      }
    }
    if(payeeData.totalContractCustomerSelected){
      var isSingleCIF = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
      this.view.flxContract.isVisible = true;
      this.view.lblLinkedCustomer.text = payeeData.totalContractCustomerSelected+" Customers ID";
      if(isSingleCIF)
      	this.view.flxEdit.isVisible = false;
      else {
        this.view.flxEdit.isVisible = true;
        this.view.flxEdit.onClick = this.editContract; 
      }
    } else{
      this.view.flxContract.isVisible = false;
    }
    this.view.txtNameOnBill.text = (payeeData.nameOnBill && payeeData.nameOnBill !== "" && payeeData.nameOnBill!== null)?payeeData.nameOnBill:"";
    this.view.txtAccNickName.text =(payeeData.payeeNickName && payeeData.payeeNickName !== "" && payeeData.payeeNickName!== null)?payeeData.payeeNickName:
    (payeeData.payeeName && payeeData.payeeName!=="" && payeeData.payeeName!==null)?payeeData.payeeName:"";
    this.validateFormUI();
    var configManager = applicationManager.getConfigurationManager();
    if(configManager.isCombinedUser === "true"){
      var navManager = applicationManager.getNavigationManager();
      var businessPayee= navManager.getCustomInfo("isBusinessPayee");
      this.view.flxAccountType.isVisible=true;
      this.view.lblPayeeFullNameValue.left="40dp";
      if(businessPayee==="1"){
        this.view.imgAccountType.src="businessaccount.png";
        this.isBusinessPayee="1";
      }else{
        this.view.imgAccountType.src="personalaccount.png";
        this.isBusinessPayee="0";
      }
    }else{
      this.view.lblPayeeFullNameValue.left="20dp";
      this.view.flxAccountType.isVisible=false;
    }
  },
  bindGenericError : function(msg){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    applicationManager.getDataProcessorUtility().showToastMessageError(this, msg);
  },
  
  editContract: function(){
    var navMan = applicationManager.getNavigationManager();
    navMan.navigateTo("frmBillPayContracts");
  },
  */
});