define({
    preShow: function(){
        this.view.btnContinue.onClick = this.navigateToAccountClosure;
        this.view.customHeader.flxBack.onClick = this.backToAccountDetails;
        this.view.customHeader.btnRight.onClick = this.backToAccountDetails;
        var navMan = applicationManager.getNavigationManager();
        Msg=navMan.getCustomInfo("statusMessage");
        this.setDataForSegmengt(Msg)
    },
    setDataForSegmengt: function(Msg){
        data = [{
            imgDot: "pageoffdot.png",
            lblDetails: Msg
        }]
        this.view.segDetails.setData(data);
    },
    navigateToAccountClosure: function(){
    var navMan = applicationManager.getNavigationManager();
    navMan.navigateTo({
            "appName": "ArrangementsMA",
            "friendlyName": "AccountUIModule/frmAccountClosure"
        });
    },
    backToAccountDetails: function(){
        var navMan = applicationManager.getNavigationManager();
    navMan.navigateTo({
            "appName": "ArrangementsMA",
            "friendlyName": "AccountUIModule/frmAccountDetails"
        });
    }

});