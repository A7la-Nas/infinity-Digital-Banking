define({
    showSelectedRow: function() {
        var index = kony.application.getCurrentForm().segWireTransfers.selectedRowIndex;
        var rowIndex = index[1];
        var data = kony.application.getCurrentForm().segWireTransfers.data;
        if (data[rowIndex].lblDropdown === "P") {
            data[rowIndex].lblDropdown = "O";
            //data[rowIndex].template = "flxMakeTransfersTransfersUnselected";
            data[rowIndex].flxIdentifier.isVisible = false;
            data[rowIndex].lblIdentifier.skin = "sknffffff15pxolbfonticons"
            data[rowIndex].flxManageRecipientsNewSelected.height = "50dp";
            kony.application.getCurrentForm().segWireTransfers.setDataAt(data[rowIndex], rowIndex);
        } else {
            for (i = 0; i < data.length; i++) {
                if (i == rowIndex) {
                    //kony.print("index:" + index);
                    data[i].lblDropdown = "P";
                    data[i].flxIdentifier.isVisible = true;
                    data[i].flxIdentifier.skin = "sknflxBg4a90e2op100NoBorder";
                    data[i].lblIdentifier.skin = "sknSSP4176a415px";
                    data[i].flxManageRecipientsNewSelected.height = "265dp";
                    data[i].flxManageRecipientsNewSelected.skin = "slFboxBGf8f7f8B0";
                    //data[i].template = "flxWireTransferMakeTransfersSelected";
                } else {
                    data[i].lblDropdown = "O";
                    data[i].flxIdentifier.isVisible = false;
                    data[i].lblIdentifier.skin = "sknffffff15pxolbfonticons"
                    data[i].flxManageRecipientsNewSelected.height = "50dp";
                    data[i].flxManageRecipientsNewSelected.skin = "sknflxffffffnoborder";
                    //data[i].template = "flxMakeTransfersTransfersUnselected";
                }
            }
            kony.application.getCurrentForm().segWireTransfers.setData(data);
        }
        kony.application.getCurrentForm().forceLayout();
    },
    MakeTransferAction: function() {
        var currForm = kony.application.getCurrentForm();
        currForm.flxTabs.setVisibility(false);
        currForm.flxSearch.setVisibility(false);
        currForm.flxSearchImage.setVisibility(false);
        currForm.flxStep3Header.setVisibility(false);
        currForm.lblTransactions.text = "WIRE TRANSFER";
        currForm.flxSortRecent.setVisibility(false);
        currForm.flxSortMakeTransfers.setVisibility(false);
        currForm.flxRowSeperator.setVisibility(false);
        currForm.segWireTransfers.setVisibility(false);
        currForm.flxNoTransactions.setVisibility(false);
        currForm.flxMakeWireTransferForm.setVisibility(true);
        currForm.tablePagination.setVisibility(false);
        currForm.forceLayout();
    }
});