define({
 //Type your controller code here
  selectedRowData:null,
    init : function(){
		var navManager = applicationManager.getNavigationManager();
		var currentForm=navManager.getCurrentForm();
		applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
	},
  frmPreshow : function(){
    this.selectedRowData=null;
    if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
      this.view.flxHeader.isVisible = false;
    }else{
      this.view.flxHeader.isVisible = true;
    }
     if(kony.i18n.getCurrentLocale() === "ar_AE"){
          this.view.customHeader.imgBack.src = "chevronwhiteright.png";
      }else{ 
          this.view.customHeader.imgBack.src = "backbutton.png";
      }
    this.initActions();
    this.setDataToForm();
    this.view.segSelectEmailId.onRowClick=this.onSegRowClick;
     var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
  },
  initActions:function(){
    var scope=this;
    var navManager = applicationManager.getNavigationManager(); 
    var previousForm = kony.application.getPreviousForm().id;
    this.view.customHeader.flxBack.onClick=function(){     
      navManager.goBack();
    };
    this.view.customHeader.btnRight.onClick=function(){
       scope.onClickCancel();
    };
    this.view.flxCheckBox.onTouchStart=this.flxCheckBoxOnClick;
    if(previousForm === "frmEStmtTermsAndConditions"){
      if(navManager.getCustomInfo("TermsAndConditions") === true){
           this.view.imgCheckBox.src = "remembermetick.png";
           this.view.btnEnable.setEnabled(true);
      }else{
           this.view.imgCheckBox.src = "remeberme.png";
           this.view.btnEnable.setEnabled(false);
      }
    }else{
      navManager.setCustomInfo("TermsAndConditions",false);
      this.view.imgCheckBox.src = "remeberme.png";
      this.view.btnEnable.setEnabled(false);
      this.view.btnEnable.skin = "sknBtna0a0a0SSPReg26px";
    }
    this.view.btnTAndC.onClick=function(){
      applicationManager.getPresentationUtility().showLoadingScreen();
      var ManageArrangementsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageArrangementsUIModule");
      ManageArrangementsUIModule.presentationController.getEnableEStatements();
    };
    this.view.btnEnable.onClick=function(){
       applicationManager.getPresentationUtility().showLoadingScreen();
      var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageArrangementsUIModule");
      var data = navManager.getCustomInfo("frmEStmtAccountDetails");
      var accountID = (data && data.accountID && data.accountID!== "" &&data.accountID!== null)?data.accountID:"";
      var updatedSettings={"nickName":data.nickName,"accountID":accountID,"eStatementEnable":"1","favouriteStatus":data.favouriteStatus,"email":scope.selectedRowData.lblValue};
      settingsMode.presentationController.updateUserAccountSettingsForEstatements(updatedSettings,"enable");
    };
  },
  onClickCancel:function(){
    var navManager = applicationManager.getNavigationManager();   
    navManager.goBack();
  },
  setDataToForm :function(){
    var userObj = applicationManager.getUserPreferencesManager();
     var email = userObj.getUserEmail();
     var secondaryEmail = userObj.getUserObj().secondaryemail;
     var secondaryEmail2 = userObj.getUserObj().secondaryemail2;
     var emailData =[];
     this.view.segSelectEmailId.widgetDataMap={
       "lblKey":"lblKey",
       "lblValue": "lblValue",
       "imgRadio":"imgRadio",
       "template" : "template",
        "flxSeparator": "flxSeparator"
     };
     var rowData = {
         "lblKey": kony.i18n.getLocalizedString("i18n.mb.ManageArrangements.primaryemailid"),
         "lblValue": email,
          "imgRadio":"radiobuttoninactive.png",
         "template" : "flxEStmtEmail"
       };
     var rowData1 = {
       "lblKey": "Secondary Email ID",
        "lblValue": secondaryEmail,
         "imgRadio":"radiobuttoninactive.png",
        "template" : "flxEStmtEmail"
     };
     var rowData2 = {
          "lblKey": "Secondary Email ID2",
          "lblValue": secondaryEmail2,
          "imgRadio":"radiobuttoninactive.png",
          "flxSeparator": {"isVisible" : false},
          "template" : "flxEStmtEmail"
        };
     if(email){
       emailData.push(rowData);
     }
     if(secondaryEmail){
       emailData.push(rowData1);
     }
     if(secondaryEmail2){
       emailData.push(rowData2);
     }
     if(emailData.length > 0)
     this.view.segSelectEmailId.setData(emailData);
  },
   flxCheckBoxOnClick: function() {
     var navManager = applicationManager.getNavigationManager();
     if (this.view.imgCheckBox.src === "remembermetick.png") {
      this.view.imgCheckBox.src = "remeberme.png";
      this.view.btnEnable.setEnabled(false);
      this.view.btnEnable.skin = "sknBtna0a0a0SSPReg26px";
      navManager.setCustomInfo("TermsAndConditions",false);
    } else {
      this.view.btnEnable.skin="sknBtn0095e4RoundedffffffSSP26px";
      this.view.btnEnable.setEnabled(true);
      this.view.imgCheckBox.src = "remembermetick.png";
      navManager.setCustomInfo("TermsAndConditions",true);
    }
    this.view.flxCheckBox.forceLayout();
  },
  postShowCode : function(){
    this.view.segSelectEmailId.selectedRowIndex = [0,0];
    this.selectedRowData=this.view.segSelectEmailId.data[0];
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  onSegRowClick : function(){
    var selectedAcntRow = this.view.segSelectEmailId.selectedIndex[1];
    this.selectedRowData = this.view.segSelectEmailId.data[selectedAcntRow];
  }
 });