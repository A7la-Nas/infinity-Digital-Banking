define({
    //** IMPORTANT  NOTE ** //
    // Uncomment the code in all the catch blocks once the global exceptional Handler is merged to the project
    //** IMPORTANT  NOTE ** //
    onViewCreated: function(eObj) {
        try {
            //this.view.addGestureRecognizer(constants.GESTURE_TYPE_SWIPE,{fingers: 1},this.swipeGestureHandler);
            //this.view.flxDropDown.onClick = this.showDetails;
            //this.view.flxDropUp.onClick = this.hideDetails;
        } catch (err) {
            kony.print(JSON.stringify(err));
            //throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.processingError", GlobalExceptionHandler.ActionConstants.LOG, arguments.callee.name);
        }
    },
    showDetails: function(eventobject, context) {
        try {
            var secIndex = context["sectionIndex"];
            var rowIndex = context["rowIndex"];
            //var parentController = _kony.mvc.GetController("com/konyolb/TabBody/TabBody");
            //parentController.showOrHideDetails({section:secIndex, row:rowIndex, direction: 1});
            this.executeOnParent("showOrHideDetails", {
                section: secIndex,
                row: rowIndex,
                direction: 1
            });
        } catch (err) {
            kony.print(JSON.stringify(err));
            //throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.processingError", GlobalExceptionHandler.ActionConstants.LOG, arguments.callee.name);
        }
    }
});