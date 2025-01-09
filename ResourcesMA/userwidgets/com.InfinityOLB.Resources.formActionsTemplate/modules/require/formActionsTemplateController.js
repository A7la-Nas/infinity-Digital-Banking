define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.nextButton = this.view.btnNext;
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },

    //enables the next button
    enableNextButton : function()
    {
      this.nextButton.setEnabled(true);
      this.nextButton.skin = "sknBtnNormalSSPFFFFFF15Px";
      this.nextButton.hoverSkin = "sknBtnNormalSSPFFFFFFHover15Px";
      this.nextButton.focusSkin = "sknBtnFocusSSPFFFFFF15Px";
    },

    //disables the next button
    disableNextButton : function()
    {
      this.nextButton.setEnabled(false);
      this.nextButton.skin = "sknBtnBlockedSSP0273e315px";
      this.nextButton.hoverSkin = "sknBtnBlockedSSP0273e315px";
      this.nextButton.focusSkin = "sknBtnBlockedSSP0273e315px";
    }
  };
});
