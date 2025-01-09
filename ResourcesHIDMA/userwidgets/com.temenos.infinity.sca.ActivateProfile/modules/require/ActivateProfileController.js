define(['OLBConstants'],function(OLBConstants) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._breakpoints = "";
      this._headingtext  ="";
      this._descriptiontext ="";
      this.currentBreakpoint = 1366;
      this._qrCodeWidth = 0;
      this._qrCodeHeight = 0;
      this._qrCodeCorrectionValue = 0;
      this._qrCodeColorDark = "";
      this._qrCodeColorLight = "";
      this._appStoreQRCodeText = "";
      this._playStoreQRCodeText = "";
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineSetter(this, 'breakpoints', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._breakpoints = val;
        }
      });
      defineGetter(this, 'breakpoints', function () {
        return this._breakpoints;
      });
      defineSetter(this, 'headingtext', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._headingtext = val;
        }
      });
      defineGetter(this, 'headingtext', function () {
        return this._headingtext;
      });
      defineSetter(this, 'descriptiontext', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._descriptiontext = val;
        }
      });
      defineGetter(this, 'descriptiontext', function () {
        return this._descriptiontext;
      });
      defineGetter(this, 'qrCodeWidth', () => {
        return this._qrCodeWidth;
      });
      defineSetter(this, 'qrCodeWidth', value => {
        this._qrCodeWidth = value;
      });
      defineGetter(this, 'qrCodeHeight', () => {
        return this._qrCodeHeight;
      });
      defineSetter(this, 'qrCodeHeight', value => {
        this._qrCodeHeight = value;
      });
      defineGetter(this, 'qrCodeCorrectionValue', () => {
        return this._qrCodeCorrectionValue;
      });
      defineSetter(this, 'qrCodeCorrectionValue', value => {
        this._qrCodeCorrectionValue = value;
      });
      defineGetter(this, 'qrCodeColorDark', () => {
        return this._qrCodeColorDark;
      });
      defineSetter(this, 'qrCodeColorDark', value => {
        this._qrCodeColorDark = value;
      });
      defineGetter(this, 'qrCodeColorLight', () => {
        return this._qrCodeColorLight;
      });
      defineSetter(this, 'qrCodeColorLight', value => {
        this._qrCodeColorLight = value;
      });
      defineGetter(this, 'appStoreQRCodeText', () => {
        return this._appStoreQRCodeText;
      });
      defineSetter(this, 'appStoreQRCodeText', value => {
        this._appStoreQRCodeText = value;
      });
      defineGetter(this, 'playStoreQRCodeText', () => {
        return this._playStoreQRCodeText;
      });
      defineSetter(this, 'playStoreQRCodeText', value => {
        this._playStoreQRCodeText = value;
      });
    },

    preShow : function(){
      this.assignDefaultText();
    },

    assignDefaultText: function(){
      this.view.lblBlueAlertText.text = this.getStringFromi18n(this._descriptiontext);
      this.view.lblActivateProfile.text= this.getStringFromi18n(this._headingtext);
    },

    onBreakpointChange : function(breakpoint){      
      this.currentBreakpoint = breakpoint;      
      if (breakpoint <= 640) {
        this.setMobileView();
      } else if (breakpoint <= 1024) {
        this.setTabletView();
      } else {
        this.setDesktopView();
      }
      this.view.forceLayout();
    },

    setMobileView: function(){
      this.view.flxActivateProfileQRScan.top = "0px";     
      this.view.flxActivateProfileQRScan.left = "7%";
      this.view.flxActivateProfileQRScan.right = "7%";

      this.view.lblActivateProfile.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
      this.view.lblActivateProfile.skin = "bbSknLbl424242SSP13Px";

      this.view.flxAlertText.top = "21dp";
      this.view.flxAlertTextInner.layoutType = kony.flex.FLOW_HORIZONTAL;
      this.view.imgBlueAlert.centerX = "";
      this.view.lblBlueAlertText.centerX = "";
      this.view.lblBlueAlertText.top = "0px";
      this.view.lblBlueAlertText.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
      this.view.lblBlueAlertText.skin = "sknBBLabelSSP42424211px";
      this.view.lblBlueAlertText.width = "218px";

      this.view.flxQRScanner.top = "50px";
      this.view.flxQRScanner.height = "206px";

      this.view.lblCallUs.top = "20px";
      this.view.lblCallUs.skin = "bbSknLbl424242SSP13Px";
    },

    setTabletView: function(){
      this.view.flxActivateProfileQRScan.top = "5%";    
      this.view.flxActivateProfileQRScan.left = "15%";
      this.view.flxActivateProfileQRScan.right = "15%";

      this.view.lblActivateProfile.contentAlignment = constants.CONTENT_ALIGN_CENTER;
      this.view.lblActivateProfile.skin = "bbSknLbl424242SSP20Px";

      this.view.flxAlertText.top = "16dp";
      this.view.flxAlertTextInner.layoutType = kony.flex.FLOW_VERTICAL;
      this.view.imgBlueAlert.centerX  = "50%";
      this.view.lblBlueAlertText.centerX = "50%";
      this.view.lblBlueAlertText.top = "8px";
      this.view.lblBlueAlertText.contentAlignment = constants.CONTENT_ALIGN_CENTER;
      this.view.lblBlueAlertText.skin = "bbSknLbl424242SSP13Px";
      this.view.lblBlueAlertText.width = "318px";

      this.view.flxQRScanner.top = "50px";
      this.view.flxQRScanner.height = "206px";

      this.view.lblCallUs.top = "20px";
      this.view.lblCallUs.skin = "bbSknLbl424242SSP15Px";
    },

    setDesktopView: function(){
      this.view.flxActivateProfileQRScan.top = "7%";
      this.view.flxActivateProfileQRScan.left = "74dp";
      this.view.flxActivateProfileQRScan.right = "74dp";

      this.view.lblActivateProfile.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
      this.view.lblActivateProfile.skin = "bbSknLbl424242SSP20Px";

      this.view.flxAlertText.top = "30dp";
      this.view.flxAlertTextInner.layoutType = kony.flex.FLOW_HORIZONTAL;
      this.view.imgBlueAlert.centerX = "";
      this.view.lblBlueAlertText.centerX = "";
      this.view.lblBlueAlertText.top = "0px";
      this.view.lblBlueAlertText.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
      this.view.lblBlueAlertText.skin = "bbSknLbl424242SSP13Px";
      this.view.lblBlueAlertText.width = "318px";

      this.view.flxQRScanner.top = "65px";
      this.view.flxQRScanner.height = "206px";

      this.view.lblCallUs.top = "10px";
      this.view.lblCallUs.skin = "bbSknLbl424242SSP15Px";
    },
    
    getStringFromi18n: function(stringValue){
      return  kony.i18n.getLocalizedString(stringValue) ? kony.i18n.getLocalizedString(stringValue) : stringValue;
    },

    showQRCode: function(){
      if(OLBConstants.CLIENT_PROPERTIES.APP_STORE_QRCODE !== undefined && OLBConstants.CLIENT_PROPERTIES.APP_STORE_QRCODE !== null && OLBConstants.CLIENT_PROPERTIES.APP_STORE_QRCODE)
        this._appStoreQRCodeText = OLBConstants.CLIENT_PROPERTIES.APP_STORE_QRCODE;
      if(OLBConstants.CLIENT_PROPERTIES.PLAY_STORE_QRCODE !== undefined && OLBConstants.CLIENT_PROPERTIES.PLAY_STORE_QRCODE !== null && OLBConstants.CLIENT_PROPERTIES.PLAY_STORE_QRCODE)
        this._playStoreQRCodeText = OLBConstants.CLIENT_PROPERTIES.PLAY_STORE_QRCODE;
      this.view.QRCodeGenerator.setContext(this.getStringFromi18n(this._appStoreQRCodeText), this._qrCodeWidth, this._qrCodeHeight, this._qrCorrectionValue, this._qrCodeColorDark, this._qrCodeColorLight);
      this.view.QRCodeGenerator1.setContext(this.getStringFromi18n(this._playStoreQRCodeText), this._qrCodeWidth, this._qrCodeHeight, this._qrCorrectionValue, this._qrCodeColorDark, this._qrCodeColorLight);
    },
  };
});