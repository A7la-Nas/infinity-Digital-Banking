define(['./EntitlementUtils'], function(EntitlementUtils) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      // Custom skin properties.
      this._sknLink = "";
      this._sknLinkValue = "";
      this._sknAddLink = "";
      this._sknAddLinkValue = "";
      this._sknAddLinkValue = "";
      this._sknAddLinkSeperator = "";
      this._sknContainer = "";
      this._sknBackground = "";
      this._sknCancelLink = "";

      // Account Type property.
      this._accountType = "";

      // Primary CTAs visibility property.
      this._isPrimaryVisible = "";

      // Custom link action properties.
      this._link1CTA = "";
      this._link2CTA = "";
      this._link3CTA = "";
      this._link4CTA = "";
      this._link5CTA = "";
      this._link6CTA = "";
      this._link7CTA = "";
      this._link8CTA = "";
      this._link9CTA = "";
      this._link10CTA = "";
      this._link11CTA = "";
      //this._link12CTA = "";
      this._linkCancel = "";

      // Other properties.
      this._numberOfLinks = 0;
      this._parentScope = "";
      this._context = {};
      this._numberOfEntitledLinks = 0;
      this._actionObject = [];
      this._actionsHeight = "";
      this.addLinkObj= {};
      this.arr=[];
      
      this._isIPhone = false;
	this._myClone = "";
      //Entitlement util object
      this.EntitlementUtils = new EntitlementUtils();
    },

    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
            defineSetter(this, 'sknLink', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknLink = val;
                }
            });
            defineGetter(this, 'sknLink', function () {
                return this._sknLink;
            });
            defineSetter(this, 'sknLinkValue', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknLinkValue = val;
                }
            });
            defineGetter(this, 'sknLinkValue', function () {
                return this._sknLinkValue;
            });
            defineSetter(this, 'sknAddLink', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknAddLink = val;
                }
            });
            defineGetter(this, 'sknAddLink', function () {
                return this._sknAddLink;
            });
            defineSetter(this, 'sknAddLinkValue', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknAddLinkValue = val;
                }
            });
            defineGetter(this, 'sknAddLinkValue', function () {
                return this._sknAddLinkValue;
            });
            defineSetter(this, 'sknAddLinkSeperator', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknAddLinkSeperator = val;
                }
            });
            defineGetter(this, 'sknAddLinkSeperator', function () {
                return this._sknAddLinkSeperator;
            });
            defineSetter(this, 'sknContainer', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknContainer = val;
                }
            });
            defineGetter(this, 'sknContainer', function () {
                return this._sknContainer;
            });
            defineSetter(this, 'sknBackground', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknBackground = val;
                }
            });
            defineGetter(this, 'sknBackground', function () {
                return this._sknBackground;
            });
            defineSetter(this, 'sknCancelLink', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknCancelLink = val;
                }
            });
            defineGetter(this, 'sknCancelLink', function () {
                return this._sknCancelLink;
            });
            defineSetter(this, 'accountType', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._accountType = val;
                }
            });
            defineGetter(this, 'accountType', function () {
                return this._accountType;
            });
            defineSetter(this, 'link1CTA', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._link1CTA = val;
                }
            });
            defineGetter(this, 'link1CTA', function () {
                return this._link1CTA;
            });
            defineSetter(this, 'link2CTA', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._link2CTA = val;
                }
            });
            defineGetter(this, 'link2CTA', function () {
                return this._link2CTA;
            });
            defineSetter(this, 'link3CTA', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._link3CTA = val;
                }
            });
            defineGetter(this, 'link3CTA', function () {
                return this._link3CTA;
            });
            defineSetter(this, 'link4CTA', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._link4CTA = val;
                }
            });
            defineGetter(this, 'link4CTA', function () {
                return this._link4CTA;
            });
            defineSetter(this, 'link5CTA', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._link5CTA = val;
                }
            });
            defineGetter(this, 'link5CTA', function () {
                return this._link5CTA;
            });
            defineSetter(this, 'link6CTA', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._link6CTA = val;
                }
            });
            defineGetter(this, 'link6CTA', function () {
                return this._link6CTA;
            });
            defineSetter(this, 'link7CTA', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._link7CTA = val;
                }
            });
            defineGetter(this, 'link7CTA', function () {
                return this._link7CTA;
            });
            defineSetter(this, 'link8CTA', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._link8CTA = val;
                }
            });
            defineGetter(this, 'link8CTA', function () {
                return this._link8CTA;
            });
            defineSetter(this, 'link9CTA', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._link9CTA = val;
                }
            });
            defineGetter(this, 'link9CTA', function () {
                return this._link9CTA;
            });
            defineSetter(this, 'link10CTA', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._link10CTA = val;
                }
            });
            defineGetter(this, 'link10CTA', function () {
                return this._link10CTA;
            });
            defineSetter(this, 'linkCancel', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._linkCancel = val;
                }
            });
            defineGetter(this, 'linkCancel', function () {
                return this._linkCancel;
            });
            defineSetter(this, 'isPrimaryVisible', function (val) {
                if (typeof val === 'boolean' && val !== '') {
                    this._isPrimaryVisible = val;
                }
            });
            defineGetter(this, 'isPrimaryVisible', function () {
                return this._isPrimaryVisible;
            });
            defineGetter(this, 'link11CTA', () => {
                return this._link11CTA;
            });
            defineSetter(this, 'link11CTA', value => {
                this._link11CTA = value;
            });
            // defineGetter(this, 'link12CTA', () => {
            //     return this._link12CTA;
            // });
            // defineSetter(this, 'link12CTA', value => {
            //     this._link12CTA = value;
            // });
        },

    // Callback through action editor - preShow.
    preShow: function() {
      var self = this;
      try {
        self.mapLinkActionAccount();
        self.setSkins();
        self.setDeviceOs();
        self.setLinks();
        self.initActions();
        self.drawLinks();
        //self.view.flxAdditionalLinks.setVisibility(false);
        self.view.forceLayout();
         var navManager = applicationManager.getNavigationManager();
         var accSelected = navManager.getCustomInfo("selectedAccount");
        if(accSelected.accountStatus==='CLOSED'){
          self.showViewStatments();
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in preshow method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        self.onError(errObj);
      }
    },
    postShow: function(){
          var myForm = kony.application.getCurrentForm();
              var arr = myForm.widgets();
			if (this._myClone.isVisible === true) {
              myForm.remove(this._myClone);
             
              for(var i = 0; i < arr.length; i++) {
                if(arr[i] && arr[i].id && myForm[arr[i].id])
                myForm[arr[i].id].setEnabled(true);
              }
              
              myForm.enableScrolling = true;
            }
    },
     showViewStatments: function(){
       self=this;
        self._parentScope.view["quicklinksNative"].isVisible = true;
                           self.view.flxMain.layoutType = kony.flex.FREE_FORM;
                           self.view.flxLink1.centerX = "50%";
                           self.view.flxLink1.isVisible = true;
                           self.view.flxLink2.isVisible = false;
                           self.view.flxLink3.isVisible = false;
                           self.view.flxLink4.isVisible = false;
       self._numberOfLinks=1;
       self._actionObject = [{text: 'View Statements', context: '', action: 'getStatements', icon: 'statements.png'}];
        self.setLinks();
        self.initActions();
        self.drawLinks();
   
   },
    
    //Method to check the device os.
    setDeviceOs: function() {
      var isIPhone = false;
        try {
            var deviceName = kony.os.deviceInfo().name;
            if (deviceName === "iPhone" || deviceName === "iPhone Simulator" || deviceName === "iPad" || deviceName === "iPad Simulator")
                isIPhone = true;
        } catch (e) {
            isIPhone = false;
        }
        this._isIPhone = isIPhone;
    },
        // Method to replace the i18n key with coresponding language text.
  getParsedValue: function(fieldValue) {
        var i18ntext = kony.i18n.getLocalizedString(fieldValue.substring(fieldValue.indexOf("${i18n{")+7, fieldValue.length-2));
        fieldValue = i18ntext;
        return fieldValue;
  },
    // Method to map the links which are entitled to user and account type.
    mapLinkActionAccount: function() {
      var self = this;
//       this.context.linkedIDAction = "editLinkedIDs";
      self._actionObject = [];
      try {
        for(var i = 1; i <= 11; i++) {
          var flag = true;
          var action = self["_link" + i + "CTA"];
          var link;
          if(action !== "") {
            if(typeof (action) === "object") {
              link = action;
            } else {
              link = JSON.parse(action);
            }
            if(!self.isMicroAppInstalled(link[self._accountType].microApp)){
              break;
            }
            if(kony.sdk.isNullOrUndefined(link[self._accountType]) || link[self._accountType] === "") {
              break;
            }
            if(link[self._accountType].entitlement_action) {
              flag = self.getActionEntitlement(link[self._accountType]);
            }
            if(link[self._accountType].action === 'accountClosurePopup'){
              var navManager = applicationManager.getNavigationManager();
              var accSelected = navManager.getCustomInfo("selectedAccount");
              accSelected["currentBalance"] = kony.sdk.isNullOrUndefined(accSelected.currentBalance) ? accSelected.availableBalance : accSelected.currentBalance; 
              if(accSelected.currentBalance!=='0' || accSelected.accountStatus!=='ACTIVE'){
                continue;
              }
            }
              if(link[self._accountType].action === 'actionViewSweep'){
              var navManager = applicationManager.getNavigationManager();
              var accSelected = navManager.getCustomInfo("selectedAccount");
            }
              if(link[self._accountType].action === 'actionCreateSweep'){
              var navManager = applicationManager.getNavigationManager();
              var accSelected = navManager.getCustomInfo("selectedAccount");
              if(accSelected.isSweepCreated){
                continue;
              }
            }
            if(flag && self.EntitlementUtils.isEntitled(link[self._accountType].entitlement)) {
              if(self._linkedIDAction !== link[self._accountType].action){
              var textFromI18n = this.getParsedValue(link[self._accountType].text);
              var tempLink = {
                "text": textFromI18n,
                "context": link[self._accountType].context,
                "action": link[self._accountType].action,
                "icon": link[self._accountType].image
              };
              self._actionObject.push(tempLink);
            }
            }
          } else {
            //             self._numberOfEntitledLinks = count;
            break;
          }
        }
        self._numberOfLinks = self._actionObject.length;
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in mapLinkActionAccount method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        self.onError(errObj);
      }
    },

    // Method to check if the link is entitled to the account type.
    isAccountEntitled: function() {
    },

    // Method to set skins.
    setSkins: function() {
      var self = this;
      try {
        for(var i = 1; i <= 4; i++) {
          self.view["flxLink" + i].skin = self._sknLink;
          self.view["lblLink" + i].skin = self._sknLinkValue;
        }
        self.view.flxAdditionalLinks.skin = self._sknBackground;
        self.view.flxActions.skin = self._sknContainer;
        for(var j = 4; j <= 11; j++) {
          self.view["flxAddRow" + j].skin = self._sknAddLink;
          self.view["lblAddLink" + j].skin = self._sknAddLinkValue;
          self.view["flxSeperator" + j].skin = self._sknAddLinkSeperator;
        }
        self.view.flxCancel.skin = self._sknContainer;
        self.view.lblCancel.skin = self._sknCancelLink;
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setSkins method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        self.onError(errObj);
      }
    },

    // Method to set link text to the links in component.
    setLinks: function() {
      var self = this;
      try {
        for(var i = 1; i <= self._numberOfLinks; i++) {
          var link = self._actionObject[i - 1].text;
          var icon = self._actionObject[i - 1].icon;
          //           if(link !== "") {
          if(i <= 3) {
            self.view["lblLink" + i].text = link;
            self.view["imgIcon" + i].src = icon;
            self.view["lblAddLink" + i].text = link;
          } else {
            self.view["lblAddLink" + i].text = link;
          }
          //           }
          //           else {
          //             self._numberOfLinks = i - 1;
          //             break;
          //           }
        }
        var cancelObj = self._linkCancel;
        if(typeof (cancelObj) === "object") {
          self.view.lblCancel.text = self._linkCancel.text;
        } else {
          self.view.lblCancel.text = JSON.parse(self._linkCancel).text;
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setLinks method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        self.onError(errObj);
      }
    },

    // Method to initialze actions for the links.
    initActions: function() {
      var self = this;
      try {
        for(var i = 1; i <= self._numberOfLinks; i++) {
          //           var action;
          //           if(typeof (self["_link" + i + "CTA"]) === "object") {
          //             action = self["_link" + i + "CTA"];
          //           }
          //           else {
          //             action = JSON.parse(self["_link" + i + "CTA"]);
          //           }
          if(i <= 3) {
            self.view["flxLink" + i].onClick = self._parentScope[self._actionObject[i - 1].action].bind(self._parentScope, self._actionObject[i - 1].context);
            self.view["flxAddRow" + i].onClick = self._parentScope[self._actionObject[i - 1].action].bind(self._parentScope, self._actionObject[i - 1].context);
          } else {
            self.view["flxAddRow" + i].onClick = self._parentScope[self._actionObject[i - 1].action].bind(self._parentScope, self._actionObject[i - 1].context);
          }
        }
        self.view.flxLink4.onTouchEnd = self.showAdditionalLinks;
        var cancelObj = self._linkCancel;
        if(!(kony.sdk.isNullOrUndefined(cancelObj)) && cancelObj !== "") {
          if(typeof (cancelObj) === "object") {
            self.view.flxCancel.onClick = self._parentScope[cancelObj.action].bind(self._parentScope, cancelObj.context);
          } else {
            self.view.flxCancel.onClick = self._parentScope[JSON.parse(cancelObj).action].bind(self._parentScope, JSON.parse(cancelObj).context);
          }
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in initActions method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        self.onError(errObj);
      }
    },

    // Method to draw links to turn visibility ON/OFF.
    drawLinks: function() {
      var self = this;
      try {
        if(self._isPrimaryVisible) {
          this.view.flxMain.isVisible = true;
          if(self._numberOfLinks === 0) {
            self._parentScope.view["quicklinksNative"].isVisible = false;
          }
          if(self._numberOfLinks === 1) {
            self._parentScope.view["quicklinksNative"].isVisible = true;
            self.view.flxMain.layoutType = kony.flex.FREE_FORM;
            self.view.flxLink1.centerX = "50%";
            self.view.flxLink1.isVisible = true;
            self.view.flxLink2.isVisible = false;
            self.view.flxLink3.isVisible = false;
            self.view.flxLink4.isVisible = false;
          } else if(self._numberOfLinks === 2) {
            self._parentScope.view["quicklinksNative"].isVisible = true;
            self.view.flxMain.layoutType = kony.flex.FLOW_HORIZONTAL;
            self.view.flxLink1.centerX = "";
            self.view.flxLink1.left = "18.75%";
            self.view.flxLink2.left = "18.75%";
            self.view.flxLink1.isVisible = true;
            self.view.flxLink2.isVisible = true;
            self.view.flxLink3.isVisible = false;
            self.view.flxLink4.isVisible = false;
          } else if(self._numberOfLinks === 3) {
            self._parentScope.view["quicklinksNative"].isVisible = true;
            self.view.flxMain.layoutType = kony.flex.FLOW_HORIZONTAL;
            self.view.flxLink1.centerX = "";
            self.view.flxLink1.left = "7.5%";
            self.view.flxLink2.left = "7.5%";
            self.view.flxLink3.left = "7.5%";
            self.view.flxLink1.isVisible = true;
            self.view.flxLink2.isVisible = true;
            self.view.flxLink3.isVisible = true;
            self.view.flxLink4.isVisible = false;
          } else {
            self.drawAdditionalLinks();
          }
        } else {
          self.view.flxMain.isVisible = false;
          self.drawAdditionalLinks();
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in drawLinks method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        self.onError(errObj);
      }
    },

    // Method to draw additional links.
    drawAdditionalLinks: function() {
      var self = this;
      try {
        if(self._isPrimaryVisible) {
          self.view.flxMain.layoutType = kony.flex.FLOW_HORIZONTAL;
          self.view.flxLink1.centerX = "";
          self.view.flxLink1.left = "0%";
          self.view.flxLink2.left = "0%";
          self.view.flxLink3.left = "0%";
          self.view.flxLink4.left = "0%";
          self.view.flxLink1.isVisible = true;
          self.view.flxLink2.isVisible = true;
          self.view.flxLink3.isVisible = true;
          self.view.flxLink4.isVisible = true;
          for(var i = 1; i <= 11; i++) {
            self.view["flxAddRow" + i].isVisible = false;
          }
          for(var k = 4; k <= self._numberOfLinks; k++) {
            self.view["flxAddRow" + k].isVisible = true;
          }
          var height = (52 * (self._numberOfLinks - 3));
          self._actionsHeight = (height + 85) + "dp";
          self.view.flxActions.height = height + "dp";
        }
        else {
          for(var j = 1; j <= self._numberOfLinks; j++) {
            self.view["flxAddRow" + j].isVisible = true;
          }
          var h = (52 * (self._numberOfLinks));
          self._actionsHeight = (h + 85) + "dp";
          self.view.flxActions.height = h + "dp";
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in drawAdditionalLinks method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        self.onError(errObj);
      }
    },

    // Method to show additional links.
    showAdditionalLinks: function() {
      var self = this;
      try {
        if(self._isIPhone) {
          self.showAddIPhoneLinks();
        } else {
          var form = kony.application.getCurrentForm();
          arr = form.widgets();
          for(var i = 0; i < arr.length; i++) {
            form[arr[i].id].setEnabled(false);
          }
          form.enableScrolling = false;
          addLinkObj = this.view.flxAdditionalLinks.clone();
          this._myClone = addLinkObj;
          addLinkObj.isVisible = true;
          addLinkObj.bottom = "0dp";
          addLinkObj.left = "0dp";
          addLinkObj.height = "100%";
          addLinkObj.zIndex = "100";
          addLinkObj.flxDummyAnimation.flxCancel.onClick = function() {
            var animDef = {
              "0": {
                "bottom": "0dp"
              },
              "100": {
                "bottom": "-" + self._actionsHeight
              }
            };
            var animObj = kony.ui.createAnimation(animDef);
            var animConfig = {
              "duration": 0.2,
              "iterationCount": 1,
              "delay": 0.1,
              "fillMode": kony.anim.FILL_MODE_FORWARDS
            };
            form.flxDummyAnimation.animate(animObj, animConfig, {
              "animationEnd": function() {
                form.remove(addLinkObj);
                for(var i = 0; i < arr.length; i++) {
                  form[arr[i].id].setEnabled(true);
                }
                form.enableScrolling = true;
                var cancelObj = self._linkCancel;
                if(!(kony.sdk.isNullOrUndefined(cancelObj)) && cancelObj !== "") {
                  if(typeof (cancelObj) === "object") {
                    self._parentScope[cancelObj.action](cancelObj.context);
                  } else {
                    self._parentScope[JSON.parse(cancelObj).action](JSON.parse(cancelObj).context);
                  }
                }
              }
            });
          };
          var animDef = {
            "0": {
              "bottom": "-" + self._actionsHeight
            },
            "100": {
              "bottom": "0dp"
            }
          };
          var animObj = kony.ui.createAnimation(animDef);
          var animConfig = {
            "duration": 0.2,
            "iterationCount": 1,
            "delay": 0.1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS
          };
          form.add(addLinkObj);
          form.flxDummyAnimation.animate(animObj, animConfig, {});
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in drawAdditionalLinks method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        self.onError(errObj);
      }
    },

    // Method to add action sheet in ios devices.
    showAddIPhoneLinks: function() {
      var self = this;
      try {
        var actionSheetObject = new kony.ui.ActionSheet({
          "title": null,
          "message": null,
          "showCompletionCallback": null
        });
        for(var i = 4; i <= self._numberOfLinks; i++) {
          var link = self._actionObject[i - 1];
          if(self._linkedIDAction !== link.action){
          var actionItem = new kony.ui.ActionItem({
            "title": link.text,
            "style": constants.ACTION_STYLE_DEFAULT,
            "action": self._parentScope[link.action].bind(self._parentScope, link.context)
          });
          actionSheetObject.addAction(actionItem);
          }
        }
        var actionCancel = new kony.ui.ActionItem({
          "title": "Cancel",
          "style": constants.ACTION_ITEM_STYLE_CANCEL,
          "action": function() {
            actionSheetObject.dismiss();
          }
        });
        actionSheetObject.addAction(actionCancel);
        actionSheetObject.show();
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in showAddIPhoneLinks method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        self.onError(errObj);
      }
    },

    // Method exposed by the component which sets the parent scope.
    setParentScopeAndEntitlements: function(scope, entitlements) {
      var self = this;
      try {
        self._parentScope = scope;
        self._context.entitlement = entitlements;
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setParent method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        self.onError(errObj);
      }
    },

    /** Method exposed by the component to update the links and actions passed through the context.
    parameter - param (JSON array containing the links and actions) */
    setContext: function(param) {
      var self = this;
      try {
        self.EntitlementUtils.setEntitlements(param);
        self._accountType = param.accountType;
        if(param.linkCTA !== undefined && param.linkCTA !== null && param.linkCTA !== ""){
          for (var i = 1; i <= 11; i++) {
            if(self["_link" + i + "CTA"] !== param.linkCTA["link" + i + "CTA"]){
              self["_link" + i + "CTA"] = param.linkCTA["link" + i + "CTA"];
            }
          }
        }
        self.mapLinkActionAccount();
        self.setLinks();
        self.initActions();
        self.drawLinks();
        self.view.forceLayout();
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setContext method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        self.onError(errObj);
      }
    },

    // Method exposed to show contextual actions.
    showContextualActions: function() {
      var self = this;
      try {
        self.view.flxMain.isVisible = false;
//           this.setLinkVisibilityByContext("editLinkedIDs");
        self.view.flxAdditionalLinks.isVisible = true;
        self.view.flxCancel.onClick = function() {
          var animDef = {
            "0": {
              "bottom": "0dp"
            },
            "100": {
              "bottom": "-" + self._actionsHeight
            }
          };
          var animObj = kony.ui.createAnimation(animDef);
          var animConfig = {
            "duration": 0.2,
            "iterationCount": 1,
            "delay": 0.1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS
          };
          self.view.flxDummyAnimation.animate(animObj, animConfig, {
            "animationEnd": function() {
              self.view.flxAdditionalLinks.isVisible = false;
                var cancelObj = self._linkCancel;
                if(!(kony.sdk.isNullOrUndefined(cancelObj)) && cancelObj !== "") {
                  if(typeof (cancelObj) === "object") {
                    self._parentScope[cancelObj.action](cancelObj.context);
                  } else {
                    self._parentScope[JSON.parse(cancelObj).action](JSON.parse(cancelObj).context);
                  }
                }
            }
          });
        };
        var animDef = {
          "0": {
            "bottom": "-" + self._actionsHeight
          },
          "100": {
            "bottom": "0dp"
          }
        };
        var animObj = kony.ui.createAnimation(animDef);
        var animConfig = {
          "duration": 0.2,
          "iterationCount": 1,
          "delay": 0.1,
          "fillMode": kony.anim.FILL_MODE_FORWARDS
        };
        self.view.flxDummyAnimation.animate(animObj, animConfig, {});
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setContext method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        self.onError(errObj);
      }
    },

    // Method which overrides links from the context.
    overrideLinksFromContext: function() {
      var self = this;
      try {
        var context = self._context;
        self._numberOfLinks = self._context.length;
        var i = 1;
        for(; i <= self._numberOfLinks; i++) {
          self["_link" + i + "Text"] = context[i - 1]["linkText"];
        }
        for(; i	 <= 11; i++) {
          self["_link" + i + "Text"] = "";
        }
        self.setLinks();
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in overrideLinksFromContext method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        self.onError(errObj);
      }
    },

    //	Method which overrides actions from the context.
    overrideActionsFromContext: function() {
      var self = this;
      try {
        var context = self._context;
        for(var i = 1; i <= self._numberOfLinks; i++) {
          var action = context[i - 1]["linkCTA"];
          self["_link" + i + "CTA"] = action;
          if(action.level === "Form") {
            if(i <= 3) {
              self.view["flxLink" + i].onClick = self._parentScope[action.method];
            } else {
              self.view["flxAddRow" + i].onClick = self._parentScope[action.method];
            }
          }
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in overrideActionsFromContext method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        self.onError(errObj);
      }
    },
    
    //Method to set quicklinks visibility based on context
    setLinkVisibilityToContext: function(data){
      var self = this;
      try{
        self._linkedIDAction = data;
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setLinkVisibilityByContext method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        self.onError(errObj);
      }
    },

    resetAdditionalLinks:function(){
      var self = this;

      if (self._isIPhone) {

       return;

      }
      var form = kony.application.getCurrentForm();
      //var arr = form.widgets();
      var animDef = {
        "0": {
          "bottom": "0dp"
        },
        "100": {
          "bottom": "-" + self._actionsHeight
        }
      };
      var animObj = kony.ui.createAnimation(animDef);
      var animConfig = {
        "duration": 0.2,
        "iterationCount": 1,
        "delay": 0.1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS
      };
      form.flxDummyAnimation.animate(animObj, animConfig, {
        "animationEnd": function() {
          form.remove(addLinkObj);
          for(var i = 0; i < arr.length; i++) {
            form[arr[i].id].setEnabled(true);
          }
          form.enableScrolling = true;
          var cancelObj = self._linkCancel;
          if(!(kony.sdk.isNullOrUndefined(cancelObj)) && cancelObj !== "") {
            if(typeof (cancelObj) === "object") {
              self._parentScope[cancelObj.action](cancelObj.context);
            } else {
              self._parentScope[JSON.parse(cancelObj).action](JSON.parse(cancelObj).context);
            }
          }
        }
      });
    },
    
    isMicroAppInstalled:function(microAppName){
      if(microAppName){
        var configManager = applicationManager.getConfigurationManager();      
        return configManager.isMicroAppPresent(microAppName);
      }
      else
        return true;

    }
  };
});