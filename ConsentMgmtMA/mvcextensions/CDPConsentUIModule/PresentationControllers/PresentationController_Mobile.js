define(["CommonsMA/AsyncManager/BusinessControllers/BusinessController"], function(AsyncManager) {
  function CDPConsentUIModule_PresentationController() {
    scope_CDPPresenter = this;
    kony.mvc.Presentation.BasePresenter.call(this);
    scope_CDPPresenter.consentRespData = null;


  }
  inheritsFrom(CDPConsentUIModule_PresentationController, kony.mvc.Presentation.BasePresenter);
  CDPConsentUIModule_PresentationController.prototype.initializePresentationController = function() {
  };
  CDPConsentUIModule_PresentationController.prototype.commonFunctionForNavigation = function(formName) {
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo(formName);
  };
  
  
  CDPConsentUIModule_PresentationController.prototype.getConsentData = function() {
 //   var settingsManager = applicationManager.getSettingsManager();
    applicationManager.getCDPConsentManager().getConsentData(this.getConsentDataSuccess, this.getConsentDataError);
    
  };
  
  CDPConsentUIModule_PresentationController.prototype.getConsentDataSuccess = function(response) {

    scope_CDPPresenter.consentRespData = response;
    var controller = applicationManager.getPresentationUtility().getController('frmConsentManagement', true);  

    if(response.consentTypes !== undefined){
      controller.setSegmentData(scope_CDPPresenter.mapConsentData(response));
    }else{
      controller.showErrorMessage(applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.consent.no.records'));
    }

  };

  CDPConsentUIModule_PresentationController.prototype.getConsentDataError = function(error) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var controller = applicationManager.getPresentationUtility().getController('frmConsentManagement', true);
      controller.showErrorMessage(error.errorMessage);

  };
  
  CDPConsentUIModule_PresentationController.prototype.updateConsentData = function(consentDetails) {
    
    var consentData = {
      "arrangementId": consentDetails.consentTypes[0].arrangementId,
      "consent": JSON.stringify({
        'consentTypes': consentDetails.consentTypes[0].consents
      }, ['consentTypes','consentType', 'consentGiven', 'subTypes', 'consentSubType', 'consentSubTypeGiven']).replace(/"/g, "'").replace(/consentSubTypeGiven/g, "subTypeConsentGiven")

    };
    var consentManager = applicationManager.getCDPConsentManager();
    consentManager.updateConsentData(consentData, this.updateConsentDataSuccess, this.updateConsentDataError);
    
  };
  
  CDPConsentUIModule_PresentationController.prototype.updateConsentDataSuccess = function(response) {
   scope_CDPPresenter.getConsentData();
    
  };

  CDPConsentUIModule_PresentationController.prototype.updateConsentDataError = function(error) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var controller = applicationManager.getPresentationUtility().getController('frmConsentManagement', true);
      controller.showErrorMessage(error.errorMessage);

  };

  CDPConsentUIModule_PresentationController.prototype.updateUserConsent = function(inputParams,successCallback,failureCallback){
    var consentManager = applicationManager.getCDPConsentManager();
    consentManager.updateUserAlerts(inputParams,successCallback,failureCallback);
  };

  
  CDPConsentUIModule_PresentationController.prototype.mapConsentData = function(response) {

    
    var resConsentTypes = response.consentTypes[0].consents;
    var viewEditBtn = false;
    var allConsent = [];    

    for (var item in resConsentTypes) {
      var consData = [];
      var subTypesPresent = "";
      var consentGivenYes = "";
      var placeholderText = "";
      
      switch(resConsentTypes[item].consentType){

            case "CREDITCHECK" :placeholderText = applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.consent.creditCheck'); 
              break;
            case "DATAPROFILING" :placeholderText = applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.consent.dataProfiling'); 
              break;
            case "DIRECTMKTING" :placeholderText = applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.consent.directMarketing'); 
              break;
            case "PERSONALLOAN" :placeholderText = applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.consent.personalLoan'); 
              break;
            default :placeholderText = applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.consent.dataProfiling'); 
          }
      
      var consentDataRow = {
          lblDetailsConsent : "",
          lblValue : "",
          switchSelectIndex : ""
        };
      
      if (resConsentTypes[item].subTypes)  {
        subTypesPresent = true;

        for (var subItem in resConsentTypes[item].subTypes){
          
          var subTypeChannel;
          
          switch(resConsentTypes[item].subTypes[subItem].consentSubType){

            case "EMAIL" : subTypeChannel = applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.consent.email'); 
              break;
            case "PHONE" :subTypeChannel = applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.consent.phone'); 
              break;
            case "SMS" : subTypeChannel = applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.consent.sms'); 
              break;
            default : subTypeChannel = applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.Alerts.pushNotifications'); 
          }
                              
           consentDataRow = {          
          "lblDetailsConsent" : {
            "text":subTypeChannel,
            "accessibilityconfig": {
              "a11yLabel": subTypeChannel
          }
          },           
            lblValue : "",
            switchSelectIndex : ""
          };
          
          if(resConsentTypes[item].subTypes[subItem].consentSubTypeGiven === "YES"){
            consentGivenYes = true;
            consentDataRow.switchSelectIndex = {"isVisible":true, "selectedIndex":0, "enable":((resConsentTypes[item].consentBlock === "YES")?false:true)};
            consentDataRow.lblValue = {"isVisible":true, "text": applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.common.Yes'), "accessibilityConfig": {"a11yLabel": applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.common.Yes')}};
          } else {
            consentDataRow.switchSelectIndex = {"isVisible":true, "selectedIndex":1, "enable":((resConsentTypes[item].consentBlock === "YES")?false:true)};     
            consentDataRow.lblValue = {"isVisible":true, "text": applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.common.No'), "accessibilityConfig": {"a11yLabel": applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.common.No')}};
          }

          consData.push(consentDataRow);
        }
      } else {

        subTypesPresent = false;
         consentDataRow = {
          lblDetailsConsent : "",
          lblValue : "",
          switchSelectIndex : ""
        };

        consentDataRow.lblDetailsConsent = {"text":applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.consent.allow') + ' ' + resConsentTypes[item].consentTypeName, "accessibilityConfig": {"a11yLabel": applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.consent.allow') + ' ' + resConsentTypes[item].consentTypeName}};                
        
        if(resConsentTypes[item].consentGiven === "YES"){
          consentGivenYes = true;
          consentDataRow.switchSelectIndex = {"isVisible":true, "selectedIndex":0, "enable":((resConsentTypes[item].consentBlock === "YES")?false:true)}; 
          consentDataRow.lblValue = {"isVisible":true, "text" : applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.common.Yes'), "accessibilityConfig": {"a11yLabel": applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.common.Yes')}};
        } else {
          consentDataRow.switchSelectIndex = {"isVisible":true, "selectedIndex":1, "enable":((resConsentTypes[item].consentBlock === "YES")?false:true)};
          consentDataRow.lblValue = {"isVisible":true, "text" : applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.common.No'), "accessibilityConfig": {"a11yLabel": applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.common.No')}};
        }

        consData.push(consentDataRow);
      }

      var consHeader  = {
        "lblConsentHeading" : {
          "text":resConsentTypes[item].consentTypeName,
          "accessibilityConfig": {
          "a11yLabel":resConsentTypes[item].consentTypeName
          }
        },
        "lblPlaceholder":{
          "text":placeholderText,
          "accessibilityConfig": {
          "a11yLabel":placeholderText
          }
        }
      };
          

      if (resConsentTypes[item].consentBlock === "YES") {
        consHeader.lblErrorText = {"isVisible" : true, "text" : applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.consent.block.message'), "accessibilityConfig": {"a11yLabel": applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.consent.block.message')}};
        consHeader.imgErrorIcon = {"isVisible" : true};
 
        if (consentGivenYes === true) {
          consHeader.lblConsentBlocked = {"isVisible" : true, "text" : applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.consent.block.alert'), "accessibilityConfig": {"a11yLabel": applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.consent.block.alert')}};
        }    
      } else {
        viewEditBtn = true;
      }

      allConsent.push([
        consHeader,
        consData 
      ]);
    }
     
     return {allConsent:allConsent, viewEditBtn:viewEditBtn};   
     
   };
 
  
  return CDPConsentUIModule_PresentationController;
});