define(['./marketNewsCardDAO', 'CommonUtilities'],function(marketNewsCardDAO, CommonUtilities) {
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._objService="";
      this._objName="";
      this._operation="";
      this.marketNewsCardDAO = new marketNewsCardDAO();
      this._criteria = {};
      this._viewAllBtnStatus = "";
      this._headerLabel = "";
      this._skinHeading = "";
      this._topNewsPerm = false;
      this._newsDetailsPerm = false;

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
      defineSetter(this, 'headerLabel', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._headerLabel = val;
        }
      });
      defineGetter(this, 'headerLabel', function () {
        return this._headerLabel;
      });
       defineSetter(this, 'skinHeading', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._skinHeading = val;
        }
      });
      defineGetter(this, 'skinHeading', function () {
        return this._skinHeading;
      });
      
    },
    getCriteria: function(criteria, marketTopNewsPermission, marketNewsViewDetails, flag){
      this._topNewsPerm = marketTopNewsPermission;
      this._newsDetailsPerm = marketNewsViewDetails;
      this._criteria = criteria;
      if(flag){
        this.preShow();
      }
    },
    makeDaoCallMarketNewsCard: function(){
      try{
        let serviceResponseIdentifier = "S1";
        let objectName = this._objName;
        let objectServiceName = this._objService;
        let operationName = this._operation;
        let params = this._criteria;
        this.marketNewsCardDAO.fetchDetails(objectServiceName,operationName,objectName,params,serviceResponseIdentifier,this.onServiceSuccess,this.onError);
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
      this.marketNewsPostShow();
    },	
    preShow:function(){  
      var scope = this;
      if(this._topNewsPerm === true) {
         scope.initActions();
      }
      this.view.flxViewAll.accessibilityConfig = {
        a11yARIA: {
          "role": "link",
          "aria-labelledby": "lblViewAll"
        }
      }
      this.view.lblViewAll.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1
        }
      }
      this.view.lblHead.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1
        }
      }
      this.view.segNews.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1
        }
      }
      this.view.lblNoResults.accessibilityConfig = {
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
      this.setViewAllBtn();
      this.view.flxViewAll.onClick=this.ViewAllMarketNews;
      this.view.lblHead.text = kony.i18n.getLocalizedString(this._headerLabel);
      this.view.flxSegHeading.skin = this._skinHeading;
      
      var self = this;
      
      try
      {
        this.makeDaoCallMarketNewsCard();
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
      this.loadMarketNews(response);
    },
	getTimeDiference : function (date) {
        var yyyy = date.substring(0, 4);
        var mon = date.substring(4, 6);
        var dd = date.substring(6, 8);
        var hh = date.substring(8, 10);
        var mm = date.substring(10, 12);
        var ss = date.substring(12);
        var date1 = new Date(yyyy, parseInt(mon, 10) - 1, dd, hh, mm, ss);
        var date1_ms = date1.getTime();
        var dateTemp = new Date();
        var utcDate = dateTemp.getUTCDate();
        var utcMonth = dateTemp.getUTCMonth();
        var utcYear = dateTemp.getUTCFullYear();
        var utcHour = dateTemp.getUTCHours();
        var utcMins = dateTemp.getUTCMinutes();
        var utcSecs = dateTemp.getUTCSeconds();
        var date2 = new Date(utcYear, utcMonth, utcDate, utcHour, utcMins, utcSecs);
        var date2_ms = date2.getTime();
        var difference_ms = date2_ms - date1_ms;

        var one_year = 365 * 1000 * 60 * 60 * 24;
        var one_month = 30 * 1000 * 60 * 60 * 24;
        var one_day = 1000 * 60 * 60 * 24;
        var one_hour = 1000 * 60 * 60;
        var one_min = 1000 * 60;
        var one_sec = 1000;

        var timeDiff = kony.i18n.getLocalizedString("i18n.wealth.time.justNow");

        var yearDiff = difference_ms / one_year;
        var monthDiff = difference_ms / one_month;
        var daysDiff = difference_ms / one_day;
        var hoursDiff = difference_ms / one_hour;
        var minutesDiff = difference_ms / one_min;
        var secondsDiff = difference_ms / one_sec;

        if (Math.floor(yearDiff) > 0) {

            if (Math.floor(yearDiff) == 1) {
                timeDiff = kony.i18n.getLocalizedString("i18n.wealth.time.year");
            } else {
                timeDiff = kony.i18n.getLocalizedString("i18n.wealth.time.years");
            }

            return Math.floor(yearDiff) + " " + timeDiff + " " + kony.i18n.getLocalizedString("i18n.wealth.ago");
        } else if (Math.floor(monthDiff) > 0) {

            if (Math.floor(monthDiff) == 1) {
                timeDiff = kony.i18n.getLocalizedString("i18n.wealth.time.month");
            } else {
                  timeDiff = kony.i18n.getLocalizedString("i18n.wealth.time.months");
            }

            return Math.floor(monthDiff) + " " + timeDiff + " " + kony.i18n.getLocalizedString("i18n.wealth.ago");
        } else if (Math.floor(daysDiff) > 0) {

            if (Math.floor(daysDiff) == 1) {
                timeDiff = kony.i18n.getLocalizedString("i18n.wealth.time.day");
            } else {
                timeDiff = kony.i18n.getLocalizedString("i18n.wealth.time.days");
            }

            return Math.floor(daysDiff) + " " + timeDiff + " " + kony.i18n.getLocalizedString("i18n.wealth.ago");
        } else if (Math.floor(hoursDiff) > 0) {

            if (Math.floor(hoursDiff) == 1) {
                timeDiff = kony.i18n.getLocalizedString("i18n.wealth.time.hour");
            } else {
                timeDiff = kony.i18n.getLocalizedString("i18n.wealth.time.hours");
            }

            return Math.floor(hoursDiff) + " " + timeDiff + " " + kony.i18n.getLocalizedString("i18n.wealth.ago");
        } else if (Math.floor(minutesDiff) > 0) {
            timeDiff = "min";
            return Math.floor(minutesDiff) + " " + timeDiff + " " + kony.i18n.getLocalizedString("i18n.wealth.ago");
        } else if (Math.floor(secondsDiff) > 0) {

            if (Math.floor(secondsDiff) == 1) {
                timeDiff = kony.i18n.getLocalizedString("i18n.wealth.time.second");
            } else {
                timeDiff = kony.i18n.getLocalizedString("i18n.wealth.time.seconds");
            }

            return Math.floor(secondsDiff) + " " + timeDiff + " " + kony.i18n.getLocalizedString("i18n.wealth.ago");
        }

        return timeDiff;
    },
    loadMarketNews: function(response){
	  let self = this;
      let newsList;
      var segStockNewsData = [];

      if(response.status !== "Failure"){

        newsList = (response.GetSummaryByTopic_Response_1!== undefined)?(response.GetSummaryByTopic_Response_1.StoryMLResponse.STORYML.HL):(response.stockNews);
          
      } else {
        newsList = "";
      }

      if(newsList !== undefined && newsList.length > 0) {
		this.view.flxLoadingData.isVisible = false;
        this.view.flxNoResults.setVisibility(false);
        this.view.flxSeg.setVisibility(true);
        if(this._viewAllBtnStatus === "visible") {
          this.view.flxViewAll.setVisibility(true);
        }
        this.view.setVisibility(true);
		newsList.sort();
        newsList.forEach(function (newsItem) {
          var convertDateToString = (response.GetSummaryByTopic_Response_1!== undefined)?(newsItem["LT"].replace(/\D/g,'')):(newsItem["RT"].replace(/\D/g,''));
			if(kony.application.getCurrentBreakpoint()==1024){
              var temp= newsItem["HT"];
              if(65<temp.length){
                temp= temp.substring(0, 65);
                temp = temp+"...";
              }
            segStockNewsData.push({
            "lblName": newsItem["PR"],
            "lblContent":temp,
            "lblTime": {'text':self.getTimeDiference(convertDateToString.substring(0,14)), 'right': "10Dp"}
          });
               }
          else{
            var tempp= newsItem["HT"];
            if(65<tempp.length){
              tempp= tempp.substring(0, 65);
              tempp = tempp+"...";
            }
          segStockNewsData.push({
            "lblName": newsItem["PR"],
            "lblContent": tempp,
            "lblTime":  {'text':self.getTimeDiference(convertDateToString.substring(0,14)), 'right': "0Dp"}
          });
          }
        });
        this.view.segNews.widgetDataMap = {
          "lblName": "lblName",
          "lblContent": "lblContent",
          "lblTime": "lblTime"
        };
        this.view.segNews.setData(segStockNewsData);
      }
      else {
        this.view.flxLoadingData.isVisible = false;
        this.view.flxNoResults.setVisibility(true);
        this.view.flxSeg.setVisibility(false);
        this.view.flxViewAll.setVisibility(false);
        this.view.setVisibility(false);
        this.marketNewsPostShow();
      }
      this.view.forceLayout();
      var currForm = kony.application.getCurrentForm();
      currForm.forceLayout();
    },
    ViewAllMarketNews:function(){      
      let wealthModule = applicationManager.getModulesPresentationController("WealthModule");
      wealthModule.fetchNewsDetails();

    },
    setViewAllBtn: function(){
      if (this._viewAllBtnStatus === "visible" && this._newsDetailsPerm === true) {
        this.view.flxViewAll.setVisibility(true);
		this.view.flxSeparatorHeading.setVisibility(true);
      } else {
        this.view.flxViewAll.setVisibility(false);
		this.view.flxSeparatorHeading.setVisibility(false);
      }

    }
  };
});