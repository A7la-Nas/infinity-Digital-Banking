define({

    //Type your controller code here 
    showSelectedRow: function() {
        var index = kony.application.getCurrentForm().MyRequestsTabs.segTransactions.selectedRowIndex;
        var rowIndex = index[1];
        var data = kony.application.getCurrentForm().MyRequestsTabs.segTransactions.data;
        data[rowIndex].imgDropDown = "arrow_down.png";
        data[rowIndex].template = "flxDisputedChecksUnSelectedWrapperTablet";
        data[rowIndex].flxDropdown.accessibilityConfig = {
            "a11yLabel": "Show more details for check book request with reference number" + data[rowIndex].lblAmount.text,
            "a11yARIA": {
              "tabindex": 0,
              "role": "button",
              "aria-expanded": false
            }
          }
        kony.application.getCurrentForm().MyRequestsTabs.segTransactions.setDataAt(data[rowIndex], rowIndex);
        kony.application.getCurrentForm().forceLayout();
        this.AdjustScreen();
        kony.application.getCurrentForm().MyRequestsTabs.segTransactions.setActive(rowIndex, -1, "flxDisputedTransactionsUnSelectedWrapperMobile.flxGroup.flxGroup1.flxSegDisputedTransactionRowWrapper.flxWrapper.flxDropdown");
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