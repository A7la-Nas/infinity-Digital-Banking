define(['./appFooterStore', './appFooterBusinessController', 'ComponentUtility','OLBConstants'], function (appFooterStore, BusinessController, ComponentUtility,OLBConstants) {

  return {
    constructor: function (baseConfig, layoutConfig, pspConfig) {
      this.businessController = new BusinessController(this);
      this.businessController.store = appFooterStore;
      appFooterStore.subscribe(this.render.bind(this), this);
      this.componentUtility = new ComponentUtility();
      this.context = {};
      this.collectionData = appFooterStore.getState();
      this.contextKey = "";
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineGetter(this, 'footerProperties', () => {
        return this._footerProperties;
      });
      defineSetter(this, 'footerProperties', value => {
        this._footerProperties = value;
      });
      defineGetter(this, 'copyRight', () => {
        return this._copyRight;
      });
      defineSetter(this, 'copyRight', value => {
        this._copyRight = value;
      });
      defineGetter(this, 'serviceParameters', () => {
        return this._serviceParameters;
      });
      defineSetter(this, 'serviceParameters', value => {
        this._serviceParameters = value;
      });
      defineGetter(this, 'dataMapping', () => {
        return this._dataMapping;
      });
      defineSetter(this, 'dataMapping', value => {
        this._dataMapping = value;
      });
      defineGetter(this, 'dataFormatting', () => {
        return this._dataFormatting;
      });
      defineSetter(this, 'dataFormatting', value => {
        this._dataFormatting = value;
      });
      defineGetter(this, 'conditionalMappingKey', () => {
        return this._conditionalMappingKey;
      });
      defineSetter(this, 'conditionalMappingKey', value => {
        this._conditionalMappingKey = value;
      });
      defineGetter(this, 'conditionalMapping', () => {
        return this._conditionalMapping;
      });
      defineSetter(this, 'conditionalMapping', value => {
        this._conditionalMapping = value;
      });
    },
    setContext: function (context) {
      var scope = this;
      try {
        this.context = context;
      } catch (err) {
        scope.setError(err, "setContext");
      }
    },
    setDataFromParent : function(data)
    {
      this._footerProperties=data.footerProperties;
      this._copyRight=data.copyRight;
    },
    preShow: function()
    {
      var scope = this;
      try {

        //scope.contextKey = scope.fetchContextKey();
        if(!scope.componentUtility.isEmptyNullUndefined(scope.context) && Object.keys(scope.context).length > 0) {
          scope.businessController.setDataInCollection(scope.context, "context");
        }
        scope.setContextKey();
        scope.setData();
      } catch (err) {
        scope.setError(err, "footerpreShow");
      }

    },
    render: function () {
      var scope = this;
      try {
        //this.collectionData = appFooterStore.getState();
      } catch (err) {
        scope.setError(err, "render");
      }
    },
    updateContext: function (contextData) {
      var scope = this;
      try {
        if (!scope.componentUtility.isEmptyNullUndefined(contextData)) {
          scope.setContext(contextData);
        }
        if (!kony.sdk.isNullOrUndefined(scope.context) && Object.keys(scope.context).length > 0) {
          scope.businessController.setDataInCollection(scope.context);
        }
      } catch (err) {
        scope.setError(err, "updateContext");
      }
    },
    fetchContextKey: function () {
      var scope = this;
      try {
        let segMasterData = scope._dataMapping.segappFooter.segmentMasterData;
        let viewId = this.view.id;
        if (segMasterData.indexOf("CNTX.") !== -1) {
          let contextKey = segMasterData.split(".");
          contextKey = contextKey[contextKey.length - 1].replace("}", "");
          contextKey = contextKey + "_" + viewId;
          return contextKey;
        }
      } catch (err) {
        scope.setError(err, "fetchContextKey");
      }
    },
    setContextKey: function () {
      var scope = this;
      try {
        scope.businessController.setContextKey(scope.contextKey);
      } catch (err) {
        scope.setError(err, "setContextKey");
      }
    },
    setData: function()
    {
      var scope = this;
     
      if(this._copyRight){
        this.view.lblCopyright.isVisible=true;
        this.view.lblCopyright.text = scope.businessController.convertTokensInDataMapping(this._copyRight.title,this.context);
        this.view.lblCopyright.accessibilityConfig={
          "a11yARIA": {
            "tabindex" /* Integer with no floating/decimal numbers*/:-1,
          },
        };
      }
    if(this._footerProperties[0].title){
        this.view.btnOne.isVisible=true;
        //this.view.flxVBar1.isVisible=true;
        this.view.btnOne.text = scope.businessController.convertTokensInDataMapping(this._footerProperties[0].title,this.context);
        this.view.btnOne.accessibilityConfig={
          "a11yARIA": {
            "role": "link",
          }
        };
        if(this._footerProperties[0].callToAction)
        {
          this.view.btnOne.onClick = function()
          {
            if(scope._footerProperties[0].callToAction.module!==""&&scope._footerProperties[0].callToAction.module!==null&&scope._footerProperties[0].callToAction.module!==undefined){
              var Module = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ moduleName: scope._footerProperties[0].callToAction.module, appName: scope._footerProperties[0].callToAction.appName });
              Module.presentationController[scope._footerProperties[0].callToAction.presentationControllerMethod](scope._footerProperties[0].callToAction.params);
            }
            else{
              var ntf = new kony.mvc.Navigation({
                "appName": scope._footerProperties[0].callToAction.appName,
                "friendlyName": "AppGroup/"+scope._footerProperties[0].callToAction.form,
              });
              ntf.navigate();
            }
          };
        }
      }
      
      if(this._footerProperties[1].title){
        this.view.btnTwo.isVisible=true;
        this.view.flxVBar1.isVisible=true;
        this.view.btnTwo.text = scope.businessController.convertTokensInDataMapping(this._footerProperties[1].title,this.context);
        this.view.btnTwo.accessibilityConfig={
          "a11yARIA": {
            "role": "link",
          }
        };
        if(this._footerProperties[1].callToAction)
        {
          this.view.btnTwo.onClick = function()
          {
            if(scope._footerProperties[1].callToAction.module!==""&&scope._footerProperties[1].callToAction.module!==null&&scope._footerProperties[1].callToAction.module!==undefined){
              var Module = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ moduleName: scope._footerProperties[1].callToAction.module, appName: scope._footerProperties[1].callToAction.appName });
              Module.presentationController[scope._footerProperties[1].callToAction.presentationControllerMethod](scope._footerProperties[1].callToAction.params);
            }
            else{
              var ntf = new kony.mvc.Navigation({
                "appName": scope._footerProperties[1].callToAction.appName,
                "friendlyName": "AppGroup/"+scope._footerProperties[1].callToAction.form,
              });
              ntf.navigate();
            }
          };
        }
      }
      if(this._footerProperties[2].title){
        this.view.btnThree.isVisible=true; 
        this.view.flxVBar2.isVisible=true;
        this.view.btnThree.text = scope.businessController.convertTokensInDataMapping(this._footerProperties[2].title,this.context);
        this.view.btnThree.accessibilityConfig={
          "a11yARIA": {
            "role": "link",
          }
        };
        if(this._footerProperties[2].callToAction)
        {
          this.view.btnThree.onClick = function()
          {
            if(scope._footerProperties[2].callToAction.module!==""&&scope._footerProperties[2].callToAction.module!==null&&scope._footerProperties[2].callToAction.module!==undefined){
              var Module = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ moduleName: scope._footerProperties[2].callToAction.module, appName: scope._footerProperties[2].callToAction.appName });
              Module.presentationController[scope._footerProperties[2].callToAction.presentationControllerMethod](scope._footerProperties[2].callToAction.params);
            }
            else{
              var ntf = new kony.mvc.Navigation({
                "appName": scope._footerProperties[2].callToAction.appName,
                "friendlyName": "AppGroup/"+scope._footerProperties[2].callToAction.form,
              });
              ntf.navigate();
            }
          };
        }
      }
      if(this._footerProperties[3].title)
        this.view.btnFour.isVisible=true;
      this.view.flxVBar3.isVisible=true;
      this.view.btnFour.text = scope.businessController.convertTokensInDataMapping(this._footerProperties[3].title,this.context);
      this.view.btnFour.accessibilityConfig={
        "a11yARIA": {
            "role": "link",
          }
      };
      if(this._footerProperties[3].callToAction)
      {
        this.view.btnFour.onClick = function()
        {
          if(scope._footerProperties[3].callToAction.module!==""&&scope._footerProperties[3].callToAction.module!==null&&scope._footerProperties[3].callToAction.module!==undefined){
            var Module = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ moduleName: scope._footerProperties[3].callToAction.module, appName: scope._footerProperties[3].callToAction.appName });
            Module.presentationController[scope._footerProperties[3].callToAction.presentationControllerMethod](scope._footerProperties[3].callToAction.params);
          }
          else{
            var ntf = new kony.mvc.Navigation({
              "appName": scope._footerProperties[3].callToAction.appName,
              "friendlyName": "AppGroup/"+scope._footerProperties[3].callToAction.form,
            });
            ntf.navigate();
          }
        };
        if(this.view.btnFour.text==="Terms and Conditions")
        this.view.btnFour.onClick = this.showTermsAndConditions;
      }
      if(this._footerProperties[4].title){
        this.view.btnFive.isVisible=true;  
        this.view.flxVBar4.isVisible=true;
        this.view.btnFive.text = scope.businessController.convertTokensInDataMapping(this._footerProperties[4].title,this.context);
        this.view.btnFive.accessibilityConfig={
          "a11yARIA": {
            "role": "link",
          }
        };
        if(this._footerProperties[4].callToAction)
        {
          this.view.btnFive.onClick = function()
          {
            if(scope._footerProperties[4].callToAction.module!==""&&scope._footerProperties[4].callToAction.module!==null&&scope._footerProperties[4].callToAction.module!==undefined){
              var Module = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ moduleName: scope._footerProperties[4].callToAction.module, appName: scope._footerProperties[4].callToAction.appName });
              Module.presentationController[scope._footerProperties[4].callToAction.presentationControllerMethod](scope._footerProperties[4].callToAction.params);
            }
            else{
              var ntf = new kony.mvc.Navigation({
                "appName": scope._footerProperties[4].callToAction.appName,
                "friendlyName": "AppGroup/"+scope._footerProperties[4].callToAction.form,
              });
              ntf.navigate();
            }
          };
        }
      }
    },

    showLocateUsPage: function() {
      var locateUsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" :"AboutUsMA","moduleName":"LocateUsUIModule"});
      locateUsModule.presentationController.showLocateUsPage();
    },

    /**
        * Method to laad Information Module and show FAQs
        * @memberof customFooterController
        * @param {void}  - None
        * @returns {void} - None. 
        * @throws Exception - None
        */
    showFAQs : function(){
      var InformationContentModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" :"AboutUsMA","moduleName":"InformationContentUIModule"});
      InformationContentModule.presentationController.showFAQs();
    },
    /**
        * Method to laad Information Module and show terms and conditions page
        * @memberof customFooterController
        * @param {void}  - None
        * @returns {void} - None. 
        * @throws Exception - None
        */
    showTermsAndConditions:function(){
      var termsAndConditionModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" :"AboutUsMA","moduleName":"InformationContentUIModule"});
      termsAndConditionModule.presentationController.showTermsAndConditions(OLBConstants.TNC_FLOW_TYPES.Footer_TnC);
    },
    /**
        * Method to laad Information Module and show ContactUs Page.
        * @memberof customFooterController
        * @param {void}  - None
        * @returns {void} - None. 
        * @throws Exception - None
        */

    showContactUsPage:function(){
      var InformationContentModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" :"AboutUsMA","moduleName":"InformationContentUIModule"});
      InformationContentModule.presentationController.showContactUsPage();
    },
    /**
        * Method to laad Information Module and show privacy policy page.
        * @memberof customFooterController
        * @param {void}  - None
        * @returns {void} - None. 
        * @throws Exception - None
        */

    showPrivacyPolicyPage:function(){
      var InformationContentModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" :"AboutUsMA","moduleName":"InformationContentUIModule"});
      InformationContentModule.presentationController.showPrivacyPolicyPage();
    },

    setActiveElement: function(){
      var scope = this;
      if (scope.view.btnOne.isVisible)
        scope.view.btnOne.setActive(true);
      else if (scope.view.btnTwo.isVisible)
        scope.view.btnTwo.setActive(true);
      else if (scope.view.btnThree.isVisible)
        scope.view.btnThree.setActive(true);
      else if (scope.view.btnFour.isVisible)
        scope.view.btnFour.setActive(true);
      else if (scope.view.btnFive.isVisible)
        scope.view.btnFive.setActive(true);
    },

    setError: function (errorMsg, method) {
      let errorObj = {
        "level": "ComponentViewController",
        "method": method,
        "error": errorMsg
      };
      this.onError(errorObj);
    }
  };
});