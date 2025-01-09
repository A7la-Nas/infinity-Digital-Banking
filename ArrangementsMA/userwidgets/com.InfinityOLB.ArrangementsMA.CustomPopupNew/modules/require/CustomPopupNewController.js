define(function() {
  return {
          preShow: function() {
            this.view.onBreakpointChange = this.onBreakpointChangeComponent;
            this.view.flxCross.onClick = function(){
                var currForm = kony.application.getCurrentForm();
                currForm.flxPopup.left = "-100%";
            };
            this.view.btnYes.onClick = function(){
                metaObj = {"appName" : "ArrangementsMA", "friendlyName" : "frmAccountsDetails"};
             controller = applicationManager.getPresentationUtility().getController('AccountsUIModule/frmAccountsDetails', true,metaObj);
             controller.validateClosure();
            };
            this.view.btnNo.onClick = function(){
                var currForm = kony.application.getCurrentForm();
                currForm.flxPopup.left = "-100%";
            };
            this.view.lblHeading.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.lblPopupMessage.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1,
                }
            }
            this.view.flxCross.accessibilityConfig = {
                a11yLabel: "close",
                a11yARIA: {
                    tabindex: 0,
                    role: "button"
                }
            }
            this.view.btnNo.accessibilityConfig = {
                a11yARIA: {
                    tabindex: 0,
                    role: "button"
                }
            }
            this.view.btnYes.accessibilityConfig = {
                a11yARIA: {
                    tabindex: 0,
                    role: "button"
                }
            }
            this.view.flxSeperator.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1
                },
                a11yHidden: true
            }
            this.view.flxSeperator2.accessibilityConfig = {
                a11yARIA: {
                    tabindex: -1
                },
                a11yHidden: true
            }
        },
        setLoadingContext: function() {
            this.view.btnYes.isVisible = false;
            this.view.btnNo.isVisible = false;
            this.view.flxSeperator2.isVisible = false;
            this.view.imgLoading.isVisible = true;
            this.view.lblPopupMessage.left = "80dp";
        },
        setContext: function(context) {
            this.view.lblHeading.text = context.Heading;
            this.view.lblPopupMessage.text = context.Message;
            this.view.btnYes.text = context.btn1;
            this.view.btnNo.text = context.btn2;
            this.view.flxSeperator2.isVisible = context.serperator2Visibility;
            if (context.Loading) {
                this.setLoadingContext();
            }
        },
        resetPopup: function() {
            this.view.btnYes.isVisible = true;
            this.view.btnNo.isVisible = true;
            this.view.btnYes.text = "Yes";
            this.view.btnNo.text = "No";
            this.view.imgLoading.isVisible = false;
            this.view.lblPopupMessage.left = "20dp";
            this.view.flxSeperator2.isVisible = false;
        },
        onBreakpointChangeComponent: function(eventObj, breakpoint) {
            this.view.centerX = "50%";
            this.view.centerY = "50%";
            if (breakpoint === 640) {
                this.view.width = "90%";
            } else if (breakpoint === 1024) {
                this.view.width = "75%";
            } else {
                this.view.width = "500px";
            }
        }
  };
});