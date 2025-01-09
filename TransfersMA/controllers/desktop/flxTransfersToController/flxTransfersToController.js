define({
  navigationToDropdown:function(eventobject, eventPayload, context) {
   var frm = kony.application.getCurrentForm();
        var len = context.widgetInfo.data.length - 1;
        var params = [];
        params.push(eventobject);
        params.push(eventPayload);
        params.push(context);
  if(frm.id=="frmMakePayment"){
                  if (context.rowIndex === context.widgetInfo.data.length - 1){
                if (eventPayload.keyCode === 9 &&  !eventPayload.shiftKey) {
                        this.executeOnParent("closeToSegmentDropDown", params);
                    }
                }
                
            if (eventPayload.keyCode === 27) { 
              this.executeOnParent("closeToSegmentDropDown", params);
          }
        }
}
    //Type your controller code here
});