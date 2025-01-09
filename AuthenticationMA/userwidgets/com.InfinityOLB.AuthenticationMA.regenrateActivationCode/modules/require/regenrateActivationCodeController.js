define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._sknLblCongratulations = "";
      this._sknLblActivationcodeRegenerated = "";
      this._sknLblText = "";
      this._btnEnableSkin = "";
      this._btnDisableSkin = "";

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineSetter(this, "sknLblCongratulations", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._sknLblCongratulations=val;
        }
      });
      defineGetter(this, "sknLblCongratulations", function() {
        return this._sknLblCongratulations;
      });
      defineSetter(this, "sknLblActivationcodeRegenerated", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._sknLblActivationcodeRegenerated=val;
        }
      });
      defineGetter(this, "sknLblActivationcodeRegenerated", function() {
        return this._sknLblActivationcodeRegenerated;
      });
      defineSetter(this, "sknLblText", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._sknLblText=val;
        }
      });
      defineGetter(this, "sknLblText", function() {
        return this._sknLblText;
      });
      defineSetter(this, "btnEnableSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._btnEnableSkin=val;
        }
      });
      defineGetter(this, "btnEnableSkin", function() {
        return this._btnEnableSkin;
      });
      defineSetter(this, "btnDisableSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._btnDisableSkin=val;
        }
      });
      defineGetter(this, "btnDisableSkin", function() {
        return this._btnDisableSkin;
      });
    },

    postshow: function(){
      this.setFlowActions();
      this.onBreakpointChange();
    },

    setFlowActions: function(){
      let scopeObj = this;

      scopeObj.view.btnActivate.onClick = function(){
        if(scopeObj.navigateToLogin)
          scopeObj.navigateToLogin();
      };
      scopeObj.view.flxClose.accessibilityConfig = {
        a11yARIA: {
            role: "button",
            tabindex: 0
        },
        a11yLabel: "Close and go back to login"
      };

      scopeObj.view.flxClose.onClick = function(){
        if(scopeObj.navigateToLogin)
          scopeObj.navigateToLogin();
      };
    },

    setFocusToH1: function(){
        let scopeObj = this;
        scopeObj.view.lblCngtsHeader.setActive(true);
    },

    onBreakpointChange: function(){
      let scopeObj = this;
      let breakpoint = kony.application.getCurrentBreakpoint();
      scopeObj.view.lblCngts.setVisibility(breakpoint !== 640);
      if(breakpoint === 768 || breakpoint === 1024) {
        scopeObj.view.flxCongts.layoutType = kony.flex.FLOW_VERTICAL;
        scopeObj.view.lblCngtsHeader.width = "";
        scopeObj.view.lblCngtsHeader.centerX = "50%";
        scopeObj.view.lblCngtsMsg.contentAlignment = constants.CONTENT_ALIGN_CENTER;

      } else {
        scopeObj.view.flxCongts.layoutType = kony.flex.FLOW_HORIZONTAL;
        scopeObj.view.lblCngtsHeader.width = "84%";
        scopeObj.view.lblCngtsHeader.centerX = "";
        scopeObj.view.lblCngtsMsg.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
      }
      scopeObj.view.lblCngts.skin = scopeObj.breakPointParser(scopeObj.sknLblCongratulations, breakpoint);
      scopeObj.view.lblCngtsHeader.skin = scopeObj.breakPointParser(scopeObj.sknLblActivationcodeRegenerated, breakpoint);
      scopeObj.view.lblCngtsMsg.skin = scopeObj.breakPointParser(scopeObj.sknLblText, breakpoint);
      let btnSkins = scopeObj.breakPointParser(scopeObj.btnEnableSkin, breakpoint);
      scopeObj.view.btnActivate.skin = btnSkins.normalSkin; 
      scopeObj.view.btnActivate.hoverSkin = btnSkins.hoverSkin; 
      scopeObj.view.btnActivate.focusSkin = btnSkins.focusSkin; 
      scopeObj.view.forceLayout();
    },

    breakPointParser:function(inputJSON,breakpoint){
      let jsonValue = (typeof inputJSON === "string") ? JSON.parse(inputJSON) : inputJSON;
      if(jsonValue.hasOwnProperty(breakpoint)){
        return jsonValue[breakpoint];
      }
      else if(jsonValue["default"]){
        return jsonValue["default"];
      }
      return jsonValue;
    },
  };
});