define({ 

  onViewCreated:function(eObj){
    try{	
      this.view.addGestureRecognizer(constants.GESTURE_TYPE_SWIPE,{fingers: 1},this.swipeGestureHandler);
    }catch(exc){
     kony.print("Swipe Exception"+JSON.stringify(exc));
    }
  },
  
  swipeGestureHandler:function(widgetInfo,gestureInfo,context){
    var mswipeDirection = gestureInfo.swipeDirection;
    var secIndex = context["sectionIndex"];
    var rowIndex = context["rowIndex"];
    var myInfo = {
      section : secIndex,
      row : rowIndex,
      swipeDirection : mswipeDirection
    };	
    this.executeOnParent("swipeRowOption",myInfo);
  }

});