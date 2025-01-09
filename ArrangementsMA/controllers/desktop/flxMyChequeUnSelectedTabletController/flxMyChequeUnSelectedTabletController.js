define({

    //Type your controller code here 
    showSelectedRow: function() {
        var previousIndex;
        var index = kony.application.getCurrentForm().MyRequestsTabs.segTransactions.selectedRowIndex;
        var rowIndex = index[1];
        var data = kony.application.getCurrentForm().MyRequestsTabs.segTransactions.data;
        for (i = 0; i < data.length; i++) {
            if (i == rowIndex) {
                kony.print("index:" + index);
                data[i].imgDropDown = "listboxdownarrow.png";
                data[i].template = "flxMyChequeSelectedTablet";
                data[i].flxDropdown.accessibilityConfig = {
                    "a11yLabel": "Hide details for my cheque with" + data[i].lblAmount.text,
                    "a11yARIA": {
                      "tabindex": 0,
                      "role": "button",
                      "aria-expanded": true
                    }
                  }
            } else {
                data[i].imgDropDown = "arrow_down.png";
                data[i].template = "flxMyChequeUnSelectedTablet";
                data[i].flxDropdown.accessibilityConfig = {
                    "a11yLabel": "Show more details for my cheque with" + data[i].lblAmount.text,
                    "a11yARIA": {
                      "tabindex": 0,
                      "role": "button",
                      "aria-expanded": false
                    }
                }
            }
        }
        kony.application.getCurrentForm().MyRequestsTabs.segTransactions.setData(data);
        kony.application.getCurrentForm().forceLayout();
        this.AdjustScreen();
        kony.application.getCurrentForm().MyRequestsTabs.segTransactions.setActive(rowIndex, -1, "flxMyChequeUnSelectedTablet.flxGroup.flxGroup1.flxSegDisputedTransactionRowWrapper.flxSegDisputedTransactionRowWrappers.flxWrapper.flxDropdown");
    },

    //UI Code
    AdjustScreen: function() {
        var currForm = kony.application.getCurrentForm();
        var mainheight = 0;
        var screenheight = kony.os.deviceInfo().screenHeight;
        mainheight = currForm.flxHeader.frame.height + currForm.flxContainer.frame.height;
        var diff = screenheight - mainheight;
        if (mainheight < screenheight) {
            diff = diff - currForm.flxFooter.frame.height;
            if (diff > 0)
                currForm.flxFooter.top = mainheight + diff + "dp";
            else
                currForm.flxFooter.top = mainheight + "dp";
        } else {
            currForm.flxFooter.top = mainheight + "dp";
        }
        currForm.forceLayout();
    },
});