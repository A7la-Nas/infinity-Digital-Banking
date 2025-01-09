define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._flowType = "";
      this._servicekey = "";
      this.scaJSON = {};
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
      this.setFlowActions();
    },

    setFlowActions: function(){
      let scopeObj = this;
      scopeObj.view.btnContinue.onClick = function(){
        kony.application.showLoadingScreen(null,"", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
        scopeObj.completeActivity();
      };

      scopeObj.view.btnClose.onClick = function(){
        if(scopeObj.onCancel)
        scopeObj.onCancel();
      };
    },

    setContext: function(mfaJSON){
      let scopeObj = this;
      scopeObj.servicekey = mfaJSON.response.MFAAttributes.serviceKey;
      scopeObj.scaJSON = mfaJSON;
      kony.application.dismissLoadingScreen();
    },

    completeActivity: function(){
      let scopeObj = this;
      let params = {
        "MFAAttributes" : {
          "serviceKey" : this.servicekey
        }
      };
      function completionCallback(status, data, error) {
        if(status == kony.mvc.constants.STATUS_SUCCESS){
          scopeObj.completeActivitySuccessCallback(data);
        } else {
          scopeObj.completeActivityFailureCallback(error);
        }
      }
      var repoObj = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository(scopeObj.scaJSON.objectServiceDetails.dataModel);
      repoObj.customVerb(scopeObj.scaJSON.objectServiceDetails.operationName, params, completionCallback);
    },

    completeActivitySuccessCallback: function(response){
      let scopeObj = this;
      if(scopeObj.onSuccessCallback)
        scopeObj.onSuccessCallback(response);
    },

    completeActivityFailureCallback: function(error){
      let scopeObj = this;
      if(scopeObj.onFailureCallback)
        scopeObj.onFailureCallback(error);
    },

  };
});