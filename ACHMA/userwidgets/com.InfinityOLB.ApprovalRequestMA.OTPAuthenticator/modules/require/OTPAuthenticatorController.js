define([],function() {

	return {
      
      	constructor: function(baseConfig, layoutConfig, pspConfig) {
      	  	this.secureCodeOnProceed = function () {};
          	this.onAuthorizationCancel = function () {};
          	this.onLayout = function() {};
          	this.showProgressBar = function() {};
          	this.hideProgressBar = function() {};
        },
      	
      	loadAuthModule: function(){ 
            return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ACHModule");
        },
      
      	setOnLayout: function(funimp) {
          this.onLayout = funimp;
        },
      
      	setHideProgressBar: function(funimp) {
          this.hideProgressBar = funimp;
        },
      
      	setShowProgressBar: function(funimp) {
          this.showProgressBar = funimp;
        },
      
		showSecureCode: function() {
          	this.showProgressBar();
          	this.loadAuthModule().presentationController.sendOTP(this.showSecureCodeSuccessCallback.bind(this), this.showSecureCodeFailureCallback.bind(this));
        },
      	
        showSecureCodeSuccessCallback: function() {
          	this.hideProgressBar();
			this.view.flxOTPContainer.setVisibility(true);
            this.view.OTPCode.tbxEnterCVVCode.text = "";
			this.view.forceLayout();
          	this.onLayout();
		},
      	
      	showSecureCodeFailureCallback: function() {
          	this.hideProgressBar();
          	this.view.OTPCode.tbxEnterCVVCode.text = "";
          	this.view.OTPCode.lblWarning.text = kony.i18n.getLocalizedString("i18n.login.AskToResendOTPMsg");
          	this.view.OTPCode.flxWarning.setVisibility(true);
          	this.view.forceLayout();
          	this.onLayout();
		},
      
      	setSecureCodeOnProceed: function(secureCodeOnProceedDefinition) {
          	this.secureCodeOnProceed = secureCodeOnProceedDefinition;
        },
      
      	setOnAuthorizationCancel: function(onAuthorizationCancelDefinition) {
          	this.onAuthorizationCancel = onAuthorizationCancelDefinition;
        },
      
      	preShow: function() {
            this.view.flxOTPContainer.setVisibility(true);
            this.view.OTPCode.btnProceed.onClick = this.validateSecureAccessCode;
            this.view.OTPCode.btnCancel.onClick = this.cancelAuthorization;
          	this.view.OTPCode.lblResendOption2.onTouchEnd = this.showSecureCode;
            this.view.forceLayout();
        },
      
      	validateSecureAccessCode: function(){
          var secureCode = this.view.OTPCode.tbxEnterCVVCode.text.trim();
          var varlidatorRegEx = new RegExp("^[0-9]{6}$");
            if(varlidatorRegEx.test(secureCode)) 
            {
              	this.showProgressBar();
              	this.loadAuthModule().presentationController.verifySentOTP(secureCode ,this.validateSecureAccessCodeSuccess.bind(this), this.validateSecureAccessCodeFailure.bind(this));
            }
          	else {
              	this.view.OTPCode.flxWarning.setVisibility(true);
              	this.view.forceLayout();
              	this.onLayout();
            }
          	
        },
      
      	validateSecureAccessCodeSuccess: function(){
          this.hideProgressBar();
          this.view.OTPCode.preshow();
          this.view.OTPCode.flxWarning.setVisibility(false);
          if(this.secureCodeOnProceed !== undefined && this.secureCodeOnProceed !== null) {
            this.secureCodeOnProceed();
            this.preShow();
          }
          this.view.forceLayout();
          this.onLayout();
        },
      
      	validateSecureAccessCodeFailure: function() {
          this.hideProgressBar();
          this.view.OTPCode.tbxEnterCVVCode.text = "";
          this.view.OTPCode.flxWarning.setVisibility(true);
          this.view.forceLayout();
          this.onLayout();
        },
      
      	cancelAuthorization: function() {
      		if(this.onAuthorizationCancel !== undefined && this.onAuthorizationCancel !== null){
              this.onAuthorizationCancel();
            }
        }
	};
});