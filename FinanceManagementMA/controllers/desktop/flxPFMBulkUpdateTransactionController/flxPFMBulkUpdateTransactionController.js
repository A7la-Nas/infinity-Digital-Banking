define({
    showSelectedRow: function() {
        var previousIndex;
        var index = kony.application.getCurrentForm().TransactionsUnCategorized.segTransactions.selectedRowIndex;
        var sectionIndex = index[0];
        var rowIndex = index[1];
        var frm= kony.application.getCurrentForm();
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
                data[i].template = "flxPFMBulkUpdateTransactionsSelected";
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
                data[i].template = "flxPFMBulkUpdateTransaction";
            }
        }
        kony.application.getCurrentForm().TransactionsUnCategorized.segTransactions.setData(data);
        if(frm.id==="frmPersonalFinanceManagement"){
            if(data[rowIndex].template === "flxPFMBulkUpdateTransaction"){
                frm.TransactionsUnCategorized.segTransactions.setActive(rowIndex,sectionIndex,"flxPFMBulkUpdateTransaction.flxSegDisputedTransactionRowWrapper.flxDropdown");
            }
            else if(data[rowIndex].template === "flxPFMBulkUpdateTransactionsSelected") {
                frm.TransactionsUnCategorized.segTransactions.setActive(rowIndex,sectionIndex,"flxPFMBulkUpdateTransactionsSelected.flxPFMBulkUpdateTransactions.flxSegDisputedTransactionRowWrapper.flxDropdown");
            }
        }
        this.AdjustScreen();
    },
    toggleCheckBox: function() {
        var index = kony.application.getCurrentForm().TransactionsUnCategorized.segTransactions.selectedIndex[1];
        var data = kony.application.getCurrentForm().TransactionsUnCategorized.segTransactions.data;
        for (var i = 0; i < data.length; i++) {
            if (i == index) {
                kony.print("index:" + index);
                if (data[i].lblCheckBox.text === "D") {
                    data[i].lblCheckBox.text = "C";
                    data[i].lblCheckBox.skin = "sknlblOLBFonts0273E420pxOlbFontIcons";
                } else {
                    data[i].lblCheckBox.text = "D";
                    data[i].lblCheckBox.skin = "sknlblOLBFontsE3E3E320pxOlbFontIcons";
                }
            }
            kony.application.getCurrentForm().TransactionsUnCategorized.segTransactions.setData(data);
        }
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
                currForm.flxFooter.top = mainheight +150+ diff + "dp";
            else
                currForm.flxFooter.top = mainheight + "dp";
        } else {
            currForm.flxFooter.top = mainheight + "dp";
        }
        currForm.forceLayout();
    }
});