define({

    //Type your controller code here 
    selectOrUnselectEntireFeature: function(eventobject, context) {
        this.executeOnParent("selectOrUnselectEntireFeature", {
            "context": context,
            "eventobject": eventobject
        });
    },
    selectOrUnselectParentFeature: function(eventobject, context) {
        this.executeOnParent("selectOrUnselectParentFeature", {
            "context": context,
            "eventobject": eventobject
        });
    }

});