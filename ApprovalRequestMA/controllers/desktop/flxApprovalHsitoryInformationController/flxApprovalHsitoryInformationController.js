define({ 

 //Type your controller code here 
  showDetails: function(eventobject, context) {
        try {
            var secIndex = context["sectionIndex"];
            var rowIndex = context["rowIndex"];
            //var parentController = _kony.mvc.GetController("com/konyolb/TabBody/TabBody");
            //parentController.showOrHideDetails({section:secIndex, row:rowIndex, direction: 1});
             this.executeOnParent("showOrHideMobile", {
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