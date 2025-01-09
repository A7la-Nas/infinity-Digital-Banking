define({
  init : function(){
     var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  preShow: function() {
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
    }
    else{
      this.view.flxHeader.isVisible = false;
    }
    this.setFlowActions();
  },
  setFlowActions : function(){
    var scope = this;
    this.view.customHeader.flxBack.onClick = function() {
      applicationManager.getPresentationUtility().showLoadingScreen();
      var navMan=applicationManager.getNavigationManager();
      navMan.goBack();
    };
    this.view.segEditComunicationDetails.onRowClick = function(){
      scope.changeRowselection();
    };
  },

   /**
  * set alert communication details for edit
  * @param {object} alertData - alertData from backend service response.
  */
  bindData: function(alertCommunication) {
    if(alertCommunication.type === "PHONE"){
      this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.Alerts.SelectPhoneNumber");
      this.view.title = kony.i18n.getLocalizedString("kony.mb.Alerts.SelectPhoneNumber");
      this.view.lblEditSubHeader.text =  kony.i18n.getLocalizedString("kony.mb.Alerts.SelectPreferredPhoneNumber");
      this.setEditContactNumberData(alertCommunication);
    } else{
      this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.Alerts.SelectEmail");
      this.view.title = kony.i18n.getLocalizedString("kony.mb.Alerts.SelectEmail");
      this.view.lblEditSubHeader.text = kony.i18n.getLocalizedString("kony.mb.Alerts.SelectPreferredEmail");
      this.setEditEmailData(alertCommunication);
    }
  },
  /**
  * set contact numbers for segment
  * @param {object} communicationData - contain the selected type, value,userinfo details
  */
  setEditContactNumberData : function(communicationData){
    var widgetMap = {
      "type":"type",
      "lblDetail":"lblDetail",
      "lblDetailValue":"lblDetailValue",
      "flxSelectTick":"flxSelectTick",
      "imgTick":"imgTick",
      "flxSeparator":"flxSeparator",
      "flxDetails":"flxDetails",
      "flxAlertCommunication":"flxAlertCommunication"
    };
    var userInfo = communicationData.data;
    if(userInfo.ContactNumbers && userInfo.ContactNumbers.length > 0 ){
      var segData = userInfo.ContactNumbers.map(function(rec){
        return {
          "type":"PHONE",
          "lblDetail":rec.Extension+":",
          "lblDetailValue":rec.Value,
          "flxSelectTick":(rec.Value === communicationData.assignedValue.Value) ?{"isVisible":true}: {"isVisible":false},
          "imgTick":"tickmark_green.png",
          "flxSeparator":"flxSeparator",
          "template":"flxAlertCommunication"
        };
      });
      this.view.segEditComunicationDetails.widgetDataMap = widgetMap;
      this.view.segEditComunicationDetails.setData(segData);
      this.view.segEditComunicationDetails.info = {"communiationDetails":userInfo.ContactNumbers};
      this.view.segEditComunicationDetails.setVisibility(true);
    }
    this.view.flxEditCommunication.forceLayout();
  },
  /**
  * set email for segment
  * @param {object} communicationData - contain the selected type, value,userinfo details
  */
  setEditEmailData : function(communicationData){
    var widgetMap = {
      "type":"type",
      "lblDetail":"lblDetail",
      "lblDetailValue":"lblDetailValue",
      "flxSelectTick":"flxSelectTick",
      "imgTick":"imgTick",
      "flxSeparator":"flxSeparator",
      "flxDetails":"flxDetails",
      "flxAlertCommunication":"flxAlertCommunication"
    };
    var userInfo = communicationData.data;
    if(userInfo.EmailIds && userInfo.EmailIds.length > 0 ){
      var segData = userInfo.EmailIds.map(function(rec){
        return {
          "type":"EMAIL",
          "lblDetail":rec.Extension+":",
          "lblDetailValue":rec.Value,
          "flxSelectTick":(rec.Value === communicationData.assignedValue.Value) ?
          {"isVisible":true}: {"isVisible":false},
          "flxSeparator":"flxSeparator",
          "imgTick": "tickmark_green.png",
          "template":"flxAlertCommunication"
        };
      });
      this.view.segEditComunicationDetails.widgetDataMap = widgetMap;
      this.view.segEditComunicationDetails.setData(segData);
      this.view.segEditComunicationDetails.info = {"communiationDetails":userInfo.EmailIds};
      this.view.segEditComunicationDetails.setVisibility(true);
    }

    this.view.flxEditCommunication.forceLayout();
  },
  /**
  * change row selection
  */
  changeRowselection : function(){
    var selInd = this.view.segEditComunicationDetails.selectedRowIndex[1];
    var segData = this.view.segEditComunicationDetails.data;
    this.updateCommunication(this.view.segEditComunicationDetails.info.communiationDetails[selInd], segData[selInd].type);
    for(var i=0;i<segData.length;i++){
      if(segData[i].lblDetailValue === segData[selInd].lblDetailValue){
        segData[i].flxSelectTick.isVisible = true;
        this.view.segEditComunicationDetails.setDataAt(segData[i], i);
      } else if(segData[i].flxSelectTick.isVisible === true){
        segData[i].flxSelectTick.isVisible = false;
        this.view.segEditComunicationDetails.setDataAt(segData[i], i);
      }
    }
    
  },
  /**
  * call update alert communication service
  * @param: selected communication details
  * @param: type email/phone
  */
  updateCommunication : function(data,type){
    var SettingsAlertsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
    var payLoad;
    if(type === "PHONE"){
      payLoad = [{
        "id": data.id,
        "Extension":data.Extension,
        "isPrimary": (data.isPrimary === "true") ? "1" : "0",
        "phoneNumber": data.phoneNumber,
        "phoneCountryCode":data.phoneCountryCode,
        "isAlertsRequired":"1"
      }];
      payLoad = JSON.stringify(payLoad);
      payLoad = payLoad.replace(/"/g, "'");
      SettingsAlertsUIModule.presentationController.updateAlertCommunicationPhoneNumber(payLoad);
    } else{
      payLoad = [{
        "id": data.id,
        "Extension":data.Extension,
        "isPrimary": (data.isPrimary === "true") ? "1" : "0",
        "value": data.Value,
        "isAlertsRequired":"1"
      }];
      payLoad = JSON.stringify(payLoad);
      payLoad = payLoad.replace(/"/g, "'");
      SettingsAlertsUIModule.presentationController.updateAlertCommunicationEmailId(payLoad);
    }
    
  },
});