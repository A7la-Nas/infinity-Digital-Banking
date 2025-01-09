define(['FormControllerUtility'], function(FormControllerUtility) {
    return {

        menuPressed: function() {
            var currForm = kony.application.getCurrentForm();

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
              hidePopups();
              var segData=currForm.accountList.segAccounts.data;
                segData[section][1][index].flxMenu.accessibilityConfig={
                    "a11yLabel":"Hide List of quick actions for "+segData[section][1][index].lblAccountName.text,
                    "a11yARIA":{
                        "role":"button",
                        "tabindex":0
                    }
            }
            currForm.accountList.segAccounts.setData(segData);	
                var currTop = 0;
                var indexCount = 0;
                var totalCount = 0;

                for (var i = 0; i < section; i++) {
                    if (currForm.accountList.segAccounts.data[i][1][currForm.accountList.segAccounts.data[i][1].length - 1].template === "flxRowTotalAccountsGroupBalance" || currForm.accountList.segAccounts.data[i][1][currForm.accountList.segAccounts.data[i][1].length - 1].template === "flxRowTotalAccountsGroupBalanceMobile") {
                        indexCount += (currForm.accountList.segAccounts.data[i][1].length - 1);
                        totalCount += 1;
                    } else
                        indexCount += (currForm.accountList.segAccounts.data[i][1].length);
                  if(currForm.accountList.segAccounts.data[i][0]["lblDropDown"].text === "O"){
                    indexCount = 0;
                    totalCount = 0;
                  }
                }

                currTop = parseInt(currTop);
                for (var i = 0; i < section; i++) {
                    if (currForm.accountList.segAccounts.data[i][1][currForm.accountList.segAccounts.data[i][1].length - 1].template === "flxRowTotalAccountsGroupBalance" || currForm.accountList.segAccounts.data[i][1][currForm.accountList.segAccounts.data[i][1].length - 1].template === "flxRowTotalAccountsGroupBalanceMobile") {
                        indexCount += (currForm.accountList.segAccounts.data[i][1].length - 1);
                        totalCount += 1;
                    } else indexCount += (currForm.accountList.segAccounts.data[i][1].length);
                    if (currForm.accountList.segAccounts.data[i][0]["lblDropDown"].text === "O") {
                        indexCount = 0;
                        totalCount = 0;
                    }
                }
                currTop = parseInt(currTop);
                if (currBreakpoint === 640 || orientationHandler.isMobile) {
                    currTop+= currForm.flxAccountTypesAndInfo.info.frame.height+ currForm.flxPropertyAndTerm.info.frame.height+ currForm.flxMortgageSummary.info.frame.height+ currForm.flxMortgageInformation.info.frame.height;
                    currTop += ((100 * indexCount) + (70 * totalCount) + (40 * (section + 1)) + (((index + 1) * 100) +20));
                }
                else currTop += ((78 * indexCount) + (115 * totalCount) + (50 * (section + 1)) + (((index + 1) * 78) + 65));
                currForm.forceLayout();
                currForm.accountListMenu.left = "";
                currForm.accountListMenu.right = "20dp";
                currForm.accountListMenu.top = Number(currTop+180) + "dp";
                currForm.accountListMenu.width = "250dp";
                currForm.accountListMenu.isVisible = true;
                currForm.accountListMenu.isVisible = true;
                currForm.forceLayout();
                currForm.accountListMenu.segAccountListActions.setActive(0,-1,"flxAccountTypes");
            }
        },

        setClickOrigin: function() {
            return;
        },
        imgPressed: function(context) {
            var currForm = kony.application.getCurrentForm();
            var section = context.sectionIndex; //currForm.accountList.segAccounts.selectedRowIndex[0];
            var index = context.rowIndex; //currForm.accountList.segAccounts.selectedRowIndex[1];
            var segmentData = context.widgetInfo.data[section][1];
            segmentData[index].toggleFavourite();
        },
        accountPressed: function(context) {
            var currForm = kony.application.getCurrentForm();
            var section = context.sectionIndex; //currForm.accountList.segAccounts.selectedRowIndex[0];
            var index = context.rowIndex; //currForm.accountList.segAccounts.selectedRowIndex[1];
            var segmentData = context.widgetInfo.data[section][1];
            segmentData[index].onAccountClick(index);
        }
    };
});