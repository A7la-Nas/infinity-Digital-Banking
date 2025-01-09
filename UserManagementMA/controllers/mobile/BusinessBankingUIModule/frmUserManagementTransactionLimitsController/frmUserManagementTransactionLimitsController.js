define(['CommonUtilities'], function (CommonUtilities) {
  return{
    onNavigate: function () {
      try {
      } catch (e) {
        kony.print("Exception in onNavigate" + e);
      }
    },

    init : function(){
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
      this.view.preShow = this.preShowFunction;
      this.BussinessBankingModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('BusinessBankingUIModule');
    },

    preShowFunction : function(){
      try{
        var navManager = applicationManager.getNavigationManager();
        var title = navManager.getCustomInfo("usermgmtAccountName"); 
        if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
          this.view.title = title;
          this.view.flxHeader.isVisible = false;
        }else{
          this.view.customHeader.lblLocateUs.text = title;
          this.view.flxHeader.isVisible = true;
        } 
        this.view.lblNodatafound.isVisible = false;
        this.view.expandCollapseView.isVisible = true;
        this.view.customHeader.flxBack.onClick = this.backNavigation; 
        this.fetchAccountDetails();
      }catch(er){
      }
    },

    /*
      *fetchAccountDetails - This function is to parse data from response
      */
    fetchAccountDetails: function () {
      try {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var navManager = applicationManager.getNavigationManager();
        var selectedData=navManager.getCustomInfo("usermgmtTranstionLimit"); 
        var features =selectedData["featureData"];
        var accounDetailArray=[];
        var configManager = applicationManager.getConfigurationManager();
        features.forEach(function(featureType) {
          var actions = featureType["Actions"];          
          actions.forEach(function(element) {
            if (element["isSelected"] === true && element["actionType"] === "MONETARY") {
              var headerJson={
                "template": "flxApprovalReqExpColHeader",
                "lblHeader": { "text": element["actionName"] },
                "imgUpArrow": { "src": "blue_uparrow.png" },
              };
              var header = [kony.i18n.getLocalizedString("kony.mb.user.transationLimits"),
                            kony.i18n.getLocalizedString("kony.mb.user.PreApproveLimit"),
                            kony.i18n.getLocalizedString("kony.mb.user.DenialLimit")];
              var subHeader = [kony.i18n.getLocalizedString("kony.mb.user.PerTransaction"),
                               kony.i18n.getLocalizedString("kony.mb.user.Daily"),
                               kony.i18n.getLocalizedString("kony.mb.user.Weekly")];
              var rowArray=[];
              var transrowObj = {
                "template": "flxUserTransactionMgmt",
                "lblHeader": { "text": "" + header[0] },
                "lblPerTransaction": { "text": "" + subHeader[0] },
                "lblDaily": { "text": "" + subHeader[1] },
                "lblWeekly": { "text": "" + subHeader[2] },  
                "flxSeparator":{isVisible:true},
                "lblPTAmt": { "text": configManager.getCurrencyCode()+" "+CommonUtilities.formatCurrencyWithCommas((kony.sdk.isNullOrUndefined(element["MAX_TRANSACTION_LIMIT"]) ? "0" : 
                                                                                                                    element["MAX_TRANSACTION_LIMIT"]), true) + " "},
                "lblDailyAmt": { "text": configManager.getCurrencyCode()+" "+CommonUtilities.formatCurrencyWithCommas((kony.sdk.isNullOrUndefined(element["DAILY_LIMIT"]) ? "0" : 
                                                                                                                       element["DAILY_LIMIT"]), true) + " "},
                "lblWeeklyAmt": { "text": configManager.getCurrencyCode()+" "+CommonUtilities.formatCurrencyWithCommas((kony.sdk.isNullOrUndefined(element["WEEKLY_LIMIT"]) ? "0" : 
                                                                                                                        element["WEEKLY_LIMIT"]), true) + " "},
              };
              rowArray.push(transrowObj);

              var preapproverowObj = {
                "template": "flxUserTransactionMgmt",
                "lblHeader": { "text": "" + header[1] },
                "lblPerTransaction": { "text": "" + subHeader[0] },
                "lblDaily": { "text": "" + subHeader[1] },
                "lblWeekly": { "text": "" + subHeader[2] },
                "flxSeparator":{isVisible:true},
                "lblPTAmt": { "text": configManager.getCurrencyCode()+" "+CommonUtilities.formatCurrencyWithCommas((kony.sdk.isNullOrUndefined(element["PER_TRANSACTION_APPROVE_LIMIT"]) ? "0" : 
                                                                                                                    element["PER_TRANSACTION_APPROVE_LIMIT"]), true) + " "},
                "lblDailyAmt": { "text": configManager.getCurrencyCode()+" "+CommonUtilities.formatCurrencyWithCommas((kony.sdk.isNullOrUndefined(element["DAILY_APPROVE_LIMIT"]) ? "0" : 
                                                                                                                       element["DAILY_APPROVE_LIMIT"]), true) + " "},
                "lblWeeklyAmt": { "text": configManager.getCurrencyCode()+" "+CommonUtilities.formatCurrencyWithCommas((kony.sdk.isNullOrUndefined(element["WEEKLY_APPROVE_LIMIT"]) ? "0" : 
                                                                                                                        element["WEEKLY_APPROVE_LIMIT"]), true) + " "},
              };
              rowArray.push(preapproverowObj);
              var denialObj= {
                "template": "flxUserTransactionMgmt",
                "lblHeader": { "text": "" + header[2] },
                "lblPerTransaction": { "text": "" + subHeader[0] },
                "lblDaily": { "text": "" + subHeader[1] },
                "lblWeekly": { "text": "" + subHeader[2] },
                "flxSeparator":{isVisible:false},
                "lblPTAmt": { "text": configManager.getCurrencyCode()+" "+CommonUtilities.formatCurrencyWithCommas((kony.sdk.isNullOrUndefined(element["PER_TRANSACTION_DENIAL_LIMIT"]) ? "0" : 
                                                                                                                    element["PER_TRANSACTION_DENIAL_LIMIT"]), true) + " "},
                "lblDailyAmt": { "text": configManager.getCurrencyCode()+" "+CommonUtilities.formatCurrencyWithCommas((kony.sdk.isNullOrUndefined(element["DAILY_DENIAL_LIMIT"]) ? "0" : 
                                                                                                                       element["DAILY_DENIAL_LIMIT"]), true) + " "},
                "lblWeeklyAmt": { "text": configManager.getCurrencyCode()+" "+CommonUtilities.formatCurrencyWithCommas((kony.sdk.isNullOrUndefined(element["WEEKLY_DENIAL_LIMIT"]) ? "0" : 
                                                                                                                        element["WEEKLY_DENIAL_LIMIT"]), true) + " "},
              };
              rowArray.push(denialObj);
              accounDetailArray.push([headerJson,rowArray]);
            }

          });         
        });

        var widgetDataMap= {
          "lblHeader": "lblHeader",
          "flxBody": "flxBody",
          "lblPerTransaction": "lblPerTransaction",
          "lblPTAmt": "lblPTAmt",
          "lblDaily": "lblDaily",
          "lblDailyAmt": "lblDailyAmt",
          "lblWeekly": "lblWeekly",
          "lblWeeklyAmt": "lblWeeklyAmt",
          "flxSeparator":"flxSeparator",
          "flxImgUp": "flxImgUp",
          "imgUpArrow": "imgUpArrow",
        };
        
        if(accounDetailArray.length===0){
          this.view.lblNodatafound.isVisible = true;
          this.view.expandCollapseView.isVisible = false;       
        }else{
          this.view.expandCollapseView.setDataInList(widgetDataMap,accounDetailArray); 
        }

        applicationManager.getPresentationUtility().dismissLoadingScreen();
      } catch (e) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        kony.print("fetchAccountDetails error"+e);
      }
    },
    backNavigation: function () {
      try {
        var navMan=applicationManager.getNavigationManager();
        navMan.navigateTo("UserPermissions"); 
      } catch (e) {
        kony.print("exception backNavigation" + e);
      }
    },
  };

});