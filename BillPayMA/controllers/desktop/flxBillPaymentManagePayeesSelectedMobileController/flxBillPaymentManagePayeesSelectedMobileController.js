define({
    showUnselectedRow: function() {
        var rowIndex = kony.application.getCurrentForm().segmentBillpay.selectedRowIndex[1];
        var data = kony.application.getCurrentForm().segmentBillpay.data;
        var pre_val;
        var required_values = [];
        var array_close = ["O", false, "sknFlxIdentifier", "sknffffff15pxolbfonticons", "70dp", "sknflxffffffnoborder"];
        var array_open = ["P", true, "sknflxBg4a90e2op100NoBorder", "sknSSP4176a415px", "400dp", "sknFlxfbfbfb"];
        if (previous_index_manage === rowIndex) {
            data[rowIndex].lblDropdown == "P" ? required_values = array_close : required_values = array_open;
            this.toggle(rowIndex, required_values);
        } else {
            if (previous_index_manage >= 0) {
                pre_val = previous_index_manage;
                this.toggle(pre_val, array_close);
            }
            pre_val = rowIndex;
            this.toggle(rowIndex, array_open);
        }
        previous_index_manage = rowIndex;
    },
    toggle: function(index, array) {
        var data = kony.application.getCurrentForm().segmentBillpay.data;
        data[index].lblDropdown = array[0];
        data[index].flxIdentifier.isVisible = array[1];
        data[index].flxIdentifier.skin = array[2];
        data[index].lblIdentifier.skin = array[3];
        data[index].flxBillPaymentManagePayeesSelectedMobile.height = array[4];
        data[index].flxBillPaymentManagePayeesSelectedMobile.skin = array[5];
        kony.application.getCurrentForm().segmentBillpay.setDataAt(data[index], index);
    },
});