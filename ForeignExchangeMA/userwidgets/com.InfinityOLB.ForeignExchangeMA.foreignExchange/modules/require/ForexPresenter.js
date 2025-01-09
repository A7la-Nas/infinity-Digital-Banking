define(['./ForexDAO', './ForexParser'], function (ForexDAO, ForexParser) {
   
  function ForexPresenter(componentController){
    this.forexDAO = new ForexDAO();
    var orientationHandler = new OrientationHandler();
    this.isTablet = (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet);
    this.isMobile = (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) && !this.isTablet;
    this.forexParser = new ForexParser();
    this.componentController = componentController;
    this.baseCurrencyCode = "";
    this.quoteCurrencyCode = "";
    this.marketValues = [ "All", "Currency", "TT", "TC" ];
    this.selectedMarketFilter = (this.isTablet) ? "Currency" : "";
    this.dashboardCurrencySegmentData = [];
    this.selectedCurrencySegmentData = [];
    this.currencyList;
    this.selecteCurrency_MarketRates;
    this.isDefaultQuoteCurrencyAssigned = false;
    this.concersionFactor = "1";
    this.selectedRateIndex;
    this.currencyListVisibility=false;
    this.countryCode = "";
    this.market = "10 1";
    this.companyCode = applicationManager.getUserPreferencesManager().getCompanyId();
    this.isForexFeatureActive = false;
    this.isForexRatesViewAllowed = false;
    this.isForexCalculatorAllowed = false;
    this.currencyListResponse = [];
	this.currencyRatesResponse = {};
  }
  
  ForexPresenter.prototype.setInitialDataForComponent = function(){
    this.componentController.setBaseCurrencyCodeValue("1");
    this.setMarketValuesFilters();
    this.setInitialUI();
    this.setMarketFilter((this.isTablet) ? "Currency" : "");
  };
  
  ForexPresenter.prototype.fetchBaseCurrency = function(countryCode){
    var scopeObj = this;
    var serviceConfig = {
      "objectServiceName" : "ForeignExchange",
      "objectName" : "Forex",
      "operationName" : "fetchBaseCurrency",
      "criteria" : {
        "CountryCode" : countryCode,
        "companyCode" : scopeObj.companyCode,
        "market" : scopeObj.market
      },
      "onSuccess" : scopeObj.baseCurrencySuccessCallback.bind(scopeObj),
      "onError" : scopeObj.baseCurrencyFailureCallback.bind(scopeObj)
    };
    this.componentController.showOrHideLoadingIndicator(true);
    this.forexDAO.invokeService(serviceConfig);
  };
  
  ForexPresenter.prototype.setInitialUI = function() {
    var scopeObj = this;
    if (this.isForexFeatureActive && this.isForexRatesViewAllowed) {
      if(this.isForexCalculatorAllowed){
        scopeObj.componentController.showBaseCurrency(true);
        scopeObj.componentController.showToCurrency(true);
        scopeObj.componentController.showCalculateBaseToCurrency(true);
        scopeObj.componentController.showSelectedContainer(true);
        scopeObj.componentController.showRecentCurrencyContainer(true, scopeObj.isMobile);
      }
      if(!this.isForexCalculatorAllowed){
        scopeObj.componentController.showBaseCurrency(true);
        scopeObj.componentController.showToCurrency(true);
        scopeObj.componentController.showCalculateBaseToCurrency(false);
        scopeObj.componentController.showSelectedContainer(true);
        scopeObj.componentController.showRecentCurrencyContainer(true, scopeObj.isMobile);
        scopeObj.componentController.setContainersPosition(scopeObj.isMobile);
      }
	}
    if (!this.isForexFeatureActive && !this.isForexRatesViewAllowed) {
      scopeObj.componentController.showBaseCurrency(false);
      scopeObj.componentController.showToCurrency(false);
      scopeObj.componentController.showCalculateBaseToCurrency(false);
      scopeObj.componentController.showSelectedContainer(false);
      scopeObj.componentController.showRecentCurrencyContainer(false, scopeObj.isMobile);
    }
  };
  
  ForexPresenter.prototype.baseCurrencySuccessCallback = function(response) {
    var scopeObj = this;
    var baseCurrencyString = scopeObj.forexParser.parseCurrencyCodeAndName(response);
    scopeObj.baseCurrencyCode = response.code;
    scopeObj.componentController.setBaseCurrency(baseCurrencyString);
    if(this.isDefaultQuoteCurrencyAssigned === false){
      scopeObj.fetchDashboardCurrencyList();     
    }
    else{
      scopeObj.componentController.showOrHideLoadingIndicator(false);
    }
  };
  
  ForexPresenter.prototype.baseCurrencyFailureCallback = function(error) {
    var scopeObj = this;
    scopeObj.componentController.showErrorMessage(error);
  };
  
  ForexPresenter.prototype.fetchDashboardCurrencyList = function(){
    var scopeObj = this;
    var serviceConfig = {
      "objectServiceName" : "ForeignExchange",
      "objectName" : "Forex",
      "operationName" : "fetchDashboardCurrencyList",
      "criteria" : {
        "baseCurrencyCode" : scopeObj.baseCurrencyCode
      },
      "onSuccess" : scopeObj.dashboardCurrencyListSuccessCallback.bind(scopeObj),
      "onError" : scopeObj.dashboardCurrencyListFailureCallback.bind(scopeObj)
    };
    if(!scopeObj.isMobile && kony.application.getCurrentBreakpoint() != 640)
    {
      this.componentController.showOrHideLoadingIndicator(true);
    }
    this.forexDAO.invokeService(serviceConfig);
  };
  
  ForexPresenter.prototype.dashboardCurrencyListSuccessCallback = function(response) {
    var scopeObj = this;
    scopeObj.fetchCurrencyRates();
    this.currencyListResponse = response;
    var currencyListWithoutBaseCurrency = [];
    for(i=0;i<response.Currencies.length;i++){
      if(response.Currencies[i].code!==scopeObj.baseCurrencyCode)
        {
          currencyListWithoutBaseCurrency.push(response.Currencies[i]);
        }
    }
    var currencies = scopeObj.forexParser.parseCurrencyList(currencyListWithoutBaseCurrency);
    this.currencyList = currencies;
    if(this.isDefaultQuoteCurrencyAssigned === false){
      this.componentController.setQuoteCurrencyList(currencies);      
      this.componentController.setDefaultQuoteCurrency();
      this.isDefaultQuoteCurrencyAssigned = true;
    }
    else{
      this.resetSegTocurrencyData();
      this.componentController.showOrHideLoadingIndicator(false);
    }
  };
  
  ForexPresenter.prototype.dashboardCurrencyListFailureCallback = function(error) {
    var scopeObj = this;
    scopeObj.componentController.showErrorMessage(error);
  };
  
  ForexPresenter.prototype.fetchDashboardCurrencyRates = function(){
   var scopeObj = this;
    var serviceConfig = {
      "objectServiceName" : "ForeignExchange",
      "objectName" : "Forex",
      "operationName" : "fetchDashboardCurrencyRates",
      "criteria" : {
        "baseCurrencyCode" : scopeObj.baseCurrencyCode,
        "market" : scopeObj.market,
        "companyCode" : scopeObj.companyCode
      },
      "onSuccess" : scopeObj.dashboardCurrencyRatesSuccessCallback.bind(scopeObj),
      "onError" : scopeObj.dashboardCurrencyRatesFailureCallback.bind(scopeObj)
    };
    this.componentController.showOrHideLoadingIndicator(true);
    this.forexDAO.invokeService(serviceConfig);
  };
  
  ForexPresenter.prototype.dashboardCurrencyRatesSuccessCallback = function(response) {
    var scopeObj = this;
    var currencies = [];
    var currencyListRecords = scopeObj.currencyListResponse.Currencies.slice(0,5);
    var codesArray = [];
    var recentCurrencies = [];
    var popularCurrencies = [];
    var currenciesJSON = {};
    currencyListRecords.forEach(function(item){
      codesArray.push(item.code);
    });      
    for(i=0;i<response.Currencies.length;i++){
      if(codesArray.indexOf(response.Currencies[i].code)!==-1){
        popularCurrencies.push(response.Currencies[i]);
      }
    }
    codesArray.forEach(function(item){
      for(i=0;i<popularCurrencies.length;i++){
        if(item === popularCurrencies[i].code)
          recentCurrencies.push(popularCurrencies[i]);
      }
    });
    if(!kony.sdk.isNullOrUndefined(scopeObj.currencyRatesResponse.code) && recentCurrencies[0].code!==scopeObj.currencyRatesResponse.code){
      recentCurrencies = scopeObj.getRecentOrPopularCurrencies(codesArray,recentCurrencies);
    }
    scopeObj.forexParser.formatMarketRates(recentCurrencies);
    currenciesJSON.Currencies = recentCurrencies;
    scopeObj.updateMarketValues(currenciesJSON);
    currencies = scopeObj.forexParser.parseDashboardCurrency(recentCurrencies,scopeObj.marketValues);   
    scopeObj.dashboardCurrencySegmentData = currencies;        
    scopeObj.filterCurrencyDataAndSetDashboard();
    scopeObj.componentController.showOrHideLoadingIndicator(false);
  };
  
  ForexPresenter.prototype.getRecentOrPopularCurrencies = function(codesArray,recentCurrencies){
    var mostRecentCurrency={};
    if(codesArray.indexOf(this.currencyRatesResponse.code)===-1){
      mostRecentCurrency.markets = this.currencyRatesResponse.markets;
      mostRecentCurrency.code = this.currencyRatesResponse.code;
      recentCurrencies.unshift(mostRecentCurrency);
      recentCurrencies = recentCurrencies.slice(0,5);
    }
    else{
      var recentCurrencyList=[];
      var indexOfRecentCurrency = codesArray.indexOf(this.currencyRatesResponse.code);
      for(i=0;i<indexOfRecentCurrency;i++)
      {
        recentCurrencyList.push(recentCurrencies[i]);
      }
      for(i=indexOfRecentCurrency+1;i<recentCurrencies.length;i++)
      {
        recentCurrencyList.push(recentCurrencies[i]);
      }
      mostRecentCurrency.markets = this.currencyRatesResponse.markets;
      mostRecentCurrency.code = this.currencyRatesResponse.code;
      recentCurrencyList.unshift(mostRecentCurrency);
      recentCurrencies = recentCurrencyList;
    }
    return recentCurrencies;
  };
  
  ForexPresenter.prototype.dashboardCurrencyRatesFailureCallback = function(error) {
    var scopeObj = this;
    scopeObj.componentController.showErrorMessage(error);
  };
  
  ForexPresenter.prototype.fetchCurrencyRates = function(){
    var scopeObj = this;
    var serviceConfig = {
      "objectServiceName" : "ForeignExchange",
      "objectName" : "Forex",
      "operationName" : "fetchCurrencyRates",
      "criteria" : {
        "baseCurrencyCode" : scopeObj.baseCurrencyCode,
        "quoteCurrencyCode" : scopeObj.quoteCurrencyCode,
        "market" : scopeObj.market,
        "companyCode" : scopeObj.companyCode
      },
      "onSuccess" : scopeObj.currencyRatesSuccessCallback.bind(scopeObj),
      "onError" : scopeObj.currencyRatesSuccessCallback.bind(scopeObj)
    };
    if(!scopeObj.isMobile && kony.application.getCurrentBreakpoint() != 640)
    {
      this.componentController.showOrHideLoadingIndicator(true);
    }
    this.forexDAO.invokeService(serviceConfig);
  };
  
  ForexPresenter.prototype.currencyRatesSuccessCallback = function(response) {
    var scopeObj = this;
    this.currencyRatesResponse = response;
    var currencies;
    response.code = scopeObj.quoteCurrencyCode;
    response = scopeObj.forexParser.parseCurrencyRates(response);
    this.updateMarketValues(response);
    scopeObj.forexParser.formatMarketRates(response.Currencies);
    if(this.isMobile){
      currencies = scopeObj.forexParser.parseHeadersandValue(response.Currencies);
      scopeObj.selectedCurrencySegmentData = currencies;
      scopeObj.componentController.setCurrencyRates(currencies,true);
    }
    else{
      currencies = scopeObj.forexParser.parseDashboardCurrency(response.Currencies,scopeObj.marketValues);
      scopeObj.selectedCurrencySegmentData = currencies;
      scopeObj.filterCurrencyDataAndSetDashboard();
    }
    scopeObj.componentController.closeErrorMessage();
    scopeObj.setMarketRateValues(response.Currencies);
    scopeObj.componentController.showOrHideLoadingIndicator(false);
  };
  
  ForexPresenter.prototype.currencyRatesFailureCallback = function(error) {
    var scopeObj = this;
    scopeObj.componentController.showErrorMessage(error);
  };
  
  ForexPresenter.prototype.updateRecentCurrency = function(){
    var scopeObj = this;
    var serviceConfig = {
      "objectServiceName" : "ForeignExchange",
      "objectName" : "Forex",
      "operationName" : "updateRecentCurrencies",
      "criteria" : {
        "quoteCurrencyCode" : scopeObj.quoteCurrencyCode
      },
      "onSuccess" : scopeObj.updateRecentCurrencySuccessCallback.bind(scopeObj),
      "onError" : scopeObj.updateRecentCurrencyFailureCallback.bind(scopeObj)
    };
    this.componentController.showOrHideLoadingIndicator(true);
    this.forexDAO.invokeService(serviceConfig);
  };
  
  ForexPresenter.prototype.updateRecentCurrencySuccessCallback = function(response) {    
    this.fetchCurrencyRates();
    if(!this.isMobile){
      this.fetchDashboardCurrencyRates();
    }
  };
  
  ForexPresenter.prototype.updateRecentCurrencyFailureCallback = function(error) {
    var scopeObj = this;
    scopeObj.componentController.showErrorMessage(error);
  };
  
  ForexPresenter.prototype.getMarketValues = function(){
    var formattedValues = this.forexParser.parseMarketFilter(this.marketValues, this.isTablet);
    return formattedValues;
  };
  
  ForexPresenter.prototype.setQuoteCurrencyCode = function(quoteCurrencyCode) {
    if(!kony.sdk.isNullOrUndefined(quoteCurrencyCode) && typeof quoteCurrencyCode === 'string'){
      this.quoteCurrencyCode = quoteCurrencyCode;
    }
  };
  
  ForexPresenter.prototype.setMarketFilter = function(marketValue) {
    var scopeObj = this;
    if(marketValue !== "All"){
      this.selectedMarketFilter = marketValue;
    }
    else{
      this.selectedMarketFilter = "";
    }
    if(this.isDefaultQuoteCurrencyAssigned){
      scopeObj.filterCurrencyDataAndSetDashboard();
    }
  };
  
  ForexPresenter.prototype.setMarketValuesFilters = function(){
    var marketData = this.getMarketValues();
    this.componentController.setFilterData(marketData);
  };
  
  ForexPresenter.prototype.searchCurrency= function(searchQuery){
    var scopeObj=this;
    var segEachData = [];
    var currencyListtemp = this.currencyList;
    if (searchQuery.length > 0) {
      for (var i = 0; i < currencyListtemp[1][1].length; i++) {
        if(typeof(currencyListtemp[1][1][i]["code"]) === "string" || typeof(currencyListtemp[1][1][i]["name"]) === "string"){
          if ((!kony.sdk.isNullOrUndefined(currencyListtemp[1][1][i]["code"])&& currencyListtemp[1][1][i]["code"].toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1) || (!kony.sdk.isNullOrUndefined(currencyListtemp[1][1][i]["name"])&& currencyListtemp[1][1][i]["name"].toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1))
          {
            segEachData.push(currencyListtemp[1][1][i]);
          }
        }
      }
      scopeObj.componentController.setQuoteCurrencyList(segEachData);  
    }
    else{
      scopeObj.componentController.setQuoteCurrencyList(currencyListtemp);  
    }
  };
  
  ForexPresenter.prototype.handleQuoteCurrencyCodeSelection = function(quoteCurrency){
    this.setQuoteCurrencyCode(quoteCurrency.code);
    this.currencyListVisibility=false;
    this.componentController.uiSettingsOnQuoteCurrenciesRowClick(quoteCurrency);
    this.updateRecentCurrency();
  };
  
  ForexPresenter.prototype.filterCurrencyDataAndSetDashboard = function(){
    var scopeObj = this;
	var filteredDashboard = scopeObj.forexParser.filterDataWithMarket(scopeObj.dashboardCurrencySegmentData, scopeObj.selectedMarketFilter, this.isTablet);
    var filteredSelectedDashboard = scopeObj.forexParser.filterDataWithMarket(scopeObj.selectedCurrencySegmentData, scopeObj.selectedMarketFilter, this.isTablet);
    scopeObj.componentController.setDashboardCurrencyRates(filteredDashboard);
    scopeObj.componentController.setCurrencyRates(filteredSelectedDashboard, false);//filter is not available with mobile breakpoint
  };

  ForexPresenter.prototype.handleConversionChoiceSelection = function(rowIndex){
    this.selectedRateIndex = rowIndex;
    this.componentController.uiSettingsOnConversionChoiceSelection(this.baseCurrencyCode,
                                                                   this.quoteCurrencyCode, Object.assign({}, this.selecteCurrency_MarketRates[rowIndex]));
  };
  
  ForexPresenter.prototype.convertCurrency = function(amount){
    var scopeObj = this;
    if(scopeObj.quoteCurrencyCode !== ""){
      var headersandValues = scopeObj.forexParser.parseHeadersandValueWithFactor(this.selecteCurrency_MarketRates, amount);
      scopeObj.componentController.setHeaderandMarketValues(headersandValues);
      scopeObj.componentController.setCalculatedRate(headersandValues[this.selectedRateIndex]);
    }
  };
  ForexPresenter.prototype.resetSegTocurrencyData = function() {
    var currencyListtemp = this.currencyList;
    this.currencyListVisibility = !this.currencyListVisibility;
    this.componentController.setQuoteCurrencyList(currencyListtemp);
    this.componentController.uiSettingsonResettingSegment();
    this.componentController.onToggle(this.currencyListVisibility);
  };
  ForexPresenter.prototype.handleQuoteCurrencyListVisibility=function(){
    if(this.currencyListVisibility === false){
      this.fetchDashboardCurrencyList();
    }
    else{
      this.resetSegTocurrencyData();
    }
  };
  
  ForexPresenter.prototype.handleSetCountryCode=function(countryCode){
    countryCode = (kony.sdk.isNullOrUndefined(countryCode)) ? "" : countryCode;
    if(typeof countryCode === 'string'){
      this.fetchBaseCurrency(countryCode);
    }
  };
  
  ForexPresenter.prototype.handleSegmentVisibility = function(){
    var scopeObj=this;
    scopeObj.componentController.closeSegments();
  };

  ForexPresenter.prototype.handleSetFeaturesAndPermissions = function(features, userPermissions){
    if( (Array.isArray(features)) && (features.length > 0) && 
       (Array.isArray(userPermissions)) && (userPermissions.length > 0) ){
      this.isForexFeatureActive = features.indexOf('FX_RATES') > -1;
      this.isForexRatesViewAllowed = this.isForexFeatureActive && (userPermissions.indexOf('FX_RATES_VIEW') > -1);
      this.isForexCalculatorAllowed = this.isForexFeatureActive && (userPermissions.indexOf('FX_RATES_VIEW_CALCULATOR') > -1);
    }
    this.isForexRatesViewAllowed = true;
    this.isForexCalculatorAllowed = true;
  }; 
  
  ForexPresenter.prototype.setMarketRateValues = function(currencies){
    var scopeObj = this;
    var headersandValues = scopeObj.forexParser.parseHeadersandValue(currencies);
    headersandValues = scopeObj.forexParser.parseHeadersandValueWithFactor(headersandValues);
    scopeObj.componentController.setHeaderandMarketValues(headersandValues);
    scopeObj.selecteCurrency_MarketRates = headersandValues;
    scopeObj.componentController.setDefaultConversionChoice();
  };
  
  ForexPresenter.prototype.formatRateValue = function(rate){
    return this.forexParser.formatRateValue(rate);
  };
  
  ForexPresenter.prototype.reSettingOnQuoteCurrencyCodeSelection = function() {
    this.componentController.reSettingTextBaseCurrency();
    var segmentChoice=this.selecteCurrency_MarketRates;
    this.componentController.setCalculatedRate(segmentChoice[0]);
  };
  
  ForexPresenter.prototype.updateMarketValues = function(response) {
		var scopeObj = this;
		scopeObj.marketValues = ["All"];
		for (i = 0; i < response.Currencies.length; i++) {
			for(j=0;j<response.Currencies[i].markets.length;j++){
            if (scopeObj.marketValues.indexOf(response.Currencies[i].markets[j].market) === -1) {
                scopeObj.marketValues.push(response.Currencies[i].markets[j].market);
            }
			}
        }
		this.setMarketValuesFilters();
	};
    
  return ForexPresenter;
});