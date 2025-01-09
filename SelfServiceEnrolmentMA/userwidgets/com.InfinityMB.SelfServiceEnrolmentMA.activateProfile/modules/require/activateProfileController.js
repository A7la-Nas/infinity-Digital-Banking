define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._headerSkin="";
      this._headerTextSkin="";
      this._headerCancelButtonSkin="";
      this._errorMessageSkin="";
      this._textBoxNormalSkin="";
      this._textBoxErrorSkin="";
      this._buttonEnabledSkin="";
      this._buttonDisabledSkin="";
      this._forgetPasswordSkin="";
      this._screen2MessageSkin="";
      this._labelSkin="";
      this._passwordRulesLabelSkin="";
      this._passwordRulesSkin="";
      this._screen3MessageSkin="";
      
      this._textVisiblityOffIcon="";
      this._textVisiblityOnIcon="";
      this._tickGrayIcon="";
      this._tickGreenIcon="";
      this._successTickIcon="";
      
      this._screen1HeaderMessageText="";
      this._screen1HeaderCancelText="";
      this._screen1DescriptionText="";
      this._screen1ErrorMessageText="";
      this._screen1TextBox1PlaceholderText="";
      this._screen1TextBox2PlaceholderText="";
      this._screen1SubmitBtnText="";
      this._screen1ForgetPasswordBtnText="";
      
      this._screen2HeaderMessageText="";
      this._screen2HeaderCancelText="";
      this._screen2MessageText="";
      this._screen2Label1Text="";
      this._screen2Textbox1PlaceholderText="";
      this._screen2Label2Text="";
      this._screen2Textbox2PlaceholderText="";
      this._screen2LabelPasswordRulesText="";
      this._screen2SubmitBtnText="";
      
      this._screen3HeaderMessageText="";
      this._screen3MessageText="";
      this._screen3DescriptionText="";
      this._screen3SubmitBtnText="";

      /*
      Custom properties for integration 
      */

      this._objectName="";
      this._validateService="";
      this._passwordUpdateService="";
      this._passwordPolicyService="";
      this._activationExpire="";
      this._unableToVerify="";
      this._unableToUpdate="";

      this.passwordRegex=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/;
      this.repeatedCharRegex=/(.)\\1{4}/;
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineSetter(this, "headerSkin", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._headerSkin=val;          
        }
      });
      defineGetter(this, "headerSkin", function() {
        return this._headerSkin;
      });
      defineSetter(this, "headerTextSkin", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._headerTextSkin=val;          
        }
      });
      defineGetter(this, "headerTextSkin", function() {
        return this._headerTextSkin;
      });
      defineSetter(this, "headerCancelButtonSkin", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._headerCancelButtonSkin=val;          
        }
      });
      defineGetter(this, "headerCancelButtonSkin", function() {
        return this._headerCancelButtonSkin;
      });
      defineSetter(this, "errorMessageSkin", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._errorMessageSkin=val;          
        }
      });
      defineGetter(this, "errorMessageSkin", function() {
        return this._errorMessageSkin;
      });
      defineSetter(this, "textBoxNormalSkin", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._textBoxNormalSkin=val;          
        }
      });
      defineGetter(this, "textBoxNormalSkin", function() {
        return this._textBoxNormalSkin;
      });
      defineSetter(this, "textBoxErrorSkin", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._textBoxErrorSkin=val;          
        }
      });
      defineGetter(this, "textBoxErrorSkin", function() {
        return this._textBoxErrorSkin;
      });
      defineSetter(this, "buttonEnabledSkin", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._buttonEnabledSkin=val;          
        }
      });
      defineGetter(this, "buttonEnabledSkin", function() {
        return this._buttonEnabledSkin;
      });
      defineSetter(this, "buttonDisabledSkin", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._buttonDisabledSkin=val;          
        }
      });
      defineGetter(this, "buttonDisabledSkin", function() {
        return this._buttonDisabledSkin;
      });
      defineSetter(this, "forgetPasswordSkin", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._forgetPasswordSkin=val;          
        }
      });
      defineGetter(this, "forgetPasswordSkin", function() {
        return this._forgetPasswordSkin;
      });
      defineSetter(this, "screen2MessageSkin", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._screen2MessageSkin=val;          
        }
      });
      defineGetter(this, "screen2MessageSkin", function() {
        return this._screen2MessageSkin;
      });
      defineSetter(this, "labelSkin", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._labelSkin=val;          
        }
      });
      defineGetter(this, "labelSkin", function() {
        return this._labelSkin;
      });
      defineSetter(this, "passwordRulesLabelSkin", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._passwordRulesLabelSkin=val;          
        }
      });
      defineGetter(this, "passwordRulesLabelSkin", function() {
        return this._passwordRulesLabelSkin;
      });
      defineSetter(this, "passwordRulesSkin", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._passwordRulesSkin=val;          
        }
      });
      defineGetter(this, "passwordRulesSkin", function() {
        return this._passwordRulesSkin;
      });
      defineSetter(this, "screen3MessageSkin", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._screen3MessageSkin=val;          
        }
      });
      defineGetter(this, "screen3MessageSkin", function() {
        return this._screen3MessageSkin;
      });
      defineSetter(this, "textVisiblityOffIcon", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._textVisiblityOffIcon=val;          
        }
      });
      defineGetter(this, "textVisiblityOffIcon", function() {
        return this._textVisiblityOffIcon;
      });
      defineSetter(this, "textVisiblityOnIcon", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._textVisiblityOnIcon=val;          
        }
      });
      defineGetter(this, "textVisiblityOnIcon", function() {
        return this._textVisiblityOnIcon;
      });
      defineSetter(this, "tickGrayIcon", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tickGrayIcon=val;          
        }
      });
      defineGetter(this, "tickGrayIcon", function() {
        return this._tickGrayIcon;
      });
      defineSetter(this, "tickGreenIcon", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tickGreenIcon=val;          
        }
      });
      defineGetter(this, "tickGreenIcon", function() {
        return this._tickGreenIcon;
      });
      defineSetter(this, "successTickIcon", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._successTickIcon=val;          
        }
      });
      defineGetter(this, "successTickIcon", function() {
        return this._successTickIcon;
      });
      defineSetter(this, "screen1HeaderMessageText", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._screen1HeaderMessageText=val;          
        }
      });
      defineGetter(this, "screen1HeaderMessageText", function() {
        return this._screen1HeaderMessageText;
      });
      defineSetter(this, "screen1HeaderCancelText", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._screen1HeaderCancelText=val;          
        }
      });
      defineGetter(this, "screen1HeaderCancelText", function() {
        return this._screen1HeaderCancelText;
      });
      defineSetter(this, "screen1DescriptionText", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._screen1DescriptionText=val;          
        }
      });
      defineGetter(this, "screen1DescriptionText", function() {
        return this._screen1DescriptionText;
      });
      defineSetter(this, "screen1ErrorMessageText", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._screen1ErrorMessageText=val;          
        }
      });
      defineGetter(this, "screen1ErrorMessageText", function() {
        return this._screen1ErrorMessageText;
      });
      defineSetter(this, "screen1TextBox1PlaceholderText", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._screen1TextBox1PlaceholderText=val;          
        }
      });
      defineGetter(this, "screen1TextBox1PlaceholderText", function() {
        return this._screen1TextBox1PlaceholderText;
      });
      defineSetter(this, "screen1TextBox2PlaceholderText", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._screen1TextBox2PlaceholderText=val;          
        }
      });
      defineGetter(this, "screen1TextBox2PlaceholderText", function() {
        return this._screen1TextBox2PlaceholderText;
      });
      defineSetter(this, "screen1SubmitBtnText", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._screen1SubmitBtnText=val;
        }
      });
      defineGetter(this, "screen1SubmitBtnText", function() {
        return this._screen1SubmitBtnText;
      });
      defineSetter(this, "screen1ForgetPasswordBtnText", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._screen1ForgetPasswordBtnText=val;
        }
      });
      defineGetter(this, "screen1ForgetPasswordBtnText", function() {
        return this._screen1ForgetPasswordBtnText;
      });
      defineSetter(this, "screen2HeaderMessageText", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._screen2HeaderMessageText=val;
        }
      });
      defineGetter(this, "screen2HeaderMessageText", function() {
        return this._screen2HeaderMessageText;
      });
      defineSetter(this, "screen2HeaderCancelText", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._screen2HeaderCancelText=val;
        }
      });
      defineGetter(this, "screen2HeaderCancelText", function() {
        return this._screen2HeaderCancelText;
      });
      defineSetter(this, "screen2MessageText", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._screen2MessageText=val;
        }
      });
      defineGetter(this, "screen2MessageText", function() {
        return this._screen2MessageText;
      });
      defineSetter(this, "screen2Label1Text", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._screen2Label1Text=val;
        }
      });
      defineGetter(this, "screen2Label1Text", function() {
        return this._screen2Label1Text;
      });
      defineSetter(this, "screen2Textbox1PlaceholderText", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._screen2Textbox1PlaceholderText=val;
        }
      });
      defineGetter(this, "screen2Textbox1PlaceholderText", function() {
        return this._screen2Textbox1PlaceholderText;
      });
      defineSetter(this, "screen2Label2Text", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._screen2Label2Text=val;
        }
      });
      defineGetter(this, "screen2Label2Text", function() {
        return this._screen2Label2Text;
      });
      defineSetter(this, "screen2Textbox2PlaceholderText", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._screen2Textbox2PlaceholderText=val;
        }
      });
      defineGetter(this, "screen2Textbox2PlaceholderText", function() {
        return this._screen2Textbox2PlaceholderText;
      });
      defineSetter(this, "screen2LabelPasswordRulesText", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._screen2LabelPasswordRulesText=val;
        }
      });
      defineGetter(this, "screen2LabelPasswordRulesText", function() {
        return this._screen2LabelPasswordRulesText;
      });
      defineSetter(this, "screen2SubmitBtnText", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._screen2SubmitBtnText=val;
        }
      });
      defineGetter(this, "screen2SubmitBtnText", function() {
        return this._screen2SubmitBtnText;
      });
      defineSetter(this, "screen3HeaderMessageText", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._screen3HeaderMessageText=val;
        }
      });
      defineGetter(this, "screen3HeaderMessageText", function() {
        return this._screen3HeaderMessageText;
      });
      defineSetter(this, "screen3MessageText", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._screen3MessageText=val;
        }
      });
      defineGetter(this, "screen3MessageText", function() {
        return this._screen3MessageText;
      });
      defineSetter(this, "screen3DescriptionText", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._screen3DescriptionText=val;
        }
      });
      defineGetter(this, "screen3DescriptionText", function() {
        return this._screen3DescriptionText;
      });
      defineSetter(this, "screen3SubmitBtnText", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._screen3SubmitBtnText=val;
        }
      });
      defineGetter(this, "screen3SubmitBtnText", function() {
        return this._screen3SubmitBtnText;
      });

      /*
      getter and setters for integration custom properties
      */
      defineSetter(this, "objectName", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._objectName=val;
        }
      });
      defineGetter(this, "objectName", function() {
        return this._objectName;
      });


      defineSetter(this, "validateService", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._validateService=val;
        }
      });
      defineGetter(this, "validateService", function() {
        return this._validateService;
      });


      defineSetter(this, "passwordUpdateService", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._passwordUpdateService=val;
        }
      });
      defineGetter(this, "passwordUpdateService", function() {
        return this._passwordUpdateService;
      });


      defineSetter(this, "passwordPolicyService", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._passwordPolicyService=val;
        }
      });
      defineGetter(this, "passwordPolicyService", function() {
        return this._passwordPolicyService;
      });

      defineSetter(this, "activationExpire", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._activationExpire=val;
        }
      });
      defineGetter(this, "activationExpire", function() {
        return this._activationExpire;
      });


      defineSetter(this, "unableToVerify", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._unableToVerify=val;
        }
      });
      defineGetter(this, "unableToVerify", function() {
        return this._unableToVerify;
      });


      defineSetter(this, "_unableToUpdate", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._unableToUpdate=val;
        }
      });
      defineGetter(this, "_unableToUpdate", function() {
        return this._unableToUpdate;
      });

    },
    
    activateProfilePreShow: function(){
      this.setTextFromi18n();
      this.resetUI();
      this.setFlowActions();
      this.navigateToScreen(1);
      this.getPasswordRulesAndPolicy();
       if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
          this.view.flxHeader.isVisible=true;
         this.view.flxHeader.top="0dp";
          this.view.flxMainContainer.top = "96dp";
        }
        else{
          this.view.flxHeader.isVisible=true;
          this.view.flxMainContainer.top = "96dp";
          this.view.lblScreenName.width = "90%";
          this.view.lblScreenName.centerX = "211dp";
          this.view.lblScreenName.top = "143px";
          this.view.btnCancel.right="24px";
        }
    },
    
    navigateToScreen: function(screenNumber){
      /*
      	1: flxProfileActivationScreen
        2: flxCreatePassword
        3: flxProfileActivatedSuccessful
      */
      var i18n1;
      if (screenNumber === 1) {
        var header1 = this._screen1HeaderMessageText;
        if(header1 = "Profile Activation")
        {
          i18n1 = kony.i18n.getLocalizedString("i18n.selfServiceEnrollment.profileActivation");
        }
        this.view.lblScreenName.text = i18n1;
        this.view.btnCancel.text = this._screen1HeaderCancelText;
        this.view.flxProfileActivationScreen.setVisibility(true);
        this.view.flxCreatePassword.setVisibility(false);
        this.view.flxProfileActivatedSuccessful.setVisibility(false);
        this.view.flxBack.setVisibility(false);
        this.view.btnCancel.setVisibility(true);
      }
 else if(screenNumber===2){
var header = this._screen2HeaderMessageText;
var i18n;
if(header = "Create Password"){
i18n = kony.i18n.getLocalizedString("kony.mb.resetPassword.CreatePassword");
}
        this.view.lblScreenName.text = this._screen2HeaderMessageText;
        this.view.btnCancel.text = this._screen2HeaderCancelText;
        this.view.flxProfileActivationScreen.setVisibility(false);
        this.view.flxCreatePassword.setVisibility(true);
        this.view.flxProfileActivatedSuccessful.setVisibility(false);
        this.view.lblInfo.text = kony.i18n.getLocalizedString("i18n.LoginActivation.CreatePasswordMsg");
        this.view.flxBack.setVisibility(true);
        this.view.btnCancel.setVisibility(true);
      }  else if (screenNumber === 3) {
                var footer = this._screen3HeaderMessageText;
                if (footer = "Profile Activation") {
                    i18n1 = kony.i18n.getLocalizedString("i18n.selfServiceEnrollment.profileActivation");
                }
                this.view.lblScreenName.text = i18n1;
                this.view.btnCancel.text = this._screen3HeaderCancelText;
                this.view.flxProfileActivationScreen.setVisibility(false);
                this.view.flxCreatePassword.setVisibility(false);
                this.view.flxProfileActivatedSuccessful.setVisibility(true);
                this.view.flxBack.setVisibility(false);
                this.view.btnCancel.setVisibility(false);
}
    },
    
    resetUI: function(){
      this.assignDefaultSkins();
      this.assignDefaultText();
      this.resetUIForProfileActivationScreen();
      this.resetUIForCreatePasswordScreen();
    },
    
    assignDefaultText: function(){      
      // Screen-1
      this.view.lblMessage.text = kony.i18n.getLocalizedString("kony.mb.ProfileActivation.infoMsg");
      {
                var error = this._screen1ErrorMessageText;
                var warning;
                if (error = "You've entered an incorrect username/activation code") {
                    warning = kony.i18n.getLocalizedString("kony.mb.enrollUIModule.incorrectAlert");
                }
            }
            this.view.lblErrorMessage.text = warning;
      this.view.tbxUsername.placeholder = this._screen1TextBox1PlaceholderText;
      {
        var label =  this._screen1TextBox2PlaceholderText;
        var key ;
        if(label = "Activation Code")
        {
          key = kony.i18n.getLocalizedString("i18n.LoginActivation.Activationcode");
        }
      }
      this.view.tbxActivationCode.placeholder = key;
      this._screen1TextBox2PlaceholderText.text = this._screen1SubmitBtnText;
      this.view.lblForgotPwd.text = this._screen1ForgetPasswordBtnText;
      // Screen-2
     // this.view.lblCreateNewPassword.text = this._screen2MessageText;
      this.view.lblNewPassword.text = this._screen2Label1Text;
      this.view.tbxNewPassword.placeholder = this._screen2Textbox1PlaceholderText;
      this.view.lblReEnterPassword.text = this._screen2Label2Text;
      this.view.tbxReEnterPassword.placeholder = this._screen2Textbox2PlaceholderText;
      this.view.lblSecurityRequirements.text = this._screen2LabelPasswordRulesText;
      this.view.btnSetPassword.text = kony.i18n.getLocalizedString("kony.mb.resetPassword.CreatePassword");
      // Screen-3
      var screen3Msg = kony.i18n.getLocalizedString("i18n.LoginActivation.SuccessMsg");
      this.view.lblActivatedSuccessfully = this._screen3MessageText;
      this.view.lblActivatedSuccessfully.text = kony.i18n.getLocalizedString("i18n.login.Congratulations");
      this.view.lblActivationDescription.text = screen3Msg;
      this._screen3DescriptionText.text = kony.i18n.getLocalizedString("i18n.LoginActivation.SuccessMsg");
    },
    
    setTextFromi18n: function(){
      // Screen-1
      this._screen1HeaderMessageText = this.getStringFromi18n(this._screen1HeaderMessageText);
      this._screen1HeaderCancelText = this.getStringFromi18n(this._screen1HeaderCancelText);
      this._screen1DescriptionText = this.getStringFromi18n(this._screen1DescriptionText);
      this._screen1ErrorMessageText = this.getStringFromi18n(this._screen1ErrorMessageText);
      this._screen1TextBox1PlaceholderText = this.getStringFromi18n(this._screen1TextBox1PlaceholderText);
      this._screen1TextBox2PlaceholderText = this.getStringFromi18n(this._screen1TextBox2PlaceholderText);
      this._screen1SubmitBtnText = this.getStringFromi18n(this._screen1SubmitBtnText);
      this._screen1ForgetPasswordBtnText = this.getStringFromi18n(this._screen1ForgetPasswordBtnText);
      // Screen-2
      this._screen2HeaderMessageText = this.getStringFromi18n(this._screen2HeaderMessageText);
      this._screen2HeaderCancelText = this.getStringFromi18n(this._screen2HeaderCancelText);
      this._screen2MessageText = this.getStringFromi18n(this._screen2MessageText);
      this._screen2Label1Text = this.getStringFromi18n(this._screen2Label1Text);
      this._screen2Textbox1PlaceholderText = this.getStringFromi18n(this._screen2Textbox1PlaceholderText);
      this._screen2Label2Text = this.getStringFromi18n(this._screen2Label2Text);
      this._screen2Textbox2PlaceholderText = this.getStringFromi18n(this._screen2Textbox2PlaceholderText);
      this._screen2LabelPasswordRulesText = this.getStringFromi18n(this._screen2LabelPasswordRulesText);
      this._screen2SubmitBtnText = this.getStringFromi18n(this._screen2SubmitBtnText);
      // Screen-3
      this._screen3HeaderMessageText = this.getStringFromi18n(this._screen3HeaderMessageText);
      this._screen3MessageText = this.getStringFromi18n(this._screen3MessageText);
      this._screen3DescriptionText = this.getStringFromi18n(this._screen3DescriptionText);
      this._screen3SubmitBtnText = this.getStringFromi18n(this._screen3SubmitBtnText);
    },
    
    getStringFromi18n: function(stringValue){
      return  kony.i18n.getLocalizedString(stringValue) ? kony.i18n.getLocalizedString(stringValue) : stringValue;
    },
    
    assignDefaultSkins: function(){
      this.view.flxHeader.skin = this._headerSkin;
      this.view.lblScreenName.skin = this._headerTextSkin;
      this.view.btnCancel.skin = this._headerCancelButtonSkin;
      this.view.lblMessage.skin = this._labelSkin;
      this.view.lblErrorMessage.skin = this._errorMessageSkin;
      this.view.tbxUsername.skin = this._textBoxNormalSkin;
      this.view.tbxUsername.skin = this._textBoxNormalSkin;
      this.view.lblForgotPwd.skin = this._forgetPasswordSkin;
     // this.view.lblCreateNewPassword.skin = this._screen2MessageSkin;
      this.view.lblNewPassword.skin = this._labelSkin;
      this.view.lblReEnterPassword.skin = this._labelSkin;
      this.view.tbxNewPassword.skin = this._textBoxNormalSkin;
      this.view.tbxReEnterPassword.skin = this._textBoxNormalSkin;
      this.view.lblSecurityRequirements.skin = this._passwordRulesLabelSkin;
      this.view.rtxRulesPwd.skin = this._passwordRulesSkin;
      this.view.lblActivatedSuccessfully.skin = this._screen3MessageSkin;
      this.view.lblActivationDescription.skin = this._labelSkin;
      this.view.btnDone.skin = this._buttonEnabledSkin;
      this.view.imgGreenTick.src = this._successTickIcon;
    },
    
    resetUIForProfileActivationScreen: function(){
      this.hideVerificationErrorMessage();      
      this.view.tbxActivationCode.textInputMode = constants.TEXTBOX_INPUT_MODE_ANY;
      this.view.tbxActivationCode.secureTextEntry = true;
      this.view.tbxUsername.text = "";
      this.view.tbxActivationCode.text = "";
      this.view.flxTopMessage.shadowDepth = 1;
      this.view.imgActivationCodeVisiblityToggle.src = this._textVisiblityOffIcon;
      this.view.btnVerify.skin = this._buttonDisabledSkin;
      this.view.btnVerify.setEnabled(false);
      this.setBtnPositionProfileActivationScreen(false);
    },
    
    resetUIForCreatePasswordScreen: function(){
      this.hideUpdateErrorMessage(); 
      this.view.lblErrorMsgPasswordCreation.setVisibility(false);
      this.view.flxSecurityRequirements.setVisibility(false);
      this.view.tbxNewPassword.textInputMode = constants.TEXTBOX_INPUT_MODE_ANY;
      this.view.tbxNewPassword.secureTextEntry = true;
      this.view.tbxNewPassword.text = "";
      this.view.flxCreatePasswordMessage.shadowDepth = 1;
      this.view.tbxReEnterPassword.text = "";
      this.view.imgNewPasswordVisiblityToggle.src = this._textVisiblityOffIcon;
      this.view.imgReEnterPasswordMatch.src = this._tickGrayIcon;
      this.view.btnSetPassword.skin = this._buttonDisabledSkin;
      this.view.btnSetPassword.setEnabled(false);
    },
    
    setFlowActions: function(){
      const scopeObj = this;
      this.setFlowActionsForProfileActivationScreen();
      this.setFlowActionsForCreatePasswordScreen();
      this.view.flxBack.onTouchEnd = function(){
        scopeObj.navigateToScreen(1);
        if(scopeObj.closeActivateProfileFlow)
          scopeObj.closeActivateProfileFlow();
      };
      this.view.btnCancel.onClick = function(){
        scopeObj.resetUI();
        scopeObj.navigateToScreen(1);
        if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
          var currForm = kony.application.getCurrentForm();
          var titleBarAttributes = currForm.titleBarAttributes;
          titleBarAttributes["navigationBarHidden"] = false;
          currForm.titleBarAttributes = titleBarAttributes;
        }
        if(scopeObj.closeActivateProfileFlow)
          scopeObj.closeActivateProfileFlow();        
      };
      this.view.btnDone.onClick = function(){
        applicationManager.getNavigationManager().navigateTo({"appName" : "AuthenticationMA", "friendlyName" : "frmLogin"});
//         if(scopeObj.navigateToLogin)
          //scopeObj.navigateToLogin();
    };
      
    },
    
    setBtnPositionProfileActivationScreen: function(isKeypadOpen){
      this.view.flxProfileActivationButtons.reverseLayoutDirection = !isKeypadOpen;
    },
    
    setFlowActionsForProfileActivationScreen: function(){
      const scopeObj = this;
      this.view.tbxUsername.onTouchEnd = this.setBtnPositionProfileActivationScreen.bind(this, true);
      this.view.tbxUsername.onBeginEditing = this.setBtnPositionProfileActivationScreen.bind(this, true);
      this.view.tbxUsername.onDone = this.setBtnPositionProfileActivationScreen.bind(this, false);
      this.view.tbxActivationCode.onTouchEnd = this.setBtnPositionProfileActivationScreen.bind(this, true);
      this.view.tbxActivationCode.onBeginEditing = this.setBtnPositionProfileActivationScreen.bind(this, true);
      this.view.tbxActivationCode.onDone = this.setBtnPositionProfileActivationScreen.bind(this, false);
      this.view.flxActivationCodeVisiblityToggle.onTouchEnd = function(){
        scopeObj.flxActivationCodeVisiblityToggleOnClick();
      };
      this.view.tbxUsername.onTextChange = function(){
        scopeObj.enableVerifyButton();
      };
      this.view.tbxActivationCode.onTextChange = function(){
        scopeObj.enableVerifyButton();
      };
      this.view.flxForgot.onTouchEnd = function(){
        // TODO: Can't Sign-In Flow
      };
      this.view.btnVerify.onClick = function(){
        // Service Call to be made to verify Activation Code
        scopeObj.onVerifyClick();
      };
    },
    
    setFlowActionsForCreatePasswordScreen: function(){
      const scopeObj = this;
      this.view.flxNewPasswordVisiblityToggle.onTouchEnd = function(){
        scopeObj.flxNewPasswordVisiblityToggleOnClick();
      };
      this.view.tbxNewPassword.onTouchStart = function(){
        scopeObj.enableSetPasswordButtonAndTickMark();
      };
      this.view.tbxNewPassword.onTextChange = function(){
        scopeObj.enableSetPasswordButtonAndTickMark();
      };
      this.view.tbxReEnterPassword.onTouchStart = function(){
        scopeObj.enableSetPasswordButtonAndTickMark();
      };
      this.view.tbxReEnterPassword.onTextChange = function(){
        scopeObj.enableSetPasswordButtonAndTickMark();
      };
      this.view.btnSetPassword.onClick = function(){
        // Service Call to be made to set New Password
        let password = scopeObj.view.tbxNewPassword.text;
        scopeObj.createPassword(password);
      };
    },
    
    flxActivationCodeVisiblityToggleOnClick: function() {
      if (this.view.imgActivationCodeVisiblityToggle.src === this._textVisiblityOffIcon) {
        this.view.imgActivationCodeVisiblityToggle.src = this._textVisiblityOnIcon;
        this.view.tbxActivationCode.secureTextEntry = false;
        this.view.flxCredentials.forceLayout();
      } else {
        this.view.imgActivationCodeVisiblityToggle.src = this._textVisiblityOffIcon;
        this.view.tbxActivationCode.secureTextEntry = true;
        this.view.flxCredentials.forceLayout();
      }
    },
    
    enableVerifyButton: function(){
      const scopeObj = this;
      if(scopeObj.view.tbxUsername.text!=='' && scopeObj.view.tbxUsername.text!==null && scopeObj.view.tbxUsername.text!==undefined && scopeObj.view.tbxActivationCode.text!=='' && scopeObj.view.tbxActivationCode.text!==null && scopeObj.view.tbxActivationCode.text!==undefined){
        scopeObj.view.btnVerify.setEnabled(true);
        scopeObj.view.btnVerify.skin = scopeObj._buttonEnabledSkin;
      } else {
        scopeObj.view.btnVerify.setEnabled(false);
        scopeObj.view.btnVerify.skin = scopeObj._buttonDisabledSkin;
      }
    },
    
    showVerificationErrorMessage: function(){
      this.view.lblErrorMessage.setVisibility(true);
      this.view.tbxUsername.skin = this._textBoxNormalSkin;
      this.view.tbxActivationCode.skin = this._textBoxNormalSkin;
    },
    
    showVerificationErrorMessageFromServer: function(message){
      this.showVerificationErrorMessage();
      this.view.lblErrorMessage.text = message;
    },
    
    hideVerificationErrorMessage: function(){
      this.view.lblErrorMessage.setVisibility(false);
      this.view.tbxUsername.skin = this._textBoxNormalSkin;
      this.view.tbxActivationCode.skin = this._textBoxNormalSkin;
    },

    showupdateErrorMessage: function(){
      this.view.lblErrorMsgPasswordCreation.setVisibility(true);
      this.view.tbxNewPassword.skin = this._textBoxNormalSkin;
      this.view.tbxReEnterPassword.skin = this._textBoxNormalSkin;
    },
    
    showUpdateErrorMessageFromServer: function(message){
      this.showupdateErrorMessage();
      this.view.lblErrorMsgPasswordCreation.text = message;
    },

    hideUpdateErrorMessage: function(){
      this.view.lblErrorMsgPasswordCreation.setVisibility(false);
      this.view.tbxNewPassword.skin = this._textBoxNormalSkin;
      this.view.tbxReEnterPassword.skin = this._textBoxNormalSkin;
    },

    
    onVerifyClick: function(){
      // TODO - Backend Call to be made for Verifying username and activation Code
      //this.ActivateProfileDAO.verifyActivationCode(params, this.verifyActivationCodeSuccess.bind(this), this.verifyActivationCodeFailure.bind(this));
      
      const scopeObj = this;
        let UserNameActivationCodeJSON = {
          "UserName": scopeObj.view.tbxUsername.text,
          "activationCode": scopeObj.view.tbxActivationCode.text
        };
        let dbxUserRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository(scopeObj._objectName);
        dbxUserRepo.customVerb(scopeObj._validateService, UserNameActivationCodeJSON, verifyActivationCodeAndUserNameServiceCallBack);
        function verifyActivationCodeAndUserNameServiceCallBack(status, data, error) {
          let object = scopeObj.validateResponse(status, data, error);
          if (object["status"] === true) {
            scopeObj.verifyActivationCodeSuccess(object["data"]);
          }
          else {
            scopeObj.verifyActivationCodeFailure(object["data"]);
          }
        }
    },
    
    verifyActivationCodeSuccess: function(successResponse){      
        const scopeObj = this;
        if (successResponse.isActivationCodeValid === "true" && successResponse.serviceKey) {
          scopeObj._serviceKey = successResponse.serviceKey;
          this.navigateToScreen(2);
        } else if (successResponse.isActivationCodeValid === "false") {
          scopeObj.showVerificationErrorMessageFromServer(scopeObj._activationExpire);
        } else {
          scopeObj.showVerificationErrorMessageFromServer(scopeObj._unableToVerify);
        }
    },

    verifyActivationCodeFailure: function(failureResponse){      
      const scopeObj = this;
      kony.application.dismissLoadingScreen();
      this.view.tbxUsername.skin = this._textBoxErrorSkin;
      this.view.tbxActivationCode.skin = this._textBoxErrorSkin;
      if (failureResponse.errorCode === 10747)
      scopeObj.showVerificationErrorMessageFromServer("Your activation code is blocked. Please select “Can’t Sign In” to regenerate a new activation code");
      else if (failureResponse.errorCode === 10749)
      scopeObj.showVerificationErrorMessageFromServer("Your activation code has expired. Please select “Can’t Sign In” to regenerate a new activation code");
      else if (failureResponse.errorCode === 10741)
      scopeObj.showVerificationErrorMessageFromServer(kony.i18n.getLocalizedString("kony.mb.enrollUIModule.incorrectAlert"));
      else
      scopeObj.showVerificationErrorMessageFromServer(failureResponse.errorMessage);
    },
    
    flxNewPasswordVisiblityToggleOnClick: function(){
      if (this.view.imgNewPasswordVisiblityToggle.src === this._textVisiblityOffIcon) {
        this.view.imgNewPasswordVisiblityToggle.src = this._textVisiblityOnIcon;
        this.view.tbxNewPassword.secureTextEntry = false;
        this.view.flxNewPassword.forceLayout();
      } else {
        this.view.imgNewPasswordVisiblityToggle.src = this._textVisiblityOffIcon;
        this.view.tbxNewPassword.secureTextEntry = true;
        this.view.flxNewPassword.forceLayout();
      }
    },
    
    enableSetPasswordButtonAndTickMark: function(){
      const scopeObj = this;
      let isNewPasswordFilled = (scopeObj.view.tbxNewPassword.text!=='' && scopeObj.view.tbxNewPassword.text!==null && scopeObj.view.tbxNewPassword.text!==undefined) ? true : false;
      let isReEnterPasswordFilled = (scopeObj.view.tbxReEnterPassword.text!=='' && scopeObj.view.tbxReEnterPassword.text!==null && scopeObj.view.tbxReEnterPassword.text!==undefined) ? true : false;
      if(isNewPasswordFilled && isReEnterPasswordFilled && scopeObj.view.tbxNewPassword.text===scopeObj.view.tbxReEnterPassword.text && scopeObj.validatePassword()){
        scopeObj.view.imgReEnterPasswordMatch.src = scopeObj._tickGreenIcon;
        scopeObj.view.btnSetPassword.setEnabled(true);
        scopeObj.view.btnSetPassword.skin = scopeObj._buttonEnabledSkin;
        this.view.flxSecurityRequirements.setVisibility(false);
        scopeObj.view.flxBtnSetPassword.centerY = "20%";
        
      } else {
        scopeObj.view.imgReEnterPasswordMatch.src = scopeObj._tickGrayIcon;
        scopeObj.view.btnSetPassword.setEnabled(false);
        scopeObj.view.btnSetPassword.skin = scopeObj._buttonDisabledSkin;
        scopeObj.view.flxSecurityRequirements.setVisibility(true);
        scopeObj.view.flxBtnSetPassword.centerY = "5%";
      }
    },
    
    validatePassword: function(){
    const scopeObj = this;
      let password = scopeObj.view.tbxNewPassword.text;
      return scopeObj.isPasswordValidForPolicy(password);
    },
    
    createPassword: function(password){
      // TODO - Backend Call to be made for Creating New Password
      //this.ActivateProfileDAO.createPassword(params, this.createPasswordSuccess.bind(this), this.createPasswordFailure.bind(this));
      /*
      var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "EnrollUIModule", "appName"
: "SelfServiceEnrolmentMA"})
      authModule.presentationController.updatePassword(newPassword);
      */
      
      // Following Code is written for Demo Purpose Only
      const scopeObj = this;
      
        let passwordServiceKeyJSON = {
          "serviceKey": scopeObj._serviceKey,
          "Password": password
        };
        let dbxUserRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository(scopeObj._objectName);
        dbxUserRepo.customVerb(scopeObj._passwordUpdateService, passwordServiceKeyJSON, setPasswordServiceCallBack);
        function setPasswordServiceCallBack(status, data, error) {
          let object = scopeObj.validateResponse(status, data, error);
          if (object["status"] === true) {
            scopeObj.createPasswordSuccess(object["data"]);
          }
          else {
            scopeObj.createPasswordFailure(object["data"]);
          }
        }
    },
    
    createPasswordSuccess: function(successResponse){
      const scopeObj = this;
      scopeObj._serviceKey = successResponse.serviceKey;
      this.navigateToScreen(3);
      kony.print("Create Password Successful");
    },
    
    createPasswordFailure: function(response){
		const scopeObj = this;
      scopeObj.showUpdateErrorMessageFromServer(response.errorMessage);
    },
    
    getPasswordRulesAndPolicy: function(){
      const scopeObj = this;
      var userRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository(scopeObj._objectName);
      kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository(scopeObj._objectName).setHeaderParams({"Accept-Language":kony.i18n.getCurrentLocale()});
      var params = {  "ruleForCustomer": true,  "policyForCustomer": true };
      userRepo.customVerb(scopeObj._passwordPolicyService,params,getAllCompletionCallback);
      function getAllCompletionCallback(status, data, error) {
          var obj =  scopeObj.validateResponse(status, data, error);
          if(obj["status"] === true){
            scopeObj.getPasswordRulesAndPolicySuccessCallback(obj["data"]);
          }
          else {
            scopeObj.getPasswordRulesAndPolicyErrorCallback(obj["data"]);
          }
    }
     
    },
    
    getPasswordRulesAndPolicySuccessCallback: function(res){
      const scopeObj = this;      
      scopeObj.view.rtxRulesPwd.text = res.passwordpolicy.content;
      scopeObj.createRegexForPasswordValidation(res.passwordrules);
    },
    
    
    createRegexForPasswordValidation: function(data){
    var repeatedCharRules="(.)\\1{"+data.charRepeatCount+"}";
    if(data.supportedSymbols.indexOf("-") > -1){
      data.supportedSymbols = data.supportedSymbols.replace("-","\\-");
    }
    if(data.atleastOneSymbol){
      let passwordRules="";
      if(data.atleastOneLowerCase){
        passwordRules=passwordRules+"(?=.*[a-z])";
      }
      if(data.atleastOneUpperCase){
        passwordRules=passwordRules+"(?=.*[A-Z])";
      }
      if(data.atleastOneNumber){
        passwordRules=passwordRules+"(?=.*\\d)";
      }
      if(data.atleastOneSymbol){
        passwordRules=passwordRules+"(?=(.*["+data.supportedSymbols+"]))";
      }
      this.passwordRegex = new RegExp(passwordRules+"[A-Za-z0-9"+data.supportedSymbols+"]{"+data.minLength+","+data.maxLength+"}$");
      this.repeatedCharRegex = new RegExp(repeatedCharRules);
    }
    else{
      var passwordRules="^";
      if(data.atleastOneLowerCase){
        passwordRules=passwordRules+"(?=.*[a-z])";
      }
      if(data.atleastOneUpperCase){
        passwordRules=passwordRules+"(?=.*[A-Z])";
      }
      if(data.atleastOneNumber){
        passwordRules=passwordRules+"(?=.*\\d)";
      }
      this.passwordRegex = new RegExp(passwordRules+"[^\\W]{"+data.minLength+","+data.maxLength+"}$");
      this.repeatedCharRegex = new RegExp(repeatedCharRules);
    }
  },
    
    /**
    * Helper function to check whether given password has any special characters present
    * @param {String} value - A string to check
    * @returns {Boolean} - true if valid, false if any invalid character present
    */
    isPasswordValidForPolicy: function(val)
    {
      if(val.match(this.passwordRegex) && !this.repeatedCharRegex.test(val))
      {
        return true;
      }
      return false;
    },
    getPasswordRulesAndPolicyErrorCallback: function(err){
      kony.print("Unable to fetch Password Rules and Policies "+ err.errorMessage);
    },
    
    validateResponse: function (status, response, error) {
        let res, isServiceFailure, data;
        if (status === kony.mvc.constants.STATUS_SUCCESS) {
          if (response.hasOwnProperty("errcode") || response.hasOwnProperty("dbpErrCode") || response.hasOwnProperty("errmsg") || response.hasOwnProperty("dbpErrMsg")) {
            data = {
              "errorCode": response.errcode ? response.errcode : response.dbpErrCode,
              "errorMessage": response.errmsg ? response.errmsg : response.dbpErrMsg
            };
            res = {
              "status": false,
              "data": data,
              "isServerUnreachable": false
            };
          }
          else
            res = {
              "status": true,
              "data": response,
              "isServerUnreachable": false
            };
        }
        else {
          if (error.opstatus === 1011) {
            if (kony.os.deviceInfo().name === "thinclient" && kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY) === false) {
              location.reload(); //todo later so that it can be in sync with RB
            }
            else {
              isServiceFailure = true;
              errMsg = error.errmsg ? error.errmsg : error.dbpErrMsg;
            }
          }
          else {
            isServiceFailure = false;
            errMsg = error.errmsg ? error.errmsg : error.dbpErrMsg;
          }
          data = {
            "errorCode": error.errcode ? error.errcode : error.dbpErrCode,
            "errorMessage": error.errmsg ? error.errmsg : error.dbpErrMsg
          };
          res = {
            "status": false,
            "data": data,
            "isServerUnreachable": isServiceFailure
          };
        }
        return res;
      },
  };
});