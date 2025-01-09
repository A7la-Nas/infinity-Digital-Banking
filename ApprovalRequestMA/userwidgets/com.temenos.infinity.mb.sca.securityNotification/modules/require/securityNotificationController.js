define(function() {

  const SDKConstants = {
    "PIN_REQUEST" : 100,
    "TX_ACCEPTED" : 101,
    "TX_DENIED"   : 102
  };
  
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._flxHeaderSkn = "";
      this._flxTopMsgSkn = "";
      this._flxGradientSkn = "";
      this._flxNotificationForUserSkn = "";
      this._flxPopupSkn = "";
      this._flxNoNotificationPopupSkn = "";
      this._lblScreenNameSkn = "";
      this._lblTopMsgSkn = "";
      this._lblNotificationForSkn = "";
      this._lblUserNameSkn = "";
      this._lblSeparatorNotificationForSkn = "";
      this._lblNotificationSkn = "";
      this._lblNoNotificationsSkn = "";
      this._lblNoRecordsSkn = "";
      this._lblSeparatorSkn = "";
      this._btnCancelSkn = "";
      this._btnCheckNewNotificationSkn = "";
      this._btnOKSkn = "";
      this._lblScreenNameTxt = "";
      this._lblTopMsgTxt = "";
      this._lblNotificationForTxt = "";
      this._lblNoNotificationsTxt = "";
      this._lblNoRecordsTxt = "";
      this._btnCancelTxt = "";
      this._btnCheckNewNotificationTxt = "";
      this._btnOKTxt = "";
      this._imgBackSrc = "";
      this._imgInfoSrc = "";
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineGetter(this, 'flxHeaderSkn', () => {
        return this._flxHeaderSkn;
      });
      defineSetter(this, 'flxHeaderSkn', value => {
        this._flxHeaderSkn = value;
      });
      defineGetter(this, 'flxTopMsgSkn', () => {
        return this._flxTopMsgSkn;
      });
      defineSetter(this, 'flxTopMsgSkn', value => {
        this._flxTopMsgSkn = value;
      });
      defineGetter(this, 'flxGradientSkn', () => {
        return this._flxGradientSkn;
      });
      defineSetter(this, 'flxGradientSkn', value => {
        this._flxGradientSkn = value;
      });
      defineGetter(this, 'flxNotificationForUserSkn', () => {
        return this._flxNotificationForUserSkn;
      });
      defineSetter(this, 'flxNotificationForUserSkn', value => {
        this._flxNotificationForUserSkn = value;
      });
      defineGetter(this, 'flxPopupSkn', () => {
        return this._flxPopupSkn;
      });
      defineSetter(this, 'flxPopupSkn', value => {
        this._flxPopupSkn = value;
      });
      defineGetter(this, 'flxNoNotificationPopupSkn', () => {
        return this._flxNoNotificationPopupSkn;
      });
      defineSetter(this, 'flxNoNotificationPopupSkn', value => {
        this._flxNoNotificationPopupSkn = value;
      });
      defineGetter(this, 'lblScreenNameSkn', () => {
        return this._lblScreenNameSkn;
      });
      defineSetter(this, 'lblScreenNameSkn', value => {
        this._lblScreenNameSkn = value;
      });
      defineGetter(this, 'lblTopMsgSkn', () => {
        return this._lblTopMsgSkn;
      });
      defineSetter(this, 'lblTopMsgSkn', value => {
        this._lblTopMsgSkn = value;
      });
      defineGetter(this, 'lblNotificationForSkn', () => {
        return this._lblNotificationForSkn;
      });
      defineSetter(this, 'lblNotificationForSkn', value => {
        this._lblNotificationForSkn = value;
      });
      defineGetter(this, 'lblUserNameSkn', () => {
        return this._lblUserNameSkn;
      });
      defineSetter(this, 'lblUserNameSkn', value => {
        this._lblUserNameSkn = value;
      });
      defineGetter(this, 'lblSeparatorNotificationForSkn', () => {
        return this._lblSeparatorNotificationForSkn;
      });
      defineSetter(this, 'lblSeparatorNotificationForSkn', value => {
        this._lblSeparatorNotificationForSkn = value;
      });
      defineGetter(this, 'lblNotificationSkn', () => {
        return this._lblNotificationSkn;
      });
      defineSetter(this, 'lblNotificationSkn', value => {
        this._lblNotificationSkn = value;
      });
      defineGetter(this, 'lblNoNotificationsSkn', () => {
        return this._lblNoNotificationsSkn;
      });
      defineSetter(this, 'lblNoNotificationsSkn', value => {
        this._lblNoNotificationsSkn = value;
      });
      defineGetter(this, 'lblNoRecordsSkn', () => {
        return this._lblNoRecordsSkn;
      });
      defineSetter(this, 'lblNoRecordsSkn', value => {
        this._lblNoRecordsSkn = value;
      });
      defineGetter(this, 'lblSeparatorSkn', () => {
        return this._lblSeparatorSkn;
      });
      defineSetter(this, 'lblSeparatorSkn', value => {
        this._lblSeparatorSkn = value;
      });
      defineGetter(this, 'btnCancelSkn', () => {
        return this._btnCancelSkn;
      });
      defineSetter(this, 'btnCancelSkn', value => {
        this._btnCancelSkn = value;
      });
      defineGetter(this, 'btnCheckNewNotificationSkn', () => {
        return this._btnCheckNewNotificationSkn;
      });
      defineSetter(this, 'btnCheckNewNotificationSkn', value => {
        this._btnCheckNewNotificationSkn = value;
      });
      defineGetter(this, 'btnOKSkn', () => {
        return this._btnOKSkn;
      });
      defineSetter(this, 'btnOKSkn', value => {
        this._btnOKSkn = value;
      });
      defineGetter(this, 'lblScreenNameTxt', () => {
        return this._lblScreenNameTxt;
      });
      defineSetter(this, 'lblScreenNameTxt', value => {
        this._lblScreenNameTxt = value;
      });
      defineGetter(this, 'lblTopMsgTxt', () => {
        return this._lblTopMsgTxt;
      });
      defineSetter(this, 'lblTopMsgTxt', value => {
        this._lblTopMsgTxt = value;
      });
      defineGetter(this, 'lblNotificationForTxt', () => {
        return this._lblNotificationForTxt;
      });
      defineSetter(this, 'lblNotificationForTxt', value => {
        this._lblNotificationForTxt = value;
      });
      defineGetter(this, 'lblNoNotificationsTxt', () => {
        return this._lblNoNotificationsTxt;
      });
      defineSetter(this, 'lblNoNotificationsTxt', value => {
        this._lblNoNotificationsTxt = value;
      });
      defineGetter(this, 'lblNoRecordsTxt', () => {
        return this._lblNoRecordsTxt;
      });
      defineSetter(this, 'lblNoRecordsTxt', value => {
        this._lblNoRecordsTxt = value;
      });
      defineGetter(this, 'btnCancelTxt', () => {
        return this._btnCancelTxt;
      });
      defineSetter(this, 'btnCancelTxt', value => {
        this._btnCancelTxt = value;
      });
      defineGetter(this, 'btnCheckNewNotificationTxt', () => {
        return this._btnCheckNewNotificationTxt;
      });
      defineSetter(this, 'btnCheckNewNotificationTxt', value => {
        this._btnCheckNewNotificationTxt = value;
      });
      defineGetter(this, 'btnOKTxt', () => {
        return this._btnOKTxt;
      });
      defineSetter(this, 'btnOKTxt', value => {
        this._btnOKTxt = value;
      });
      defineGetter(this, 'imgBackSrc', () => {
        return this._imgBackSrc;
      });
      defineSetter(this, 'imgBackSrc', value => {
        this._imgBackSrc = value;
      });
      defineGetter(this, 'imgInfoSrc', () => {
        return this._imgInfoSrc;
      });
      defineSetter(this, 'imgInfoSrc', value => {
        this._imgInfoSrc = value;
      });
    },

    preShowSecurityNotification: function(){
      this.setTextAndSkinFromProperties();
      this.resetUI();
      this.setFlowActions();
      this.getNotifications();
    },

    setFlowActions: function(){
      let scopeObj = this;
      this.view.flxBack.onTouchEnd = function(){
        //const ntf = new kony.mvc.Navigation(kony.application.getPreviousForm().id);
        //ntf.navigate();
        scopeObj.navigateToPreviousForm();
      };
      this.view.btnCancel.onClick = function(){
       //const ntf = new kony.mvc.Navigation(kony.application.getPreviousForm().id);
       // ntf.navigate();
        scopeObj.navigateToPreviousForm();
      };
      this.view.btnCheckNewNotification.onClick = function(){
        scopeObj.getNotifications();
        scopeObj.view.flxPopup.setVisibility(!(scopeObj.view.segNotifications.data && scopeObj.view.segNotifications.data.length));
      };
      this.view.segNotifications.onRowClick = function(){
        scopeObj.showApprovalScreen();
      };
      this.view.btnOK.onClick = function(){
        scopeObj.view.flxPopup.setVisibility(false);
      };
    },
    navigateToPreviousForm: function() {
    const navManager = applicationManager.getNavigationManager();
    navManager.setCustomInfo("frmSecurityNotification", undefined);
    navManager.navigateTo({"appName":"HomepageMA","friendlyName" : "AccountsUIModule/frmUnifiedDashboard"});
    },

    resetUI: function(){
      this.view.flxMainContainer.setVisibility(true);
      this.view.flxPopup.setVisibility(false);
      this.view.flxNotificationForUser.setVisibility(false);
      this.view.segNotifications.setData([]);
      if (applicationManager.getPresentationFormUtility().getDeviceName() === "android") {
        this.view.flxTopMsg.shadowDepth = 10;
        this.view.flxTopMsg.shadowType = constants.VIEW_BOUNDS_SHADOW;
        this.view.flxGradient.setVisibility(false);
      }
      else
        this.view.flxGradient.setVisibility(true);
    },

    showApprovalScreen: function(){
      var currentForm = kony.application.getCurrentForm();
      var sdk = new com.temenos.hidapprove.sdk({
      "autogrowMode": kony.flex.AUTOGROW_NONE,
      "clipBounds": true,
      "height": "100%",
      "id": "sdk",
      "isVisible": true,
      "layoutType": kony.flex.FREE_FORM,
      "left": "0dp",
      "masterType": constants.MASTER_TYPE_USERWIDGET,
      "isModalContainer": true,
      "appName": "ResourcesHIDMA",
      "skin": "slFbox",
      "top": "0dp",
      "width": "100%",
      "overrides": {
        "sdk": {
          "right": "viz.val_cleared",
          "bottom": "viz.val_cleared",
          "minWidth": "viz.val_cleared",
          "minHeight": "viz.val_cleared",
          "maxWidth": "viz.val_cleared",
          "maxHeight": "viz.val_cleared",
          "centerX": "viz.val_cleared",
          "centerY": "viz.val_cleared"
        }
      }
    }, {
      "overrides": {}
    }, {
      "overrides": {}
    });
    if (currentForm.sdk) {
       currentForm.sdk.resetPinDialog();
         currentForm.sdk.hidePinDialog();
       currentForm.remove(currentForm.sdk);
    }
   currentForm.add(sdk);
   currentForm.sdk.hidePinDialog();
  // currentForm.sdk.setVisibility(true);
    currentForm.sdk.preshow();
    let self = this;
    let selItems = this.view.segNotifications.selectedRowItems[0];
   let param = {
       tds: selItems.tds
      };
     currentForm.sdk.showApprovalScreen(param, function(status, policyJSON) {
       kony.application.dismissLoadingScreen();
      if (SDKConstants.PIN_REQUEST === status) {
        var pinLength = JSON.parse(policyJSON).MAX_LENGTH;
         currentForm.sdk.showPinDialog(pinLength);
        } else if (SDKConstants.TX_ACCEPTED === status || SDKConstants.TX_DENIED === status) {
         var msg = JSON.parse(policyJSON);
          const dataToDisplay = {
            msgTitle: msg.msgTitle,
             msgDesc: msg.msgDesc
             };
           currentForm.sdk.showOrHideTxStatus(status, dataToDisplay);
           currentForm.sdk.setFlowActions(self.getNotifications);
          }
       });
    },

    setSecurityNotifications: function(notifications){
      let self = this, segData = [], dataArray = [];
      for(let i =0; i<notifications.length; i++){
        dataArray.push(JSON.parse(notifications[i]));
      }
      segData = dataArray.map(function(data){
        return {
          tds: data.tds,
          txId: data.txId,
          lblNotification:{
            text: data.txId || "N/A",
            skin: self._lblNotificationSkn
          }
        };
      });
      this.setSegmentData(segData, this.view.segNotifications, this.view.flxNoNotificationFound);
      this.view.flxNotifications.top = this.view.flxNotificationForUser.isVisible? "150dp": "90dp";
      this.view.forceLayout();
    },

    setSegmentData: function(data, segment, flxNoResult){
      flxNoResult.setVisibility(data.length === 0);
      segment.setVisibility(data.length > 0);
      segment.setData(data);
      this.view.forceLayout();
    },

    getNotifications: function(){  
      applicationManager.getPresentationUtility().showLoadingScreen();
      const userManager = applicationManager.getUserPreferencesManager();
      const userName = userManager.getUserObj().userName;
      try {   
        let response = JSON.parse(this.view.sdk.getUserPendingTransactions(userName));
        if(response.pendingTx){
          this.setSecurityNotifications(response.pendingTx);
        }
      } catch (e) {
        this.setSegmentData([], this.view.segNotifications, this.view.flxNoNotificationFound);
      }
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },

    getStringFromi18n: function(stringValue){
      return  kony.i18n.getLocalizedString(stringValue) ? kony.i18n.getLocalizedString(stringValue) : stringValue;
    },

    setTextAndSkinFromProperties: function(){  
      this.view.flxHeader.skin = this._flxHeaderSkn;
      this.view.flxTopMsg.skin = this._flxTopMsgSkn;
      this.view.flxGradient.skin = this._flxGradientSkn;
      this.view.flxNotificationForUser.skin = this._flxNotificationForUserSkn;
      this.view.flxPopup.skin = this._flxPopupSkn;
      this.view.flxNoNotificationPopup.skin = this._flxNoNotificationPopupSkn;
      this.view.lblScreenName.skin = this._lblScreenNameSkn;
      this.view.lblTopMsg.skin = this._lblTopMsgSkn;
      this.view.lblNotificationFor.skin = this._lblNotificationForSkn;
      this.view.lblUserName.skin = this._lblUserNameSkn;
      this.view.lblSeparatorNotificationFor.skin = this._lblSeparatorNotificationForSkn;
      this.view.lblNoNotifications.skin = this._lblNoNotificationsSkn;
      this.view.lblNoRecords.skin = this._lblNoRecordsSkn;
      this.view.lblSeparator.skin = this._lblSeparatorSkn;
      this.view.btnCancel.skin = this._btnCancelSkn;
      this.view.btnCheckNewNotification.skin = this._btnCheckNewNotificationSkn;
      this.view.btnOK.skin = this._btnOKSkn;
      this.view.lblScreenName.text = this.getStringFromi18n(this._lblScreenNameTxt);
      this.view.lblTopMsg.text = this.getStringFromi18n(this._lblTopMsgTxt);
      this.view.lblNotificationFor.text = this.getStringFromi18n(this._lblNotificationForTxt);
      this.view.lblNoNotifications.text = this.getStringFromi18n(this._lblNoNotificationsTxt);
      this.view.lblNoRecords.text = this.getStringFromi18n(this._lblNoRecordsTxt);
      this.view.btnCancel.text = this.getStringFromi18n(this._btnCancelTxt);
      this.view.btnCheckNewNotification.text = this.getStringFromi18n(this._btnCheckNewNotificationTxt);
      this.view.btnOK.text = this.getStringFromi18n(this._btnOKTxt);
      this.view.imgBack.src = this._imgBackSrc;
      this.view.imgInfo.src = this._imgInfoSrc;
    },
  };
});
