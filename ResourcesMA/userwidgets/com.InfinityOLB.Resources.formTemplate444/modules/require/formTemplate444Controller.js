define(['./formTemplate444Store', './formTemplate444BusinessController', 'ComponentUtility','CommonUtilities'], function (formTemplateStore, BusinessController, ComponentUtility,CommonUtilities) {

  return {
    customPopupContext:{},
    breadCrumbBackFlag:"false",
    sessionTimeOutContext:"",
    popupsetActive : "",
    constructor: function (baseConfig, layoutConfig, pspConfig) {
      this.businessController = new BusinessController(this);
      this.businessController.store = formTemplateStore;
      formTemplateStore.subscribe(this.render.bind(this), this);
      this.componentUtility = new ComponentUtility();
      this.context = {};
      this.collectionData = formTemplateStore.getState();
      this.contextKey = "";
      this.pageTitleIsVisible = false;
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function () {
            defineGetter(this, 'customPopupData', () => {
                return this._customPopupData;
            });
            defineSetter(this, 'customPopupData', value => {
                this._customPopupData = value;
            });
            defineGetter(this, 'flxMainWrapperzIndex', () => {
                return this._flxMainWrapperzIndex;
            });
            defineSetter(this, 'flxMainWrapperzIndex', value => {
                this._flxMainWrapperzIndex = value;
                this.view.flxMainWrapper.zIndex=this._flxMainWrapperzIndex;
            });
            defineGetter(this, 'serviceParameters', () => {
                return this._serviceParameters;
            });
            defineSetter(this, 'serviceParameters', value => {
                this._serviceParameters = value;
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
            defineGetter(this, 'dataMapping', () => {
                return this._dataMapping;
            });
            defineSetter(this, 'dataMapping', value => {
                this._dataMapping = value;
            });
            defineGetter(this, 'accountText', () => {
              return this._accountText;
          });
          defineSetter(this, 'accountText', value => {
              this._accountText = value;
              this.view.appHeader.primaryLink1Text = value;
          });
            defineGetter(this, 'footerProperties', () => {
                return this._footerProperties;
            });
            defineSetter(this, 'footerProperties', value => {
                this._footerProperties = value;
                this.view.appFooter.footerProperties = this._footerProperties;
            });
            defineGetter(this, 'copyRight', () => {
                return this._copyRight;
            });
            defineSetter(this, 'copyRight', value => {
                this._copyRight = value;
                this.view.appFooter.copyRight = this._copyRight;
            });
            defineGetter(this, 'backFlag', () => {
                return this._backFlag;
            });
            defineSetter(this, 'backFlag', value => {
                this._backFlag = value;
                this.view.breadCrumbBack.backFlag = this._backFlag;
                this.breadCrumbBackFlag = this._backFlag.toString();
            });
            defineGetter(this, 'backProperties', () => {
                return this._backProperties;
            });
            defineSetter(this, 'backProperties', value => {
                this._backProperties = value;
                this.view.breadCrumbBack.backProperties = this._backProperties;
            });
            defineGetter(this, 'breadCrumbProperties', () => {
                return this._breadCrumbProperties;
            });
            defineSetter(this, 'breadCrumbProperties', value => {
                this._breadCrumbProperties = value;
                this.view.breadCrumbBack.breadCrumbProperties = this._breadCrumbProperties;
            });
            defineGetter(this, 'sessionTimeOutData', () => {
                return this._sessionTimeOutData;
            });
            defineSetter(this, 'sessionTimeOutData', value => {
                this._sessionTimeOutData = value;
            });
            defineGetter(this, 'hamburgerConfig', () => {
                return this._hamburgerConfig;
            });
            defineSetter(this, 'hamburgerConfig', value => {
                this._hamburgerConfig = value;
                this.view.appHeader.hamburgerConfig = this._hamburgerConfig;
            });
            defineGetter(this, 'genricMessage', () => {
                return this._genricMessage;
            });
            defineSetter(this, 'genricMessage', value => {
                this._genricMessage = value;
                this.view.GenericMessageNew.dataMapping = this._genricMessage;
            });
            defineGetter(this, 'primaryLinks', () => {
                return this._primaryLinks;
            });
            defineSetter(this, 'primaryLinks', value => {
                this._primaryLinks = value;
                this.view.appHeader.primaryLinks = this._primaryLinks;
            });
            defineGetter(this, 'secondaryLinks', () => {
                return this._secondaryLinks;
            });
            defineSetter(this, 'secondaryLinks', value => {
                this._secondaryLinks = value;
                this.view.appHeader.secondaryLinks = this._secondaryLinks;
            });
            defineGetter(this, 'supplementaryLinks', () => {
                return this._supplementaryLinks;
            });
            defineSetter(this, 'supplementaryLinks', value => {
                this._supplementaryLinks = value;
                this.view.appHeader.supplementaryLinks = this._supplementaryLinks;
            });
            defineGetter(this, 'logoConfig', () => {
                return this._logoConfig;
            });
            defineSetter(this, 'logoConfig', value => {
                this._logoConfig = value;
                this.view.appHeader.logoConfig = this._logoConfig;
            });
            defineGetter(this, 'logoutConfig', () => {
                return this._logoutConfig;
            });
            defineSetter(this, 'logoutConfig', value => {
                this._logoutConfig = value;
                this.view.appHeader.logoutConfig = this._logoutConfig;
            });
            defineGetter(this, 'profileConfig', () => {
                return this._profileConfig;
            });
            defineSetter(this, 'profileConfig', value => {
                this._profileConfig = value;
                this.view.appHeader.profileConfig = this._profileConfig;
            });
            defineGetter(this, 'activeMenuID', () => {
                return this._activeMenuID;
            });
            defineSetter(this, 'activeMenuID', value => {
                this._activeMenuID = value;
                this.view.appHeader.activeMenuID = this._activeMenuID;
            });
            defineGetter(this, 'activeSubMenuID', () => {
                return this._activeSubMenuID;
            });
            defineSetter(this, 'activeSubMenuID', value => {
                this._activeSubMenuID = value;
                this.view.appHeader.activeSubMenuID = this._activeSubMenuID;
            });
            defineGetter(this, 'pageTitle', () => {
                return this._pageTitle;
            });
            defineSetter(this, 'pageTitle', value => {
                this._pageTitle = value;
                if (this._pageTitle === null || this._pageTitle === undefined || this._pageTitle === "") {
                    this.view.flxPageTitle.isVisible = false;
                    this.view.flxBreadcrumbs.top="-39dp";
                    this.view.forceLayout();
                } else {
                    this.view.flxPageTitle.isVisible = true;
                    this.view.lblPageTitle.text = this._pageTitle;
                    this.view.appHeader.lblHeaderMobileText=this._pageTitle;
                    if(this.view.flxBreadcrumbs.isVisible){
                        this.view.flxBreadcrumbs.top = "0dp";
                        this.view.forceLayout();
                    }
                }
            });
            defineGetter(this, 'pageTitlei18n', () => {
                return this._pageTitlei18n;
            });
            defineSetter(this, 'pageTitlei18n', value => {
              this._pageTitlei18n = value;
                if ((this._pageTitlei18n === null || this._pageTitlei18n === undefined || this._pageTitlei18n === "") && (this._pageTitle === null || this._pageTitle === undefined || this._pageTitle === "")) {
                    this.view.flxPageTitle.isVisible = false;
                    this.view.flxBreadcrumbs.top="-39dp";
                    this.view.forceLayout();
                    return;
                }
                if (!(this._pageTitlei18n === null || this._pageTitlei18n === undefined || this._pageTitlei18n === "")) {
                    this.view.flxPageTitle.isVisible = true;
                    this.view.lblPageTitle.text = kony.i18n.getLocalizedString(this._pageTitlei18n);
                    this.view.appHeader.lblHeaderMobileText= kony.i18n.getLocalizedString(this._pageTitlei18n);
                    if(this.view.flxBreadcrumbs.isVisible){
                        this.view.flxBreadcrumbs.top = "0dp";
                        this.view.forceLayout();
                    }
                }
            });
            defineGetter(this, 'pageTitleVisibility', () => {
              return this._pageTitleVisibility;
          });
          defineSetter(this, 'pageTitleVisibility', value => {
            this._pageTitleVisibility = value;
            this.pageTitleIsVisible = this._pageTitleVisibility;
            this.view.flxPageTitleMain.isVisible = value;
            if(this.view.flxPageTitleMain.isVisible===false)
            		this.view.flxBreadcrumbs.top="20dp";
            else
            this.view.flxBreadcrumbs.top="0dp";
            this.view.forceLayout();
            this.adjustTop();
          });
        },
        adjustTop : function(){
          if(this.pageTitleIsVisible){
            this.view.flxContentWrapper.top = "0dp";
            this.view.flxBanner.top="0dp";
            this.view.forceLayout();
          }
          else{
            if(kony.application.getCurrentBreakpoint()===640){
              if (this.breadCrumbBackFlag === "false"){
              	this.view.flxBanner.top="20dp";
              }
              if(this.breadCrumbBackFlag==="false" && this.view.flxBanner.isVisible===false){
                this.view.flxContentWrapper.top = "20dp";
              }
              else{
                this.view.flxContentWrapper.top = "0dp";
              }
              this.view.forceLayout();
            }
            else{
              this.view.flxContentWrapper.top = "0dp";
              this.view.forceLayout();
            }
          }
        },
    /**
     * Sets the context value from component consumer
     */
    setContext: function (context) {
      var scope = this;
      try {
        this.context = context;
        if(context.breadCrumbBack){
          this.view.breadCrumbBack.setContext(context.breadCrumbBack);
          this.breadCrumbBackFlag = context.breadCrumbBack.flag;
          this.adjustTop();
        }
        if(context.appFooter){
          this.view.appFooter.setContext(context.appFooter);
        }
        if(context.genricMessage){
          this.view.GenericMessageNew.setContext(context.genricMessage);
        }
        if(context.customPopup){
          this.customPopupContext = context.customPopup;
        }
        if(context.sessionTimeOut){
          this.sessionTimeOutContext = context.sessionTimeOut;
        }
        if(context.skipToMainContent){
          this.view.appHeader.onSkipToMainContent = context.skipToMainContent;
        }
      } catch (err) {
        scope.setError(err, "setContext");
      }
    },
    /**
     * Performs the actions required before rendering component
     */
    preShow : function () {
      var scope = this;
      try {
        this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
        this.view.flxDialogs.isModalContainer = true;
        scope.setContextKey();
        scope.setPopupData();
        scope.view.CustomPopup.btnNo.onClick = this.hidePopup;
        scope.view.CustomPopup.flxCross.onClick = this.hidePopup;
        scope.view.appHeader.onLogout = this.setPopup;
        
        if(scope.breadCrumbBackFlag==="true")
        {
          this.view.flxBreadcrumbs.isVisible = true;
          if(this.view.flxPageTitle.isVisible){
            this.view.flxBreadcrumbs.top = "0dp";
            this.view.forceLayout();
          }
        }
        //scope.view.btnPopup.onClick = this.showLogout;
        scope.view.GenericMessageNew.closepopup = function(){
          scope.view.flxBanner.isVisible = false;
        },
        scope.view.appFooter.onError = function(errorObject) {
          alert(JSON.stringify(errorObject));
        },
         scope.view.appHeader.onError = function(errorObject) {
          alert(JSON.stringify(errorObject));
        },
          scope.view.breadCrumbBack.onError = function(errorObject) {
          alert(JSON.stringify(errorObject));
        },
          scope.setPopupData();
        scope.view.appHeader.onLogout = scope.setPopup;
        frm=kony.application.getCurrentForm();
        scope.timeoutCall();
        var time = "";
        if (this.sessionTimeOutContext === null || this.sessionTimeOutContext === undefined || this.sessionTimeOutContext === "") {
          time = 240;
        } else {
          time = this.businessController.convertTokensInDataMapping(this._sessionTimeOutData.timer, this.sessionTimeOutContext) * 60;
        }
        kony.application.registerForIdleTimeout(1, scope.showSessionPopup.bind(scope,time));
        let getFrame = (widget) => {
          widget.info = widget.frame;
        };
        this.view.flxAppHeader.doLayout = getFrame;
        this.view.flxAppFooter.doLayout = getFrame;
        this.view.flxMainScroll.doLayout = function()
        {
          if(this.view.flxAppHeader.info.height!==undefined && this.view.flxAppFooter.info.height!== undefined){
            this.view.flxMainWrapper.minHeight = window.innerHeight - this.view.flxAppHeader.info.height - this.view.flxAppFooter.info.height + "dp"; 
          }
        }.bind(this);
        this.view.onBreakpointChange = this.onBreakpointChange;
      } catch (err) {
        scope.setError(err, "form template preShow");
      }
    },
    /**
     * Gets invoked when collection gets updated so that UI gets updated
     */
    render: function () {
      var scope = this;
      try {
      } catch (err) {
        scope.setError(err, "render");
      }
    },
    /**
     * Updates the context data and loads the segment with the updated data
     */
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
    /**
     * Generates a random key into which context data can be stored into collection
     * @returns {String} Key into which context data can be stored into collection
     */
    fetchContextKey: function () {
      var scope = this;
      try {
        let segMasterData = scope._dataMapping.segformTemplate.segmentMasterData;
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
    /**
     * Sets the generated context key in business controller
     */
    setContextKey: function () {
      var scope = this;
      try {
        scope.businessController.setContextKey(scope.contextKey);
      } catch (err) {
        scope.setError(err, "setContextKey");
      }
    },
    /**
     * Sets the data in customPopup
     */
    setPopup: function (logOutContext) {
      var scope = this;
      this.view.CustomPopup.lblHeading.text = logOutContext.heading;
      this.view.CustomPopup.lblPopupMessage.text = logOutContext.message;
      if (logOutContext.yesClick !== null && logOutContext.yesClick !== undefined) {
        this.view.CustomPopup.btnYes.onClick = function () {
          scope.hidePopup();
          logOutContext.yesClick();
        };
      }
      if (logOutContext.yesText !== null && logOutContext.yesText !== undefined)
        this.view.CustomPopup.btnYes.text = logOutContext.yesText;
      if (logOutContext.noText !== null && logOutContext.noText !== undefined)
        this.view.CustomPopup.btnNo.text = logOutContext.noText;
      if (logOutContext.noClick !== null && logOutContext.noClick !== undefined) {
        this.view.CustomPopup.btnNo.onClick = function () {
          scope.hidePopup();
          logOutContext.noClick();
        };
      }
      else {
        this.view.CustomPopup.btnNo.onClick = this.hidePopup;
      }
      if (logOutContext.srcWidget !== null && logOutContext.srcWidget !== undefined)
        this.view.CustomPopup.srcWidget = logOutContext.srcWidget;
      this.view.CustomPopup.lblHeading.accessibilityConfig = {
        "a11yARIA": {
          "tabindex": -1,
        },
      };
      this.view.CustomPopup.lblPopupMessage.accessibilityConfig = {
        "a11yARIA": {
          "tabindex": -1,
        },
      };
      this.view.CustomPopup.btnNo.accessibilityConfig = {
        "a11yLabel": logOutContext.noa11yLabel!==undefined?logOutContext.noa11yLabel:"No, stay signed in",
        "a11yARIA": {
          "role": "button",
          "tabindex": 0
        }
      };
      this.view.CustomPopup.btnYes.accessibilityConfig = {
        "a11yLabel": logOutContext.yesa11yLabel!==undefined?logOutContext.yesa11yLabel:"Yes, sign me out",
        "a11yARIA": {
          "role": "button",
          "tabindex": 0
        }
      };
      this.view.CustomPopup.flxCross.accessibilityConfig = {
        a11yLabel: logOutContext.closea11yLabel!==undefined?logOutContext.closea11yLabel:"Close the sign out dialog",
        "a11yARIA": {
          "role": "button",
          "tabindex": 0
        }
      };
      if(logOutContext.popupsetActive!==undefined){
        this.popupsetActive=logOutContext.popupsetActive;
      }
      this.showPopup();
    },
    setPopupData : function()
    {
      var scope = this;
        this.view.CustomPopup.lblHeading.text = scope.businessController.convertTokensInDataMapping(this._customPopupData.lblHeading,this.customPopupContext); 
        this.view.CustomPopup.lblHeading.accessibilityConfig={
          "a11yARIA": {
            "tabindex" : -1,
          },
        };
      
        this.view.CustomPopup.lblPopupMessage.text = scope.businessController.convertTokensInDataMapping(this._customPopupData.lblPopupMessage,this.customPopupContext); 
        this.view.CustomPopup.lblPopupMessage.accessibilityConfig={
          "a11yARIA": {
            "tabindex" : -1,
          },
        };
      this.view.CustomPopup.btnNo.text = scope.businessController.convertTokensInDataMapping(this._customPopupData.btnNo,this.customPopupContext);
        this.view.CustomPopup.btnNo.accessibilityConfig={
          "a11yLabel": "No, sign me out",
          "a11yARIA": {
            "role" : "button",
            "tabindex":0
          }
        };
      this.view.CustomPopup.btnYes.text = scope.businessController.convertTokensInDataMapping(this._customPopupData.btnYes.btnYesValue,this.customPopupContext);
        this.view.CustomPopup.btnYes.accessibilityConfig={
          "a11yLabel": "Yes, stay signed in",
           "a11yARIA": {
            "role" : "button",
            "tabindex":0
           }
        };
      this.view.CustomPopup.flxCross.accessibilityConfig={
        a11yLabel: "Close the sign out dialog",
         "a11yARIA": {
            "role" : "button",
            "tabindex":0
          }
      };
      this.view.CustomPopup.btnYes.onClick = function(){
        scope.hidePopup();
        if(scope.componentUtility.isEmptyNullUndefined(scope._customPopupData.btnYes.callToAction.form)){
          var Module = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ moduleName: scope._customPopupData.btnYes.callToAction.module, appName: scope._customPopupData.btnYes.callToAction.appName });
          Module.presentationController[scope._customPopupData.btnYes.callToAction.presentationControllerMethod](scope._customPopupData.btnYes.callToAction.params);
        }
        else{
          var ntf = new kony.mvc.Navigation({
            "appName": scope._customPopupData.btnYes.callToAction.appName,
            "friendlyName": scope._customPopupData.btnYes.callToAction.module+"/"+scope._customPopupData.btnYes.callToAction.form,
          });
          ntf.navigate();
        }
      };
    },
    /**
     * Performs the actions required before rendering component
     */
    postShow : function(){
      this.view.onKeyPress = this.onKeyPressCallBack;
      this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack;
      this.view.lblPageTitle.accessibilityConfig = {
        "a11yARIA": {
          "tabindex": -1
        }
      }
      this.view.appHeader.btnSkipHeaderClick=this.titleSetActive;
    },
    onKeyPressCallBack : function(eventObject,eventPayload){
      var scope=this;
      var currentForm = kony.application.getCurrentForm();
      if(eventPayload.keyCode===27){
          if(scope.view.flxDialogs.isVisible){
              scope.hidePopup();
          }
      else if(currentForm.flxAlertIdle){
          if(currentForm.flxAlertIdle.isVisible){
              scope.resetIdle();
          }
      }
     scope.view.appHeader.onKeyPressCallBack(eventObject,eventPayload);
    }
    },
    /**
     * callBack function which clones idlePopup to be triggered after the idle time
     */
    timeoutCall : function()
    {
      if (kony.application.getCurrentForm()){
        if(!kony.application.getCurrentForm().flxAlertIdle){
        var flxAlertIdle = new kony.ui.FlexScrollContainer({
          "id": "flxAlertIdle",
          "isVisible": false,
          "layoutType": kony.flex.FREE_FORM,
          "skin": "ICSknScrlFlx000000OP40",
          "left": "0dp",
          "top": "0dp",
          "width": "100%",
          "height": "100%",
          "zIndex": 5,
          "enableScrolling": true,
          "scrollDirection": kony.flex.SCROLL_VERTICAL,
          "verticalScrollIndicator": true,
          "bounces": true,
          "allowVerticalBounce": true,
          "bouncesZoom": true,
      }, {}, {});
        flxAlertIdle.setDefaultUnit(kony.flex.DP);
        kony.application.getCurrentForm().add(flxAlertIdle);
        var componentTimeOut = new com.InfinityOLB.Resources.idlePopup({
          "autogrowMode": kony.flex.AUTOGROW_NONE,
          "id": "timeOutPopup",
          "layoutType": kony.flex.FREE_FORM,
          "masterType": constants.MASTER_TYPE_DEFAULT,
          "isModalContainer": true,
          "top":"20px",
          "centerX":"50%",
          "width":"90%",
          "maxWidth":"500px",
          "isVisible":true,
          "appName": "ResourcesMA"
        });
        componentTimeOut.doLayout = CommonUtilities.centerPopupFlex;
        flxAlertIdle.add(componentTimeOut);
        }
      }},
    /**
     * Method to set the the timer and onClicks of buttons in idlePopup
     * @param {Number} configParams - Takes time in seconds as input
     */
    showSessionPopup : function(sec){
      var scope=this;
      var currentForm=kony.application.getCurrentForm();
      if(currentForm.flxAlertIdle){
      currentForm.flxAlertIdle.setVisibility(true);
      var nowTime = Math.floor(Date.now()/1000);
      var timeOut = sec + nowTime;
      currentForm.timeOutPopup.lblTimeOut.text = ("0" + parseInt(((timeOut - (Math.floor(Date.now() / 1000))) / 60)).toString().slice(-2) + ":" + ("0" + ((timeOut - (Math.floor(Date.now() / 1000))) % 60).toString()).slice(-2));
      kony.timer.schedule("timerIdle", function() {
        var timePassed = timeOut - Math.floor(Date.now() / 1000);
        if (timePassed < 0) {
          scope.cancelTimeout();
          kony.timer.cancel("timerIdle");
          if(scope.componentUtility.isEmptyNullUndefined(scope._sessionTimeOutData.btnNo.callToAction.form)){
            var Module = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ moduleName: scope._sessionTimeOutData.btnNo.callToAction.module, appName:scope._sessionTimeOutData.btnNo.callToAction.appName  });
            Module.presentationController[scope._sessionTimeOutData.btnNo.callToAction.presentationControllerMethod](scope._sessionTimeOutData.btnNo.callToAction.params);
          }
          else{
            var ntf = new kony.mvc.Navigation({
              "appName": scope._sessionTimeOutData.btnNo.callToAction.appName,
              "friendlyName": scope._sessionTimeOutData.btnNo.callToAction.module+"/"+scope._sessionTimeOutData.btnNo.callToAction.form,
            });
            ntf.navigate();

          }
        }else{
          currentForm.timeOutPopup.lblTimeOut.text = ("0" + parseInt(timePassed / 60).toString().slice(-2) + ":" + ("0" + (timePassed % 60).toString()).slice(-2));
          currentForm.timeOutPopup.flxPBar.flxProgress.width = (sec - timePassed) * 100 / sec  + "%";
          currentForm.timeOutPopup.flxPBar.flxProgress.forceLayout();
        }
      }, 1, true);
      currentForm.timeOutPopup.lblPopupMessage.text=scope.businessController.convertTokensInDataMapping(this._sessionTimeOutData.lblPopupMessage,this.sessionTimeOutContext);
      currentForm.timeOutPopup.lblPopupMessage2.text=scope.businessController.convertTokensInDataMapping(this._sessionTimeOutData.lblPopupMessage2,this.sessionTimeOutContext);
      currentForm.timeOutPopup.btnNo.text =scope.businessController.convertTokensInDataMapping(this._sessionTimeOutData.btnNo.btnNoValue,this.sessionTimeOutContext);
      currentForm.timeOutPopup.btnYes.text=scope.businessController.convertTokensInDataMapping(this._sessionTimeOutData.btnYes,this.sessionTimeOutContext);
      currentForm.timeOutPopup.lblHeading.text=scope.businessController.convertTokensInDataMapping(this._sessionTimeOutData.lblHeading,this.sessionTimeOutContext);
        currentForm.timeOutPopup.lblHeading.accessibilityConfig={
          "a11yARIA": {
            "tabindex": -1,
          },
        };
        currentForm.timeOutPopup.lblPopupMessage.accessibilityConfig={
          "a11yARIA": {
            "tabindex": -1,
          },
        };
        currentForm.timeOutPopup.lblPopupMessage2.accessibilityConfig={
          "a11yARIA": {
            "tabindex": -1,
          },

        };
      currentForm.timeOutPopup.btnYes.accessibilityConfig={
          "a11yARIA": {
            "role":"button",
          }
        };
        currentForm.timeOutPopup.btnNo.accessibilityConfig={
           "a11yARIA": {
            "role": "button",
          }
        };
      currentForm.timeOutPopup.btnClose.accessibilityConfig={
        "a11yLabel":"click here to close popup",
         "a11yARIA":{
           "role":"button",
         }
        
      };

      currentForm.timeOutPopup.btnNo.onClick = function()
      {
        scope.resetIdle();
        if(scope.componentUtility.isEmptyNullUndefined(scope._sessionTimeOutData.btnNo.callToAction.form)){
          var Module = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ moduleName: scope._sessionTimeOutData.btnNo.callToAction.module, appName: scope._sessionTimeOutData.btnNo.callToAction.appName });
          Module.presentationController[scope._sessionTimeOutData.btnNo.callToAction.presentationControllerMethod](scope._sessionTimeOutData.btnNo.callToAction.params);
        }
        else{
          var ntf = new kony.mvc.Navigation({
            "appName": scope._sessionTimeOutData.btnNo.callToAction.appName,
            "friendlyName": scope._sessionTimeOutData.btnNo.callToAction.module+"/"+scope._sessionTimeOutData.btnNo.callToAction.form,
          });
          ntf.navigate();
        }
      },
        currentForm.timeOutPopup.btnYes.onClick = this.resetIdle;
      currentForm.timeOutPopup.btnClose.onClick = this.resetIdle;
      currentForm.timeOutPopup.lblHeading.setActive(true);
      currentForm.timeOutPopup.onKeyPress = scope.onKeyPressCallBack;
    }
    else{
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "appName": "AuthenticationMA", "moduleName": "AuthUIModule" }).presentationController.doBeforeLogout();
	}
    },
    /**
     * Resets the timer to trigger idlePopup
     */
    resetIdle:function()
    {
      currentForm = kony.application.getCurrentForm();
      currentForm.flxAlertIdle.isVisible=false;
      kony.timer.cancel("timerIdle");
      if(this.sessionTimeOutContext===null || this.sessionTimeOutContext=== undefined || this.sessionTimeOutContext === "" ){
        time=240;
      }
      else{
        time = this.businessController.convertTokensInDataMapping(this._sessionTimeOutData.timer, this.sessionTimeOutContext) * 60;
      }
      kony.application.registerForIdleTimeout(1, this.showSessionPopup.bind(this, time));
    },
    /**
     * Cancels the timer to trigger idlePopup
     */
    cancelTimeout : function()
    {
      var currentForm = kony.application.getCurrentForm();
      currentForm.flxAlertIdle.isVisible=false;
      kony.application.registerForIdleTimeout(1, null);
      kony.timer.cancel("timerIdle");
    },
    /**
     * Function to display loading screen
     */
    showLoading: function () {
      kony.application.showLoadingScreen("loadingskin","Data is still Loading");
    },
    /**
     * Function to hide loading screen
     */
    hideLoading: function () {
      kony.application.dismissLoadingScreen();
    },
    /**
     * Function to display logout popup
     *  @param {Object} popUpData - Data to be displayed in popup
     */
    showPopup: function (data) {
      this.view.flxDialogs.setVisibility(true);
      this.view.forceLayout();
      this.view.CustomPopup.lblHeading.setActive(true);
    },
    titleSetActive: function(){
      this.view.lblPageTitle.accessibilityConfig = {
        "a11yARIA": {
          "tabindex": -1
        }
      }
      this.view.lblPageTitle.setActive(true);
    },
    /**
     * Function to dismiss popup
     */
    hidePopup: function () {
      this.view.flxDialogs.isVisible=false;
      if (this.view.CustomPopup.srcWidget!== undefined) {
        this.view.CustomPopup.srcWidget.setActive(true);
      }
      if(this.popupsetActive!== ""){
        this.popupsetActive();
        this.popupsetActive="";
      }
    },
    setBannerFocus : function(){
      this.view.flxMainScroll.setContentOffset({
                "x": 0,
                "y": 0
            });
    },
    /**
     * Function to handle onBreakPoint changes
     */
    onBreakpointChange: function(width){
      this.adjustTop();
    },
    /**
     * Function to activate menu
     */
    activateMenu: function(parentId, childId){
    },
    /**
     * Function to hide banner error
     */
    hideBannerError: function(){
      this.view.flxBanner.setVisibility(false);
      this.adjustTop();
    },
    /**
     * Function to display Banner Error
     *  @param {Object} errorMessage - Data to be displayed in Banner
     */
    showBannerError: function(errorMessage){
      this.view.GenericMessageNew.setContext(errorMessage);
      this.view.flxBanner.setVisibility(true);
      this.adjustTop();
    },
    /**
     * Gets trigerred when any exception occurs in any method in view controller
     * @param errorMsg {String} - error message
     * @param method {String} - method from which error message is received
     */
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