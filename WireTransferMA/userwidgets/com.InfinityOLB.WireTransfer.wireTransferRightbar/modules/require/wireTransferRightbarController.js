define(["OLBConstants"],function(OLBConstants) {
  var _callback = null;
  return {
    getWireTransferNewModule: function() {
      return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule", "appName"
            : "WireTransferMA"});
    },

    setCallback: function (callback) {
      _callback = callback;
    },
    
    preshow: function() {
      var scope = this;
        var checkUserPermission = function (permission) {
      	return applicationManager.getConfigurationManager().checkUserPermission(permission);
      };
      
	     var checkAllPermissions = function (permissions) {
        return permissions.every(checkUserPermission);
      };

      var checkAtLeastOnePermission = function (permissions) {
        return permissions.some(checkUserPermission);
      };
      if(checkUserPermission("DOMESTIC_WIRE_TRANSFER_CREATE_RECEPIENT") === false)
        this.view.flxAddKonyAccount.isVisible = false;

      if(checkUserPermission("INTERNATIONAL_WIRE_TRANSFER_CREATE_RECEPIENT") === false)
        this.view.flxAddNonKonyAccount.isVisible = false;

      if(checkAtLeastOnePermission(["INTERNATIONAL_WIRE_TRANSFER_CREATE", "DOMESTIC_WIRE_TRANSFER_CREATE"]) === false)
        this.view.flxAddInternationalAccount.isVisible = false;

      if(checkAtLeastOnePermission(["INTERNATIONAL_WIRE_TRANSFER_CREATE", "DOMESTIC_WIRE_TRANSFER_CREATE", "DOMESTIC_WIRE_TRANSFER_VIEW", "INTERNATIONAL_WIRE_TRANSFER_VIEW"]) === false)
        this.view.flxAccountInfoForAccountTransfer.isVisible = false;
      
       if(!((checkAtLeastOnePermission([ OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_VIEW_BULK_FILES,OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_VIEW_BULK_TEMPLATE]) 
       && checkAllPermissions([OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_CREATE])) ||
      (checkAtLeastOnePermission([OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_VIEW_BULK_FILES, OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_VIEW_BULK_TEMPLATES]) 
       && checkAllPermissions([OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_CREATE]))))
        this.view.flxBulkTransfer.isVisible = false;
	
      if(checkAtLeastOnePermission([OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_UPLOAD_BULK_FILES,OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_UPLOAD_BULK_FILES]) === false)
        this.view.flxAddBulkTransferFile.isVisible = false;
        
        if((checkAtLeastOnePermission([
          OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_UPDATE_BULK_TEMPLATES,
          OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_UPDATE_BULK_TEMPLATES
      ])) === false)
        this.view.flxCreateNewTemplate.isVisible = false;
        
      this.view.flxAddBulkTransferFile.onClick = function () {
        var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
                        applicationManager.getNavigationManager().navigateTo("frmAddBulkTransferFile");
      }.bind(this);
      this.view.flxCreateNewTemplate.onClick = function () {
        var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
          wireTransferModule.presentationController.resetRecipientData();
          wireTransferModule.presentationController.navigateToCreateTemplateForm();
      }.bind(this);
       this.view.flxBulkTransfer.onClick = function () {
       var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
                      var params = {
                          "formName" : "frmMakeBulkTransferTemplate",
                          "bulkWireCategoryFilter": OLBConstants.BULKWIRE_CATEGORY_FILTER.TEMPLATES
                        };
                        wireTransferModule.presentationController.showBulkwirefiles(params);
      }.bind(this);
      this.view.flxAddKonyAccount.onClick = function () {this.getWireTransferNewModule().presentationController.showWireTransferAddRecipientStep1({
        landingPageView: "addRecipient"
      }, _callback);
      }.bind(this);
      this.view.flxAddNonKonyAccount.onClick = function () {this.getWireTransferNewModule().presentationController.showWireTransferInternationalStep1({
        landingPageView: "addRecipientInternational"
      }, _callback)
      }.bind(this);
      this.view.flxAddInternationalAccount.onClick = function () {this.getWireTransferNewModule().presentationController.showOneTimeWireTransfer({
        landingPageView: "oneTimeTransfer"
      }, _callback);
      }.bind(this);
      this.view.flxAccountInfoForAccountTransfer.onClick = function () {this.getWireTransferNewModule().presentationController.showAccountDetailsForInboundTransfers(_callback)}.bind(this);
      this.view.AllForms.setVisibility(false);
      this.view.flxInfo.onClick = function () {
        var scopeObj = this;
        if (scopeObj.view.AllForms.isVisible === false) {
          scopeObj.view.AllForms.isVisible = true;
          scopeObj.view.AllForms.left = scopeObj.view.flxAddAccountWindow.info.frame.x + scopeObj.view.flxInfo.info.frame.x - 135 + "dp";
          scopeObj.view.RichTextInfo.text = kony.i18n.getLocalizedString("i18n.WireTransfer.msgInfo2OneTime");
          if (scopeObj.view.flxAccountInfoForAccountTransfer.isVisible === true) scopeObj.view.AllForms.top = scopeObj.view.flxAddAccountWindow.info.frame.height - 160 + "dp";
          else scopeObj.view.AllForms.top = scopeObj.view.flxAddAccountWindow.info.frame.height - 110 + "dp";
          scopeObj.view.forceLayout();
        } else scopeObj.view.AllForms.isVisible = false;
      }.bind(this);
       this.view.flxCross.onClick = function() {
            scope.view.AllForms.setVisibility(false);
       }.bind(this);
      this.view.flxAddAccountWindow.doLayout = function(){
          this.view.flxAddAccountWindow.info = {}
          this.view.flxAddAccountWindow.info.frame = this.view.flxAddAccountWindow.frame;
      }.bind(this);
      this.view.flxInfo.doLayout = function(){
          this.view.flxInfo.info = {}
          this.view.flxInfo.info.frame = this.view.flxInfo.frame;
      }.bind(this);
    },
  };
});