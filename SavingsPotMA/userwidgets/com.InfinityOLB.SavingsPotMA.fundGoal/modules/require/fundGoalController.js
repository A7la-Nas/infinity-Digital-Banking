define(function() {
  var orientationHandler = new OrientationHandler();
  return {
    onBreakpointChangeComponent : function(eventObj,width){
      if (width === 640 || orientationHandler.isMobile) {
        this.view.flxValue1.reverseLayoutDirection = true;
        this.view.flxValue2.reverseLayoutDirection = true;
        this.view.flxValue3.reverseLayoutDirection = true;
        this.view.flxValue4.reverseLayoutDirection = true;
        this.view.flxButtons.layoutType = kony.flex.FLOW_VERTICAL;
        this.view.flxButtons.reverseLayoutDirection = false;
        this.view.flxButtons.bottom = "25dp";
        this.view.btnContinue.centerX = "50%";
        this.view.btnCancel.centerX = "50%";
        this.view.btnContinue.top = "10dp";
        this.view.btnCancel.top = "10dp";
        this.view.btnContinue.width = "96%";
        this.view.btnCancel.width = "96%";
		this.view.flxAmountValue.width="96%";
        this.view.flxSeparator.width="100%";
        this.view.flxSeparator1.width="100%";
        this.view.lblError.width="95%";
        this.view.flxKey1.width="15%";
		this.view.flxKey2.width="15%";
		this.view.flxKey3.width="40%";
		this.view.flxKey4.width="40%";
        this.view.flxValue1.width="82%";
        this.view.flxValue2.width="82%";
        this.view.flxValue3.width="57%";
        this.view.flxValue4.width="57%";
        this.view.left="4.5%";
        this.view.top="20dp";
        this.view.width="91%";
	    } else if (width === 1024 || width === 768 || orientationHandler.isTablet) {
        this.view.flxValue1.reverseLayoutDirection = false;
        this.view.flxValue2.reverseLayoutDirection = false;
        this.view.flxValue3.reverseLayoutDirection = false;
        this.view.flxValue4.reverseLayoutDirection = false;
        this.view.flxButtons.layoutType = kony.flex.FLOW_HORIZONTAL;
        this.view.flxButtons.reverseLayoutDirection = true;
        this.view.btnContinue.right = "20dp";
        this.view.btnCancel.right = "20dp";
        this.view.btnContinue.centerX = "";
        this.view.btnCancel.centerX = "";
        this.view.btnContinue.width = "150dp";
        this.view.btnCancel.width = "150dp";
        this.view.flxAmountValue.width="50%";
        this.view.flxSeparator.width="100%";
        this.view.flxSeparator1.width="95.5%";
        this.view.flxKey1.width="20%";
		this.view.flxKey2.width="20%";
		this.view.flxKey3.width="20%";
		this.view.flxKey4.width="20%";
        } else {
        this.view.flxValue1.reverseLayoutDirection = false;
        this.view.flxValue2.reverseLayoutDirection = false;
        this.view.flxValue3.reverseLayoutDirection = false;
        this.view.flxValue4.reverseLayoutDirection = false;
        this.view.flxButtons.layoutType = kony.flex.FLOW_HORIZONTAL;
        this.view.flxButtons.reverseLayoutDirection = true;
        this.view.btnContinue.right = "30dp";
        this.view.btnCancel.right = "20dp";
        this.view.btnContinue.centerX = "";
        this.view.btnCancel.centerX = "";
        this.view.btnContinue.width = "150dp";
        this.view.btnCancel.width = "150dp";
        this.view.flxAmountValue.width="50%";
        this.view.flxSeparator.width="95.5%";
        this.view.flxSeparator1.width="95.5%";
        this.view.flxKey1.width="15%";
		this.view.flxKey2.width="15%";
		this.view.flxKey3.width="15%";
		this.view.flxKey4.width="15%";
        }
    },
    setSkinForAmount: function(skinName){
      this.view.flxAmountValue.skin = skinName;
    }
  };
});