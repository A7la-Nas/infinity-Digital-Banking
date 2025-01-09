define({
    showSelectedRow: function() {
        var index = kony.application.getCurrentForm().segWireTransfers.selectedRowIndex;
        var rowIndex = index[1];
        var data = kony.application.getCurrentForm().segWireTransfers.data;
        if (data[rowIndex].lblDropdown === "P") {
            data[rowIndex].lblDropdown = "O";
            //data[rowIndex].template = "flxMakeTransfersTransfersUnselected";
            data[rowIndex].flxIdentifier.isVisible = false;
            data[rowIndex].lblSeparator.skin = "sc39b68cb14e457b9b79ba3c8c3b88d1";
            data[rowIndex].flxIdentifier.skin = "sknFlxIdentifier";
            data[rowIndex].lblIdentifier.skin = "sknffffff15pxolbfonticons"
            data[rowIndex].flxManageRecipientsWireTransfersMobileSelectedNew.height = "60dp";
            kony.application.getCurrentForm().segWireTransfers.setDataAt(data[rowIndex], rowIndex);
        } else {
            for (i = 0; i < data.length; i++) {
                if (i == rowIndex) {
                    //kony.print("index:" + index);
                    data[i].lblDropdown = "P";
                    data[i].flxIdentifier.isVisible = true;
                    data[i].flxIdentifier.skin = "sknflx4a902";
                    data[i].lblIdentifier.skin = "sknSSP4176a415px";
                    data[i].lblSeparator.skin = "s6d03e4149764f9ba44ea8e97ff10698";
                    data[i].flxManageRecipientsWireTransfersMobileSelectedNew.height = "380dp";
                    data[i].flxManageRecipientsWireTransfersMobileSelectedNew.skin = "slFboxBGf8f7f8B0";
                    //data[i].template = "flxWireTransferMakeTransfersSelected";
                } else {
                    data[i].imgDropdown = "O";
                    data[i].flxIdentifier.isVisible = false;
                    data[i].flxIdentifier.skin = "sknFlxIdentifier";
                    data[i].lblIdentifier.skin = "sknffffff15pxolbfonticons";
                    data[i].lblSeparator.skin = "sc39b68cb14e457b9b79ba3c8c3b88d1";
                    data[i].flxManageRecipientsWireTransfersMobileSelectedNew.height = "60dp";
                    data[i].flxManageRecipientsWireTransfersMobileSelectedNew.skin = "sknflxffffffnoborder";
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