define(["CommonUtilities"],function(CommonUtilities){
  return{
  keypadString : '',
  time : 10,
  pos : 0,
  maxNoOfCode : '',
  errorflag:false,
    scinstance:null,
  init : function(){
    var scope=this;
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(scope,"YES",currentForm);
  },
      addComponentforSCA : function()
      {
        if(this.scinstance!=null)
          return;
          var currform = kony.application.getCurrentForm();
        this.scinstance = new com.temenos.infinity.mb.sca.transactions.SCAComponent({
          "height": "100%",
          "id": "SCAComponent",
          "isVisible": true,
          "left": "0dp",
          "masterType": constants.MASTER_TYPE_USERWIDGET,
          "isModalContainer": false,
          "skin": "slFboxmb",
          "top": "0dp",
          "width": "100%",
          "appName": "ResourcesHIDMA",
          "viewType": "SCAComponent",
          "shouldGroup": false,
          "overrides": {
            "SCAComponent": {
              "right": "viz.val_cleared",
              "bottom": "viz.val_cleared",
              "minWidth": "viz.val_cleared",
              "minHeight": "viz.val_cleared",
              "maxWidth": "viz.val_cleared",
              "maxHeight": "viz.val_cleared",
              "centerX": "viz.val_cleared",
              "centerY": "viz.val_cleared"
            }
          }
        }, {
          "paddingInPixel": false,
          "overrides": {}
        }, {
          "overrides": {}
        });
        this.scinstance.flowType = "";
        this.scinstance.servicekey = "";
        currform.add(this.scinstance);
      },
  preShow : function(){
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      		this.view.flxHeader.isVisible = true;
    	}
    	else{
      		this.view.flxHeader.isVisible = false;
   		 }
    this.view.btnContinue.setEnabled(false);
   if(this.errorflag===false)
      {
  this.view.lblError.setVisibility(false);
      }
    this.errorflag=false;
    this.view.btnContinue.skin = "sknBtna0a0a0SSPReg26px";
   
	if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
    }
    else{
      this.view.title="Activate Card";
      this.view.flxHeader.isVisible = false;
    }
    this.view.customHeader.btnRight.onClick=this.cancelOnClick;
    this.view.btnFindMyCVV.onClick=this.showcvvOnClick;
    this.view.btnContinue.onClick=this.activateCards;
    this.view.flxCross.onClick=this.flxCrossOnClick;
    this.clearKeypad();
    this.setKeypadActions();
          if (1 === CommonUtilities.getSCAType()) {
            this.addComponentforSCA();
            this.view.SCAComponent.zIndex = 1;
            this.view.flxMainContainer.zIndex = 5;
            
            
          }
  },
  onCancelClick : function(){
    applicationManager.getPresentationUtility().MFA.cancelMFAFlow();
  },
 scaSuccessCallback: function(response){
    applicationManager.getPresentationUtility().MFA.navigateToAckScreen(response);
  },
  scaFailureCallback : function(response){
    if(response.hasOwnProperty("isLogoutUser") && response.isLogoutUser ){
      let loginData = applicationManager.getNavigationManager().getCustomInfo("frmLoginToast");
      loginData = loginData ? loginData : {};
      loginData.toastMessage = response.errorMessage;
      applicationManager.getNavigationManager().setCustomInfo("frmLoginToast", loginData);
      const authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "AuthUIModule", "appName" : "AuthenticationMA"});
      authMod.presentationController.onLogout();
    } else {
      applicationManager.getPresentationUtility().MFA.onMFAError(response);
    }
  },
 activateCards: function()
  {
    var request={"cvv":this.keypadString,"cardId":scope_ManageCards_Pres.currentCardDetails["cardId"]};
    if(scope_ManageCards_Pres.oldCVV!="")
      {
        request.oldcvv= scope_ManageCards_Pres.oldCVV;
        scope_ManageCards_Pres.oldCVV="";
      }
 //   scope_ManageCards_Pres.currentCardDetails=[];
    scope_ManageCards_Pres.activateCards(request);
  },
  showcvvOnClick: function(){
    this.view.flxImgCardCVVView.setVisibility(true);
    this.view.flxHeader.setEnabled(false);
  },
  flxCrossOnClick:function(){
    this.view.flxImgCardCVVView.setVisibility(false);
    this.view.flxHeader.setEnabled(true);
  },
  
  setKeypadChar : function(num){
    if (this.keypadString.length === parseInt(3))
      return;
    this.keypadString = this.keypadString + num;
    if(this.pos===0)
      {
        this.view.lblCVVOne.text="*";
        this.view.lblCVVOne.skin = "sknLbl979797SSP60px";
      }
   else if(this.pos===1)
      {
        this.view.lblCVVTwo.text="*";
        this.view.lblCVVTwo.skin = "sknLbl979797SSP60px";
      }
   else  if(this.pos===2)
      {
        this.view.lblCVVThree.text="*";
        this.view.lblCVVThree.skin = "sknLbl979797SSP60px";
        // this.enableVerifyButton();
         this.view.btnContinue.setEnabled(true);
          this.view.lblError.setVisibility(false);
      this.view.btnContinue.skin = "sknBtn0095e4RoundedffffffSSP26px";
      }
  //  this.view.customSecurityCode2.setSecurityCodeChar(this.pos,num);
    this.pos++;
  //  this.enableVerifyButton();
  },
  clearKeypad : function(){
    this.keypadString = '';
    this.pos = 0;
    this.clearKeypadChar();
  },
  clearKeypadChar : function () {
    if(this.keypadString.length === 0) {
      this.keypadString = '';
       this.view.lblCVVOne.text="";
       this.view.lblCVVTwo.text="";
      this.view.lblCVVThree.text="";
    }
    if (this.keypadString.length !== 0) {
      if(this.pos===3)
        {
          this.view.lblCVVThree.text="";
         this.view.lblCVVThree.skin = "lblWhiteDot";
        }
      else  if(this.pos===2)
        {
          this.view.lblCVVTwo.text="";
          this.view.lblCVVTwo.skin = "lblWhiteDot";
        }
      else  if(this.pos===1)
        {
          this.view.lblCVVOne.text="";
          this.view.lblCVVOne.skin = "lblWhiteDot";
        }
      this.pos--;
   //   var clearpos = this.pos--;
    //  this.view.customSecurityCode2.setPlaceholder(clearpos-1);
      this.keypadString = this.keypadString.substr(0, this.keypadString.length - 1);
    }
    this.enableVerifyButton();
  },
  setLabel : function(){
    kony.timer.schedule("OTPTimer", this.timerFunction, 1, true);
  },
  timerFunction : function(){
    this.time=this.time - 1;
    if(this.time===1){
      this.view.lblTimeRemaining.text = this.time+" second";
    }
    else if(this.time === 0){
      kony.timer.cancel("OTPTimer");
      this.view.flxResendTimer.isVisible=false;
      this.view.btnReSend.isVisible=true;
    }
    else{
      this.view.lblTimeRemaining.text = this.time+" seconds";
    }
  },
 
  setKeypadActions : function(){
    var scope = this;
    this.view.keypad.btnOne.onClick = function(){
      scope.setKeypadChar("1");
    };
    this.view.keypad.btnTwo.onClick = function(){
      scope.setKeypadChar("2");
    };
    this.view.keypad.btnThree.onClick = function(){
      scope.setKeypadChar("3");
    };
    this.view.keypad.btnFour.onClick = function(){
      scope.setKeypadChar("4");
    };
    this.view.keypad.btnFive.onClick = function(){
      scope.setKeypadChar("5");
    };
    this.view.keypad.btnSix.onClick = function(){
      scope.setKeypadChar("6");
    };
    this.view.keypad.btnSeven.onClick = function(){
      scope.setKeypadChar("7");
    };
    this.view.keypad.btnEight.onClick = function(){
      scope.setKeypadChar("8");
    };
    this.view.keypad.btnNine.onClick = function(){
      scope.setKeypadChar("9");
    };
    this.view.keypad.btnZero.onClick = function(){
      scope.setKeypadChar("0");
    };
    this.view.keypad.imgClearKeypad.onTouchStart = function(){
      scope.clearKeypadChar();
    };
  },
  
  cancelOnClick: function()
  {
        var cardsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
            cardsMod.presentationController.cancelCommon();
  },
setFormUI:function(msg)
{
this.view.lblError.text=msg;
this.errorflag=true;
this.view.lblError.setVisibility(true);
},
  enableVerifyButton : function(){
    if(this.pos === 3){
   this.view.lblError.setVisibility(false);
      this.view.btnContinue.setEnabled(true);
      this.view.btnContinue.skin = "sknBtn0095e4RoundedffffffSSP26px";
    }
    else{

      this.view.btnContinue.setEnabled(false);
      this.view.btnContinue.skin = "sknBtna0a0a0SSPReg26px";
    }
  },
  SCAComponentActivationCall : function(response){
    var scopeObj = this;
    const userManager = applicationManager.getUserPreferencesManager();
    const userName = userManager.getUserObj().userName;
    response.userName = userName;
    response.userDetails={
      "data1": this.keypadString,
      "data2": scope_ManageCards_Pres.currentCardDetails["cardId"]
    };
    if (1===CommonUtilities.getSCAType()){
      try{
        scopeObj.view.SCAComponent.setVisibility(true);
        scopeObj.view.SCAComponent.setContext(response);
      }catch(e){
        kony.print("Card activation SCAComponent Call-->"+e);
        kony.print(e);
      }
    }
  }
}
});