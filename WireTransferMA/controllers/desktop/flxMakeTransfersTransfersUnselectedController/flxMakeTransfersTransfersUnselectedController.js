define({
    showSelectedRow: function() {
        var previousIndex;
        var index = kony.application.getCurrentForm().WireTransferContainer.segWireTransfers.selectedRowIndex;
        var rowIndex = index[1];
        var data = kony.application.getCurrentForm().WireTransferContainer.segWireTransfers.data;
        for (i = 0; i < data.length; i++) {
            if (i == rowIndex) {
                kony.print("index:" + index);
                data[i].imgDropdown = "arrow_up.png";
                data[i].template = "flxWireTransferMakeTransfersSelected";
            } else {
                data[i].imgDropdown = "arrow_down.png";
                data[i].template = "flxMakeTransfersTransfersUnselected";
            }
        }
        kony.application.getCurrentForm().WireTransferContainer.segWireTransfers.setData(data);
        kony.application.getCurrentForm().forceLayout();
        this.AdjustScreen();
    },
    MakeTransferAction: function() {
        var currForm = kony.application.getCurrentForm();
        currForm.WireTransferContainer.flxTabs.setVisibility(false);
        currForm.WireTransferContainer.flxSearch.setVisibility(false);
        currForm.WireTransferContainer.flxSearchImage.setVisibility(false);
        currForm.WireTransferContainer.flxStep3Header.setVisibility(false);
        currForm.WireTransferContainer.lblTransactions.text = "WIRE TRANSFER";
        currForm.WireTransferContainer.flxSortRecent.setVisibility(false);
        currForm.WireTransferContainer.flxSortMakeTransfers.setVisibility(false);
        currForm.WireTransferContainer.flxRowSeperator.setVisibility(false);
        currForm.WireTransferContainer.segWireTransfers.setVisibility(false);
        currForm.WireTransferContainer.flxNoTransactions.setVisibility(false);
        currForm.WireTransferContainer.flxMakeWireTransferForm.setVisibility(true);
        currForm.WireTransferContainer.tablePagination.setVisibility(false);
        currForm.forceLayout();
    },
    //UI Code
    AdjustScreen: function() {
        this.view.forceLayout();
        var currForm = kony.application.getCurrentForm();
        var mainheight = 0;
        var screenheight = kony.os.deviceInfo().screenHeight;
        mainheight = currForm.customheader.frame.height + currForm.flxMain.frame.height;
        var diff = screenheight - mainheight;
        if (mainheight < screenheight) {
            diff = diff - currForm.flxFooter.frame.height;
            if (diff > 0)
                currForm.flxFooter.top = mainheight + diff + 40 + "dp";
            else
                currForm.flxFooter.top = mainheight + 40 + "dp";
        } else {
            currForm.flxFooter.top = mainheight + 40 + "dp";
        }
        currForm.forceLayout();
    },
});