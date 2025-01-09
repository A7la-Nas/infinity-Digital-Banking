define(function() {
	var orientationHandler = new OrientationHandler();
	return {
	  onBreakpointChangeComponent : function(eventObj,width){
		    if (width === 640 || orientationHandler.isMobile) {
              
                this.view.flxConfirmValue1.reverseLayoutDirection = true;
                this.view.flxConfirmValue2.reverseLayoutDirection = true;
                this.view.flxConfirmValue3.reverseLayoutDirection = true;
                this.view.flxConfirmValue4.reverseLayoutDirection = true;
                this.view.flxConfirmValue5.reverseLayoutDirection = true;
                this.view.flxConfirmValue6.reverseLayoutDirection = true;
                this.view.flxConfirmValue7.reverseLayoutDirection = true;
                this.view.flxConfirmValue8.reverseLayoutDirection = true;
                this.view.flxConfirmValue0.reverseLayoutDirection = true;
                this.view.flxConfirmValue33.reverseLayoutDirection = true;
                this.view.flxConfirmValue44.reverseLayoutDirection = true;
                this.view.flxButtons.layoutType = kony.flex.FLOW_VERTICAL;
                this.view.flxButtons.reverseLayoutDirection = false;
                this.view.flxButtons.bottom = "0dp";
                this.view.btnConfirm.centerX = "50%";
                this.view.btnModify.centerX = "50%";
                this.view.btnCancel.centerX = "50%";
                this.view.btnConfirm.top = "10dp";
                this.view.btnModify.top = "10dp";
                this.view.btnCancel.top = "10dp";
                this.view.btnConfirm.width = "96%";
                this.view.btnModify.width = "96%";
                this.view.btnCancel.width = "96%";
                this.view.flxConfirmValue0.width="57%";
                this.view.flxConfirmValue1.width="57%";
                this.view.flxConfirmValue2.width="57%";
                this.view.flxConfirmValue33.width="57%";
                this.view.flxConfirmValue44.width="57%";
                this.view.flxConfirmValue3.width="57%";
                this.view.flxConfirmValue4.width="57%";
                this.view.flxConfirmValue5.width="57%";
                this.view.flxConfirmValue6.width="57%";
                this.view.flxConfirmValue7.width="57%";
                this.view.flxConfirmValue8.width="57%";
                this.view.left="4.5%";
            	  this.view.width="91%";
              
		  } else if (width === 1024 || width === 768 || orientationHandler.isTablet) {
                
             	  this.view.flxConfirmValue1.reverseLayoutDirection = false;
                this.view.flxConfirmValue2.reverseLayoutDirection = false;
                this.view.flxConfirmValue3.reverseLayoutDirection = false;
                this.view.flxConfirmValue4.reverseLayoutDirection = false;
                this.view.flxConfirmValue5.reverseLayoutDirection = false;
                this.view.flxConfirmValue6.reverseLayoutDirection = false;
                this.view.flxConfirmValue7.reverseLayoutDirection = false;
                this.view.flxConfirmValue8.reverseLayoutDirection = false;
                this.view.flxConfirmValue0.reverseLayoutDirection = false;
                this.view.flxConfirmValue33.reverseLayoutDirection = false;
                this.view.flxConfirmValue44.reverseLayoutDirection = false;
                this.view.flxButtons.layoutType = kony.flex.FLOW_HORIZONTAL;
                this.view.flxButtons.reverseLayoutDirection = true;
                this.view.btnConfirm.right = "20dp";
                this.view.btnModify.right = "20dp";
                this.view.btnCancel.right = "20dp";
                this.view.btnConfirm.centerX = "";
                this.view.btnModify.centerX = "";
                this.view.btnCancel.centerX = "";
              
                this.view.btnConfirm.width = "150dp";
                this.view.btnModify.width = "150dp";
                this.view.btnCancel.width = "150dp";
            } else {
                this.view.flxConfirmValue1.reverseLayoutDirection = false;
                this.view.flxConfirmValue2.reverseLayoutDirection = false;
                this.view.flxConfirmValue3.reverseLayoutDirection = false;
                this.view.flxConfirmValue4.reverseLayoutDirection = false;
                this.view.flxConfirmValue5.reverseLayoutDirection = false;
                this.view.flxConfirmValue6.reverseLayoutDirection = false;
                this.view.flxConfirmValue7.reverseLayoutDirection = false;
                this.view.flxConfirmValue8.reverseLayoutDirection = false;
                this.view.flxConfirmValue0.reverseLayoutDirection = false;
                this.view.flxConfirmValue33.reverseLayoutDirection = false;
                this.view.flxConfirmValue44.reverseLayoutDirection = false;
                this.view.flxButtons.layoutType = kony.flex.FLOW_HORIZONTAL;
                this.view.flxButtons.reverseLayoutDirection = true;
                this.view.btnConfirm.right = "30dp";
                this.view.btnModify.right = "20dp";
                this.view.btnCancel.right = "20dp";
                this.view.btnConfirm.centerX = "";
                this.view.btnModify.centerX = "";
                this.view.btnCancel.centerX = "";
                this.view.btnConfirm.width = "150dp";
                this.view.btnModify.width = "150dp";
                this.view.btnCancel.width = "150dp";
              	this.view.flxConfirmKey1.width = "18%";
              	this.view.flxConfirmKey2.width = "18%";
              	this.view.flxConfirmKey3.width = "18%";
              	this.view.flxConfirmKey4.width = "18%";
              	this.view.flxConfirmKey5.width = "18%";
              	this.view.flxConfirmKey6.width = "18%";
              	this.view.flxConfirmKey7.width = "18%";
                this.view.flxConfirmKey8.width = "18%";
                this.view.flxConfirmKey0.width = "18%";
              	this.view.flxConfirmKey33.width = "18%";
              	this.view.flxConfirmKey44.width = "18%";
       }
		
	  }
	};
  });