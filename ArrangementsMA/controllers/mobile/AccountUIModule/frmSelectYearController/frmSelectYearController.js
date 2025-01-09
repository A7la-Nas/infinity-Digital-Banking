define({ 

 //Type your controller code here 
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  frmSelectYearPreshow: function(){
    this.setSegmentData();
    this.view.customHeader.flxBack.onClick=this.flxBackOnClick;
    if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
      this.view.flxHeader.isVisible = false;
    } else {
      this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
      this.view.flxHeader.isVisible = true;
    }
  },
  setSegmentData: function(){
    var yearsWidgetDataMap = {
      "lblYear": "lblYear",
    };
    this.view.segYears.widgetDataMap = yearsWidgetDataMap;
    var navManager = applicationManager.getNavigationManager();
    var years = [];
    var startYear = navManager.getCustomInfo("frmSelectYear");
    var displayYear= startYear.toString();
    var numberOfYearsToViewStatements = applicationManager.getConfigurationManager().getConfigurationValue('numberOfYearsToViewStatements');
    for(var i=0;i<numberOfYearsToViewStatements;i++){
      var rowData = {
          "lblYear": {
            "text": displayYear,
            "accessibilityconfig": {
              "a11yLabel": displayYear
            }
          }
        }
        years.push(rowData);
      	startYear--;
        displayYear= startYear.toString();
    }
    this.view.segYears.setData(years);
    this.view.segYears.onRowClick = this.segYearsOnRowClick;
  },
  segYearsOnRowClick: function(){
    var selectedRowIndex = Math.floor(this.view.segYears.selectedRowIndex[1]);
    var selectedYear = this.view.segYears.data[selectedRowIndex]["lblYear"].text;
    var navManager = applicationManager.getNavigationManager();
    navManager.setCustomInfo("selectedYear", selectedYear);
    navManager.navigateTo("frmAccStatements");
  },
  flxBackOnClick:function(){
    var navMan=applicationManager.getNavigationManager();
    navMan.goBack();
  },
 });