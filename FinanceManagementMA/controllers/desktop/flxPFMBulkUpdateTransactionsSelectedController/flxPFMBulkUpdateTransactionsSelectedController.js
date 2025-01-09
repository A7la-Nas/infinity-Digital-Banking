define(['FormControllerUtility'], function(FormControllerUtility) {
    return {
        showSelectedRow: function() {
            var index = kony.application.getCurrentForm().TransactionsUnCategorized.segTransactions.selectedRowIndex;
            var rowIndex = index[1];
            var sectionIndex = index[0];
            var frm= kony.application.getCurrentForm();
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
            data[rowIndex].template = "flxPFMBulkUpdateTransaction";
            kony.application.getCurrentForm().TransactionsUnCategorized.segTransactions.setDataAt(data[rowIndex], rowIndex);
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
            var index = kony.application.getCurrentForm().TransactionsUnCategorized.segTransactions.selectedRowIndex[1];
            var data = kony.application.getCurrentForm().TransactionsUnCategorized.segTransactions.data;
            for (i = 0; i < data.length; i++) {
                if (i == index) {
                    if (data[i].lblCheckBox.text === 'D') {
                        data[i].lblCheckBox.text = 'C';
                        data[i].lblCheckBox.skin = "sknFontIconCheckBoxSelected";
                    } else {
                        data[i].lblCheckBox.text = 'D';
                        data[i].lblCheckBox.skin = "sknOlbFontsIconse3e3e3";
                    }
                }
                kony.application.getCurrentForm().TransactionsUnCategorized.segTransactions.setData(data);
            }
        },
        //UI Code
        AdjustScreen: function() {
            var currForm = kony.application.getCurrentForm();
            FormControllerUtility.updateWidgetsHeightInInfo(currForm, ['customheader',
                'flxContainer',
                'flxFooter'
            ]);
            currForm.forceLayout();
            var mainheight = 0;
            var screenheight = kony.os.deviceInfo().screenHeight;
            mainheight = currForm.customheader.info.frame.height + currForm.flxMainContainer.info.frame.height;
            var diff = screenheight - mainheight;
            if (mainheight < screenheight) {
                diff = diff - currForm.flxFooter.info.frame.height;
                if (diff > 0)
                    currForm.flxFooter.top = mainheight + diff + "dp";
                else
                    currForm.flxFooter.top = mainheight + "dp";
            } else {
                currForm.flxFooter.top = mainheight + "dp";
            }
            currForm.forceLayout();
        }
    };
});