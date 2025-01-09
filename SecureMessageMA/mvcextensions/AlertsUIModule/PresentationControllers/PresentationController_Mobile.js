define([], function() {
    /**
     * User defined presentation controller
     * @constructor
     * @extends kony.mvc.Presentation.BasePresenter
     */
    function PresentationController() {
        scope_NotificationPresentationController = this;
        scope_NotificationPresentationController.filterCategories = [];
        scope_NotificationPresentationController.alertsBadgeToBeShown = true;
        scope_NotificationPresentationController.allAlertsChoosen = true;
        scope_NotificationPresentationController.retainSegmentoffset = false;
        kony.mvc.Presentation.BasePresenter.call(this);
    }

    inheritsFrom(PresentationController, kony.mvc.Presentation.BasePresenter);

    /**
     * Overridden Method of kony.mvc.Presentation.BasePresenter
     * This method gets called when presentation controller gets initialized
     * @method
     */
    PresentationController.prototype.initializePresentationController = function() {
        
    };
    PresentationController.prototype.setAlertsBadgeStatus = function(flag)
    {
        scope_NotificationPresentationController.alertsBadgeToBeShown = flag;
    };
    PresentationController.prototype.getAlertsBadgeStatus = function()
    {
        return scope_NotificationPresentationController.alertsBadgeToBeShown;
    };
    PresentationController.prototype.setFilterCategories = function(categories) {
        scope_NotificationPresentationController.filterCategories = categories;
    };
    PresentationController.prototype.getFilterCategories = function() {
        return scope_NotificationPresentationController.filterCategories;
    };
    PresentationController.prototype.getNotificationData = function() {
        var alertsManager = applicationManager.getAlertsManager();
        return alertsManager.getAlerts();
    };
    PresentationController.prototype.commonFunctionForNavigation = function(formName) {
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo(formName);
    };
    PresentationController.prototype.getNotifications = function() {
        var notificationManager = applicationManager.getAlertsManager();
        applicationManager.getPresentationUtility().showLoadingScreen();
        this.setFilterCategories(scope_NotificationPresentationController.getDefaultFilterCategories());
        scope_NotificationPresentationController.allAlertsChoosen = true;
        scope_NotificationPresentationController.retainSegmentoffset = false;
        notificationManager.getUserNotifications(scope_NotificationPresentationController.getNotificationsPresentationSuccess, scope_NotificationPresentationController.getNotificationsPresentationError);
    };
    PresentationController.prototype.getNotificationsPresentationSuccess = function(response) {
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("frmAlertsLanding",response);
		var frmName = {  "appName": "SecureMessageMA", "friendlyName": "AlertsUIModule/frmAlertsLanding" };
		navManager.navigateTo(frmName);
    };
    PresentationController.prototype.getNotificationsPresentationError = function(error) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (err["isServerUnreachable"])
        applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
    };  
    PresentationController.prototype.getUnreadNotificationsCount = function() {
        var notificationManager = applicationManager.getAlertsManager();
        notificationManager.getUnreadNotificationCount(function(){},function(){});
    };
    PresentationController.prototype.updateNotificationAsRead = function(notificationId){
        var self = this;
        var param = {
            "userNotificationId": notificationId
        };
        var AlertsManager = applicationManager.getAlertsManager();
        applicationManager.getPresentationUtility().showLoadingScreen();
        AlertsManager.updateNotificationAsRead(param, self.updateNotificationAsReadSuccess.bind(self, notificationId), self.updateNotificationAsReadFailure.bind(self));
    };
    PresentationController.prototype.updateNotificationAsReadSuccess = function(notificationId,response)
    {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        var controller = applicationManager.getPresentationUtility().getController('frmAlertsLanding', true);
        var segData = controller.segData;
        var filteredData = controller.filteredData;
        var alertsManager = applicationManager.getAlertsManager();
        var alertsData = alertsManager.getAlerts();
        alertsData.forEach(function (data,index) {
        if (data.userNotificationId == notificationId) {
            alertsData[index].isRead = "1";
        }
        });
        segData.forEach(function (data,index) {
            if (data.userNotificationId == notificationId) {
                segData[index].isRead = "1";
            }
        });
        filteredData.forEach(function (data,index) {
            if (data.userNotificationId == notificationId) {
                filteredData[index].isRead = "1";
            }
        });
        var unreadNotificationCount = alertsManager.getUnreadNotifications();
        alertsManager.setUnreadNotifications((Number(unreadNotificationCount)-1).toString());
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("frmAlertsLanding",segData);
        this.commonFunctionForNavigation("frmAlertsDetails");
    };
    PresentationController.prototype.updateNotificationAsReadFailure = function(error)
    {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (err["isServerUnreachable"])
        applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
    };
    PresentationController.prototype.searchWithCategories = function(field,isDefaultFields,fieldValues,searchFields,searchText, data) {
        searchText = searchText.toLowerCase();
        var searchdata = [];
        for (var i = 0; i < data.length; i++) {
              for(var j = 0; j < fieldValues.length; j++){
                  var isDataAdded = false;
                  for(var k = 0; k < searchFields.length; k++){
                    if(isDefaultFields && kony.sdk.isNullOrUndefined(data[i][field]) && !kony.sdk.isNullOrUndefined(data[i][searchFields[k]]) && data[i][searchFields[k]].toLowerCase().indexOf(searchText) >= 0)
                    {
                        isDataAdded = true;
                        searchdata.push(data[i]);
                        break;
                    }
                    else if(!kony.sdk.isNullOrUndefined(data[i][field]) && data[i][field] === fieldValues[j] && !kony.sdk.isNullOrUndefined(data[i][searchFields[k]]) && data[i][searchFields[k]].toLowerCase().indexOf(searchText) >= 0) {
                        isDataAdded = true;
                        searchdata.push(data[i]);
                        break;
                    }
                }
                if(isDataAdded)
                break;
            }
        }
        return searchdata;
    };
    PresentationController.prototype.filterNotifications = function(field,fieldValues,data) {
        var filteredData = [];
        for (var i = 0; i < data.length; i++) {
              for(var j = 0; j < fieldValues.length; j++){
                  if(!kony.sdk.isNullOrUndefined(data[i][field]) && data[i][field] === fieldValues[j]){
                    filteredData.push(data[i]);
                    break;
                  }
            }
        }
        return filteredData;
    };
    PresentationController.prototype.getDefaultFilterCategories = function()
    {
        return ["ALERT_CAT_ACCOUNTS","ALERT_CAT_SECURITY","ALERT_CAT_TRANSACTIONAL"];
    };
    PresentationController.prototype.searchAlerts = function(data,searchString)
    {
        var self = this;
        var searchobj;
        var filters = self.getFilterCategories();
        if(!self.allAlertsChoosen)
            searchobj = self.searchWithCategories("notificationCategory",false,filters,["notificationSubject","notificationText"],searchString,data);
        else
            searchobj = self.searchWithCategories("notificationCategory",true,self.getDefaultFilterCategories(),["notificationSubject","notificationText"],searchString,data);
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("frmAlertsLanding",searchobj);
        var controller = applicationManager.getPresentationUtility().getController('frmAlertsLanding', true);
        controller.setDataToSegment();
    };
    PresentationController.prototype.deleteNotification = function (selectedUserNotificationId) {
        var self = this;
        var params = {
          "notificationId": selectedUserNotificationId
        };
        var AlertsManager = applicationManager.getAlertsManager();
        applicationManager.getPresentationUtility().showLoadingScreen();
        AlertsManager.deleteNotification(params, self.deleteNotificationSuccess.bind(self,selectedUserNotificationId), self.deleteNotificationFailure.bind(self));
    };
    PresentationController.prototype.deleteNotificationSuccess = function (notificationId,response) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        var controller = applicationManager.getPresentationUtility().getController('frmAlertsLanding', true);
        controller.bindGenericSuccess(response);
        var alertsManager = applicationManager.getAlertsManager();
        var unreadNotificationCount = alertsManager.getUnreadNotifications();
        var alertsData = alertsManager.getAlerts();
        var newData = [];
        alertsData.forEach(function(data,index){
                if(notificationId !== alertsData[index].userNotificationId)
                newData.push(data);
                else if(data.isRead === "0")
                {
                    alertsManager.setUnreadNotifications((Number(unreadNotificationCount)-1).toString());
                }
        });
        alertsManager.setAlerts(newData);
        controller.deleteSpecifiedNotification(notificationId);
      if(kony.application.getCurrentForm().id === "frmAlertsDetails"){
        var navManager = applicationManager.getNavigationManager();
        navManager.goBack();
      }
    };
    PresentationController.prototype.deleteNotificationFailure = function (error) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        var controller = applicationManager.getPresentationUtility().getController('frmAlertsLanding', true);
        controller.showErrorPopUp(error);
    };
  PresentationController.prototype.deleteNotificationForDetails = function (selectedUserNotificationId) {
        var self = this;
        var params = {
          "notificationId": selectedUserNotificationId
        };
        var AlertsManager = applicationManager.getAlertsManager();
        applicationManager.getPresentationUtility().showLoadingScreen();
        AlertsManager.deleteNotification(params, self.deleteNotificationSuccess.bind(self,selectedUserNotificationId), self.deleteNotificationFailureForDetails.bind(self));
    };
  PresentationController.prototype.deleteNotificationFailureForDetails = function (error) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        var controller = applicationManager.getPresentationUtility().getController('frmAlertsDetails', true);
        controller.showErrorPopUp(error);
    };
    return PresentationController;
});