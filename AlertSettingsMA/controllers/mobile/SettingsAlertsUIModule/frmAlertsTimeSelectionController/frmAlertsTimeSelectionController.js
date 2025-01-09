define({
  alertLevelConfig:{
    CATEGORY:"CATEGORY",
    GROUP:"GROUP",
    ALERT:"ALERT"
  },
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  preShow: function () {
    this.renderTitleBar();
    this.initActions();
    applicationManager.getPresentationUtility().dismissLoadingScreen();
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
       var ntf = new kony.mvc.Navigation("frmAlertsFrequencySelection");
       ntf.navigate();
    };
  },
  /*
  * set list of times for segment
  * @param {Object}: freqObj-{"id":"","value":"","time":""}
  */
  setTimeSegmentData : function(freqObj){
    var timeArr = [];
    for(var t=1; t<25; t++){
      if(t < 12){
        timeArr.push(t+":00AM");
        timeArr.push(t+":30AM");
      } else if(t >12 && t< 24){
        timeArr.push((t-12)+":00PM");
        timeArr.push((t-12)+":30PM");
      }else if(t === 12){
        timeArr.push(t+":00PM");
        timeArr.push(t+":30PM");
      } else if(t === 24){
        timeArr.push((t-12)+":00AM");
        timeArr.push((t-12)+":30AM");
      }
    }
    var widgetMap = {
      "id":"id",
      "lblFrequency":"lblFrequency",
      "flxFrequency":"flxFrequency",
      "flxMain":"flxMain"
    };
    this.view.segTimeList.widgetDataMap = widgetMap;
    var time,segData = [],ind = 0;
    var formatUtility = applicationManager.getFormatUtilManager();
    for(var i=0;i<timeArr.length;i++) {
      time = freqObj.time ? formatUtility.getTwelveHourTimeString(freqObj.time) : "";
      if(time === timeArr[i]) ind = i;
      segData.push({
        "id": timeArr[i],
        "lblFrequency":timeArr[i],
        "flxMain": time === timeArr[i] ? {"skin":"sknFlxF6F6F6BgRadius29px"}: {"skin":"slFbox"},
        "template":"flxFrequency",
      });
    }
    this.view.segTimeList.setData(segData);
    this.view.segTimeList.selectedRowIndex = [0,ind];
    this.view.forceLayout();
  },
  /*
  * set time selection after navigation
  * @param {Object}: freqObj-{"id":"","value":"","time":""}
  * @param {Object}: setPreferenceData - request param for setAlertPreference
  */
  bindData : function(freqObj, setPreferenceData){
    this.setTimeSegmentData(freqObj);
    this.view.segTimeList.rowFocusSkin ="";
    this.view.segTimeList.retainSelection = false;
    if(freqObj.time){
      this.view.segTimeList.retainSelection = true;
    }
    this.view.segTimeList.onRowClick =this.segmentRowClick.bind(this,freqObj, setPreferenceData);
  },
  /*
  * set selected row skin 
  * @param {Integer}: selected row item id
  */
  changeSelectedRowSkin : function(id){
    var segData = this.view.segTimeList.data;
    for(var i=0;i<segData.length;i++){
      if(segData[i].id === id){
        segData[i].flxMain.skin = "sknFlxF6F6F6BgRadius29px";
        this.view.segTimeList.setDataAt(segData[i], i);
      } else if(segData[i].flxMain.skin === "sknFlxF6F6F6BgRadius29px"){
        segData[i].flxMain.skin = "slFbox";
        this.view.segTimeList.setDataAt(segData[i], i);
      }
    } 
  },
   /*
  * navigate to other screen on click of segment row
  * @param {Object}: freqObj-{"id":"","value":"","time":""}
  * @param {Object}: setPreferenceData - request param for setAlertPreference
  */
  segmentRowClick: function (freqObj, setPreferenceData) {
    var formatUtility = applicationManager.getFormatUtilManager();
    var selectedRowData = this.view.segTimeList.data[this.view.segTimeList.selectedIndex[1]];
    this.changeSelectedRowSkin(selectedRowData.id);
    freqObj.time = formatUtility.getTwentyFourHourTimeString(selectedRowData.id);
    var SettingsAlertsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
    if(SettingsAlertsUIModule.presentationController.getAlertLevelConfiguration() === this.alertLevelConfig.CATEGORY){
      setPreferenceData.alertSubscription.freq = freqObj;
      applicationManager.getPresentationUtility().showLoadingScreen();
      SettingsAlertsUIModule.presentationController.setAlertPreferences(setPreferenceData,"");
    }else{
      this.updateFrequencyPreferenceForAlert(freqObj, setPreferenceData);
    }
  },
   /*
  * update the frequency for selected alert group/alert
  * @param {Object}: freqObj-{"id":"","value":"","time":""}
  * @param {Object}: setPreferenceData - request param for setAlertPreference
  */
  updateFrequencyPreferenceForAlert :function(freqObj, setPreferenceData){
    var alertId = "",groupId = "";
    var SettingsAlertsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
    alertId = SettingsAlertsUIModule.presentationController.getAlertID();
    groupId = SettingsAlertsUIModule.presentationController.getAlertsGroupID();
    //update frequency for current alert group or alert
    for(var i=0; i< setPreferenceData.alertSubscription.groups.length; i++){
      if(setPreferenceData.alertSubscription.groups[i].typeID === groupId){
        //update frequency when group level pref
        if(SettingsAlertsUIModule.presentationController.getAlertLevelConfiguration() === this.alertLevelConfig.GROUP){
          setPreferenceData.alertSubscription.groups[i].freq = freqObj;
          break;
        } else{  //update frequency when alert level pref
          for(var j=0; j< setPreferenceData.alertSubscription.groups[i].alerts.length; j++){
            if(setPreferenceData.alertSubscription.groups[i].alerts[j].id === alertId){
              setPreferenceData.alertSubscription.groups[i].alerts[j].freq = freqObj;
              break;
            }
          }
          break;
        }
      }
    }
    applicationManager.getPresentationUtility().showLoadingScreen();
    SettingsAlertsUIModule.presentationController.setAlertPreferences(setPreferenceData,"");
  },
  
});