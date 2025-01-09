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
    },

    setFlowActions: function(){
      let scopeObj = this;
      scopeObj.view.flexcheckuncheck.onClick = function(){
        let isSelected = scopeObj.isRememberMe();
        scopeObj.view.lblFavoriteEmailCheckBox.text = isSelected ? scopeObj.CHECBOX_UNSELECTED : scopeObj.CHECBOX_SELECTED;
        scopeObj.view.lblFavoriteEmailCheckBox.skin = isSelected ?  scopeObj.CHECKBOX_UNSELECTED_SKIN : scopeObj.CHECKBOX_SELECTED_SKIN; 
      };
      
      scopeObj.view.btnForgotPassword.onClick = function(){
        scopeObj.cantSignIn();
      };
    },

    isRememberMe: function(){
      let scopeObj = this;
      return scopeObj.view.lblFavoriteEmailCheckBox.text === scopeObj.CHECBOX_SELECTED ;
    }
  };
});