define({
    //Type your controller code here
    showSelectedRow1: function() {
        var currForm = kony.application.getCurrentForm();
        var index = currForm.transfermain.segmentTransfers.selectedRowIndex[1];
        var data = currForm.transfermain.segmentTransfers.data;
        for (i = 0; i < data.length; i++) {
            if (i == index) {
                kony.print("index:" + index);
                data[i].imgDropdown = "chevron_up.png";
                data[i].template = "flxRecentTransfersMobileSelected";
            } else {
                data[i].imgDropdown = "arrow_down.png";
                data[i].template = "flxRecentTransfersMobile";
            }
        }
        currForm.transfermain.segmentTransfers.setData(data);
        var data1 = currForm.transfermain.segmentTransfers.clonedTemplates[index].flxRecentTransfersMobileSelected.frame.height;
        data[index].flxIdentifier.height = data1 + "dp";
        currForm.transfermain.segmentTransfers.setData(data);
        // this.AdjustScreen(300);
        this.AdjustScreen(0);
    },
    navigateToInternalAccount: function() {
        kony.print("navigationg to add internal accounts");
        applicationManager.getNavigationManager().navigateTo("frmAddInternalAccount");
    },
    viewReport: function() {
        var currForm = kony.application.getCurrentForm();
        var height_to_set = 140 + currForm.flxMain.frame.height;
        currForm.flxTransferViewReport.height = height_to_set + "dp";
        currForm.viewReport.height = height_to_set + "dp";
        currForm.flxTransferViewReport.setVisibility(true);
        this.AdjustScreen(30);
        currForm.forceLayout();
    },
    AdjustScreen: function(data) {
        var currentForm = kony.application.getCurrentForm();
        var mainheight = 0;
        var screenheight = kony.os.deviceInfo().screenHeight;
        currentForm.forceLayout();
        mainheight = currentForm.customheader.frame.height + currentForm.flxMain.frame.height;
        var diff = screenheight - mainheight;
        if (mainheight < screenheight) {
            diff = diff - currentForm.flxFooter.frame.height;
            if (diff > 0)
                currentForm.flxFooter.top = mainheight + diff + data + "dp";
            else
                currentForm.flxFooter.top = mainheight + data + "dp";
            currentForm.forceLayout();
        } else {
            currentForm.flxFooter.top = mainheight + data + "dp";
            currentForm.forceLayout();
        }
    },
});