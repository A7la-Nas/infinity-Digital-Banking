define([], function (){ 
  return{
    emailData:{
      "email":null,
      "code":null,
      "phone":null,
      "dob":null,
      "serviceKey":null,
      "captcha":null
    },
    
    emailIDPreShow: function(){
      this.resetUI();
      this.renderTitleBar();
      this.setFlowActions();
      this.updateLegalEntity();
    },
    
    resetUI: function(){
      const navManager = applicationManager.getNavigationManager();
      this.emailData = navManager.getCustomInfo("frmForgot");
      this.view.tbxEnterEmail.textCopyable=false;
      if(this.emailData.email && this.emailData.captcha){
        this.view.tbxEnterEmail.text = this.emailData.email;
        this.view.tbxEnterCaptcha.text = this.emailData.captcha;
      } else {
        this.view.tbxEnterEmail.text = "";
        this.view.tbxEnterCaptcha.text = "";        
      }
      this.loadCaptchaImage();
      this.setContinueButtonEnableState();
      this.hideErrorMessage();

    },
    
    setFlowActions: function(){
      const scopeObj = this;
      this.view.customHeader.flxBack.onClick = function(){
        scopeObj.navigateToPreviousForm();
      };
      this.view.customHeader.btnRight.onClick = function(){
        scopeObj.navigateToPreviousForm();
      };
      this.view.tbxEnterEmail.onTextChange = function(){
        scopeObj.setContinueButtonEnableState();
        scopeObj.hideErrorMessage();
      };
      this.view.tbxEnterCaptcha.onTextChange = function(){
        scopeObj.setContinueButtonEnableState();
        scopeObj.hideErrorMessage();
      };
      this.view.imgReloadIcon.onTouchEnd = function(){
        scopeObj.loadCaptchaImage();
      };
      scopeObj.view.btnContinue.onClick = function(){
        scopeObj.verifyCaptcha();
      };
    },
    
    navigateToPreviousForm: function(){
      const navManager = applicationManager.getNavigationManager();
      navManager.navigateTo("frmLegalEntity");
    },
    
    navigateToNextForm: function(){
      const navManager = applicationManager.getNavigationManager();
      this.emailData.email = this.view.tbxEnterEmail.text;
      this.emailData.captcha = this.view.tbxEnterCaptcha.text;
      navManager.setCustomInfo("frmForgot", this.emailData);
	  this.view.tbxEnterEmail.text = "";
      this.view.tbxEnterCaptcha.text = "";
      navManager.navigateTo("frmForgotEnterPhoneNumber"); 
    },
    
    setContinueButtonEnableState: function(){
      const scopeObj = this;
      let isTbxEmailNotEmpty = this.view.tbxEnterEmail.text!=="" && this.view.tbxEnterEmail.text!==null && this.view.tbxEnterEmail.text!==undefined ;
      let isTbxCaptchalledNotEmpty = this.view.tbxEnterCaptcha.text!=="" && this.view.tbxEnterCaptcha.text!==null && this.view.tbxEnterCaptcha.text!==undefined;
      if(isTbxEmailNotEmpty && isTbxCaptchalledNotEmpty && this.isValidEmail()){
        scopeObj.view.btnContinue.skin = "sknBtn055BAF26px";
        scopeObj.view.btnContinue.setEnabled(true);
      } else {
        scopeObj.view.btnContinue.skin = "sknBtna0a0a0SSPReg26px";
        scopeObj.view.btnContinue.setEnabled(false);
      }
    },
    
    isValidEmail: function(){
        let validationUtilManager = applicationManager.getValidationUtilManager();
        return validationUtilManager.isValidEmail(this.view.tbxEnterEmail.text.trim());
    },

    verifyCaptcha: function(){
        applicationManager.getPresentationUtility().showLoadingScreen();
        var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
        this.emailData.captcha = this.view.tbxEnterCaptcha.text;
        var verifyCaptchaJson ={"serviceKey":this.emailData.serviceKey,"captchaValue":this.emailData.captcha};
        authModule.presentationController.verifyCaptcha(verifyCaptchaJson);
    },
    
    verifyEnteredDetails: function(){
      // Check whether entered Captcha is correct or not
      // SuccessCallback: verifyEnteredDetailsSuccess
      // FailureCallback: verifyEnteredDetailsFailure
      
      // Following line for Demo Purpose only
      this.verifyEnteredDetailsSuccess();
      // Following line for Demo Purpose only
    },
    verifyEnteredDetailsSuccess: function(){
      // TODO: Successcallback for verifyEnteredDetails()
      this.navigateToNextForm();
    },
    verifyEnteredDetailsFailure: function(){
      // TODO: FailureCallback for verifyEnteredDetails();
      this.showIncorrectDetailsError();
    },
    showIncorrectDetailsError: function(){
      this.view.lblErrorMessage.text = "Wrong Captcha Entered!";
      this.view.lblErrorMessage.setVisibility(true);
    },
    
    
    loadCaptchaImage: function(){
      // TODO: Backend Call to be made to fetch captcha Image
      const authMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
      let params = {};
      authMode.presentationController.fetchCaptcha(params);
    },
    fetchCaptchaSuccess: function(data){
      this.view.imgCaptcha.base64 = data.encodedImage;
      this.emailData.serviceKey = data.serviceKey;
      this.view.imgCaptcha.width = "80%";
      this.view.imgCaptcha.height = "100%";
      this.view.tbxEnterCaptcha.setVisibility(true);
    },
    fetchCaptchaFailure: function(){
      // TODO: FailureCallback for loadCaptchaImage()
      this.showCaptchaFailureError();     
    },
    showCaptchaFailureError: function(){
    	this.view.lblErrorMessage.text = "Error in Loading Captcha!";
    	this.view.lblErrorMessage.setVisibility(true);
    	this.view.tbxEnterCaptcha.setVisibility(false);
    },
    
    verifyCaptchaSuccess: function(data){
    	this.verifyEnteredDetails();
    },

    verifyCaptchaFailure: function(data){
      this.loadCaptchaImage();
      this.view.lblErrorMessage.text = data.errorMessage;
      this.view.lblErrorMessage.setVisibility(true);
      this.view.tbxEnterCaptcha.text = "";
      if(data.serverErrorRes.encodedImage){
        this.emailData.serviceKey = data.serverErrorRes.encodedImage;
        this.view.imgCaptcha.width = "80%";
        this.view.imgCaptcha.height = "100%";
        this.view.tbxEnterCaptcha.setVisibility(true);
      }
    },

    verifyError: function(errorMessage){
      this.view.lblErrorMessage.text = errorMessage;
      this.view.lblErrorMessage.setVisibility(true);
      const scopeObj = this;
    },

    hideErrorMessage: function(){
      this.view.lblErrorMessage.setVisibility(false);
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

    updateLegalEntity :function(){
      const navManager = applicationManager.getNavigationManager();
      const legalEntity = navManager.getCustomInfo("frmForgot").legalEntityName;
      this.view.lblEntityName.text = legalEntity;
    }
  };
});