define({
    navigationDropdownPayments: function(eventobject, eventPayload, context) {
        var frm = kony.application.getCurrentForm();
        var len = context.widgetInfo.data.length - 1;
        var params = [];
        params.push(eventobject);
        params.push(eventPayload);
        params.push(context);
        if (eventPayload.keyCode === 9) {
            if (eventPayload.shiftKey) {
               if (context.rowIndex === 0){
                    this.executeOnParent("closeSegmentDropDown",params);
                }
              else if (context.rowIndex === len){
                context.widgetInfo.setActive(context.rowIndex, context.sectionIndex,"flxFilterList.btnFilterValue");
              }
        }
        }
        if (eventPayload.keyCode === 27) {
            this.executeOnParent("closeSegmentDropDown",params);
        }
        if (eventPayload.keyCode === 9 && !eventPayload.shiftKey) {
            if (context.rowIndex === len) {
                this.executeOnParent("closeSegmentDropDown",params);
            }
        }
    },
});