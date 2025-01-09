define({
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  preShow: function () {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    this.renderTitleBar();
    this.initActions();
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
  },
  renderTitleBar: function(){
    var deviceUtilManager = applicationManager.getDeviceUtilManager();
    var isIphone = deviceUtilManager.isIPhone();
    if (isIphone) {
      this.view.flxHeader.setVisibility(false);
    }
  },
  initActions: function () {
    this.view.customHeader.flxBack.onClick = function () {
      var navMan=applicationManager.getNavigationManager();
      navMan.goBack();
    };
  },
  /*
  * set data to segment based on selectd frequency
  * @param {Object}: freqObj-{"id":"","value":"","time":""}
  * @param {Object}: setPreferenceData - request param for setAlertPreference
  */
  bindData: function(freqObj, setPreferenceData){
    if(freqObj.id === "MONTHLY"){ //set dates
      this.setDataForDates(freqObj);
    } else{ //set days
      this.setDataForDays(freqObj);
    }
    this.view.segDayDatesList.onRowClick =this.segmentRowClick.bind(this,freqObj, setPreferenceData);
  },
  /*
  * set list of says data to segment
  * @param {Object}: freqObj-{"id":"","value":"","time":""}
  */
  setDataForDays : function(freqObj){
    var i18Sunday=kony.i18n.getLocalizedString("kony.mb.support.Sunday");
    var i18Monday=kony.i18n.getLocalizedString("kony.mb.support.Mon");
    var i18Tuesday=kony.i18n.getLocalizedString("kony.mb.support.Tues");
    var i18Wednesday=kony.i18n.getLocalizedString("kony.mb.support.Wed");
    var i18Thursday=kony.i18n.getLocalizedString("kony.mb.support.Thur");
    var i18Friday=kony.i18n.getLocalizedString("kony.mb.support.Fri");
    var i18Saturday=kony.i18n.getLocalizedString("kony.mb.support.Saturday");
    
    var days = [{"name":i18Sunday,"id":"SUNDAY"},{"name":i18Monday,"id":"MONDAY"},{"name":i18Tuesday,"id":"TUESDAY"},
                {"name":i18Wednesday,"id":"WEDNESDAY"},{"name":i18Thursday,"id":"THURSDAY"},{"name":i18Friday,"id":"FRIDAY"},
                {"name":i18Saturday,"id":"SATURDAY"}];
    var widgetMap = {
      "id":"id",
      "lblFrequency":"lblFrequency",
      "flxFrequency":"flxFrequency",
      "flxMain":"flxMain"
    };
    this.view.segDayDatesList.widgetDataMap = widgetMap;
    this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.Alerts.SelectDay");
    this.view.lblDescription.text = kony.i18n.getLocalizedString("kony.mb.Alerts.PleaseChooseADay");
    var segDays = days.map(function(rec){
      return {
        "id":rec.id,
        "lblFrequency":rec.name,
        "flxMain":freqObj.value === rec.id ? {"skin":"sknFlxF6F6F6BgRadius29px"}: {"skin":"slFbox"},
        "template":"flxFrequency",
      };
    });
    this.view.segDayDatesList.setData(segDays);
    this.view.forceLayout();
  },
  /*
  * set list of dates data to segment
  * @param {Object}: freqObj-{"id":"","value":"","time":""}
  */
  setDataForDates : function(freqObj){
    var dates = [], ind = 1;
    var widgetMap = {
      "id":"id",
      "lblFrequency":"lblFrequency",
      "flxFrequency":"flxFrequency",
      "flxMain":"flxMain"
    };
    this.view.segDayDatesList.widgetDataMap = widgetMap;
    this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.Alerts.SelectDate");
    this.view.lblDescription.text = kony.i18n.getLocalizedString("kony.mb.Alerts.PleaseChooseADate");
    for(var i=1;i<=31;i++){
      if(freqObj.value === i.toString()) ind = i;
      dates.push({
        "id":i,
        "lblFrequency":i+"",
        "flxMain":freqObj.value === i.toString() ? {"skin":"sknFlxF6F6F6BgRadius29px"}:{"skin":"slFbox"},
        "template":"flxFrequency",
      });
    }
    this.view.segDayDatesList.setData(dates);
    this.view.segDayDatesList.selectedRowIndex = [0,(ind-1)];
    this.view.forceLayout();
  },
 /*
  * set selected row skin 
  * @param {Integer}: selected row item id
  */
  changeSelectedRowSkin : function(id){
    var segData = this.view.segDayDatesList.data;
    for(var i=0;i<segData.length;i++){
      if(segData[i].id === id){
        segData[i].flxMain.skin = "sknFlxF6F6F6BgRadius29px";
        this.view.segDayDatesList.setDataAt(segData[i], i);
        //this.view.segDayDatesList.selectedRowIndex = [0,i];
      } else if(segData[i].flxMain.skin === "sknFlxF6F6F6BgRadius29px"){
        segData[i].flxMain.skin = "slFbox";
        this.view.segDayDatesList.setDataAt(segData[i], i);
      }
    } 
  },
  /*
  * on click of segment row
  * @param {Object}: freqObj-{"id":"","value":"","time":""}
  * @param {Object}: setPreferenceData - request param for setAlertPreference
  */
  segmentRowClick: function (freqObj, setPreferenceData) {
    var selectedRowData = this.view.segDayDatesList.data[this.view.segDayDatesList.selectedIndex[1]];
    freqObj.value = selectedRowData.id;
    this.changeSelectedRowSkin(selectedRowData.id);
    var SettingsAlertsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
    SettingsAlertsUIModule.presentationController.navigateToAlertsTimeSelection(freqObj, setPreferenceData);
    SettingsAlertsUIModule.presentationController.commonFunctionForNavigation("frmAlertsTimeSelection");

  },
});