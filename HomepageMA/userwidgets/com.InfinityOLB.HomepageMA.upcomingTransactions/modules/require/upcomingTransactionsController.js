define(['CommonUtilities'],function(CommonUtilities) {

  return {
    TransactionRetailOrBusinessIdentifer : "unknown",//response key
    isBusinessTransactionFlag : "unknown",//response result 
    isRetailTransactionFlag : "unkown",//response result
    BusinessIdentifierFontChar : "x",//font icon olb_fonts will be the breifcase
    RetailIdentifierFontChar : "u",//font icon olb_fonts will be the person
    orientationHandler : null,
    //this.view.segUpcomingTransactions
    initSegmentData : function (data, orientationHandler2, accounts, dashboardType) {
      this.orientationHandler = orientationHandler2;
      this.resetComponent();
      if(kony.sdk.isNullOrUndefined(dashboardType)) dashboardType = 0;
      if(kony.sdk.isNullOrUndefined(data) || kony.sdk.isNullOrUndefined(accounts) || data.length === 0 || accounts.length === 0 ) this.showNoTransactions();
      else {
        this.view.flxNoTransactionWrapper.isVisible = false;
        this.view.flxUpcomingTransactionWrapper.isVisible = true;
        this.view.btnViewAll.isVisible = (data['Transactions'].length > 8);
        this.view.btnViewAll.onClick = this.viewAllTransactions;
        this.view.btnViewAll.text =kony.i18n.getLocalizedString("i18n.common.viewAll");
        this.setupDataForAccountType(accounts);
        
        if(kony.application.getCurrentBreakpoint() === 640 ||this.orientationHandler.isMobile) { //for mobile
          this.view.segUpcomingTransactions.rowTemplate = "flxUpcomingTransactionsCombinedAccessMobile";
          this.view.segUpcomingTransactions.widgetDataMap = this.getWidgetDataMapMobile();
          var segmentDataMobile = {};
          
          var datax = data;
          if(dashboardType === 0) {
          }
          else if (dashboardType === 1) {
            if(this.personalAccounts.length === 0) this.showNoTransactions();
            datax = this.refineDataforAccounts(data, "0");
          }
          else if(dashboardType === 2) {
            if(this.businessAccounts.length === 0) this.showNoTransactions();
            datax = this.refineDataforAccounts(data, "1");
          }
          
          if(datax.length === 0) this.showNoTransactions();
          segmentDataMobile = this.formatDataMobile(datax);
          this.view.segUpcomingTransactions.setData(segmentDataMobile);
        }
        else { //for desktop and tablet
          this.view.segUpcomingTransactions.rowTemplate = "flxUpcomingTransactionsCombinedAccess";
          this.view.segUpcomingTransactions.widgetDataMap = this.getWidgetDataMap();
          var segmentData = {};
          
          var datay = data.Transactions;
          if(dashboardType === 0) {
          }
          else if (dashboardType === 1) {
            if(this.personalAccounts.length === 0) this.showNoTransactions();
            datay = this.refineDataforAccounts(data, "0");
          }
          else if(dashboardType === 2) {
            if(this.businessAccounts.length === 0) this.showNoTransactions();
            datay = this.refineDataforAccounts(data, "1");
          }
          
          if(datay.length === 0) this.showNoTransactions();
          segmentData = this.formatData(datay);
          this.view.segUpcomingTransactions.setData(segmentData);
        }
        if(data.Transactions.length === 0) 
          this.showNoTransactions();
        else 
          this.view.flxUpcomingTransactionWrapper.setVisibility(true);
      }
    },
    
    setupDataForAccountType: function (accounts) {
      var businessAccountList = [];
      var personalAccountList = [];
      var len = accounts.length;
      var i;
      var self = this;
      
      for(i = 0; i < len; i++) {
        if(accounts[i]["isBusinessAccount"] === "true")
          businessAccountList.push(CommonUtilities.cloneJSON(accounts[i]["accountID"]));
        else
          personalAccountList.push(CommonUtilities.cloneJSON(accounts[i]["accountID"]));
      }
      
      self.businessAccounts = CommonUtilities.cloneJSON(businessAccountList);
      self.personalAccounts = CommonUtilities.cloneJSON(personalAccountList);
    },

    showNoTransactions : function () {
      this.view.flxUpcomingTransactionWrapper.isVisible = false;
      this.view.flxNoTransactionWrapper.isVisible = true;
      this.view.imgInfo.src = "info_large.png";
      this.view.rtxNoPaymentMessage.text = kony.i18n.getLocalizedString("i18n.AccountsLanding.NoTransactionsScheduled");
    },

    resetComponent : function () {
      this.view.flxSeparator.isVisible = false;
      this.view.flxNoTransactionWrapper.isVisible = false;
      this.view.flxUpcomingTransactionWrapper.isVisible = false;
      this.view.flxSeparatorUpcomingTransactions.isVisible = true;
      this.view.flxHeader.isVisible = true;
      this.view.lblHeader.isVisible = true;
      this.view.lblHeader.text = kony.i18n.getLocalizedString("i18n.Accounts.upComingTransactions");
      this.view.btnViewAll.isVisible = false;
    },

    getWidgetDataMap : function() {
      var widgetDataMap  = {
        "flxLeft": "flxLeft",
        "flxMidSeperatorFull": "flxMidSeperatorFull",
        "flxMidSeperatorHalf": "flxMidSeperatorHalf",
        "flxRight": "flxRight",
        "flxSeperatorl": "flxSeperatorl",
        "flxSeperatorr": "flxSeperatorr",
        "flxTranTypel": "flxTranTypel",
        "flxTranTyper": "flxTranTyper",
        "flxUpcomingTransactionsCombinedAccess": "flxUpcomingTransactionsCombinedAccess",
        "lblAmountl": "lblAmountl",
        "lblAmountr": "lblAmountr",
        "lblDatel": "lblDatel",
        "lblDater": "lblDater",
        "lblSeparatorfull": "lblSeparatorfull",
        "lblSeparatorhalf": "lblSeparatorhalf",
        "lblSepratorl": "lblSepratorl",
        "lblSepratorr": "lblSepratorr",
        "lblToValuel": "lblToValuel",
        "lblToValuer": "lblToValuer",
        "lblTol": "lblTol",
        "lblTor": "lblTor",
        "lblTranTypeIconl": "lblTranTypeIconl",
        "lblTranTypeIconr": "lblTranTypeIconr",
        "lblTranTypel": "lblTranTypel",
        "lblTranTyper": "lblTranTyper",
        "lblfull": "lblfull",
        "lblhalf": "lblhalf"
      };
      return widgetDataMap;
    },

    getWidgetDataMapMobile : function() {
      var widgetDataMap  = {
        "flxLeft": "flxLeft",
        "flxMidSeperatorFull": "flxMidSeperatorFull",
        "flxMidSeperatorHalf": "flxMidSeperatorHalf",
        "flxSeperatorl": "flxSeperatorl",
        "flxTranTypel": "flxTranTypel",
        "flxUpcomingTransactionsCombinedAccessMobile": "flxUpcomingTransactionsCombinedAccessMobile",
        "lblAmountl": "lblAmountl",
        "lblDatel": "lblDatel",
        "lblSeparatorfull": "lblSeparatorfull",
        "lblSeparatorhalf": "lblSeparatorhalf",
        "lblSepratorl": "lblSepratorl",
        "lblToValuel": "lblToValuel",
        "lblTol": "lblTol",
        "lblTranTypeIconl": "lblTranTypeIconl",
        "lblTranTypel": "lblTranTypel",
        "lblfull": "lblfull",
        "lblhalf": "lblhalf"
      };
      return widgetDataMap;
    },

    formatData : function(data) {
      var isCombinedUser = applicationManager.getConfigurationManager().getConfigurationValue('isCombinedUser') === "true";
      //data = data.Transactions;
      var len = data.length;
      if(len>8) len = 8;

      var rows = Math.ceil(len/2);
      var isEvenRows = (len/2 === rows);
      var res = [];

      for(i = 0; i < rows; i++){
        var isLastRow = (i === (rows-1));
        var leftDataIndex = i*2;
        var leftData = data[leftDataIndex];

        if((isLastRow && isEvenRows) || !isLastRow) {
          var rightDataIndex = leftDataIndex + 1;
          var rightData = data[rightDataIndex];
          var dual = {
            "flxLeft": {
              "onClick" : this.onClickForLeftRows.bind(this)
            },
            "flxRight": {
              "onClick" : this.onClickForRightRows.bind(this)
            },
            "flxMidSeperatorFull": {
              "isVisible" : (i === 0)? false : true
            },
            "flxMidSeperatorHalf": {
              "isVisible" : (i === 0)? true : false
            },
            "lblfull": {
              "text" : " ",
              "isVisible" : (i === 0)? false : true
            },
            "lblhalf": {
              "text" : " ",
              "isVisible" : (i === 0)? true : false
            },
            "flxSeperatorl": {
              "isVisible" : true,
            },
            "flxSeperatorr": {
              "isVisible" : true,
            }, 
            "lblAmountl": {
              "text" : CommonUtilities.formatCurrencyWithCommas(leftData["amount"],false,leftData["currencyCode"])
            },
            "lblAmountr": {
              "text" : CommonUtilities.formatCurrencyWithCommas(rightData["amount"],false,rightData["currencyCode"])
            },
            "lblDatel": {
              "text" : CommonUtilities.getFrontendDateString(leftData["scheduledDate"])
            },
            "lblDater": {
              "text" : CommonUtilities.getFrontendDateString(rightData["scheduledDate"])
            },
            "lblToValuel": {
              "text" : leftData["transactionType"] === "BillPay" ? leftData["payPersonName"] || leftData["payeeNickName"] || leftData["payeeName"] || leftData["toAccountName"] || leftData["description"].substring(12) : leftData["payPersonName"] || leftData["payeeNickName"] || leftData["payeeName"] || leftData["toAccountName"] || "N/A",
            },
            "lblToValuer": {
              "text" : rightData["transactionType"] === "BillPay" ? rightData["payPersonName"] || rightData["payeeNickName"] || rightData["payeeName"] || rightData["toAccountName"] || rightData["description"].substring(12) : rightData["payPersonName"] || rightData["payeeNickName"] || rightData["payeeName"] || rightData["toAccountName"] || "N/A",
            },
            "lblTol": {
              "text" : kony.i18n.getLocalizedString("i18n.transfers.lblTo") + ":"
            },
            "lblTor": {
              "text" : kony.i18n.getLocalizedString("i18n.transfers.lblTo") + ":"
            },
            "lblTranTypeIconl": {
              "skin" : "sknLblOLBFontIcons003E7512pxbordere3e3e3",
              "text" : this.getTransactionTypeIcon(leftData),
              "isVisible" : isCombinedUser ? true : false
            },
            "lblTranTypeIconr": {
              "skin" : "sknLblOLBFontIcons003E7512pxbordere3e3e3",
              "text" : this.getTransactionTypeIcon(rightData),
              "isVisible" : isCombinedUser ? true : false
            },
            "lblTranTypel": {
              "text" : this.getTransactionType(leftData["transactionType"])
            },
            "lblTranTyper": {
              "text" : this.getTransactionType(rightData["transactionType"])
            },
            "lblSepratorr" : {
              "text" : "a"
            },
            "lblSepratorl" : {
              "text" : "a"
            }
          };

          if (i === 0) {
                        dual["lblSeparatorhalf"] = {
                            text: "a"
                        };
                        dual["lblSeparatorfull"] = {
                            isVisible: false
                        }
                    } else {
                        dual["lblSeparatorfull"] = {
                            text: "a"
                        };
                        dual["lblSeparatorhalf"] = {
                            isVisible: false
                        };
                    }

          res[i] = dual;//cloneJSON(dual);
        }
        else {
          var single = {
            "flxLeft": {
              "onClick" : this.onClickForLeftRows.bind(this)
            },
            "flxRight": {
              "isVisible" : false
            },
            "flxMidSeperatorFull": {
              "isVisible" : (i === 0)? false : true
            },
            "flxSeperatorl": {
              "isVisible" : true,
            },
            "lblAmountl": {
              "text" : CommonUtilities.formatCurrencyWithCommas(leftData["amount"],false,leftData["currencyCode"])
            },
            "lblDatel": {
              "text" : CommonUtilities.getFrontendDateString(leftData["scheduledDate"])
            },
            "lblTol": {
              "text" : kony.i18n.getLocalizedString("i18n.transfers.lblTo") + ":"
            },
            "lblTranTypeIconl": {
              text : this.getTransactionTypeIcon(leftData),
              "isVisible" : isCombinedUser ? true : false
            },
            "lblTranTypel": {
              text : this.getTransactionType(leftData["transactionType"])
            },
            "lblToValuel": {
              "text" : leftData["transactionType"] === "BillPay" ? leftData["payPersonName"] || leftData["payeeNickName"] || leftData["payeeName"] || leftData["toAccountName"] || leftData["description"].substring(12) : leftData["payPersonName"] || leftData["payeeNickName"] || leftData["payeeName"] || leftData["toAccountName"] || "N/A"
            },
            "flxMidSeperatorHalf": {
              "isVisible" : (i === 0)? true : false
            },
            "lblfull" : {
              "text" : " ",
              "isVisible" : (i === 0)? false : true
            },
            "lblhalf" : {
              "text" : " ",
              "isVisible" : (i === 0)? true : false
            },
            "lblSepratorl" : {
              "text" : "a"
            }
          };

         if (i === 0) {
                        single["lblSeparatorhalf"] = {
                            text: "a"
                        };
                        single["lblSeparatorfull"] = {
                            isVisible: false
                        }
                    } else {
                        single["lblSeparatorfull"] = {
                            text: "a"
                        };
                        single["lblSeparatorhalf"] = {
                            isVisible: false
                        };
                    }

          res[i] = single;//cloneJSON(single);
        }
      }

      return res;
    },

    getTransactionType : function(type) {
      if(kony.sdk.isNullOrUndefined(type)) return "";
      switch(type) {
        case "InternalTransfer"                                                               : return (kony.i18n.getLocalizedString("i18n.Transactions.displayInternalTransfer"));
        case "BillPay"                                                                        : return (kony.i18n.getLocalizedString("i18n.Transactions.displayBillPay"));
        case "P2P"                                                                            : return (kony.i18n.getLocalizedString("i18n.Transactions.displayP2P"));
        case kony.i18n.getLocalizedString("i18n.Transactions.backendWithdrawal")              : return (kony.i18n.getLocalizedString("i18n.Transactions.displayWithdrawal"));
        case kony.i18n.getLocalizedString("i18n.Transactions.backendRequest")                 : return (kony.i18n.getLocalizedString("i18n.Transactions.displayRequest"));
        case kony.i18n.getLocalizedString("i18n.Transactions.backendWire")                    : return (kony.i18n.getLocalizedString("i18n.Transactions.displayWire"));
        case kony.i18n.getLocalizedString("i18n.Transactions.backendReceivedP2P")             : return (kony.i18n.getLocalizedString("i18n.Transactions.displayReceivedP2P"));
        case kony.i18n.getLocalizedString("i18n.Transactions.backendLoan")                    : return (kony.i18n.getLocalizedString("i18n.Transactions.displayLoan"));
        case kony.i18n.getLocalizedString("i18n.Transactions.backendInternetTransaction")     : return (kony.i18n.getLocalizedString("i18n.Transactions.displayInternetTransaction"));
        case kony.i18n.getLocalizedString("i18n.Transactions.backendDeposit")                 : return (kony.i18n.getLocalizedString("i18n.Transactions.displayDeposit"));
        case kony.i18n.getLocalizedString("i18n.Transactions.backendCardless")                : return (kony.i18n.getLocalizedString("i18n.Transactions.displayCardless"));
        case kony.i18n.getLocalizedString("i18n.Transactions.backendExternalTransfer")        : return (kony.i18n.getLocalizedString("i18n.Transactions.displayExternalTransfer"));
        case kony.i18n.getLocalizedString("i18n.Transactions.backendCheckWithdrawal")         : return (kony.i18n.getLocalizedString("i18n.Transactions.displayCheckWithdrawal"));
        case kony.i18n.getLocalizedString("i18n.Transactions.backendInterest")                : return (kony.i18n.getLocalizedString("i18n.Transactions.displayInterest"));
        case kony.i18n.getLocalizedString("i18n.Transactions.backendReceivedRequest")         : return (kony.i18n.getLocalizedString("i18n.Transactions.displayReceivedRequest"));
        case kony.i18n.getLocalizedString("i18n.Transactions.backendStopCheckPaymentRequest") : return (kony.i18n.getLocalizedString("i18n.Transactions.displayStopCheckPaymentRequest"));
        case "Tax"                                                                            : return "Tax";
        case "Fee"                                                                            : return "Fee"; 
        case ""                                                                               : return "";
      }
      return type;
    },

    getTransactionTypeIcon : function(type) {
      
      var data2Check = type["isBusinessPayee"];
      
      if(kony.sdk.isNullOrUndefined(data2Check) || data2Check === "1") {
        return "r";
      }
      else {
        return "s";
      }
      
    },

    onClickForLeftRows : function(context) {
      return context;
    },

    onClickForRightRows : function(context) {
      return context;
    },

    viewAllTransactions : function() {
      return;
    },
    
    refineDataforAccounts : function(data2refine, isBusinessPayee) {
      var len = data2refine.length;
      var res = [];
      
      for(i = 0; i < len; i++) {
        if(isBusinessPayee === data2refine[i]["isBusinessPayee"]) {
          res.push(data2refine[i]);
        }
      }
      return res;
    },

    formatDataMobile : function(data) {
      var isCombinedUser = applicationManager.getConfigurationManager().getConfigurationValue('isCombinedUser') === "true";
      var len = data.Transactions.length;
      if(len>8) len = 8;
      var res = [];
      var i = 0;
      for(i = 0; i < len; i++){
        var leftData = data.Transactions[i];
        var single = {
          "flxLeft": {
            "onClick" : this.onClickForLeftRows.bind(this)
          },
          "lblAmountl": {
            "text" : CommonUtilities.formatCurrencyWithCommas(leftData["amount"],false,leftData["currencyCode"])
          },
          "lblDatel": {
            "text" : CommonUtilities.getFrontendDateString(leftData["scheduledDate"])
          },
          "lblTol": {
            "text" : kony.i18n.getLocalizedString("i18n.transfers.lblTo") + ":"
          },
          "lblTranTypeIconl": {
            text : this.getTransactionTypeIcon(leftData),
			"isVisible" : isCombinedUser ? true : false
          },
          "lblTranTypel": {
            text : this.getTransactionType(leftData["transactionType"])
          },
          "lblToValuel": {
            "text" : leftData["transactionType"] === "BillPay" ? leftData["payPersonName"] || leftData["payeeNickName"] || leftData["payeeName"] || leftData["toAccountName"] || leftData["description"].substring(12) : leftData["payPersonName"] || leftData["payeeNickName"] || leftData["payeeName"] || leftData["toAccountName"] || "N/A"
          },
          "flxMidSeperatorHalf": {
            "isVisible" : (i === 0)? true : false
          },
          "lblSepratorl" : {
            "isVisible" : (i === (len-1))? true : false,
            "text" : "a"
          },
          "flxSeperatorl": {
            "isVisible" : (i === (len-1))? true : false,
          },
        };

        res[i] = single;
      }
      return res;
    },

  };
});