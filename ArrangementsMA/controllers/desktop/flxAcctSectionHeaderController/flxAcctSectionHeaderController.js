define({

    toggleSegment: function(eventobject, context) {
        var secIndex = context["sectionIndex"];
        var rowIndex = context["rowIndex"];
        var currForm = kony.application.getCurrentForm();
        this.executeOnParent("showOrHideAccountRows", {
            section: secIndex,
            row: rowIndex,
            direction: 1
        });
        currForm.forceLayout();
    }

});