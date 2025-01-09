define(['FormControllerUtility'], function (FormControllerUtility) {

  const SCAObjectServices = {
    getDataModel: function(objServiceName, objectName) {
      var objSvc = kony.sdk.getCurrentInstance().getObjectService(objServiceName, {
        "access": "online"
      });
      return {
        customVerb: function(customVerb, params, callback) {
          var dataObject = new kony.sdk.dto.DataObject(objectName);
          for(let key in params) {
            dataObject.addField(key, params[key]);
          }
          var options = {
            "dataObject": dataObject
          };
          objSvc.customVerb(customVerb, options, success => callback(true, success), error => callback(false, error));
        }
      };
    }
  };
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._objSeviceName = "";
      this._objName = "";
      this._operationName = "";
      this._objSeviceName1 = "";
      this._objName1 = "";
      this._operationName1 = "";
      this._CIBARequestDeniedMsg = "";
      this._CIBARequestExpiredMsg = "";
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineGetter(this, 'objSeviceName', () => {
        return this._objSeviceName;
      });
      defineSetter(this, 'objSeviceName', value => {
        this._objSeviceName = value;
      });
      defineGetter(this, 'objName', () => {
        return this._objName;
      });
      defineSetter(this, 'objName', value => {
        this._objName = value;
      });
      defineGetter(this, 'operationName', () => {
        return this._operationName;
      });
      defineSetter(this, 'operationName', value => {
        this._operationName = value;
      });
      defineGetter(this, 'objSeviceName1', () => {
        return this._objSeviceName1;
      });
      defineSetter(this, 'objSeviceName1', value => {
        this._objSeviceName1 = value;
      });
      defineGetter(this, 'objName1', () => {
        return this._objName1;
      });
      defineSetter(this, 'objName1', value => {
        this._objName1 = value;
      });
      defineGetter(this, 'operationName1', () => {
        return this._operationName1;
      });
      defineSetter(this, 'operationName1', value => {
        this._operationName1 = value;
      });
      defineGetter(this, 'CIBARequestDeniedMsg', () => {
        return this._CIBARequestDeniedMsg;
      });
      defineSetter(this, 'CIBARequestDeniedMsg', value => {
        this._CIBARequestDeniedMsg = value;
      });
      defineGetter(this, 'CIBARequestExpiredMsg', () => {
        return this._CIBARequestExpiredMsg;
      });
      defineSetter(this, 'CIBARequestExpiredMsg', value => {
        this._CIBARequestExpiredMsg = value;
      });
    },

    preshow: function () {
    },

    /**
         * This method returns the locale value of the argument passed if available 
         * or it will return the argument value itself
         */
    getStringFromi18n: function(stringValue){
      return  kony.i18n.getLocalizedString(stringValue) ? kony.i18n.getLocalizedString(stringValue) : stringValue;
    },

    /**
         * This method fetches the auth_req_id which is required to get the user approval from SCA Notification
         */
    sendSCANotificationRequest: function(params, successCallback, failureCallback){
      let self = this;
      kony.application.showLoadingScreen("loadingskin","Data is still Loading");
      let dataModel = SCAObjectServices.getDataModel(self._objSeviceName, self._objName);
      dataModel.customVerb(self._operationName, params, completionCallback);

      function completionCallback(status, data, error) {
        if (status === kony.mvc.constants.STATUS_SUCCESS || status === true && data) {
          self.addCIBAStatusLoadingScreen();
          self.fetchStatusOfSCANotification(params, data, successCallback, failureCallback);
        } else {
          failureCallback(error && error.errorMessage? error.errorMessage: error && error.errmsg? error.errmsg: self.getStringFromi18n("i18n.ProfileManagement.PerformOperationFailed"), data, error);
        }
      }
    },
    PerformStepdownAction: function (params, successCB, failureCB) {
      let self = this;
      kony.application.showLoadingScreen("loadingskin","Data is still Loading");
      var stepUp = params.stepUp;
      let dataModel = SCAObjectServices.getDataModel(self._objSeviceName, self._objName);
      dataModel.customVerb(self._operationName, params, performStepDown);
      function performStepDown(status, data, error) {
        kony.application.dismissLoadingScreen();
        if (status === kony.mvc.constants.STATUS_SUCCESS || status === true) {
          successCB(data);
        }
        else {
          failureCB(error && error.errorMessage ? error.errorMessage : error && error.errmsg ? error.errmsg : self.getStringFromi18n("i18n.ProfileManagement.PerformOperationFailed"), data, error);
        }
      }
    },

    /**
         * This method shows a pop up msg requesting SCA notifiation approval
         */
    addCIBAStatusLoadingScreen: function(){
      let self = this;
      let currform = kony.application.getCurrentForm();
      let breakpoint = kony.application.getCurrentBreakpoint();
      let Popup = new com.temenos.infinity.sca.Popup({
        "appName" : "ResourcesHIDMA",
        "height": "100%",
        "id": "Popup",
        "isVisible": true,
        "left": "0dp",
        "masterType": constants.MASTER_TYPE_USERWIDGET,
        "isModalContainer": true,
        "skin": "sknflx000000op50",
        "top": "0dp",
        "width": "100%",
        "zIndex": 1001,
        "overrides": {
          "Popup": {
            "right": "viz.val_cleared",
            "bottom": "viz.val_cleared",
            "minWidth": "viz.val_cleared",
            "minHeight": "viz.val_cleared",
            "maxWidth": "viz.val_cleared",
            "maxHeight": "viz.val_cleared",
            "centerX": "viz.val_cleared",
            "centerY": "viz.val_cleared"
          },
          "flxPopup": {
            "skin": "sknflxffffffRadius5px",
            "centerY": breakpoint <= 1024 ? "50%" : "30%"
          },
          "imgLoading": {
            "src": "rb_4_0_ad_loading_indicator.gif"
          },
          "ldlPopupText": {
            "text": self.getStringFromi18n("i18n.DeviceRegistration.MsgApproveRequestNotificationSent"),
            "skin": "sknlbl424242SSPReg17px"
          }
        }
      }, {
        "overrides": {}
      }, {
        "overrides": {}
      });
      Popup.headingtext = self.getStringFromi18n("i18n.DeviceRegistration.MsgApproveRequestNotificationSent");
      currform.add(Popup);
      if(currform.flxHeader.info.frame && currform.flxFooter.info.frame && currform.flxContainer.info.frame)
        currform.Popup.height = currform.flxHeader.info.frame.height + currform.flxFooter.info.frame.height + currform.flxContainer.info.frame.height + "dp";
      kony.application.dismissLoadingScreen();
      currform.forceLayout();
    },

    removeCIBAStatusLoadingScreen:function(){
      var currform = kony.application.getCurrentForm();
      if (currform.Popup) {
        currform.Popup.setVisibility(false);
        currform.remove(currform.Popup);
      }
      currform.forceLayout();
    },

    /**
         * This method keep checking for user approval of SCA Notification
         */
    fetchStatusOfSCANotification: function(params, request, successCallback, failureCallback){
      let self = this;
      self.startTime = new Date().getTime();
      let payload = {"auth_req_id" : request.device_auth_req_id};
      let dataModel = SCAObjectServices.getDataModel(self._objSeviceName1, self._objName1);
      kony.timer.schedule("cibatimer", function(){
        dataModel.customVerb(self._operationName1, payload, completionCallback);
      }, 20, true);

      function notificationSuccessCallback(){
        kony.application.showLoadingScreen("loadingskin","Data is still Loading");
        payload = {"device_auth_req_id" : request.device_auth_req_id};
        dataModel = SCAObjectServices.getDataModel(self._objSeviceName, self._objName);
        dataModel.customVerb(self._operationName, payload, performAction);
        function performAction(status, data, error){
          kony.application.dismissLoadingScreen();
          if(status === kony.mvc.constants.STATUS_SUCCESS || status === true) {
            successCallback(data);
          } else {
            failureCallback(error && error.errorMessage? error.errorMessage: error && error.errmsg? error.errmsg: self.getStringFromi18n("i18n.ProfileManagement.PerformOperationFailed"), data, error);
          }
        }
      }

      function completionCallback(status, data, error) {
        let currentTime = new Date().getTime();
        if (data && data.ciba_status && data.ciba_status === "accept") {
          kony.timer.cancel("cibatimer");
          self.removeCIBAStatusLoadingScreen();
          notificationSuccessCallback();
        } else if (currentTime - self.startTime >  120000 || data.ciba_status === "deny") {
          kony.timer.cancel("cibatimer");
          let errmsg = self.getStringFromi18n(data.ciba_status === "deny" ? self._CIBARequestDeniedMsg : self._CIBARequestExpiredMsg);
          failureCallback(errmsg, data, error);
          self.removeCIBAStatusLoadingScreen();
        } 
      }
    },
  };

});