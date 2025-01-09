define({

    navigationFromDropdown: function(eventobject, eventPayload, context) {
        var frm = kony.application.getCurrentForm();
        var params = [];
        params.push(eventobject);
        params.push(eventPayload);
        params.push(context);
        if (frm.id === "frmMakePayment") {
            var len = context.widgetInfo.data.length - 1;
            if (eventPayload.keyCode === 9) {
                if(context.sectionIndex==context.widgetInfo.data.length - 1){
                if (context.rowIndex === context.widgetInfo.data[context.sectionIndex][1].length - 1) {  
                if (eventPayload.keyCode === 9 && !eventPayload.shiftKey) {
                    this.executeOnParent("closeFromSegmentDropDown", params);
                }
            }
            }
        }
             if (eventPayload.keyCode === 27) {
                eventPayload.preventDefault();
             this.executeOnParent("closeFromSegmentDropDown", params);
             }
        }
    }//Type your controller code here 

});