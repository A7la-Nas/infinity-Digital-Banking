define({
    //Type your controller code here
  setFocusToLogout: function(eventobject, eventPayload, context) {
    var frm = kony.application.getCurrentForm();
    if(frm.customheader){
            frm.customheader.segUserActions.rowTemplate="flxSegUserActions"}
            else{
            frm.customheadernew.segUserActions.rowTemplate="flxSegUserActions"}
    if(eventPayload.keyCode === 27){
      if(frm.customheader){
        frm.customheader.onKeyPressCallBack(eventobject,eventPayload);
      }
      if(frm.customheadernew){
        frm.customheadernew.onKeyPressCallBack(eventobject,eventPayload);
      }
    }
    if (eventPayload.keyCode === 9) {
      if(event.shiftKey){
        if(context.rowIndex===context.widgetInfo.data.length-1){
          eventPayload.preventDefault();
          context.widgetInfo.setActive(context.rowIndex-1,context.sectionIndex, "flxSegUserActions.btnUsers");
        }
        if(context.rowIndex===0){
          eventPayload.preventDefault();
          if(frm.customheader){
            eventPayload.preventDefault();
            frm.customheader.showUserActions();
            frm.customheader.headermenu.flxUserId.setActive(true);
          }
          if(frm.customheadernew){
            eventPayload.preventDefault();
            frm.customheadernew.showUserActions();
            frm.customheadernew.flxUser.setActive(true);
          }
        }
      }
      else{
        if(context.rowIndex===context.widgetInfo.data.length-1){
          if (frm.customheader) {
            eventPayload.preventDefault();
            frm.customheader.showUserActions();
            frm.customheader.headermenu.btnLogout.setActive(true);
          }
          if (frm.customheadernew) {
            eventPayload.preventDefault();
            frm.customheadernew.showUserActions();
            frm.customheadernew.btnLogout.setActive(true);
          }
        }
      }
    }
  }
});