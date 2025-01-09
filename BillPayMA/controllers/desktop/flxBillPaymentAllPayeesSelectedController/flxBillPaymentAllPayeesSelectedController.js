define({
    showUnselectedRow: function() {
        var rowIndex = kony.application.getCurrentForm().segmentBillpay.selectedRowIndex[1];
        var data = kony.application.getCurrentForm().segmentBillpay.data;
        if(data[rowIndex].lblDropdown === 'O'){
            this.view.flxDropdown.accessibilityConfig = {
            "a11yLabel": "Hide details for Payee " + data[rowIndex].lblPayee.text,
                "a11yARIA": {
                    "aria-expanded": true,
                    "role": "button",
                    "tabindex": 0
                }
            }
        }else if(data[rowIndex].lblDropdown === 'P'){
            this.view.flxDropdown.accessibilityConfig = {
            "a11yLabel": "Show more details for Payee " + data[rowIndex].lblPayee.text,
                "a11yARIA": {
                    "aria-expanded": false,
                    "role": "button",
                    "tabindex": 0
                }
            }
        }
        var pre_val;
        var required_values = [];
        var array_close = ["O", false, "sknFlxIdentifier", "sknffffff15pxolbfonticons", "70dp", "sknflxffffffnoborder"];
        var array_open = ["P", true, "sknflxBg4a90e2op100NoBorder", "sknSSP4176a415px", "340dp", "sknFlxfbfbfb"];
        // data[rowIndex].calSendOn.context = {
        //   "widget": kony.application.getCurrentForm().segmentBillpay.clonedTemplates[rowIndex].calSendOn,
        //   "anchor": "bottom"
        // };
        // data[rowIndex].calDeliverBy.context = {
        //   "widget": kony.application.getCurrentForm().segmentBillpay.clonedTemplates[rowIndex].calDeliverBy,
        //   "anchor": "bottom"
        // };
        if (previous_index_all === rowIndex) {
            data[rowIndex].lblDropdown == "P" ? required_values = array_close : required_values = array_open;
            this.toggle(rowIndex, required_values);
        } else {
            if (previous_index_all >= 0) {
                pre_val = previous_index_all;
                this.toggle(pre_val, array_close);
            }
            pre_val = rowIndex;
            this.toggle(rowIndex, array_open);
        }
        previous_index_all = rowIndex;
        kony.application.getCurrentForm().segmentBillpay.setActive(rowIndex,0,'flxBillPaymentAllPayeesSelected.flxDropdown');
    },
    toggle: function(index, array) {
        var data = kony.application.getCurrentForm().segmentBillpay.data;
        data[index].lblDropdown = array[0];
        data[index].flxIdentifier.isVisible = array[1];
        data[index].flxIdentifier.skin = array[2];
        data[index].lblIdentifier.skin = array[3];
        data[index].flxBillPaymentAllPayeesSelected.height = array[4];
        data[index].flxBillPaymentAllPayeesSelected.skin = array[5];
        data[index].flxdetails.isVisible = array[1];
        kony.application.getCurrentForm().segmentBillpay.setDataAt(data[index], index);
    },
    position: function(eventobject) {
        eventobject.setContext({
            widget: "calSendOn",
            anchor: "bottom"
        })
    },
});