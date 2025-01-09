define({
  onCreateView: function() {
    return "flxAddress";
  },
  onViewCreated: function() {
    var self = this;
    this.view.addGestureRecognizer(constants.GESTURE_TYPE_SWIPE, {
      fingers: 1
    }, function(widgetRef, gestureInfo, context) {
      if(applicationManager.getPresentationUtility().rowIndexforSwipe>=0)
      self.animateRight(applicationManager.getPresentationUtility().rowIndexforSwipe);
      applicationManager.getPresentationUtility().rowIndexforSwipe=context.rowIndex;
      if(gestureInfo.swipeDirection === 1.0){
        self.animateLeft(context);
      }
      else if(gestureInfo.swipeDirection === 2.0){
        self.animateRight(context.rowIndex);
      }
    });
     this.view.flxDetails.addGestureRecognizer(constants.GESTURE_TYPE_TAP, {
      fingers: 1
    }, function(widgetRef, gestureInfo, context) {
       var controller = applicationManager.getPresentationUtility().getController('frmProfileEditAddressList', true);
       controller.setSegmentOnRowClick(context.rowIndex);
     });
  },
  animateLeft : function(context){
    if(context.widgetInfo.data[context.rowIndex].isPrimary !== "true"){
    this.animObj = this.getTransAnimDefinition("-50dp");
    kony.application.getCurrentForm().segAddress.animateRows({
      rows: [{
        sectionIndex:0,
        rowIndex: context.rowIndex
      }],
      widgets: ["flxDetails"],
      animation : this.swipeObj
    });
    }
  },
  animateRight : function(rowNumber){
    this.animObj = this.getTransAnimDefinition("0%");
    kony.application.getCurrentForm().segAddress.animateRows({
      rows: [{
        sectionIndex:0,
        rowIndex: rowNumber
      }],
      widgets: ["flxDetails"],
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
    }
  }
});