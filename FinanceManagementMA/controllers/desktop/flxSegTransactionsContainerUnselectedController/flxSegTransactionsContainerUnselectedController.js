define({
    showSelectedRow: function() {
        var index = kony.application.getCurrentForm().CategorizedMonthlySpending.segTransactions.selectedRowIndex;
        var sectionIndex = index[0];
        var rowIndex = index[1];
        var data = kony.application.getCurrentForm().CategorizedMonthlySpending.segTransactions.data;
        var frm = kony.application.getCurrentForm();
        var collapseAll = function(segments) {
            segments.forEach(function(segment, i) {
                if (segment.template == "flxSegTransactionsContainer") {
                    segment.template = "flxSegTransactionsContainerUnselected";
                    segment.imgDropdown = "arrow_down.png";
                    segment.flxDropdown.accessibilityConfig = {
                        "a11yLabel": "View Transaction Details",
                        "a11yARIA": {
                            "tabindex": 0,
                            "role": "button",
                            "aria-expanded": false
                        }
                    };
                    kony.application.getCurrentForm().CategorizedMonthlySpending.segTransactions.setDataAt(segment, i, sectionIndex);
                if(frm.id==="frmPersonalFinanceManagement"){
                    if(segment.template === "flxSegTransactionsContainer"){
                        frm.CategorizedMonthlySpending.segTransactions.setActive(rowIndex,sectionIndex,"flxSegTransactionsContainer.flxSelectedRowWrapper.flxSegTransactionRowSavings.flxSegTransactionRowWrapper.flxDropdown");
                        }
                    else if(segment.template === "flxSegTransactionsContainerUnselected") {
                        frm.CategorizedMonthlySpending.segTransactions.setActive(rowIndex,sectionIndex,"flxSegTransactionsContainerUnselected.flxSelectedRowWrapper.flxSegTransactionRowSavings.flxSegTransactionRowWrapper.flxDropdown");
                        }
                }   
            }
        });
        };
        if (data[sectionIndex][1]) {
            if (data[sectionIndex][1][rowIndex].template == "flxSegTransactionsContainerUnselected") {
                collapseAll(data[sectionIndex][1]);
                data[sectionIndex][1][rowIndex].imgDropdown = "arrow_up.png";
                data[sectionIndex][1][rowIndex].flxDropdown.accessibilityConfig = {
                    "a11yLabel": "Hide Transaction Details",
                    "a11yARIA": {
                        "tabindex": 0,
                        "role": "button",
                        "aria-expanded": true
                    }
                };
                data[sectionIndex][1][rowIndex].template = "flxSegTransactionsContainer";
                data[sectionIndex][1][rowIndex].flxDescription.left="35%";
                data[sectionIndex][1][rowIndex].flxCategory.left="14%";
            } else {
                data[sectionIndex][1][rowIndex].imgDropdown = "arrow_down.png";
                data[sectionIndex][1][rowIndex].flxDropdown.accessibilityConfig = {
                    "a11yLabel": "View Transaction Details",
                    "a11yARIA": {
                        "tabindex": 0,
                        "role": "button",
                        "aria-expanded": false
                    }
                };
                data[sectionIndex][1][rowIndex].template = "flxSegTransactionsContainerUnselected";
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
                collapseAll(data);
                data[rowIndex].imgDropdown = "arrow_up.png";
                data[rowIndex].flxDropdown.accessibilityConfig = {
                    "a11yLabel": "Hide Transaction Details",
                    "a11yARIA": {
                        "tabindex": 0,
                        "role": "button",
                        "aria-expanded": true
                    }
                };
                data[rowIndex].template = "flxSegTransactionsContainer";
                data[sectionIndex][1][rowIndex].flxDescription.left="35%";
                data[sectionIndex][1][rowIndex].flxCategory.left="14%";
            } else {
                data[rowIndex].imgDropdown = "arrow_down.png";
                data[rowIndex].flxDropdown.accessibilityConfig = {
                    "a11yLabel": "View Transaction Details",
                    "a11yARIA": {
                        "tabindex": 0,
                        "role": "button",
                        "aria-expanded": false
                    }
                };
                data[rowIndex].template = "flxSegTransactionsContainerUnselected";
            }
            kony.application.getCurrentForm().CategorizedMonthlySpending.segTransactions.setDataAt(data[rowIndex], rowIndex, sectionIndex);
            if(frm.id==="frmPersonalFinanceManagement"){
                if(data[rowIndex].template.template === "flxSegTransactionsContainer"){
                    frm.CategorizedMonthlySpending.segTransactions.setActive(rowIndex,sectionIndex,"flxSegTransactionsContainer.flxSelectedRowWrapper.flxSegTransactionRowSavings.flxSegTransactionRowWrapper.flxDropdown");
                }
                else if(data[rowIndex].template.template === "flxSegTransactionsContainerUnselected") {
                    frm.CategorizedMonthlySpending.segTransactions.setActive(rowIndex,sectionIndex,"flxSegTransactionsContainerUnselected.flxSelectedRowWrapper.flxSegTransactionRowSavingsflxSegTransactionRowWrapper.flxDropdown");
                }
                }
        }
    }
});