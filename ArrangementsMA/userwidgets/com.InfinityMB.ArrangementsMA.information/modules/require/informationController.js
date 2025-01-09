/**
 * Component controller
 *
 * @author KH2144
 */
define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._headerText = "";
      this._infoText = "";
      this._crossButtonFontIcon = "";
      this._sknHeader = "";
      this._sknInfo = "";
      this._parentScope = "";
    },

    initGettersSetters: function() {
            defineSetter(this, 'headerText', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._headerText = val;
                }
            });
            defineGetter(this, 'headerText', function () {
                return this._headerText;
            });
            defineSetter(this, 'infoText', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._infoText = val;
                }
            });
            defineGetter(this, 'infoText', function () {
                return this._infoText;
            });
            defineSetter(this, 'crossButtonFontIcon', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._crossButtonFontIcon = val;
                }
            });
            defineGetter(this, 'crossButtonFontIcon', function () {
                return this._crossButtonFontIcon;
            });
            defineSetter(this, 'sknHeader', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknHeader = val;
                }
            });
            defineGetter(this, 'sknHeader', function () {
                return this._sknHeader;
            });
            defineSetter(this, 'sknInfo', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknInfo = val;
                }
            });
            defineGetter(this, 'sknInfo', function () {
                return this._sknInfo;
            });
        },

    /**
     * Component setData
     * Set values for properties
     * @param: flexData{JSONObject} - values for configuration
     */
    setData: function(flexData){
      var scope = this;
      scope._headerText = flexData.headerText;
      scope._infoText = flexData.infoText;
      scope._sknHeader = flexData.headerSkin;
      scope._sknInfo = flexData.infoSkin;
      scope._crossButtonFontIcon = flexData.crossButtonFontIcon;
      this.setUI();
    },

    setParentScope: function(scope){
      this._parentScope = scope;
    },

    setFocusMethod: function(){
      this.view.lblInfo.setActive(true);
    },

    onKeyPressCallBack: function (eventObject, eventPayload) {
      var scopeObj = this;
      if (kony.application.getCurrentForm().id === "frmAccountsDetails") {
        var scope = kony.application.getCurrentForm();
        if (eventPayload.keyCode === 27) {
          scopeObj.view.isVisible = false;
          scopeObj._parentScope.view.flxInfo.accessibilityConfig = {
            "a11yARIA": {
              "role": "button",
              "aria-haspopup": "dialog",
              "aria-expanded": false
            },
            "a11yLabel": "Read more information about Available Balance"
          }
          scopeObj._parentScope.view.flxInfo.setActive(true);
        }
        if (eventObject.id === "btnCross") {
          if (eventPayload.keyCode === 9) {
            eventPayload.preventDefault();
            scopeObj.view.isVisible = false;
            scopeObj._parentScope.view.flxInfo.accessibilityConfig = {
              "a11yARIA": {
                "role": "button",
                "aria-haspopup": "dialog",
                "aria-expanded": false
              },
              "a11yLabel": "Read more information about Available Balance"
            }
            scopeObj._parentScope.view.flxInfo.setActive(true);
          }
        }
        if (eventObject.id === "lblInfo") {
          if (eventPayload.keyCode === 9 && eventPayload.shiftKey === true) {
            eventPayload.preventDefault();
            scopeObj.view.isVisible = false;
            scopeObj._parentScope.view.flxInfo.accessibilityConfig = {
              "a11yARIA": {
                "role": "button",
                "aria-haspopup": "dialog",
                "aria-expanded": false
              },
              "a11yLabel": "Read more information about Available Balance"
            }
            scopeObj._parentScope.view.flxInfo.setActive(true);
          }
        }
      }
    },
    /**
     * Component setUI
     * Assign the values based on the properties configured
     */
    setUI: function(){
      var scope = this;
      if(scope._headerText){
        scope.view.lblInfo.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.Info");
      }else{
        scope.view.lblInfo.text = "";
      }
      if(scope._infoText){
        scope.view.RichTextInfo.text = kony.i18n.getLocalizedString("i18n.iIcon.accounts.SavingCurrentAccount");
      }else{
        scope.view.RichTextInfo.text = "";
      }
      if(scope._sknHeader){
        scope.view.lblInfo.skin = scope._sknHeader;
      }
      if(scope._sknInfo){
        scope.view.RichTextInfo.skin = scope._sknInfo;
      }
      if(scope._crossButtonFontIcon){
        scope.view.btnCross.text = scope._crossButtonFontIcon;
        scope.view.btnCross.setVisibility(true);
      }
      else{
        scope.view.btnCross.setVisibility(false);
      }
      scope.view.btnCross.onKeyPress = scope.onKeyPressCallBack;
      scope.view.lblInfo.onKeyPress = scope.onKeyPressCallBack;
      scope.view.lblInfo.accessibilityConfig = {
        "a11yARIA": {
            tabindex: -1
        },
        "tagName": "h2"
      }
      scope.view.RichTextInfo.accessibilityConfig = {
        "a11yARIA": {
            tabindex: -1
        }
      }
      scope.view.btnCross.accessibilityConfig = {
        "a11yLabel": kony.i18n.getLocalizedString("i18n.settings.closeDeletePopup")
      }
      scope.view.imgToolTip.accessibilityConfig = {
        "a11yARIA": {
          tabindex: -1
        }
      }
      scope.view.flxInformationText.accessibilityConfig = {
        "a11yARIA": {
           tabindex: -1,
          "role" : "dialog",
          "aria-live": "off"
        }
      }
    }
  };
});