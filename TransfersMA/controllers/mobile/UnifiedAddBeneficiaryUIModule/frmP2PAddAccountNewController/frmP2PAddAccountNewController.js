define({ 
   // Global Parameters.
  flxStack : [],
  nativeTitle: "",
  
  onNavigate: function(params){
   
    if(kony.os.deviceInfo().name === "iPhone") {
      var titleBarAttributes = this.view.titleBarAttributes;
      titleBarAttributes["shadowImage"] = "transparentbox.png";
      this.view.titleBarAttributes = titleBarAttributes;
      this.view.setBackgroundImageForNavbar({
        "image": "transparentbox.png",
        "barMetrics": constants.BAR_METRICS_DEFAULT
      });
    }
    if(params !== "" && params !== null && params !== undefined) {
    this.view.AddNewAccount.setContext(params);
    }
    this.initActions();
  },

  initActions: function() {
    var scope = this;
    scope.view.flxP2PTransferMain.onScrolling = function() {
      scope.iPhoneHeaderHandler();
    };
    scope.view.AddNewAccount.onRequestStart = function() {
      scope.requestStart();
    };
    scope.view.AddNewAccount.onRequestEnd = function() {
     scope.requestEnd();
    };
    scope.view.AddNewAccount.onBackButtonClick = function() {
      scope.backNavigate();
    };
    scope.view.AddNewAccount.createAccountCallback = function(response) {
      var navMan = applicationManager.getNavigationManager();
      if(!response["MFAAttributes"])
      {

        navMan.setCustomInfo("frmP2PNewAccountAckNew", response);
        navMan.navigateTo("UnifiedAddBeneficiaryUIModule/frmP2PNewAccountAckNew");
        
      }
      else
      {
        var ntf = new kony.mvc.Navigation("frmMFAValidationNew");
        ntf.navigate(response);     
      }
    };
    scope.view.AddNewAccount.iPhoneHeaderProps = function(headerProperties) {
      scope.setiPhoneHeaderProps(headerProperties);
    };
  },

  requestStart: function() {
    kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
  },

  requestEnd: function() {
    kony.application.dismissLoadingScreen();
  },

  backNavigate: function() {
	var navMan = applicationManager.getNavigationManager();
    navMan.navigateTo({
                    "friendlyName": "UnifiedTransferFlowUIModule/frmSelectTransferTypeNew",
                    "appName": "TransfersMA"
                });
  },

   iPhoneHeaderHandler: function(){
   
    if(this.view.flxP2PTransferMain.contentOffsetMeasured.y > 50){
      this.view.title = this.nativeTitle;
    }
    else if(scope.view.flxP2PTransferMain.contentOffsetMeasured.y < 45){
      this.view.title = "";
    }
  },

  
  iPhoneBackNavigation: function() {
    
    var stackLength = this.flxStack.length;
    var currentScreen = this.flxStack[stackLength - 1];
    if(this.flxStack.length > 1) {
      this.view.AddNewAccount.goBack();
    } else {
      this.backNavigate();
    }
  },
showRightBar: function(cancelTitle) {
    var itemArray = new kony.ui.BarButtonItem({
      "type": constants.BAR_BUTTON_TITLE,
      "tintColor": "#ffffff",
      "style": constants.BAR_ITEM_STYLE_PLAIN,
      "enabled": true,
      "action": this.backNavigate,
      "metaData": {
        "title": cancelTitle
      }
    });
    this.view.setRightBarButtonItems({
      "items": [itemArray],
      "animated": false
    });
  },

  hideRightBar: function(){
    this.view.setRightBarButtonItems({
      "items": [],
      "animated": false
    });
  },

  setiPhoneHeaderProps: function(headerProperties) {
   
    this.flxStack = headerProperties["stack"];
    this.nativeTitle = headerProperties["headerTitle"];
    var cancelTitle = headerProperties["cancelText"];
    var stackLength = this.flxStack.length;
    var currentScreen = this.flxStack[stackLength - 1];
    var screenList = ["flxPayeeNickname","flxCurrencySelection","flxAddAddress","flxEmailAddress","flxPhoneNumber","flxPaymentMethod","flxSwiftBICSearch","flxSwiftBICSearchList"];
    if((screenList.includes(currentScreen)) || cancelTitle === "") {
      this.hideRightBar();
    } else {
      this.showRightBar(cancelTitle);
    } 
  },
});