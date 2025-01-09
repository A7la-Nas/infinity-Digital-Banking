define({
    showUnselectedRow: function() {
        var rowIndex= kony.application.getCurrentForm().segmentBillpay.selectedRowIndex[1];
        var data = kony.application.getCurrentForm().segmentBillpay.data;
        var pre_val;
        var required_values = [];
        var array_close = ["O", false, "sknFlxIdentifier", "sknffffff15pxolbfonticons", "50dp", "sknflxffffffnoborder", "sknLblSSP15pxtrucation", "sknLblSSP13pxtrucation"];
        var array_open = ["P", true, "sknflx4a902", "sknSSP4176a415px", "225dp", "sknFlxfbfbfb", "slLabel0d8a72616b3cc47", "sknSSPregular42424213Px"];
        if (previous_index === rowIndex) {
            data[rowIndex].lblDropdown == "P" ? required_values = array_close : required_values = array_open;
            this.toggle(rowIndex, required_values);
        } else {
            if (previous_index >= 0) {
                pre_val = previous_index;
                if (pre_val < data.length) {
                    this.toggle(pre_val, array_close);
                }
            }
            pre_val = rowIndex;
            this.toggle(rowIndex, array_open);
        }
        previous_index = rowIndex;
    },
    toggle: function(index, array) {
        var data = kony.application.getCurrentForm().segmentBillpay.data;
        data[index].lblDropdown = array[0];
        if(data[index].lblDropdown ==="O") {
          data[index].flxDetail.isVisible=false;
          data[index].flxDropdown.accessibilityConfig={
            "a11yLabel": "show more details for beneficiary "+" "+data[index].lblAccountName.text,
            "a11yARIA": {
               "aria-expanded": false,
               "role":"button"
            }
          };
        }
        else{
          data[index].flxDetail.isVisible=true;
          data[index].flxDropdown.accessibilityConfig={
            "a11yLabel": "hide details for beneficiary"+" "+data[index].lblAccountName.text,
            "a11yARIA": {
              "aria-expanded": true,
              "role":"button"
            }
          };
        }
        data[index].flxIdentifier.isVisible = array[1];
        data[index].flxIdentifier.skin = array[2];
        data[index].lblIdentifier.skin = array[3];
        data[index].flxManageBeneficiariesSelected.height = array[4];
        data[index].flxManageBeneficiariesSelected.skin = array[5];
        var name = data[index].lblAccountName.text;
        if (!name.includes(" ")) {
            data[index].lblAccountName.skin = "sknLblSSP15pxtrucation";
        } else {
            data[index].lblAccountName.skin = array[6];
        }
        var nick_name = data[index].lblNickNameValue.text;
        if (!nick_name.includes(" ")) {
            data[index].lblNickNameValue.skin = "sknLblSSP13pxtrucation";
        } else {
            data[index].lblNickNameValue.skin = array[7];
        }
        kony.application.getCurrentForm().segmentBillpay.setDataAt(data[index], index);
        //kony.application.getCurrentForm().segmentBillpay.setActive(index,-1);
		kony.application.getCurrentForm().segmentBillpay.rowTemplate = "flxManageBeneficiariesSelected";
        kony.application.getCurrentForm().segmentBillpay.setActive(index, -1, "flxManageBeneficiariesSelected.flxMain.flxRowDetails.flxSelectedRowWrapper.flxExternalAccountsTransfers.flxDropdown");    },

});