define({ 

 //Type your controller code here 
    init : function(){
        var navManager = applicationManager.getNavigationManager();
        var currentForm = navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    },

    preshow : function(){
        this.resetFormUI();
        this.setFlowActions();
        this.setAppliedFilters();
        this.checkForAppliedFilter();
    },
    setAppliedFilters : function(){
        var alertsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AlertsUIModule");
        var filters = alertsModule.presentationController.getFilterCategories();
        this.clearAllFilters();
        for(var i = 0 ; i < filters.length ; i++)
        {
            if(filters[i] === "ALERT_CAT_ACCOUNTS"){
                this.view.imgAccountAlerts.src="a.png";
            }
            else if(filters[i] === "ALERT_CAT_SECURITY"){
                this.view.imgSecurityAlerts.src="a.png";
            }
            else if(filters[i] === "ALERT_CAT_TRANSACTIONAL"){
                this.view.imgPromoAlerts.src="a.png";
            }
        }
        if(alertsModule.presentationController.allAlertsChoosen)
            this.view.imgAllAlerts.src = "a.png";
    },
    setFlowActions : function(){
        this.view.flxCheckBox.onClick = this.toggleAllAlerts;
        this.view.flxCheckBox1.onClick = this.toggleAccountAlerts;
        this.view.flxCheckBox2.onClick = this.toggleSecurityAlerts;
        this.view.flxCheckBox3.onClick = this.togglePromotionalAlerts;
        this.view.customHeader.btnRight.onClick = this.clearAllFilters;
        this.view.btnApply.onClick = this.onFilterApply;
        this.view.customHeader.flxBack.onClick = this.flxBackOnclick;
    },
    resetFormUI : function(){
        var scopeObj = this;
        var deviceUtilManager = applicationManager.getDeviceUtilManager();
        var isIphone = deviceUtilManager.isIPhone();
        if(!isIphone){
        scopeObj.view.flxHeader.isVisible = true;
        scopeObj.view.flxMainContainer.top = "56dp";
        }
        else{
        scopeObj.view.flxHeader.isVisible = false;
        scopeObj.view.flxMainContainer.top = "0dp";
        }
    },
    checkForAppliedFilter : function()
    {
        if(this.view.imgAllAlerts.src === "a.png" ||this.view.imgAccountAlerts.src === "a.png" || this.view.imgSecurityAlerts.src === "a.png" || this.view.imgPromoAlerts.src === "a.png"){
            this.view.btnApply.skin = "sknBtn0095e4RoundedffffffSSP26px";
            this.view.btnApply.setEnabled(true);
        }
        else
        {
            this.view.btnApply.skin = "sknBtna0a0a0SSPReg26px";
            this.view.btnApply.setEnabled(false);
        }
    },
    toggleAllAlerts : function(){
        if(this.view.imgAllAlerts.src === "tickmarkbox.png")
        this.selectAllFilters();
        else
        this.clearAllFilters();
    },
    selectAllFilters: function(){
        this.view.imgAllAlerts.src = "a.png";
        this.view.imgAccountAlerts.src = "a.png";
        this.view.imgSecurityAlerts.src = "a.png";
        this.view.imgPromoAlerts.src = "a.png";
        this.checkForAppliedFilter();
    },
    clearAllFilters: function(){
        this.view.imgAllAlerts.src = "tickmarkbox.png";
        this.view.imgAccountAlerts.src = "tickmarkbox.png";
        this.view.imgSecurityAlerts.src = "tickmarkbox.png";
        this.view.imgPromoAlerts.src = "tickmarkbox.png";
        this.checkForAppliedFilter();
    },
    toggleAccountAlerts : function(){
        if(this.view.imgAccountAlerts.src==="tickmarkbox.png"){
            this.view.imgAccountAlerts.src="a.png";
        }
        else{
            this.view.imgAllAlerts.src = "tickmarkbox.png";
            this.view.imgAccountAlerts.src="tickmarkbox.png";
        }
        this.checkForAppliedFilter();
    },
    toggleSecurityAlerts : function(){
        if(this.view.imgSecurityAlerts.src==="tickmarkbox.png"){
            this.view.imgSecurityAlerts.src="a.png";
        }
        else{
            this.view.imgAllAlerts.src = "tickmarkbox.png";
            this.view.imgSecurityAlerts.src="tickmarkbox.png";
        }
        this.checkForAppliedFilter();
    },
    togglePromotionalAlerts : function(){
        if(this.view.imgPromoAlerts.src==="tickmarkbox.png"){
            this.view.imgPromoAlerts.src="a.png";
        }
        else{
            this.view.imgAllAlerts.src = "tickmarkbox.png";
            this.view.imgPromoAlerts.src="tickmarkbox.png";
        }
        this.checkForAppliedFilter();
    },
    onFilterApply: function(){
        applicationManager.getPresentationUtility().showLoadingScreen();
        var filterData = [];
        if(this.view.imgAccountAlerts.src === "a.png"){
            filterData.push("ALERT_CAT_ACCOUNTS");
        }
        if(this.view.imgSecurityAlerts.src === "a.png"){
            filterData.push("ALERT_CAT_SECURITY");
        }
        if(this.view.imgPromoAlerts.src === "a.png"){
            filterData.push("ALERT_CAT_TRANSACTIONAL");
        }
        var navManager = applicationManager.getNavigationManager();
        var alertsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AlertsUIModule");
        alertsModule.presentationController.setFilterCategories(filterData);
        if(this.view.imgAllAlerts.src === "a.png")
        alertsModule.presentationController.allAlertsChoosen = true;
        else{
            alertsModule.presentationController.allAlertsChoosen = false;
            alertsModule.presentationController.retainSegmentoffset = false;
        }
        navManager.navigateTo("frmAlertsLanding");
    },
    flxBackOnclick:function(){
        var navMan=applicationManager.getNavigationManager();
        navMan.goBack();
      },
 });