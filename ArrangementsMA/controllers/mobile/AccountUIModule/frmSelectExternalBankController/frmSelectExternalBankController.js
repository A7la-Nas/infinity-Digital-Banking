define({
    init : function(){
       var navManager = applicationManager.getNavigationManager();
       var currentForm=navManager.getCurrentForm();
       applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    },
    setPreshowUiAndActions: function() {
        var loggerManager = applicationManager.getLoggerManager();
        try {
            loggerManager.log("#### start frmSelectExternalBankController : setPreshowUiAndActions ####");
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
                this.view.flxHeader.isVisible = false;
            } else {
                this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
                this.view.flxHeader.isVisible = true;
            }
            var navMan = applicationManager.getNavigationManager();
            var externalBanksData = navMan.getCustomInfo("frmSelectExternalBank");
            this.setBankListToSegment(externalBanksData);
            this.view.tbxSearch.onTouchStart = this.onEditSearchContext;
            this.view.segExternalBankList.onRowClick = this.onSelectionOfExternalBank;
            this.view.tbxSearch.onTextChange = this.displaySearchedBanks;
            this.view.btnCancelSearch.onClick = this.cancelSearch;
            var currentForm = navMan.getCurrentForm();
            applicationManager.getPresentationFormUtility().logFormName(currentForm);
            applicationManager.getPresentationUtility().dismissLoadingScreen();
        } catch (err) {
            loggerManager.log("#### in catch " + JSON.stringify(err) + " ####");
        }
    },
    cancelSearch: function() {
        var loggerManager = applicationManager.getLoggerManager();
        try {
            loggerManager.log("#### start frmSelectExternalBankController : cancelSearch ####");
            if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
                var titleBarAttributes = this.view.titleBarAttributes;
                titleBarAttributes["navigationBarHidden"] = false;
                this.view.titleBarAttributes = titleBarAttributes;
                this.view.flxBody.top = "0dp";
                this.view.tbxSearch.setFocus(false);
            } else {
                this.view.flxBody.top = "56dp";
                this.view.flxHeader.isVisible = true;
            }
            this.view.tbxSearch.right = "20dp";
            this.view.tbxSearch.text = "";
            this.view.btnCancelSearch.isVisible = false;
            var navMan = applicationManager.getNavigationManager();
            var externalBanksData = navMan.getCustomInfo("frmSelectExternalBank");
            this.setBankListToSegment(externalBanksData);
            this.view.forceLayout();
        } catch (err) {
            loggerManager.log("#### in catch " + JSON.stringify(err) + " ####");
        }
    },
    onEditSearchContext: function() {
        var loggerManager = applicationManager.getLoggerManager();
        try {
            loggerManager.log("#### start frmSelectExternalBankController : onEditSearchContext ####");
              this.view.tbxSearch.setFocus(true);
            if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
                var titleBarAttributes = this.view.titleBarAttributes;
                titleBarAttributes["navigationBarHidden"] = true;
                this.view.titleBarAttributes = titleBarAttributes;
                this.view.flxBody.top = "15dp";
            } else {
                this.view.flxHeader.isVisible = false;
                this.view.flxBody.top = "0dp";
            }
            this.view.tbxSearch.right = "76dp";
            this.view.btnCancelSearch.isVisible = true;
            this.view.forceLayout();
        } catch (err) {
            loggerManager.log("#### in catch " + JSON.stringify(err) + " ####");
        }
    },
    setBankListToSegment: function(externalBanksData) {
        var loggerManager = applicationManager.getLoggerManager();
        try {
            loggerManager.log("#### start frmSelectExternalBankController : setBankListToSegment ####");
            this.view.segExternalBankList.widgetDataMap = {
                lblTypeName: "headerName",
                lblBankName: "bankName",
                imgBankLogo: "logo"
            };
            if(externalBanksData.length > 0) {
                this.view.segExternalBankList.isVisible = true;
                this.view.flxNoTransactions.isVisible = false;
            } else {
                this.view.segExternalBankList.isVisible = false;
                this.view.flxNoTransactions.isVisible = true;
            }
            this.view.segExternalBankList.setData(externalBanksData);
            this.view.forceLayout();
        } catch (err) {
            loggerManager.log("#### in catch " + JSON.stringify(err) + " ####");
        }
    },
    searchBanks: function(list, searchString) {
        var loggerManager = applicationManager.getLoggerManager();
        try {
            loggerManager.log("#### start frmSelectExternalBankController : searchBanks ####");
            if (!list || (list === undefined || list.length === 0)) {
                return;
            }
            if (!searchString || (searchString === undefined || searchString.trim() === "")) {
                return;
            }
            var matchingBanks = [];
            var result;
            for (var i in list) {
                for (var j in list[i][1]) {
                    result = (list[0][1][j].bankName.toLowerCase()).search(searchString.toLowerCase());
                    if (result != -1) {
                        matchingBanks.push(list[0][1][j]);
                    }
                }
            }
            return matchingBanks;
        } catch (err) {
            loggerManager.log("#### in catch " + JSON.stringify(err) + " ####");
        }
    },
    displaySearchedBanks: function(textBox) {
        var loggerManager = applicationManager.getLoggerManager();
        try {
            loggerManager.log("#### start frmSelectExternalBankController : displaySearchedBanks ####");
            var searchString = textBox.text;
            var navMan = applicationManager.getNavigationManager();
            var externalBanksData = navMan.getCustomInfo("frmSelectExternalBank");
            var modifiedList;
            if (searchString.trim() === "") {
                this.setBankListToSegment(externalBanksData);
            } else {
                modifiedList = this.searchBanks(externalBanksData, searchString);
                if (!modifiedList || (modifiedList === undefined || modifiedList.length <= 0)) {
                    this.setBankListToSegment([]);
                } else if (modifiedList.length > 0) {
                    this.setBankListToSegment(modifiedList);
                }
            }
        } catch (err) {
            loggerManager.log("#### in catch " + JSON.stringify(err) + " ####");
        }
    },
    onSelectionOfExternalBank: function() {
      var loggerManager = applicationManager.getLoggerManager();
      try{
        loggerManager.log("#### start frmSelectExternalBankController : onSelectionOfExternalBank ####");
        applicationManager.getPresentationUtility().showLoadingScreen();
        var selectedItem = this.view.segExternalBankList.selectedRowItems[0];
        var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('AuthModule');
        authModule.presentationController.launchExternalBankLogin(selectedItem);
      }
      catch(error){
        loggerManager.log("#### in catch " + JSON.stringify(err) + " ####");
      }
    },
    flxBackOnClick:function(){
        var navMan = applicationManager.getNavigationManager();
        navMan.goBack();
    }
});