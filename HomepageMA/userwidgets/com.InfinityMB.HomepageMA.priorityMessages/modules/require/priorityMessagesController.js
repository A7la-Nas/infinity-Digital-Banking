define(function() {

  return {

    setFlowActions: function(){
      let scopeObj = this;

      scopeObj.view.btnView.onClick = function() {
        scopeObj.navigateToMessages();
      };

      scopeObj.view.btnClose.onClick = function() {
        scopeObj.view.setVisibility(false);
      };

    },

    getLocaleStringValue: function (key){
      return  kony.i18n.getLocalizedString(key) ? kony.i18n.getLocalizedString(key) : "";
    },

    showPriorityMessages: function(count){
      let scopeObj = this;
      // define actions
      scopeObj.setFlowActions();
      // show msg 
      let msg = scopeObj.getLocaleStringValue("kony.PriorityMessaging.PriorityMessageInfo1") + 
          (count === 1 ? "a" : count) + " " + scopeObj.getLocaleStringValue("kony.PriorityMessaging.PriorityMessageInfo2");
      scopeObj.view.lblDescription.text = msg;
    },

    navigateToMessages: function(){
      if (applicationManager.getConfigurationManager().isMicroAppPresent("SecureMessageMA")) {
        var messagesModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"SecureMessageMA","moduleName":"MessagesUIModule"});
        messagesModule.presentationController.getInboxRequests();
        }
    },

  };
});