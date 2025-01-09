define({

    onInfoTouchStart: function(eventobject, context) {
        this.executeOnParent("onInfoTouchStart", {
            "context": context,
            "eventobject": eventobject
        });
    },
    onInfoTouchEnd: function(eventobject, context) {
        this.executeOnParent("onInfoTouchEnd", {
            "context": context,
            "eventobject": eventobject
        });
    },
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