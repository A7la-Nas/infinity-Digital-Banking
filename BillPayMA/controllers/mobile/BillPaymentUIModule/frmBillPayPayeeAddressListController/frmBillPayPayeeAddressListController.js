define({
    preShow: function() {
        if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
            this.view.flxHeader.isVisible = false;
        }
        this.initActions();
    },
    initActions: function() {
        var scope = this;
      this.view.customHeader.flxBack.onClick = function() {
        var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPayModule");
        billPayMod.presentationController.commonFunctionForNavigation("frmBillPaySearchPayee");
      }
      this.view.customHeader.btnRight.onClick = function() {
        var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPayModule");
        billPayMod.presentationController.commonFunctionForNavigation("frmBillPay");
      }
      this.view.segAddresses.onRowClick = function(){
        var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPayModule");
        billPayMod.presentationController.commonFunctionForNavigation("frmBillPayEnterAccNo");
      }
      this.view.flxAddManually.onClick = function(){
        var ntf = new kony.mvc.Navigation("frmBillPayEditName");
        ntf.navigate("addManually");
      }
        this.view.tbxSearch.onTouchStart = this.showSearch;
        this.view.customSearchbox.btnCancel.onClick = this.showSearch;
    },
    showSearch: function() {
      var scope = this;
        if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
            if (this.view.flxHeaderSearchbox.isVisible === true) {
                this.view.flxHeaderSearchbox.isVisible = false;
                this.view.flxSearch.isVisible = true;
              	this.view.flxMainContainer.skin="slfSbox";
                this.view.flxMainContainer.top = "56dp";
            } else {
                this.view.flxSearch.isVisible = false;
                this.view.flxMainContainer.top = "40dp";
              this.view.flxMainContainer.skin="slFSbox0gff85612494c44Tab";
                this.view.flxHeaderSearchbox.isVisible = true;
              //  this.view.customSearchbox.tbxSearch.setFocus(true);
              kony.timer.schedule("timerId", function() {
                           scope.view.customSearchbox.tbxSearch.setFocus(true);
                           }, 0.2, false);
            }
        } else {
            if (this.view.flxHeaderSearchbox.isVisible === true) {
                this.view.flxHeaderSearchbox.isVisible = false;
                this.view.flxSearch.isVisible = true;
              this.view.flxMainContainer.skin="slfSbox";
                this.view.flxHeader.isVisible = true;
                this.view.flxMainContainer.top = "56dp";
            } else {
                this.view.flxSearch.isVisible = false;
                this.view.flxHeader.isVisible = false;
              this.view.flxMainContainer.skin="slFSbox0gff85612494c44Tab";
                this.view.flxMainContainer.top = "40dp";
                this.view.flxHeaderSearchbox.isVisible = true;
              kony.timer.schedule("timerId", function() {
                           scope.view.customSearchbox.tbxSearch.setFocus(true);
                           }, 0.2, false);
               // this.view.customSearchbox.tbxSearch.setFocus(true);
            }
        }
    }
});