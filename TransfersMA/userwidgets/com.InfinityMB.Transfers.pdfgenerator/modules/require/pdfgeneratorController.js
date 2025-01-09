define(['./ControllerImplementation', './KonyLogger'], function(ControllerImplementation, konyLogger) {
  var konymp = konymp || {};
  konymp.logger = (new konyLogger("PDF Generator Component")) || function() {};
  konymp.logger.setLogLevel("DEBUG");
  konymp.logger.enableServerLogging = true;
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      var analytics=require("com/InfinityMB/Transfers/"+"pdfgenerator"+"/analytics");
      analytics.notifyAnalytics();
      this.handler = new ControllerImplementation(this, baseConfig.id);
      this.deviceInfo = kony.os.deviceInfo();
      _createFile = function(base64data) {
        this.handler.createFile(base64data,this._fileName);
      }.bind(this);
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineSetter(this, "fileName", function(val) {
        konymp.logger.trace("----------Entering fileName Setter---------", konymp.logger.FUNCTION_ENTRY);
        if (val !== null) {
          this._fileName = val;
        }
        konymp.logger.trace("----------Exiting fileName Setter---------", konymp.logger.FUNCTION_EXIT);
      });
      defineGetter(this, "fileName", function() {
        konymp.logger.trace("----------Entering fileName Getter---------", konymp.logger.FUNCTION_ENTRY);
        konymp.logger.trace("----------Exiting fileName Getter---------", konymp.logger.FUNCTION_EXIT);
        return this._fileName;
      });
      defineSetter(this, "orientation", function(val) {
        konymp.logger.trace("----------Entering orientation Setter---------", konymp.logger.FUNCTION_ENTRY);
        if (val !== null) {
          this._orientation = val;
        }
        konymp.logger.trace("----------Exiting orientation Setter---------", konymp.logger.FUNCTION_EXIT);
      });
      defineGetter(this, "orientation", function() {
        konymp.logger.trace("----------Entering orientation Getter---------", konymp.logger.FUNCTION_ENTRY);
        konymp.logger.trace("----------Exiting orientation Getter---------", konymp.logger.FUNCTION_EXIT);
        return this._orientation;
      });
      defineSetter(this, "unit", function(val) {
        konymp.logger.trace("----------Entering unit Setter---------", konymp.logger.FUNCTION_ENTRY);
        if (val !== null) {
          this._unit = val;
        }
        konymp.logger.trace("----------Exiting unit Setter---------", konymp.logger.FUNCTION_EXIT);
      });
      defineGetter(this, "unit", function() {
        konymp.logger.trace("----------Entering unit Getter---------", konymp.logger.FUNCTION_ENTRY);
        konymp.logger.trace("----------Exiting unit Getter---------", konymp.logger.FUNCTION_EXIT);
        return this._unit;
      });
      defineSetter(this, "format", function(val) {
        konymp.logger.trace("----------Entering format Setter---------", konymp.logger.FUNCTION_ENTRY);
        if (val !== null) {
          this._format = val;
        }
        konymp.logger.trace("----------Exiting format Setter---------", konymp.logger.FUNCTION_EXIT);
      });
      defineGetter(this, "format", function() {
        konymp.logger.trace("----------Entering format Getter---------", konymp.logger.FUNCTION_ENTRY);
        konymp.logger.trace("----------Exiting format Getter---------", konymp.logger.FUNCTION_EXIT);
        return this._format;
      });
      defineSetter(this, "compress", function(val) {
        konymp.logger.trace("----------Entering compress Setter---------", konymp.logger.FUNCTION_ENTRY);
        if (val !== null) {
          this._compress = val;
        }
        konymp.logger.trace("----------Exiting compress Setter---------", konymp.logger.FUNCTION_EXIT);
      });
      defineGetter(this, "compress", function() {
        konymp.logger.trace("----------Entering compress Getter---------", konymp.logger.FUNCTION_ENTRY);
        konymp.logger.trace("----------Exiting compress Getter---------", konymp.logger.FUNCTION_EXIT);
        return this._compress;
      });
      defineSetter(this, "leftprop", function(val) {
        konymp.logger.trace("----------Entering leftprop Setter---------", konymp.logger.FUNCTION_ENTRY);
        if (val !== null) {
          this._leftprop = val;
        }
        konymp.logger.trace("----------Exiting leftprop Setter---------", konymp.logger.FUNCTION_EXIT);
      });
      defineGetter(this, "leftprop", function() {
        konymp.logger.trace("----------Entering leftprop Getter---------", konymp.logger.FUNCTION_ENTRY);
        konymp.logger.trace("----------Exiting leftprop Getter---------", konymp.logger.FUNCTION_EXIT);
        return this._leftprop;
      });
      defineSetter(this, "topprop", function(val) {
        konymp.logger.trace("----------Entering topprop Setter---------", konymp.logger.FUNCTION_ENTRY);
        if (val !== null) {
          this._topprop = val;
        }
        konymp.logger.trace("----------Exiting topprop Setter---------", konymp.logger.FUNCTION_EXIT);
      });
      defineGetter(this, "topprop", function() {
        konymp.logger.trace("----------Entering topprop Getter---------", konymp.logger.FUNCTION_ENTRY);
        konymp.logger.trace("----------Exiting topprop Getter---------", konymp.logger.FUNCTION_EXIT);
        return this._topprop;
      });
      defineSetter(this, "bottomprop", function(val) {
        konymp.logger.trace("----------Entering bottomprop Setter---------", konymp.logger.FUNCTION_ENTRY);
        if (val !== null) {
          this._bottomprop = val;
        }
        konymp.logger.trace("----------Exiting bottomprop Setter---------", konymp.logger.FUNCTION_EXIT);
      });
      defineGetter(this, "bottomprop", function() {
        konymp.logger.trace("----------Entering bottomprop Getter---------", konymp.logger.FUNCTION_ENTRY);
        konymp.logger.trace("----------Exiting bottomprop Getter---------", konymp.logger.FUNCTION_EXIT);
        return this._bottomprop;
      });
      defineSetter(this, "widthprop", function(val) {
        konymp.logger.trace("----------Entering widthprop Setter---------", konymp.logger.FUNCTION_ENTRY);
        if (val !== null) {
          this._widthprop = val;
        }
        konymp.logger.trace("----------Exiting widthprop Setter---------", konymp.logger.FUNCTION_EXIT);
      });
      defineGetter(this, "widthprop", function() {
        konymp.logger.trace("----------Entering widthprop Getter---------", konymp.logger.FUNCTION_ENTRY);
        konymp.logger.trace("----------Exiting widthprop Getter---------", konymp.logger.FUNCTION_EXIT);
        return this._widthprop;
      });
      defineSetter(this, "image", function(val) {
        konymp.logger.trace("----------Entering imageprop Setter---------", konymp.logger.FUNCTION_ENTRY);
        if (val !== null) {
          this._imageprop = val;
        }
        konymp.logger.trace("----------Exiting imageprop Setter---------", konymp.logger.FUNCTION_EXIT);
      });
      defineGetter(this, "image", function() {
        konymp.logger.trace("----------Entering imageprop Getter---------", konymp.logger.FUNCTION_ENTRY);
        konymp.logger.trace("----------Exiting imageprop Getter---------", konymp.logger.FUNCTION_EXIT);
        return this._imageprop;
      });
    },  
    /**
     * @api : generatePdfUsingHtmlString
     * @description : This function generates pdf using html string.
     * @param : htmlString - stringified html
     * @return : null
     */
    generatePdfUsingHtmlString: function(htmlString) {
      konymp.logger.trace('----------Entering generatePdfUsingHtmlString method---------', konymp.logger.FUNCTION_ENTRY);
      this.params = {"filename":this._fileName, 
                     "orientation":this._orientation,
                     "unit":this._unit,
                     "format":this._format,
                     "compress":this._compress,
                     "top":this._topprop,
                     "left":this._leftprop,
                     "bottom":this._bottomprop,
                     "width":this._widthprop,
                     "image":this._imageprop};
      this.view.pdfGenBrowser.evaluateJavaScript("generate(" + JSON.stringify(htmlString) + "," + JSON.stringify(this.deviceInfo) + ","+JSON.stringify(this.params) +")");   
      konymp.logger.trace('----------Exiting generatePdfUsingHtmlString method---------', konymp.logger.FUNCTION_EXIT);
    },
    /**
     * @api : generatePdfUsingDom
     * @description : This function generates pdf for a given viz element
     * @param : formFlexName - viz element name ex: Form1_flx1
     * @return : null
     */
    generatePdfUsingDom: function(formFlexName) {
      konymp.logger.trace('----------Entering generatePdfUsingDom method---------', konymp.logger.FUNCTION_ENTRY);
      this.params = {"filename":this._fileName, 
                     "orientation":this._orientation,
                     "unit":this._unit,
                     "format":this._format,
                     "compress":this._compress,
                     "top":this._topprop,
                     "left":this._leftprop,
                     "bottom":this._bottomprop,
                     "width":this._widthprop};
      var htmlobj=document.getElementById(formFlexName);
      if(htmlobj!==null && htmlobj!==undefined){
        this.view.pdfGenBrowser.evaluateJavaScript("generate(" + JSON.stringify(htmlobj.innerHTML) +"," + JSON.stringify(this.deviceInfo) + ","+JSON.stringify(this.params)+")");  
      }
      else{
        konymp.logger.error("-----------------------------passed invalid kony element name",konymp.logger.EXCEPTION);
        throw new Exception("2250","passed invalid kony element name ");
      }
      konymp.logger.trace('----------Exiting generatePdfUsingDom method---------', konymp.logger.FUNCTION_EXIT);
    }


  };
});