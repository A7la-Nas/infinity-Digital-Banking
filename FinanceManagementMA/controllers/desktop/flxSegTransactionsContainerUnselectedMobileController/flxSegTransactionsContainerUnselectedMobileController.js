define({
    showSelectedRow: function() {
        var index = kony.application.getCurrentForm().CategorizedMonthlySpending.segTransactions.selectedRowIndex;
        var sectionIndex = index[0];
        var rowIndex = index[1];
        var data = kony.application.getCurrentForm().CategorizedMonthlySpending.segTransactions.data;
        var collapseAll = function(segments) {
            segments.forEach(function(segment, i) {
                if (segment.template == "flxSegTransactionsContainerMobile") {
                    segment.template = "flxSegTransactionsContainerUnselectedMobile";
                    segment.imgDropdown = "arrow_down.png";
                    kony.application.getCurrentForm().CategorizedMonthlySpending.segTransactions.setDataAt(segment, i, sectionIndex);
                }
            });
        };
        if (data[sectionIndex][1]) {
            if (data[sectionIndex][1][rowIndex].template == "flxSegTransactionsContainerUnselectedMobile") {
                collapseAll(data[sectionIndex][1]);
                data[sectionIndex][1][rowIndex].imgDropdown = "chevron_up.png";
                data[sectionIndex][1][rowIndex].template = "flxSegTransactionsContainerMobile";
            } else {
                data[sectionIndex][1][rowIndex].imgDropdown = "arrow_down.png";
                data[sectionIndex][1][rowIndex].template = "flxSegTransactionsContainerUnselectedMobile";
            }
            kony.application.getCurrentForm().CategorizedMonthlySpending.segTransactions.setDataAt(data[sectionIndex][1][rowIndex], rowIndex, sectionIndex);
        } else {
            if (data[rowIndex].template == "flxSegTransactionsContainerUnselectedMobile") {
                collapseAll(data);
                data[rowIndex].imgDropdown = "chevron_up.png";
                data[rowIndex].template = "flxSegTransactionsContainerMobile";
            } else {
                data[rowIndex].imgDropdown = "arrow_down.png";
                data[rowIndex].template = "flxSegTransactionsContainerUnselectedMobile";
            }
            kony.application.getCurrentForm().CategorizedMonthlySpending.segTransactions.setDataAt(data[rowIndex], rowIndex, sectionIndex);
        }
    }
});