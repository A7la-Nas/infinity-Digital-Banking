define(function() {

return {
  isTransfersAndPayEnabled: function () {
    return [
      "INTERNATIONAL_ACCOUNT_FUND_TRANSFER",
      "INTER_BANK_ACCOUNT_FUND_TRANSFER",
      "INTRA_BANK_FUND_TRANSFER",
      "TRANSFER_BETWEEN_OWN_ACCOUNT",
      "P2P"
    ].some(function (permission) {
      return applicationManager.getConfigurationManager().checkUserFeature(permission);
    })
  },
  navigateToBillPay: function () {
    this.view.flxContextualMenu.isVisible = false;
    this.view.btnHamburger.skin="btnHamburgerskn";
    this.view.flxaccounts.skin="slFbox";
    this.view.flxTransfersAndPay.skin="sknFlxFFFFFbrdr3343a8";
    // this.view.flxSeperator3.setVisibility(true);
    this.view.forceLayout();
  },
  showContextualMenu:function()
  {
    //hidePopups(); [ARB-33688]
    var configurationManager = applicationManager.getConfigurationManager();
    if(this.view.flxTransfersAndPay.origin){
      // This is coming from actual click of the widget (Not from outside click)
      // So delegating the hiding to formcontouchend event (Inside PopUtils.js). 
      this.view.flxTransfersAndPay.origin = false; 
      this.view.flxTransfersAndPay.skin="flxHoverSkinPointer";
      this.view.imgLblTransfers.text = "O";
      return;
    }
    if(this.view.flxContextualMenu.isVisible === true)
    {
      this.view.flxTransfersAndPay.skin="flxHoverSkinPointer";
      this.view.flxContextualMenu.isVisible =false;
      this.view.imgLblTransfers.text = "O";
      this.view.forceLayout(); 
    }
    else
    {
      this.view.flxContextualMenu.isVisible =true;
      this.view.flxTransfersAndPay.skin="sknFlxHeaderTransfersSelected";
      this.view.imgLblTransfers.text = "P";
      this.view.parent.parent.parent.flxUserActions.isVisible = false;
      this.view.forceLayout(); 
    }
    this.view.flxPayMultipleBeneficiaries.isVisible = false;
    if (configurationManager.isFastTransferEnabled == "true") {
      if (this.isTransfersAndPayEnabled()) {
        this.view.Label0dcf00103bdba46.text = kony.i18n.getLocalizedString("i18n.hamburger.transfer");
        this.view.Label0dcf00103bdba46.toolTip = kony.i18n.getLocalizedString("i18n.hamburger.transfer");
        this.view.Label0dcf00103bdba46.accessibilityConfig = {
          // "a11yLabel": kony.i18n.getLocalizedString("i18n.hamburger.transfer"),
          a11yARIA: {
            tabindex: -1,
          },
        };
        this.view.CopyLabel0bb648d916e554d.text = kony.i18n.getLocalizedString("i18n.Transfers.TRANSFERACTIVITIES");
        this.view.CopyLabel0bb648d916e554d.toolTip = kony.i18n.getLocalizedString("i18n.Transfers.TRANSFERACTIVITIES");
        this.view.CopyLabel0bb648d916e554d.accessibilityConfig = {
          // "a11yLabel":  kony.i18n.getLocalizedString("i18n.Transfers.TRANSFERACTIVITIES"),
          a11yARIA: {
            tabindex: -1,
          },
        };
        this.view.CopyLabel0a8b12f7002084d.text = kony.i18n.getLocalizedString("i18n.PayAPerson.ManageRecipient");
        this.view.CopyLabel0a8b12f7002084d.toolTip = kony.i18n.getLocalizedString("i18n.PayAPerson.ManageRecipient");
        this.view.CopyLabel0a8b12f7002084d.accessibilityConfig = {
          // "a11yLabel":kony.i18n.getLocalizedString("i18n.PayAPerson.ManageRecipient"),
          a11yARIA: {
            tabindex: -1,
          },
        };
        this.view.CopyLabel0h9e71b8a76ad44.text = kony.i18n.getLocalizedString("i18n.PayAPerson.AddRecipient");
        this.view.CopyLabel0h9e71b8a76ad44.toolTip = kony.i18n.getLocalizedString("i18n.PayAPerson.AddRecipient");
        this.view.CopyLabel0h9e71b8a76ad44.accessibilityConfig = {
          // "a11yLabel": kony.i18n.getLocalizedString("i18n.PayAPerson.AddRecipient"),
          a11yARIA: {
            tabindex: -1,
          },
        };
      }

    }

    else
      this.view.CopyLabel0a8b12f7002084d.toolTip = kony.i18n.getLocalizedString("i18n.p2p.PayAPerson");

    if(configurationManager.getDeploymentGeography() == "EUROPE"){
      this.view.Label0dcf00103bdba46.text = kony.i18n.getLocalizedString("i18n.TransfersEur.MakePayment");
      this.view.Label0dcf00103bdba46.toolTip = kony.i18n.getLocalizedString("i18n.TransfersEur.MakePayment");
      this.view.Label0dcf00103bdba46.accessibilityConfig = {
        // "a11yLabel": kony.i18n.getLocalizedString("i18n.TransfersEur.MakePayment"),
        a11yARIA: {
        tabindex: -1,
        },
      };
      this.view.CopyLabel0bb648d916e554d.text = kony.i18n.getLocalizedString("i18n.TransfersEur.TransferBetweenAccounts");
      this.view.CopyLabel0bb648d916e554d.toolTip =  kony.i18n.getLocalizedString("i18n.TransfersEur.TransferBetweenAccounts");
      this.view.CopyLabel0bb648d916e554d.accessibilityConfig = {
        "a11yLabel": kony.i18n.getLocalizedString("i18n.TransfersEur.TransferBetweenAccounts"),
        a11yARIA: {
        tabindex: -1,
        },
      };
      this.view.CopyLabel0a8b12f7002084d.text = kony.i18n.getLocalizedString("i18n.TransfersEur.ManageBeneficiaries");
      this.view.CopyLabel0a8b12f7002084d.toolTip = kony.i18n.getLocalizedString("i18n.TransfersEur.ManageBeneficiaries");
      this.view.CopyLabel0a8b12f7002084d.accessibilityConfig = {
        "a11yLabel": kony.i18n.getLocalizedString("i18n.TransfersEur.ManageBeneficiaries"),
        a11yARIA: {
        tabindex: -1,
        },
      };
      this.view.CopyLabel0h9e71b8a76ad44.text = kony.i18n.getLocalizedString("i18n.TransfersEur.ManageTransactions");
      this.view.CopyLabel0h9e71b8a76ad44.toolTip = kony.i18n.getLocalizedString("i18n.TransfersEur.ManageTransactions");
      this.view.CopyLabel0h9e71b8a76ad44.accessibilityConfig = {
        "a11yLabel": kony.i18n.getLocalizedString("i18n.TransfersEur.ManageTransactions"),
        a11yARIA: {
        tabindex: -1,
        },
      };
      this.view.lblPayMultipleBeneficiaries.text = kony.i18n.getLocalizedString("i18n.Transfers.PayMultipleBeneficiaries");
      this.view.lblPayMultipleBeneficiaries.toolTip = kony.i18n.getLocalizedString("i18n.Transfers.PayMultipleBeneficiaries");
      this.view.lblPayMultipleBeneficiaries.accessibilityConfig = {
        "a11yLabel": kony.i18n.getLocalizedString("i18n.Transfers.PayMultipleBeneficiaries"),
        a11yARIA: {
        tabindex: -1,
        },
      };
      let accessibleCustomerIds = applicationManager.getUserPreferencesManager().accessibleCustomerIds;
      var isBusiness = false;
      for (var i = 0; i < accessibleCustomerIds.length; i++) {
          if (accessibleCustomerIds[i].type === "business") {
              isBusiness = true;
          }
      }
      if (isBusiness == true) this.view.flxPayMultipleBeneficiaries.isVisible = false;
      else this.view.flxPayMultipleBeneficiaries.isVisible = true;
    }
  },
  navigateToTransfers: function () {
    this.view.flxContextualMenu.isVisible = false;
    this.view.btnHamburger.skin="btnHamburgerskn";
    this.view.flxaccounts.skin="slFbox";
    this.view.flxTransfersAndPay.skin="sknFlxFFFFFbrdr3343a8";
    // this.view.flxSeperator3.setVisibility(true);
    this.view.forceLayout();
  },
  navigatetoAccounts: function () {
    this.view.btnHamburger.skin="btnHamburgerskn";
    this.view.flxaccounts.skin="sknFlxFFFFFbrdr3343a8";
    this.view.flxTransfersAndPay.skin="copyslfbox1";
    // this.view.flxSeperator3.setVisibility(false);
    this.view.forceLayout();
  },
  //    	transferSkin:function(){
  //       if(this.view.flxContextualMenu.isVisible === true){
  //       this.view.flxContextualMenu.isVisible = false;
  //         if(this.view.btnAccounts.skin=="sknBtnTopmenuFocusAccounts")
  //           	this.view.btnTransfers.skin="sknBtnTopmenu2";
  //         else
  //       		this.view.btnTransfers.skin="sknBtnTopmenuFocusTransfers";
  //     }else{
  //       this.view.flxContextualMenu.isVisible = true;
  //       this.view.btnTransfers.skin="sknBtnTopmenuEBEBEBTransfers";
  //     }
  // },

  fixContextualMenu: function () {
    var imgRtl  = kony.i18n.getCurrentLocale();
      if (imgRtl === "ar_AE")
        {
          this.view.btnHamburger.skin = "btnHamburgerRtlskn";
        }
      else
        {
          this.view.btnHamburger.skin = "btnHamburgerskn";
        }
    var configurationManager = applicationManager.getConfigurationManager();
    if(configurationManager.isFastTransferEnabled === "true")
    {
      this.view.imgLblTransfers.left = "45dp";
      var flex_menu_width = 50;
      this.view.btnHamburger.width = flex_menu_width + "dp";
      var flex_accounts_width = 25 + this.view.lblAccounts.frame.width + 70;
      if(kony.application.getCurrentForm().id === "frmEnrollBusiness"){
        this.view.flxaccounts.width = "150px";
      }
      else{
        this.view.flxaccounts.width = flex_accounts_width + "dp";
      }
      var flex_transfers_width = 50 + 50 + 50;
      this.view.flxTransfersAndPay.width = flex_transfers_width + "dp";
      //var left_for_contextual_menu = flex_transfers_width + 1;
      var left_for_contextual_menu = flex_transfers_width;
      left_for_contextual_menu = "-" + left_for_contextual_menu + "dp";
      kony.print("left:" + left_for_contextual_menu);
      this.view.flxContextualMenu.left = left_for_contextual_menu;
      this.view.flxContextualMenu.width = flex_transfers_width + "dp";
      this.view.flxMenusMain.forceLayout();
    }
    else {
      var flex_menu_width = 50;
      var flex_transfers_width;
      this.view.btnHamburger.width = flex_menu_width + "dp";
      var flex_accounts_width = 25 + this.view.lblAccounts.frame.width + 70;
      if(kony.application.getCurrentForm().id === "frmEnrollBusiness"){
        this.view.flxaccounts.width = "150px";
      }
      else{
        this.view.flxaccounts.width = flex_accounts_width + "dp";
      }
      if(configurationManager.getDeploymentGeography() == "EUROPE"){
        flex_transfers_width = 150 + 80;
        this.view.lblTransferAndPay.text = kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentsAndTransfers");
      }else{
        flex_transfers_width = 50 + 50 + 50;
      }
      this.view.flxTransfersAndPay.width = flex_transfers_width + "dp";
      //var left_for_contextual_menu = flex_transfers_width + 1;
      var left_for_contextual_menu = flex_transfers_width;
      left_for_contextual_menu = "-" + left_for_contextual_menu + "dp";
      kony.print("left:" + left_for_contextual_menu);
      this.view.flxContextualMenu.left = left_for_contextual_menu;
      this.view.flxContextualMenu.width = flex_transfers_width + "dp";
      this.view.flxMenusMain.forceLayout();
    }
  }

};
});