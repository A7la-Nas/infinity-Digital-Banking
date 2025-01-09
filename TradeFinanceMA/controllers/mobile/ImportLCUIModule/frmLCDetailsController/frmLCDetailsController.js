define({ 
  /**
    * @api : onNavigate
    * Sets form type and flex name and data to Component controller
    * @return : NA
    */
  onNavigate: function(recievedData){
    var scope = this,screensName;
    scope.view.DetailType.turnOffFlexVisibility();
    if(recievedData.screensName !== null && recievedData.screensName !== undefined)
      screensName = recievedData.screensName;
    else{
      screensName = {
        "flexName":[],
        "frmType":[]
      };
    }
    var accounts = applicationManager.getConfigurationManager().userAccounts;
    var serviceData = [];
    serviceData["letterOfCredits"] = recievedData.data;
    scope.LOC = recievedData.data;
    serviceData["allAccounts"] = accounts;
    serviceData["screensName"] = screensName;
    scope.localServiceData = serviceData;
    scope.flexName = serviceData.letterOfCredits.flexName;
    scope.frmType = serviceData.letterOfCredits.frmType;    
    scope.view.DetailType.flxIOSFooterVisibility = scope.flxIOSFooterVisibility;
    this.view.DetailType.setContext(serviceData, serviceData.letterOfCredits.frmType);
    if(recievedData.data.hasOwnProperty("importLCData"))
      scope.importLCData = recievedData.data.importLCData;
  },

  /**
    * @api : postShow
    * @return : NA
    */
  postShow: function(){
    var scope = this;
    scope.view.flxMain.showFadingEdges=false;
    scope.view.backImgFlx.onTouchStart = scope.backNavigation;
    scope.view.flxDownloadBtn.onClick = scope.view.DetailType.onDownloadAction.bind(this);
    scope.setLblHeaderValue();
    scope.view.DetailType.showDownloadBtn = function(){
      scope.view.flxDownloadBtn.setVisibility(true);
    };
    scope.view.DetailType.hideDownloadBtn = function(){
      scope.view.flxDownloadBtn.setVisibility(false);
    };    
    scope.view.DetailType.changeHeaderText = scope.changeHeaderText;
    scope.view.DetailType.formNavigation = scope.formNavigation;
    if(scope.frmType === "ImportDrawings")
      scope.view.flxDownloadBtn.setVisibility(true);
    else
      scope.view.flxDownloadBtn.setVisibility(false);
    if(kony.os.deviceInfo().name === "iPhone"){
      scope.view.flxHamburgerWrapper.width = "100%";
      scope.view.flxHamburger.bottom = "60dp";
    }
    else{
      scope.view.flxHamburger.bottom = "0dp";
      scope.view.flxHamburger.height = "100%";
    }
    var navManager = applicationManager.getNavigationManager();
    var configManager = applicationManager.getConfigurationManager();
    var MenuHandler =  applicationManager.getMenuHandler();
    var userObj = applicationManager.getUserPreferencesManager();
    if (userObj.isUserLoggedin() === true)
      MenuHandler.setUpHamburgerForForm(scope, configManager.constants.MENUTRADEFINANCE);
  },

  /**
    * @api : lblHeaderValue
    * Sets formheader label in accordance with the form
    * @return : NA
    */
  setLblHeaderValue: function(){
    var scope = this;
    if(scope.frmType === "ImportLC")
      scope.view.lblimportLCDetails.text = kony.i18n.getLocalizedString("i18n.ImportLC.ImportLC") + " - " + scope.localServiceData.letterOfCredits.lcReferenceNo;
    else if(scope.frmType === "ExportLC")
      scope.view.lblimportLCDetails.text = kony.i18n.getLocalizedString("i18n.ExportLC.ExportLCViewDetails");
    else if(scope.frmType === "ImportDrawings")
      scope.view.lblimportLCDetails.text = kony.i18n.getLocalizedString("i18n.ImportDrawings.ImportDrawing");
  },

  /**
    * @api : backNavigation
    * Handles back navigation for the form
    * @return : NA
    */
  backNavigation: function(){
    var scope = this;
    var check = false;
    check = scope.view.DetailType.checkCurrentFlx();
    if(check.checkValue){
      var self = this;
      var Details = [];
      Details["frmType"] = scope.frmType;
      Details["flexName"] = scope.flexName;
      Details["screensName"] = check.screensName;
      if(scope.LOC.frmFlow === "ImportLCViewDetails"){
        Details["frmFlow"] = scope.LOC.frmFlow;
        Details["importLCData"] = scope.importLCData;
      }
      if(scope.LOC.frmFlow === "ImportLCDashboard"){
        Details["frmFlow"] = scope.LOC.frmFlow;
        Details["importLCData"] = scope.importLCData;
      }
      var obj = {
        "context": this,
        "params": { Details },
        "callbackModelConfig": {}
      };
      var navManager = kony.mvc.getNavigationManager();
      navManager.navigate(obj);
    }
    else
      scope.view.DetailType.goBack();
  },

  /**
    * @api : changeHeaderText
    * Handles the header text for the form
    * @return : NA
    */
  changeHeaderText:function(headerText){
    var scope = this;
    try{
      scope.view.lblimportLCDetails.text = headerText;
    }
    catch(err)
    {
      var errorObj =
          {
            "level" : "formController",
            "method" : "changeHeaderText",
            "error": err
          };
    }
  },

  /**
    * @api : formNavigation
    * Navigation from frmLCDetails to frmImportLC
    * @return : NA
    */
  formNavigation:function(data){
    var scope = this;
    try{
      var Details = [];
      Details["importLCData"] = scope.LOC;
      Details["frmType"] = "ImportDrawings";
      Details["flexName"] = "ImportLCViewDetails";
      Details["previousFlexName"] = scope.flexName;
      Details["screensName"] = data.screensName;
      Details["ImportDrawingsList"] = true;
      Details["DrawingsData"] = data.DrawingsData;
      var obj = {
        "context": this,
        "params": { Details },
        "callbackModelConfig": {}
      };
      var navManager = kony.mvc.getNavigationManager();
      navManager.navigate(obj);
    }
    catch(err)
    {
      var errorObj =
          {
            "level" : "formController",
            "method" : "formNavigation",
            "error": err
          };
    }
  },

  /**
    * @api : flxIOSFooterVisibility
    * Navigation from frmLCDetails to frmImportLC
    * @return : NA
    */
  flxIOSFooterVisibility: function(value) {
    var scope = this;
    try{
      if(scope.frmType === "ImportLC" && value && kony.os.deviceInfo().name === "iPhone"){
        scope.view.flxMain.height = "82.8%";
        scope.view.flxFooter.setVisibility(true);
      }
      else {
        scope.view.flxFooter.setVisibility(false);
        scope.view.flxMain.height = "90.45%";
      }
    }
    catch(err)
    {
      var errorObj =
          {
            "level" : "formController",
            "method" : "formNavigation",
            "error": err
          };
    }
  },
});