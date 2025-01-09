define(function() {

  return {

    adjustHeight : function(mainFlexId){
      var scopeObj = this;
      let headerHeight =  scopeObj.view.parent.flxHeader ? scopeObj.view.parent.flxHeader.info.frame.height : 0;
      let footerHeight =  scopeObj.view.parent.flxFooter ? scopeObj.view.parent.flxFooter.info.frame.height : 0;
      let mainheight = scopeObj.view.parent[mainFlexId] ? scopeObj.view.parent[mainFlexId].info.frame.height : 0;
      scopeObj.view.height = (headerHeight + mainheight + footerHeight)  + "dp";
    },

    closepopup : function(){
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
        kony.application.openURL(url) ;
      }
      scopeObj.closepopup();
    },

    getQueryString: function(field, url) {
      var href = url;
      var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
      var string = reg.exec(href);
      return string ? string[1] : null;
    },

  };
});