define(function () {
  
  function FomatValueUtils(){
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
  FomatValueUtils.prototype.formatAmount = function (amount,FormatData) {
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
  /**
    * Extract the currency symbol
    * @param {String} currencySymbolCode - indicates the currency symbol code
    * @returns {String} - returns the currency symbol
    */
  FomatValueUtils.prototype.getCurrencySymbol = function (currencySymbolCode) {
    if (currencySymbolCode) {
      if (this.currencyCode[currencySymbolCode]) {
        return this.currencyCode[currencySymbolCode];
      }
      else {
        return currencySymbolCode;
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
  FomatValueUtils.prototype.getCurrencySymbolCode = function (currencySymbol) {
    if (currencySymbol)  {
      var data = this.currencyCode;
      for (key in data) {
        if (data[key] === currencySymbol)
          return key;
      }
    }
    return currencySymbol;
  };
  /**
    * Formats and appends currency symbol to given amount
    * @param {String} amount - amount string to format
    * @param {String} currencySymbolCode - indicates the currency symbol code
    *@param {JSON} FormatData -FormatData json which has properties of how to format amount
    * @returns {String} - formated and currency symbol appended
    */
  FomatValueUtils.prototype.formatAmountandAppendCurrencySymbol = function (amount,currencySymbolCode,FormatData) {
    if (kony.sdk.isNullOrUndefined(amount) || amount.trim() == "" || amount =="0") {
      amount = "0.00";
    }
    var amountWithSeperator = this.formatAmount(amount,FormatData);
    var formattedAmount ="";
    var currencySymbol = "";
    if((Number(amount))>=0){
       formattedAmount=FormatData.positiveFormat;
      if(FormatData && formattedAmount.indexOf("{CS}")!==-1){
        currencySymbol = this.getCurrencySymbol(currencySymbolCode);
        formattedAmount= formattedAmount.replace("{CS}",currencySymbol);
      }
      else{
        currencySymbol = currencySymbolCode;
        formattedAmount= formattedAmount.replace("{CT}",currencySymbol);
      }
      formattedAmount= formattedAmount.replace("{D}",amountWithSeperator);
      return formattedAmount;
    }
    else{
       formattedAmount=FormatData.negativeFormat;
      if(FormatData && formattedAmount.indexOf("{CS}")!==-1){
        currencySymbol = this.getCurrencySymbol(currencySymbolCode);
        formattedAmount= formattedAmount.replace("{CS}",currencySymbol);
      }
      else{
        currencySymbol = currencySymbolCode;
        formattedAmount= formattedAmount.replace("{CT}",currencySymbol);
      }
      formattedAmount= formattedAmount.replace("{D}",amountWithSeperator.split('-')[1]);
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
  FomatValueUtils.prototype.formatValueAndAppendPercentageSymbol = function (Value) {
    if (kony.sdk.isNullOrUndefined(Value) || Value.trim() == "" || Value =="0") {
      amount = "0.00";
    }
    var valueWithSeperator = this.formatAmount(Value);
    var formattedValue = valueWithSeperator+"%";
    return formattedValue;
  };
  /**
    * Appends the currency symbol to the amount
    * @member of  FomatValueUtils
    * @param {String} amount - amount string to format
    * @param {String} currencySymbolCode - indicates the currency symbol code
    * @returns {String} - amount with appended currency code
    */
  FomatValueUtils.prototype.appendCurrencySymbol = function (amount, currencySymbolCode) {
    var currencySymbol = this.getCurrencySymbol(currencySymbolCode);
    return amount[0] === '-' ? ('-' + currencySymbol + amount.split('-')[1]) : currencySymbol + amount;
  };
  
  FomatValueUtils.prototype.defaultValueForGroup = function (locale) {
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
  FomatValueUtils.prototype.getDecimalSeparator = function (locale) {
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
   FomatValueUtils.prototype.formatAccoutNumber = function(formatData,accNum){
     var regex = new RegExp(formatData.format,formatData.modifiers);
     return accNum.replace(regex, formatData.replaceCharacter);
   };
  /**
    * Helper function and property on Date class
    * @param {Date} dateObj - a date object to format
    * @param {String} formatString - required formatString
    * @returns {String} - formated date string
    */
  FomatValueUtils.prototype.getFormatedDateString = function (dateObj, formatString) {
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
  FomatValueUtils.prototype.getDateObjectfromString = function (dateString, format) {
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
    return FomatValueUtils;
});