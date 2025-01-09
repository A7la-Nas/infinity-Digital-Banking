define([], function (){ 
    return{
      //these functions are for reference only
      preshow : function(){
       this.setFlowActions(); 
      },
           setFlowActions: function(){
        const scopeObj = this;
        this.view.customHeader.flxBack.onTouchEnd = function(){
          scopeObj.navigateCustomBack();
        };
        this.view.btnUpdateonClick = function(){
          scopeObj.navigateToNextForm();
        };
         this.view.btnCancelonClick = function(){
           scopeObj.navigateToPreviousForm();
        };
      },
        navigateCustomBack: function () {
       new kony.mvc.Navigation({"appName": "AuthenticationMA","friendlyName": "AuthUIModule/frmSelectingAuthentication"}).navigate();
    },
        navigateToNextForm: function () {
       new kony.mvc.Navigation({"appName": "AuthenticationMA","friendlyName": "AuthUIModule/frmSelectingAuthentication"}).navigate();
      },
      navigateToPreviousForm: function () {
     new kony.mvc.Navigation({"appName": "AuthenticationMA","friendlyName": "AuthUIModule/frmSelectEntity"}).navigate();
      }
    };
  });