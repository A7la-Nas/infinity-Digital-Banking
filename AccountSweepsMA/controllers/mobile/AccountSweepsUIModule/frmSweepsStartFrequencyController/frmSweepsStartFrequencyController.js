define({ 
  /**
     * init is called when the form is loaded , initialisation happen here
     */
    selectedIndex:null,
    init: function() {
        this.view.preShow = this.preShowForm;
        applicationManager.getPresentationFormUtility().initCommonActions(this, "NO", this.view.id, this.navigateCustomBack);
        this.presenter = applicationManager.getModulesPresentationController({
            "moduleName": "AccountSweepsUIModule",
            "appName": "AccountSweepsMA"
        });
    },
    /***
     * navigateCustomBack is triggered native/ ios back event 
     */
    navigateCustomBack: function() {
        this.presenter.commonFunctionForgoBack();
    },
    /***
     * native/ios cancel event 
     */
    cancelOnClick: function() {
        if(this.presenter.flowType === "AccountSweep"){
        this.presenter.cancelCommon("frmAccountSweepsDashBoard");
        } else if(this.presenter.flowType === "AccountDetails"){
		var navManager = applicationManager.getNavigationManager();
		navManager.navigateTo({"friendlyName": "AccountUIModule/frmAccountDetails","appName": "ArrangementsMA"});
	  }
    },
    /**
     * preShowForm is called when the form is pre loaded 
     */
    preShowForm: function() {
        if (kony.os.deviceInfo().name === "iPhone") {
            this.view.flxHeader.isVisible = false;
             this.view.flxMainContainer.top="0dp";
        } else {
            this.view.flxHeader.isVisible = true;
             this.view.flxMainContainer.top="56dp";
        }
        this.view.btnSubmit.onClick = this.continueOnClick;
        this.view.customHeader.btnRight.onClick = this.cancelOnClick;
        this.view.customHeader.flxBack.onClick = this.navigateCustomBack;
        this.view.btnSubmit.zIndex=120;
        this.setSegFrequencyData();
        this.updateUI();
    },
    /**
     * OnRowClick of segement
     * returns string -Frequency 
     */
    continueOnClick: function() {
        var freqValue = this.view.segOptions.data[this.selectedIndex].lblHeading;
        this.presenter.setSweepsAttribute("frequency", freqValue.text);
        this.presenter.commonFunctionForNavigation("frmSweepsStartingFrom");
    },
    /**
     * @api : setSegFrequencyData
     * sets data to frequency segment
     * @return : NA
     */
    setSegFrequencyData: function() {
      var self = this;
        let frequency = Object.values(this.presenter.frequencies);
        let frequencyDesc = Object.values(this.presenter.frequencyDesc);
        var context = this.presenter.getAccountSweepsObject();
        var selectedFrequency = context.frequency;
        var segFrequencyData = [],
            i;
        this.view.segOptions.widgetDataMap = {
            "lblHeading": "lblHeading",
            "lblDesc": "lblDesc",
            "imgSelect": "imgSelect",
            "flxMainFreq":"flxMainFreq"
        };
        for (i = 0; i < frequency.length; i++) {
            var flag = (selectedFrequency == kony.i18n.getLocalizedString(frequency[i])) ? true : false 
            if(flag == true){
                this.selectedIndex = i;
            }
            segFrequencyData[i] = {
                "lblHeading": {
                    "text": kony.i18n.getLocalizedString(frequency[i]),
                    // "top":"10dp"
                },
              "flxMainFreq":{
                "skin": flag ? "flxGreenMShadow" : "sknFlxffffffBorder5x5yroundedradius8px",
              },
                "lblDesc": {
                    "text": kony.i18n.getLocalizedString(frequencyDesc[i]),
                //   "top":"35dp",
                   "skin": flag ? "ICSknLbl42424215pxSSPR" : "ICSknLabel72727215PxNew",
                },
                "imgSelect": {
                    "src": flag  ? "confirmation_tick.png" : "oval.png",
                  "onTouchStart": self.onSelectImage.bind(this,i)
                }
            };
        }
        this.view.segOptions.setData(segFrequencyData);
    },
    /**
     * @api : updateUI
     * sets the selected data in screen
     * @return: NA
     */
    updateUI: function() {
        let index = this.presenter.getSelectedFrequencyIndex();
        this.view.segOptions.rowFocusSkin = "";
        this.view.segOptions.retainSelection = false;
        if (index !== null && index !== undefined && index !== "") {
            this.view.segOptions.rowFocusSkin = "sknFlxF9F9F9RoundedRadius35Px";
          //  this.view.segOptions.width = "90%";
            this.view.segOptions.centerX = "50%";
            this.view.segOptions.retainSelection = true;
            this.view.segOptions.selectedRowIndex = [0, index];
        }
    },
  onSelectImage:function(i)
  {
    var segFrequencyData=this.view.segOptions.data;
    if (segFrequencyData[i].imgSelect.src =="oval.png")
    {
      if(this.selectedIndex!=null)
      {
        var j ={
          "flxMainFreq":{
            "skin":"sknFlxffffffBorder5x5yroundedradius8px",
          },
          "imgSelect": {
            "src": "oval.png",
            "onTouchStart": segFrequencyData[this.selectedIndex].imgSelect.onTouchStart,
          },
          "lblHeading": {
            "text": segFrequencyData[this.selectedIndex].lblHeading.text,
            // "top":"10dp"
          },
          "lblDesc": {
            "text": segFrequencyData[this.selectedIndex].lblDesc.text,
            // "top":"35dp",
            "skin": "ICSknLabel72727215PxNew",
          },
        }
        this.view.segOptions.setDataAt(j,this.selectedIndex);
      }
      var m ={
        "flxMainFreq":{
          "skin":"flxGreenMShadow",
        },
        "imgSelect": {
          "src": "confirmation_tick.png",
          "onTouchStart": segFrequencyData[i].imgSelect.onTouchStart,
        },
        "lblHeading": {
          "text": segFrequencyData[i].lblHeading.text,
        //   "top":"10dp"
        },
        "lblDesc": {
          "text": segFrequencyData[i].lblDesc.text,
        //   "top":"35dp",
           "skin": "ICSknLbl42424215pxSSPR",
        },
      }

      this.view.segOptions.setDataAt(m,i);
      this.selectedIndex=i;
    this.view.btnSubmit.setEnabled(true);
    this.view.btnSubmit.skin="sknBtn055BAF26px";

    }
    // else
    // {
    //   var j ={
    //     "flxMainFreq":{
    //       "skin":"sknFlxffffffBordere3e3e3shadowdcdde1blur6px",
    //     },
    //     "imgSelect": {
    //       "src": "oval.png",
    //       "onTouchStart": segFrequencyData[this.selectedIndex].imgSelect.onTouchStart,
    //     },
    //     "lblHeading": {
    //       "text": segFrequencyData[this.selectedIndex].lblHeading.text,
    //       "top":"10dp"
    //     },
    //     "lblDesc": {
    //       "text": segFrequencyData[this.selectedIndex].lblDesc.text,
    //       "top":"35dp",
    //       "skin": "ICSknLabel72727215PxNew",
    //     },
    //   }
    //   this.view.segOptions.setDataAt(j,i);
    //   this.selectedIndex=null;
    //   this.view.btnSubmit.setEnabled(false);
    //   this.view.btnSubmit.skin="sknBtnOnBoardingInactive";
    // }
  }

});