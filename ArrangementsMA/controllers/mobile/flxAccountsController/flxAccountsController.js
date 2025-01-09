define({
  segName:"noAnimation",
  "onCreateView": function() {
    return "flxAccounts";
  },
  "onViewCreated": function() {
    var formName=kony.application.getCurrentForm().id;
    var navManager = applicationManager.getNavigationManager();
    var previousSection = -1;
   // var formName=navManager.getCurrentForm();
    if(formName === "frmManageRecipientList"){
      this.segName="segRecipients";
    }
    else if(formName === "frmDashboardAggregated")
      this.segName="segAccounts";
    if(this.segName==="noAnimation"){
      return;
    }
    var self = this;
    this.view.addGestureRecognizer(constants.GESTURE_TYPE_SWIPE, {
      fingers: 1
    }, function(widgetRef, gestureInfo, context) {
       if (applicationManager.getPresentationUtility().rowIndexforSwipe >= 0 && previousSection>=0)
        self.animateRight(applicationManager.getPresentationUtility().rowIndexforSwipe, previousSection);
      applicationManager.getPresentationUtility().rowIndexforSwipe=context.rowIndex;
      previousSection = context.sectionIndex;
      if(gestureInfo.swipeDirection === 1.0){
        self.animateLeft(context.rowIndex,context.sectionIndex);
      }
      else if(gestureInfo.swipeDirection === 2.0){
        self.animateRight(context.rowIndex, context.sectionIndex);
      }
    });
  },
  animateLeft : function(rowNumber,sectionNumber){
    this.animObj = this.getTransAnimDefinition("-70dp");
    var navManager = applicationManager.getNavigationManager();
    var formName=kony.application.getCurrentForm().id;
    this.view = kony.application.getCurrentForm();
    if(formName === "frmDashboardAggregated"&&this.view.segAccounts.data[sectionNumber][1][rowNumber].type!=="internal")
      this.animObj = this.getTransAnimDefinition("-140dp");
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