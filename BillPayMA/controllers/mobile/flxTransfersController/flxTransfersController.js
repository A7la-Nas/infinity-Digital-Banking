define({
  segName:"noAnimation",
  "onCreateView": function() {
    return "flxTransfers";
  },
  "onViewCreated": function() {
    var previousSection = -1;
    var navManager = applicationManager.getNavigationManager();
    var formName=navManager.getCurrentForm();
    if(formName === "frmTransfers"){
      this.segName="segTransactions";
    }
    if (formName === "frmEuropeManageBeneficiaries") {
      this.segName = "segBeneficiaries";
    }
    if(this.segName==="noAnimation"){
      return;
    }
    var self = this;
    this.view.addGestureRecognizer(constants.GESTURE_TYPE_SWIPE, {
      fingers: 1
    }, function(widgetRef, gestureInfo, context) {
      if(applicationManager.getPresentationUtility().rowIndexforSwipe>=0 && previousSection>=0)
        self.animateRight(applicationManager.getPresentationUtility().rowIndexforSwipe,previousSection);
      applicationManager.getPresentationUtility().rowIndexforSwipe=context.rowIndex;
      previousSection = context.sectionIndex;
      if(gestureInfo.swipeDirection === 1.0){
        self.animateLeft(context.rowIndex,context.sectionIndex);
      }
      else if(gestureInfo.swipeDirection === 2.0){
        self.animateRight(context.rowIndex,context.sectionIndex);
      }
    });
    if (formName === "frmTransfers") {
      this.view.addGestureRecognizer(constants.GESTURE_TYPE_TAP, {
        fingers: 1
      }, function(widgetRef, gestureInfo, context) {
        var controller = applicationManager.getPresentationUtility().getController('frmTransfers', true);
        controller.segTransactionsOnRowClick(context.rowIndex, context.sectionIndex);
      });
    }
  },
  animateLeft : function(rowNumber,sectionNumber){
    var navManager = applicationManager.getNavigationManager();
    var formName=navManager.getCurrentForm();
    if (formName === "frmEuropeManageBeneficiaries") {
      var shiftPixels = "-70dp";
    }
    else {
      var shiftPixels = "-140dp"
    }
    if(sectionNumber === 0){
    this.animObj = this.getTransAnimDefinition(shiftPixels);
    kony.application.getCurrentForm()[this.segName].animateRows({
      rows: [{
        sectionIndex:sectionNumber,
        rowIndex: rowNumber
      }],
      widgets: ["flxMain"],
      animation : this.swipeObj
    });
    }
  },
  animateRight : function(rowNumber,sectionNumber){
    if(sectionNumber === 0){
    this.animObj = this.getTransAnimDefinition("0dp");
    kony.application.getCurrentForm()[this.segName].animateRows({
      rows: [{
        sectionIndex:sectionNumber,
        rowIndex: rowNumber
      }],
      widgets: ["flxMain"],
      animation : this.swipeObj
    });
    }
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