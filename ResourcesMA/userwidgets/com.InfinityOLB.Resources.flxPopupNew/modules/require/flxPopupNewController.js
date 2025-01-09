define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {

		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {
          defineGetter(this,"isFormActionsVisible",function(){
            return this.view.formActions.isVisible;
          });
          defineSetter(this,"isFormActionsVisible",function(isVisible){
              this.view.formActions.isVisible = isVisible;
          });         
		}
	};
});