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
    var scopeObj = this;
    this.view.customHeader.flxBack.onClick = function () {
    scopeObj.goBack();
    };
  },
  
  goBack :function()
  {
     var ntf = new kony.mvc.Navigation("frmAlertsEditPreferences");
     ntf.navigate();
  },
  /*
  * set frequency selection after navigation
  * @param {Object}: freqObj-{"id":"","value":"","time":""}
  * @param {Object}: setPreferenceData - request param for setAlertPreference
  */
  bindData : function(freqObj, setPreferenceData){
    this.setFrequencyData(freqObj);
    this.view.segFrequency.rowFocusSkin ="";
    this.view.segFrequency.retainSelection = false;
    if(freqObj.id){
      this.view.segFrequency.retainSelection = true;
    }
    this.view.segFrequency.onRowClick =this.segmentRowClick.bind(this,freqObj, setPreferenceData);

  },
  /*
  * on click of segment row
  * @param {Object}: freqObj-{"id":"","value":"","time":""}
  * @param {Object}: setPreferenceData - request param for setAlertPreference
  */
  segmentRowClick: function (freqObj, setPreferenceData) {
    var ind = this.view.segFrequency.selectedIndex[1];
    var selectedRowData = this.view.segFrequency.data[ind];
    this.changeSelectedRowSkin(selectedRowData.id);
    freqObj.id = selectedRowData.id;
    var SettingsAlertsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
    if(selectedRowData.id ==="DAILY"){
      freqObj.value = ""; //removes previously set value if any
      SettingsAlertsUIModule.presentationController.navigateToAlertsTimeSelection(freqObj, setPreferenceData);
      SettingsAlertsUIModule.presentationController.commonFunctionForNavigation("frmAlertsTimeSelection");
    }else{
      SettingsAlertsUIModule.presentationController.navigateToAlertsDaySelection(freqObj, setPreferenceData);
      SettingsAlertsUIModule.presentationController.commonFunctionForNavigation("frmAlertsDaySelection");
    }
    
  },
  /*
  * set frequency data to form
  * @param {Object}: freqObj-{"id":"","value":"","time":""}
  */
  setFrequencyData : function(freqObj){
    var i18Daily=kony.i18n.getLocalizedString("i18n.Transfers.Daily");
    var i18Weekly=kony.i18n.getLocalizedString("i18n.Transfers.Weekly");
    var i18Monthly=kony.i18n.getLocalizedString("i18n.Transfers.Monthly");
    var freqArr = [{"id":"DAILY","name":i18Daily},
                   {"id":"WEEKLY","name":i18Weekly},
                   {"id":"MONTHLY","name":i18Monthly}];
    var widgetMap = {
      "lblFrequency":"lblFrequency",
      "flxFrequency":"flxFrequency",
      "flxMain":"flxMain"
    };
    this.view.segFrequency.widgetDataMap = widgetMap;
    var segDays = freqArr.map(function(rec){
      return {
        "id":rec.id,
        "flxMain":freqObj.id === rec.id ? {"skin":"sknFlxF6F6F6BgRadius29px"} :{"skin":"slFbox"},
        "lblFrequency":rec.name,
        "template":"flxFrequency",
      };
    });
    this.view.segFrequency.setData(segDays);
    this.view.forceLayout();
  },
 /*
  * set selected row skin 
  * @param {Integer}: index
  */
  changeSelectedRowSkin : function(id){
    var segData = this.view.segFrequency.data;
    for(var i=0;i<segData.length;i++){
      if(segData[i].id === id){
        segData[i].flxMain.skin = "sknFlxF6F6F6BgRadius29px";
        this.view.segFrequency.setDataAt(segData[i], i);
      } else if(segData[i].flxMain.skin === "sknFlxF6F6F6BgRadius29px"){
        segData[i].flxMain.skin = "slFbox";
        this.view.segFrequency.setDataAt(segData[i], i);
      }
    } 
  },
});