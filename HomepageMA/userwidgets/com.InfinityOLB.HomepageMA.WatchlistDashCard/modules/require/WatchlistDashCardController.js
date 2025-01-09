define(['./watchlistDashCardDAO'],function(watchlistDashCardDAO) {
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._objService="";
      this._objName="";
      this._operation="";
      this.watchlistDashCardDAO = new watchlistDashCardDAO();
      this._criteria = {};
      this._perm = false;

      defineSetter(this, 'objService', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._objService = val;
        }
      });
      defineGetter(this, 'objService', function () {
        return this._objService;
      });

      defineSetter(this, 'objName', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._objName = val;
        }
      });
      defineGetter(this, 'objName', function () {
        return this._objName;
      });
      defineSetter(this, 'operation', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._operation = val;
        }
      });
      defineGetter(this, 'operation', function () {
        return this._operation;
      });
    },
    getCriteria: function(criteria,perm){
      if(criteria !== "") {
        this._criteria = criteria;
        this._perm = perm;
      }
    },
    makeDaoCallWatchlistCard: function(){
      try{
        let serviceResponseIdentifier = "S1";
        let objectName = this._objName;
        let objectServiceName = this._objService;
        let operationName = this._operation;
        //let criteria = this._criteria;
        /* let params = {
                  "customerId": criteria
              };*/
        let params = this._criteria;
        this.watchlistDashCardDAO.fetchDetails(objectServiceName,operationName,objectName,params,serviceResponseIdentifier,this.onServiceSuccess,this.onError);
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in making service call.",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    onServiceSuccess: function(response){
      this.displayResults(response);
    },
    onError: function(errorObj){
      // error fetch
      this.view.setVisibility(false);
      this.watchlistPostShow();
    },	
    preShow:function(){  
      var scope = this;
      if(this._perm === true) {
        scope.initActions();				
        this.view.btnViewAll.onClick = this.viewWatchlist;
      }
      this.view.lblHeader.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1
        }
      }
      this.view.lblNoResults.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1
        }
      }
      this.view.imgNoResults.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1
        }
      }
      this.view.segWatchlist.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1
        }
      }
      this.view.lblLoadingData.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1
        }
      }
    },
    initActions: function(){
      var self = this;
      try
      {
        this.makeDaoCallWatchlistCard();
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the actions to columns.",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    displayResults: function(response){
      var data = response.favoriteInstruments;
      var  watchlistData = [];
      var formUtilityMan = applicationManager.getFormatUtilManager();
      if(data !== undefined) {
        if(data.length === 0 || data === null){
          this.view.flxLoadingData.isVisible = false;
          this.view.btnViewAll.setVisibility(false);
          this.view.flxMyWatchlistWrapper.setVisibility(false);
          this.view.flxNoResults.setVisibility(true);
          this.view.setVisibility(false);
          this.watchlistPostShow();
        } else {
          this.view.flxLoadingData.isVisible = false;
          this.view.flxNoResults.setVisibility(false);
          this.view.btnViewAll.setVisibility(true);
          this.view.flxMyWatchlistWrapper.setVisibility(true);
          for (var list in data) {
            var storeData;
            var perc = data[list].percentageChange;
           if (perc === "") {
                            perc = "";
                        }
            if (!perc.includes("-") && perc !== "0.00" && perc !== "") {
              perc = "+" + perc;
            }

            //var amnt = data[list].askRate !== "" ? formUtilityMan.formatAmount(data[list].askRate) : formUtilityMan.formatAmount(data[list].lastRate);
            var amnt = formUtilityMan.formatAmount(data[list].lastRate);
            var currSymb = formUtilityMan.getCurrencySymbol(data[list].referenceCurrency); 
            var instumentName=this.truncateStringWithGivenLength(data[list].instrumentName,26);
            var exchange = data[list].exchange;
            var isinexchange="";
            if(exchange !== "" && data[list].ISINCode !== ""){
              isinexchange = data[list].ISINCode + "|" + data[list].exchange;
            }
            else if(data[list].ISINCode !== "" && exchange === "" ){
              isinexchange = data[list].ISINCode;
            }
            else if(data[list].ISINCode === "" && exchange !== "")
            {
              isinexchange = data[list].exchange;
            }
			storeData = {
              lblInstruName: instumentName,
              lblISIN: isinexchange,
              lblAmount: amnt,
              lblCurrency: currSymb,
              lblProfit: {
                 "text": perc ?perc + "%" : "",
                "skin":  perc.includes("-") ? "sknEE0005SSP13px" : "skn2F8523ssp13px"
              }
            };
            watchlistData.push(storeData);
          }
          this.view.segWatchlist.widgetDataMap = {
            lblInstruName: "lblInstruName",
            lblISIN: "lblISIN",
            lblAmount: "lblAmount",
            lblCurrency: "lblCurrency",
            lblProfit: "lblProfit"
          };
          this.view.segWatchlist.removeAll();
          this.view.segWatchlist.setData(watchlistData);
          this.view.setVisibility(true);
          this.watchlistPostShow();
        } 
      } else {
        this.view.flxLoadingData.isVisible = false;
        this.view.btnViewAll.setVisibility(false);
        this.view.flxMyWatchlistWrapper.setVisibility(false);
        this.view.flxNoResults.setVisibility(true);
        this.view.setVisibility(false);
        this.watchlistPostShow();
      }
    },
    truncateStringWithGivenLength: function(str, maxLength) {
      str = str || "N/A";
      if (kony.sdk.isNullOrUndefined(maxLength)) {
        return str;
      }
      if (!kony.sdk.isNullOrUndefined(maxLength) && maxLength > str.length) {
        return str;
      }
      var result = str.substring(0, maxLength - 3);
      result = result + "...";
      return result;
    },
    viewWatchlist:function(){
      scope_WealthPresentationController.isFirst = true;
      scope_WealthPresentationController.watchlistFromPortfolio="";
      var wealthModule = applicationManager.getModulesPresentationController({ "moduleName": "WealthPortfolioUIModule", "appName": "PortfolioManagementMA" });
      var accList = wealthModule.getAccountsListObj();
      for(var i=0; i<accList.length; i++) {
        if(accList[i].investmentType !== "Advisory") {
        scope_WealthPresentationController.isInvestmentAccount = true;
        scope_WealthPresentationController.isJointAccount = false;
        }
      }
      new kony.mvc.Navigation({
                "appName": "WealthOrderMA",
                "friendlyName": "frmWatchlist"
            }).navigate();
    }
  };
});