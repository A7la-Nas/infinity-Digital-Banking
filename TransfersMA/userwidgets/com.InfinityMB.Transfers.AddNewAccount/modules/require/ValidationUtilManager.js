/**
  * ValidationUtilManager is a utility class which provides the function for validations
  */
define(function() {
  /**
   * ValidationUtilManager consists of utility methods related to validation
   *@alias module:ValidationUtilManager
   *@class
   */
  function ValidationUtilManager(){
    this.phoneNumberRegex = /^([0-9]){7,15}$/;	
	this.countryCodeRegex = /^\+{1}[0-9]+$/g;
    this.invalidChar = "&%<>\/\+'=|\\" ;
    this.usernameRegex = "";
    //this.benificiaryNameRegex=/^[A-Za-z0-9 ]+$/;
    this.benificiaryNameRegex = /^[A-Za-z0-9 \u0600-\u06FF]+$/;
    this.passwordRegex = "";
    //this.alphaNumeric=/^[a-z\d\-_\s]+$/i;
    this.alphaNumeric = /^[a-z\d\-_\s\u0600-\u06FF]+$/i;
    this.zipRegex = /^[^-_][a-zA-Z0-9\s-]*[a-zA-Z0-9\s]+$/;
  }

  /**
  * check whether given ZIP code is valid
  * @param {String} text - A ZIP code to validate
  * @param {String} alertMessage - An alert message to be logged
  * @returns {Boolean} - true if valid, false if invalid
  */
  ValidationUtilManager.prototype.isValidZip = function(zipCode){
    if(zipCode === null || zipCode === undefined || zipCode === "" )return false;// no code case
    if(zipCode.match(this.zipRegex)){
      return true;
    }else{
      return false;
    }
  };

  ValidationUtilManager.prototype.isValidIBANNumber = function(text) {
        var regex = this.alphaNumeric;
        if (kony.sdk.isNullOrUndefined(text)) {
            return false;
        }
        text = text.trim();
        if (!text.match(regex)) {
            return false;
        }
        return true;
 };
  /**
  * check whether given email is valid
  * @param {String} username - An email to validate
  * @returns {Boolean} - true if valid, false if invalid
  */
  ValidationUtilManager.prototype.isValidEmail = function(email){
    return kony.string.isValidEmail(email);
  };
  /**
  * check whether given phone number is valid
  * @param {String} username - Any phone number to validate
  * @returns {Boolean} - true if valid, false if invalid
  */
  ValidationUtilManager.prototype.isValidPhoneNumber = function(phoneNumber){
    var phoneno =  this.phoneNumberRegex;
    if(phoneNumber === null || phoneNumber === undefined || phoneNumber === "" )return false;// no number case
    if(phoneNumber.match(phoneno)){
      return true;
    }else{
      return false;
    }
  };

  /**
  * check whether given user name is valid
  * @param {String} username - A username to validate
  * @returns {Boolean} - true if valid, false if invalid
  */
  ValidationUtilManager.prototype.isValidUserName =function(username, minLength, maxLength){
    var min = (kony.sdk.isNullOrUndefined(minLength) && minLength === "") ? 8 : minLength;
    var max = (kony.sdk.isNullOrUndefined(maxLength) && maxLength === "") ? 24 : maxLength;
    if(username === null || username === undefined || username === "")
      return false;
    else if(username.indexOf(" ") !== -1) {
      return false;
    }else if(username.length < min || username.length > max){
      return false;
    }else if(!this.isInvalidCharacterPresent(username)){
      return false;
    }
    return true;
  };

  /**
  * check whether given BenificiaryName  is valid 
  * @member of ValidationUtilManager
  * @param {String} text - A DrivingLicenseNumber code to validate
  * @returns {Boolean} - true if valid, false if invalid
  */
  ValidationUtilManager.prototype.isValidbenificiaryName = function(text){
    var regex = this.benificiaryNameRegex;
    if(kony.sdk.isNullOrUndefined(text)){
      return false;
    }
    text = text.trim();
    if(!text.match(regex)){
      return false;
    }
    return true;
  };
  
  ValidationUtilManager.prototype.isValidAccountName = function(text) {
        var regex = this.alphaNumeric;
        if (kony.sdk.isNullOrUndefined(text)) {
            return false;
        }
        text = text.trim();
        if (!text.match(regex)) {
            return false;
        }
        return true;
    };

  /**
  * Helper function to check whether given string has any invalid characters present
  * @param {String} value - A string to check
  * @returns {Boolean} - true if valid, false if any invalid character present
  */
  ValidationUtilManager.prototype.isInvalidCharacterPresent=function(value){
    var regexp = this.invalidChar;
    for(var i=0;i<regexp.length;i++){
      if(value.indexOf(regexp[i]) != -1){
        return false;
      }
    }
    return true;
  };

  /**
  * check whether given email is valid
  * @param {String} username - An email to validate
  * @returns {Boolean} - true if valid, false if invalid
  */
  ValidationUtilManager.prototype.isValidEmail = function(email){
    return kony.string.isValidEmail(email);
  };

  /**
  * check whether given phone number is valid
  * @param {String} username - Any phone number to validate
  * @returns {Boolean} - true if valid, false if invalid
  */
  ValidationUtilManager.prototype.isValidPhoneNumber = function(phoneNumber){
    var phoneno =  this.phoneNumberRegex;
    if(phoneNumber === null || phoneNumber === undefined || phoneNumber === "" )return false;// no number case
    if(phoneNumber.match(phoneno)){
      return true;
    }else{
      return false;
    }
  };

  /**
  * check whether given country codeis valid 
  * @member of ValidationUtilManager
  * @param {String} username - Any country code to validate
  * @returns {Boolean} - true if valid, false if invalid
  */
  ValidationUtilManager.prototype.isValidCountryCode = function(CountryCode){        
    var countryCodeRegex =  this.countryCodeRegex;
    if(CountryCode === null || CountryCode === undefined || CountryCode === "" || CountryCode.length > 4)
      return false;
    if(CountryCode.match(countryCodeRegex)){  
      return true;  
    }
    else{    
      return false;  
    }   
  };

  /**
  * check whether given Account Number is valid
  * @param {Number} accNumber - Account Number to validate
  * @returns {Boolean} - true if valid, false if invalid
  */
  ValidationUtilManager.prototype.isValidAccountNumber = function(accNumber){
    if(isNaN(accNumber) || accNumber === null || accNumber.length<=0 || accNumber == undefined || accNumber.length>24 ){
      return false;
    }
    else {
      return true;
    }
  };

  /**
  * check whether given IBAN is valid
  * @param {String} iban- IBAN to validate
  * @returns {Boolean} - true if valid, false if invalid
  */
  ValidationUtilManager.prototype.isValidIBAN = function(iban) {
    iban = iban.replace(/\s/g, '');
    if (!iban.match(/^[\dA-Z]+$/))
      return false;
    var ibanLen = {
      NO:15, BE:16, DK:18, FI:18, FO:18, GL:18, NL:18, MK:19,
      SI:19, AT:20, BA:20, EE:20, KZ:20, LT:20, LU:20, CR:21,
      CH:21, HR:21, LI:21, LV:21, BG:22, BH:22, DE:22, GB:22,
      GE:22, IE:22, ME:22, RS:22, AE:23, GI:23, IL:23, AD:24,
      CZ:24, ES:24, MD:24, PK:24, RO:24, SA:24, SE:24, SK:24,
      VG:24, TN:24, PT:25, IS:26, TR:26, FR:27, GR:27, IT:27,
      MC:27, MR:27, SM:27, AL:28, AZ:28, CY:28, DO:28, GT:28,
      HU:28, LB:28, PL:28, BR:29, PS:29, KW:30, MU:30, MT:31
    };
    var len = iban.length;
    if (len != ibanLen[iban.substr(0,2)])
      return false;
    var ibanNum,ibanMod;
    iban = iban.substr(4) + iban.substr(0,4);
    for (ibanNum='', i=0; i<len; i+=1)
      ibanNum+=parseInt(iban.charAt(i),36);
    for (ibanMod=ibanNum.substr(0,15)%97, ibanNum=ibanNum.substr(15); ibanNum; ibanNum=ibanNum.substr(13))
    ibanMod=(ibanMod+ibanNum.substr(0,13))%97;
    return ibanMod == 1;
  };
  return ValidationUtilManager;
});
