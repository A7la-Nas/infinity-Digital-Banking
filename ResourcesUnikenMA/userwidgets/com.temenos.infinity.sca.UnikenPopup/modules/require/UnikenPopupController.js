define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
		this._breakpoints = "";
      	this._headingtext  ="";
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {
            defineSetter(this, 'breakpoints', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._breakpoints = val;
                }
            });
            defineGetter(this, 'breakpoints', function () {
                return this._breakpoints;
            });
            defineSetter(this, 'headingtext', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._headingtext = val;
                }
            });
            defineGetter(this, 'headingtext', function () {
                return this._headingtext;
            });
        },
      preShow : function(){
      this.assignDefaultText();
      var currform = kony.application.getCurrentForm();
        if(currform==="frmMFATransactions")
          {
             this.view.ldlPopupText.text=kony.i18n.getLocalizedString("kony.mb.sca.MsgApproveTransaction");
          }
    },
    
    assignDefaultText: function(){
      this.view.ldlPopupText.text= this._headingtext;
    },
	};
});