define(['./breadCrumbBackStore', './breadCrumbBackBusinessController', 'ComponentUtility', 'ApplicationManager'], function (breadCrumbBackStore, BusinessController, ComponentUtility, applicationManager) {

  return {
    constructor: function (baseConfig, layoutConfig, pspConfig) {
      this.businessController = new BusinessController(this);
      this.applicationManager = new applicationManager();
      this.businessController.store = breadCrumbBackStore;
      breadCrumbBackStore.subscribe(this.render.bind(this), this);
      this.componentUtility = new ComponentUtility();
      this.context = {};
      this.collectionData = breadCrumbBackStore.getState();
      this.contextKey = "";
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function () {
      defineGetter(this, 'backProperties', () => {
        return this._backProperties;
      });
      defineSetter(this, 'backProperties', value => {
        if(typeof(value)==="object"){
        this._backProperties = value;
        }
      });
      defineGetter(this, 'breadCrumbProperties', () => {
        return this._breadCrumbProperties;
      });
      defineSetter(this, 'breadCrumbProperties', value => {
        this._breadCrumbProperties = value;
      });
      defineGetter(this, 'backFlag', () => {
        return this._backFlag;
      });
      defineSetter(this, 'backFlag', value => {
        this._backFlag = value;
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
    setDataFromParent: function (data) {
      this._backFlag = data.backFlag;
      if (!this._backFlag) {
        this._breadCrumbProperties = data.breadCrumbProperties;
      }
      else {
        this._backProperties = data.backProperties;
      }

    },
    setContext: function (context) {
      var scope = this;
      try {

        this.context = context;
      } catch (err) {
        scope.setError(err, "setContext");
      }
    },
    preShow: function () {
      var scope = this;
      try {
        //scope.contextKey = scope.fetchContextKey();
        if(!scope.componentUtility.isEmptyNullUndefined(scope.context) && Object.keys(scope.context).length > 0) {
          scope.businessController.setDataInCollection(scope.context, "context");
        }
        scope.setContextKey();
        scope.setData();
        scope.view.postShow = scope.postShow;
      } catch (err) {
        //scope.setError(err, "bread crumb preShow");
      }

    },
    postShow : function(){
      if(kony.i18n.getCurrentLocale() === "ar_AE"){
        this.view.lblLeftIcon.text = "Q";
        this.view.lblRightFirstIcon.text = "R";
        this.view.lblRightSecondIcon.text = "R";
        this.view.lblThirdRightIcon.text="R";
      }
      else{
        this.view.lblLeftIcon.text = "R";
        this.view.lblRightFirstIcon.text = "Q";
        this.view.lblRightSecondIcon.text = "Q";
        this.view.lblThirdRightIcon.text="Q";
      }

    },
    render: function () {
      var scope = this;
      try {
        //this.collectionData = breadCrumbBackStore.getState();
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
        let segMasterData = scope._dataMapping.segbreadCrumbBack.segmentMasterData;
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
    setData: function () {
      var scope = this;
      if (this._backFlag) {
        this.view.flxBack.isVisible = true;
        this.view.flxBack.left="-10dp";
        this.view.flxBreadCrumb.isVisible = false;
        this.view.btnBack.text = scope.businessController.convertTokensInDataMapping(this.context,this._backProperties[0].btnBack);
          this.view.btnBack.accessibilityConfig={
            "a11yARIA": {
              "role" : "button",
            }
          };
        this.view.btnBack.onClick = function () {
          if (scope.componentUtility.isEmptyNullUndefined(scope._backProperties[0].callToAction.form)) {
            var Module = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ moduleName: scope._backProperties[0].callToAction.module, appName: scope._backProperties[0].callToAction.appName });
            Module.presentationController[scope._backProperties[0].callToAction.presentationControllerMethod](scope._backProperties[0].callToAction.params);
          }
          else{
            var ntf = new kony.mvc.Navigation({
              "appName": scope._backProperties[0].callToAction.appName,
              "friendlyName": scope._backProperties[0].callToAction.module+"/" + scope._backProperties[0].callToAction.form,
            });
            ntf.navigate();
          }
        };
      } 
      else {
        this.view.flxBack.isVisible = false;
        this.view.flxBreadCrumb.isVisible = true;
        if (this._breadCrumbProperties[0].btnFirstLevel) {
          this.view.btnFirstLevel.isVisible = true;
          this.view.btnFirstLevel.text = scope.businessController.convertTokensInDataMapping(this.context,this._breadCrumbProperties[0].btnFirstLevel);
            this.view.btnFirstLevel.accessibilityConfig={
              "a11yARIA": {
              "role" : "button",
            }
            };
          this.view.lblRightFirstIcon.isVisible = true;
          this.view.btnFirstLevel.onClick = function () {
            if (scope.componentUtility.isEmptyNullUndefined(scope._breadCrumbProperties[0].callToAction.form)) {
              var Module = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ moduleName: scope._breadCrumbProperties[0].callToAction.module, appName: scope._breadCrumbProperties[0].callToAction.appName });
              Module.presentationController[scope._breadCrumbProperties[0].callToAction.presentationControllerMethod](scope._breadCrumbProperties[0].callToAction.params);
            }
            else {
              var ntf = new kony.mvc.Navigation({
                "appName": scope._breadCrumbProperties[0].callToAction.appName,
                "friendlyName":scope._breadCrumbProperties[0].callToAction.module +"/" + scope._breadCrumbProperties[0].callToAction.form,
              });
              ntf.navigate();
            }
          };
        }

        if (this._breadCrumbProperties[1].btnSecondLevel) {
          this.view.btnSecondLevel.isVisible = true;
          this.view.btnSecondLevel.text = scope.businessController.convertTokensInDataMapping(this.context,this._breadCrumbProperties[1].btnSecondLevel);
            this.view.btnSecondLevel.accessibilityConfig={
              "a11yARIA": {
              "role" : "button",
            }
            };
          this.view.lblRightSecondIcon.isVisible = true;
          this.view.btnSecondLevel.onClick = function () {
            if (scope.componentUtility.isEmptyNullUndefined(scope._breadCrumbProperties[1].callToAction.form)) {
              var Module = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ moduleName: scope._breadCrumbProperties[1].callToAction.module, appName: scope._breadCrumbProperties[1].callToAction.appName });
              Module.presentationController[scope._breadCrumbProperties[1].callToAction.presentationControllerMethod](scope._breadCrumbProperties[1].callToAction.params);
            }
            else {
              var ntf = new kony.mvc.Navigation({
                "appName": scope._breadCrumbProperties[1].callToAction.appName,
                "friendlyName": scope._breadCrumbProperties[1].callToAction.module+"/" + scope._breadCrumbProperties[1].callToAction.form,
              });
              ntf.navigate();
            }
          };
        }
        if (this._breadCrumbProperties[2].btnThirdLevel) {
          this.view.btnThirdLevel.isVisible = true;
          this.view.btnThirdLevel.text = scope.businessController.convertTokensInDataMapping(this.context, this._breadCrumbProperties[2].btnThirdLevel);
            this.view.btnThirdLevel.accessibilityConfig={
              "a11yARIA": {
              "role" : "button",
            }
            };
          this.view.lblThirdRightIcon.isVisible = true;
          this.view.btnThirdLevel.onClick = function () {
            if (scope.componentUtility.isEmptyNullUndefined(scope._breadCrumbProperties[2].callToAction.form)) {
              var Module = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ moduleName: scope._breadCrumbProperties[2].callToAction.module, appName: scope._breadCrumbProperties[2].callToAction.appName });
              Module.presentationController[scope._breadCrumbProperties[2].callToAction.presentationControllerMethod](scope._breadCrumbProperties[2].callToAction.params);
            }
            else {
              var ntf = new kony.mvc.Navigation({
                "appName": scope._breadCrumbProperties[2].callToAction.appName,
                "friendlyName": scope._breadCrumbProperties[2].callToAction.module+"/" + scope._breadCrumbProperties[2].callToAction.form,
              });
              ntf.navigate();
            }
          };
        }
      }
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