define({
    showSelectedRow: function() {
        var currForm = kony.application.getCurrentForm();
        var index = currForm.BeneficiaryList.segmentTransfers.selectedIndex[1];
        var data = currForm.BeneficiaryList.segmentTransfers.data;
        for (i = 0; i < data.length; i++) {
            if (i == index) {
                kony.print("index:" + index);
                data[i].imgDropdown = "chevron_up.png";
                data[i].template = "flxExternalAccountsFastTransfersSelected";
            } else {
                data[i].imgDropdown = "arrow_down.png";
                data[i].template = "flxFastExternalAccountsTransfersUnselected";
            }
        }
        currForm.segmentTransfers.setData(data);
    },
});