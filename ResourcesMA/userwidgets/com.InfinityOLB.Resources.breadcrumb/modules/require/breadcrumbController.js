define(function() {

	return {
      postShow:function(){
        str = kony.i18n.getCurrentLocale();
        if(str === "ar_AE"){
          this.view.imgBreadcrumb.src = "breadcrumb_icon_rtl.png";
	          this.view.imgBreadcrumb2.src = "breadcrumb_icon_rtl.png";
        }
        else{
          this.view.imgBreadcrumb.src = "breadcrumb_icon.png";
          this.view.imgBreadcrumb2.src = "breadcrumb_icon.png";
        }
       },

      navigateForm:function(){
       var value=this.view.btnBreadcrumb1.text;
       var navObj;
        if(value==kony.i18n.getLocalizedString("i18n.hamburger.transfers"))
         {
           applicationManager.getModulesPresentationController("TransferModule").showTransferScreen();
         }
        else if(value==kony.i18n.getLocalizedString("i18n.billPay.BillPay"))
          {
           var billPayModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPayModule");
           billPayModule.presentationController.showBillPayData();
          }
        else if(value==kony.i18n.getLocalizedString("i18n.topmenu.accounts"))
          {
           var accountModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountsModule");
		   accountModule.presentationController.showAccountsDashboard();
          }
		  else if(value== "ALERTS & MESSAGES")
          {
           var alertsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AlertsMsgsModule");
           alertsModule.presentationController.showAlertsPage();
          }
          else if(value== kony.i18n.getLocalizedString("i18n.transfers.wireTransfer"))
          {
            var WireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("WireTransferModule");
            WireTransferModule.presentationController.showWireTransfer();
          }
        else 
          {
            //no action 
          }
      },
      
//       [{text:"TRANSFERS", callback: function () {}}, {text:"MAKE TRANSFER", callback: function () {}}, {text:"RECENT"}]
      setBreadcrumbData: function (data) {
          this.view.btnBreadcrumb1.text = data[0].text;
          this.view.btnBreadcrumb1.toolTip = data[0].text;
          this.view.btnBreadcrumb1.accessibilityConfig = {
            "a11yLabel": data[0].text,
            "a11yARIA": {
              "role": "button"
            }
          }
          if(data[0].callback !== undefined) {
            this.view.btnBreadcrumb1.onClick = data[0].callback;
          }
          if(data[1].callback === undefined){
            this.view.lblBreadcrumb2.setVisibility(true);
            this.view.lblBreadcrumb2.text=data[1].text;
            this.view.lblBreadcrumb2.toolTip=data[1].text;
            this.view.btnBreadcrumb2.setVisibility(false);
            this.view.lblBreadcrumb2.accessibilityConfig = {
              "a11yLabel": data[1].text
            }
          }
          else{
            this.view.lblBreadcrumb2.setVisibility(false);
            this.view.btnBreadcrumb2.setVisibility(true);
            this.view.btnBreadcrumb2.text=data[1].text;
            this.view.btnBreadcrumb2.toolTip=data[1].text;
            this.view.btnBreadcrumb2.onClick = data[1].callback;
            this.view.btnBreadcrumb2.accessibilityConfig = {
              "a11yLabel": data[1].text,
              "a11yARIA": {
                "role": "button"
              }
            }
          }
        
          if(data.length > 2) {
            this.view.imgBreadcrumb2.setVisibility(true);
            this.view.lblBreadcrumb3.setVisibility(true);
            this.view.lblBreadcrumb3.text = data[2].text;
            this.view.lblBreadcrumb3.toolTip = data[2].text;
            this.view.lblBreadcrumb3.accessibilityConfig = {
              "a11yLabel": data[2].text
            }
          } else{
            this.view.imgBreadcrumb2.setVisibility(false);
            this.view.lblBreadcrumb3.setVisibility(false);
          }
      }
	};
});