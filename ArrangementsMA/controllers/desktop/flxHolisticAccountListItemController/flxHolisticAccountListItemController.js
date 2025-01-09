define({
    menuPressed: function(data) {
        var currForm = kony.application.getCurrentForm();
        var index = currForm.accountList.segAccounts.selectedRowIndex[1];
        kony.print("index:" + index);
        var segmentData = currForm.accountList.segAccounts.data[index]; //onQuickActionsMenu
        segmentData.onQuickActions();
        if (index == 0) {
            currForm.accountListMenu.flxIdentifier.skin = "sknFlx9060b7Opacity20";
        } else if (index == 1) {
            currForm.accountListMenu.flxIdentifier.skin = "sknFlx26D0CEOpacity20";
        } else if (index == 2) {
            currForm.accountListMenu.flxIdentifier.skin = "sknFlxF4BA22Opacity20";
        } else if (index == 3) {
            currForm.accountListMenu.flxIdentifier.skin = "sknFlx9060b7Opacity20";
        } else if (index == 4) {
            currForm.accountListMenu.flxIdentifier.skin = "sknFlx26D0CEOpacity20";
        }
        if (currForm.accountListMenu.isVisible == true) {
            currForm.accountListMenu.top = 280;
            currForm.accountListMenu.isVisible = false;
            currForm.forceLayout();
        } else {
            var currTop = currForm.accountListMenu.top;
            currTop = parseInt(currTop);
            currTop += 100 * index;
            kony.print("currTop:" + currTop);
            currForm.accountListMenu.top = currTop;
            currForm.accountListMenu.isVisible = true;
            currForm.forceLayout();
        }
    },
    imgPressed: function() {
        var currForm = kony.application.getCurrentForm();
        var index = currForm.accountList.segAccounts.selectedRowIndex[1];
        var segmentData = currForm.accountList.segAccounts.data[index];
        segmentData.toggleFavourite();
        //_kony.mvc.GetController(currForm.id, true).presenter.AccountsSummary.toggleFavourite(account);
        // var img = data.imgFavourite;
        // if (img === "filled_star.png") {
        //     data.imgFavourite = "unfilled_star.png";
        // } else {
        //     data.imgFavourite = "filled_star.png";
        // }
        // currForm.accountList.segAccounts.setDataAt(data, index);
    },
    accountPressed: function() {
        var currForm = kony.application.getCurrentForm();
        var index = currForm.accountList.segAccounts.selectedRowIndex[1];
        var segmentData = currForm.accountList.segAccounts.data[index];
        segmentData.onAccountClick();
    },
});