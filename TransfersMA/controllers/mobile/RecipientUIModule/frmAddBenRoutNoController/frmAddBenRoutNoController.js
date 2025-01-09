define({
    keypadString: '',
  	init:function(){
    	this.initActions();
  	},
    frmPreshow: function() {
        this.keypadString = '';
        var transferModulePresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
		var routingNumber=transferModulePresentationController.getRoutingNumber();
      	if(routingNumber){
      		this.keypadString=routingNumber;
            this.enterCodePostAction();
        }
      	else{
        	this.incompleteCodeView();
        }
        this.preshowHideBankDetails();
        this.updateInputBullets("flxInputRoutingNo");
        this.renderTitleBar();
        var navManager = applicationManager.getNavigationManager();
    	var currentForm=navManager.getCurrentForm();
    	applicationManager.getPresentationUtility().dismissLoadingScreen();
    	applicationManager.getPresentationFormUtility().logFormName(currentForm);
        // this.view.customHeader.btnRight.onClick=this.flxBackOnClick;
    },
  initActions:function(){
    	var scope=this;
    	var navManager = applicationManager.getNavigationManager();
    	var currentForm=navManager.getCurrentForm();
    	applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    	this.view.btnContinue.onClick = scope.btnContinueOnClick;
        this.view.customHeader.btnRight.onClick = scope.onClickCancel;
        this.view.customHeader.flxBack.onClick=scope.flxBackOnClick;
  },
    btnRightOnClick: function() {
    },
    renderTitleBar: function() {
        if (applicationManager.getPresentationFormUtility().getDeviceName() === 'iPhone') {
            this.view.flxHeader.setVisibility(false);
        }
    },
    btnContinueOnClick: function() {
      	var routingNumber=this.keypadString;
      	var navManager = applicationManager.getNavigationManager();
    	var accDetails=navManager.getCustomInfo("frmAddBenRoutNo");
      	var transferModulePresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
		transferModulePresentationController.navigateToEnterBenificiaryAccountNumber(routingNumber);
    },
    flxBackOnClick: function() {
      	var navMan=applicationManager.getNavigationManager();
      	navMan.goBack();
    },
    setKeypadChar: function(char) {
        this.keypadString = this.keypadString + char;
        if (this.keypadString.length > 0 && this.keypadString.length < 10) {
            this.enterCodePostAction();
        } else if (this.keypadString.length < 1) {
            this.incompleteCodeView();
        } else if (this.keypadString.length > 9) {
            this.keypadString = this.keypadString.slice(0, 9);
            return;
        }
        this.updateInputBullets("flxInputRoutingNo");
    },
    clearKeypadChar: function() {
        if (this.keypadString.length === 1) {
            this.keypadString = '';
            this.updateInputBullets("flxInputRoutingNo");
        }
        if (this.keypadString.length !== 0) {
            this.keypadString = this.keypadString.substr(0, this.keypadString.length - 1);
            if (this.keypadString.length < 1) {
                this.incompleteCodeView();
            }
            this.updateInputBullets("flxInputRoutingNo");
        }
        if (this.keypadString.length < 1) {
           this.incompleteCodeView();
        }
      else{
        this.enterCodePostAction();
      }
    },
    updateInputBullets: function(inputFlx) {
        var widgets = this.view[inputFlx].widgets();
        for (var i = 0; i < this.keypadString.length; i++) {
            // widgets[i].skin = "sknLbl979797SSP60px";
            widgets[i].text = this.keypadString[i];
        }
        for (var i = this.keypadString.length; i < widgets.length; i++) {
            //widgets[i].skin = "sknLble3e3e3SSP60px";
            widgets[i].text = '_';
        }
        this.view.forceLayout();
    },
    enterCodePostAction: function() {
      if(this.keypadString.length > 6 && this.keypadString.length < 11){
        this.view.btnContinue.setEnabled(true);
        this.view.btnContinue.skin = "sknBtn055BAF26px";
      }
      else{
        this.incompleteCodeView();
      }
    },
    incompleteCodeView: function() {
        this.view.lblBankName.setVisibility(false);
        this.view.lblAddLine1.setVisibility(false);
        this.view.lblAddLine2.setVisibility(false);
        this.view.btnContinue.skin = "sknBtna0a0a0SSPReg26px";
        this.view.btnContinue.setEnabled(false);
    },
  	preshowHideBankDetails:function(){
      this.view.lblBankName.setVisibility(false);
        this.view.lblAddLine1.setVisibility(false);
        this.view.lblAddLine2.setVisibility(false);
    },
	onClickCancel: function() {
	    applicationManager.getPresentationUtility().showLoadingScreen();
      	var navManager = applicationManager.getNavigationManager();
      	var navigateToForm=navManager.getEntryPoint("createInternalBankBenificiary");
      	var transferModPresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
      	transferModPresentationController.commonFunctionForNavigation(navigateToForm);
	}
});