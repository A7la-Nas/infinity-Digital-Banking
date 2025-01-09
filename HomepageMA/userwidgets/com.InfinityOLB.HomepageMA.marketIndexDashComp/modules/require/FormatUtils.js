define(['FormatUtil'],function (formatingUtil) {

  function FormatUtils(){
    this.formatingUtil = new formatingUtil();
    /**@member {OBJECT}  contains all currency codes*/
    this.currencyCode = {
      USD: '$', // US Dollar
      EUR: '€', // Euro
      CRC: '₡', // Costa Rican Colón
      GBP: '£', // British Pound Sterling
      ILS: '₪', // Israeli New Sheqel
      INR: '₹', // Indian Rupee
      JPY: '¥', // Japanese Yen
      KRW: '₩', // South Korean Won
      NGN: '₦', // Nigerian Naira
      PHP: '₱', // Philippine Peso
      PLN: 'zł', // Polish Zloty
      PYG: '₲', // Paraguayan Guarani
      THB: '฿', // Thai Baht
      UAH: '₴', // Ukrainian Hryvnia
      VND: '₫', // Vietnamese Dong
      AUD: '$', // Australian Dollar
      CAD: '$', // Canadian Dollar
      CHF: 'Fr.', //Swiss Franc
      HKD: 'HK$', //Hongkong Dollar
      YER: 'YER',
      SAR: 'SAR',
    };
    Date.prototype.format = function (format) {
      var date = this;
      return format.replace(/(\\?)(.)/g, function (_, esc, chr) {
        return esc === "" && Date.replaceChars[chr] ? Date.replaceChars[chr].call(date) : chr
      })
    }
    /**@member {OBJECT}  contains all different types of calender notations*/
    Date.replaceChars = {
      shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      longMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      longDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      longMonthsUpperCase: ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'],
      d: function () {
        return (this.getDate() < 10 ? "0" : "") + this.getDate();
      },
      D: function () {
        return Date.replaceChars.shortDays[this.getDay()];
      },
      j: function () {
        return this.getDate();
      },
      l: function () {
        return Date.replaceChars.longDays[this.getDay()];
      },
      N: function () {
        return this.getDay() === 0 ? 7 : this.getDay();
      },
      S: function () {
        return this.getDate() % 10 == 1 && this.getDate() != 11 ? "st" : this.getDate() % 10 == 2 && this.getDate() != 12 ? "nd" : this.getDate() % 10 == 3 && this.getDate() != 13 ? "rd" : "th";
      },
      w: function () {
        return this.getDay();
      },
      z: function () {
        var d = new Date(this.getFullYear(), 0, 1);
        return Math.ceil((this - d) / 864e5);
      },
      W: function () {
        var target = new Date(this.valueOf());
        var dayNr = (this.getDay() + 6) % 7;
        target.setDate(target.getDate() - dayNr + 3);
        var firstThursday = target.valueOf();
        target.setMonth(0, 1);
        if (target.getDay() !== 4) {
          target.setMonth(0, 1 + (4 - target.getDay() + 7) % 7);
        }
        return 1 + Math.ceil((firstThursday - target) / 6048e5);
      },
      F: function () {
        return Date.replaceChars.longMonths[this.getMonth()];
      },
      m: function () {
        return (this.getMonth() < 9 ? "0" : "") + (this.getMonth() + 1);
      },
      M: function () {
        return Date.replaceChars.shortMonths[this.getMonth()];
      },
      n: function () {
        return this.getMonth() + 1;
      },
      t: function () {
        var d = new Date();
        return new Date(d.getFullYear(), d.getMonth(), 0).getDate();
      },
      L: function () {
        var year = this.getFullYear();
        return year % 400 === 0 || year % 100 !== 0 && year % 4 === 0;
      },
      o: function () {
        var d = new Date(this.valueOf());
        d.setDate(d.getDate() - (this.getDay() + 6) % 7 + 3);
        return d.getFullYear();
      },
      Y: function () {
        return this.getFullYear();
      },
      y: function () {
        return ("" + this.getFullYear()).substr(2);
      },
      a: function () {
        return this.getHours() < 12 ? "am" : "pm";
      },
      A: function () {
        return this.getHours() < 12 ? "AM" : "PM";
      },
      B: function () {
        return Math.floor(((this.getUTCHours() + 1) % 24 + this.getUTCMinutes() / 60 + this.getUTCSeconds() / 3600) * 1e3 / 24);
      },
      g: function () {
        return this.getHours() % 12 || 12;
      },
      G: function () {
        return this.getHours();
      },
      h: function () {
        return ((this.getHours() % 12 || 12) < 10 ? "0" : "") + (this.getHours() % 12 || 12);
      },
      H: function () {
        return (this.getHours() < 10 ? "0" : "") + this.getHours();
      },
      i: function () {
        return (this.getMinutes() < 10 ? "0" : "") + this.getMinutes();
      },
      s: function () {
        return (this.getSeconds() < 10 ? "0" : "") + this.getSeconds();
      },
      u: function () {
        var m = this.getMilliseconds();
        return (m < 10 ? "00" : m < 100 ? "0" : "") + m;
      },
      e: function () {
        return "Not Yet Supported";
      },
      I: function () {
        var DST = null;
        for (var i = 0; i < 12; ++i) {
          var d = new Date(this.getFullYear(), i, 1);
          var offset = d.getTimezoneOffset();
          if (DST === null)
            DST = offset;
          else if (offset < DST) {
            DST = offset;
            break;
          } else if (offset > DST)
            break;
        }
        return this.getTimezoneOffset() == DST | 0;
      },
      O: function () {
        return (-this.getTimezoneOffset() < 0 ? "-" : "+") + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? "0" : "") + Math.abs(this.getTimezoneOffset() / 60) + "00";
      },
      P: function () {
        return (-this.getTimezoneOffset() < 0 ? "-" : "+") + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? "0" : "") + Math.abs(this.getTimezoneOffset() / 60) + ":00";
      },
      T: function () {
        return this.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/, "$1");
      },
      Z: function () {
        return -this.getTimezoneOffset() * 60;
      },
      c: function () {
        return this.format("Y-m-d\\TH:i:sP");
      },
      r: function () {
        return this.toString();
      },
      U: function () {
        return this.getTime() / 1e3;
      },
      Q: function () {
        return Date.replaceChars.longMonthsUpperCase[this.getMonth()];
      }
    }
  }
  /**
    * Formats given amount
    * @param {String} amount - amount string to format
    *@param {JSON} FormatData -FormatData json which has properties of how to format amount
    * @returns {String} - formated amount with seperator
    */
  FormatUtils.prototype.formatAmount = function (amount,FormatData) {
    var scope = this;
    var num, flag = false;
    if (amount === null || amount === undefined || isNaN(amount)) {
      return;
    }
    if(FormatData && FormatData.fractionDigits)
      amount = Number(amount).toFixed(FormatData.fractionDigits);
    else
      amount = Number(amount).toFixed(2);
    if(FormatData && FormatData.locale){
      var locale = FormatData.locale
      }
    else{
      var locale = kony.i18n.getCurrentLocale();
      if(this.europeFlow){
       locale ="es_ES";
      }
      if(locale)
        locale = locale.split("_").join("-");
      //  else
      //locale = "en-US";
    }
    var group = this.defaultValueForGroup(locale);
    var decimal = this.getDecimalSeparator(locale);
    if (amount.indexOf(".") != -1 || amount.indexOf(",") != -1) {
      if (amount.indexOf(".") != -1) {
        amount = amount.replace(".", decimal);
      }
      else if (amount.indexOf(",") != -1) {
        amount = amount.replace(",", decimal);
      }
      num = amount.split(decimal)[0];
      var dec = amount.split(decimal)[1];
      if (num.indexOf("-") != -1) {
        num = num.split("-")[1];
        flag = true;
      }
      if (num.length > 3) {
        for (var i = num.length - 1; i >= 0;) {
          if (i >= 3) {
            num = num.substring(0, i - 2) + group + num.substring(i - 2, num.length);
          }
          i = i - 3;
        }
      }
      if (flag === true) {
        return "-" + num + decimal + dec;
      }
      return num + decimal + dec;
    }
    else {
      return amount;
    }
  };
  
  //Format Percentage Amount
    FormatUtils.prototype.formatPercentAmount = function (amount,FormatData) {
    var scope = this;
    var num, flag = false;
    if (amount === null || amount === undefined || isNaN(amount)) {
      return;
    }
    if(FormatData && FormatData.fractionDigits)
      amount = Number(amount).toFixed(FormatData.fractionDigits);
    else
      amount = Number(amount).toFixed(2);
    if(FormatData && FormatData.locale){
      var locale = FormatData.locale
      }
    else{
       var locale ="en_US";
       locale = locale.split("_").join("-");
    }
    var group = this.defaultValueForGroup(locale);
    var decimal = this.getDecimalSeparator(locale);
    if (amount.indexOf(".") != -1 || amount.indexOf(",") != -1) {
      if (amount.indexOf(".") != -1) {
        amount = amount.replace(".", decimal);
      }
      else if (amount.indexOf(",") != -1) {
        amount = amount.replace(",", decimal);
      }
      num = amount.split(decimal)[0];
      var dec = amount.split(decimal)[1];
      if (num.indexOf("-") != -1) {
        num = num.split("-")[1];
        flag = true;
      }
      if (num.length > 3) {
        for (var i = num.length - 1; i >= 0;) {
          if (i >= 3) {
            num = num.substring(0, i - 2) + group + num.substring(i - 2, num.length);
          }
          i = i - 3;
        }
      }
      if (flag === true) {
        return "-" + num + decimal + dec;
      }
      return num + decimal + dec;
    }
    else {
      return amount;
    }
  };
  /**
    * Extract the currency symbol
    * @param {String} currencySymbolCode - indicates the currency symbol code
    * @returns {String} - returns the currency symbol
    */
  FormatUtils.prototype.getCurrencySymbol = function (currencySymbolCode) {
    if (currencySymbolCode) {
      if (this.currencyCode[currencySymbolCode]) {
        return this.currencyCode[currencySymbolCode];
      }
      else {
        return kony.store.getItem("CURRENCYCODE");
      }
    } else {
      return kony.store.getItem("CURRENCYCODE");
    }
  };
  /**
    * Extract the currency symbol Code
    * @param {String} currencySymbol - indicates the currency symbol
    * @returns {String} - returns the currency symbol
    */
  FormatUtils.prototype.getCurrencySymbolCode = function (currencySymbol) {
    if (currencySymbol)  {
      var data = this.currencyCode;
      for (key in data) {
        if (data[key] === currencySymbol)
          return key;
      }
    }
    return this.currencyCode.USD;
  };
  /**
    * Formats and appends currency symbol to given amount
    * @param {String} amount - amount string to format
    * @param {String} currencySymbolCode - indicates the currency symbol code
    *@param {JSON} FormatData -FormatData json which has properties of how to format amount
    * @returns {String} - formated and currency symbol appended
    */
  FormatUtils.prototype.formatAmountandAppendCurrencySymbol = function (amount,currencySymbolCode,FormatData,formatSkins) {
    if (kony.sdk.isNullOrUndefined(amount) || amount.trim() == "" || amount =="0") {
      amount = "0.00";
    }
    var amountWithSeperator = this.formatAmount(amount,FormatData);
    var formattedAmount ={};
    var currencySymbol = "";
    formattedAmount.skin = formatSkins.TEXT_SKIN;
    if((Number(amount))>=0){
      formattedAmount.text=FormatData.positiveFormat;
      if(FormatData && formattedAmount.text.indexOf("{CS}")!==-1){
        currencySymbol = this.getCurrencySymbol(currencySymbolCode);
        if(kony.sdk.isNullOrUndefined(currencySymbol)){
          currencySymbol = currencySymbolCode;
        }
        formattedAmount.text= formattedAmount.text.replace("{CS}",currencySymbol);
      }
      else{
        currencySymbol = currencySymbolCode;
        formattedAmount.text= formattedAmount.text.replace("{CT}",currencySymbol);
      }
      formattedAmount.text= formattedAmount.text.replace("{D}",amountWithSeperator);
      if(formatSkins.POSITIVE_AMOUNT_SKIN)
        formattedAmount.skin = formatSkins.POSITIVE_AMOUNT_SKIN;
      return formattedAmount;
    }
    else{
      formattedAmount.text=FormatData.negativeFormat;
      if(FormatData && formattedAmount.text.indexOf("{CS}")!==-1){
        currencySymbol = this.getCurrencySymbol(currencySymbolCode);
        formattedAmount.text= formattedAmount.text.replace("{CS}",currencySymbol);
      }
      else{
        currencySymbol = currencySymbolCode;
        formattedAmount.text= formattedAmount.text.replace("{CT}",currencySymbol);
      }
      if((amountWithSeperator !== undefined) && (amountWithSeperator !== "")){
      formattedAmount.text= formattedAmount.text.replace("{D}",amountWithSeperator.split('-')[1]);
      }
      if(formatSkins.NEGATIVE_AMOUNT_SKIN)
        formattedAmount.skin = formatSkins.NEGATIVE_AMOUNT_SKIN;
      return formattedAmount;
    }
  };
  /**
    * Formats and appends currency symbol to given amount
    * @param {String} amount - amount string to format
    * @param {String} currencySymbolCode - indicates the currency symbol code
    *@param {JSON} FormatData -FormatData json which has properties of how to format amount
    * @returns {String} - formated and currency symbol appended
    */
  FormatUtils.prototype.formatValueAndAppendPercentageSymbol = function (Value) {
    if (kony.sdk.isNullOrUndefined(Value) || Value.trim() == "" || Value =="0") {
      Value = "0.00";
    }
    var valueWithSeperator = this.formatPercentAmount(Value);
    var formattedValue = valueWithSeperator+"%";
    return formattedValue;
  };
  
   /**
    * Formats and appends currency symbol to given amount
    * @param {String} amount - amount string to format
    * @param {String} currencySymbolCode - indicates the currency symbol code
    *@param {JSON} FormatData -FormatData json which has properties of how to format amount
    * @returns {String} - formated and currency symbol appended
    */
  FormatUtils.prototype.formatValueAndAppendPercentageSymbolWithPositiveNegative = function (Value) {
    if (kony.sdk.isNullOrUndefined(Value) || Value.trim() == "" || Value =="0") {
      Value = "0.00";
    }
    var valueWithSeperator = this.formatPercentAmount(Value);
    var formattedValue="";
    if((Number(Value))>=0)
      {
        formattedValue = "+"+valueWithSeperator+"%";
      }
    else
      {
        formattedValue = valueWithSeperator+"%";
      }
    
    return formattedValue;
  };
  /**
    * Appends the currency symbol to the amount
    * @member of  FormatUtils
    * @param {String} amount - amount string to format
    * @param {String} currencySymbolCode - indicates the currency symbol code
    * @returns {String} - amount with appended currency code
    */
  FormatUtils.prototype.appendCurrencySymbol = function (amount, currencySymbolCode) {
    var currencySymbol = this.getCurrencySymbol(currencySymbolCode);
    return amount[0] === '-' ? ('-' + currencySymbol + amount.split('-')[1]) : currencySymbol + amount;
  };

  FormatUtils.prototype.defaultValueForGroup = function (locale) {
    if (locale == "en-US")
      return ",";
    else if (locale == "en-ES")
      return ",";
    else if (locale == "de-DE")
      return ".";
    else if (locale == "en")
      return ",";
    else if (locale == "en-GB")
      return ",";
    else if (locale == "fr-FR")
      return " ";
    else if (locale == "es-ES")
      return "."
      else
        return ",";
  };

  /**
     * Get Decimal Seperator based on locale
     * @returns {String} - decimal separator
     */
  FormatUtils.prototype.getDecimalSeparator = function (locale) {
    if (locale == "en-US")
      return ".";
    else if (locale == "en-ES")
      return ".";
    else if (locale == "de-DE")
      return ",";
    else if (locale == "en")
      return ".";
    else if (locale == "en-GB")
      return ".";
    else if (locale == "fr-FR")
      return ",";
    else if (locale == "es-ES")
      return ",";
    else
      return ".";
  };
  /**
    * Formats Account Number given data
    *@param {JSON} FormatData -FormatData json which has properties of how to format amount
     * @param {String} accNum - accNum  string to format
    * @returns {String} - formated amount number with given input
    */
  FormatUtils.prototype.formatAccoutNumber = function(formatData,accNum){
    var regex = new RegExp(formatData.format,formatData.modifiers);
    return accNum.replace(regex, formatData.replaceCharacter);
  };
  /**
    * Helper function and property on Date class
    * @param {Date} dateObj - a date object to format
    * @param {String} formatString - required formatString
    * @returns {String} - formated date string
    */
  FormatUtils.prototype.getFormatedDateString = function (dateObj, formatString) {
    //var configurationManager = applicationManager.getConfigurationManager();
    //if (configurationManager.getUTCDateFormattingFlag() === true) {
    if (dateObj) 
      return dateObj.format(formatString);
    return "";
    //}
    return dateObj;
  };
  /**
    * returns date object from given date string
    * @param {String} dateString - a date string
    * @param {String} format - format of date
    * @returns {Date} - date object
    */
  FormatUtils.prototype.getDateObjectfromString = function (dateString, format) {
    try {
      //var configurationManager = applicationManager.getConfigurationManager();
      var finalDateTime = null;
      if (dateString) {
        var formatUTC = "YYYY-MM-DDThh:mm:ss.SSSZ";//ISO date time format
        var formattype = formatUTC.toUpperCase();
        var yyyyIndex = formattype.indexOf("YYYY");
        var mmIndex = formattype.indexOf("MM");
        var ddIndex = formattype.indexOf("DD");
        var hhIndex = formattype.indexOf("HH");
        var minIndex = formattype.indexOf("MM", mmIndex + 1);
        var ssIndex = formattype.indexOf("SS");
        if (yyyyIndex > -1 && mmIndex > -1 && ddIndex > -1) {
          var date = new Date(dateString);
          var newdd = date.getDate();//parseInt(dateString.substr(ddIndex, 2), 10);
          var newmm = date.getMonth();//parseInt(dateString.substr(mmIndex, 2), 10);
          var newyyyy = date.getFullYear();//parseInt(dateString.substr(yyyyIndex, 4), 10);
          if (newdd && (0 < newdd && newdd <= 31) && ((newmm + 1) && (0 < (newmm + 1) && (newmm + 1) <= 12)) && (newyyyy && 0 <= newyyyy)) {
            finalDateTime = new Date();
            finalDateTime.setYear(newyyyy);
            finalDateTime.setMonth(newmm);
            finalDateTime.setDate(newdd);
            //finalDateTime = new Date(Date.UTC(newyyyy, newmm - 1, newdd, 0, 0, 0, 0));
          }
          var newTime = hhIndex > -1 ? dateString.substr(hhIndex, 2) : null;
          newTime = newTime ? parseInt(newTime, 10) : null;
          if (newTime && newTime < 24) {
            finalDateTime = finalDateTime ? finalDateTime.setHours(date.getHours(), 0, 0) : null;
            finalDateTime = new Date(finalDateTime);
          }
          var newmin = minIndex > -1 ? dateString.substr(minIndex, 2) : null;
          newmin = newmin ? parseInt(newmin, 10) : null;
          if (newmin) {
            finalDateTime = finalDateTime ? finalDateTime.setMinutes(date.getMinutes()) : null;
            finalDateTime = new Date(finalDateTime);
          }
          var newss = ssIndex > -1 ? dateString.substr(ssIndex, 4) : null;
          newss = newss ? parseInt(newss, 10) : null;
          if (newss) {
            finalDateTime = finalDateTime ? finalDateTime.setSeconds(date.getSeconds()) : null;
            finalDateTime = new Date(finalDateTime);
          }
        }
      }
      dateString = finalDateTime.toString();
      if (dateString.lastIndexOf(':') != -1) {
        dateString = dateString.substring(0, dateString.lastIndexOf(':') + 3);
      }
      //finalDateTime = formatUtilManager.convertDateToCurrentTimeZone(dateString);
      return finalDateTime;
    } catch (err) {
      kony.print("Error in ISO date formatting -->" + err);
    }
  };

  FormatUtils.prototype.formatText = function(text,type,formatSkins,FormatvalueJSON,currencyCode){
    var scopeObj = this;
    var fieldType = type;
    var fieldValue = text; 
    var FormatJSON = FormatvalueJSON;
  if(currencyCode != null && currencyCode != undefined && currencyCode.trim() != ""){
          FormatvalueJSON.currencyCode = currencyCode;
        }
    if(fieldValue){
      if(fieldType == "amount"){
        if(currencyCode != null && currencyCode != undefined && currencyCode.trim() != ""){
          FormatvalueJSON.currencyCode = currencyCode;
        }
//         if(currencyCode != null && currencyCode != undefined && currencyCode.trim() != ""){
//           FormatvalueJSON.currencyCode = currencyCode;
//         }
        let deformattedAmt = this.removeCurrencyWithCommas(fieldValue);
        var amt=this.formatAmountandAppendCurrencySymbol(deformattedAmt,FormatJSON.currencyCode,FormatJSON.amountFormat,formatSkins);
        amt.contentAlignment= constants.CONTENT_ALIGN_MIDDLE_RIGHT;
        return amt;
      }
      else if(fieldType == "date" && FormatJSON.dateFormat){
        var modifiedDate = "";
        if(fieldValue.length == 8){
          modifiedDate = this.modifyRawDate(fieldValue);
          fieldValue =  modifiedDate;
        }
        var dateObjFromString = this.getDateObjectfromString(fieldValue);
        var formatDate = {};
        formatDate.skin = formatSkins.DATE_SKIN?formatSkins.DATE_SKIN:formatSkins.TEXT_SKIN;
        formatDate.text = this.getFormatedDateString(dateObjFromString,FormatJSON.dateFormat);
        formatDate.contentAlignment= constants.CONTENT_ALIGN_MIDDLE_LEFT;
        return formatDate;
      }
      else if(fieldType== "percentage"){
        var formatPercentage = {};
         let deformattedAmt = this.removeCurrencyWithCommas(fieldValue);
        formatPercentage.text = this.formatValueAndAppendPercentageSymbol(deformattedAmt,formatSkins);
        formatPercentage.skin = formatSkins.PERCENTAGE_SKIN?formatSkins.PERCENTAGE_SKIN:formatSkins.TEXT_SKIN;
          formatPercentage.contentAlignment= constants.CONTENT_ALIGN_MIDDLE_RIGHT;
        return formatPercentage;
      }
            else if(fieldType== "colorpercentage"){
        var formatPercentage = {};
        let deformattedAmt = this.removeCurrencyWithCommas(fieldValue);
        formatPercentage.text = this.formatValueAndAppendPercentageSymbolWithPositiveNegative(deformattedAmt,formatSkins);
               if((Number(fieldValue))>=0)
        			formatPercentage.skin = formatSkins.POSITIVE_AMOUNT_SKIN;
              else
                	formatPercentage.skin = formatSkins.NEGATIVE_AMOUNT_SKIN;
                
        //formatPercentage.skin = formatSkins.PERCENTAGE_SKIN?formatSkins.PERCENTAGE_SKIN:formatSkins.TEXT_SKIN;
          formatPercentage.contentAlignment= constants.CONTENT_ALIGN_MIDDLE_RIGHT;
        return formatPercentage;
      }
            else if(fieldType== "textAmount"){
        var formatPercentage = {};
        formatPercentage.text = this.truncateStringWithGivenLength(fieldValue,30); 
        if (formatPercentage.text.indexOf('.') > -1)
        	formatPercentage.text = this.formatAmount(formatPercentage.text, FormatJSON);
        formatPercentage.toolTip=fieldValue;
         formatPercentage.contentAlignment=  constants.CONTENT_ALIGN_MIDDLE_RIGHT;
        formatPercentage.skin = formatSkins.PERCENTAGE_SKIN?formatSkins.PERCENTAGE_SKIN:formatSkins.TEXT_SKIN;
        return formatPercentage;
      }
       else if(fieldType== "text"){
        var formatPercentage = {};
        formatPercentage.text = this.truncateStringWithGivenLength(fieldValue,30);
        formatPercentage.toolTip=fieldValue;
         formatPercentage.contentAlignment= constants.CONTENT_ALIGN_MIDDLE_LEFT;
        formatPercentage.skin = formatSkins.PERCENTAGE_SKIN?formatSkins.PERCENTAGE_SKIN:formatSkins.TEXT_SKIN;
        return formatPercentage;
      }
             else if(fieldType== "orderId"){
        var formatPercentage = {};
        formatPercentage.text = this.truncateStringWithGivenLength(fieldValue,17);
        formatPercentage.toolTip=fieldValue;
         formatPercentage.contentAlignment= constants.CONTENT_ALIGN_MIDDLE_LEFT;
        formatPercentage.skin = formatSkins.PERCENTAGE_SKIN?formatSkins.PERCENTAGE_SKIN:formatSkins.TEXT_SKIN;
        return formatPercentage;
      }
       else if(fieldType== "normalAmount"){
        var formattedAmt = {};
          let deformattedAmt = this.removeCurrencyWithCommas(fieldValue);
        formattedAmt = this.formatAmountandAppendCurrencySymbol(deformattedAmt,FormatJSON.currencyCode,FormatJSON.amountFormat,formatSkins);
        formattedAmt.skin = formatSkins.TEXT_SKIN;
        formattedAmt.contentAlignment= constants.CONTENT_ALIGN_MIDDLE_RIGHT;
        return formattedAmt;
      }
      else {
        return {text : fieldValue,skin : formatSkins.TEXT_SKIN};
      } 
    }
    return {text : fieldValue,skin : formatSkins.TEXT_SKIN}; 
  };
  /**
    * returns date object from given date string
    * @param {String} dateString - a date string
    * @param {String} format - format of date
    * @returns {Date} - date object
    */
  FormatUtils.prototype.getDateObjectFromCalendarString = function (dateString, format) {
    try {
      var finalDateTime = null;
      if (dateString) {
        var formattype = format.toUpperCase();
        var yyyyIndex = formattype.indexOf("YYYY");
        var mmIndex = formattype.indexOf("MM");
        var ddIndex = formattype.indexOf("DD");
        var hhIndex = formattype.indexOf("HH");
        var minIndex = formattype.indexOf("MM", mmIndex + 1);
        var ssIndex = formattype.indexOf("SS");
        if (yyyyIndex > -1 && mmIndex > -1 && ddIndex > -1) {
          var newdd = parseInt(dateString.substr(ddIndex, 2), 10);
          var newmm = parseInt(dateString.substr(mmIndex, 2), 10);
          var newyyyy = parseInt(dateString.substr(yyyyIndex, 4), 10);
          if (newdd && (0 < newdd && newdd <= 31) && (newmm && (0 < newmm && newmm <= 12)) && (newyyyy && 0 <= newyyyy)) {
            finalDateTime = new Date();
            finalDateTime.setYear(newyyyy);
            finalDateTime.setMonth(newmm - 1);
            finalDateTime.setDate(newdd);
            //finalDateTime = new Date(Date.UTC(newyyyy, newmm - 1, newdd, 0, 0, 0, 0));
          }
          var newTime = hhIndex > -1 ? dateString.substr(hhIndex, 2) : null;
          newTime = newTime ? parseInt(newTime, 10) : null;
          if (newTime && newTime < 24) {
            finalDateTime = finalDateTime ? finalDateTime.setHours(newTime, 0, 0) : null;
            finalDateTime = new Date(finalDateTime);
          }
          var newmin = minIndex > -1 ? dateString.substr(minIndex, 2) : null;
          newmin = newmin ? parseInt(newmin, 10) : null;
          if (newmin) {
            finalDateTime = finalDateTime ? finalDateTime.setMinutes(newmin) : null;
            finalDateTime = new Date(finalDateTime);
          }
          var newss = ssIndex > -1 ? dateString.substr(ssIndex, 4) : null;
          newss = newss ? parseInt(newss, 10) : null;
          if (newss) {
            finalDateTime = finalDateTime ? finalDateTime.setSeconds(newss) : null;
            finalDateTime = new Date(finalDateTime);
          }
        }
        dateString = finalDateTime.toString();
        if (dateString.lastIndexOf(':') != -1) {
          dateString = dateString.substring(0, dateString.lastIndexOf(':') + 3);
        }
        return finalDateTime;
      }
    } catch (err) {
      kony.print("Error in ISO date formatting -->" + err);
    }
  };
    /**
    * returns deformatted amount from given amount string
     @Params {String} - amount string to be formatted 
    * @returns {String} - deformatted Amount string
    //formatingUtil is an instance of project/Modules/require/FormatUtil.js 
    */
  FormatUtils.prototype.removeCurrencyWithCommas = function(amount){
    if(amount === undefined || amount === null || amount === ""){
      return "";
    }else{
      let result = this.formatingUtil.deFormatAmount(amount);
      return result;
    }
  };
  /**
    * Formats and appends currency symbol to given amount
    * @param {String} amount - amount string to format
    * @param {String} currencySymbolCode - indicates the currency symbol code
    * @returns {String} - formated and currency symbol appended amount
    */
  FormatUtils.prototype.formatAmountAndAddCurrencySymbol = function (amount, currencySymbolCode) {
    if (kony.sdk.isNullOrUndefined(amount)) {
      amount = "0.00";
    }
    var formatedAmount = this.formatAmount(amount);
    var currencySymbol = this.getCurrencySymbol(currencySymbolCode);
    return formatedAmount[0] === '-' ? ('-' + currencySymbol + formatedAmount.split('-')[1]) : currencySymbol + formatedAmount;
  };
    FormatUtils.prototype.modifyRawDate= function(date){
    //yyyymmdd - yyyy-mm-dd
    var formattedDate = date.slice(0,4)+"-"+date.slice(4,6)+"-"+date.slice(6,8);
    return formattedDate;
  };
  
      FormatUtils.prototype.setEuropeFormat= function(){
    //yyyymmdd - yyyy-mm-dd
		this.europeFlow=true;
  };
  // For Truncation of String
          FormatUtils.prototype.truncateStringWithGivenLength= function(str, maxLength){
            str = str || "N/A" ;
            if(kony.sdk.isNullOrUndefined(maxLength)){
                return str;
            }
            if(!kony.sdk.isNullOrUndefined(maxLength) && maxLength>str.length){
                return str;
            }
            var result = str.substring(0, maxLength-3);
            result = result+"...";
            return result;
        };
  
  return FormatUtils;
});