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
      this.nextButton.skin = "sknBtnNormalSSPFFFFFF4vs";
      this.nextButton.hoverSkin = "sknBtnNormalSSPFFFFFFHover15Px";
      this.nextButton.focusSkin = "sknBtnNormalSSPFFFFFF15PxFocus";
    },

    //disables the next button
    disableNextButton : function()
    {
      this.nextButton.setEnabled(false);
      this.nextButton.skin = "sknBtnBlockedSSPFFFFFF15Px";
      this.nextButton.hoverSkin = "sknBtnBlockedSSPFFFFFF15Px";
      this.nextButton.focusSkin = "sknBtnBlockedSSPFFFFFF15Px";
    }
  };
});
