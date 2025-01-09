define({ 

 //Type your controller code here 
    "onCreateView": function() {
        return "flxAlertsList";
    },
    "onViewCreated": function() {
        var self = this;
        this.view.addGestureRecognizer(constants.GESTURE_TYPE_SWIPE, {
                fingers: 1
            }, function(widgetRef, gestureInfo, context) {
            if(applicationManager.getPresentationUtility().tapgestureEnabled){
                if(applicationManager.getPresentationUtility().rowIndexforSwipe>=0){
                    self.animateRight(applicationManager.getPresentationUtility().rowIndexforSwipe,"flxMain","0%");
                }
                applicationManager.getPresentationUtility().rowIndexforSwipe=context.rowIndex;
                if (kony.i18n.getCurrentLocale() === 'ar_AE') {
                  if (gestureInfo.swipeDirection === 2.0) {
                    self.animateLeft(context.rowIndex, "flxMain", "-21%");
                  }
                  else if (gestureInfo.swipeDirection === 1.0) {
                    self.animateRight(context.rowIndex, "flxMain", "0%");
                  }
                }
                else {
                  if (gestureInfo.swipeDirection === 1.0) {
                    self.animateLeft(context.rowIndex, "flxMain", "-21%");
                  }
                  else if (gestureInfo.swipeDirection === 2.0) {
                    self.animateRight(context.rowIndex, "flxMain", "0%");
                  }
                }				
            }
        });
      	var deviceUtilManager = applicationManager.getDeviceUtilManager();
        var isIphone = deviceUtilManager.isIPhone();
        //added tap gesture to segments flex so that scroll works in android
      	if(isIphone){
        this.view.flxMain.addGestureRecognizer(constants.GESTURE_TYPE_TAP, {
            fingers: 1
        }, function(widgetRef, gestureInfo, context) {
            if(applicationManager.getPresentationUtility().tapgestureEnabled){
                var controller = applicationManager.getPresentationUtility().getController('frmAlertsLanding', true);
                controller.onSegmentRowClick(context.rowIndex);
            }
        });
        }
        else{
          this.view.addGestureRecognizer(constants.GESTURE_TYPE_TAP, {
            fingers: 1
        }, function(widgetRef, gestureInfo, context) {
            if(applicationManager.getPresentationUtility().tapgestureEnabled){
                var controller = applicationManager.getPresentationUtility().getController('frmAlertsLanding', true);
                controller.onSegmentRowClick(context.rowIndex);
            }
        });
        }
    },
    animateLeft : function(rowNumber,widget,leftVal){
        this.animObj = this.getTransAnimDefinition(leftVal);
        kony.application.getCurrentForm().segAlertsScreen.animateRows({
        rows: [{
            sectionIndex:0,
            rowIndex: rowNumber
        }],
        widgets: [widget],
        animation : this.swipeObj
        });
    },
    animateRight : function(rowNumber,widget,leftVal){
        this.animObj = this.getTransAnimDefinition(leftVal);
        kony.application.getCurrentForm().segAlertsScreen.animateRows({
        rows: [{
            sectionIndex:0,
            rowIndex: rowNumber
        }],
        widgets: [widget],
        animation : this.swipeObj
        });
    },
    getTransAnimDefinition : function(leftVal) {
        var transAnimDef1 = {
        "100": {
            "left": leftVal,
            "stepConfig": {
            "timingFunction": kony.anim.LINEAR
            },
            "rectified": true
        }
        };
        var animConf = {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 0.5
        };
        this.swipeObj = {
        definition: kony.ui.createAnimation(transAnimDef1),
        config :animConf,
        callbacks:null
        };
    }
 });