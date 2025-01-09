define({
    showSelectedRow: function() {
        var index = kony.application.getCurrentForm().segWireTransfers.selectedRowIndex;
        var rowIndex = index[1];
        var data = kony.application.getCurrentForm().segWireTransfers.data;
        if (data[rowIndex].lblDropdown === "P") {
            data[rowIndex].lblDropdown = "O";
            //data[rowIndex].template = "flxMakeTransfersTransfersUnselected";
            data[rowIndex].flxIdentifier.skin = "sknFlxIdentifier";
            data[rowIndex].lblIdentifier.skin = "sknffffff15pxolbfonticons";
            data[rowIndex].flxMakeTransferWireTransfersMobileSelectedNew.height = "60dp";
            data[rowIndex].lblSeparator.isVisible = false;
            data[rowIndex].flxMakeTransferWireTransfersMobileSelectedNew.skin = "sknflxffffffnoborder";
            kony.application.getCurrentForm().segWireTransfers.setDataAt(data[rowIndex], rowIndex);
        } else {
            for (i = 0; i < data.length; i++) {
                if (i == rowIndex) {
                    //kony.print("index:" + index);
                    data[i].lblDropdown = "P";
                    data[i].flxIdentifier.isVisible = true;
                    data[i].lblSeparator.isVisible = true;
                    data[i].flxIdentifier.skin = "sknflx4a902";
                    data[i].lblIdentifier.skin = "sknSSP4176a415px";
                    data[i].flxMakeTransferWireTransfersMobileSelectedNew.height = "380dp";
                    data[i].flxMakeTransferWireTransfersMobileSelectedNew.skin = "sknFlxfbfbfbBorder0";
                    //data[i].template = "flxWireTransferMakeTransfersSelected";
                } else {
                    data[i].imgDropdown = "O";
                    data[i].flxIdentifier.isVisible = true;
                    data[i].flxIdentifier.skin = "sknFlxIdentifier";
                    data[i].lblSeparator.isVisible = false;
                    data[i].lblIdentifier.skin = "sknffffff15pxolbfonticons";
                    data[i].flxMakeTransferWireTransfersMobileSelectedNew.height = "60dp";
                    data[i].flxMakeTransferWireTransfersMobileSelectedNew.skin = "sknflxffffffnoborder";
                    //data[i].template = "flxMakeTransfersTransfersUnselected";
                }
            }
            kony.application.getCurrentForm().segWireTransfers.setData(data);
        }
        var segData = kony.application.getCurrentForm().segWireTransfers.data;
        if (segData.length == 1)
            segData[0].lblSeparator.isVisible = true;
        kony.application.getCurrentForm().segWireTransfers.setData(segData);
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