define({
 //Type your controller code here
accountsFocus: function(eventobject, eventPayload, context) {
    var form = kony.application.getCurrentForm();
    if(form.id === "frmAddPayee1" && context.widgetInfo.id === "segField1Values"){
        if(eventPayload.keyCode === 9){
            var length=context.widgetInfo.data.length-1;
            if(eventPayload.shiftKey){
                if(context.rowIndex===0){
                eventPayload.preventDefault();
                form.addPayee.SetTbxActive();
                }
            }
           else if(context.rowIndex===context.widgetInfo.data.length-1){
                  eventPayload.preventDefault();
                  form.addPayee.SetTbx2Active();
                }
        }
        if(eventPayload.keyCode === 27){
           form.addPayee.SetTbx2Active();
            eventPayload.preventDefault();
        }
    }}
 });