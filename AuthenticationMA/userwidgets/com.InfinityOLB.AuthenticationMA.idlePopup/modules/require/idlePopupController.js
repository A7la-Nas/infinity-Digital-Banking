define(function() {
  var orientationHandler = new OrientationHandler();
  return {
    onBreakpointChangeComponent : function(eventObj,width){
      if(width === 640 || orientationHandler.isMobile){
        this.view.flxCross.right ="11dp";
        this.view.btnYes.right = "20dp";
        this.view.btnYes.width = "120dp";
        this.view.btnNo.right = "160dp";
        this.view.btnNo.width = "120dp";
        this.view.btnNo.left = "";
        this.view.width = "";
        this.view.right = "10dp";
        this.view.left = "10dp";
        this.view.centerX = "50%";
      }
      else if (width === 1024 || width === 768 || orientationHandler.isTablet){
        this.view.flxCross.right ="11dp";
        this.view.btnYes.right = "20dp";
        this.view.btnYes.width = "150dp";
        this.view.btnNo.right = "190dp";
        this.view.btnNo.width = "150dp";
        this.view.btnNo.left = "";
        this.view.width = "75%";
        this.view.right = "";
        this.view.left = "";
        this.view.centerX = "50%";
      }
      else{
        this.view.flxCross.right ="11dp";
        this.view.btnYes.right = "20dp";
        this.view.btnYes.width = "150dp";
        this.view.btnNo.right = "190dp";
        this.view.btnNo.width = "150dp";
        this.view.btnNo.left = "";
        this.view.width = "44.3%";
        this.view.right = "";
        this.view.left = "";
        this.view.centerX = "50%";
      }
      
    }
  };
});