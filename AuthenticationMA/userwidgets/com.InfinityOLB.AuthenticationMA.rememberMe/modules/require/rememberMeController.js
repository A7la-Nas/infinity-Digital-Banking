define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      let scopeObj = this;
      scopeObj.CHECBOX_SELECTED = "C";
      scopeObj.CHECBOX_UNSELECTED = "D";
      scopeObj.CHECKBOX_UNSELECTED_SKIN = 'skn0273e320pxolbfonticons';
      scopeObj.CHECKBOX_SELECTED_SKIN = 'sknFontIconCheckBoxSelected';
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },

    preshow: function() {
      let scopeObj = this;
      scopeObj.setFlowActions();
      scopeObj.view.lblFavoriteEmailCheckBox.text = scopeObj.CHECBOX_SELECTED;
      scopeObj.view.lblFavoriteEmailCheckBox.skin = scopeObj.CHECKBOX_SELECTED_SKIN; 
      this.view.flexcheckuncheck.accessibilityConfig = {
        a11yARIA: {
          role: "checkbox",
          "aria-checked": true,
          "aria-labelledby": "lblRememberMe",
        }
      };
      this.view.btnForgotPassword.accessibilityConfig = {
        a11yARIA: {
          "role":"button",
        },
      };
      this.view.lblRememberMe.accessibilityConfig = {
        //a11yLabel: kony.i18n.getLocalizedString("i18n.login.RememberMe"),
        a11yARIA: {
          tabindex: -1,
        },
      };
    },
    setFlowActions: function () {
      let scopeObj = this;
      scopeObj.view.flexcheckuncheck.onClick = function () {
        let isSelected = scopeObj.isRememberMe();
        //scopeObj.view.lblFavoriteEmailCheckBox.text = isSelected ? scopeObj.CHECBOX_UNSELECTED : scopeObj.CHECBOX_SELECTED;
        //scopeObj.view.lblFavoriteEmailCheckBox.skin = isSelected ? scopeObj.CHECKBOX_UNSELECTED_SKIN : scopeObj.CHECKBOX_SELECTED_SKIN;
        if (isSelected) {
          scopeObj.view.lblFavoriteEmailCheckBox.text = scopeObj.CHECBOX_UNSELECTED;
          scopeObj.view.lblFavoriteEmailCheckBox.skin = scopeObj.CHECKBOX_UNSELECTED_SKIN;
          scopeObj.view.flexcheckuncheck.accessibilityConfig = {
            a11yARIA: {
              role: "checkbox",
              "aria-checked": false,
              "aria-labelledby": "lblRememberMe",
            }
          };
        }
        else {
          scopeObj.view.lblFavoriteEmailCheckBox.text = scopeObj.CHECBOX_SELECTED;
          scopeObj.view.lblFavoriteEmailCheckBox.skin = scopeObj.CHECKBOX_SELECTED_SKIN;
          scopeObj.view.flexcheckuncheck.accessibilityConfig = {
            a11yARIA: {
              role: "checkbox",
              "aria-checked": true,
              "aria-labelledby": "lblRememberMe",
            }
          };
        }
      };
      scopeObj.view.btnForgotPassword.onClick = function () {
        scopeObj.cantSignIn();
      };
    },
    isRememberMe: function(){
      let scopeObj = this;
      return scopeObj.view.lblFavoriteEmailCheckBox.text === scopeObj.CHECBOX_SELECTED ;
    },

    disableRememberMe : function() {
      this.view.flxRemember.isVisible = false;
    }
  };
});