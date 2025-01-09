define(["CommonsMA/AsyncManager/BusinessControllers/BusinessController"], function(AsyncManager) {
  function PSD2ConsentUIModule_PresentationController() {
    scope_PSD2Presenter = this;
    var defaultAcc;
    kony.mvc.Presentation.BasePresenter.call(this);
    this.flowType="";
    this.newUserName="";
    this.eStatementPopup="";
    this.estatementData={};
    this.currLatitude ="";
    this.currLongitude ="";
    scope_PSD2Presenter.userAddressFlowtype = null;
    this.AddressTypes = {
      "ADR_TYPE_WORK": 'Work',
      "ADR_TYPE_HOME": 'Home'
    };
    this.asyncManager = new AsyncManager();
   // this.alertsManager = applicationManager.getAlertsManager();
    scope_PSD2Presenter.consentRespData = null;
    scope_PSD2Presenter.tppData = null;
    scope_PSD2Presenter.numberOfAsyncForAlerts = 2;
    scope_PSD2Presenter.numberOfAsyncForLocation = 3;
    this.selectedCityAndStateCodes="";
    this.userPreferredAddress="";
    this.alertsCurrency="";
    this.accountNum = "";
	scope_PSD2Presenter.numberOfDays = 10;
  }
  inheritsFrom(PSD2ConsentUIModule_PresentationController, kony.mvc.Presentation.BasePresenter);
  PSD2ConsentUIModule_PresentationController.prototype.initializePresentationController = function() {
  };
  PSD2ConsentUIModule_PresentationController.prototype.commonFunctionForNavigation = function(formName) {
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo(formName);
  };
  
  
  PSD2ConsentUIModule_PresentationController.prototype.getConsentData = function() {
    var settingsManager = applicationManager.getPSD2ConsentManager();
    settingsManager.getConsentData(this.getConsentDataSuccess, this.getConsentDataError);
    
  };
  
  PSD2ConsentUIModule_PresentationController.prototype.getConsentDataSuccess = function(response) {

    scope_PSD2Presenter.consentRespData = response;
    var controller = applicationManager.getPresentationUtility().getController('frmConsentManagement', true);  

    if(response.consentTypes !== undefined){
      controller.setSegmentData(scope_PSD2Presenter.mapConsentData(response));
    }else{
      controller.showErrorMessage(applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.consent.no.records'));
    }

  };

  PSD2ConsentUIModule_PresentationController.prototype.getConsentDataError = function(error) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var controller = applicationManager.getPresentationUtility().getController('frmConsentManagement', true);
      controller.showErrorMessage(error.errorMessage);

  };
  
  PSD2ConsentUIModule_PresentationController.prototype.updateConsentData = function(consentDetails) {
    
    var consentData = {
      "arrangementId": consentDetails.consentTypes[0].arrangementId,
      "consent": JSON.stringify({
        'consentTypes': consentDetails.consentTypes[0].consents
      }, ['consentTypes','consentType', 'consentGiven', 'subTypes', 'consentSubType', 'consentSubTypeGiven']).replace(/"/g, "'").replace(/consentSubTypeGiven/g, "subTypeConsentGiven")

    };
    var settingsManager = applicationManager.getPSD2ConsentManager();
    settingsManager.updateConsentData(consentData, this.updateConsentDataSuccess, this.updateConsentDataError);
    
  };
  
  PSD2ConsentUIModule_PresentationController.prototype.updateConsentDataSuccess = function(response) {
    
   scope_PSD2Presenter.getConsentData();
    
  };

  PSD2ConsentUIModule_PresentationController.prototype.updateConsentDataError = function(error) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var controller = applicationManager.getPresentationUtility().getController('frmConsentManagement', true);
      controller.showErrorMessage(error.errorMessage);

  };

  PSD2ConsentUIModule_PresentationController.prototype.updateUserConsent = function(inputParams,successCallback,failureCallback){
    var settingsManager = applicationManager.getPSD2ConsentManager();
    settingsManager.updateUserAlerts(inputParams,successCallback,failureCallback);
  };

  
  PSD2ConsentUIModule_PresentationController.prototype.mapConsentData = function(response) {

    
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
          };
                              
          var consentDataRow = {          
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
        var consentDataRow = {
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
    };
     
     return {allConsent:allConsent, viewEditBtn:viewEditBtn};   
     
   };

  
  PSD2ConsentUIModule_PresentationController.prototype.getTPPData = function() {
    var settingsManager = applicationManager.getPSD2ConsentManager();
    settingsManager.getPSD2ConsentData(this.getTPPDataSuccess, this.getTPPDataError);
  };

  PSD2ConsentUIModule_PresentationController.prototype.getTPPDataSuccess = function(response) {
    var notRevoked = [];
    for (item in response.consentTypes){
      if (response.consentTypes[item].consentStatus.toUpperCase() !== "REVOKEDBYPSU") {
        notRevoked.push(response.consentTypes[item]);
      }
    }
    scope_PSD2Presenter.tppData = response.consentTypes;
    var controller = applicationManager.getPresentationUtility().getController('frmSelectTPP', true); 
    if(response.consentTypes !== undefined && response.consentTypes.length){
      controller.setSegmentData(scope_PSD2Presenter.mapTPPData(response.consentTypes));
    }else{
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      controller.showErrorMessage(applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.consent.no.tpp'));
    }
  };
  PSD2ConsentUIModule_PresentationController.prototype.getTPPDataError = function(error) {	
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var controller = applicationManager.getPresentationUtility().getController('frmSelectTPP', true);
    controller.showErrorMessage(error.errorMessage);
  };

  PSD2ConsentUIModule_PresentationController.prototype.mapTPPData = function(response) {
    var formatUtil = applicationManager.getFormatUtilManager();
    var tppData = [];

    for (var item in response) {
//      if(response[item].consentStatus.toUpperCase() !== "REVOKEDBYPSU"){
        var isBlocked = false;
        var lblDaysLeft;
		var consentStatus = response[item].consentStatus;

        if (response[item].consentStatus !== undefined && response[item].consentStatus.toUpperCase() === "VALID") {
          if (response[item].tppStatus !== undefined && response[item].tppStatus.toUpperCase() === "BLOCKED") {
            isBlocked = true;
            
            lblDaysLeft = {
              "skin":"sknLblEE0005SSP26px",
              "text": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.consent.blocked.status"),
              "accessibilityConfig": {"a11yLabel":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.consent.blocked.status")}
            };
          } else{   
            var dateDiff = formatUtil.getNumberOfDaysBetweenTwoDates(new Date(response[item].validUntil), new Date());
            var skinDaysLeft = (dateDiff < scope_PSD2Presenter.numberOfDays)?"sknLblE5690BSSP26px":"sknLbl04AA16SSP26px";
            var textDaysLeft = dateDiff.toString() + " " + applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.consent.days.left");
            lblDaysLeft = {"skin":skinDaysLeft,"text":textDaysLeft,"accessibilityConfig": {"a11yLabel":textDaysLeft}};

          }
        } else {
			var lblStatus = "";
			var expDate = "";
          switch (response[item].consentStatus.toUpperCase()){
            case "EXPIRED":
              lblStatus = kony.i18n.getLocalizedString("kony.mb.consent.expired.status");
              break;
            case "REVOKEDBYPSU":
              lblStatus = kony.i18n.getLocalizedString("kony.mb.consent.revokedByPSU");
              break;					
            case "TERMINATEDBYTPP":
              lblStatus = kony.i18n.getLocalizedString("kony.mb.consent.terminatedByTPP");
              break;
            default :
              lblStatus = "Non valid from: ";
          }
		
          lblDaysLeft = {
            "skin":"sknLblEE0005SSP26px",
            "text": lblStatus,
            "accessibilityConfig": {"a11yLabel": lblStatus}
          };
          if (response[item].tppStatus !== undefined && response[item].tppStatus.toUpperCase() === "BLOCKED") {
            isBlocked = true;
          }
			
        }

        var labelTPP = (response[item].thirdpartyprovider !== undefined && response[item].thirdpartyprovider !== "")? response[item].thirdpartyprovider : "Third Party Provider Bank"

        var imageTPP = {"src": (response[item].imagePath != undefined && response[item].imagePath != "") ? response[item].imagePath : "bankicon.png",
                        "accessibilityConfig": {
                        "a11yLabel":response[item].thirdpartyprovider + "logo"
                      }};
        var tppRecord  = {
          "id": response[item].arrangementId,
          "imgTPP" : imageTPP,			
          "lblTPP" : labelTPP,
          "lblDaysLeft" : lblDaysLeft,
          "isBlocked" : isBlocked,
		  "consentStatus": consentStatus};
        tppData.push(tppRecord);
//      }

    }
    return tppData;
  };
  PSD2ConsentUIModule_PresentationController.prototype.updatePSD2Consent = function(arrangementId){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var settingsManager = applicationManager.getPSD2ConsentManager();
    var mfaManager = applicationManager.getMFAManager();
    mfaManager.setMFAFlowType("PSD2_TPP_CONSENT_REVOKED");
    var consentString = "{'consentStatuses': [{'consentStatus': 'revokedByPsu'}]}"
    
    var params = {
      "arrangementId": arrangementId,
      "consent": consentString,
    };
    settingsManager.updatePSD2ConsentData(params,scope_PSD2Presenter.updatePSDConsentSuccess, scope_PSD2Presenter.updatePSDConsentFailure);
  };
  
  PSD2ConsentUIModule_PresentationController.prototype.updatePSDConsentSuccess = function(data){
    
  
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    
      if(data.MFAAttributes && data.MFAAttributes.isMFARequired == "true"){
        var mfaJSON = {
          "flowType" : "PSD2_TPP_CONSENT_REVOKED",
          "response" : data
        };
        applicationManager.getMFAManager().initMFAFlow(mfaJSON);
      } else {
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo({"appName":"ConsentMgmtMA", "friendlyName":"PSD2ConsentUIModule/frmSelectTPP"});
      }
   
    
  };
  
  PSD2ConsentUIModule_PresentationController.prototype.updatePSDConsentFailure = function(error){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var controller = applicationManager.getPresentationUtility().getController('frmSelectTPP', true);
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo({"appName":"ConsentMgmtMA", "friendlyName":"PSD2ConsentUIModule/frmSelectTPP"});
    controller.showErrorMessage(error.errorMessage);
  };
  
  
  PSD2ConsentUIModule_PresentationController.prototype.mapTPPSelectBank = function(rowId) {
    var controller = applicationManager.getPresentationUtility().getController('frmTppBankNameSelection', true);     
    var formatUtil = applicationManager.getFormatUtilManager();
    var accountDataTpp = [];
    var tppResponse = scope_PSD2Presenter.tppData;
    if ((tppResponse[rowId].consentStatus.toUpperCase() === "VALID") || (tppResponse[rowId].consentStatus.toUpperCase() === "EXPIRED")) {
      var ddValid = tppResponse[rowId].validUntil.substring(0,2);
      var mmValid = tppResponse[rowId].validUntil.substring(3,6);
      var yyyyValid = tppResponse[rowId].validUntil.substring(7,11);
    } else {
      var ddValid = tppResponse[rowId].lastActionDate.substring(0,2);
      var mmValid = tppResponse[rowId].lastActionDate.substring(3,6);
      var yyyyValid = tppResponse[rowId].lastActionDate.substring(7,11);
    }
	
    //"MMM-DD-YYYY"
    var validDate = mmValid + "-" + ddValid + "-" + yyyyValid;

    var configManager = applicationManager.getConfigurationManager()
    var expiryDate = formatUtil.getFormatedDateString(new Date(validDate), configManager.frontendDateFormat[configManager.getLocale()]);
  
    
    var accounts = tppResponse[rowId].accountIBANs;
    
    for (var item in accounts) {

      let ibanItem = accounts[item].accountIBAN;
      if (ibanItem.length > 6){
        ibanItem = ibanItem.match(/.{4}/g).join(' ');
      }

      var accDetails  = {
        "lblTitle" : accounts[item].shortName,
        "lblDetails" : ibanItem
      };
      accountDataTpp.push(accDetails);
    }
    controller.showExpiryDate(expiryDate);
    controller.setSegmentData(accountDataTpp);
    controller.view.forceLayout();
  };
    
  PSD2ConsentUIModule_PresentationController.prototype.mapAccountDetails = function(rowId, iban, rowIndexTppRes) {
    var controller = applicationManager.getPresentationUtility().getController('frmTppAccountDetails', true);          
    var consentTypeTpp = [];
    var tppResponse = scope_PSD2Presenter.tppData;    
    var accounts = tppResponse[rowIndexTppRes].accountIBANs;

    var consentTypes = accounts[rowId].consents;
	
	var signUpService = tppResponse[rowIndexTppRes].signUpService;
	if (signUpService === "CBPII") {
		consentTypeTpp.push({"lblTitle" : kony.i18n.getLocalizedString("i18n.ProfileManagement.CBPII"),
                         "lblDetails" : kony.i18n.getLocalizedString("i18n.ProfileManagement.CBPII")
                        });
	} else {
		for(var type in consentTypes){
			consentTypeTpp.push({"lblTitle" : consentTypes[type].description,
                             "lblDetails" : consentTypes[type].fullDescription
                            });
		}
	}
    controller.setSegmentData(consentTypeTpp);
  };
  
  return PSD2ConsentUIModule_PresentationController;
});