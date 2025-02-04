define(function () {
  var voltmxmp = voltmxmp || {};
  var voltmxLoggerModule = require("com/voltmxmp/qrcodegenerator/voltmxLogger");
  voltmxmp.logger = (new voltmxLoggerModule("QR Code Generator Component")) || function () {};
  voltmxmp.logger.setLogLevel("TRACE");
  return {
    constructor: function (baseConfig, layoutConfig, pspConfig) {
      this.isGenerateInvoked=false;
      this.isWindowLoaded = true;
      this._qrcodeProperties = {
        width: "100",
        height: "100",
        colorDark: "#000000",
        colorLight: "#ffffff"
      };
      _qrgenerator_Callback = function(){
        this.isWindowLoaded = true;
        if(this.isGenerateInvoked && this.isWindowLoaded){
          this._qrGenerator(this. _dataToEncode);
          this.isGenerateInvoked = false;
        }
      }.bind(this); 
    },
    levels : {
      "Level L":"1",
      "Level M":"2",
      "Level Q":"3",
      "Level H":"4"
    },
    _dataToEncode: null,
    _correctLevel: null,
    //Logic for getters/setters of custom properties
		initGettersSetters: function () {
      defineSetter(this, 'dataToEncode', function (val) {
        voltmxmp.logger.trace('----------------------------- Start Setting dataToEncode', voltmxmp.logger.FUNCTION_ENTRY);
        if (val !== undefined && val !== null && val !== '') {
          this._dataToEncode = val;
        } else {
          throw {
            message: 'Input data to generate code.',
            Error: 'Wrong data To Encode'
          };
        }
        voltmxmp.logger.trace('----------------------------- End Setting dataToEncode', voltmxmp.logger.FUNCTION_EXIT);
      });
      defineSetter(this, 'colorLight', function (val) {
        voltmxmp.logger.trace('----------------------------- Start Setting colorLight', voltmxmp.logger.FUNCTION_ENTRY);
        if (val !== undefined && val !== null && val !== '' && typeof val === 'string') {
          this._qrcodeProperties.colorLight = val;
        } else {
          throw {
            message: 'wrong data passed for colorLight',
            Error: 'Wrong colorLight'
          };
        }
        voltmxmp.logger.trace('----------------------------- End Setting colorLight', voltmxmp.logger.FUNCTION_EXIT);
      });
      defineSetter(this, 'colorDark', function (val) {
        voltmxmp.logger.trace('----------------------------- Start Setting colorDark', voltmxmp.logger.FUNCTION_ENTRY);
        if (val !== undefined && val !== null && val !== '' && typeof val === 'string') {
          this._qrcodeProperties.colorDark = val;
        } else {
          throw {
            message: 'wrong data passed for colorDark',
            Error: 'Wrong colorDark'
          };
        }
        voltmxmp.logger.trace('----------------------------- End Setting colorDark', voltmxmp.logger.FUNCTION_EXIT);
      });
      defineSetter(this, 'correctLevel', function (val) {
        voltmxmp.logger.trace('----------------------------- Start Setting correctLevel', voltmxmp.logger.FUNCTION_ENTRY);
        if (val !== undefined && val !== null && val !== '' && typeof val === 'string') {
          this._qrcodeProperties.correctLevel = this.levels[val];
        } else {
          throw {
            message: 'wrong data passed for correctLevel',
            Error: 'Wrong correctLevel'
          };
        }
        voltmxmp.logger.trace('----------------------------- End Setting correctLevel', voltmxmp.logger.FUNCTION_EXIT);
      });
    },
    generate: function () {
      try {
        voltmxmp.logger.trace("----------------------------- Start  generate", voltmxmp.logger.FUNCTION_ENTRY);	
        if(!this.isGenerateInvoked){
          this.isGenerateInvoked=true;
        }
        if(this.isWindowLoaded){
          this._qrGenerator(this._dataToEncode); 
        }
        voltmxmp.logger.trace("----------------------------- End generate", voltmxmp.logger.FUNCTION_EXIT);
      } catch (e) {
        voltmxmp.logger.error(JSON.stringify(e), voltmxmp.logger.EXCEPTION);
      }
    },
    _qrGenerator: function (mytext) {
      try {
        voltmxmp.logger.trace("----------------------------- Start  _qrGenerator", voltmxmp.logger.FUNCTION_ENTRY);
        if (mytext !== undefined && mytext !== null && mytext !== "" && typeof mytext === 'string') {	
          this.view.brsrQRCodeGenerator.evaluateJavaScript("doqr('" + mytext + "','" + JSON.stringify(this._qrcodeProperties) + "');");
        } else {
          throw {
            message: 'wrong data passed for mytext',
            Error: 'Wrong text passed'
          };
        }
        voltmxmp.logger.trace("----------------------------- End _qrGenerator", voltmxmp.logger.FUNCTION_EXIT);
      } catch (e) {
        voltmxmp.logger.error(JSON.stringify(e), voltmxmp.logger.EXCEPTION);
      }
    }
	};
});