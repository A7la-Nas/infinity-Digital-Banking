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
  initActions : function(){
    var scope=this;
    this.view.customHeader.flxBack.onClick=function(){
      var navManager = applicationManager.getNavigationManager();
      navManager.goBack();
    };
    this.view.customHeader.btnRight.onClick=function(){
      scope.onClickCancel();
    };
    this.view.btnSave.onClick =function(){
      applicationManager.getPresentationUtility().showLoadingScreen();
      var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageArrangementsUIModule");
      var navManager = applicationManager.getNavigationManager();
      var data = navManager.getCustomInfo("frmEStmtAccountDetails");
      var accountID = (data && data.accountID && data.accountID!== "" &&data.accountID!== null)?data.accountID:"";
      var updatedSettings={"nickName":data.nickName,"accountID":accountID,"eStatementEnable":"true","email":scope.selectedRowData.lblValue};
      settingsMode.presentationController.updateUserAccountSettingsForEstatements(updatedSettings,"updateEmail");
    };
  },
  onClickCancel : function(){
    var navManager = applicationManager.getNavigationManager();
    navManager.goBack();
  },
  setDataToForm :function(){
    var userObj = applicationManager.getUserPreferencesManager();
     var email = userObj.getUserEmail();
     var secondaryEmail = userObj.getUserObj().secondaryemail;
     var secondaryEmail2 = userObj.getUserObj().secondaryemail2;
     var emailData =[];
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
  postShowCode:function(){
    var navManager = applicationManager.getNavigationManager();
     var data = navManager.getCustomInfo("frmEStmtAccountDetails");
    var emailData=this.view.segSelectEmailId.data;
      for(var i=0;i<emailData.length;i++){
        if(data && data.email && data.email!==null && data.email !=="" && emailData[i].lblValue===data.email){
          this.view.segSelectEmailId.selectedRowIndex = [0,i];
          this.selectedRowData=this.view.segSelectEmailId.data[i];
          break;
        }
      }
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  onSegRowClick : function(){
    var selectedAcntRow = this.view.segSelectEmailId.selectedIndex[1];
    this.selectedRowData = this.view.segSelectEmailId.data[selectedAcntRow];
  }
 });