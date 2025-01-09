define(function () {
   
	function ForexParser(){}
  
	ForexParser.prototype.parseCurrencyCodeAndName = function(currencyJson){
      return kony.sdk.isNullOrUndefined(currencyJson.name) ? currencyJson.code:currencyJson.code + " - " + currencyJson.name;      
    };
	
	ForexParser.prototype.parseCurrencyList = function(currencyList){
      var self=this;
      if(currencyList.length === 0) return [];
      currencyList.forEach(function(currency){
        currency["quoteCurrency"] = self.parseCurrencyCodeAndName(currency);
      });
      var dashboardCurrencyList = [];
      var recentSectionHeader = {'lblName':kony.i18n.getLocalizedString("i18n.mob.ForeignExchange.Recentlyused")};
      var recentCurrencies = [];
      for(var i = 0; i < 5; i++) {
        recentCurrencies.push(currencyList[i]);
      }
      var recentSection = [];
      recentSection.push(recentSectionHeader);
      recentSection.push(recentCurrencies);
      dashboardCurrencyList.push(recentSection);
      var allSectionHeader	=	{'lblName':kony.i18n.getLocalizedString("i18n.AccountsDetails.ALL")};
      var allCurrencies=[];
      var allSection=[];
      for(var j=5;j<currencyList.length;j++){
        allCurrencies.push(currencyList[j]);
      }
      allSection.push(allSectionHeader);
      allSection.push(allCurrencies);
      dashboardCurrencyList.push(allSection);
      return dashboardCurrencyList;
    };
  
	ForexParser.prototype.parseMarketFilter = function(marketValues, isTablet){
      var filter = [];
      if(marketValues.length === 0) return [];
      marketValues.forEach(function(market, index){
        if (isTablet && index === 0) {// exclude "All" filter in tablet
          return;
        }
        else {
          filter.push({
            "lblName": market
          });
        }
      });
      return filter;
    };
  
	ForexParser.prototype.formatRateValue = function(value,delimiter){
      var result = 0;
    if(kony.sdk.isNullOrUndefined(delimiter)){
        delimiter = ".";
    }
    value = value+"";
    var tempArr = value.split(delimiter);
    var lengthOfRadix = tempArr[0].length;
    var mantissaLength = 0;
    if(lengthOfRadix > 4){
        mantissaLength = 2;
    }
    else if(lengthOfRadix > 3){
        mantissaLength = 3;
    }
    else{
        mantissaLength = 4;
    }
    try{
        result = Number(value).toFixed(mantissaLength);
    }
    catch(e){
        return 0;
    }
    return result;
    };
  
	ForexParser.prototype.formatMarketRates = function(currencies){
      var scopeObj = this;
      if(Array.isArray(currencies)){
        currencies.forEach(function(currency){
          if(Array.isArray(currency.markets)){
            currency.markets.forEach(function(market){
              if(market.hasOwnProperty("buyRate"))
                market.buyRate = scopeObj.formatRateValue(market.buyRate);
              if(market.hasOwnProperty("sellRate"))
                market.sellRate = scopeObj.formatRateValue(market.sellRate);
            });
          }
        });
      }
    };
  
	ForexParser.prototype.parseDashboardCurrency = function(currencies,marketValue){
      if(currencies === undefined || currencies.length === 0) return [];
      var self=this;
      var dashboardData = [];
      dashboardData.push([this.parseMarketHeaders(currencies[0].markets,marketValue)]);
      dashboardData[0].push([]);
      currencies.forEach(function(currency){
        var data = {};
        if(currency.hasOwnProperty("code")){
          data["currency"] = self.parseCurrencyCodeAndName(currency);
          if(currency.hasOwnProperty("markets") && Array.isArray(currency.markets)){
            for(var index = 0; index < currency.markets.length; index++){
              var ind = marketValue.indexOf(currency.markets[index].market);
              if(currency.markets[index].hasOwnProperty("buyRate")){
                data["field"+(ind)+"BuyRate"] = {
                  "text" : currency.markets[index].buyRate,
                  "accessibilityConfig" : {
                    "a11yLabel" : currency.markets[index].buyRate,
                    "a11yARIA" :{
                      "role" : "listbox"
                    }
                  },
                  "isVisible" : true
                };
              }
              if(currency.markets[index].hasOwnProperty("sellRate")){
                data["field"+(ind)+"SellRate"] = {
                  "text" : currency.markets[index].sellRate,
                  "accessibilityConfig" : {
                    "a11yLabel" : currency.markets[index].sellRate
                  },
                  "isVisible" : true
                };
              }
            }
          }
        }
        data["flxSeparator"] = {
          "isVisible" : true
        };
        dashboardData[0][1].push(data);
      });
      return dashboardData;
    };

	ForexParser.prototype.parseMarketHeaders = function(markets,marketValue){
      if(markets === undefined || markets.length === 0) return [];
      var sectionHeaders = {
        "lblCurrency":{
        "text" : kony.i18n.getLocalizedString("i18n.common.Currency"),
         "accessibilityConfig" : {
              "a11yLabel" : "Currency"
            },
          }
      };
      markets.forEach(function(marketObject, index){
        var ind = marketValue.indexOf(marketObject.market);
        if(marketObject.hasOwnProperty("buyRate")){
          sectionHeaders["header"+(ind)+"BuyRate"] = {
            "text" : marketObject.market + " " + kony.i18n.getLocalizedString("i18n.wealth.Buy"),
            "accessibilityConfig" : {
              "a11yLabel" : marketObject.market+ " " + "Buy"
            },
            "isVisible" : true
          };
        }
        if(marketObject.hasOwnProperty("sellRate")){
          sectionHeaders["header"+(ind)+"SellRate"] = {
           "text" : marketObject.market + " " + kony.i18n.getLocalizedString("i18n.wealth.Sell"),
             "accessibilityConfig" : {
              "a11yLabel" : marketObject.market+ " " + "Sell"
            },
           "isVisible" : true
          };
        }
      });
      sectionHeaders["template"] = "flxExchangeRateHeader";
      sectionHeaders["flxSeparator"] = {
        "isVisible" : true
      };
      return sectionHeaders;
    };
  
  ForexParser.prototype.parseHeadersandValue = function(currencies){
    if(currencies.length === 0) return [];
    var marketsArray=currencies[0].markets;
    var HeadersandValue=[];
    var pushObject=function(marketName,element){
      var tempJson={};
      tempJson["header"]=element.market+" "+marketName; 
      tempJson["rate"]=marketName===kony.i18n.getLocalizedString("i18n.wealth.Buy")?element.buyRate:element.sellRate; 
      tempJson["value"]=marketName===kony.i18n.getLocalizedString("i18n.wealth.Buy")?element.buyRate:element.sellRate; 
      HeadersandValue.push(tempJson);
    };
    if (marketsArray !== undefined && marketsArray.length > 0) {
      marketsArray.forEach(
        element=>{
          pushObject(kony.i18n.getLocalizedString("i18n.wealth.Buy"),element);
          pushObject(kony.i18n.getLocalizedString("i18n.wealth.Sell"),element);
        }
      );
    }
    return HeadersandValue;
  };
  
  ForexParser.prototype.filterDataWithMarket = function(currencies, market, isTablet){
    if(market === "" || kony.sdk.isNullOrUndefined(market)) return currencies;
    if(currencies.length === 0) return [];
    var currenciesTemp = JSON.parse(JSON.stringify(currencies));
    var sectionHeaders = currenciesTemp[0][0];
    var leftVal = 40;
    var index = 1;
    var fields = new Set();
    for(var key in sectionHeaders){
      if(key !== "lblCurrency" && key !== "flxSeparator"){
        sectionHeaders[key].isVisible = false;
        if(sectionHeaders[key].hasOwnProperty("text") && sectionHeaders[key].text.includes(market)){
          sectionHeaders[key].isVisible = true;
          //sectionHeaders[key].left = (index++) * leftVal + "%";
          fields.add(key[6]); // contains field values 1,2,3.......
        }
      }
    }
    var rowData = currenciesTemp[0][1];
    fields.forEach(function(field){
      rowData.forEach(function(row){
        index = 1;
        for(var key in row){
          if(key !== "currency"){
            if(key.includes(field)){
              row[key].isVisible = true;
              //row[key].left = (index++) * leftVal + "%";
            }
            else if(key !== "flxSeparator"){
              row[key].isVisible = false;
            }
          }
          else{
            row[key] = {
              //"width" : (isTablet) ? "55%" : "47%",
              "text" : row[key]
            };
          }
        }
      });
    });
    return currenciesTemp;
  };

  ForexParser.prototype.parseHeadersandValueWithFactor = function(headersandValues, factor){
    if(kony.sdk.isNullOrUndefined(factor)) {
      factor = 1;
    }
    var headersandValuesCopy = [];
    for(var i = 0; i < headersandValues.length; i++) {
      headersandValuesCopy.push(Object.assign({}, headersandValues[i]));
    }
    for(var j = 0; j< headersandValuesCopy.length; j++) {
      headersandValuesCopy[j].value = this.formatRateValue(Number(factor) * Number(headersandValues[j].value));
    }   

    return headersandValuesCopy;
  };
  
  ForexParser.prototype.parseCurrencyRates = function(currencyRates){
    var response =  {
      "Currencies": []
    };
    response.Currencies.push({
      "symbol": currencyRates.symbol,
      "markets": currencyRates.markets,
      "code": currencyRates.code,
      "name": currencyRates.name
    });
    return response;
  };
  
  return ForexParser;
});