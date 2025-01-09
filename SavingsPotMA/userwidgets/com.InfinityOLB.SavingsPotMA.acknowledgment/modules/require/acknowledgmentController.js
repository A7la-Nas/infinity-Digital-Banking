define(function() {
  var orientationHandler = new OrientationHandler();
  return {
    onBreakpointChangeComponent : function(eventObj,width){
      if(width === 640 || orientationHandler.isMobile){
        this.view.flxContent.layoutType = kony.flex.FLOW_VERTICAL;
        this.view.flxContent.reverseLayoutDirection = false;
        this.view.flxButtons.layoutType = kony.flex.FLOW_VERTICAL;
        this.view.flxButtons.reverseLayoutDirection = false;
        this.view.flxButtons.bottom = "20dp";
        this.view.btnAction2.centerX = "50%";
        this.view.btnAction1.centerX = "50%";
        this.view.btnAction2.top = "10dp";
        this.view.btnAction1.top = "20dp";
        this.view.btnAction2.width = "94%";
        this.view.btnAction1.width = "94%";
        this.view.flxSuccess.width = "94%";
        this.view.flxSuccess.left = "3%";
        this.view.flxConfirmDetails.width = "94%";
        this.view.flxConfirmDetails.left = "3%";
        this.view.flxConfirmDetails.top = "20dp";
        this.view.flxAcknowledgementHeader.left = "3%"
        this.view.flxAcknowledgementHeader.width = "94%"
        this.view.flxDetailsHeader.left = "3%";
        this.view.flxDetailsHeader.width = "94%";
        this.view.flxAvailableBalance.layoutType = kony.flex.FLOW_VERTICAL;
        this.view.flxAvailableBalance.height = "120dp";
        this.view.flxAvailableBalance.top = "50dp";
        this.view.lblAvailableBalance.width = "100%";
       	this.view.lblAvailableBalance.left="6%";
         this.view.flxSavings.top = "1dp";
       this.view.flxSavings.left="6%";
        this.view.lblSavingsAccount.top = "3dp";
        this.view.lblSavingsAccount.width = "100%";
        this.view.lblBalanceValue.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
        this.view.lblBalanceValue.top = "25dp";
        this.view.lblBalanceValue.left = "6%";
         this.view.lblBalanceValue.centerY = "";
        this.view.lblBalanceValue.width="50%";
        this.view.lblAckDetailKey1.left = "4%";
        this.view.lblAckDetailKey2.left = "4%";
        this.view.lblAckDetailKey3.left = "4%";
        this.view.lblAckDetailKey4.left = "4%";
        this.view.lblAckDetailKey5.left = "4%";
        this.view.lblAckDetailKey6.left = "4%";
        this.view.lblAckDetailKey7.left = "4%";
        this.view.lblAckDetailKey8.left = "4%";
        this.view.lblAckDetailKey9.left = "4%";
        this.view.lblAckDetailValue1.left = "";
        this.view.lblAckDetailValue2.left = "";
        this.view.lblAckDetailValue3.left = "";
        this.view.lblAckDetailValue4.left = "";
        this.view.lblAckDetailValue5.left = "";
        this.view.lblAckDetailValue6.left = "";
        this.view.lblAckDetailValue7.left = "";
        this.view.lblAckDetailValue8.left = "";
        this.view.lblAckDetailValue9.left = "";
        this.view.lblAckDetailValue1.right = "4%";
        this.view.lblAckDetailValue2.right = "4%";
        this.view.lblAckDetailValue3.right = "4%";
        this.view.lblAckDetailValue4.right = "4%";
        this.view.lblAckDetailValue5.right = "4%";
        this.view.lblAckDetailValue6.right = "4%";
        this.view.lblAckDetailValue7.right = "4%";
        this.view.lblAckDetailValue8.right = "4%";
        this.view.lblAckDetailValue9.right = "4%";
        this.view.flxSuccess.minHeight = "330dp";
        this.view.flxConfirmDetails.minHeight = "330dp";
        this.view.lblAckDetailValue33.left = "";
        this.view.lblAckDetailValue33.right = "4%";
        this.view.lblAckDetailKey33.left = "4%";
        this.view.lblAckDetailValue44.left = "";
        this.view.lblAckDetailValue44.right = "4%";
        this.view.lblAckDetailKey44.left = "4%";
      }
      else if (width === 1024 || width === 768 || orientationHandler.isTablet){
        this.view.flxButtons.layoutType = kony.flex.FLOW_HORIZONTAL;
        this.view.flxButtons.reverseLayoutDirection = true;
        this.view.flxContent.layoutType = kony.flex.FLOW_VERTICAL;
        this.view.flxContent.reverseLayoutDirection = false;
        this.view.btnAction1.right = "20dp";
        this.view.btnAction2.right = "1dp";
        this.view.btnAction1.centerX = "";
        this.view.btnAction2.centerX = "";
        this.view.btnAction1.width = "250px";
        this.view.btnAction2.width = "250px";
        this.view.flxSuccess.width = "100%";
        this.view.flxConfirmDetails.width = "100%";
        this.view.flxConfirmDetails.left = "";
        this.view.flxConfirmDetails.top = "20dp";
        this.view.flxAcknowledgementHeader.left = "2.5%"
        this.view.flxAcknowledgementHeader.width = "95%"
        this.view.flxDetailsHeader.left = "2.5%";
        this.view.flxDetailsHeader.width = "95%";
        this.view.flxSuccess.minHeight = "330dp";
        this.view.flxConfirmDetails.minHeight = "330dp";
         this.view.flxAvailableBalance.top="67dp";
        this.view.lblAvailableBalance.left="2.5%";
        this.view.flxSavings.left="2.5%";
        this.view.lblBalanceValue.left="59%";
      }
      else{
        this.view.flxButtons.layoutType = kony.flex.FLOW_HORIZONTAL;
        this.view.flxButtons.reverseLayoutDirection = true;
        this.view.flxContent.layoutType = kony.flex.FLOW_HORIZONTAL;
        this.view.flxContent.reverseLayoutDirection = false;
        this.view.btnAction1.right = "20dp";
        this.view.btnAction2.right = "0dp";
        this.view.btnAction1.centerX = "";
        this.view.btnAction2.centerX = "";
        this.view.btnAction1.width = "250px";
        this.view.btnAction2.width = "250px";
        this.view.flxConfirmDetails.left = "20dp";
        this.view.flxSuccess.minHeight = "440dp";
        this.view.flxConfirmDetails.minHeight = "440dp";
        this.view.flxAvailableBalance.top="75dp";
         this.view.lblAvailableBalance.left="3.5%";
        this.view.flxSavings.left="3.5%";
        this.view.lblBalanceValue.left="57%";
        if(width===1366){
          this.view.flxSuccess.width = "49.25%";
          this.view.flxConfirmDetails.width = "49.25%";
        }
      }

    }
  };
});