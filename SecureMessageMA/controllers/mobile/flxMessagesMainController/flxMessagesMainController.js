define({
     //Type your controller code here
    "onCreateView": function() {
        return "flxMessagesMain";
    },
    "onViewCreated": function() {
      var self = this;
       this.view.addGestureRecognizer(constants.GESTURE_TYPE_SWIPE, {
            fingers: 1
        }, function(widgetRef, gestureInfo, context) {
         var messagesMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("MessagesUIModule");
         if(messagesMod.presentationController.messageTabSelected === "INBOX"){
           if(applicationManager.getPresentationUtility().rowIndexforSwipe>=0){
             if(gestureInfo.swipeDirection === 1.0){
               self.animateRight(applicationManager.getPresentationUtility().rowIndexforSwipe);
             }
             else if(gestureInfo.swipeDirection == 2.0){
               self.animateLeft(applicationManager.getPresentationUtility().rowIndexforSwipe);
             }
           }
      applicationManager.getPresentationUtility().rowIndexforSwipe=context.rowIndex;
     if(gestureInfo.swipeDirection === 1.0){
        self.animateLeft(context.rowIndex);
      }
      else if(gestureInfo.swipeDirection == 2.0){
        self.animateRight(context.rowIndex);
      }
     }
    });
     this.view.flxmain.addGestureRecognizer(constants.GESTURE_TYPE_TAP, {
            fingers: 1
        }, function(widgetRef, gestureInfo, context) {
    	var controller = applicationManager.getPresentationUtility().getController('frmMessages', true);
        controller.navToMessageDetails(context.rowIndex);
     });
  },
  animateLeft : function(rowNumber){
    this.animObj = this.getTransAnimDefinition("-50%");
    kony.application.getCurrentForm().segMessagesInbox.animateRows({
      rows: [{
        sectionIndex:0,
        rowIndex: rowNumber
      }],
      widgets: ["flxMessagesMainSwipe"],
      animation : this.swipeObj
    });
  },
  animateRight : function(rowNumber){
    this.animObj = this.getTransAnimDefinition("0%");
    kony.application.getCurrentForm().segMessagesInbox.animateRows({
      rows: [{
        sectionIndex:0,
        rowIndex: rowNumber
      }],
      widgets: ["flxMessagesMainSwipe"],
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