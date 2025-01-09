define({
    showSelectedRow: function() {
        var previousIndex;
        var index = kony.application.getCurrentForm().segmentTransfers.selectedRowIndex;
        var rowIndex = index[1];
        var data = kony.application.getCurrentForm().segmentTransfers.data;
        //data[rowIndex].template = "flxManageRecipientSelected";
        for (i = 0; i < data.length; i++) {
            if (i == rowIndex) {
                data[i].imgDropdown = "chevron_up.png";
                if (kony.application.getCurrentBreakpoint() == 640) {
                    data[i].template = "flxFastTransfersRecipientsSelectedMobile";
                } else {
                    data[i].template = "flxFastTransfersRecipientsSelected";
                }
            } else {
                data[i].imgDropdown = "arrow_down.png";
                if (kony.application.getCurrentBreakpoint() == 640) {
                    data[i].template = "flxFastTransfersRecipientsMobile";
                } else {
                    data[i].template = "flxFastTransfersRecipientsUnselected";
                }
            }
        }
        kony.application.getCurrentForm().segmentTransfers.setData(data);
    },
});