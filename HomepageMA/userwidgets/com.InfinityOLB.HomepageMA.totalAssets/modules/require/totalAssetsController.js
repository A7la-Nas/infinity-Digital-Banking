define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
                      this._data = {};
          this._colors={};
          this._tooltipValues="";
          this._layyout="";
          this._compTitle="";
          this._actualView="";
            var donutChart = new kony.ui.CustomWidget({
                "id": "donutChartWealth",
                "isVisible": true,
                "width": "100%",
                "height": "100%",
            }, {
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "widgetName": "WealthDonut",
                "chartData": this._data,
                "OnClickOfPie": function() {}
            });

            this.view.flxChart.add(donutChart);

		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {
                   
               defineSetter(this, "TooltipValues", function(val) {
            this._tooltipValues = val;
      });

                             
               defineSetter(this, "LayoutType", function(val) {
            this._layyout = val;
      });
                           
               defineSetter(this, "Title", function(val) {
            this._compTitle = val;
      });
          
      defineSetter(this, "StrokeColors", function(val) {
        this._colors = val.data;
      });

//       defineSetter(this, "seriesData", function(val) {
//         this._data.seriesData = val.data;
//       });

//       defineSetter(this, "assetType", function(val) {
//         this._data.assetType = val.data;
//       });

//       defineSetter(this, "marketValue", function(val) {
//         this._data.marketValue = val.data;
//       });
		},
      
          onBreakpointChangeComponent: function(formWidth) {
      this._actualView=formWidth;
    },
      createDonutChart: function(data) {
        var dataSet = data;
        //
        if(!dataSet.error) {
          this.view.flxBody.isVisible = true;
          this.view.flxNoResults.isVisible = false;        
          this.view.flxHori1.setVisibility(false);
          this.view.flxHori2.setVisibility(false);
          this.view.flxHori3.setVisibility(false);
          this.view.flxHori4.setVisibility(false);
          this.view.flxHori5.setVisibility(false);
          this.view.flxHori6.setVisibility(false);
          this.view.flxHori7.setVisibility(false);
          this.view.flxHori8.setVisibility(false);
          this.view.flxHori9.setVisibility(false);
          this.view.flxHori10.setVisibility(false);
          var tempcolor=this._colors;
          var negFlag=0;
          var fontColor = tempcolor.map(function(obj){
            return obj.Colors;
          });
          //this.view.lblTitle.text=this._compTitle;
          this.view.lblTitle.text=this._compTitle.startsWith("i18n") ? kony.i18n.getLocalizedString(this._compTitle) : this._compTitle;
			this.view.flxChart.width="50%";
			this.view.flxLegends.width = "49%";
          if (this._layyout == "vertical" && this._actualView != "horizontal") {
            this.view.flxBody.layoutType = kony.flex.FLOW_VERTICAL;
            this.view.flxLegends.left = "30Dp";
            this.view.lblHead.setVisibility(false);
            this.view.lblBal.setVisibility(false);
            this.view.flxLegends.width = "90%";
            this.view.flxChart.width = "100%";
            this.view.flxSeparator3.setVisibility(false);
          }
          if (this._actualView == "horizontal") {
            this.view.flxBody.layoutType = kony.flex.FLOW_HORIZONTAL;
            this.view.lblHead.setVisibility(false);
            this.view.lblBal.setVisibility(false);
            this.view.flxSeparator3.setVisibility(true);
            this.view.flxLegends.left = "10Dp";
            this.view.flxLegends.width="49%";
            this.view.flxChart.width="50%";
          }

          var forUtility = applicationManager.getFormatUtilManager();    
          this.view.lblBal.text = forUtility.formatAmountandAppendCurrencySymbol(dataSet.totalAssetValue, dataSet.referenceCurrency);
          var assets=dataSet.assets;
          var total=0;
            for(var j = 0; j < assets.length; j++) {
              total+=  Math.abs(Number(assets[j].marketValue));
            }
          for(var i = 0; i < assets.length; i++) {
            assets[i].percentage = (Math.abs((Number(assets[i].marketValue))) * 100 / total).toFixed(2);
            assets[i].series=assets[i].percentage+"%";
            assets[i].marketValue=forUtility.formatAmountandAppendCurrencySymbol(assets[i].marketValue, dataSet.referenceCurrency);
            if(i==0){
              this.view.flxHori1.setVisibility(true);
              this.view.lblDet1.text=assets[i].assetGroup + "  ("+ assets[i].series+")";
              this.view.lblVal1.text= assets[i].marketValue;
              this.view.flxImg1.backgroundColor=fontColor[i].slice(1);
            }
            if(i==1){
              this.view.flxHori2.setVisibility(true);
              this.view.lblDet2.text=assets[i].assetGroup + "  ("+ assets[i].series+")";
              this.view.lblVal2.text= assets[i].marketValue;
              this.view.flxImg2.backgroundColor=fontColor[i].slice(1);
            }
            if(i==9){
              this.view.flxHori10.setVisibility(true);
              this.view.lblDet10.text=assets[i].assetGroup + "  ("+ assets[i].series+")";
              this.view.lblVal10.text= assets[i].marketValue;
              this.view.flxImg10.backgroundColor=fontColor[i].slice(1);
            }
            if(i==2){
              this.view.flxHori3.setVisibility(true);
              this.view.lblDet3.text=assets[i].assetGroup + "  ("+ assets[i].series+")";
              this.view.lblVal3.text= assets[i].marketValue;
              this.view.flxImg3.backgroundColor=fontColor[i].slice(1);
            }
            if(i==3){
              this.view.flxHori4.setVisibility(true);
              this.view.lblDet4.text=assets[i].assetGroup + "  ("+ assets[i].series+")";
              this.view.lblVal4.text= assets[i].marketValue;
              this.view.flxImg4.backgroundColor=fontColor[i].slice(1);
            }
            if(i==4){
              this.view.flxHori5.setVisibility(true);
              this.view.lblDet5.text=assets[i].assetGroup + "  ("+ assets[i].series+")";
              this.view.lblVal5.text= assets[i].marketValue;
              this.view.flxImg5.backgroundColor=fontColor[i].slice(1);
            }
            if(i==5){
              this.view.flxHori6.setVisibility(true);
              this.view.lblDet6.text=assets[i].assetGroup + "  ("+ assets[i].series+")";
              this.view.lblVal6.text= assets[i].marketValue;
              this.view.flxImg6.backgroundColor=fontColor[i].slice(1);
            }
            if(i==6){
              this.view.flxHori7.setVisibility(true);
              this.view.lblDet7.text=assets[i].assetGroup + "  ("+ assets[i].series+")";
              this.view.lblVal7.text= assets[i].marketValue;
              this.view.flxImg7.backgroundColor=fontColor[i].slice(1);
            }
            if(i==7){
              this.view.flxHori8.setVisibility(true);
              this.view.lblDet8.text=assets[i].assetGroup + "  ("+ assets[i].series+")";
              this.view.lblVal8.text= assets[i].marketValue;
              this.view.flxImg8.backgroundColor=fontColor[i].slice(1);
            }
            if(i==8){
              this.view.flxHori9.setVisibility(true);
              this.view.lblDet9.text=assets[i].assetGroup + "  ("+ assets[i].series+")";
              this.view.lblVal9.text= assets[i].marketValue;
              this.view.flxImg9.backgroundColor=fontColor[i].slice(1);
            }
          }


          if(assets===undefined)
          {
            assets = this._data;
          }
          else {
            this._data = assets;
          }

          var labels = assets.map(function(obj){
            return obj.percentage;
          });
          var seriesData = assets.map(function(obj){
            return obj.series;
          });
          var assetType = assets.map(function(obj){
            return obj.assetGroup;
          });
          var marketValue = assets.map(function(obj){
            return obj.marketValue;
          });       
          var finalArray={};
          finalArray.colors = fontColor;
          finalArray.data1 = seriesData;
          finalArray.data2 = labels;
          finalArray.data3 = assetType;
          finalArray.data4 = marketValue;
          finalArray.tooltip=this._tooltipValues;
          this.view.flxChart.donutChartWealth.chartData = finalArray;
          this.view.forceLayout();
          // 
      } else {
          this.view.flxBody.isVisible = false;
          this.view.flxNoResults.isVisible = true;     
      }
        
     }

      
	};
});