define({
    showSelectedRow: function() {
        var index = kony.application.getCurrentForm().TransactionsUnCategorized.segTransactions.selectedRowIndex;
        var sectionIndex = index[0];
        var rowIndex = index[1];
        var frm =  kony.application.getCurrentForm();
        var data = kony.application.getCurrentForm().TransactionsUnCategorized.segTransactions.data;
        data[rowIndex].imgDropdown = "arrow_down.png";
        data[rowIndex].flxDropdown.accessibilityConfig = {
            "a11yLabel": "View Transaction Details",
            "a11yARIA": {
                "tabindex": 0,
                "role": "button",
                "aria-expanded": false
            }
        };
        data[rowIndex].template = "flxPFMUnCategorizedTransactions";
        kony.application.getCurrentForm().TransactionsUnCategorized.segTransactions.setDataAt(data[rowIndex], rowIndex);
        if(frm.id==="frmPersonalFinanceManagement"){
            if(data[rowIndex].template = "flxPFMUnCategorizedTransactions"){
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