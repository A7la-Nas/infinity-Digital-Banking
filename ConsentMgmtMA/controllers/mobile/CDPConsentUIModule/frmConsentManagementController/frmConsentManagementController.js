define({ 


  //Type your controller code here 
  initActions: function () {
    this.view.customHeader.flxBack.onClick = function () {
      new kony.mvc.Navigation({"appName" : "HomepageMA", "friendlyName" : "AccountsUIModule/frmUnifiedDashboard"}).navigate();
    };
    var configManager = applicationManager.getConfigurationManager();

    if (configManager.checkUserPermission("CDP_CONSENT_EDIT")) {
      this.view.customHeader.lblLocateUs.skin = "sknTitle1a98ffffffff30px";
      this.view.customHeader.btnRight.onClick = this.editOrCancelOnClick;
      this.view.customHeader.btnRight.setVisibility(true);
    } else {
      this.view.customHeader.btnRight.setVisibility(false);
    }


    this.view.btnSave.onClick = this.saveOnClick;
  },

  preShow: function() {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var settingsModule = applicationManager.getModulesPresentationController({"moduleName" : "CDPConsentUIModule", "appName" : "ConsentMgmtMA"});
    settingsModule.getConsentData();
    if(kony.i18n.getCurrentLocale() === "ar_AE"){
          this.view.customHeader.imgBack.src = "chevronwhiteright.png";
      }else{ 
          this.view.customHeader.imgBack.src = "backbutton.png";
      }

  },


  editOrCancelOnClick: function(){
    if(this.view.customHeader.btnRight.text === kony.i18n.getLocalizedString("kony.mb.common.Edit")){

      this.disableSaveButton();
      this.view.customHeader.btnRight.text =  kony.i18n.getLocalizedString("kony.mb.common.Cancel");
      this.view.customHeader.flxBack.setVisibility(false);
      this.view.flxButton.setVisibility(true);

      this.view.segConsentTypes.setVisibility(false);
      this.view.segEditConsent.setVisibility(true);

    }
    else{
      this.view.customHeader.btnRight.text = kony.i18n.getLocalizedString("kony.mb.common.Edit");
      this.view.customHeader.flxBack.setVisibility(true);       
      this.view.flxButton.setVisibility(false);
      this.view.segConsentTypes.setVisibility(true);
      this.view.segEditConsent.setVisibility(false);   


      var consentEditData = this.view.segEditConsent.data;
      var consentSegData = this.view.segConsentTypes.data;

      for(var i=0;i<consentSegData.length;i++){
        for(var j=0;j<consentSegData[i][1].length;j++){
          consentEditData[i][1][j].switchSelectIndex.selectedIndex = consentSegData[i][1][j].switchSelectIndex.selectedIndex;
        }
      }

      this.view.segEditConsent.setData(consentEditData);
    }
  },

  enableSaveButton: function() {
    this.view.btnSave.setEnabled(true);
    this.view.btnSave.skin = "sknBtn0095e4RoundedffffffSSP26px";
  },

  disableSaveButton: function() {
    this.view.btnSave.setEnabled(false);
    this.view.btnSave.skin = "sknBtna0a0a0SSPReg26px";
  },


  setSegmentData : function(consentData){

    this.setDataVisible(true);

    var allConsent = consentData.allConsent;
    var viewEditBtn = consentData.viewEditBtn;
    for(i=0;i<allConsent.length;i++){

      var rowLen = allConsent[i][1].length;

      for(j=0;j<rowLen;j++){

       // consentLblValue = allConsent[i][1][j].lblValue.text;
        var index = allConsent[i][1][j].switchSelectIndex.selectedIndex;
        var enable = allConsent[i][1][j].switchSelectIndex.enable;
        allConsent[i][1][j].switchSelectIndex = {"isVisible":true, "selectedIndex":index, "enable":enable, "onSlide":this.onSlideCallback};

      }
    }
    this.view.customHeader.btnRight.setVisibility(viewEditBtn);  
    this.view.segConsentTypes.setVisibility(true);


    //view
    this.view.segConsentTypes.widgetDataMap = this.getWidgetDataMap();
    this.view.segConsentTypes.setData(allConsent);

    //edit    
    this.view.segEditConsent.widgetDataMap = this.getWidgetDataMap();
    this.view.segEditConsent.setData(allConsent);


    applicationManager.getPresentationUtility().dismissLoadingScreen();
    this.view.flxConsentData.forceLayout();
  },

  showErrorMessage : function(message){
    this.setDataVisible(false);
    this.view.flxError.lblError.text = message;
    this.view.flxError.lblError.skin = "sknLblff0000SSPReg26px";
    applicationManager.getPresentationUtility().dismissLoadingScreen();

  },

  onSlideCallback: function(widget, context){

    var consentEditData = this.view.segEditConsent.data;
    var consentSegData = this.view.segConsentTypes.data;
    var enableSave = false;

    for(var i=0;i<consentSegData.length;i++){
      for(var j=0;j<consentSegData[i][1].length;j++){

        if (consentEditData[i][1][j].switchSelectIndex.selectedIndex !== consentSegData[i][1][j].switchSelectIndex.selectedIndex) {
          enableSave = true; 
          this.enableSaveButton();
          break;
        }
      }
    }


    if (!enableSave) {     
      this.disableSaveButton();
    }

  },

  saveOnClick : function(){

    //   this.view.segConsentTypes.widgetDataMap = this.getWidgetDataMap();
    //under construction -> send   this.view.segEditConsent.data to API and return with a reload of the page
    // var consentTypes = [];
    this.view.customHeader.btnRight.text = kony.i18n.getLocalizedString("kony.mb.common.Edit");
    this.view.customHeader.flxBack.setVisibility(true);       
    this.view.flxButton.setVisibility(false);
    this.view.segEditConsent.setVisibility(false);

    var editConsentData = this.view.segEditConsent.data;
    var initialConsentData = this.view.segConsentTypes.data;
    var consentResponse =  scope_CDPPresenter.consentRespData;

    for(i=0;i<editConsentData.length;i++){
      var subTypes = consentResponse.consentTypes[0].consents[i].subTypes;

      for(j=0;j<editConsentData[i][1].length;j++){
        if (editConsentData[i][1][j].switchSelectIndex.selectedIndex !== initialConsentData[i][1][j].switchSelectIndex.selectedIndex) {
          if (typeof subTypes !== "undefined" && subTypes.length > 0){
            this.consentSubTypes(editConsentData, consentResponse);
          }
          else{
            this.consentDetails(editConsentData, consentResponse);
          }
        }
      }
    }

    applicationManager.getPresentationUtility().showLoadingScreen();
    var settingsModule = applicationManager.getModulesPresentationController({"moduleName" : "CDPConsentUIModule", "appName" : "ConsentMgmtMA"});
    settingsModule.updateConsentData(consentResponse);
  },

  consentSubTypes : function(editConsentData, consentResponse)
  { 
    if(editConsentData[i][1][j].switchSelectIndex.selectedIndex === 1){
      consentResponse.consentTypes[0].consents[i].subTypes[j].consentSubTypeGiven = "NO";
    }
    else{
      consentResponse.consentTypes[0].consents[i].subTypes[j].consentSubTypeGiven = "YES";
    }
  },

  consentDetails : function(editConsentData, consentResponse)
  {
    if(editConsentData[i][1][j].switchSelectIndex.selectedIndex === 1){
      consentResponse.consentTypes[0].consents[i].consentGiven = "NO";             
    }
    else{
      consentResponse.consentTypes[0].consents[i].consentGiven = "YES";
    }
  },

  getWidgetDataMap : function () {
    var map = {
      lblConsent : "lblConsentHeading",
      lblErrorText : "lblErrorText",
      imgErrIcon : "imgErrorIcon", 
      lblConsentBlocked : "lblConsentBlocked",
      lblPlaceholder : "lblPlaceholder",
      lblDetailsConsent : "lblDetailsConsent",
      lblValue : "lblValue",
      switchSelect : "switchSelectIndex"
    };
    return map;
  },

  setDataVisible:function(vissible){

    this.view.flxMainContainer.setVisibility(vissible);
    this.view.customHeader.btnRight.setVisibility(vissible);  
    this.view.flxBodyText.setVisibility(vissible);
    this.view.flxError.setVisibility(!vissible);

  }


});