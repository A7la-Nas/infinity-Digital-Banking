define({
  keypadString : '',
  time : 10,
  pos : 0,
  maxNoOfCode : '',
  errorflag:false,
  init : function(){
    var scope=this;
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
     applicationManager.getPresentationFormUtility().initCommonActions(scope,"YES",currentForm);
  },
 
  preShow : function(){
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      		this.view.flxHeader.isVisible = true;
    	}
    	else{
      this.view.title="Activate Card";
      		this.view.flxHeader.isVisible = false;
   		 }
    if(this.errorflag===false)
      {
  this.view.lblError.setVisibility(false);
    
      }
        this.errorflag=false;
    this.view.btnContinue.setEnabled(false);
    this.view.btnContinue.skin = "sknBtna0a0a0SSPReg26px";
    this.view.flxCross.onClick=this.flxCrossOnClick;
	if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
    }
    else{
      this.view.title="Security Code";
      this.view.flxHeader.isVisible = false;
    }
     this.view.customHeader.btnRight.onClick=this.cancelOnClick;
    this.view.btnFindMyCVV.onClick=this.showcvvOnClick;
    this.view.btnContinue.onClick=this.activateExpiryCards;
    this.clearKeypad();
    this.setKeypadActions();
  },
  onCancelClick : function(){
    applicationManager.getPresentationUtility().MFA.cancelMFAFlow();
  },
  activateExpiryCards:function()
  {
    var navManager=applicationManager.getNavigationManager();
	   scope_ManageCards_Pres.isReplaceCardScenario=true;
    scope_ManageCards_Pres.oldCVV=this.keypadString;
    navManager.navigateTo("frmCardManageNewCVV");
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
        this.view.lblError.setVisibility(false);
         this.view.btnContinue.setEnabled(true);
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
  }
});