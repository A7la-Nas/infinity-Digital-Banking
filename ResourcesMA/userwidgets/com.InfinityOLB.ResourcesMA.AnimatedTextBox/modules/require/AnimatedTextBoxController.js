define([], function() {
  var responsiveUtils = new ResponsiveUtils();
  var skins = {
    tbxSkin    : "txtNoBorder15",
    separator  : "flxSeparator",
    errorSep   : "flxSeparatorError",
    placeholder: "lblPlaceholder15",
    title      : "lblTitle15"
  };
  return {
    isMaskingEnabled     : false,
    eventCallback        : null,
    onKeyUpCallback      : null,
    isReadOnly           : false,
    isPlaceHolderAnimated: false,
    isAnimating          : false,
    initialize: function () {
      var self = this;
      var textBox = this.view.tbxAnimatedKA;
      textBox.onKeyUp = function () {
        if (self.onKeyUpCallback !== null) {
          self.onKeyUpCallback();
        }
      };
      textBox.onBeginEditing = function () {
        self.hideError();
        if(self.isMaskingEnabled && self.view.imgEyeIcon.src === "mask.png"){
          self.view.tbxAnimatedKA.secureTextEntry = self.isMaskingEnabled;
        }
        self.animatePlaceholderUp();
      };
      textBox.onEndEditing = function () {
        if (textBox.text.length === 0) {
          self.animatePlaceholderDown();
        } else {
          self.animatePlaceholderUp();
        }
        if (self.eventCallback) {
          self.eventCallback(self.getText());
        }
      };
      this.view.flxEyeIcon.setVisibility(this.isMaskingEnabled);
      this.view.flxEyeIcon.onClick = this.toggleMasking;
    },
    animatePlaceholderUp: function () {
      if (this.isAnimating) {
        return;
      }
      this.isAnimating = true;
      var scope = this;
      this.view.lblAnimatedKA.animate(
        kony.ui.createAnimation({
          "100": {
            "top"       : "0dp",
            "stepConfig": {
              "timingFunction": kony.anim.EASE
            },
          }
        }), {
          "delay"         : 0,
          "iterationCount": 1,
          "fillMode"      : kony.anim.FILL_MODE_FORWARDS,
          "duration"      : 0.25
        }, {
          "animationEnd": function () {  
            scope.isPlaceHolderAnimated = true;
            scope.setIcon();
            scope.isAnimating = false;
          }
        }
      );
      this.view.forceLayout();
    },
    animatePlaceholderDown: function () {
      var scope = this;
      if (this.isAnimating) {
        return;
      }
      this.isAnimating = true;
      this.view.lblAnimatedKA.animate(
        kony.ui.createAnimation({
          "100": {
            "top"       : "25dp",
            "stepConfig": {
              "timingFunction": kony.anim.EASE
            },
          }
        }), {
          "delay"         : 0,
          "iterationCount": 1,
          "fillMode"      : kony.anim.FILL_MODE_FORWARDS,
          "duration"      : 0.25
        }, {
          "animationEnd": function () {
            scope.isPlaceHolderAnimated = false;
            scope.view.flxEyeIcon.setVisibility(false);
            scope.isAnimating = false;
          }
        }
      );
    },
    errorHandler: function () {
      this.view.lblErrorMsgKA.setVisibility(true);
      this.view.flxUnderlineKA.skin = skins.errorSep;
      this.view.flxUnderlineKA.height = "1";
    },
    //
    errorHandlerWithoutErrMsg: function () {
      this.view.lblErrorMsgKA.setVisibility(false);
      this.view.flxUnderlineKA.skin = skins.errorSep;
      this.view.flxUnderlineKA.height = "1";
    },
    getText: function () {
      return this.view.tbxAnimatedKA.text;
    },
    clear: function () {
      this.setText("");
    },
    setText: function (text) {
      if (text !== "" && text !== null && text !== undefined) {
        this.animatePlaceholderUp();
        this.view.tbxAnimatedKA.text = text;
        this.view.lblAnimatedKA.top = "0dp";
      } else {
        this.animatePlaceholderDown();
        this.view.tbxAnimatedKA.text = "";
      }
    },
    setData: function(data){
      if (data.text) {
        this.setText(data.text);
      }
      if (data.placeholder) {
        this.view.lblAnimatedKA.text = data.placeholder;
      }
      if (data.callback) {
        this.setCallback(data.callback);
      }
      if (data.isMaskingEnabled) {
        this.setMasking(data.isMaskingEnabled);
      }
      if(data.onKeyUpCallback!==undefined && data.onKeyUpCallback!==null){
        this.onKeyUpCallback= data.onKeyUpCallback;  
      }
      if (data.textInputMode) {
        this.view.tbxAnimatedKA.textInputMode = data.textInputMode;
      }
      this.initialize();
    },
    getData: function(){
      return this.getText();
    },
    setCallback: function (callback) {
      this.eventCallback = callback;
    },
    onError: function () {
      this.errorHandler();
    },
    // onClick of eye icon
    toggleMasking: function(){
      if(this.view.imgEyeIcon.src === "unmask.png"){
        this.view.tbxAnimatedKA.secureTextEntry = true;
        this.view.imgEyeIcon.src = "mask.png";
        this.view.flxEyeIcon.accessibilityConfig = {
          "a11yLabel": "kony.i18n.getLocalizedString(\"Infinity.Onboarding.Accessibility.animatedTextBox.UnMaskIcon\")"
        };
      }
      else{
        this.view.tbxAnimatedKA.secureTextEntry = false;
        this.view.imgEyeIcon.src = "unmask.png";
        this.view.flxEyeIcon.accessibilityConfig = {
          "a11yLabel" : "kony.i18n.getLocalizedString(\"Infinity.Onboarding.Accessibility.animatedTextBox.MaskIcon\")"
        };
      }
    },
    //val = true to enable masking
    setMasking: function(val){
      this.isMaskingEnabled = val;
      if(this.isMaskingEnabled){
        if(this.isPlaceHolderAnimated){
          this.view.flxEyeIcon.setVisibility(this.isMaskingEnabled);
        }
        else{
          this.view.flxEyeIcon.setVisibility(false);
        }
        this.view.tbxAnimatedKA.secureTextEntry = true;
      }
    },
    setIcon: function(){
      if(this.isMaskingEnabled){
        this.view.flxEyeIcon.setVisibility(true);
      }
    },
    onBreakpointChange: function (event, width) {
      if (width <= 640 || responsiveUtils.isMobile) {
        skins.tbxSkin = "txtNoBorder13";
        skins.title = "lblTitle13";
        skins.placeholder = "lblPlaceholder13";
        // if (this.view.lblAnimatedKA.skin === "lblPlaceholder13" || this.view.lblAnimatedKA.skin === "lblPlaceholder15") {
        //   this.view.lblAnimatedKA.skin = skins.placeholder;
        // } else {
        //   this.view.lblAnimatedKA.skin = skins.title;
        // }
        // this.view.tbxAnimatedKA.skin = skins.tbxSkin;
      } else {
        skins.tbxSkin = "txtNoBorder15";
        skins.title = "lblTitle15";
        skins.placeholder = "lblPlaceholder15";
        // if (this.view.lblAnimatedKA.skin === "lblPlaceholder13" || this.view.lblAnimatedKA.skin === "lblPlaceholder15") {
        //   this.view.lblAnimatedKA.skin = skins.placeholder;
        // } else {
        //   this.view.lblAnimatedKA.skin = skins.title;
        // }
        // this.view.tbxAnimatedKA.skin = skins.tbxSkin;
      }
      this.view.forceLayout();
    },
    showError: function (msg) {
      this.view.lblErrorMsgKA.text = msg;
      this.view.lblErrorMsgKA.setVisibility(true);
      this.view.flxUnderlineKA.skin = skins.errorSep;
    },
    hideError: function () {
      this.view.lblErrorMsgKA.setVisibility(false);
      this.view.flxUnderlineKA.skin = skins.separator;
    },
    setReadOnly: function(){
      this.view.setEnabled(false);
      this.view.flxUnderlineKA.setVisibility(false);
      this.isReadOnly = true;
    },
    setReadWrite: function(){
      this.view.setEnabled(true);
      this.view.flxUnderlineKA.setVisibility(true);
      this.isReadOnly = false;
    },
  };
});