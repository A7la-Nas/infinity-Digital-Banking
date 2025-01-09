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
        this.view.btnBacktoDashboardonClick = function(){
          scopeObj.navigateToNextForm();
        };
      },
       navigateCustomBack: function () {
       new kony.mvc.Navigation({"appName": "AuthenticationMA","friendlyName": "AuthUIModule/frmSelectingAuthentication"}).navigate();
    },
        navigateToNextForm: function () {
       new kony.mvc.Navigation({"appName": "HomepageMA","friendlyName": "AccountsUIModule/frmUnifiedDashboard"}).navigate();
      },
      };
  });