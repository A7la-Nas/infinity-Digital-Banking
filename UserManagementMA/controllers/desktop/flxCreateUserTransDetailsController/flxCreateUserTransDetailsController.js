define({

    //Type your controller code here 
    validateTransactionLimits: function(eventobject, context) {},

    validateTransactionLimitsOnEndEditing: function(eventobject, changedtext, context) {
        this.executeOnParent("validateTransactionLimits", {
            "context": changedtext,
            "eventobject": eventobject
        });
    },
});