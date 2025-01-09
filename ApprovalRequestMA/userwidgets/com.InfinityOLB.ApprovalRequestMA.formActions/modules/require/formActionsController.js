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
        this.nextButton.skin = "sknBtnNormalLatoFFFFFF15Px";
        this.nextButton.hoverSkin = "sknBtnNormalLatoFFFFFFHover15Px";
        this.nextButton.focusSkin = "sknBtnNormalLatoFFFFFF15PxFocus";
      },

      //disables the next button
      disableNextButton : function()
      {
        this.nextButton.setEnabled(false);
        this.nextButton.skin = "sknBtnBlockedLato0273e315px";
        this.nextButton.hoverSkin = "sknBtnBlockedLato0273e315px";
        this.nextButton.focusSkin = "sknBtnBlockedLato0273e315px";
      }
	};
});