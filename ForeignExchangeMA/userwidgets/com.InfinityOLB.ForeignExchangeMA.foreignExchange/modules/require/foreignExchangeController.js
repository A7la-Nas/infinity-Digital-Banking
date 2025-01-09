define(['DataFormattingUtils/FormatUtils','./ForexPresenter'], function(FormatUtils, ForexPresenter) {
   var count=0;
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.forexPresenter = new ForexPresenter(this);
    },
    
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {  

    },
	
    preShow : function() {
      this.closeErrorMessage();
      this.view.segFilter.onRowClick = this.onFilterRowClick;
      this.view.segToCuurencyCode.onRowClick = this.onQuoteCurrenciesRowClick;
      this.view.flxDropDownIcon.onClick=this.onFlexDropDownIconClick.bind(this);
      this.flxDropDownCollapsed=true;
      this.view.tbxSearch.onKeyUp=this.onQuoteCurrencySearch.bind(this);
      this.view.flxDropDown.onClick = this.showFilterSegment;
      this.view.flxPlus.onClick=this.showConvertedValues;
      this.flxPlusCollapsed=true;
      this.view.segConvertedValues.onRowClick = this.onConversionChoiceSelection;
      this.view.tbxBaseCurrencyCodeValue.onKeyUp=this.convert.bind(this);
      this.view.onClick = this.setSegmentVisibility;
      this.view.imgCloseDowntimeWarning.onTouchStart = this.closeErrorMessage.bind(this);
      this.setAccessibilityConfig();
    },
    
    postShow : function() {
      var scope = this;
      this.forexPresenter.setInitialDataForComponent();
      this.onFocusTextBox();
      this.view.tbxBaseCurrencyCodeValue.onTextChange = function() {
      this.restrictSpecialCharacters();
      }.bind(this);
      this.view.tbxBaseCurrencyCodeValue.onEndEditing = function() {
        if (scope.view.tbxBaseCurrencyCodeValue.text) {
            this.formatUtils = new FormatUtils();
            scope.view.tbxBaseCurrencyCodeValue.text = scope.formatUtils.formatData("AMOUNT_WITHOUT_CURRENCY", scope.view.tbxBaseCurrencyCodeValue.text);
        }
    }.bind(this);
    },
    
    setAccessibilityConfig : function(){
      this.view.lblBaseCurrencyName.accessibilityConfig = {
        "a11yLabel" : this.view.lblBaseCurrencyName.text
      };
      this.view.lblDisclaimer.accessibilityConfig = {
        "a11yLabel" : kony.i18n.getLocalizedString("kony.i18n.forex.lblDisclaimer")
      };
      this.view.tbxBaseCurrencyCodeValue.accessibilityConfig = {
        "a11yLabel" : kony.i18n.getLocalizedString("kony.i18n.forex.tbxBaseCurrency")
      };
      this.view.flxDropDownIcon.accessibilityConfig = {
        "a11yARIA" :{
          "role":"button"
        }
      };

      this.view.flxDropDownIcon.accessibilityConfig = {
        "a11yARIA" :{
          "role":"button"
        }
      };
      this.view.flxPlus.accessibilityConfig = {
        "a11yARIA" :{
          "role":"button"
        }
      };
      this.view.imgPlus.accessibilityConfig = {
        "a11yLabel" : kony.i18n.getLocalizedString("kony.i18n.forex.imgPlus")
        };
      this.view.flxDropDown.accessibilityConfig = {
        "a11yARIA" :{
          "role":"button"
        }
      };
      this.view.lblDropDown.accessibilityConfig = {
        "a11yLabel" : kony.i18n.getLocalizedString("kony.i18n.forex.imgDropDown")
      };
      
      this.view.lblDropDown.accessibilityConfig = {
        "a11yLabel" : "Expand Recent Currency DropDown"
      };
         
      this.view.flxFilterContainer.accessibilityConfig = {
        "a11yARIA": {
          "role": "flexContainer"
        }
      };
      this.view.flxToCurrencyCodeContainer.accessibilityConfig = {
        "a11yARIA": {
          "role": "flexContainer"
        }
      };
      this.view.flxToCurrency.accessibilityConfig = {
        "a11yARIA": {
          "role": "flexContainer"
        }
      };
      this.view.lblEquals.accessibilityConfig = {
        "a11yLabel" : "Equals",
        "a11yARIA": {
          "tabindex": -1
        }
      };
      this.view.flxDropDownIcon.accessibilityConfig = {
        "a11yARIA": {
          "tabindex": -1
        }
      };
      this.view.flxPlus.accessibilityConfig = {
        "a11yARIA": {
          "tabindex": -1
        }
      };
      this.view.imgPlus.accessibilityConfig = {
        "a11yARIA": {
          "tabindex": 0
        }
      };
      this.view.flxDropDown.accessibilityConfig = {
        "a11yARIA": {
          "tabindex": -1
        }
      };
      this.setAccessibilityConfigImgDropDownExpand();
      this.setAccessibilityConfigFlxPlusExpand();
    },
    
    setSegmentVisibility : function(){
      this.forexPresenter.handleSegmentVisibility();
    },
    
    setCountryCode : function( countryCode ) {
      this.forexPresenter.handleSetCountryCode( countryCode );
    },
    
    setFeaturesAndPermissions : function( features, userPermissions ) {
      this.forexPresenter.handleSetFeaturesAndPermissions( features, userPermissions );
    },
    
    setBaseCurrency : function(baseCurrencyCode){
      this.view.lblBaseCurrencyName.text = baseCurrencyCode;
      this.view.lblBaseCurrencyName.accessibilityConfig = {
        "a11yLabel": this.view.lblBaseCurrencyName.text
      };
      this.view.forceLayout();
    },
    
    setContainersPosition : function(isMobile){
      if(!kony.sdk.isNullOrUndefined(isMobile) && isMobile){
        this.view.flxRecentCurrencySelectedContainer.setVisibility(false);
        this.view.lblDisclaimer.top="570dp";
        this.view.flxSeparatorCalculator.top="130dp";
        this.view.height = "670dp";
        this.view.flxMainContainer.height = "630dp";
      }
      else{
        this.view.flxRecentCurrencySelectedContainer.setVisibility(true);
        this.view.lblDisclaimer.top="720dp";
        this.view.height = "800dp";
        this.view.flxMainContainer.height = "750dp";
        this.view.flxScrollCurrencyCode.top = "40dp";
        this.view.flxSeparatorCalculator.top="140dp";
      }

      this.view.flxSelectedCurrenecyContainer.top="150dp";
      this.view.flxRecentCurrencySelectedContainer.top="350dp";
    },
    
    showBaseCurrency : function(visibility){
      this.view.flxBaseCurrency.setVisibility(visibility);
    },
    
    showToCurrency : function(visibility){
      this.view.flxToCurrency.setVisibility(visibility);
    },
    
    showCalculateBaseToCurrency: function(visibility){
      this.view.flxBaseCurrencyCodeContainer.setVisibility(visibility);
      this.view.lblExchangeRate.setVisibility(visibility);
      this.view.flxEqualContainer.setVisibility(visibility);
      this.view.flxToCurrencyCodeContainer.setVisibility(visibility);
    },
    
    showSelectedContainer : function(visibility){
    this.view.flxSelectedCurrenecyContainer.setVisibility(visibility);
    },
    
    showRecentCurrencyContainer : function(visibility, isMobile){
      this.view.flxRecentCurrencySelectedContainer.setVisibility((!isMobile) && visibility);
    },
    
    //method to set data for this.view.segToCuurencyCode
    setQuoteCurrencyList : function(currencyList) {
      if(currencyList.length === 0){
        this.view.flxSearchData.setVisibility(false);
        this.view.flxNoQuoteCurrencyList.setVisibility(true);
        this.view.flxPlus.setVisibility(false);
        this.view.lblTTBuyValue.text = kony.i18n.getLocalizedString("i18n.common.NA");
      }
      else{
        this.view.segToCuurencyCode.widgetDataMap = this.getWidgetDataMapForCurrencyList();
        this.view.segToCuurencyCode.rowTemplate = "flxRowExchangeRate";
        this.view.segToCuurencyCode.sectionHeaderTemplate = "flxAccountList";
        this.view.segToCuurencyCode.setData(currencyList);
        this.view.flxSearchData.setVisibility(true);
        this.view.flxNoQuoteCurrencyList.setVisibility(false);
        this.view.flxPlus.setVisibility(true);
      }
      this.view.forceLayout();
    },
    onQuoteCurrencySearch:function(){
			var searchQuery=this.view.tbxSearch.text;
			this.forexPresenter.searchCurrency(searchQuery);
	},
    uiSettingsonResettingSegment:function(){
      this.view.tbxSearch.text='';
    },
    getWidgetDataMapForRecentCurrency : function(){
      return{
        "lblCurrency":"lblCurrency",
        "lblCurrencyBuy":"header1BuyRate",
        "lblCurrencySell":"header1SellRate",
        "lblTTBuy":"header2BuyRate",
        "lblTTSell":"header2SellRate",
        "lblTCBuy":"header3BuyRate",
        "lblTCSell": "header3SellRate",
        "lblRowCurrency":"currency",
        "lblRowCurrencyBuy":"field1BuyRate",
        "lblRowCurrencySell":"field1SellRate",
        "lblRowTTBuy":"field2BuyRate",
        "lblRowTTSell":"field2SellRate",
        "lblRowTCBuy":"field3BuyRate",
        "lblRowTCSell": "field3SellRate",
        "flxSeparator": "flxSeparator",
        "template" : "template"
      };
    },
    
    getWidgetDataMapForRecentCurrencyMobile : function(){
      return{
        "lblRowCurrencyValue":"lblRowCurrencyValue",
        "lblRowCurrency":"lblRowCurrency",
        "lblRowTTSell": "lblRowCurrencyValue",
        "lblRowCurrencyBuy": "lblRowCurrencyBuy",
        "lblRowCurrencySell": "lblRowCurrencySell",
        "lblRowTTBuy": "lblRowTTBuy",
        "flxSeparator":"flxSeparator"
      };
    },
    
    onQuoteCurrenciesRowClick : function(segWidget, sectionNumber, rowNumber){
      var record;
      if(Array.isArray(segWidget.data[0])){
         record=segWidget.data[sectionNumber][1][rowNumber];
      }
      else{
       record = segWidget.data[rowNumber];
      }
      this.forexPresenter.handleQuoteCurrencyCodeSelection(record);
      this.forexPresenter.reSettingOnQuoteCurrencyCodeSelection();
    },
    
    uiSettingsOnQuoteCurrenciesRowClick : function(quoteCurrency) {
      this.view.flxScrollCurrencyCode.setVisibility(false);
      this.view.imgDropDownIcon.src = "listboxuparrow.png";
      this.setAccessibilityConfigImgDropDownExpand();
      this.flxDropDownCollapsed = true;
      if(!kony.sdk.isNullOrUndefined(quoteCurrency.quoteCurrency))
        this.view.lblToCurrencyType.text = quoteCurrency.quoteCurrency;
      else
        this.view.lblToCurrencyType.text = kony.i18n.getLocalizedString("i18n.common.NA");
      this.view.forceLayout();      
    },
    
    //method to set data for this.view.segRecentCurrency
    setDashboardCurrencyRates: function(currencies) {
      this.view.flxNoRecentRecords.isVisible = false;
      if (this.setTCDataFlag(currencies) === false) {
        this.view.segRecentCurrency.widgetDataMap = this.getWidgetDataMapForRecentCurrency();
        this.view.segRecentCurrency.setData(currencies);
      } else {
        this.view.segRecentCurrency.widgetDataMap = this.getWidgetDataMapForRecentCurrency();
        this.view.segRecentCurrency.setData(currencies);
        for (i = 0; i < this.view.segRecentCurrency.data[0][1].length; i++) {
          this.view.segRecentCurrency.data[0][1][i].field3BuyRate.isVisible = true;
          this.view.segRecentCurrency.data[0][1][i].field3SellRate.isVisible = true;
          this.view.segRecentCurrency.data[0][0].header3BuyRate.isVisible = true;
          this.view.segRecentCurrency.data[0][0].header3SellRate.isVisible = true;
        }
      }
      this.view.segRecentCurrency.isVisible = true;
      this.view.flxNoRecentRecords.isVisible = false;       
      this.setFilterVisibility();
      this.view.forceLayout();
    },
    
    setTCDataFlag: function(currencies){
      var flag = false;
      for(i=0;i<currencies[0][1].length;i++){
        if(!kony.sdk.isNullOrUndefined(currencies[0][1][i].field3BuyRate))
          flag = true;
      }
      return flag;
    },

    showFilterSegment : function(visibility){
      if(visibility) {
        if(this.view.flxScrollCurrencyCode.isVisible) {
          this.onToggle(false);
        } if(this.view.flxSegConvertedValues.isVisible) {
          this.showConvertedValues(false);
        }
      }
      if(this.view.lblDropDown.text === "O"){
        this.view.flxSegFilter.setVisibility(true);
        this.view.lblDropDown.text = "P";
        this.view.lblDropDown.accessibilityConfig = {
          "a11yLabel": "Collapse Recent Currency DropDown"
        };
      }
      else {
        this.view.flxSegFilter.setVisibility(false);
        this.view.lblDropDown.text= "O";
        this.view.lblDropDown.accessibilityConfig = {
          "a11yLabel": "Expand Recent Currency DropDown"
        };
      }
      this.view.forceLayout();
    },
    
    //method to set data for this.view.segFilter
    setFilterData : function(marketData) {
      this.view.segFilter.widgetDataMap = {
        "lblName" : "lblName"
      };
      //       if(marketData.length===2) {
      //         this.view.flxSegFilter.height = "85dp";
      //         this.view.segFilter.height = "85dp";
      //       }
      //       if(marketData.length===3){
      //         this.view.flxSegFilter.height = "125dp";
      //         this.view.segFilter.height = "125dp";
      //       }
       var rowData = marketData.map(function (dataItem) {
        var data = {
          "lblName": {
            "text": dataItem.lblName,
            "accessibilityConfig": {
              "a11yLabel": dataItem.lblName
            }
          }
        }
        return data;
      });
      this.view.segFilter.setData(rowData);
      this.view.forceLayout();
    },
    
    //method to set data for this.view.segSelectedExchangeRate
    setCurrencyRates : function(currencyRates, isMobile) {
      if(currencyRates.length === 0){
        this.view.segSelectedExchangeRate.isVisible = false;
        this.view.flxNoSelectedCurrency.isVisible = true;
      }
      else{
        if(!kony.sdk.isNullOrUndefined(isMobile) && isMobile){
          this.view.segSelectedExchangeRate.widgetDataMap = this.getWidgetDataMapForRecentCurrencyMobile();
          var rowData = currencyRates.map(function (dataItem) {
            var data = {
              "lblRowCurrency":{
                "text" :dataItem["header"] + " :",
                "width": "20%",
                "left":"6px",
                "accessibilityConfig" : {
                  "a11yLabel" : dataItem["header"]
                }
              },
              "lblRowCurrencyValue":{
                "left" : "",
                "right":"1%",
                "text" :dataItem["rate"]
              },
              "lblRowCurrencySell": {
                 "isVisible": false
              },
              "lblRowCurrencyBuy": {
                  "isVisible": false
              },
              "lblRowTTBuy": {
                  "isVisible": false
              },
              "flxSeparator": {
                "text" : "-"
              }
            };
            return data;
          });
          this.view.segSelectedExchangeRate.setData(rowData);
        }
        else{
          if(this.setTCDataFlag(currencyRates) === false)
          {
            this.view.segSelectedExchangeRate.widgetDataMap = this.getWidgetDataMapForRecentCurrency();
          this.view.segSelectedExchangeRate.setData(currencyRates);
          }
        else {
          this.view.segSelectedExchangeRate.widgetDataMap = this.getWidgetDataMapForRecentCurrency();
          this.view.segSelectedExchangeRate.setData(currencyRates);          
            this.view.segSelectedExchangeRate.data[0][1][0].field3BuyRate.isVisible = true;
            this.view.segSelectedExchangeRate.data[0][1][0].field3SellRate.isVisible = true;
            this.view.segSelectedExchangeRate.data[0][0].header3BuyRate.isVisible = true;
            this.view.segSelectedExchangeRate.data[0][0].header3SellRate.isVisible = true;          
        }          
        }
        if(isMobile) {
          this.view.flxMainContainer.height=410+(50*currencyRates.length);
          this.view.flxMainContainer.enableScrolling = false;
        }
        this.view.segSelectedExchangeRate.isVisible = true;
        this.view.flxNoSelectedCurrency.isVisible = false;
      }
      this.setFilterVisibility();
      this.view.forceLayout();
    },

    //method to show or hide loading indicator on component
    showOrHideLoadingIndicator : function(isVisible) {
      if(isVisible){
        kony.application.showLoadingScreen("loadingskin","Data is still Loading");
      }
      else{
        kony.application.dismissLoadingScreen();
      }
    },
    
    //method to show any error message
    showErrorMessage : function(error){
      this.view.lblDowntimeWarning.text = error.dbpErrMsg;
      this.view.flxMainWrapper.setVisibility(true);
      this.view.segSelectedExchangeRate.setVisibility(false);
      this.view.flxNoSelectedCurrency.setVisibility(true);
      this.view.segRecentCurrency.setVisibility(false);
      this.view.flxNoRecentRecords.setVisibility(true);
      this.setFilterVisibility();
      this.showOrHideLoadingIndicator(false);
      this.view.forceLayout();
    },
    setHeaderandMarketValues:function(markets){
      this.view.segConvertedValues.widgetDataMap = this.getWidgetDataforMarketValues();
      //       if(markets.length===2) {
      //          this.view.flxSegConvertedValues.height="104dp";
      //          this.view.segConvertedValues.height="104dp";
      //       }
      //       if(markets.length===4) {
      //          this.view.flxSegConvertedValues.height="204dp";
      //          this.view.segConvertedValues.height="204dp";
      //       }
      this.view.segConvertedValues.setData(markets);
      this.view.forceLayout();
    },
     /**
      * getWidgetDataMap.
      * responsible for getting the widgetDataMap for desktop template
      * @return : {Object} - WidgetDataMap.
      */
    getWidgetDataMapForCurrencyList: function(){
        return {
          "flxAccountList":"flxAccountList",
          "flxRowExchangeRate": "flxRowExchangeRate",
          "lblHeader": "quoteCurrency",
          "lblName":"lblName",
          "lblSeparator":"lblSeparator"
        };
      },
    
    onFlexDropDownIconClick:function(){
      this.forexPresenter.handleQuoteCurrencyListVisibility();
    },
    onToggle: function(flxDropDownCollapsed) {
      if(this.view.flxSegConvertedValues.isVisible) {
        this.showConvertedValues(false);
      } if(this.view.flxSegFilter.isVisible) {
        this.showFilterSegment(false);
      }
      if (flxDropDownCollapsed) {
        this.view.flxScrollCurrencyCode.isVisible = true;
        this.view.imgDropDownIcon.src = "listboxdownarrow.png"
        this.setAccessibilityConfigImgDropDownCollapse();
       } else {
        this.view.flxScrollCurrencyCode.isVisible = false;
        this.view.imgDropDownIcon.src = "listboxuparrow.png"
        this.setAccessibilityConfigImgDropDownExpand();
       }
       this.view.forceLayout();
    },
    
    showConvertedValues:function(visibility){
      if(visibility) {
        if(this.view.flxScrollCurrencyCode.isVisible) {
          this.onToggle(false);
        } if(this.view.flxSegFilter.isVisible) {
          this.showFilterSegment(false);
        } 
      }
      if (this.flxPlusCollapsed) {
//         this.view.flxToCurrencyCodeContainer.skin = "ICSknFlxffffffBorder003e751pxRadius2px";
        this.view.flxSegConvertedValues.isVisible = true;
        this.view.imgPlus.src = "minus.png";
        this.setAccessibilityConfigFlxPlusCollapse();
        this.flxPlusCollapsed=false;
      } else {
        this.view.flxToCurrencyCodeContainer.skin = "flxe3e3e3e30pxradius";        
        this.view.flxSegConvertedValues.isVisible = false;
        this.view.imgPlus.src = "plus_new.png";
        this.setAccessibilityConfigFlxPlusExpand();
        this.flxPlusCollapsed=true;
      }
       this.view.forceLayout();
    },
    
    onFilterRowClick : function(segWidget, sectionNumber, rowNumber){
      var data = segWidget.data[rowNumber];
      this.view.lblSelectedValue.text = data.lblName.text;
      this.forexPresenter.setMarketFilter(data.lblName.text);
      this.view.flxSegFilter.setVisibility(false);
      this.view.lblDropDown.text = "O";
      this.view.forceLayout();
    },
    getWidgetDataforMarketValues:function(){
      return{
      "lblTitle":"header",
        "lblValue":"value"
      }
        
    },
   
    onConversionChoiceSelection : function(segWidget, sectionNumber, rowNumber){
      this.forexPresenter.handleConversionChoiceSelection(rowNumber);
    },

    uiSettingsOnConversionChoiceSelection : function(baseCurrency, quoteCurrency, conversionChoice) {
      var baseCurrencyValue = Number(this.view.tbxBaseCurrencyCodeValue.text);
      var conversionChoiceValue = Number(conversionChoice.value);
      conversionChoice.value = this.forexPresenter.formatRateValue(baseCurrencyValue * conversionChoiceValue);
      this.setCalculatedRate(conversionChoice);
      this.view.lblExchangeRate.text = "1 " +  baseCurrency + " = " + conversionChoice.rate + " " + quoteCurrency;
      this.view.flxSegConvertedValues.isVisible = false;
      this.view.flxToCurrencyCodeContainer.skin = "flxe3e3e3e30pxradius"; 
      this.view.imgPlus.src = "plus_new.png";
      this.setAccessibilityConfigFlxPlusExpand();
      this.flxPlusCollapsed = true;
      this.view.forceLayout();
    },
    
    setCalculatedRate : function(conversionChoice) {
      this.view.lblTTBuy.text = conversionChoice.header;
      this.view.lblTTBuyValue.text = conversionChoice.value;
    },
    reSettingTextBaseCurrency : function(){
      this.view.tbxBaseCurrencyCodeValue.text="1";
    },
    setDefaultQuoteCurrency : function() {
      var record = this.view.segToCuurencyCode.data[0][1][0];
      this.forexPresenter.handleQuoteCurrencyCodeSelection(record);      
    },
    
    setDefaultConversionChoice : function() {
      this.forexPresenter.handleConversionChoiceSelection(0);      
    },
    
    convert : function(){
      var amount = this.view.tbxBaseCurrencyCodeValue.text;
      this.forexPresenter.convertCurrency(amount);
    },
    
    closeSegments : function(){
      this.view.flxSegFilter.setVisibility(false);
      this.view.flxScrollCurrencyCode.setVisibility(false);
      this.view.flxSegConvertedValues.setVisibility(false);
      this.view.flxToCurrencyCodeContainer.skin = "flxe3e3e3e30pxradius"; 
      this.view.imgPlus.src = "plus_new.png";
      this.setAccessibilityConfigFlxPlusExpand();
      this.view.imgDropDownIcon.src = "listboxuparrow.png";
      this.setAccessibilityConfigImgDropDownExpand();
      this.view.lblDropDown.text = "O";
      this.view.forceLayout();
    },
    
    setBaseCurrencyCodeValue : function(value) {
      if(!kony.sdk.isNullOrUndefined(value)) {
        this.view.tbxBaseCurrencyCodeValue.text = value;
      }
    },
    
    closeErrorMessage : function(){
      this.view.flxMainWrapper.setVisibility(false);
      this.view.forceLayout();
    },
    
    setFilterVisibility : function(){
      var isSelectedDataAvailable = !this.view.flxNoSelectedCurrency.isVisible;
      var isRecentDataAvailable = !this.view.flxNoRecentRecords.isVisible;
      this.view.flxFilterContainer.isVisible = (isSelectedDataAvailable || isRecentDataAvailable);
    },
    /*
    * Method to set focus skin for base currency text field
    */
    onFocusTextBox: function() {
      var scope = this;
      scope.view.tbxBaseCurrencyCodeValue.onBeginEditing = function() {
        scope.view.tbxBaseCurrencyCodeValue.skin="ICSknTxb003E75Rds3PXFnt424242";
      };
      scope.view.tbxBaseCurrencyCodeValue.onEndEditing = function() {
        scope.view.tbxBaseCurrencyCodeValue.skin="ICSkntbxffffffBordere3e3e3e3Fnt727272";
      };
    },
    
     restrictSpecialCharacters: function() {
       var scopeObj = this;
       var specialCharactersSet = "~#^|$%&*!@()_-+=}{][/|?,.><`':;\"\\";
       var alphabetsSet = "abcdefghijklmnopqrstuvwxyz";
       if (scopeObj.view.tbxBaseCurrencyCodeValue.text.includes('.') === true) count++;
       if (count >= 1) {
         !/^[0-9]/.test(scopeObj.view.tbxBaseCurrencyCodeValue.text) ? scopeObj.view.tbxBaseCurrencyCodeValue.text = "" : scopeObj.view.tbxBaseCurrencyCodeValue.text
         scopeObj.view.tbxBaseCurrencyCodeValue.restrictCharactersSet = specialCharactersSet + alphabetsSet + alphabetsSet.toUpperCase();
         count = 0;
       } else {
         scopeObj.view.tbxBaseCurrencyCodeValue.restrictCharactersSet = specialCharactersSet.replace('.', '') + alphabetsSet + alphabetsSet.toUpperCase();
       }
	},
    setAccessibilityConfigImgDropDownExpand : function() {
      this.view.imgDropDownIcon.accessibilityConfig = {
        "a11yLabel" : "Expand To Currency DropDown",
        "a11yARIA": {
          "tabindex": 0
        }
      };
    },
    setAccessibilityConfigImgDropDownCollapse : function() {
      this.view.imgDropDownIcon.accessibilityConfig = {
        "a11yLabel" : "Collapse To Currency DropDown",
        "a11yARIA": {
          "tabindex": 0
        }
      };
    },
    setAccessibilityConfigFlxPlusExpand: function(){
      this.view.imgPlus.accessibilityConfig = {
        "a11yLabel": "Expand To Currency"
      }
    },
    setAccessibilityConfigFlxPlusCollapse: function(){
      this.view.imgPlus.accessibilityConfig = {
        "a11yLabel": "Collapse To Currency"
      }
    },
  };
});