define({
    menuPressed: function(data) {
        var currForm = kony.application.getCurrentForm();
        var index = currForm.accountList.segAccounts.selectedRowIndex[1];
        if (index === 0) {
            currForm.accountListMenu.flxIdentifier.skin = "sknFlx9060b7Opacity20";
        } else if (index === 1) {
            currForm.accountListMenu.flxIdentifier.skin = "sknFlx26D0CEOpacity20";
        } else if (index === 2) {
            currForm.accountListMenu.flxIdentifier.skin = "sknFlxF4BA22Opacity20";
        } else if (index === 3) {
            currForm.accountListMenu.flxIdentifier.skin = "sknFlx9060b7Opacity20";
        } else if (index === 4) {
            currForm.accountListMenu.flxIdentifier.skin = "sknFlx26D0CEOpacity20";
        }
        if (currForm.accountListMenu.isVisible === true) {
            currForm.accountListMenu.top = 280;
            currForm.accountListMenu.isVisible = false;
            currForm.forceLayout();
        } else {
            var currTop = currForm.accountListMenu.top;
            currTop = parseInt(currTop);
            currTop += 100 * index;
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
    showEditAccountsPreferences: function() {
        var currForm = kony.application.getCurrentForm();
        this.view.settings.flxEditAccountsButtons.top = "258dp";
        currForm.settings.flxEditAccountsWrapper.setVisibility(true);
        currForm.settings.flxAccountsWrapper.setVisibility(false);
    },
    toggleFavouriteCheckBox: function() {
        var index = kony.application.getCurrentForm().settings.segAccounts.selectedIndex[1];
        var data = kony.application.getCurrentForm().settings.segAccounts.data;
        for (var i = 0; i < data.length; i++) {
            if (i === index) {
                if (data[i].imgFavoriteCheckBox === "unchecked_box.png") {
                    data[i].imgFavoriteCheckBox = "checked_box.png";
                } else {
                    data[i].imgFavoriteCheckBox = "unchecked_box.png";
                }
            }
            kony.application.getCurrentForm().settings.segAccounts.setData(data);
        }
    },
    toggleEstatementCheckBox: function() {
        var index = kony.application.getCurrentForm().settings.segAccounts.selectedIndex[1];
        var data = kony.application.getCurrentForm().settings.segAccounts.data;
        for (i = 0; i < data.length; i++) {
            if (i === index) {
                if (data[i].imgEStatementCheckBox === "unchecked_box.png") {
                    data[i].imgEStatementCheckBox = "checked_box.png";
                } else {
                    data[i].imgEStatementCheckBox = "unchecked_box.png";
                }
            }
            kony.application.getCurrentForm().settings.segAccounts.setData(data);
        }
    },
});