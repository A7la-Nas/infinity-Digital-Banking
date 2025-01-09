define({ 
   // Global Parameters.
  flxStack : [],
  nativeTitle: "",
  
  onNavigate: function(){
    
    var navMan = applicationManager.getNavigationManager();
   var params =  navMan.getCustomInfo("frmInternationalAddAccountNew");
    if(kony.os.deviceInfo().name === "iPhone") {
      var titleBarAttributes = this.view.titleBarAttributes;
      titleBarAttributes["shadowImage"] = "transparentbox.png";
      this.view.titleBarAttributes = titleBarAttributes;
      this.view.setBackgroundImageForNavbar({
        "image": "transparentbox.png",
        "barMetrics": constants.BAR_METRICS_DEFAULT
      });
    }
    
    if(params !== "" && params !== null && params !== undefined && Object.keys(params).length>0) {
      params["phoneNumber"] =  params["phone"];
        params["emailAddress"]  = params["email"];
        params["payeeName"]  = params["beneficiaryName"];
        params["bic"]  = params["swiftCode"];
        
    this.view.AddNewAccount.setContext(params);
    }
    else
      {
        this.view.AddNewAccount.setContext({});
      }
    this.initActions();
  },

  initActions: function() {
    var scope = this;
    scope.view.flxSameBankMain.onScrolling = function() {
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
         
        navMan.setCustomInfo("flxInternationalNewAccountAckNew",response);
      navMan.navigateTo("UnifiedAddBeneficiaryUIModule/flxInternationalNewAccountAckNew");
      }
      else
      {
        var ntf = new kony.mvc.Navigation("frmMFAValidation");
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
    navMan.goBack();
  },

   iPhoneHeaderHandler: function(){
   
    if(this.view.flxSameBankMain.contentOffsetMeasured.y > 50){
      this.view.title = this.nativeTitle;
    }
    else if(this.view.flxSameBankMain.contentOffsetMeasured.y < 45){
      this.view.title = "";
    }
  },

   iPhoneBackNavigation: function() {
   
    var stackLength = this.flxStack.length;
    var currentScreen = this.flxStack[stackLength - 1];
    if(this.flxStack.length > 1) {
      this.view.AddNewAccount.goBack();
    }else {
      var navMan = applicationManager.getNavigationManager();
      navMan.goBack();
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