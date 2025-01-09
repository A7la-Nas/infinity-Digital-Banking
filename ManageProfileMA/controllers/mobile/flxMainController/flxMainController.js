define({
  segName:"noAnimation",
  "onCreateView": function() {
    return "flxMain";
  },
  "onViewCreated": function() {
 	var navManager = applicationManager.getNavigationManager();
    var formName=navManager.getCurrentForm();
    if(formName === "frmProfileEditPhoneNumbers"){
      this.segName="segPhoneNumbers";
    }
    else if(formName === "frmProfileEditEmails"){
      this.segName="segEmails";
    }
    if(this.segName==="noAnimation"){
      return;
    }
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
       var controller;
       if(formName === "frmProfileEditPhoneNumbers"){
       	controller = applicationManager.getPresentationUtility().getController('frmProfileEditPhoneNumbers', true);
       }
      else if (formName === "frmProfileEditEmails"){
        controller = applicationManager.getPresentationUtility().getController('frmProfileEditEmails', true);
      }
	  if (controller)
		controller.setSegmentOnRowClick(context.rowIndex);
     });
  },
  animateLeft : function(context){
    if(context.widgetInfo.data[context.rowIndex].isPrimary !== "true"){
    this.animObj = this.getTransAnimDefinition("-20%");
    kony.application.getCurrentForm()[this.segName].animateRows({
      rows: [{
        sectionIndex:0,
        rowIndex: context.rowIndex
      }],
      widgets: ["flxSwipe"],
      animation : this.swipeObj
    });
    }
  },
  animateRight : function(rowNumber){
    this.animObj = this.getTransAnimDefinition("0%");
    kony.application.getCurrentForm()[this.segName].animateRows({
      rows: [{
        sectionIndex:0,
        rowIndex: rowNumber
      }],
      widgets: ["flxSwipe"],
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