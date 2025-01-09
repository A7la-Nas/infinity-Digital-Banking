define(function() {

  return {

    closePopup : function(){
      var scopeObj = this;	
      scopeObj.view.setVisibility(false);
    },
    
    onClickofCampaign : function(url){
      var scopeObj = this;
      let actionType = scopeObj.getQueryString("actionType",url);
      let moduleName = scopeObj.getQueryString("moduleName",url);
      if(actionType === "internal" && moduleName){
        applicationManager.getNavigationManager().navigateTo(moduleName);
      } else {
        kony.application.openURL(url);
      }
    },

    getQueryString: function(field, url) {
      var href = url;
      var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
      var string = reg.exec(href);
      return string ? string[1] : null;
    },

  };
});