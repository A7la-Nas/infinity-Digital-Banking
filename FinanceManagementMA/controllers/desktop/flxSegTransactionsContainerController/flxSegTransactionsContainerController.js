define({
    showSelectedRow: function() {
        var index = kony.application.getCurrentForm().CategorizedMonthlySpending.segTransactions.selectedRowIndex;
        var sectionIndex = index[0];
        var rowIndex = index[1];
        var frm = kony.application.getCurrentForm();
        var data = kony.application.getCurrentForm().CategorizedMonthlySpending.segTransactions.data;
        if (data[sectionIndex][1]) {
            if (data[sectionIndex][1][rowIndex].template == "flxSegTransactionsContainerUnselected") {
                data[sectionIndex][1][rowIndex].imgDropdown = "arrow_up.png";
                data[sectionIndex][1][rowIndex].template = "flxSegTransactionsContainer";
                data[sectionIndex][1][rowIndex].flxDropdown.accessibilityConfig = {
                    "a11yLabel": "Hide Transaction Details",
                    "a11yARIA": {
                        "tabindex": 0,
                        "role": "button",
                        "aria-expanded": true
                    }
                };
            } else {
                data[sectionIndex][1][rowIndex].imgDropdown = "arrow_down.png";
                data[sectionIndex][1][rowIndex].template = "flxSegTransactionsContainerUnselected";
                data[sectionIndex][1][rowIndex].flxDropdown.accessibilityConfig = {
                    "a11yLabel": "View Transaction Details",
                    "a11yARIA": {
                        "tabindex": 0,
                        "role": "button",
                        "aria-expanded": false
                    }
                };
                data[sectionIndex][1][rowIndex].flxDescription.left="33%";
                data[sectionIndex][1][rowIndex].flxCategory.left="5%";
            }
            kony.application.getCurrentForm().CategorizedMonthlySpending.segTransactions.setDataAt(data[sectionIndex][1][rowIndex], rowIndex, sectionIndex);
            if(frm.id==="frmPersonalFinanceManagement"){
                if(data[sectionIndex][1][rowIndex].template === "flxSegTransactionsContainer"){
                    frm.CategorizedMonthlySpending.segTransactions.setActive(rowIndex,sectionIndex,"flxSegTransactionsContainer.flxSelectedRowWrapper.flxSegTransactionRowSavings.flxSegTransactionRowWrapper.flxDropdown");
                }
                else if(data[sectionIndex][1][rowIndex].template === "flxSegTransactionsContainerUnselected") {
                    frm.CategorizedMonthlySpending.segTransactions.setActive(rowIndex,sectionIndex,"flxSegTransactionsContainerUnselected.flxSelectedRowWrapper.flxSegTransactionRowSavingsflxSegTransactionRowWrapper.flxDropdown");
                }
            }
        } else {
            if (data[rowIndex].template == "flxSegTransactionsContainerUnselected") {
                data[rowIndex].imgDropdown = "arrow_up.png";
                data[rowIndex].template = "flxSegTransactionsContainer";
                data[sectionIndex][1][rowIndex].flxDropdown.accessibilityConfig = {
                    "a11yLabel": "Hide Transaction Details",
                    "a11yARIA": {
                        "tabindex": 0,
                        "role": "button",
                        "aria-expanded": true
                    }
                };
            } else {
                data[rowIndex].imgDropdown = "arrow_down.png";
                data[rowIndex].template = "flxSegTransactionsContainerUnselected";
                data[sectionIndex][1][rowIndex].flxDropdown.accessibilityConfig = {
                    "a11yLabel": "View Transaction Details",
                    "a11yARIA": {
                        "tabindex": 0,
                        "role": "button",
                        "aria-expanded": false
                    }
                };
                data[sectionIndex][1][rowIndex].flxDescription.left="33%";
                data[sectionIndex][1][rowIndex].flxCategory.left="5%";
            }
            kony.application.getCurrentForm().CategorizedMonthlySpending.segTransactions.setDataAt(data[rowIndex], rowIndex, sectionIndex);
            if(frm.id==="frmPersonalFinanceManagement"){
                if(data[sectionIndex][1][rowIndex].template === "flxSegTransactionsContainer"){
                    frm.CategorizedMonthlySpending.segTransactions.setActive(rowIndex,sectionIndex,"flxSegTransactionsContainer.flxSelectedRowWrapper.flxSegTransactionRowSavings.flxSegTransactionRowWrapper.flxDropdown");
                }
                else if(data[sectionIndex][1][rowIndex].template === "flxSegTransactionsContainerUnselected") {
                    frm.CategorizedMonthlySpending.segTransactions.setActive(rowIndex,sectionIndex,"flxSegTransactionsContainerUnselected.flxSelectedRowWrapper.flxSegTransactionRowSavingsflxSegTransactionRowWrapper.flxDropdown");
                }
            }
        }
    },
});