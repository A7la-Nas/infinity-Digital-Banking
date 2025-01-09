define(function() {

	return {
         setYears:function(){
           dataArray = [];
           dataArray.push({"yearkey":"key-1","yearvalue":"Year"});
           
           var today = new Date();
           var year = today.getFullYear();
           var noOfYears = 0;
           
           while(noOfYears < 120){
             var yearToAdd = year - noOfYears;
             var currKey = "key" + noOfYears;
         
             var singleData = {"yearkey":currKey,"yearvalue":yearToAdd};
             dataArray.push(singleData);
             noOfYears += 1;
           }
           this.view.lbxYear.masterDataMap = [dataArray,"yearkey","yearvalue"];
         },
         
         setNoOfDays:function(){
           var selectedMonth = this.view.lbxMonth.selectedKey;
           var dayArray = [];
           
           dayArray = [{"daykey":"day0","dayvalue":"Day"},{"daykey":"day1","dayvalue":1},{"daykey":"day2","dayvalue":2},{"daykey":"day3","dayvalue":3},
                             {"daykey":"day4","dayvalue":4},{"daykey":"day5","dayvalue":5},{"daykey":"day6","dayvalue":6},
                             {"daykey":"day7","dayvalue":7},{"daykey":"day8","dayvalue":8},{"daykey":"day9","dayvalue":9},
                             {"daykey":"day10","dayvalue":10},{"daykey":"day11","dayvalue":11},{"daykey":"day12","dayvalue":12},
                             {"daykey":"day13","dayvalue":13},{"daykey":"day14","dayvalue":14},{"daykey":"day15","dayvalue":15},
                             {"daykey":"day16","dayvalue":16},{"daykey":"day17","dayvalue":17},{"daykey":"day18","dayvalue":18},
                             {"daykey":"day19","dayvalue":19},{"daykey":"day20","dayvalue":20},{"daykey":"day21","dayvalue":21},
                             {"daykey":"day22","dayvalue":22},{"daykey":"day23","dayvalue":23},{"daykey":"day24","dayvalue":24},
                             {"daykey":"day25","dayvalue":25},{"daykey":"day26","dayvalue":26},{"daykey":"day27","dayvalue":27},
                             {"daykey":"day28","dayvalue":28}
                            ];
           var dayV,dayK ;
           var dayObj;
           if(selectedMonth == 'm1' || selectedMonth == 'm3' || selectedMonth == 'm5' || selectedMonth == 'm7' || selectedMonth == 'm8' || selectedMonth == 'm10' || selectedMonth == 'm12')
           {
             
             for(var i = 29; i <=31; i++){
                dayK = "day"+i;
                dayV = i;
                dayObj = {"daykey":dayK,"dayvalue":dayV};
               dayArray.push(dayObj);
             }
           }
            else if(selectedMonth == 'm4' || selectedMonth == 'm6' || selectedMonth == 'm9' || selectedMonth == 'm11'){
             
              for(var j = 29; j <=30; j++){
                dayK = "day"+j;
                dayV = j;
                dayObj = {"daykey":dayK,"dayvalue":dayV};
               dayArray.push(dayObj);
             }             
            }
             else{
               if((this.view.lbxYear.selectedKeyValue!==undefined)&&(this.view.lbxYear.selectedKeyValue!==null))
              {  var thisYear = this.view.lbxYear.selectedKeyValue[1];
                if(((thisYear % 4 === 0) && (thisYear % 100 !== 0)) || (thisYear % 400 === 0)){
                   dayK = "day"+29;
                   dayV = 29;
                   dayObj = {"daykey":dayK,"dayvalue":dayV};
                   dayArray.push(dayObj);                  
                }
              }
              }
           this.view.lbxDate.masterDataMap = [dayArray,"daykey","dayvalue"];
         },
         
         setMonths:function(){
           monthArray = [{"monthkey":"m0","monthvalue":"Month"},{"monthkey":"m1","monthvalue":"Jan"},{"monthkey":"m2","monthvalue":"Feb"},{"monthkey":"m3","monthvalue":"Mar"},
                             {"monthkey":"m4","monthvalue":"Apr"},{"monthkey":"m5","monthvalue":"May"},{"monthkey":"m6","monthvalue":"Jun"},
                             {"monthkey":"m7","monthvalue":"Jul"},{"monthkey":"m8","monthvalue":"Aug"},{"monthkey":"m9","monthvalue":"Sep"},
                             {"monthkey":"m10","monthvalue":"Oct"},{"monthkey":"m11","monthvalue":"Nov"},{"monthkey":"m12","monthvalue":"Dec"} ];    
            this.view.lbxMonth.masterDataMap = [monthArray,"monthkey","monthvalue"];                
         },

        postShow: function () {
            this.setAccessibilityValues();
            if(kony.application.getCurrentBreakpoint() === 768){
              this.view.flxLetsVerifyCntr.height = "140dp";
              this.view.flxUserVerify.top = "0dp";
              this.view.lblLetsVerify.top = "40%";
          }
        },
    setAccessibilityValues: function () {
           
      this.view.DateInput.tbxDateInputKA.accessibilityConfig = {
        a11yLabel: this.view.lblDOB.text,
        a11yARIA: {
          "aria-autocomplete":"none",
          "aria-required": true,
          "role": "textbox",
          "aria-placeholder":this.view.DateInput.lblDatePlaceholderKA.text
        },
      };
      this.view.DateInput.lblEnteredDateKA.accessibilityConfig = {
        "a11yARIA": {
          "tabindex": -1
        }
      };
      this.view.DateInput.lblDatePlaceholderKA.accessibilityConfig = {
        "a11yHidden": true,
        "a11yARIA": {
          "tabindex": -1
        }
      };
      this.view.flxRefresh.accessibilityConfig = {
        a11yLabel: "refresh",
        a11yARIA: {
          "role": "button",
        },

      };
      this.view.tbxCaptcha.accessibilityConfig = {
        a11yARIA: {
          "aria-required": true,
          "role": "textbox",
          "aria-autocomplete" : "none"
        },
      };
    }
	};
});