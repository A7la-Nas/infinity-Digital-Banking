define(function () {

  const SDKConstants = {
    "PIN_REQUEST": 100,
    "OKRA_OTP_GENERATED": 107,
    "TX_ACCEPTED": 101,
    "TX_DENIED": 102
  };

  return {
    constructor: function (baseConfig, layoutConfig, pspConfig) {
      this._objectService = "";
      this._dataModel = "";
      this._operation = "";
      this._serviceName = "";
      this._serviceKey = "";
      this._context = "";
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function () {
      defineGetter(this, 'objectService', () => {
        return this._objectService;
      });
      defineSetter(this, 'objectService', value => {
        this._objectService = value;
      });
      defineGetter(this, 'dataModel', () => {
        return this._dataModel;
      });
      defineSetter(this, 'dataModel', value => {
        this._dataModel = value;
      });
      defineGetter(this, 'operation', () => {
        return this._operation;
      });
      defineSetter(this, 'operation', value => {
        this._operation = value;
      });
      defineGetter(this, 'serviceName', () => {
        return this._serviceName;
      });
      defineSetter(this, 'serviceName', value => {
        this._serviceName = value;
      });
      defineGetter(this, 'serviceKey', () => {
        return this._serviceKey;
      });
      defineSetter(this, 'serviceKey', value => {
        this._serviceKey = value;
      });
      defineGetter(this, 'context', () => {
        return this._context;
      });
      defineSetter(this, 'context', value => {
        this._context = value;
      });
    },

    showOKRAAuthentication: function () {
      const self = this;
      const currentForm = kony.application.getCurrentForm();
      const userManager = applicationManager.getUserPreferencesManager();
      const userName = userManager.getUserObj().userName;
      self.view.sdk.generateOCRAOTP(userName, self.serviceName, function (status, otpJSON) {
        const otp = JSON.parse(otpJSON).otp;
        if (SDKConstants.PIN_REQUEST === status) {
          var pinLength = JSON.parse(otpJSON).MAX_LENGTH;
          var HIDApproveSDKManager = require('HIDApproveSDKManager');
          hidApplicationSDKManager = HIDApproveSDKManager.getHIDApproveSDKManager();
          var sdk = hidApplicationSDKManager.getSdkInstance();
          if (currentForm.sdk) {
              currentForm.remove(currentForm.sdk);
          }
          currentForm.add(sdk);
          currentForm.sdk.setVisibility(true);
          currentForm.sdk.showPinDialog(pinLength);
          kony.application.dismissLoadingScreen();
        } else if (SDKConstants.OKRA_OTP_GENERATED === status) {
          if (currentForm.sdk) {
            currentForm.sdk.hidePinDialog();
            currentForm.remove(currentForm.sdk);
          }
          applicationManager.getPresentationUtility().showLoadingScreen();
          let payload = {
            "isMobile": true,
            "otp": otp,
            "context": self.serviceName,
            "serviceKey": self.serviceKey,
            "serviceName": self.serviceName
          };
          self.fetchResponse(payload);
        }
      });
    },

    fetchResponse: function (payload) {
      let self = this;
      applicationManager.getPresentationUtility().showLoadingScreen();

      function completionCallback(status, data, error) {
        const srh = applicationManager.getServiceResponseHandler();
        var obj = srh.manageResponse(status, data, error);
        if (obj["status"] === true && !data.hasOwnProperty("errmsg") && self.onSuccessCallback) {
          let response = self.serviceKey ? {"serviceName" : self.serviceName, "serviceKey": self.serviceKey} : obj.data;
          self.onSuccessCallback(response);
        } else if (self.onFailureCallback) {
          let errorObj = self.setErrorMessage(obj, error);
          self.onFailureCallback(errorObj);
        }
        kony.application.dismissLoadingScreen();
      }
      // datamodel has to be defined if there are any SCA services to be called.
      // otherwise we can bind the actual event in base product in successcallback. This will handle success and failure scenarios as defined in base product
      let dataModel = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository(self.dataModel);
      dataModel.customVerb(self.operation, payload, completionCallback);
    },

    setErrorMessage: function (obj) {
      // sometimes errmsg and errorMessage are used in multiple services
      // to make it generic, we have set data to both errmsg and errorMessage properties
      let errorObj = (typeof obj.errmsg === "object") ? obj.errmsg : obj;
      errorObj.errmsg = errorObj.errmsg ? errorObj.errmsg : errorObj.errorMessage;
      errorObj.errorMessage = errorObj.errmsg;
      return errorObj;
    },

  };
});
