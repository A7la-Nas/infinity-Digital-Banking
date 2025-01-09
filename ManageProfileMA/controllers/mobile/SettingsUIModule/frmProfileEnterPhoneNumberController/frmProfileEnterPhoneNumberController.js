 define({
 keypadString : '',
  init : function(){
     var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
   },
  frmPreShow : function(){
    var scope = this;
    this.view.lblPhoneNumber.text = "";
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
      this.view.flxMainContainer.top = "56dp";
    }
    else{
      this.view.flxHeader.isVisible = false;
      this.view.flxMainContainer.top = "0dp";
    }
    this.view.btnUpdateChanges.onClick = function(){
      scope.navToConfirmDetails();
    }
    this.view.flxCheckboxPrimary.onClick = function(){
      scope.toggle();
    };
    this.view.customHeader.btnRight.onClick = function(){
      var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
      settingsMod.presentationController.commonFunctionForNavigation("frmProfilePersonalDetails");
    };
    this.view.customHeader.flxBack.onClick = function(){
      var navManager = applicationManager.getNavigationManager();
      navManager.goBack();
    };
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    this.keypadString = '';
  },
   toggle : function(){
    if(this.view.imgCheckboxPrimary.src === "checkbox.png"){
      this.view.imgCheckboxPrimary.src = "checkboxempty.png";
    }
    else
      this.view.imgCheckboxPrimary.src = "checkbox.png"
  },
  navToConfirmDetails : function(){
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    settingsMod.presentationController.commonFunctionForNavigation("frmProfileConfirmDetails");
  },
 setKeypadChar: function (char) {
         if(char === '.')
           return;
//         if(char=='.'){
//             if(this.isPeriodUsed==false){
//                 this.isPeriodUsed = true;
//             }else{
//                 return;
//             }
//         }
        this.keypadString = this.keypadString + char;
   		this.view.lblPhoneNumber.text = this.keypadString;
        this.updateAmountValue();
    },
    clearKeypadChar: function () {
        if (this.keypadString.length === 1) {
            this.keypadString = '';
            this.updateAmountValue();
        }
      else if (this.keypadString.length !== 0) {
//             if(this.keypadString[this.keypadString.length-1]==='.'){
//                 this.isPeriodUsed = false;
//             }
            this.keypadString = this.keypadString.substr(0, this.keypadString.length - 1);
            this.updateAmountValue();
        }
      this.view.lblPhoneNumber.text = this.keypadString;
    },
    updateAmountValue: function(){
        if(this.keypadString===''){
            this.view.btnUpdateChanges.skin = "sknBtnOnBoardingInactive";
            this.view.btnUpdateChanges.setEnabled(false);
        }else{
            this.view.btnUpdateChanges.skin = "sknBtn0095e4RoundedffffffSSP26px";
            this.view.btnUpdateChanges.setEnabled(true);
            this.view.lblAmount.text = this.keypadString;
        }
    },
  });