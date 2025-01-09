define({
    init : function(){
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    },
  
    preShow: function(){
        if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
            this.view.flxHeader.isVisible = false;
			this.view.flxContainerNew.top = "-50dp";
        }
      else{
         this.view.flxHeader.isVisible = true;
      }
        //this.view.lblZipCode.text = "";
    //    this.setDataToForm();
    //    this.view.txtZipCode.onTextChange = this.updateAmountValue;
        this.initActions();
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        var navManager = applicationManager.getNavigationManager();
        var currentForm=navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().logFormName(currentForm);

    },
    initActions: function(){
      var scope = this;
        this.view.btnContinue.onClick = function(){
            var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
    		billPayMod.presentationController.isValidZipCode(scope.view.txtZipCode.text,"frmBillPayZipCode");
        };
        this.view.customHeader.flxBack.onClick = function(){
          var navManager = applicationManager.getNavigationManager();
          navManager.goBack();
        };
        this.view.customHeader.btnRight.onClick = function(){
          scope.onClickCancel();
        };
    },
  onNavigate:function(context){ 
   var scope = this;  
    this.view.dataEntry.setContext(context,scope);
  },
   onContinueZipCode : function(context){
	if (context && context.flowType === "ADD"){
		context.accountNumber = "";
	}
  var navManager = applicationManager.getNavigationManager(); 
     navManager.navigateTo("frmBillPayEnterAccNo",false,context);
  }
  /*
	onContinueClick:function(){
    var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPayModule");
    billPayMod.presentationController.setBillPayZipCode(this.view.txtZipCode.text);
    var billerCategoryName = billPayMod.presentationController.getBillPayBillerCategory();
    if(billerCategoryName === "Phone"){
         billPayMod.presentationController.navToRelationNumber("frmBillPayRelationNumber");
       }
    else{
         billPayMod.presentationController.navToBillPayAccNumberSearchFlow("frmBillPayEnterAccNo");
       }
   },
   setDataToForm:function(){
    var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPayModule");
    var zipCode=billPayMod.presentationController.getBillPayZipCode();
     var specialCharactersSet = "~#^|$%&*!@()_-+=}{][/|?,.><`':;\"\\";
     this.view.txtZipCode.restrictCharactersSet = specialCharactersSet;
     this.view.txtZipCode.maxTextLength = 35;
    if(zipCode)
    {
      this.view.txtZipCode.text = zipCode;
      this.updateAmountValue();
    }
    else{
      this.view.txtZipCode.text = "";
      this.updateAmountValue();
    }
  },
    updateAmountValue: function(){
        if(this.view.txtZipCode.text === ""){
            this.view.btnContinue.skin = "sknBtna0a0a0SSPReg26px";
            this.view.btnContinue.setEnabled(false);
        }else{
            this.view.btnContinue.skin = "sknBtn055BAF26px";
            this.view.btnContinue.setEnabled(true);
        }
  },
	bindError : function(err){
    applicationManager.getDataProcessorUtility().showToastMessageError(this,err);
     this.view.btnContinue.skin = "sknBtna0a0a0SSPReg26px";
     this.view.btnContinue.setEnabled(false);
  },
  */,
  onClickCancel:function(){
    var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
     billPayMod.presentationController.navToFormBasedOnEntryPoint("createBillPayPayee");
  }
  
 });