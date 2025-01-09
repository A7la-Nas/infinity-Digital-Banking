define({

    showDetails: function(eventobject, context) {
        try {
            var secIndex = context["sectionIndex"];
            var rowIndex = context["rowIndex"];
            this.executeOnParent("showOrHideDetails", {
                section: secIndex,
                row: rowIndex,
                direction: 1
            });
        } catch (err) {
            kony.print(JSON.stringify(err));
        }
    }
});