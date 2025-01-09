define(['CommonUtilities'],function(CommonUtilities) {
  var BROWSER_CONFIGURATION= {
    CHROME: {
      name: 'Chrome',
      display: 'Google Chrome',
      version: '68',
      browserIcon: 'chrome_256x256.png',
      downloadLink: 'https://www.google.com/intl/en_sg/chrome/'
    },
    SAFARI: {
      display: 'Safari',
      name: 'Safari',
      version: '9',
      browserIcon: 'safari_128x128.png'
    },
    IE: {
      display: 'Internet Explorer',
      name: 'IE',
      version: '11',
      warning: true
    }
  };
  var SUPPORTED_BROWSERS = {
    MAC: [BROWSER_CONFIGURATION.CHROME, BROWSER_CONFIGURATION.SAFARI],
    OTHERS: [BROWSER_CONFIGURATION.CHROME, BROWSER_CONFIGURATION.IE]
  };
  var browserNameMapping = {
    "Chrome": "Chrome Browser",
    "Edge": "Microsoft Edge",
    "Firefox": "Mozilla Firefox",
    "Safari": "Apple Safari",
    "IE": "Internet Explorer"
  };
  var browserSupport = [{
    "supportType": "SUPPORTED",
    "minimumVersionSupported": "68",
    "supportedOperatingSystems": "['Mac','Windows','Linux', 'CrOS']",
    "downloadLink": "https://www.google.com/chrome/",
    "displayName": "Chrome Browser",
    "icon": "chrome_128x128.png",
    "name": "Chrome Browser"
  }, {
    "supportType": "SUPPORTED",
    "minimumVersionSupported": "40",
    "supportedOperatingSystems": "['Mac','Windows']",
    "downloadLink": "https://www.microsoft.com/en-in/windows/microsoft-edge",
    "displayName": "Microsoft Edge",
    "icon": "edge_128x128.png",
    "name": "Microsoft Edge"
  }, {
    "supportType": "SUPPORTED",
    "minimumVersionSupported": "9.1.2",
    "supportedOperatingSystems": "['Mac']",
    "downloadLink": "https://support.apple.com/downloads/safari",
    "displayName": "Apple Safari",
    "icon": "safari_128x128.png",
    "name": "Apple Safari"
  }, {
    "supportType": "SUPPORTED_WITH_WARNING",
    "minimumVersionSupported": "11",
    "supportedOperatingSystems": "['Windows']",
    "downloadLink": "https://www.microsoft.com/en-in/download/Internet-Explorer-11-for-Windows-7-details.aspx",
    "displayName": "Internet Explorer",
    "icon": "edge_beta_2_128x128.png",
    "name": "Internet Explorer"
  },
  {
    "supportType": "SUPPORTED",
    "minimumVersionSupported": "73.0",
    "supportedOperatingSystems": "['Windows','Mac']",
    "downloadLink": "https://www.mozilla.org/en-US/firefox/windows",
    "displayName": "Mozilla Firefox",
    "icon": "firefox_128x128.png",
    "name": "Mozilla Firefox"
  }];
  /**
         * Get Browser Version and name
         * @returns {Object} Name and version of Browser
         */
  return {
    browserConfiguration : null,
    onBrowserDownloaded: null,
    onContinue: null,
    BROWSER_SUPPORTED : "SUPPORTED",
    BROWSER_SUPPORTED_WITH_WARNING : "SUPPORTED_WITH_WARNING",
    BROWSER_NOT_SUPPORTED : "NOT_SUPPORTED",
    setOnBrowserDownloaded: function (callback) {
      this.onBrowserDownloaded = callback;
    },
    setOnContinue: function (callback) {
      this.onContinue = callback;
    },
    getBrowserNameAndVersion: function() {
      var ua = navigator.userAgent,
          tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
      if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return {
          name: 'IE',
          version: (tem[1] || '')
        };
      }
      if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR|Edge\/(\d+)/)
        if (tem != null) {
          if (CommonUtilities.substituteforIncludeMethod(tem[0], 'Edge')) {
            return {
              name: 'Edge',
              version: tem[1]
            };
          } else if (CommonUtilities.substituteforIncludeMethod(tem[0], 'OPR')) {
            return {
              name: 'Opera',
              version: tem[1]
            };
          }
        }
      }
      M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
      if ((tem = ua.match(/version\/(\d+)/i)) != null) {
        M.splice(1, 1, tem[1]);
      }
      return {
        name: M[0],
        version: M[1]
      };
    },
    getMatchingBrowserConfiguration: function(os, browserSpec) {
      var supportedOSConfigurations = browserConfiguration.filter(function(config) {
        return config.supportedOperatingSystems.indexOf(os) > -1;
      })
      return supportedOSConfigurations.filter(function (bs) {
        if (bs.name === browserNameMapping[browserSpec.name]) {
          if (browserSpec.version) {
            if (Number(browserSpec.version.split(".")[0]) >= Number(bs.minimumVersionSupported.split(".")[0])) return bs;

          } else {
            return bs;
          }
        }
        //return browserConfigurations.name === browserNameMapping[browserSpec.name] && Number(browserSpec.version.split(".")[0]) >= Number(browserConfigurations.minimumVersionSupported.split(".")[0]);
      })[0]
    },
    /**
         * Checks whether the browser is supported by OLB according to a given config. 
         * @returns {String} Give the level of browser compatibility. BROWSER_NOT_SUPPORTED|BROWSER_SUPPORTED_WITH_WARNING|BROWSER_SUPPORTED
         */
    getBrowserSupportType: function() {
      var os = this.getOS();
      var browserSpecs = this.getBrowserNameAndVersion();
      var matchingConfig = this.getMatchingBrowserConfiguration(os, browserSpecs);
      if (!matchingConfig) {
        return this.BROWSER_NOT_SUPPORTED;
      }
      if (matchingConfig.supportType === this.BROWSER_SUPPORTED_WITH_WARNING) {
        return this.BROWSER_SUPPORTED_WITH_WARNING;
      }
      return this.BROWSER_SUPPORTED;
    },
    getOS: function() {
      if (navigator.appVersion.indexOf("Mac") > -1) {
        return "Mac"
      } else if (navigator.appVersion.indexOf("Win") > -1) {
        return "Windows";
      } else if (navigator.appVersion.indexOf("Linux") > -1) {
        return "Linux";
      } else if (navigator.appVersion.indexOf("CrOS")) {
        return "CrOS";
      }
      else {
        return "Others";
      }
    },
    /**
         * Returns the list of supported browsers with icons, name and download links for current OS.
         * @returns {Array[Object]}  List of Browsers with icon, displat and download links. 
         */
    getSupportedBrowsersList: function() {
      var os = this.getOS();
      var scope = this;
      var supportedBrowsers = browserConfiguration.filter(function(config) {
        return config.supportedOperatingSystems.indexOf(os) > -1;
      })
      var supportedBrowsersWithoutWarning = supportedBrowsers.filter(function(config) {
        return config.supportType === scope.BROWSER_SUPPORTED
      });
      return supportedBrowsersWithoutWarning;
    },
    /**
         * 
         */
    fetchSupportedBrowsersList: function() {
      browserConfiguration = browserSupport;
      /*var BrowserRepo  =  kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository("Browser");
                  BrowserRepo.customVerb("getSupportedBrowserMatrix", {}, getAllCompletionCallback);
                  var scope = this;

                  function  getAllCompletionCallback(status,  data,  error) {
                    var srh = applicationManager.getServiceResponseHandler();
                    var obj = srh.manageResponse(status,  data,  error);
                    if (obj["status"] === true) {
                      scope.browserConfiguration = browserSupport;
                      presentationSuccessCallback(obj["data"]);
                    } else {
                      presentationErrorCallback(obj["errmsg"]);
                    }
                  }*/
    },
    /**
         * Checks and show browser popup
         */
    checkBrowser: function() {
      if (kony.application.getCurrentBreakpoint() > 1024) {
        var supportType = this.getBrowserSupportType();
        var supportedBrowsers = this.getSupportedBrowsersList();
        switch (supportType) {
          case this.BROWSER_SUPPORTED:
            return;
          case this.BROWSER_SUPPORTED_WITH_WARNING:
            this.mapBrowserUI(supportedBrowsers, "WARNING")
            break;
          case this.BROWSER_NOT_SUPPORTED:
            this.mapBrowserUI(supportedBrowsers, "BLOCKING")
            break;
        }
      }
    },
    /**
         * 
         * @param {Array} supportedBrowsers Browsers which are supported
         * @param {String} type Type of the popup BLOCKING/WARNING
         */
    mapBrowserUI: function(supportedBrowsers, type) {
      //this.view.BrowserCheckPopup.setVisibility(true);
      //this.view.flxBrowserCheckWrapper.setVisibility(true);
      var scope = this;
      this.view.setVisibility(true);
      this.view.lblBrowserCheckHeading.text = kony.i18n.getLocalizedString("i18n.unsupportedBrowserHeading");
      if (type === "BLOCKING") {
        this.view.flxContinue.setVisibility(false);
        this.view.lblBrowserCheckMessage.text = kony.i18n.getLocalizedString("i18n.unsupportedBrowser");
        this.view.flxCloseBrowserCheck.setVisibility(false);
        this.view.flxBrowserCheckWrapper.height = "297dp";
      } else {
        this.view.flxCloseBrowserCheck.setVisibility(true);
        this.view.flxContinue.setVisibility(true);
        this.view.lblBrowserCheckMessage.text = kony.i18n.getLocalizedString("i18n.unsupportedBrowserWarning");
        this.view.flxBrowserCheckWrapper.height = "400dp";
      }
      supportedBrowsers.forEach(function(supportedBrowser, index) {
        var widgeIndex = index + 1
        this.view["flxBrowser" + widgeIndex].setVisibility(true);
        if (supportedBrowser.downloadLink) {
          this.view["flxBrowser" + widgeIndex].onClick = function() {
            if (scope.onBrowserDownloaded) {
              scope.onBrowserDownloaded(scope.getParams(supportedBrowser));
            }
            window.open(supportedBrowser.downloadLink, '_blank');
          }
        }
        this.view["imgBrowser" + widgeIndex].src = supportedBrowser.icon;
        this.view["lblBrowser" + widgeIndex].text = supportedBrowser.displayName;
        this.view["lblBrowserVersion" + widgeIndex].text = 'version ' + supportedBrowser.minimumVersionSupported;
      }.bind(this))
      this.view.flxBrowserInnerContainer.left = (624 - ((495 / 4) * supportedBrowsers.length)) / 2
      this.view.flxCloseBrowserCheck.onClick = function() {
        this.view.flxBrowserCheckWrapper.setVisibility(false);
        this.view.setVisibility(false);
        if (this.onContinue) {
          this.onContinue(this.getParams());
        }
      }.bind(this);
      this.view.btnContinue.onClick = function() {
        this.view.flxBrowserCheckWrapper.setVisibility(false);
        this.view.setVisibility(false);
        if (this.onContinue) {
          this.onContinue(this.getParams());
        }
      }.bind(this);
      // Check if its needed
      this.view.flxCloseBrowserCheck.setFocus(true);
      this.view.forceLayout();
    },

    getParams: function(supportedBrowser) {
      var supportType = this.getBrowserSupportType();
      var params = {
        module: "Login",
        activityType: "Browser Compatibility",
        description: (supportType === this.BROWSER_SUPPORTED_WITH_WARNING) ? "Supported browser version with poor performance" : "Un-supported browser",
        reason: (supportType === this.BROWSER_SUPPORTED_WITH_WARNING) ? "User is using an supported browser version but has performance issues" : "User is using an un-supported browser",
        browserVersion: this.getBrowserNameAndVersion().version,
        browserName: this.getBrowserNameAndVersion().name,
        channelName: "Desktop Web",
        operatingSystem: this.getOS(),
        deviceId: kony.os.deviceInfo().deviceid,
        userAction: (supportType === this.BROWSER_SUPPORTED_WITH_WARNING) ? "Continued with the current browser" : "Downloaded a new a browser - browser name & version",
        application: "Retail Banking",
        appVersion: "R4.2.5",
        date: ""
      };
      return params;
    }
  };
});