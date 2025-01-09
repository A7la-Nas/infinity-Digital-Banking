define({ 

  //Type your controller code here 
  "onViewCreated": function() {
    try{
      kony.print("view created");
      var self = this;

      //this.view.flxRejectAP.onClick = this.btnRejectOnClick;
      //this.view.flxApproveAP.onClick = this.btnApproveOnClick;
      this.view.addGestureRecognizer(constants.GESTURE_TYPE_SWIPE, {
        fingers: 1
      }, function(widgetRef, gestureInfo, context) {

        if (applicationManager.getPresentationUtility().rowIndexforSwipe >= 0) {
          if(kony.i18n.getCurrentLocale() === "ar_AE"){
          self.animateLeft(applicationManager.getPresentationUtility().rowIndexforSwipe,applicationManager.getPresentationUtility().sectionIndexforSwipe);
          }
          else{
          self.animateRight(applicationManager.getPresentationUtility().rowIndexforSwipe,applicationManager.getPresentationUtility().sectionIndexforSwipe);  
          }
        }
        applicationManager.getPresentationUtility().rowIndexforSwipe = context.rowIndex;
        applicationManager.getPresentationUtility().sectionIndexforSwipe = context.sectionIndex;

        if(gestureInfo.swipeDirection === 1.0){
          self.animateLeft(context.rowIndex,context.sectionIndex);
        }
        else if(gestureInfo.swipeDirection === 2.0){
          self.animateRight(context.rowIndex, context.sectionIndex);
        }
      });
      this.view.flxContents.addGestureRecognizer(constants.GESTURE_TYPE_TAP, {
            fingers: 1
        }, function(widgetRef, gestureInfo, context) {
            if(applicationManager.getPresentationUtility().tapgestureEnabled){
                var controller = applicationManager.getPresentationUtility().getController('frmApprovalsList', true);
                controller.segListApprovalsonRowClick(context.rowIndex);
            }
        });
    }catch(e){kony.print("Exception in onViewCreated"+e);}
  },

  animateLeft : function(rowNumber,sectionNumber){
    try{
      kony.print("anim left");
      this.animObj = (kony.i18n.getCurrentLocale() === "ar_AE") ? this.getTransAnimDefinition("0%") : this.getTransAnimDefinition("-70dp");
      this.view = kony.application.getCurrentForm();
      this.animObj = (kony.i18n.getCurrentLocale() === "ar_AE") ? this.getTransAnimDefinition("0%") : this.getTransAnimDefinition("-140dp");
      //kony.application.getCurrentForm()[this.segName]
      kony.application.getCurrentForm().segApprovalList.animateRows({
        rows: [{
          sectionIndex:sectionNumber,
          rowIndex: rowNumber
        }],
        widgets: ["flxContentsAP"],
        animation : this.swipeObj
      });
    }catch(e){kony.print("Exception in animateLeft"+e);}

  },

  animateRight : function(rowNumber,sectionNumber){
    try{
      kony.print("anim right");
      this.animObj = (kony.i18n.getCurrentLocale() === "ar_AE") ? this.getTransAnimDefinition("-70dp") : this.getTransAnimDefinition("0%");
      this.view = kony.application.getCurrentForm();
      this.animObj = (kony.i18n.getCurrentLocale() === "ar_AE") ? this.getTransAnimDefinition("-140dp") : this.getTransAnimDefinition("0%");
      kony.application.getCurrentForm().segApprovalList.animateRows({
        rows: [{
          sectionIndex:sectionNumber,
          rowIndex: rowNumber
        }],
        widgets: ["flxContentsAP"],
        animation : this.swipeObj
      });
    }catch(e){kony.print("Exception in animateRight"+e);}
  },


  getTransAnimDefinition : function(leftVal) {
    this.locale = kony.i18n.getCurrentLocale();
    if(this.locale=="ar_AE"){
      transAnimDef1 = {
        "100": {
          "right": leftVal,
          "stepConfig": {
            "timingFunction": kony.anim.LINEAR
          },
          "rectified": true
        }
      }
    }
      else{
        transAnimDef1 = {
          "100": {
            "left": leftVal,
            "stepConfig": {
              "timingFunction": kony.anim.LINEAR
            },
            "rectified": true
      }
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
  },

  btnApproveOnClick : function(eventobject,context){
    try{
      kony.print("Entered in btnApproveOnClick"+context);
      var secIndex = context["sectionIndex"];
      var rowIndex = context["rowIndex"];

      this.executeOnParent("rejectBtnOnClick",{section:secIndex,row:rowIndex});
    }catch(e){kony.print("Exception in btnApproveOnClick"+e);}
  },

  btnRejectOnClick : function(eventobject,context){
    try{
      kony.print("Entered in btnRejectOnClick"+context);
      var secIndex = context["sectionIndex"];
      var rowIndex = context["rowIndex"];

      this.executeOnParent("rejectBtnOnClick",{section:secIndex,row:rowIndex});

    }catch(e){kony.print("Exception in btnRejectOnClick"+e);}
  },
  
	btnCheckBoxOnClick : function(eventobject,context){
    try{
      kony.print("Entered in btnCheckBoxOnClick"+context);
      var secIndex = context["sectionIndex"];
      var rowIndex = context["rowIndex"];

      this.executeOnParent("checkBoxOnClick",{section:secIndex,row:rowIndex});

    }catch(e){kony.print("Exception in btnCheckBoxOnClick"+e);}
  },

});