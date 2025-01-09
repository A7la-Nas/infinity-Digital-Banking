define({

    //Type your controller code here
    onViewCreated: function() {
        try {
            this.view.flxHeadersContainer.flxMatrixOnOff.onClick = this.updateOnOffMatrix;
            //this.view.flxTransactionsHeader.onClick = this.rowOnClick;
        } catch (exc) {
            kony.print("Exception in onViewCreated!!!" + exc);
        }
    },

   updateOnOffMatrix: function(eventobject, context) {
        try {
            kony.print("Entered rowonClick");
            var secIndex = context["sectionIndex"];
            var rowIndex = context["rowIndex"];
            var controller = _kony.mvc.GetController("frmApprovalmatrix", true);
            controller.updateOnOffMatrix({
                section: secIndex,
                row: rowIndex
            });

        } catch (exc) {
            //alert(JSON.stringify(exc));
            console.error(exc);
            kony.print("exception in rowonClick!!!" + exc);
        }
    },

});
