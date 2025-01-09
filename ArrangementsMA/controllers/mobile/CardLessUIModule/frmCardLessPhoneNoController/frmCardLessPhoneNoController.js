define({
   keypadString: '',
  originalValue:'',
    frmPreShow: function() {
        var scope = this;
        this.fv.submissionView(this.view.btnContinue);
        //this.keypadString = '(';
      this.keypadString = '';
        this.fv.checkPhoneNumberLengthNormal(this.keypadString);
      //  this.updateInputBullets("flxInputPhoneNo");
        this.view.lblPhoneNumber.text = "";
     //   this.incompleteView();
        this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
        this.view.customHeader.flxHeader.btnRight.onClick = this.btnRightOnClick;
        this.view.btnPickFromContacts.onClick = this.btnPickFromContactsOnClick;
        this.view.btnContinue.onClick = this.btnContinueOnClick;
        this.renderTitleBar();
        var cLMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
        var data=cLMod.presentationController.getTransactionObject();
        var phn =data.cashlessPhone;
       if(phn!==null&& phn!==''&& phn!==undefined)
         this.populateDetails(phn);
      	if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
           this.view.flxHeader.isVisible = false;
         }else{
           this.view.flxHeader.isVisible = true;
         }
      applicationManager.getPresentationUtility().dismissLoadingScreen();
          var navManager = applicationManager.getNavigationManager();
          var currentForm=navManager.getCurrentForm();
          applicationManager.getPresentationFormUtility().logFormName(currentForm);
    },
  init : function(){
		var FormValidator = require("FormValidatorManager");
		this.fv = new FormValidator(1);
        var navManager = applicationManager.getNavigationManager();
        var currentForm=navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
	},
  populateDetails:function(phn)
  {
    phn=phn.replace(/[()-/ /]/g,"");
//      if(phn.length>10)
//       {
//         phn=phn.slice(2);
//       }
      for(var i=0;i<phn.length;i++)
      {
        this.setKeypadChar(phn.charAt(i));
      }
//      this.fv.checkPhoneNumberLengthNormal(this.keypadString);
  },
    btnRightOnClick: function() {
        var cLMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
        cLMod.presentationController.cancelCommon();
    },
    renderTitleBar: function() {
        if (applicationManager.getPresentationFormUtility().getDeviceName() === 'iPhone') {
            this.view.flxHeader.setVisibility(false);
        }
    },
    flxBackOnClick: function() {
      var navMan=applicationManager.getNavigationManager();
      navMan.goBack();
    },
    btnPickFromContactsOnClick: function() {
      	var cLMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
        cLMod.presentationController.navigateToContacts();
    },
    btnContinueOnClick: function() {
        var cLMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
        cLMod.presentationController.setCardlessPhoneNumber(this.keypadString,"frmCardLessRecName");
    },
    setKeypadChar: function(char) {
        this.keypadString = this.keypadString + char;
      this.originalValue=this.keypadString;
//         if (this.keypadString.length === 13) {
//             this.enterPostAction();
//         } else if (this.keypadString.length < 13) {
//             this.incompleteView();
//         } else if (this.keypadString.length > 13) {
//             this.keypadString = this.keypadString.slice(0, 13);
//             return;
//         }
      if(this.keypadString === null || this.keypadString.length === 0)
      {
        this.incompleteView();
      }
      else
      {
        this.enterPostAction();
      }
      //  this.updateInputBullets("flxInputPhoneNo");
      // this.fv.checkPhoneNumberLengthNormal(this.keypadString);
      this.view.lblPhoneNumber.text = this.keypadString;
    },
    clearKeypadChar: function() {
      if (this.keypadString.length === 0) {
        this.incompleteView();
      }
      if (this.keypadString.length >= 1) {
//             if ((this.keypadString.length === 5) || (this.keypadString.length === 9)) {
//                 this.keypadString = this.keypadString.substr(0, this.keypadString.length - 2);
//             } else {
        this.keypadString = this.keypadString.substr(0, this.keypadString.length - 1);
//             }
        //this.updateInputBullets("flxInputPhoneNo");
      }
      if(this.keypadString.length === 0)
        this.incompleteView();
      else
        this.enterPostAction();
      this.view.lblPhoneNumber.text = this.keypadString;
//       this.fv.checkPhoneNumberLengthNormal(this.keypadString);
    },
    updateInputBullets: function(inputFlx) {
        var dummyString = '(___)___-____';
        //         if(this.keypadString.length===1||this.keypadString.length===5||this.keypadString.length===9){
        //             this.keypadString = this.keypadString.substr(0, this.keypadString.length-1);
        //         }
        if (this.keypadString.length === 8) {
            this.keypadString = this.keypadString + '-';
        } else if (this.keypadString.length === 0) {
            this.keypadString = this.keypadString + '(';
        } else if (this.keypadString.length === 4) {
            this.keypadString = this.keypadString + ')';
        }
        var widgets = this.view[inputFlx].widgets();
        for (var i = 0; i < this.keypadString.length; i++) {
            // widgets[i].skin = "sknLbl979797SSP60px";
            widgets[i].text = this.keypadString[i];
        }
        for (var i = this.keypadString.length; i < widgets.length; i++) {
            //widgets[i].skin = "sknLble3e3e3SSP60px";
            widgets[i].text = dummyString[i];
        }
        this.view.forceLayout();
    },
    incompleteView: function() {
        this.view.btnContinue.skin = "sknBtna0a0a0SSPReg26px";
        this.view.btnContinue.setEnabled(false);
    },
    enterPostAction: function() {
        this.view.btnContinue.setEnabled(true);
        this.view.btnContinue.skin = "sknBtn0095e4RoundedffffffSSP26px";
    },
  bindGenericError: function (errorMsg) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scopeObj = this;
    applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
  },
  bindContactData:function(data){
    if(data.phone){
//     	this.keypadString = '(';
      	this.keypadString = '';
    	this.populateDetails(data.phone);
		 this.view.forceLayout();
    }
  },
  getScope:function(){
    var scope=this;
    return scope;
  }
 });