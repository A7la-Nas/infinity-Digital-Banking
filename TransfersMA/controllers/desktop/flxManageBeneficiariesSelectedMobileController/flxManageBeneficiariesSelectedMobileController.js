define({
    showUnselectedRow: function() {
        var rowIndex = kony.application.getCurrentForm().segmentBillpay.selectedRowIndex[1];
        var data = kony.application.getCurrentForm().segmentBillpay.data;
        var pre_val;
        var required_values = [];
        var array_close = ["O", false, "sknFlxIdentifier", "sknffffff15pxolbfonticons", 70, "sknflxffffffnoborder"];
        var array_open = ["P", true, "sknflx4a902", "sknSSP4176a415px", 355 , "slFboxBGf8f7f8B0"];
        if (!data[rowIndex].flxSwiftTitle.isVisible) {
            array_open[4] = array_open[4] - 60;
        }
        if (data[rowIndex].lblAddress3.isVisible) {
            array_open[4] = array_open[4] + 20;
        }
        if (data[rowIndex].lblAddress1.isVisible) {
            array_open[4] = array_open[4] + 20;
        }
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
            "a11yLabel": "show more details",
            "a11yARIA" : {
               "aria-expanded": false,
               "role":"button"
            }
          };
          data[index].flxManageBeneficiariesSelectedMobile.height = array[4] + 2 + "dp";
        }
        else{
          data[index].flxDetail.isVisible=true;
          data[index].flxDropdown.accessibilityConfig={
            "a11yLabel": "hide details",
            "a11yARIA" : {
              "aria-expanded": true,
              "role": "button"
            }
          };
          data[index].flxManageBeneficiariesSelectedMobile.height = array[4] + 60 + "dp";
        }
        data[index].flxIdentifier.isVisible = array[1];
        data[index].flxIdentifier.skin = array[2];
        data[index].lblIdentifier.skin = array[3];
        data[index].flxManageBeneficiariesSelectedMobile.skin = array[5];
        kony.application.getCurrentForm().segmentBillpay.setDataAt(data[index], index);
        //kony.application.getCurrentForm().segmentBillpay.setActive(index,-1);
      kony.application.getCurrentForm().segmentBillpay.rowTemplate = "flxManageBeneficiariesSelectedMobile";
        kony.application.getCurrentForm().segmentBillpay.setActive(index, -1, "flxManageBeneficiariesSelectedMobile.flxMain.flxRowDetails.flxSelectedRowWrapper.flxManageBeneficiaries.flxDropdown");
    },

});