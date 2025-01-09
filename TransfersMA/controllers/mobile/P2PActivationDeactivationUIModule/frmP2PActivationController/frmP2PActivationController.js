define({ 

  // Global Parameters.
  flxStack : [],
  contextData: [],
  headerTitile: [],
  timerCounter: 0,
  nativeTitle: "",

    /**
	* @api : onNavigate
 	* gets invoked as soon as the control comes to the form
	* @return : NA
	*/
  onNavigate: function(context) {
    var scope = this;
    var navMan = applicationManager.getNavigationManager();
    context = navMan.getCustomInfo("frmP2PActivation");
    context["name"] = context.userfirstname +" "+context.userlastname;
    if(context.hasOwnProperty("default_to_account_p2p") && !kony.sdk.isNullOrUndefined(context["default_to_account_p2p"])) {
    context["formattedDepositAccount"] = context.name +"...."+ (context.default_to_account_p2p).slice(-4);
    } else {
      context["formattedDepositAccount"] = "Add";
    }
    if(kony.os.deviceInfo().name === "iPhone") {
      var titleBarAttributes = this.view.titleBarAttributes;
      titleBarAttributes["shadowImage"] = "transparentbox.png";
      this.view.titleBarAttributes = titleBarAttributes;
      this.view.setBackgroundImageForNavbar({
        "image": "transparentbox.png",
        "barMetrics": constants.BAR_METRICS_DEFAULT
      });
      this.view.flxHeaderTop.setVisibility(false);
    } else {
      this.view.flxHeaderTop.setVisibility(true);
    }
    if(!kony.sdk.isNullOrUndefined(context) && context !== "") {
      this.contextData = context;
      scope.view.P2PActivation.setContext(context);
    }
    scope.initActions();
  },

  initActions: function() {
    var scope = this;
    scope.view.flxBackBtn.onTouchStart = scope.backNavigation.bind(this);
    scope.view.btnCancel.onClick = scope.onCancel.bind(scope);
    scope.view.P2PActivation.onError = scope.onError;
    scope.view.flxMain.onScrolling = function() {
      scope.iPhoneHeaderHandler();
    };
    scope.view.P2PActivation.HeaderProperties = function(headerProperties) {
      scope.setScreenHeaderProps(headerProperties);
    };
    scope.view.P2PActivation.showToastMessageError = function(message) {
      scope.showToast("sknflxff5d6e", "errormessage.png", message);
    };
    scope.view.P2PActivation.activateP2PCallback = function(context) {
      scope.navigateToActivationAcknowledgment(context);
    };
    scope.view.P2PActivation.navigateToLanding = function(btnID) {
       scope.componentCancelActions(btnID);
    };
  },

  setScreenHeaderProps: function(headerProperties) {
    var scope = this;
    this.flxStack = headerProperties["stack"];
    this.view.lblHeader.text = headerProperties["headerTitle"];
    this.nativeTitle = headerProperties["headerTitle"];
    var stackLength = scope.flxStack.length;
    var currentScreen = scope.flxStack[stackLength - 1];
    var screenList = ["flxContactType","flxTransferLimit","flxNationalID","flxTermsandConditions","flxPhnoEmailDetails"];
    if((screenList.includes(currentScreen))) {
      if(kony.os.deviceInfo().name === "iPhone") {
        this.hideRightBar();
      } else {
        this.view.btnCancel.setVisibility(false);
      }
    } else {
      if(kony.os.deviceInfo().name === "iPhone") {
        this.showRightBar("Cancel", true);
      } else {
        this.view.btnCancel.setVisibility(true);
      }
    } 
  },

  componentCancelActions :  function(btnID) {
    var scope = this;
    if(btnID === "yes") {
       scope.navigateToLandingScreen();
    } 
    if(kony.os.deviceInfo().name === "iPhone") {
        scope.showRightBar("Cancel", true);
        scope.showLeftBar("backbutton.png", true);
      } else  {
        scope.view.flxHeader.setEnabled(true);
      }
  },

  onCancel: function() {
    var scope = this;
    if(kony.os.deviceInfo().name === "iPhone") {
      scope.showRightBar("Cancel", false);
      scope.showLeftBar("backbutton.png", false);
    } else  {
      this.view.flxHeader.setEnabled(false);
    }
    scope.view.P2PActivation.onCancelPopup();
  },

  showRightBar: function(cancelTitle, actionState) {
    var itemArray = new kony.ui.BarButtonItem({
      "type": constants.BAR_BUTTON_TITLE,
      "tintColor": "#ffffff",
      "style": constants.BAR_ITEM_STYLE_PLAIN,
      "enabled": actionState,
      "action": this.onCancel,
      "metaData": {
        "title": cancelTitle
      }
    });
    this.view.setRightBarButtonItems({
      "items": [itemArray],
      "animated": false
    });
  },

  showLeftBar: function(backImage, actionState) {
    var itemArray = new kony.ui.BarButtonItem({
      "type": constants.BAR_BUTTON_IMAGE,
      "tintColor": "#ffffff",
      "style": constants.BAR_ITEM_STYLE_PLAIN,
      "enabled": actionState,
      "action": this.backNavigation,
      "metaData": {
        "image": backImage
      }
    });
    this.view.setLeftBarButtonItems({
      "items": [itemArray],
      "animated": false
    });
  },

  hideRightBar: function() {
    this.view.setRightBarButtonItems({
      "items": [],
      "animated": false
    });
  },

  backNavigation: function() {
    var scope = this;
    var stackLength = this.flxStack.length;
    var currentScreen = this.flxStack[stackLength - 1];
    if(this.flxStack.length > 1 && currentScreen !== "flxConfirmDetails" && currentScreen !== "flxDeactivateP2P") {
      scope.view.P2PActivation.goBack();
    } else {
      scope.navigateToLandingScreen();
    }
  },
  
  navigateToActivationAcknowledgment: function(context) {
    var navMan = applicationManager.getNavigationManager();
    if(this.contextData.flowType === "Activation") {
      navMan.setCustomInfo("frmP2PActivationAcknowledgement", context);
      navMan.navigateTo("P2PActivationDeactivationUIModule/frmP2PActivationAcknowledgement");
    } else {
      navMan.setCustomInfo("frmP2PDeactivationAcknowledgement", context);
      navMan.navigateTo("P2PActivationDeactivationUIModule/frmP2PDeactivationAcknowledgement");
    }
  },
  /**
	* @api : navigateToLandingScreen
 	* Navigates to landing form
	* @return : NA
	*/
  navigateToLandingScreen: function() {
    /*var navMan = applicationManager.getNavigationManager();
    var formName = navMan.stack[navMan.stack.length -2];
    navMan.navigateTo(formName); */
	var navMan = applicationManager.getNavigationManager();
	navMan.navigateTo({"friendlyName" : "UnifiedTransferFlowUIModule/frmSelectTransferTypeNew", "appName" : "TransfersMA"});
  },

   showToast : function(skin, image, message) {
    var scope = this;
    scope.view.flxPopup.isVisible = true;
    if (this.timerCounter === undefined || this.timerCounter === null)
    this.timerCounter = 0;
    this.timerCounter = parseInt(this.timerCounter) + 1;
    var timerId = "timerPopupSuccess" + this.timerCounter;
    scope.view.flxPopup.skin = skin;
    scope.view.customPopup.imgPopup.src = image;
    scope.view.customPopup.lblPopup.text = message;
     kony.print(timerId);
     kony.timer.schedule(timerId, function() {
       scope.view.flxPopup.isVisible = false;
     }, 5, false);
  },

  iPhoneHeaderHandler: function(){
    var scope = this;
    if(this.view.flxMain.contentOffsetMeasured.y > 50){
      scope.view.title = this.nativeTitle;
    }
    else if(this.view.flxMain.contentOffsetMeasured.y < 45){
      scope.view.title = "";
    }
  },

  /**
	* @api : onError
 	* Error thrown from catch block in component and shown on the form
	* @return : NA
	*/
  onError: function(err) {
   kony.print(JSON.stringify(err));
  }

});