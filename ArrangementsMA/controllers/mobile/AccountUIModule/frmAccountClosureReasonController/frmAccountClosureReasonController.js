define({
    preshow: function() {
      if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
    }
    else{
      this.view.flxHeader.isVisible = false;
    }
        this.setCategoryData();
        this.initActions();
    },
    initActions: function() {
        this.view.customHeader.flxBack.onClick = this.goBack;
        this.view.segClosingReason.onRowClick = this.onCategoryClick;
        this.view.segClosingReason.rowFocusSkin = 'sknFlx7e7e7e';
    },
    goBack: function() {
        var navManager = applicationManager.getNavigationManager();
        navManager.goBack();
    },
    onCategoryClick: function() {
        var navManager = applicationManager.getNavigationManager();
        navManager.setEntryPoint("accountClosureMovement",'frmAccountClosureAck');
        var reason = this.view.segClosingReason.selectedItems[0].lblReason;
        navManager.setCustomInfo("AccountClosureReason", reason);
        navManager.navigateTo({
            "friendlyName": "AccountUIModule/frmAccountClosure",
            "appName": "ArrangementsMA"
        });
    },
    setCategoryData: function() {
        var dataMap = {
            "lblReason": "lblReason"
        };
        //var navManager = applicationManager.getNavigationManager();
        //this.view.segClosingReason.removeAll();
        var data = [];
        var reasons = ['Unhappy with our services', 'Dissatisfied with our product offering', 'Minimum balance or charges are on higher side', 'Other'];
        for (var i = 0; i < reasons.length; i++) {
            var temp = {
                "lblReason": reasons[i]
            };
            data.push(temp);
        }
        this.view.segClosingReason.widgetDataMap = dataMap;
        this.view.segClosingReason.setData(data);
    }
});