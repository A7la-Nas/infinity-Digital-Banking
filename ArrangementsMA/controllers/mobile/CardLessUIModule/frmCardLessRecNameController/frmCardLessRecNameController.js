define({
    frmPreShow: function() {
      this.fv.submissionView(this.view.btnContinue);
      this.nameRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð\u0100-\uFFFF ]+$/;
      	this.view.txtFirstName.onTextChange = this.btnContinueHandler;
        this.view.txtLastName.onTextChange = this.btnContinueHandler;
        this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
         this.view.customHeader.btnRight.onClick = this.btnRightOnClick;
        this.view.btnContinue.onClick = this.btnContinueOnClick;
        this.renderTitleBar();
       this.view.txtFirstName.text='';
      	this.view.txtLastName.text='';
      if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
       this.view.flxHeader.isVisible = false;
     }else{
       this.view.flxHeader.isVisible = true;
     }
      var cLMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
      var firstName=cLMod.presentationController.getCashlessFirstName();
      var lastName=cLMod.presentationController.getCashlessLastName();
      if(firstName!=="" ){
      	this.view.txtFirstName.text=firstName;
      	this.view.txtLastName.text=lastName;
      }
      if ((this.view.txtFirstName.text !== '') && (this.view.txtFirstName.text !== null)) {
      	this.fv.checkAmountLength(this.view.txtFirstName.text);
       }
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var navManager = applicationManager.getNavigationManager();
          var currentForm=navManager.getCurrentForm();
          applicationManager.getPresentationFormUtility().logFormName(currentForm);
    },
  	init : function(){
		var FormValidator = require("FormValidatorManager")
		this.fv = new FormValidator(2);
        var navManager = applicationManager.getNavigationManager();
        var currentForm=navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
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
  btnContinueHandler: function () {
    this.fv.checkAmountLength(this.view.txtFirstName.text);
    if (this.view.txtFirstName.text.match(this.nameRegex)) {
      if (this.view.txtLastName.text !== "") {
        if (this.view.txtLastName.text.match(this.nameRegex)) {
          this.view.btnContinue.setEnabled(true);
          this.view.btnContinue.skin = "sknBtn0095e426pxEnabled";
        } else {
          this.view.btnContinue.setEnabled(false);
          this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
        }
      } else {
        this.view.btnContinue.setEnabled(true);
        this.view.btnContinue.skin = "sknBtn0095e426pxEnabled";
      }
    } else {
      this.view.btnContinue.setEnabled(false);
      this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
    }
  },
    flxBackOnClick: function() {
      var navMan=applicationManager.getNavigationManager();
      navMan.goBack();
    },
    btnContinueOnClick: function() {
      	applicationManager.getPresentationUtility().showLoadingScreen();
        var cLMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CardLessUIModule");
      	var names=[];
      	names.push(this.view.txtFirstName.text);
      	names.push(this.view.txtLastName.text);
        cLMod.presentationController.setCardlessPersonName(names);
    }
});