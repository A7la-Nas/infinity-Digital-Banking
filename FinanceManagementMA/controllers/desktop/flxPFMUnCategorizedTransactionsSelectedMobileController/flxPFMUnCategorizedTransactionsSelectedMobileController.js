define({
    showSelectedRow: function() {
        var index = kony.application.getCurrentForm().TransactionsUnCategorized.segTransactions.selectedRowIndex;
        var rowIndex = index[1];
        var data = kony.application.getCurrentForm().TransactionsUnCategorized.segTransactions.data;
        data[rowIndex].imgDropdown = "arrow_down.png";
        data[rowIndex].template = "flxPFMUnCategorizedTransactionsMobile";
        kony.application.getCurrentForm().TransactionsUnCategorized.segTransactions.setDataAt(data[rowIndex], rowIndex);
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