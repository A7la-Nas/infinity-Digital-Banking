define({
    isEditMode: false,
    timerCounter:0,
    /*onNavigate: function(obj) {
        if (obj === undefined) {
            return;
        }
        if (obj === "edit") {
            this.isEditMode = true;
        } else if (obj === "addManually") {
            this.isEditMode = false;
        }
    },*/
    init : function(){
      var navManager = applicationManager.getNavigationManager();
      var currentForm=navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
      var FormValidator = require("FormValidatorManager")
	  this.fv = new FormValidator(1);
    },
    preShow: function() {
       this.fv.submissionView(this.view.btnSave);
       if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
            this.view.flxHeader.isVisible = false;
			this.view.flxMainContainerNew.top = "-50dp";
        }
      else{
         this.view.flxHeader.isVisible = true;
      }
		this.view.txtName.setFocus(true);
        this.initActions();
     //   this.setFormDataBasedOnEntryPoint();
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        var navManager = applicationManager.getNavigationManager();
        var currentForm=navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().logFormName(currentForm);
    },
  /*
    initActions: function() {
      var scope = this;
      this.view.customHeader.flxBack.onClick = function() {
        var navMan=applicationManager.getNavigationManager();
        navMan.goBack();
      };
      var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
      var flowType=billPayMod.presentationController.getFlowType();
      this.view.btnSave.onClick = function() {
     var nickname = scope.view.txtName.text;
     */
   //     var patt = nickname.match(/[a-zA-Z0-9\s]*/);
  /*
        if(patt[0]===nickname)
          {
        if(flowType==="editBillPay"){
          applicationManager.getPresentationUtility().showLoadingScreen();
        	var payeeDetails=billPayMod.presentationController.getPayeeDetails();
            var nicknameDetails={};
            nicknameDetails.payeeId=payeeDetails.payeeId;
            nicknameDetails.cif=payeeDetails.cif;
            nicknameDetails.payeeNickName=nickname;
            billPayMod.presentationController.updatePayeeNickName(nicknameDetails);
        }
        else if(flowType==="createBillPayPayee"){
          billPayMod.presentationController.navToPayeeAddressDetails(nickname,"frmBillPayEditAddress");
        }
          }
        else
          {
            scope.bindGenericError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.invalidNickName"))
          }
      };
      this.view.customHeader.btnRight.onClick = function() {
        scope.onClickCancel();
      };
      this.view.txtName.onTextChange = function(){
        var text = scope.view.txtName.text;
        scope.fv.checkAndUpdateStatusForNull(0,text);
      };
    },
      */
  initActions: function() {
      var scope = this;
      this.view.customHeader.flxBack.onClick = function() {
        var navMan=applicationManager.getNavigationManager();
        navMan.goBack();
      };
    this.view.customHeader.btnRight.onClick = function() {
        scope.onClickCancel();
      };
  },
    onNavigate:function(context){ 
    var scope = this;                   
    this.view.dataEntry.setContext(context,scope);
  },
  
  onContinuePayeeName : function(context){
      var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
      var navManager = applicationManager.getNavigationManager(); 
      navManager.navigateTo("frmBillPayEditAddress",false,context);
  },
  
  onClickCancel:function(){
    var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
    var flowType=billPayMod.presentationController.getFlowType();
    /*
    if(flowType==="editBillPay"){
      //billPayMod.presentationController.commonFunctionForNavigation("frmBillPayPayeeDetails");
      var navMan=applicationManager.getNavigationManager();
      navMan.goBack();
    }
    else if(flowType==="createBillPayPayee"){
      billPayMod.presentationController.navToFormBasedOnEntryPoint("createBillPayPayee");
    }
    */
     billPayMod.presentationController.navToFormBasedOnEntryPoint("createBillPayPayee");
  },
  /*
    validateFormUI : function(){
    var formValues =[];
    formValues.push(this.view.txtName.text);
    this.fv.preshowCheck(formValues);
  },
  setFormDataBasedOnEntryPoint:function(){
      var scope=this;
      var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
      var flowType=billPayMod.presentationController.getFlowType();
      var specialCharactersSet = "~#^|$%&*!@()_-+=}{][/|?,.><`':;\"\\";
      scope.view.txtName.restrictCharactersSet = specialCharactersSet.replace("@#&*_'-.,", '');
      scope.view.txtName.maxTextLength=50;
           
      if(flowType==="editBillPay"){
        if (applicationManager.getPresentationFormUtility().getDeviceName() === 'iPhone') {
          this.view.title = "Edit Nick Name";
        }
       scope.view.customHeader.lblLocateUs.text="Edit Nick Name";
        scope.view.lblNameTitle.text="Payee Nick Name";
        scope.view.btnSave.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.save");
        var payeeData=billPayMod.presentationController.getPayeeDetails();
        if(payeeData.payeeNickName){
          scope.view.txtName.text=payeeData.payeeNickName;
        }
        //scope.prePopulateData(billPayMod.presentationController.getPayeeDetails());
      }
      else if(flowType==="createBillPayPayee"){
        if (applicationManager.getPresentationFormUtility().getDeviceName() === 'iPhone') {
            this.view.title = "Payee Name";
        }
        scope.view.customHeader.lblLocateUs.text="Payee Name";
        scope.view.lblNameTitle.text="Payee Name";
        scope.view.btnSave.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.continue");
        var payeeName=billPayMod.presentationController.getBillPayPayeeName();
        scope.view.txtName.text=(payeeName && payeeName!==null && payeeName!=="")?payeeName:"";
      }
    scope.validateFormUI();
    },
  prePopulateData:function(payeeData){
    var scope=this;
      if(payeeData.payeeNickName){
        scope.view.txtName.text=payeeData.payeeNickName;
      }
  },
  onClickCancel:function(){
    var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
    var flowType=billPayMod.presentationController.getFlowType();
    if(flowType==="editBillPay"){
      //billPayMod.presentationController.commonFunctionForNavigation("frmBillPayPayeeDetails");
      var navMan=applicationManager.getNavigationManager();
      navMan.goBack();
    }
    else if(flowType==="createBillPayPayee"){
      billPayMod.presentationController.navToFormBasedOnEntryPoint("createBillPayPayee");
    }
  },
  bindGenericError : function(msg){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    applicationManager.getDataProcessorUtility().showToastMessageError(this, msg);
  },
  onContinuePayeeName : function(context){
    var navigateTofrm = new kony.mvc.Navigation('frmBillPayEditAddress');
    navigateTofrm.navigate(context);
  }
  */

});