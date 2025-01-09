define(['CommonUtilities'], function (CommonUtilities){ 
    return{
      previousData:{
        "legalEntityName":null,
        "legalEntityId":null
      },
      selectedEntityID:"",
      legalEntity:{},

      frmLegalEntityPreShow: function(){
        this.resetUI();
        this.initActions();
        this.renderTitleBar();
        this.loadLegalEntity();
        this.setFlowActions();
      },

      resetUI: function(){
        const navManager = applicationManager.getNavigationManager();
        this.previousData = navManager.getCustomInfo("frmForgot");
          if(this.previousData){
            this.view.lblLegalEntity.text = this.previousData.legalEntityName;
          } else {
            this.previousData = {};
            //this.view.lblLegalEntity.text = "Select the Legal Entity"
            this.view.lblLegalEntity.text = kony.i18n.getLocalizedString("kony.mb.ULT.SelectLegalEntity");
          }
        this.setContinueButtonEnableState();
        this.hideErrorMessage();
        this.view.segLegalEntity.setVisibility(false);
      },

      initActions: function(){
        const scopeObj = this;
        this.view.flxSelectLegalEntity.onTouchEnd = function(){
          scopeObj.showOrHideSegLegalEntity();
        };
      },

      renderTitleBar :function(){
        var deviceUtilManager = applicationManager.getDeviceUtilManager();
        var isIphone = deviceUtilManager.isIPhone();
        if(!isIphone){
          this.view.flxHeader.isVisible = true;
        }
        else{
          this.view.flxHeader.isVisible = true;//osama
        }
      },
      
      setFlowActions: function(){
        const scopeObj = this;
        this.view.customHeader.flxBack.onTouchEnd = function(){
          scopeObj.navigateToPreviousForm();
        };
        this.view.customHeader.btnRight.onClick = function(){
          scopeObj.navigateToPreviousForm();
        };
        this.view.btnContinueToCantSign.onClick = function(){
          scopeObj.navigateToNextForm();
        };
      },

      navigateToPreviousForm: function(){
        const navManager = applicationManager.getNavigationManager();
        const flow = navManager.getCustomInfo("userFlow")        ;
        if(flow === "cantSignIn") {
          this.onBack();
        }
        else{
          if(CommonUtilities.getSCAType() == 1){
            navManager.navigateTo({"appName" :"SelfServiceEnrolmentMA","friendlyName" : "EnrollHIDUIModule/frmEnrollActivateProfileHID"});
          } else if(CommonUtilities.getSCAType() == 2){
            navManager.navigateTo({"appName" :"SelfServiceEnrolmentMA","friendlyName" : "EnrollUnikenUIModule/frmEnrollActivateProfileUniken"});
          }
          else{
            navManager.navigateTo({"appName" :"SelfServiceEnrolmentMA","friendlyName" : "EnrollUIModule/frmEnrollActivateProfile"});
          }
          navManager.setCustomInfo("frmForgot", undefined);
        }
      },
      onBack: function(){
        const navManager = applicationManager.getNavigationManager();
      if(CommonUtilities.getSCAType() == 1){
            navManager.navigateTo(
              {
                "appName": "AuthenticationMA",
                "friendlyName": "AuthHIDUIModule/frmLoginHID"
            });
          } else if(CommonUtilities.getSCAType() == 2){
            navManager.navigateTo(
              {
                "appName": "AuthenticationMA",
                "friendlyName": "AuthUnikenUIModule/frmLoginUniken"
            });
          }
          else{
            navManager.navigateTo("frmLogin")
          }
    },

      navigateToNextForm: function(){
        const navManager = applicationManager.getNavigationManager();
        const flow = navManager.getCustomInfo("userFlow")
    		this.previousData.legalEntityId = this.selectedEntityID;
        navManager.setCustomInfo("frmForgot", this.previousData);
        flow === "cantSignIn"? navManager.navigateTo("frmForgotEnterEmailID") : navManager.navigateTo({"appName" :"SelfServiceEnrolmentMA","friendlyName" : "EnrollUIModule/frmEnrollLastName"});
        //this.view.lblLegalEntity.text = "Select the Legal Entity"
        this.view.lblLegalEntity.text = kony.i18n.getLocalizedString("kony.mb.ULT.SelectLegalEntity");
      },
  
      hideErrorMessage: function(){
        if(this.view.lblErrorMessageLegalEntity.isVisible)
        {
          this.view.lblErrorMessageLegalEntity.setVisibility(false);
        }
      },

      showErrorMessage: function(){
        if(this.view.lblErrorMessageLegalEntity.isVisible === false)
        {
          this.view.lblErrorMessageLegalEntity.text = "fetchLegalEntity Failed";
          this.view.lblErrorMessageLegalEntity.setVisibility(true);
        }
      },

      showOrHideSegLegalEntity: function(){
        if(this.view.segLegalEntity.isVisible){
          this.view.segLegalEntity.setVisibility(false);
        }
        else{
          this.view.segLegalEntity.setVisibility(true);
        }
      },

      segLegalEntityonRowClick :function(){
        this.view.lblLegalEntity.text = this.view.segLegalEntity.selectedRowItems[0].entityName;
        const navManager = applicationManager.getNavigationManager();
    		this.previousData.legalEntityName = this.view.lblLegalEntity.text;
        navManager.setCustomInfo("frmForgot", this.previousData);
        this.showOrHideSegLegalEntity();
        this.setContinueButtonEnableState();
        this.extractEntityIDfromName(this.view.lblLegalEntity.text);
      },

      extractEntityIDfromName(LegalEntityName){
        selectedId = this.legalEntity.companyLegalUnits.filter(function(item) {
          if (item.companyName === LegalEntityName) return item.id;
        });
        this.selectedEntityID = selectedId[0].id;
      },

      setContinueButtonEnableState: function(){
        const scopeObj = this;
        let lblLegalEntityIsNotEmpty = this.view.lblLegalEntity.text!=="" && this.view.lblLegalEntity.text!==kony.i18n.getLocalizedString("kony.mb.ULT.SelectLegalEntity") && this.view.lblLegalEntity.text!==null && this.view.lblLegalEntity.text!==undefined ;
        if(lblLegalEntityIsNotEmpty){
          scopeObj.view.btnContinueToCantSign.skin = "sknBtn055BAF26px";
          scopeObj.view.btnContinueToCantSign.setEnabled(true);
        } else {
          scopeObj.view.btnContinueToCantSign.skin = "sknBtna0a0a0SSPReg26px";
          scopeObj.view.btnContinueToCantSign.setEnabled(false);
        }
      },

      loadLegalEntity: function(){
        // TODO: Backend Call to be made to fetch legalEntity service
        const authMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
        let params = {};
        authMode.presentationController.fetchLegalEntity(params);
      },

      fetchLegalEntitySuccess: function(data){
        if(data !== undefined){
          this.legalEntity = data;
          this.setDataTosegLegalEntity(data);          
        }
        else{
          this.showErrorMessage();
          this.view.segLegalEntity.setVisibility(false);
        }
      },

      fetchLegalEntityFailure: function(){
        // TODO: FailureCallback for loadLegalEntity()
        this.showErrorMessage();
      },

      setDataTosegLegalEntity: function(legalEntity){
        var scopeObj = this;
        var segDataRegion = [];
        var storeDataRegion;
        for (var i = 0; i < legalEntity.companyLegalUnits.length; i++) {
            storeDataRegion = {
              entityName: legalEntity.companyLegalUnits[i].companyName,
            };
            segDataRegion.push(storeDataRegion);
        }
        this.view.segLegalEntity.widgetDataMap = {
            "flxLegalEntity": "flxLegalEntity",
            "lblEntityName": "entityName",
            "lblSeparator": "lblSeparator"
        };
        this.view.segLegalEntity.setData(segDataRegion);
        this.view.segLegalEntity.onRowClick = function() {
                scopeObj.segLegalEntityonRowClick();
            }
      },
    };
  });