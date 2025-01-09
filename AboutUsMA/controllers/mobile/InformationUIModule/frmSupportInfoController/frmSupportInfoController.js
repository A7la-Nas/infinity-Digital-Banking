define({
    searchStatus: {
        isTitleBarVisible: true,
        isSearchBoxVisible: true,
        isSearchBoxWithCancelVisible: false,
        isSegmentVisible: false
    },
    preShow: function () {
        var navManager = applicationManager.getNavigationManager();
        var navData = navManager.getCustomInfo("frmSupportInfo");
        var populateData = navData.richTextData;
        var headerValue = navData.header;
        this.view.flxTermsConditions.scrollsToTop = true;
        this.view.customHeader.lblLocateUs.text = headerValue;
        this.view.onDeviceBack = this.backIcon;
        if(applicationManager.getStorageManager().getStoredItem("langObj") && applicationManager.getStorageManager().getStoredItem("langObj").language === 'Arabic'){
            this.view.customHeader.imgBack.src = "backbutton_reverse.png";
          }
        this.view.customHeader.flxBack.onClick = this.backIcon;
        var configManager = applicationManager.getConfigurationManager();
        if (headerValue === configManager.constants.FAQ) {
            this.view.title = configManager.constants.HEADERFAQ;
            this.view.customHeader.lblLocateUs.text = configManager.constants.HEADERFAQ;
         	this.searchStatus.isSearchBoxVisible = false;
            this.bindFAQData(populateData);
            this.searchStatus.isSegmentVisible = true;
        } else if (headerValue === configManager.constants.TERMS) {
            this.searchStatus.isSearchBoxVisible = false;
            this.searchStatus.isSegmentVisible = false;
            this.view.title = configManager.constants.HEADERTERMSANDCONDITIONS;
            this.view.customHeader.lblLocateUs.text = configManager.constants.HEADERTERMSANDCONDITIONS;
            this.view.browserContent.htmlString = populateData;
        } else if (headerValue === configManager.constants.PRIVACY) {
            this.searchStatus.isSearchBoxVisible = false;
            this.searchStatus.isSegmentVisible = false;
            this.view.title = configManager.constants.HEADERPRIVACYPOLICY;
            this.view.customHeader.lblLocateUs.text = configManager.constants.HEADERPRIVACYPOLICY;
            this.view.browserContent.htmlString = populateData;
        }
      this.view.postShow = this.postshow;
        this.renderScreen();
       applicationManager.getPresentationUtility().dismissLoadingScreen();
       var currentForm=navManager.getCurrentForm();
       applicationManager.getPresentationFormUtility().logFormName(currentForm);
    },
    postshow : function(){
       this.view.browserContent.enableParentScrollingWhenReachToBoundaries=false;
     },
    init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
   },
  backIcon: function () {
    var informationPC = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"AboutUsMA","moduleName": "InformationUIModule"});
    informationPC.presentationController.commonFunctionForNavigation({"appName":"AboutUsMA","friendlyName": "InformationUIModule/frmSupport"});
  },
    bindFAQData: function (data) {
        this.view.segFaq.widgetDataMap = {
            lblQuestion: "question",
            lblAnswer: "answer",
            lblHeader : "lblHeader",
          imgUpArrow : "imgUpArrow"
        };
      data.forEach(function(item){
        item[0].imgUpArrow = {
          "src" : "arrowup_1.png"
        };
      });
        this.view.segFaq.setData(data);
    },
    rowExpandCollapse : function(context) {
        var self = this;
        try {
          var sectionIndex = context.section;
          if (this.segmentData === '' || this.segmentData === undefined) this.segmentData = JSON.parse(JSON.stringify(this.view.segFaq.data));
          var data = this.view.segFaq.data;
          var selectedHeaderData = data[sectionIndex][0];
          if (!JSON.stringify(data).includes("flxNoRecords")) {
            if(data[sectionIndex][1].length > 0){//if (selectedHeaderData["imgUpArrow"] === "arrowup_1.png") {
              //selectedHeaderData["imgUpArrow"] = "arrowdown.png";
              data[sectionIndex][1] = [];
              data[sectionIndex][0].imgUpArrow = {
                "src" : "arrowdown.png"
              };
              this.view.segFaq.setData(data);
            } else {
              //selectedHeaderData["imgUpArrow"] = "arrowup_1.png";
              data[sectionIndex][1] = this.segmentData[sectionIndex][1];
              data[sectionIndex][0].imgUpArrow = {
                "src" : "arrowup_1.png"
              };
              this.view.segFaq.setData(data);
            }
          }
        } catch (err) {
          var errorObj = {
            "errorInfo": "Error in rowExpandCollapse",
            "errorLevel": "Configuration",
            "error": err
          };
          self.onError(errorObj);
        }
      },
    renderScreen: function () {
        var flxHeight = 0;
        this.view.flxHeader.setVisibility(false);
        this.view.flxHeaderTermsConditions.setVisibility(false);
        this.view.flxHeaderSearchbox.setVisibility(false);
        this.view.customSearch.flxSearchMain.setVisibility(false);
        this.view.customSearch.flxHeader.setVisibility(false);
        if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
            if (this.searchStatus.isSearchBoxVisible) {
                this.view.flxHeaderTermsConditions.setVisibility(true);
                this.view.customSearch.flxSearchMain.setVisibility(true);
                flxHeight = flxHeight + 50;
            }
            if (this.searchStatus.isSearchBoxWithCancelVisible) {
                this.view.flxHeaderSearchbox.setVisibility(true);
                flxHeight = flxHeight + 40;
            }
        } else {
            if (this.searchStatus.isTitleBarVisible) {
                this.view.flxHeader.setVisibility(true);
                flxHeight = flxHeight + 56;
            }
            if (this.searchStatus.isSearchBoxVisible) {
                this.view.flxHeaderTermsConditions.setVisibility(true);
                this.view.customSearch.flxSearchMain.setVisibility(true);
                flxHeight = flxHeight + 50;
            }
            if (this.searchStatus.isSearchBoxWithCancelVisible) {
                this.view.flxHeaderSearchbox.setVisibility(true);
                flxHeight = flxHeight + 40;
            }
        }
        this.view.flxTermsConditions.top = flxHeight;
        if (this.searchStatus.isSegmentVisible) {
            this.view.browserContent.setVisibility(false);
            this.view.segFaq.setVisibility(true);
        }
      else {
            this.view.browserContent.setVisibility(true);
            this.view.segFaq.setVisibility(false);
        }
    }
});