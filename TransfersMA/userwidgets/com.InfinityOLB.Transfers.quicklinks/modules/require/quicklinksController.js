define(['./EntitlementUtils'], function(EntitlementUtils) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      // Custom skin properties.
      this._sknRow = "";
      this._sknRowSeperator = "";
      this._sknLink = "";
      this._sknContainer = "";
      
      // Custom link properties.
      this._link1Text = "";
      this._link2Text = "";
      this._link3Text = "";
      this._link4Text = "";
      this._link5Text = "";
      this._link6Text = "";
      this._link7Text = "";
      this._link8Text = "";
      this._link9Text = "";
      this._link10Text = "";

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
      
      this._sknDummy = "";
      this._numberOfLinks = 0;
      this._parentScope = "";
      this._context = {};
      this._numberOfEntitledLinks = 0;
      
      //Entitlement util object
      this.EntitlementUtils = new EntitlementUtils();
    },

    // Logic for getters/setters of custom properties.
    initGettersSetters: function() {
      defineSetter(this, "sknRow", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._sknRow = val;
        }
      });
      defineGetter(this, "sknRow", function() {
        return this._sknRow;
      });

      defineSetter(this, "sknRowSeperator", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._sknRowSeperator = val;
        }
      });
      defineGetter(this, "sknRowSeperator", function() {
        return this._sknRowSeperator;
      });

      defineSetter(this, "sknLink", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._sknLink = val;
        }
      });
      defineGetter(this, "sknLink", function() {
        return this._sknLink;
      });

      defineSetter(this, "sknContainer", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._sknContainer = val;
        }
      });
      defineGetter(this, "sknContainer", function() {
        return this._sknContainer;
      });

      defineSetter(this, "link1Text", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._link1Text = val;
        }
      });
      defineGetter(this, "link1Text", function() {
        return this._link1Text;
      });

      defineSetter(this, "link2Text", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._link2Text = val;
        }
      });
      defineGetter(this, "link2Text", function() {
        return this._link2Text;
      });

      defineSetter(this, "link3Text", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._link3Text = val;
        }
      });
      defineGetter(this, "link3Text", function() {
        return this._link3Text;
      });

      defineSetter(this, "link4Text", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._link4Text = val;
        }
      });
      defineGetter(this, "link4Text", function() {
        return this._link4Text;
      });

      defineSetter(this, "link5Text", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._link5Text = val;
        }
      });
      defineGetter(this, "link5Text", function() {
        return this._link5Text;
      });

      defineSetter(this, "link6Text", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._link6Text = val;
        }
      });
      defineGetter(this, "link6Text", function() {
        return this._link6Text;
      });

      defineSetter(this, "link7Text", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._link7Text = val;
        }
      });
      defineGetter(this, "link7Text", function() {
        return this._link7Text;
      });

      defineSetter(this, "link8Text", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._link8Text = val;
        }
      });
      defineGetter(this, "link8Text", function() {
        return this._link8Text;
      });

      defineSetter(this, "link9Text", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._link9Text = val;
        }
      });
      defineGetter(this, "link9Text", function() {
        return this._link9Text;
      });

      defineSetter(this, "link10Text", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._link10Text = val;
        }
      });
      defineGetter(this, "link10Text", function() {
        return this._link10Text;
      });

      defineSetter(this, "link1CTA", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._link1CTA = val;
        }
      });
      defineGetter(this, "link1CTA", function() {
        return this._link1CTA;
      });

      defineSetter(this, "link2CTA", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._link2CTA = val;
        }
      });
      defineGetter(this, "link2CTA", function() {
        return this._link2CTA;
      });

      defineSetter(this, "link3CTA", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._link3CTA = val;
        }
      });
      defineGetter(this, "link3CTA", function() {
        return this._link3CTA;
      });

      defineSetter(this, "link4CTA", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._link4CTA = val;
        }
      });
      defineGetter(this, "link4CTA", function() {
        return this._link4CTA;
      });

      defineSetter(this, "link5CTA", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._link5CTA = val;
        }
      });
      defineGetter(this, "link5CTA", function() {
        return this._link5CTA;
      });

      defineSetter(this, "link6CTA", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._link6CTA = val;
        }
      });
      defineGetter(this, "link6CTA", function() {
        return this._link6CTA;
      });

      defineSetter(this, "linK7CTA", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._link7CTA = val;
        }
      });
      defineGetter(this, "link7CTA", function() {
        return this._link7CTA;
      });

      defineSetter(this, "link8CTA", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._link8CTA = val;
        }
      });
      defineGetter(this, "link8CTA", function() {
        return this._link8CTA;
      });

      defineSetter(this, "link9CTA", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._link9CTA = val;
        }
      });
      defineGetter(this, "link9CTA", function() {
        return this._link9CTA;
      });

      defineSetter(this, "link10CTA", function(val) {
        if((typeof val === 'string') && (val !== "")) {
          this._link10CTA = val;
        }
      });
      defineGetter(this, "link10CTA", function() {
        return this._link10CTA;
      });
    },

    // Callback through action editor - preShow.
    preShow: function() {
      var self = this;
      try {
        self._sknDummy = "slFbox";
        self.EntitlementUtils.setEntitlements(self._context);
        self.setSkins();
        self.setLinks();
        self.initActions();
        self.drawLinks();
        //  TODO Breakpoint Change enhancement - this.view.onBreakpointChange = this.onBreakpointChange;
        self.view.flxMain.forceLayout();
      } catch(err) {
          var errObj = {
            "errorInfo" : "Error in preshow method of the component.",
            "errorLevel" : "Configuration",
            "error": err
          };
          self.onError(errObj);
      }
    },

	// Method to set skins
    setSkins: function() {
      var self = this;
      try {
        // TODO
//       if(breakpoint === "1366dp") {
        for(var i = 1; i <= 10; i++) {
          self.view["flxRow" + i].skin = self._sknRow;
          self.view["lblLink" + i].skin = self._sknLink;
          self.view["flxSeperator" + i].skin = self._sknRowSeperator;
        }
        self.view.flxMain.skin = self._sknContainer;
        /** TODO  Breakpoint Change enhancement
      }
      else if(breakpoint === "1024dp") {
        for(var i = 1; i <= 10; i++)
          this.view["flxRow" + i].skin = this._sknContainer;
        this.view.flxMain.skin = this._sknDummy;
      } */
      } catch(err) {
          var errObj = {
            "errorInfo" : "Error in setSkins method of the component.",
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
//         self._context["entitlement"] = {};
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

    // Method to set link text to the links in component.
    setLinks: function() {
      var self = this;
      try {
        for(var i = 1; i <= 10; i++) {
          var link = self["_link" + i + "Text"];
          if(link !== "") {
            self.view["lblLink" + i].text = link;
            self.view["lblLink" + i].toolTip = link;
          }
          else {
            self._numberOfLinks = i - 1;
            break;
          }
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

    // Method to draw links to turn visibility ON/OFF.
    drawLinks: function() {
      var self = this;
      try {
        for(var i = 1; i <= 10; i++) {
          self.view["flxRow" + i].isVisible = false;
          self.view["flxSeperator" + i].isVisible = false;
        }
        var j = 1, entitled = 0;
        for(; j <= self._numberOfLinks; j++) {
          var action;
          if(typeof (self["_link" + j + "CTA"]) === "object") {
            action = self["_link" + j + "CTA"];
          }
          else {
            action = JSON.parse(self["_link" + j + "CTA"]);
          }
          if(self.EntitlementUtils.isEntitled(action.entitlement)) {
            self.view["flxRow" + j].isVisible = true;
            self.view["flxSeperator" + j].isVisible = true;
            entitled++;
          }
        }
        var height = (51 * entitled) + "dp";
        self.view.flxMain.height = height;
      } catch(err) {
          var errObj = {
            "errorInfo" : "Error in drawLinks method of the component.",
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
          var action;
          if(typeof (self["_link" + i + "CTA"]) === "object") {
            action = self["_link" + i + "CTA"];
          }
          else {
            action = JSON.parse(self["_link" + i + "CTA"]);
          }
          self.view["flxRow" + i].onClick = self._parentScope[action.method];
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

    // TODO - Method to handle breakpoint change.
    onBreakpointChange: function() {
      this.setSkins(kony.application.getCurrentBreakpoint());
    },

    /** Method exposed by the component to update the links and actions passed through the context.
    parameter - param (JSON array containing the links and actions) */
    setContext: function(param) {
      var self = this;
      var navManager = applicationManager.getNavigationManager();
            var flag = navManager.getCustomInfo('Focus');
            if (flag === true) {
                self.view.flxRow1.setActive(true);
                flag = '';
            } else {
      try {
        self._context = param;
        self.overrideLinksFromContext();
        self.overrideActionsFromContext();
        self.drawLinks();
        self.view.forceLayout();
      } catch(err) {
          var errObj = {
            "errorInfo" : "Error in setContext method of the component.",
            "errorLevel" : "Configuration",
            "error": err
          };
          self.onError(errObj);
      }}
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
        for(; i	 <= 10; i++) {
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
            self.view["flxRow" + i].onClick = self._parentScope[action.method];
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
    }
  };
});