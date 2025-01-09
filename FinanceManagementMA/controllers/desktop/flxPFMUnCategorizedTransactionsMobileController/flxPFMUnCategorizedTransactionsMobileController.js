define({
    showSelectedRow: function() {
        var previousIndex;
        var index = kony.application.getCurrentForm().TransactionsUnCategorized.segTransactions.selectedRowIndex;
        var rowIndex = index[1];
        var data = kony.application.getCurrentForm().TransactionsUnCategorized.segTransactions.data;
        for (i = 0; i < data.length; i++) {
            if (i == rowIndex) {
                data[i].imgDropdown = "arrow_up.png";
                data[i].flxDropdown.accessibilityConfig = {
                    "a11yLabel": "Hide Transaction Details",
                    "a11yARIA": {
                        "tabindex": 0,
                        "role": "button",
                        "aria-expanded": true
                    }
                };
                data[i].template = "flxPFMUnCategorizedTransactionsSelectedMobile";
            } else {
                data[i].imgDropdown = "arrow_down.png";
                data[i].flxDropdown.accessibilityConfig = {
                    "a11yLabel": "View Transaction Details",
                    "a11yARIA": {
                        "tabindex": 0,
                        "role": "button",
                        "aria-expanded": false
                    }
                };
                data[i].template = "flxPFMUnCategorizedTransactionsMobile";
            }
        }
        kony.application.getCurrentForm().TransactionsUnCategorized.segTransactions.setData(data);
         if(frm.id==="frmPersonalFinanceManagement"){
            if(data[rowIndex].template === "flxPFMUnCategorizedTransactions"){
                frm.TransactionsUnCategorized.segTransactions.setActive(rowIndex,sectionIndex,"flxPFMUnCategorizedTransactions.flxSegDisputedTransactionRowWrapper.flxDropdown");
            }
            else if(data[rowIndex].template === "flxPFMUnCategorizedTransactionsSelected") {
                frm.TransactionsUnCategorized.segTransactions.setActive(rowIndex,sectionIndex,"flxPFMUnCategorizedTransactionsSelected.flxSegDisputedTransactionRowWrapper.flxDropdown");
            }
        }
        this.AdjustScreen();
    },
    //UI Code
    AdjustScreen: function() {
        var currForm = kony.application.getCurrentForm();
        currForm.forceLayout();
        var mainheight = 0;
        var screenheight = kony.os.deviceInfo().screenHeight;
        mainheight = currForm.customheader.frame.height + currForm.flxMainContainer.frame.height;
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