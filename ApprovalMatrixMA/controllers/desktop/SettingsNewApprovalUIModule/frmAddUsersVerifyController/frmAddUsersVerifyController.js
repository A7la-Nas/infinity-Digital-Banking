define(['CommonUtilities', 'FormControllerUtility', 'ViewConstants', 'OLBConstants', 'CampaignUtility'], function(CommonUtilities, FormControllerUtility, ViewConstants, OLBConstants, CampaignUtility) {
    var orientationHandler = new OrientationHandler();

  //Type your controller code here 
  return{
    
    preShow : function(){
      var scope = this;
      this.view.btnModifyRoles.onClick = function() {
        scope.navigateToAddUsers();
      }.bind(this);
      this.view.btnCancelRoles.onClick = function() {
        scope.navigateToAddUsers();
      }.bind(this);
      this.view.btnProceedRoles.onClick = function() {
        scope.navigateToAddUsersAck();
      }.bind(this);
      this.view.FilterSignatoryGroup.flxShowAllUsers.onClick = this.filterShow ;
    },


    filterShow: function() {
      if (this.view.FilterSignatoryGroup.flxFilterGroup.isVisible) {
        this.view.FilterSignatoryGroup.flxFilterGroup.isVisible = false;
      } else {
        this.view.FilterSignatoryGroup.flxFilterGroup.isVisible = true;
      }
    },
    
     navigateToAddUsers : function(){
      applicationManager.getNavigationManager().navigateTo("frmAddUsers");
    },
     navigateToAddUsersAck : function(){
      applicationManager.getNavigationManager().navigateTo("frmViewManageSignatoryGroup");
    },
};
 });