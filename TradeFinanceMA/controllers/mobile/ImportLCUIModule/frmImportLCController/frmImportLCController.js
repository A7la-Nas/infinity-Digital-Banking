define({ 
  /**
      * @api : onNavigate
      * Sets form type and flex name to Component controller
      * @return : NA
      */
  onNavigate: function(param){
    var scope = this;
    if(param !== undefined && param !== null){
      scope.view.ImportLC.setContext(param.Details);
    }else{
      param = {
        "data": {
          "frmType":"ImportLC",
          "flexName":"ImportLCDashboard"
        }
      };
      scope.view.ImportLC.setContext(param.data);
    } 
  },

  /**
      * @api : preShow
      * @return : NA
      */
  preShow : function(){
    var scope = this;
    if(kony.os.deviceInfo().name === "iPhone"){
      this.view.flxHamburgerDummy.setVisibility(false);
      this.view.flxHamburgerWrapper.width = "100%";
      this.view.flxHamburger.bottom = "60dp";
    }else{
      this.view.flxHamburgerDummy.setVisibility(true);
      scope.hamburgerAdjustmentAndroid();
    }
    var navManager = applicationManager.getNavigationManager();
    var configManager = applicationManager.getConfigurationManager();
    var MenuHandler =  applicationManager.getMenuHandler();
    var userObj = applicationManager.getUserPreferencesManager();
    if (userObj.isUserLoggedin() === true) {
      MenuHandler.setUpHamburgerForForm(scope, configManager.constants.MENUTRADEFINANCE);
    }
    scope.view.ImportLC.sendImportLCData=scope.sendImportLCData;
    scope.view.ImportLC.flxIOSFooterVisibility = scope.flxIOSFooterVisibility;
    scope.view.ImportLC.visibilityHamburger = scope.visibilityHamburger;
    scope.view.ImportLC.flxFilterBottomVisibility = function(context){
      scope.flxFilterBottomVisibility(context);
    },
      scope.view.ImportLC.filterButtonEnable = function(context){
      scope.filterButtonEnableDisable(context);
    },

      scope.view.BtnFilter.onClick = scope.applyFilterActions;  
  },

	hamburgerAdjustmentAndroid: function(){
      this.view.flxHamburger.bottom = "0dp";
      this.view.flxHamburger.height = "100%";
    },
  
  applyFilterActions: function(){
    var scope = this;
    scope.view.ImportLC.applyFilterOnclick();
  },
  flxIOSFooterVisibility: function(value){
    if(value === true){
      this.view.flxFooter.setVisibility(true);
    }
    else{
      this.view.flxFooter.setVisibility(false);
    }   
  },
  flxFilterBottomVisibility: function(value){
    var scope = this;
    if(value === true)
      scope.view.flxFilterBottom.setVisibility(true);
    else
      scope.view.flxFilterBottom.setVisibility(false);
  },
  filterButtonEnableDisable: function(value){
    var scope = this;
    if(value === true){
      scope.view.BtnFilter.setEnabled(true);
      scope.view.BtnFilter.skin = "ICSknBtn003E7515PXBrd3PXmb";
    }
    else{
      scope.view.BtnFilter.setEnabled(false);
      scope.view.BtnFilter.skin = "ICSknBtnE2E9F0t42424234px";
    }
  },
  /**
      * @api : sendImportLCData
      * Sends the selected LC data to frmLCDetails
      * @return : NA
      */
  sendImportLCData: function(data){
    var scope = this;
    var obj = {
      "context": scope,
      "params": {data},
      "callbackModelConfig": {
        "ImportLC": true
      }
    };
    kony.mvc.getNavigationManager().navigate(obj);
  },

  visibilityHamburger: function(data)
  {
    if(kony.os.deviceInfo().name === "iPhone")
    {
      this.view.flxHamburgerDummy.setVisibility(false);
    }
    else
    {
      if(data === true)
        this.view.flxHamburgerDummy.setVisibility(true);
      else
        this.view.flxHamburgerDummy.setVisibility(false);
    }
  },

  /**
      * @api : postShow
      * @return : NA
      */
  postShow:function(){
    var scope = this;
    scope.view.flxMainScrollContent.showFadingEdges=false;
  }
});