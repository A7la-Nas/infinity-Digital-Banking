define({
    handleFormIssuanceNavigation: function(data){
        if (data !== null) {
            if (data.Dashboard) {
                return {
                    "friendlyName": "ImportLCUIModule/frmImportLCDashboard",
                    "appName": "TradeFinanceMA"
                };
            } else if (data.Acknowledgement) {
                return {
                    "friendlyName": "ImportLCUIModule/frmImportLCAcknowledgment",
                    "appName": "TradeFinanceMA"
                };
            } 
        }
        return null;
    },
   handleFormAckNavigation: function(data){     
        if (data !== null) {
            if (data.Dashboard) {
                return {
                    "friendlyName": "ImportLCUIModule/frmImportLCDashboard",
                    "appName": "TradeFinanceMA"
                };
            } else if (data.Issuance) {
                return {
                    "friendlyName": "ImportLCUIModule/frmIssuance",
                    "appName": "TradeFinanceMA"
                };
            } 
        }
        return null;
   }
});