define([], function (){ 
  return{
    keypadString: "",
    phoneNumberPreShow: function(){
      this.keypadString = "";
      this.resetUI();
      this.renderTitleBar();
      this.setFlowActions();
    },
    
    resetUI: function(){
      const navManager = applicationManager.getNavigationManager();
      let previousData = navManager.getCustomInfo("frmForgot");
      if(previousData){
        if (!kony.sdk.isNullOrUndefined(previousData.code))
        this.view.lblCode.text = previousData.code;
        else 
        this.view.lblCode.text = "+967";
        
        this.view.lblPhoneNumber.text = previousData.phone;
        if(previousData.phone){
          this.keypadString = previousData.phone;
        }
      } else {
        this.view.lblPhoneNumber.text = "";
        this.view.lblCode.text = this.setCountryCode();
      }
      this.setContinueButtonEnableState();
    },
    
    setFlowActions: function(){
      const scopeObj = this;
      const navManager = applicationManager.getNavigationManager();
      this.view.customHeader.flxBack.onTouchEnd = function(){
    		scopeObj.onBack();
      };
      this.view.customHeader.btnRight.onClick = function(){
        scopeObj.onCancel();
      };
      this.view.btnContinue.onClick = function(){
    		let phoneNumber = scopeObj.view.lblPhoneNumber.text;
    		let code = scopeObj.view.lblCode.text;
    		let previousData = navManager.getCustomInfo("frmForgot");
    		previousData.phone = phoneNumber;
    		previousData.code = code;
        	this.keypadString = "";
	  	scopeObj.view.lblPhoneNumber.text = "";
	  	scopeObj.view.lblCode.text = "";
    		navManager.setCustomInfo("frmForgot", previousData);
    		navManager.navigateTo("frmForgotEnterDOB");
      };
      scopeObj.view.flxCode.onTouchEnd = scopeObj.showCountriesList;
    },
    
    setKeypadChar: function (char){
      if(char === '.')
        return;
      this.keypadString = this.keypadString + char;
      this.view.lblPhoneNumber.text = this.keypadString;
      this.setContinueButtonEnableState();
    },
	
    clearKeypadChar: function () {
      if (this.keypadString.length === 1) {
        this.keypadString = "";        
      }
      else if (this.keypadString.length !== 0) {
        this.keypadString = this.keypadString.substr(0, this.keypadString.length - 1);
      }
      this.setContinueButtonEnableState();
      this.view.lblPhoneNumber.text = this.keypadString;
    },
	
    setContinueButtonEnableState: function(){
      if(this.keypadString && this.keypadString!=="" && this.keypadString.length>=9){
        this.view.btnContinue.skin = "sknBtn055BAF26px";
        this.view.btnContinue.setEnabled(true);
        this.view.lblPhoneNumber.text = this.keypadString;
      } else {
        this.view.btnContinue.skin = "sknBtna0a0a0SSPReg26px";
        this.view.btnContinue.setEnabled(false);
      }
    },

    showCountriesList : function(){
      // TO DO : Get countries list here
      const navManager = applicationManager.getNavigationManager();
      navManager.navigateTo("frmForgotSelectCountry");
    },

    setCountryCode : function(){
      var nav = applicationManager.getNavigationManager();
      var phoneData = nav.getCustomInfo('frmProfileEditPhoneNumberMain');
      if(!kony.sdk.isNullOrUndefined(phoneData)){
        if(!kony.sdk.isNullOrUndefined(phoneData.data.phoneCountryCode)){
          return phoneData.data.phoneCountryCode;
        }
        else if(!kony.sdk.isNullOrUndefined(phoneData.phoneCountryCode)){
          return phoneData.phoneCountryCode;
        }
      }
      return applicationManager.getConfigurationManager().getConfigurationValue("defaultCountryISDCode");
    },

    onBack: function(){
      let scopeObj = this;
      const navManager = applicationManager.getNavigationManager();
      let phoneNumber = scopeObj.view.lblPhoneNumber.text;
      let code = scopeObj.view.lblCode.text;
      let previousData = navManager.getCustomInfo("frmForgot");
      previousData.phone = phoneNumber;
      previousData.code = code;
      this.keypadString = "";
      navManager.setCustomInfo("frmForgot", previousData);
      navManager.navigateTo("frmForgotEnterEmailID");
    },

    onCancel: function(){
      const navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("frmForgot", undefined);
      this.keypadString = "";
      navManager.navigateTo("frmLogin");
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
    
  };
});