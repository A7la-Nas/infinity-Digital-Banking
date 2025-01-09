define({
    showUnselectedRow: function() {
        var index = kony.application.getCurrentForm().segmentTransfers.selectedIndex;
        var rowIndex = index[1];
        var data = kony.application.getCurrentForm().segmentTransfers.data;
        data[rowIndex].imgDropdown = "arrow_down.png";
        data[rowIndex].template = "flxFastExternalAccountsTransfersUnselected";
        kony.application.getCurrentForm().segmentTransfers.setDataAt(data[rowIndex], rowIndex);
    },
});