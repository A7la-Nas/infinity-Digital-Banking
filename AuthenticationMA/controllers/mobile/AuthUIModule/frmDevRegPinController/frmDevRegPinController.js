define({
  newPin: '',
  reEnteredPin:'',
  timerCounter:0,
  init:function(){
	     var navManager = applicationManager.getNavigationManager();
		var currentForm=navManager.getCurrentForm();
		applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    },
   showPinCode:function()
   {
      var scope = this;
      this.newPin = '';
      this.reEnteredPin='';
      this.incompletePinCodeView();
      this.updateInputBullets('flxInputCode');
      this.updateInputBullets('flxInputSecurityCode');
      if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
        this.view.flxHeader.isVisible = true;
      }
      else{
        this.view.flxHeader.isVisible = false;
      }
	  this.view.customHeader.flxBack.onClick = function () {
            var navMan=applicationManager.getNavigationManager();
           navMan.goBack();
      };
      var navManager = applicationManager.getNavigationManager();
	var currentForm = navManager.getCurrentForm();
	applicationManager.getPresentationFormUtility().logFormName(currentForm);
	applicationManager.getPresentationUtility().dismissLoadingScreen();
   },
     incompletePinCodeView: function() {
          this.view.btnNext.skin = "sknBtna0a0a0SSPReg26px";
          this.view.btnNext.setEnabled(false);
          this.view.flxEnterPin.forceLayout();
          this.view.flxEnterPin.setVisibility(true);
          this.view.flxRenterNewPin.setVisibility(false);
          this.view.forceLayout();
     },
     incompleteReEnterPinCodeView: function() {
          this.view.btnEnable.skin = "sknBtna0a0a0SSPReg26px";
          this.view.btnEnable.setEnabled(false);
          this.view.flxRenterNewPin.forceLayout();
          this.view.forceLayout();
     },
   setKeypadChar: function(char) {
            if(this.view.flxEnterPin.isVisible===true)
            {
            this.newPin = this.newPin + char;
            if (this.newPin.length === 6) {
             this.enterNewPinPostAction();
             } else if (this.newPin.length < 6) {
             this.incompletePinCodeView();
     		 } else if (this.newPin.length > 6) {
             this.newPin= this.newPin.slice(0, 6);
             return;
             }
            this.updateInputBullets('flxInputSecurityCode');
            }
          else
          {
           this.reEnteredPin = this.reEnteredPin + char;
            if (this.reEnteredPin.length === 6) {
             this.enterReneterNewPinPostAction();
             } else if (this.reEnteredPin.length < 6) {
             this.incompleteReEnterPinCodeView();
     		 } else if (this.reEnteredPin.length > 6) {
             this.reEnteredPin= this.reEnteredPin.slice(0, 6);
             return;
             }
            this.updateInputBullets('flxInputCode');
         }
    },
    enterNewPinPostAction:function()
  {
        this.view.btnNext.setEnabled(true);
        this.view.btnNext.skin = "sknBtn0095e4RoundedffffffSSP26px";
        this.view.flxEnterPin.forceLayout();
  },
   enterReneterNewPinPostAction:function()
  {
        this.view.btnEnable.setEnabled(true);
        this.view.btnEnable.skin = "sknBtn0095e4RoundedffffffSSP26px";
        this.view.flxEnterPin.forceLayout();
  },
  updateInputBullets: function(inputFlx) {
      var widgets=[];
      if(this.view.flxEnterPin.isVisible===true)
       {
         widgets = this.view[inputFlx].widgets();
        for (var i = 0; i < this.newPin.length; i++) {
            widgets[i].skin = "sknLbl979797SSP60px";
            widgets[i].text =  kony.i18n.getLocalizedString("kony.mb.common.dot");
        }
        for (var i = this.newPin.length; i < widgets.length; i++) {
            widgets[i].skin = "lblBlueFocus";
            widgets[i].text = '_';
        }
       }
      else
        {
        widgets = this.view[inputFlx].widgets();
        for (var k = 0; k < this.reEnteredPin.length; k++) {
            widgets[k].skin = "sknLbl424242SSPReg60px";
            widgets[k].text =  kony.i18n.getLocalizedString("kony.mb.common.dot");
        }
        for (var m = this.reEnteredPin.length; m < widgets.length; m++) {
            widgets[m].skin = "lblBlueFocus";
            widgets[m].text = '_';
        }
        }
        this.view.forceLayout();
    },
   clearKeypadChar: function() {
       if(this.view.flxEnterPin.isVisible===true)
       {
        if (this.newPin.length === 1) {
            this.newPin = '';
            this.updateInputBullets('flxInputSecurityCode');
        }
        if (this.newPin.length !== 0) {
            this.newPin = this.newPin.substr(0, this.newPin.length - 1);
              if (this.newPin.length <6)
                {
                  this.incompletePinCodeView();
                }
            this.updateInputBullets('flxInputSecurityCode');
        }
       }
     else{
       if (this.reEnteredPin.length === 1) {
            this.reEnteredPin = '';
            this.updateInputBullets('flxInputCode');
        }
        if (this.reEnteredPin.length !== 0) {
            this.reEnteredPin = this.reEnteredPin.substr(0, this.reEnteredPin.length - 1);
              if (this.reEnteredPin.length <6)
                {
                  this.incompleteReEnterPinCodeView();
                }
           this.updateInputBullets('flxInputCode');
        }
     }
    },
   btnNextOnClick:function(){
     this.view.flxRenterNewPin.setVisibility(true);
     this.view.flxEnterPin.setVisibility(false);
     this.incompleteReEnterPinCodeView();
     this.view.forceLayout();
   },
   btnEnableOnClick:function()
  {
    if(this.newPin === this.reEnteredPin){
      	var authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
        authMod.presentationController.enablePin(this.newPin);
    }
    else{
        applicationManager.getDataProcessorUtility().showToastMessageError(this,kony.i18n.getLocalizedString("kony.mb.PIN.and.Reenter.PIN.does.not.match"));
    }
  },
  btnSkipOnClick:function()
  {
	applicationManager.getPresentationUtility().showLoadingScreen();
  	var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsModule");
    settingsMod.presentationController.skipNavigation();
  },
 });