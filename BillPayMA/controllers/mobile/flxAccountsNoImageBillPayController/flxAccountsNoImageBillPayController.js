define({
  segName:"noAnimation",
  "onCreateView": function() {
    return "flxAccountsNoImageBillPay";
  },
  "onViewCreated": function() {
    var previousSection = -1;
    var navManager = applicationManager.getNavigationManager();
    var formName=navManager.getCurrentForm();
    if(formName === "frmBillPay"){
      this.segName="segTransactions";
    }
    else if(formName === "frmBillPayAllPayees"){
      this.segName="noAnimation";
    }
    if(this.segName==="noAnimation"){
      return;
    }
    var self = this;
    this.view.addGestureRecognizer(constants.GESTURE_TYPE_SWIPE, {
      fingers: 1
    }, function(widgetRef, gestureInfo, context) {
      if(applicationManager.getPresentationUtility().rowIndexforSwipe>=0 && previousSection>=0){
        self.animateRight(applicationManager.getPresentationUtility().rowIndexforSwipe,previousSection);
      }
      applicationManager.getPresentationUtility().rowIndexforSwipe=context.rowIndex;
      previousSection = context.sectionIndex;
         if(gestureInfo.swipeDirection === 1.0){
        self.animateLeft(context.rowIndex,context.sectionIndex);
      }
      else if(gestureInfo.swipeDirection === 2.0){
        self.animateRight(context.rowIndex,context.sectionIndex);
      }
    });
  },
  animateLeft : function(rowNumber,sectionNumber){
    this.animObj = this.getTransAnimDefinition("-141dp");
    kony.application.getCurrentForm()[this.segName].animateRows({
      rows: [{
        sectionIndex:sectionNumber,
        rowIndex: rowNumber
      }],
      widgets: ["flxMain"],
      animation : this.swipeObj
    });
  },
  animateRight : function(rowNumber,sectionNumber){
    this.animObj = this.getTransAnimDefinition("0%");
    kony.application.getCurrentForm()[this.segName].animateRows({
      rows: [{
        sectionIndex:sectionNumber,
        rowIndex: rowNumber
      }],
      widgets: ["flxMain"],
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