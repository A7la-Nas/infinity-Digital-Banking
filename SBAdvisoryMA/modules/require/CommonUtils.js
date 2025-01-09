define([], function () {
  function CommonUtils() {
    this.commonUtilsInstance = null;
  }

  CommonUtils.getCommonUtils = function () {
    if (!this.commonUtilsInstance) {
      this.commonUtilsInstance = new CommonUtils();
    }
    return this.commonUtilsInstance;
  };

  CommonUtils.prototype.parseFloatTwoDigit = function(nStr) {
    return parseFloat(this.parseStringTwoDigit(nStr));
  };

  CommonUtils.prototype.parseStringTwoDigit = function(nStr) {
    return parseFloat(nStr.toString().replace("$", "").replace(/,/g, "")).toFixed(2);
  };

  CommonUtils.prototype.formatMoney = function(nStr) {
    nStr = this.parseStringTwoDigit(nStr);
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
  };

  CommonUtils.prototype.formatMoneyWithCurrencySign = function(nStr) {
    if(nStr!==0 && (!(kony.sdk.isNullOrUndefined(nStr)) && (!isNaN(nStr)))){
      if(nStr >= 0){
      return "$" + this.formatMoney(nStr);
      }else{
        return "-" + "$" + this.formatMoney(Math.abs(nStr));
      }
    }else{
      return "$0.00";
    }
  };

  CommonUtils.prototype.getTopNDrivers = function (positiveDrivers, negativeDrivers, n) {
    var driverCount = n;
    if(positiveDrivers.length > 0){
      if(positiveDrivers.length >= 3){
        positiveDrivers = positiveDrivers.sort((a, b) => (parseFloat(a.percentage) < parseFloat(b.percentage)) ? 1 : -1).slice(0, 3);
        driverCount = n-1;
      }
      else{
        driverCount = n-1;
      }
    }
    if(negativeDrivers.length > 0){
      if(negativeDrivers.length >= driverCount){
        negativeDrivers = negativeDrivers.sort((a, b) => (parseFloat(a.percentage) < parseFloat(b.percentage)) ? 1 : -1).slice(0, driverCount);
      }
      else{
        negativeDrivers = negativeDrivers.sort((a, b) => (parseFloat(a.percentage) < parseFloat(b.percentage)) ? 1 : -1)
      }
    }
    var allDrivers = positiveDrivers.concat(negativeDrivers);
    return allDrivers;
  };

  CommonUtils.prototype.mapDriverDescription = function (name = "", value = 0) {
    // driverConstants is a GLOBAL Variable and also object array that contains all texts regarding to drivers...
    // For more information please check:
    // https://docs.kony.com/konylibrary/visualizer/visualizer_user_guide/Content/Global_Variables_and_Data_Store_Keys.htm
    var driverTextOBJ = driverConstants.find(dOBJ => dOBJ.key === name);

    if(driverTextOBJ) {
      if(value >= 0) {
        return  `${driverTextOBJ.value.positive} <b>${this.formatMoney(value)}</b>`;
      } else {
        return  `${driverTextOBJ.value.negative} <b>${this.formatMoney(value)}</b>`;
      }
    }

    return "";
  };

  CommonUtils.prototype.mapCashflowDriverDescription = function (name = "", value = 0, percent = 0) {
    // driverConstants is a GLOBAL Variable and also object array that contains all texts regarding to drivers...
    // For more information please check:
    // https://docs.kony.com/konylibrary/visualizer/visualizer_user_guide/Content/Global_Variables_and_Data_Store_Keys.htm
    var driverTextOBJ = insightConstants.find(dOBJ => dOBJ.key === name);

    if(driverTextOBJ) {
      if(value >= 0) {
        if(driverTextOBJ.value.positive.split("[")[1][0] === "%"){
           value = value * 100;
           return  `${driverTextOBJ.value.positive.split("[")[0]} <b>${value}%</b>`;
           }
        else{
          return  `${driverTextOBJ.value.positive.split("[")[0]} <b>${this.formatMoneyWithCurrencySign(value)}</b>`;
        }
      } else {
        if(driverTextOBJ.value.negative.split("[")[1][0] === "%"){
           value = value * 100;
           return  `${driverTextOBJ.value.negative.split("[")[0]} <b>${value}%</b>`;
           }
        else{
          return  `${driverTextOBJ.value.negative.split("[")[0]} <b>${this.formatMoneyWithCurrencySign(value)}</b>`;
        }
      }
    }

    return "";
  };

  return CommonUtils;
});