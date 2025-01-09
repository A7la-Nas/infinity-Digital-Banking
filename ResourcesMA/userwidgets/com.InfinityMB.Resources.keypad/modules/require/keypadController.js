define(function() {

	return {
		keypadChar: '',
		setChar: function(par){
			this.keypadChar = par;
			this.view.txtKeypad.text = par;
		},
		clearChar: function(){
			this.view.txtKeypad.text = '';
			this.keypadChar = '';
		},
      	formatAmount : function(keypadString){
          var seperator,decimalPoint,amount;
          var tillPoint = keypadString.substring(0,keypadString.indexOf('.'));
          var afterPoint = keypadString.substring(keypadString.indexOf('.')+1,keypadString.length);
          var locale = kony.i18n.getCurrentLocale();
          kony.print("current locale : "+locale);
          if(locale == 'en' || locale == "en_GB" || locale == "en_US" || locale == 'ar_AE'){
            kony.print("not formating the amount - keypad string : "+keypadString);
            return keypadString;
          }
          else if (locale == 'es_ES' || locale == "de_DE"){
            seperator = ',';
            decimalPoint = '.';
            amount = tillPoint.replace(/,/g, decimalPoint) + seperator + afterPoint;
            kony.print("amount is "+amount);
            return amount;
          }
          else if (locale == "fr_FR"|| locale == "sv_SE"){
            seperator = ' ';
            decimalPoint = ',';
            amount = tillPoint.replace(/,/g, seperator) + decimalPoint + afterPoint;
            kony.print("amount is "+amount);
            return amount;
          }
        }
	};
});