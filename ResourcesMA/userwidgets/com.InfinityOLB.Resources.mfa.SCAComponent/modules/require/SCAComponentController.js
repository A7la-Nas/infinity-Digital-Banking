define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._flowType = "";
      this._servicekey = "";
    },

    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineSetter(this, "flowType", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._flowType=val;
        }
      });
      defineGetter(this, "flowType", function() {
        return this._flowType;
      });
      defineSetter(this, "servicekey", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._servicekey=val;
        }
      });
      defineGetter(this, "servicekey", function() {
        return this._servicekey;
      });
    },

    preShow: function(){
      this.view.lblMsg.text = "This component is a dummy component which can be replaced by SCA component.";
      this.setFlowActions();
    },

    setFlowActions: function(){
      let scopeObj = this;
      this.view.btnView.onClick = function() {
        scopeObj.view.lblMsg.text = "Service Key - " + scopeObj.serviceKey + "\nFlow Type - " + scopeObj.flowType;
      };
      this.view.btnCancel.onClick = function(){
        if(scopeObj.onCancel)
          scopeObj.onCancel();
      };
    },
      
    setContext: function(data){
      kony.print(data);
    },

	};
});