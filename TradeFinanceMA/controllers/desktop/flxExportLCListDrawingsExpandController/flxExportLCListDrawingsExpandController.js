define({

    //Type your controller code here 
    onViewCreated: function () {
        try {
            this.view.flxMain.flxLCTransaction.flxLCTransactionListRow.flxDropDown.onClick = this.onDropdownClick;
        } catch (err) { }
    },
    onDropdownClick: function (eventobject, context) {
        try {
            this.executeOnParent("segLOCOnRowClick", {
                section: context["sectionIndex"],
                row: context["rowIndex"]
            });
        } catch (err) { }
    },
});