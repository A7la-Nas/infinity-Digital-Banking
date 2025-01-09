define({
    // in transfer row saving
    showSelectedRow: function() {
        var index = kony.application.getCurrentForm().transactions.segTransactions.selectedIndex;
        var sectionIndex = index[0];
        var rowIndex = index[1];
        var data = kony.application.getCurrentForm().transactions.segTransactions.data;
        var collapseAll = function(segments) {
            segments.forEach(function(segment, i) {
                if (segment.template == "flxSegTransactionRowSelected") {
                    segment.template = "flxSegTransactionRowSavings";
                    segment.imgDropdown = "O";
                    kony.application.getCurrentForm().transactions.segTransactions.setDataAt(segment, i, sectionIndex);
                }
            });
        };
        if (data[sectionIndex][1]) {
            if (data[sectionIndex][1][rowIndex].template == "flxSegTransactionRowSavings") {
                collapseAll(data[sectionIndex][1]);
                data[sectionIndex][1][rowIndex].imgDropdown = "P";
                data[sectionIndex][1][rowIndex].template = "flxSegTransactionRowSelected";
            } else {
                data[sectionIndex][1][rowIndex].imgDropdown = "O";
                data[sectionIndex][1][rowIndex].template = "flxSegTransactionRowSavings";
            }
            kony.application.getCurrentForm().transactions.segTransactions.setDataAt(data[sectionIndex][1][rowIndex], rowIndex, sectionIndex);
        } else {
            if (data[rowIndex].template == "flxSegTransactionRowSavings") {
                collapseAll(data);
                data[rowIndex].imgDropdown = "P";
                data[rowIndex].template = "flxSegTransactionRowSelected";
            } else {
                data[rowIndex].imgDropdown = "O";
                data[rowIndex].template = "flxSegTransactionRowSavings";
            }
            kony.application.getCurrentForm().transactions.segTransactions.setDataAt(data[rowIndex], rowIndex, sectionIndex);
        }
        this.AdjustScreen(180);
    },
    AdjustScreen: function(data) {
        var currentForm = kony.application.getCurrentForm();
        var mainheight = 0;
        var screenheight = kony.os.deviceInfo().screenHeight;
        mainheight = currentForm.customheader.frame.height + currentForm.flxMainWrapper.frame.height;
        var diff = screenheight - mainheight;
        if (mainheight < screenheight) {
            diff = diff - currentForm.flxFooter.frame.height;
            if (diff > 0)
                currentForm.flxFooter.top = mainheight + diff + data + "dp";
            else
                currentForm.flxFooter.top = mainheight + data + "dp";
            currentForm.forceLayout();
        } else {
            currentForm.flxFooter.top = mainheight + data + "dp";
            currentForm.forceLayout();
        }
    },
});