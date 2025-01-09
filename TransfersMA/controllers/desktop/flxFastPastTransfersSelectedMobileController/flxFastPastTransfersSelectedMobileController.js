define({
    showUnselectedRow: function() {
        var index = kony.application.getCurrentForm().segmentTransfers.selectedRowIndex;
        var rowIndex = index[1];
        var data = kony.application.getCurrentForm().segmentTransfers.data;
        data[rowIndex].lblDropdown = "O";
        data[rowIndex].template = "flxFastPastTransfersMobile";
        kony.application.getCurrentForm().segmentTransfers.setDataAt(data[rowIndex], rowIndex);
    },
});