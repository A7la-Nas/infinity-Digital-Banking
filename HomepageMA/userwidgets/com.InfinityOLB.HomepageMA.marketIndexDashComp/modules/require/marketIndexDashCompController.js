define(['./marketIndexCardDAO','./FormatUtils'],function(marketIndexCardDAO, FormatUtils) {
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._objService="";
      this._objName="";
      this._operation="";
      this.marketIndexCardDAO = new marketIndexCardDAO();
      this._criteria = {};
      this._viewAllBtnStatus = "";
      this._marketIndexPerm = false;
      this._newsDetailsPerm = false;
      this.FormatUtils = new FormatUtils();


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
      defineSetter(this, 'viewAllBtnStatus', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._viewAllBtnStatus = val;
        }
      });
      defineGetter(this, 'viewAllBtnStatus', function () {
        return this._viewAllBtnStatus;
      });
    },
    getCriteria: function(criteria, marketIndexPermission, marketNewsViewDetails){
      this._criteria = criteria;
      this._marketIndexPerm = marketIndexPermission;
      this._newsDetailsPerm = marketNewsViewDetails;
    },
    makeDaoCallMarketIndexCard: function(){
      try{
        let serviceResponseIdentifier = "S1";
        let objectName = this._objName;
        let objectServiceName = this._objService;
        let operationName = this._operation;
        let params = this._criteria;
        this.marketIndexCardDAO.fetchDetails(objectServiceName,operationName,objectName,params,serviceResponseIdentifier,this.onServiceSuccess,this.onError);
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
      this.marketIndexPostShow();
    },	
    preShow:function(){  
      var scope = this;
      if(this._marketIndexPerm === true){
        scope.initActions();
      }
      this.view.flxView.accessibilityConfig = {
        a11yARIA: {
          "role": "link",
          "aria-labelledby": "lblView"
        }
      }
      this.view.lblView.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1
        }
      }
      this.view.lblMarket.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1
        }
      }
      this.view.lblTitle.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1
        }
      }
      this.view.lblValue.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1
        }
      }
      this.view.lblChange.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1
        }
      }
      this.view.CopylblTitle0ef672967b4ee42.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1
        }
      }
      this.view.CopylblValue0c1edac75bf5448.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1
        }
      }
      this.view.CopylblChange0aaa00601b36246.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1
        }
      }
      this.view.CopylblTitle0b7443f112ccb43.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1
        }
      }
      this.view.CopylblValue0idfe1df65b1042.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1
        }
      }
      this.view.CopylblChange0fb3be785321d42.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1
        }
      }
    },
    initActions: function(){
      this.setViewAllBtn();
      this.view.flxView.onClick=this.ViewAllMarketNews;
      var self = this;
      try
      {
        this.makeDaoCallMarketIndexCard();
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
      var data = response.GetSimpleData_Response_2 && response.GetSimpleData_Response_2.SimpleDataResult ? response.GetSimpleData_Response_2.SimpleDataResult.ItemResponse[0].Item : null;
      this.setDataMarket(data);
    },
    setDataMarket: function  (newsDetails) {
      var segData = [];

      var inresult = [];
      var innerdata = {};
      if(newsDetails && newsDetails.length > 0) {
        for (var i in newsDetails) {
          var subArray = [];
          subArray = newsDetails[i].Fields.Field;
          innerdata = {};
          for (var j in subArray) {
            var dt = subArray[j].DataType;
            var value = subArray[j][dt];
            var keyA = subArray[j].Name;

            innerdata[keyA] = value;
          }
          inresult.push(innerdata);
        }
        var storeData;
        for (var list in inresult) {
          var change = inresult[list].CF_NETCHNG;
          var percent = parseFloat(inresult[list].PCTCHNG).toFixed(2);
          var forUtility = applicationManager.getFormatUtilManager();
          var balance = forUtility.formatAmount(inresult[list].CF_LAST);
          if (parseFloat(inresult[list].CF_NETCHNG) < 0) {
            storeData = {
              //marketName: this.FormatUtils.truncateStringWithGivenLength(inresult[list].DSPLY_NAME, 9),
              marketName: {
                "text" : this.FormatUtils.truncateStringWithGivenLength(inresult[list].DSPLY_NAME, 13),
              },
              amount: balance,
              profitLoss: {
                "skin": "sknEE0005SSP13px",
                "text": parseFloat(change).toFixed(2) + " (" + parseFloat(percent).toFixed(2) + "%" + ")"
              },
            }
          } else {
            storeData = {
              //marketName: this.FormatUtils.truncateStringWithGivenLength(inresult[list].DSPLY_NAME, 9),
              marketName: {
                "text" : this.FormatUtils.truncateStringWithGivenLength(inresult[list].DSPLY_NAME, 13),
              },
              amount: balance,
              profitLoss: {
                "skin": "skn2F8523ssp13px",
                "text": "+" + parseFloat(change).toFixed(2) + " (" + "+" + parseFloat(percent).toFixed(2) + "%" + ")"
              },

            }
          }
          segData.push(storeData);
        }
        this.view.lblTitle.text= segData[0].marketName.text;
        this.view.lblChange.text= segData[0].profitLoss.text;
        this.view.lblChange.skin= segData[0].profitLoss.skin;
        this.view.lblValue.text= segData[0].amount;
        this.view.CopylblTitle0ef672967b4ee42.text= segData[1].marketName.text;
        this.view.CopylblChange0aaa00601b36246.text= segData[1].profitLoss.text;
        this.view.CopylblChange0aaa00601b36246.skin= segData[1].profitLoss.skin;
        this.view.CopylblValue0c1edac75bf5448.text= segData[1].amount;
        this.view.CopylblTitle0b7443f112ccb43.text= segData[2].marketName.text;
        this.view.CopylblChange0fb3be785321d42.text= segData[2].profitLoss.text;
        this.view.CopylblChange0fb3be785321d42.skin= segData[2].profitLoss.skin;
        this.view.CopylblValue0idfe1df65b1042.text= segData[2].amount;
      } else {
        this.view.setVisibility(false);
        this.marketIndexPostShow();
      }
    },
    ViewAllMarketNews:function(){  
      let wealthModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WealthPortfolioUIModule", "appName" : "PortfolioManagementMA"}).presentationController;	  
      //let wealthModule = applicationManager.getModulesPresentationController("WealthModule");
      wealthModule.fetchNewsDetails();

    },
    setViewAllBtn: function(){
      if (this._viewAllBtnStatus === "visible" && this._newsDetailsPerm === true) {
        this.view.flxView.setVisibility(true);
      } else {
        this.view.flxView.setVisibility(false);
      }

    }
  };
});