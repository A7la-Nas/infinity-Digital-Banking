define(['FormControllerUtility'], function(FormControllerUtility) {
    return {

        menuPressed: function() {
            var currForm = kony.application.getCurrentForm();

            FormControllerUtility.updateWidgetsHeightInInfo(currForm, ['flxPasswordResetWarning',
                'flxDowntimeWarning',
                'flxOverdraftWarning',
                'flxOutageWarning',
                'flxMainWrapper',
                'flxLeftContainer'
            ]);
            if (this.view.flxMenu.origin) {
                if (kony.application.getCurrentBreakpoint() !== 1024) {
                    this.view.flxMenu.origin = false;
                    return;
                }
            }

            var section = currForm.accountList.segAccounts.selectedRowIndex[0];
            var index = currForm.accountList.segAccounts.selectedRowIndex[1];
            var segmentData = currForm.accountList.segAccounts.data[section][1];
            var currBreakpoint = kony.application.getCurrentBreakpoint();
            var orientationHandler = new OrientationHandler();
            segmentData[index].onQuickActions();

            currForm.accountListMenu.top = 155;
            if (currForm.accountListMenu.isVisible === true) {
                currForm.accountListMenu.top = 155;
                currForm.accountListMenu.isVisible = false;
                currForm.forceLayout();
            } else {
                var currTop = 0;
                var indexCount = 0;
                var totalCount = 0;

                for (var i = 0; i < section; i++) {
                    if (currForm.accountList.segAccounts.data[i][1][currForm.accountList.segAccounts.data[i][1].length - 1].template === "flxRowTotalAccountsGroupBalance" || currForm.accountList.segAccounts.data[i][1][currForm.accountList.segAccounts.data[i][1].length - 1].template === "flxRowTotalAccountsGroupBalanceMobile") {
                        indexCount += (currForm.accountList.segAccounts.data[i][1].length - 1);
                        totalCount += 1;
                    } else
                        indexCount += (currForm.accountList.segAccounts.data[i][1].length);
                }

                currTop = parseInt(currTop);
                if (currBreakpoint === 640 || orientationHandler.isMobile)
                    currTop += ((78 * indexCount) + (70 * totalCount) + (50 * (section + 1)) + (((index + 1) * 78) + 85));
                else
                    currTop += ((78 * indexCount) + (115 * totalCount) + (50 * (section + 1)) + (((index + 1) * 78) + 65));

                currForm.forceLayout();
                if (currForm.flxPasswordResetWarning.isVisible === true) currTop = currTop + currForm.flxPasswordResetWarning.info.frame.height + 26;
                if (currForm.flxDowntimeWarning.isVisible === true) currTop = currTop + currForm.flxDowntimeWarning.info.frame.height + 26;
                if (currForm.flxOverdraftWarning.isVisible === true) currTop = currTop + currForm.flxOverdraftWarning.info.frame.height + 26;
                if (currForm.flxOutageWarning.isVisible === true) currTop = currTop + currForm.flxOutageWarning.info.frame.height + 26;
                currForm.accountListMenu.top = currTop + "dp";


                if (currBreakpoint === 640 || orientationHandler.isMobile) {
                    currForm.accountListMenu.left = "";
                    currForm.accountListMenu.right = "10dp";
                } else if (currBreakpoint === 1024 || orientationHandler.isTablet) {
                    currForm.accountListMenu.left = "";
                    currForm.accountListMenu.right = "24dp";
                } else {
                    currForm.accountListMenu.right = "";
                    //ARB-9990 : Temporary solution to fix for 1366 windows.
                    var userAgent = kony.os.deviceInfo().userAgent;
                    if (userAgent.indexOf("Macintosh") !== -1 && kony.application.getCurrentBreakpoint() === 1366)
                        currForm.accountListMenu.left = currForm.flxMainWrapper.info.frame.x + (currForm.flxLeftContainer.info.frame.x + currForm.flxLeftContainer.info.frame.width - 250) + "dp";
                    else if (userAgent.indexOf("Macintosh") === -1 && kony.application.getCurrentBreakpoint() === 1366)
                        currForm.accountListMenu.left = currForm.flxMainWrapper.info.frame.x + (currForm.flxLeftContainer.info.frame.x + currForm.flxLeftContainer.info.frame.width - 266) + "dp";
                    else
                        currForm.accountListMenu.left = currForm.flxMainWrapper.info.frame.x + (currForm.flxLeftContainer.info.frame.x + currForm.flxLeftContainer.info.frame.width - 250) + "dp";
                }

                currForm.accountListMenu.isVisible = true;
                currForm.forceLayout();
            }
        },

        setClickOrigin: function() {
            return;
        },
        imgPressed: function() {
            var currForm = kony.application.getCurrentForm();
            var section = currForm.accountList.segAccounts.selectedRowIndex[0]
            var index = currForm.accountList.segAccounts.selectedRowIndex[1];
            var segmentData = currForm.accountList.segAccounts.data[section][1];
            segmentData[index].toggleFavourite();
        },
        accountPressed: function(context) {
            var currForm = kony.application.getCurrentForm();
            var section = context.sectionIndex; //currForm.accountList.segAccounts.selectedRowIndex[0];
            var index = context.rowIndex; //currForm.accountList.segAccounts.selectedRowIndex[1];
            var segmentData = currForm.accountList.segAccounts.data[section][1];
            segmentData[index].onAccountClick(index);
        }
    };
});